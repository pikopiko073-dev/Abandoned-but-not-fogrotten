import React from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { MissionEndRecord, ExhibitStatus } from '../types';

interface MissionEndViewProps {
  endRecord: MissionEndRecord;
  machineName: string;
  status: ExhibitStatus;
}

export const MissionEndView: React.FC<MissionEndViewProps> = ({
  endRecord,
  machineName,
  status,
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <span>THE END OF THE MISSION</span>
            <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
              Final Chapter & Current State
            </span>
          </h3>
          <p className="text-xs text-zinc-400 font-sans mt-0.5">
            Engineering conclusion and modern preservation of {machineName}.
          </p>
        </div>
        <span className="text-xs font-mono px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
          {endRecord.statusLabel || status}
        </span>
      </div>

      {/* Main Conclusion Dossier */}
      <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-5 sm:p-6 space-y-5 shadow-inner">
        {/* Date & Nature of Conclusion */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80">
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">
              CONCLUSION DATE / FINAL CONTACT
            </span>
            <span className="text-sm sm:text-base font-bold text-white font-mono">
              {endRecord.endDate}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80">
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">
              MISSION ARCHITECTURE NATURE
            </span>
            <span className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold font-mono ${endRecord.wasPlanned ? 'text-emerald-400' : 'text-amber-400'}`}>
              {endRecord.wasPlanned ? (
                <>
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>PLANNED MISSION ARCHITECTURE</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>UNPLANNED NATURAL TERMINATION</span>
                </>
              )}
            </span>
          </div>
        </div>

        {/* Why the mission ended */}
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 block font-semibold">
            PRIMARY CAUSE OF MISSION CONCLUSION
          </span>
          <p className="text-sm text-zinc-200 leading-relaxed font-sans">
            {endRecord.whyItEnded}
          </p>
        </div>

        {/* What happened to the hardware */}
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block font-semibold">
            ENGINEERING & HARDWARE SEQUENCE
          </span>
          <p className="text-sm text-zinc-300 leading-relaxed font-sans">
            {endRecord.whatHappened}
          </p>
        </div>

        {/* Current State today */}
        <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-1">
          <span className="text-xs font-mono uppercase tracking-wider text-amber-300 block font-semibold">
            WHERE IS THE HARDWARE TODAY?
          </span>
          <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans">
            {endRecord.currentState}
          </p>
        </div>

        {/* Final Telemetry or Inscription */}
        {endRecord.finalMessageOrTelemetry && (
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 block font-semibold">
              FINAL TELEMETRY FRAME / HISTORICAL INSCRIPTION
            </span>
            <p className="text-xs sm:text-sm font-mono text-cyan-100">
              {endRecord.finalMessageOrTelemetry}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
