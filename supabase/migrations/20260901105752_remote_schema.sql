SET local check_function_bodies = off;

CREATE TABLE "public"."capabilities" (
  "id"         uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "name"       text                     NOT NULL,
  "created_at" timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "capabilities_name_key" UNIQUE (name),
  CONSTRAINT "capabilities_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."capabilities"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."cohorts" (
  "id"         uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "name"       text                     NOT NULL,
  "created_at" timestamp with time zone NOT NULL DEFAULT now(),
  "slug"       text                     NOT NULL,
  CONSTRAINT "cohorts_pkey" PRIMARY KEY (id),
  CONSTRAINT "cohorts_slug_key" UNIQUE (slug)
);

ALTER TABLE "public"."cohorts"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."endorsements" (
  "id"            uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "endorser_name" text                     NOT NULL,
  "message"       text                     NOT NULL,
  "created_at"    timestamp with time zone NOT NULL DEFAULT now(),
  "talent_id"     uuid,
  CONSTRAINT "endorsements_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."endorsements"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."enquiries" (
  "id"           uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "email"        text                     NOT NULL,
  "company_name" text                     NOT NULL,
  "contact_name" text                     NOT NULL,
  "message"      text,
  "created_at"   timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "enquiries_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."enquiries"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."enquiry_talents" (
  "enquiry_id" uuid                     NOT NULL,
  "talent_id"  uuid                     NOT NULL,
  "created_at" timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "enquiry_talents_pkey" PRIMARY KEY (enquiry_id, talent_id)
);

ALTER TABLE "public"."enquiry_talents"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."locations" (
  "id"         uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "created_at" timestamp with time zone NOT NULL DEFAULT now(),
  "city"       text                     NOT NULL,
  "country"    text                     NOT NULL,
  CONSTRAINT "locations_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."locations"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."programs" (
  "id"         uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "name"       text                     NOT NULL,
  "created_at" timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "programs_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."programs"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."project_capabilities" (
  "id"            uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "project_id"    uuid                     NOT NULL,
  "capability_id" uuid                     NOT NULL,
  "created_at"    timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "project_capabilities_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."project_capabilities"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."projects" (
  "id"          uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "name"        text                     NOT NULL,
  "description" text,
  "created_at"  timestamp with time zone NOT NULL DEFAULT now(),
  "talent_id"   uuid                     NOT NULL,
  "project_url" text,
  CONSTRAINT "projects_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."projects"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."roles" (
  "id"          uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "created_at"  timestamp with time zone NOT NULL DEFAULT now(),
  "name"        text                     NOT NULL,
  "description" text,
  CONSTRAINT "roles_name_key" UNIQUE (name),
  CONSTRAINT "roles_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."roles"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."talent_capabilities" (
  "created_at"    timestamp with time zone NOT NULL DEFAULT now(),
  "talent_id"     uuid                     NOT NULL,
  "capability_id" uuid                     NOT NULL,
  CONSTRAINT "talent_capabilities_pkey" PRIMARY KEY (talent_id, capability_id)
);

ALTER TABLE "public"."talent_capabilities"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."talent_projects" (
  "id"         uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "talent_id"  uuid                     NOT NULL,
  "project_id" uuid,
  "created_at" timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "talent_projects_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."talent_projects"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."talent_statuses" (
  "id"          uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "name"        text                     NOT NULL,
  "description" text,
  "created_at"  timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "talent_statuses_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."talent_statuses"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."talents" (
  "id"                   uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "fullname"             text                     NOT NULL,
  "bio"                  text,
  "location_id"          uuid,
  "program_id"           uuid,
  "cohort_id"            uuid,
  "talent_status_id"     uuid,
  "profile_image_url"    text,
  "portfolio_url"        text,
  "github_url"           text,
  "linkedin_url"         text,
  "youtube_url"          text,
  "is_published"         boolean                  NOT NULL DEFAULT false,
  "created_at"           timestamp with time zone NOT NULL DEFAULT now(),
  "slug"                 text                     NOT NULL,
  "role_id"              uuid,
  "capabilities_summary" text,
  CONSTRAINT "talents_pkey" PRIMARY KEY (id),
  CONSTRAINT "talents_slug_key" UNIQUE (slug)
);

