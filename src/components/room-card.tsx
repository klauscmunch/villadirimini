import { useRef, useState } from "react";
import { MOTOR_RESERVAS } from "@/lib/hotel";

export function RoomCard({
  nome,
  detalhe,
  descricao,
  imagens,
  etiqueta,
  delay = 0,
}: {
  nome: string;
  detalhe: string;
  descricao: string;
  imagens: string[];
  etiqueta?: string | null;
  delay?: number;
}) {
  const trilho = useRef<HTMLDivElement>(null);
  const [atual, setAtual] = useState(0);

  function aoRolar() {
    const el = trilho.current;
    if (!el) return;
    setAtual(Math.round(el.scrollLeft / el.clientWidth));
  }

  return (
    <div
      className="animate-rise overflow-hidden bg-paper-2 outline-1 -outline-offset-1 outline-black/5"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative">
        <div
          ref={trilho}
          onScroll={aoRolar}
          className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {imagens.map((src, i) => (
            <img
              key={src.slice(0, 64) + i}
              src={src}
              alt={`Apartamento ${nome} — foto ${i + 1}`}
              loading="lazy"
              className="h-44 w-full shrink-0 snap-center object-cover"
            />
          ))}
        </div>

        {etiqueta && (
          <span className="absolute left-3 top-3 -rotate-3 bg-surf px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-paper">
            {etiqueta}
          </span>
        )}

        {imagens.length > 1 && (
          <div className="absolute inset-x-0 bottom-2 flex justify-center gap-1.5">
            {imagens.map((src, i) => (
              <span
                key={"p" + src.slice(0, 32) + i}
                className={`h-1.5 w-1.5 ${i === atual ? "bg-paper" : "bg-paper/50"}`}
              />
            ))}
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-end justify-between">
          <div>
            <div className="font-display text-2xl leading-none tracking-tight text-ink">{nome}</div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-2">
              {detalhe}
            </div>
          </div>
          <a
            href={MOTOR_RESERVAS}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[10px] uppercase tracking-[0.15em] text-surf"
          >
            Reservar
          </a>
        </div>
        <p className="mt-3 text-sm leading-snug text-ink-2">{descricao}</p>
      </div>
    </div>
  );
}
