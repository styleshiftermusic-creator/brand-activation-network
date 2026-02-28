"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { MetricChart } from "@/components/dashboard/MetricChart";
import { MissionFeed } from "@/components/dashboard/MissionFeed";

const DEFAULT_MISSIONS = [
    { id: "M-01", status: "COMPLETED", title: "The Pledge Loan Hack", category: "[FINANCE]", time: "00:45:00", locked: false, completed: true },
    { id: "M-02", status: "COMPLETED", title: "High-level Tax Strategies", category: "[FINANCE]", time: "01:12:00", locked: false, completed: true },
    { id: "M-03", status: "ACTIVE", title: "Velocity Banking Principles", category: "[FINANCE]", time: "00:55:00", locked: false, completed: false },
    { id: "M-04", status: "LOCKED", title: "Marketing & Audience Leverage", category: "[BUSINESS]", time: "01:30:00", locked: true, completed: false },
    { id: "M-05", status: "LOCKED", title: "High-Ticket Sales Philosophy", category: "[BUSINESS]", time: "00:42:00", locked: true, completed: false },
    { id: "M-06", status: "LOCKED", title: "Scaling with One-to-Many", category: "[SCALE]", time: "01:05:00", locked: true, completed: false },
    { id: "M-07", status: "LOCKED", title: "Mindset & Environment", category: "[FOUNDATION]", time: "00:38:00", locked: true, completed: false },
];

const FALLBACK_PERFORMANCE_DATA = [
    { time: '00:00', load: 12, efficiency: 98 },
    { time: '04:00', load: 18, efficiency: 95 },
    { time: '08:00', load: 45, efficiency: 88 },
    { time: '12:00', load: 82, efficiency: 75 },
    { time: '16:00', load: 55, efficiency: 89 },
    { time: '20:00', load: 28, efficiency: 96 },
    { time: '24:00', load: 15, efficiency: 98 },
];

