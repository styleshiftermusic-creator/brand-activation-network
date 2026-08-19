"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { m as motion, AnimatePresence } from "framer-motion";
import { X, Award, Download, Share2 } from "lucide-react";

interface CertificateModalProps {
    isOpen: boolean;
    onClose: () => void;
    studentName?: string;
}

export function CertificateModal({ isOpen, onClose, studentName = "Master Student" }: CertificateModalProps) {
    const [date, setDate] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        let active = true;
        Promise.resolve().then(() => {
            if (!active) return;
            setMounted(true);
            if (isOpen) {
                setDate(new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }));
            }
        });
        return () => { active = false; };
    }, [isOpen]);

    // Handle ESC key
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [isOpen, onClose]);

    // Lock body scroll
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Brand Activation Network Certified",
                    text: `I just completed the Master Blueprint at the Brand Activation Network!`,
                    url: "https://brandactivationnetwork.com",
                });
            } catch (err) {
                console.error("Error sharing", err);
            }
        }
    };

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-4xl bg-[#080808] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Ambient Glows */}
                        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
                        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[var(--primary)]/10 rounded-full blur-[120px] pointer-events-none" />

                        <div className="flex items-center justify-between p-4 border-b border-white/5 relative z-10 bg-black/20">
                            <div className="flex items-center gap-2 text-zinc-400">
                                <Award className="w-5 h-5 text-emerald-400" />
                                <span className="text-sm font-medium tracking-tight">Official Certification</span>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 text-zinc-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Certificate Canvas Area */}
                        <div className="p-6 md:p-10 relative z-10 flex flex-col items-center justify-center bg-[url('/noise.png')]">
                            
                            {/* The Certificate Itself */}
                            <div id="certificate-node" className="relative w-full max-w-3xl aspect-[1.414/1] bg-[#0a0a0a] border border-white/10 p-8 md:p-16 flex flex-col items-center text-center overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-lg">
                                {/* Inner decorative border */}
                                <div className="absolute inset-3 md:inset-4 border border-white/[0.03] pointer-events-none" />
                                <div className="absolute inset-4 md:inset-6 border border-emerald-500/10 pointer-events-none" />
                                
                                {/* Background Watermark */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                                    <Award className="w-96 h-96 text-emerald-500" />
                                </div>

                                <div className="relative z-10 flex flex-col items-center w-full h-full justify-between py-4">
                                    <div className="space-y-4">
                                        <div className="text-[10px] md:text-xs font-mono tracking-[0.4em] text-zinc-500 uppercase">
                                            Certificate of Completion
                                        </div>
                                        <div className="w-16 h-px bg-emerald-500/50 mx-auto" />
                                    </div>

                                    <div className="space-y-6 md:space-y-10 w-full">
                                        <p className="text-sm md:text-base text-zinc-400 font-serif italic">
                                            This certifies that
                                        </p>
                                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white capitalize bg-clip-text text-transparent bg-gradient-to-r from-white via-emerald-100 to-white">
                                            {studentName}
                                        </h2>
                                        <p className="text-xs md:text-sm text-zinc-400 font-serif italic max-w-md mx-auto leading-relaxed">
                                            has successfully completed all requirements, technical assessments, and strategic 
                                            deployments for the core curriculum of
                                        </p>
                                        <h3 className="text-xl md:text-2xl font-bold tracking-widest text-emerald-400 uppercase">
                                            The Master Blueprint
                                        </h3>
                                    </div>

                                    <div className="flex items-end justify-between w-full px-4 md:px-12 mt-8">
                                        <div className="flex flex-col items-center">
                                            <div className="text-sm md:text-base font-mono text-zinc-300 border-b border-white/20 pb-1 w-32 text-center">
                                                {date}
                                            </div>
                                            <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-2">Date</div>
                                        </div>
                                        
                                        {/* Seal */}
                                        <div className="relative flex items-center justify-center">
                                            <div className="absolute w-16 h-16 md:w-20 md:h-20 bg-emerald-500/20 rounded-full blur-md" />
                                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-emerald-500/50 bg-black flex items-center justify-center relative z-10">
                                                <Award className="w-6 h-6 md:w-8 md:h-8 text-emerald-400" />
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center">
                                            <div className="text-sm md:text-base font-mono text-zinc-300 border-b border-white/20 pb-1 w-32 text-center" style={{ fontFamily: "'Brush Script MT', cursive" }}>
                                                Brand Activation Network
                                            </div>
                                            <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-2">Authority</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Actions */}
                        <div className="p-4 md:p-6 bg-black/40 border-t border-white/5 flex flex-col sm:flex-row items-center justify-end gap-4">
                            <button
                                onClick={handleShare}
                                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium flex items-center justify-center gap-2 transition-all active:scale-95"
                            >
                                <Share2 className="w-4 h-4" /> Share Achievement
                            </button>
                            <button
                                onClick={() => {
                                    // In a full implementation, you'd use html2canvas to capture the #certificate-node
                                    // For now, we'll provide a placeholder alert or trigger a browser print
                                    window.print();
                                }}
                                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                            >
                                <Download className="w-4 h-4" /> Save as PDF
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}
