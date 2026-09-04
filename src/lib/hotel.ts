import quartoMar from "@/assets/quarto-mar.jpg";
import quartoDuplo from "@/assets/quarto-duplo.jpg";
import quartoFamilia from "@/assets/quarto-familia.jpg";

export const HOTEL = {
  nome: "Hotel Villa di Rimini",
  bairro: "Itaguá",
  cidade: "Ubatuba",
  uf: "SP",
  endereco: "Av. Leovigildo Dias Vieira, 1140",
  telefone: "(12) 3832-5785",
  telefoneLink: "tel:1238325785",
  whatsapp:
    "https://api.whatsapp.com/send?phone=551238325785&text=Ol%C3%A1!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20hospedagem%20no%20Hotel%20Villa%20di%20Rimini",
  emails: ["reservas@villadirimini.com.br", "villadirimi@terra.com.br"],
  instagram: "https://www.instagram.com/villadirimini",
  facebook: "https://www.facebook.com/HotelVillaDiRimini",
  mapa: "https://www.google.com/maps/search/?api=1&query=Av.+Leovigildo+Dias+Vieira,+1140+-+Itagu%C3%A1,+Ubatuba+-+SP",
};

/** Link do motor de reservas externo (H System). */
export const MOTOR_RESERVAS =
  "https://hbook.hsystem.com.br/Booking/IndexMobile?companyId=64c7f03434483c2f17b5ae20&language=pt";

export const COMODIDADES = [
  "Recepção 24h",
  "Wi-Fi grátis",
  "ESTACIONAMENTO",
  "Piscina & bar",
  "Café da manhã buffet",
  "Pet friendly",
];

export const ACOMODACOES = [
  {
    slug: "duplo",
    nome: "Duplo",
    imagem: quartoDuplo,
    detalhe: "2 pessoas · cama de casal",
    descricao:
      "Apartamento confortável para casais, com ar-condicionado, TV, frigobar e enxoval completo.",
    etiqueta: null as string | null,
  },
  {
    slug: "mar",
    nome: "Duplo vista mar",
    imagem: quartoMar,
    detalhe: "2 pessoas · varanda",
    descricao:
      "Apartamento voltado para a Praia do Itaguá, com varanda para acompanhar o nascer do sol.",
    etiqueta: "Vista mar",
  },
  {
    slug: "familia",
    nome: "Família",
    imagem: quartoFamilia,
    detalhe: "4 PESSOAS · 1 CAMA DE CASAL + 2 CAMAS DE SOLTEIROS",
    descricao:
      "Espaço extra para a família toda, com camas adicionais e área de estar.",
    etiqueta: "Família",
  },
];

export const ESTADOS = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR",
  "PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO",
];
