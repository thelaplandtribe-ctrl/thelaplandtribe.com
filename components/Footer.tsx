import Link from "next/link";

const legalLinks = [
  { href: "/pages/mentions-legales", label: "Mentions légales" },
  { href: "/pages/politique-de-confidentialite", label: "Confidentialité" },
  { href: "/pages/cgv", label: "CGV" },
  { href: "/pages/politique-de-livraison", label: "Livraison" },
  { href: "/pages/politique-de-retour-et-remboursement", label: "Retours" },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-night text-cream">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 md:flex-row">
        <p className="font-display text-lg">
          The Lapland Tribe
          <span className="ml-2 font-script text-gold">· du Grand Nord</span>
        </p>
        <ul className="flex flex-wrap items-center gap-6 text-sm">
          {legalLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-cream/80 hover:text-gold transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-xs text-cream/60">
          © {new Date().getFullYear()} The Lapland Tribe
        </p>
      </div>
    </footer>
  );
}
