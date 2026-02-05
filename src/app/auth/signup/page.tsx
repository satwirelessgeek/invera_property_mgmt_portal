import SignupForm from "@/components/SignupForm";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-black">
      <section className="container mx-auto px-4 pb-16 pt-32">
        <div className="mb-8 max-w-2xl space-y-3">
          <h1 className="text-3xl font-semibold text-white">
            Sign up for Invera Property
          </h1>
          <p className="text-sm text-muted-foreground">
            Create your username using mobile number and email ID. We will
            verify both before activating your account.
          </p>
        </div>
        <SignupForm />
      </section>
    </div>
  );
}
