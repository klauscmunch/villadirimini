import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { HOTEL } from "@/lib/hotel";

const LINKS = [
  { to: "/", label: "Início" },
  { to: "/o-hotel", label: "O Hotel" },
  { to: "/acomodacoes", label: "Acomodações" },
  { to: "/lazer", label: "Lazer" },
  { to: "/cafe-da-manha", label: "Café da manhã" },
  { to: "/contato", label: "Contato" },
] as const;

export function SiteHeader() {
  const [aberto, setAberto] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
        <Link to="/" className="leading-none" onClick={() => setAberto(false)}>
          <div className="font-display text-[22px] tracking-tight text-ink">VILLA DI RIMINI</div>
          <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-ink-2">
            {HOTEL.bairro} · {HOTEL.cidade}
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-4 md:flex">
            {LINKS.slice(1).map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-2 hover:text-ink"
                activeProps={{ className: "text-ink" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <Link
            to="/"
            hash="reserva"
            className="rounded-full bg-surf px-4 py-2 text-xs font-semibold text-paper active:opacity-80"
          >
            Reservar
          </Link>
          <button
            type="button"
            aria-label="Abrir menu"
            aria-expanded={aberto}
            onClick={() => setAberto((v) => !v)}
            className="flex size-9 flex-col items-center justify-center gap-1 rounded-full border border-line md:hidden"
          >
            <span className="block h-px w-4 bg-ink" />
            <span className="block h-px w-4 bg-ink" />
          </button>
        </div>
      </div>

      {aberto && (
        <nav className="border-t border-line bg-paper px-5 py-3 md:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setAberto(false)}
              className="block py-2 font-mono text-[12px] uppercase tracking-[0.15em] text-ink-2"
              activeProps={{ className: "text-ink" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
