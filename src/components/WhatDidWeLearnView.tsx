import React from 'react';
import { ScientificFinding } from '../types';

interface WhatDidWeLearnViewProps {
  findings: ScientificFinding[];
  machineName: string;
}

export const WhatDidWeLearnView: React.FC<WhatDidWeLearnViewProps> = ({
  findings,
  machineName,
}) => {
  if (!findings || findings.length === 0) {
    return (
      <div className="p-6 text-center text-zinc-500 font-mono text-sm">
        Scientific publications are being collated for this mission.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <span>WHAT DID WE LEARN?</span>
            <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
              Science Discoveries
            </span>
          </h3>
          <p className="text-xs text-zinc-400 font-sans mt-0.5">
            Key scientific discoveries made by {machineName} that fundamentally transformed our view of the cosmos.
          </p>
        </div>
        <span className="text-[11px] font-mono text-zinc-500">
          {findings.length} Major Breakthroughs
        </span>
      </div>

      {/* Discovery Cards */}
      <div className="space-y-4">
        {findings.map((item, index) => (
          <div
            key={item.id}
            className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-5 sm:p-6 space-y-4 hover:border-zinc-700 transition-colors shadow-inner"
          >
            {/* Discovery Number & Title */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center space-x-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold flex items-center justify-center">
                  0{index + 1}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {item.title}
                </h4>
              </div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/60 hidden sm:inline">
                Verified Discovery
              </span>
            </div>

            {/* WHAT WE FOUND */}
            <div className="space-y-1 pl-10">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-cyan-400 block">
                WHAT WE FOUND
              </span>
              <p className="text-sm text-zinc-200 font-sans leading-relaxed">
                {item.whatWeFound}
              </p>
            </div>

            {/* WHY IT MATTERS */}
            <div className="ml-10 p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 space-y-1">
              <div className="flex items-center space-x-1.5 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>WHY IT MATTERS</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                {item.whyItMatters}
              </p>
            </div>

            {/* Scientific Term Explained (Student Glossary) */}
            {item.scientificTermExplained && (
              <div className="ml-10 p-3 rounded-xl bg-amber-950/20 border border-amber-800/30 flex items-start space-x-2.5 text-xs text-amber-200/90">
                <span className="text-amber-400 text-sm mt-0.5">📖</span>
                <div>
                  <span className="font-mono font-semibold text-amber-300 uppercase tracking-wider text-[10px] block">
                    Student Science Glossary
                  </span>
                  <span>{item.scientificTermExplained}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
