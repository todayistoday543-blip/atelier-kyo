import type { ButterContent } from "../content";

export function ButterDemoBanner({ content }: { content: ButterContent }) {
  return (
    <div className="bg-acid text-bone relative z-50 flex h-7 items-center justify-center gap-2 px-4 text-[10px] font-medium tracking-widest uppercase">
      <span className="bg-bone text-acid rounded-sm px-1.5 py-0.5 font-mono text-[9px]">
        {content.brand.demoLabel}
      </span>
      <span className="font-mono">{content.brand.demoNotice}</span>
    </div>
  );
}
