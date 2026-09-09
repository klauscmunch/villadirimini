import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ACOMODACOES } from "@/lib/hotel";
import {
  comprimirImagem,
  MARQUEE_PADRAO,
  useFotos,
  useFotosQuartos,
  useMarquee,
} from "@/lib/site-content";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Administração — Hotel Villa di Rimini" },
      { name: "description", content: "Painel de administração do site do hotel." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Administração — Hotel Villa di Rimini" },
      { property: "og:description", content: "Painel de administração do site do hotel." },
    ],
  }),
  component: Admin,
});

function Admin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: ehAdmin, isLoading: carregandoPapel } = useQuery({
    queryKey: ["admin", "role"],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return false;
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userData.user.id)
        .eq("role", "admin")
        .maybeSingle();
      return Boolean(data);
    },
  });

  async function sair() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-4xl uppercase tracking-tight text-ink">Administração</h1>
        <button
          type="button"
          onClick={sair}
          className="font-mono text-[11px] uppercase tracking-[0.15em] text-surf"
        >
          Sair →
        </button>
      </div>

      {carregandoPapel ? (
        <p className="mt-6 text-sm text-ink-2">Carregando...</p>
      ) : !ehAdmin ? (
        <p className="mt-6 text-sm text-ink-2">
          Esta conta não tem permissão de administrador.
        </p>
      ) : (
        <div className="mt-8 space-y-12">
          <PainelMarquee />
          <PainelQuartos />
          <PainelHotel />
        </div>
      )}
    </div>
  );
}

function Titulo({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-2xl uppercase tracking-tight text-ink">{children}</h2>
  );
}

