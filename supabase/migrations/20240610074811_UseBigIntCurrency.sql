alter table products alter column price type bigint using price::bigint * 100;
alter table products alter column exchange_rate type bigint using exchange_rate::bigint * 100;

alter table invoices alter column total_amount type bigint using total_amount::bigint * 100;
alter table invoices alter column exchange_rate type bigint using exchange_rate::bigint * 100;

alter table exchange_rates alter column rate type bigint using rate::bigint * 100;
