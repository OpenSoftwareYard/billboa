import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.2";
import * as xml from "https://jsr.io/@libs/xml/5.0.2/mod.ts";

import { corsHeaders } from "../_shared/cors.ts";
import { Database } from "../_shared/DatabaseDefinitionsGenerated.ts";

const exchangeRateURLs = [
  {
    from: "EUR",
    to: "RON",
    url: "https://www.bnro.ro/RSS_200003_EUR.aspx",
  },
];

const exchangeRateRegex =
  /1 [A-Z]{3} = (?<exchangeRate>\d{1,4}\.\d{1,4}).*(?<day>\d{2})-(?<month>\d{2})-(?<year>\d{4})/g;

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
      rss: {
        channel: {
          item: {
            title: string;
          }[];
        };
      };
    };

    const rates = parsedXml.rss.channel.item.map((item) => {
      const match = exchangeRateRegex.exec(item.title);
      if (match) {
        exchangeRateRegex.lastIndex = 0;
        return {
          date:
            `${match.groups?.year}-${match.groups?.month}-${match.groups?.day}`,
          exchangeRate: Math.round(Number(match.groups!.exchangeRate) * 10000),
        };
      }
    });

    return { ...url, rates };
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
