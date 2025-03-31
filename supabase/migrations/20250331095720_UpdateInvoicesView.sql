DROP VIEW invoices_view;


CREATE VIEW
  invoices_view
  with (security_invoker=on)
AS
SELECT 
    i.*,
    COALESCE((
        SELECT SUM((p->>'price')::numeric * (p->>'quantity')::numeric)
        FROM jsonb_array_elements(i.products::jsonb) AS p
    ), 0) AS total_amount
FROM public.invoices i;