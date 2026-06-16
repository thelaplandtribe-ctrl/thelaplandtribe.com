import type { Metadata } from "next";
import Stub from "@/components/Stub";

export const metadata: Metadata = { title: "Produit" };

export default function ProduitPage({
  params,
}: {
  params: { produit: string };
}) {
  return <Stub title={`Produit — ${params.produit}`} />;
}
