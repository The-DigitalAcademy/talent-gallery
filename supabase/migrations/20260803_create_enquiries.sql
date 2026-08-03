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

-- 3. Enable Row Level Security
ALTER TABLE enquiries        ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiry_talents  ENABLE ROW LEVEL SECURITY;

-- 4. Public INSERT policies (anyone can submit an enquiry)
CREATE POLICY "Allow public insert enquiries"
  ON enquiries FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public insert enquiry_talents"
  ON enquiry_talents FOR INSERT
  TO public
  WITH CHECK (true);

-- 5. Authenticated SELECT policies (admin only reads)
CREATE POLICY "Allow authenticated select enquiries"
  ON enquiries FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated select enquiry_talents"
  ON enquiry_talents FOR SELECT
  TO authenticated
  USING (true);
