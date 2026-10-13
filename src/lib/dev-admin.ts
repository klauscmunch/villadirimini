// Login de teste "admin / admin" — existe apenas em desenvolvimento local (vite dev).
// Em build de produção `import.meta.env.DEV` é false e todo este atalho é removido.
// Dá acesso visual ao painel /admin; gravações continuam exigindo uma conta admin real
// no Supabase (as políticas RLS bloqueiam o resto).

const CHAVE = "villa-dev-admin";

export const DEV_ADMIN_HABILITADO = import.meta.env.DEV;

export function credenciaisDevAdmin(usuario: string, senha: string) {
  return DEV_ADMIN_HABILITADO && usuario.trim() === "admin" && senha === "admin";
}

export function entrarDevAdmin() {
  if (!DEV_ADMIN_HABILITADO) return;
  try {
    sessionStorage.setItem(CHAVE, "1");
  } catch {
    // sessionStorage indisponível — ignora
  }
}

export function sairDevAdmin() {
  try {
    sessionStorage.removeItem(CHAVE);
  } catch {
    // sessionStorage indisponível — ignora
  }
}

export function ehDevAdmin() {
  if (!DEV_ADMIN_HABILITADO || typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(CHAVE) === "1";
  } catch {
    return false;
  }
}
