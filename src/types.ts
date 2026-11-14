export type ZoneMode = 'Moon' | 'Mars' | 'Deep Space';

export type ExhibitStatus =
  | 'STILL WORKING'
  | 'SILENT'
  | 'ENDED ON PURPOSE'
  | 'STILL ACTIVE'
  | 'MISSION COMPLETE'
  | 'LOST CONTACT'
  | 'ENDED AS PLANNED'
  | 'NO LONGER OPERATIONAL';

export interface StoryStage {
  stageNumber: number;
  stageName:
    | 'EARTH'
    | 'LAUNCH'
    | 'JOURNEY'
    | 'LANDING'
    | 'FIRST SIGNAL'
    | 'MISSION'
    | 'DISCOVERY'
    | 'CHALLENGE'
    | 'LAST SIGNAL'
    | 'LEGACY';
  title: string;
  dateOrTime: string;
  text: string;
  highlight?: string;
  visualTag?: string;
}

export interface TimelineMilestone {
  id: string;
  year: string;
  date?: string;
  title: string;
  summary: string;
  category: 'launch' | 'landing' | 'discovery' | 'milestone' | 'extension' | 'conclusion';
  impact: string;
}

export interface HardwareComponent {
  id: string;
  name: string;
  role: 'Eyes & Optics' | 'Power & Heart' | 'Mobility & Legs' | 'Voice to Earth' | 'Hands & Instruments' | 'Brain & Memory';
  analogy: string;
  simpleExplanation: string;
  whyItMatters: string;
  specSnippet?: string;
}

export interface ScientificFinding {
  id: string;
  title: string;
  whatWeFound: string;
  whyItMatters: string;
  scientificTermExplained?: string;
}

export interface MissionEndRecord {
  endDate: string;
  statusLabel: string;
  whyItEnded: string;
  whatHappened: string;
  wasPlanned: boolean;
  currentState: string;
  finalMessageOrTelemetry?: string;
}

export interface Exhibit {
  id: string;
  zone: ZoneMode;
  name: string;
  years: string;
  status: ExhibitStatus;
  lat: number;
  lng: number;
  story: string;
  learned: string;
  hardware: string;
  planned: string;
  actual: string;
  source: string;
  image: string;
  // Additional contextual fields for Deep Space mode & mono data table
  distanceFromEarth?: string;
  distanceAu?: number;
  landingSite?: string;
  launchYear?: number;
  massKg?: string;
  plannedVsRealityFeatured?: boolean;
  plannedRatioPercent?: number;
  multiplierText?: string;
  // Deep Storytelling & Educational Extensions
  tagline?: string;
  storyStages?: StoryStage[];
  timelineMilestones?: TimelineMilestone[];
  hardwareComponents?: HardwareComponent[];
  scientificFindings?: ScientificFinding[];
  missionEndDetails?: MissionEndRecord;
}

export interface PlanetTextureConfig {
  globeImageUrl: string;
  bumpImageUrl: string;
  fallbackGlobeImageUrl?: string;
  fallbackBumpImageUrl?: string;
  atmosphereEnabled: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  label: string;
  subtitle: string;
  radiusKm: string;
  gravity: string;
}

export interface MuseumConfig {
  globeCdnUrl: string;
  backgroundImageUrl?: string;
  textures: {
    Moon: PlanetTextureConfig;
    Mars: PlanetTextureConfig;
  };
  placeholderImageBase: string;
}

export interface QuizQuestion {
  id: string;
  exhibitId: string;
  prompt: string;
  clueFromStory: string;
  options: string[];
  correctAnswer: string;
  zone: ZoneMode;
}

export interface EngineerChoice {
  id: 'A' | 'B' | 'C';
  label: string;
  description: string;
  consequence: string;
  isRealNasaChoice: boolean;
}

export interface EngineerScenario {
  id: string;
  missionName: string;
  missionId: string;
  missionYear: string;
  zone: ZoneMode;
  title: string;
  problem: string;
  context: string;
  options: EngineerChoice[];
  realNasaDecision: string;
  engineeringLogic: string;
}

export interface EvolutionEra {
  decade: string;
  title: string;
  representativeMachine: string;
  years: string;
  tagline: string;
  computing: string;
  cameras: string;
  mobility: string;
  autonomy: string;
  power: string;
  instruments: string;
}
