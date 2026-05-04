import { notFound } from "next/navigation";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { MOCK_PRODUCTS, formatProductPrice } from "@/data/mock-products";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";

export function generateStaticParams() {
  return MOCK_PRODUCTS.map((p) => ({ handle: p.handle }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; handle: string }>;
}) {
  const { locale, handle } = await params;
  setRequestLocale(locale);

  const product = MOCK_PRODUCTS.find((p) => p.handle === handle);
  if (!product) notFound();

  const currentLocale = await getLocale();
  const t = await getTranslations("Featured");
  const title = currentLocale === "ja" ? product.title.ja : product.title.en;
  const material = currentLocale === "ja" ? product.material.ja : product.material.en;
  const price = formatProductPrice(product, currentLocale);

  return (
    <article className="bg-ink py-16 md:py-24">
      <Container size="wide">
        <p className="text-haze mb-8 font-mono text-[10px] tracking-widest uppercase">
          <Link href="/" className="hover:text-bone">
            HOME
          </Link>
          <span className="mx-2">/</span>
          <Link href="/#new" className="hover:text-bone">
            NEW ARRIVALS
          </Link>
          <span className="mx-2">/</span>
          <span className="text-bone">{product.badgeNumber}</span>
        </p>

        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <div className="relative aspect-[4/5] overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${product.gradient[0]} 0%, ${product.gradient[1]} 100%)`,
                }}
              />
              <div className="noise absolute inset-0" aria-hidden />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-bone/85 text-[280px] leading-none tracking-tighter">
                  {product.badgeNumber}
                </span>
              </div>
              <div className="absolute right-6 bottom-6 left-6 flex items-end justify-between">
                <span className="text-bone/70 font-mono text-[10px] tracking-widest uppercase">
                  ARCHIVE / {product.era}
                </span>
                <span className="text-bone/70 font-mono text-[10px] tracking-widest uppercase">
                  {product.origin}
                </span>
              </div>
            </div>
          </div>

          <aside className="md:sticky md:top-32 md:col-span-5 md:self-start">
            <p className="text-acid font-mono text-[11px] tracking-widest uppercase">
              {product.available ? t("available") : t("outOfStock")} · {product.era}
            </p>
            <h1 className="font-display text-bone mt-3 text-3xl leading-[1.05] tracking-tighter md:text-4xl">
              {title}
            </h1>

            <dl className="text-bone mt-10 space-y-5 font-mono text-sm leading-relaxed tracking-tight">
              <Row label="ORIGIN" value={product.origin} />
              <Row label="MATERIAL" value={material} />
              <Row label="SIZE" value={product.size} />
              <Row label="ERA" value={product.era} />
            </dl>

            <p className="font-display text-bone mt-12 text-4xl leading-none tracking-tighter">
              {price}
            </p>

            <button
              type="button"
              disabled={!product.available}
              className="bg-acid text-ink hover:bg-acid-soft disabled:bg-fog disabled:text-haze mt-8 inline-flex h-14 w-full items-center justify-center gap-2 font-mono text-xs tracking-widest uppercase transition-colors disabled:cursor-not-allowed"
            >
              {product.available ? "Add to cart →" : t("outOfStock")}
            </button>

            <p className="text-haze mt-6 font-mono text-[10px] leading-relaxed tracking-widest uppercase">
              全世界配送 · 代金引換不可 · 返品 7 日以内
              <br />
              本商品はデモ表示です。実際の在庫ではありません。
            </p>
          </aside>
        </div>
      </Container>
    </article>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-bone/10 grid grid-cols-3 gap-4 border-b pb-4">
      <dt className="text-haze text-[10px] tracking-widest uppercase">{label}</dt>
      <dd className="col-span-2">{value}</dd>
    </div>
  );
}
