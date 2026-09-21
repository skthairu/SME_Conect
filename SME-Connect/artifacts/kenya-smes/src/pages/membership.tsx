import { type ReactNode, useMemo, useState, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, CircleAlert, CreditCard, LockKeyhole, MessageCircle, ShieldCheck, UserRound, Building2, RefreshCw } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRegisterMember, useGetMemberCategories, useGetVerificationChallenge, getGetVerificationChallengeQueryKey } from "@workspace/api-client-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const plans = [
  { name: "ORDINARY MEMBER", fee: 150, target: ["Mama mboga", "Kiosk/duka operators", "Street vendors", "Market traders", "Informal service providers", "Small-scale farmers", "Boda boda operators"] },
  { name: "GRASSROOTS COORDINATOR", fee: 250, target: ["Grassroots representatives across counties, constituencies and wards"], note: "Paying or applying does not appoint you to this coordinator role. Appointment requires BNAK review and written approval." },
  { name: "SENIOR COORDINATOR", fee: 500, target: ["Experienced local and business leaders", "Expanded mobilisation", "Programme coordination", "Partner activation responsibilities"], note: "Paying or applying does not appoint you to this coordinator role. Appointment requires BNAK review and written approval. Eligible approved coordinators may earn commissions from selected partner products or programmes only under each partner's written terms, successful verified transactions and applicable law. Income is not guaranteed and no fixed percentage is promised." },
  { name: "RETAIL DEVELOPMENT MEMBER", fee: 5000, target: ["Retail businesses", "Commercial businesses", "Wholesalers", "Distributors", "Growing enterprises", "Suppliers", "Commercial traders"] },
  { name: "BUSINESS DEVELOPMENT MEMBER", fee: 10000, target: ["Established businesses", "Companies", "Manufacturers", "Distributors", "Investors", "Entrepreneurs", "Professional businesses"] },
];

const phoneRegex = /^(?:\+254|0)7\d{8}$/;
const phoneMessage = "Use a valid Kenyan number (e.g. 0711422163)";

const formSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required"),
  ageBracket: z.string().min(1, "Select an age bracket"),
  gender: z.string().min(1, "Select a gender"),
  nationalId: z.string().trim().min(5, "National ID is required"),
  email: z.string().trim().email("Invalid email address"),
  phone: z.string().trim().regex(phoneRegex, phoneMessage),
  businessName: z.string().trim().min(2, "Business name is required"),
  businessType: z.string().trim().min(2, "Business type is required"),
  category: z.string().min(1, "Select a membership category"),
  monthlyTransactionBracket: z.string().min(1, "Select a transaction bracket"),
  county: z.string().trim().min(2, "County is required"),
  constituency: z.string().trim().min(2, "Constituency is required"),
  ward: z.string().trim().min(2, "Ward is required"),
  estate: z.string().trim().min(2, "Estate/market is required"),
  businessLocation: z.string().trim().min(2, "Business location is required"),
  businessRegistrationNumber: z.string().trim().optional(),
  kraPin: z.string().trim().optional(),
  mpesaNumber: z.string().trim().regex(phoneRegex, phoneMessage),
  verificationAnswer: z.string().trim().min(1, "Please answer the security question"),
  website: z.string().trim().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Membership() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [paymentState, setPaymentState] = useState<"idle" | "waiting">("idle");
  const [consent, setConsent] = useState(false);
  const [formStartedAt] = useState(() => Date.now());
  const stepRef = useRef<HTMLDivElement>(null);
  
  const { toast } = useToast();
  const mutation = useRegisterMember();
  const { data: challenge, refetch: refetchChallenge, isFetching: challengeLoading } = useGetVerificationChallenge({
    query: { queryKey: getGetVerificationChallengeQueryKey() }
  });
  
  const { data: apiCategories } = useGetMemberCategories();
  const categories = apiCategories?.length ? apiCategories : plans;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      fullName: "", ageBracket: "", gender: "", nationalId: "", email: "", phone: "", mpesaNumber: "",
      businessName: "", businessType: "", category: plans[0].name, monthlyTransactionBracket: "",
      county: "", constituency: "", ward: "", estate: "", businessLocation: "",
      businessRegistrationNumber: "", kraPin: "", verificationAnswer: "", website: ""
    }
  });

  const selectedCategory = form.watch("category");
  const activePlan = useMemo(() => plans.find((plan) => plan.name === selectedCategory) ?? plans[0], [selectedCategory]);

  const scrollToStep = () => {
    setTimeout(() => {
      if (stepRef.current) {
        const y = stepRef.current.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 50);
  };

  const next = async () => {
    const fieldsByStep: Record<number, (keyof FormValues)[]> = {
      1: ["fullName", "ageBracket", "gender", "nationalId", "email", "phone"],
      2: ["businessName", "businessType", "category", "monthlyTransactionBracket"],
      3: ["county", "constituency", "ward", "estate", "businessLocation"],
    };
    
    const fieldsToValidate = fieldsByStep[step];
    const isStepValid = await form.trigger(fieldsToValidate);
    
    if (isStepValid) {
      if (step < 4) {
        setStep((current) => current + 1);
        scrollToStep();
      }
    } else {
      toast({ title: "Complete this section", description: "Please fill in all required fields correctly before continuing.", variant: "destructive" });
    }
  };

  const prev = () => {
    if (step > 1) {
      setStep((current) => current - 1);
      scrollToStep();
    }
  };

  const requestPayment = async () => {
    const isValid = await form.trigger("mpesaNumber");
    if (!isValid) {
      toast({ title: "Add a valid M-Pesa number", description: "This separate number receives the STK Push.", variant: "destructive" });
      return;
    }
    setPaymentState("waiting");
  };

  const onSubmit = (values: FormValues) => {
    if (!consent) {
      toast({ title: "Consent required", description: "Please confirm your consent before submitting.", variant: "destructive" });
      return;
    }
    if (!challenge) {
      toast({ title: "Security verification missing", description: "Please complete the security question.", variant: "destructive" });
      return;
    }
    if (new Date(challenge.expiresAt).getTime() < Date.now()) {
      toast({ title: "Verification expired", description: "Security question expired. Please refresh and answer again.", variant: "destructive" });
      refetchChallenge();
      return;
    }
    const payload = { ...values, verificationToken: challenge.token, formStartedAt } as any;
    mutation.mutate({ data: payload }, {
      onSuccess: () => { setSubmitted(true); setPaymentState("waiting"); window.scrollTo({ top: 0, behavior: "smooth" }); },
      onError: () => toast({ title: "Registration could not be sent", description: "Please check your security answer or contact BNAK on WhatsApp.", variant: "destructive" }),
    });
  };

  if (submitted) return <div className="app-shell py-16 md:py-24"><Card className="mx-auto max-w-3xl overflow-hidden border-card-border shadow-xl" data-testid="card-membership-received"><CardContent className="p-8 text-center md:p-14"><div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10 text-secondary"><CheckCircle2 className="h-8 w-8" /></div><Badge className="mb-4 border-0 bg-secondary text-white" data-testid="status-application-received">APPLICATION RECEIVED</Badge><h1 className="text-4xl font-bold">Karibu BNAK, {form.getValues("fullName").split(" ")[0]}.</h1><p className="mt-4 text-lg leading-relaxed text-muted-foreground">Your membership and KYC application is in review. Your M-Pesa payment is not marked successful here; verification will happen after a connected provider confirms the transaction.</p><div className="mt-8 grid gap-4 text-left sm:grid-cols-2"><div className="rounded-2xl bg-muted p-5"><p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Selected membership</p><p className="mt-2 font-bold" data-testid="text-selected-membership">{activePlan.name}</p><p className="font-bold text-primary">KSh {activePlan.fee.toLocaleString()}</p></div><div className="rounded-2xl bg-muted p-5"><p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Payment status</p><p className="mt-2 font-bold" data-testid="status-payment">Awaiting M-Pesa verification</p><p className="mt-1 text-sm text-muted-foreground">We will confirm the next step via WhatsApp.</p></div></div><div className="mt-8 flex flex-wrap justify-center gap-3"><Button asChild data-testid="button-membership-market"><Link href="/soko">Visit Soko <ArrowRight className="ml-2 h-4 w-4" /></Link></Button><Button asChild variant="outline" data-testid="button-membership-whatsapp"><a href="https://wa.me/254711422163" target="_blank" rel="noreferrer"><MessageCircle className="mr-2 h-4 w-4" /> Ask on WhatsApp</a></Button></div></CardContent></Card></div>;

  return <div className="min-h-[100dvh] bg-muted/30 pb-12"><div className="app-shell pt-12 md:pt-20"><div className="mx-auto mb-10 max-w-3xl text-center"><Badge className="mb-4 border-0 bg-primary text-white" data-testid="badge-membership">MEMBERSHIP SYSTEM</Badge><h1 className="text-balance text-4xl font-bold md:text-6xl">Register your biashara with BNAK.</h1><p className="mt-4 text-lg leading-relaxed text-muted-foreground">One national network for informal traders, retailers, growing enterprises and strategic businesses. KYC helps us represent members responsibly.</p></div>
    <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
      <aside className="space-y-3"><h2 className="mb-5 text-xl font-bold">Choose your category</h2>{categories.map((plan) => { const local = plans.find((item) => item.name === plan.name); const fee = "annualFee" in plan ? plan.annualFee : local?.fee ?? 0; return <button type="button" key={plan.name} onClick={() => form.setValue("category", plan.name)} className={`w-full rounded-2xl border p-5 text-left transition-all ${selectedCategory === plan.name ? "border-primary bg-primary/5 shadow-md" : "border-border bg-card hover:border-primary/40"}`} data-testid={`button-plan-${plan.name.toLowerCase().replace(/\s+/g, "-")}`}><div className="flex items-start justify-between gap-3"><span className="text-sm font-bold leading-tight">{plan.name}</span><span className="whitespace-nowrap font-bold text-primary">KSh {Number(fee).toLocaleString()}</span></div><p className="mt-2 text-xs text-muted-foreground">{local?.target.slice(0, 3).join(" • ")}</p></button>})}<div className="flex items-start gap-2 rounded-2xl border border-border bg-card p-4 text-xs leading-relaxed text-muted-foreground"><LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-secondary" /> Your details are collected for membership verification and responsible representation.</div></aside>
      <main ref={stepRef}>
        <Card className="overflow-hidden border-card-border shadow-xl">
          <CardHeader className="bg-foreground p-6 text-background md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-background/60">Application step {step} of 4</p>
                <CardTitle className="mt-2 text-2xl text-background">{["Personal KYC", "Business profile", "Location", "STK Push & consent"][step - 1]}</CardTitle>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((item) => <span key={item} className={`h-2 w-8 sm:w-10 rounded-full transition-colors ${item <= step ? "bg-primary" : "bg-background/20"}`} data-testid={`progress-membership-${item}`} />)}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}>
                
                {step === 1 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300" data-testid="section-personal-kyc">
                    <SectionHeading icon={<UserRound />} title="Personal KYC" body="Your details are used for member verification and representation." />
                    <FormField control={form.control} name="fullName" render={({ field }) => (
                      <FormItem><FormLabel className="font-bold text-sm">Full name <span className="text-primary">*</span></FormLabel><FormControl><Input placeholder="Your legal name" {...field} data-testid="input-full-name" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <div className="grid gap-6 sm:grid-cols-2">
                      <FormField control={form.control} name="ageBracket" render={({ field }) => (
                        <FormItem><FormLabel className="font-bold text-sm">Age bracket <span className="text-primary">*</span></FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger data-testid="select-age-bracket"><SelectValue placeholder="Select age bracket" /></SelectTrigger></FormControl><SelectContent>{["18–24", "25–34", "35–44", "45–54", "55–64", "65+"].map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="gender" render={({ field }) => (
                        <FormItem><FormLabel className="font-bold text-sm">Gender <span className="text-primary">*</span></FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger data-testid="select-gender"><SelectValue placeholder="Select gender" /></SelectTrigger></FormControl><SelectContent>{["Female", "Male"].map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                      )} />
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <FormField control={form.control} name="nationalId" render={({ field }) => (
                        <FormItem><FormLabel className="font-bold text-sm">National ID / passport <span className="text-primary">*</span></FormLabel><FormControl><Input placeholder="ID number" {...field} data-testid="input-national-id" /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem><FormLabel className="font-bold text-sm">Contact phone <span className="text-primary">*</span></FormLabel><FormControl><Input placeholder="0711422163" {...field} data-testid="input-contact-phone" /></FormControl><FormDescription className="text-xs">Contact verification will be enabled when a delivery provider is connected.</FormDescription><FormMessage /></FormItem>
                      )} />
                    </div>
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem><FormLabel className="font-bold text-sm">Email address <span className="text-primary">*</span></FormLabel><FormControl><Input type="email" placeholder="you@example.com" {...field} data-testid="input-email" /></FormControl><FormDescription className="text-xs">Contact verification will be enabled when a delivery provider is connected.</FormDescription><FormMessage /></FormItem>
                    )} />
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300" data-testid="section-business-kyc">
                    <SectionHeading icon={<Building2 />} title="Business KYC" body="Tell us about the enterprise you want BNAK to support." />
                    <FormField control={form.control} name="businessName" render={({ field }) => (
                      <FormItem><FormLabel className="font-bold text-sm">Business / trading name <span className="text-primary">*</span></FormLabel><FormControl><Input placeholder="Business name" {...field} data-testid="input-business-name" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <div className="grid gap-6 sm:grid-cols-2">
                      <FormField control={form.control} name="businessType" render={({ field }) => (
                        <FormItem><FormLabel className="font-bold text-sm">Business type / sector <span className="text-primary">*</span></FormLabel><FormControl><Input placeholder="e.g. grocery, tailoring, service" {...field} data-testid="input-business-type" /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="category" render={({ field }) => (
                        <FormItem><FormLabel className="font-bold text-sm">Membership category <span className="text-primary">*</span></FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger data-testid="select-membership-category"><SelectValue placeholder="Select membership category" /></SelectTrigger></FormControl><SelectContent>{plans.map((plan) => <SelectItem key={plan.name} value={plan.name}>{plan.name}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                      )} />
                    </div>
                    <FormField control={form.control} name="monthlyTransactionBracket" render={({ field }) => (
                      <FormItem><FormLabel className="font-bold text-sm">Average monthly transaction bracket <span className="text-primary">*</span></FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger data-testid="select-monthly-transactions"><SelectValue placeholder="Select bracket" /></SelectTrigger></FormControl><SelectContent>{["Below KSh 10,000", "KSh 10,000–50,000", "KSh 50,001–150,000", "KSh 150,001–500,000", "Above KSh 500,000"].map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                    )} />
                    <div className="grid gap-6 sm:grid-cols-2">
                      <FormField control={form.control} name="businessRegistrationNumber" render={({ field }) => (
                        <FormItem><FormLabel className="font-bold text-sm text-foreground/80">Business registration number <span className="font-normal text-xs text-muted-foreground ml-1">(Optional)</span></FormLabel><FormControl><Input placeholder="If registered" {...field} data-testid="input-registration-number" /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="kraPin" render={({ field }) => (
                        <FormItem><FormLabel className="font-bold text-sm text-foreground/80">KRA PIN <span className="font-normal text-xs text-muted-foreground ml-1">(Optional)</span></FormLabel><FormControl><Input placeholder="If available" {...field} data-testid="input-kra-pin" /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                    <div className="rounded-2xl border border-primary/10 bg-primary/5 p-5">
                      <p className="font-bold">{activePlan.name} — KSh {activePlan.fee.toLocaleString()}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{activePlan.target.join(" • ")}</p>
                      {activePlan.note && <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">{activePlan.note}</p>}
                      {(activePlan.name === "GRASSROOTS COORDINATOR" || activePlan.name === "SENIOR COORDINATOR") && <p className="mt-3 text-xs font-medium text-muted-foreground">Both coordinator roles remain subject to BNAK review and written approval. Membership payment or application is not an appointment.</p>}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300" data-testid="section-business-location">
                    <SectionHeading icon={<ShieldCheck />} title="Business location" body="Help us map BNAK's network down to the local market." />
                    <FormField control={form.control} name="county" render={({ field }) => (
                      <FormItem><FormLabel className="font-bold text-sm">County <span className="text-primary">*</span></FormLabel><FormControl><Input placeholder="Type your county" {...field} data-testid="input-county" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <div className="grid gap-6 sm:grid-cols-2">
                      <FormField control={form.control} name="constituency" render={({ field }) => (
                        <FormItem><FormLabel className="font-bold text-sm">Constituency <span className="text-primary">*</span></FormLabel><FormControl><Input placeholder="Constituency" {...field} data-testid="input-constituency" /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="ward" render={({ field }) => (
                        <FormItem><FormLabel className="font-bold text-sm">Ward <span className="text-primary">*</span></FormLabel><FormControl><Input placeholder="Ward" {...field} data-testid="input-ward" /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <FormField control={form.control} name="estate" render={({ field }) => (
                        <FormItem><FormLabel className="font-bold text-sm">Estate / market / village <span className="text-primary">*</span></FormLabel><FormControl><Input placeholder="Local area" {...field} data-testid="input-estate" /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="businessLocation" render={({ field }) => (
                        <FormItem><FormLabel className="font-bold text-sm">Business location / landmark <span className="text-primary">*</span></FormLabel><FormControl><Input placeholder="Shop, stall or landmark" {...field} data-testid="input-business-location" /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300" data-testid="section-payment-consent">
                    <SectionHeading icon={<CreditCard />} title="STK Push & consent" body="The payment prompt is sent to your dedicated M-Pesa number. Payment stays pending until a provider callback is verified." />
                    <FormField control={form.control} name="mpesaNumber" render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel className="font-bold text-sm">M-Pesa number for STK Push <span className="text-primary">*</span></FormLabel>
                          {form.getValues("phone") && (
                            <button type="button" onClick={() => form.setValue("mpesaNumber", form.getValues("phone"), { shouldValidate: true })} className="text-xs font-bold text-primary hover:underline" data-testid="button-use-contact-number">
                              Use contact number
                            </button>
                          )}
                        </div>
                        <FormControl><Input placeholder="0711422163" {...field} data-testid="input-mpesa-number" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <div className="rounded-3xl bg-primary p-6 text-white" data-testid="card-stk-push">
                      <div className="flex items-start justify-between gap-4">
                        <div><p className="text-sm text-white/70">Amount due</p><p className="mt-1 text-2xl font-bold">{activePlan.name}</p></div>
                        <p className="text-3xl font-bold">KSh {activePlan.fee.toLocaleString()}</p>
                      </div>
                      <Button type="button" variant="secondary" className="mt-5" onClick={requestPayment} data-testid="button-request-stk-push">{paymentState === "waiting" ? "STK Push requested" : "Request STK Push"}</Button>
                      <div className="mt-4 flex items-start gap-2 text-xs text-white/75">
                        <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
                        {paymentState === "waiting" ? <span data-testid="status-stk-push">Pending provider verification — do not submit another payment.</span> : "No payment is marked successful here. BNAK will confirm payment after a connected provider sends a verified callback."}
                      </div>
                    </div>
                    <label className="flex items-start gap-3 text-sm cursor-pointer select-none" data-testid="label-membership-consent">
                      <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-1 h-4 w-4 accent-primary" />
                      <span className="leading-relaxed">I consent to BNAK processing my personal and business KYC details for membership verification, programme access and responsible representation.</span>
                    </label>
                    
                    <div className="rounded-xl border p-5 space-y-3 bg-muted/20">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-bold flex gap-2 items-center">
                          Security Question <span className="text-primary">*</span>
                        </label>
                        <Button type="button" variant="ghost" size="sm" onClick={() => refetchChallenge()} disabled={challengeLoading} data-testid="button-refresh-challenge" className="h-8 text-xs px-2">
                          <RefreshCw className={`w-3.5 h-3.5 mr-1 ${challengeLoading ? "animate-spin" : ""}`} /> Refresh
                        </Button>
                      </div>
                      {challenge ? (
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                          <span className="font-mono bg-background border px-3 py-1.5 rounded-md text-sm whitespace-nowrap">{challenge.question}</span>
                          <FormField control={form.control} name="verificationAnswer" render={({ field }) => (
                            <FormItem className="flex-1 max-w-[200px]">
                              <FormControl><Input placeholder="Answer" {...field} data-testid="input-verification-answer" /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">Loading security verification...</p>
                      )}
                      <div className="absolute opacity-0 -z-10 pointer-events-none" aria-hidden="true">
                        <FormField control={form.control} name="website" render={({ field }) => (
                          <FormItem><FormLabel>Website</FormLabel><FormControl><Input {...field} tabIndex={-1} autoComplete="off" /></FormControl></FormItem>
                        )} />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 rounded-2xl border p-4 text-sm text-muted-foreground"><MessageCircle className="h-4 w-4 shrink-0 text-secondary" /> Need help? Call <a href="tel:+254711422163" className="font-bold text-primary" data-testid="link-membership-call">0711422163</a> or <a href="https://wa.me/254711422163" target="_blank" rel="noreferrer" className="font-bold text-primary" data-testid="link-membership-whatsapp">WhatsApp BNAK</a>.</div>
                  </div>
                )}

                <div className="mt-10 flex justify-between border-t pt-6">
                  {step > 1 ? (
                    <Button type="button" variant="outline" onClick={prev} data-testid="button-membership-back" className="min-w-24">
                      <ChevronLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                  ) : <span />}
                  
                  {step < 4 ? (
                    <Button type="button" onClick={next} data-testid="button-membership-continue" className="min-w-28 font-bold">
                      Continue <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button type="submit" disabled={mutation.isPending || paymentState !== "waiting" || !challenge} data-testid="button-membership-submit" className="font-bold bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                      {mutation.isPending ? "Sending application…" : "Submit application"}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  </div></div>;
}

function SectionHeading({ icon, title, body }: { icon: ReactNode; title: string; body: string }) {
  return <div className="mb-6 flex items-start gap-3"><div className="mt-1 text-primary">{icon}</div><div><h2 className="text-xl font-bold">{title}</h2><p className="text-sm text-muted-foreground mt-1 leading-relaxed">{body}</p></div></div>;
}