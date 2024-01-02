create table invoices (
  id bigint primary key generated always as identity,
  client_id bigint not null references clients(id),
  company_id bigint not null references companies(id),
  invoice_number text not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  date timestamp with time zone not null,
  due_date timestamp with time zone not null,
  total_amount numeric(10,2) not null,
  status text not null,
  currency text not null,
  exchange_rate numeric(10,2) not null default 1.0
);

create table products (
  id bigint primary key generated always as identity,
  company_id bigint not null references companies(id),
  name text not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  description text not null,
  price numeric(10,2) not null,
  currency text not null
);

create table invoices_products (
  invoice_id bigint not null references invoices(id) on delete cascade,
  product_id bigint not null references products(id) on delete cascade,
  primary key (invoice_id, product_id),
  quantity numeric(10,2) not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);
