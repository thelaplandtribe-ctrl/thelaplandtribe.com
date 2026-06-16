type FeatureCard = {
  title: string;
  description: string;
  linkLabel: string;
  linkHref?: string;
  icon: string;
  image: string;
  imageAlt: string;
};

const defaultCards: FeatureCard[] = [
  {
    title: "Lire le blog",
    description:
      "Conseils, récits, vie quotidienne, hiver, famille, logement, budget, démarches…",
    linkLabel: "VOIR LES DERNIERS ARTICLES",
    linkHref: "/blogs/infos",
    icon: "ti-book-2",
    image: "/images/cat-blog.png",
    imageAlt: "Le blog The Lapland Tribe",
  },
  {
    title: "Affiches murales",
    description:
      "Des créations inspirées des paysages nordiques : forêts, aurores, rennes, villages enneigés.",
    linkLabel: "DÉCOUVRIR LES AFFICHES",
    linkHref: "/collections/affiches-murales",
    icon: "ti-photo",
    image: "/images/cat-affiches.png",
    imageAlt: "Affiches murales inspirées du Grand Nord",
  },
  {
    title: "E-books expatriation",
    description:
      "Guides pratiques pour s'installer en Suède et en Finlande : démarches, logement, budget, conseils.",
    linkLabel: "VOIR LES E-BOOKS",
    linkHref: "/collections/e-books",
    icon: "ti-book",
    image: "/images/cat-ebooks.png",
    imageAlt: "E-books d'expatriation The Lapland Tribe",
  },
];

type FeatureCardsProps = { cards?: FeatureCard[] };

export default function FeatureCards({ cards = defaultCards }: FeatureCardsProps) {
  return (
    <section className="bg-cream py-20" id="blog">
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px]">
          {cards.map((card) => (
            <article
              key={card.title}
              className="bg-white rounded-[4px] overflow-hidden shadow-[0_18px_50px_rgba(27,36,48,0.07)] hover:shadow-[0_28px_64px_rgba(27,36,48,0.12)] hover:-translate-y-1.5 transition-all duration-[400ms]"
            >
              <div className="h-[220px] relative overflow-hidden">
                <img
                  src={card.image}
                  alt={card.imageAlt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute left-6 -bottom-[26px] w-[54px] h-[54px] rounded-full bg-white flex items-center justify-center text-[23px] text-forest shadow-[0_8px_20px_rgba(27,36,48,0.14)] z-10">
                  <i className={`ti ${card.icon}`} aria-hidden="true" />
                </div>
              </div>
              <div className="pt-[42px] px-[26px] pb-[30px]">
                <h3 className="font-display text-[23px] font-semibold mb-3">
                  {card.title}
                </h3>
                <p className="text-sm text-[#5C6672] font-light mb-5 min-h-[64px]">
                  {card.description}
                </p>
                <a
                  href={card.linkHref}
                  className="group inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.08em] text-forest hover:gap-3 transition-all"
                >
                  {card.linkLabel}
                  <i className="ti ti-arrow-right" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
