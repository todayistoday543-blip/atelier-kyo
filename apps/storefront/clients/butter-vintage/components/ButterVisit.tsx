import { Container } from "@/components/ui/Container";
import type { ButterContent } from "../content";

export function ButterVisit({ content }: { content: ButterContent }) {
  return (
    <section id="visit" className="bg-paper relative overflow-hidden py-24 md:py-32">
      <Container size="wide">
        <div className="grid items-start gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-acid font-mono text-[11px] tracking-widest uppercase">
              {content.visit.kicker}
            </p>
            <h2
              className="text-ink mt-3 text-4xl leading-[0.95] tracking-tight md:text-5xl"
              style={{ fontFamily: "var(--font-display, Georgia, serif)" }}
            >
              {content.visit.heading}
            </h2>

            <dl className="text-ink mt-12 space-y-6 font-mono text-sm leading-relaxed tracking-tight">
              <div>
                <dt className="text-graphite text-[10px] tracking-widest uppercase">ADDRESS</dt>
                <dd className="mt-2">{content.visit.address}</dd>
              </div>
              <div>
                <dt className="text-graphite text-[10px] tracking-widest uppercase">HOURS</dt>
                <dd className="mt-2">{content.visit.hours}</dd>
              </div>
              <div>
                <dt className="text-graphite text-[10px] tracking-widest uppercase">INSTAGRAM</dt>
                <dd className="mt-2">
                  <a
                    href="https://www.instagram.com/buttervintage/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-acid"
                  >
                    {content.visit.instagramLabel}
                  </a>
                </dd>
              </div>
            </dl>

            <a
              href={content.visit.directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-acid text-bone hover:bg-acid-soft mt-10 inline-flex h-12 items-center gap-2 px-6 font-mono text-xs tracking-widest uppercase transition-colors"
            >
              {content.visit.directions} →
            </a>
          </div>

          <div className="md:col-span-7">
            <div
              className="border-ink/15 relative aspect-[4/3] overflow-hidden border"
              aria-label={content.visit.mapAlt}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(160deg, #f5e7c4 0%, #c8b890 100%), radial-gradient(40% 40% at 30% 30%, rgba(213,74,46,0.10), transparent)",
                }}
              />
              <svg
                className="absolute inset-0 h-full w-full opacity-50"
                viewBox="0 0 800 600"
                aria-hidden
              >
                <defs>
                  <pattern id="butterGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="rgba(44,31,18,0.15)"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="800" height="600" fill="url(#butterGrid)" />
                {/* 元町商店街を模した曲線 */}
                <path
                  d="M0,320 C150,290 300,330 460,300 C600,275 720,310 800,300"
                  stroke="rgba(213,74,46,0.45)"
                  strokeWidth="2"
                  fill="none"
                />
                {/* 海岸線（横浜・港） */}
                <path
                  d="M0,460 C200,440 400,480 600,455 C700,440 760,460 800,455"
                  stroke="rgba(44,31,18,0.3)"
                  strokeWidth="1"
                  fill="none"
                  strokeDasharray="4 4"
                />
                <g transform="translate(400 280)">
                  <circle r="38" fill="rgba(213,74,46,0.12)" />
                  <circle r="16" fill="rgba(213,74,46,0.32)" />
                  <circle r="6" fill="#d54a2e" />
                </g>
              </svg>

              <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between">
                <span className="text-ink font-mono text-[10px] tracking-widest uppercase">
                  YOKOHAMA · MOTOMACHI 1-CHOME
                </span>
                <span className="text-graphite font-mono text-[10px] tracking-widest uppercase">
                  35.4439° N 139.6489° E
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
