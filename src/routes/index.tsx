import { createFileRoute, Link } from "@tanstack/react-router";

import fachadaHotel from "@/assets/hotel-fachada.jpg";
import heroVaranda from "@/assets/hero-varanda.jpg.asset.json";
import heroPost from "@/assets/hero-post.png.asset.json";
import piscina from "@/assets/piscina.jpg";
import cafeDaManha from "@/assets/cafe-da-manha.jpg";
import localizacao from "@/assets/localizacao.jpg";
import { ACOMODACOES, COMODIDADES, HOTEL } from "@/lib/hotel";
import { Marquee } from "@/components/marquee";
import { RoomCard } from "@/components/room-card";
import { ReservationForm } from "@/components/reservation-form";
import { HeroSlideshow } from "@/components/hero-slideshow";

const TITULO = "Hotel Villa di Rimini — Pousada pé na areia em Ubatuba";
const DESCRICAO =
  "Hotel de frente para a Praia do Itaguá, em Ubatuba/SP. Recepção 24h, piscina com bar, café da manhã buffet, Wi-Fi e estacionamento grátis. Pet friendly.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRICAO },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Hotel",
          name: HOTEL.nome,
          telephone: HOTEL.telefone,
          email: HOTEL.emails[0],
          petsAllowed: true,
          address: {
            "@type": "PostalAddress",
            streetAddress: HOTEL.endereco,
            addressLocality: `${HOTEL.cidade} - ${HOTEL.bairro}`,
            addressRegion: HOTEL.uf,
            addressCountry: "BR",
          },
          amenityFeature: COMODIDADES.map((c) => ({
            "@type": "LocationFeatureSpecification",
            name: c,
            value: true,
          })),
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="mx-auto max-w-5xl pb-4">
      <section className="px-4 pt-4">
        <div className="relative overflow-hidden rounded-[16px] outline-1 -outline-offset-1 outline-black/5">
          <img
            src={fachadaHotel}
            alt="Fachada do Hotel Villa di Rimini na Avenida do Itaguá, em Ubatuba"
            width={1080}
            height={1320}
            className="h-[420px] w-full object-cover md:h-[520px]"
          />


          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-ink/10 to-transparent" />
        </div>

        <div className="relative -my-1 px-1">
          <div className="inline-block -rotate-2 animate-rise rounded-sm bg-ink py-1.5 pl-4 pr-3 text-paper">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em]">
              NA AVENIDA DO ITAGUÁ
            </span>
          </div>
        </div>

        <div className="pt-4">
          <h1 className="animate-rise font-display uppercase leading-[0.92] tracking-tight text-ink [animation-delay:80ms]">
            <span className="block text-[58px]">O mar</span>
            <span className="block text-[58px] text-surf">bate logo</span>
            <span className="block text-[58px]">na porta.</span>
          </h1>
          <p className="mt-4 max-w-[40ch] animate-rise text-pretty text-sm leading-relaxed text-ink-2 [animation-delay:160ms]">
            De frente para a Praia do Itaguá.
            &nbsp;Recepção 24h, piscina, café da manhã buffet e opções com varanda aberta para o mar.
          </p>
        </div>
      </section>

      <section className="mt-5 px-4">
        <ReservationForm />
      </section>

      <div className="mt-6">
        <Marquee itens={COMODIDADES} />
      </div>

      <section className="px-5 pt-10">
        <div className="animate-rise font-mono text-[10px] uppercase tracking-[0.25em] text-surf">
          (a) · Sobre
        </div>
        <h2 className="mt-2 animate-rise font-display text-4xl uppercase leading-[0.95] tracking-tight text-ink [animation-delay:60ms]">
          Varanda aberta para o mar
        </h2>
        <p className="mt-3 max-w-[46ch] animate-rise text-pretty text-sm leading-relaxed text-ink-2 [animation-delay:120ms]">
          Estamos na {HOTEL.endereco}, no {HOTEL.bairro}, perto dos melhores restaurantes e lojas de
          Ubatuba. O Projeto Tamar e o Aquário ficam a 5 minutos; as praias Vermelha e Grande, a 10
          minutos de carro.
        </p>
        <Link
          to="/o-hotel"
          className="mt-4 inline-block font-mono text-[11px] uppercase tracking-[0.15em] text-surf"
        >
          Conhecer o hotel →
        </Link>
      </section>

      <section className="px-4 pt-8">
        <div className="px-1">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-surf">
            (b) · Acomodações
          </div>
          <h2 className="mt-1 font-display text-4xl uppercase leading-[0.95] tracking-tight text-ink">
            Suítes de mar
          </h2>
        </div>

        <div className="mt-5 space-y-3">
          {ACOMODACOES.map((a, i) => (
            <RoomCard
              key={a.slug}
              nome={a.nome}
              detalhe={a.detalhe}
              descricao={a.descricao}
              imagem={a.imagem}
              etiqueta={a.etiqueta}
              delay={80 + i * 60}
            />
          ))}
        </div>
      </section>

      <section className="px-4 pt-10">
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-surf">
          (c) · Lazer &amp; café
        </div>
        <h2 className="mt-1 font-display text-4xl uppercase leading-[0.95] tracking-tight text-ink">
          Piscina, bar e buffet
        </h2>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="space-y-3">
            <img
              src={piscina}
              alt="Piscina do hotel com vista para o mar"
              loading="lazy"
              className="aspect-[4/5] w-full rounded-[12px] object-cover outline-1 -outline-offset-1 outline-black/5"
            />
            <img
              src={cafeDaManha}
              alt="Café da manhã buffet com frutas, pães e café"
              loading="lazy"
              className="aspect-[4/5] w-full rounded-[12px] object-cover outline-1 -outline-offset-1 outline-black/5"
            />
          </div>
          <div className="space-y-3 pt-1">
            <Link to="/lazer" className="block rounded-[12px] bg-paper-2 p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-2">
                Piscina &amp; bar
              </div>
              <p className="mt-1.5 text-sm leading-snug text-ink">
                Piscina e bar para petiscos e bebidas geladas.
              </p>
            </Link>
            <Link to="/cafe-da-manha" className="block rounded-[12px] bg-paper-2 p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-2">
                Café da manhã
              </div>
              <p className="mt-1.5 text-sm leading-snug text-ink">
                Buffet servido diariamente em sala de refeições ampla e iluminada.
              </p>
            </Link>
            <div className="relative overflow-hidden rounded-[12px] bg-ink p-4 text-paper">
              <div className="wave pointer-events-none absolute inset-0 opacity-60" />
              <div className="relative">
                <div className="inline-block -rotate-2 rounded-sm bg-surf px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-paper">
                  Pet friendly
                </div>
                <p className="mt-2 text-sm leading-snug text-paper">
                  Um dos poucos hotéis do Litoral Norte que recebe o seu pet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-4 pt-10">
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-surf">
          (d) · Contato
        </div>
        <h2 className="mt-1 font-display text-4xl uppercase leading-[0.95] tracking-tight text-ink">
          Fale com a recepção
        </h2>

        <div className="mt-4 overflow-hidden rounded-[14px] bg-paper-2 outline-1 -outline-offset-1 outline-black/5">
          <a href={HOTEL.mapa} target="_blank" rel="noreferrer">
            <img
              src={localizacao}
              alt="Vista aérea da orla do Itaguá em Ubatuba"
              loading="lazy"
              className="h-40 w-full object-cover"
            />
          </a>
          <div className="p-4">
            <div className="text-sm leading-snug text-ink">
              {HOTEL.endereco}
              <br />
              {HOTEL.bairro} · {HOTEL.cidade} / {HOTEL.uf}
            </div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-ink-2">
              <a href={HOTEL.telefoneLink}>{HOTEL.telefone}</a>
              <a href={`mailto:${HOTEL.emails[0]}`}>{HOTEL.emails[0]}</a>
            </div>
            <a
              href={HOTEL.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-ink py-3.5 text-sm font-semibold text-paper active:opacity-90"
            >
              <span className="inline-block size-2 rounded-full bg-surf" />
              Chamar no WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
