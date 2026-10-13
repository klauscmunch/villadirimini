import { createFileRoute } from "@tanstack/react-router";
import { GaleriaSecao } from "@/components/gallery";

const TITULO = "Café da manhã — Hotel Villa di Rimini";
const DESCRICAO =
  "Buffet de café da manhã servido diariamente em sala ampla e bem iluminada, no Hotel Villa di Rimini, em Ubatuba.";

export const Route = createFileRoute("/cafe-da-manha")({
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
  component: Cafe,
});

function Cafe() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="px-1 font-mono text-[10px] uppercase tracking-[0.25em] text-surf">
        Café da manhã
      </div>
      <h1 className="mt-1 px-1 font-display text-5xl uppercase leading-[0.95] tracking-tight text-ink">
        O dia começa no buffet
      </h1>
      <p className="mt-3 max-w-[46ch] px-1 text-sm leading-relaxed text-ink-2">
        Servimos diariamente um buffet de café da manhã em uma sala de refeições ampla e bem
        iluminada: frutas da estação, pães, bolos, frios, sucos e café fresquinho.
      </p>

      <div className="mt-6">
        <GaleriaSecao secao="cafe" />
      </div>
    </div>
  );
}
