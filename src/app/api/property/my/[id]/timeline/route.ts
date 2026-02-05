import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { getUserFromRequest } from "@/lib/supabase/auth";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { user, error } = await getUserFromRequest(request);
  if (error || !user) {
    return NextResponse.json({ error }, { status: 401 });
  }

  const listingId = params.id;
  const { data: listing, error: listingError } = await supabaseServer
    .from("listings")
    .select("id, owner_id")
    .eq("id", listingId)
    .single();

  if (listingError || !listing) {
    return NextResponse.json({ error: "Listing not found." }, { status: 404 });
  }

  if (listing.owner_id !== user.id) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { data, error: historyError } = await supabaseServer
    .from("listing_status_history")
    .select("id, status, note, created_at")
    .eq("listing_id", listingId)
    .order("created_at", { ascending: false });

  if (historyError) {
    return NextResponse.json({ error: historyError.message }, { status: 500 });
  }

  return NextResponse.json({ timeline: data ?? [] });
}
