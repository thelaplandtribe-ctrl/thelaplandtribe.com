"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItemType = "affiche" | "ebook";

export type CartItem = {
  id: string;
  slug: string;
  titre: string;
  prix: string;
  priceCents: number;
  image: string | null;
  quantite: number;
  type: CartItemType;
  variantLabel?: string;
  href?: string;
};

type CartContextValue = {
  items: CartItem[];
  hydrated: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (item: Omit<CartItem, "quantite">, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  totalCount: number;
  totalCents: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "tlt_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage full or disabled — ignore
    }
  }, [items, hydrated]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const addToCart = useCallback(
    (item: Omit<CartItem, "quantite">, qty: number = 1) => {
      setItems((prev) => {
        const existing = prev.find((p) => p.id === item.id);
        if (existing) {
          return prev.map((p) =>
            p.id === item.id ? { ...p, quantite: p.quantite + qty } : p,
          );
        }
        return [...prev, { ...item, quantite: qty }];
      });
    },
    [],
  );

  const removeFromCart = useCallback((id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, qty: number) => {
    setItems((prev) => {
      if (qty <= 0) return prev.filter((p) => p.id !== id);
      return prev.map((p) => (p.id === id ? { ...p, quantite: qty } : p));
    });
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalCount = useMemo(
    () => items.reduce((n, p) => n + p.quantite, 0),
    [items],
  );
  const totalCents = useMemo(
    () => items.reduce((n, p) => n + p.priceCents * p.quantite, 0),
    [items],
  );

  const value: CartContextValue = {
    items,
    hydrated,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    toggleCart: () => setIsOpen((v) => !v),
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalCount,
    totalCents,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export function formatPriceCents(cents: number, currency = "€"): string {
  return `${currency}${(cents / 100).toFixed(2).replace(".", ",")}`;
}
