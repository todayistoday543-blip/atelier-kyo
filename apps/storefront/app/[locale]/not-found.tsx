import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <section className="bg-ink flex min-h-[80vh] items-center py-24">
      <Container size="default" className="text-center">
        <p className="text-acid font-mono text-[11px] tracking-widest uppercase">404</p>
        <h1 className="font-display text-bone mt-4 text-7xl leading-none tracking-tighter md:text-9xl">
          NOT
          <br />
          <span className="italic">FOUND</span>
        </h1>
        <p className="text-haze mx-auto mt-6 max-w-md text-base">
          このアーカイブには見つかりませんでした。
          <br />
          The page you&apos;re looking for is not in this archive.
        </p>
        <Link
          href="/"
          className="bg-acid text-ink hover:bg-acid-soft mt-10 inline-flex h-12 items-center px-6 font-mono text-xs tracking-widest uppercase transition-colors"
        >
          HOME ↑
        </Link>
      </Container>
    </section>
  );
}
