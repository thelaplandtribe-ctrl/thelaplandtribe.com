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
  overlayClass?: string;
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
  overlayClass: "bg-night/65",
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
  overlayClass: "bg-night/55",
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

function Half({ data, dark }: { data: ShowcaseHalf; dark?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden min-h-[440px] flex items-center py-[70px] px-8 md:px-14 ${
        dark ? "bg-[#0A1422]" : "bg-night"
      }`}
    >
      {data.bgImage && (
        <>
          <img
            src={data.bgImage}
            alt={data.bgImageAlt || ""}
            aria-hidden={data.bgImageAlt ? undefined : true}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className={`absolute inset-0 ${data.overlayClass || "bg-night/60"}`}
            aria-hidden="true"
          />
        </>
      )}
      <div className="relative z-10 max-w-[380px]">
        <span className="font-script text-gold text-xl block mb-2">
          {data.eyebrow}
        </span>
        <h2 className="font-display text-[32px] leading-[1.12] font-medium mb-[18px] text-white">
          {data.title}
        </h2>
        <p className="text-sm text-white/70 font-light mb-6">{data.description}</p>
        {data.features && data.features.length > 0 && (
          <div className="flex flex-wrap gap-[22px] mb-[26px]">
            {data.features.map((f) => (
              <div
                key={f.label}
                className="flex flex-col items-center gap-[7px] w-[72px] text-center"
              >
                <i className={`ti ${f.icon} text-xl text-gold`} aria-hidden="true" />
                <span className="text-[9.5px] text-white/60 leading-[1.3] tracking-[0.02em]">
                  {f.label}
                </span>
              </div>
            ))}
          </div>
        )}
        <a
          href={data.ctaHref}
          className="inline-block bg-white/95 hover:bg-white text-night text-[13px] font-semibold tracking-[0.1em] px-[30px] py-[15px] transition-colors"
        >
          {data.ctaLabel}
        </a>
      </div>
      {!data.bgImage && (
        <div className="hidden md:block absolute -right-[30px] top-1/2 -translate-y-1/2 w-[300px] z-0 opacity-95">
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
    <div className="grid grid-cols-1 md:grid-cols-2 text-white" id="shop">
      <Half data={left} />
      <Half data={right} dark />
    </div>
  );
}
