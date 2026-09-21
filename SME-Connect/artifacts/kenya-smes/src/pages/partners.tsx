import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, ArrowRight, CheckCircle2, Handshake, MessageCircle, RefreshCw } from "lucide-react";
import { useCreatePartnerApplication, useGetVerificationChallenge, type PartnerApplicationInputPartnershipType } from "@workspace/api-client-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const types = [
  ["Strategic Partner", "Long-term institutions aligned to BNAK's national MSME mandate."],
  ["Programme Partner", "Co-design and deliver practical support through BNAK programmes."],
  ["Implementing Partner", "Bring trusted county, market and grassroots delivery capacity."],
  ["Funding Partner", "Finance inclusive enterprise growth, research and market access."],
  ["Sponsor", "Support events, campaigns and visibility for Kenyan entrepreneurs."],
  ["Technical Partner", "Offer technology, systems and expert implementation support."],
  ["Knowledge Partner", "Share research, training, standards and practical enterprise knowledge."],
  ["Market Partner", "Open routes to buyers, supply chains, distributors and new markets."],
] as const;

const institutions = [
  { name: "Kenya Revenue Authority (KRA)", website: "https://www.kra.go.ke/", image: "/images/partners/kra-logo.png", description: "Relevant to tax awareness, compliance information and formalisation conversations." },
  { name: "Independent Electoral and Boundaries Commission (IEBC)", website: "https://www.iebc.or.ke/", mark: "IEBC", description: "Relevant to civic and electoral information that reaches businesses and communities." },
  { name: "Energy and Petroleum Regulatory Authority (EPRA)", website: "https://www.epra.go.ke/", mark: "EPRA", description: "Relevant to energy regulation, consumer information and enterprise operating conditions." },
  { name: "National Cohesion and Integration Commission (NCIC)", website: "https://cohesion.go.ke/", mark: "NCIC", description: "Relevant to cohesion, inclusion and peaceful enterprise communities." },
] as const;

