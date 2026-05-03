import { Bell, Search } from "lucide-react";

export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-30">
      <div className="flex items-center justify-between px-6 lg:px-10 py-5">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl text-foreground">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground mt-1 max-w-xl">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground w-72">
            <Search className="h-4 w-4" />
            <span>Hitady voly, aretina, faritra…</span>
            <kbd className="ml-auto text-[10px] font-mono bg-muted px-1.5 py-0.5 rounded">⌘K</kbd>
          </div>
          <button className="relative h-10 w-10 rounded-full border border-border bg-card flex items-center justify-center hover:shadow-soft transition">
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-terracotta" />
          </button>
          <div className="h-10 w-10 rounded-full bg-gradient-leaf flex items-center justify-center text-leaf-foreground font-display font-medium text-sm">
            RA
          </div>
        </div>
      </div>
    </header>
  );
}
