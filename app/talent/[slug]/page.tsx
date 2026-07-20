import { createClient } from "@/app/lib/supabase/server";
import { TalentProfile } from "./_components/TalentProfile";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: talent } = await supabase
    .from("talents")
    .select(`
      fullname,
      bio,
      profile_image_url,
      program:programs(name)
    `)
    .eq("slug", slug)
    .single();

  if (!talent) {
    return {
      title: "Talent Profile | Talent Gallery",
    };
  }

  const programData = talent.program;
  const programName = Array.isArray(programData)
    ? programData[0]?.name
    : (programData as any)?.name;

  const title = `${talent.fullname} - ${programName || "Talent Profile"} | Talent Gallery`;
  const description = talent.bio || `View ${talent.fullname}'s professional profile on our Talent Gallery.`;
  const imageUrl = talent.profile_image_url || "https://w4u9ywo6wdd8vjiq.public.blob.vercel-storage.com/shaper_logo.png";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: imageUrl,
          alt: `${talent.fullname}'s profile picture`,
        },
      ],
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}


export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: talent, error } = await supabase
  .from("talents")
  .select(`
    *,
    location:locations(city, country),
    cohort:cohorts(name),
    program:programs(name),
    talent_status:talent_statuses(name),
    capabilities:talent_capabilities(
      capability:capabilities(id, name)
    ),
    work_experiences(*),
    projects(
      id,
      name,
      description,
      capabilities:project_capabilities(
        capability:capabilities(name)
      )
    ),
    endorsements(
      id,
      endorser_name,
      message
    )
  `)
  .eq("slug", slug)
  .eq("is_published", true)
  .single();
    console.log(talent)
  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Failed to load talent profile.</p>
      </main>
    );
  }
  
  return  (
    <div className="w-screen min-h-screen px-64 py-10 bg-[#f1f1f1]">
      <TalentProfile talent={talent} />
    </div>
  );
}