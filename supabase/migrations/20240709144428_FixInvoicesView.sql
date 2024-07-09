DROP VIEW invoices_view;

CREATE VIEW
  invoices_view
  with (security_invoker=on)
AS
  SELECT i.*, (
    SELECT SUM(p.price::BIGINT * ip.quantity::BIGINT)
      FROM products p
      JOIN invoices_products ip ON
      ip.product_id = p.id
      WHERE ip.invoice_id = i.id
  ) AS total_amount
  FROM
    invoices i

