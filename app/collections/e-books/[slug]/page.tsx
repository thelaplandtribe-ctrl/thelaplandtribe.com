import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ebooks, type Ebook } from "@/data/ebooks";
import EbookGallery from "./EbookGallery";
import AddToCartButton from "./AddToCartButton";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return ebooks.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const ebook = ebooks.find((e) => e.slug === params.slug);
  if (!ebook) return { title: "E-book introuvable" };
  return {
    title: ebook.displayTitle,
    description: ebook.description,
    openGraph: {
      title: ebook.title,
      description: ebook.description,
      images: ebook.images.slice(0, 1),
      type: "website",
    },
  };
}

export default function EbookDetailPage({ params }: Params) {
  const ebook = ebooks.find((e) => e.slug === params.slug);
  if (!ebook) notFound();

  const related = ebooks.find((e) => e.slug !== ebook.slug);

  const cartItem = {
    id: `ebook-${ebook.slug}`,
    slug: ebook.slug,
    titre: ebook.displayTitle,
    prix: ebook.price,
    priceCents: ebook.priceCents,
    image: ebook.images[0] || null,
    type: "ebook" as const,
    href: `/collections/e-books/${ebook.slug}`,
  };

  return (
    <>
      <section className="bg-cream pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12">
          <nav className="mb-6 sm:mb-8 text-[11px] tracking-[0.12em] font-bold text-[#8A929C]">
            <Link href="/" className="hover:text-forest transition-colors">
              ACCUEIL
            </Link>
            <span className="mx-2">/</span>
            <Link
              href="/collections/e-books"
              className="hover:text-forest transition-colors"
            >
              E-BOOKS
            </Link>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-start">
            <EbookGallery
              title={ebook.displayTitle}
              images={ebook.images}
            />

            <div className="lg:pt-2">
              <span className="font-script text-forest text-lg sm:text-xl block mb-1">
                E-book · Téléchargement immédiat
              </span>
              <h1 className="font-display text-2xl sm:text-3xl md:text-[40px] font-semibold leading-[1.12] mb-3 sm:mb-4">
                {ebook.displayTitle}
              </h1>
              <p className="text-sm sm:text-base text-[#5C6672] font-light mb-5 sm:mb-6">
                {ebook.subtitle}
              </p>
              <p className="font-display text-3xl sm:text-4xl text-forest mb-6 sm:mb-8">
                {ebook.price}
              </p>

              <p className="text-[15px] sm:text-base text-ink/85 font-light leading-relaxed mb-6 sm:mb-8">
                {ebook.intro}
              </p>

              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 sm:mb-8">
                <FormatCell icon="ti-book-2" label="Format" value={ebook.format} />
                <FormatCell icon="ti-file-stack" label="Pages" value={`${ebook.pages}`} />
                <FormatCell icon="ti-bolt" label="Livraison" value="Immédiate" />
              </div>

              <div className="border-t border-ink/10 pt-6">
                <AddToCartButton item={cartItem} />
                <p className="mt-3 text-[12px] text-[#5C6672] font-light text-center">
                  Paiement sécurisé · Lien de téléchargement envoyé par e-mail après validation
                </p>
                <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-[#5C6672] font-light">
                  <li className="flex items-center gap-2">
                    <i className="ti ti-shield-check text-forest" aria-hidden="true" />
                    Paiement sécurisé Stripe
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="ti ti-download text-forest" aria-hidden="true" />
                    Téléchargement illimité
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="ti ti-device-laptop text-forest" aria-hidden="true" />
                    Compatible tous supports
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="ti ti-mail text-forest" aria-hidden="true" />
                    Support par e-mail
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20 border-t border-ink/5">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12">
          <div className="text-center mb-10 sm:mb-14">
            <span className="font-script text-forest text-lg sm:text-xl block mb-1">
              Ce que vous apprendrez
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-[34px] font-semibold">
              Cinq piliers, pas de blabla
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
            {ebook.highlights.map((h) => (
              <div
                key={h.title}
                className="bg-cream rounded-[6px] p-6 sm:p-7 hover:shadow-[0_18px_40px_rgba(27,36,48,0.08)] transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl text-forest mb-4 shadow-[0_6px_18px_rgba(27,36,48,0.08)]">
                  <i className={`ti ${h.icon}`} aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg sm:text-xl font-semibold mb-2 leading-tight">
                  {h.title}
                </h3>
                <p className="text-sm text-[#5C6672] font-light leading-relaxed">
                  {h.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {ebook.chapters && ebook.chapters.length > 0 && (
        <section className="bg-cream py-14 sm:py-20">
          <div className="mx-auto max-w-[1100px] px-4 sm:px-6 md:px-12">
            <div className="text-center mb-10 sm:mb-14">
              <span className="font-script text-forest text-lg sm:text-xl block mb-1">
                Au sommaire
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-[34px] font-semibold">
                {ebook.chapters.length} chapitres pour ne rien laisser au hasard
              </h2>
            </div>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {ebook.chapters.map((c, i) => (
                <li
                  key={c.title}
                  className="bg-white rounded-[6px] p-5 sm:p-6 border border-ink/5"
                >
                  <div className="flex items-baseline gap-3 mb-2.5">
                    <span className="font-display text-2xl text-gold leading-none flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-base sm:text-lg font-semibold leading-tight">
                      {c.title}
                    </h3>
                  </div>
                  <ul className="text-sm text-[#5C6672] font-light space-y-1.5 pl-9">
                    {c.items.map((it) => (
                      <li key={it} className="relative before:content-['•'] before:absolute before:-left-4 before:text-gold">
                        {it}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <section className="bg-white py-14 sm:py-20 border-t border-ink/5">
        <div className="mx-auto max-w-[1000px] px-4 sm:px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          <div>
            <span className="font-script text-forest text-lg sm:text-xl block mb-1">
              Pour qui ?
            </span>
            <h2 className="font-display text-2xl sm:text-[28px] font-semibold mb-5 sm:mb-6">
              Ce guide est fait pour vous si…
            </h2>
            <ul className="space-y-3">
              {ebook.audience.map((a) => (
                <li key={a} className="flex items-start gap-3 text-[15px] text-ink/85 font-light">
                  <i className="ti ti-check text-forest text-lg mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-night text-cream rounded-[6px] p-7 sm:p-8">
            <span className="font-script text-gold text-lg sm:text-xl block mb-1">
              Bonus inclus
            </span>
            <h2 className="font-display text-2xl sm:text-[28px] font-semibold mb-5 sm:mb-6 text-white">
              Trois ressources offertes
            </h2>
            <ul className="space-y-3">
              {ebook.bonus.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[15px] text-cream/90 font-light">
                  <i className="ti ti-gift text-gold text-lg mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-cream py-14 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12">
          <div className="text-center mb-10 sm:mb-14">
            <span className="font-script text-forest text-lg sm:text-xl block mb-1">
              Ils l'ont lu
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-[34px] font-semibold">
              Ce qu'en disent les lecteurs
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
            {ebook.testimonials.map((t) => (
              <figure
                key={t.author}
                className="bg-white rounded-[6px] p-6 sm:p-7 border border-ink/5 flex flex-col"
              >
                <div className="flex gap-1 text-gold text-base mb-4">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <i key={i} className="ti ti-star-filled" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="font-display text-[17px] leading-[1.45] text-ink/85 italic mb-5 flex-1">
                  « {t.quote} »
                </blockquote>
                <figcaption className="text-sm">
                  <div className="font-semibold text-ink">{t.author}</div>
                  <div className="text-xs text-[#8A929C] mt-0.5">{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-night text-white py-14 sm:py-20">
        <div className="mx-auto max-w-[760px] px-4 sm:px-6 md:px-12 text-center">
          <span className="font-script text-gold text-lg sm:text-xl block mb-2">
            Prêt à passer à l'action ?
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-6 leading-tight">
            {ebook.displayTitle} —{" "}
            <span className="text-gold">{ebook.price}</span>
          </h2>
          <p className="text-white/75 font-light mb-8 max-w-[480px] mx-auto">
            Téléchargement immédiat après paiement. Un investissement
            symbolique pour un projet de vie.
          </p>
          <div className="max-w-[360px] mx-auto">
            <AddToCartButton item={cartItem} variant="gold" />
          </div>
        </div>
      </section>

      {related && (
        <section className="bg-cream py-14 sm:py-20 border-t border-ink/5">
          <div className="mx-auto max-w-[1100px] px-4 sm:px-6 md:px-12">
            <div className="text-center mb-10">
              <h2 className="font-display text-2xl sm:text-3xl md:text-[34px] font-semibold">
                Vous aimerez aussi
              </h2>
            </div>
            <RelatedCard ebook={related} />
          </div>
        </section>
      )}
    </>
  );
}

function FormatCell({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white border border-ink/10 rounded-[6px] px-3 py-3.5 text-center">
      <i className={`ti ${icon} text-xl text-forest`} aria-hidden="true" />
      <div className="text-[10px] tracking-[0.12em] uppercase text-[#8A929C] font-bold mt-1">
        {label}
      </div>
      <div className="text-sm font-semibold text-ink mt-0.5">{value}</div>
    </div>
  );
}

function RelatedCard({ ebook }: { ebook: Ebook }) {
  return (
    <Link
      href={`/collections/e-books/${ebook.slug}`}
      className="group block bg-white rounded-[6px] overflow-hidden border border-ink/5 hover:shadow-[0_24px_60px_rgba(27,36,48,0.12)] transition-shadow duration-[400ms] grid grid-cols-1 md:grid-cols-[260px_1fr]"
    >
      <div className="bg-[#EFEAE2] aspect-square md:aspect-auto flex items-center justify-center p-6">
        {ebook.images[0] && (
          <img
            src={ebook.images[0]}
            alt={ebook.displayTitle}
            loading="lazy"
            className="max-h-full max-w-full object-contain drop-shadow-[0_18px_30px_rgba(27,36,48,0.18)] group-hover:scale-105 transition-transform duration-[600ms]"
          />
        )}
      </div>
      <div className="p-6 sm:p-8 flex flex-col">
        <span className="font-script text-forest text-lg block mb-1">
          E-book
        </span>
        <h3 className="font-display text-xl sm:text-2xl font-semibold mb-2 leading-tight group-hover:text-forest transition-colors">
          {ebook.displayTitle}
        </h3>
        <p className="text-sm text-[#5C6672] font-light mb-5 flex-1">
          {ebook.description}
        </p>
        <div className="flex items-center gap-4">
          <span className="font-display text-2xl text-forest">{ebook.price}</span>
          <span className="text-[12px] font-bold tracking-[0.1em] text-ink group-hover:text-forest transition-colors inline-flex items-center gap-2">
            VOIR LE GUIDE
            <i className="ti ti-arrow-right" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}
