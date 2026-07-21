import { createClient } from "@/app/lib/supabase/server";
import { Metadata } from "next";
import ProfileClient from "./_components/ProfileClient";
import { getTalentBySlug } from "@/app/lib/talents/getTalentBySlug";

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

  const { data: talent, error } = await getTalentBySlug(slug);

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Failed to load talent profile.</p>
      </main>
    );
  }

  return  (
    <div className="w-screen h-screen pt-8 sm:px-14 xl:px-0 sm:py-6 lg:pb-10 lg:pt-14 bg-[#f1f1f1] overflow-hidden flex justify-center">
      <ProfileClient talent={talent}/>
    </div>
  );
}