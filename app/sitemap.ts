// app/sitemap.ts
import { MetadataRoute } from "next";
import { createClient } from "@/app/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://talent.shaper.co.za";
  const supabase = await createClient();

  // Fetch all active profiles to build dynamic profile endpoints
  const { data: talents } = await supabase
    .from("talents")
    .select("slug, updated_at")
    .eq("is_published", true);

  const talentUrls = (talents || []).map((talent) => ({
    url: `${baseUrl}/talent/${talent.slug}`,
    lastModified: new Date(talent.updated_at || Date.now()),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Static routes configuration
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/talent`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
  ];

  return [...staticRoutes, ...talentUrls];
}