export default function MissionControl() {
    const [chartData, setChartData] = useState(FALLBACK_PERFORMANCE_DATA);
    const [chartLoading, setChartLoading] = useState(true);
    const [missions, setMissions] = useState(DEFAULT_MISSIONS);

    // Compute progress based on current mission state
    const completedCount = missions.filter(m => m.completed).length;
    const activeMission = missions.find(m => !m.completed && !m.locked) || missions[0];
    const progressPercentage = Math.round((completedCount / missions.length) * 100);

    // Fetch real telemetry data
    useEffect(() => {

        const fetchTelemetry = async () => {
            try {
                setChartLoading(true);
                // Fetch recent webinar registrations backwards from 7 days
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

                const { data, error } = await supabase
                    .from('webinar_registrations')
                    .select('registered_at')
                    .gte('registered_at', sevenDaysAgo.toISOString())
                    .order('registered_at', { ascending: true });

                if (error) throw error;

                if (data && data.length > 0) {
                    const grouped = data.reduce((acc: Record<string, number>, curr) => {
                        const date = new Date(curr.registered_at).toLocaleDateString(undefined, { weekday: 'short' });
                        acc[date] = (acc[date] || 0) + 1;
                        return acc;
                    }, {});

                    const mappedData = Object.keys(grouped).map(date => {
                        const count = grouped[date];
                        return {
                            time: date,
                            load: Math.min(count * 15, 100),
                            efficiency: Math.max(98 - (count * 2), 60)
                        };
                    });

                    if (mappedData.length < 3) {
                        setChartData(FALLBACK_PERFORMANCE_DATA);
                    } else {
                        setChartData(mappedData);
                    }
                } else {
                    setChartData(FALLBACK_PERFORMANCE_DATA);
                }
            } catch (err) {
                console.error("[TELEMETRY_ERROR] Failed to fetch data:", err);
                setChartData(FALLBACK_PERFORMANCE_DATA);
            } finally {
                setChartLoading(false);
            }
        };

        fetchTelemetry();
    }, []);

    // Fetch dynamic course progress
    useEffect(() => {

        const fetchProgress = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) return;

                const { data, error } = await supabase
                    .from('course_progress')
                    .select('module_id, status')
                    .eq('user_id', user.id);

                if (error) throw error;

                if (data && data.length > 0) {
                    const progressMap = new Map(data.map((p: { module_id: string; status: string }) => [p.module_id, p]));
                    const updatedMissions = DEFAULT_MISSIONS.map((mission) => {
                        const progress = progressMap.get(mission.id);
                        if (progress) {
                            return {
                                ...mission,
                                locked: progress.status === 'LOCKED',
                                completed: progress.status === 'COMPLETED',
                                status: progress.status
                            };
                        }
                        return mission;
                    });
                    setMissions(updatedMissions);
                } else {
                    // Default fallback for new users: unlock the first module
                    const initialMissions = [...DEFAULT_MISSIONS];
                    initialMissions[0].locked = false;
                    initialMissions[0].status = "ACTIVE";
                    setMissions(initialMissions);
                }
            } catch (err) {
                console.error("[PROGRESS_ERROR] Failed to fetch course progress:", err);
            }
        };

        fetchProgress();
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] flex text-zinc-300 font-sans selection:bg-[var(--primary)]/30 relative overflow-hidden">
            {/* Deep Ambient Glows for Mission Control */}
            <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-[var(--primary)]/5 rounded-full blur-[150px] pointer-events-none z-0" />
            <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/5 rounded-full blur-[150px] pointer-events-none z-0" />

            <Sidebar />

            <main className="flex-1 p-6 lg:p-10 overflow-y-auto z-10 relative">
                <div className="max-w-[1400px] mx-auto flex flex-col xl:flex-row gap-8 lg:gap-12">
                    {/* Primary Execution Feed (65%) */}
                    <div className="flex-1 xl:w-[65%] flex flex-col gap-8">
                        {/* Dashboard Header Bar */}
                        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6">
                            <div>
                                <h1 className="text-3xl font-medium tracking-tight text-white mb-2">Agent Execution Feed</h1>
                                <p className="text-zinc-500 font-mono text-sm flex items-center gap-2">
                                    <span className="text-[var(--primary)] text-xs tracking-widest uppercase">Current Directive:</span> {activeMission.title}
                                </p>
                            </div>
                        </header>

                        <MetricChart data={chartData} loading={chartLoading} />

                        <div>
                            <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-[0.2em] mb-4 pl-1">Available Directives</h2>
                            <MissionFeed missions={missions} />
                        </div>
                    </div>

                    {/* Right Sticky Intel Column (35%) */}
                    <div className="hidden xl:block xl:w-[35%]">
                        <div className="sticky top-10 space-y-6">
                            {/* System Status Panel */}
                            <div className="bg-black/40 backdrop-blur-2xl border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/10 blur-[50px] rounded-full pointer-events-none group-hover:bg-[var(--primary)]/20 transition-colors duration-700" />

                                <div className="flex items-center justify-between mb-6 relative z-10">
                                    <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Network Status</h3>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                        <span className="text-[10px] font-mono text-green-500 uppercase tracking-widest">Optimal Node Uplink</span>
                                    </div>
                                </div>

                                {/* Progress Bar Mini */}
                                <div className="space-y-3 relative z-10">
                                    <div className="flex justify-between items-end">
                                        <span className="text-2xl font-medium tracking-tight text-white">{completedCount} <span className="text-zinc-500 text-lg">/ {missions.length}</span></span>
                                        <span className="text-[10px] font-mono text-[var(--primary)] uppercase tracking-widest">{progressPercentage}% Complete</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-zinc-900/80 rounded-full overflow-hidden border border-white/[0.02]">
                                        <div className="h-full bg-[var(--primary)] shadow-[0_0_15px_var(--primary)] transition-all duration-1000 ease-out" style={{ width: `${progressPercentage}%` }} />
                                    </div>
                                </div>
                            </div>

                            {/* Active Target Panel */}
                            <div className="bg-black/40 backdrop-blur-2xl border border-[var(--primary)]/20 rounded-2xl p-6 relative overflow-hidden group hover:border-[var(--primary)]/40 transition-colors duration-500">
                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-transparent pointer-events-none" />

                                <h3 className="text-xs font-mono text-[var(--primary)] uppercase tracking-[0.2em] mb-4 relative z-10">Active Target</h3>
                                <div className="relative z-10">
                                    <h4 className="text-xl font-medium text-white tracking-tight mb-2">{activeMission.title}</h4>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-mono px-2 py-1 rounded bg-[var(--primary)]/10 border border-[var(--primary)]/30 text-[var(--primary)] tracking-widest uppercase">
                                            {activeMission.category.replace(/[\[\]]/g, '')}
                                        </span>
                                        <span className="text-xs font-mono text-zinc-500">{activeMission.time}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
