import fachadaHotel from "@/assets/hotel-fachada.jpg";
import { useFotosComEstado } from "@/lib/site-content";

/** Foto do cartão de contato: a primeira foto da seção "contato" do painel, ou a fachada. */
export function FotoContato() {
  const { fotos, carregando } = useFotosComEstado("contato");
  if (carregando) return <div className="h-40 w-full bg-black/5" aria-hidden="true" />;
  const foto = fotos[0]
    ? { src: fotos[0].url, alt: fotos[0].alt || "Hotel Villa di Rimini" }
    : { src: fachadaHotel, alt: "Fachada do Hotel Villa di Rimini na Avenida do Itaguá" };
  return <img src={foto.src} alt={foto.alt} loading="lazy" className="h-40 w-full object-cover" />;
}
