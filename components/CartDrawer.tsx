"use client";

import Link from "next/link";
import { useState } from "react";
import { formatPriceCents, useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    totalCount,
    totalCents,
  } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((it) => ({
            id: it.id,
            titre: it.titre,
            priceCents: it.priceCents,
            quantite: it.quantite,
            image: it.image,
            type: it.type,
            variantLabel: it.variantLabel,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.url) {
        throw new Error(data?.error || "Échec de la création de la commande.");
      }
      window.location.href = data.url;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Une erreur est survenue.";
      setError(msg);
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-night/55 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Mon panier"
        className={`fixed top-0 right-0 z-[70] h-full w-full sm:w-[420px] bg-cream shadow-[-16px_0_40px_rgba(27,36,48,0.18)] flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between px-6 py-5 border-b border-ink/10">
          <h2 className="font-display text-2xl font-semibold text-ink">
            Mon panier{" "}
            <span className="text-[#8A929C] text-base font-normal">
              ({totalCount})
            </span>
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Fermer le panier"
            className="w-9 h-9 flex items-center justify-center rounded-full text-ink hover:bg-ink/5 transition-colors text-2xl"
          >
            <i className="ti ti-x" aria-hidden="true" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-4 py-12">
              <div className="w-16 h-16 rounded-full border border-ink/15 flex items-center justify-center text-3xl text-ink/40 mb-5">
                <i className="ti ti-shopping-bag" aria-hidden="true" />
              </div>
              <p className="font-display text-lg text-ink mb-2">
                Votre panier est vide
              </p>
              <p className="text-sm text-[#5C6672] font-light mb-6 max-w-[260px]">
                Découvrez les affiches et e-books pour rapporter un peu de
                Laponie chez vous.
              </p>
              <Link
                href="/collections/affiches-murales"
                onClick={closeCart}
                className="text-[12px] font-bold tracking-[0.1em] text-forest border border-forest/30 hover:bg-forest hover:text-white px-6 py-3 transition-colors"
              >
                VOIR LA BOUTIQUE
              </Link>
            </div>
          ) : (
            <ul className="space-y-5">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-3 sm:gap-4 pb-5 border-b border-ink/10 last:border-b-0"
                >
                  <Link
                    href={item.href || "#"}
                    onClick={closeCart}
                    className="block w-20 h-20 flex-shrink-0 bg-[#EFEAE2] rounded-[3px] overflow-hidden"
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.titre}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gold text-xl">
                        <i className="ti ti-photo" aria-hidden="true" />
                      </div>
                    )}
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] tracking-[0.12em] font-bold text-forest uppercase mb-1">
                      {item.type === "ebook" ? "E-book" : "Affiche"}
                    </div>
                    <Link
                      href={item.href || "#"}
                      onClick={closeCart}
                      className="font-display text-[15px] font-medium leading-tight text-ink hover:text-forest transition-colors line-clamp-2"
                    >
                      {item.titre}
                    </Link>
                    {item.variantLabel && (
                      <div className="text-xs text-[#5C6672] mt-0.5">
                        {item.variantLabel}
                      </div>
                    )}
                    <div className="mt-2.5 flex items-center justify-between gap-3">
                      <div className="inline-flex items-center border border-ink/15 bg-white rounded-[3px]">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantite - 1)
                          }
                          aria-label="Diminuer la quantité"
                          className="w-8 h-8 flex items-center justify-center text-ink/70 hover:bg-ink/5 transition-colors"
                        >
                          <i className="ti ti-minus" aria-hidden="true" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantite}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantite + 1)
                          }
                          aria-label="Augmenter la quantité"
                          className="w-8 h-8 flex items-center justify-center text-ink/70 hover:bg-ink/5 transition-colors"
                        >
                          <i className="ti ti-plus" aria-hidden="true" />
                        </button>
                      </div>
                      <span className="font-display text-base text-forest font-semibold">
                        {formatPriceCents(item.priceCents * item.quantite)}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Retirer du panier"
                    className="text-[#8A929C] hover:text-ink transition-colors self-start text-lg"
                  >
                    <i className="ti ti-trash" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t border-ink/10 px-6 py-5 bg-white">
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-sm text-[#5C6672] font-light">
                Sous-total
              </span>
              <span className="font-display text-2xl text-ink font-semibold">
                {formatPriceCents(totalCents)}
              </span>
            </div>
            <p className="text-[11px] text-[#8A929C] mb-4">
              Frais de livraison calculés à l'étape suivante.
            </p>
            {error && (
              <div
                role="alert"
                className="mb-3 px-3 py-2.5 bg-[#FBECEA] border border-[#C9352B]/30 text-[#A02517] text-xs"
              >
                {error}
              </div>
            )}
            <button
              type="button"
              onClick={handleCheckout}
              disabled={loading || items.length === 0}
              className="w-full bg-forest hover:bg-[#33503F] disabled:bg-forest/60 disabled:cursor-not-allowed text-white text-[13px] font-semibold tracking-[0.1em] py-4 transition-colors inline-flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span
                    className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"
                    aria-hidden="true"
                  />
                  REDIRECTION VERS STRIPE…
                </>
              ) : (
                <>
                  <i className="ti ti-lock" aria-hidden="true" />
                  PASSER COMMANDE
                </>
              )}
            </button>
            <p className="mt-3 text-center text-[11px] text-[#8A929C]">
              Paiement sécurisé par{" "}
              <span className="font-semibold text-ink/70">Stripe</span>
            </p>
          </footer>
        )}
      </aside>
    </>
  );
}
