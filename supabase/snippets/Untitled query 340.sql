create policy "Allow public read education"
on public.education
for select
to anon, authenticated
using (true);
