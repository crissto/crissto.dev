import { Card } from "@/components/Card";
import Newsletter from "@/components/Newsletter";
import { SimpleLayout } from "@/components/SimpleLayout";
import { formatDate } from "@/lib/formatDate";
import { type Article as TArticle, getAllArticles } from "@/lib/getAllArticles";
import type { Metadata } from "next";

function Article({ article }: { article: Omit<TArticle, "component"> }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/articles/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
        >
          {formatDate(article.date)}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(article.date)}
      </Card.Eyebrow>
    </article>
  );
}

export const metadata: Metadata = {
  title: "Articles - Christian Stoyanov",
  description: "Some articles might be rambling and some might be interesting",
};

export default async function ArticlesIndex() {
  const articles = await getAllArticles();

  return (
    <SimpleLayout
      title="Writing on software development and things that interest me"
      intro="Heads up, some articles might be rambling and some might be interesting."
    >
      {articles.length > 0 ? (
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-zinc-700 dark:text-zinc-500">
            {`
                There is no articles published. Subscribe so you don't miss the first.
              `}
          </p>
          <Newsletter />
        </div>
      )}
    </SimpleLayout>
  );
}
