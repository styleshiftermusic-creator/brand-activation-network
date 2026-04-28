"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, Download, Lock, CheckCircle2, FileText, BookOpen, Brain, Loader2, ChevronLeft, ChevronRight, Image } from "lucide-react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Quiz from "@/components/dashboard/Quiz";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer?: number | string;
    answer?: string;
    citation?: string;
    source_citation?: string;
}

interface ModuleData {
    id: string;
    title: string;
    duration: string;
    status: string;
    description: string;
    quiz: QuizQuestion[];
    mediaSrc: string;
    visuals: string[];
    resources: { type: string; name: string; icon: React.ReactNode }[];
}

function buildModules(courseData: Record<string, { title: string; studyGuide: string; quiz: QuizQuestion[]; audioSrc: string; visuals?: string[] }>): ModuleData[] {
    return Object.entries(courseData).map(([key, data]) => {
        const wordCount = data.studyGuide.split(/\s+/).length;
        const totalMinutes = Math.ceil(wordCount / 150);
        const mins = String(totalMinutes).padStart(2, '0');
        return {
            id: `M-0${key}`,
            title: data.title,
            duration: `${mins}:00`,
            status: "ACTIVE",
            description: data.studyGuide,
            quiz: data.quiz,
            mediaSrc: data.audioSrc,
            visuals: data.visuals || [],
            resources: [
                { type: "PDF", name: "Module Blueprint", icon: <FileText className="w-4 h-4" /> }
            ]
        };
    });
}

