import MyListingsDashboard from "@/components/MyListingsDashboard";

export default function MyListingsPage() {
  return (
    <div className="min-h-screen bg-black">
      <section className="container mx-auto px-4 pb-10 pt-32">
        <div className="max-w-2xl space-y-3">
          <h1 className="text-3xl font-semibold text-white">My Listings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your property listings and review approval status.
          </p>
        </div>
      </section>
      <section className="container mx-auto px-4 pb-24">
        <MyListingsDashboard />
      </section>
    </div>
  );
}
