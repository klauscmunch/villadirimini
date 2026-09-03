import { createFileRoute } from "@tanstack/react-router";
import piscina from "@/assets/piscina.jpg";
import hotelImg from "@/assets/hotel.jpg";
import heroPraia from "@/assets/hero-praia.jpg";
import { Gallery } from "@/components/gallery";

const TITULO = "Área de lazer — Hotel Villa di Rimini";
const DESCRICAO =
  "Piscina, deck e bar com petiscos e bebidas geladas, a poucos passos da Praia do Itaguá, em Ubatuba.";

export const Route = createFileRoute("/lazer")({
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
  component: Lazer,
});

function Lazer() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="px-1 font-mono text-[10px] uppercase tracking-[0.25em] text-surf">Lazer</div>
      <h1 className="mt-1 px-1 font-display text-5xl uppercase leading-[0.95] tracking-tight text-ink">
        Piscina, deck e bar
      </h1>
      <p className="mt-3 max-w-[46ch] px-1 text-sm leading-relaxed text-ink-2">
        Passe o dia entre a piscina e a praia: o bar serve petiscos e bebidas refrescantes à beira
        d'água, e a recepção 24h ajuda a organizar trilhas e passeios de barco.
      </p>

      <div className="mt-6">
        <Gallery
          imagens={[
            { src: piscina, alt: "Piscina do hotel ao pôr do sol" },
            { src: hotelImg, alt: "Bar e área de convivência" },
            { src: heroPraia, alt: "Praia em frente ao hotel" },
          ]}
        />
      </div>
    </div>
  );
}
