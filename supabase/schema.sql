-- Supabase schema for property marketplace

create table if not exists public.profiles (
  id uuid primary key,
  full_name text,
  username text unique,
  phone text,
  email text,
  role text default 'user',
  created_at timestamptz default now()
);

create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.profiles(id) on delete set null,
  listing_type text not null,
  property_type text not null,
  title text not null,
  price numeric,
  deposit numeric,
  state text,
  city text,
  pincode text,
  address text,
  description text,
  amenities text,
  contact_name text,
  contact_phone text,
  contact_email text,
  status text default 'pending',
  created_at timestamptz default now()
);

create table if not exists public.listing_media (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references public.listings(id) on delete cascade,
  path text not null,
  file_name text,
  content_type text,
  display_order integer default 0,
  caption text,
  status text default 'pending',
  created_at timestamptz default now()
);

create table if not exists public.listing_status_history (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references public.listings(id) on delete cascade,
  status text not null,
  note text,
  created_at timestamptz default now()
);

create table if not exists public.listing_leads (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references public.listings(id) on delete cascade,
  full_name text,
  phone text,
  email text,
  message text,
  created_at timestamptz default now()
);

create table if not exists public.memberships (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade,
  plan_name text,
  status text default 'pending',
  razorpay_order_id text,
  created_at timestamptz default now()
);
