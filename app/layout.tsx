import type { Metadata } from "next";
import { Playfair_Display, Mulish, Petit_Formal_Script } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const mulish = Mulish({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mulish",
});

const petitFormal = Petit_Formal_Script({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-petit-formal",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thelaplandtribe.com"),
  title: {
    default: "The Lapland Tribe",
    template: "%s · The Lapland Tribe",
  },
  description:
    "The Lapland Tribe — récits, boutique et expériences inspirés du Grand Nord.",
  openGraph: {
    title: "The Lapland Tribe",
    description:
      "The Lapland Tribe — récits, boutique et expériences inspirés du Grand Nord.",
    url: "https://thelaplandtribe.com",
    siteName: "The Lapland Tribe",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Lapland Tribe",
    description:
      "The Lapland Tribe — récits, boutique et expériences inspirés du Grand Nord.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${mulish.variable} ${petitFormal.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.11.0/dist/tabler-icons.min.css"
        />
      </head>
      <body className="font-sans min-h-screen flex flex-col bg-cream text-ink">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
