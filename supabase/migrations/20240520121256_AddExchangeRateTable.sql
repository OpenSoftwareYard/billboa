CREATE TABLE exchange_rates (
  currency_from TEXT NOT NULL,
  currency_to TEXT NOT NULL,
  rate NUMERIC(20, 4) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::TEXT, now()) NOT NULL,
  rate_date DATE NOT NULL,
  PRIMARY KEY (currency_from, currency_to, rate_date)
);

ALTER TABLE exchange_rates ENABLE ROW LEVEL SECURITY;

/* Allow everyone to select from the table */
create policy "Enable read access for all users"
on "public"."exchange_rates" 
as PERMISSIVE 
for SELECT
to public
using (
  true
);
