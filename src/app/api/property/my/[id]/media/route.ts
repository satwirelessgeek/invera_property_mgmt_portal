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

  const { data: media, error: mediaError } = await supabaseServer
    .from("listing_media")
    .select("id, file_name, content_type, path, status, caption")
    .eq("listing_id", listingId)
    .order("display_order", { ascending: true });

  if (mediaError) {
    return NextResponse.json({ error: mediaError.message }, { status: 500 });
  }

  const signedMedia = [];

  for (const item of media ?? []) {
    const { data: signed, error: signedError } = await supabaseServer.storage
      .from("property-media")
      .createSignedUrl(item.path, 60 * 60);

    if (signedError) {
      continue;
    }

    signedMedia.push({
      id: item.id,
      file_name: item.file_name,
      content_type: item.content_type,
      status: item.status,
      url: signed.signedUrl,
    });
  }

  return NextResponse.json({ media: signedMedia });
}
