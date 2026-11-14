import React, { useState } from 'react';
import { HardwareComponent } from '../types';

interface InsideTheMachineProps {
  machineName: string;
  components: HardwareComponent[];
}

const ROLE_ICONS: Record<HardwareComponent['role'], string> = {
  'Eyes & Optics': '👁️',
  'Power & Heart': '⚡',
  'Mobility & Legs': '🦿',
  'Voice to Earth': '📡',
  'Hands & Instruments': '🔬',
  'Brain & Memory': '🧠',
};

const ROLE_COLORS: Record<HardwareComponent['role'], { bg: string; text: string; border: string }> = {
  'Eyes & Optics': { bg: 'bg-sky-500/10', text: 'text-sky-400', border: 'border-sky-500/30' },
  'Power & Heart': { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
  'Mobility & Legs': { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  'Voice to Earth': { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
  'Hands & Instruments': { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/30' },
  'Brain & Memory': { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/30' },
};

export const InsideTheMachine: React.FC<InsideTheMachineProps> = ({
  machineName,
  components,
}) => {
  const [selectedId, setSelectedId] = useState<string>(components[0]?.id || '');

  if (!components || components.length === 0) {
    return (
      <div className="p-6 text-center text-zinc-500 font-mono text-sm">
        Hardware architecture data is currently being ingested for this mission.
      </div>
    );
  }

  const activeComponent = components.find((c) => c.id === selectedId) || components[0];
  const roleStyle = ROLE_COLORS[activeComponent.role] || {
    bg: 'bg-zinc-800',
    text: 'text-zinc-300',
    border: 'border-zinc-700',
  };

  return (
    <div className="space-y-6">
      {/* Header Description */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <span>INSIDE THE MACHINE</span>
            <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
              Interactive Anatomy
            </span>
          </h3>
          <p className="text-xs text-zinc-400 font-sans mt-0.5">
            Select an engineering subsystem to see how NASA built {machineName} to survive in the void.
          </p>
        </div>
        <span className="text-[11px] font-mono text-zinc-500">
          {components.length} Subsystems Identified
        </span>
      </div>

      {/* Component Selection Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {components.map((comp) => {
          const isSelected = comp.id === activeComponent.id;
          const icon = ROLE_ICONS[comp.role] || '⚙️';
          return (
            <button
              key={comp.id}
              onClick={() => setSelectedId(comp.id)}
              className={`p-3 rounded-xl text-left transition-all border flex flex-col justify-between ${
                isSelected
                  ? 'bg-zinc-900 border-cyan-400 shadow-md shadow-cyan-500/10 ring-1 ring-cyan-400/30'
                  : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/40 text-zinc-400'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-lg">{icon}</span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                  {comp.role.split(' ')[0]}
                </span>
              </div>
              <span className={`text-xs font-medium line-clamp-1 ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                {comp.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detailed Subsystem Explorer Card */}
      <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-5 sm:p-6 space-y-5 shadow-inner">
        {/* Subsystem Name & Role Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono font-semibold border ${roleStyle.bg} ${roleStyle.text} ${roleStyle.border} mb-2`}
            >
              {ROLE_ICONS[activeComponent.role]} {activeComponent.role}
            </span>
            <h4 className="text-xl font-bold text-white tracking-tight">
              {activeComponent.name}
            </h4>
          </div>

          {activeComponent.specSnippet && (
            <div className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-zinc-400 max-w-xs">
              <span className="text-zinc-500 block uppercase text-[9px]">NASA Tech Spec</span>
              {activeComponent.specSnippet}
            </div>
          )}
        </div>

        {/* Intuitive School-Friendly Analogy */}
        <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/30 flex items-start space-x-3">
          <span className="text-cyan-400 text-xl leading-none mt-0.5">💡</span>
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-300 block mb-0.5">
              The Simple Analogy
            </span>
            <p className="text-sm font-sans text-cyan-100 font-medium italic">
              “{activeComponent.analogy}”
            </p>
          </div>
        </div>

        {/* How It Works (Simple explanation) */}
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
            HOW THIS SUBSYSTEM WORKS
          </span>
          <p className="text-sm text-zinc-200 leading-relaxed font-sans">
            {activeComponent.simpleExplanation}
          </p>
        </div>

        {/* Why It Matters (Scientific significance) */}
        <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 space-y-1">
          <div className="flex items-center space-x-1.5 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>WHY IT MATTERS FOR SCIENCE</span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            {activeComponent.whyItMatters}
          </p>
        </div>
      </div>
    </div>
  );
};
