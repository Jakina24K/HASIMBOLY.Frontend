import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { regions } from "@/lib/mock-data";
import { useState } from "react";
import { MapPin } from "lucide-react";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Madagascar Map — VerdantAI" },
      { name: "description", content: "Interactive map of agricultural regions across Madagascar." },
    ],
  }),
  component: MapPage,
});

// Stylized region pin coordinates (relative %) — placed over an SVG silhouette of Madagascar.
const pins: Record<string, { x: number; y: number }> = {
  antananarivo: { x: 42, y: 52 },
  alaotra: { x: 50, y: 42 },
  atsinanana: { x: 58, y: 55 },
  vakinankaratra: { x: 42, y: 60 },
  sava: { x: 55, y: 18 },
  menabe: { x: 25, y: 60 },
};

function MapPage() {
  const [active, setActive] = useState(regions[0]);

  return (
    <AppShell title="Madagascar Map" subtitle="Click a region to see its agricultural profile.">
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 border-border shadow-soft">
          <div className="relative w-full aspect-[3/4] max-w-md mx-auto bg-gradient-to-b from-secondary/40 to-background rounded-2xl overflow-hidden">
            <svg viewBox="0 0 100 130" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
              {/* Stylized Madagascar silhouette */}
              <path
                d="M50 5 Q62 8 65 18 Q68 28 64 38 Q70 48 68 60 Q72 72 64 84 Q60 96 52 108 Q44 120 38 122 Q30 118 28 108 Q24 96 28 84 Q22 72 26 60 Q22 48 30 38 Q28 28 34 18 Q40 8 50 5 Z"
                fill="oklch(0.55 0.14 145 / 0.18)"
                stroke="oklch(0.42 0.08 145)"
                strokeWidth="0.5"
              />
              {/* Texture lines */}
              {Array.from({ length: 8 }).map((_, i) => (
                <line key={i} x1="20" x2="80" y1={20 + i * 12} y2={20 + i * 12} stroke="oklch(0.42 0.08 145 / 0.08)" strokeWidth="0.3" />
              ))}
            </svg>

            {regions.map((r) => {
              const pos = pins[r.id];
              if (!pos) return null;
              const isActive = active.id === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => setActive(r)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                >
                  <span className={`relative block h-3 w-3 rounded-full ${isActive ? "bg-terracotta animate-pulse-ring" : "bg-leaf"}`}>
                    <span className="absolute inset-0 rounded-full bg-current animate-ping opacity-40" />
                  </span>
                  <span className={`absolute left-5 top-1/2 -translate-y-1/2 text-xs font-medium whitespace-nowrap px-2 py-0.5 rounded-md transition ${isActive ? "bg-terracotta text-terracotta-foreground" : "bg-card text-foreground opacity-0 group-hover:opacity-100"}`}>
                    {r.name}
                  </span>
                </button>
              );
            })}
          </div>
        </Card>

        <Card className="p-6 border-border shadow-soft h-fit">
          <div className="flex items-center gap-2 text-terracotta mb-2">
            <MapPin className="h-4 w-4" />
            <span className="text-xs uppercase tracking-wider font-medium">Selected region</span>
          </div>
          <h3 className="font-display text-3xl mb-4">{active.name}</h3>

          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Climate</dt>
              <dd className="font-medium">{active.climate}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Dominant soil</dt>
              <dd className="font-medium">{active.soil}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Suited crops</dt>
              <dd className="flex flex-wrap gap-2">
                {active.crops.map((c) => (
                  <span key={c} className="px-2.5 py-1 rounded-md bg-leaf/10 text-leaf text-xs font-mono">{c}</span>
                ))}
              </dd>
            </div>
          </dl>
        </Card>
      </div>
    </AppShell>
  );
}
