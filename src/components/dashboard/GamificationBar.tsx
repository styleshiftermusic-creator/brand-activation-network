"use client";

import { useEffect, useState } from "react";
import { m as motion, AnimatePresence } from "framer-motion";
import { Zap, Shield, Trophy } from "lucide-react";
import { supabase } from "@/lib/supabase";

export function GamificationBar() {
    const [credits, setCredits] = useState(0);
    const [badges, setBadges] = useState<string[]>([]);
    
    const fetchGamificationData = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        
        const { data } = await supabase
            .from('profiles')
            .select('credits, badges')
            .eq('id', user.id)
            .single();
            
        if (data) {
            setCredits(data.credits);
            setBadges(data.badges || []);
        }
    };

    useEffect(() => {
        fetchGamificationData();
        
        // Listen to profiles table changes to instantly update credits
        const channel = supabase.channel('schema-db-changes')
            .on(
                'postgres_changes',
                { event: 'UPDATE', schema: 'public', table: 'profiles' },
                (payload) => {
                    const updatedData = payload.new as any;
                    setCredits(updatedData.credits);
                    setBadges(updatedData.badges || []);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return (
        <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-4 py-2">
            <div className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30 group-hover:scale-110 transition-transform">
                    <Zap className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest leading-none">Credits</span>
                    <AnimatePresence mode="popLayout">
                        <motion.span 
                            key={credits}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm font-bold text-white leading-none mt-1"
                        >
                            {credits.toLocaleString()}
                        </motion.span>
                    </AnimatePresence>
                </div>
            </div>

            <div className="w-px h-6 bg-white/10" />

            <div className="flex items-center gap-2 group cursor-help" title={badges.length > 0 ? badges.join(", ") : "No badges yet"}>
                <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/30 group-hover:scale-110 transition-transform">
                    <Trophy className="w-4 h-4 text-amber-400" />
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest leading-none">Badges</span>
                    <span className="text-sm font-bold text-white leading-none mt-1">{badges.length}</span>
                </div>
            </div>
        </div>
    );
}
