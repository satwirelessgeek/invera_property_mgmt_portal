import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabaseServer } from "@/lib/supabase/server";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

type Listing = {
  id: string;
  title: string;
  city: string;
  state: string;
  price: number;
  listing_type: string;
  property_type: string;
  status: string;
};

const FALLBACK_LISTINGS: Listing[] = [
  {
    id: "LIST-101",
    title: "2BHK Apartment in Andheri West",
    city: "Mumbai",
    state: "Maharashtra",
    price: 3500000,
    listing_type: "Buy",
    property_type: "Apartment",
    status: "verified",
  },
];

export default async function PropertyListingsPage() {
  let listings: Listing[] = FALLBACK_LISTINGS;

  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const { data, error } = await supabaseServer
      .from("listings")
      .select(
        "id, title, city, state, price, listing_type, property_type, status"
      )
      .eq("status", "approved")
      .order("created_at", { ascending: false });

    if (!error && data?.length) {
      listings = data as Listing[];
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <section className="container mx-auto px-4 pb-10 pt-32">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white">
              Explore verified listings
            </h1>
            <p className="text-sm text-muted-foreground">
              All prices shown in INR. Media is approved by admins before going
              live.
            </p>
          </div>
          <Button variant="outline">Filter listings</Button>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-24">
        <div className="grid gap-6 md:grid-cols-2">
          {listings.map((listing) => (
            <Card key={listing.id} className="border-border/50 bg-background/70">
              <CardContent className="space-y-3 p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{listing.listing_type}</Badge>
                  <Badge variant="secondary">{listing.property_type}</Badge>
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {listing.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {listing.city}, {listing.state}
                </p>
                <p className="text-2xl font-semibold text-white">
                  {formatCurrency(listing.price)}
                  {listing.listing_type === "Rent" ? (
                    <span className="text-sm text-muted-foreground"> / month</span>
                  ) : null}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild>
                    <Link href={`/property/listings/${listing.id}`}>
                      View details
                    </Link>
                  </Button>
                  <Button variant="outline">Contact owner</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
