import { articles as allArticles, type Article } from "@/data/articles";

type PopularArticlesProps = {
  eyebrow?: string;
  title?: string;
  articles?: Article[];
  limit?: number;
  allLabel?: string;
  allHref?: string;
};

function Cover({ article }: { article: Article }) {
  if (article.image) {
    return (
      <img
        src={article.image}
        alt={article.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
    );
  }
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-forest to-night p-4 text-center">
      <span className="font-script text-gold text-base leading-tight">
        {article.category.toLowerCase()}
      </span>
    </div>
  );
}

export default function PopularArticles({
  eyebrow = "À lire en premier",
  title = "Articles populaires",
  articles = allArticles,
  limit = 5,
  allLabel = "VOIR TOUS LES ARTICLES",
  allHref = "/blogs/infos",
}: PopularArticlesProps) {
  const visible = articles.slice(0, limit);

  return (
    <section className="bg-cream py-14 sm:py-20 md:py-[84px] text-center" id="exp">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12">
        <span className="font-script text-forest text-[18px] sm:text-[22px] block mb-1">
          {eyebrow}
        </span>
        <h2 className="font-display text-[24px] sm:text-[28px] md:text-[34px] font-semibold mb-8 sm:mb-11">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-[18px] text-left">
          {visible.map((article) => (
            <a
              key={article.slug}
              href={`/blogs/infos/${article.slug}`}
              className="group transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="h-[180px] sm:h-[160px] md:h-[150px] rounded-[4px] overflow-hidden relative mb-3.5 shadow-[0_10px_26px_rgba(27,36,48,0.10)]">
                <Cover article={article} />
              </div>
              <h4 className="font-display text-base font-medium leading-[1.25] mb-3">
                {article.title}
              </h4>
              <div className="text-[10px] tracking-[0.08em] text-[#8A929C] font-bold border-t border-ink/10 pt-2.5">
                <b className="text-forest font-bold">{article.category}</b> ·{" "}
                {article.dateLabel}
              </div>
            </a>
          ))}
        </div>
        <a
          href={allHref}
          className="mt-8 sm:mt-[42px] inline-block text-[12px] font-bold tracking-[0.1em] text-ink border border-ink/10 px-[28px] sm:px-[34px] py-3 sm:py-3.5 hover:bg-ink hover:text-white hover:border-ink transition-colors"
        >
          {allLabel}
        </a>
      </div>
    </section>
  );
}
