create table clients (
  id bigint primary key generated always as identity,
  company_id bigint not null references companies(id),
  name text not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  address text not null,
  city text not null,
  state text not null,
  country text not null,
  company_number text not null,
  vat_number text not null
);
