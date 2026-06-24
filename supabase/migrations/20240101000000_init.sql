-- Savannah Paths — initial schema

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  full_name text not null,
  phone text not null,
  email text,
  service text not null,
  destination text,
  travel_month text,
  source text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  status text default 'new',
  notes text
);

-- Indexes for common dashboard sort/filter operations
create index leads_created_at_idx on leads (created_at desc);
create index leads_status_idx on leads (status);
create index leads_source_idx on leads (source);
create index leads_utm_source_idx on leads (utm_source);

-- Row-level security: service role bypasses; anon cannot read leads
alter table leads enable row level security;

-- Allow the API (service role) to insert leads from the public form
create policy "service_role_all" on leads
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- Authenticated admin users can read/update (single operator account)
create policy "authenticated_select" on leads
  for select
  to authenticated
  using (true);

create policy "authenticated_update" on leads
  for update
  to authenticated
  using (true)
  with check (true);
