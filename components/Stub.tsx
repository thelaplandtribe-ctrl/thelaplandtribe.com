export default function Stub({ title }: { title: string }) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="font-display text-4xl md:text-5xl text-forest">{title}</h1>
      <p className="mt-6 text-ink/70">coming soon</p>
    </section>
  );
}
