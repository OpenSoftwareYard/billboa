import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.2";

import { corsHeaders } from "../_shared/cors.ts";
import { renderInvoice } from "../_shared/renderInvoice.ts";

import { Database } from "../_shared/DatabaseDefinitionsGenerated.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const supabaseClient = createClient<Database>(
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

  const templateHTML = await fetch(
    `${Deno.env.get("TEMPLATES_URL")}/default.html`,
  );

  const htmlContent = renderInvoice(invoice, await templateHTML.text());

  return new Response(JSON.stringify(htmlContent), {
    headers: { ...corsHeaders, "content-type": "application/json" },
  });
});
