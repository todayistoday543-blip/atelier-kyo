import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { Link } from "@/i18n/navigation";

export async function FeaturedProducts() {
  const t = await getTranslations("Featured");

  return (
    <section id="new" className="bg-ink relative py-24 md:py-32">
      <Container size="wide">
        <header className="mb-16 flex items-end justify-between gap-6">
          <div>
            <p className="text-acid font-mono text-[11px] tracking-widest uppercase">
              {t("kicker")}
            </p>
            <h2 className="font-display text-bone mt-3 max-w-3xl text-4xl leading-[0.95] tracking-tighter md:text-6xl">
              {t("heading")}
            </h2>
          </div>
          <Link
            href="/#all"
            className="text-haze hover:text-acid hidden font-mono text-[11px] tracking-widest uppercase transition-colors md:inline-flex"
          >
            {t("viewAll")} →
          </Link>
        </header>

        <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_PRODUCTS.map((p) => (
            <ProductCard key={p.handle} product={p} />
          ))}
        </div>
      </Container>
    </section>
  );
}
