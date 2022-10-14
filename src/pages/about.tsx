import clsx from 'clsx'
import Image from 'next/future/image'
import Head from 'next/head'
import Link from 'next/link'
import { type ReactNode } from 'react'

import { Container } from '@/components/Container'
import { GitHubIcon, LinkedInIcon, TwitterIcon } from '@/components/SocialIcons'
import portraitImage from '@/images/full_body_me.webp'

type SocialLinkProps = {
  className?: string
  href?: string
  children?: ReactNode
  icon?: any
}

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: SocialLinkProps) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export default function About() {
  return (
    <>
      <Head>
        <title>About - Christian Stoyanov</title>
        <meta
          name="description"
          content="I'm Christian Stoyanov. I'm trying to solve problems while having fun"
        />
      </Head>
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={portraitImage}
                alt=""
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              {
                "I'm Christian Stoyanov and I'm trying to solve problems while having fun."
              }
            </h1>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              <p>
                {`Born and raised in Spain and now living in Ireland I'm a
                developer trying to learn as much as possible while having fun.
                I love solving problems and building products. Currently working
                at the developer workflows team at Contenful.`}
              </p>
              <p>
                {`I started looking into programming while I was really into
                playing Minecraft. I was like 14 at the time and the bug to
                create mods for it bit me. That got me into Java an even though
                I didn't end up making anything cool I got my feet wet in the
                coding world.`}
              </p>
              <p>
                I got into web development a couple of years later and got
                started with Python. Made some money making webs for friends and
                family and when I was 19 got a job as a Junior Developer at
                BMind, a marketing agency.
              </p>
              <p>
                {`After that I've touched a bunch of languages and paradigms, from
                PHP (Laravel 😍) to Typescript (React and Node) passing by
                things like Solidity (yeah, I passed that crypto phase. Not sure
                if it's over tbh) and simulation engines for financials in
                Python. I really support the idea of using the right tool for
                the job so I don't enclose myself in a language. I'm proficient
                in PHP, Python and TypeScript and if I have to learn another one
                I wouldn't mind (Rust 🤔)`}
              </p>
            </div>
          </div>
          <div className="lg:pl-20">
            <ul role="list">
              <SocialLink href="#" icon={TwitterIcon}>
                Follow on Twitter
              </SocialLink>
              <SocialLink href="#" icon={GitHubIcon} className="mt-4">
                Follow on GitHub
              </SocialLink>
              <SocialLink href="#" icon={LinkedInIcon} className="mt-4">
                Follow on LinkedIn
              </SocialLink>
              <SocialLink
                href="mailto:me@crissto.dev"
                icon={MailIcon}
                className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
              >
                me@crissto.dev
              </SocialLink>
            </ul>
          </div>
        </div>
      </Container>
    </>
  )
}
