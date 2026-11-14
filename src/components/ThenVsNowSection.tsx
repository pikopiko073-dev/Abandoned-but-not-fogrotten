import React, { useState } from 'react';
import { EVOLUTION_ERAS } from '../data/storyData';
import { EvolutionEra } from '../types';

export const ThenVsNowSection: React.FC = () => {
  const [selectedEraIndex, setSelectedEraIndex] = useState<number>(4); // Default to modern 2020s or 2000s

  const era: EvolutionEra = EVOLUTION_ERAS[selectedEraIndex] || EVOLUTION_ERAS[0];

  return (
    <section id="then-vs-now" className="py-16 sm:py-24 px-4 sm:px-8 max-w-6xl mx-auto text-white">
      {/* Header */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase tracking-widest">
          Hardware Evolution · 50-Year Odyssey
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          THEN VS NOW
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto font-sans">
          How five decades of aerospace engineering turned 4-kilobyte analog rovers into autonomous nuclear-powered field geologists and alien aerial helicopters.
        </p>
      </div>

      {/* Decade Selector Bar */}
      <div className="flex overflow-x-auto sm:grid sm:grid-cols-5 gap-2 mb-6 sm:mb-8 pb-1 no-scrollbar touch-pan-x">
        {EVOLUTION_ERAS.map((item, idx) => {
          const isActive = idx === selectedEraIndex;
          return (
            <button
              key={item.decade}
              onClick={() => setSelectedEraIndex(idx)}
              className={`min-w-[140px] sm:min-w-0 p-3 sm:p-3.5 rounded-xl text-left border transition-all shrink-0 ${
                isActive
                  ? 'bg-zinc-900 border-cyan-400 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-400/30'
                  : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50 text-zinc-400'
              }`}
            >
              <div className="text-xs font-mono font-bold text-cyan-400 mb-0.5">
                {item.decade}
              </div>
              <div className={`text-xs font-semibold line-clamp-1 ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                {item.title}
              </div>
              <div className="text-[10px] font-mono text-zinc-500 mt-1">
                {item.years}
              </div>
            </button>
          );
        })}
      </div>

      {/* Era Spotlight Card */}
      <div className="rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden shadow-2xl">
        {/* Era Banner */}
        <div className="p-5 sm:p-8 border-b border-zinc-800 bg-zinc-900/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
              <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 font-bold uppercase">
                {era.decade} ERA
              </span>
              <span>{era.years}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {era.title}
            </h3>
            <p className="text-sm font-sans text-zinc-300 italic">
              “{era.tagline}”
            </p>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-zinc-950 border border-zinc-800 md:text-right shrink-0">
            <span className="text-[10px] font-mono uppercase text-zinc-500 block">REPRESENTATIVE MACHINE</span>
            <span className="text-sm font-bold font-mono text-cyan-300">{era.representativeMachine}</span>
          </div>
        </div>

        {/* 6 Core Subsystems Comparison Grid */}
        <div className="p-4 sm:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {/* Computing */}
          <div className="p-5 rounded-xl bg-zinc-900/70 border border-zinc-800/80 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
              <span>🧠</span>
              <span>Computing & Memory</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans">
              {era.computing}
            </p>
          </div>

          {/* Cameras */}
          <div className="p-5 rounded-xl bg-zinc-900/70 border border-zinc-800/80 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-sky-400 uppercase tracking-wider">
              <span>👁️</span>
              <span>Cameras & Optics</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans">
              {era.cameras}
            </p>
          </div>

          {/* Mobility */}
          <div className="p-5 rounded-xl bg-zinc-900/70 border border-zinc-800/80 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
              <span>🦿</span>
              <span>Mobility & Locomotion</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans">
              {era.mobility}
            </p>
          </div>

          {/* Autonomy */}
          <div className="p-5 rounded-xl bg-zinc-900/70 border border-zinc-800/80 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wider">
              <span>🧭</span>
              <span>Onboard Autonomy</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans">
              {era.autonomy}
            </p>
          </div>

          {/* Power */}
          <div className="p-5 rounded-xl bg-zinc-900/70 border border-zinc-800/80 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider">
              <span>⚡</span>
              <span>Power Architecture</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans">
              {era.power}
            </p>
          </div>

          {/* Instruments */}
          <div className="p-5 rounded-xl bg-zinc-900/70 border border-zinc-800/80 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-rose-400 uppercase tracking-wider">
              <span>🔬</span>
              <span>Science Instruments</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans">
              {era.instruments}
            </p>
          </div>
        </div>

        {/* Quick Did You Know Callout */}
        <div className="px-6 sm:px-8 pb-6">
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs font-sans text-cyan-200/90 flex items-start space-x-2.5">
            <span className="text-cyan-400 text-sm mt-0.5">🚀</span>
            <div>
              <span className="font-mono font-semibold text-cyan-300 uppercase tracking-wider text-[10px] block">
                Aerospace Leap Fact
              </span>
              <span>
                Ingenuity’s onboard smartphone Qualcomm Snapdragon processor runs at 2.2 GHz—over 1,000 times faster than the Apollo guidance computer that landed humans on the Moon in 1969.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
