import React, { useState } from 'react';
import { ENGINEER_SCENARIOS } from '../data/storyData';
import { EngineerScenario, EngineerChoice } from '../types';

export const EngineerChallengeSection: React.FC = () => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState<number>(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);

  const scenario: EngineerScenario = ENGINEER_SCENARIOS[selectedScenarioIndex] || ENGINEER_SCENARIOS[0];

  const handleSelectScenario = (index: number) => {
    setSelectedScenarioIndex(index);
    setSelectedChoiceId(null);
  };

  const chosenOption: EngineerChoice | undefined = scenario.options.find(
    (opt) => opt.id === selectedChoiceId
  );

  return (
    <section id="engineer-challenge" className="py-16 sm:py-24 px-4 sm:px-8 max-w-6xl mx-auto text-white">
      {/* Section Header */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 uppercase tracking-widest">
          Interactive Simulation
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          YOU ARE THE ENGINEER
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto font-sans">
          Step into the flight control room at NASA Jet Propulsion Laboratory. When equipment is hundreds of millions of kilometers away, one command decision can make or break a mission.
        </p>
      </div>

      {/* Scenario Selector Pills */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
        {ENGINEER_SCENARIOS.map((sc, idx) => {
          const isActive = idx === selectedScenarioIndex;
          return (
            <button
              key={sc.id}
              onClick={() => handleSelectScenario(idx)}
              className={`p-3.5 rounded-xl text-left border transition-all ${
                isActive
                  ? 'bg-zinc-900 border-amber-400/80 shadow-lg shadow-amber-500/10 ring-1 ring-amber-400/30'
                  : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50 text-zinc-400'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono uppercase text-zinc-500 mb-1">
                <span>SCENARIO 0{idx + 1}</span>
                <span>{sc.zone}</span>
              </div>
              <div className={`text-xs sm:text-sm font-semibold line-clamp-1 ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                {sc.missionName}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Mission Scenario Terminal */}
      <div className="rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden shadow-2xl">
        {/* Terminal Header */}
        <div className="flex flex-wrap items-center justify-between px-5 py-3.5 border-b border-zinc-800 bg-zinc-900/80 text-xs font-mono">
          <div className="flex items-center space-x-2 text-zinc-400">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-semibold text-zinc-200">{scenario.missionName}</span>
            <span className="text-zinc-500">· {scenario.missionYear}</span>
          </div>
          <span className="text-amber-400 font-semibold uppercase tracking-wider">
            NASA JPL FLIGHT OPERATIONS TERMINAL
          </span>
        </div>

        {/* Problem Briefing */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-1">
              EMERGENCY SITUATION REPORT
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {scenario.title}
            </h3>
          </div>

          <div className="p-5 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-3 font-sans">
            <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-medium">
              {scenario.problem}
            </p>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed italic border-t border-zinc-800/80 pt-2.5">
              ⚠️ Context: {scenario.context}
            </p>
          </div>

          {/* Options Choice Grid */}
          <div className="space-y-3">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
              WHAT COMMAND SEQUENCE DO YOU UPLINK?
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {scenario.options.map((option) => {
                const isSelected = selectedChoiceId === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => setSelectedChoiceId(option.id)}
                    className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between space-y-2 ${
                      isSelected
                        ? 'bg-amber-950/30 border-amber-400 shadow-md shadow-amber-500/10 ring-1 ring-amber-400/40 text-white'
                        : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 text-zinc-300'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="w-6 h-6 rounded-md bg-zinc-800 border border-zinc-700 font-mono text-xs font-bold text-amber-400 flex items-center justify-center">
                        {option.id}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                          Selected
                        </span>
                      )}
                    </div>

                    <div className="font-semibold text-sm text-white">{option.label}</div>
                    <div className="text-xs text-zinc-400 leading-relaxed">{option.description}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Result & NASA Decision Reveal */}
          {chosenOption ? (
            <div className="rounded-xl border p-5 sm:p-6 space-y-5 animate-fade-in bg-zinc-900/90 border-zinc-700 shadow-inner">
              {/* Consequence of User's Choice */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400 block">
                  SIMULATION CONSEQUENCE OF OPTION {chosenOption.id}
                </span>
                <p className="text-sm sm:text-base text-zinc-200 font-sans leading-relaxed">
                  {chosenOption.consequence}
                </p>
              </div>

              {/* Real NASA Decision */}
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>WHAT NASA ACTUALLY DECIDED</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                  {scenario.realNasaDecision}
                </p>
              </div>

              {/* Real Engineering Logic */}
              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 space-y-1 text-xs">
                <span className="font-mono font-semibold text-cyan-300 uppercase tracking-wider block">
                  Core Engineering Principle
                </span>
                <p className="text-zinc-300 font-sans leading-relaxed">
                  {scenario.engineeringLogic}
                </p>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  onClick={() => setSelectedChoiceId(null)}
                  className="px-4 py-1.5 rounded-lg text-xs font-mono text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition-colors"
                >
                  Test Another Option ↻
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-zinc-900/40 border border-dashed border-zinc-800 text-center text-xs font-mono text-zinc-500">
              Select an option above to simulate your decision and reveal NASA’s actual flight telemetry outcome.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
