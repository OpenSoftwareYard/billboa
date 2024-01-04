import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import puppeteer from "npm:puppeteer-core@21.6.1";
import { HandlebarsJS } from "https://deno.land/x/handlebars@v0.10.0/mod.ts";

const TEMPLATE = `
<style id="style">
    @import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

    :root {
        --primary-color: #298AAB;
        --secondary-color: #7081e0;
        --line-height: 1.6;
    }

    html {
        width: 210mm;
        height: 200mm;
    }

    body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-family: roboto, Helvetica, sans-serif;
        font-size: 16 !important;
        zoom: 80%;
    }


    table tr td, table tr, th {
        font-size: 16 !important;
    }

    @page {
        margin-left: 6.35mm;
        margin-right: 6.35mm;
        margin-top: 0;
        margin-bottom: 0;
        size: A4 portrait;
    }

    p {
        margin: 0;
        padding: 0;
    }

    .header-container {
        display: grid;
        grid-template-columns: 1.8fr 1fr 1fr;
        grid-gap: 20px;
        margin-bottom: 2rem;
    }

    .company-logo {
        max-width: 65%;
    }

    .header-container > span {
        display: block;
    }

    #company-details {
        display: flex;
        flex-direction: column;
        color: #AAA9A9;
        line-height: var(--line-height);
    }

    #company-address {
        display: flex;
        flex-direction: column;
        color: #b1b1b1;
        line-height: var(--line-height);
    }

    .entity-issued-to {
        /* margin-top: 2rem; */
        font-weight: bold;
    }

    .client-and-entity-wrapper {
        display: flex;
        justify-content: space-between;
        gap: 20px;
        margin-bottom: 2rem;
    }

    #client-details {
        display: flex;
        flex-direction: column;
        line-height: var(--line-height);
        vertical-align: top;
        margin-left: 1rem;
    }

    #client-details > p:nth-child(2) {
        color: var(--primary-color);
        font-size: 120%;
    }

    #shipping-details {
        display: none;
        flex-direction: column;
        line-height: var(--line-height);
    }

    #entity-details {
        background-color: var(--primary-color);
        padding: 1.2rem;
        border-radius: 1rem;
        width: 100%;
        color: white;
        text-align: left;
    }

    #entity-details p { margin-right: 20px; }

    #entity-details th {
        font-weight: normal;
        padding-bottom: .5rem;
    }

    #entity-details > tbody > tr > th:nth-child(2) {
        text-align: right;
    }

    [data-ref="table"] {
        margin-top: 0.5rem;
        margin-bottom: 5px;
        min-width: 100%;
        table-layout: fixed;
        overflow-wrap: break-word;
    }

    .task-time-details {
        display: block;
        margin-top: 5px;
        color: grey;
    }

    [data-ref="table"] > thead {
        text-align: left;
        background: var(--secondary-color);
    }

    [data-ref="table"] > thead > tr > th {
        padding: 1rem;
        color: white;
        font-weight: semibold;
    }

    [data-ref="table"] > thead > tr > th:first-child {
        border-top-left-radius: 1rem;
    }

    [data-ref="table"] > thead > tr > th:last-child {
        border-top-right-radius: 1rem;
        text-align: right;
    }

    [data-ref="table"] > tbody > tr > td {
        padding: 1rem;
    }

    [data-ref="table"] > tbody > tr > td:last-child {
        text-align: right;
    }

    [data-ref="table"] > tbody > tr:nth-child(odd) > td {
        background: #F7F7F7;
    }

    [data-ref="table"] > tbody > tr:nth-child(even) > td {
        background: #f7f7f7;
    }

    [data-element='product-table-balance-due-label'],
    [data-element='product-table-balance-due'],
    [data-element='task-table-balance-due-label'],
    [data-element='task-table-balance-due'] {
        color: var(--secondary-color) !important;
        font-weight: bold !important;
    }

    #table-totals > *:last-child {
        border-bottom-left-radius: 1rem;
        border-bottom-right-radius: 1rem;
    }

    #table-totals {
        margin-top: 0rem;
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 80px;
        padding-top: 0.5rem;
        padding-bottom: 0.8rem;
        padding-left: 0.7rem;
        /*page-break-inside:auto; this may cause weird breaking*/
        overflow: visible !important;
    }

    #table-totals .totals-table-right-side>* {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    #table-totals>.totals-table-right-side>*> :nth-child(1) {
        text-align: left;
        margin-top: .75rem;
        padding-left: 7px;
    }

    #table-totals>.totals-table-right-side> * > :not([hidden]) ~ :not([hidden]) {
        --tw-space-y-reverse: 0;
        margin-top: calc(.75rem * calc(1 - var(--tw-space-y-reverse)));
        margin-bottom: calc(.75rem * var(--tw-space-y-reverse));
    }

    #table-totals>.totals-table-right-side>*> :nth-child(2) {
        text-align: right;
        padding-right: 17px;
    }

    #table-totals
    > *
    [data-element='product-table-balance-due-label'],
    #table-totals
    > *
    [data-element='product-table-balance-due'] {
        font-weight: bold;
        font-size: 1.2rem;
    }

    #table-totals
    > *
    [data-element='product-table-balance-due'] {
        color: red;
    }

    #table-totals > * > :last-child {
        text-align: right;
        padding-right: 1rem;
    }

    [data-ref="total_table-footer"] {
        padding-left: 0.8rem
    }

    #footer {
        margin-top: 30px;
    }

    /** Markdown-specific styles. **/
    [data-ref="table"] h3 {
        font-size: 1rem;
        margin-bottom: 0;
    }

    [data-ref="totals_table-outstanding-label"],
    [data-ref="totals_table-outstanding"] {
        background-color: var(--secondary-color);
        color: white;
        padding-top: 7px;
        padding-bottom: 7px;
        padding-right: 7px;
    }

    [data-ref="statement-totals"] {
        margin-top: 1rem;
        text-align: right;
        margin-right: .75rem;
    }

    [data-ref*=".line_total-td"] {
        white-space: nowrap;
    }

    /** .repeating-header,
    .repeating-header-space, **/
    .repeating-footer,
    .repeating-footer-space {
        height: 10px;
    }
    .repeating-header {
        position: fixed;
        top: 0;
    }
    .repeating-footer {
        position: fixed;
        bottom: 0;
    }

    [data-element='product_table-product.description-td'], td {
        min-width:100%;
        max-width: 300px;
        overflow-wrap: break-word;
    }

    .stamp {
      transform: rotate(12deg);
        color: #555;
        font-size: 3rem;
        font-weight: 700;
        border: 0.25rem solid #555;
        display: inline-block;
        padding: 0.25rem 1rem;
        text-transform: uppercase;
        border-radius: 1rem;
        font-family: 'Courier';
        mix-blend-mode: multiply;
        z-index:200 !important;
        position:  fixed;
        text-align: center;
    }

    .is-paid {
        color:  #D23;
        border: 1rem double  #D23;
        transform: rotate(-5deg);
        font-size: 6rem;
        font-family: "Open sans", Helvetica, Arial, sans-serif;
        border-radius: 0;
        padding: 0.5rem;
        opacity: 0.2;
        z-index:200 !important;
        position:  fixed;
        display: none;
    }

    .project-header {
        font-size: 1.2em;
        margin-top: 0.1em;
        margin-bottom: 0;
        padding-bottom: 0;
        margin-left: 0;
        margin-right: 0;
        font-weight: bold;
        color: #505050;
    }

    /** Useful snippets, uncomment to enable. **/

    /* Hide company details */
    /* #company-details > * { display: none } */

    /* Hide company address */
    /* #company-address > * { display: none } */

    /* Hide public notes */
    /* [data-ref="total_table-public_notes"] { display: none } */

    /* Hide terms label */
    /* [data-ref="total_table-terms-label"] { display: none } */

    /* Hide totals table */
    /* #table-totals { display: none } */

    /* Hide totals table left side */
    /* #table-totals div:first-child > * { display: none !important } */

    /* Hide totals table right side */
    /* .totals-table-right-side { display: none } */

    /** For more info, please check our docs: https://invoiceninja.github.io **/
    /** To find out selectors on your own: https://invoiceninja.github.io/docs/custom-fields/#snippets **/
</style>

<table style="min-width: 100%">
   <thead>
      <tr>
         <td>
            <div class="repeating-header-space">&nbsp;</div>
         </td>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>
            <div id="body">
               <div class="header-container">
                  <img
                     src=""
                     class="company-logo"
                     alt="{{ company-name }} logo"
                     />
                  <div id="company-details">
                    <p>{{ company-name }}</p>
                    <p>ID: {{ company-number }}</p>
                  </div>
                  <div id="company-address">
                    <p>{{ company-address }}</p>
                    <p>{{ company-city }}</p>
                    <p>{{ company-state }}</p>
                    <p>{{ company-country }}</p>
                  </div>
               </div>
               <div class="client-and-entity-wrapper">
                <div id="client-details">
                  <p class="entity-issued-to">Invoice issued to:</p>
                  <p>{{ client-name }}</p>
                  <p>{{ client-company-number }}</p>
                  <p>{{ client-address }}</p>
                  <p>{{ client-city }}</p>
                  <p>{{ client-country }}</p>
                </div>
                  <div id="vendor-details"></div>
                <div id="shipping-details"></div>
                  <div class="entity-details-wrapper">
                     <table id="entity-details" cellspacing="0" dir="$dir"></table>
                  </div>
               </div>
               <table id="product-table" cellspacing="0" data-ref="table"></table>
               <table id="task-table" cellspacing="0" data-ref="table"></table>
               <table id="delivery-note-table" cellspacing="0" data-ref="table"></table>
               <table id="statement-invoice-table" cellspacing="0" data-ref="table"></table>
               <div id="statement-invoice-table-totals" data-ref="statement-totals"></div>
               <table id="statement-payment-table" cellspacing="0" data-ref="table"></table>
               <div id="statement-payment-table-totals" data-ref="statement-totals"></div>
                            <table id="statement-credit-table" cellspacing="0" data-ref="table"></table>
                            <div id="statement-credit-table-totals" data-ref="statement-totals"></div>
               <table id="statement-aging-table" cellspacing="0" data-ref="table"></table>
               <div id="statement-aging-table-totals" data-ref="statement-totals"></div>
               <div id="table-totals" cellspacing="0">$status_logo</div>
            </div>
         </td>
      </tr>
   </tbody>
   <tfoot>
      <tr>
         <td>
            <div class="repeating-footer-space">&nbsp;</div>
         </td>
      </tr>
   </tfoot>
</table>

<div class="repeating-header" id="header"></div>

$entity_images

<div class="repeating-footerx" id="footer">
    <p data-ref="total_table-footer">$entity_footer</p>


<script>
    // Clear up space a bit, if [product-table, tasks-table, delivery-note-table] isn't present.
    document.addEventListener('DOMContentLoaded', () => {
        let tables = [
            'product-table', 'task-table', 'delivery-note-table',
            'statement-invoice-table', 'statement-payment-table', 'statement-aging-table-totals',
            'statement-invoice-table-totals', 'statement-payment-table-totals', 'statement-aging-table',
            'client-details', 'vendor-details', 'swiss-qr', 'shipping-details', 'statement-credit-table', 'statement-credit-table-totals',
        ];

        tables.forEach((tableIdentifier) => {
            document.getElementById(tableIdentifier).childElementCount === 0
                ? document.getElementById(tableIdentifier).style.display = 'none'
                : '';
        });
    });
</script>

</div>

`;

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
    .select(`*,
      companies (*),
      clients (*),
      products (*)
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

  // deno-lint-ignore no-explicit-any
  const template = (HandlebarsJS as any).compile(
    TEMPLATE,
  );

  const htmlContent = template({
    "company-name": invoice.companies.name,
    "company-number": invoice.companies.company_number,
    "company-address": invoice.companies.address,
    "company-city": invoice.companies.city,
    "company-state": invoice.companies.state,
    "company-country": invoice.companies.country,
    "client-name": invoice.clients.name,
    "client-company-number": invoice.clients.company_number,
    "client-address": invoice.clients.address,
    "client-city": invoice.clients.city,
    "client-country": invoice.clients.country,
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

  const { data: _uploadPdfData, error: uploadPdfError } = await supabaseClient
    .storage
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
  2. Start a browserless container: `docker run --network supabase_network_billboa --name browserless -d browserless/chrome`
  3. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/generate-invoice' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU' \
    --header 'Content-Type: application/json' \
    --data '{"invoice_number":"INV-0001"}'

*/
