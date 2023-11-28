insert into
public.companies (name, address, city, state, country, company_number, vat_number)
values ('ACME Corp', '123 Fake Street', 'Springfield', 'IL', 'USA', '123456789', '987654321');

insert into
public.clients (company_id, name, address, city, state, country, company_number, vat_number)
values ((SELECT currval(pg_get_serial_sequence('companies','id'))), 'Client of mine', '321 Client Street', 'Pawtucket', 'NE', 'USA', '123456789', '987654321');
