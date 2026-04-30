import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Microscope,
  Sparkles,
  Network,
  MessageCircle,
  Map,
  History,
  User,
  Leaf,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/detection", label: "Disease Detection", icon: Microscope },
  { to: "/recommendation", label: "Smart Recommendation", icon: Sparkles },
  { to: "/explorer", label: "Knowledge Explorer", icon: Network },
  { to: "/assistant", label: "AI Assistant", icon: MessageCircle },
  { to: "/map", label: "Madagascar Map", icon: Map },
  { to: "/history", label: "History & Reports", icon: History },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function Sidebar() {
  const location = useLocation();
  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-3 px-6 py-6 border-b border-sidebar-border">
        <div className="relative">
          <div className="absolute inset-0 bg-leaf rounded-xl blur-md opacity-40" />
          <div className="relative h-10 w-10 rounded-xl bg-gradient-leaf flex items-center justify-center">
            <Leaf className="h-5 w-5 text-leaf-foreground" strokeWidth={2.2} />
          </div>
        </div>
        <div>
          <div className="font-display text-lg font-semibold leading-none">Verdant<span className="text-leaf">.</span>AI</div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-sidebar-foreground/60 mt-1">Madagascar Edition</div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {nav.map(({ to, label, icon: Icon }) => {
          const active = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all",
                active
                  ? "bg-sidebar-accent text-sidebar-primary-foreground shadow-soft"
                  : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
              )}
            >
              <Icon className={cn("h-4 w-4 transition-colors", active && "text-leaf")} strokeWidth={2} />
              <span className={cn(active && "font-medium")}>{label}</span>
              {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-leaf animate-pulse-ring" />}
            </Link>
          );
        })}
      </nav>

      <div className="m-4 rounded-xl bg-sidebar-accent/60 p-4 border border-sidebar-border">
        <div className="text-xs text-sidebar-foreground/70 leading-relaxed">
          <span className="font-display italic text-leaf">Beta build.</span> ML & ontology endpoints are stubbed — wire your model & SPARQL backend when ready.
        </div>
      </div>
    </aside>
  );
}
