import clsx from 'clsx'
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import type { SVGProps } from 'react'

import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import { Avatar } from '@/components/Header'
import Newsletter from '@/components/Newsletter'
import { GitHubIcon, LinkedInIcon, TwitterIcon } from '@/components/SocialIcons'
import logoBMind from '@/images/logos/bmind.webp'
import logoContentful from '@/images/logos/contentful.png'
import logoElixir from '@/images/logos/elixir.webp'
import logoFirstblood from '@/images/logos/firstblood.ico'
import logoSupersolid from '@/images/logos/supersolid.png'
import { formatDate } from '@/lib/formatDate'
import { generateRssFeed } from '@/lib/generateRssFeed'
import { Article, getAllArticles } from '@/lib/getAllArticles'

function BriefcaseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function Article({ article }) {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}

type SocialLinkProps = {
  icon?: any
  href: string
}

function SocialLink({ icon: Icon, ...props }: SocialLinkProps) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

function Resume() {
  let resume = [
    {
      company: 'Contenful',
      title: 'Software Engineer',
      logo: logoContentful,
      start: 'Sept 2022',
      end: {
        label: 'Present',
        dateTime: new Date().getFullYear(),
      },
    },
    {
      company: 'Elixir Games',
      title: 'Senior Developer',
      logo: logoElixir,
      start: '2022',
      end: 'Sept 2022',
    },
    {
      company: 'Firstblood',
      title: 'Backend Engineer',
      logo: logoFirstblood,
      year: '2021',
    },
    {
      company: 'Supersolid',
      title: 'Server Developer',
      logo: logoSupersolid,
      year: '2020',
    },
    {
      company: 'BMind',
      title: 'FullStack Developer',
      logo: logoBMind,
      start: '2017',
      end: '2020',
    },
  ]

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <li key={roleIndex} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image
                src={role.logo}
                alt=""
                className={clsx('h-8 w-8', {
                  'rounded-full bg-white': role.logo === logoBMind,
                })}
              />
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Company</dt>
              <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {role.company}
              </dd>
              <dt className="sr-only">Role</dt>
              <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                {role.title}
              </dd>
              <dt className="sr-only">Date</dt>
              {role.year ? (
                <dd
                  className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                  aria-label={role.year}
                >
                  <time dateTime={role.year}>{role.year}</time>
                </dd>
              ) : (
                <dd
                  className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                  aria-label={`${role.start} until ${
                    typeof role.end != 'string' ? role.end.label : role.end
                  }`}
                >
                  <time dateTime={role.start}>{role.start}</time>{' '}
                  <span aria-hidden="true">—</span>{' '}
                  <time
                    dateTime={
                      typeof role.end != 'string'
                        ? role.end.dateTime.toString()
                        : role.end
                    }
                  >
                    {typeof role.end != 'string' ? role.end.label : role.end}
                  </time>
                </dd>
              )}
            </dl>
          </li>
        ))}
      </ol>
      {/* <Button href="#" variant="secondary" className="group mt-6 w-full">
        Download CV
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button> */}
    </div>
  )
}

export default function Home({ articles }: { articles: Article[] }) {
  return (
    <>
      <Head>
        <title>
          Christian Stoyanov - Software developer and product builder
        </title>
        <meta
          name="description"
          content="I’m Christian, a software developer and entrepreneur based in Ireland (TBD for how long).
          I current work at Contenful trying to make developers life easier. Also love to hack on my own projects
          and build stuff."
        />
      </Head>
      <Container className="mt-9">
        <div className="max-w-6xl">
          <div className="flex space-x-6 align-middle">
            <div className="flex flex-col justify-center">
              <Avatar large className="block h-32 w-32 origin-left" />
            </div>
            <div>
              <h1 className="max-w-lg text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                Software developer and product builder
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-5 space-x-8">
            <div className="col-span-3">
              <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                Hey! 👋{' '}
              </p>
              <p className="mt-1 text-base text-zinc-600 dark:text-zinc-400">
                I’m Christian, a software developer and entrepreneur based in
                Ireland (TBD for how long). I current work at Contenful trying
                to make developers life easier. Also love to hack on my own
                projects and build stuff.
              </p>
              <div className="mt-6 flex gap-6">
                <SocialLink
                  href="https://twitter.com/crissto39"
                  aria-label="Follow on Twitter"
                  icon={TwitterIcon}
                />
                <SocialLink
                  href="https://github.com/crissto"
                  aria-label="Follow on GitHub"
                  icon={GitHubIcon}
                />
                <SocialLink
                  href="https://www.linkedin.com/in/christian-stoyanov/"
                  aria-label="Follow on LinkedIn"
                  icon={LinkedInIcon}
                />
              </div>
            </div>
            <div className="col-span-2">
              <Resume />
            </div>
          </div>
        </div>
      </Container>
      {articles.length > 0 && (
        <Container className="mt-24 md:mt-28">
          <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
            <div className="flex flex-col gap-16">
              {articles.map((article) => (
                <Article key={article.slug} article={article} />
              ))}
            </div>
            <div className="space-y-10 lg:pl-16 xl:pl-24">
              <Newsletter />
            </div>
          </div>
        </Container>
      )}
    </>
  )
}

export async function getStaticProps() {
  if (process.env.NODE_ENV === 'production') {
    await generateRssFeed()
  }

  return {
    props: {
      articles: (await getAllArticles())
        .slice(0, 4)
        .map(({ component, ...meta }) => meta),
    },
  }
}
