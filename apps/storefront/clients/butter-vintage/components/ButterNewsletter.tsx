"use client";

import { useState, type FormEvent } from "react";
import type { ButterContent } from "../content";

export function ButterNewsletter({ content }: { content: ButterContent }) {
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
    <section className="bg-bone py-24 md:py-32">
      <div className="border-ink/15 mx-auto w-full max-w-[1440px] border-y px-6 py-16 md:py-24 lg:px-10">
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="text-acid font-mono text-[11px] tracking-widest uppercase">
              {content.newsletter.kicker}
            </p>
            <h2
              className="text-ink mt-3 text-3xl leading-[0.95] tracking-tight md:text-5xl"
              style={{ fontFamily: "var(--font-display, Georgia, serif)" }}
            >
              {content.newsletter.heading}
            </h2>
          </div>

          <form onSubmit={onSubmit} className="md:col-span-5">
            <div className="border-ink/30 focus-within:border-acid flex items-center border transition-colors">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={content.newsletter.placeholder}
                aria-label={content.newsletter.placeholder}
                className="text-ink placeholder:text-haze flex-1 bg-transparent px-4 py-3 font-mono text-sm tracking-tight outline-none"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-acid text-bone hover:bg-acid-soft px-5 py-3 font-mono text-xs tracking-widest uppercase transition-colors disabled:opacity-60"
              >
                {content.newsletter.submit}
              </button>
            </div>
            <p className="text-graphite mt-3 font-mono text-[10px] tracking-widest uppercase">
              {status === "thanks" ? content.newsletter.thanks : content.newsletter.consent}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
