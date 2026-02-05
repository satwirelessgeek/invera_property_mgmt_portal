import AdminGuard from "@/components/AdminGuard";
import AdminLeadsDashboard from "@/components/AdminLeadsDashboard";

export default function AdminLeadsPage() {
  return (
    <div className="min-h-screen bg-black">
      <section className="container mx-auto px-4 pb-10 pt-32">
        <div className="max-w-2xl space-y-3">
          <h1 className="text-3xl font-semibold text-white">Lead inbox</h1>
          <p className="text-sm text-muted-foreground">
            Review inquiries submitted by buyers and renters.
          </p>
        </div>
      </section>
      <section className="container mx-auto px-4 pb-24">
        <AdminGuard>
          <AdminLeadsDashboard />
        </AdminGuard>
      </section>
    </div>
  );
}
