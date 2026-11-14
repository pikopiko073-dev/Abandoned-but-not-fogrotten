import React, { useState, useEffect, useCallback } from 'react';
import { Exhibit, StoryStage } from '../types';

interface StoryModeModalProps {
  exhibit: Exhibit | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectAnotherMission?: () => void;
}

export const StoryModeModal: React.FC<StoryModeModalProps> = ({
  exhibit,
  isOpen,
  onClose,
  onSelectAnotherMission,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const stages: StoryStage[] = exhibit?.storyStages || [];
  const totalStages = stages.length;
  // Step index: 0 .. totalStages-1 are the stages, totalStages is the Final Screen
  const isFinalScreen = currentStepIndex >= totalStages;

  // Reset step whenever a new exhibit is opened
  useEffect(() => {
    if (isOpen) {
      setCurrentStepIndex(0);
    }
  }, [isOpen, exhibit?.id]);

  const handleNext = useCallback(() => {
    if (currentStepIndex < totalStages) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  }, [currentStepIndex, totalStages]);

  const handlePrev = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  }, [currentStepIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  if (!isOpen || !exhibit) return null;

  const currentStage: StoryStage | undefined = !isFinalScreen ? stages[currentStepIndex] : undefined;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="story-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in text-white"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-zinc-950 border border-zinc-700/60 rounded-2xl shadow-2xl overflow-hidden">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800 bg-zinc-900/60">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase tracking-widest">
              Story Mode · 10-Stage Odyssey
            </span>
            <span className="hidden sm:inline text-xs text-zinc-400 font-mono">
              {exhibit.name} ({exhibit.zone})
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
            title="Close story (Esc)"
            aria-label="Close story"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress Bar & Stage Stepper */}
        <div className="px-5 pt-3 pb-2 bg-zinc-900/30 border-b border-zinc-800/60">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
            <span>
              {isFinalScreen ? (
                <span className="text-emerald-400 font-semibold">MISSION CONCLUSION</span>
              ) : (
                <>
                  STAGE <span className="text-cyan-400 font-bold">{currentStepIndex + 1}</span> OF{' '}
                  <span className="text-zinc-300">{totalStages}</span>:{' '}
                  <span className="text-white font-semibold">{currentStage?.stageName}</span>
                </>
              )}
            </span>
            <span className="text-zinc-500 text-[11px] hidden sm:inline">Use ← / → keys or Space to navigate</span>
          </div>

          {/* Stepper Dots / Bars */}
          <div className="grid grid-cols-11 gap-1.5 h-1.5">
            {stages.map((st, idx) => (
              <button
                key={st.stageName + idx}
                onClick={() => setCurrentStepIndex(idx)}
                className={`h-full rounded-full transition-all duration-300 ${
                  idx === currentStepIndex
                    ? 'bg-cyan-400 ring-2 ring-cyan-400/40'
                    : idx < currentStepIndex
                    ? 'bg-cyan-700/80 hover:bg-cyan-600'
                    : 'bg-zinc-800 hover:bg-zinc-700'
                }`}
                title={`Go to Stage ${idx + 1}: ${st.stageName}`}
                aria-label={`Go to Stage ${idx + 1}: ${st.stageName}`}
              />
            ))}
            {/* 11th bar: Final Screen */}
            <button
              onClick={() => setCurrentStepIndex(totalStages)}
              className={`h-full rounded-full transition-all duration-300 ${
                isFinalScreen
                  ? 'bg-amber-400 ring-2 ring-amber-400/40'
                  : 'bg-zinc-800 hover:bg-zinc-700'
              }`}
              title="Go to Mission Inscription"
              aria-label="Go to Mission Inscription"
            />
          </div>
        </div>

        {/* Modal Body / Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {!isFinalScreen && currentStage ? (
            <div className="space-y-6 animate-fade-in">
              {/* Stage Badge & Date */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center space-x-2">
                  <span className="px-3 py-1 text-xs font-mono font-bold tracking-widest uppercase rounded bg-zinc-800 text-cyan-300 border border-cyan-500/20">
                    STAGE {currentStage.stageNumber}: {currentStage.stageName}
                  </span>
                  {currentStage.visualTag && (
                    <span className="px-2.5 py-0.5 text-[11px] font-mono text-zinc-400 bg-zinc-900 rounded border border-zinc-800">
                      🏷️ {currentStage.visualTag}
                    </span>
                  )}
                </div>

                <div className="text-xs font-mono text-zinc-400 flex items-center space-x-1.5">
                  <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{currentStage.dateOrTime}</span>
                </div>
              </div>

              {/* Stage Title */}
              <h2 id="story-modal-title" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                {currentStage.title}
              </h2>

              {/* Story Narrative Box */}
              <div className="relative p-5 sm:p-6 rounded-xl bg-zinc-900/70 border border-zinc-800/80 leading-relaxed text-zinc-200 text-base sm:text-lg font-sans shadow-inner">
                <p className="whitespace-pre-line">{currentStage.text}</p>
              </div>

              {/* Highlight / Takeaway Callout */}
              {currentStage.highlight && (
                <div className="flex items-start space-x-3 p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-cyan-200 text-sm font-sans">
                  <span className="text-cyan-400 text-lg leading-none mt-0.5">✦</span>
                  <div>
                    <span className="font-semibold text-cyan-300 uppercase tracking-wider text-xs block mb-0.5 font-mono">
                      Key Takeaway
                    </span>
                    <span>{currentStage.highlight}</span>
                  </div>
                </div>
              )}

              {/* Visual Machine Card Snippet */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60 text-xs text-zinc-400 font-mono">
                <div>
                  <span className="text-zinc-500 block">MACHINE DOSSIER</span>
                  <span className="text-white font-medium">{exhibit.name}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">OPERATIONAL YEARS</span>
                  <span className="text-zinc-300">{exhibit.years}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">CURRENT STATUS</span>
                  <span className="text-cyan-400">{exhibit.status}</span>
                </div>
              </div>
            </div>
          ) : (
            /* FINAL SCREEN & CLOSING INSCRIPTION */
            <div className="py-6 sm:py-10 text-center space-y-8 animate-fade-in max-w-2xl mx-auto">
              {/* Golden NASA Seal / Star Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-500/20 via-cyan-500/20 to-emerald-500/20 border border-amber-400/40 flex items-center justify-center shadow-lg shadow-amber-500/10">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.7}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>

              {/* Exact Inscription Required by NASA Challenge Prompt */}
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-serif tracking-wide text-zinc-100 uppercase">
                  THEY STOPPED MOVING.
                </h3>
                <h3 className="text-xl sm:text-2xl font-serif tracking-wide text-cyan-300 uppercase">
                  BUT THEIR DATA DIDN’T.
                </h3>
                <h3 className="text-xl sm:text-2xl font-serif tracking-wide text-amber-300 uppercase">
                  THEIR DISCOVERIES DIDN’T.
                </h3>
                <h3 className="text-xl sm:text-2xl font-serif tracking-wide text-emerald-300 uppercase">
                  AND OUR QUESTIONS DIDN’T.
                </h3>

                <div className="w-16 h-0.5 bg-zinc-700 mx-auto my-6" />

                <p className="text-lg sm:text-xl font-sans text-zinc-300 max-w-lg mx-auto italic">
                  “These machines were left behind. We have not forgotten them.”
                </p>
              </div>

              {/* Summary Stats for Completed Journey */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-left text-xs font-mono">
                <div>
                  <span className="text-zinc-500 block">EXPLORED MACHINE</span>
                  <span className="text-white font-semibold truncate block">{exhibit.name}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">OPERATIONAL YEARS</span>
                  <span className="text-cyan-400 font-semibold">{exhibit.years}</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-zinc-500 block">PRIMARY LESSON</span>
                  <span className="text-amber-300 font-semibold">{exhibit.plannedVsRealityFeatured ? 'Extended Legend' : 'Pioneering Data'}</span>
                </div>
              </div>

              {/* Call to Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setCurrentStepIndex(0)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-mono text-xs transition-colors flex items-center justify-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>REPLAY STORY</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    if (onSelectAnotherMission) {
                      onSelectAnotherMission();
                    }
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-semibold text-xs font-mono tracking-wider transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center space-x-2"
                >
                  <span>EXPLORE ANOTHER MISSION</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation Toolbar */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-zinc-800 bg-zinc-900/60">
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center space-x-1.5 ${
              currentStepIndex === 0
                ? 'opacity-30 cursor-not-allowed text-zinc-500 bg-zinc-900'
                : 'text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>PREVIOUS</span>
          </button>

          <span className="text-xs font-mono text-zinc-500">
            {isFinalScreen ? '11 of 11' : `${currentStepIndex + 1} of ${totalStages}`}
          </span>

          {!isFinalScreen ? (
            <button
              onClick={handleNext}
              className="px-5 py-2 rounded-xl text-xs font-mono font-semibold transition-all flex items-center space-x-1.5 bg-cyan-500 hover:bg-cyan-400 text-black shadow-md shadow-cyan-500/20"
            >
              <span>{currentStepIndex === totalStages - 1 ? 'VIEW LEGACY' : 'NEXT STAGE'}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-mono font-semibold transition-all flex items-center space-x-1.5 bg-emerald-500 hover:bg-emerald-400 text-black shadow-md shadow-emerald-500/20"
            >
              <span>RETURN TO MUSEUM</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
