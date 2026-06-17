import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  // Intentionally not throwing at import time so dev tooling keeps working
  // without env. Routes that need Stripe must guard separately.
  console.warn(
    "[stripe] STRIPE_SECRET_KEY missing — Stripe API calls will fail.",
  );
}

export const stripe = new Stripe(key || "sk_missing", {
  apiVersion: "2026-05-27.dahlia",
  typescript: true,
  appInfo: {
    name: "thelaplandtribe.com",
    url: "https://thelaplandtribe.com",
  },
});

export function hasStripeKey(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}
