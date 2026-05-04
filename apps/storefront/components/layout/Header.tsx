import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";

export async function Header() {
  const t = await getTranslations();

  const navItems = [
    { href: "/#new", label: t("Nav.new") },
    { href: "/#vintage", label: t("Nav.vintage") },
    { href: "/#collections", label: t("Nav.collections") },
    { href: "/#story", label: t("Nav.story") },
    { href: "/#visit", label: t("Nav.visit") },
  ];

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-ink/70 supports-[backdrop-filter]:bg-ink/50 border-bone/10 relative border-b backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 lg:px-10">
          <Link href="/" className="group relative flex items-baseline gap-3">
            <span className="font-display text-bone text-2xl leading-none tracking-tighter">
              {t("Brand.name")}
            </span>
            <span className="text-haze hidden font-mono text-[10px] tracking-widest uppercase md:inline">
              — {t("Brand.tagline")}
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-haze hover:text-bone font-mono text-[11px] tracking-widest uppercase transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 lg:gap-5">
            <LocaleSwitcher />
            <button
              type="button"
              aria-label={t("Nav.search")}
              className="text-haze hover:text-bone hidden h-9 w-9 items-center justify-center transition-colors md:flex"
            >
              <SearchIcon />
            </button>
            <button
              type="button"
              aria-label={t("Nav.cart")}
              className="text-bone hover:text-acid relative flex h-9 items-center gap-2 px-2 font-mono text-[11px] tracking-widest uppercase transition-colors"
            >
              <CartIcon />
              <span className="hidden md:inline">{t("Nav.cart")}</span>
              <span className="bg-acid text-ink absolute -top-1 -right-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] leading-none font-medium">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <circle cx="7" cy="7" r="5" />
      <path d="m11 11 3 3" strokeLinecap="round" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M2 3h2l1.5 8h7L14 5H5" strokeLinejoin="round" />
      <circle cx="6" cy="13.5" r="1" />
      <circle cx="12" cy="13.5" r="1" />
    </svg>
  );
}
