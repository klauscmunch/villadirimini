import { useState, type FormEvent } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { ACOMODACOES, ESTADOS, HOTEL, MOTOR_RESERVAS } from "@/lib/hotel";

const schema = z
  .object({
    nome: z.string().trim().min(3, "Informe seu nome completo").max(120),
    email: z.string().trim().email("E-mail inválido").max(180),
    telefone: z.string().trim().min(8, "Informe um telefone com DDD").max(30),
    cidade: z.string().trim().max(120).optional(),
    estado: z.string().trim().max(2).optional(),
    acomodacao: z.string().trim().max(60).optional(),
    check_in: z.string().min(1, "Escolha a data de entrada"),
    check_out: z.string().min(1, "Escolha a data de saída"),
    adultos: z.coerce.number().int().min(1).max(10),
    criancas: z.coerce.number().int().min(0).max(10),
    mensagem: z.string().trim().max(1000).optional(),
  })
  .refine((d) => d.check_out > d.check_in, {
    message: "A saída precisa ser depois da entrada",
    path: ["check_out"],
  });

const campo =
  "mt-1 w-full rounded-md bg-paper/10 px-3 py-2.5 text-sm text-paper placeholder:text-paper/40 outline-none ring-1 ring-paper/10 focus:ring-surf";
const rotulo = "font-mono text-[9px] uppercase tracking-[0.15em] text-paper/50";

export function ReservationForm() {
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro(null);
    const form = event.currentTarget;
    const dados = Object.fromEntries(new FormData(form).entries());
    const parsed = schema.safeParse(dados);

    if (!parsed.success) {
      setErro(parsed.error.issues[0]?.message ?? "Confira os dados do formulário");
      return;
    }

    setEnviando(true);
    const d = parsed.data;
    const { error } = await supabase.from("pre_reservas").insert({
      nome: d.nome,
      email: d.email,
      telefone: d.telefone,
      cidade: d.cidade ?? null,
      estado: d.estado ?? null,
      acomodacao: d.acomodacao ?? null,
      check_in: d.check_in,
      check_out: d.check_out,
      adultos: d.adultos,
      criancas: d.criancas,
      mensagem: d.mensagem ?? null,
    });


    if (error) {
      setErro("Não foi possível enviar agora. Tente pelo WhatsApp, por favor.");
      return;
    }

    setOk(true);
    form.reset();
  }

  return (
    <div id="reserva" className="rounded-[14px] bg-ink p-4 text-paper ring-1 ring-black/5">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-display text-lg tracking-tight">Pré-reserva</span>
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-surf">
          {HOTEL.cidade} · {HOTEL.uf}
        </span>
      </div>

      {ok ? (
        <div className="rounded-md bg-paper/10 p-4">
          <p className="text-sm">
            Pedido de pré-reserva enviado! Nossa recepção entra em contato para confirmar
            disponibilidade e valores.
          </p>
          <button
            type="button"
            onClick={() => setOk(false)}
            className="mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-surf"
          >
            Enviar outro pedido
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate>
          <div className="grid grid-cols-2 gap-2.5">
            <label className="col-span-2">
              <span className={rotulo}>Nome</span>
              <input name="nome" className={campo} placeholder="Seu nome completo" />
            </label>
            <label className="col-span-2 sm:col-span-1">
              <span className={rotulo}>E-mail</span>
              <input name="email" type="email" className={campo} placeholder="voce@email.com" />
            </label>
            <label className="col-span-2 sm:col-span-1">
              <span className={rotulo}>Telefone</span>
              <input name="telefone" className={campo} placeholder="(00) 00000-0000" />
            </label>
            <label>
              <span className={rotulo}>Cidade</span>
              <input name="cidade" className={campo} placeholder="Sua cidade" />
            </label>
            <label>
              <span className={rotulo}>Estado</span>
              <select name="estado" className={campo} defaultValue="">
                <option value="">UF</option>
                {ESTADOS.map((uf) => (
                  <option key={uf} value={uf} className="text-ink">
                    {uf}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className={rotulo}>Check-in</span>
              <input name="check_in" type="date" className={campo} />
            </label>
            <label>
              <span className={rotulo}>Check-out</span>
              <input name="check_out" type="date" className={campo} />
            </label>
            <label>
              <span className={rotulo}>Adultos</span>
              <select name="adultos" className={campo} defaultValue="2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n} className="text-ink">
                    {n}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className={rotulo}>Crianças (0 a 5)</span>
              <select name="criancas" className={campo} defaultValue="0">
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n} className="text-ink">
                    {n}
                  </option>
                ))}
              </select>
            </label>
            <label className="col-span-2">
              <span className={rotulo}>Acomodação</span>
              <select name="acomodacao" className={campo} defaultValue="">
                <option value="">Sem preferência</option>
                {ACOMODACOES.map((a) => (
                  <option key={a.slug} value={a.nome} className="text-ink">
                    {a.nome}
                  </option>
                ))}
              </select>
            </label>
            <label className="col-span-2">
              <span className={rotulo}>Mensagem</span>
              <textarea
                name="mensagem"
                rows={3}
                className={campo}
                placeholder="Vai levar pet? Precisa de berço? Conte aqui."
              />
            </label>
          </div>

          {erro && <p className="mt-3 text-sm text-paper/90">{erro}</p>}

          <button
            type="submit"
            disabled={enviando}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-md bg-surf py-3.5 text-sm font-semibold text-paper active:opacity-90 disabled:opacity-60"
          >
            {enviando ? "Enviando…" : "Enviar pré-reserva"}
            <span className="font-mono text-xs">→</span>
          </button>
        </form>
      )}

      {MOTOR_RESERVAS && (
        <a
          href={MOTOR_RESERVAS}
          target="_blank"
          rel="noreferrer"
          className="mt-2 flex w-full items-center justify-center rounded-md bg-paper/10 py-3 text-sm font-semibold text-paper"
        >
          Reservar agora online
        </a>
      )}

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
