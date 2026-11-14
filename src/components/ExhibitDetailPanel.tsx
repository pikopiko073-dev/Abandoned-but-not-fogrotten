import React, { useEffect, useRef, useState } from 'react';
import {
  X,
  ExternalLink,
  Compass,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Cpu,
  Clock,
  Sparkles,
  FlaskConical,
  Flag,
} from 'lucide-react';
import { Exhibit } from '../types';
import { CONFIG } from '../data/museumData';
import { StatusStamp } from './StatusStamp';
import { InsideTheMachine } from './InsideTheMachine';
import { MissionTimelineView } from './MissionTimelineView';
import { WhatDidWeLearnView } from './WhatDidWeLearnView';
import { MissionEndView } from './MissionEndView';

interface ExhibitDetailPanelProps {
  exhibit: Exhibit | null;
  onClose: () => void;
  onSelectNeighbor?: (direction: 'prev' | 'next') => void;
  onStartStory?: (exhibit: Exhibit) => void;
  totalInZone?: number;
  currentIndexInZone?: number;
}

type DetailTab = 'overview' | 'hardware' | 'timeline' | 'science' | 'end';

export const ExhibitDetailPanel: React.FC<ExhibitDetailPanelProps> = ({
  exhibit,
  onClose,
  onSelectNeighbor,
  onStartStory,
  totalInZone = 0,
  currentIndexInZone = 0,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [activeTab, setActiveTab] = useState<DetailTab>('overview');

  // Reset to overview tab when exhibit changes
  useEffect(() => {
    if (exhibit) {
      setActiveTab('overview');
      closeButtonRef.current?.focus();
    }
  }, [exhibit?.id]);

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
      {/* Responsive drawer */}
      <aside className="relative flex flex-col w-full h-full md:w-[580px] lg:w-[680px] bg-[#0B0E17] border-l border-slate-800 text-slate-100 shadow-2xl overflow-hidden">
        {/* Top Museum Accession Bar */}
        <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-slate-800 bg-[#07090E] shrink-0">
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

        {/* Hero Machine Banner with Story Mode Trigger */}
        <div className="px-5 pt-5 pb-3 border-b border-slate-800/80 bg-gradient-to-b from-slate-900/40 to-transparent space-y-3 shrink-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <StatusStamp status={exhibit.status} />
            <span className="text-xs font-mono text-slate-400 tabular-nums">
              Years: <strong className="text-white">{exhibit.years}</strong>
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2
                id="exhibit-detail-title"
                className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight"
              >
                {exhibit.name}
              </h2>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 mt-1">
                <Compass className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                {exhibit.zone === 'Deep Space' && exhibit.distanceFromEarth ? (
                  <span>{exhibit.distanceFromEarth}</span>
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

            {/* Launch Full 10-Stage Story Mode */}
            {onStartStory && (
              <button
                type="button"
                onClick={() => onStartStory(exhibit)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md shadow-cyan-500/20 shrink-0 min-h-[44px]"
                title="Launch 10-stage sequential storytelling journey"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>START THE STORY</span>
              </button>
            )}
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pt-2 pb-1 no-scrollbar touch-pan-x">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-mono transition-colors whitespace-nowrap shrink-0 min-h-[36px] ${
                activeTab === 'overview'
                  ? 'bg-slate-800 text-white font-semibold border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Dossier</span>
            </button>

            <button
              onClick={() => setActiveTab('hardware')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-mono transition-colors whitespace-nowrap shrink-0 min-h-[36px] ${
                activeTab === 'hardware'
                  ? 'bg-emerald-950/60 text-emerald-300 font-semibold border border-emerald-800'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Inside Hardware</span>
            </button>

            <button
              onClick={() => setActiveTab('timeline')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-mono transition-colors whitespace-nowrap shrink-0 min-h-[36px] ${
                activeTab === 'timeline'
                  ? 'bg-cyan-950/60 text-cyan-300 font-semibold border border-cyan-800'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Timeline</span>
            </button>

            <button
              onClick={() => setActiveTab('science')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-mono transition-colors whitespace-nowrap shrink-0 min-h-[36px] ${
                activeTab === 'science'
                  ? 'bg-purple-950/60 text-purple-300 font-semibold border border-purple-800'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5" />
              <span>Discoveries</span>
            </button>

            <button
              onClick={() => setActiveTab('end')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-mono transition-colors whitespace-nowrap shrink-0 min-h-[36px] ${
                activeTab === 'end'
                  ? 'bg-amber-950/60 text-amber-300 font-semibold border border-amber-800'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Flag className="w-3.5 h-3.5" />
              <span>Mission End</span>
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              {/* Archival Photo */}
              <figure className="border border-slate-800 rounded bg-zinc-900 overflow-hidden">
                <div className="relative aspect-16/10 w-full bg-zinc-800 flex items-center justify-center">
                  <img
                    src={exhibit.image}
                    alt={`${exhibit.name} archival photograph`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.fallback) {
                        target.dataset.fallback = 'true';
                        target.src = CONFIG.placeholderImageBase;
                      }
                    }}
                  />
                </div>
                <figcaption className="px-3.5 py-2 text-xs font-mono text-slate-400 bg-[#07090E] border-t border-slate-800 flex items-center justify-between">
                  <span>Archival Plate · {exhibit.id}</span>
                  <span>{exhibit.years}</span>
                </figcaption>
              </figure>

              {/* Story */}
              <section className="space-y-2 pt-1">
                <h3 className="text-sm font-mono uppercase tracking-wider text-amber-400 font-semibold">
                  The Story
                </h3>
                <p className="text-[15px] leading-relaxed text-slate-200 font-sans">
                  {exhibit.story}
                </p>
              </section>

              {/* What we learned */}
              <section className="space-y-2 pt-3 border-t border-slate-800/80">
                <h3 className="text-sm font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                  What we learned
                </h3>
                <p className="text-[15px] leading-relaxed text-slate-200 font-sans">
                  {exhibit.learned}
                </p>
              </section>

              {/* Hardware in simple words */}
              <section className="space-y-2 pt-3 border-t border-slate-800/80">
                <h3 className="text-sm font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                  Hardware in simple words
                </h3>
                <p className="text-[15px] leading-relaxed text-slate-200 font-sans">
                  {exhibit.hardware}
                </p>
              </section>

              {/* Technical Specifications (Mono Data Table) */}
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
            </div>
          )}

          {activeTab === 'hardware' && (
            <div className="animate-fade-in">
              <InsideTheMachine
                machineName={exhibit.name}
                components={exhibit.hardwareComponents || []}
              />
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="animate-fade-in">
              <MissionTimelineView
                milestones={exhibit.timelineMilestones || []}
                missionName={exhibit.name}
              />
            </div>
          )}

          {activeTab === 'science' && (
            <div className="animate-fade-in">
              <WhatDidWeLearnView
                findings={exhibit.scientificFindings || []}
                machineName={exhibit.name}
              />
            </div>
          )}

          {activeTab === 'end' && (
            <div className="animate-fade-in">
              {exhibit.missionEndDetails ? (
                <MissionEndView
                  endRecord={exhibit.missionEndDetails}
                  machineName={exhibit.name}
                  status={exhibit.status}
                />
              ) : (
                <div className="p-6 text-center text-zinc-500 font-mono text-sm">
                  Mission conclusion logs are being retrieved from NASA archives.
                </div>
              )}
            </div>
          )}

          {/* Official NASA Source Link */}
          <div className="pt-2 pb-4 border-t border-slate-800">
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
