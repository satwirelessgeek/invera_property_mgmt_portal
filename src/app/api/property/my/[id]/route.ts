import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { getUserFromRequest } from "@/lib/supabase/auth";

export async function DELETE(
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

  const { data: media } = await supabaseServer
    .from("listing_media")
    .select("path")
    .eq("listing_id", listingId);

  if (media?.length) {
    await supabaseServer.storage
      .from("property-media")
      .remove(media.map((item) => item.path));
  }

  await supabaseServer.from("listing_media").delete().eq("listing_id", listingId);
  await supabaseServer.from("listings").delete().eq("id", listingId);

  return NextResponse.json({ ok: true });
}

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
    .select("*")
    .eq("id", listingId)
    .single();

  if (listingError || !listing) {
    return NextResponse.json({ error: "Listing not found." }, { status: 404 });
  }

  if (listing.owner_id !== user.id) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  return NextResponse.json({ listing });
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { user, error } = await getUserFromRequest(request);
  if (error || !user) {
    return NextResponse.json({ error }, { status: 401 });
  }

  const listingId = params.id;
  const formData = await request.formData();
  const mediaFiles = formData.getAll("media").filter((item) => item instanceof File);

  const updated = {
    listing_type: String(formData.get("listingType") ?? ""),
    property_type: String(formData.get("propertyType") ?? ""),
    title: String(formData.get("title") ?? ""),
    price: Number(formData.get("price") ?? 0),
    deposit: Number(formData.get("deposit") ?? 0),
    state: String(formData.get("state") ?? ""),
    city: String(formData.get("city") ?? ""),
    pincode: String(formData.get("pincode") ?? ""),
    address: String(formData.get("address") ?? ""),
    description: String(formData.get("description") ?? ""),
    amenities: String(formData.get("amenities") ?? ""),
    contact_name: String(formData.get("contactName") ?? ""),
    contact_phone: String(formData.get("contactPhone") ?? ""),
    contact_email: String(formData.get("contactEmail") ?? ""),
    status: "pending",
  };

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
    .from("listings")
    .update(updated)
    .eq("id", listingId);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  await supabaseServer.from("listing_status_history").insert({
    listing_id: listingId,
    status: "pending",
    note: "Listing updated and resubmitted.",
  });

  if (mediaFiles.length) {
    const uploadedMedia = [];
    for (const file of mediaFiles as File[]) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filePath = `listings/${listingId}/${file.name}`;
      const { error: uploadError } = await supabaseServer.storage
        .from("property-media")
        .upload(filePath, buffer, {
          contentType: file.type,
          upsert: true,
        });

      if (uploadError) {
        return NextResponse.json(
          { error: uploadError.message },
          { status: 500 }
        );
      }

      uploadedMedia.push({
        listing_id: listingId,
        path: filePath,
        file_name: file.name,
        content_type: file.type,
        status: "pending",
      });
    }

    if (uploadedMedia.length) {
      const { error: mediaError } = await supabaseServer
        .from("listing_media")
        .insert(uploadedMedia);

      if (mediaError) {
        return NextResponse.json(
          { error: mediaError.message },
          { status: 500 }
        );
      }
    }
  }

  return NextResponse.json({ ok: true });
}
