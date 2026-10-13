import { createFileRoute } from "@tanstack/react-router";
import { FotoContato } from "@/components/foto-contato";
import { HOTEL } from "@/lib/hotel";
import { ReservationForm } from "@/components/reservation-form";

const TITULO = "Contato e reservas — Hotel Villa di Rimini, Ubatuba";
const DESCRICAO =
  "Fale com a recepção do Hotel Villa di Rimini: (12) 3832-5785, WhatsApp e reservas@villadirimini.com.br. Av. Leovigildo Dias Vieira, 1140 — Itaguá, Ubatuba/SP.";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRICAO },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contato,
});

function Contato() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="px-1 font-mono text-[10px] uppercase tracking-[0.25em] text-surf">Contato</div>
      <h1 className="mt-1 px-1 font-display text-5xl uppercase leading-[0.95] tracking-tight text-ink">
        Fale com a recepção
      </h1>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="overflow-hidden rounded-[14px] bg-paper-2 outline-1 -outline-offset-1 outline-black/5">
          <a href={HOTEL.mapa} target="_blank" rel="noreferrer">
            <FotoContato />
          </a>
          <div className="p-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-2">
              Endereço
            </div>
            <p className="mt-1 text-sm leading-snug text-ink">
              {HOTEL.endereco}
              <br />
              {HOTEL.bairro} — {HOTEL.cidade}/{HOTEL.uf}
            </p>

            <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-2">
              Telefones
            </div>
            <p className="mt-1 text-sm text-ink">
              <a href={HOTEL.telefoneLink}>{HOTEL.telefone}</a>
              {" · "}
              <a href={HOTEL.whatsapp} target="_blank" rel="noreferrer" className="text-surf">
                WhatsApp
              </a>
            </p>

            <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-2">
              E-mail
            </div>
            <p className="mt-1 text-sm text-ink">
              {HOTEL.emails.map((e) => (
                <a key={e} href={`mailto:${e}`} className="block">
                  {e}
                </a>
              ))}
            </p>

            <div className="mt-4 flex gap-4 font-mono text-[11px] uppercase tracking-[0.15em] text-surf">
              <a href={HOTEL.instagram} target="_blank" rel="noreferrer">
                Instagram
              </a>
              <a href={HOTEL.facebook} target="_blank" rel="noreferrer">
                Facebook
              </a>
            </div>
          </div>
        </div>

        <ReservationForm />
      </div>
    </div>
  );
}
