import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import type { ButterContent } from "../content";

export function ButterHeader({ content }: { content: ButterContent }) {
  const navItems = [
    { href: "/butter-vintage#new", label: content.nav.new },
    { href: "/butter-vintage#archive", label: content.nav.archive },
    { href: "/butter-vintage#story", label: content.nav.story },
    { href: "/butter-vintage#visit", label: content.nav.visit },
  ];

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-bone/80 supports-[backdrop-filter]:bg-bone/60 border-ink/10 relative border-b backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 lg:px-10">
          <Link href="/butter-vintage" className="group relative flex items-baseline gap-3">
            <span
              className="text-ink text-2xl leading-none tracking-tight"
              style={{ fontFamily: "var(--font-display, Georgia, serif)" }}
            >
              {content.brand.name}
            </span>
            <span className="text-haze hidden font-mono text-[10px] tracking-widest uppercase md:inline">
              — {content.brand.tagline}
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-graphite hover:text-acid font-mono text-[11px] tracking-widest uppercase transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 lg:gap-5">
            <LocaleSwitcher />
            <a
              href={`https://www.instagram.com/${"buttervintage"}/`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={content.nav.instagram}
              className="text-graphite hover:text-acid hidden h-9 items-center font-mono text-[11px] tracking-widest uppercase transition-colors md:inline-flex"
            >
              @buttervintage
            </a>
            <button
              type="button"
              aria-label={content.nav.cart}
              className="text-ink hover:text-acid relative flex h-9 items-center gap-2 px-2 font-mono text-[11px] tracking-widest uppercase transition-colors"
            >
              <CartIcon />
              <span className="hidden md:inline">{content.nav.cart}</span>
              <span className="bg-acid text-bone absolute -top-1 -right-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] leading-none font-medium">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
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
