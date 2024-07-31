import Head from "next/head";
import Link from "next/link";

import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { Avatar } from "@/components/Header";
import Newsletter from "@/components/Newsletter";
import {
  GitHubIcon,
  LinkedInIcon,
  TwitterIcon,
} from "@/components/SocialIcons";

import Resume from "@/components/Resume";
import { formatDate } from "@/lib/formatDate";
import { generateRssFeed } from "@/lib/generateRssFeed";
import { getAllArticles } from "@/lib/getAllArticles";

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
  );
}

type SocialLinkProps = {
  icon?: any;
  href: string;
};

function SocialLink({ icon: Icon, ...props }: SocialLinkProps) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  );
}

export default async function Home() {
  if (process.env.NODE_ENV === "production") {
    await generateRssFeed();
  }

  const articles = (await getAllArticles())
    .slice(0, 4)
    .map(({ component, ...meta }) => meta);

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
          <div className="grid grid-cols-1 lg:grid-cols-5 space-x-0 lg:space-x-8">
            <div className="col-span-3">
              <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                Hey! 👋{" "}
              </p>
              <p className="mt-1 text-base text-zinc-600 dark:text-zinc-400">
                I’m Christian, a software developer and entrepreneur based in
                Berlin. I current work at Contenful trying to make developers
                life easier. Also love to hack on my own projects and build
                stuff.
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
            <div className="col-span-1 lg:col-span-2 mt-12 lg:mt-0">
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
  );
}
