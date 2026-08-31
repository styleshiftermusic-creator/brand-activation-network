import { Sidebar } from "@/components/dashboard/Sidebar";
import { SplineHero } from "@/components/SplineHero";
import DashboardClient from "./DashboardClient";

export const metadata = {
    title: "Mission Control",
    description: "Your active operations dashboard.",
    alternates: {
        canonical: "/dashboard",
    },
    robots: {
        index: false,
        follow: false,
    },
};

export default function MissionControl() {
    return (
        <div className="min-h-screen bg-[var(--brand-bg)] flex text-zinc-300 font-sans selection:bg-[var(--primary)]/30 relative overflow-hidden">
            {/* Deep Ambient Glows for Mission Control */}
            <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-[var(--primary)]/5 rounded-full blur-[150px] pointer-events-none z-0" />
            <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/5 rounded-full blur-[150px] pointer-events-none z-0" />

            <Sidebar />

            <main className="flex-1 p-6 lg:p-10 overflow-y-auto z-10 relative">
                <div className="max-w-[1400px] mx-auto flex flex-col gap-8 lg:gap-12">
                    {/* Premium 3D Hero */}
                    <SplineHero />
                    
                    <DashboardClient />
                </div>
            </main>
        </div>
    );
}
