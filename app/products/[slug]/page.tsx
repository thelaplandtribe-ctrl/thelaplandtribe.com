import type { Metadata } from "next";
import Stub from "@/components/Stub";

export const metadata: Metadata = { title: "Produit" };

export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  return <Stub title={`Produit — ${params.slug}`} />;
}
