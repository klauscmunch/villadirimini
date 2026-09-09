import { useMarquee } from "@/lib/site-content";

export function Marquee({ itens }: { itens: string[] }) {
  const config = useMarquee();
  const base = config.itens.length ? config.itens : itens;
  const lista = [...base, ...base];
  return (
    <div className="overflow-hidden border-y border-line bg-ink py-2.5 text-paper">
      <div
        className="flex w-max animate-marquee whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.2em]"
        style={{ animationDuration: `${config.segundos}s` }}
      >
        {lista.map((item, i) => (
          <span key={`${item}-${i}`} className="flex">
            <span className="px-4">{item}</span>
            <span className="px-4 text-surf">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
