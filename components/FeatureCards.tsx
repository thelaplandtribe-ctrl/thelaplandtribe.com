type FeatureCard = {
  title: string;
  description: string;
  linkLabel: string;
  linkHref?: string;
  icon: string;
  illustration: React.ReactNode;
};

const defaultCards: FeatureCard[] = [
  {
    title: "Lire le blog",
    description:
      "Conseils, récits, vie quotidienne, hiver, famille, logement, budget, démarches…",
    linkLabel: "VOIR LES DERNIERS ARTICLES",
    linkHref: "/journal",
    icon: "ti-book-2",
    illustration: (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 400 200"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="fc-g1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f3c9a0" />
            <stop offset="55%" stopColor="#e9a9a0" />
            <stop offset="100%" stopColor="#d6dde2" />
          </linearGradient>
        </defs>
        <rect width="400" height="200" fill="url(#fc-g1)" />
        <path
          d="M0,200 L0,150 C120,135 280,165 400,148 L400,200 Z"
          fill="#eef3f5"
        />
        <g fill="#2c3b34">
          <path d="M40,160 L58,108 L76,160 Z" />
          <path d="M70,166 L92,104 L114,166 Z" />
          <path d="M300,162 L320,110 L340,162 Z" />
          <path d="M334,168 L356,104 L378,168 Z" />
        </g>
      </svg>
    ),
  },
  {
    title: "Affiches murales",
    description:
      "Des créations inspirées des paysages nordiques : forêts, aurores, rennes, villages enneigés.",
    linkLabel: "DÉCOUVRIR LES AFFICHES",
    linkHref: "/boutique",
    icon: "ti-photo",
    illustration: (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 400 200"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width="400" height="200" fill="#e7e0d5" />
        <rect x="150" y="34" width="110" height="140" fill="#2a2a2a" />
        <rect x="160" y="44" width="90" height="120" fill="#102033" />
        <path
          d="M160,120 C190,90 220,130 250,104 L250,164 L160,164 Z"
          fill="#1c3a4a"
        />
        <path
          d="M170,110 C200,84 230,118 250,98"
          fill="none"
          stroke="#3fd089"
          strokeWidth="6"
          opacity=".7"
        />
        <rect x="46" y="120" width="54" height="54" rx="6" fill="#3c5a4b" />
        <rect x="60" y="80" width="26" height="44" fill="#2f4738" />
      </svg>
    ),
  },
  {
    title: "Expériences arctiques",
    description:
      "Safaris aurores, traîneaux à chiens et nuits en dôme de verre, pensés et vécus à Rovaniemi.",
    linkLabel: "DÉCOUVRIR LES SÉJOURS",
    linkHref: "/experiences",
    icon: "ti-tent",
    illustration: (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 400 200"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="fc-g3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#10203a" />
            <stop offset="100%" stopColor="#1e3a3a" />
          </linearGradient>
          <radialGradient id="fc-win" cx="50%" cy="50%" r="60%">
            <stop offset="0" stopColor="#ffe6a8" />
            <stop offset="100%" stopColor="#e8a23d" />
          </radialGradient>
          <filter id="fc-blur">
            <feGaussianBlur stdDeviation="26" />
          </filter>
        </defs>
        <rect width="400" height="200" fill="url(#fc-g3)" />
        <ellipse
          cx="180"
          cy="40"
          rx="160"
          ry="50"
          fill="#2dd4bf"
          opacity=".4"
          filter="url(#fc-blur)"
        />
        <path
          d="M0,200 L0,150 C140,140 260,170 400,150 L400,200 Z"
          fill="#e9eef0"
          opacity=".9"
        />
        <circle cx="250" cy="120" r="46" fill="#0c1a2e" />
        <path d="M222,150 a28,28 0 0,1 56,0 Z" fill="#0c1a2e" />
        <rect x="240" y="112" width="20" height="16" rx="3" fill="url(#fc-win)" />
      </svg>
    ),
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
              <div className="h-[200px] relative overflow-hidden">
                {card.illustration}
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
