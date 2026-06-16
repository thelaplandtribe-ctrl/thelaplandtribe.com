import Image from "next/image";

type Cta = { label: string; href?: string };

type HeroSectionProps = {
  eyebrow?: string;
  title?: React.ReactNode;
  description?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  imageSrc?: string;
  imageAlt?: string;
};

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
  primaryCta = { label: "LIRE LE BLOG", href: "/journal" },
  secondaryCta = { label: "DÉCOUVRIR LA BOUTIQUE", href: "/boutique" },
  imageSrc = "/images/hero-cabane.jpg",
  imageAlt = "Cabane en Laponie sous les aurores boréales",
}: HeroSectionProps) {
  return (
    <header className="relative h-[96vh] min-h-[600px] overflow-hidden">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[62%_center]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(8,16,30,0.72)_0%,rgba(8,16,30,0.42)_38%,rgba(8,16,30,0.05)_62%,transparent_100%)]" />

      <div className="hero-rise absolute left-0 top-1/2 z-10 max-w-[640px] px-6 md:px-12">
        <span className="font-script text-2xl text-white/90 block mb-1.5">
          {eyebrow}
        </span>
        <h1 className="font-display font-medium text-white leading-[1.04] tracking-[-0.01em] mb-6 text-[clamp(40px,5.4vw,72px)]">
          {title}
        </h1>
        <p className="text-white/80 font-light max-w-[430px] mb-8 text-[clamp(15px,1.4vw,17px)]">
          {description}
        </p>
        <div className="flex flex-wrap gap-3.5">
          <a
            href={primaryCta.href}
            className="bg-forest hover:bg-[#33503F] text-white text-[13px] font-semibold tracking-[0.1em] px-[30px] py-[15px] transition-colors"
          >
            {primaryCta.label}
          </a>
          <a
            href={secondaryCta.href}
            className="bg-transparent hover:bg-white/10 text-white text-[13px] font-semibold tracking-[0.1em] px-[30px] py-[15px] border border-white/60 transition-colors"
          >
            {secondaryCta.label}
          </a>
        </div>
      </div>
    </header>
  );
}
