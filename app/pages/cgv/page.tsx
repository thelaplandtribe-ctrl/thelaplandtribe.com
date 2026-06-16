import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "CGV",
  description: "Conditions générales de vente de The Lapland Tribe.",
};

export default function Page() {
  return (
    <LegalPage
      slug="cgv"
      title="Conditions générales de vente"
      eyebrow="Informations légales"
    />
  );
}
