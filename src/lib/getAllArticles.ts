import glob from "fast-glob";
import * as path from "node:path";

export type Article = {
  slug: string;
  component: React.ComponentType<{ isRssFeed: boolean }>;
  author: string;
  date: string;
  title: string;
  description: string;
  published: boolean;
};

async function importArticle(articleFilename: string): Promise<Article> {
  const { meta, default: component } = await import(
    `../app/articles/${articleFilename}`
  );
  return {
    slug: articleFilename.replace(/(\/index)?\.mdx$/, ""),
    ...meta,
    component,
  };
}

export async function getAllArticles(): Promise<Article[]> {
  const articleFilenames = await glob(["*.mdx", "*/index.mdx"], {
    cwd: path.join(process.cwd(), "src/app/articles"),
  });

  const articles = await Promise.all(articleFilenames.map(importArticle));
  const publishedArticles = articles.filter((article) => article.published);

  return publishedArticles.sort(
    (a, z) => new Date(z.date).getTime() - new Date(a.date).getTime(),
  );
}
