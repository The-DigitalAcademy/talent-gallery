ALTER TABLE "public"."talent_capabilities"
  ADD COLUMN "sort_position" numeric NOT NULL DEFAULT '1000'::numeric;
