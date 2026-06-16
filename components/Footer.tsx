import Link from "next/link";

const browseLinks = [
  { href: "/", label: "Accueil" },
  { href: "/collections/affiches-murales", label: "Affiches murales" },
  { href: "/collections/e-books", label: "E-books" },
  { href: "/blogs/infos", label: "Blog" },
];

const infoLinks = [
  { href: "/search", label: "Recherche" },
  { href: "/pages/cgv", label: "CGV" },
  { href: "/pages/politique-de-confidentialite", label: "Politique de confidentialité" },
  { href: "/pages/politique-de-livraison", label: "Politique de livraison" },
  { href: "/pages/mentions-legales", label: "Mentions Légales" },
  { href: "/pages/contact", label: "Contact" },
];

const social = [
  {
    href: "https://www.instagram.com/thelaplandtribe",
    label: "Instagram",
    icon: "ti-brand-instagram",
  },
  {
    href: "https://www.youtube.com/channel/UCp8_M1la_6G5oRBTIYQ_M8A",
    label: "YouTube",
    icon: "ti-brand-youtube",
  },
];

const paymentMethods = ["Visa", "Mastercard", "Maestro", "American Express", "Shop Pay"];

export default function Footer() {
  return (
    <footer className="bg-night text-cream">
      <div className="mx-auto max-w-[1200px] px-6 md:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="font-display text-2xl mb-1">The Lapland Tribe</p>
            <p className="font-script text-gold text-lg mb-5">· du Grand Nord</p>
            <address className="not-italic text-sm leading-7 font-light text-cream/70">
              David Törnqvists Väg 7
              <br />
              95298 Morjärv
              <br />
              Sverige
            </address>
            <p className="mt-5 text-sm font-light text-cream/70">
              Email:{" "}
              <a
                href="mailto:thelaplandtribe@gmail.com"
                className="text-cream hover:text-gold transition-colors"
              >
                thelaplandtribe@gmail.com
              </a>
            </p>
          </div>

          <div className="lg:col-span-2">
            <h5 className="text-[11px] tracking-[0.14em] font-bold text-cream/50 mb-5">
              PARCOURIR
            </h5>
            <ul className="space-y-2.5 text-sm font-light">
              {browseLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-cream/80 hover:text-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h5 className="text-[11px] tracking-[0.14em] font-bold text-cream/50 mb-5">
              INFORMATIONS
            </h5>
            <ul className="space-y-2.5 text-sm font-light">
              {infoLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-cream/80 hover:text-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h5 className="text-[11px] tracking-[0.14em] font-bold text-cream/50 mb-5">
              SUIVEZ-NOUS
            </h5>
            <div className="flex gap-3 mb-8">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center text-base text-cream/80 hover:bg-cream hover:text-night transition-colors"
                >
                  <i className={`ti ${s.icon}`} aria-hidden="true" />
                </a>
              ))}
            </div>

            <h5 className="text-[11px] tracking-[0.14em] font-bold text-cream/50 mb-2">
              NEWSLETTER
            </h5>
            <p className="text-xs font-light text-cream/70 mb-4">
              Recevez toutes les nouvelles en avant première !
            </p>
            <form action="#" className="flex">
              <input
                type="email"
                name="email"
                placeholder="Your email"
                required
                className="flex-1 min-w-0 px-3 py-2.5 text-sm bg-cream/5 border border-cream/20 text-cream placeholder:text-cream/40 outline-none focus:border-gold/60"
              />
              <button
                type="submit"
                className="bg-gold hover:bg-gold/90 text-night text-xs font-bold tracking-[0.08em] px-5 transition-colors"
              >
                ENTRER
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10 bg-[#0A1422]">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12 py-5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-cream/60 font-light">
            © {new Date().getFullYear()}, The Lapland Tribe, Tous droits réservés
          </p>
          <ul className="flex flex-wrap items-center gap-2 text-cream/60">
            <li className="uppercase tracking-[0.14em] font-bold text-[10px] mr-2">
              Payment methods
            </li>
            {paymentMethods.map((p) => (
              <li
                key={p}
                className="border border-cream/15 rounded-sm px-2 py-1 text-[10px] tracking-wide"
              >
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
