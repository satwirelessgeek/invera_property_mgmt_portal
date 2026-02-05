import MyListingEdit from "@/components/MyListingEdit";

type Props = {
  params: { id: string };
};

export default function MyListingEditPage({ params }: Props) {
  return (
    <div className="min-h-screen bg-black">
      <section className="container mx-auto px-4 pb-10 pt-32">
        <div className="max-w-2xl space-y-3">
          <h1 className="text-3xl font-semibold text-white">
            Edit your listing
          </h1>
          <p className="text-sm text-muted-foreground">
            Update details and resubmit for approval.
          </p>
        </div>
      </section>
      <section className="container mx-auto px-4 pb-24">
        <MyListingEdit listingId={params.id} />
      </section>
    </div>
  );
}
