import { legalPages } from "@/data/legal-pages";

type LegalPageProps = {
  slug: string;
  title: string;
  eyebrow?: string;
};

export default function LegalPage({
  slug,
  title,
  eyebrow = "Mentions",
}: LegalPageProps) {
  const raw = legalPages[slug] || "";
  const body = raw.replace(/^\s*<h1[^>]*>.*?<\/h1>\s*/s, "");

  return (
    <>
      <header className="bg-night text-white pt-36 pb-20">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12 text-center">
          <span className="font-script text-gold text-2xl block mb-2">
            {eyebrow}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-medium leading-tight">
            {title}
          </h1>
        </div>
      </header>
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-3xl px-6 md:px-8">
          <div
            className="article-prose"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </div>
      </section>
    </>
  );
}
