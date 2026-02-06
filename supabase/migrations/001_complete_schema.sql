-- ============================================================================
-- CareerCare — Migration SQL Complète
-- À exécuter dans Supabase SQL Editor (dans l'ordre)
-- ============================================================================

-- ============================================================================
-- 001 : Profiles (extension de auth.users)
-- ============================================================================

create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  locale text default 'fr',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table profiles enable row level security;

create policy "Users can view own profile" on profiles
  for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================================
-- 002 : CV Analyses
-- ============================================================================

create table if not exists public.cv_analyses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  file_path text not null,
  file_name text,
  raw_text text,
  anonymized_text text,
  anonymization_map jsonb,
  status text default 'pending'
    check (status in ('pending', 'extracting', 'anonymizing', 'analyzing', 'deanonymizing', 'done', 'error')),
  created_at timestamptz default now()
);

create index idx_cv_analyses_user_id on cv_analyses(user_id);
create index idx_cv_analyses_status on cv_analyses(status);

alter table cv_analyses enable row level security;

-- Users voient leurs propres analyses
create policy "Users can view own analyses" on cv_analyses
  for select using (auth.uid() = user_id);

-- Les analyses anonymes (user_id = null) sont accessibles via service_role uniquement
create policy "Users can insert own analyses" on cv_analyses
  for insert with check (auth.uid() = user_id or user_id is null);

-- ============================================================================
-- 003 : CV Results
-- ============================================================================

create table if not exists public.cv_results (
  id uuid primary key default gen_random_uuid(),
  analysis_id uuid references cv_analyses(id) on delete cascade not null,
  score_global int,
  scores jsonb,
  diagnostic jsonb,
  forces jsonb,
  faiblesses jsonb,
  recommandations jsonb,
  raw_response jsonb,
  created_at timestamptz default now()
);

create index idx_cv_results_analysis_id on cv_results(analysis_id);

alter table cv_results enable row level security;

create policy "Users can view own results" on cv_results
  for select using (
    analysis_id in (select id from cv_analyses where user_id = auth.uid())
  );

-- ============================================================================
-- 004 : Subscriptions
-- ============================================================================

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade unique not null,
  stripe_customer_id text,
  stripe_subscription_id text,
  plan text default 'free'
    check (plan in ('free', 'pro', 'business')),
  status text
    check (status is null or status in ('active', 'canceled', 'past_due', 'trialing', 'incomplete')),
  current_period_end timestamptz,
  analyses_used_this_month int default 0,
  analyses_reset_at timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table subscriptions enable row level security;

create policy "Users can view own subscription" on subscriptions
  for select using (auth.uid() = user_id);

-- Auto-create subscription on signup
create or replace function public.handle_new_subscription()
returns trigger as $$
begin
  insert into public.subscriptions (user_id, plan)
  values (new.id, 'free')
  on conflict (user_id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created_subscription
  after insert on auth.users
  for each row execute procedure public.handle_new_subscription();

-- ============================================================================
-- 005 : Portfolios (Phase 2)
-- ============================================================================

create table if not exists public.portfolios (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  slug text unique,
  title text,
  data jsonb,
  template text default 'glassmorphism',
  published boolean default false,
  custom_domain text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_portfolios_user_id on portfolios(user_id);
create index idx_portfolios_slug on portfolios(slug);

alter table portfolios enable row level security;

create policy "Users can manage own portfolios" on portfolios
  for all using (auth.uid() = user_id);
create policy "Public can view published portfolios" on portfolios
  for select using (published = true);

-- ============================================================================
-- 006 : Fonction RPC — Incrémenter le compteur d'analyses
-- ============================================================================

create or replace function public.increment_analyses_count(p_user_id uuid)
returns void as $$
declare
  v_reset_at timestamptz;
begin
  select analyses_reset_at into v_reset_at
  from subscriptions
  where user_id = p_user_id;

  -- Si le mois a changé, reset le compteur
  if v_reset_at is null or
     extract(month from v_reset_at) != extract(month from now()) or
     extract(year from v_reset_at) != extract(year from now())
  then
    update subscriptions
    set analyses_used_this_month = 1,
        analyses_reset_at = now(),
        updated_at = now()
    where user_id = p_user_id;
  else
    update subscriptions
    set analyses_used_this_month = analyses_used_this_month + 1,
        updated_at = now()
    where user_id = p_user_id;
  end if;
end;
$$ language plpgsql security definer;

-- ============================================================================
-- 007 : Storage Bucket
-- ============================================================================
-- À exécuter dans le dashboard Supabase > Storage > Create bucket :
-- Nom : cv-uploads
-- Public : false
-- File size limit : 5 MB
-- Allowed MIME types : application/pdf
