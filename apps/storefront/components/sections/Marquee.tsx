import { getTranslations } from "next-intl/server";

export async function Marquee() {
  const t = await getTranslations("Marquee");
  const items = t.raw("items") as string[];

  // Duplicate for seamless loop
  const looped = [...items, ...items];

  return (
    <section
      className="border-bone/10 bg-ink relative overflow-hidden border-y py-6"
      aria-label="ticker"
    >
      <div className="animate-marquee flex w-max items-center gap-12 whitespace-nowrap will-change-transform">
        {looped.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="text-haze flex items-center gap-12 font-mono text-sm tracking-widest uppercase"
          >
            {item}
            <span className="text-acid">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
