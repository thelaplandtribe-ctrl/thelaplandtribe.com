import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { articles } from "@/data/articles";
import { articleBodies } from "@/data/article-bodies";
import { getMdxPost, listMdxPosts, listMdxSlugs } from "@/lib/mdx";

type Params = { params: { slug: string } };

export async function generateStaticParams() {
  const mdxSlugs = await listMdxSlugs();
  const scraped = articles.map((a) => a.slug);
  return Array.from(new Set([...mdxSlugs, ...scraped])).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await getMdxPost(params.slug);
  if (post) {
    return {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      openGraph: {
        title: post.frontmatter.title,
        description: post.frontmatter.excerpt,
        images: post.frontmatter.image ? [post.frontmatter.image] : [],
        type: "article",
        publishedTime: post.frontmatter.date,
      },
    };
  }
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) return { title: "Article introuvable" };
  const body = articleBodies[params.slug];
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: body?.heroImage
        ? [body.heroImage]
        : article.image
          ? [article.image]
          : [],
      type: "article",
      publishedTime: article.date,
      authors: article.author ? [article.author] : undefined,
    },
  };
}

type SidebarItem = {
  href: string;
  title: string;
  category: string;
  dateLabel?: string;
  image?: string | null;
};

async function pickRelated(currentSlug: string): Promise<SidebarItem[]> {
  const mdxPosts = await listMdxPosts();
  const mdxItems: SidebarItem[] = mdxPosts
    .filter((p) => p.frontmatter.slug !== currentSlug)
    .map((p) => ({
      href: `/blogs/infos/${p.frontmatter.slug}`,
      title: p.frontmatter.title,
      category: p.frontmatter.categorie,
      dateLabel: p.frontmatter.date,
      image: p.frontmatter.image,
    }));
  const scrapedItems: SidebarItem[] = articles
    .filter((a) => a.slug !== currentSlug)
    .map((a) => ({
      href: `/blogs/infos/${a.slug}`,
      title: a.title,
      category: a.category,
      dateLabel: a.dateLabel,
      image: a.image,
    }));
  return [...mdxItems, ...scrapedItems].slice(0, 4);
}

export default async function ArticlePage({ params }: Params) {
  const post = await getMdxPost(params.slug);
  const related = await pickRelated(params.slug);

  if (post) {
    const { frontmatter, content } = post;
    return (
      <article>
        <header className="relative bg-night text-white pt-24 sm:pt-28 md:pt-36 pb-14 sm:pb-18 md:pb-24 overflow-hidden">
          {frontmatter.image && (
            <>
              <img
                src={frontmatter.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-night/70 via-night/60 to-night" />
            </>
          )}
          <div className="relative z-10 mx-auto max-w-[820px] px-4 sm:px-6 md:px-12 text-center">
            <div className="text-[11px] tracking-[0.14em] font-bold text-gold mb-4">
              {frontmatter.categorie?.toUpperCase()} · {frontmatter.readTime}
            </div>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.14]">
              {frontmatter.title}
            </h1>
            <p className="mt-6 text-sm text-white/70">{frontmatter.excerpt}</p>
          </div>
        </header>

        <section className="bg-cream py-10 sm:py-12 md:py-16">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 md:gap-12">
            <div className="article-prose">
              <MDXRemote source={content} />
            </div>
            <Sidebar related={related} />
          </div>
        </section>

        <BottomLink />
      </article>
    );
  }

  const article = articles.find((a) => a.slug === params.slug);
  if (!article) notFound();
  const body = articleBodies[params.slug];
  const heroImage = body?.heroImage || article.image;

  return (
    <article>
      <header className="relative bg-night text-white pt-24 sm:pt-28 md:pt-36 pb-14 sm:pb-18 md:pb-24 overflow-hidden">
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

      <section className="bg-cream py-10 sm:py-12 md:py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 md:gap-12">
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
          <Sidebar related={related} />
        </div>
      </section>

      <BottomLink />
    </article>
  );
}

function Sidebar({ related }: { related: SidebarItem[] }) {
  return (
    <aside className="lg:sticky lg:top-24 self-start space-y-8">
      <div>
        <h3 className="text-[11px] tracking-[0.14em] font-bold text-ink/50 mb-4">
          À LIRE AUSSI
        </h3>
        <ul className="space-y-5">
          {related.map((r) => (
            <li key={r.href}>
              <Link href={r.href} className="group flex gap-3">
                <div className="w-20 h-20 flex-shrink-0 rounded-[3px] overflow-hidden bg-gradient-to-br from-forest to-night">
                  {r.image && (
                    <img
                      src={r.image}
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] tracking-[0.1em] font-bold text-forest mb-1 uppercase">
                    {r.category}
                  </div>
                  <h4 className="font-display text-sm leading-tight font-medium group-hover:text-forest transition-colors">
                    {r.title}
                  </h4>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

function BottomLink() {
  return (
    <div className="bg-cream pb-12 sm:pb-16">
      <div className="mx-auto max-w-[760px] px-4 sm:px-6 md:px-8 text-center border-t border-ink/10 pt-8 sm:pt-10">
        <Link
          href="/blogs/infos"
          className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.1em] text-forest hover:gap-3 transition-all"
        >
          <i className="ti ti-arrow-left" aria-hidden="true" />
          REVENIR AU JOURNAL
        </Link>
      </div>
    </div>
  );
}
