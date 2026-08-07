// app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/talents"],
      disallow: [
        "/admin/",
        "/dashboard/",
        "/api/",
        "/login",
        "/unauthorized"
      ],
    },
    sitemap: "https://talent.shaper.co.za/sitemap.xml",
  };
}