import { Yeseva_One, EB_Garamond } from "next/font/google";
import type { Metadata } from "next";
import { butterContent } from "@/clients/butter-vintage/content";
import { ButterHeader } from "@/clients/butter-vintage/components/ButterHeader";
import { ButterFooter } from "@/clients/butter-vintage/components/ButterFooter";
import { ButterDemoBanner } from "@/clients/butter-vintage/components/ButterDemoBanner";
import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";

const yesevaOne = Yeseva_One({
  variable: "--font-yeseva",
  subsets: ["latin"],
  weight: "400",
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale: "ja" | "en" = locale === "en" ? "en" : "ja";
  const c = butterContent[safeLocale];
  return {
    title: c.meta.title,
    description: c.meta.description,
    openGraph: {
      title: c.meta.title,
      description: c.meta.description,
      type: "website",
    },
  };
}

export default async function ButterLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const safeLocale: Locale = routing.locales.includes(locale as Locale) ? (locale as Locale) : "ja";
  const c = butterContent[safeLocale];

  return (
    <div
      data-theme="butter"
      className={`${yesevaOne.variable} ${ebGaramond.variable} bg-bone text-ink min-h-screen`}
      style={{
        // CSS variable overrides scoped to the butter sub-tree
        ["--font-display" as string]: "var(--font-yeseva), Georgia, serif",
        ["--font-sans" as string]: "var(--font-eb-garamond), Georgia, serif",
      }}
    >
      <ButterDemoBanner content={c} />
      <ButterHeader content={c} />
      <main className="flex flex-col">{children}</main>
      <ButterFooter content={c} />
    </div>
  );
}
