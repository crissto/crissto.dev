import glob from 'fast-glob'
import * as path from 'path'

export type Article = {
  slug: string,
  component: any,
  author: string,
  date: string,
  title: string,
  description: string,
  published: boolean,
}

async function importArticle(articleFilename: string): Promise<Article> {
  let { meta, default: component } = await import(
    `../pages/articles/${articleFilename}`
  )
  return {
    slug: articleFilename.replace(/(\/index)?\.mdx$/, ''),
    ...meta,
    component,
  }
}

export async function getAllArticles() {
  let articleFilenames = await glob(['*.mdx', '*/index.mdx'], {
    cwd: path.join(process.cwd(), 'src/pages/articles'),
  })

  let articles = await Promise.all(articleFilenames.map(importArticle))
  let publishedArticles = articles.filter((article) => article.published)
  
  return publishedArticles.sort((a, z) => new Date(z.date).getMilliseconds() - new Date(a.date).getMilliseconds())
}
