import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Sparkles, Leaf } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "Mpampianatra AI — VerdantAI" },
      {
        name: "description",
        content: "Mametraha fanontaniana momba ny voly, aretin-javamaniry, na fomba fambolena.",
      },
    ],
  }),
  component: AssistantPage,
});

type Msg = { role: "user" | "assistant"; content: string };

const seed: Msg[] = [
  {
    role: "assistant",
    content:
      "Manao ahoana! Izaho no mpanampy anao amin'ny fambolena. Anontanio momba ny aretina, ny fanatsarana ny tany, ny fotoana fambolena, na izay rehetra mitsiry eo amin'ny taninao.",
  },
];

const suggestions = [
  "Rahoviana no tokony hambolena vary any Alaotra?",
  "Ahoana no fitsaboana ny rotin'ny ravim-paraky amin'ny fomba voajanahary?",
  "Inona no voly mahomby miaraka amin'ny mangahazo?",
  "Habetsahan'ny sokay ho an'ny tany latérita",
];

function AssistantPage() {
  const [messages, setMessages] = useState<Msg[]>(seed);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Msg = { role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Mba hahazoana valiny tsara indrindra amin'ny toe-javatra misy anao, hisaintsaiko ny ontology sy ny famantarana farany. *(Ampifandraiso amin'ny Lovable AI Gateway ao amin'ny `/api/chat` mba hahazoana valiny tena izy mivantana.)*",
        },
      ]);
    }, 700);
  };

  return (
    <AppShell
      title="Mpanampy AI"
      subtitle="Resaka momba ny fambolena, miorina amin'ny knowledge graph."
    >
      <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-13rem)]">
        <Card className="lg:col-span-3 flex flex-col border-border shadow-soft overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <div
                  className={`h-9 w-9 rounded-full shrink-0 flex items-center justify-center ${m.role === "user" ? "bg-terracotta text-terracotta-foreground" : "bg-gradient-leaf text-leaf-foreground"}`}
                >
                  {m.role === "user" ? "RA" : <Leaf className="h-4 w-4" />}
                </div>
                <div
                  className={`max-w-xl rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role === "user" ? "bg-terracotta text-terracotta-foreground" : "bg-secondary text-foreground"}`}
                >
                  {m.content}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Anontanio izay tianao momba ny taninao…"
                className="flex-1"
              />
              <Button
                type="submit"
                size="icon"
                className="bg-leaf hover:bg-leaf/90 text-leaf-foreground"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>

        <Card className="p-5 border-border shadow-soft h-fit">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-4 w-4 text-leaf" />
            <h3 className="font-display text-lg">Soso-kevitra</h3>
          </div>
          <div className="space-y-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="w-full text-left text-sm p-3 rounded-lg bg-secondary/50 hover:bg-secondary border border-border hover:border-leaf/40 transition"
              >
                {s}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
