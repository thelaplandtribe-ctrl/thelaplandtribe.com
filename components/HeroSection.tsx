"use client";

import { useEffect, useState } from "react";

type Cta = { label: string; href?: string };

type HeroSectionProps = {
  eyebrow?: string;
  title?: React.ReactNode;
  description?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  imageAlt?: string;
};

type Season = "ete" | "automne" | "hiver";

const NIGHT_IMAGE = "/images/hero-cabane.jpg";

const SEASON_IMAGES: Record<Season, { lever: string; coucher: string }> = {
  hiver: {
    lever: "/images/hero-hiver-lever.png",
    coucher: "/images/hero-hiver-coucher.png",
  },
  automne: {
    lever: "/images/hero-automne-lever.png",
    coucher: "/images/hero-automne-coucher.png",
  },
  ete: {
    lever: "/images/hero-ete-lever.png",
    coucher: "/images/hero-ete-lever.png",
  },
};

function getHelsinkiSeason(now: Date): Season {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Helsinki",
    month: "numeric",
    day: "numeric",
  }).formatToParts(now);
  const m = Number(parts.find((p) => p.type === "month")?.value);
  const d = Number(parts.find((p) => p.type === "day")?.value);
  if ((m === 5 && d >= 1) || m === 6 || m === 7 || (m === 8 && d <= 15)) return "ete";
  if ((m === 8 && d >= 16) || m === 9 || m === 10 || (m === 11 && d <= 14)) return "automne";
  return "hiver";
}

function getHelsinkiHour(now: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Helsinki",
    hour: "numeric",
    hour12: false,
  }).formatToParts(now);
  return Number(parts.find((p) => p.type === "hour")?.value) || 0;
}

// Fenêtres lever/coucher approximatives en Laponie par saison, pour choisir
// une image plausible sans attendre l'API sunrise (qui viendra ensuite
// raffiner et déclencher le coucher spécifique).
const APPROX_DAY: Record<Season, { rise: number; set: number }> = {
  ete: { rise: 4, set: 22 },
  automne: { rise: 7, set: 18 },
  hiver: { rise: 10, set: 14 },
};

function getDefaultHeroImage(now: Date): string {
  const season = getHelsinkiSeason(now);
  const hour = getHelsinkiHour(now);
  const { rise, set } = APPROX_DAY[season];
  if (hour < rise || hour >= set) return NIGHT_IMAGE;
  return SEASON_IMAGES[season].lever;
}

function pickHeroImage(
  season: Season,
  now: Date,
  sunrise: Date,
  sunset: Date,
  dayLength: number,
): string {
  // Cercle polaire : day_length = 0 signifie soit le soleil de minuit
  // (été = jour permanent) soit la nuit polaire (Kaamos).
  if (dayLength === 0) {
    return season === "ete" ? SEASON_IMAGES.ete.lever : NIGHT_IMAGE;
  }
  if (now < sunrise || now > sunset) return NIGHT_IMAGE;
  const HOUR_MS = 3_600_000;
  if (now > new Date(sunset.getTime() - HOUR_MS)) return SEASON_IMAGES[season].coucher;
  return SEASON_IMAGES[season].lever;
}

async function getHeroImage(): Promise<string> {
  const now = new Date();
  const season = getHelsinkiSeason(now);
  try {
    const r = await fetch("/api/sunrise");
    const data = await r.json();
    const sunrise = new Date(data.results.sunrise);
    const sunset = new Date(data.results.sunset);
    const dayLength = Number(data.results.day_length) || 0;
    return pickHeroImage(season, now, sunrise, sunset, dayLength);
  } catch {
    return SEASON_IMAGES[season].lever;
  }
}

export default function HeroSection({
  eyebrow = "Bienvenue dans le Grand Nord",
  title = (
    <>
      Vivre, rêver et
      <br />
      s&apos;inspirer de
      <br />
      la Laponie
    </>
  ),
  description = "Récits de vie, guides arctiques, paysages nordiques, affiches murales et expériences pour préparer votre propre aventure.",
  primaryCta = { label: "LIRE LE BLOG", href: "/blogs/infos" },
  secondaryCta = { label: "DÉCOUVRIR LA BOUTIQUE", href: "/collections/affiches-murales" },
  imageAlt = "Paysage de Laponie",
}: HeroSectionProps) {
  const [layerA, setLayerA] = useState<string>(() => getDefaultHeroImage(new Date()));
  const [layerB, setLayerB] = useState<string | null>(null);
  const [showB, setShowB] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getHeroImage().then((target) => {
      if (cancelled) return;
      const current = showB ? layerB : layerA;
      if (target === current) return;
      if (showB) {
        setLayerA(target);
        setShowB(false);
      } else {
        setLayerB(target);
        setShowB(true);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <header className="relative h-[92vh] min-h-[480px] sm:min-h-[560px] md:min-h-[600px] overflow-hidden">
      <img
        src="/images/hero-mobile.jpg"
        alt={imageAlt}
        className="md:hidden absolute inset-0 w-full h-full object-cover object-center"
      />
      <img
        src={layerA}
        alt={imageAlt}
        className={`hidden md:block absolute inset-0 w-full h-full object-cover object-[62%_center] transition-opacity duration-[2000ms] ease-in-out ${
          showB ? "opacity-0" : "opacity-100"
        }`}
      />
      {layerB && (
        <img
          src={layerB}
          alt={imageAlt}
          className={`hidden md:block absolute inset-0 w-full h-full object-cover object-[62%_center] transition-opacity duration-[2000ms] ease-in-out ${
            showB ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(8,16,30,0.72)_0%,rgba(8,16,30,0.42)_38%,rgba(8,16,30,0.05)_62%,transparent_100%)]" />

      <div className="hero-rise absolute left-0 top-1/2 z-10 max-w-[640px] px-4 sm:px-6 md:px-12">
        <span className="font-script text-xl sm:text-2xl text-white/90 block mb-1.5">
          {eyebrow}
        </span>
        <h1 className="font-display font-medium text-white leading-[1.06] tracking-[-0.01em] mb-4 sm:mb-6 text-[clamp(30px,7vw,72px)]">
          {title}
        </h1>
        <p className="text-white/85 font-light max-w-[430px] mb-6 sm:mb-8 text-[clamp(14px,1.4vw,17px)]">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3.5">
          <a
            href={primaryCta.href}
            className="bg-forest hover:bg-[#33503F] text-white text-[12px] sm:text-[13px] font-semibold tracking-[0.1em] px-6 sm:px-[30px] py-3 sm:py-[15px] text-center transition-colors"
          >
            {primaryCta.label}
          </a>
          <a
            href={secondaryCta.href}
            className="bg-transparent hover:bg-white/10 text-white text-[12px] sm:text-[13px] font-semibold tracking-[0.1em] px-6 sm:px-[30px] py-3 sm:py-[15px] border border-white/60 text-center transition-colors"
          >
            {secondaryCta.label}
          </a>
        </div>
      </div>
    </header>
  );
}
