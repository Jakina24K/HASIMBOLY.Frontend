import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { recentDiagnoses, alerts, usageStats, cropRecommendations } from "@/lib/mock-data";
import { ArrowUpRight, TrendingUp, AlertTriangle, Microscope, Sprout, Activity } from "lucide-react";
import heroLeaf from "@/assets/hero-leaf.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — VerdantAI" },
      { name: "description", content: "Plant disease detection and intelligent crop recommendation for Madagascar farmers." },
    ],
  }),
  component: Dashboard,
});

function Stat({ icon: Icon, label, value, delta, tone }: { icon: any; label: string; value: string; delta: string; tone: "leaf" | "terracotta" | "moss" }) {
  const toneClass = tone === "leaf" ? "bg-leaf/10 text-leaf" : tone === "terracotta" ? "bg-terracotta/10 text-terracotta" : "bg-muted text-moss";
  return (
    <Card className="p-6 border-border shadow-soft hover:shadow-elegant transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${toneClass}`}>
          <Icon className="h-5 w-5" />
        </div>
        <span className="text-xs font-mono text-success">↑ {delta}</span>
      </div>
      <div className="mt-4">
        <div className="font-display text-3xl text-foreground">{value}</div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{label}</div>
      </div>
    </Card>
  );
}

function Dashboard() {
  const max = Math.max(...usageStats.map((s) => s.diagnoses));
  return (
    <AppShell title="Good morning, Rasoa" subtitle="Here's what your fields are telling us today.">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-hero text-primary-foreground mb-8 shadow-elegant">
        <img src={heroLeaf} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity" width={1600} height={1024} />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-transparent" />
        <div className="relative px-8 lg:px-12 py-12 lg:py-16 max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-leaf font-medium">
            <span className="h-1 w-8 bg-leaf" /> Today's outlook
          </span>
          <h2 className="font-display text-4xl lg:text-5xl mt-4 leading-tight text-balance">
            Two fields need attention. <span className="italic text-leaf">Three are thriving.</span>
          </h2>
          <p className="mt-4 text-primary-foreground/70 max-w-lg">
            Combined ML diagnostics and semantic reasoning surface what matters across all your plots.
          </p>
          <div className="flex gap-3 mt-8">
            <Button asChild size="lg" className="bg-leaf hover:bg-leaf/90 text-leaf-foreground">
              <Link to="/detection">Diagnose a leaf</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/recommendation">Get recommendations</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Stat icon={Microscope} label="Diagnoses this week" value="128" delta="12%" tone="leaf" />
        <Stat icon={Sprout} label="Active recommendations" value="34" delta="8%" tone="moss" />
        <Stat icon={AlertTriangle} label="Active alerts" value="3" delta="1" tone="terracotta" />
        <Stat icon={Activity} label="Avg. confidence" value="91%" delta="2.4%" tone="leaf" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent diagnoses */}
        <Card className="lg:col-span-2 p-6 border-border shadow-soft">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display text-xl">Recent diagnoses</h3>
              <p className="text-sm text-muted-foreground">Latest five field analyses</p>
            </div>
            <Link to="/history" className="text-sm text-leaf hover:underline inline-flex items-center gap-1">
              View all <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {recentDiagnoses.map((d) => (
              <div key={d.id} className="py-4 flex items-center gap-4">
                <div className="h-11 w-11 rounded-lg bg-secondary flex items-center justify-center font-display text-leaf">
                  {d.crop[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{d.crop} — <span className={d.disease === "Healthy" ? "text-success" : "text-terracotta"}>{d.disease}</span></div>
                  <div className="text-xs text-muted-foreground mt-0.5">{d.region} · {d.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-sm">{d.confidence}%</div>
                  <div className="h-1 w-20 bg-muted rounded-full mt-1.5 overflow-hidden">
                    <div className="h-full bg-leaf" style={{ width: `${d.confidence}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Alerts */}
        <Card className="p-6 border-border shadow-soft">
          <h3 className="font-display text-xl mb-1">Field alerts</h3>
          <p className="text-sm text-muted-foreground mb-5">Reasoned from climate + ontology</p>
          <div className="space-y-3">
            {alerts.map((a) => (
              <div key={a.id} className="p-4 rounded-xl border border-border bg-secondary/40">
                <div className="flex items-start gap-3">
                  <span className={`mt-1 h-2 w-2 rounded-full shrink-0 ${a.level === "high" ? "bg-destructive" : a.level === "medium" ? "bg-warning" : "bg-leaf"}`} />
                  <div className="flex-1">
                    <div className="font-medium text-sm">{a.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">{a.region} · {a.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Weekly chart */}
        <Card className="p-6 border-border shadow-soft lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display text-xl">Weekly activity</h3>
              <p className="text-sm text-muted-foreground">Diagnoses vs recommendations</p>
            </div>
            <TrendingUp className="h-4 w-4 text-leaf" />
          </div>
          <div className="flex items-end justify-between gap-3 h-48">
            {usageStats.map((s) => (
              <div key={s.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex items-end gap-1 h-40">
                  <div className="flex-1 bg-leaf/80 rounded-t-md hover:bg-leaf transition" style={{ height: `${(s.diagnoses / max) * 100}%` }} />
                  <div className="flex-1 bg-terracotta/70 rounded-t-md hover:bg-terracotta transition" style={{ height: `${(s.recommendations / max) * 100}%` }} />
                </div>
                <span className="text-xs text-muted-foreground font-mono">{s.day}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-leaf" /> Diagnoses</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-terracotta" /> Recommendations</span>
          </div>
        </Card>

        {/* Top crops */}
        <Card className="p-6 border-border shadow-soft">
          <h3 className="font-display text-xl mb-1">Top recommended</h3>
          <p className="text-sm text-muted-foreground mb-5">For your context</p>
          <div className="space-y-4">
            {cropRecommendations.slice(0, 3).map((c) => (
              <div key={c.name}>
                <div className="flex justify-between items-baseline mb-1.5">
                  <span className="font-medium text-sm">{c.name}</span>
                  <span className="font-mono text-xs text-leaf">{c.score}</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-leaf" style={{ width: `${c.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
