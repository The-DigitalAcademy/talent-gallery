CREATE TABLE "public"."education" (
  "id"             uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "created_at"     timestamp with time zone NOT NULL DEFAULT now(),
  "institution"    text,
  "duration"       text,
  "qualification"  text,
  "field_of_study" text,
  "talent_id"      uuid                     DEFAULT gen_random_uuid(),
  CONSTRAINT "education_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."education"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."fields_of_study" (
  "id"               uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "created_at"       timestamp with time zone NOT NULL DEFAULT now(),
  "name"             text,
  "qualification_id" uuid,
  CONSTRAINT "fields_of_study_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."fields_of_study"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."qualifications" (
  "id"         uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "created_at" timestamp with time zone NOT NULL DEFAULT now(),
  "name"       text,
  CONSTRAINT "qualification_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."qualifications"
  ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."talent_capabilities"
  ADD COLUMN "sort_position" numeric NOT NULL DEFAULT '1000'::numeric;

ALTER TABLE "public"."education"
  ADD CONSTRAINT "education_talent_id_fkey" FOREIGN KEY (talent_id) REFERENCES public.talents(id);

ALTER TABLE "public"."fields_of_study"
  ADD CONSTRAINT "fields_of_study_qualification_id_fkey" FOREIGN KEY (qualification_id) REFERENCES public.qualifications(id);

CREATE POLICY "Allow authenticated delete education" ON "public"."education"
  FOR DELETE
  TO "authenticated"
  USING (true);

CREATE POLICY "Allow authenticated insert education" ON "public"."education"
  FOR INSERT
  TO "authenticated"
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update education" ON "public"."education"
  FOR UPDATE
  TO "authenticated"
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public read education" ON "public"."education"
  FOR SELECT
  TO "anon", "authenticated"
  USING (true);

CREATE POLICY "Allow public read fields of study" ON "public"."fields_of_study"
  FOR SELECT
  TO "anon", "authenticated"
  USING (true);

CREATE POLICY "Allow public read qualifications" ON "public"."qualifications"
  FOR SELECT
  TO "anon", "authenticated"
  USING (true);

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."education" TO "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."fields_of_study" TO "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."qualifications" TO "anon", "authenticated", "postgres", "service_role";
