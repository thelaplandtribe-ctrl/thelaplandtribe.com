type Article = {
  title: string;
  category: string;
  duration: string;
  href?: string;
  illustration: React.ReactNode;
};

const defaultArticles: Article[] = [
  {
    title: "Vivre en Laponie : ce que personne ne vous dit vraiment",
    category: "RÉCIT DE VIE",
    duration: "12 MIN",
    illustration: (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 220 150"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="pa-win-1" cx="50%" cy="50%" r="60%">
            <stop offset="0" stopColor="#ffe6a8" />
            <stop offset="100%" stopColor="#e8a23d" />
          </radialGradient>
        </defs>
        <rect width="220" height="150" fill="#b9cdd6" />
        <path
          d="M0,150 L0,100 C70,90 150,110 220,98 L220,150Z"
          fill="#eef3f5"
        />
        <rect x="80" y="70" width="60" height="40" fill="#7a2d28" />
        <path d="M74,72 L110,52 L146,72Z" fill="#e7eef1" />
        <rect x="96" y="82" width="12" height="14" fill="url(#pa-win-1)" />
      </svg>
    ),
  },
  {
    title: "Combien coûte la vie dans le Nord ?",
    category: "CONSEILS",
    duration: "10 MIN",
    illustration: (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 220 150"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width="220" height="150" fill="#d9b89a" />
        <rect x="40" y="60" width="140" height="70" rx="8" fill="#b5763f" />
        <rect x="60" y="48" width="30" height="40" fill="#7aa84a" />
        <rect x="110" y="44" width="26" height="44" fill="#c14b3a" />
        <rect x="150" y="52" width="22" height="36" fill="#e0a93f" />
      </svg>
    ),
  },
  {
    title: "Acheter une maison pas chère : bonne idée ou piège ?",
    category: "LOGEMENT",
    duration: "15 MIN",
    illustration: (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 220 150"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="pa-ps" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f0a868" />
            <stop offset="100%" stopColor="#5a4a6a" />
          </linearGradient>
          <radialGradient id="pa-win-3" cx="50%" cy="50%" r="60%">
            <stop offset="0" stopColor="#ffe6a8" />
            <stop offset="100%" stopColor="#e8a23d" />
          </radialGradient>
        </defs>
        <rect width="220" height="150" fill="url(#pa-ps)" />
        <path
          d="M0,150 L0,110 C80,100 150,118 220,106 L220,150Z"
          fill="#2a2030"
        />
        <rect x="86" y="84" width="54" height="34" fill="#1a1018" />
        <path d="M80,86 L113,66 L146,86Z" fill="#cdb6a0" />
        <rect x="100" y="94" width="12" height="16" fill="url(#pa-win-3)" />
      </svg>
    ),
  },
  {
    title: "L'hiver à -20°C avec un enfant : notre organisation",
    category: "VIE QUOTIDIENNE",
    duration: "8 MIN",
    illustration: (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 220 150"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width="220" height="150" fill="#dde6ea" />
        <g fill="#cdd9de">
          <path d="M30,150 L48,104 L66,150Z" />
          <path d="M150,150 L170,100 L190,150Z" />
        </g>
        <circle cx="110" cy="86" r="14" fill="#3a4a3a" />
        <rect x="103" y="96" width="14" height="30" fill="#caa23f" />
      </svg>
    ),
  },
  {
    title: "Finlande ou Suède : quel pays choisir pour s'installer ?",
    category: "EXPATRIATION",
    duration: "12 MIN",
    illustration: (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 220 150"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="pa-pa" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0c1a30" />
            <stop offset="100%" stopColor="#15323a" />
          </linearGradient>
          <filter id="pa-blur">
            <feGaussianBlur stdDeviation="26" />
          </filter>
        </defs>
        <rect width="220" height="150" fill="url(#pa-pa)" />
        <ellipse
          cx="120"
          cy="40"
          rx="120"
          ry="34"
          fill="#46d98a"
          opacity=".5"
          filter="url(#pa-blur)"
        />
        <path
          d="M0,150 L0,108 C80,100 150,116 220,104 L220,150Z"
          fill="#e6edef"
        />
        <g fill="#12222c">
          <path d="M40,118 L54,84 L68,118Z" />
          <path d="M160,120 L176,82 L192,120Z" />
        </g>
      </svg>
    ),
  },
];

type PopularArticlesProps = {
  eyebrow?: string;
  title?: string;
  articles?: Article[];
  allLabel?: string;
  allHref?: string;
};

export default function PopularArticles({
  eyebrow = "À lire en premier",
  title = "Articles populaires",
  articles = defaultArticles,
  allLabel = "VOIR TOUS LES ARTICLES",
  allHref = "/journal",
}: PopularArticlesProps) {
  return (
    <section className="bg-cream py-[84px] text-center" id="exp">
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        <span className="font-script text-forest text-[22px] block mb-1">
          {eyebrow}
        </span>
        <h2 className="font-display text-[34px] font-semibold mb-11">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-[18px] text-left">
          {articles.map((article) => (
            <a
              key={article.title}
              href={article.href}
              className="group transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="h-[150px] rounded-[4px] overflow-hidden relative mb-3.5 shadow-[0_10px_26px_rgba(27,36,48,0.10)]">
                {article.illustration}
              </div>
              <h4 className="font-display text-base font-medium leading-[1.25] mb-3">
                {article.title}
              </h4>
              <div className="text-[10px] tracking-[0.08em] text-[#8A929C] font-bold border-t border-ink/10 pt-2.5">
                <b className="text-forest font-bold">{article.category}</b> ·{" "}
                {article.duration}
              </div>
            </a>
          ))}
        </div>
        <a
          href={allHref}
          className="mt-[42px] inline-block text-[12px] font-bold tracking-[0.1em] text-ink border border-ink/10 px-[34px] py-3.5 hover:bg-ink hover:text-white hover:border-ink transition-colors"
        >
          {allLabel}
        </a>
      </div>
    </section>
  );
}
