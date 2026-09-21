import Stripe from "stripe";
import { getStripeWebhookSecret } from "./stripeClient";

export class WebhookHandlers {
  static async processWebhook(payload: Buffer, signature: string): Promise<void> {
    if (!Buffer.isBuffer(payload)) {
      throw new Error(
        "STRIPE WEBHOOK ERROR: Payload must be a Buffer. Ensure the webhook route is registered before express.json().",
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
    stripe.webhooks.constructEvent(payload, signature, getStripeWebhookSecret());
  }
}
