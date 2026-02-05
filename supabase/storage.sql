-- Storage policies for property media

alter table storage.objects enable row level security;

create policy "Property media view approved"
on storage.objects
for select
using (
  bucket_id = 'property-media'
  and exists (
    select 1
    from public.listing_media
    where listing_media.path = storage.objects.name
      and listing_media.status = 'approved'
  )
);

create policy "Property media insert by owner"
on storage.objects
for insert
with check (
  bucket_id = 'property-media'
  and exists (
    select 1
    from public.listings
    where listings.id::text = split_part(storage.objects.name, '/', 2)
      and listings.owner_id = auth.uid()
  )
);

create policy "Property media update by owner"
on storage.objects
for update
using (
  bucket_id = 'property-media'
  and exists (
    select 1
    from public.listings
    where listings.id::text = split_part(storage.objects.name, '/', 2)
      and listings.owner_id = auth.uid()
  )
);
