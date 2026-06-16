import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/data/articles";
import { articleBodies } from "@/data/article-bodies";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) return { title: "Article introuvable" };
  const body = articleBodies[params.slug];
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: body?.heroImage ? [body.heroImage] : article.image ? [article.image] : [],
      type: "article",
      publishedTime: article.date,
      authors: article.author ? [article.author] : undefined,
    },
  };
}

export default function ArticlePage({ params }: Params) {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) notFound();
  const body = articleBodies[params.slug];
  const heroImage = body?.heroImage || article.image;

  return (
    <article>
      <header className="relative bg-night text-white pt-36 pb-24 overflow-hidden">
        {heroImage && (
          <>
            <img
              src={heroImage}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-night/70 via-night/60 to-night" />
          </>
        )}
        <div className="relative z-10 mx-auto max-w-[820px] px-6 md:px-12 text-center">
          <div className="text-[11px] tracking-[0.14em] font-bold text-gold mb-4">
            {article.category} · {article.dateLabel}
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-medium leading-[1.12]">
            {article.title}
          </h1>
          {article.author && (
            <p className="mt-6 text-sm text-white/70">
              Par <span className="font-medium">{article.author}</span>
            </p>
          )}
        </div>
      </header>

      <section className="bg-cream py-20">
        <div className="mx-auto max-w-[760px] px-6 md:px-8">
          {body?.bodyHtml ? (
            <div
              className="article-prose"
              dangerouslySetInnerHTML={{ __html: body.bodyHtml }}
            />
          ) : (
            <p className="text-ink/70 italic">
              Le contenu de cet article n&apos;a pas pu être chargé.
            </p>
          )}

          <div className="mt-16 pt-10 border-t border-ink/10 text-center">
            <Link
              href="/blogs/infos"
              className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.1em] text-forest hover:gap-3 transition-all"
            >
              <i className="ti ti-arrow-left" aria-hidden="true" />
              REVENIR AU JOURNAL
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
