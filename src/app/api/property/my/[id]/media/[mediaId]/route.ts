import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { getUserFromRequest } from "@/lib/supabase/auth";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string; mediaId: string } }
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

  const { data: media, error: mediaError } = await supabaseServer
    .from("listing_media")
    .select("id, path")
    .eq("id", params.mediaId)
    .eq("listing_id", listingId)
    .single();

  if (mediaError || !media) {
    return NextResponse.json({ error: "Media not found." }, { status: 404 });
  }

  await supabaseServer.storage
    .from("property-media")
    .remove([media.path]);

  await supabaseServer.from("listing_media").delete().eq("id", media.id);

  await supabaseServer.from("listing_status_history").insert({
    listing_id: listingId,
    status: "pending",
    note: "Media removed by owner.",
  });

  return NextResponse.json({ ok: true });
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string; mediaId: string } }
) {
  const { user, error } = await getUserFromRequest(request);
  if (error || !user) {
    return NextResponse.json({ error }, { status: 401 });
  }

  const listingId = params.id;
  const payload = (await request.json()) as { caption?: string };

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

  const { error: updateError } = await supabaseServer
    .from("listing_media")
    .update({ caption: payload.caption ?? "" })
    .eq("id", params.mediaId)
    .eq("listing_id", listingId);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
