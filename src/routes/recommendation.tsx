import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { regions, cropRecommendations } from "@/lib/mock-data";
import { Sparkles, Sprout, TrendingUp, Calendar } from "lucide-react";

export const Route = createFileRoute("/recommendation")({
  head: () => ({
    meta: [
      { title: "Smart Recommendation — VerdantAI" },
      { name: "description", content: "Get crop recommendations based on region, season, soil and climate using semantic reasoning." },
    ],
  }),
  component: RecommendationPage,
});

function RecommendationPage() {
  const [generated, setGenerated] = useState(false);

  return (
    <AppShell title="Smart Recommendation" subtitle="Combine your context with our agricultural ontology to surface the best-fit crops.">
      <div className="grid lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-2 p-6 border-border shadow-soft h-fit sticky top-24">
          <h3 className="font-display text-xl mb-1">Your context</h3>
          <p className="text-sm text-muted-foreground mb-6">The reasoner uses these to narrow the knowledge graph.</p>

          <div className="space-y-4">
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Region</Label>
              <Select defaultValue="antananarivo">
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {regions.map((r) => <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Season</Label>
              <Select defaultValue="rainy">
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="rainy">Rainy (Nov–Apr)</SelectItem>
                  <SelectItem value="dry">Dry (May–Oct)</SelectItem>
                  <SelectItem value="cool">Cool highland</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Soil type</Label>
              <Select defaultValue="volcanic">
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="volcanic">Volcanic loam</SelectItem>
                  <SelectItem value="alluvial">Alluvial</SelectItem>
                  <SelectItem value="lateritic">Lateritic</SelectItem>
                  <SelectItem value="sandy">Sandy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Climate</Label>
              <Select defaultValue="temperate">
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="temperate">Highland temperate</SelectItem>
                  <SelectItem value="tropical">Tropical humid</SelectItem>
                  <SelectItem value="dry">Tropical dry</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full bg-leaf hover:bg-leaf/90 text-leaf-foreground gap-2 mt-2" size="lg" onClick={() => setGenerated(true)}>
              <Sparkles className="h-4 w-4" /> Generate recommendations
            </Button>
          </div>
        </Card>

        <div className="lg:col-span-3 space-y-4">
          {!generated ? (
            <Card className="p-12 border-dashed flex flex-col items-center justify-center min-h-[500px] text-center">
              <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center mb-4 animate-float">
                <Sprout className="h-8 w-8 text-leaf" />
              </div>
              <h3 className="font-display text-2xl">Tell us about your land</h3>
              <p className="text-muted-foreground mt-2 max-w-sm">The semantic engine will reason over the ontology and rank suitable crops.</p>
            </Card>
          ) : (
            cropRecommendations.map((c, i) => (
              <Card key={c.name} className="p-6 border-border shadow-soft hover:shadow-elegant transition group">
                <div className="flex items-start gap-5">
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 bg-gradient-leaf rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition" />
                    <div className="relative h-20 w-20 rounded-2xl bg-gradient-leaf flex flex-col items-center justify-center text-leaf-foreground">
                      <span className="font-display text-2xl">{c.score}</span>
                      <span className="text-[9px] uppercase tracking-wider opacity-80">match</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <h3 className="font-display text-2xl">{c.name}</h3>
                      <span className="text-xs font-mono text-muted-foreground">#{i + 1} of {cropRecommendations.length}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{c.note}</p>
                    <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-sm">
                        <TrendingUp className="h-4 w-4 text-leaf" />
                        <span className="text-muted-foreground">Yield</span>
                        <span className="font-mono">{c.yield}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-terracotta" />
                        <span className="text-muted-foreground">Season</span>
                        <span className="font-mono">{c.season}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </AppShell>
  );
}
