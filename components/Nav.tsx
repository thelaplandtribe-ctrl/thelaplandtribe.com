"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/journal", label: "BLOG" },
  { href: "/boutique", label: "AFFICHES MURALES" },
  { href: "/boutique", label: "PRINTS & MERCH" },
  { href: "/experiences", label: "EXPÉRIENCES" },
  { href: "/a-propos", label: "À PROPOS" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-[0_1px_0_rgba(27,36,48,0.10)] px-12 py-3.5"
          : "bg-transparent px-12 py-5"
      }`}
    >
      <Link href="/" aria-label="The Lapland Tribe" className="flex items-center">
        <span
          className={`font-display text-xl tracking-wide transition-colors duration-300 ${
            scrolled ? "text-ink" : "text-white"
          }`}
        >
          The Lapland Tribe
        </span>
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
        aria-label="Menu"
        className={`md:hidden text-2xl transition-colors duration-300 ${
          scrolled ? "text-ink" : "text-white"
        }`}
      >
        <i className="ti ti-menu-2" aria-hidden="true" />
      </button>
    </nav>
  );
}
