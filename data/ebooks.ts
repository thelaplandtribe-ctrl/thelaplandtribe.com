export type EbookHighlight = { icon: string; title: string; description: string };
export type EbookTestimonial = { author: string; role: string; quote: string };

export type Ebook = {
  slug: string;
  url: string;
  title: string;
  displayTitle: string;
  subtitle: string;
  price: string;
  priceCents: number;
  currency: string;
  vendor: string;
  pages: number;
  format: string;
  intro: string;
  description: string;
  images: string[];
  highlights: EbookHighlight[];
  audience: string[];
  bonus: string[];
  chapters?: { title: string; items: string[] }[];
  testimonials: EbookTestimonial[];
};

const sharedTestimonialsExpat: EbookTestimonial[] = [
  {
    author: "Camille L.",
    role: "Installée à Göteborg en 2024",
    quote:
      "Je l'ai lu deux fois avant de partir et une troisième fois sur place. La partie sur le personnummer et l'inscription à 1177 m'a fait gagner des semaines, j'ai tout fait dans le bon ordre.",
  },
  {
    author: "Julien & Maëlle",
    role: "Famille expatriée à Umeå",
    quote:
      "On hésitait entre la Suède et la Norvège. Ce guide nous a permis de comprendre concrètement le système scolaire, la sécu et le coût de la vie. On est partis sereins.",
  },
  {
    author: "Thomas K.",
    role: "Freelance dev installé à Stockholm",
    quote:
      "Très complet sur la fiscalité et la création d'entreprise — la partie F-skatt explique enfin clairement comment ça marche. Bien meilleur que les trois forums que j'avais épluchés.",
  },
];

const sharedTestimonialsMaison: EbookTestimonial[] = [
  {
    author: "Sophie & David",
    role: "Acquéreurs d'un fritidshus en Dalécarlie",
    quote:
      "On a acheté notre maison de campagne en suivant le guide étape par étape. La checklist de visite nous a évité au moins deux mauvaises affaires, et le lexique suédois-français vaut son pesant d'or.",
  },
  {
    author: "Pierre R.",
    role: "Retraité installé en Suède du Sud",
    quote:
      "Je cherchais une résidence secondaire pour moins de 70 000 €. Le guide m'a aidé à cibler les bonnes régions et à comprendre comment traduire les annonces Hemnet et Booli. Acheté en six mois.",
  },
  {
    author: "Aurélie M.",
    role: "Projet de location courte durée",
    quote:
      "La partie sur la location saisonnière et les obligations du propriétaire étranger m'a vraiment éclairée. J'ai pu monter mon projet sans me planter sur la fiscalité.",
  },
];

