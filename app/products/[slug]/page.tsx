import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { affiches } from "@/data/affiches";
import { ebooks } from "@/data/ebooks";
import AfficheDetail from "@/components/AfficheDetail";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return [
    ...affiches.map((a) => ({ slug: a.slug })),
    ...ebooks.map((e) => ({ slug: e.slug })),
  ];
}

export function generateMetadata({ params }: Params): Metadata {
  const affiche = affiches.find((a) => a.slug === params.slug);
  if (affiche) {
    return {
      title: affiche.title,
      description: affiche.descriptionShort,
      openGraph: {
        title: affiche.title,
        description: affiche.descriptionShort,
        images: affiche.images.slice(0, 1),
        type: "website",
      },
    };
  }
  const ebook = ebooks.find((e) => e.slug === params.slug);
  if (ebook) {
    return {
      title: ebook.title,
      description: ebook.description,
      openGraph: {
        title: ebook.title,
        description: ebook.description,
        images: ebook.image ? [ebook.image] : [],
        type: "website",
      },
    };
  }
  return { title: "Produit introuvable" };
}

function pickRelated(slug: string, count = 3) {
  const idx = affiches.findIndex((a) => a.slug === slug);
  if (idx < 0) return [];
  const out: typeof affiches = [];
  for (let i = 1; out.length < count && i < affiches.length; i++) {
    out.push(affiches[(idx + i) % affiches.length]);
  }
  return out;
}

export default function ProductPage({ params }: Params) {
  const affiche = affiches.find((a) => a.slug === params.slug);
  if (affiche) {
    const related = pickRelated(params.slug, 3);
    return <AfficheDetail affiche={affiche} related={related} />;
  }

  const ebook = ebooks.find((e) => e.slug === params.slug);
  if (ebook) {
    const displayTitle = ebook.title.replace(/^E-BOOK\s*:\s*/i, "").trim();
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
                href="/collections/e-books"
                className="hover:text-forest transition-colors"
              >
                E-BOOKS
              </Link>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
              <div className="aspect-[4/5] bg-[#EFEAE2] rounded-[4px] flex items-center justify-center p-10">
                {ebook.image && (
                  <img
                    src={ebook.image}
                    alt={ebook.title}
                    className="max-h-full max-w-full object-contain drop-shadow-[0_18px_30px_rgba(27,36,48,0.18)]"
                  />
                )}
              </div>
              <div className="lg:pt-4">
                <span className="font-script text-forest text-xl block mb-1">
                  E-book
                </span>
                <h1 className="font-display text-3xl md:text-4xl font-semibold leading-[1.15] mb-6">
                  {displayTitle}
                </h1>
                <p className="font-display text-3xl md:text-4xl text-forest mb-8">
                  {ebook.price}
                </p>
                {ebook.description && (
                  <p className="text-[15px] text-[#5C6672] font-light leading-relaxed mb-8">
                    {ebook.description}
                  </p>
                )}
                <div className="border-t border-ink/10 pt-6">
                  <a
                    href={ebook.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-forest hover:bg-[#33503F] text-white text-[13px] font-semibold tracking-[0.1em] py-4 transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <i className="ti ti-shopping-bag" aria-hidden="true" />
                    ACHETER MAINTENANT
                  </a>
                  <p className="mt-4 text-[13px] text-[#5C6672] font-light text-center">
                    Téléchargement immédiat · Format PDF · Paiement sécurisé
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  notFound();
}
