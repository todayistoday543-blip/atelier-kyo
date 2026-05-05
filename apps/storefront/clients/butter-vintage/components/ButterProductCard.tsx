import { type ButterProduct, formatButterPrice } from "../products";
import type { ButterContent } from "../content";
import { Link } from "@/i18n/navigation";

export function ButterProductCard({
  product,
  locale,
  content,
}: {
  product: ButterProduct;
  locale: "ja" | "en";
  content: ButterContent;
}) {
  const title = product.title[locale];
  const price = formatButterPrice(product.price, locale);

  return (
    <Link
      href={`/butter-vintage/products/${product.handle}`}
      className="group relative flex flex-col"
    >
      <div className="border-ink/10 relative aspect-[4/5] overflow-hidden border">
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]"
          style={{
            backgroundImage: `linear-gradient(135deg, ${product.gradient[0]} 0%, ${product.gradient[1]} 100%)`,
          }}
        />
        <div className="noise absolute inset-0" aria-hidden />

        <div className="absolute inset-0 flex items-end justify-between p-5">
          <span
            className="text-bone/95 text-[80px] leading-none tracking-tight md:text-[100px]"
            style={{ fontFamily: "var(--font-display, Georgia, serif)" }}
          >
            {product.badgeNumber}
          </span>
          <span className="text-bone/70 font-mono text-[10px] tracking-widest uppercase">
            {product.era}
          </span>
        </div>

        <div className="border-bone/40 text-bone group-hover:bg-acid group-hover:text-bone group-hover:border-acid absolute top-3 right-3 flex h-8 items-center justify-center border px-3 font-mono text-[10px] tracking-widest uppercase backdrop-blur-sm transition-colors">
          {product.available ? content.featured.available : content.featured.sold}
        </div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3
            className="text-ink group-hover:text-acid text-base leading-snug tracking-tight transition-colors"
            style={{ fontFamily: "var(--font-display, Georgia, serif)" }}
          >
            {title}
          </h3>
          <p className="text-graphite mt-1.5 font-mono text-[10px] tracking-widest uppercase">
            {product.origin} · {content.featured.sizeLabel} {product.size}
          </p>
        </div>
        <p className="text-ink shrink-0 text-right font-mono text-sm tracking-tight tabular-nums">
          {price}
        </p>
      </div>
    </Link>
  );
}
