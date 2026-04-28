"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, X } from "lucide-react";

/**
 * Social proof notification that cycles through recent "activity" messages.
 * Shows a sliding toast on the bottom-left of the screen, auto-dismisses.
 * Designed to increase urgency and conversion on public-facing pages.
 */

const MESSAGES = [
    { name: "Marcus T.", action: "joined the network", time: "2 hours ago", location: "Atlanta, GA" },
    { name: "Aisha R.", action: "started Module 1", time: "3 hours ago", location: "Houston, TX" },
    { name: "Devon L.", action: "downloaded the Starter Kit", time: "5 hours ago", location: "Los Angeles, CA" },
    { name: "Jordan M.", action: "completed Module 3", time: "8 hours ago", location: "Chicago, IL" },
    { name: "Taylor S.", action: "joined the network", time: "12 hours ago", location: "Miami, FL" },
    { name: "Cameron W.", action: "downloaded Credit Sweep Blueprint", time: "1 day ago", location: "Dallas, TX" },
    { name: "Morgan K.", action: "completed all 7 modules", time: "1 day ago", location: "New York, NY" },
];

interface SocialProofToastProps {
    /** Delay in ms before first appearance */
    initialDelay?: number;
    /** Time in ms between notifications */
    interval?: number;
    /** How long each toast stays visible (ms) */
    displayDuration?: number;
}

export function SocialProofToast({
    initialDelay = 8000,
    interval = 25000,
    displayDuration = 6000,
}: SocialProofToastProps) {
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    const showNext = useCallback(() => {
        if (isDismissed) return;
        setCurrentIndex(prev => {
            const next = (prev + 1) % MESSAGES.length;
            return next;
        });
        setIsVisible(true);
    }, [isDismissed]);

    // Initial delay before first toast
    useEffect(() => {
        if (isDismissed) return;
        const timer = setTimeout(showNext, initialDelay);
        return () => clearTimeout(timer);
    }, [initialDelay, showNext, isDismissed]);

    // Auto-hide after displayDuration
    useEffect(() => {
        if (!isVisible || isDismissed) return;
        const timer = setTimeout(() => setIsVisible(false), displayDuration);
        return () => clearTimeout(timer);
    }, [isVisible, displayDuration, isDismissed]);

    // Cycle to next notification after hide
    useEffect(() => {
        if (isVisible || isDismissed || currentIndex === -1) return;
        const timer = setTimeout(showNext, interval);
        return () => clearTimeout(timer);
    }, [isVisible, interval, showNext, isDismissed, currentIndex]);

    const message = currentIndex >= 0 ? MESSAGES[currentIndex] : null;

    if (isDismissed || !message) return null;

    return (
        <div className="fixed bottom-6 left-6 z-50 pointer-events-auto" aria-live="polite">
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative max-w-xs bg-[#111]/90 backdrop-blur-xl border border-white/10 rounded-xl p-4 pr-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden"
                    >
                        {/* Shimmer */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent pointer-events-none" />

                        {/* Dismiss */}
                        <button
                            onClick={() => setIsDismissed(true)}
                            className="absolute top-2 right-2 p-1 rounded-md text-zinc-600 hover:text-white hover:bg-white/10 transition-colors"
                            aria-label="Dismiss notifications"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex items-start gap-3">
                            {/* Avatar */}
                            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-[var(--primary)] to-emerald-500 flex items-center justify-center text-[11px] font-bold text-white shadow-[0_0_12px_rgba(157,78,221,0.3)]">
                                {message.name.split(" ").map(n => n[0]).join("")}
                            </div>

                            {/* Content */}
                            <div className="min-w-0">
                                <p className="text-[13px] text-white leading-snug">
                                    <span className="font-semibold">{message.name}</span>{" "}
                                    <span className="text-zinc-400">{message.action}</span>
                                </p>
                                <p className="text-[11px] text-zinc-600 mt-1 flex items-center gap-1.5">
                                    <Zap className="w-3 h-3 text-emerald-500/60 fill-current" />
                                    {message.location} · {message.time}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
