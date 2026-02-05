import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black">
      <section className="container mx-auto px-4 pb-16 pt-32">
        <div className="mb-8 max-w-2xl space-y-3">
          <h1 className="text-3xl font-semibold text-white">Log in</h1>
          <p className="text-sm text-muted-foreground">
            Sign in using password or OTP to manage your property listings.
          </p>
        </div>
        <LoginForm />
      </section>
    </div>
  );
}
