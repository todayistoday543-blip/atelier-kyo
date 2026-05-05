export function ButterMarquee({ items }: { items: string[] }) {
  const looped = [...items, ...items];
  return (
    <section
      className="border-ink/15 bg-bone relative overflow-hidden border-y py-6"
      aria-label="ticker"
    >
      <div className="animate-marquee flex w-max items-center gap-12 whitespace-nowrap will-change-transform">
        {looped.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="text-graphite flex items-center gap-12 font-mono text-sm tracking-widest uppercase"
          >
            {item}
            <span className="text-acid">★</span>
          </span>
        ))}
      </div>
    </section>
  );
}
