import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { BrandStory } from "@/components/sections/BrandStory";
import { Collections } from "@/components/sections/Collections";
import { VisitUs } from "@/components/sections/VisitUs";
import { Newsletter } from "@/components/sections/Newsletter";
import { setRequestLocale } from "next-intl/server";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedProducts />
      <BrandStory />
      <Collections />
      <VisitUs />
      <Newsletter />
    </>
  );
}
