import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(request: Request) {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: "Missing Supabase service role key." },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const listingId = searchParams.get("listingId") ?? "";
  const formData = await request.formData();
  const fullName = String(formData.get("fullName") ?? "");
  const phone = String(formData.get("phone") ?? "");
  const email = String(formData.get("email") ?? "");
  const message = String(formData.get("message") ?? "");

  if (!listingId || !fullName || !phone || !message) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  const { data: listing } = await supabaseServer
    .from("listings")
    .select("id, status, title, city, state")
    .eq("id", listingId)
    .single();

  if (!listing || listing.status !== "approved") {
    return NextResponse.json(
      { error: "Listing not available." },
      { status: 404 }
    );
  }

  const { error } = await supabaseServer.from("listing_leads").insert({
    listing_id: listingId,
    full_name: fullName,
    phone,
    email,
    message,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const payload = {
    listingId,
    fullName,
    phone,
    email,
    message,
    listing: listing
      ? {
          title: listing.title ?? "",
          city: listing.city ?? "",
          state: listing.state ?? "",
        }
      : null,
  };

  if (process.env.EMAIL_WEBHOOK_URL) {
    await fetch(process.env.EMAIL_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }

  if (process.env.SMS_WEBHOOK_URL) {
    await fetch(process.env.SMS_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }
 
  if (process.env.WHATSAPP_WEBHOOK_URL) {
    const templateName = process.env.WHATSAPP_TEMPLATE_NAME ?? "";
    const language = process.env.WHATSAPP_TEMPLATE_LANGUAGE ?? "en";
    const whatsappPayload = templateName
      ? {
          type: "template",
          template: {
            name: templateName,
            language: { code: language },
            components: [
              {
                type: "body",
                parameters: [
                  { type: "text", text: fullName },
                  { type: "text", text: phone },
                  { type: "text", text: email || "N/A" },
                  {
                    type: "text",
                    text: listing?.title
                      ? `${listing.title} (${listing.city}, ${listing.state})`
                      : "Listing",
                  },
                  { type: "text", text: message },
                ],
              },
            ],
          },
          raw: payload,
        }
      : {
          type: "text",
          text: `New lead from ${fullName} (${phone}) for ${
            listing?.title ?? "listing"
          }. Message: ${message}`,
          raw: payload,
        };

    await fetch(process.env.WHATSAPP_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(whatsappPayload),
    });
  }

  const requestedWith = request.headers.get("x-requested-with");
  if (requestedWith === "fetch") {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.redirect(new URL(`/property/listings/${listingId}`, request.url));
}
