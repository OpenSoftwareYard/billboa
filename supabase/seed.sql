insert into
public.companies (name, address, city, state, country, company_number, vat_number)
values ('ACME Corp', '123 Fake Street', 'Springfield', 'IL', 'USA', '123456789', '987654321');

insert into
public.clients (company_id, name, address, city, state, country, company_number, vat_number)
values ((SELECT currval(pg_get_serial_sequence('companies','id'))), 'Client of mine', '321 Client Street', 'Pawtucket', 'NE', 'USA', '123456789', '987654321');

insert into
public.products (company_id, name, description, price, currency)
values ((SELECT currval(pg_get_serial_sequence('companies','id'))), 'Product 1', 'This is a product', 100, 'USD');

insert into
public.invoices (client_id, company_id, invoice_number, date, due_date, status, currency, exchange_rate)
values ((SELECT currval(pg_get_serial_sequence('clients','id'))), (SELECT currval(pg_get_serial_sequence('companies','id'))), 'INV-0001', '2021-01-01', '2021-01-31', 'draft', 'USD', 1.0);

insert into
public.invoices_products (invoice_id, product_id, quantity)
values ((SELECT currval(pg_get_serial_sequence('invoices','id'))), (SELECT currval(pg_get_serial_sequence('products','id'))), 1);
