import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";

export async function BrandStory() {
  const t = await getTranslations("Story");

  return (
    <section id="story" className="bg-charcoal relative overflow-hidden py-24 md:py-40">
      <Container size="wide">
        <div className="grid items-start gap-12 md:grid-cols-12 md:gap-20">
          <div className="md:sticky md:top-32 md:col-span-5 md:self-start">
            <p className="text-acid font-mono text-[11px] tracking-widest uppercase">
              {t("kicker")}
            </p>
            <h2 className="font-display text-bone mt-3 text-4xl leading-[0.95] tracking-tighter md:text-5xl">
              {t("heading")}
            </h2>
            <p className="text-haze mt-8 font-mono text-[11px] tracking-widest uppercase">
              {t("since")}
            </p>
          </div>

          <div className="space-y-8 md:col-span-6 md:col-start-7">
            <div
              className="relative aspect-[4/5] w-full overflow-hidden md:aspect-[3/4]"
              aria-hidden
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(160deg, #2a2620 0%, #0e0c08 70%), radial-gradient(60% 60% at 30% 30%, rgba(189,253,71,0.1), transparent 70%)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-bone/50 text-[120px] leading-none tracking-tighter md:text-[200px]">
                  Y/76
                </span>
              </div>
              <div className="noise absolute inset-0" />
              <div className="border-bone/20 absolute inset-0 border" />
            </div>

            <p className="text-bone text-base leading-relaxed md:text-lg">{t("p1")}</p>
            <p className="text-haze text-base leading-relaxed">{t("p2")}</p>
            <p className="text-haze text-base leading-relaxed">{t("p3")}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
