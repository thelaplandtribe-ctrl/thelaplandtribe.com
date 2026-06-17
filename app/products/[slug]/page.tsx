import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { affiches } from "@/data/affiches";
import { ebooks } from "@/data/ebooks";
import AfficheDetail from "@/components/AfficheDetail";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return affiches.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const affiche = affiches.find((a) => a.slug === params.slug);
  if (!affiche) return { title: "Produit introuvable" };
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

  if (ebooks.some((e) => e.slug === params.slug)) {
    redirect(`/collections/e-books/${params.slug}`);
  }

  notFound();
}
