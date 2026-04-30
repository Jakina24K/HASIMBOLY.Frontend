import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ontologyConcepts } from "@/lib/mock-data";
import { Search, Network, ArrowRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/explorer")({
  head: () => ({
    meta: [
      { title: "Knowledge Explorer — VerdantAI" },
      { name: "description", content: "Browse the agricultural ontology: crops, soils, climates, fertilizers and their relationships." },
    ],
  }),
  component: ExplorerPage,
});

function ExplorerPage() {
  const [q, setQ] = useState("");
  const filtered = ontologyConcepts.filter((c) =>
    [c.subject, c.predicate, c.object].some((s) => s.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <AppShell title="Knowledge Explorer" subtitle="The agricultural ontology, browsable as triples. Each link encodes domain expertise.">
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {[
          { label: "Crops", value: 42, hint: "Cassava, Rice, Vanilla…" },
          { label: "Relationships", value: 187, hint: "thrivesIn, requires, tolerates…" },
          { label: "Inferred rules", value: 64, hint: "Derived via reasoner" },
        ].map((s) => (
          <Card key={s.label} className="p-6 border-border shadow-soft">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-leaf/10 flex items-center justify-center">
                <Network className="h-5 w-5 text-leaf" />
              </div>
              <div>
                <div className="font-display text-3xl">{s.value}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3 italic">{s.hint}</p>
          </Card>
        ))}
      </div>

      <Card className="p-6 border-border shadow-soft">
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <div>
            <h3 className="font-display text-2xl">Triple browser</h3>
            <p className="text-sm text-muted-foreground">subject — predicate — object</p>
          </div>
          <div className="relative w-full sm:w-80">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search the graph…" className="pl-9" />
          </div>
        </div>

        <div className="space-y-3">
          {filtered.map((c) => (
            <div key={c.id} className="group p-4 rounded-xl border border-border hover:border-leaf/50 hover:shadow-soft transition bg-card">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-3 py-1.5 rounded-md bg-leaf/10 text-leaf font-mono text-sm">{c.subject}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <span className="px-3 py-1.5 rounded-md bg-secondary text-muted-foreground font-mono text-xs italic">{c.predicate}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <span className="px-3 py-1.5 rounded-md bg-terracotta/10 text-terracotta font-mono text-sm">{c.object}</span>
                <span className="ml-auto text-xs font-mono text-muted-foreground">strength {c.strength.toFixed(2)}</span>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No triples match.</p>
          )}
        </div>
      </Card>
    </AppShell>
  );
}
