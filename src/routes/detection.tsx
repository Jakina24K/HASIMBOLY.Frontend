import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  Camera,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

import { useState, useEffect, useRef } from "react";


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

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [stage, setStage] = useState<
    "idle" | "uploading" | "predicting" | "generating"
  >("idle");

  const [solution, setSolution] = useState<any>(null);

  const [prediction, setPrediction] = useState<
    | {
        class_index: number;
        class_name: string;
        probability: number;
      }
    | null
  >(null);

  const [error, setError] = useState<string | null>(null);

  const controllerRef = useRef<AbortController | null>(null);

  const apiBase =
    import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      controllerRef.current?.abort();
    };
  }, [previewUrl]);

  async function requestDiseaseSolution(
    cleanedTheme: string,
    text: string,
    mode: string,
    signal: AbortSignal
  ) {
    console.log("CALLING SOLUTION API");

    const res = await fetch(
      `${apiBase}/api/disease/solution/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cleaned_theme: cleanedTheme,
          text,
          mode,
        }),
        signal,
      }
    );

    console.log("SOLUTION STATUS:", res.status);

    if (!res.ok) {
      const errText = await res.text();

      console.error(errText);

      throw new Error(
        `Failed solution request (${res.status})`
      );
    }

    return await res.json();
  }

  const analyze = async () => {
    setError(null);

    if (!file) {
      setError("Mifidiana sary aloha (JPG/PNG).");
      return;
    }

    const isValidType = file.type.startsWith("image/");
    const isValidSize = file.size <= 10 * 1024 * 1024;

    if (!isValidType || !isValidSize) {
      setError("Tsy mety ny rakitra. Alefaso JPG/PNG latsaky ny 10MB.");
      return;
    }

    controllerRef.current?.abort();

    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    setAnalyzed(false);
    setPrediction(null);
    setSolution(null);

    try {
      setStage("uploading");

      const formData = new FormData();
      formData.append("file", file);

      const predictRes = await fetch(
        `${apiBase}/api/disease/predict/`,
        {
          method: "POST",
          body: formData,
          signal: controller.signal,
        }
      );

      if (!predictRes.ok) {
        throw new Error(
          `Prediction failed (${predictRes.status})`
        );
      }

      setStage("predicting");

      const predictData = await predictRes.json();

      console.log("PREDICT RESPONSE:", predictData);

      if (!predictData?.class_name) {
        throw new Error("No class_name returned");
      }

      setPrediction({
        class_index: predictData.class_index ?? 0,
        class_name: predictData.class_name,
        probability: predictData.probability ?? 0,
      });

      setStage("generating");

      const solutionData = await requestDiseaseSolution(
        "Ravinkazo",
        `Aretina: ${predictData.class_name}`,
        "Agronome",
        controller.signal
      );

      console.log("SOLUTION RESPONSE:", solutionData);

      setSolution(solutionData);

      setAnalyzed(true);
    } catch (e) {
      console.error(e);

      if (e instanceof DOMException && e.name === "AbortError") {
        console.log("Request aborted");
        return;
      }

      setError(
        e instanceof Error
          ? e.message
          : "Error during prediction"
      );
    } finally {
      setLoading(false);
      setStage("idle");
    }
  };

  const resetAll = () => {
    controllerRef.current?.abort();

    setAnalyzed(false);
    setLoading(false);
    setFile(null);
    setPrediction(null);
    setSolution(null);
    setError(null);

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(null);
  };

const apiResult =
  solution?.result?.result ?? solution?.result ?? solution;

  const parseSolution = (text: string) => {
  if (!text || typeof text !== "string") {
    return { treatment: [], prevention: [] };
  }

  const lines = text
    .replace(/\r/g, "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const treatment: string[] = [];
  const prevention: string[] = [];

  const isNoise = (l: string) =>
    /(fanamarinana|diagnosis|confidence|high-confidence|fepetra|fitaovana)/i.test(
      l
    );

  const looksLikeTreatment = (l: string) =>
    /(zezika|rano|mampias|esory|dory|tsabo|pesticide|fungicide|pH|npk|fitarihan|care)/i.test(
      l
    );

  const looksLikePrevention = (l: string) =>
    /(fisorohana|fifandimbiasana|rotation|saraho|sanitary|manadio|avoid)/i.test(
      l
    );

  for (const line of lines) {
    const clean = line.replace(/^[-•*]\s*/, "");

    if (isNoise(clean)) continue;

    // 🔥 SMART ROUTING (no headers needed)
    if (looksLikePrevention(clean)) {
      prevention.push(clean);
      continue;
    }

    if (looksLikeTreatment(clean)) {
      treatment.push(clean);
      continue;
    }

    // fallback: if no clue → put in treatment (safe default)
    treatment.push(clean);
  }

  return { treatment, prevention };
};

const rawResult =
  solution?.result?.result ??
  solution?.result ??
  solution;

const toroHevitra =
  typeof rawResult === "string"
    ? rawResult
    : JSON.stringify(rawResult, null, 2);

const parsedResult =
  typeof apiResult === "string"
    ? parseSolution(apiResult)
    : apiResult?.result
    ? parseSolution(apiResult.result)
    : { treatment: [], prevention: [] };

  const result = {
  treatment:
    parsedResult.treatment.length || parsedResult.prevention.length
      ? [...parsedResult.treatment, ...parsedResult.prevention]
      : ["Tsy nisy fitsaboana voafaritra."],

  prevention:
    parsedResult.prevention.length
      ? parsedResult.prevention
      : parsedResult.treatment.length
      ? ["Jereo ny fitsaboana etsy ambony."]
      : ["Tsy nisy fisorohana voafaritra."],
};

  const confidence =
    (prediction?.probability ?? 0) <= 1
      ? Math.round((prediction?.probability ?? 0) * 100)
      : Math.round(prediction?.probability ?? 0);

  return (
    <AppShell
      title="Famantarana Aretina"
      subtitle="Ampidiro ny sarin'ny ravina. Hamantatra ny aretina ny AI ary hanome vahaolana."
    >
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Upload */}
        <Card className="lg:col-span-2 p-6 border-border shadow-soft">
          <h3 className="font-display text-xl mb-4">
            1. Hampiditra santionany
          </h3>

          <div
            className={`aspect-square rounded-2xl border-2 border-dashed border-border bg-secondary/40 flex flex-col items-center justify-center relative overflow-hidden group transition-all ${
              loading ? "cursor-wait" : ""
            }`}
          >
            <input
              id="detection-file"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const next = e.target.files?.[0] ?? null;

                setFile(next);

                if (previewUrl) {
                  URL.revokeObjectURL(previewUrl);
                }

                setPreviewUrl(
                  next ? URL.createObjectURL(next) : null
                );

                setAnalyzed(false);
                setPrediction(null);
                setSolution(null);
                setError(null);
              }}
            />

            {previewUrl ? (
              <>
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-300"
                  loading="lazy"
                  width={800}
                  height={800}
                />

                {loading && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center z-10">
                    <div className="relative">
                      <div className="h-16 w-16 rounded-full border-4 border-white/20" />

                      <div className="absolute inset-0 h-16 w-16 rounded-full border-4 border-white border-t-transparent animate-spin" />
                    </div>

                    <p className="text-white mt-5 font-display text-lg">
                      {stage === "uploading" &&
                        "Mandefa sary..."}

                      {stage === "predicting" &&
                        "Mamantatra aretina..."}

                      {stage === "generating" &&
                        "Mamokatra vahaolana..."}
                    </p>

                    <p className="text-white/70 text-sm mt-2">
                      Miandrasa kely azafady...
                    </p>
                  </div>
                )}
              </>
            ) : (
              <label
                htmlFor="detection-file"
                className="cursor-pointer w-full h-full flex flex-col items-center justify-center p-4"
              >
                <div className="h-16 w-16 rounded-2xl bg-leaf/10 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  <Upload className="h-7 w-7 text-leaf" />
                </div>

                <p className="font-medium">
                  Ampidiro ny sary eto
                </p>

                <p className="text-sm text-muted-foreground mt-1">
                  JPG, PNG hatramin'ny 10 MB
                </p>
              </label>
            )}
          </div>

          {file && (
            <p className="text-sm text-muted-foreground mt-3 truncate">
              {file.name}
            </p>
          )}

          {error && (
            <div className="mt-4 rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 mt-4">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() =>
                document
                  .getElementById("detection-file")
                  ?.click()
              }
              disabled={loading}
            >
              <Camera className="h-4 w-4" />
              Fakan-tsary
            </Button>

            <Button
              variant="outline"
              className="gap-2"
              onClick={resetAll}
              disabled={loading}
            >
              Avereno
            </Button>
          </div>

          <Button
            className="w-full mt-3 bg-leaf hover:bg-leaf/90 text-leaf-foreground gap-2"
            size="lg"
            onClick={analyze}
            disabled={loading || !file}
          >
            <Sparkles className="h-4 w-4" />

            {loading
              ? "Manadihady..."
              : "Handinika amin'ny AI"}
          </Button>
        </Card>

        {/* Results */}
        <div className="lg:col-span-3 space-y-6">
          {!analyzed ? (
            <Card className="p-12 border-dashed border-border shadow-soft flex flex-col items-center justify-center text-center min-h-[400px]">
              <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center mb-4 animate-float">
                <Sparkles className="h-8 w-8 text-leaf" />
              </div>

              <h3 className="font-display text-2xl">
                Miandry ny sarinao ho dinihina...
              </h3>

              <p className="text-muted-foreground mt-2 max-w-sm">
                Hiseho eto ny valiny miaraka amin'ny toro-hevitra maro - 
                fitsaboana sy fisorohana.
              </p>

              {previewUrl && !loading && (
                <img
                  src={previewUrl}
                  alt="Selected leaf"
                  className="mt-6 w-44 h-44 object-cover rounded-2xl border border-border shadow-soft"
                />
              )}
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

                    <h2 className="font-display text-3xl">
                      {prediction?.class_name}
                    </h2>

                    <p className="text-muted-foreground mt-1 italic font-display">
                      AI disease detection
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">
                      Fahatokisana
                    </div>

                    <div className="font-display text-4xl text-leaf">
                      {confidence}
                      <span className="text-lg text-muted-foreground">
                        %
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 pt-6 border-t border-border md:grid-cols-[120px_1fr]">
                  <img
                    src={previewUrl ?? "https://via.placeholder.com/150"}
                    alt="Analyzed leaf"
                    className="w-full h-32 md:h-28 object-cover rounded-xl border border-border"
                  />

                  <div className="flex flex-col justify-center">
                    <p className="text-sm text-muted-foreground">
                      Ny AI dia nahita aretina mety ho:
                    </p>

                    <p className="font-display text-xl mt-1">
                      {prediction?.class_name}
                    </p>

                    <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-leaf transition-all duration-700"
                        style={{
                          width: `${confidence}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Treatment & Prevention */}
              <div className="grid md:grid-cols-1 gap-6">
                <Card className="p-6 border-border shadow-soft">
  <div className="flex items-center gap-2 mb-4">
    <div className="h-9 w-9 rounded-lg bg-leaf/10 flex items-center justify-center">
      <Sparkles className="h-4 w-4 text-leaf" />
    </div>

    <h3 className="font-display text-lg">
      Toro-hevitra
    </h3>
  </div>

  <div className="text-sm whitespace-pre-wrap leading-relaxed">
    {toroHevitra || "Tsy nisy toro-hevitra azo."}
  </div>
</Card>
              </div>
            </>
          )}
        </div>
      </div>
    </AppShell>
  );
}