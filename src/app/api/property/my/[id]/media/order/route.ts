import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { getUserFromRequest } from "@/lib/supabase/auth";

type OrderPayload = {
  order: string[];
};

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { user, error } = await getUserFromRequest(request);
  if (error || !user) {
    return NextResponse.json({ error }, { status: 401 });
  }

  const listingId = params.id;
  const payload = (await request.json()) as OrderPayload;
  const order = payload.order ?? [];

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

  for (let index = 0; index < order.length; index += 1) {
    const mediaId = order[index];
    await supabaseServer
      .from("listing_media")
      .update({ display_order: index })
      .eq("id", mediaId)
      .eq("listing_id", listingId);
  }

  return NextResponse.json({ ok: true });
}
