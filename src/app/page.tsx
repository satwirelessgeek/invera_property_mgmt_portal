import CosmicHero from "@/components/CosmicHero";
import ProductCategories from "@/components/ProductCategories";
import FeaturedProduct from "@/components/FeaturedProduct";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <main className="flex-grow">
        <CosmicHero />
        <ProductCategories />
        <FeaturedProduct />
      </main>
    </div>
  );
}