export type ZoneMode = 'Moon' | 'Mars' | 'Deep Space';

export type ExhibitStatus = 'STILL WORKING' | 'SILENT' | 'ENDED ON PURPOSE';

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
}

export interface PlanetTextureConfig {
  globeImageUrl: string;
  bumpImageUrl: string;
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
