import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Exhibit } from '../types';
import { StatusStamp } from './StatusStamp';

interface PlannedVsRealitySectionProps {
  exhibits: Exhibit[];
  onInspectExhibit: (exhibit: Exhibit) => void;
}

export const PlannedVsRealitySection: React.FC<PlannedVsRealitySectionProps> = ({
  exhibits,
  onInspectExhibit,
}) => {
  const ingenuity = exhibits.find((e) => e.id === 'ingenuity');
  const opportunity = exhibits.find((e) => e.id === 'opportunity');
  const additionalFeatured = exhibits.filter(
    (e) => e.plannedVsRealityFeatured && e.id !== 'ingenuity' && e.id !== 'opportunity'
  );

  const primaryComparisons = [ingenuity, opportunity].filter(Boolean) as Exhibit[];

  return (
    <section
      id="planned-vs-reality"
      aria-labelledby="planned-vs-reality-heading"
      className="py-14 border-t border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-mono uppercase tracking-wider text-amber-400">
              02. Engineering Endurance Archive
            </p>
            <h2
              id="planned-vs-reality-heading"
              className="text-3xl sm:text-4xl font-display font-semibold text-white tracking-tight"
            >
              Planned vs Reality
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              NASA engineers design spacecraft for harsh radiation, freezing nights, and abrasive dust. Many machines refused to quit when their original warranties expired.
            </p>
          </div>
          <div className="text-xs font-mono text-slate-400">
            Click any hardware card to inspect its full mission dossier
          </div>
        </div>

        {/* Featured Spotlight Comparisons: Ingenuity & Opportunity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {primaryComparisons.map((item) => {
            const plannedPct = item.plannedRatioPercent ?? 10;
            return (
              <div
                key={item.id}
                className="flex flex-col justify-between p-6 sm:p-7 bg-[#0B0E17] border border-slate-800 rounded space-y-6"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                      <span className="uppercase text-slate-200">{item.zone}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{item.years}</span>
                    </div>
                    <StatusStamp status={item.status} size="sm" />
                  </div>

                  {/* Exact required comparison summary line */}
                  <h3 className="text-xl sm:text-2xl font-display font-semibold text-white">
                    {item.name}: planned {item.planned} → actual {item.actual}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {item.story}
                  </p>
                </div>

                {/* Visual Scale Comparison Bar */}
                <div className="space-y-3 pt-4 border-t border-slate-800/80 font-mono">
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="p-3 rounded bg-[#07090E] border border-slate-800">
                      <div className="text-slate-400 uppercase text-[11px]">Planned Lifetime</div>
                      <div className="text-lg font-bold text-slate-200 mt-1 tabular-nums">
                        {item.planned}
                      </div>
                    </div>
                    <div className="p-3 rounded bg-emerald-950/25 border border-emerald-500/40">
                      <div className="text-emerald-300 uppercase text-[11px]">Actual Achievement</div>
                      <div className="text-lg font-bold text-white mt-1 tabular-nums">
                        {item.actual}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Mission Endurance Scale</span>
                      <span className="text-amber-300 font-medium">{item.multiplierText}</span>
                    </div>
                    <div className="w-full h-3 bg-slate-900 rounded-sm overflow-hidden flex border border-slate-800">
                      <div
                        style={{ width: `${plannedPct}%` }}
                        className="h-full bg-slate-500 shrink-0"
                        title={`Planned: ${item.planned}`}
                      />
                      <div
                        style={{ width: `${100 - plannedPct}%` }}
                        className="h-full bg-amber-400"
                        title={`Actual bonus endurance: ${item.actual}`}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Gray segment: Planned ({item.planned})</span>
                      <span className="text-amber-300">Amber segment: Actual ({item.actual})</span>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => onInspectExhibit(item)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded transition-colors focus-visible:outline-2 focus-visible:outline-amber-400 whitespace-nowrap shrink-0"
                    >
                      <span>Inspect {item.name} on {item.zone}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Secondary Endurance Table for Additional Exhibits from Central Array */}
        <div className="bg-[#0B0E17] border border-slate-800 rounded overflow-hidden">
          <div className="px-5 py-3.5 bg-[#07090E] border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300">
              More Overachieving Machines Across the Museum
            </h3>
            <span className="text-xs font-mono text-slate-400">
              Data sourced from central exhibit catalog
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-800">
            {additionalFeatured.map((exhibit) => (
              <button
                key={exhibit.id}
                type="button"
                onClick={() => onInspectExhibit(exhibit)}
                className="p-4 text-left hover:bg-slate-900/60 transition-colors flex flex-col justify-between gap-3 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-amber-400"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
                    <span>{exhibit.zone.toUpperCase()}</span>
                    <span>{exhibit.years}</span>
                  </div>
                  <div className="text-base font-display font-semibold text-white">
                    {exhibit.name}
                  </div>
                </div>

                <div className="space-y-1 text-xs font-mono pt-2 border-t border-slate-800/80">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span>Planned: {exhibit.planned}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-300 font-medium">
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                    <span>Actual: {exhibit.actual}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
