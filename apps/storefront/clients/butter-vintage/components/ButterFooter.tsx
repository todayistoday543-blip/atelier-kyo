import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import type { ButterContent } from "../content";

export function ButterFooter({ content }: { content: ButterContent }) {
  return (
    <footer className="border-ink/15 bg-paper mt-32 border-t pt-20 pb-12">
      <Container>
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <div
              className="text-ink text-5xl leading-none tracking-tight"
              style={{ fontFamily: "var(--font-display, Georgia, serif)" }}
            >
              {content.brand.name}
            </div>
            <p className="text-graphite mt-4 max-w-xs text-sm leading-relaxed">
              {content.brand.tagline}. ATELIER KYO 提案デモ。
            </p>
          </div>

          <FooterColumn title={content.footer.shop} items={content.footer.shopLinks} />
          <FooterColumn title={content.footer.about} items={content.footer.aboutLinks} />

          <div className="md:col-span-2">
            <h4 className="text-ink font-mono text-[10px] tracking-widest uppercase">
              {content.footer.follow}
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="https://www.instagram.com/buttervintage/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-graphite hover:text-acid text-sm transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-graphite hover:text-acid text-sm transition-colors">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-ink/15 mt-16 flex flex-col-reverse items-start justify-between gap-3 border-t pt-6 md:flex-row md:items-center">
          <p className="text-graphite font-mono text-[10px] tracking-widest uppercase">
            {content.footer.copyright}
          </p>
          <p className="text-graphite/70 font-mono text-[10px] tracking-widest uppercase">
            {content.footer.credit}
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="md:col-span-3">
      <h4 className="text-ink font-mono text-[10px] tracking-widest uppercase">{title}</h4>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item}>
            <Link
              href="/butter-vintage"
              className="text-graphite hover:text-acid text-sm transition-colors"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
