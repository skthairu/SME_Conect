import Stripe from "stripe";

export function getUncachableStripeClient(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) throw new Error("STRIPE_SECRET_KEY environment variable is required.");
  return new Stripe(key);
}
