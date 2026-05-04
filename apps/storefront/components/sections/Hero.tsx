import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";

export async function Hero() {
  const t = await getTranslations("Hero");
  const tBrand = await getTranslations("Brand");

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 30% 20%, rgba(189,253,71,0.18), transparent 60%), radial-gradient(80% 60% at 80% 80%, rgba(255,61,111,0.10), transparent 60%), linear-gradient(180deg, #050505 0%, #000 60%)",
          }}
        />
        <div className="noise absolute inset-0" aria-hidden />
        <div
          className="absolute inset-0 opacity-[0.035]"
          aria-hidden
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <Container size="wide" className="pt-32 pb-20 md:pt-44 md:pb-28">
        <p className="text-haze font-mono text-[11px] tracking-widest uppercase">
          {tBrand("name")} · YOKOHAMA · EST. 2018 · DEMO
        </p>

        <h1 className="font-display text-bone mt-6 text-[16vw] leading-[0.85] tracking-tighter md:text-[12vw] xl:text-[180px]">
          <span className="block">{t("lineOne")}</span>
          <span className="text-acid block italic">{t("lineTwo")}</span>
          <span className="block">{t("lineThree")}</span>
        </h1>

        <div className="mt-12 grid grid-cols-1 items-end gap-8 md:grid-cols-12">
          <p className="text-haze max-w-xl text-base leading-relaxed md:col-span-7 md:text-lg">
            {t("subline")}
          </p>

          <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
            <Link
              href="/#new"
              className="bg-acid text-ink hover:bg-acid-soft inline-flex h-12 items-center gap-2 px-6 font-mono text-xs tracking-widest uppercase transition-colors"
            >
              {t("ctaPrimary")} →
            </Link>
            <Link
              href="/#story"
              className="border-bone/30 text-bone hover:border-acid hover:text-acid inline-flex h-12 items-center border px-6 font-mono text-xs tracking-widest uppercase transition-colors"
            >
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>
      </Container>

      <div className="border-bone/10 absolute right-0 bottom-0 left-0 border-t">
        <Container size="wide" className="flex h-12 items-center justify-between">
          <span className="text-haze font-mono text-[10px] tracking-widest uppercase">
            {t("scrollHint")} ↓
          </span>
          <span className="text-haze font-mono text-[10px] tracking-widest uppercase">01 / 06</span>
        </Container>
      </div>
    </section>
  );
}
