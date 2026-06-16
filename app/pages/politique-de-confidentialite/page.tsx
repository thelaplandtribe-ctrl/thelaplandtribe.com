import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Comment The Lapland Tribe collecte, utilise et protège vos données personnelles.",
};

export default function Page() {
  return (
    <LegalPage
      slug="politique-de-confidentialite"
      title="Politique de confidentialité"
      eyebrow="Vos données"
    />
  );
}
