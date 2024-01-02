import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import puppeteer from "npm:puppeteer-core@21.6.1";

Deno.serve(async (req) => {
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

  const { data: _invoiceBucket, error: invoiceBucketError } =
    await supabaseClient.storage.getBucket("invoices");

  if (invoiceBucketError) {
    const createBucketRes = await supabaseClient.storage.createBucket(
      "invoices",
      {
        public: false,
      },
    );

    if (createBucketRes.error) {
      throw createBucketRes.error;
    }
  }

  const { invoice_number } = await req.json();

  const { data: invoice, error } = await supabaseClient
    .from("invoices")
    .select()
    .eq("invoice_number", invoice_number)
    .single();

  if (error) {
    throw error;
  }

  const invoiceDocumentName = crypto.randomUUID();

  const htmlContent = `<!DOCTYPE html>
<html>
<head>
<title>Invoice #${invoice.invoice_number}</title>
</head>
<body>
<h1>Invoice #${invoice.invoice_number}</h1>
<p>Total amount due: ${invoice.total_amount} ${invoice.currency}</p>
</body>
</head>
`;

  const browserlessUrl = IS_PRODUCTION
    ? `wss://chrome.browserless.io?token=${Deno.env.get(
        "PUPPETEER_BROWSERLESS_IO_KEY",
      )}`
    : "ws://browserless:3000";

  const browser = await puppeteer.connect({
    browserWSEndpoint: browserlessUrl,
  });
  const page = await browser.newPage();
  await page.setContent(htmlContent);

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
  });

  const { data: _uploadPdfData, error: uploadPdfError } =
    await supabaseClient.storage
      .from("invoices")
      .upload(`${invoiceDocumentName}.pdf`, pdf, {
        contentType: "application/pdf",
        upsert: false,
      });

  if (uploadPdfError) {
    throw uploadPdfError;
  }

  const { data: pdfUrl, error: pdfUrlError } = await supabaseClient.storage
    .from("invoices")
    .createSignedUrl(`${invoiceDocumentName}.pdf`, 120);

  if (pdfUrlError) {
    throw pdfUrlError;
  }

  return new Response(
    JSON.stringify({
      invoice_url: pdfUrl,
    }),
    {
      headers: { "content-type": "application/json" },
    },
  );
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/serve-invoice' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
