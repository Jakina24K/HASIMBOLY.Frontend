import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { recentDiagnoses } from "@/lib/mock-data";
import { Download, FileText } from "lucide-react";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "Tantara sy Tatitra — HASIMBOLY.IA" },
      {
        name: "description",
        content:
          "Ny famantarana rehetra nataonao sy ireo tatitra teo aloha ao anaty tetiandro iray.",
      },
    ],
  }),
  component: HistoryPage,
});

const extended = [
  ...recentDiagnoses,
  {
    id: "r6",
    crop: "Lavanila",
    disease: "Salama",
    date: "2026-04-23",
    confidence: 98,
    region: "Sava",
  },
  {
    id: "r7",
    crop: "Katsaka",
    disease: "Salama",
    date: "2026-04-22",
    confidence: 95,
    region: "Menabe",
  },
  {
    id: "r8",
    crop: "Kafe",
    disease: "Harafesin-dravina",
    date: "2026-04-21",
    confidence: 84,
    region: "Sava",
  },
];

function HistoryPage() {
  return (
    <AppShell title="Tantara sy Tatitra" subtitle="Ny famantarana rehetra nataonao, vonona alaina.">
      {/* Statistiques */}
      <div className="grid lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Famantarana rehetra", value: "7" },
          { label: "Tahan'ny salama", value: "67%" },
          { label: "Salan'isa fahatokisana", value: "91%" },
          { label: "Faritra voatahiry", value: "6 / 22" },
        ].map((s) => (
          <Card key={s.label} className="p-5 border-border shadow-soft">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>

            <div className="font-display text-3xl mt-2">{s.value}</div>
          </Card>
        ))}
      </div>

      {/* Tableau */}
      <Card className="border-border shadow-soft overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="font-display text-2xl">Rejisitry ny famantarana</h3>

          {/* <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-3.5 w-3.5" />
            Maka CSV
          </Button> */}
        </div>

        <div className="divide-y divide-border">
          {extended.map((d) => (
            <div
              key={d.id}
              className="grid grid-cols-12 items-center px-6 py-4 hover:bg-secondary/40 transition"
            >
              {/* Date */}
              <div className="col-span-1 font-mono text-xs text-muted-foreground">
                {d.date.slice(5)}
              </div>

              {/* Crop */}
              <div className="col-span-3 flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center font-display text-leaf text-sm">
                  {d.crop[0]}
                </div>

                <span className="font-medium text-sm">{d.crop}</span>
              </div>

              {/* Disease */}
              <div className="col-span-3">
                <Badge
                  variant="outline"
                  className={
                    d.disease === "Salama"
                      ? "border-success/40 text-success"
                      : "border-terracotta/40 text-terracotta"
                  }
                >
                  {d.disease}
                </Badge>
              </div>

              {/* Region */}
              <div className="col-span-2 text-sm text-muted-foreground">{d.region}</div>

              {/* Confidence */}
              <div className="col-span-2 font-mono text-sm">{d.confidence}%</div>

              {/* Action */}
              <div className="col-span-1 text-right">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <FileText className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </AppShell>
  );
}