function PainelMarquee() {
  const queryClient = useQueryClient();
  const config = useMarquee();
  const [itens, setItens] = useState<string[]>(config.itens);
  const [segundos, setSegundos] = useState(config.segundos);
  const [estado, setEstado] = useState<string | null>(null);

  useEffect(() => {
    setItens(config.itens);
    setSegundos(config.segundos);
  }, [config]);

  async function salvar() {
    setEstado("Salvando...");
    const limpos = itens.map((t) => t.trim()).filter(Boolean);
    const { error } = await supabase
      .from("site_config")
      .upsert(
        { chave: "marquee", valor: { itens: limpos.length ? limpos : MARQUEE_PADRAO.itens, segundos } },
        { onConflict: "chave" },
      );
    if (error) return setEstado("Erro ao salvar: " + error.message);
    await queryClient.invalidateQueries({ queryKey: ["site_config", "marquee"] });
    setEstado("Salvo!");
  }

  return (
    <section>
      <Titulo>Faixa de comodidades</Titulo>
      <div className="mt-4 space-y-2">
        {itens.map((texto, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={texto}
              onChange={(e) =>
                setItens(itens.map((t, idx) => (idx === i ? e.target.value : t)))
              }
              className="w-full border border-line bg-paper-2 px-3 py-2.5 text-sm text-ink outline-none"
            />
            <button
              type="button"
              onClick={() => setItens(itens.filter((_, idx) => idx !== i))}
              className="shrink-0 border border-line px-3 font-mono text-[11px] uppercase text-ink-2"
            >
              Remover
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setItens([...itens, ""])}
          className="font-mono text-[11px] uppercase tracking-[0.15em] text-surf"
        >
          + Adicionar texto
        </button>
      </div>

      <div className="mt-6">
        <label className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-2">
          Velocidade do movimento — {segundos}s por volta ({segundos <= 12 ? "rápido" : segundos >= 30 ? "lento" : "médio"})
        </label>
        <input
          type="range"
          min={5}
          max={60}
          step={1}
          value={segundos}
          onChange={(e) => setSegundos(Number(e.target.value))}
          className="mt-2 w-full"
        />
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button type="button" onClick={salvar} className="bg-ink px-5 py-3 text-sm font-semibold text-paper">
          Salvar faixa
        </button>
        {estado && <span className="text-sm text-ink-2">{estado}</span>}
      </div>
    </section>
  );
}

function PainelQuartos() {
  const queryClient = useQueryClient();
  const quartos = useFotosQuartos();
  const [estado, setEstado] = useState<string | null>(null);

  async function trocar(slug: string, nome: string, file: File) {
    setEstado("Enviando foto de " + nome + "...");
    try {
      const url = await comprimirImagem(file);
      const { error } = await supabase
        .from("site_fotos")
        .upsert(
          { secao: "quartos", chave: slug, url, alt: `Apartamento ${nome}`, ordem: 0 },
          { onConflict: "secao,chave" },
        );
      if (error) throw error;
      await queryClient.invalidateQueries({ queryKey: ["site_fotos", "quartos"] });
      setEstado("Foto de " + nome + " atualizada!");
    } catch (err) {
      setEstado(err instanceof Error ? err.message : "Erro ao enviar a foto.");
    }
  }

  async function restaurar(slug: string) {
    await supabase.from("site_fotos").delete().eq("secao", "quartos").eq("chave", slug);
    await queryClient.invalidateQueries({ queryKey: ["site_fotos", "quartos"] });
    setEstado("Foto original restaurada.");
  }

  return (
    <section>
      <Titulo>Fotos dos quartos</Titulo>
      {estado && <p className="mt-2 text-sm text-ink-2">{estado}</p>}
      <div className="mt-4 space-y-4">
        {quartos.map((q) => (
          <div key={q.slug} className="flex gap-3 border border-line p-3">
            <img src={q.imagem} alt={q.nome} className="h-24 w-32 shrink-0 object-cover" />
            <div className="min-w-0">
              <div className="font-display text-xl leading-none text-ink">{q.nome}</div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void trocar(q.slug, q.nome, f);
                }}
                className="mt-3 block w-full text-xs text-ink-2"
              />
              <button
                type="button"
                onClick={() => void restaurar(q.slug)}
                className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-surf"
              >
                Restaurar foto original
              </button>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-ink-2">
        Total de quartos cadastrados: {ACOMODACOES.length}
      </p>
    </section>
  );
}

function PainelHotel() {
  const queryClient = useQueryClient();
  const fotos = useFotos("hotel");
  const [estado, setEstado] = useState<string | null>(null);

  async function adicionar(file: File) {
    setEstado("Enviando foto...");
    try {
      const url = await comprimirImagem(file);
      const ordem = fotos.length ? Math.max(...fotos.map((f) => f.ordem)) + 1 : 0;
      const { error } = await supabase
        .from("site_fotos")
        .insert({ secao: "hotel", url, alt: "Hotel Villa di Rimini", ordem });
      if (error) throw error;
      await queryClient.invalidateQueries({ queryKey: ["site_fotos", "hotel"] });
      setEstado("Foto adicionada!");
    } catch (err) {
      setEstado(err instanceof Error ? err.message : "Erro ao enviar a foto.");
    }
  }

  async function remover(id: string) {
    await supabase.from("site_fotos").delete().eq("id", id);
    await queryClient.invalidateQueries({ queryKey: ["site_fotos", "hotel"] });
    setEstado("Foto removida.");
  }

  return (
    <section>
      <Titulo>Fotos da página “O Hotel”</Titulo>
      <p className="mt-2 text-sm text-ink-2">
        Enquanto nenhuma foto for enviada aqui, a página mostra as fotos originais.
      </p>
      {estado && <p className="mt-2 text-sm text-ink-2">{estado}</p>}

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void adicionar(f);
        }}
        className="mt-4 block w-full text-xs text-ink-2"
      />

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {fotos.map((f) => (
          <div key={f.id} className="border border-line p-2">
            <img src={f.url} alt={f.alt} className="aspect-[4/5] w-full object-cover" />
            <button
              type="button"
              onClick={() => f.id && void remover(f.id)}
              className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-surf"
            >
              Remover
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
