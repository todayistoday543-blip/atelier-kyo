import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";

type CollectionItem = { title: string; subtitle: string; count: string };

const GRADIENTS: [string, string][] = [
  ["#3a4452", "#0a0e14"],
  ["#5a4632", "#1a130c"],
  ["#1a1a1a", "#000000"],
];

export async function Collections() {
  const t = await getTranslations("Collections");
  const items = t.raw("items") as CollectionItem[];

  return (
    <section id="collections" className="bg-ink py-24 md:py-32">
      <Container size="wide">
        <header className="mb-16 max-w-2xl">
          <p className="text-acid font-mono text-[11px] tracking-widest uppercase">{t("kicker")}</p>
          <h2 className="font-display text-bone mt-3 text-4xl leading-[0.95] tracking-tighter md:text-5xl">
            {t("heading")}
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <Link
              key={item.title}
              href="/"
              className="group relative isolate flex aspect-[4/5] flex-col justify-between overflow-hidden p-8"
            >
              <div
                className="absolute inset-0 -z-10 transition-transform duration-700 group-hover:scale-[1.05]"
                style={{
                  backgroundImage: `linear-gradient(180deg, ${GRADIENTS[i % GRADIENTS.length][0]} 0%, ${GRADIENTS[i % GRADIENTS.length][1]} 100%)`,
                }}
              />
              <div className="noise absolute inset-0 -z-10" aria-hidden />

              <div className="flex items-start justify-between">
                <span className="text-bone/60 font-mono text-[10px] tracking-widest uppercase">
                  {String(i + 1).padStart(2, "0")} / 0{items.length}
                </span>
                <span className="text-bone/60 font-mono text-[10px] tracking-widest uppercase">
                  {item.count}
                </span>
              </div>

              <div>
                <h3 className="font-display text-bone text-5xl leading-none tracking-tighter md:text-6xl">
                  {item.title}
                </h3>
                <p className="text-haze mt-3 text-sm">{item.subtitle}</p>
                <span className="text-acid mt-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
