import { MOTOR_RESERVAS } from "@/lib/hotel";

export function RoomCard({
  nome,
  detalhe,
  descricao,
  imagem,
  etiqueta,
  delay = 0,
}: {
  nome: string;
  detalhe: string;
  descricao: string;
  imagem: string;
  etiqueta?: string | null;
  delay?: number;
}) {
  return (
    <div
      className="animate-rise overflow-hidden rounded-[14px] bg-paper-2 outline-1 -outline-offset-1 outline-black/5"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative">
        <img
          src={imagem}
          alt={`Apartamento ${nome}`}
          loading="lazy"
          className="h-44 w-full object-cover"
        />
        {etiqueta && (
          <span className="absolute left-3 top-3 -rotate-3 rounded-sm bg-surf px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-paper">
            {etiqueta}
          </span>
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
