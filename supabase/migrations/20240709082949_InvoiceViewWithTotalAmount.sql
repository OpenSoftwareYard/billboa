ALTER TABLE invoices
DROP COLUMN total_amount;

CREATE VIEW
  invoices_view
  with (security_invoker=on)
AS
SELECT i.*, p.price::BIGINT * ip.quantity::BIGINT AS total_amount
FROM
  invoices i
  JOIN invoices_products ip ON i.id = ip.invoice_id
  JOIN products p ON ip.product_id = p.id;

