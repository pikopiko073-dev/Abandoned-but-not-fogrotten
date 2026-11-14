import React from 'react';
import { ExhibitStatus } from '../types';

interface StatusStampProps {
  status: ExhibitStatus;
  size?: 'sm' | 'md';
}

export const StatusStamp: React.FC<StatusStampProps> = ({ status, size = 'md' }) => {
  const getConfig = (s: ExhibitStatus) => {
    switch (s) {
      case 'STILL WORKING':
        return {
          glyph: '●',
          classes: 'border-emerald-500/50 bg-emerald-950/50 text-emerald-300',
        };
      case 'SILENT':
        return {
          glyph: '■',
          classes: 'border-amber-500/50 bg-amber-950/40 text-amber-300',
        };
      case 'ENDED ON PURPOSE':
        return {
          glyph: '◆',
          classes: 'border-cyan-500/50 bg-cyan-950/40 text-cyan-300',
        };
    }
  };

  const { glyph, classes } = getConfig(status);
  const sizeClasses =
    size === 'sm'
      ? 'px-2 py-0.5 text-[11px] tracking-wider'
      : 'px-2.5 py-1 text-xs tracking-widest';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono font-semibold uppercase border rounded-sm whitespace-nowrap shrink-0 ${sizeClasses} ${classes}`}
      aria-label={`Mission status: ${status}`}
    >
      <span aria-hidden="true" className="text-[10px] leading-none">
        {glyph}
      </span>
      <span>{status}</span>
    </span>
  );
};
