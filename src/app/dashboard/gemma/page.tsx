"use client";

import React from 'react';
import { Sidebar } from "@/components/dashboard/Sidebar";
import { GemmaLabClient } from '@/components/dashboard/GemmaLabClient';

export default function GemmaLabPage() {
  return (
    <div className="min-h-screen bg-[#050505] flex text-zinc-300 font-sans selection:bg-[var(--primary)]/30 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="fixed top-0 left-1/4 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none z-0" />
      
      <Sidebar />

      <main className="flex-1 overflow-y-auto z-10">
        <GemmaLabClient />
      </main>
    </div>
  );
}
