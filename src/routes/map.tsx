import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  madagascarRegions,
  productivityColor,
  productivityLabel,
  type RegionData,
} from "@/lib/madagascar-regions";
import { Search, MapPin, Layers, Sprout, CloudRain, Mountain, Lightbulb } from "lucide-react";

const MadagascarLeafletMap = lazy(() =>
  import("@/components/MadagascarLeafletMap").then((m) => ({ default: m.MadagascarLeafletMap })),
);

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Madagascar Agricultural Map — VerdantAI" },
      {
        name: "description",
        content:
          "Explore Madagascar's regions and discover climate, soils, suitable crops and farming advice on an interactive agricultural map.",
      },
    ],
  }),
  ssr: false,
  component: MapPage,
});

type LayerKey = "productivity" | "rainfall" | "soil" | "climate" | "crops";

const layerOptions: { value: LayerKey; label: string }[] = [
  { value: "productivity", label: "Productivity" },
  { value: "rainfall", label: "Rainfall zones" },
  { value: "soil", label: "Soil types" },
  { value: "climate", label: "Climate zones" },
  { value: "crops", label: "Crop suitability" },
];

function MapPage() {
  const [selected, setSelected] = useState<RegionData>(madagascarRegions[0]);
  const [search, setSearch] = useState("");
  const [layer, setLayer] = useState<LayerKey>("productivity");
  const [productivityFilter, setProductivityFilter] = useState<string>("all");

  const filteredRegions = useMemo(() => {
    return madagascarRegions.filter((r) => {
      const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase());
      const matchesFilter =
        productivityFilter === "all" || r.productivity === productivityFilter;
      return matchesSearch && matchesFilter;
    });
  }, [search, productivityFilter]);

  return (
    <AppShell
      title="Madagascar Agricultural Map"
      subtitle="Explore regions and farming opportunities"
    >
      {/* Toolbar */}
      <Card className="p-4 mb-6 border-border">
        <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search a region…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <Select value={productivityFilter} onValueChange={setProductivityFilter}>
            <SelectTrigger className="w-full lg:w-[180px]">
              <SelectValue placeholder="Productivity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All productivity</SelectItem>
              <SelectItem value="high">High potential</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="difficult">Difficult zone</SelectItem>
            </SelectContent>
          </Select>

          <Select value={layer} onValueChange={(v) => setLayer(v as LayerKey)}>
            <SelectTrigger className="w-full lg:w-[200px]">
              <Layers className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {layerOptions.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() => {
              setSearch("");
              setProductivityFilter("all");
              setLayer("productivity");
              setSelected(madagascarRegions[0]);
            }}
          >
            Reset
          </Button>
        </div>

        {/* Quick filters / legend */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-border">
          <span className="text-xs uppercase tracking-wider text-muted-foreground mr-1">
            Legend
          </span>
          {(["high", "medium", "low", "difficult"] as const).map((p) => (
            <button
              key={p}
              onClick={() =>
                setProductivityFilter(productivityFilter === p ? "all" : p)
              }
              className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border transition ${
                productivityFilter === p ? "border-foreground" : "border-border"
              }`}
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: productivityColor[p] }}
              />
              {productivityLabel[p]}
            </button>
          ))}
        </div>
      </Card>

      {/* Main split */}
      <div className="grid lg:grid-cols-10 gap-6">
        {/* Map */}
        <Card className="lg:col-span-7 p-0 overflow-hidden border-border shadow-soft relative">
          <div className="h-[520px] lg:h-[640px] relative">
            <Suspense
              fallback={<div className="h-full w-full bg-muted animate-pulse" />}
            >
              <MadagascarLeafletMap
                selected={selected}
                onSelect={setSelected}
                layer={layer}
                highlightId={filteredRegions[0]?.id}
              />
            </Suspense>
          </div>
          {/* Region quick list overlay */}
          <div className="absolute top-3 left-3 z-[400] w-56 max-h-[60%] hidden md:block">
            <Card className="p-2 bg-card/95 backdrop-blur border-border">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground px-2 py-1">
                Regions ({filteredRegions.length})
              </div>
              <ScrollArea className="h-[260px]">
                <div className="space-y-0.5">
                  {filteredRegions.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setSelected(r)}
                      className={`w-full text-left text-xs px-2 py-1.5 rounded flex items-center gap-2 hover:bg-accent ${
                        selected.id === r.id ? "bg-accent font-medium" : ""
                      }`}
                    >
                      <span
                        className="h-2 w-2 rounded-full shrink-0"
                        style={{ backgroundColor: productivityColor[r.productivity] }}
                      />
                      {r.name}
                    </button>
                  ))}
                  {filteredRegions.length === 0 && (
                    <p className="text-xs text-muted-foreground px-2 py-3">
                      No regions match.
                    </p>
                  )}
                </div>
              </ScrollArea>
            </Card>
          </div>
        </Card>

        {/* Right panel */}
        <Card className="lg:col-span-3 p-6 border-border shadow-soft">
          <div className="flex items-center gap-2 text-terracotta mb-1">
            <MapPin className="h-4 w-4" />
            <span className="text-xs uppercase tracking-wider font-medium">
              Selected region
            </span>
          </div>
          <h3 className="font-display text-3xl mb-1">{selected.name}</h3>
          <div className="flex items-center gap-2 mb-4">
            <Badge
              style={{
                backgroundColor: productivityColor[selected.productivity],
                color: "white",
              }}
            >
              {productivityLabel[selected.productivity]}
            </Badge>
            <span className="text-xs text-muted-foreground">
              Fertility {selected.fertility}/100
            </span>
          </div>

          <Tabs defaultValue="overview">
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
              <TabsTrigger value="crops" className="text-xs">Crops</TabsTrigger>
              <TabsTrigger value="climate" className="text-xs">Climate</TabsTrigger>
              <TabsTrigger value="soil" className="text-xs">Soil</TabsTrigger>
              <TabsTrigger value="advice" className="text-xs">Advice</TabsTrigger>
            </TabsList>

            <ScrollArea className="h-[460px] mt-4 pr-2">
              <TabsContent value="overview" className="space-y-4 mt-0">
                <p className="text-sm leading-relaxed">{selected.summary}</p>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">Soil fertility</span>
                    <span className="font-mono">{selected.fertility}%</span>
                  </div>
                  <Progress value={selected.fertility} />
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <Stat label="Climate" value={selected.climate} />
                  <Stat label="Soil" value={selected.soil} />
                  <Stat label="Rainfall" value={selected.rainfall} />
                  <Stat label="Temperature" value={selected.temperature} />
                </div>

                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    Risks
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.risks.map((r) => (
                      <Badge key={r} variant="destructive" className="font-normal">
                        {r}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="crops" className="space-y-3 mt-0">
                {selected.crops.map((c) => (
                  <div key={c.name} className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm font-medium flex items-center gap-2">
                        <Sprout className="h-3.5 w-3.5 text-leaf" />
                        {c.name}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">
                        {c.suitability}%
                      </span>
                    </div>
                    <Progress value={c.suitability} />
                    <div className="text-xs text-muted-foreground">
                      Best season: {c.season}
                    </div>
                  </div>
                ))}
                <div className="pt-2">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    Recommended fertilizers
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.fertilizers.map((f) => (
                      <Badge key={f} variant="secondary" className="font-normal">
                        {f}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="climate" className="space-y-3 mt-0">
                <Stat label="Climate type" value={selected.climate} icon={<CloudRain className="h-3.5 w-3.5" />} />
                <Stat label="Annual rainfall" value={selected.rainfall} />
                <Stat label="Temperature range" value={selected.temperature} />
                <p className="text-sm text-muted-foreground leading-relaxed pt-2">
                  Climate-driven planting windows are reflected in each crop's recommended season.
                </p>
              </TabsContent>

              <TabsContent value="soil" className="space-y-3 mt-0">
                <Stat label="Soil type" value={selected.soil} icon={<Mountain className="h-3.5 w-3.5" />} />
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">Fertility score</span>
                    <span className="font-mono">{selected.fertility}/100</span>
                  </div>
                  <Progress value={selected.fertility} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    Suggested amendments
                  </div>
                  <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                    {selected.fertilizers.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="advice" className="space-y-2 mt-0">
                {selected.advice.map((a) => (
                  <div
                    key={a}
                    className="flex gap-2 text-sm p-3 rounded-md bg-leaf/5 border border-leaf/15"
                  >
                    <Lightbulb className="h-4 w-4 text-leaf shrink-0 mt-0.5" />
                    <span>{a}</span>
                  </div>
                ))}
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </Card>
      </div>
    </AppShell>
  );
}

function Stat({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5 flex items-center gap-1">
        {icon}
        {label}
      </dt>
      <dd className="text-sm font-medium">{value}</dd>
    </div>
  );
}
