-- Enable RLS
alter table public.profiles enable row level security;
alter table public.listings enable row level security;
alter table public.listing_media enable row level security;
alter table public.memberships enable row level security;
alter table public.listing_status_history enable row level security;
alter table public.listing_leads enable row level security;

-- Profiles policies
create policy "Profiles view own record"
on public.profiles
for select
using (auth.uid() = id);

create policy "Profiles update own record"
on public.profiles
for update
using (auth.uid() = id);

-- Listings policies
create policy "Listings public view approved"
on public.listings
for select
using (status = 'approved');

create policy "Listings insert by owner"
on public.listings
for insert
with check (auth.uid() = owner_id);

create policy "Listings update by admin"
on public.listings
for update
using (
  exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
);

-- Listing media policies
create policy "Listing media view approved"
on public.listing_media
for select
using (status = 'approved');

create policy "Listing media insert by owner"
on public.listing_media
for insert
with check (
  exists (
    select 1 from public.listings
    where id = listing_id and owner_id = auth.uid()
  )
);

create policy "Listing media update by admin"
on public.listing_media
for update
using (
  exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
);

-- Memberships policies
create policy "Memberships view own"
on public.memberships
for select
using (auth.uid() = profile_id);

create policy "Memberships insert own"
on public.memberships
for insert
with check (auth.uid() = profile_id);

create policy "Memberships update by admin"
on public.memberships
for update
using (
  exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
);

-- Listing status history policies
create policy "Listing history view by owner"
on public.listing_status_history
for select
using (
  exists (
    select 1 from public.listings
    where listings.id = listing_status_history.listing_id
      and listings.owner_id = auth.uid()
  )
);

create policy "Listing history view by admin"
on public.listing_status_history
for select
using (
  exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
);

-- Listing leads policies
create policy "Listing leads view by owner"
on public.listing_leads
for select
using (
  exists (
    select 1 from public.listings
    where listings.id = listing_leads.listing_id
      and listings.owner_id = auth.uid()
  )
);

create policy "Listing leads view by admin"
on public.listing_leads
for select
using (
  exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
);
