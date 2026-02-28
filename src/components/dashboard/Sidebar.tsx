"use client";

import { Terminal, Activity, FolderDot, Database, PowerOff, Briefcase } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { path: "/dashboard", label: "Active Feed", icon: <Activity className="h-4 w-4" /> },
        { path: "/dashboard/master-course", label: "The Master Course", icon: <Briefcase className="h-4 w-4" /> },
        { path: "/dashboard/blueprints", label: "Brand Blueprints", icon: <FolderDot className="h-4 w-4" /> },
        { path: "/dashboard/antigravity-system", label: "AntiGravity System", icon: <Terminal className="h-4 w-4" /> },
        { path: "/dashboard/data-sources", label: "Data Sources", icon: <Database className="h-4 w-4" /> },
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
                            className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 overflow-hidden ${isActive
                                ? "bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/30 shadow-[inset_0_0_20px_-5px_var(--primary)]"
                                : "text-zinc-500 hover:text-zinc-200 border border-transparent hover:border-white/5"
                                }`}
                        >
                            {/* Animated pill background on hover */}
                            {!isActive && (
                                <div className="absolute inset-0 bg-gradient-to-r from-white/[0.08] to-transparent rounded-lg opacity-0 -translate-x-full group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 pointer-events-none" />
                            )}
                            <div className="relative z-10 flex items-center gap-3 w-full">
                                <span className={`transition-transform duration-300 ${!isActive && 'group-hover:text-white group-hover:scale-110'}`}>{item.icon}</span>
                                <span>{item.label}</span>
                            </div>
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
                    className="group relative flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-500/10 text-zinc-600 hover:text-red-400 border border-transparent hover:border-red-500/20 hover:shadow-[0_0_15px_-3px_rgba(239,68,68,0.2)] transition-all duration-300 w-full text-left font-mono text-sm overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent opacity-0 -translate-x-full group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 pointer-events-none" />
                    <PowerOff className="h-4 w-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                    <span className="relative z-10">Terminate Session</span>
                </button>
            </div>
        </aside>
    );
}
