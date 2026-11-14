import React from 'react';
import { Compass, ArrowUpRight, Radio, MoveHorizontal } from 'lucide-react';
import { Exhibit } from '../types';
import { StatusStamp } from './StatusStamp';

interface DeepSpaceViewProps {
  exhibits: Exhibit[];
  selectedExhibit: Exhibit | null;
  onSelectExhibit: (exhibit: Exhibit) => void;
}

export const DeepSpaceView: React.FC<DeepSpaceViewProps> = ({
  exhibits,
  selectedExhibit,
  onSelectExhibit,
}) => {
  // Sort by distanceAu ascending for the diagram, or keep editorial order
  const maxAu = 180;

  return (
    <div className="space-y-8">
      {/* Part 1: Interactive Heliocentric Distance Diagram (No 3D Globe in Deep Space Mode) */}
      <div className="bg-[#0B0E17] border border-slate-800 rounded p-5 sm:p-7">
        <div className="flex flex-wrap items-baseline justify-between gap-2 pb-5 border-b border-slate-800">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-amber-400">
              Deep Space Telemetry Diagram · Astronomical Units (1 AU = Earth–Sun Distance)
            </p>
            <h3 className="text-xl sm:text-2xl font-display font-semibold text-white mt-1">
              Beyond the Planets: Distance from Earth
            </h3>
          </div>
          <p className="text-xs font-mono text-slate-400">
            Select any spacecraft node or editorial row to open its full exhibit dossier
            <span className="sm:hidden text-cyan-400 flex items-center gap-1 mt-0.5">
              <MoveHorizontal className="w-3.5 h-3.5 shrink-0" />
              <span>Swipe diagram horizontally to view distance scale</span>
            </span>
          </p>
        </div>

        {/* Horizontal Scale Diagram */}
        <div className="mt-6 pt-4 pb-6 px-2 sm:px-4 overflow-x-auto">
          <div className="min-w-[640px]">
            {/* Reference Milestones */}
            <div className="relative h-44 flex flex-col justify-center">
              {/* Main Trajectory Axis Line */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-slate-800" />

              {/* Heliopause Boundary Marker (~120 AU) */}
              <div
                style={{ left: `${(120 / maxAu) * 100}%` }}
                className="absolute top-2 bottom-2 -translate-x-1/2 border-l border-dashed border-cyan-500/50 flex flex-col justify-between items-center pointer-events-none"
              >
                <span className="px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-[#07090E] text-cyan-400 border border-cyan-500/30 rounded">
                  Heliopause (120 AU · Interstellar Boundary)
                </span>
                <span className="text-[10px] font-mono text-slate-400">18 Billion km</span>
              </div>

              {/* Earth Origin Node (0 AU) */}
              <div
                style={{ left: '1%' }}
                className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
              >
                <div className="w-3.5 h-3.5 rounded-full bg-sky-400 border-2 border-slate-950" />
                <span className="mt-2 text-[11px] font-mono font-semibold text-sky-300">
                  Earth (0 AU)
                </span>
              </div>

              {/* Deep Space Exhibit Nodes plotted by Distance from Earth */}
              {exhibits.map((exhibit, idx) => {
                const au = exhibit.distanceAu || 10;
                const leftPct = Math.min(94, Math.max(10, (au / maxAu) * 100));
                const isSelected = selectedExhibit?.id === exhibit.id;
                const placeAbove = idx % 2 === 0;

                return (
                  <button
                    key={exhibit.id}
                    type="button"
                    style={{ left: `${leftPct}%` }}
                    onClick={() => onSelectExhibit(exhibit)}
                    className={`group absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center focus-visible:outline-2 focus-visible:outline-amber-400`}
                    aria-label={`${exhibit.name}, distance from Earth ${exhibit.distanceFromEarth}, status ${exhibit.status}`}
                  >
                    {/* Label Card Above or Below Axis */}
                    <div
                      className={`absolute ${
                        placeAbove ? 'bottom-6' : 'top-6'
                      } px-3 py-2 rounded border text-left transition-transform duration-150 group-hover:scale-105 whitespace-nowrap ${
                        isSelected
                          ? 'bg-slate-800 border-amber-400 text-white shadow-lg'
                          : 'bg-[#07090E] border-slate-700 hover:border-amber-400/80 text-slate-100'
                      }`}
                    >
                      <div className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                        <span>{exhibit.name}</span>
                        <ArrowUpRight className="w-3 h-3 text-amber-400" />
                      </div>
                      <div className="text-[11px] font-mono text-amber-300 tabular-nums">
                        {exhibit.distanceFromEarth}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">
                        {exhibit.status}
                      </div>
                    </div>

                    {/* Axis Node Point */}
                    <span
                      className={`w-4 h-4 rounded-full border-2 transition-transform group-hover:scale-125 ${
                        exhibit.status === 'STILL WORKING'
                          ? 'bg-emerald-400 border-slate-950'
                          : exhibit.status === 'ENDED ON PURPOSE'
                          ? 'bg-cyan-400 border-slate-950'
                          : 'bg-amber-400 border-slate-950'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Part 2: Editorial List of Deep Space Exhibits (Voyager 1, Pioneer 10, Cassini) */}
      <div className="bg-[#0B0E17] border border-slate-800 rounded overflow-hidden">
        <div className="px-5 py-4 bg-[#07090E] border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-display font-semibold text-white">
              Deep Space Editorial Archive
            </h3>
            <p className="text-xs text-slate-400">
              Voyager 1, Pioneer 10, and Cassini — humanity’s farthest ambassadors beyond the rocky worlds.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400 tabular-nums">
            {exhibits.length} Deep Space Missions
          </span>
        </div>

        <div className="divide-y divide-slate-800">
          {exhibits.map((exhibit, index) => {
            const isSelected = selectedExhibit?.id === exhibit.id;
            return (
              <article
                key={exhibit.id}
                className={`p-5 sm:p-6 transition-colors ${
                  isSelected ? 'bg-slate-900/90' : 'hover:bg-slate-900/40'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Left: Editorial Index, Title & Years */}
                  <div className="lg:col-span-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                      <span>0{index + 1}. DEEP SPACE EXHIBIT</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-200 tabular-nums">{exhibit.years}</span>
                    </div>
                    <h4 className="text-2xl font-display font-semibold text-white">
                      {exhibit.name}
                    </h4>
                    <div className="pt-1">
                      <StatusStamp status={exhibit.status} />
                    </div>
                  </div>

                  {/* Center: Distance from Earth & Brief Story Preview */}
                  <div className="lg:col-span-5 space-y-2">
                    <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-300 bg-amber-950/30 border border-amber-500/30 px-3 py-1.5 rounded">
                      <Radio className="w-3.5 h-3.5 shrink-0" />
                      <span>Distance from Earth:</span>
                      <strong className="text-white tabular-nums">
                        {exhibit.distanceFromEarth}
                      </strong>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed line-clamp-2">
                      {exhibit.story}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 pt-1">
                      <Compass className="w-3.5 h-3.5 text-slate-500" />
                      <span>Planned: {exhibit.planned}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-emerald-300">Actual: {exhibit.actual}</span>
                    </div>
                  </div>

                  {/* Right: Action Button to open the shared Exhibit Detail Panel */}
                  <div className="lg:col-span-3 flex lg:justify-end">
                    <button
                      type="button"
                      onClick={() => onSelectExhibit(exhibit)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded transition-colors focus-visible:outline-2 focus-visible:outline-amber-200 whitespace-nowrap shrink-0"
                    >
                      <span>Open Exhibit Dossier</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};
