import { NextResponse } from "next/server";
import { hasStripeKey, stripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type IncomingItem = {
  id: string;
  titre: string;
  priceCents: number;
  quantite: number;
  image?: string | null;
  type?: "affiche" | "ebook";
  variantLabel?: string;
};

function isValidItem(x: unknown): x is IncomingItem {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.id === "string" &&
    typeof o.titre === "string" &&
    typeof o.priceCents === "number" &&
    o.priceCents > 0 &&
    o.priceCents < 1_000_000 &&
    typeof o.quantite === "number" &&
    o.quantite > 0 &&
    o.quantite <= 99
  );
}

function absoluteImage(image: string | null | undefined, origin: string): string[] {
  if (!image) return [];
  if (image.startsWith("http")) return [image];
  if (!origin.startsWith("https://")) return []; // Stripe rejects http(s) only — skip in dev
  return [`${origin}${image}`];
}

export async function POST(request: Request) {
  if (!hasStripeKey()) {
    return NextResponse.json(
      { error: "Stripe non configuré : STRIPE_SECRET_KEY manquante." },
      { status: 503 },
    );
  }

  let body: { items?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corps JSON invalide." }, { status: 400 });
  }

  if (!Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ error: "Panier vide." }, { status: 400 });
  }
  if (body.items.length > 50) {
    return NextResponse.json({ error: "Trop d'articles." }, { status: 400 });
  }
  const items = body.items.filter(isValidItem);
  if (items.length !== body.items.length) {
    return NextResponse.json({ error: "Article invalide dans le panier." }, { status: 400 });
  }

  const origin = request.headers.get("origin") || "https://thelaplandtribe.com";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: items.map((item) => ({
        price_data: {
          currency: "eur",
          unit_amount: item.priceCents,
          product_data: {
            name: item.titre,
            description: item.variantLabel || undefined,
            images: absoluteImage(item.image, origin),
            metadata: {
              cart_item_id: item.id,
              type: item.type || "unknown",
            },
          },
        },
        quantity: item.quantite,
      })),
      success_url: `${origin}/commande-confirmee?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/`,
      automatic_tax: { enabled: false },
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      phone_number_collection: { enabled: false },
      locale: "fr",
      metadata: {
        source: "thelaplandtribe.com",
        item_count: String(items.reduce((n, i) => n + i.quantite, 0)),
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe n'a pas renvoyé d'URL de session." },
        { status: 502 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Erreur inconnue";
    console.error("[checkout] Stripe error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
