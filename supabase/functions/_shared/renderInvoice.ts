import {
  createClient,
  QueryData,
} from "https://esm.sh/@supabase/supabase-js@2.39.2";

import { HandlebarsJS } from "https://deno.land/x/handlebars@v0.10.0/mod.ts";
import moment from "npm:moment@2.29.1";

import { Database } from "./DatabaseDefinitionsGenerated.ts";

const supabaseClient = createClient<Database>(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_ANON_KEY") ?? "",
);

const invoicesWithCompaniesAndProductsQuery = supabaseClient
  .from("invoices")
  .select(`*,
      companies (*),
      clients (*),
      products (*, quantity: invoices_products(quantity))
    `)
  .single();

export type InvoicesWithCompaniesAndProducts = QueryData<
  typeof invoicesWithCompaniesAndProductsQuery
>;

export const renderInvoice = (
  invoice: InvoicesWithCompaniesAndProducts,
  templateHTML: string,
) => {
  // deno-lint-ignore no-explicit-any
  const template = (HandlebarsJS as any).compile(templateHTML);

  const htmlContent = template({
    "company-name": invoice.companies?.name,
    "company-number": invoice.companies?.company_number,
    "company-vat-number": invoice.companies?.vat_number,
    "company-address": invoice.companies?.address,
    "company-city": invoice.companies?.city,
    "company-state": invoice.companies?.state,
    "company-country": invoice.companies?.country,
    "company-bank-number": invoice.companies?.bank_number,
    "company-bank-name": invoice.companies?.bank_name,
    "company-share-value": invoice.companies?.share_value,
    "client-name": invoice.clients?.name,
    "client-company-number": invoice.clients?.company_number,
    "client-address": invoice.clients?.address,
    "client-city": invoice.clients?.city,
    "client-country": invoice.clients?.country,
    "invoice-number": invoice.invoice_number,
    "invoice-date": moment(invoice.date).format("DD/MM/YYYY"),
    "invoice-due-date": moment(invoice.due_date).format("DD/MM/YYYY"),
    "invoice-total-amount": new Intl.NumberFormat("en-UK", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(invoice.total_amount / 1000),
    "invoice-currency": invoice.currency,
    "invoice-total-amount-ron": new Intl.NumberFormat("en-UK", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(invoice.total_amount * invoice.exchange_rate / 1000 / 1000),
    // TODO: Replace this with a proper join type
    "invoice-products": invoice.products.map((product) => ({
      ...product,
      price: new Intl.NumberFormat("en-UK", {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }).format(product.price / 1000),
      quantity: product.quantity[0].quantity,
      lineTotal: new Intl.NumberFormat("en-UK", {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }).format(product.quantity[0].quantity * product.price / 1000),
    })),
    "invoice-notes": [`Exchange rate 1 ${invoice.currency} = ${invoice.exchange_rate / 1000} RON`, ...(invoice.notes?.split("\n") ?? [])],
  });

  return htmlContent;
};
