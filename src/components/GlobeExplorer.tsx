import React, { useEffect, useRef, useState, useCallback } from 'react';
import { RotateCcw, ZoomIn, ZoomOut, MapPin, Crosshair, Play, Pause, Compass, Sparkles, Moon, Globe } from 'lucide-react';
import { Exhibit, MuseumConfig } from '../types';
import { StatusStamp } from './StatusStamp';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Globe?: any;
  }
}

interface LandmarkQuickLink {
  name: string;
  badge: string;
  lat: number;
  lng: number;
  exhibitId?: string;
}

const MOON_LANDMARKS: LandmarkQuickLink[] = [
  { name: 'Mare Tranquillitatis', badge: 'Apollo 11', lat: 0.6741, lng: 23.473, exhibitId: 'apollo-11-eagle' },
  { name: 'Montes Apenninus', badge: 'Apollo 15 Buggy', lat: 26.1322, lng: 3.6339, exhibitId: 'apollo-15-rover' },
  { name: 'Oceanus Procellarum', badge: 'Surveyor 3', lat: -3.0155, lng: -23.418, exhibitId: 'surveyor-3' },
  { name: 'Copernicus Crater', badge: '93 km Basin', lat: 9.62, lng: -20.08 },
  { name: 'Tycho Crater', badge: 'Ray System', lat: -43.31, lng: -11.36 },
  { name: 'Sundman V Far-Side', badge: 'LADEE Impact', lat: 11.97, lng: -93.25, exhibitId: 'ladee' },
];

const MARS_LANDMARKS: LandmarkQuickLink[] = [
  { name: 'Olympus Mons', badge: '21 km Volcano', lat: 18.65, lng: -133.8 },
  { name: 'Valles Marineris', badge: 'Grand Canyon', lat: -13.9, lng: -59.2 },
  { name: 'Jezero Delta', badge: 'Ingenuity & Percy', lat: 18.44, lng: 77.45, exhibitId: 'ingenuity' },
  { name: 'Gale / Mt. Sharp', badge: 'Curiosity Lab', lat: -4.59, lng: 137.44, exhibitId: 'curiosity' },
  { name: 'Meridiani Planum', badge: 'Opportunity', lat: -1.95, lng: -5.53, exhibitId: 'opportunity' },
  { name: 'North Polar Cap', badge: 'Water & CO₂ Ice', lat: 84.0, lng: 0.0 },
];

interface GlobeExplorerProps {
  planet: 'Moon' | 'Mars';
  exhibits: Exhibit[];
  config: MuseumConfig;
  selectedExhibit: Exhibit | null;
  onSelectExhibit: (exhibit: Exhibit) => void;
}

