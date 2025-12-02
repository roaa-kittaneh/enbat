-- Create roles enum
create type public.app_role as enum ('admin', 'user');

-- Create profiles table
create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null unique,
  email text,
  full_name text,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Create user_roles table
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null default 'user',
  unique (user_id, role)
);

-- Create projects table
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_url text,
  service_type text not null,
  client text,
  year text,
  is_featured boolean default false,
  display_order integer default 0,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.projects enable row level security;

-- Security definer function to check roles
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

-- Profiles policies
create policy "Users can view their own profile"
on public.profiles for select
using (auth.uid() = user_id);

create policy "Users can update their own profile"
on public.profiles for update
using (auth.uid() = user_id);

-- User roles policies (only admins can manage roles)
create policy "Users can view their own roles"
on public.user_roles for select
using (auth.uid() = user_id);

create policy "Admins can view all roles"
on public.user_roles for select
using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can manage roles"
on public.user_roles for all
using (public.has_role(auth.uid(), 'admin'));

-- Projects policies (public read, admin write)
create policy "Anyone can view projects"
on public.projects for select
to anon, authenticated
using (true);

create policy "Admins can manage projects"
on public.projects for all
using (public.has_role(auth.uid(), 'admin'));

-- Trigger to create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (user_id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  
  insert into public.user_roles (user_id, role)
  values (new.id, 'user');
  
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Update timestamp function
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at_column();

create trigger update_projects_updated_at
  before update on public.projects
  for each row execute function public.update_updated_at_column();