export default function MasterCoursePage() {
    const [activeModuleId, setActiveModuleId] = useState("M-01");
    const [activeTab, setActiveTab] = useState<'study' | 'quiz' | 'resources'>('study');
    const [modules, setModules] = useState<ModuleData[]>([]);
    const [isLoadingContent, setIsLoadingContent] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioProgress, setAudioProgress] = useState(0);
    const [audioDuration, setAudioDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);
    const isManualNavRef = useRef(false);

    const logActivity = async (type: "DOWNLOAD" | "MODULE_VIEW" | "QUIZ_COMPLETE", id?: string, metadata?: any) => {
        try {
            fetch("/api/activity", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ activity_type: type, target_id: id, metadata }),
            });
        } catch (err) {
            console.error("Failed to log activity:", err);
        }
    };


    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
    };

    const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!audioRef.current || !audioDuration) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const clickPosition = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const newTime = clickPosition * audioDuration;
        audioRef.current.currentTime = newTime;
        setAudioProgress(newTime);
    };

    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const activeModule = modules.find(m => m.id === activeModuleId) || modules[0];

    // Fetch course content from protected API
    useEffect(() => {
        async function loadCourseContent() {
            try {
                const res = await fetch("/api/course-content");
                if (!res.ok) throw new Error("Failed to load course content");
                const data = await res.json();
                setModules(buildModules(data));
            } catch (err) {
                console.error("Error loading course content:", err);
            } finally {
                setIsLoadingContent(false);
            }
        }
        loadCourseContent();
    }, []);

    useEffect(() => {
        setCurrentSlide(0);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        // Log view
        if (activeModuleId && activeModule) {
            logActivity("MODULE_VIEW", activeModuleId, { title: activeModule.title });
        }
    }, [activeModuleId, modules]);


    // Audio-Slide Sync: auto-advance slides based on audio position
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => {
            if (isManualNavRef.current) return;
            const { currentTime, duration } = audio;
            if (!duration || duration === 0) return;

            const slideCount = activeModule?.visuals?.length || 0;
            if (slideCount <= 1) return;

            const secondsPerSlide = duration / slideCount;
            const targetSlide = Math.min(
                Math.floor(currentTime / secondsPerSlide),
                slideCount - 1
            );
            setCurrentSlide(prev => prev !== targetSlide ? targetSlide : prev);
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
    }, [activeModule]);

    // Seek audio to the correct position when manually navigating slides
    const seekToSlide = useCallback((slideIndex: number) => {
        const audio = audioRef.current;
        if (!audio || !audio.duration) return;
        const slideCount = activeModule?.visuals?.length || 1;
        const secondsPerSlide = audio.duration / slideCount;
        // Briefly suppress auto-advance to avoid fighting the manual nav
        isManualNavRef.current = true;
        audio.currentTime = slideIndex * secondsPerSlide;
        setTimeout(() => { isManualNavRef.current = false; }, 300);
    }, [activeModule]);

    const goToPrevSlide = useCallback(() => {
        setCurrentSlide(prev => {
            const next = Math.max(0, prev - 1);
            seekToSlide(next);
            return next;
        });
    }, [seekToSlide]);

    const goToNextSlide = useCallback(() => {
        const maxSlide = (activeModule?.visuals?.length || 1) - 1;
        setCurrentSlide(prev => {
            const next = Math.min(maxSlide, prev + 1);
            seekToSlide(next);
            return next;
        });
    }, [seekToSlide, activeModule]);

    const fetchProgress = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data: progressData, error } = await supabase
                .from('course_progress')
                .select('module_id, status')
                .eq('user_id', user.id);

            if (error) throw error; // If DB tables don't exist, this throws and we keep fallback ACTIVE

            if (progressData && progressData.length > 0) {
                setModules(prev => prev.map(m => {
                    const userProgress = progressData.find(p => p.module_id === m.id);
                    if (userProgress) {
                        return { ...m, status: userProgress.status };
                    }
                    return { ...m, status: "LOCKED" }; // Any module without a record is locked
                }));
            } else {
                // First time user, initialize M-01, others locked
                await supabase.from('course_progress').insert({
                    user_id: user.id,
                    module_id: 'M-01',
                    status: 'ACTIVE'
                });
                setModules(prev => prev.map(m => m.id === 'M-01' ? { ...m, status: 'ACTIVE' } : { ...m, status: 'LOCKED' }));
            }
        } catch {
            console.warn("Telemetry database not yet initialized. Falling back to Unlocked Mode.");
        }
    };

    const markModuleComplete = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            // Mark current module as COMPLETED
            await supabase.from('course_progress').upsert({
                user_id: user.id,
                module_id: activeModule.id,
                status: 'COMPLETED'
            }, { onConflict: 'user_id,module_id' });

            // Unlock next module
            const currentIndex = modules.findIndex(m => m.id === activeModule.id);
            if (currentIndex < modules.length - 1) {
                const nextModule = modules[currentIndex + 1];
                await supabase.from('course_progress').upsert({
                    user_id: user.id,
                    module_id: nextModule.id,
                    status: 'ACTIVE'
                }, { onConflict: 'user_id,module_id' });
            }

            // Log completion
            logActivity("MODULE_VIEW", activeModule.id, { completed: true });

            // Refresh UI
            await fetchProgress();
        } catch (err) {
            console.error("Failed to save progress:", err);
        }
    };

    useEffect(() => {
        if (modules.length > 0) fetchProgress();
    }, [modules]);

    if (isLoadingContent || modules.length === 0) {
        return (
            <div className="min-h-screen bg-[#050505] flex text-zinc-300 font-sans selection:bg-emerald-500/30 relative overflow-hidden">
                <div className="fixed top-0 left-1/4 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none z-0" />
                <Sidebar />
                <main className="flex-1 p-6 lg:p-10 lg:pl-12 overflow-y-auto z-10 flex flex-col lg:flex-row gap-8">
                    {/* LEFT PANE SKELETON */}
                    <div className="flex-1 flex flex-col animate-pulse">
                        <div className="mb-6 border-b border-white/10 pb-4">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="h-5 w-20 bg-emerald-500/10 rounded" />
                                <div className="h-4 w-40 bg-white/5 rounded hidden sm:block" />
                            </div>
                            <div className="h-8 w-72 bg-white/5 rounded" />
                        </div>
                        <div className="w-full aspect-video bg-black/40 backdrop-blur-2xl rounded-xl mb-8 border border-white/10 flex items-center justify-center">
                            <div className="h-20 w-20 rounded-full bg-emerald-500/10 border border-emerald-500/30" />
                        </div>
                        <div className="flex gap-1 mb-6">
                            {[1, 2, 3].map(i => <div key={i} className="h-10 flex-1 bg-white/5 rounded-lg" />)}
                        </div>
                        <div className="space-y-3">
                            {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-4 bg-white/5 rounded" style={{ width: `${90 - i * 8}%` }} />)}
                        </div>
                    </div>
                    {/* RIGHT PANE SKELETON */}
                    <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 animate-pulse">
                        <div className="h-6 w-48 bg-white/5 rounded mb-4" />
                        <div className="space-y-2">
                            {[1, 2, 3, 4, 5, 6, 7].map(i => (
                                <div key={i} className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-lg bg-emerald-500/10" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 w-32 bg-white/5 rounded" />
                                        <div className="h-3 w-20 bg-white/5 rounded" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] flex text-zinc-300 font-sans selection:bg-emerald-500/30 relative overflow-hidden">
            {/* Deep Ambient Glows - Emerald color for wealth/finance theme */}
            <div className="fixed top-0 left-1/4 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none z-0" />

            <Sidebar />

            <main className="flex-1 p-6 lg:p-10 lg:pl-12 overflow-y-auto z-10 flex flex-col lg:flex-row gap-8">

                {/* LEFT PANE: Cinematic Main Viewer */}
                <div className="flex-1 flex flex-col animate-fade-in-up">
                    <header className="mb-6 border-b border-white/10 pb-4">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 tracking-widest uppercase shadow-[0_0_15px_-3px_rgba(16,185,129,0.3)]">
                                Module {activeModule.id.replace('M-', '')}
                            </span>
                            <span className="text-xs font-mono text-zinc-500 tracking-wider hidden sm:block">| FOUNDATIONAL PROTOCOL</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-medium tracking-tight text-white">{activeModule.title}</h1>
                    </header>

                    {/* Mobile Module Selector - Only visible on small screens */}
                    <div className="lg:hidden mb-6">
                        <div className="p-1 rounded-xl bg-white/5 border border-white/10 flex gap-1 overflow-x-auto no-scrollbar pb-1">
                            {modules.map((m) => {
                                const isSelected = activeModuleId === m.id;
                                const isLocked = m.status === "LOCKED";
                                const isCompleted = m.status === "COMPLETED";
                                
                                return (
                                    <button
                                        key={m.id}
                                        onClick={() => !isLocked && setActiveModuleId(m.id)}
                                        disabled={isLocked}
                                        className={`flex-shrink-0 px-4 py-2.5 rounded-lg text-xs font-mono transition-all duration-300 flex items-center gap-2 ${
                                            isSelected 
                                                ? "bg-emerald-500 text-black font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)]" 
                                                : isLocked 
                                                    ? "opacity-30 grayscale cursor-not-allowed" 
                                                    : "text-zinc-400 hover:text-white bg-white/5"
                                        }`}
                                    >
                                        {isCompleted && <CheckCircle2 className="w-3 h-3" />}
                                        {isLocked && <Lock className="w-3 h-3" />}
                                        {!isCompleted && !isLocked && <Play className="w-3 h-3 fill-current" />}
                                        {m.id}
                                    </button>
                                );
                            })}
                        </div>
                    </div>


                    {/* Slide Viewer — Always Visible */}
                    <div className="w-full aspect-video bg-black/40 backdrop-blur-2xl rounded-xl relative group overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center">
                        {/* Outer Glass Border */}
                        <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none z-20" />
                        <div className="absolute inset-0 border border-white/[0.02] m-[1px] rounded-xl pointer-events-none z-20" />

                        {/* Slide Visual or Fallback */}
                        {activeModule.visuals && activeModule.visuals.length > 0 ? (
                            <>
                                <img
                                    key={`${activeModule.id}-${currentSlide}`}
                                    src={activeModule.visuals[currentSlide]}
                                    alt={`${activeModule.title} — Slide ${currentSlide + 1}`}
                                    className="absolute inset-0 w-full h-full object-contain z-0 animate-fade-in"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 z-10 pointer-events-none" />

                                {/* Slide Navigation — Always Active */}
                                {activeModule.visuals.length > 1 && (
                                    <>
                                        <button
                                            onClick={goToPrevSlide}
                                            disabled={currentSlide === 0}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/60 border border-white/10 text-white/70 hover:text-white hover:bg-black/80 disabled:opacity-20 disabled:cursor-not-allowed transition-all backdrop-blur-md"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={goToNextSlide}
                                            disabled={currentSlide === activeModule.visuals.length - 1}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/60 border border-white/10 text-white/70 hover:text-white hover:bg-black/80 disabled:opacity-20 disabled:cursor-not-allowed transition-all backdrop-blur-md"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </>
                                )}

                                {/* Slide Counter Badge */}
                                {activeModule.visuals.length > 1 && (
                                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30">
                                        <span className="bg-black/70 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10 text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                                            <Image className="w-3 h-3" />
                                            {currentSlide + 1} / {activeModule.visuals.length}
                                        </span>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-black to-black z-0" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-3">
                                    <Image className="w-12 h-12 text-emerald-500/30" />
                                    <p className="text-xs font-mono text-zinc-600 tracking-wider uppercase">Slide visuals loading</p>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Audio Player Bar — Custom UI */}
                    <div className="w-full mt-3 mb-6 p-4 bg-black/50 backdrop-blur-xl rounded-xl border border-white/10 flex items-center gap-4 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]">
                        <button 
                            onClick={togglePlay}
                            className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)] hover:bg-emerald-500/25 transition-all text-emerald-400 group focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                        >
                            {isPlaying ? (
                                <Pause className="h-5 w-5 fill-emerald-400 text-emerald-400 group-hover:scale-110 transition-transform" />
                            ) : (
                                <Play className="h-5 w-5 fill-emerald-400 text-emerald-400 ml-1 group-hover:scale-110 transition-transform" />
                            )}
                        </button>
                        
                        <div className="flex-1 flex flex-col gap-2.5 min-w-0 py-1">
                            {/* Track Info & Time */}
                            <div className="flex justify-between items-end text-[10px] font-mono tracking-wider uppercase">
                                <span className="text-zinc-400 truncate pr-4">
                                    <span className="text-emerald-500/80 mr-2">Module {activeModule.id.replace('M-0', '')}</span> 
                                    {activeModule.title}
                                </span>
                                <span className="text-zinc-500 flex-shrink-0">
                                    {formatTime(audioProgress)} / {formatTime(audioDuration || 0)}
                                </span>
                            </div>
                            
                            {/* Custom Playback Timeline */}
                            <div 
                                className="w-full h-2 md:h-1.5 bg-white/5 rounded-full cursor-pointer relative group/timeline"
                                onClick={handleTimelineClick}
                            >
                                {/* Transparent expanded hit area for touch */}
                                <div className="absolute -inset-y-4 left-0 right-0 z-10" />
                                
                                <div 
                                    className="absolute top-0 left-0 h-full bg-emerald-500/80 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-100 ease-linear z-0"
                                    style={{ width: `${audioDuration ? (audioProgress / audioDuration) * 100 : 0}%` }}
                                />
                                <div 
                                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 md:w-3 md:h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] opacity-100 md:opacity-0 md:group-hover/timeline:opacity-100 transition-opacity ease-out pointer-events-none z-20"
                                    style={{ left: `${audioDuration ? (audioProgress / audioDuration) * 100 : 0}%`, transform: 'translate(-50%, -50%)' }}
                                />
                            </div>


                            <audio
                                ref={audioRef}
                                key={activeModule.mediaSrc}
                                src={activeModule.mediaSrc}
                                onTimeUpdate={(e) => setAudioProgress(e.currentTarget.currentTime)}
                                onLoadedMetadata={(e) => setAudioDuration(e.currentTarget.duration)}
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                                onEnded={() => setIsPlaying(false)}
                                className="hidden"
                            />
                        </div>
                    </div>

                    {/* Tab Navigation & Content Area */}
                    <div className="flex flex-col gap-8">

                        {/* Interactive Tabs */}
                        <div className="flex gap-4 md:gap-8 border-b border-white/10 overflow-x-auto no-scrollbar">
                            <button
                                onClick={() => setActiveTab('study')}
                                className={`pb-4 flex-shrink-0 flex items-center gap-2 text-sm md:text-base font-medium transition-all duration-300 border-b-2 tracking-tight relative ${activeTab === 'study'

                                    ? 'text-white'
                                    : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:border-white/20'
                                    }`}
                            >
                                <BookOpen className="w-4 h-4 md:w-5 md:h-5" />
                                Study Guide
                                {activeTab === 'study' && (
                                    <motion.div 
                                        layoutId="tab-underline"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                                    />
                                )}
                            </button>
                            <button
                                onClick={() => setActiveTab('quiz')}
                                className={`pb-4 flex-shrink-0 flex items-center gap-2 text-sm md:text-base font-medium transition-all duration-300 border-b-2 tracking-tight relative ${activeTab === 'quiz'

                                    ? 'text-white'
                                    : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:border-white/20'
                                    }`}
                            >
                                <Brain className="w-4 h-4 md:w-5 md:h-5" />
                                Knowledge Check
                                {activeTab === 'quiz' && (
                                    <motion.div 
                                        layoutId="tab-underline"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                                    />
                                )}
                            </button>
                            <button
                                onClick={() => setActiveTab('resources')}
                                className={`pb-4 flex-shrink-0 flex items-center gap-2 text-sm md:text-base font-medium transition-all duration-300 border-b-2 tracking-tight relative ${activeTab === 'resources'

                                    ? 'text-white'
                                    : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:border-white/20'
                                    }`}
                            >
                                <Download className="w-4 h-4 md:w-5 md:h-5" />
                                Resources
                                {activeTab === 'resources' && (
                                    <motion.div 
                                        layoutId="tab-underline"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                                    />
                                )}
                            </button>
                        </div>

                        {/* Content Viewer */}
                        <div className="min-h-[400px] relative">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab + activeModuleId}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {activeTab === 'study' && (
                                        <div>
                                            <div className="prose prose-invert prose-emerald prose-sm md:prose-base max-w-none text-zinc-300 leading-relaxed font-sans">
                                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                    {activeModule.description}
                                                </ReactMarkdown>
                                            </div>

                                            {/* Mark Complete Button */}
                                            {activeModule.status !== 'COMPLETED' && (
                                                <div className="mt-10 mb-20 flex justify-center">
                                                    <button
                                                        onClick={markModuleComplete}
                                                        className="px-8 py-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500 hover:text-white font-medium tracking-wide transition-all duration-300 shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center gap-3 group"
                                                    >
                                                        <CheckCircle2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                                        Mark Module Complete
                                                    </button>
                                                </div>
                                            )}
                                            {activeModule.status === 'COMPLETED' && (
                                                <div className="mt-10 mb-20 flex justify-center">
                                                    <div className="px-8 py-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-500/60 font-medium tracking-wide flex items-center gap-3">
                                                        <CheckCircle2 className="w-5 h-5" />
                                                        Module Completed
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {activeTab === 'quiz' && (
                                        <div className="pb-20">
                                            <Quiz
                                                key={activeModule.id}
                                                moduleId={activeModule.id}
                                                questions={activeModule.quiz || []}
                                                onComplete={fetchProgress}
                                            />
                                        </div>
                                    )}

                                    {activeTab === 'resources' && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-20">
                                            {activeModule.resources && activeModule.resources.length > 0 ? (
                                                activeModule.resources.map((res, idx) => (
                                                    <button key={idx} className="w-full flex items-center justify-between p-4 rounded-xl border border-white/5 bg-black/40 backdrop-blur-md hover:bg-white/10 hover:border-emerald-500/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(16,185,129,0.2)] group text-left relative overflow-hidden">
                                                        <div className="absolute inset-0 border border-white/[0.02] pointer-events-none rounded-xl" />
                                                        <div className="flex items-center gap-4 relative z-10">
                                                            <div className="p-2 rounded-lg bg-black/60 border border-white/5 text-zinc-500 group-hover:text-emerald-400 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-all duration-500 group-hover:scale-110">
                                                                {res.icon}
                                                            </div>
                                                            <div>
                                                                <div className="text-sm md:text-base font-medium text-zinc-300 group-hover:text-white transition-colors tracking-tight">{res.name}</div>
                                                                <div className="text-[10px] font-mono text-zinc-500 uppercase">{res.type} Format</div>
                                                            </div>
                                                        </div>
                                                        <Download className="w-5 h-5 text-zinc-600 group-hover:text-emerald-400 group-hover:-translate-y-1 transition-all duration-500 relative z-10" />
                                                    </button>
                                                ))
                                            ) : (
                                                <div className="col-span-full p-8 rounded-xl bg-black/40 border border-white/5 text-center text-zinc-500 flex flex-col items-center justify-center backdrop-blur-md border-dashed">
                                                    <Download className="w-8 h-8 mb-3 opacity-30" />
                                                    <p className="text-sm">Downloadable materials unlocking soon.</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                    </div>

                </div>

                {/* RIGHT PANE: Module Navigation Matrix */}
                <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-5 sticky top-10 h-[calc(100vh-80px)] overflow-y-auto hidden-scrollbar">
                        <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-zinc-500 mb-6">Course Matrix</h2>

                        <div className="space-y-3">
                            {modules.map((module, idx) => {
                                const isSelected = activeModuleId === module.id;
                                const isLocked = module.status === "LOCKED";
                                const isCompleted = module.status === "COMPLETED";

                                return (
                                    <motion.button
                                        key={module.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 + idx * 0.05 }}
                                        onClick={() => !isLocked && setActiveModuleId(module.id)}
                                        disabled={isLocked}
                                        className={`w-full text-left p-4 rounded-xl transition-all duration-300 relative overflow-hidden group ${isLocked
                                            ? "opacity-50 border border-white/5 cursor-not-allowed bg-black/20"
                                            : isSelected
                                                ? "bg-gradient-to-br from-emerald-500/10 to-black/60 border border-emerald-500/50 text-white shadow-[0_0_30px_-5px_rgba(16,185,129,0.2)]"
                                                : "bg-black/40 border border-white/5 hover:border-white/20 hover:bg-white-[0.02] text-zinc-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_-10px_rgba(0,0,0,0.5)]"
                                            }`}
                                    >
                                        <div className="absolute inset-0 border border-white/[0.02] rounded-xl pointer-events-none" />

                                        {isSelected && (
                                            <motion.div 
                                                layoutId="module-active-pill"
                                                className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)] z-10" 
                                            />
                                        )}

                                        <div className="flex gap-4 relative z-20">
                                            {/* Status Icon */}
                                            <div className="flex-shrink-0 mt-0.5">
                                                {isCompleted ? (
                                                    <CheckCircle2 className={`w-5 h-5 ${isSelected ? 'text-emerald-400' : 'text-green-500'}`} />
                                                ) : isLocked ? (
                                                    <Lock className="w-5 h-5 text-zinc-600" />
                                                ) : (
                                                    <div className="relative">
                                                        <Loader2 className="w-5 h-5 text-emerald-500 animate-spin" />
                                                        <div className="absolute inset-0 w-5 h-5 rounded-full bg-emerald-500/20 blur animate-pulse" />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div>
                                                <div className="text-[10px] font-mono text-zinc-500 mb-1 flex justify-between items-center">
                                                    <span>{module.id}</span>
                                                    <span>{module.duration}</span>
                                                </div>
                                                <h4 className={`text-sm leading-snug tracking-tight font-medium ${isLocked ? 'text-zinc-500' : isSelected ? 'text-white' : 'text-zinc-300'}`}>
                                                    {module.title}
                                                </h4>
                                            </div>
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
