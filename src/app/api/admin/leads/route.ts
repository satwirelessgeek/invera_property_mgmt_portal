import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/auth";

export async function GET(request: Request) {
  const { error } = await requireAdmin(request);
  if (error) {
    return NextResponse.json({ error }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const queryText = searchParams.get("q");
  const city = searchParams.get("city");
  const listing = searchParams.get("listing");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  let query = supabaseServer
    .from("listing_leads")
    .select(
      "id, full_name, phone, email, message, created_at, listings (id, title, city, state)"
    )
    .order("created_at", { ascending: false });

  if (queryText) {
    query = query.textSearch("search_vector", queryText, { type: "websearch" });
  }

  if (city) {
    query = query.ilike("listings.city", `%${city}%`);
  }

  if (listing) {
    query = query.ilike("listings.title", `%${listing}%`);
  }

  if (from) {
    query = query.gte("created_at", from);
  }

  if (to) {
    query = query.lte("created_at", to);
  }

  const { data, error: fetchError } = await query;

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  return NextResponse.json({ leads: data ?? [] });
}
