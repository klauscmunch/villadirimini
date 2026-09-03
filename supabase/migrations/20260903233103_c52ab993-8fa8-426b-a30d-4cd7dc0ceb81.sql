CREATE TABLE public.pre_reservas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  email text NOT NULL,
  telefone text NOT NULL,
  cidade text,
  estado text,
  acomodacao text,
  check_in date NOT NULL,
  check_out date NOT NULL,
  adultos integer NOT NULL DEFAULT 1,
  criancas integer NOT NULL DEFAULT 0,
  mensagem text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.pre_reservas TO anon;
GRANT INSERT ON public.pre_reservas TO authenticated;
GRANT ALL ON public.pre_reservas TO service_role;

ALTER TABLE public.pre_reservas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Qualquer visitante pode enviar pre-reserva"
ON public.pre_reservas
FOR INSERT
TO anon, authenticated
WITH CHECK (true);