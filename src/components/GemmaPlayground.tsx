'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Loader2, RefreshCw, Zap, Brain, Target, MessageSquare, Terminal, ListChecks, FileText, Copy, Check } from 'lucide-react';
import { NeuralGrid } from './dashboard/NeuralGrid';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';


const PRESET_PROMPTS = [
  { id: 'lead', label: 'Analyze Lead Magnet', icon: <Target className="w-3 h-3" />, prompt: "Analyze this lead magnet idea and suggest 3 high-conversion optimizations: " },
  { id: 'script', label: 'Script TED Talk', icon: <MessageSquare className="w-3 h-3" />, prompt: "Draft a 5-minute TED-style script about Brand Activation and the Power of Environment. Use a punchy, emotionally resonant tone." },
  { id: 'strategy', label: 'Build Strategy', icon: <Brain className="w-3 h-3" />, prompt: "Design a 90-day scaling roadmap for a service-based business aiming to go from $10k to $50k/mo using OPA plays." },
];

const MODELS = [
  { id: 'gemma-4-26b-moe', name: 'Gemma 4 MoE (26B)', description: 'Advanced Reasoning & Mixture of Experts' },
  { id: 'gemma-4-31b-dense', name: 'Gemma 4 Dense (31B)', description: 'High-Precision Creative Writing' },
  { id: 'gemma-4-7b', name: 'Gemma 4 Flash (7B)', description: 'Ultra-Fast Low Latency' },
];

export default function GemmaPlayground({ initialPrompt }: { initialPrompt?: string }) {
  const [prompt, setPrompt] = useState(initialPrompt || '');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState(MODELS[0].id);

  // Auto-fill prompt when initialPrompt changes
  useEffect(() => {
    if (initialPrompt) {
      setPrompt(initialPrompt);
    }
  }, [initialPrompt]);
  const [copied, setCopied] = useState(false);
  const responseEndRef = useRef<HTMLDivElement>(null);

  // Suggestion 2: Detect Content Type for Generative Styling
  const getContentType = () => {
    const text = response.toLowerCase();
    if (text.includes('phase') || text.includes('roadmap') || text.includes('step 1')) return 'strategy';
    if (text.includes('script') || text.includes('scene') || text.includes('ted talk')) return 'script';
    if (text.includes('analysis') || text.includes('data') || text.includes('metric')) return 'intel';
    return 'default';
  };

  const contentType = getContentType();

  const scrollToBottom = () => {
    responseEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (response) scrollToBottom();
  }, [response]);

  const copyToClipboard = () => {
    if (!response) return;
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setError(null);
    setResponse('');

    // Log AI interaction activity
    try {
      fetch("/api/activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            activity_type: "AI_PROMPT", 
            target_id: "GEMMA_4", 
            metadata: { prompt: prompt.slice(0, 100) } 
        }),
      }).catch(e => console.warn("Activity logging failed:", e));
    } catch (e) {
      // Silently fail
    }

    try {
      const res = await fetch('/api/ai/gemma', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          stream: true,
          model: selectedModel
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to connect to Gemma 4');
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const rawChunk = decoder.decode(value, { stream: true });
          
          try {
            const lines = rawChunk.split('\n').filter(l => l.trim());
            for (const line of lines) {
              const data = JSON.parse(line);
              if (data.response) {
                setResponse((prev) => prev + data.response);
              }
            }
          } catch {
            setResponse((prev) => prev + rawChunk);
          }
        }
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Neural link failed.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 relative">
      <NeuralGrid />
      
      {/* Model Selection Bar */}
      <div className="flex flex-wrap gap-2 mb-2 relative z-10">
        {MODELS.map((model) => (
          <button
            key={model.id}
            onClick={() => setSelectedModel(model.id)}
            className={`px-3 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase transition-all duration-300 border ${
              selectedModel === model.id 
                ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_-5px_rgba(0,208,132,0.3)]'
                : 'bg-zinc-900/50 border-white/5 text-zinc-500 hover:text-zinc-300 hover:border-white/10'
            }`}
          >
            {model.name}
          </button>
        ))}
      </div>

      <div className="relative group z-10">
        {/* Glow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-emerald-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
        
        <div className="relative bg-zinc-900/80 border border-white/10 rounded-2xl backdrop-blur-2xl overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
                  <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white tracking-tight">Gemma 4 Lab</h2>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Neural Execution Engine v4.2</p>
                </div>
              </div>
              <button 
                onClick={() => { setPrompt(''); setResponse(''); setError(null); }}
                className="p-2 text-zinc-500 hover:text-white transition-colors"
                title="Reset Lab"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Initiate prompt sequence..."
                  className="w-full h-40 p-5 bg-black/40 border border-white/5 rounded-xl text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all resize-none font-sans leading-relaxed"
                />
                <button
                  type="submit"
                  disabled={loading || !prompt.trim()}
                  className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed text-black font-bold rounded-lg transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  <span className="text-xs uppercase tracking-widest">Execute</span>
                </button>
              </div>
            </form>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-[10px] font-mono text-zinc-600 self-center mr-2 uppercase tracking-tighter">Quick Start:</span>
              {PRESET_PROMPTS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => { setPrompt(preset.prompt); }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-[10px] text-zinc-400 hover:text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300"
                >
                  {preset.icon}
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {(response || error) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-white/5 bg-black/20"
              >
                <div className="p-6 max-h-[500px] overflow-y-auto custom-scrollbar relative">
                  {error ? (
                    <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                      {error}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Dynamic Header based on content type */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-500/60 uppercase tracking-widest">
                          {contentType === 'strategy' ? <ListChecks className="w-3 h-3" /> :
                           contentType === 'script' ? <FileText className="w-3 h-3" /> :
                           contentType === 'intel' ? <Terminal className="w-3 h-3" /> :
                           <Sparkles className="w-3 h-3" />}
                          {contentType === 'strategy' ? 'Neural Roadmap Generation' :
                           contentType === 'script' ? 'Content Script Output' :
                           contentType === 'intel' ? 'System Intelligence Analysis' :
                           'Gemma Output Stream'}
                        </div>
                        <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/20 to-transparent mx-4" />
                      </div>

                      {/* Suggestion 2: Themed Content Area */}
                      <div className={`prose prose-invert prose-emerald max-w-none transition-all duration-700 ${
                        contentType === 'strategy' ? 'pl-6 border-l border-emerald-500/20' :
                        contentType === 'script' ? 'font-mono text-center max-w-2xl mx-auto italic' :
                        contentType === 'intel' ? 'bg-emerald-500/5 p-4 rounded-lg border border-emerald-500/10' :
                        ''
                      }`}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {response}
                        </ReactMarkdown>
                        {loading && (
                          <span className="inline-flex items-center gap-2 mt-2 text-[10px] font-mono text-emerald-500/40">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            Synthesizing...
                          </span>
                        )}
                      </div>

                      {!loading && response && (
                        <div className="mt-6 flex justify-end">
                          <button
                            onClick={copyToClipboard}
                            className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-[10px] font-mono text-zinc-400 hover:text-white transition-all group"
                          >
                            {copied ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">Archived to Clipboard</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3 group-hover:text-emerald-400 transition-colors" />
                                <span>Extract Intelligence</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                      <div ref={responseEndRef} />
                    </div>
                  )}
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <div className="flex justify-between items-center px-2">
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Model Online</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Quantization: 4-bit</span>
          </div>
        </div>
        <p className="text-[9px] font-mono text-zinc-700 uppercase tracking-[0.2em]">DeepMind Infrastructure Node-01</p>
      </div>
    </div>
  );
}

