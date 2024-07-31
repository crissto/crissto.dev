import glob from "fast-glob";
import type { MetadataRoute } from "next";
import * as path from "node:path";

import { getAllArticles } from "@/lib/getAllArticles";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = "https://crissto.dev";
  const filenames = await glob(["*.tsx"], {
    cwd: path.join(process.cwd(), "app"),
  });

  const staticPaths = filenames
    .filter((staticPage) => {
      return !["api", "layout.tsx", "page.tsx", "not-found.tsx"].includes(
        staticPage,
      );
    })
    .map(
      (staticPagePath) => `${BASE_URL}/${staticPagePath.replace(/\.tsx$/, "")}`,
    );

  const articles = (await getAllArticles()).map(
    ({ slug }) => `${BASE_URL}/articles/${slug}`,
  );

  const allPaths = [BASE_URL, ...staticPaths, ...articles];

  return allPaths.map((url) => ({
    url,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
  }));
}
