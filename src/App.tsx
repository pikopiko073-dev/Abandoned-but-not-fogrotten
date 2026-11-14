import React, { useState, useMemo, useCallback } from 'react';
import { Compass, Sparkles, Globe2, Orbit, Layers } from 'lucide-react';
import { CONFIG as MUSEUM_CONFIG, EXHIBITS as MUSEUM_EXHIBITS } from './data/museumData';
import { Exhibit, ExhibitStatus, ZoneMode } from './types';
import { GlobeExplorer } from './components/GlobeExplorer';
import { DeepSpaceView } from './components/DeepSpaceView';
import { ExhibitDetailPanel } from './components/ExhibitDetailPanel';
import { PlannedVsRealitySection } from './components/PlannedVsRealitySection';
import { GuessTheMachineQuiz } from './components/GuessTheMachineQuiz';
import { StatusStamp } from './components/StatusStamp';

// Re-export central CONFIG and EXHIBITS at the top of App.tsx for direct inspection & modification
export const CONFIG = MUSEUM_CONFIG;
export const EXHIBITS: Exhibit[] = MUSEUM_EXHIBITS;

export default function App() {
  // Active Mode: 'Moon' | 'Mars' | 'Deep Space'
  const [activeZone, setActiveZone] = useState<ZoneMode>('Moon');
  // Selected exhibit for the Side Panel (null when closed)
  const [selectedExhibit, setSelectedExhibit] = useState<Exhibit | null>(null);
  // Optional catalog filter for browsing all exhibits below the explorer
  const [catalogStatusFilter, setCatalogStatusFilter] = useState<'ALL' | ExhibitStatus>('ALL');
  const [catalogZoneFilter, setCatalogZoneFilter] = useState<'ALL' | ZoneMode>('ALL');

  // Exhibits filtered for the active 3D Globe or Deep Space mode
  const zoneExhibits = useMemo(
    () => EXHIBITS.filter((exhibit) => exhibit.zone === activeZone),
    [activeZone]
  );

  // Exhibits filtered for the full museum catalog section
  const filteredCatalogExhibits = useMemo(() => {
    return EXHIBITS.filter((item) => {
      const matchesStatus =
        catalogStatusFilter === 'ALL' || item.status === catalogStatusFilter;
      const matchesZone =
        catalogZoneFilter === 'ALL' || item.zone === catalogZoneFilter;
      return matchesStatus && matchesZone;
    });
  }, [catalogStatusFilter, catalogZoneFilter]);

  // Select an exhibit: switch to its zone if needed, fly to it on the globe, and open side panel
  const handleSelectExhibit = useCallback((exhibit: Exhibit) => {
    setActiveZone(exhibit.zone);
    setSelectedExhibit(exhibit);
  }, []);

  // Navigate to previous/next exhibit within the active zone inside the Side Panel
  const handleSelectNeighbor = useCallback(
    (direction: 'prev' | 'next') => {
      if (!selectedExhibit) return;
      const currentZoneList = EXHIBITS.filter((e) => e.zone === selectedExhibit.zone);
      const idx = currentZoneList.findIndex((e) => e.id === selectedExhibit.id);
      if (idx === -1 || currentZoneList.length <= 1) return;

      const nextIdx =
        direction === 'next'
          ? (idx + 1) % currentZoneList.length
          : (idx - 1 + currentZoneList.length) % currentZoneList.length;
      setSelectedExhibit(currentZoneList[nextIdx]);
    },
    [selectedExhibit]
  );

  // Open a random exhibit for discovery
  const handleOpenRandomExhibit = () => {
    const randomIndex = Math.floor(Math.random() * EXHIBITS.length);
    const chosen = EXHIBITS[randomIndex];
    setActiveZone(chosen.zone);
    setSelectedExhibit(chosen);
    const explorerEl = document.getElementById('explorer');
    explorerEl?.scrollIntoView({ behavior: 'smooth' });
  };

  const currentIndexInZone = useMemo(() => {
    if (!selectedExhibit) return 0;
    return zoneExhibits.findIndex((e) => e.id === selectedExhibit.id);
  }, [selectedExhibit, zoneExhibits]);

  return (
    <div className="min-h-screen flex flex-col bg-[#07090E] text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Bar Contract: 3 zones (1-line Brand wordmark — 4 concise nav links — 1 primary CTA) */}
      <header className="sticky top-0 z-30 flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 py-3.5 bg-[#07090E]/95 backdrop-blur-sm border-b border-slate-800">
        {/* Zone 1: Brand Title (single text element) */}
        <a
          href="#explorer"
          className="text-lg sm:text-xl font-display font-semibold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-amber-400"
        >
          Abandoned but Not Forgotten
        </a>

        {/* Zone 2: 4 Single-line Navigation Links */}
        <nav
          aria-label="Primary Museum Navigation"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300"
        >
          <a
            href="#explorer"
            className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            3D Explorer
          </a>
          <a
            href="#catalog"
            className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Exhibit Catalog
          </a>
          <a
            href="#planned-vs-reality"
            className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Planned vs Reality
          </a>
          <a
            href="#guess-the-machine"
            className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Guess the Machine
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action Button */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={handleOpenRandomExhibit}
            className="px-4 py-2 text-xs font-mono font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded transition-colors focus-visible:outline-2 focus-visible:outline-amber-200 whitespace-nowrap shrink-0"
          >
            Surprise Exhibit
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Section 01: Hero & Interactive 3D Globe / Deep Space Switcher */}
        <section
          id="explorer"
          aria-labelledby="hero-heading"
          className="py-8 sm:py-12"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Editorial Museum Introduction & Mode Switcher */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-6 border-b border-slate-800">
              <div className="lg:col-span-7 space-y-3">
                <p className="text-xs font-mono uppercase tracking-wider text-amber-400">
                  01. Interactive 3D Space Hardware Archive · Moon · Mars · Deep Space
                </p>
                <h1
                  id="hero-heading"
                  className="text-3xl sm:text-5xl font-display font-semibold text-white tracking-tight leading-[1.12]"
                >
                  Abandoned but Not Forgotten
                </h1>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                  For over 60 years, humanity has sent robotic scouts, landers, helicopters, and rovers to explore the Solar System. Almost none of them ever came back to Earth. Rotate the 3D globe or switch to Deep Space to visit where they rest—and see which ones are still calling home.
                </p>
              </div>

              {/* Planet & Deep Space Mode Switcher */}
              <div className="lg:col-span-5 flex flex-col sm:items-start lg:items-end justify-end gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Select Exhibition Mode (Planet Switcher & Deep Space)
                </span>
                <div
                  role="tablist"
                  aria-label="Select Moon, Mars, or Deep Space mode"
                  className="inline-flex p-1 bg-[#0B0E17] border border-slate-800 rounded w-full sm:w-auto"
                >
                  {(['Moon', 'Mars', 'Deep Space'] as ZoneMode[]).map((mode) => {
                    const isActive = activeZone === mode;
                    const count = EXHIBITS.filter((e) => e.zone === mode).length;
                    return (
                      <button
                        key={mode}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setActiveZone(mode)}
                        className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono font-semibold rounded transition-colors focus-visible:outline-2 focus-visible:outline-amber-400 whitespace-nowrap shrink-0 ${
                          isActive
                            ? mode === 'Mars'
                              ? 'bg-orange-500 text-slate-950 shadow-md font-bold'
                              : mode === 'Moon'
                              ? 'bg-slate-200 text-slate-950 shadow-md font-bold'
                              : 'bg-amber-400 text-slate-950 shadow-md font-bold'
                            : 'text-slate-300 hover:text-white hover:bg-slate-900'
                        }`}
                      >
                        {mode === 'Deep Space' ? (
                          <Orbit className="w-3.5 h-3.5 shrink-0 text-amber-950" />
                        ) : mode === 'Mars' ? (
                          <span className="w-2.5 h-2.5 rounded-full bg-orange-700 border border-orange-200 shrink-0 shadow-sm" />
                        ) : (
                          <span className="w-2.5 h-2.5 rounded-full bg-slate-400 border border-slate-700 shrink-0 shadow-sm" />
                        )}
                        <span>{mode}</span>
                        <span
                          className={`text-[11px] tabular-nums ${
                            isActive ? 'text-slate-950/80 font-bold' : 'text-slate-400'
                          }`}
                        >
                          ({count})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Active Mode Stage: 3D Globe for Moon/Mars, Editorial Diagram/List for Deep Space */}
            {activeZone === 'Deep Space' ? (
              <DeepSpaceView
                exhibits={zoneExhibits}
                selectedExhibit={selectedExhibit}
                onSelectExhibit={handleSelectExhibit}
              />
            ) : (
              <GlobeExplorer
                planet={activeZone}
                exhibits={zoneExhibits}
                config={CONFIG}
                selectedExhibit={selectedExhibit}
                onSelectExhibit={handleSelectExhibit}
              />
            )}
          </div>
        </section>

        {/* Section 01B: Complete Museum Hardware Catalog */}
        <section
          id="catalog"
          aria-labelledby="catalog-heading"
          className="py-14 border-t border-slate-800 bg-[#080B12]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div className="space-y-2">
                <p className="text-xs font-mono uppercase tracking-wider text-amber-400">
                  Complete Collection · {EXHIBITS.length} Curated Machines
                </p>
                <h2
                  id="catalog-heading"
                  className="text-2xl sm:text-3xl font-display font-semibold text-white tracking-tight"
                >
                  All Exhibits Across Moon, Mars & Deep Space
                </h2>
              </div>

              {/* Filter Controls by Zone and Status Stamp */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Zone Filter */}
                <div
                  role="group"
                  aria-label="Filter catalog by zone"
                  className="inline-flex p-1 bg-[#0B0E17] border border-slate-800 rounded text-xs font-mono"
                >
                  {(['ALL', 'Moon', 'Mars', 'Deep Space'] as const).map((z) => (
                    <button
                      key={z}
                      type="button"
                      onClick={() => setCatalogZoneFilter(z)}
                      className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap shrink-0 ${
                        catalogZoneFilter === z
                          ? 'bg-slate-800 text-white font-semibold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {z === 'ALL' ? 'All Zones' : z}
                    </button>
                  ))}
                </div>

                {/* Status Filter */}
                <div
                  role="group"
                  aria-label="Filter catalog by status"
                  className="inline-flex p-1 bg-[#0B0E17] border border-slate-800 rounded text-xs font-mono overflow-x-auto max-w-full"
                >
                  {(
                    ['ALL', 'STILL WORKING', 'SILENT', 'ENDED ON PURPOSE'] as const
                  ).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setCatalogStatusFilter(st)}
                      className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap shrink-0 ${
                        catalogStatusFilter === st
                          ? 'bg-slate-800 text-amber-300 font-semibold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {st === 'ALL' ? 'All Statuses' : st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Catalog Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCatalogExhibits.map((exhibit) => (
                <article
                  key={exhibit.id}
                  className="flex flex-col justify-between bg-[#0B0E17] border border-slate-800 rounded overflow-hidden hover:border-slate-700 transition-colors"
                >
                  <div>
                    {/* Gray Placeholder Thumbnail */}
                    <div className="relative aspect-16/9 w-full bg-zinc-900 border-b border-slate-800 overflow-hidden">
                      <img
                        src={exhibit.image}
                        alt={exhibit.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-xs font-mono text-slate-400">
                          <span className="text-slate-200 uppercase">{exhibit.zone}</span>
                          <span aria-hidden="true"> · </span>
                          <span className="tabular-nums">{exhibit.years}</span>
                        </div>
                        <StatusStamp status={exhibit.status} size="sm" />
                      </div>

                      <h3 className="text-xl font-display font-semibold text-white">
                        {exhibit.name}
                      </h3>

                      <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">
                        {exhibit.story}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 py-3.5 bg-[#07090E] border-t border-slate-800 flex items-center justify-between gap-2 text-xs font-mono">
                    <span className="text-slate-400 tabular-nums">
                      {exhibit.zone === 'Deep Space' && exhibit.distanceFromEarth
                        ? exhibit.distanceFromEarth
                        : `${exhibit.lat.toFixed(2)}°, ${exhibit.lng.toFixed(2)}°`}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        handleSelectExhibit(exhibit);
                        const explorerEl = document.getElementById('explorer');
                        explorerEl?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-semibold focus-visible:outline-2 focus-visible:outline-amber-400 whitespace-nowrap"
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span>Locate & Open Dossier</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Section 02: Challenge Requirement — Planned vs Reality */}
        <PlannedVsRealitySection
          exhibits={EXHIBITS}
          onInspectExhibit={(exhibit) => {
            handleSelectExhibit(exhibit);
          }}
        />

        {/* Section 03: Challenge Requirement — Guess the machine (5-question quiz) */}
        <GuessTheMachineQuiz
          exhibits={EXHIBITS}
          onInspectExhibit={(exhibit) => {
            handleSelectExhibit(exhibit);
          }}
        />
      </main>

      {/* Exhibit Detail Side Panel (Full-screen on mobile, side drawer on desktop) */}
      <ExhibitDetailPanel
        exhibit={selectedExhibit}
        onClose={() => setSelectedExhibit(null)}
        onSelectNeighbor={handleSelectNeighbor}
        totalInZone={zoneExhibits.length}
        currentIndexInZone={currentIndexInZone >= 0 ? currentIndexInZone : 0}
      />

      {/* Closing Section & Mandatory Closing Line */}
      <footer className="py-16 border-t border-slate-800 bg-[#05070B] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Abandoned but Not Forgotten · NASA Space Hardware Museum</span>
          </div>
          <p className="text-2xl sm:text-3xl font-display italic text-white tracking-tight">
            These machines were left behind. We have not forgotten them.
          </p>
        </div>
      </footer>
    </div>
  );
}
