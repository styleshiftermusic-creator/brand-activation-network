import Image from "next/image";
import Link from "next/link";
import RegistrationForm from "@/components/RegistrationForm";
import { ArrowRight, Calendar, PlayCircle, ShieldCheck } from "lucide-react";

export const metadata = {
    title: "AI Workshop Engine Challenge | Brand Activation Network",
    description: "Register for the weekly AI Workshop Engine Challenge. Stop burning out. Start scaling.",
};

export default function ChallengeFunnel() {
    return (
        <div className="min-h-screen bg-[var(--background)] flex flex-col items-center relative overflow-hidden">
            {/* Abstract Backgrounds */}
            <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-[var(--primary)]/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[var(--accent)]/10 rounded-full blur-[150px] pointer-events-none" />

            {/* Navigation Layer */}
            <nav className="w-full max-w-6xl px-6 py-8 flex justify-between items-center z-10 animate-fade-in-up">
                <div className="flex items-center gap-2 mix-blend-screen">
                    <Link href="/">
                        <Image src="/logo.png" alt="BAN Logo" width={180} height={60} className="h-10 w-auto object-contain hover:scale-105 transition-transform" />
                    </Link>
                </div>
                <div className="px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-500 text-sm font-semibold tracking-widest uppercase flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                    Live Event
                </div>
            </nav>

            {/* Main Container */}
            <main className="z-10 flex flex-col items-center px-6 max-w-5xl w-full mt-12 mb-24 grid grid-cols-1 lg:grid-cols-2 gap-16">

                {/* Left Column: Value Prop */}
                <div className="flex flex-col text-left">
                    <div className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold mb-6 uppercase tracking-wider text-sm">
                        <Calendar className="h-4 w-4" /> Next Challenge Starts Tuesday
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-8 leading-tight">
                        Collapse <span className="text-gradient">Decades</span> Into <span className="text-gradient-primary">Days.</span>
                    </h1>
                    <p className="text-xl text-[var(--muted-foreground)] mb-10 leading-relaxed font-light">
                        Stop trading time for money. Join the free weekly workshop to learn the exact <strong>AI Workshop Engine</strong> blueprint to scale your agency without hiring an army of employees.
                    </p>

                    <div className="space-y-6 mb-12">
                        {[
                            "The 'Zero to Hero' Agency Setup Framework.",
                            "Deploying the 16-Agent Specialist Stack in minutes.",
                            "Automating High-Ticket Lead Generation."
                        ].map((bullet, i) => (
                            <div key={i} className="flex items-start gap-4">
                                <div className="h-6 w-6 rounded-full bg-[var(--primary)]/20 flex items-center justify-center flex-shrink-0 mt-1">
                                    <PlayCircle className="h-4 w-4 text-[var(--primary)]" />
                                </div>
                                <p className="text-lg text-zinc-300">{bullet}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: The Lead Capture Form */}
                <div className="w-full max-w-md mx-auto relative animate-fade-in-up">
                    {/* Decorative Elements */}
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] opacity-30 blur-xl" />
                    <RegistrationForm />
                </div>
            </main>
        </div>
    );
}
