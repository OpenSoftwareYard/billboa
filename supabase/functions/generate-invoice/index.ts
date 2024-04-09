import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.2";
import puppeteer from "npm:puppeteer-core@21.6.1";
import { HandlebarsJS } from "https://deno.land/x/handlebars@v0.10.0/mod.ts";
import moment from "npm:moment@2.29.1";

import { corsHeaders } from "../_shared/cors.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const IS_PRODUCTION = Deno.env.get("ENVIRONMENT") === "production";

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    {
      global: {
        headers: { Authorization: req.headers.get("Authorization")! },
      },
    },
  );

  const { invoice_number } = await req.json();

  const { data: invoice, error } = await supabaseClient
    .from("invoices")
    .select(`*,
      companies (*),
      clients (*),
      products (*, quantity: invoices_products(quantity))
    `)
    .eq("invoice_number", invoice_number)
    .single();

  if (error) {
    throw error;
  }

  const invoiceDocumentName = crypto.randomUUID();

  const browserlessUrl = IS_PRODUCTION
    ? `wss://chrome.browserless.io?token=${
      Deno.env.get(
        "PUPPETEER_BROWSERLESS_IO_KEY",
      )
    }`
    : "ws://browserless:3000";

  const templateHTML = await fetch(
    `${Deno.env.get("TEMPLATES_URL")}/default.html`,
  );

  // deno-lint-ignore no-explicit-any
  const template = (HandlebarsJS as any).compile(
    await templateHTML.text(),
  );

  const htmlContent = template({
    "company-name": invoice.companies.name,
    "company-number": invoice.companies.company_number,
    "company-vat-number": invoice.companies.vat_number,
    "company-address": invoice.companies.address,
    "company-city": invoice.companies.city,
    "company-state": invoice.companies.state,
    "company-country": invoice.companies.country,
    "company-bank-number": invoice.companies.bank_number,
    "company-bank-name": invoice.companies.bank_name,
    "company-share-value": invoice.companies.share_value,
    "client-name": invoice.clients.name,
    "client-company-number": invoice.clients.company_number,
    "client-address": invoice.clients.address,
    "client-city": invoice.clients.city,
    "client-country": invoice.clients.country,
    "invoice-number": invoice.invoice_number,
    "invoice-date": moment(invoice.date).format("DD/MM/YYYY"),
    "invoice-due-date": moment(invoice.due_date).format("DD/MM/YYYY"),
    "invoice-total-amount": invoice.total_amount,
    "invoice-currency": invoice.currency,
    "invoice-total-amount-ron": invoice.total_amount * invoice.exchange_rate,
    // TODO: Replace this with a proper join type
    // deno-lint-ignore no-explicit-any
    "invoice-products": invoice.products.map((product: any) => ({
      ...product,
      quantity: product.quantity[0].quantity,
      lineTotal: product.quantity[0].quantity * product.price,
    })),
  });

  const browser = await puppeteer.connect({
    browserWSEndpoint: browserlessUrl,
  });
  const page = await browser.newPage();

  await page.setContent(htmlContent);

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
  });

  const invoicePath = `${invoice.companies.id}/${invoiceDocumentName}.pdf`;

  const { data: _uploadPdfData, error: uploadPdfError } = await supabaseClient
    .storage
    .from("invoices")
    .upload(invoicePath, pdf, {
      contentType: "application/pdf",
      upsert: false,
    });

  if (uploadPdfError) {
    throw uploadPdfError;
  }

  const { data: pdfUrl, error: pdfUrlError } = await supabaseClient.storage
    .from("invoices")
    .createSignedUrl(invoicePath, 120);

  if (pdfUrlError) {
    throw pdfUrlError;
  }

  return new Response(
    JSON.stringify({
      invoice_url: pdfUrl,
    }),
    {
      headers: { ...corsHeaders, "content-type": "application/json" },
    },
  );
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Start a browserless container: `docker run --network supabase_network_billboa --name browserless -d browserless/chrome`
  3. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/generate-invoice' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU' \
    --header 'Content-Type: application/json' \
    --data '{"invoice_number":"INV-0001"}'

*/
