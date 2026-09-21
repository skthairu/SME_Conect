import { useState } from "react";
import { useListEvents, useRegisterForEvent } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, Users, Filter, Clock } from "lucide-react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

export default function Events() {
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("upcoming");
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [location] = useLocation();
  
  // Parse ID from URL if present (from home page register clicks)
  const searchParams = new URLSearchParams(window.location.search);
  const eventIdParam = searchParams.get("id");
  
  useState(() => {
    if (eventIdParam) {
      setSelectedEventId(parseInt(eventIdParam, 10));
    }
  });

  const { data: events, isLoading } = useListEvents({
    upcoming: filter === "upcoming" ? true : filter === "past" ? false : undefined
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-primary py-16 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">SME Events & Expos</h1>
            <p className="text-xl text-primary-foreground/80">
              Connect, learn, and showcase your business at our nationwide and county-level events.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 mt-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 bg-card p-2 rounded-lg border shadow-sm w-fit">
          <div className="flex items-center gap-1">
            <Button 
              variant={filter === "upcoming" ? "default" : "ghost"} 
              size="sm"
              onClick={() => setFilter("upcoming")}
              className="rounded-md"
            >
              Upcoming Events
            </Button>
            <Button 
              variant={filter === "past" ? "default" : "ghost"} 
              size="sm"
              onClick={() => setFilter("past")}
              className="rounded-md"
            >
              Past Events
            </Button>
            <Button 
              variant={filter === "all" ? "default" : "ghost"} 
              size="sm"
              onClick={() => setFilter("all")}
              className="rounded-md"
            >
              All Events
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {isLoading ? (
            Array(6).fill(0).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))
          ) : events?.length === 0 ? (
            <div className="col-span-full py-20 text-center text-muted-foreground">
              <Calendar className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <h3 className="text-xl font-bold text-foreground">No events found</h3>
              <p>There are no {filter} events to display at the moment.</p>
            </div>
          ) : (
            events?.map((event) => (
              <Card key={event.id} className="flex flex-col overflow-hidden hover:shadow-md transition-shadow group border-border">
                {event.imageUrl ? (
                  <div className="h-48 overflow-hidden relative">
                    <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-background/90 text-foreground backdrop-blur-sm shadow-sm border-none font-bold">
                        {format(new Date(event.eventDate), "MMM d")}
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <div className="h-4 bg-primary/20" />
                )}
                
                <CardHeader className={event.imageUrl ? "pt-4" : "pt-6"}>
                  <div className="flex justify-between items-start mb-2 gap-2 flex-wrap">
                    <Badge variant="secondary" className="bg-secondary/10 text-secondary border-none uppercase tracking-wider text-[10px] font-bold">
                      {event.eventType}
                    </Badge>
                    {event.isFeatured && <Badge className="bg-accent text-accent-foreground border-none uppercase tracking-wider text-[10px] font-bold">Featured</Badge>}
                  </div>
                  <CardTitle className="text-xl leading-tight line-clamp-2">{event.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-3 text-sm text-muted-foreground mb-4 bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">{format(new Date(event.eventDate), "EEEE, MMMM d, yyyy")}</p>
                        {event.endDate && <p className="text-xs">until {format(new Date(event.endDate), "MMM d, yyyy")}</p>}
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">{event.venue}</p>
                        <p className="text-xs">{event.county}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="w-4 h-4 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">
                          {event.currentAttendees} {event.maxAttendees ? `/ ${event.maxAttendees}` : ''} attending
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm line-clamp-3 text-muted-foreground">{event.description}</p>
                </CardContent>
                <CardFooter className="border-t pt-4 bg-card">
                  {new Date(event.eventDate) > new Date() ? (
                    <Button 
                      className="w-full font-bold" 
                      onClick={() => setSelectedEventId(event.id)}
                    >
                      Register Now
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full" disabled>
                      Event Ended
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>

      {selectedEventId && (
        <EventRegistrationModal 
          eventId={selectedEventId} 
          isOpen={true} 
          onClose={() => {
            setSelectedEventId(null);
            // clean up url without refresh
            window.history.replaceState({}, '', '/events');
          }} 
          eventTitle={events?.find(e => e.id === selectedEventId)?.title || "Event"}
        />
      )}
    </div>
  );
}

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
});

function EventRegistrationModal({ eventId, isOpen, onClose, eventTitle }: { eventId: number, isOpen: boolean, onClose: () => void, eventTitle: string }) {
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);
  
  const registerMutation = useRegisterForEvent();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    registerMutation.mutate({ id: eventId, data }, {
      onSuccess: () => {
        setIsSuccess(true);
      },
      onError: () => {
        toast({
          title: "Registration Failed",
          description: "There was an error registering for this event.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        {isSuccess ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 text-2xl">✓</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Registered Successfully!</h2>
            <p className="text-muted-foreground mb-6">
              Your spot for {eventTitle} has been reserved. We've sent the details to your email.
            </p>
            <Button onClick={onClose} className="w-full">Done</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">Register for Event</DialogTitle>
              <DialogDescription>
                Reserve your spot for <span className="font-bold text-foreground">{eventTitle}</span>
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                <FormField control={form.control} name="fullName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl><Input type="email" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <div className="pt-4 flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                  <Button type="submit" disabled={registerMutation.isPending}>
                    {registerMutation.isPending ? "Registering..." : "Confirm Registration"}
                  </Button>
                </div>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
