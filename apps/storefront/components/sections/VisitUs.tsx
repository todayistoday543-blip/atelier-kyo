import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";

export async function VisitUs() {
  const t = await getTranslations("Visit");

  return (
    <section id="visit" className="bg-charcoal relative overflow-hidden py-24 md:py-32">
      <Container size="wide">
        <div className="grid items-start gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-acid font-mono text-[11px] tracking-widest uppercase">
              {t("kicker")}
            </p>
            <h2 className="font-display text-bone mt-3 text-4xl leading-[0.95] tracking-tighter md:text-5xl">
              {t("heading")}
            </h2>

            <dl className="text-bone mt-12 space-y-6 font-mono text-sm leading-relaxed tracking-tight">
              <div>
                <dt className="text-haze text-[10px] tracking-widest uppercase">ADDRESS</dt>
                <dd className="mt-2">{t("address")}</dd>
              </div>
              <div>
                <dt className="text-haze text-[10px] tracking-widest uppercase">HOURS</dt>
                <dd className="mt-2">{t("hours")}</dd>
              </div>
              <div>
                <dt className="text-haze text-[10px] tracking-widest uppercase">PHONE</dt>
                <dd className="mt-2">{t("phone")}</dd>
              </div>
            </dl>

            <a
              href={t("directionsHref")}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-acid text-ink hover:bg-acid-soft mt-10 inline-flex h-12 items-center gap-2 px-6 font-mono text-xs tracking-widest uppercase transition-colors"
            >
              {t("directions")} →
            </a>
          </div>

          <div className="md:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden" aria-label={t("mapAlt")}>
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(160deg, #1f2630 0%, #050810 100%), radial-gradient(40% 40% at 30% 30%, rgba(189,253,71,0.08), transparent)",
                }}
              />
              <svg
                className="absolute inset-0 h-full w-full opacity-40"
                viewBox="0 0 800 600"
                aria-hidden
              >
                <defs>
                  <pattern id="streetGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="rgba(189,253,71,0.18)"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="800" height="600" fill="url(#streetGrid)" />
                {/* Coastline curve */}
                <path
                  d="M0,420 C150,360 300,440 460,400 C600,365 720,420 800,400"
                  stroke="rgba(189,253,71,0.4)"
                  strokeWidth="1"
                  fill="none"
                />
                {/* Pin */}
                <g transform="translate(400 280)">
                  <circle r="34" fill="rgba(189,253,71,0.12)" />
                  <circle r="14" fill="rgba(189,253,71,0.32)" />
                  <circle r="6" fill="#bdfd47" />
                </g>
              </svg>

              <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between">
                <span className="text-bone font-mono text-[10px] tracking-widest uppercase">
                  YOKOHAMA · ISEZAKI
                </span>
                <span className="text-haze font-mono text-[10px] tracking-widest uppercase">
                  35.4437° N 139.6380° E
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
