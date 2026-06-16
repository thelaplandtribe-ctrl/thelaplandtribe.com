type StubProps = {
  title: string;
  eyebrow?: string;
  description?: string;
};

export default function Stub({
  title,
  eyebrow = "À venir",
  description = "Cette page sera bientôt disponible.",
}: StubProps) {
  return (
    <>
      <header className="bg-night text-white pt-36 pb-20">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12 text-center">
          <span className="font-script text-gold text-2xl block mb-2">
            {eyebrow}
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-medium leading-tight">
            {title}
          </h1>
        </div>
      </header>
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-[640px] px-6 text-center">
          <p className="text-ink/70 font-light">{description}</p>
        </div>
      </section>
    </>
  );
}
