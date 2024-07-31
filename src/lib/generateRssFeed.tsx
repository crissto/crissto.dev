import { Feed } from "feed";
import { mkdir, writeFile } from "node:fs/promises";

import { getAllArticles } from "./getAllArticles";

export async function generateRssFeed() {
  const articles = await getAllArticles();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const author = {
    name: "Spencer Sharp",
    email: "spencer@planetaria.tech",
  };

  const feed = new Feed({
    title: author.name,
    description: "Your blog description",
    author,
    id: siteUrl,
    link: siteUrl,
    image: `${siteUrl}/favicon.ico`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    feedLinks: {
      rss2: `${siteUrl}/rss/feed.xml`,
      json: `${siteUrl}/rss/feed.json`,
    },
  });

  for (const article of articles) {
    const url = `${siteUrl}/articles/${article.slug}`;
    const content = await article.component({ isRssFeed: true });

    feed.addItem({
      title: article.title,
      id: url,
      link: url,
      description: article.description,
      content,
      author: [author],
      contributor: [author],
      date: new Date(article.date),
    });
  }

  await mkdir("./public/rss", { recursive: true });
  await Promise.all([
    writeFile("./public/rss/feed.xml", feed.rss2(), "utf8"),
    writeFile("./public/rss/feed.json", feed.json1(), "utf8"),
  ]);
}
