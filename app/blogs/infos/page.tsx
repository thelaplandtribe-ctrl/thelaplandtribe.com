import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/data/articles";
import { listMdxPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Récits de vie, guides, conseils et coulisses depuis la Laponie.",
};

type Card = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateLabel: string;
  category: string;
  image: string | null;
};

const MONTHS_FR = [
  "JAN",
  "FÉV",
  "MARS",
  "AVR",
  "MAI",
  "JUIN",
  "JUIL",
  "AOÛT",
  "SEPT",
  "OCT",
  "NOV",
  "DÉC",
];

function fmtDate(iso: string): string {
  if (!iso) return "";
  const y = Number(iso.slice(0, 4));
  const m = Number(iso.slice(5, 7));
  const d = Number(iso.slice(8, 10));
  if (!y || !m || !d) return iso;
  return `${d} ${MONTHS_FR[m - 1]} ${y}`;
}

export default async function BlogIndexPage() {
  const mdxPosts = await listMdxPosts();

  const mdxCards: Card[] = mdxPosts.map((p) => ({
    slug: p.frontmatter.slug,
    title: p.frontmatter.title,
    excerpt: p.frontmatter.excerpt,
    date: p.frontmatter.date,
    dateLabel: fmtDate(p.frontmatter.date),
    category: p.frontmatter.categorie?.toUpperCase() || "ACTU",
    image: p.frontmatter.image || null,
  }));

  const scrapedCards: Card[] = articles.map((a) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    date: a.date,
    dateLabel: a.dateLabel,
    category: a.category,
    image: a.image,
  }));

  const seen = new Set<string>();
  const cards = [...mdxCards, ...scrapedCards]
    .filter((c) => {
      if (seen.has(c.slug)) return false;
      seen.add(c.slug);
      return true;
    })
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  return (
    <>
      <header className="bg-night text-white pt-36 pb-20">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12 text-center">
          <span className="font-script text-gold text-2xl block mb-2">
            Le journal
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-medium leading-tight">
            Récits du Grand Nord
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-white/70 font-light">
            Conseils, récits de vie, guides arctiques et coulisses, écrits depuis
            la Laponie.
          </p>
        </div>
      </header>

      <section className="bg-cream py-20">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <p className="text-center text-xs tracking-[0.14em] text-[#8A929C] uppercase mb-10">
            {cards.length} articles · Mis à jour régulièrement
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cards.map((card) => {
              const href = `/blogs/infos/${card.slug}`;
              return (
                <article
                  key={card.slug}
                  className="bg-white rounded-[4px] overflow-hidden shadow-[0_18px_50px_rgba(27,36,48,0.07)] hover:shadow-[0_28px_64px_rgba(27,36,48,0.12)] hover:-translate-y-1.5 transition-all duration-[400ms] flex flex-col"
                >
                  <Link
                    href={href}
                    className="relative block aspect-[16/10] overflow-hidden bg-gradient-to-br from-forest to-night"
                  >
                    {card.image ? (
                      <img
                        src={card.image}
                        alt={card.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center font-script text-gold text-2xl">
                        {card.category.toLowerCase()}
                      </span>
                    )}
                  </Link>
                  <div className="p-6 md:p-7 flex flex-col flex-1">
                    <div className="text-[10px] tracking-[0.08em] text-[#8A929C] font-bold mb-3">
                      <span className="text-forest">{card.category}</span> ·{" "}
                      {card.dateLabel}
                    </div>
                    <h2 className="font-display text-xl md:text-[22px] font-semibold leading-[1.25] mb-3">
                      <Link href={href} className="hover:text-forest transition-colors">
                        {card.title}
                      </Link>
                    </h2>
                    <p className="text-sm text-[#5C6672] font-light flex-1 line-clamp-4">
                      {card.excerpt}
                    </p>
                    <Link
                      href={href}
                      className="mt-5 inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.08em] text-forest hover:gap-3 transition-all"
                    >
                      LIRE L&apos;ARTICLE
                      <i className="ti ti-arrow-right" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
