import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard/",
        "/login",
        "/api/",
        "/audio/",
        "/blueprints/",
        "/course-visuals/",
      ],
    },
    sitemap: "https://brandactivationnetwork.com/sitemap.xml",
    host: "https://brandactivationnetwork.com",
  };
}
