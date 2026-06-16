import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site The Lapland Tribe.",
};

export default function Page() {
  return (
    <LegalPage
      slug="mentions-legales"
      title="Mentions légales"
      eyebrow="Informations légales"
    />
  );
}
