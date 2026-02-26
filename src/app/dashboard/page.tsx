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
                    const grouped = data.reduce((acc: any, curr) => {
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
                    .select('module_id, completed, unlocked')
                    .eq('user_id', user.id);

                if (error) throw error;

                if (data && data.length > 0) {
                    const progressMap = new Map(data.map((p: any) => [p.module_id, p]));
                    const updatedMissions = DEFAULT_MISSIONS.map((mission) => {
                        const progress = progressMap.get(mission.id);
                        if (progress) {
                            return {
                                ...mission,
                                locked: !progress.unlocked,
                                completed: progress.completed,
                                status: progress.completed ? "COMPLETED" : (progress.unlocked ? "ACTIVE" : "LOCKED")
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
                <div className="max-w-5xl mx-auto">
                    {/* Dashboard Header Bar */}
                    <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
                        <div>
                            <h1 className="text-3xl font-medium tracking-tight text-white mb-2">Agent Execution Feed</h1>
                            <p className="text-zinc-500 font-mono text-sm flex items-center gap-2">
                                <span className="text-[var(--primary)]">Current Directive:</span> {activeMission.title}
                            </p>
                        </div>
                        <div className="flex items-center gap-4 bg-black/40 border border-white/10 rounded-lg p-2 px-4 backdrop-blur-md">
                            <div className="text-right">
                                <div className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">System Progress</div>
                                <div className="text-white font-medium text-sm">{completedCount} / {missions.length} Completed</div>
                            </div>
                            <div className="w-24 h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                                <div className={`h-full bg-[var(--primary)] shadow-[0_0_10px_var(--primary)] transition-all duration-1000`} style={{ width: `${progressPercentage}%` }} />
                            </div>
                        </div>
                    </header>

                    <MetricChart data={chartData} loading={chartLoading} />

                    <MissionFeed missions={missions} />
                </div>
            </main>
        </div>
    );
}
