-- ============================================================================
-- Migration: Lock down enquiries / enquiry_talents and admin-managed tables
-- ----------------------------------------------------------------------------
-- WHY THIS EXISTS
--   20260803_create_enquiries.sql shipped two problems to production:
--     1. `GRANT ALL ... TO anon, authenticated, public, service_role` on both
--        enquiries and enquiry_talents.
--     2. `CREATE POLICY ... FOR SELECT USING (true)` on both tables.
--   Together these make every enquiry row (real customer PII: email, company,
--   contact name, free-text message + which talents were shortlisted) readable
--   by anyone holding the anon *publishable* key -- which ships in the public
--   client JS bundle. Anyone who views source can dump the whole table.
--
-- WHAT THIS MIGRATION DOES
--   * enquiries / enquiry_talents:
--       - DROP the world-readable "public select" policies.
--       - REVOKE the over-broad grants from anon / public.
--       - KEEP anon INSERT (the public enquiry form needs it) with CHECK(true).
--       - ADD authenticated-only SELECT policies so a logged-in admin session
--         (and any future admin "enquiries" screen) can still read them.
--   * talents + the sibling admin-managed lookup/child tables:
--       - REVOKE write privileges (INSERT/UPDATE/DELETE/TRUNCATE) from anon /
--         public so the anon key can no longer mutate them directly.
--       - Preserve anon SELECT untouched (the public gallery reads these).
--       - Ensure `authenticated` keeps full CRUD (admin mutations run as the
--         logged-in user through the cookie-bound server client).
--
-- IMPORTANT SEQUENCING (read before running -- see PR description):
--   The app change in this same PR generates the enquiry UUID in application
--   code and drops the `.select("id")` RETURNING clause on the enquiry insert.
--   That removal is what makes it safe to revoke anon SELECT: PostgREST's
--   "insert ... returning" needs SELECT rights on the row it echoes back, so
--   revoking anon SELECT *before* the app is deployed would break the public
--   form's insert. Deploy the app first (or together), then run this migration.
--
-- SAFETY / IDEMPOTENCY
--   Uses DROP POLICY IF EXISTS + CREATE, and REVOKE/GRANT (both idempotent).
--   Re-runnable. Run it against live Supabase with a service-role / dashboard
--   connection (SQL editor or `supabase db push`) -- NOT with the anon key.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. enquiries + enquiry_talents: remove world-read, keep anon INSERT only
-- ---------------------------------------------------------------------------

-- RLS is already enabled by the create migration; re-assert idempotently.
ALTER TABLE enquiries       ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiry_talents ENABLE ROW LEVEL SECURITY;

-- 1a. Drop the world-readable SELECT policies (the actual data leak).
DROP POLICY IF EXISTS "Allow public select enquiries"       ON enquiries;
DROP POLICY IF EXISTS "Allow public select enquiry_talents" ON enquiry_talents;

-- 1b. Recreate the INSERT policies, scoped explicitly to anon + authenticated.
--     The public enquiry form submits as `anon` (no session); keep that working.
DROP POLICY IF EXISTS "Allow public insert enquiries"       ON enquiries;
CREATE POLICY "enquiries_insert_anon_authenticated"
  ON enquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public insert enquiry_talents" ON enquiry_talents;
CREATE POLICY "enquiry_talents_insert_anon_authenticated"
  ON enquiry_talents
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 1c. Authenticated-only SELECT. A logged-in admin (role = authenticated via
--     the session cookie) can read enquiries; anon cannot. There is no finer
--     admin-vs-user distinction in this app today (see PR "Assumptions"), so
--     "authenticated" is the strongest claim the DB can key on right now.
DROP POLICY IF EXISTS "Authenticated can select enquiries" ON enquiries;
CREATE POLICY "enquiries_select_authenticated"
  ON enquiries
  FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Authenticated can select enquiry_talents" ON enquiry_talents;
CREATE POLICY "enquiry_talents_select_authenticated"
  ON enquiry_talents
  FOR SELECT
  TO authenticated
  USING (true);

