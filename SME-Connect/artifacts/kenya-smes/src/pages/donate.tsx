import { useState } from "react";
import { useCreateDonationCheckout } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  HeartHandshake, 
  MessageCircle, 
  PhoneCall, 
  ShieldCheck, 
  Info,
  CheckCircle2,
  AlertTriangle,
  GraduationCap,
  Users,
  Store,
  Leaf,
  Siren
} from "lucide-react";

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState<number | "custom">(1000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [donorEmail, setDonorEmail] = useState("");

  const suggestedAmounts = [500, 1000, 2500];
  const donationCheckout = useCreateDonationCheckout();
  const donationStatus = new URLSearchParams(window.location.search).get("donation");
  const amount =
    selectedAmount === "custom" ? Number(customAmount) : selectedAmount;
  const amountIsValid = Number.isInteger(amount) && amount >= 100 && amount <= 1_000_000;

  const startCardCheckout = () => {
    if (!amountIsValid || donationCheckout.isPending) return;

    donationCheckout.mutate({
      data: {
        amount,
        ...(donorEmail.trim() ? { donorEmail: donorEmail.trim() } : {}),
      },
    }, {
      onSuccess: (checkout) => {
        window.location.assign(checkout.checkoutUrl);
      },
    });
  };

  const getWhatsAppMessage = () => {
    let amountStr = "a contribution";
    if (selectedAmount !== "custom") {
      amountStr = `KSh ${selectedAmount.toLocaleString()}`;
    } else if (customAmount) {
      amountStr = `KSh ${Number(customAmount).toLocaleString()}`;
    }
    
    return encodeURIComponent(
      `Jambo BNAK. I would like to support the association with ${amountStr}. Please share the official approved donation instructions.`
    );
  };

  return (
    <div className="flex-1 pb-16 pt-8 md:pt-16">
      <div className="app-shell max-w-4xl">
        <div className="text-center mb-12">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <HeartHandshake className="h-8 w-8" />
          </div>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Support BNAK
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-balance">
            Your contributions empower Kenyan mSMEs by funding vital programmes that build capacity, open markets, and coordinate grassroots action.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-12">
          {/* Left Column: Donation Form UI */}
          <div className="md:col-span-7">
            <Card className="border-border/50 shadow-sm overflow-hidden">
              <div className="bg-muted px-6 py-4 border-b border-border/50 flex items-start gap-3">
                <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div className="text-sm text-foreground/80 leading-relaxed">
                   <span className="font-semibold text-foreground">Payment options:</span> International card donations are securely hosted by Stripe. M-Pesa STK is not currently active; use the official BNAK line for approved M-Pesa instructions.
                </div>
              </div>

              {donationStatus === "success" && (
                <div className="mx-6 mt-6 rounded-lg border border-secondary/30 bg-secondary/10 p-4 text-sm text-foreground">
                  Checkout returned successfully. BNAK verifies payment confirmation through Stripe before acknowledging a donation; this message alone is not proof of payment.
                </div>
              )}
              {donationStatus === "cancelled" && (
                <div className="mx-6 mt-6 rounded-lg border border-border bg-muted p-4 text-sm text-foreground">
                  Your Stripe checkout was cancelled. No payment is confirmed.
                </div>
              )}
              
              <CardHeader className="pb-4">
                <CardTitle>Select an Amount</CardTitle>
                <CardDescription>
                   Choose a whole KSh amount between KSh 100 and KSh 1,000,000.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {suggestedAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setSelectedAmount(amount)}
                      className={`relative flex flex-col items-center justify-center rounded-xl border p-4 transition-all ${
                        selectedAmount === amount
                          ? "border-primary bg-primary/5 text-primary ring-1 ring-primary"
                          : "border-border bg-background text-foreground hover:bg-muted"
                      }`}
                      data-testid={`btn-amount-${amount}`}
                    >
                      <span className="text-xs font-medium opacity-80 mb-1">KSh</span>
                      <span className="text-lg font-bold">{amount}</span>
                    </button>
                  ))}
                  <button
                    onClick={() => setSelectedAmount("custom")}
                    className={`relative flex flex-col items-center justify-center rounded-xl border p-4 transition-all ${
                      selectedAmount === "custom"
                        ? "border-primary bg-primary/5 text-primary ring-1 ring-primary"
                        : "border-border bg-background text-foreground hover:bg-muted"
                    }`}
                    data-testid="btn-amount-custom"
                  >
                    <span className="text-sm font-medium">Custom</span>
                  </button>
                </div>

                {selectedAmount === "custom" && (
                  <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                    <label htmlFor="custom-amount" className="text-sm font-medium">
                      Enter Amount (KSh)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                        KSh
                      </span>
                      <Input
                        id="custom-amount"
                        type="number"
                        min="100"
                        max="1000000"
                        step="1"
                        className="pl-12 font-bold text-lg h-12"
                        placeholder="100"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        data-testid="input-custom-amount"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label htmlFor="donor-email" className="text-sm font-medium">
                    Email for your Stripe receipt (optional)
                  </label>
                  <Input
                    id="donor-email"
                    type="email"
                    value={donorEmail}
                    onChange={(event) => setDonorEmail(event.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </div>

                <div className="space-y-3">
                  <Button
                    type="button"
                    className="h-12 w-full shadow-sm"
                    onClick={startCardCheckout}
                    disabled={!amountIsValid || donationCheckout.isPending}
                    data-testid="btn-card-donate"
                  >
                    {donationCheckout.isPending
                      ? "Opening secure checkout…"
                      : "Donate by international card"}
                  </Button>
                  {donationCheckout.isError && (
                    <p className="text-sm text-destructive" role="alert">
                      {donationCheckout.error instanceof Error
                        ? donationCheckout.error.message
                        : "Unable to open Stripe checkout. Please try again."}
                    </p>
                  )}
                  {!amountIsValid && selectedAmount === "custom" && customAmount && (
                    <p className="text-sm text-destructive">
                      Enter a whole amount from KSh 100 to KSh 1,000,000.
                    </p>
                  )}
                </div>

                <div className="rounded-xl border border-border/60 bg-card p-5 space-y-4 shadow-sm">
                  <h3 className="font-semibold text-sm">How to send your contribution</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Button 
                      asChild 
                      className="w-full h-12 bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm"
                      data-testid="btn-whatsapp-donate"
                    >
                      <a 
                        href={`https://wa.me/254711422163?text=${getWhatsAppMessage()}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <MessageCircle className="mr-2 h-5 w-5" />
                        WhatsApp Us
                      </a>
                    </Button>
                    <Button 
                      asChild 
                      variant="outline" 
                      className="w-full h-12 shadow-sm"
                      data-testid="btn-call-donate"
                    >
                      <a href="tel:+254711422163">
                        <PhoneCall className="mr-2 h-5 w-5" />
                        Call 0711422163
                      </a>
                    </Button>
                  </div>
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    Reach out to the official BNAK line to get approved M-Pesa instructions.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-secondary" />
                Transparency & Safety Guide
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-card border p-4 text-sm text-foreground/80">
                  <CheckCircle2 className="h-4 w-4 text-secondary mb-2" />
                  <strong>Verify Instructions:</strong> Only send contributions to details provided directly by the official line <strong>0711422163</strong>.
                </div>
                <div className="rounded-lg bg-card border p-4 text-sm text-foreground/80">
                  <AlertTriangle className="h-4 w-4 text-destructive mb-2" />
                  <strong>Protect Yourself:</strong> Never share your M-Pesa PIN, OTP, or passwords with anyone claiming to represent BNAK.
                </div>
                <div className="rounded-lg bg-card border p-4 text-sm text-foreground/80">
                  <Info className="h-4 w-4 text-primary mb-2" />
                  <strong>No Preferential Treatment:</strong> Contributions are voluntary. They do not buy coordinator appointments, market slots, or preferential treatment.
                </div>
                <div className="rounded-lg bg-card border p-4 text-sm text-foreground/80">
                  <CheckCircle2 className="h-4 w-4 text-secondary mb-2" />
                  <strong>Acknowledgement:</strong> Always request an official acknowledgement or receipt after provider verification.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Impact Info */}
          <div className="md:col-span-5 space-y-6">
            <div className="rounded-2xl bg-secondary/5 border border-secondary/10 p-6">
              <h3 className="font-bold text-lg mb-4 text-foreground">Why Support BNAK?</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Your contributions directly fund our national initiatives to organize, educate, and empower the millions of micro and small business owners in Kenya.
              </p>
              
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                    <GraduationCap className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Member Education</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">Capacity building, financial literacy, and business health check clinics.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Grassroots Coordination</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">Supporting our network of coordinators in every ward and constituency.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                    <Store className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Market Access & Environment</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">Advocating for clean business environments and fair market access.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                    <Leaf className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">E-Mobility Readiness</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">Transitioning boda bodas and matatus to sustainable electric alternatives.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                    <Siren className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Emergency Programmes</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">Community support and emergency response for members facing crises.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="rounded-xl border border-border/50 bg-card p-5">
              <Badge variant="outline" className="mb-2 bg-background">Voluntary Support</Badge>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Donations to BNAK are entirely voluntary and are not considered an official mandatory fee for membership. We appreciate every contribution, no matter the size, towards building a stronger mSME sector in Kenya.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
