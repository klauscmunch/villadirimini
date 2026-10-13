import { useFotosComEstado } from "@/lib/site-content";

type Imagem = { src: string; alt: string };

export function Gallery({ imagens }: { imagens: Imagem[] }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {imagens.map((img) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          loading="lazy"
          className="aspect-[4/5] w-full rounded-[12px] object-cover outline-1 -outline-offset-1 outline-black/5"
        />
      ))}
    </div>
  );
}

/**
 * Galeria com as fotos enviadas pelo painel admin para `secao`.
 * Enquanto carrega mostra blocos vazios; sem fotos enviadas usa `padrao` (ou não mostra nada).
 */
export function GaleriaSecao({ secao, padrao = [] }: { secao: string; padrao?: Imagem[] }) {
  const { fotos, carregando } = useFotosComEstado(secao);

  if (carregando) {
    return (
      <div className="grid grid-cols-2 gap-3" aria-hidden="true">
        <div className="aspect-[4/5] w-full rounded-[12px] bg-black/5" />
        <div className="aspect-[4/5] w-full rounded-[12px] bg-black/5" />
      </div>
    );
  }

  const imagens = fotos.length
    ? fotos.map((f) => ({ src: f.url, alt: f.alt || "Hotel Villa di Rimini" }))
    : padrao;
  if (!imagens.length) return null;
  return <Gallery imagens={imagens} />;
}
