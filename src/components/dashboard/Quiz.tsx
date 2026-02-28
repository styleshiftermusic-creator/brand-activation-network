"use client";

import React, { useState } from 'react';
import { CheckCircle2, XCircle, RefreshCcw } from 'lucide-react';

import { supabase } from '@/lib/supabase';

interface Question {
    question: string;
    options: string[];
    correctAnswer?: number | string;
    answer?: string; // Handle alternate key from the legacy JSON structure
}

interface QuizProps {
    moduleId: string;
    questions: Question[];
}

export default function Quiz({ moduleId, questions }: QuizProps) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [isAnswered, setIsAnswered] = useState(false);

    if (!questions || questions.length === 0) {
        return <div className="text-zinc-500 text-sm">No quiz available for this module yet.</div>;
    }

    // Helper to get correct index regardless of data format
    const getCorrectIndex = (q: Question) => {
        if (typeof q.correctAnswer === 'number') return q.correctAnswer;
        if (typeof q.correctAnswer === 'string') return q.options.findIndex(opt => opt === q.correctAnswer);
        if (q.answer) return q.options.findIndex(opt => opt === q.answer);
        return 0; // Fallback
    };

    const handleOptionClick = (index: number) => {
        if (isAnswered) return;
        setSelectedOption(index);
        setIsAnswered(true);

        const correctIndex = getCorrectIndex(questions[currentQuestion]);
        if (index === correctIndex) {
            setScore(score + 1);
        }
    };

    const handleNext = async () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            // End of quiz - push telemetry to Supabase
            setShowResult(true);
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    const finalScore = selectedOption === getCorrectIndex(questions[currentQuestion]) ? score + 1 : score;
                    const passed = (finalScore / questions.length) >= 0.8; // 80% passing grade requirement

                    await supabase.from('quiz_scores').insert({
                        user_id: user.id,
                        module_id: moduleId,
                        score: finalScore,
                        passed: passed
                    });

                    // Unlock the next module in course_progress if passed
                    if (passed) {
                        const nextModNum = parseInt(moduleId.replace('M-', '')) + 1;
                        const nextModId = `M-0${nextModNum}`;

                        // Upsert logic: attempt to insert the next module as ACTIVE if it doesn't exist
                        await supabase.from('course_progress').upsert({
                            user_id: user.id,
                            module_id: nextModId,
                            status: 'ACTIVE'
                        }, { onConflict: 'user_id, module_id', ignoreDuplicates: true });

                        // Mark current module as COMPLETED
                        await supabase.from('course_progress').upsert({
                            user_id: user.id,
                            module_id: moduleId,
                            status: 'COMPLETED',
                            completed_at: new Date().toISOString()
                        }, { onConflict: 'user_id, module_id' });
                    }
                }
            } catch (error) {
                console.error("Failed to save quiz score:", error);
            }
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setSelectedOption(null);
        setScore(0);
        setShowResult(false);
        setIsAnswered(false);
    };

    if (showResult) {
        return (
            <div className="bg-black/40 backdrop-blur-md rounded-xl p-8 border border-white/5 text-center relative overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <div className="absolute inset-0 border border-white/[0.02] rounded-xl pointer-events-none" />
                <h3 className="text-2xl font-medium tracking-tight text-white mb-4">Knowledge Check Complete</h3>
                <p className="text-zinc-400 mb-6">You scored <span className="text-emerald-400 font-mono tracking-widest">{score}</span> out of {questions.length}</p>

                <div className="w-full bg-black/60 border border-white/5 rounded-full h-2 mb-8 overflow-hidden relative">
                    <div
                        className="bg-emerald-500 h-full transition-all duration-1000 shadow-[0_0_15px_rgba(16,185,129,0.8)]"
                        style={{ width: `${(score / questions.length) * 100}%` }}
                    />
                </div>

                <button
                    onClick={resetQuiz}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-lg hover:bg-emerald-500 hover:text-black transition-all duration-300 font-medium tracking-wide shadow-[0_0_20px_rgba(16,185,129,0.1)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                >
                    <RefreshCcw className="w-4 h-4" />
                    Recalibrate & Retake
                </button>
            </div>
        );
    }

    const question = questions[currentQuestion];
    const correctIndex = getCorrectIndex(question);

    return (
        <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 md:p-8 border border-white/5 relative overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-0 border border-white/[0.02] rounded-xl pointer-events-none" />

            <div className="flex justify-between items-center mb-8 relative z-10">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-500/70 border border-emerald-500/20 px-2 py-1 rounded bg-emerald-500/5">
                    Query {currentQuestion + 1} / {questions.length}
                </span>
                <span className="text-[10px] font-mono tracking-widest text-zinc-500">
                    Accuracy: {score}
                </span>
            </div>

            <h3 className="text-lg md:text-xl font-medium tracking-tight text-white mb-8 relative z-10 leading-snug">
                {question.question}
            </h3>

            <div className="space-y-3 mb-8 relative z-10">
                {question.options.map((option, index) => {
                    const isSelected = selectedOption === index;
                    const isCorrect = isAnswered && index === correctIndex;
                    const isWrongSelection = isAnswered && isSelected && index !== correctIndex;

                    return (
                        <button
                            key={index}
                            onClick={() => handleOptionClick(index)}
                            disabled={isAnswered}
                            className={`w-full p-4 rounded-xl border text-left transition-all duration-300 flex justify-between items-center group relative overflow-hidden backdrop-blur-sm
                                ${isCorrect
                                    ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
                                    : isWrongSelection
                                        ? 'bg-red-500/10 border-red-500/50 text-red-400'
                                        : isSelected
                                            ? 'bg-emerald-500/20 border-emerald-500 text-white'
                                            : 'bg-black/60 border-white/5 hover:border-emerald-500/30 hover:bg-emerald-500/5 text-zinc-300'
                                }
                            `}
                        >
                            <span className="text-sm md:text-base">{option}</span>
                            {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)] flex-shrink-0 ml-4" />}
                            {isWrongSelection && <XCircle className="w-5 h-5 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] flex-shrink-0 ml-4" />}
                        </button>
                    );
                })}
            </div>

            {isAnswered && (
                <div className="flex justify-end animate-fade-in-up relative z-10">
                    <button
                        onClick={handleNext}
                        className="px-6 py-2.5 bg-white text-black rounded-lg font-medium hover:bg-zinc-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.2)] tracking-tight text-sm"
                    >
                        {currentQuestion < questions.length - 1 ? 'Next Query →' : 'Analyze Results'}
                    </button>
                </div>
            )}
        </div>
    );
}
