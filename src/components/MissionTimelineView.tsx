import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { TimelineMilestone } from '../types';

interface MissionTimelineViewProps {
  milestones: TimelineMilestone[];
  missionName: string;
}

const CATEGORY_STYLES: Record<
  TimelineMilestone['category'],
  { label: string; dotColor: string; badge: string }
> = {
  launch: { label: 'LAUNCH', dotColor: 'bg-blue-400', badge: 'bg-blue-500/10 text-blue-400 border-blue-500/30' },
  landing: { label: 'LANDING', dotColor: 'bg-emerald-400', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
  discovery: { label: 'DISCOVERY', dotColor: 'bg-cyan-400', badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' },
  milestone: { label: 'MILESTONE', dotColor: 'bg-purple-400', badge: 'bg-purple-500/10 text-purple-400 border-purple-500/30' },
  extension: { label: 'EXTENSION', dotColor: 'bg-amber-400', badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30' },
  conclusion: { label: 'CONCLUSION', dotColor: 'bg-rose-400', badge: 'bg-rose-500/10 text-rose-400 border-rose-500/30' },
};

export const MissionTimelineView: React.FC<MissionTimelineViewProps> = ({
  milestones,
  missionName,
}) => {
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>(
    milestones[0]?.id || ''
  );

  if (!milestones || milestones.length === 0) {
    return (
      <div className="p-6 text-center text-zinc-500 font-mono text-sm">
        Timeline chronology is being assembled from NASA telemetry records.
      </div>
    );
  }

  const selectedMilestone =
    milestones.find((m) => m.id === selectedMilestoneId) || milestones[0];
  const catStyle =
    CATEGORY_STYLES[selectedMilestone.category] || CATEGORY_STYLES.milestone;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <span>MISSION TIMELINE</span>
            <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
              Interactive Chronology
            </span>
          </h3>
          <p className="text-xs text-zinc-400 font-sans mt-0.5">
            Key operational milestones and discoveries across the lifespan of {missionName}.
          </p>
        </div>
        <span className="text-[11px] font-mono text-zinc-500">
          {milestones.length} Events Cataloged
        </span>
      </div>

      {/* Selected Milestone Spotlight Card */}
      <div className="rounded-2xl bg-zinc-900/90 border border-zinc-800 p-5 sm:p-6 space-y-4 shadow-inner">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-mono font-extrabold text-cyan-400">
              {selectedMilestone.year}
            </span>
            {selectedMilestone.date && (
              <span className="text-xs font-mono text-zinc-400 border-l border-zinc-700 pl-2">
                {selectedMilestone.date}
              </span>
            )}
          </div>

          <span
            className={`px-2.5 py-0.5 text-xs font-mono font-semibold rounded-full border ${catStyle.badge}`}
          >
            {catStyle.label}
          </span>
        </div>

        <h4 className="text-xl font-bold text-white tracking-tight">
          {selectedMilestone.title}
        </h4>

        <p className="text-sm text-zinc-200 leading-relaxed font-sans">
          {selectedMilestone.summary}
        </p>

        <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800/80 flex items-start space-x-2.5">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-[11px] font-mono font-semibold text-amber-300 uppercase tracking-wider block">
              Historical & Scientific Impact
            </span>
            <span className="text-xs text-zinc-300">{selectedMilestone.impact}</span>
          </div>
        </div>
      </div>

      {/* Interactive Milestone Track / Nodes */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:content-[''] before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-800">
        {milestones.map((m, idx) => {
          const isSelected = m.id === selectedMilestone.id;
          const style = CATEGORY_STYLES[m.category] || CATEGORY_STYLES.milestone;

          return (
            <div
              key={m.id}
              onClick={() => setSelectedMilestoneId(m.id)}
              className={`relative cursor-pointer transition-all p-3.5 rounded-xl border text-left ${
                isSelected
                  ? 'bg-zinc-900 border-cyan-400 shadow-md shadow-cyan-500/10 ring-1 ring-cyan-400/20'
                  : 'bg-zinc-950/50 border-zinc-850 hover:bg-zinc-900/40 hover:border-zinc-700'
              }`}
            >
              {/* Node Bullet on Vertical Line */}
              <div
                className={`absolute -left-[1.85rem] sm:-left-[2.1rem] top-4 w-3.5 h-3.5 rounded-full border-2 border-zinc-950 transition-all ${
                  isSelected
                    ? `${style.dotColor} ring-4 ring-cyan-400/20 scale-125`
                    : 'bg-zinc-700 hover:bg-zinc-500'
                }`}
              />

              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-cyan-400">
                  {m.year}
                  {m.date ? ` · ${m.date}` : ''}
                </span>
                <span
                  className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${style.badge}`}
                >
                  {style.label}
                </span>
              </div>

              <h5 className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                {m.title}
              </h5>

              <p className="text-xs text-zinc-400 line-clamp-2 mt-1">
                {m.summary}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
