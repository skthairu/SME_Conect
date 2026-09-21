import { getUncachableStripeClient } from "./stripeClient";

const amountsKes = [500, 1_000, 2_500];
const donationPurpose = "bnak_donation";

async function createDonationProducts() {
  const stripe = await getUncachableStripeClient();
  const products = await stripe.products.search({
    query: "name:'BNAK Donation' AND active:'true'",
  });
  let product = products.data.find(
    (candidate) => candidate.metadata?.purpose === donationPurpose,
  );
  if (!product) {
    product = await stripe.products.create({
      name: "BNAK Donation",
      description: "Voluntary contribution supporting BNAK programmes in Kenya",
      metadata: { purpose: donationPurpose },
    });
  }

  const prices = await stripe.prices.list({
    product: product.id,
    active: true,
    type: "one_time",
    currency: "kes",
    limit: 100,
  });
  for (const amountKes of amountsKes) {
    const exists = prices.data.some(
      (price) =>
        price.unit_amount === amountKes * 100 &&
        price.currency === "kes" &&
        price.type === "one_time" &&
        price.metadata?.purpose === donationPurpose,
    );
    if (!exists) {
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: amountKes * 100,
        currency: "kes",
        metadata: { purpose: donationPurpose },
      });
      console.log(`Created KSh ${amountKes} donation price: ${price.id}`);
    }
  }
  console.log(`Donation product ready: ${product.id}`);
}

createDonationProducts().catch((error: unknown) => {
  console.error("Failed to seed donation prices:", error);
  process.exitCode = 1;
});