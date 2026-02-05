import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/auth";

type ReviewPayload = {
  mediaId: string;
  status: "approved" | "changes_requested" | "rejected";
};

export async function GET(request: Request) {
  const { error: adminError } = await requireAdmin(request);
  if (adminError) {
    return NextResponse.json({ error: adminError }, { status: 401 });
  }

  const { data, error } = await supabaseServer
    .from("listing_media")
    .select(
      "id, file_name, content_type, status, listings (id, title, city, state, contact_name)"
    )
    .eq("status", "pending")
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ queue: data ?? [] });
}

export async function POST(request: Request) {
  const { error: adminError } = await requireAdmin(request);
  if (adminError) {
    return NextResponse.json({ error: adminError }, { status: 401 });
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: "Missing Supabase service role key." },
      { status: 500 }
    );
  }

  const payload = (await request.json()) as ReviewPayload;
  const { mediaId, status } = payload;

  if (!mediaId || !status) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseServer
    .from("listing_media")
    .update({ status })
    .eq("id", mediaId)
    .select("listing_id")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const listingId = data?.listing_id;

  if (listingId && (status === "changes_requested" || status === "rejected")) {
    await supabaseServer
      .from("listings")
      .update({ status })
      .eq("id", listingId);

    await supabaseServer.from("listing_status_history").insert({
      listing_id: listingId,
      status,
      note:
        status === "rejected"
          ? "Media rejected by admin."
          : "Changes requested on media.",
    });
  }

  if (listingId && status === "approved") {
    const { data: remaining, error: remainingError } = await supabaseServer
      .from("listing_media")
      .select("id")
      .eq("listing_id", listingId)
      .neq("status", "approved");

    if (!remainingError && (remaining?.length ?? 0) === 0) {
      await supabaseServer
        .from("listings")
        .update({ status: "approved" })
        .eq("id", listingId);

      await supabaseServer.from("listing_status_history").insert({
        listing_id: listingId,
        status: "approved",
        note: "All media approved.",
      });
    }
  }

  return NextResponse.json({ ok: true });
}
