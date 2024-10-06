import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { Avatar } from "@/components/Header";
import Newsletter from "@/components/Newsletter";
import Resume from "@/components/Resume";
import {
  GitHubIcon,
  LinkedInIcon,
  TwitterIcon,
} from "@/components/SocialIcons";
import { formatDate } from "@/lib/formatDate";
import { getAllArticles } from "@/lib/getAllArticles";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import Link from "next/link";

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
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
};

function SocialLink({ icon: Icon, ...props }: SocialLinkProps) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      {Icon && (
        <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
      )}
    </Link>
  );
}

export default async function Home() {
  const articles = (await getAllArticles())
    .slice(0, 4)
    .map(({ component, ...meta }) => meta);

  return (
    <>
      <Container className="mt-9">
        <div className="max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:space-x-6 sm:align-middle">
            <div className="flex justify-center sm:justify-start mb-4 sm:mb-0">
              <Avatar
                large
                className="block h-24 w-24 sm:h-32 sm:w-32 origin-center sm:origin-left"
              />
            </div>
            <div className="text-center sm:text-left mt-6 lg:mt-0">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 lg:text-5xl">
                Product builder, software developer
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-4 lg:mt-0">
            <div className="col-span-1 lg:col-span-3">
              <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                Hey! 👋{" "}
              </p>
              <p className="mt-1 text-base text-zinc-600 dark:text-zinc-400">
                I'm Christian, a software developer and entrepreneur based in
                Madrid. With a passion for innovation and problem-solving, I've
                transitioned from coding to building impactful products.
              </p>
              <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
                Currently, I'm spearheading the technical development at
                Educaia, a cutting-edge startup leveraging AI to revolutionize
                public service exam preparation. Our platform is designed to
                make the journey easier and more efficient for aspiring public
                servants.
              </p>
              <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
                Beyond Educaia, I collaborate with various companies and
                startups, offering expertise in AI integration and product
                development. My goal is to help businesses harness the power of
                technology to solve complex challenges and drive growth.
              </p>
              <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
                If you're looking for assistance with AI implementation, product
                strategy, or technical leadership, I'd be glad to help. Feel
                free to reach out or{" "}
                <a
                  href="https://cal.com/crissto/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-500 hover:text-teal-600 hover:underline inline-flex items-center gap-1"
                >
                  <ExternalLinkIcon className="w-4 h-4 -mt-0.5" />
                  schedule a call
                </a>{" "}
                to discuss how we can work together to bring your ideas to life.
              </p>
              <div className="mt-6 flex justify-center sm:justify-start gap-6">
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
            <div className="col-span-1 lg:col-span-2 mt-8 lg:mt-0">
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
