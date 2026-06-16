import type { Metadata } from "next";
import Stub from "@/components/Stub";

export const metadata: Metadata = { title: "Recherche" };

export default function SearchPage() {
  return <Stub title="Recherche" eyebrow="Trouver" description="La recherche sera bientôt disponible." />;
}