ALTER TABLE "public"."talents"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."work_experiences" (
  "id"          uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "talent_id"   uuid,
  "company"     text,
  "role"        text,
  "duration"    text,
  "description" text,
  "created_at"  timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "work_experiences_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."work_experiences"
  ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.cohorts_set_slug()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $function$
begin
  new.slug := slugify(new.name) || '-' || substring(new.id::text from 1 for 8);
  return new;
end;
$function$;

CREATE OR REPLACE FUNCTION public.slugify (
  input_text text
)
  RETURNS text
  LANGUAGE sql
  IMMUTABLE
  AS $function$
select
  case
    when input_text is null then null
    else
      regexp_replace(
        regexp_replace(lower(trim(input_text)), '[^a-z0-9]+', '-', 'g'),
        '(^-+)|(-+$)',
        '',
        'g'
      )
  end;
$function$;

CREATE OR REPLACE FUNCTION public.talents_set_slug()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $function$
begin
  new.slug := slugify(new.fullname) || '-' || substring(new.id::text from 1 for 8);
  return new;
end;
$function$;

ALTER TABLE "public"."enquiry_talents"
  ADD CONSTRAINT "enquiry_talents_enquiry_id_fkey" FOREIGN KEY (enquiry_id) REFERENCES public.enquiries(id) ON DELETE CASCADE;

ALTER TABLE "public"."project_capabilities"
  ADD CONSTRAINT "project_capabilities_capability_id_fkey" FOREIGN KEY (capability_id) REFERENCES public.capabilities(id) ON DELETE CASCADE;

ALTER TABLE "public"."project_capabilities"
  ADD CONSTRAINT "project_capabilities_project_id_fkey" FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;

ALTER TABLE "public"."talent_capabilities"
  ADD CONSTRAINT "talent_capabilities_capability_id_fkey" FOREIGN KEY (capability_id) REFERENCES public.capabilities(id) ON DELETE CASCADE;

ALTER TABLE "public"."talent_projects"
  ADD CONSTRAINT "talent_projects_project_id_fkey" FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;

ALTER TABLE "public"."talents"
  ADD CONSTRAINT "talents_cohort_id_fkey" FOREIGN KEY (cohort_id) REFERENCES public.cohorts(id) ON DELETE CASCADE;

ALTER TABLE "public"."talents"
  ADD CONSTRAINT "talents_location_id_fkey" FOREIGN KEY (location_id) REFERENCES public.locations(id) ON DELETE CASCADE;

ALTER TABLE "public"."endorsements"
  ADD CONSTRAINT "endorsements_talent_id_fkey" FOREIGN KEY (talent_id) REFERENCES public.talents(id) ON DELETE CASCADE;

ALTER TABLE "public"."enquiry_talents"
  ADD CONSTRAINT "enquiry_talents_talent_id_fkey" FOREIGN KEY (talent_id) REFERENCES public.talents(id) ON DELETE CASCADE;

ALTER TABLE "public"."projects"
  ADD CONSTRAINT "projects_talent_id_fkey" FOREIGN KEY (talent_id) REFERENCES public.talents(id) ON DELETE CASCADE;

ALTER TABLE "public"."talent_capabilities"
  ADD CONSTRAINT "talent_capabilities_talent_id_fkey" FOREIGN KEY (talent_id) REFERENCES public.talents(id) ON DELETE CASCADE;

ALTER TABLE "public"."talent_projects"
  ADD CONSTRAINT "talent_projects_talent_id_fkey" FOREIGN KEY (talent_id) REFERENCES public.talents(id) ON DELETE CASCADE;

ALTER TABLE "public"."talents"
  ADD CONSTRAINT "talents_program_id_fkey" FOREIGN KEY (program_id) REFERENCES public.programs(id) ON DELETE CASCADE;

ALTER TABLE "public"."talents"
  ADD CONSTRAINT "talents_role_id_fkey" FOREIGN KEY (role_id) REFERENCES public.roles(id) ON DELETE CASCADE;

ALTER TABLE "public"."talents"
  ADD CONSTRAINT "talents_talent_status_id_fkey" FOREIGN KEY (talent_status_id) REFERENCES public.talent_statuses(id) ON DELETE CASCADE;

ALTER TABLE "public"."work_experiences"
  ADD CONSTRAINT "work_experiences_talent_id_fkey" FOREIGN KEY (talent_id) REFERENCES public.talents(id) ON DELETE CASCADE;

CREATE TRIGGER trg_cohorts_set_slug
  BEFORE INSERT OR UPDATE OF name, id ON public.cohorts
  FOR EACH ROW
  EXECUTE FUNCTION public.cohorts_set_slug();

CREATE TRIGGER trg_talents_set_slug
  BEFORE INSERT OR UPDATE OF fullname, id ON public.talents
  FOR EACH ROW
  EXECUTE FUNCTION public.talents_set_slug();

CREATE POLICY "Enable all for authenticated users only" ON "public"."capabilities"
  FOR ALL
  TO "authenticated"
  USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."capabilities"
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Enable all for authenticated users only" ON "public"."cohorts"
  FOR ALL
  TO "authenticated"
  USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."cohorts"
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Enable all for authenticated users only" ON "public"."endorsements"
  FOR ALL
  TO "authenticated"
  USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."endorsements"
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Allow authenticated select enquiries" ON "public"."enquiries"
  FOR SELECT
  TO "authenticated"
  USING (true);

CREATE POLICY "Allow public insert enquiries" ON "public"."enquiries"
  FOR INSERT
  TO PUBLIC
  WITH CHECK (true);

CREATE POLICY "Allow public select enquiries" ON "public"."enquiries"
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Allow authenticated select enquiry_talents" ON "public"."enquiry_talents"
  FOR SELECT
  TO "authenticated"
  USING (true);

CREATE POLICY "Allow public insert enquiry_talents" ON "public"."enquiry_talents"
  FOR INSERT
  TO PUBLIC
  WITH CHECK (true);

CREATE POLICY "Allow public select enquiry_talents" ON "public"."enquiry_talents"
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Enable all for authenticated users only" ON "public"."locations"
  FOR ALL
  TO "authenticated"
  USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."locations"
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Enable all for authenticated users only" ON "public"."programs"
  FOR ALL
  TO "authenticated"
  USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."programs"
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."project_capabilities"
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Enable all for authenticated users only" ON "public"."projects"
  FOR ALL
  TO "authenticated"
  USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."projects"
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Enable all for authenticated users only" ON "public"."roles"
  FOR ALL
  TO "authenticated"
  USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."roles"
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Enable all for authenticated users only" ON "public"."talent_capabilities"
  FOR ALL
  TO "authenticated"
  USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."talent_capabilities"
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."talent_projects"
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Enable all for authenticated users only" ON "public"."talent_statuses"
  FOR ALL
  TO "authenticated"
  USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."talent_statuses"
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Enable all for authenticated users only" ON "public"."talents"
  FOR ALL
  TO "authenticated"
  USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."talents"
  FOR SELECT
  TO PUBLIC
  USING ((is_published = true));

CREATE POLICY "Enable all for authenticated users only" ON "public"."work_experiences"
  FOR ALL
  TO "authenticated"
  USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."work_experiences"
  FOR SELECT
  TO PUBLIC
  USING (true);

GRANT EXECUTE ON FUNCTION "public"."cohorts_set_slug"() TO PUBLIC, "anon", "authenticated", "postgres", "service_role";

GRANT EXECUTE ON FUNCTION "public"."slugify"(text) TO PUBLIC, "anon", "authenticated", "postgres", "service_role";

GRANT EXECUTE ON FUNCTION "public"."talents_set_slug"() TO PUBLIC, "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."capabilities" TO "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."cohorts" TO "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."endorsements" TO "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."enquiries" TO PUBLIC, "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."enquiry_talents" TO PUBLIC, "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."locations" TO "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."programs" TO "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."project_capabilities" TO "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."projects" TO "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."roles" TO "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."talent_capabilities" TO "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."talent_projects" TO "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."talent_statuses" TO "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."talents" TO "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."work_experiences" TO "anon", "authenticated", "postgres", "service_role";

