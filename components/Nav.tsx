import Link from "next/link";

const links = [
  { href: "/journal", label: "Journal" },
  { href: "/boutique", label: "Boutique" },
  { href: "/experiences", label: "Expériences" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="border-b border-ink/10 bg-cream">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="font-display text-xl text-forest tracking-wide"
        >
          The Lapland Tribe
        </Link>
        <nav>
          <ul className="flex items-center gap-6 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-ink/80 hover:text-forest transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
