-- CV Analyses Table
create table cv_analyses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  file_path text not null,
  file_name text,
  raw_text text,
  anonymized_text text,
  anonymization_map jsonb,
  status text default 'pending',
  created_at timestamptz default now()
);

-- CV Results Table
create table cv_results (
  id uuid primary key default gen_random_uuid(),
  analysis_id uuid references cv_analyses(id) on delete cascade,
  score_global int,
  scores jsonb,
  diagnostic jsonb,
  forces jsonb,
  faiblesses jsonb,
  recommandations jsonb,
  raw_response jsonb,
  created_at timestamptz default now()
);

-- RLS Policies
alter table cv_analyses enable row level security;
alter table cv_results enable row level security;

-- Allow users to view their own analyses
create policy "Users can view own analyses" on cv_analyses
  for select using (auth.uid() = user_id OR user_id IS NULL);

-- Allow anyone to insert (anonymous CV check)
create policy "Anyone can insert analyses" on cv_analyses
  for insert with check (true);

-- Allow users to view results of their analyses
create policy "Users can view own results" on cv_results
  for select using (
    analysis_id in (
      select id from cv_analyses 
      where user_id = auth.uid() OR user_id IS NULL
    )
  );

-- Storage bucket for CVs
insert into storage.buckets (id, name, public)
values ('cvs', 'cvs', false);

-- Storage policies
create policy "Anyone can upload CVs"
  on storage.objects for insert
  with check (bucket_id = 'cvs');

create policy "Users can view their own CVs"
  on storage.objects for select
  using (bucket_id = 'cvs');
