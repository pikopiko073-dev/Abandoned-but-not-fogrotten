# Abandoned but Not Forgotten

An interactive 3D museum of NASA hardware left on the Moon, on Mars, and in deep space, built for school-age space enthusiasts and explorers of all ages.

## Overview

For over six decades, humanity has sent robotic explorers, landers, rovers, and helicopters into the solar system. Almost none of them ever returned to Earth. This project visualizes their resting coordinates and orbital trajectories, detailing what they discovered, how their hardware worked, and which ones are still transmitting signals across the void.

## Features

- **Interactive 3D Planetary Explorer**: Rotatable, zoomable 3D spheres for the Moon and Mars powered by `globe.gl`.
- **Accurate Geological Mapping**:
  - **Moon**: Maria, mountain ranges (Montes Apenninus), ray systems (Tycho, Copernicus), and craters with optical depth. Strictly no atmosphere.
  - **Mars**: Volcanoes (Olympus Mons, Tharsis Montes), grand canyon system (Valles Marineris), polar ice caps, and landing sites (Jezero, Gale, Meridiani).
- **Physical Elevation Relief (Bump Maps)**: Procedural normal relief maps that calculate surface lighting for craters, mountains, and canyon depths.
- **Deep Space Mode**: Editorial trajectory diagram mapping Voyager 1, Pioneer 10, and Cassini by distance from Earth in astronomical units (AU).
- **Curator Dossiers**: Detailed side panel with mission story, scientific discoveries, hardware breakdown in accessible language, and monospace specifications.
- **Planned vs Reality**: Endurance comparison showcasing long-lived machines like *Ingenuity* (planned 5 flights → 72 flights) and *Opportunity* (planned 90 days → 14 years).
- **"Guess the Machine" Challenge**: Interactive 5-question mission quiz with instant feedback and score tracking.

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/Abandoned-but-Not-Forgotten.git
cd Abandoned-but-Not-Forgotten

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Building for Production

```bash
npm run build
npm run preview
```

## Tech Stack

- React 19 + TypeScript
- Tailwind CSS
- Three.js / globe.gl
- Vite
- Lucide React

## Attributions

Mission data, scientific records, and historical timelines are sourced from NASA Jet Propulsion Laboratory (JPL) and NASA Science Mission Directorate archives.

---

*"These machines were left behind. We have not forgotten them."*
