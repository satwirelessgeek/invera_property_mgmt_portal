import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabaseServer } from "@/lib/supabase/server";
import HomeListings, { ListingPreview } from "@/components/HomeListings";

const FALLBACK_LISTINGS: ListingPreview[] = [
  {
    id: "LIST-101",
    title: "2BHK Apartment in Andheri West",
    city: "Mumbai",
    state: "Maharashtra",
    price: 3500000,
    listing_type: "Buy",
    property_type: "Apartment",
  },
  {
    id: "LIST-202",
    title: "3BHK Independent Home in Indiranagar",
    city: "Bengaluru",
    state: "Karnataka",
    price: 65000,
    listing_type: "Rent",
    property_type: "House",
  },
  {
    id: "LIST-303",
    title: "Studio Near Cyber Hub",
    city: "Gurugram",
    state: "Haryana",
    price: 24000,
    listing_type: "Rent",
    property_type: "Studio",
  },
  {
    id: "LIST-404",
    title: "Plot in Whitefield",
    city: "Bengaluru",
    state: "Karnataka",
    price: 7800000,
    listing_type: "Buy",
    property_type: "Plot",
  },
  {
    id: "LIST-505",
    title: "2BHK Furnished Apartment in HSR Layout",
    city: "Bengaluru",
    state: "Karnataka",
    price: 42000,
    listing_type: "Rent",
    property_type: "Apartment",
  },
  {
    id: "LIST-606",
    title: "3BHK Villa in Jubilee Hills",
    city: "Hyderabad",
    state: "Telangana",
    price: 18500000,
    listing_type: "Buy",
    property_type: "Villa",
  },
];

export default async function Home() {
  let listings: ListingPreview[] = FALLBACK_LISTINGS;

  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const { data, error } = await supabaseServer
      .from("listings")
      .select("id, title, city, state, price, listing_type, property_type")
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(12);

    if (!error && data?.length) {
      listings = data as ListingPreview[];
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <main className="flex-grow">
        <section className="container mx-auto px-4 pb-16 pt-32">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <Badge className="rounded-full">Verified property marketplace</Badge>
              <h1 className="text-4xl font-semibold text-white md:text-5xl">
                Buy, rent, and list properties with confidence.
              </h1>
              <p className="text-base text-muted-foreground">
                Browse admin-reviewed listings, connect with owners, and list
                your property with photo and video uploads.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild>
                  <Link href="/property/listings">Browse listings</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/property/new">List a property</Link>
                </Button>
              </div>
            </div>
            <Card className="border-border/50 bg-background/70">
              <CardContent className="space-y-4 p-6">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Admin-reviewed media
                  </p>
                  <p className="text-2xl font-semibold text-white">
                    Verified listings only
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Membership enabled
                  </p>
                  <p className="text-2xl font-semibold text-white">
                    List faster with approvals
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    INR-first pricing
                  </p>
                  <p className="text-2xl font-semibold text-white">
                    Localized for India
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <HomeListings listings={listings} />
      </main>
    </div>
  );
}