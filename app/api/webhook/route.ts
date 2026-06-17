import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { hasStripeKey, stripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!hasStripeKey() || !secret) {
    return NextResponse.json(
      { error: "Stripe webhook non configuré." },
      { status: 503 },
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json(
      { error: "Signature Stripe manquante." },
      { status: 400 },
    );
  }

  const raw = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, signature, secret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Signature invalide";
    console.error("[webhook] signature check failed:", msg);
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("[webhook] checkout.session.completed", {
        id: session.id,
        amount_total: session.amount_total,
        currency: session.currency,
        customer_email:
          session.customer_details?.email || session.customer_email,
        payment_status: session.payment_status,
        metadata: session.metadata,
      });
      // TODO: e-mail de confirmation client + notification commande interne
      break;
    }
    case "checkout.session.async_payment_succeeded":
    case "checkout.session.async_payment_failed":
    case "payment_intent.succeeded":
    case "payment_intent.payment_failed":
      console.log(`[webhook] ${event.type}`, event.data.object);
      break;
    default:
      console.log(`[webhook] unhandled event: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
