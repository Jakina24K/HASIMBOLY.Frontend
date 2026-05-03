import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell, Mail, MapPin, Award } from "lucide-react";
import fields from "@/assets/fields.jpg";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — VerdantAI" },
      { name: "description", content: "Manage your profile, farm details and notification preferences." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <AppShell title="Mombamomba sy Fampandrenesana" subtitle="Lazao anay ny momba ny taninao. Hifanaraka aminao ny zavatra rehetra.">
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="overflow-hidden border-border shadow-soft">
          <div className="relative h-32 bg-gradient-leaf">
            <img src={fields} alt="" className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay" loading="lazy" width={1280} height={720} />
          </div>
          <div className="px-6 pb-6 -mt-12 relative">
            <div className="h-24 w-24 rounded-2xl bg-card border-4 border-card shadow-elegant flex items-center justify-center font-display text-4xl text-leaf">RA</div>
            <h3 className="font-display text-2xl mt-3">Rasoa Andrianavalona</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1"><MapPin className="h-3.5 w-3.5" /> Antananarivo, Madagascar</p>

            <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-border text-center">
              <div>
                <div className="font-display text-xl">12</div>
                <div className="text-xs text-muted-foreground">Tanim-boly</div>
              </div>
              <div>
                <div className="font-display text-xl">234</div>
                <div className="text-xs text-muted-foreground">Sary nojerena</div>
              </div>
              <div>
                <div className="font-display text-xl">3 t.</div>
                <div className="text-xs text-muted-foreground">Niaraka taminay</div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-accent/40 border border-border flex items-center gap-3">
              <Award className="h-5 w-5 text-terracotta" />
              <div>
                <div className="font-medium text-sm">Mpamboly modely</div>
                <div className="text-xs text-muted-foreground">Anisan'ny 5% ambony amin'ny hatsaran'ny angona</div>
              </div>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 border-border shadow-soft">
            <h3 className="font-display text-xl mb-5">Antsipiriany manokana</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Anarana feno</Label>
                <Input defaultValue="Rasoa Andrianavalona" className="mt-1.5" />
              </div>
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Email</Label>
                <Input defaultValue="rasoa@verdant.mg" className="mt-1.5" />
              </div>
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Voly fototra</Label>
                <Input defaultValue="Vary" className="mt-1.5" />
              </div>
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Habetsahan'ny tany</Label>
                <Input defaultValue="4.2 hektara" className="mt-1.5" />
              </div>
            </div>
            <Button className="mt-5 bg-leaf hover:bg-leaf/90 text-leaf-foreground">Tehirizo ny fanovana</Button>
          </Card>

          <Card className="p-6 border-border shadow-soft">
            <h3 className="font-display text-xl mb-5">Fampandrenesana</h3>
            <div className="space-y-4">
              {[
                { icon: Bell, title: "Fampilazana aretina", desc: "Hampahafantarina rehefa misy risika hitan'ny modely ao amin'ny faritrao", on: true },
                { icon: Mail, title: "Famintinana isan-kerinandro", desc: "Famintinana ny famantarana sy ny tolo-kevitra isaky ny Alatsinainy", on: true },
                { icon: MapPin, title: "Fampitandremana toetrandro", desc: "Hain-tany, hatsiaka, na fiovan'ny orana", on: false },
              ].map((n) => (
                <div key={n.title} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-secondary/30">
                  <div className="h-10 w-10 rounded-lg bg-leaf/10 flex items-center justify-center">
                    <n.icon className="h-4 w-4 text-leaf" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{n.title}</div>
                    <div className="text-xs text-muted-foreground">{n.desc}</div>
                  </div>
                  <Switch defaultChecked={n.on} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
