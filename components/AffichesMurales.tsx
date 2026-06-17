import Link from "next/link";
import { affiches } from "@/data/affiches";

type AffichesMuralesProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  limit?: number;
};

export default function AffichesMurales({
  eyebrow = "Découvrir",
  title = "Nos affiches murales",
  subtitle = "Des créations inspirées des paysages nordiques",
  ctaLabel = "Voir toutes les affiches",
  ctaHref = "/collections/affiches-murales",
  limit = 6,
}: AffichesMuralesProps) {
  const items = affiches.slice(0, limit);

  return (
    <section className="bg-cream py-14 sm:py-20 md:py-[84px]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12">
        <div className="text-center mb-8 sm:mb-12">
          <span className="font-script text-forest text-[18px] sm:text-[22px] block mb-1">
            {eyebrow}
          </span>
          <h2 className="font-display text-[24px] sm:text-[28px] md:text-[34px] font-semibold mb-3">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-[#5C6672] font-light max-w-xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {items.map((affiche) => {
            const href = `/products/${affiche.slug}`;
            const cover = affiche.images[0];
            return (
              <Link
                key={affiche.slug}
                href={href}
                className="group block hover:-translate-y-1.5 transition-transform duration-[400ms]"
              >
                <div className="aspect-[3/4] bg-[#EFEAE2] rounded-[4px] overflow-hidden shadow-[0_10px_26px_rgba(27,36,48,0.08)] group-hover:shadow-[0_24px_50px_rgba(27,36,48,0.14)] transition-shadow duration-[400ms]">
                  {cover && (
                    <img
                      src={cover}
                      alt={affiche.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-105"
                    />
                  )}
                </div>
                <h3 className="mt-4 font-display text-base md:text-lg font-medium leading-[1.25] group-hover:text-forest transition-colors">
                  {affiche.title}
                </h3>
                <p className="mt-1 font-display text-forest">
                  {affiche.multipleVariants ? (
                    <>
                      <span className="text-[10px] tracking-[0.12em] text-[#8A929C] font-bold uppercase mr-1.5">
                        dès
                      </span>
                      {affiche.minPrice}
                    </>
                  ) : (
                    affiche.minPrice
                  )}
                </p>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 sm:mt-14 text-center">
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.1em] text-ink border border-ink/15 px-[28px] sm:px-[34px] py-3 sm:py-[14px] hover:bg-ink hover:text-cream hover:border-ink transition-colors"
          >
            {ctaLabel.toUpperCase()}
            <i className="ti ti-arrow-right" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
