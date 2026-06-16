import type { Metadata } from "next";
import Link from "next/link";
import { ebooks } from "@/data/ebooks";

export const metadata: Metadata = {
  title: "E-books",
  description:
    "Guides numériques pour s'expatrier et vivre dans le Grand Nord, par The Lapland Tribe.",
};

function stripPrefix(title: string) {
  return title.replace(/^E-BOOK\s*:\s*/i, "").trim();
}

export default function CollectionEbooksPage() {
  return (
    <>
      <header className="bg-night text-white pt-36 pb-20">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12 text-center">
          <span className="font-script text-gold text-2xl block mb-2">
            Boutique
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-medium leading-tight">
            E-books
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-white/70 font-light">
            Guides pratiques, écrits depuis la Laponie. À télécharger après achat.
          </p>
        </div>
      </header>

      <section className="bg-cream py-20">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {ebooks.map((ebook) => {
              const displayTitle = stripPrefix(ebook.title);
              const productHref = `/products/${ebook.slug}`;
              return (
                <article
                  key={ebook.slug}
                  className="bg-white rounded-[4px] overflow-hidden shadow-[0_18px_50px_rgba(27,36,48,0.07)] hover:shadow-[0_28px_64px_rgba(27,36,48,0.12)] transition-shadow duration-[400ms] flex flex-col"
                >
                  <Link
                    href={productHref}
                    className="aspect-[4/3] bg-[#EFEAE2] flex items-center justify-center p-10"
                  >
                    {ebook.image ? (
                      <img
                        src={ebook.image}
                        alt={ebook.title}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain drop-shadow-[0_18px_30px_rgba(27,36,48,0.18)]"
                      />
                    ) : (
                      <span className="font-script text-gold text-2xl">
                        e-book
                      </span>
                    )}
                  </Link>

                  <div className="p-8 md:p-10 flex flex-col flex-1">
                    <span className="font-script text-forest text-lg block mb-1">
                      E-book
                    </span>
                    <h2 className="font-display text-2xl md:text-[28px] font-semibold leading-[1.2]">
                      <Link href={productHref} className="hover:text-forest transition-colors">
                        {displayTitle}
                      </Link>
                    </h2>
                    <p className="mt-4 text-sm text-[#5C6672] font-light flex-1">
                      {ebook.description}
                    </p>

                    <div className="mt-8 flex items-center justify-between gap-4 pt-6 border-t border-ink/10">
                      <span className="font-display text-3xl text-forest">
                        {ebook.price}
                      </span>
                      <Link
                        href={productHref}
                        className="bg-forest hover:bg-[#33503F] text-white text-[13px] font-semibold tracking-[0.1em] px-7 py-4 transition-colors inline-flex items-center gap-2"
                      >
                        VOIR LE GUIDE
                        <i className="ti ti-arrow-right" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="mt-16 text-center text-xs tracking-[0.14em] text-[#8A929C] uppercase">
            Téléchargement immédiat · Format PDF · Paiement sécurisé
          </p>
        </div>
      </section>
    </>
  );
}
