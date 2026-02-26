"use client";

import { Terminal, Activity, FolderDot, Database, Network, PowerOff, Briefcase } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { path: "/dashboard", label: "Active Feed", icon: <Activity className="h-4 w-4" /> },
        { path: "/dashboard/master-course", label: "The Master Course", icon: <Briefcase className="h-4 w-4" /> },
        { path: "/dashboard/blueprints", label: "AI Workshop Engine", icon: <FolderDot className="h-4 w-4" /> },
        { path: "/dashboard/antigravity-system", label: "AntiGravity System", icon: <Terminal className="h-4 w-4" /> },
        { path: "/dashboard/data-sources", label: "Data Sources", icon: <Database className="h-4 w-4" /> },
        { path: "/dashboard/integrations", label: "Integrations", icon: <Network className="h-4 w-4" /> },
    ];

    return (
        <aside className="w-64 lg:w-72 border-r border-white/10 bg-black/20 backdrop-blur-xl p-6 flex flex-col hidden md:flex z-10 relative h-full min-h-screen">
            <div className="mb-10 flex items-center gap-3">
                <div className="h-8 w-8 rounded bg-[var(--primary)]/20 border border-[var(--primary)]/50 flex items-center justify-center">
                    <Terminal className="h-4 w-4 text-[var(--primary)]" />
                </div>
                <div>
                    <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Workspace</div>
                    <div className="font-semibold text-white tracking-tight">Mission Control</div>
                </div>
            </div>

            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-600 mb-4 pl-2">Directories</div>
            <nav className="flex flex-col gap-1 flex-grow font-mono text-sm">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive
                                ? "bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20"
                                : "hover:bg-white/5 text-zinc-500 hover:text-zinc-300 border border-transparent"
                                }`}
                        >
                            {item.icon} {item.label}
                        </Link>
                    )
                })}
            </nav>

            <div className="mt-auto border-t border-white/5 pt-4">
                <div className="flex items-center gap-3 mb-6 px-2">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                    <span className="text-xs font-mono text-green-500 uppercase tracking-widest">Uplink Stable</span>
                </div>
                <button
                    onClick={() => supabase.auth.signOut()}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-500/10 text-zinc-600 hover:text-red-400 transition-colors w-full text-left font-mono text-sm"
                >
                    <PowerOff className="h-4 w-4" /> Terminate Session
                </button>
            </div>
        </aside>
    );
}
