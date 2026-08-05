-- ============================================================
-- Migration: Create enquiries and enquiry_talents tables
-- ============================================================

-- 1. enquiries table
CREATE TABLE IF NOT EXISTS enquiries (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email        TEXT NOT NULL,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  message      TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. enquiry_talents join table
CREATE TABLE IF NOT EXISTS enquiry_talents (
  enquiry_id UUID NOT NULL REFERENCES enquiries(id) ON DELETE CASCADE,
  talent_id  UUID NOT NULL REFERENCES talents(id)   ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (enquiry_id, talent_id)
);

-- 3. Grant Table Privileges
GRANT ALL ON TABLE enquiries TO anon, authenticated, public, service_role;
GRANT ALL ON TABLE enquiry_talents TO anon, authenticated, public, service_role;

-- 4. Enable Row Level Security
ALTER TABLE enquiries        ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiry_talents  ENABLE ROW LEVEL SECURITY;

-- 5. Public INSERT & SELECT policies (required for PostgREST insert returning)
DROP POLICY IF EXISTS "Allow public insert enquiries" ON enquiries;
CREATE POLICY "Allow public insert enquiries" ON enquiries FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public select enquiries" ON enquiries;
CREATE POLICY "Allow public select enquiries" ON enquiries FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert enquiry_talents" ON enquiry_talents;
CREATE POLICY "Allow public insert enquiry_talents" ON enquiry_talents FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public select enquiry_talents" ON enquiry_talents;
CREATE POLICY "Allow public select enquiry_talents" ON enquiry_talents FOR SELECT USING (true);
