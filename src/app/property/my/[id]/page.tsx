import MyListingDetail from "@/components/MyListingDetail";

type Props = {
  params: { id: string };
};

export default function MyListingDetailPage({ params }: Props) {
  return (
    <div className="min-h-screen bg-black">
      <section className="container mx-auto px-4 pb-10 pt-32">
        <div className="max-w-2xl space-y-3">
          <h1 className="text-3xl font-semibold text-white">Listing details</h1>
          <p className="text-sm text-muted-foreground">
            Preview your listing and uploaded media.
          </p>
        </div>
      </section>
      <section className="container mx-auto px-4 pb-24">
        <MyListingDetail listingId={params.id} />
      </section>
    </div>
  );
}
