-- Full-text search for leads

alter table public.listing_leads
  add column if not exists search_vector tsvector generated always as (
    to_tsvector(
      'simple',
      coalesce(full_name, '') || ' ' ||
      coalesce(phone, '') || ' ' ||
      coalesce(email, '') || ' ' ||
      coalesce(message, '')
    )
  ) stored;

create index if not exists listing_leads_search_idx
  on public.listing_leads using gin (search_vector);
