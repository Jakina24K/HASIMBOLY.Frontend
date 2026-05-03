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
  { to: "/", label: "Tabilao", icon: LayoutDashboard },
  { to: "/detection", label: "Famantarana Aretina", icon: Microscope },
  { to: "/recommendation", label: "Tolo-kevitra Mahay", icon: Sparkles },
  { to: "/explorer", label: "Fitrandrahana Fahalalana", icon: Network },
  { to: "/assistant", label: "Mpanampy AI", icon: MessageCircle },
  { to: "/map", label: "Sarintanin'i Madagasikara", icon: Map },
  { to: "/history", label: "Tantara sy Tatitra", icon: History },
  { to: "/profile", label: "Mombamomba anao", icon: User },
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
          <div className="font-display text-lg font-semibold leading-none">
            HASIMBOLY<span className="text-leaf">.</span>AI
          </div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-sidebar-foreground/60 mt-1">
            TEAM CHILL
          </div>
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
                  : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
              )}
            >
              <Icon
                className={cn("h-4 w-4 transition-colors", active && "text-leaf")}
                strokeWidth={2}
              />
              <span className={cn(active && "font-medium")}>{label}</span>
              {active && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-leaf animate-pulse-ring" />
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
