CREATE POLICY "Allow insert for authenticated users" ON "storage"."objects"
  FOR INSERT
  TO "authenticated"
  WITH CHECK ((bucket_id = 'profile-images'::text));
