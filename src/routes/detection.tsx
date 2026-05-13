import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Camera, CheckCircle2, AlertTriangle, Sparkles } from "lucide-react";
import { useState } from "react";
import diseasedLeaf from "@/assets/diseased-leaf.jpg";
import { treatments } from "@/lib/mock-data";

export const Route = createFileRoute("/detection")({
  head: () => ({
    meta: [
      { title: "Famantarana Aretina — HASIMBOLY.IA" },
      {
        name: "description",
        content:
          "Ampidiro ny sarin-javamaniry iray ary raiso ny famantarana aretina avy amin'ny AI miaraka amin'ny fitsaboana sy fisorohana.",
      },
    ],
  }),
  component: DetectionPage,
});

function DetectionPage() {
  const [analyzed, setAnalyzed] = useState(false);
  const [loading, setLoading] = useState(false);

  const analyze = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setAnalyzed(true);
    }, 1400);
  };

  const result = treatments["Tomato Late Blight"];

  return (
    <AppShell
      title="Famantarana Aretina"
      subtitle="Ampidiro ny sarin'ny ravina. Hamantatra ny aretina ny AI ary hanome vahaolana."
    >
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Upload */}
        <Card className="lg:col-span-2 p-6 border-border shadow-soft">
          <h3 className="font-display text-xl mb-4">1. Hampiditra santionany</h3>

          <div className="aspect-square rounded-2xl border-2 border-dashed border-border bg-secondary/40 flex flex-col items-center justify-center relative overflow-hidden group">
            {analyzed || loading ? (
              <>
                <img
                  src={diseasedLeaf}
                  alt="Ravina marary"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  width={800}
                  height={800}
                />

                {loading && (
                  <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm flex flex-col items-center justify-center">
                    <div className="h-14 w-14 rounded-full border-2 border-leaf border-t-transparent animate-spin" />

                    <p className="text-primary-foreground mt-4 font-display italic">
                      Mamaky ny ravina...
                    </p>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="h-16 w-16 rounded-2xl bg-leaf/10 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  <Upload className="h-7 w-7 text-leaf" />
                </div>

                <p className="font-medium">Ampidiro ny sary eto</p>

                <p className="text-sm text-muted-foreground mt-1">JPG, PNG hatramin'ny 10 MB</p>
              </>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <Button variant="outline" className="gap-2">
              <Camera className="h-4 w-4" />
              Fakan-tsary
            </Button>

            <Button
              variant="outline"
              className="gap-2"
              onClick={() => {
                setAnalyzed(false);
                setLoading(false);
              }}
            >
              Avereno
            </Button>
          </div>

          <Button
            className="w-full mt-3 bg-leaf hover:bg-leaf/90 text-leaf-foreground gap-2"
            size="lg"
            onClick={analyze}
            disabled={loading}
          >
            <Sparkles className="h-4 w-4" />
            {loading ? "Manadihady..." : "Handinika amin'ny AI"}
          </Button>
        </Card>

        {/* Results */}
        <div className="lg:col-span-3 space-y-6">
          {!analyzed ? (
            <Card className="p-12 border-dashed border-border shadow-soft flex flex-col items-center justify-center text-center min-h-[400px]">
              <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center mb-4 animate-float">
                <Sparkles className="h-8 w-8 text-leaf" />
              </div>

              <h3 className="font-display text-2xl">Miandry ny santionanao</h3>

              <p className="text-muted-foreground mt-2 max-w-sm">
                Hiseho eto ny valiny miaraka amin'ny fitsaboana sy fisorohana.
              </p>
            </Card>
          ) : (
            <>
              {/* Result Header */}
              <Card className="p-6 border-border shadow-elegant">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Badge className="bg-destructive/10 text-destructive border-0 mb-3">
                      Hamafiny avo
                    </Badge>

                    <h2 className="font-display text-3xl">Tomato Late Blight</h2>

                    <p className="text-muted-foreground mt-1 italic font-display">
                      Phytophthora infestans
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">
                      Fahatokisana
                    </div>

                    <div className="font-display text-4xl text-leaf">
                      94
                      <span className="text-lg text-muted-foreground">%</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3 pt-6 border-t border-border">
                  {[
                    {
                      label: "Late Blight",
                      v: 94,
                    },
                    {
                      label: "Early Blight",
                      v: 4,
                    },
                    {
                      label: "Salama",
                      v: 2,
                    },
                  ].map((r) => (
                    <div key={r.label}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-muted-foreground">{r.label}</span>

                        <span className="font-mono">{r.v}%</span>
                      </div>

                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-leaf"
                          style={{
                            width: `${r.v}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Treatment & Prevention */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Treatment */}
                <Card className="p-6 border-border shadow-soft">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-9 w-9 rounded-lg bg-terracotta/10 flex items-center justify-center">
                      <AlertTriangle className="h-4 w-4 text-terracotta" />
                    </div>

                    <h3 className="font-display text-lg">Fitsaboana</h3>
                  </div>

                  <ul className="space-y-3">
                    {result.treatment.map((t, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <span className="font-mono text-terracotta text-xs mt-1">
                          {String(i + 1).padStart(2, "0")}
                        </span>

                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Prevention */}
                <Card className="p-6 border-border shadow-soft">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-9 w-9 rounded-lg bg-leaf/10 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-leaf" />
                    </div>

                    <h3 className="font-display text-lg">Fisorohana</h3>
                  </div>

                  <ul className="space-y-3">
                    {result.prevention.map((p, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <span className="font-mono text-leaf text-xs mt-1">
                          {String(i + 1).padStart(2, "0")}
                        </span>

                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </>
          )}
        </div>
      </div>
    </AppShell>
  );
}
