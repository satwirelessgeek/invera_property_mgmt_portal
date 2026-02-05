import AdminReviewQueue from "@/components/AdminReviewQueue";
import AdminGuard from "@/components/AdminGuard";

export default function AdminReviewPage() {
  return (
    <div className="min-h-screen bg-black">
      <section className="container mx-auto px-4 pb-10 pt-32">
        <div className="max-w-2xl space-y-3">
          <h1 className="text-3xl font-semibold text-white">
            Media approval queue
          </h1>
          <p className="text-sm text-muted-foreground">
            Review property images and videos before publishing to the
            marketplace.
          </p>
        </div>
      </section>
      <section className="container mx-auto px-4 pb-24">
        <AdminGuard>
          <AdminReviewQueue />
        </AdminGuard>
      </section>
    </div>
  );
}
