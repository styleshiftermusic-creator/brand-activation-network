"use client";

import React from 'react';
import GemmaPlayground from '@/components/GemmaPlayground';
import { motion } from 'framer-motion';
import { Cpu, Globe, Zap } from 'lucide-react';

export function GemmaLabClient() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-6 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-3"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest">Experimental</span>
            <span className="h-px w-12 bg-zinc-800" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">AI Lab</h1>
          <p className="text-zinc-400 max-w-2xl text-lg leading-relaxed">
            Experiment with <span className="text-white font-medium">Gemma 4</span>, the latest open-weight model from Google DeepMind. 
            Test your prompts, generate curriculum content, and refine your brand strategy.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 gap-12"
        >
          <GemmaPlayground />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                title: "MoE Architecture", 
                desc: "26B Mixture of Experts for high-efficiency advanced reasoning.", 
                icon: <Cpu className="w-5 h-5 text-emerald-400" /> 
              },
              { 
                title: "Multimodal", 
                desc: "Native support for text and images (Cloud API).", 
                icon: <Globe className="w-5 h-5 text-blue-400" /> 
              },
              { 
                title: "Hybrid Execution", 
                desc: "Runs in the cloud or locally on your Mac via Ollama.", 
                icon: <Zap className="w-5 h-5 text-amber-400" /> 
              }
            ].map((card, i) => (
              <motion.div 
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                className="p-6 rounded-2xl bg-zinc-900/20 border border-white/5 backdrop-blur-sm group hover:border-emerald-500/30 transition-all duration-500"
              >
                <div className="p-2 w-fit rounded-lg bg-black/40 border border-white/5 mb-4 group-hover:scale-110 transition-transform duration-500">
                  {card.icon}
                </div>
                <h3 className="text-white font-semibold mb-2 tracking-tight">{card.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
