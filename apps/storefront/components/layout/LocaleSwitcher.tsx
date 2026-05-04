"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useTransition } from "react";
import { cn } from "@/lib/utils";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  return (
    <div
      className={cn(
        "flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase",
        isPending && "opacity-60",
      )}
    >
      {routing.locales.map((l, i) => (
        <button
          key={l}
          type="button"
          aria-current={l === locale ? "true" : undefined}
          onClick={() =>
            startTransition(() => {
              router.replace(pathname, { locale: l });
            })
          }
          className={cn(
            "rounded-sm px-2 py-1 transition-colors",
            l === locale ? "bg-acid text-ink" : "text-haze hover:text-bone",
          )}
        >
          {l.toUpperCase()}
          {i < routing.locales.length - 1 && (
            <span className="text-haze/40 ml-1.5" aria-hidden>
              /
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
