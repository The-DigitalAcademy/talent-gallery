import { createClient } from "./lib/supabase/server";
import HeroSection from "./_components/landing/HeroSection";
import HowItWorks from "./_components/landing/HowItWorks";
import CandidateStatuses from "./_components/landing/CandidateStatuses";
import BrowseTalentPreview from "./_components/landing/BrowseTalentPreview";
import TrustedBy from "./_components/landing/TrustedBy";

export default async function LandingPage() {
  const supabase = await createClient();

  // Fetch unique dynamic items from the database in parallel
  const [
    { data: locations },
    { data: roles },
    { data: capabilities },
    { data: statuses },
  ] = await Promise.all([
    supabase.from("locations").select("id, city"),
    supabase.from("roles").select("id, name"),
    supabase.from("capabilities").select("id, name"),
    supabase.from("talent_statuses").select("id, name"),
  ]);

  return (
    <>
      <HeroSection
        locations={locations || []}
        roles={roles || []}
        capabilities={capabilities || []}
        statuses={statuses || []}
      />
      <HowItWorks />
      <CandidateStatuses />
      <BrowseTalentPreview />
      <TrustedBy />
    </>
  );
}