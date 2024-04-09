import { HandlebarsJS } from "https://deno.land/x/handlebars@v0.10.0/mod.ts";
import moment from "npm:moment@2.29.1";

// deno-lint-ignore no-explicit-any
export const renderInvoice = (invoice: any, templateHTML: string) => {
  // deno-lint-ignore no-explicit-any
  const template = (HandlebarsJS as any).compile(templateHTML);

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

  return htmlContent;
};