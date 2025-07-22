import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.2";
import * as xml from "jsr:@libs/xml";

import { corsHeaders } from "../_shared/cors.ts";
import { Database } from "../_shared/DatabaseDefinitionsGenerated.ts";

const exchangeRateURLs = [
  {
    from: "EUR",
    to: "RON",
    url: "https://curs.bnr.ro/nbrfxrates.xml",
  },
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const supabaseClient = createClient<Database>(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  );

  const exchangeRates = exchangeRateURLs.map(async (url) => {
    const response = await fetch(url.url);
    const xmlText = await response.text();
    const parsedXml = xml.parse(xmlText) as unknown as {
      DataSet: {
        Body: {
          Cube: {
            "@date": string;
            Rate: {
              "#text": string;
              "@currency": string;
            }[];
          };
        };
      };
    };

    const cube = parsedXml.DataSet.Body.Cube;

    const foundRate = cube.Rate.find(
      (rate) => rate["@currency"] === url.from,
    );

    return {
      ...url,
      rates: [
        foundRate
          ? {
            date: cube["@date"],
            exchangeRate: Math.round(Number(foundRate["#text"]) * 10000), // Convert to basis points
          }
          : undefined,
      ],
    };
  });

  // Transform the data to a flat array of exchange rates
  const exchangeRatesData = await Promise.all(exchangeRates).then((
    exchangeRates,
  ) =>
    exchangeRates.flatMap((exchangeRate) =>
      exchangeRate.rates.map((rate) => ({
        from: exchangeRate.from,
        to: exchangeRate.to,
        rate,
      }))
    ).map(async (exchangeRate) => {
      const { error } = await supabaseClient.from("exchange_rates").upsert({
        currency_from: exchangeRate.from,
        currency_to: exchangeRate.to,
        rate: exchangeRate.rate!.exchangeRate!,
        rate_date: exchangeRate.rate!.date!,
      });

      if (error) {
        throw error;
      }
    })
  );

  await Promise.all(exchangeRatesData);

  return new Response(JSON.stringify(exchangeRatesData), {
    headers: corsHeaders,
  });
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
