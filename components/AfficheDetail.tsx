"use client";

import Link from "next/link";
import { useState } from "react";
import type { Affiche } from "@/data/affiches";

type AfficheDetailProps = {
  affiche: Affiche;
  related: Affiche[];
};

export default function AfficheDetail({ affiche, related }: AfficheDetailProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [variantIdx, setVariantIdx] = useState(0);
  const [added, setAdded] = useState(false);

  const variant = affiche.variants[variantIdx];

  return (
    <>
      <section className="bg-cream pt-32 pb-20">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <nav className="mb-8 text-[11px] tracking-[0.12em] font-bold text-[#8A929C]">
            <Link href="/" className="hover:text-forest transition-colors">
              ACCUEIL
            </Link>
            <span className="mx-2">/</span>
            <Link
              href="/collections/affiches-murales"
              className="hover:text-forest transition-colors"
            >
              AFFICHES MURALES
            </Link>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <div className="aspect-[3/4] bg-white rounded-[4px] overflow-hidden shadow-[0_18px_50px_rgba(27,36,48,0.07)]">
                {affiche.images[activeImage] && (
                  <img
                    src={affiche.images[activeImage]}
                    alt={affiche.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              {affiche.images.length > 1 && (
                <div className="mt-4 grid grid-cols-5 gap-3">
                  {affiche.images.slice(0, 5).map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setActiveImage(i)}
                      aria-label={`Image ${i + 1}`}
                      aria-pressed={i === activeImage}
                      className={`aspect-square overflow-hidden rounded-[2px] transition-all ${
                        i === activeImage
                          ? "ring-2 ring-forest"
                          : "ring-1 ring-ink/10 opacity-80 hover:opacity-100"
                      }`}
                    >
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:pt-4">
              <span className="font-script text-forest text-xl block mb-1">
                Affiche
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-semibold leading-[1.15] mb-6">
                {affiche.title}
              </h1>
              <p className="font-display text-3xl md:text-4xl text-forest mb-8">
                {variant.price}
              </p>

              {affiche.descriptionShort && (
                <p className="text-[15px] text-[#5C6672] font-light leading-relaxed mb-8">
                  {affiche.descriptionShort}
                </p>
              )}

              {affiche.multipleVariants ? (
                <div className="mb-8">
                  <h3 className="text-[11px] tracking-[0.14em] font-bold text-ink/60 mb-3">
                    FORMAT
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {affiche.variants.map((v, i) => {
                      const active = i === variantIdx;
                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setVariantIdx(i)}
                          aria-pressed={active}
                          className={`text-left px-3 py-2.5 border text-sm transition-colors ${
                            active
                              ? "border-forest bg-forest/5 text-ink"
                              : "border-ink/15 bg-white text-ink/80 hover:border-ink/40"
                          }`}
                        >
                          <span className="block font-medium">{v.title}</span>
                          <span className="block text-xs text-[#5C6672] mt-0.5">
                            {v.price}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="mb-8">
                  <h3 className="text-[11px] tracking-[0.14em] font-bold text-ink/60 mb-2">
                    FORMAT
                  </h3>
                  <p className="text-sm font-medium">{variant.title}</p>
                </div>
              )}

              <div className="border-t border-ink/10 pt-6">
                <button
                  type="button"
                  onClick={() => setAdded(true)}
                  disabled={added}
                  className="w-full bg-forest hover:bg-[#33503F] text-white text-[13px] font-semibold tracking-[0.1em] py-4 transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {added ? (
                    <>
                      <i className="ti ti-check" aria-hidden="true" />
                      AJOUTÉ AU PANIER
                    </>
                  ) : (
                    <>
                      <i className="ti ti-shopping-bag" aria-hidden="true" />
                      AJOUTER AU PANIER
                    </>
                  )}
                </button>
                {added && (
                  <div className="mt-4 text-[13px] text-[#5C6672] font-light text-center">
                    Le panier est en cours d&apos;intégration.{" "}
                    <Link
                      href="/pages/contact"
                      className="text-forest underline"
                    >
                      Contactez-nous
                    </Link>{" "}
                    pour commander.
                  </div>
                )}

                <ul className="mt-8 space-y-2.5 text-sm text-[#5C6672] font-light">
                  <li className="flex items-center gap-2">
                    <i className="ti ti-award text-forest" aria-hidden="true" />
                    Qualité premium
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="ti ti-photo text-forest" aria-hidden="true" />
                    Impression haute définition
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="ti ti-truck text-forest" aria-hidden="true" />
                    Imprimée à la demande, expédition soignée
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {affiche.bodyHtml && (
            <div className="mt-20 max-w-3xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-semibold mb-6 text-center">
                À propos de cette affiche
              </h2>
              <div
                className="article-prose"
                dangerouslySetInnerHTML={{ __html: affiche.bodyHtml }}
              />
            </div>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-white py-20 border-t border-ink/5">
          <div className="mx-auto max-w-[1200px] px-6 md:px-12">
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-10 text-center">
              Vous aimerez aussi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/products/${r.slug}`}
                  className="group block"
                >
                  <div className="aspect-[3/4] bg-[#EFEAE2] rounded-[4px] overflow-hidden mb-4">
                    {r.images[0] && (
                      <img
                        src={r.images[0]}
                        alt={r.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-105"
                      />
                    )}
                  </div>
                  <h3 className="font-display text-base font-medium leading-[1.25] group-hover:text-forest transition-colors">
                    {r.title}
                  </h3>
                  <p className="mt-1 text-sm text-forest">{r.minPrice}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
