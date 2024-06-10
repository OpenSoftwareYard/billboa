alter table products alter column price type bigint using price * 10000;
alter table products alter column exchange_rate type bigint using exchange_rate * 10000;

alter table invoices alter column total_amount type bigint using total_amount * 10000;
alter table invoices alter column exchange_rate type bigint using exchange_rate * 10000;

alter table exchange_rates alter column rate type bigint using rate * 10000;