const partnershipTypeValues = types.map(([name]) => name) as [string, ...string[]];
const formSchema = z.object({
  organisationName: z.string().trim().min(2, "Organisation name is required"),
  contactName: z.string().trim().min(2, "Contact name is required"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().min(9, "Enter a valid phone number"),
  website: z.string().trim().url("Enter a valid website URL").optional().or(z.literal("")),
  partnershipType: z.enum(partnershipTypeValues, { required_error: "Select a partnership type" }),
  organisationSummary: z.string().trim().min(20, "Please provide at least 20 characters"),
  proposedContribution: z.string().trim().min(20, "Please provide at least 20 characters"),
  countyOrCoverage: z.string().trim().min(2, "County or coverage is required"),
  verificationAnswer: z.string().trim().min(1, "Answer the security question"),
  honeypot: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Partners() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formStartedAt] = useState(() => Date.now());
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      organisationName: "",
      contactName: "",
      email: "",
      phone: "",
      website: "",
      partnershipType: "",
      organisationSummary: "",
      proposedContribution: "",
      countyOrCoverage: "",
      verificationAnswer: "",
      honeypot: "",
    },
  });
  const { data: challenge, refetch: refetchChallenge, isFetching: challengeLoading } = useGetVerificationChallenge();
  const applicationMutation = useCreatePartnerApplication();

  const next = async () => {
    const fieldsByStep: Record<number, (keyof FormValues)[]> = {
      1: ["organisationName", "contactName", "email", "phone", "website"],
      2: ["partnershipType", "organisationSummary", "proposedContribution", "countyOrCoverage"],
    };
    if (await form.trigger(fieldsByStep[step])) setStep((current) => current + 1);
    else toast({ title: "Complete this section", description: "Please correct the highlighted fields before continuing.", variant: "destructive" });
  };

  const onSubmit = (values: FormValues) => {
    if (!challenge || new Date(challenge.expiresAt).getTime() < Date.now()) {
      toast({ title: "Verification expired", description: "Refresh the security question and try again.", variant: "destructive" });
      refetchChallenge();
      return;
    }
    applicationMutation.mutate({
      data: {
        ...values,
        partnershipType: values.partnershipType as PartnerApplicationInputPartnershipType,
        website: values.website || undefined,
        verificationToken: challenge.token,
        formStartedAt,
      },
    }, {
      onSuccess: () => setSubmitted(true),
      onError: () => toast({ title: "Application could not be sent", description: "Please try again or contact BNAK for help.", variant: "destructive" }),
    });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <section className="bg-foreground py-20 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <Badge className="mb-4 border-0 bg-primary text-white">BNAK PARTNERS</Badge>
          <h1 className="max-w-3xl text-4xl font-black md:text-6xl">Partnerships that move biashara forward.</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/70">BNAK convenes public, private and community organisations to make enterprise support practical, trusted and accessible at market level.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 md:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div><p className="text-sm font-bold uppercase tracking-widest text-primary">Partnership types</p><h2 className="mt-2 text-3xl font-black">Find your place in the ecosystem</h2></div>
          <a href="#partner-application" className="hidden items-center font-bold text-primary sm:flex">Become our Partner <ArrowRight className="ml-2 h-4 w-4" /></a>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {types.map(([title, body], index) => (
            <Card key={title} className="border-border transition-all hover:-translate-y-1 hover:border-primary/50">
              <CardHeader><div className="mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Handshake className="h-5 w-5" /></div><CardTitle className="text-lg">{title}</CardTitle></CardHeader>
              <CardContent><p className="text-sm leading-relaxed text-muted-foreground">{body}</p><span className="mt-5 block text-xs font-bold text-primary">0{index + 1} / BNAK ecosystem</span></CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y bg-background py-16">
        <div className="container mx-auto grid items-start gap-10 px-4 md:grid-cols-[1fr_1.5fr] md:px-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-secondary">Institutional relevance</p>
            <h2 className="mt-2 text-3xl font-black">Public institutions in the SME ecosystem</h2>
            <p className="mt-4 text-muted-foreground">These are institutions BNAK may engage with on matters relevant to entrepreneurs, public information and responsible enterprise support.</p>
            <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">Listing an institution recognizes its institutional relevance and is not proof of a formal BNAK partnership, endorsement or confirmed engagement.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {institutions.map((institution) => (
              <Card key={institution.name} className="overflow-hidden">
                <CardContent className="flex min-h-44 flex-col justify-between gap-4 p-5">
                  <div className="flex h-16 items-center">
                    {"image" in institution ? <img src={institution.image} alt={`${institution.name} official logo`} className="max-h-16 max-w-[190px] object-contain" /> : <span aria-hidden="true" className="flex h-14 w-14 items-center justify-center rounded-xl bg-foreground text-sm font-black tracking-wider text-white">{institution.mark}</span>}
                  </div>
                  <div><h3 className="font-bold leading-snug">{institution.name}</h3><p className="mt-2 text-sm text-muted-foreground">{institution.description}</p><a href={institution.website} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-bold text-primary underline underline-offset-4">Visit official website</a></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="partner-application" className="container mx-auto px-4 py-16 md:px-6">
        <Card className="mx-auto max-w-4xl shadow-lg">
          <CardHeader><CardTitle className="text-3xl">Become our Partner</CardTitle><p className="text-muted-foreground">Tell us how your organisation could contribute. Applications are reviewed before any partnership is discussed or confirmed.</p></CardHeader>
          <CardContent>
            {submitted ? (
              <div className="py-10 text-center" data-testid="partner-application-success">
                <CheckCircle2 className="mx-auto h-14 w-14 text-secondary" />
                <h3 className="mt-5 text-2xl font-bold">Application received</h3>
                <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Your partnership application is pending review. BNAK will contact you after due diligence; submitting an application does not guarantee acceptance.</p>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="form-partner-application">
                  <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground"><span className={`rounded-full px-3 py-1 ${step >= 1 ? "bg-primary text-white" : "bg-muted"}`}>1 Organisation</span><span className="h-px flex-1 bg-border" /><span className={`rounded-full px-3 py-1 ${step >= 2 ? "bg-primary text-white" : "bg-muted"}`}>2 Proposal</span><span className="h-px flex-1 bg-border" /><span className={`rounded-full px-3 py-1 ${step >= 3 ? "bg-primary text-white" : "bg-muted"}`}>3 Verify</span></div>
                  {step === 1 && <div className="grid gap-5 sm:grid-cols-2" data-testid="partner-step-1">
                    <FormField control={form.control} name="organisationName" render={({ field }) => <FormItem><FormLabel>Organisation name *</FormLabel><FormControl><Input {...field} data-testid="input-partner-organisation" /></FormControl><FormMessage /></FormItem>} />
                    <FormField control={form.control} name="contactName" render={({ field }) => <FormItem><FormLabel>Contact name *</FormLabel><FormControl><Input {...field} data-testid="input-partner-contact" /></FormControl><FormMessage /></FormItem>} />
                    <FormField control={form.control} name="email" render={({ field }) => <FormItem><FormLabel>Email *</FormLabel><FormControl><Input type="email" {...field} data-testid="input-partner-email" /></FormControl><FormMessage /></FormItem>} />
                    <FormField control={form.control} name="phone" render={({ field }) => <FormItem><FormLabel>Phone *</FormLabel><FormControl><Input {...field} data-testid="input-partner-phone" /></FormControl><FormMessage /></FormItem>} />
                    <FormField control={form.control} name="website" render={({ field }) => <FormItem className="sm:col-span-2"><FormLabel>Website <span className="font-normal text-muted-foreground">(optional)</span></FormLabel><FormControl><Input type="url" placeholder="https://" {...field} data-testid="input-partner-website" /></FormControl><FormMessage /></FormItem>} />
                  </div>}
                  {step === 2 && <div className="space-y-5" data-testid="partner-step-2">
                    <FormField control={form.control} name="partnershipType" render={({ field }) => <FormItem><FormLabel>Partnership type *</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger data-testid="select-partner-type"><SelectValue placeholder="Select a partnership type" /></SelectTrigger></FormControl><SelectContent>{types.map(([name]) => <SelectItem key={name} value={name}>{name}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>} />
                    <FormField control={form.control} name="organisationSummary" render={({ field }) => <FormItem><FormLabel>Organisation summary *</FormLabel><FormControl><Textarea rows={4} {...field} data-testid="textarea-partner-summary" /></FormControl><FormMessage /></FormItem>} />
                    <FormField control={form.control} name="proposedContribution" render={({ field }) => <FormItem><FormLabel>Proposed contribution *</FormLabel><FormControl><Textarea rows={4} {...field} data-testid="textarea-partner-contribution" /></FormControl><FormMessage /></FormItem>} />
                    <FormField control={form.control} name="countyOrCoverage" render={({ field }) => <FormItem><FormLabel>County or coverage *</FormLabel><FormControl><Input {...field} data-testid="input-partner-coverage" /></FormControl><FormMessage /></FormItem>} />
                  </div>}
                  {step === 3 && <div className="space-y-5" data-testid="partner-step-3">
                    <div className="rounded-xl border bg-muted/30 p-4 text-sm text-muted-foreground">A short arithmetic question helps us reduce automated submissions. Your application will remain pending review.</div>
                    <div className="flex items-end gap-3"><div className="flex-1"><p className="mb-2 text-sm font-bold">Security question</p><p className="rounded-md border bg-background px-3 py-2 font-mono text-sm">{challenge?.question ?? "Loading question…"}</p></div><Button type="button" variant="outline" onClick={() => refetchChallenge()} disabled={challengeLoading} data-testid="button-refresh-partner-challenge"><RefreshCw className={`h-4 w-4 ${challengeLoading ? "animate-spin" : ""}`} /></Button></div>
                    <FormField control={form.control} name="verificationAnswer" render={({ field }) => <FormItem><FormLabel>Your answer *</FormLabel><FormControl><Input {...field} data-testid="input-partner-verification-answer" /></FormControl><FormMessage /></FormItem>} />
                    <div className="absolute -z-10 h-0 w-0 overflow-hidden opacity-0" aria-hidden="true"><FormField control={form.control} name="honeypot" render={({ field }) => <FormItem><FormLabel>Leave blank</FormLabel><FormControl><Input {...field} tabIndex={-1} autoComplete="off" /></FormControl></FormItem>} /></div>
                  </div>}
                  <div className="flex flex-wrap justify-between gap-3 border-t pt-5">
                    {step > 1 ? <Button type="button" variant="outline" onClick={() => setStep((current) => current - 1)} data-testid="button-partner-back"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button> : <span />}
                    {step < 3 ? <Button type="button" onClick={next} data-testid="button-partner-continue">Continue <ArrowRight className="ml-2 h-4 w-4" /></Button> : <Button type="submit" disabled={applicationMutation.isPending || !challenge} data-testid="button-submit-partner-application">{applicationMutation.isPending ? "Sending…" : "Submit application"}</Button>}
                  </div>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
        <div className="mx-auto mt-6 flex max-w-4xl flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground"><span>Questions about partnering?</span><a href="tel:+254711422163" className="font-bold text-primary">Call 0711422163</a><a href="https://wa.me/254711422163" target="_blank" rel="noreferrer" className="inline-flex items-center font-bold text-primary"><MessageCircle className="mr-1 h-4 w-4" /> WhatsApp BNAK</a></div>
      </section>
    </div>
  );
}