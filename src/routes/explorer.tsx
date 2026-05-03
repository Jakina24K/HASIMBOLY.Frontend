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
      { title: "Fitrandrahana Fahalalana — VerdantAI" },
      {
        name: "description",
        content:
          "Tsidiho ny ontology momba ny fambolena: voly, tany, toetrandro, zezika ary ny fifandraisana misy eo amin'izy ireo.",
      },
    ],
  }),
  component: ExplorerPage,
});

function ExplorerPage() {
  const [q, setQ] = useState("");

  const filtered = ontologyConcepts.filter((c) =>
    [c.subject, c.predicate, c.object].some((s) => s.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <AppShell
      title="Fitrandrahana Fahalalana"
      subtitle="Ny ontology momba ny fambolena dia azo zahana amin'ny endrika triples. Ny rohy tsirairay dia mitahiry fahalalana manokana."
    >
      {/* Statistiques */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {[
          {
            label: "Voly",
            value: 42,
            hint: "Mangahazo, Vary, Lavanila…",
          },
          {
            label: "Fifandraisana",
            value: 187,
            hint: "thrivesIn, requires, tolerates…",
          },
          {
            label: "Fitsipika azo",
            value: 64,
            hint: "Avy amin'ny reasoner",
          },
        ].map((s) => (
          <Card key={s.label} className="p-6 border-border shadow-soft">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-leaf/10 flex items-center justify-center">
                <Network className="h-5 w-5 text-leaf" />
              </div>

              <div>
                <div className="font-display text-3xl">{s.value}</div>

                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mt-3 italic">{s.hint}</p>
          </Card>
        ))}
      </div>

      {/* Triple Explorer */}
      <Card className="p-6 border-border shadow-soft">
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <div>
            <h3 className="font-display text-2xl">Mpitety Triple</h3>

            <p className="text-sm text-muted-foreground">subject — predicate — object</p>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Hitady ao amin'ny graph..."
              className="pl-9"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filtered.map((c) => (
            <div
              key={c.id}
              className="group p-4 rounded-xl border border-border hover:border-leaf/50 hover:shadow-soft transition bg-card"
            >
              <div className="flex items-center gap-3 flex-wrap">
                {/* Subject */}
                <span className="px-3 py-1.5 rounded-md bg-leaf/10 text-leaf font-mono text-sm">
                  {c.subject}
                </span>

                <ArrowRight className="h-4 w-4 text-muted-foreground" />

                {/* Predicate */}
                <span className="px-3 py-1.5 rounded-md bg-secondary text-muted-foreground font-mono text-xs italic">
                  {c.predicate}
                </span>

                <ArrowRight className="h-4 w-4 text-muted-foreground" />

                {/* Object */}
                <span className="px-3 py-1.5 rounded-md bg-terracotta/10 text-terracotta font-mono text-sm">
                  {c.object}
                </span>

                {/* Strength */}
                <span className="ml-auto text-xs font-mono text-muted-foreground">
                  hery {c.strength.toFixed(2)}
                </span>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">Tsy misy triple mifanaraka.</p>
          )}
        </div>
      </Card>
    </AppShell>
  );
}
