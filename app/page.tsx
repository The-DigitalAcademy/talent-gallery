import { createClient } from "./lib/supabase/server";
import HeroSection from "./_components/landing/HeroSection";
import HowItWorks from "./_components/landing/HowItWorks";
import CandidateStatuses from "./_components/landing/CandidateStatuses";
import BrowseTalentPreview from "./_components/landing/BrowseTalentPreview";
import TrustedBy from "./_components/landing/TrustedBy";
import { Metadata } from "next";

// SEO GENERATOR
export async function generateMetadata(): Promise<Metadata> {
  const title = 'TALENT Directory'
  const description = "Discover and connect with top-tier, specialized creative professionals and tech talents."
  const imageUrl = "https://w4u9ywo6wdd8vjiq.public.blob.vercel-storage.com/shaper-icon-brand.png";

  return {
    title,
    description,
    alternates: { canonical: "/" },
    openGraph: {
      title,
      description,
      images: [ { url: imageUrl, alt: "Shaper TALENT Brand" } ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function LandingPage() {
  const supabase = await createClient();

  // Fetch unique dynamic items from the database in parallel
  const [
    { data: locations },
    { data: roles },
    { data: capabilities },
    { data: statuses },
  ] = await Promise.all([
    supabase.from("talents").select("location"),
    supabase.from("talents").select("role"),
    supabase.from("talents").select("capabilities"),
    supabase.from("talent_statuses").select("id, name"),
  ]);

  const uniqueLocations = [...new Set(locations?.map(i => i.location))]
  const uniqueRoles = [...new Set(roles?.map(i => i.role))]
  const uniqueCapabilities = [...new Set(capabilities?.map(i => i.capabilities).flat(Infinity))]

  return (
    <>
      <HeroSection
        locations={uniqueLocations}
        roles={uniqueRoles}
        capabilities={uniqueCapabilities}
        statuses={statuses || []}
      />
      <HowItWorks />
      <CandidateStatuses />
      <BrowseTalentPreview />
      <TrustedBy />
    </>
  );
}