export const GlobeExplorer: React.FC<GlobeExplorerProps> = ({
  planet,
  exhibits,
  config,
  selectedExhibit,
  onSelectExhibit,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeRef = useRef<any>(null);
  const [hoveredExhibit, setHoveredExhibit] = useState<Exhibit | null>(null);
  const [globeReady, setGlobeReady] = useState<boolean>(false);
  const [webglFallback, setWebglFallback] = useState<boolean>(false);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);

  // Refs for latest callback access inside globe.gl DOM callbacks
  const onSelectRef = useRef(onSelectExhibit);
  onSelectRef.current = onSelectExhibit;

  const planetConfig = config.textures[planet];
  const activeLandmarks = planet === 'Moon' ? MOON_LANDMARKS : MARS_LANDMARKS;

  // Fly smoothly to an exhibit or landmark on the globe
  const flyToCoordinates = useCallback((lat: number, lng: number, altitude = 1.38, durationMs = 1100) => {
    if (globeRef.current && typeof globeRef.current.pointOfView === 'function') {
      globeRef.current.pointOfView({ lat, lng, altitude }, durationMs);
    }
  }, []);

  const flyToExhibit = useCallback((exhibit: Exhibit, durationMs = 1100) => {
    flyToCoordinates(exhibit.lat, exhibit.lng, 1.38, durationMs);
  }, [flyToCoordinates]);

  // Sync auto-rotation setting with Three.js OrbitControls
  useEffect(() => {
    if (globeRef.current && typeof globeRef.current.controls === 'function') {
      const controls = globeRef.current.controls();
      if (controls) {
        controls.autoRotate = isAutoRotating;
        controls.autoRotateSpeed = 0.45;
      }
    }
  }, [isAutoRotating]);

  // Initialize globe.gl instance
  useEffect(() => {
    let isMounted = true;

    const initGlobe = () => {
      if (!isMounted || !containerRef.current) return;
      if (!window.Globe) {
        setWebglFallback(true);
        return;
      }

      try {
        // Clear container before mounting
        containerRef.current.innerHTML = '';
        const width = containerRef.current.clientWidth || 800;
        const height = containerRef.current.clientHeight || 540;

        const world = window.Globe()(containerRef.current)
          .width(width)
          .height(height)
          .backgroundColor('rgba(0,0,0,0)')
          .globeImageUrl(planetConfig.globeImageUrl);

        // Apply 3D topographic relief bump map when available
        if (planetConfig.bumpImageUrl) {
          world.bumpImageUrl(planetConfig.bumpImageUrl);
        }

        // Apply authentic celestial starfield background when available
        if (config.backgroundImageUrl) {
          world.backgroundImageUrl(config.backgroundImageUrl);
        }

        // Automatic texture error fallback to CDN if local bundle fails
        if (planetConfig.fallbackGlobeImageUrl) {
          const testImg = new Image();
          testImg.onerror = () => {
            if (isMounted && planetConfig.fallbackGlobeImageUrl) {
              world.globeImageUrl(planetConfig.fallbackGlobeImageUrl);
            }
          };
          testImg.src = planetConfig.globeImageUrl;
        }

        if (planetConfig.bumpImageUrl && planetConfig.fallbackBumpImageUrl) {
          const testBump = new Image();
          testBump.onerror = () => {
            if (isMounted && planetConfig.fallbackBumpImageUrl) {
              world.bumpImageUrl(planetConfig.fallbackBumpImageUrl);
            }
          };
          testBump.src = planetConfig.bumpImageUrl;
        }

        // Configure atmosphere (Moon strictly has none; Mars has thin orange-tinted dust haze)
        world
          .showAtmosphere(planet === 'Moon' ? false : Boolean(planetConfig.atmosphereEnabled))
          .atmosphereColor(planetConfig.atmosphereColor || '#C1440E')
          .atmosphereAltitude(planetConfig.atmosphereAltitude || 0.12)
          // Points layer for WebGL raycast hover & click
          .pointsData(exhibits)
          .pointLat('lat')
          .pointLng('lng')
          .pointAltitude(0.02)
          .pointRadius(0.7)
          .pointColor((d: Exhibit) => {
            if (d.status === 'STILL WORKING') return '#10B981';
            if (d.status === 'ENDED ON PURPOSE') return '#06B6D4';
            return '#F59E0B';
          })
          .pointLabel(
            (d: Exhibit) => `
              <div style="background:#07090E;border:1px solid #334155;padding:8px 12px;border-radius:4px;font-family:'JetBrains Mono',monospace;color:#F8FAFC;box-shadow:0 12px 30px rgba(0,0,0,0.8);">
                <div style="font-weight:700;font-size:13px;color:#F8FAFC;">${d.name}</div>
                <div style="font-size:11px;color:#F59E0B;margin-top:2px;">Years: ${d.years} · ${d.status}</div>
                <div style="font-size:10px;color:#94A3B8;margin-top:2px;">Click marker to inspect exhibit</div>
              </div>
            `
          )
          .onPointHover((d: Exhibit | null) => {
            if (isMounted) setHoveredExhibit(d || null);
          })
          .onPointClick((d: Exhibit) => {
            if (!d) return;
            world.pointOfView({ lat: d.lat, lng: d.lng, altitude: 1.38 }, 1000);
            onSelectRef.current(d);
          })
          // Rings around landing sites for visual clarity
          .ringsData(exhibits)
          .ringLat('lat')
          .ringLng('lng')
          .ringColor((d: Exhibit) =>
            d.status === 'STILL WORKING'
              ? () => 'rgba(16,185,129,0.65)'
              : d.status === 'ENDED ON PURPOSE'
              ? () => 'rgba(6,182,212,0.65)'
              : () => 'rgba(245,158,11,0.65)'
          )
          .ringMaxRadius(3.5)
          .ringPropagationSpeed(1.2)
          .ringRepeatPeriod(1500)
          // Interactive HTML Markers for keyboard & mouse accessibility
          .htmlElementsData(exhibits)
          .htmlLat('lat')
          .htmlLng('lng')
          .htmlAltitude(0.026)
          .htmlElement((d: Exhibit) => {
            const wrapper = document.createElement('div');
            wrapper.style.pointerEvents = 'auto';
            wrapper.style.cursor = 'pointer';

            const dotColor =
              d.status === 'STILL WORKING'
                ? '#10B981'
                : d.status === 'ENDED ON PURPOSE'
                ? '#06B6D4'
                : '#F59E0B';

            const btn = document.createElement('button');
            btn.type = 'button';
            btn.setAttribute('aria-label', `${d.name} (${d.years}) - Click to open exhibit details`);
            btn.style.cssText = `
              display: inline-flex;
              align-items: center;
              gap: 6px;
              padding: 4px 8px;
              background: rgba(7, 9, 14, 0.92);
              border: 1px solid ${dotColor};
              border-radius: 4px;
              color: #F8FAFC;
              font-family: 'JetBrains Mono', monospace;
              font-size: 11px;
              line-height: 1.2;
              white-space: nowrap;
              box-shadow: 0 6px 16px rgba(0,0,0,0.75);
              transform: translate(-50%, -120%);
              transition: transform 150ms ease, background 150ms ease;
            `;

            const badge = document.createElement('span');
            badge.style.cssText = `
              display: inline-block;
              width: 7px;
              height: 7px;
              border-radius: 50%;
              background: ${dotColor};
              flex-shrink: 0;
            `;

            const label = document.createElement('span');
            label.innerHTML = `<strong style="font-weight:600;">${d.name}</strong> <span style="color:#94A3B8;margin-left:3px;">(${d.years})</span>`;

            btn.appendChild(badge);
            btn.appendChild(label);
            wrapper.appendChild(btn);

            btn.addEventListener('mouseenter', () => {
              btn.style.transform = 'translate(-50%, -125%) scale(1.06)';
              btn.style.background = '#1E293B';
              if (isMounted) setHoveredExhibit(d);
            });
            btn.addEventListener('mouseleave', () => {
              btn.style.transform = 'translate(-50%, -120%) scale(1)';
              btn.style.background = 'rgba(7, 9, 14, 0.92)';
              if (isMounted) setHoveredExhibit((prev) => (prev?.id === d.id ? null : prev));
            });
            btn.addEventListener('focus', () => {
              if (isMounted) setHoveredExhibit(d);
            });
            btn.addEventListener('blur', () => {
              if (isMounted) setHoveredExhibit((prev) => (prev?.id === d.id ? null : prev));
            });
            btn.addEventListener('click', (e) => {
              e.stopPropagation();
              world.pointOfView({ lat: d.lat, lng: d.lng, altitude: 1.38 }, 1000);
              onSelectRef.current(d);
            });

            return wrapper;
          });

        // Initial camera orientation centered on prime landing cluster
        const initialView =
          planet === 'Moon'
            ? { lat: 10, lng: 20, altitude: 2.1 }
            : { lat: 12, lng: 50, altitude: 2.1 };
        world.pointOfView(initialView, 0);

        // Configure OrbitControls for smooth rotation & zoom
        const controls = world.controls();
        if (controls) {
          controls.enableDamping = true;
          controls.dampingFactor = 0.08;
          controls.rotateSpeed = 0.7;
          controls.zoomSpeed = 0.9;
          controls.minDistance = 120;
          controls.maxDistance = 480;
          controls.autoRotate = isAutoRotating;
          controls.autoRotateSpeed = 0.45;
        }

        globeRef.current = world;
        setGlobeReady(true);
        setWebglFallback(false);
      } catch {
        if (isMounted) {
          setWebglFallback(true);
        }
      }
    };

    if (window.Globe) {
      initGlobe();
    } else {
      // Load from exact pinned jsDelivr URL if not yet loaded
      const existingScript = document.querySelector(`script[src="${config.globeCdnUrl}"]`);
      if (existingScript) {
        existingScript.addEventListener('load', initGlobe);
      } else {
        const script = document.createElement('script');
        script.src = config.globeCdnUrl;
        script.async = true;
        script.onload = initGlobe;
        script.onerror = () => {
          if (isMounted) setWebglFallback(true);
        };
        document.head.appendChild(script);
      }
    }

    return () => {
      isMounted = false;
    };
    // Re-run when planet or exhibits change
  }, [planet, exhibits, config, planetConfig, isAutoRotating]);

  // Responsive resize observer for the 3D globe canvas
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (globeRef.current && width > 0 && height > 0) {
          globeRef.current.width(width).height(height);
        }
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Fly to selectedExhibit whenever it changes from external triggers
  useEffect(() => {
    if (selectedExhibit && selectedExhibit.zone === planet) {
      flyToExhibit(selectedExhibit, 1000);
    }
  }, [selectedExhibit, planet, flyToExhibit]);

  const handleZoom = (deltaAltitude: number) => {
    if (!globeRef.current) return;
    const currentPov = globeRef.current.pointOfView();
    const nextAlt = Math.max(0.55, Math.min(3.5, (currentPov.altitude || 2.0) + deltaAltitude));
    globeRef.current.pointOfView({ ...currentPov, altitude: nextAlt }, 400);
  };

  const handleResetCamera = () => {
    if (!globeRef.current) return;
    const initialView =
      planet === 'Moon'
        ? { lat: 10, lng: 20, altitude: 2.1 }
        : { lat: 12, lng: 50, altitude: 2.1 };
    globeRef.current.pointOfView(initialView, 800);
  };

  const handleLandmarkClick = (lm: LandmarkQuickLink) => {
    flyToCoordinates(lm.lat, lm.lng, 1.35, 1200);
    if (lm.exhibitId) {
      const match = exhibits.find((e) => e.id === lm.exhibitId);
      if (match) {
        onSelectExhibit(match);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* Main 3D Globe Viewport Stage (8 cols on desktop) */}
      <div className="lg:col-span-8 relative flex flex-col min-h-[420px] sm:min-h-[560px] lg:min-h-[640px] bg-[#07090E] border border-slate-800 rounded-2xl overflow-hidden">
        {/* Top Viewport Telemetry Bar */}
        <div className="z-10 flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#0B0E17]/95 border-b border-slate-800 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-2 text-slate-300">
            <span className="font-semibold text-white uppercase flex items-center gap-1.5">
              {planet === 'Moon' ? (
                <Moon className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              ) : (
                <Globe className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              )}
              <span>{planetConfig.label}</span>
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">Radius: {planetConfig.radiusKm}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">Gravity: {planetConfig.gravity}</span>
            <span aria-hidden="true" className="hidden sm:inline text-slate-600">·</span>
            <span className="hidden sm:inline text-amber-400">
              {planet === 'Moon' ? 'Atmosphere: NONE (Airless Vacuum)' : 'Atmosphere: Thin CO₂ (95.3%)'}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Auto-Rotation Toggle */}
            <button
              type="button"
              onClick={() => setIsAutoRotating((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono border rounded transition-colors focus-visible:outline-2 focus-visible:outline-amber-400 whitespace-nowrap shrink-0 ${
                isAutoRotating
                  ? 'bg-amber-400/10 text-amber-300 border-amber-400/40 hover:bg-amber-400/20'
                  : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-slate-200 hover:bg-slate-800'
              }`}
              aria-label={isAutoRotating ? 'Pause celestial rotation' : 'Start celestial rotation'}
              title="Toggle celestial globe rotation"
            >
              {isAutoRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isAutoRotating ? 'Rotating' : 'Paused'}</span>
            </button>

            {/* Zoom & Reset Controls */}
            <button
              type="button"
              onClick={() => handleZoom(-0.4)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-mono text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded transition-colors focus-visible:outline-2 focus-visible:outline-amber-400 whitespace-nowrap shrink-0"
              aria-label="Zoom in on globe"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Zoom In</span>
            </button>
            <button
              type="button"
              onClick={() => handleZoom(0.4)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-mono text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded transition-colors focus-visible:outline-2 focus-visible:outline-amber-400 whitespace-nowrap shrink-0"
              aria-label="Zoom out on globe"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Zoom Out</span>
            </button>
            <button
              type="button"
              onClick={handleResetCamera}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-mono text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded transition-colors focus-visible:outline-2 focus-visible:outline-amber-400 whitespace-nowrap shrink-0"
              aria-label="Reset 3D globe view"
              title="Reset view"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Geological Landmark Quick-Fly Strip */}
        <div className="z-10 px-4 py-2 bg-[#090C14] border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs font-mono">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Compass className="w-3 h-3 text-amber-400" />
            <span>Fly To:</span>
          </span>
          <div className="flex items-center gap-1.5">
            {activeLandmarks.map((lm) => (
              <button
                key={lm.name}
                type="button"
                onClick={() => handleLandmarkClick(lm)}
                className="px-2.5 py-1 bg-[#0F1420] hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 rounded transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
              >
                <span>{lm.name}</span>
                <span className="text-[10px] text-amber-300 bg-amber-950/60 px-1 py-0.2 rounded border border-amber-500/30">
                  {lm.badge}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 3D WebGL Globe Mount Container with Deep-Space Cosmic Starfield Backdrop */}
        <div
          className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden"
          style={{
            background:
              planet === 'Moon'
                ? 'radial-gradient(circle at center, #0B0E17 0%, #05070A 60%, #020305 100%)'
                : 'radial-gradient(circle at center, #130B0B 0%, #0A070A 55%, #030204 100%)',
          }}
        >
          {/* Subtle Deep-Space Stellar Backdrop (CSS stars) */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage:
                'radial-gradient(1px 1px at 25px 35px, #fff, transparent), radial-gradient(1.5px 1.5px at 140px 180px, #a5b4fc, transparent), radial-gradient(1px 1px at 300px 90px, #fff, transparent), radial-gradient(1px 1px at 450px 240px, #fde68a, transparent), radial-gradient(1.5px 1.5px at 620px 80px, #fff, transparent), radial-gradient(1px 1px at 780px 320px, #cbd5e1, transparent)',
              backgroundSize: '400px 400px',
            }}
          />

          {/* 3D Globe Mount */}
          <div
            ref={containerRef}
            className="w-full h-[380px] sm:h-[500px] lg:h-[550px] cursor-grab active:cursor-grabbing touch-pan-y"
            aria-label={`Interactive 3D globe of ${planet}. Drag to rotate, scroll to zoom, or select a landing site.`}
          />

          {/* Interactive Fallback Map if WebGL is unavailable in headless environment */}
          {webglFallback && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-[#0B0E17] text-center">
              <div
                className={`relative w-64 h-64 sm:w-80 sm:h-80 rounded-full border-2 flex items-center justify-center shadow-inner ${
                  planet === 'Moon'
                    ? 'bg-zinc-800 border-zinc-600'
                    : 'bg-orange-950/80 border-orange-700/70'
                }`}
              >
                {exhibits.map((ex) => {
                  const xPct = Math.min(85, Math.max(15, ((ex.lng + 180) / 360) * 100));
                  const yPct = Math.min(85, Math.max(15, ((90 - ex.lat) / 180) * 100));
                  return (
                    <button
                      key={ex.id}
                      type="button"
                      style={{ left: `${xPct}%`, top: `${yPct}%` }}
                      onMouseEnter={() => setHoveredExhibit(ex)}
                      onMouseLeave={() => setHoveredExhibit(null)}
                      onFocus={() => setHoveredExhibit(ex)}
                      onClick={() => onSelectExhibit(ex)}
                      className="absolute -translate-x-1/2 -translate-y-1/2 px-2 py-1 text-[11px] font-mono bg-slate-950/90 text-white border border-amber-400 rounded hover:scale-105 transition-transform whitespace-nowrap"
                    >
                      {ex.name} ({ex.years})
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 text-xs font-mono text-slate-400">
                Interactive {planet} Coordinate Projection · Select any marker to inspect
              </p>
            </div>
          )}

          {/* Hover Readout Banner (shows hovered marker Name and Years) */}
          <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 px-3.5 py-2 bg-[#07090E]/92 backdrop-blur-sm border border-slate-800 rounded text-xs font-mono">
            {hoveredExhibit ? (
              <div className="flex flex-wrap items-center gap-2 text-amber-300">
                <Crosshair className="w-3.5 h-3.5 shrink-0" />
                <span className="font-semibold text-white">{hoveredExhibit.name}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>Years: {hoveredExhibit.years}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-slate-300 tabular-nums">
                  {hoveredExhibit.lat.toFixed(2)}°, {hoveredExhibit.lng.toFixed(2)}°
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-slate-400">
                <Sparkles className="w-3.5 h-3.5 text-amber-400/80 shrink-0" />
                <span className="hidden sm:inline">
                  Drag to rotate · Scroll to zoom · Hover marker for name & years · Click marker to fly & open dossier
                </span>
                <span className="sm:hidden text-[11px]">
                  Drag to rotate world · Tap marker to inspect
                </span>
              </div>
            )}
            <span className="text-[11px] text-slate-400 tabular-nums">
              {globeReady ? `${exhibits.length} Landing Sites Mapped` : 'Loading 3D Globe...'}
            </span>
          </div>
        </div>
      </div>

      {/* Right Column: Accessible Landing Site Directory for Active Planet (4 cols on desktop) */}
      <div className="lg:col-span-4 flex flex-col bg-[#0B0E17] border border-slate-800 rounded overflow-hidden">
        <div className="px-4 py-3.5 bg-[#07090E] border-b border-slate-800">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-200 font-semibold">
              {planet} Landing Sites ({exhibits.length})
            </h3>
            <span className="text-[11px] font-mono text-amber-300">
              Interactive 3D Coordinates
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Select any mission to smoothly fly the 3D globe to its landing site and view its full curator dossier.
          </p>
        </div>

        <div className="flex-1 divide-y divide-slate-800/80 overflow-y-auto max-h-[560px]">
          {exhibits.map((exhibit) => {
            const isSelected = selectedExhibit?.id === exhibit.id;
            const isHovered = hoveredExhibit?.id === exhibit.id;

            return (
              <button
                key={exhibit.id}
                type="button"
                onMouseEnter={() => setHoveredExhibit(exhibit)}
                onMouseLeave={() => setHoveredExhibit(null)}
                onClick={() => {
                  flyToExhibit(exhibit, 1000);
                  onSelectExhibit(exhibit);
                }}
                className={`w-full text-left p-4 transition-colors focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-amber-400 ${
                  isSelected
                    ? 'bg-slate-800/90'
                    : isHovered
                    ? 'bg-slate-900/90'
                    : 'hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-base font-semibold text-white leading-snug">
                      {exhibit.name}
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 mt-1 text-xs font-mono text-slate-400 tabular-nums">
                      <span>{exhibit.years}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-400" />
                        {exhibit.lat.toFixed(2)}°, {exhibit.lng.toFixed(2)}°
                      </span>
                    </div>
                  </div>
                  <StatusStamp status={exhibit.status} size="sm" />
                </div>

                {exhibit.landingSite && (
                  <div className="mt-2 text-xs text-slate-300 line-clamp-1">
                    Site: {exhibit.landingSite}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
