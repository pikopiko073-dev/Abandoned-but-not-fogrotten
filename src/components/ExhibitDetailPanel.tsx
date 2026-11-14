import React, { useEffect, useRef } from 'react';
import { X, ExternalLink, Compass, ChevronLeft, ChevronRight } from 'lucide-react';
import { Exhibit } from '../types';
import { StatusStamp } from './StatusStamp';

interface ExhibitDetailPanelProps {
  exhibit: Exhibit | null;
  onClose: () => void;
  onSelectNeighbor?: (direction: 'prev' | 'next') => void;
  totalInZone?: number;
  currentIndexInZone?: number;
}

export const ExhibitDetailPanel: React.FC<ExhibitDetailPanelProps> = ({
  exhibit,
  onClose,
  onSelectNeighbor,
  totalInZone = 0,
  currentIndexInZone = 0,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (exhibit) {
      closeButtonRef.current?.focus();
    }
  }, [exhibit]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!exhibit) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && onSelectNeighbor) {
        onSelectNeighbor('prev');
      } else if (e.key === 'ArrowRight' && onSelectNeighbor) {
        onSelectNeighbor('next');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [exhibit, onClose, onSelectNeighbor]);

  if (!exhibit) return null;

  const formatCoord = (lat: number, lng: number) => {
    const latDir = lat >= 0 ? 'N' : 'S';
    const lngDir = lng >= 0 ? 'E' : 'W';
    return `${Math.abs(lat).toFixed(4)}° ${latDir}, ${Math.abs(lng).toFixed(4)}° ${lngDir}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-[2px] transition-opacity duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exhibit-detail-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Full-screen on mobile (w-full h-full), side panel on desktop (md:w-[480px] lg:w-[540px]) */}
      <aside className="relative flex flex-col w-full h-full md:w-[480px] lg:w-[540px] bg-[#0B0E17] border-l border-slate-800 text-slate-100 shadow-2xl overflow-hidden">
        {/* Top Museum Accession Bar */}
        <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-slate-800 bg-[#07090E]">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>EXHIBIT ARCHIVE</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-200 uppercase">{exhibit.zone}</span>
            {totalInZone > 1 && (
              <>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">
                  {currentIndexInZone + 1} / {totalInZone}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            {onSelectNeighbor && totalInZone > 1 && (
              <div className="flex items-center border border-slate-800 rounded bg-slate-900/80">
                <button
                  type="button"
                  onClick={() => onSelectNeighbor('prev')}
                  className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors focus-visible:outline-2 focus-visible:outline-amber-400"
                  aria-label="Previous exhibit in this zone"
                  title="Previous exhibit (Left Arrow)"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onSelectNeighbor('next')}
                  className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors border-l border-slate-800 focus-visible:outline-2 focus-visible:outline-amber-400"
                  aria-label="Next exhibit in this zone"
                  title="Next exhibit (Right Arrow)"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded transition-colors focus-visible:outline-2 focus-visible:outline-amber-400 whitespace-nowrap shrink-0"
              aria-label="Close exhibit panel"
            >
              <X className="w-4 h-4" />
              <span>Close</span>
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
          {/* Header: Status Stamp, Name, and Active Years */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <StatusStamp status={exhibit.status} />
              <span className="text-sm font-mono text-slate-300 tabular-nums">
                Years: <strong className="text-white">{exhibit.years}</strong>
              </span>
            </div>

            <h2
              id="exhibit-detail-title"
              className="text-2xl sm:text-3xl font-display font-semibold tracking-tight text-white leading-tight"
            >
              {exhibit.name}
            </h2>

            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
              <Compass className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              {exhibit.zone === 'Deep Space' && exhibit.distanceFromEarth ? (
                <span>Distance from Earth: {exhibit.distanceFromEarth}</span>
              ) : (
                <span className="tabular-nums">{formatCoord(exhibit.lat, exhibit.lng)}</span>
              )}
              {exhibit.landingSite && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-300">{exhibit.landingSite}</span>
                </>
              )}
            </div>
          </div>

          {/* Gray Placeholder Exhibit Photo */}
          <figure className="border border-slate-800 rounded bg-zinc-900 overflow-hidden">
            <div className="relative aspect-16/10 w-full bg-zinc-800 flex items-center justify-center">
              <img
                src={exhibit.image}
                alt={`${exhibit.name} archival placeholder`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <figcaption className="px-3.5 py-2 text-xs font-mono text-slate-400 bg-[#07090E] border-t border-slate-800 flex items-center justify-between">
              <span>Archival Exhibit Plate · {exhibit.id}</span>
              <span>{exhibit.years}</span>
            </figcaption>
          </figure>

          {/* Section 1: The story (3-4 sentences) */}
          <section className="space-y-2 pt-1">
            <h3 className="text-sm font-mono uppercase tracking-wider text-amber-400 font-semibold">
              The story
            </h3>
            <p className="text-[15px] leading-relaxed text-slate-200">
              {exhibit.story}
            </p>
          </section>

          {/* Section 2: What we learned */}
          <section className="space-y-2 pt-3 border-t border-slate-800/80">
            <h3 className="text-sm font-mono uppercase tracking-wider text-cyan-400 font-semibold">
              What we learned
            </h3>
            <p className="text-[15px] leading-relaxed text-slate-200">
              {exhibit.learned}
            </p>
          </section>

          {/* Section 3: Hardware in simple words */}
          <section className="space-y-2 pt-3 border-t border-slate-800/80">
            <h3 className="text-sm font-mono uppercase tracking-wider text-emerald-400 font-semibold">
              Hardware in simple words
            </h3>
            <p className="text-[15px] leading-relaxed text-slate-200">
              {exhibit.hardware}
            </p>
          </section>

          {/* Small Mono Data Table */}
          <section className="space-y-2.5 pt-3 border-t border-slate-800/80">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Technical Specifications (Mono Data Table)
            </h3>
            <div className="border border-slate-800 rounded overflow-hidden bg-[#07090E]">
              <table className="mono-table w-full text-left text-xs font-mono tabular-nums border-collapse">
                <tbody className="divide-y divide-slate-800/90">
                  <tr>
                    <th scope="row" className="py-2.5 px-3.5 text-slate-400 font-normal w-2/5 bg-slate-900/40">
                      EXHIBIT ID
                    </th>
                    <td className="py-2.5 px-3.5 text-slate-100">{exhibit.id}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="py-2.5 px-3.5 text-slate-400 font-normal bg-slate-900/40">
                      ZONE
                    </th>
                    <td className="py-2.5 px-3.5 text-slate-100">{exhibit.zone}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="py-2.5 px-3.5 text-slate-400 font-normal bg-slate-900/40">
                      ACTIVE YEARS
                    </th>
                    <td className="py-2.5 px-3.5 text-slate-100">{exhibit.years}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="py-2.5 px-3.5 text-slate-400 font-normal bg-slate-900/40">
                      STATUS
                    </th>
                    <td className="py-2.5 px-3.5 text-slate-100 font-semibold">{exhibit.status}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="py-2.5 px-3.5 text-slate-400 font-normal bg-slate-900/40">
                      COORDINATES
                    </th>
                    <td className="py-2.5 px-3.5 text-slate-100">
                      {exhibit.lat.toFixed(4)}°, {exhibit.lng.toFixed(4)}°
                    </td>
                  </tr>
                  {exhibit.distanceFromEarth && (
                    <tr>
                      <th scope="row" className="py-2.5 px-3.5 text-slate-400 font-normal bg-slate-900/40">
                        EARTH DISTANCE
                      </th>
                      <td className="py-2.5 px-3.5 text-amber-300">{exhibit.distanceFromEarth}</td>
                    </tr>
                  )}
                  <tr>
                    <th scope="row" className="py-2.5 px-3.5 text-slate-400 font-normal bg-slate-900/40">
                      PLANNED LIFETIME
                    </th>
                    <td className="py-2.5 px-3.5 text-slate-200">{exhibit.planned}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="py-2.5 px-3.5 text-slate-400 font-normal bg-slate-900/40">
                      ACTUAL LIFETIME
                    </th>
                    <td className="py-2.5 px-3.5 text-emerald-300 font-medium">{exhibit.actual}</td>
                  </tr>
                  {exhibit.massKg && (
                    <tr>
                      <th scope="row" className="py-2.5 px-3.5 text-slate-400 font-normal bg-slate-900/40">
                        HARDWARE MASS
                      </th>
                      <td className="py-2.5 px-3.5 text-slate-200">{exhibit.massKg}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Source Link */}
          <div className="pt-2 pb-4">
            <a
              href={exhibit.source}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between w-full px-4 py-3 text-xs font-mono font-medium text-amber-300 bg-amber-950/30 hover:bg-amber-950/60 border border-amber-500/40 rounded transition-colors focus-visible:outline-2 focus-visible:outline-amber-400"
            >
              <span>Official NASA Mission Source ({exhibit.name})</span>
              <ExternalLink className="w-4 h-4 shrink-0 ml-2" />
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
};
