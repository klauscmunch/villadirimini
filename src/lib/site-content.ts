import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ACOMODACOES, COMODIDADES } from "./hotel";

export type MarqueeConfig = { itens: string[]; segundos: number };

export const MARQUEE_PADRAO: MarqueeConfig = { itens: COMODIDADES, segundos: 18 };

export type Foto = { id?: string; url: string; alt: string; ordem: number; chave?: string | null };

export const FOTOS_HOTEL_PADRAO: Foto[] = [];

export type BannerConfig = { intervalo: number };
export const BANNER_PADRAO: BannerConfig = { intervalo: 3000 };

async function buscarBanner(): Promise<BannerConfig> {
  const { data, error } = await supabase
    .from("site_config")
    .select("valor")
    .eq("chave", "banner")
    .maybeSingle();
  if (error || !data) return BANNER_PADRAO;
  const valor = data.valor as Partial<BannerConfig> | null;
  const intervalo = Number(valor?.intervalo);
  return { intervalo: intervalo > 0 ? intervalo : BANNER_PADRAO.intervalo };
}

export function useBannerConfig() {
  const { data } = useQuery({
    queryKey: ["site_config", "banner"],
    queryFn: buscarBanner,
    staleTime: 60_000,
  });
  return data ?? BANNER_PADRAO;
}

async function buscarMarquee(): Promise<MarqueeConfig> {
  const { data, error } = await supabase
    .from("site_config")
    .select("valor")
    .eq("chave", "marquee")
    .maybeSingle();
  if (error || !data) return MARQUEE_PADRAO;
  const valor = data.valor as Partial<MarqueeConfig> | null;
  return {
    itens: Array.isArray(valor?.itens) && valor.itens.length ? valor.itens : MARQUEE_PADRAO.itens,
    segundos: Number(valor?.segundos) > 0 ? Number(valor?.segundos) : MARQUEE_PADRAO.segundos,
  };
}

export function useMarquee() {
  const { data } = useQuery({
    queryKey: ["site_config", "marquee"],
    queryFn: buscarMarquee,
    staleTime: 60_000,
  });
  return data ?? MARQUEE_PADRAO;
}

async function buscarFotos(secao: string): Promise<Foto[]> {
  const { data, error } = await supabase
    .from("site_fotos")
    .select("id, url, alt, ordem, chave")
    .eq("secao", secao)
    .order("ordem", { ascending: true });
  if (error || !data) return [];
  return data as Foto[];
}

export function useFotos(secao: string) {
  const { data } = useQuery({
    queryKey: ["site_fotos", secao],
    queryFn: () => buscarFotos(secao),
    staleTime: 60_000,
  });
  return data ?? [];
}

/** Fotos dos quartos (várias por quarto), com fallback para as imagens originais. */
export function useFotosQuartos() {
  const fotos = useFotos("quartos");
  return ACOMODACOES.map((a) => {
    const doQuarto = fotos.filter((f) => f.chave === a.slug);
    return {
      ...a,
      fotos: doQuarto,
      imagem: doQuarto[0]?.url ?? a.imagem,
      imagens: doQuarto.length ? doQuarto.map((f) => f.url) : [a.imagem],
    };
  });
}

/** Reduz a imagem e devolve um JPEG em data URL, pronto para salvar. */
export function comprimirImagem(file: File, maxLado = 1600, qualidade = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Não foi possível ler o arquivo."));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Arquivo de imagem inválido."));
      img.onload = () => {
        const escala = Math.min(1, maxLado / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * escala);
        canvas.height = Math.round(img.height * escala);
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Navegador não suportado."));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", qualidade));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
