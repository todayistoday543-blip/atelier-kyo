import { Container } from "@/components/ui/Container";
import type { ButterContent } from "../content";

export function ButterStory({ content }: { content: ButterContent }) {
  return (
    <section id="story" className="bg-paper relative overflow-hidden py-24 md:py-40">
      <Container size="wide">
        <div className="grid items-start gap-12 md:grid-cols-12 md:gap-20">
          <div className="md:sticky md:top-32 md:col-span-5 md:self-start">
            <p className="text-acid font-mono text-[11px] tracking-widest uppercase">
              {content.story.kicker}
            </p>
            <h2
              className="text-ink mt-3 text-4xl leading-[0.95] tracking-tight md:text-5xl"
              style={{ fontFamily: "var(--font-display, Georgia, serif)" }}
            >
              {content.story.heading}
            </h2>
            <p className="text-graphite mt-8 font-mono text-[11px] tracking-widest uppercase">
              {content.story.yearMark}
            </p>
          </div>

          <div className="space-y-8 md:col-span-6 md:col-start-7">
            <div
              className="border-ink/15 relative aspect-[4/5] w-full overflow-hidden border md:aspect-[3/4]"
              aria-hidden
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(160deg, #c8b890 0%, #5a4830 70%), radial-gradient(60% 60% at 30% 30%, rgba(213,74,46,0.18), transparent 70%)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-bone/65 text-[120px] leading-none tracking-tight md:text-[200px]"
                  style={{ fontFamily: "var(--font-display, Georgia, serif)" }}
                >
                  B/V
                </span>
              </div>
              <div className="noise absolute inset-0" />
            </div>

            <p
              className="text-ink text-base leading-relaxed md:text-lg"
              style={{ fontFamily: "var(--font-display, Georgia, serif)" }}
            >
              {content.story.p1}
            </p>
            <p className="text-graphite text-base leading-relaxed">{content.story.p2}</p>
            <p className="text-graphite text-base leading-relaxed">{content.story.p3}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
