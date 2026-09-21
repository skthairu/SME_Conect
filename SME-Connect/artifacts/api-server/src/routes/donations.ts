import { Router, type IRouter, type Request } from "express";
import { z } from "zod/v4";
import { getUncachableStripeClient } from "../stripeClient";

const router: IRouter = Router();
const MINIMUM_AMOUNT_KES = 100;
const MAXIMUM_AMOUNT_KES = 1_000_000;
const DONATION_PRODUCT_NAME = "BNAK Donation";
const DONATION_PURPOSE = "bnak_donation";

const donationInputSchema = z.object({
  amount: z
    .number()
    .int()
    .min(MINIMUM_AMOUNT_KES)
    .max(MAXIMUM_AMOUNT_KES),
  donorEmail: z.email().optional(),
});

function appBasePath(): string {
  const configured = process.env.BASE_PATH?.trim() || "/";
  const withLeadingSlash = configured.startsWith("/")
    ? configured
    : `/${configured}`;
  return withLeadingSlash === "/"
    ? ""
    : `/${withLeadingSlash.replace(/^\/+|\/+$/g, "")}`;
}

function appOrigin(request: Request): string {
  const forwardedProtocol = request.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const protocol = forwardedProtocol === "https" ? "https" : request.protocol;
  const host = request.get("host");
  if (!host) {
    throw new Error("Unable to determine the application host");
  }
  return `${protocol}://${host}`;
}

async function getOrCreateDonationPrice(amountKes: number): Promise<string> {
  const stripe = await getUncachableStripeClient();
  const products = await stripe.products.search({
    query: "name:'BNAK Donation' AND active:'true'",
  });
  let product = products.data.find(
    (candidate) => candidate.metadata?.purpose === DONATION_PURPOSE,
  );

  if (!product) {
    product = await stripe.products.create({
      name: DONATION_PRODUCT_NAME,
      description: "Voluntary contribution supporting BNAK programmes in Kenya",
      metadata: { purpose: DONATION_PURPOSE },
    });
  }

  const prices = await stripe.prices.list({
    product: product.id,
    active: true,
    type: "one_time",
    currency: "kes",
    limit: 100,
  });
  const existingPrice = prices.data.find(
    (price) =>
      price.unit_amount === amountKes * 100 &&
      price.currency === "kes" &&
      price.type === "one_time" &&
      price.metadata?.purpose === DONATION_PURPOSE,
  );

  if (existingPrice) {
    return existingPrice.id;
  }

  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: amountKes * 100,
    currency: "kes",
    metadata: { purpose: DONATION_PURPOSE },
  });
  return price.id;
}

router.post("/donations/checkout", async (req, res) => {
  const parsed = donationInputSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      error: `Donation amount must be a whole number between KSh ${MINIMUM_AMOUNT_KES.toLocaleString()} and KSh ${MAXIMUM_AMOUNT_KES.toLocaleString()}.`,
    });
    return;
  }

  try {
    const { amount, donorEmail } = parsed.data;
    const priceId = await getOrCreateDonationPrice(amount);
    const stripe = await getUncachableStripeClient();
    const origin = appOrigin(req);
    const basePath = appBasePath();
    const returnPath = `${basePath}/donate`;
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      ...(donorEmail ? { customer_email: donorEmail.trim().toLowerCase() } : {}),
      success_url: `${origin}${returnPath}?donation=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}${returnPath}?donation=cancelled`,
      metadata: {
        purpose: DONATION_PURPOSE,
        amount_kes: String(amount),
      },
    });

    if (!session.url) {
      res.status(502).json({ error: "Stripe did not return a checkout URL." });
      return;
    }

    res.status(201).json({
      checkoutUrl: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    req.log.error(error, "Failed to create donation checkout");
    res.status(502).json({
      error: "Donation checkout is temporarily unavailable. Please try again.",
    });
  }
});

export default router;