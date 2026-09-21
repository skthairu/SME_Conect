import { useState } from "react";
import { useListSectors, useGetSector, getGetSectorQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, TrendingUp, AlertTriangle, Lightbulb } from "lucide-react";

export default function Sectors() {
  const { data: sectors, isLoading } = useListSectors();
  const [selectedSectorId, setSelectedSectorId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">SME Sectors in Kenya</h1>
            <p className="text-xl text-muted-foreground">
              Explore the diverse industries driving Kenya's economy forward. From agriculture to tech, SMEs are the engine of our national growth.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            Array(8).fill(0).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))
          ) : (
            sectors?.map((sector) => (
              <Card 
                key={sector.id} 
                className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group border-border"
                onClick={() => setSelectedSectorId(sector.id)}
              >
                <div className="h-48 overflow-hidden relative bg-muted">
                  {sector.imageUrl ? (
                    <img src={sector.imageUrl} alt={sector.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary/5">
                      <Briefcase className="w-12 h-12 text-primary/20" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end">
                    <h3 className="text-white font-bold text-xl">{sector.name}</h3>
                  </div>
                </div>
                <CardContent className="p-4 bg-card">
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{sector.description}</p>
                  <div className="flex justify-between items-center text-sm font-medium pt-2 border-t">
                    <div className="flex items-center text-foreground">
                      <Users className="w-4 h-4 mr-1 text-primary" />
                      {sector.totalSMEs.toLocaleString()}
                    </div>
                    <div className="text-secondary">{sector.annualContribution}</div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      <SectorModal 
        sectorId={selectedSectorId} 
        isOpen={!!selectedSectorId} 
        onClose={() => setSelectedSectorId(null)} 
      />
    </div>
  );
}

// Added Users icon missing above
import { Users } from "lucide-react";

function SectorModal({ sectorId, isOpen, onClose }: { sectorId: number | null, isOpen: boolean, onClose: () => void }) {
  const { data: sector, isLoading } = useGetSector(sectorId || 0, { query: { enabled: !!sectorId, queryKey: getGetSectorQueryKey(sectorId || 0) } });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background border-none shadow-2xl">
        {isLoading || !sector ? (
          <div className="p-8 space-y-4">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : (
          <div className="flex flex-col max-h-[90vh]">
            <div className="h-64 md:h-80 relative shrink-0">
              {sector.imageUrl ? (
                <img src={sector.imageUrl} alt={sector.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-primary/20" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 md:p-8 flex flex-col justify-end">
                <Badge className="w-fit mb-3 bg-primary text-white border-none">Sector Profile</Badge>
                <DialogTitle className="text-3xl md:text-5xl font-bold text-white mb-2">{sector.name}</DialogTitle>
                <div className="flex flex-wrap gap-4 text-white/90 text-sm md:text-base">
                  <span className="flex items-center"><Users className="w-4 h-4 mr-2" /> {sector.totalSMEs.toLocaleString()} Registered SMEs</span>
                  <span className="flex items-center"><TrendingUp className="w-4 h-4 mr-2 text-secondary" /> {sector.annualContribution}</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 md:p-8 overflow-y-auto">
              <DialogDescription className="text-lg text-foreground leading-relaxed mb-8">
                {sector.description}
              </DialogDescription>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-lg mb-3 flex items-center"><Briefcase className="w-5 h-5 mr-2 text-primary" /> Key Products & Services</h4>
                    <div className="flex flex-wrap gap-2">
                      {sector.keyProducts.map((product) => (
                        <Badge key={product} variant="secondary" className="bg-secondary/10 text-secondary border-none">{product}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-xl">
                    <h4 className="font-bold text-lg mb-3 flex items-center"><MapPin className="w-5 h-5 mr-2 text-primary" /> Active Regions</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {sector.counties.join(", ")}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-lg mb-3 flex items-center text-amber-600"><Lightbulb className="w-5 h-5 mr-2" /> Opportunities</h4>
                    <ul className="space-y-2">
                      {sector.opportunities.map((opp) => (
                        <li key={opp} className="flex items-start text-sm">
                          <span className="text-amber-500 mr-2 font-bold">•</span> 
                          <span className="text-muted-foreground">{opp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg mb-3 flex items-center text-red-500"><AlertTriangle className="w-5 h-5 mr-2" /> Current Challenges</h4>
                    <ul className="space-y-2">
                      {sector.challenges.map((challenge) => (
                        <li key={challenge} className="flex items-start text-sm">
                          <span className="text-red-400 mr-2 font-bold">•</span> 
                          <span className="text-muted-foreground">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
