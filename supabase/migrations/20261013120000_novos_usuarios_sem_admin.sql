-- Novas contas não recebem mais o papel 'admin' automaticamente (antes, a primeira conta
-- criada virava admin). Toda conta nova recebe 'user'; administradores são definidos
-- manualmente, por exemplo:
--   INSERT INTO public.user_roles (user_id, role) VALUES ('<uuid do usuário>', 'admin');
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.handle_new_user_role() FROM anon, authenticated, public;
