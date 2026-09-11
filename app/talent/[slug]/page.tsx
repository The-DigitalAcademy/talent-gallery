import { createClient } from "@/app/lib/supabase/server";
import { Metadata } from "next";
import ProfileClient from "./_components/ProfileClient";
import { getTalentBySlug } from "@/app/lib/talents/getTalentBySlug";
import { notFound } from "next/navigation";
import { EyeOffIcon } from "lucide-react";

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
    notFound()
  }

  return  (
    <div className="w-screen min-h-screen md:px-14 xl:px-0 md:pb-10 md:pt-0 lg:pt-0 bg-[#f1f1f1] overflow-hidden flex justify-center">
      <ProfileClient talent={talent} />
      {talent?.isPublished === false &&
        <div className="fixed right-5 top-20 bg-amber-500 z-50 py-2 px-3 rounded-lg w-50">
          <div className="text-lg font-bold flex gap-1"><EyeOffIcon /> Not Published</div>
          <p className="text-xs">Only visible to Admin</p>
        </div>}
    </div>
  );
}