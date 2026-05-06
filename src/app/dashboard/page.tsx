"use client";

import { useState, useEffect } from "react";
import { Eye, Download, ClipboardCheck, Users } from "lucide-react";

import { supabase } from "@/lib/supabase";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { MetricChart } from "@/components/dashboard/MetricChart";
import { MissionFeed } from "@/components/dashboard/MissionFeed";

const FALLBACK_MISSIONS = [
    { id: "M-01", status: "ACTIVE", title: "The Pledge Loan Hack", category: "[FINANCE]", time: "00:45:00", locked: false, completed: false },
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
    const [missions, setMissions] = useState(FALLBACK_MISSIONS);
    const [totalMembers, setTotalMembers] = useState<number | null>(null);
    const [activityCounts, setActivityCounts] = useState<Record<string, number>>({});
    const [topModules, setTopModules] = useState<{ module_id: string; count: number }[]>([]);
    const [userId, setUserId] = useState<string | null>(null);
    const [referralCount, setReferralCount] = useState<number>(0);

    // Compute progress based on current mission state
    const completedCount = missions.filter(m => m.completed).length;
    const activeMission = missions.find(m => !m.completed && !m.locked) || missions[0];
    const progressPercentage = Math.round((completedCount / missions.length) * 100);

    // Fetch real telemetry data via secure server-side route
    useEffect(() => {

        const fetchTelemetry = async () => {
            try {
                setChartLoading(true);

                const res = await fetch("/api/admin/telemetry");
                if (!res.ok) throw new Error(`Telemetry fetch failed: ${res.status}`);

                const json = await res.json();
                const { registrations, activityCounts: ac, topModules: tm, totalMembers: total } = json;

                // Wire new fields
                if (ac)  setActivityCounts(ac);
                if (tm)  setTopModules(tm);
                if (total != null) setTotalMembers(total);

                if (registrations && registrations.length > 0) {
                    const grouped = registrations.reduce((acc: Record<string, number>, curr: { registered_at: string }) => {
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

    // Fetch dynamic course progress and content
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // 1. Fetch Course Content
                const contentRes = await fetch("/api/course-content");
                if (!contentRes.ok) throw new Error("Failed to load course content");
                const courseData = await contentRes.json();

                // 2. Fetch Progress
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) return;
                setUserId(user.id);

                const { data: progressData, error } = await supabase
                    .from('course_progress')
                    .select('module_id, status')
                    .eq('user_id', user.id);

                if (error) throw error;

                const progressMap = new Map((progressData || []).map((p: { module_id: string; status: string }) => [p.module_id, p]));

                // 3. Build Missions List
                interface CourseModule {
                    title: string;
                    category?: string;
                    studyGuide: string;
                }

                const builtMissions = Object.entries(courseData as Record<string, CourseModule>).map(([key, data]) => {
                    const id = `M-0${key}`;
                    const progress = progressMap.get(id);
                    
                    // Estimate duration based on word count (150 wpm)
                    const wordCount = data.studyGuide.split(/\s+/).length;
                    const totalMinutes = Math.ceil(wordCount / 150);
                    const time = `${String(totalMinutes).padStart(2, '0')}:00`;

                    return {
                        id,
                        title: data.title,
                        category: data.category || "[MODULE]",
                        time,
                        locked: progress ? progress.status === 'LOCKED' : (id !== 'M-01'),
                        completed: progress ? progress.status === 'COMPLETED' : false,
                        status: progress ? progress.status : (id === 'M-01' ? 'ACTIVE' : 'LOCKED')
                    };
                });

                // 4. Initialize M-01 if first time
                if ((!progressData || progressData.length === 0) && user) {
                    try {
                        await supabase.from('course_progress').insert({
                            user_id: user.id,
                            module_id: 'M-01',
                            status: 'ACTIVE'
                        });
                    } catch {
                        console.info("Could not initialize telemetry database row.");
                    }
                }

                // 5. Fetch Referrals Count
                try {
                    const { count, error: refError } = await supabase
                        .from('user_activity')
                        .select('*', { count: 'exact', head: true })
                        .eq('user_id', user.id)
                        .eq('activity_type', 'REFERRAL_SIGNUP');
                    
                    if (!refError && count !== null) setReferralCount(count);
                } catch(e) { console.error(e) }

                setMissions(builtMissions);
            } catch (err) {
                console.error("[DASHBOARD_DATA_ERROR] Failed to fetch data:", err);
            }
        };

        fetchDashboardData();
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

                            {/* ─── Activity Intel ─── */}
                            <div className="bg-black/40 backdrop-blur-2xl border border-white/5 rounded-2xl p-6 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

                                <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-5 relative z-10">7-Day Activity</h3>

                                {/* Stat chips */}
                                <div className="grid grid-cols-3 gap-3 mb-4 relative z-10">
                                    {[
                                        { icon: <Users className="w-3.5 h-3.5" />, label: "Members", value: totalMembers ?? "—", color: "text-[var(--primary)]" },
                                        { icon: <Eye className="w-3.5 h-3.5" />,     label: "Views",   value: activityCounts["MODULE_VIEW"] ?? 0, color: "text-blue-400" },
                                        { icon: <Download className="w-3.5 h-3.5" />, label: "DLs",   value: activityCounts["DOWNLOAD"] ?? 0,     color: "text-amber-400" },
                                    ].map((stat) => (
                                        <div key={stat.label} className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/[0.03] border border-white/5">
                                            <span className={`${stat.color} mb-1`}>{stat.icon}</span>
                                            <span className="text-base font-bold text-white tabular-nums">{stat.value}</span>
                                            <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-wider mt-0.5">{stat.label}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Quizzes */}
                                <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.02] border border-white/5 mb-4 relative z-10">
                                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                                        <ClipboardCheck className="w-3.5 h-3.5 text-emerald-400" />
                                        Quizzes Completed
                                    </div>
                                    <span className="text-sm font-bold text-white tabular-nums">{activityCounts["QUIZ_COMPLETE"] ?? 0}</span>
                                </div>

                                {/* Top Modules */}
                                {topModules.length > 0 && (
                                    <div className="relative z-10">
                                        <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-2">Top Modules</p>
                                        <div className="flex flex-col gap-1.5">
                                            {topModules.map((m, i) => (
                                                <div key={m.module_id} className="flex items-center gap-2">
                                                    <span className="text-[10px] font-mono text-zinc-600 w-4">{i + 1}</span>
                                                    <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                                                        <div
                                                            className="h-full rounded-full bg-[var(--primary)] transition-all duration-700"
                                                            style={{ width: `${Math.min((m.count / (topModules[0]?.count || 1)) * 100, 100)}%`, opacity: 1 - i * 0.15 }}
                                                        />
                                                    </div>
                                                    <span className="text-[10px] font-mono text-zinc-500 w-8 text-right">{m.module_id}</span>
                                                    <span className="text-[10px] font-mono text-zinc-600 tabular-nums w-3 text-right">{m.count}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* ─── Refer & Earn Card ─── */}
                            <div className="bg-black/40 backdrop-blur-2xl border border-emerald-500/20 rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-500/40 transition-colors duration-500">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent pointer-events-none" />
                                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 blur-[40px] rounded-full pointer-events-none" />

                                <div className="relative z-10">
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono uppercase tracking-widest mb-4">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                        Member Benefit
                                    </div>
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-base font-semibold text-white tracking-tight">Refer &amp; Earn</h3>
                                        {referralCount > 0 && (
                                            <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                                                {referralCount} Referred
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-zinc-500 leading-relaxed mb-5">
                                        Know someone who needs this? Share your link — every referral that joins strengthens the network and earns you credit.
                                    </p>
                                    <button
                                        onClick={() => {
                                            const url = userId ? `https://brandactivationnetwork.com?ref=${userId}` : "https://brandactivationnetwork.com";
                                            if (navigator.share) {
                                                navigator.share({ title: "Brand Activation Network", url });
                                            } else {
                                                navigator.clipboard.writeText(url);
                                                alert("Link copied to clipboard!");
                                            }
                                        }}
                                        className="w-full py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-widest hover:bg-emerald-500 hover:text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] font-semibold"
                                    >
                                        Share My Link →
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
