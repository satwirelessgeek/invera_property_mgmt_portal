import MembershipPlans from "@/components/MembershipPlans";
import Script from "next/script";

export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-black">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <section className="container mx-auto px-4 pb-10 pt-32">
        <div className="max-w-2xl space-y-3">
          <h1 className="text-3xl font-semibold text-white">
            Choose your membership
          </h1>
          <p className="text-sm text-muted-foreground">
            Membership is required to publish listings. Payments are processed
            in INR for the India market.
          </p>
        </div>
      </section>
      <section className="container mx-auto px-4 pb-24">
        <MembershipPlans />
      </section>
    </div>
  );
}
