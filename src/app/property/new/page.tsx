import PropertyListingForm from "@/components/PropertyListingForm";

export default function NewPropertyPage() {
  return (
    <div className="min-h-screen bg-black">
      <section className="container mx-auto px-4 pb-16 pt-32">
        <div className="mb-8 max-w-2xl space-y-3">
          <h1 className="text-3xl font-semibold text-white">
            List your property
          </h1>
          <p className="text-sm text-muted-foreground">
            Upload images or videos, add details, and submit for admin review.
            Approved listings go live after membership activation.
          </p>
        </div>
        <PropertyListingForm />
      </section>
    </div>
  );
}
