import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { AppLayout } from "@/components/layout/AppLayout";

import Contact from "@/pages/contact";

import Home from "@/pages/home";
import About from "@/pages/about";
import Membership from "@/pages/membership";
import Coordinators from "@/pages/coordinators";
import Sectors from "@/pages/sectors";
import Events from "@/pages/events";
import Partners from "@/pages/partners";
import Programs from "@/pages/programs";
import Marketplace from "@/pages/marketplace";
import Admin from "@/pages/admin";
import Services from "@/pages/services";
import Gallery from "@/pages/gallery";
import Donate from "@/pages/donate";

import BusinessHub from "@/pages/business-hub";
import AskBnak from "@/pages/ask-bnak";
import MoneyCentre from "@/pages/money-centre";
import BusinessHealth from "@/pages/business-health";
import Alerts from "@/pages/alerts";
import Recognition from "@/pages/recognition";
import EMobility from "@/pages/e-mobility";
import EMobilityRegister from "@/pages/e-mobility-register";

const queryClient = new QueryClient();

function Router() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/membership" component={Membership} />
        <Route path="/coordinators" component={Coordinators} />
        <Route path="/sectors" component={Sectors} />
        <Route path="/events" component={Events} />
        <Route path="/partners" component={Partners} />
        <Route path="/programs" component={Programs} />
        <Route path="/soko" component={Marketplace} />
        <Route path="/marketplace" component={Marketplace} />
         <Route path="/services" component={Services} />
         <Route path="/gallery" component={Gallery} />
        <Route path="/admin" component={Admin} />
        <Route path="/about" component={About} />
        <Route path="/donate" component={Donate} />
        
        <Route path="/business-hub" component={BusinessHub} />
        <Route path="/ask-bnak" component={AskBnak} />
        <Route path="/money-centre" component={MoneyCentre} />
        <Route path="/business-health" component={BusinessHealth} />
        <Route path="/alerts" component={Alerts} />
        <Route path="/recognition" component={Recognition} />
        <Route path="/e-mobility" component={EMobility} />
        <Route path="/e-mobility/register" component={EMobilityRegister} />
        
        <Route path="/contact" component={Contact} />
        
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
