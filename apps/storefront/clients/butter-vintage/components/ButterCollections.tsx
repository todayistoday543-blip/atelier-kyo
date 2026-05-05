import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import type { ButterContent } from "../content";

const GRADIENTS: [string, string][] = [
  ["#5a6480", "#1a2030"], // denim blue
  ["#a05030", "#3a1f12"], // rust
  ["#5a6b3f", "#1f2814"], // moss
];

export function ButterCollections({ content }: { content: ButterContent }) {
  return (
    <section id="archive" className="bg-bone py-24 md:py-32">
      <Container size="wide">
        <header className="mb-16 max-w-2xl">
          <p className="text-acid font-mono text-[11px] tracking-widest uppercase">
            {content.collections.kicker}
          </p>
          <h2
            className="text-ink mt-3 text-4xl leading-[0.95] tracking-tight md:text-5xl"
            style={{ fontFamily: "var(--font-display, Georgia, serif)" }}
          >
            {content.collections.heading}
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {content.collections.items.map((item, i) => (
            <Link
              key={item.title}
              href="/butter-vintage"
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
                <span className="text-bone/70 font-mono text-[10px] tracking-widest uppercase">
                  {String(i + 1).padStart(2, "0")} / 0{content.collections.items.length}
                </span>
                <span className="text-bone/70 font-mono text-[10px] tracking-widest uppercase">
                  {item.count}
                </span>
              </div>

              <div>
                <h3
                  className="text-bone text-5xl leading-none tracking-tight md:text-6xl"
                  style={{ fontFamily: "var(--font-display, Georgia, serif)" }}
                >
                  {item.title}
                </h3>
                <p className="text-bone/80 mt-3 text-sm">{item.subtitle}</p>
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
