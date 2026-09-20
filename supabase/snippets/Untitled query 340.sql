alter table public.qualifications enable row level security;
alter table public.fields_of_study enable row level security;

create policy "Allow public read qualifications"
on public.qualifications
for select
to anon, authenticated
using (true);

create policy "Allow public read fields of study"
on public.fields_of_study
for select
to anon, authenticated
using (true);