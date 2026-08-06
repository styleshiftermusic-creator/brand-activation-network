"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, Save, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Module {
  id: string;
  title: string;
  category: string;
  audio_src: string;
  visuals: any[];
  study_guide: string;
  resources: any[];
  quiz: any[];
  order_index: number;
}

export default function AdminDashboard() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Module | null>(null);
  const [saving, setSaving] = useState(false);

  // Load modules (admin only)
  useEffect(() => {
    async function fetchModules() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      // Assume the user profile has a `role` field
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      if (profile?.role !== 'admin') {
        alert('Access denied – admin only');
        window.location.href = "/dashboard";
        return;
      }
      const { data, error } = await supabase
        .from('course_modules')
        .select('*')
        .order('order_index');
      if (!error) setModules(data as Module[]);
      setLoading(false);
    }
    fetchModules();
  }, []);

  const startEdit = (mod: Module) => setEditing({ ...mod });
  const cancelEdit = () => setEditing(null);

  const handleChange = (field: keyof Module, value: any) => {
    if (!editing) return;
    setEditing({ ...editing, [field]: value });
  };

  const saveChanges = async () => {
    if (!editing) return;
    setSaving(true);
    const { error } = await supabase
      .from('course_modules')
      .upsert(editing, { onConflict: 'id' });
    if (!error) {
      setModules((prev) =>
        prev.map((m) => (m.id === editing.id ? editing : m))
      );
      setEditing(null);
    } else {
      console.error('Save failed', error);
      alert('Failed to save – check console');
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#050505] text-zinc-300">
        <Loader2 className="animate-spin mr-2" /> Loading admin data…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 p-6 lg:p-10 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="fixed inset-0 bg-emerald-500/5 blur-[200px] pointer-events-none" />
      <h1 className="text-3xl font-bold mb-8 text-emerald-400 tracking-wider">
        Course Modules – Admin Dashboard
      </h1>

      {/* Module List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((mod) => (
          <div
            key={mod.id}
            className="bg-black/40 border border-white/10 rounded-xl p-4 hover:border-emerald-500/30 transition-shadow shadow-[0_0_30px_rgba(0,0,0,0.3)]"
          >
            <h2 className="font-medium text-xl text-emerald-300 mb-2">
              {mod.title}
            </h2>
            <p className="text-sm text-zinc-400 mb-3 line-clamp-2">
              {mod.study_guide.slice(0, 120)}…
            </p>
            <div className="flex justify-between items-center">
              <button
                onClick={() => startEdit(mod)}
                className="px-3 py-1 text-sm bg-emerald-500/10 border border-emerald-500/30 rounded hover:bg-emerald-500/20 transition"
              >
                Edit
              </button>
              <span className="text-xs text-zinc-500">Order {mod.order_index}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="absolute inset-0 bg-black/70" onClick={cancelEdit} />
            <div className="relative bg-[#0a0a0a] border border-emerald-500/30 rounded-xl p-6 w-full max-w-2xl mx-4 shadow-xl">
              <h3 className="text-lg font-bold mb-4 text-emerald-300">
                Edit Module – {editing.title}
              </h3>
              <div className="space-y-4">
                <label className="block">
                  <span className="text-sm text-zinc-400">Title</span>
                  <input
                    type="text"
                    value={editing.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    className="mt-1 block w-full rounded bg-black/30 border border-white/10 text-zinc-200 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-zinc-400">Audio Source (URL)</span>
                  <input
                    type="text"
                    value={editing.audio_src}
                    onChange={(e) => handleChange('audio_src', e.target.value)}
                    className="mt-1 block w-full rounded bg-black/30 border border-white/10 text-zinc-200 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-zinc-400">Study Guide (Markdown)</span>
                  <textarea
                    rows={6}
                    value={editing.study_guide}
                    onChange={(e) => handleChange('study_guide', e.target.value)}
                    className="mt-1 block w-full rounded bg-black/30 border border-white/10 text-zinc-200 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-zinc-400">Visuals (JSON array of URLs)</span>
                  <textarea
                    rows={3}
                    value={JSON.stringify(editing.visuals, null, 2)}
                    onChange={(e) => {
                      try {
                        handleChange('visuals', JSON.parse(e.target.value));
                      } catch {}
                    }}
                    className="mt-1 block w-full rounded bg-black/30 border border-white/10 text-zinc-200 focus:border-emerald-500 focus:ring-emerald-500 font-mono text-xs"
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-zinc-400">Resources (JSON array)</span>
                  <textarea
                    rows={3}
                    value={JSON.stringify(editing.resources, null, 2)}
                    onChange={(e) => {
                      try {
                        handleChange('resources', JSON.parse(e.target.value));
                      } catch {}
                    }}
                    className="mt-1 block w-full rounded bg-black/30 border border-white/10 text-zinc-200 focus:border-emerald-500 focus:ring-emerald-500 font-mono text-xs"
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-zinc-400">Quiz (JSON array)</span>
                  <textarea
                    rows={3}
                    value={JSON.stringify(editing.quiz, null, 2)}
                    onChange={(e) => {
                      try {
                        handleChange('quiz', JSON.parse(e.target.value));
                      } catch {}
                    }}
                    className="mt-1 block w-full rounded bg-black/30 border border-white/10 text-zinc-200 focus:border-emerald-500 focus:ring-emerald-500 font-mono text-xs"
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-zinc-400">Order Index</span>
                  <input
                    type="number"
                    value={editing.order_index}
                    onChange={(e) => handleChange('order_index', parseInt(e.target.value, 10))}
                    className="mt-1 w-20 rounded bg-black/30 border border-white/10 text-zinc-200 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </label>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={cancelEdit}
                  disabled={saving}
                  className="px-4 py-2 rounded bg-gray-700/50 hover:bg-gray-600 text-sm text-zinc-300"
                >
                  <X className="inline w-4 h-4 mr-1" /> Cancel
                </button>
                <button
                  onClick={saveChanges}
                  disabled={saving}
                  className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-sm flex items-center gap-1"
                >
                  {saving ? (
                    <Loader2 className="animate-spin w-4 h-4" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
