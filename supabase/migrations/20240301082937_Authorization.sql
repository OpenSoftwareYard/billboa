create schema private;

create table
  members (
    company_id bigint references companies,
    user_id uuid references auth.users
  );

-- Enable RLS
alter table companies enable row level security;
alter table members enable row level security;

-- Security definer function
create function private.get_companies_for_authenticated_user()
returns setof bigint
language sql
security definer
set search_path = public
stable
as $$
  select company_id
  from members
  where user_id = auth.uid();
$$;

-- Policy for companies
create policy "Team members can update team members if they belong to the same company"
on members
for all using (
  company_id in (
    select
      private.get_companies_for_authenticated_user()
  )
);

create policy "Team members can update company details if they belong to the company"
on companies
for all using (
  id in (
    select
      private.get_companies_for_authenticated_user()
  )
);

-- Policy for clients
alter table clients enable row level security;

create policy "Team members can update client details if they belong to the company"
on clients
for all using (
  company_id in (
    select
      private.get_companies_for_authenticated_user()
  )
);

-- Policy for invoices
alter table invoices enable row level security;

create policy "Team members can update invoices if they belong to the company"
on invoices
for all using (
  company_id in (
    select
      private.get_companies_for_authenticated_user()
  )
);

-- Policy for products
alter table products enable row level security;

create policy "Team members can update products if they belong to the company"
on products
for all using (
  company_id in (
    select
      private.get_companies_for_authenticated_user()
  )
);

-- Policy for invoices_products
alter table invoices_products enable row level security;

create policy "Team members can update invoices_products if they belong to the company"
on invoices_products
for all using (
  invoice_id in (
    select
      id
    from invoices
    where company_id in (
      select
        private.get_companies_for_authenticated_user()
    )
  )
);
