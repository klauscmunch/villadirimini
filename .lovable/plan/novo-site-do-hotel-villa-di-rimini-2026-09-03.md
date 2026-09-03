# Novo site do Hotel Villa di Rimini

Site novo, moderno e mobile-first, em português, com os dados reais extraídos de villadirimini.com.br. Direção visual escolhida: **Diagonal kinetic litoral** (papel areia, tinta azul-petróleo, acento turquesa, títulos em Anton, detalhes em mono).

## Páginas

- **/** (home) — hero com foto de praia, chamada em letras grandes, bloco de pré-reserva, faixa animada com as comodidades, "Sobre o hotel", acomodações, lazer/café da manhã, bloco pet friendly, contato e rodapé.
- **/acomodacoes** — lista das acomodações com galeria e botão de pré-reserva.
- **/o-hotel** — texto completo do hotel + galeria.
- **/lazer** e **/cafe-da-manha** — galerias de área de lazer e café da manhã.
- **/contato** — endereço, telefone, WhatsApp, e-mails, redes sociais e formulário.
- **/politica-de-privacidade** — página de política.

## Conteúdo real usado

- De frente para a Praia do Itaguá, centro de Ubatuba; Praia Vermelha e Praia Grande a 10 min; Projeto Tamar e Aquário a 5 min.
- Recepção 24h, Wi-Fi grátis em todas as dependências, estacionamento privativo gratuito, piscina e bar, café da manhã buffet em sala ampla, pet friendly.
- Av. Leovigildo Dias Vieira, 1140 — Itaguá, Ubatuba/SP · (12) 3832-5785 · WhatsApp mesmo número · [reservas@villadirimini.com.br](mailto:reservas@villadirimini.com.br) · [villadirimi@terra.com.br](mailto:villadirimi@terra.com.br) · Instagram @villadirimini · Facebook HotelVillaDiRimini.

## Reservas

Formulário de pré-reserva (nome, e-mail, telefone, cidade/estado, check-in, check-out, adultos, crianças de 0 a 5, acomodação e mensagem), com validação. O envio precisa de backend: ativo o Lovable Cloud para gravar cada pedido e disparar o e-mail para [reservas@villadirimini.com.br](mailto:reservas@villadirimini.com.br). Enquanto o envio de e-mail não estiver configurado com domínio verificado, o pedido fica salvo e um botão de WhatsApp fica sempre visível como alternativa.

Botão para jogar para o motor de reserva externo do h system

## Imagens

As fotos atuais do site são pequenas e ficarão desatualizadas no novo layout. Uso imagens geradas de alta qualidade (praia, suítes, piscina, café da manhã) como base, e depois você pode substituir pelas fotos reais do hotel — basta enviá-las.

## Detalhes técnicos

- TanStack Start + Tailwind v4; tokens da direção escolhida (`--color-paper`, `--color-ink`, `--color-surf`, etc.) definidos em `src/styles.css` via `@theme inline`; fontes Anton/Inter/JetBrains Mono carregadas por `<link>` no `__root.tsx`.
- Componentes reutilizáveis: `SiteHeader`, `SiteFooter`, `ReservationForm`, `RoomCard`, `Gallery`, `Marquee`.
- `src/routes/index.tsx` substitui o placeholder atual.
- Pré-reserva via server function com validação Zod, gravando em tabela `pre_reservas` no Lovable Cloud (RLS: insert público, leitura só para administradores).
- SEO: `head()` próprio por rota, títulos/descrições em PT-BR, JSON-LD do tipo Hotel na home, sitemap e robots.