"use client";

import { useTranslations } from "next-intl";
import { useState, type FormEvent } from "react";

export function Newsletter() {
  const t = useTranslations("Newsletter");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "thanks">("idle");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("thanks");
      setEmail("");
    }, 600);
  }

  return (
    <section className="bg-ink py-24 md:py-32">
      <div className="border-bone/10 mx-auto w-full max-w-[1440px] border-y px-6 py-16 md:py-24 lg:px-10">
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="text-acid font-mono text-[11px] tracking-widest uppercase">
              {t("kicker")}
            </p>
            <h2 className="font-display text-bone mt-3 text-3xl leading-[0.95] tracking-tighter md:text-5xl">
              {t("heading")}
            </h2>
          </div>

          <form onSubmit={onSubmit} className="md:col-span-5">
            <div className="border-bone/30 focus-within:border-acid flex items-center border transition-colors">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("placeholder")}
                aria-label={t("placeholder")}
                className="text-bone placeholder:text-haze flex-1 bg-transparent px-4 py-3 font-mono text-sm tracking-tight outline-none"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-acid text-ink hover:bg-acid-soft px-5 py-3 font-mono text-xs tracking-widest uppercase transition-colors disabled:opacity-60"
              >
                {t("submit")}
              </button>
            </div>
            <p className="text-haze mt-3 font-mono text-[10px] tracking-widest uppercase">
              {status === "thanks" ? t("thanks") : t("consent")}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
