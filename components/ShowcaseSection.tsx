type ShowcaseFeature = { icon: string; label: string };

type ShowcaseHalf = {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  ctaLabel: string;
  ctaHref?: string;
  features?: ShowcaseFeature[];
  illustration: React.ReactNode;
  bgImage?: string;
  bgImageAlt?: string;
};

type ShowcaseSectionProps = {
  left?: ShowcaseHalf;
  right?: ShowcaseHalf;
};

const defaultLeft: ShowcaseHalf = {
  eyebrow: "Boutique",
  title: "Affiches murales inspirées du Grand Nord",
  description:
    "Des visuels minimalistes et chaleureux pour décorer votre intérieur et garder un peu de Laponie chez vous.",
  ctaLabel: "VOIR LA BOUTIQUE",
  ctaHref: "/collections/affiches-murales",
  features: [
    { icon: "ti-award", label: "Qualité premium" },
    { icon: "ti-photo", label: "Impression haute déf." },
    { icon: "ti-ruler", label: "Plusieurs formats" },
    { icon: "ti-truck", label: "Envoi soigné" },
  ],
  bgImage: "/images/bg-affiches.png",
  bgImageAlt: "Affiches murales inspirées de la Laponie",
  illustration: (
    <svg viewBox="0 0 300 280" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sc-win-l" cx="50%" cy="50%" r="60%">
          <stop offset="0" stopColor="#ffe6a8" />
          <stop offset="100%" stopColor="#e8a23d" />
        </radialGradient>
        <filter id="sc-blur-l">
          <feGaussianBlur stdDeviation="26" />
        </filter>
      </defs>
      <rect x="70" y="20" width="150" height="200" fill="#2a2620" />
      <rect x="82" y="32" width="126" height="176" fill="#0f2034" />
      <ellipse
        cx="130"
        cy="80"
        rx="120"
        ry="40"
        fill="#2dd4bf"
        opacity=".4"
        filter="url(#sc-blur-l)"
      />
      <path
        d="M82,160 C120,128 160,168 208,138 L208,208 L82,208 Z"
        fill="#16314a"
      />
      <rect x="120" y="150" width="22" height="30" fill="#0a1626" />
      <rect x="128" y="156" width="6" height="14" fill="url(#sc-win-l)" />
    </svg>
  ),
};

const defaultRight: ShowcaseHalf = {
  eyebrow: "Expériences",
  title: "Vous rêvez de changer de décor ?",
  description:
    "Vivre l'Arctique demande plus qu'un rêve : il faut les bons spots, le bon timing et un peu d'aide locale. Nos séjours et guides vous accompagnent avec une vision concrète et réaliste.",
  ctaLabel: "DÉCOUVRIR LES SÉJOURS",
  ctaHref: "/pages/contact",
  bgImage: "/images/bg-ebooks.png",
  bgImageAlt: "E-books d'expatriation The Lapland Tribe",
  illustration: (
    <svg viewBox="0 0 300 280" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="sc-blur-r">
          <feGaussianBlur stdDeviation="26" />
        </filter>
      </defs>
      <rect x="56" y="40" width="120" height="170" rx="4" fill="#16314a" />
      <rect x="150" y="24" width="120" height="186" rx="4" fill="#0f2640" />
      <ellipse
        cx="150"
        cy="80"
        rx="140"
        ry="40"
        fill="#7c8cf0"
        opacity=".35"
        filter="url(#sc-blur-r)"
      />
      <text
        x="210"
        y="80"
        fill="#fff"
        fontFamily="Playfair Display"
        fontSize="16"
        textAnchor="middle"
      >
        VIVRE EN
      </text>
      <text
        x="210"
        y="100"
        fill="#fff"
        fontFamily="Playfair Display"
        fontSize="16"
        textAnchor="middle"
      >
        LAPONIE
      </text>
      <path
        d="M150,170 C190,140 230,176 270,150 L270,210 L150,210 Z"
        fill="#0c2238"
      />
    </svg>
  ),
};

const TEXT_SHADOW = "0 2px 8px rgba(0,0,0,0.4)";

function Half({
  data,
  darkText,
}: {
  data: ShowcaseHalf;
  darkText?: boolean;
}) {
  const desktopShadow = darkText ? undefined : { textShadow: TEXT_SHADOW };
  const mobileBg = darkText ? "bg-cream" : "bg-night";

  return (
    <div className="relative flex flex-col md:block md:overflow-hidden md:min-h-[500px] lg:min-h-[600px]">
      {data.bgImage && (
        <div className="md:hidden w-full h-[280px] relative overflow-hidden">
          <img
            src={data.bgImage}
            alt={data.bgImageAlt || ""}
            aria-hidden={data.bgImageAlt ? undefined : true}
            className="w-full h-full object-cover object-center"
          />
        </div>
      )}
      {data.bgImage && (
        <img
          src={data.bgImage}
          alt=""
          aria-hidden="true"
          className="hidden md:block absolute inset-0 w-full h-full object-cover object-center"
        />
      )}

      <div
        className={`relative z-10 p-7 md:p-12 lg:px-14 md:absolute md:inset-0 md:flex md:items-center md:p-0 md:pl-12 lg:pl-14 ${mobileBg} md:bg-transparent`}
      >
        <div className="md:max-w-[380px]">
          <span
            className="font-script text-gold text-lg md:text-xl block mb-1.5 md:mb-2"
            style={desktopShadow}
          >
            {data.eyebrow}
          </span>
          <h2
            className={`font-display text-[22px] md:text-[28px] lg:text-[32px] leading-[1.14] font-medium mb-3 md:mb-[18px] ${
              darkText ? "text-[#1B2430]" : "text-white"
            }`}
            style={desktopShadow}
          >
            {data.title}
          </h2>
          <p
            className={`text-[13px] md:text-sm font-light mb-5 md:mb-6 ${
              darkText ? "text-[#1B2430]/85" : "text-white/90"
            }`}
            style={desktopShadow}
          >
            {data.description}
          </p>
          {data.features && data.features.length > 0 && (
            <div className="hidden md:flex flex-wrap gap-[22px] mb-[26px]">
              {data.features.map((f) => (
                <div
                  key={f.label}
                  className="flex flex-col items-center gap-[7px] w-[72px] text-center"
                >
                  <i className={`ti ${f.icon} text-xl text-gold`} aria-hidden="true" />
                  <span
                    className={`text-[9.5px] leading-[1.3] tracking-[0.02em] ${
                      darkText ? "text-[#1B2430]/85" : "text-white/85"
                    }`}
                    style={desktopShadow}
                  >
                    {f.label}
                  </span>
                </div>
              ))}
            </div>
          )}
          <a
            href={data.ctaHref}
            className={`inline-block text-[12px] md:text-[13px] font-semibold tracking-[0.1em] px-6 md:px-[30px] py-3 md:py-[15px] transition-colors ${
              darkText
                ? "bg-[#1B2430] hover:bg-black text-white"
                : "bg-white/95 hover:bg-white text-night"
            }`}
          >
            {data.ctaLabel}
          </a>
        </div>
      </div>

      {!data.bgImage && (
        <div className="hidden md:block absolute -right-[30px] top-1/2 -translate-y-1/2 w-[300px] z-0 opacity-95 pointer-events-none">
          {data.illustration}
        </div>
      )}
    </div>
  );
}

export default function ShowcaseSection({
  left = defaultLeft,
  right = defaultRight,
}: ShowcaseSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2" id="shop">
      <Half data={left} />
      <Half data={right} darkText />
    </div>
  );
}
