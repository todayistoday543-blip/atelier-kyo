import { setRequestLocale } from "next-intl/server";
import { butterContent } from "@/clients/butter-vintage/content";
import { ButterHero } from "@/clients/butter-vintage/components/ButterHero";
import { ButterMarquee } from "@/clients/butter-vintage/components/ButterMarquee";
import { ButterFeaturedProducts } from "@/clients/butter-vintage/components/ButterFeaturedProducts";
import { ButterStory } from "@/clients/butter-vintage/components/ButterStory";
import { ButterCollections } from "@/clients/butter-vintage/components/ButterCollections";
import { ButterVisit } from "@/clients/butter-vintage/components/ButterVisit";
import { ButterNewsletter } from "@/clients/butter-vintage/components/ButterNewsletter";
import { routing, type Locale } from "@/i18n/routing";

export default async function ButterPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const safeLocale: Locale = routing.locales.includes(locale as Locale) ? (locale as Locale) : "ja";
  const c = butterContent[safeLocale];

  return (
    <>
      <ButterHero content={c} />
      <ButterMarquee items={c.marquee} />
      <ButterFeaturedProducts content={c} locale={safeLocale} />
      <ButterStory content={c} />
      <ButterCollections content={c} />
      <ButterVisit content={c} />
      <ButterNewsletter content={c} />
    </>
  );
}
