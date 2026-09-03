import { HOTEL, MOTOR_RESERVAS } from "@/lib/hotel";

export function ReservationForm() {
  return (
    <div id="reserva" className="rounded-[14px] bg-ink p-5 text-paper ring-1 ring-black/5">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-display text-lg tracking-tight">Reservar agora</span>
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-surf">
          {HOTEL.cidade} · {HOTEL.uf}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-paper/80">
        Confira disponibilidade e tarifas em tempo real no nosso motor de reservas.
      </p>
      <a
        href={MOTOR_RESERVAS}
        target="_blank"
        rel="noreferrer"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-surf py-3.5 text-sm font-semibold text-paper active:opacity-90"
      >
        Reservar online
        <span className="font-mono text-xs">→</span>
      </a>
      <a
        href={HOTEL.whatsapp}
        target="_blank"
        rel="noreferrer"
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-md py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-paper/80 ring-1 ring-paper/15"
      >
        <span className="inline-block size-2 rounded-full bg-surf" />
        Falar no WhatsApp
      </a>
    </div>
  );
}
