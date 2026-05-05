import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { BUTTER_PRODUCTS } from "../products";
import type { ButterContent } from "../content";
import { ButterProductCard } from "./ButterProductCard";

export function ButterFeaturedProducts({
  content,
  locale,
}: {
  content: ButterContent;
  locale: "ja" | "en";
}) {
  return (
    <section id="new" className="bg-bone relative py-24 md:py-32">
      <Container size="wide">
        <header className="mb-16 flex items-end justify-between gap-6">
          <div>
            <p className="text-acid font-mono text-[11px] tracking-widest uppercase">
              {content.featured.kicker}
            </p>
            <h2
              className="text-ink mt-3 max-w-3xl text-4xl leading-[0.95] tracking-tight md:text-6xl"
              style={{ fontFamily: "var(--font-display, Georgia, serif)" }}
            >
              {content.featured.heading}
            </h2>
          </div>
          <Link
            href="/butter-vintage#archive"
            className="text-graphite hover:text-acid hidden font-mono text-[11px] tracking-widest uppercase transition-colors md:inline-flex"
          >
            {content.featured.viewAll} →
          </Link>
        </header>

        <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {BUTTER_PRODUCTS.map((p) => (
            <ButterProductCard key={p.handle} product={p} locale={locale} content={content} />
          ))}
        </div>
      </Container>
    </section>
  );
}
