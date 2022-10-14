import glob from 'fast-glob'
import * as path from 'path'

import { getAllArticles } from '@/lib/getAllArticles'

const Sitemap = () => {
  return null
}

export const getServerSideProps = async ({ res }) => {
  const BASE_URL = 'https://crissto.dev'
  let filenames = await glob(['*.tsx'], {
    cwd: path.join(process.cwd(), 'src/pages'),
  })

  const staticPaths = filenames
    .filter((staticPage) => {
      return ![
        'api',
        '_app.tsx',
        '_document.tsx',
        '404.ts',
        'sitemap.xml.ts',
      ].includes(staticPage)
    })
    .map(
      (staticPagePath) => `${BASE_URL}/${staticPagePath.replace(/\.tsx$/, '')}`
    )

  const articles = (await getAllArticles()).map(
    ({ slug }) => `${BASE_URL}/articles/${slug}`
  )

  const allPaths = [BASE_URL, ...staticPaths, ...articles]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPaths
        .map((url) => {
          return `  
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `
        })
        .join('')}
    </urlset>
`
  res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=3600')
  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default Sitemap
