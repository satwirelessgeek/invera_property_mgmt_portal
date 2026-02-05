import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const FEATURES = [
  {
    title: "Buy or rent verified homes",
    description:
      "Property media is reviewed by admins before it goes live to keep listings authentic.",
  },
  {
    title: "INR pricing for India",
    description:
      "All membership fees and property prices are shown in Indian Rupees.",
  },
  {
    title: "Phone + email onboarding",
    description:
      "Users can create a username using mobile number and email ID.",
  },
];

export default function PropertyPage() {
  return (
    <div className="min-h-screen bg-black">
      <section className="container mx-auto px-4 pb-16 pt-32">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <Badge className="rounded-full">India property marketplace</Badge>
            <h1 className="text-4xl font-semibold text-white md:text-5xl">
              Buy, rent, and list properties with admin-reviewed media.
            </h1>
            <p className="text-base text-muted-foreground">
              Create an account using your mobile number and email, subscribe
              to a membership plan, and list properties with photo and video
              uploads. Admins approve media before publishing.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <Link href="/property/listings">Browse listings</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/property/new">List a property</Link>
              </Button>
            </div>
          </div>
          <Card className="border-border/50 bg-background/70">
            <CardContent className="space-y-4 p-6">
              <div>
                <p className="text-sm text-muted-foreground">Active users</p>
                <p className="text-3xl font-semibold text-white">12,500+</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Verified listings</p>
                <p className="text-3xl font-semibold text-white">3,200+</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cities covered</p>
                <p className="text-3xl font-semibold text-white">40+</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <Card key={feature.title} className="border-border/50 bg-background/70">
              <CardContent className="space-y-2 p-6">
                <h3 className="text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
