import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useGetCoordinatorBenefits, useRegisterCoordinator, CoordinatorInputLevel } from "@workspace/api-client-react";
import { KENYA_COUNTIES } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, MapPin, Users, Award, Shield } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  nationalId: z.string().min(6, "National ID is required"),
  county: z.string().min(1, "Please select a county"),
  constituency: z.string().min(2, "Constituency is required"),
  ward: z.string().min(2, "Ward is required"),
  level: z.enum(["county", "constituency", "ward"]),
  mpesaNumber: z.string().min(10, "M-Pesa number is required for registration fee"),
  motivation: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Coordinators() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  
  const { data: benefits } = useGetCoordinatorBenefits();
  const registerMutation = useRegisterCoordinator();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      nationalId: "",
      county: "",
      constituency: "",
      ward: "",
      level: "ward",
      mpesaNumber: "",
      motivation: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    registerMutation.mutate({ data }, {
      onSuccess: () => {
        setIsSuccess(true);
        window.scrollTo(0, 0);
      },
      onError: () => {
        toast({
          title: "Application Failed",
          description: "There was an error submitting your application. Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-2xl text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">Application Received!</h1>
         <p className="text-xl text-muted-foreground mb-8">
           Thank you for applying as a Senior Coordinator. Your application and KSh 500 payment request remain pending review; payment is not marked successful until BNAK verifies it.
        </p>
         <p className="text-sm text-muted-foreground mb-8">Applying or paying does not appoint you to a coordinator role. Appointment requires BNAK review and written approval.</p>
        <Button onClick={() => window.location.href = "/"} size="lg" className="bg-primary text-white">
          Return Home
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-secondary text-secondary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-3xl">
           <h1 className="text-4xl md:text-5xl font-bold mb-6">Senior Coordinator — KSh 500 application</h1>
          <p className="text-lg md:text-xl text-secondary-foreground/90 leading-relaxed mb-8">
             Apply to support expanded mobilisation, programme coordination and partner activation responsibilities. We are building a robust national network rooted in local markets.
          </p>
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-6 py-3 rounded-full font-bold text-lg border border-white/30 shadow-lg">
             Application fee: KSh 500 (pending review)
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Info Column */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-4">Why Coordinate?</h2>
                <p className="text-muted-foreground mb-6">
                  Coordinators are the backbone of our association. They mobilize SMEs, disseminate information, and represent local business interests at the national level.
                </p>
              </div>

              <div className="space-y-4">
                {benefits?.map((benefit) => (
                  <Card key={benefit.id} className="bg-background shadow-sm border-none">
                    <CardContent className="p-4 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        {benefit.icon === 'network' && <Users className="w-5 h-5 text-primary" />}
                        {benefit.icon === 'training' && <Award className="w-5 h-5 text-primary" />}
                        {benefit.icon === 'advocacy' && <Shield className="w-5 h-5 text-primary" />}
                        {!['network', 'training', 'advocacy'].includes(benefit.icon) && <CheckCircle2 className="w-5 h-5 text-primary" />}
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">{benefit.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{benefit.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-accent/10 p-6 rounded-2xl border border-accent/20">
                <h3 className="font-bold text-xl mb-4">The Structure</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between items-center pb-2 border-b border-border/50">
                    <span className="font-semibold text-foreground">County Coordinators</span>
                    <Badge variant="outline" className="bg-background">Open applications</Badge>
                  </li>
                  <li className="flex justify-between items-center pb-2 border-b border-border/50">
                    <span className="font-semibold text-foreground">Constituency Reps</span>
                    <Badge variant="outline" className="bg-background">Local opportunities</Badge>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-semibold text-foreground">Ward Mobilizers</span>
                    <Badge variant="outline" className="bg-background">Community-led</Badge>
                  </li>
                </ul>
              </div>

              <div className="bg-background p-6 rounded-2xl border border-border">
                <h3 className="font-bold text-xl mb-2">Conditional partner commissions</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">Eligible approved coordinators may earn commissions from selected partner products or programmes only under each partner's written terms, successful verified transactions and applicable law. There is no guaranteed income and BNAK does not promise a fixed percentage.</p>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7">
              <Card className="shadow-lg border-none">
                <CardHeader className="bg-background border-b px-6 py-8">
                  <CardTitle className="text-2xl">Application Form</CardTitle>
                  <CardDescription>Fill out your details to apply for a coordinator position.</CardDescription>
                </CardHeader>
                <CardContent className="p-6 md:p-8">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg border-b pb-2">Personal Details</h3>
                        <FormField control={form.control} name="fullName" render={({ field }) => (
                          <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <div className="grid sm:grid-cols-2 gap-4">
                          <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                          )} />
                          <FormField control={form.control} name="phone" render={({ field }) => (
                            <FormItem><FormLabel>Phone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                          )} />
                        </div>
                        <FormField control={form.control} name="nationalId" render={({ field }) => (
                          <FormItem><FormLabel>National ID</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>

                      <div className="space-y-4 pt-4">
                        <h3 className="font-semibold text-lg border-b pb-2">Representation Details</h3>
                        <FormField control={form.control} name="level" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Position Level</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl><SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger></FormControl>
                              <SelectContent>
                                <SelectItem value="county">County Coordinator</SelectItem>
                                <SelectItem value="constituency">Constituency Coordinator</SelectItem>
                                <SelectItem value="ward">Ward Coordinator</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )} />
                        
                        <FormField control={form.control} name="county" render={({ field }) => (
                          <FormItem>
                            <FormLabel>County</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl><SelectTrigger><SelectValue placeholder="Select county" /></SelectTrigger></FormControl>
                              <SelectContent>
                                {KENYA_COUNTIES.map((county) => (
                                  <SelectItem key={county} value={county}>{county}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )} />

                        <div className="grid sm:grid-cols-2 gap-4">
                          <FormField control={form.control} name="constituency" render={({ field }) => (
                            <FormItem><FormLabel>Constituency</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                          )} />
                          <FormField control={form.control} name="ward" render={({ field }) => (
                            <FormItem><FormLabel>Ward</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                          )} />
                        </div>
                      </div>

                      <div className="space-y-4 pt-4">
                         <h3 className="font-semibold text-lg border-b pb-2">KSh 500 payment & motivation</h3>
                        <FormField control={form.control} name="mpesaNumber" render={({ field }) => (
                          <FormItem>
                             <FormLabel>M-Pesa Number for KSh 500 application</FormLabel>
                            <FormControl><Input placeholder="07XXXXXXXX" {...field} /></FormControl>
                            <FormDescription>This number will be prompted for payment.</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="motivation" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Why do you want to be a coordinator?</FormLabel>
                            <FormControl><Textarea rows={4} {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>

                       <p className="text-xs leading-relaxed text-muted-foreground">Your application is sent for BNAK review. This form does not confirm payment or appoint a coordinator; any payment remains pending until verified.</p>
                       <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-white font-bold" disabled={registerMutation.isPending}>
                         {registerMutation.isPending ? "Submitting Application..." : "Submit Senior Coordinator Application"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
// added badge import
import { Badge } from "@/components/ui/badge";