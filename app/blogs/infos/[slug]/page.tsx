import type { Metadata } from "next";
import Stub from "@/components/Stub";

export const metadata: Metadata = { title: "Article" };

export default function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  return <Stub title={`Article — ${params.slug}`} />;
}
