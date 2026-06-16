import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Politique de livraison",
  description:
    "Délais, coûts et conditions de livraison des produits The Lapland Tribe.",
};

export default function Page() {
  return (
    <LegalPage
      slug="politique-de-livraison"
      title="Politique de livraison"
      eyebrow="Expédition"
    />
  );
}
