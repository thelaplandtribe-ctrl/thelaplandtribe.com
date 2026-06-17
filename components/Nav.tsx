"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/blogs/infos", label: "BLOG" },
  { href: "/collections/affiches-murales", label: "AFFICHES MURALES" },
  { href: "/collections/e-books", label: "E-BOOKS" },
  { href: "/pages/contact", label: "CONTACT" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const menuOpaque = scrolled || open;

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between transition-all duration-300 ${
          menuOpaque
            ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(27,36,48,0.10)] px-4 sm:px-6 md:px-12 py-3"
            : "bg-transparent px-4 sm:px-6 md:px-12 py-4 sm:py-5"
        }`}
      >
        <Link
          href="/"
          aria-label="The Lapland Tribe"
          className="flex items-center"
          onClick={() => setOpen(false)}
        >
          <img
            src={menuOpaque ? "/images/logo-dark.png" : "/images/logo-white.png"}
            alt="The Lapland Tribe"
            className="h-10 sm:h-12 w-auto block transition-opacity duration-300"
          />
        </Link>

        <ul
          className={`hidden md:flex gap-9 text-[13px] font-semibold tracking-[0.08em] transition-colors duration-300 ${
            scrolled ? "text-ink" : "text-white/90"
          }`}
        >
          {links.map((link, i) => (
            <li key={`${link.href}-${i}`}>
              <Link href={link.href} className="hover:opacity-65 transition-opacity">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div
          className={`hidden md:flex items-center gap-[18px] text-[19px] transition-colors duration-300 ${
            scrolled ? "text-ink" : "text-white"
          }`}
        >
          <i className="ti ti-search" aria-hidden="true" />
          <span className="relative">
            <i className="ti ti-shopping-bag" aria-hidden="true" />
            <span className="absolute -top-1.5 -right-2 bg-forest text-white text-[9px] font-bold w-[15px] h-[15px] rounded-full flex items-center justify-center">
              0
            </span>
          </span>
        </div>

        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={`md:hidden text-2xl transition-colors duration-300 ${
            menuOpaque ? "text-ink" : "text-white"
          }`}
        >
          <i className={`ti ${open ? "ti-x" : "ti-menu-2"}`} aria-hidden="true" />
        </button>
      </nav>

      <div
        className={`fixed inset-x-0 top-0 z-40 md:hidden transition-all duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ paddingTop: "62px" }}
      >
        <div
          className="absolute inset-0 bg-night/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        <div className="relative bg-white shadow-[0_8px_24px_rgba(27,36,48,0.18)]">
          <ul className="flex flex-col divide-y divide-ink/10">
            {links.map((link, i) => (
              <li key={`m-${link.href}-${i}`}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-6 py-4 text-ink text-sm font-semibold tracking-[0.08em] hover:bg-cream transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-end gap-5 px-6 py-3 border-t border-ink/10 text-[19px] text-ink">
            <i className="ti ti-search" aria-hidden="true" />
            <span className="relative">
              <i className="ti ti-shopping-bag" aria-hidden="true" />
              <span className="absolute -top-1.5 -right-2 bg-forest text-white text-[9px] font-bold w-[15px] h-[15px] rounded-full flex items-center justify-center">
                0
              </span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
