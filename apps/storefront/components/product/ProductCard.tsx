import { type Product, formatProductPrice } from "@/data/mock-products";
import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function ProductCard({ product }: { product: Product }) {
  const locale = await getLocale();
  const t = await getTranslations("Featured");

  const title = locale === "ja" ? product.title.ja : product.title.en;
  const material = locale === "ja" ? product.material.ja : product.material.en;
  const price = formatProductPrice(product, locale);

  return (
    <Link href={`/products/${product.handle}`} className="group relative flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]"
          style={{
            backgroundImage: `linear-gradient(135deg, ${product.gradient[0]} 0%, ${product.gradient[1]} 100%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.7'/%3E%3C/svg%3E\")",
          }}
          aria-hidden
        />

        <div className="absolute inset-0 flex items-end justify-between p-5">
          <span className="font-display text-bone/90 text-[80px] leading-none tracking-tighter md:text-[100px]">
            {product.badgeNumber}
          </span>
          <span className="text-bone/60 font-mono text-[10px] tracking-widest uppercase">
            {product.era}
          </span>
        </div>

        <div className="border-bone/30 text-bone group-hover:bg-acid group-hover:text-ink absolute top-3 right-3 flex h-8 items-center justify-center border px-3 font-mono text-[10px] tracking-widest uppercase backdrop-blur-sm transition-colors">
          {product.available ? t("available") : t("outOfStock")}
        </div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-bone group-hover:text-acid text-base leading-snug font-medium tracking-tight transition-colors">
            {title}
          </h3>
          <p className="text-haze mt-1.5 font-mono text-[10px] tracking-widest uppercase">
            {product.origin} · {material} · {product.size}
          </p>
        </div>
        <p className="text-bone shrink-0 text-right font-mono text-sm tracking-tight tabular-nums">
          {price}
        </p>
      </div>
    </Link>
  );
}
