import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Commande confirmée",
  description:
    "Merci pour votre commande sur The Lapland Tribe. Vous recevrez bientôt un e-mail de confirmation.",
  robots: { index: false, follow: false },
};

export default function CommandeConfirmeePage() {
  const isTestMode =
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.startsWith("pk_test_") ??
    false;
  return (
    <section className="bg-cream min-h-[80vh] flex items-center py-16 sm:py-20 md:py-28">
      <div className="mx-auto max-w-[640px] px-4 sm:px-6 md:px-12 text-center">
        {isTestMode && (
          <div className="mb-8 inline-block px-4 py-2 bg-gold/15 border border-gold/40 text-ink/80 text-[11px] tracking-[0.12em] font-bold uppercase">
            Mode test — aucun paiement réel n'a été effectué
          </div>
        )}
        <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-forest text-white flex items-center justify-center mb-8 shadow-[0_18px_40px_rgba(60,90,75,0.30)]">
          <i className="ti ti-check text-4xl sm:text-5xl" aria-hidden="true" />
        </div>

        <span className="font-script text-forest text-xl sm:text-2xl block mb-2">
          Avec gratitude
        </span>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium leading-tight mb-5 sm:mb-6">
          Merci pour votre commande !
        </h1>

        <p className="text-base sm:text-lg text-ink/80 font-light leading-relaxed mb-3 sm:mb-4">
          Votre paiement a bien été pris en compte. Vous allez recevoir un
          e-mail de confirmation dans quelques instants avec le récapitulatif
          et, pour les e-books, le lien de téléchargement.
        </p>
        <p className="text-sm text-[#5C6672] font-light mb-10 sm:mb-12">
          Pensez à vérifier vos courriers indésirables si l'e-mail n'arrive pas
          d'ici dix minutes — on s'occupe du reste depuis la Laponie.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link
            href="/collections/affiches-murales"
            className="bg-forest hover:bg-[#33503F] text-white text-[13px] font-semibold tracking-[0.1em] px-7 py-4 transition-colors inline-flex items-center justify-center gap-2"
          >
            <i className="ti ti-arrow-left" aria-hidden="true" />
            RETOUR À LA BOUTIQUE
          </Link>
          <Link
            href="/blogs/infos"
            className="bg-transparent border border-ink/20 hover:border-ink text-ink text-[13px] font-semibold tracking-[0.1em] px-7 py-4 transition-colors inline-flex items-center justify-center gap-2"
          >
            LIRE LE JOURNAL
          </Link>
        </div>

        <p className="mt-12 sm:mt-16 text-xs tracking-[0.12em] text-[#8A929C] uppercase">
          Une question ?{" "}
          <Link
            href="/pages/contact"
            className="text-forest hover:underline"
          >
            Contactez-nous
          </Link>
        </p>
      </div>
    </section>
  );
}
