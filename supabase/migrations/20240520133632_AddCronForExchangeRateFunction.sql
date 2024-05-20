select
  cron.schedule(
    'invoke-function-every-day',
    -- This cron job will run every day
    '13 0 * * *',
    $$
    select
      net.http_post(
          url:='https://hoehixjcooujrbnxaybo.supabase.co/functions/v1/get-exchange-rates'
      ) as request_id;
    $$
  );
