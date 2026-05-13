import axios from "axios";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { regions } from "@/lib/mock-data";
import { Sparkles, Sprout, TrendingUp, Calendar } from "lucide-react";

export const Route = createFileRoute("/recommendation")({
  component: RecommendationPage,
});

function RecommendationPage() {
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  const [form, setForm] = useState({
    region: "analamanga",
    season: "Mafana_sy_Maina",
    soil: "volcanic",
    climate: "temperate",
  });

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setGenerated(false);

      console.log("FORM SENT:", form);

      const res = await axios.post("http://127.0.0.1:8000/api/culture_from_caracteristics/", {
        caracteristic: form,
      });

      console.log("API RESPONSE:", res.data);

      const data = res.data?.cultures || [];

      setRecommendations(data);
      setGenerated(true);
    } catch (err) {
      console.log("API ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell
      title="Tolo-kevitra Mahay"
      subtitle="Akambano amin'ny ontology momba ny fambolena ny toe-javatra misy anao mba hahitana ny voly mety indrindra."
    >
      <div className="grid lg:grid-cols-5 gap-6">
        {/* LEFT PANEL (IDENTICAL DESIGN) */}
        <Card className="lg:col-span-2 p-6 border-border shadow-soft h-fit sticky top-24">
          <h3 className="font-display text-xl mb-1">Toe-javatra misy anao</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Ampiasain'ny reasoner ireto mba hanafohezana ny knowledge graph.
          </p>

          <div className="space-y-4">
            {/* REGION */}
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Faritra
              </Label>
              <Select
                value={form.region}
                onValueChange={(v) => setForm((p) => ({ ...p, region: v }))}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((r) => (
                    <SelectItem key={r.id} value={r.id}>
                      {r.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* SEASON */}
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Vanim-potoana
              </Label>
              <Select
                value={form.season}
                onValueChange={(v) => setForm((p) => ({ ...p, season: v }))}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rainy">Fahavaratra (Nov–Apr)</SelectItem>
                  <SelectItem value="dry">Maina (May–Oct)</SelectItem>
                  <SelectItem value="cool">Tendrombohitra mangatsiaka</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* SOIL */}
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Karazana tany
              </Label>
              <Select value={form.soil} onValueChange={(v) => setForm((p) => ({ ...p, soil: v }))}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="volcanic">Tany volkaniaka lonaka</SelectItem>
                  <SelectItem value="alluvial">Tany avy amin'ny sedimenta renirano</SelectItem>
                  <SelectItem value="lateritic">Tany lateritika</SelectItem>
                  <SelectItem value="sandy">Tany fasika</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* CLIMATE */}
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Toetrandro
              </Label>
              <Select
                value={form.climate}
                onValueChange={(v) => setForm((p) => ({ ...p, climate: v }))}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="temperate">Tendrombohitra antonony</SelectItem>
                  <SelectItem value="tropical">Tropikaly mando</SelectItem>
                  <SelectItem value="dry">Tropikaly maina</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* BUTTON (UNCHANGED STYLE) */}
            <Button
              className="w-full bg-leaf hover:bg-leaf/90 text-leaf-foreground gap-2 mt-2"
              size="lg"
              onClick={handleGenerate}
              disabled={loading}
            >
              <Sparkles className="h-4 w-4" />
              {loading ? "Miasa..." : "Mamorona tolo-kevitra"}
            </Button>
          </div>
        </Card>

        {/* RIGHT PANEL (UNCHANGED UI) */}
        <div className="lg:col-span-3 space-y-4">
          {!generated ? (
            <Card className="p-12 border-dashed flex flex-col items-center justify-center min-h-[500px] text-center">
              <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center mb-4 animate-float">
                <Sprout className="h-8 w-8 text-leaf" />
              </div>
              <h3 className="font-display text-2xl">Lazao anay momba ny taninao</h3>
              <p className="text-muted-foreground mt-2 max-w-sm">
                Hisaintsainan'ny semantic engine ny ontology ary handahatra ny voly mety.
              </p>
            </Card>
          ) : (
            recommendations.map((c, i) => (
              <Card
                key={c.name || i}
                className="p-6 border-border shadow-soft hover:shadow-elegant transition group"
              >
                <div className="flex items-start gap-5">
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 bg-gradient-leaf rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition" />
                    <div className="relative h-20 w-20 rounded-2xl bg-gradient-leaf flex flex-col items-center justify-center text-leaf-foreground">
                      <span className="font-display text-2xl">{c.score}</span>
                      <span className="text-[9px] uppercase tracking-wider opacity-80">
                        mifanaraka
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <h3 className="font-display text-2xl">{c.name}</h3>
                      <span className="text-xs font-mono text-muted-foreground">#{i + 1}</span>
                    </div>

                    <p className="text-sm text-muted-foreground mt-1.5">{c.note}</p>

                    <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-sm">
                        <TrendingUp className="h-4 w-4 text-leaf" />
                        <span className="text-muted-foreground">Vokatra</span>
                        <span className="font-mono">{c.yield}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-terracotta" />
                        <span className="text-muted-foreground">Vanim-potoana</span>
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
