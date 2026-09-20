create policy "Allow authenticated insert education"
on public.education
for insert
to authenticated
with check (true);