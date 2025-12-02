-- Update the handle_new_user function to use role from user metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
declare
  user_role app_role;
begin
  -- Get role from user metadata, default to 'user' if not provided
  user_role := coalesce((new.raw_user_meta_data ->> 'role')::app_role, 'user'::app_role);
  
  insert into public.profiles (user_id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  
  insert into public.user_roles (user_id, role)
  values (new.id, user_role);
  
  return new;
end;
$function$;