import type { Metadata } from "next";
import Link from "next/link";
import { affiches } from "@/data/affiches";

export const metadata: Metadata = {
  title: "Affiches murales",
  description:
    "Affiches murales inspirées des paysages nordiques : forêts, aurores, rennes, villages enneigés.",
};

export default function CollectionAffichesPage() {
  return (
    <>
      <header className="relative bg-night text-white pt-36 pb-24 overflow-hidden">
        <img
          src="/images/cat-affiches.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night/60 via-night/50 to-night" />
        <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-12 text-center">
          <span className="font-script text-gold text-2xl block mb-2">
            Boutique
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-medium leading-tight">
            Affiches murales
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-white/70 font-light">
            Des visuels minimalistes et chaleureux pour décorer votre intérieur
            et garder un peu de Laponie chez vous.
          </p>
        </div>
      </header>

      <section className="bg-cream py-20">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <p className="text-center text-xs tracking-[0.14em] text-[#8A929C] uppercase mb-10">
            {affiches.length} créations · Imprimées à la demande · Envoi soigné
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {affiches.map((affiche) => {
              const href = `/products/${affiche.slug}`;
              const cover = affiche.images[0];
              return (
                <article
                  key={affiche.slug}
                  className="bg-white rounded-[4px] overflow-hidden shadow-[0_18px_50px_rgba(27,36,48,0.07)] hover:shadow-[0_28px_64px_rgba(27,36,48,0.12)] hover:-translate-y-1.5 transition-all duration-[400ms] flex flex-col"
                >
                  <Link
                    href={href}
                    className="block aspect-[3/4] bg-[#EFEAE2] overflow-hidden"
                  >
                    {cover && (
                      <img
                        src={cover}
                        alt={affiche.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-[600ms] hover:scale-105"
                      />
                    )}
                  </Link>
                  <div className="p-5 md:p-6 flex flex-col flex-1">
                    <h2 className="font-display text-base md:text-lg font-semibold leading-[1.25] mb-2">
                      <Link href={href} className="hover:text-forest transition-colors">
                        {affiche.title}
                      </Link>
                    </h2>
                    <div className="mt-auto pt-4 flex items-center justify-between gap-3 border-t border-ink/10">
                      <span className="font-display text-lg text-forest">
                        {affiche.multipleVariants ? (
                          <>
                            <span className="text-[10px] tracking-[0.12em] text-[#8A929C] font-bold uppercase block leading-tight">
                              dès
                            </span>
                            {affiche.minPrice}
                          </>
                        ) : (
                          affiche.minPrice
                        )}
                      </span>
                      <Link
                        href={href}
                        className="text-[11px] font-bold tracking-[0.1em] text-forest hover:gap-2 inline-flex items-center gap-1.5 transition-all"
                      >
                        VOIR
                        <i className="ti ti-arrow-right" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
