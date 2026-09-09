import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Acesso restrito — Hotel Villa di Rimini" },
      { name: "description", content: "Área de administração do site do Hotel Villa di Rimini." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Acesso restrito — Hotel Villa di Rimini" },
      { property: "og:description", content: "Área de administração do site." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [modo, setModo] = useState<"entrar" | "criar">("entrar");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin", replace: true });
    });
  }, [navigate]);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setMsg(null);
    setCarregando(true);
    try {
      if (modo === "entrar") {
        const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
        if (error) throw error;
        navigate({ to: "/admin", replace: true });
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password: senha,
          options: { emailRedirectTo: window.location.origin + "/admin" },
        });
        if (error) throw error;
        if (data.session) navigate({ to: "/admin", replace: true });
        else setMsg("Conta criada. Confirme o e-mail que enviamos para continuar.");
      }
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Não foi possível continuar.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm px-5 py-12">
      <h1 className="font-display text-3xl uppercase tracking-tight text-ink">
        {modo === "entrar" ? "Entrar" : "Criar conta"}
      </h1>
      <p className="mt-2 text-sm text-ink-2">Área de administração do site.</p>

      <form onSubmit={enviar} className="mt-6 space-y-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          className="w-full border border-line bg-paper-2 px-3 py-3 text-sm text-ink outline-none"
        />
        <input
          type="password"
          required
          minLength={6}
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha"
          className="w-full border border-line bg-paper-2 px-3 py-3 text-sm text-ink outline-none"
        />
        {erro && <p className="text-sm text-red-600">{erro}</p>}
        {msg && <p className="text-sm text-ink-2">{msg}</p>}
        <button
          type="submit"
          disabled={carregando}
          className="w-full bg-ink py-3.5 text-sm font-semibold text-paper disabled:opacity-60"
        >
          {carregando ? "Aguarde..." : modo === "entrar" ? "Entrar" : "Criar conta"}
        </button>
      </form>

      <button
        type="button"
        onClick={() => setModo(modo === "entrar" ? "criar" : "entrar")}
        className="mt-4 font-mono text-[11px] uppercase tracking-[0.15em] text-surf"
      >
        {modo === "entrar" ? "Criar uma conta →" : "Já tenho conta →"}
      </button>
    </div>
  );
}