export const ebooks: Ebook[] = [
  {
    slug: "e-book-reussir-son-expatriation-en-suede",
    url: "https://thelaplandtribe.com/products/e-book-reussir-son-expatriation-en-suede",
    title: "E-BOOK : Réussir son expatriation en Suède",
    displayTitle: "Réussir son expatriation en Suède",
    subtitle: "Le guide pratique pour s'installer sereinement dans le Nord",
    price: "€10,00",
    priceCents: 1000,
    currency: "EUR",
    vendor: "The Lapland Tribe",
    pages: 88,
    format: "PDF",
    intro:
      "Vous rêvez de vous installer en Suède, mais vous ne savez pas par où commencer ? Ce guide pratique et détaillé vous accompagne à chaque étape de votre expatriation. Étudiant, salarié, indépendant ou entrepreneur — ce livre numérique est votre allié pour réussir votre intégration.",
    description:
      "88 pages pour comprendre la Suède de l'intérieur : démarches administratives, marché du travail, vie quotidienne, santé, éducation, logement, et un chapitre entier dédié à la Laponie suédoise.",
    images: [
      "/images/ebooks/e-book-reussir-son-expatriation-en-suede-1.png",
      "/images/ebooks/e-book-reussir-son-expatriation-en-suede-2.png",
      "/images/ebooks/e-book-reussir-son-expatriation-en-suede-3.png",
      "/images/ebooks/e-book-reussir-son-expatriation-en-suede-4.png",
    ],
    highlights: [
      {
        icon: "ti-file-text",
        title: "Toutes les démarches administratives",
        description:
          "Obtenir un personnummer, ouvrir un compte bancaire, trouver un logement, s'inscrire à 1177 — tout est expliqué dans le bon ordre.",
      },
      {
        icon: "ti-briefcase",
        title: "Trouver un emploi ou créer son entreprise",
        description:
          "Marché du travail, plateformes, droit du travail, contrats, F-skatt et création d'entreprise pour indépendants.",
      },
      {
        icon: "ti-heart-handshake",
        title: "Vie quotidienne et intégration culturelle",
        description:
          "Mentalité suédoise, apprentissage de la langue, coût de la vie, différences culturelles et habitudes locales.",
      },
      {
        icon: "ti-stethoscope",
        title: "Système de santé et éducation",
        description:
          "Accéder aux soins, scolariser ses enfants, comprendre les assurances et le système suédois.",
      },
      {
        icon: "ti-snowflake",
        title: "Un chapitre dédié à la Laponie",
        description:
          "Particularités du Grand Nord : nuits polaires, étés sans fin, opportunités locales, culture sami.",
      },
    ],
    audience: [
      "Travailleurs expatriés souhaitant s'installer en Suède",
      "Étudiants internationaux cherchant des informations pratiques",
      "Entrepreneurs voulant lancer une activité en Suède",
      "Toute personne préparant un départ ou une installation définitive",
    ],
    bonus: [
      "Check-list des documents essentiels à préparer avant le départ",
      "Numéros de téléphone et sites web utiles, classés par démarche",
      "Liste des meilleures ressources pour une expatriation réussie",
    ],
    chapters: [
      {
        title: "Découvrir la Suède et sa culture",
        items: [
          "Histoire et traditions suédoises",
          "Mode de vie et valeurs : équilibre, égalité, durabilité",
          "Culture contemporaine : design, gastronomie, arts",
        ],
      },
      {
        title: "Avant le départ : préparer son expatriation",
        items: [
          "Documents administratifs et officiels",
          "Informer les institutions, gérer les changements",
          "Organiser le transport et le déménagement",
        ],
      },
      {
        title: "Les démarches pour s'installer",
        items: [
          "Visa et permis de séjour",
          "Personnummer, sécurité sociale, 1177",
          "Compte bancaire et fiscalité",
        ],
      },
      {
        title: "Trouver un emploi",
        items: [
          "Marché du travail et secteurs porteurs",
          "Droit du travail : contrats, congés, protection",
          "Créer sa propre entreprise (F-skatt)",
        ],
      },
      {
        title: "Se loger en Suède",
        items: [
          "Comprendre le marché immobilier",
          "Outils et stratégies de recherche",
          "Démarches pour louer ou acheter",
        ],
      },
      {
        title: "Vie quotidienne et adaptation",
        items: [
          "Coût de la vie : villes vs zones rurales",
          "Éducation et options scolaires",
          "Gérer le choc culturel",
        ],
      },
      {
        title: "L'expatriation en Laponie suédoise",
        items: [
          "Particularités géographiques et climatiques",
          "Opportunités professionnelles locales",
          "Découverte de la culture sami",
        ],
      },
      {
        title: "Ressources et adresses utiles",
        items: [
          "Sites et plateformes pour expatriés",
          "Numéros d'urgence et contacts",
          "Check-list finale des démarches",
        ],
      },
    ],
    testimonials: sharedTestimonialsExpat,
  },
  {
    slug: "acheter-une-maison-en-suede-le-guide-ultime",
    url: "https://thelaplandtribe.com/products/acheter-une-maison-en-suede-le-guide-ultime",
    title: "E-BOOK : Acheter une maison en Suède - Le guide ultime",
    displayTitle: "Acheter une maison en Suède",
    subtitle: "Le guide ultime pour concrétiser votre projet immobilier",
    price: "€10,00",
    priceCents: 1000,
    currency: "EUR",
    vendor: "The Lapland Tribe",
    pages: 56,
    format: "PDF",
    intro:
      "Vous rêvez d'acheter une maison en Suède, mais vous ne savez pas par où commencer ? Ce guide vous accompagne pas à pas : maison de campagne abordable, résidence secondaire rustique ou refuge personnel loin de l'agitation — tout y est.",
    description:
      "56 pages pour réussir votre achat immobilier en Suède : marché, plateformes, budget, étapes juridiques, exploitation du bien. Avec checklists, lexique et bonus pratiques.",
    images: [
      "/images/ebooks/acheter-une-maison-en-suede-le-guide-ultime-1.png",
      "/images/ebooks/acheter-une-maison-en-suede-le-guide-ultime-2.png",
      "/images/ebooks/acheter-une-maison-en-suede-le-guide-ultime-3.png",
    ],
    highlights: [
      {
        icon: "ti-map-2",
        title: "Comprendre le marché suédois des maisons abordables",
        description:
          "Régions à cibler, types de biens disponibles, différences entre fritidshus, villa et gård/skog.",
      },
      {
        icon: "ti-search",
        title: "Où chercher et comment repérer une bonne affaire",
        description:
          "Plateformes suédoises (Hemnet, Booli), agences, astuces pour traduire et décrypter les annonces.",
      },
      {
        icon: "ti-wallet",
        title: "Préparer un budget réaliste sans pièges cachés",
        description:
          "Coûts d'achat, frais annexes, entretien, rénovations, charges locales et transport.",
      },
      {
        icon: "ti-file-check",
        title: "Toutes les étapes d'un achat en Suède",
        description:
          "Visites, offres, contrats, remise des clés et obligations spécifiques au propriétaire étranger.",
      },
      {
        icon: "ti-home-2",
        title: "Utiliser, louer ou faire évoluer son bien",
        description:
          "Télétravail, usage saisonnier, location courte durée et transformation future du bien.",
      },
    ],
    audience: [
      "Ceux qui veulent acheter une maison secondaire en pleine nature pour moins de 80 000 €",
      "Amateurs de Scandinavie en quête d'un projet concret, à taille humaine",
      "Personnes souhaitant investir sans pression ni crédit, dans un lieu paisible",
      "Tous ceux qui rêvent de vivre autrement, au rythme nordique",
    ],
    bonus: [
      "Checklist d'évaluation complète d'un bien lors de la visite",
      "Lexique suédois-français de l'achat immobilier",
      "Checklist « remise des clés » pour ne rien oublier",
    ],
    testimonials: sharedTestimonialsMaison,
  },
];
