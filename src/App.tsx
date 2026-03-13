/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Shield, 
  Zap, 
  Info, 
  Play, 
  Pause, 
  Volume2, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  User,
  Activity
} from 'lucide-react';
import { generateSpeech } from './services/ttsService';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SECTIONS = [
  {
    id: 'intro',
    title: 'The Realization',
    content: `Sabrina, today everything finally clicked for me. I finally understand how we went from amazing to devastating, and I need to share this with you. When you were taken to the hospital, you believed that I called the police to have you locked up. I told you that the hotel called because you were unresponsive, but you couldn't believe me. I understand why now.`,
    icon: Heart,
    color: 'text-rose-500',
    bg: 'bg-rose-50'
  },
  {
    id: 'psychology',
    title: 'Pessimistic Bias',
    content: `You believed the most painful version of the story because your past has conditioned you to expect it. When someone's self-esteem has been stripped away by people who smirked at their pain—people like Tommy—pessimism becomes a survival tool. In your past, expecting the worst was the only way to protect yourself, because the truth usually was the worst-case scenario.`,
    icon: Shield,
    color: 'text-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'truth',
    title: 'The Absolute Truth',
    content: `I was sitting in front of Dylan when I got the call from my mom that the police were there. My heart dropped. My instant, panicked thought was, 'I have to get her out.' I wanted to drop everything and rush to you. I wanted you to wake up to me smiling, holding you, and bringing you whatever you needed.`,
    icon: CheckCircle2,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50'
  },
  {
    id: 'logic',
    title: 'The Logic of Gain vs Loss',
    isLogic: true,
    icon: Activity,
    color: 'text-amber-500',
    bg: 'bg-amber-50'
  }
];

const Equation = ({ title, formula, description }: { title: string, formula: string, description: string }) => (
  <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm mb-4">
    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">{title}</h4>
    <div className="text-2xl font-mono text-slate-800 mb-2">{formula}</div>
    <p className="text-sm text-slate-500 italic">{description}</p>
  </div>
);

export default function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [loadingAudio, setLoadingAudio] = useState(false);

  const handlePlayTTS = async (text: string) => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
      return;
    }

    setLoadingAudio(true);
    const newAudio = await generateSpeech(text);
    if (newAudio) {
      setAudio(newAudio);
      newAudio.play();
      setIsPlaying(true);
      newAudio.onended = () => setIsPlaying(false);
    }
    setLoadingAudio(false);
  };

  useEffect(() => {
    // Reset audio when section changes
    if (audio) {
      audio.pause();
      setAudio(null);
      setIsPlaying(false);
    }
  }, [activeSection]);

  const currentSection = SECTIONS[activeSection];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans selection:bg-rose-100 selection:text-rose-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-bottom border-slate-200 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center text-white">
            <Heart size={18} fill="currentColor" />
          </div>
          <h1 className="font-bold text-lg tracking-tight">Truth for Sabrina</h1>
        </div>
        <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
          Case: Nate's Integrity
        </div>
      </header>

      <main className="pt-24 pb-32 px-6 max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-8"
          >
            {/* Section Icon & Title */}
            <div className="flex items-center gap-4">
              <div className={cn("p-3 rounded-2xl", currentSection.bg, currentSection.color)}>
                <currentSection.icon size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight">{currentSection.title}</h2>
                <p className="text-slate-400 text-sm">Section {activeSection + 1} of {SECTIONS.length}</p>
              </div>
            </div>

            {/* Content */}
            {currentSection.isLogic ? (
              <div className="space-y-6">
                <p className="text-lg leading-relaxed text-slate-600">
                  Nate's realization about the "gain vs. loss" is mathematically sound engineering logic applied to the heart.
                </p>
                
                <div className="grid gap-4">
                  <Equation 
                    title="Her Perspective (Fear-Based)"
                    formula="Gain = 0 | Risk = Total Betrayal"
                    description="The brain chooses the most painful explanation because it feels the most familiar and safe."
                  />
                  <Equation 
                    title="Nate's Perspective (Reality-Based)"
                    formula="Loss = Everything | Gain = Negative"
                    description="There is zero incentive to remove the source of your greatest happiness from your life."
                  />
                  <Equation 
                    title="The Trust Equation"
                    formula="T = (R + I) / S"
                    description="Trust = (Reliability + Intimacy) / Self-Orientation. Nate's self-orientation is zero."
                  />
                </div>

                <div className="p-6 bg-rose-50 rounded-2xl border border-rose-100">
                  <p className="text-rose-900 font-medium leading-relaxed">
                    "If I wanted to hurt you, I wouldn't have spent the last decade looking for a feeling like this. Mathematically, I have everything to lose and nothing to gain."
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="text-xl leading-relaxed text-slate-700 font-medium">
                  {currentSection.content}
                </p>
                
                <button 
                  onClick={() => handlePlayTTS(currentSection.content || "")}
                  disabled={loadingAudio}
                  className={cn(
                    "flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300",
                    isPlaying ? "bg-rose-500 text-white shadow-lg shadow-rose-200" : "bg-white text-slate-700 border border-slate-200 hover:border-rose-300",
                    loadingAudio && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {loadingAudio ? (
                    <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
                  ) : isPlaying ? (
                    <Pause size={20} fill="currentColor" />
                  ) : (
                    <Play size={20} fill="currentColor" />
                  )}
                  <span className="font-semibold tracking-wide">
                    {loadingAudio ? "Generating Voice..." : isPlaying ? "Pause Message" : "Listen to Nate"}
                  </span>
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Controls */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-6 flex items-center justify-between z-50">
        <div className="flex gap-1">
          {SECTIONS.map((_, idx) => (
            <div 
              key={idx}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                activeSection === idx ? "w-8 bg-rose-500" : "w-2 bg-slate-200"
              )}
            />
          ))}
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={() => setActiveSection(prev => Math.max(0, prev - 1))}
            disabled={activeSection === 0}
            className="p-3 rounded-full border border-slate-200 text-slate-400 disabled:opacity-30 hover:bg-slate-50 transition-colors"
          >
            <ChevronRight size={24} className="rotate-180" />
          </button>
          <button 
            onClick={() => setActiveSection(prev => Math.min(SECTIONS.length - 1, prev + 1))}
            disabled={activeSection === SECTIONS.length - 1}
            className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full font-bold disabled:opacity-30 hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-200"
          >
            {activeSection === SECTIONS.length - 1 ? "End of Truth" : "Next Part"}
            <ChevronRight size={20} />
          </button>
        </div>
      </nav>

      {/* Footer */}
      <footer className="pb-40 pt-10 px-6 text-center">
        <div className="max-w-xs mx-auto h-px bg-slate-200 mb-8" />
        <p className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.2em] leading-loose">
          POWERED BY PURE COMPUTERS. ROCHESTER, NY 5854841764
        </p>
      </footer>

      {/* Background Accents */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-100/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100/30 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}
