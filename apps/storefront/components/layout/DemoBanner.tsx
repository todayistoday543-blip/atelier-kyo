import { getTranslations } from "next-intl/server";

export async function DemoBanner() {
  const t = await getTranslations("DemoBanner");
  return (
    <div className="bg-acid text-ink relative z-50 flex h-7 items-center justify-center gap-2 px-4 text-[10px] font-medium tracking-widest uppercase">
      <span className="bg-ink text-acid rounded-sm px-1.5 py-0.5 font-mono text-[9px]">
        {t("label")}
      </span>
      <span className="font-mono">{t("text")}</span>
    </div>
  );
}
