import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import type { ButterContent } from "../content";

export function ButterHero({ content }: { content: ButterContent }) {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 30% 20%, rgba(213,74,46,0.15), transparent 60%), radial-gradient(80% 60% at 80% 80%, rgba(90,107,63,0.12), transparent 60%), linear-gradient(180deg, #f5e7c4 0%, #efe5d0 100%)",
          }}
        />
        <div className="noise absolute inset-0" aria-hidden />
        <div
          className="absolute inset-0 opacity-[0.04]"
          aria-hidden
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(44,31,18,1) 1px, transparent 1px), linear-gradient(to bottom, rgba(44,31,18,1) 1px, transparent 1px)",
            backgroundSize: "120px 120px",
          }}
        />
        {/* Decorative seal-style stamp top-right */}
        <div className="absolute top-32 right-6 hidden md:block">
          <div className="border-acid text-acid relative h-32 w-32 rotate-12 border-2 font-mono text-[9px] tracking-widest uppercase">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
              <span className="text-acid font-mono text-[8px]">EST.</span>
              <span className="text-acid text-2xl tracking-tight">YOKOHAMA</span>
              <span className="text-acid font-mono text-[8px]">MOTOMACHI</span>
            </div>
          </div>
        </div>
      </div>

      <Container size="wide" className="pt-32 pb-20 md:pt-44 md:pb-28">
        <p className="text-graphite font-mono text-[11px] tracking-widest uppercase">
          {content.hero.kicker}
        </p>

        <h1
          className="text-ink mt-6 text-[18vw] leading-[0.85] tracking-tight md:text-[14vw] xl:text-[210px]"
          style={{ fontFamily: "var(--font-display, Georgia, serif)" }}
        >
          <span className="block">{content.hero.lineOne}</span>
          <span className="text-acid block italic">{content.hero.lineTwo}</span>
          <span className="block">{content.hero.lineThree}</span>
        </h1>

        <div className="mt-12 grid grid-cols-1 items-end gap-8 md:grid-cols-12">
          <p
            className="text-graphite max-w-xl text-base leading-relaxed md:col-span-7 md:text-lg"
            style={{ fontFamily: "var(--font-display, Georgia, serif)" }}
          >
            {content.hero.subline}
          </p>

          <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
            <Link
              href="/butter-vintage#new"
              className="bg-acid text-bone hover:bg-acid-soft inline-flex h-12 items-center gap-2 px-6 font-mono text-xs tracking-widest uppercase transition-colors"
            >
              {content.hero.ctaPrimary} →
            </Link>
            <a
              href="https://www.instagram.com/buttervintage/"
              target="_blank"
              rel="noopener noreferrer"
              className="border-ink/30 text-ink hover:border-acid hover:text-acid inline-flex h-12 items-center border px-6 font-mono text-xs tracking-widest uppercase transition-colors"
            >
              {content.hero.ctaSecondary}
            </a>
          </div>
        </div>
      </Container>

      <div className="border-ink/15 absolute right-0 bottom-0 left-0 border-t">
        <Container size="wide" className="flex h-12 items-center justify-between">
          <span className="text-graphite font-mono text-[10px] tracking-widest uppercase">
            {content.hero.scrollHint} ↓
          </span>
          <span className="text-graphite font-mono text-[10px] tracking-widest uppercase">
            01 / 06
          </span>
        </Container>
      </div>
    </section>
  );
}
