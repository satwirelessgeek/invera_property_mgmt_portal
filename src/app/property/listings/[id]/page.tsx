import { supabaseServer } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PublicLeadForm from "@/components/PublicLeadForm";

type Props = {
  params: { id: string };
};

export default async function PublicListingDetailPage({ params }: Props) {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return (
      <div className="min-h-screen bg-black">
        <section className="container mx-auto px-4 pb-24 pt-32">
          <p className="text-sm text-muted-foreground">
            Listing details are unavailable without server configuration.
          </p>
        </section>
      </div>
    );
  }

  const listingId = params.id;
  const { data: listing } = await supabaseServer
    .from("listings")
    .select("*")
    .eq("id", listingId)
    .eq("status", "approved")
    .single();

  if (!listing) {
    return (
      <div className="min-h-screen bg-black">
        <section className="container mx-auto px-4 pb-24 pt-32">
          <p className="text-sm text-muted-foreground">
            Listing not found or not approved.
          </p>
        </section>
      </div>
    );
  }

  const { data: media } = await supabaseServer
    .from("listing_media")
    .select("id, file_name, content_type, path, caption")
    .eq("listing_id", listingId)
    .eq("status", "approved")
    .order("display_order", { ascending: true });

  const signedMedia = [];
  for (const item of media ?? []) {
    const { data: signed } = await supabaseServer.storage
      .from("property-media")
      .createSignedUrl(item.path, 60 * 60);
    if (signed?.signedUrl) {
      signedMedia.push({ ...item, url: signed.signedUrl });
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <section className="container mx-auto px-4 pb-10 pt-32">
        <Card className="border-border/50 bg-background/70">
          <CardHeader>
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{listing.listing_type}</Badge>
              <Badge variant="secondary">{listing.property_type}</Badge>
            </div>
            <CardTitle className="text-2xl">{listing.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {listing.address}, {listing.city}, {listing.state}
            </p>
          </CardHeader>
          <CardContent className="grid gap-3">
            <p className="text-sm text-muted-foreground">{listing.description}</p>
            <p className="text-lg font-semibold text-white">
              ₹{Number(listing.price ?? 0).toLocaleString("en-IN")}
              {listing.listing_type === "Rent" ? " / month" : ""}
            </p>
          </CardContent>
        </Card>
      </section>
      <section className="container mx-auto px-4 pb-24">
        <h2 className="mb-4 text-xl font-semibold text-white">Media gallery</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {signedMedia.map((item) => (
            <Card key={item.id} className="border-border/50 bg-background/70">
              <CardContent className="grid gap-3 p-4">
                <Badge variant="secondary">{item.file_name}</Badge>
                {item.content_type.startsWith("video") ? (
                  <video controls className="w-full rounded-md">
                    <source src={item.url} />
                  </video>
                ) : (
                  <img
                    src={item.url}
                    alt={item.file_name}
                    className="w-full rounded-md object-cover"
                  />
                )}
                  {item.caption ? (
                    <p className="text-sm text-muted-foreground">
                      {item.caption}
                    </p>
                  ) : null}
              </CardContent>
            </Card>
          ))}
          {signedMedia.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Media is pending approval.
            </p>
          ) : null}
        </div>
      </section>
      <section className="container mx-auto px-4 pb-24">
        <h2 className="mb-4 text-xl font-semibold text-white">Contact owner</h2>
        <Card className="border-border/50 bg-background/70">
          <CardContent className="grid gap-3 p-6">
            <PublicLeadForm listingId={listingId} />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
