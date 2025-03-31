ALTER TABLE public.invoices
ADD COLUMN products json;

UPDATE public.invoices
SET products = (
    SELECT json_agg(json_build_object(
        'name', p.name,
        'description', p.description,
        'price', p.price,
        'currency', p.currency,
        'exchange_rate', p.exchange_rate,
        'quantity', ip.quantity
    ))
    FROM products p
    JOIN invoices_products ip ON ip.product_id = p.id
    WHERE ip.invoice_id = invoices.id
);

