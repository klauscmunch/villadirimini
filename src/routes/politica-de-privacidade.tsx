import { createFileRoute } from "@tanstack/react-router";
import { HOTEL } from "@/lib/hotel";

const TITULO = "Política de privacidade — Hotel Villa di Rimini";
const DESCRICAO =
  "Como o Hotel Villa di Rimini coleta, usa e protege os dados enviados pelo site e pelo formulário de pré-reserva.";

export const Route = createFileRoute("/politica-de-privacidade")({
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
  component: Politica,
});

function Politica() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-8">
      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-surf">Privacidade</div>
      <h1 className="mt-1 font-display text-4xl uppercase leading-[0.95] tracking-tight text-ink">
        Política de privacidade
      </h1>

      <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink-2">
        <p>
          O {HOTEL.nome} respeita a sua privacidade. Os dados informados no formulário de pré-reserva
          (nome, e-mail, telefone, cidade, datas e número de hóspedes) são usados exclusivamente para
          responder ao seu pedido de hospedagem.
        </p>
        <p>
          Não vendemos nem compartilhamos seus dados com terceiros para fins de publicidade. As
          informações ficam armazenadas em ambiente seguro e são acessadas apenas pela equipe do
          hotel.
        </p>
        <p>
          Você pode solicitar a consulta, a correção ou a exclusão dos seus dados a qualquer momento
          pelo e-mail{" "}
          <a href={`mailto:${HOTEL.emails[0]}`} className="text-surf">
            {HOTEL.emails[0]}
          </a>{" "}
          ou pelo telefone {HOTEL.telefone}.
        </p>
        <p>
          Este site utiliza apenas recursos necessários ao seu funcionamento; não usamos cookies de
          rastreamento publicitário.
        </p>
      </div>
    </div>
  );
}
