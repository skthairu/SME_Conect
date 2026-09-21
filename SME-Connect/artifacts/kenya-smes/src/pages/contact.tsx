import { MessageCircle, PhoneCall, Mail, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Contact() {
  return (
    <div className="min-h-screen bg-muted/20">
      <section className="relative overflow-hidden bg-foreground text-background py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-foreground to-foreground z-0" />
        
        <div className="app-shell relative z-10">
          <div className="max-w-2xl">
            <Badge className="bg-primary/20 text-primary-foreground border-0 font-bold mb-6 px-3 py-1 flex w-max items-center gap-2">
              <PhoneCall className="w-4 h-4" /> BNAK SUPPORT
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
              Get in Touch with BNAK
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8">
              Whether you need business advice, support with your membership, or have a general inquiry, our team is ready to help you grow.
            </p>
          </div>
        </div>
      </section>

      <section className="app-shell py-12 -mt-12 lg:-mt-20 relative z-20">
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Call & WhatsApp Card */}
          <Card className="border-border shadow-md md:col-span-2 overflow-hidden flex flex-col justify-between">
            <div className="bg-secondary/10 p-6 lg:p-8 flex-1">
              <h2 className="text-2xl font-black mb-4">Call or WhatsApp</h2>
              <p className="text-muted-foreground mb-8">
                0711422163 is BNAK's official number for both direct voice calls and WhatsApp messages.
              </p>
              
              <div className="bg-background rounded-xl p-4 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-6 border shadow-sm">
                <div className="text-center sm:text-left">
                  <p className="text-sm font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Official Number</p>
                  <p className="text-3xl font-black tracking-tight">0711 422 163</p>
                </div>
                
                <div className="flex gap-3 w-full sm:w-auto">
                  <Button asChild size="lg" className="flex-1 sm:flex-none gap-2 font-bold shadow-sm" data-testid="button-contact-call">
                    <a href="tel:+254711422163">
                      <PhoneCall className="w-5 h-5" />
                      Call Now
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="flex-1 sm:flex-none gap-2 font-bold border-secondary text-secondary hover:bg-secondary hover:text-white" data-testid="button-contact-whatsapp">
                    <a href="https://wa.me/254711422163" target="_blank" rel="noreferrer">
                      <MessageCircle className="w-5 h-5" />
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Email Card */}
          <Card className="border-border shadow-md overflow-hidden">
            <div className="bg-primary/5 p-6 lg:p-8 h-full flex flex-col justify-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                <Mail className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold mb-2">Email Us</h2>
              <p className="text-muted-foreground mb-6 text-sm">
                For official correspondence, partnerships, or detailed inquiries, drop us an email.
              </p>
              <Button asChild variant="outline" className="w-full gap-2 border-primary text-primary hover:bg-primary hover:text-white" data-testid="button-contact-email">
                <a href="mailto:biasharandogoassociation@gmail.com">
                  Send an Email
                </a>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* County support */}
      <section className="app-shell py-12 lg:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-4">County Support</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Use the main contact number or coordinator portal to find the appropriate BNAK support contact.</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="border-border bg-card shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-8 flex gap-6">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Coordinator Support</h3>
                  <p className="text-muted-foreground mb-4">
                    Reach out to our main line to get connected to your local county coordinator.
                  </p>
                  <Button asChild variant="link" className="px-0 text-primary h-auto" data-testid="link-contact-coordinators">
                    <a href="/coordinators">View Coordinators Portal</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
