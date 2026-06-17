"use client";

import { useEffect, useState } from "react";
import { useCart, type CartItem } from "@/context/CartContext";

type Props = {
  item: Omit<CartItem, "quantite">;
  variant?: "forest" | "gold";
};

export default function AddToCartButton({ item, variant = "forest" }: Props) {
  const { addToCart, openCart } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 2000);
    return () => clearTimeout(t);
  }, [added]);

  const base =
    variant === "gold"
      ? added
        ? "bg-[#b89456] text-night"
        : "bg-gold hover:bg-[#b89456] text-night"
      : added
        ? "bg-[#33503F] text-white"
        : "bg-forest hover:bg-[#33503F] text-white";

  const handle = () => {
    addToCart(item);
    setAdded(true);
    openCart();
  };

  return (
    <button
      type="button"
      onClick={handle}
      className={`w-full ${base} text-[13px] font-semibold tracking-[0.1em] py-4 transition-colors inline-flex items-center justify-center gap-2`}
    >
      {added ? (
        <>
          <i className="ti ti-check" aria-hidden="true" />
          AJOUTÉ ✓
        </>
      ) : (
        <>
          <i className="ti ti-shopping-bag" aria-hidden="true" />
          AJOUTER AU PANIER
        </>
      )}
    </button>
  );
}
