import React, { useState, useMemo, useCallback } from 'react';
import { Compass, Sparkles, Orbit, Layers, Rocket, ShieldAlert, Cpu } from 'lucide-react';
import { CONFIG as MUSEUM_CONFIG, EXHIBITS as MUSEUM_EXHIBITS } from './data/museumData';
import { Exhibit, ExhibitStatus, ZoneMode } from './types';
import { GlobeExplorer } from './components/GlobeExplorer';
import { DeepSpaceView } from './components/DeepSpaceView';
import { ExhibitDetailPanel } from './components/ExhibitDetailPanel';
import { PlannedVsRealitySection } from './components/PlannedVsRealitySection';
import { GuessTheMachineQuiz } from './components/GuessTheMachineQuiz';
import { StatusStamp } from './components/StatusStamp';
import { StoryModeModal } from './components/StoryModeModal';
import { EngineerChallengeSection } from './components/EngineerChallengeSection';
import { ThenVsNowSection } from './components/ThenVsNowSection';

// Re-export central CONFIG and EXHIBITS at the top of App.tsx for direct inspection & modification
export const CONFIG = MUSEUM_CONFIG;
export const EXHIBITS: Exhibit[] = MUSEUM_EXHIBITS;

export default function App() {
  // Active Mode: 'Moon' | 'Mars' | 'Deep Space'
  const [activeZone, setActiveZone] = useState<ZoneMode>('Moon');
  // Selected exhibit for the Side Panel (null when closed)
  const [selectedExhibit, setSelectedExhibit] = useState<Exhibit | null>(null);
  // Story Mode Modal State
  const [isStoryModalOpen, setIsStoryModalOpen] = useState<boolean>(false);
  const [storyModalExhibit, setStoryModalExhibit] = useState<Exhibit | null>(null);

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

  // Launch Story Mode for any exhibit
  const handleStartStory = useCallback((exhibit: Exhibit) => {
    setStoryModalExhibit(exhibit);
    setIsStoryModalOpen(true);
  }, []);

  // Start story mode from Hero CTA (featured: Opportunity or Apollo 11)
  const handleHeroStartStory = useCallback(() => {
    const featured =
      EXHIBITS.find((e) => e.id === 'opportunity') ||
      EXHIBITS.find((e) => e.id === 'apollo-11-eagle') ||
      EXHIBITS[0];
    handleStartStory(featured);
  }, [handleStartStory]);

  // Switch planet / zone from hero buttons
  const handleExploreZone = (zone: ZoneMode) => {
    setActiveZone(zone);
    const explorerEl = document.getElementById('explorer');
    explorerEl?.scrollIntoView({ behavior: 'smooth' });
  };

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
    <div className="min-h-screen flex flex-col bg-[#07090E] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Bar Navigation */}
      <header className="sticky top-0 z-30 flex items-center justify-between gap-6 px-4 sm:px-6 lg:px-8 py-3.5 bg-[#07090E]/95 backdrop-blur-md border-b border-slate-800">
        {/* Brand Wordmark */}
        <a
          href="#explorer"
          className="text-lg sm:text-xl font-display font-bold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center space-x-2"
        >
          <span className="text-cyan-400">✦</span>
          <span>Abandoned but Not Forgotten</span>
        </a>

        {/* Primary Navigation Links */}
        <nav
          aria-label="Primary Museum Navigation"
          className="hidden lg:flex items-center gap-5 text-xs font-mono font-medium text-slate-300"
        >
          <a
            href="#explorer"
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            3D Worlds
          </a>
          <a
            href="#then-vs-now"
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            Then vs Now
          </a>
          <a
            href="#engineer-challenge"
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            Engineer Challenge
          </a>
          <a
            href="#planned-vs-reality"
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            Planned vs Reality
          </a>
          <a
            href="#catalog"
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            Catalog
          </a>
          <a
            href="#guess-the-machine"
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            Quiz
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleHeroStartStory}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-bold text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors shadow-sm shadow-cyan-500/20 whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Start Story</span>
          </button>

          <button
            type="button"
            onClick={handleOpenRandomExhibit}
            className="px-3.5 py-1.5 text-xs font-mono font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            Surprise Exhibit
          </button>
        </div>
      </header>

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* Section 00: Landing Hero */}
        <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 bg-radial-at-c from-slate-900/40 via-[#07090E] to-[#07090E] text-center overflow-hidden">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase tracking-widest">
              NASA Educational Space Museum
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              THE MACHINES WE LEFT BEHIND
            </h1>

            <p className="text-sm sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
              Explore the stories, hardware and discoveries of NASA machines that reached the Moon, Mars and deep space.
            </p>

            {/* 4 Action Buttons Required by NASA Challenge Prompt */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2.5 sm:gap-3 pt-2 w-full max-w-lg sm:max-w-none mx-auto">
              <button
                type="button"
                onClick={() => handleExploreZone('Moon')}
                className="w-full sm:w-auto px-3.5 sm:px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 hover:border-slate-600 text-slate-200 font-mono text-[11px] sm:text-xs font-semibold transition-all flex items-center justify-center space-x-2 shadow-sm min-h-[44px]"
              >
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-slate-300 shrink-0" />
                <span className="truncate">EXPLORE MOON</span>
              </button>

              <button
                type="button"
                onClick={() => handleExploreZone('Mars')}
                className="w-full sm:w-auto px-3.5 sm:px-5 py-2.5 rounded-xl border border-orange-500/40 bg-orange-950/20 hover:bg-orange-950/40 text-orange-200 font-mono text-[11px] sm:text-xs font-semibold transition-all flex items-center justify-center space-x-2 shadow-sm min-h-[44px]"
              >
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-orange-500 shrink-0" />
                <span className="truncate">EXPLORE MARS</span>
              </button>

              <button
                type="button"
                onClick={() => handleExploreZone('Deep Space')}
                className="w-full sm:w-auto px-3.5 sm:px-5 py-2.5 rounded-xl border border-amber-500/40 bg-amber-950/20 hover:bg-amber-950/40 text-amber-200 font-mono text-[11px] sm:text-xs font-semibold transition-all flex items-center justify-center space-x-2 shadow-sm min-h-[44px]"
              >
                <Orbit className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">DEEP SPACE</span>
              </button>

              <button
                type="button"
                onClick={handleHeroStartStory}
                className="w-full sm:w-auto px-4 sm:px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-mono text-[11px] sm:text-xs font-bold tracking-wider uppercase transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center space-x-2 min-h-[44px]"
              >
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">START A STORY</span>
              </button>
            </div>
          </div>
        </section>

        {/* Section 01: 3D Globe / Deep Space Explorer */}
        <section
          id="explorer"
          aria-labelledby="explorer-heading"
          className="py-8 sm:py-12"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {/* World Switcher Header */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-6 border-b border-slate-800">
              <div className="lg:col-span-7 space-y-2">
                <p className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                  01. Planetary Worlds & Resting Coordinates
                </p>
                <h2
                  id="explorer-heading"
                  className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight"
                >
                  Interactive 3D Planetary Explorer
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-sans">
                  Rotate the 3D globe or navigate through interstellar space to inspect where NASA hardware landed, worked, and transformed human science. Click on any machine marker to explore its story and engineering subsystems.
                </p>
              </div>

              {/* Mode Switcher Tabs */}
              <div className="lg:col-span-5 flex flex-col sm:items-start lg:items-end justify-end gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Select World Mode
                </span>
                <div
                  role="tablist"
                  aria-label="Select Moon, Mars, or Deep Space mode"
                  className="inline-flex p-1 bg-[#0B0E17] border border-slate-800 rounded-xl w-full sm:w-auto"
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
                        className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono font-semibold rounded-lg transition-all focus-visible:outline-2 focus-visible:outline-cyan-400 whitespace-nowrap shrink-0 ${
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

            {/* Stage View */}
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

        {/* Section 02: THEN VS NOW (Hardware Evolution Across 5 Decades) */}
        <div className="border-t border-slate-800 bg-[#080B12]">
          <ThenVsNowSection />
        </div>

        {/* Section 03: YOU ARE THE ENGINEER (Interactive Dilemma Scenarios) */}
        <div className="border-t border-slate-800 bg-[#06080E]">
          <EngineerChallengeSection />
        </div>

        {/* Section 04: Challenge Requirement — Planned vs Reality */}
        <PlannedVsRealitySection
          exhibits={EXHIBITS}
          onInspectExhibit={(exhibit) => {
            handleSelectExhibit(exhibit);
          }}
        />

        {/* Section 05: Complete Museum Hardware Catalog */}
        <section
          id="catalog"
          aria-labelledby="catalog-heading"
          className="py-16 border-t border-slate-800 bg-[#080B12]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div className="space-y-2">
                <p className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                  Complete Collection · {EXHIBITS.length} Curated Machines
                </p>
                <h2
                  id="catalog-heading"
                  className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight"
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
                  className="inline-flex p-1 bg-[#0B0E17] border border-slate-800 rounded-lg text-xs font-mono"
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
                  className="inline-flex p-1 bg-[#0B0E17] border border-slate-800 rounded-lg text-xs font-mono overflow-x-auto max-w-full"
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
                          ? 'bg-slate-800 text-cyan-300 font-semibold'
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
                  className="flex flex-col justify-between bg-[#0B0E17] border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all shadow-lg"
                >
                  <div>
                    {/* Archival Thumbnail */}
                    <div className="relative aspect-16/9 w-full bg-zinc-900 border-b border-slate-800 overflow-hidden">
                      <img
                        src={exhibit.image}
                        alt={exhibit.name}
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

                      <p className="text-sm text-slate-300 leading-relaxed line-clamp-3 font-sans">
                        {exhibit.story}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 py-3.5 bg-[#07090E] border-t border-slate-800 flex items-center justify-between gap-2 text-xs font-mono">
                    <button
                      type="button"
                      onClick={() => handleStartStory(exhibit)}
                      className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Story Mode</span>
                    </button>

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
                      <span>Locate & Dossier</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Section 06: Challenge Requirement — Guess the machine (5-question quiz) */}
        <GuessTheMachineQuiz
          exhibits={EXHIBITS}
          onInspectExhibit={(exhibit) => {
            handleSelectExhibit(exhibit);
          }}
        />
      </main>

      {/* Exhibit Detail Side Panel */}
      <ExhibitDetailPanel
        exhibit={selectedExhibit}
        onClose={() => setSelectedExhibit(null)}
        onSelectNeighbor={handleSelectNeighbor}
        onStartStory={handleStartStory}
        totalInZone={zoneExhibits.length}
        currentIndexInZone={currentIndexInZone >= 0 ? currentIndexInZone : 0}
      />

      {/* 10-Stage Story Mode Modal */}
      <StoryModeModal
        exhibit={storyModalExhibit}
        isOpen={isStoryModalOpen}
        onClose={() => setIsStoryModalOpen(false)}
        onSelectAnotherMission={() => {
          setIsStoryModalOpen(false);
          const catalogEl = document.getElementById('catalog');
          catalogEl?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Footer & Closing Inscription */}
      <footer className="py-16 border-t border-slate-800 bg-[#05070B] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Abandoned but Not Forgotten · NASA Space Hardware Museum</span>
          </div>
          <p className="text-2xl sm:text-3xl font-display italic text-white tracking-tight">
            These machines were left behind. We have not forgotten them.
          </p>
          <p className="text-xs font-mono text-zinc-500 pt-2">
            Built for NASA International Space Apps Challenge · Open Educational Resource
          </p>
        </div>
      </footer>
    </div>
  );
}
