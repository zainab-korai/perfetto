-- Run this once in Supabase Dashboard -> SQL Editor -> New query -> Run

create extension if not exists "pgcrypto";

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  tagline text not null default '',
  price integer not null,
  sale_price integer,
  categories text[] not null default '{}',
  images text[] not null default '{}',
  description text not null default '',
  highlights text[] not null default '{}',
  how_to_use text,
  unit text not null default '',
  stock integer not null default 0,
  featured boolean not null default false,
  badge text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists orders (
  id text primary key,
  created_at timestamptz not null default now(),
  customer jsonb not null,
  items jsonb not null,
  subtotal integer not null,
  shipping integer not null,
  total integer not null,
  payment_method text not null default 'COD',
  status text not null default 'pending'
);

-- Row Level Security: enabled with NO policies, so the public/anon key
-- (if it ever leaks) cannot read or write anything. The app's server
-- code uses the secret key, which bypasses RLS entirely.
alter table products enable row level security;
alter table orders enable row level security;

-- Atomic stock decrement, called after an order is placed.
create or replace function decrement_product_stock(p_id uuid, p_qty integer)
returns void
language sql
security definer
set search_path = public
as $$
  update products
  set stock = greatest(stock - p_qty, 0), updated_at = now()
  where id = p_id;
$$;

-- Storage bucket for product images, publicly readable.
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;