-- 1d. Fix the privilege layer (grants sit *underneath* RLS -- both must allow).
--     Strip the over-broad grants, then re-add the minimum each role needs.
REVOKE ALL ON TABLE enquiries       FROM anon, authenticated, public;
REVOKE ALL ON TABLE enquiry_talents FROM anon, authenticated, public;

-- anon: INSERT only (public form). No SELECT/UPDATE/DELETE.
GRANT INSERT ON TABLE enquiries       TO anon;
GRANT INSERT ON TABLE enquiry_talents TO anon;

-- authenticated (admin session): read + insert. Add UPDATE/DELETE here later
-- if an admin "manage enquiries" screen is built.
GRANT SELECT, INSERT ON TABLE enquiries       TO authenticated;
GRANT SELECT, INSERT ON TABLE enquiry_talents TO authenticated;

-- service_role keeps its full grant from the create migration (it bypasses RLS
-- and is only ever used server-side); intentionally not revoked here.

-- ---------------------------------------------------------------------------
-- 2. talents + sibling admin-managed tables: stop anon from mutating
-- ---------------------------------------------------------------------------
-- These tables were created outside this repo's migrations (Supabase dashboard),
-- so their current grants/policies are NOT visible in source. They were almost
-- certainly created with the same Supabase default that grants anon/authenticated
-- broad access, which is why a raw anon key can currently write to them.
--
-- We fix this at the GRANT layer only -- the safest lever we can pull without
-- being able to see the live RLS policies:
--   * REVOKE write privileges from anon/public  -> anon key can no longer
--     INSERT/UPDATE/DELETE, regardless of what RLS policies exist.
--   * We deliberately DO NOT touch SELECT, and DO NOT enable/disable RLS on
--     these tables, so the public gallery's anon reads keep working exactly
--     as they do today.
--   * We (re)GRANT full CRUD to authenticated so admin mutations -- which run
--     as the logged-in user via the cookie-bound server client -- keep working.
--
-- The application-layer requireAdmin() guard added in this PR is the primary
-- defence for every admin Server Action; this block is defence-in-depth at the
-- database so a leaked/abused anon key cannot mutate data directly either.

DO $$
DECLARE
  -- Every table the admin Server Actions write to (grep: `.from("x").insert/update/delete`).
  t text;
  admin_tables text[] := ARRAY[
    'talents',
    'roles',
    'capabilities',
    'talent_capabilities',
    'cohorts',
    'programs',
    'locations',
    'talent_statuses',
    'endorsements',
    'projects',
    'work_experiences'
  ];
BEGIN
  FOREACH t IN ARRAY admin_tables LOOP
    -- Skip gracefully if a table name drifts / does not exist in this env.
    IF to_regclass(format('public.%I', t)) IS NULL THEN
      RAISE NOTICE 'skipping % (does not exist)', t;
      CONTINUE;
    END IF;

    -- Take write privileges away from the anonymous / public roles.
    EXECUTE format(
      'REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON TABLE public.%I FROM anon, public', t);

    -- Make sure the admin (authenticated) role can still do everything it needs.
    EXECUTE format(
      'GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.%I TO authenticated', t);

    RAISE NOTICE 'locked down writes on %', t;
  END LOOP;
END
$$;

-- ============================================================================
-- POST-RUN VERIFICATION (run manually, optional)
--   -- Should show NO INSERT/UPDATE/DELETE rows for grantee 'anon':
--   SELECT table_name, privilege_type
--   FROM information_schema.role_table_grants
--   WHERE grantee = 'anon'
--     AND table_name IN ('enquiries','enquiry_talents','talents')
--   ORDER BY table_name, privilege_type;
--
--   -- Should list only the authenticated SELECT + anon/authenticated INSERT
--   -- policies (no USING(true) SELECT for anon/public):
--   SELECT tablename, policyname, cmd, roles
--   FROM pg_policies
--   WHERE tablename IN ('enquiries','enquiry_talents')
--   ORDER BY tablename, policyname;
-- ============================================================================
