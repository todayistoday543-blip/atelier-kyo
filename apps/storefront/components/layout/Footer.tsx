import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";

export async function Footer() {
  const t = await getTranslations("Footer");
  const shopLinks = t.raw("shopLinks") as string[];
  const aboutLinks = t.raw("aboutLinks") as string[];

  return (
    <footer className="border-bone/10 bg-charcoal mt-32 border-t pt-20 pb-12">
      <Container>
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="font-display text-bone text-5xl leading-none tracking-tighter">
              ARCHIVE
            </div>
            <p className="text-haze mt-4 max-w-xs text-sm leading-relaxed">
              An independently-run vintage atelier in Yokohama. ATELIER KYO Demo.
            </p>
          </div>

          <FooterColumn title={t("shop")} items={shopLinks} />
          <FooterColumn title={t("about")} items={aboutLinks} />

          <div className="md:col-span-2">
            <h4 className="text-bone font-mono text-[10px] tracking-widest uppercase">
              {t("follow")}
            </h4>
            <ul className="mt-4 space-y-2">
              {["Instagram", "X / Twitter", "Email"].map((s) => (
                <li key={s}>
                  <a href="#" className="text-haze hover:text-bone text-sm transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-bone/10 mt-16 flex flex-col-reverse items-start justify-between gap-3 border-t pt-6 md:flex-row md:items-center">
          <p className="text-haze font-mono text-[10px] tracking-widest uppercase">
            {t("copyright")}
          </p>
          <p className="text-haze/60 font-mono text-[10px] tracking-widest uppercase">
            {t("credit")}
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="md:col-span-3">
      <h4 className="text-bone font-mono text-[10px] tracking-widest uppercase">{title}</h4>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item}>
            <Link href="/" className="text-haze hover:text-bone text-sm transition-colors">
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
