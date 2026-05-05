import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DemoBanner } from "@/components/layout/DemoBanner";
import { setRequestLocale } from "next-intl/server";

export default async function ArchiveLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="bg-ink text-bone selection:bg-acid selection:text-ink min-h-screen">
      <DemoBanner />
      <Header />
      <main className="flex min-h-screen flex-col">{children}</main>
      <Footer />
    </div>
  );
}
