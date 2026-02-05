import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { getUserFromRequest } from "@/lib/supabase/auth";

const BUCKET = "property-media";

export async function GET() {
  const { data, error } = await supabaseServer
    .from("listings")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ listings: data ?? [] });
}

export async function POST(request: Request) {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: "Missing Supabase service role key." },
      { status: 500 }
    );
  }

  const { user, error: authError } = await getUserFromRequest(request);
  if (authError || !user) {
    return NextResponse.json({ error: authError }, { status: 401 });
  }

  const formData = await request.formData();
  const mediaFiles = formData.getAll("media").filter((item) => item instanceof File);

  const listing = {
    owner_id: user.id,
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

  if (!listing.title || !listing.city || !listing.contact_phone) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  const { data: inserted, error: listingError } = await supabaseServer
    .from("listings")
    .insert(listing)
    .select("id")
    .single();

  if (listingError || !inserted) {
    return NextResponse.json(
      { error: listingError?.message ?? "Failed to create listing." },
      { status: 500 }
    );
  }

  const listingId = inserted.id as string;

  await supabaseServer.from("listing_status_history").insert({
    listing_id: listingId,
    status: "pending",
    note: "Listing submitted.",
  });

  const uploadedMedia = [];

  for (const file of mediaFiles as File[]) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = `listings/${listingId}/${file.name}`;
    const { error: uploadError } = await supabaseServer.storage
      .from(BUCKET)
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

  return NextResponse.json({ ok: true, listingId });
}
