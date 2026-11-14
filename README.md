# Abandoned but Not Forgotten
### NASA Space Apps Challenge Project

An interactive 3D digital museum and scientific visualizer cataloging historical NASA spacecraft, landers, rovers, and probes stationed across the Moon, Mars, and interstellar space.

---

## Project Overview

For over six decades, humanity has launched robotic emissaries to explore the celestial bodies of our Solar System. The overwhelming majority of these machines never returned to Earth; they remain at their final landing coordinates or drift through deep space as silent monuments to human curiosity.

Designed specifically for school-age space enthusiasts, educators, and the global public, **Abandoned but Not Forgotten** transforms archival aerospace data into an immersive, tactile educational experience. The platform combines Three.js WebGL visualization, physical elevation bump mapping, and historical mission dossiers to bridge technical NASA planetary data with engaging storytelling.

---

## Key Features

### 1. Interactive 3D Planetary Explorer
- **High-Fidelity Planetary Spheres**: Powered by `globe.gl` and Three.js, offering fluid 360-degree rotation, variable zoom, and smooth cinematic camera fly-to transitions upon selecting exhibits.
- **Topographic Elevation Relief (Bump Maps)**: Procedural normal displacement mapping that renders physical 3D shadows and specular glints across crater rims, mountain peaks, and tectonic chasms.
- **Physical Environment Accuracy**:
  - **The Moon**: Accurately mapped maria (*Mare Tranquillitatis*, *Serenitatis*, *Imbrium*, *Crisium*), *Montes Apenninus* mountain ridges, and radial ejecta splash rays (*Tycho*, *Copernicus*). Strictly rendered without an atmosphere to reflect the lunar vacuum.
  - **Mars**: Realistic iron-oxide terrain dichotomy, the 21 km shield volcano *Olympus Mons*, the 4,000 km rift system *Valles Marineris*, and both North and South polar ice caps surrounded by a thin carbon dioxide atmospheric haze.

### 2. Deep Space Trajectory Matrix
- Replaces the planetary globe with a heliocentric astronomical scale measured in Astronomical Units (AU) and billions of kilometers from Earth.
- Visualizes humanity's farthest active and historical deep space missions: *Voyager 1* (interstellar space), *Pioneer 10* (outer heliosphere), and *Cassini* (Saturn atmospheric entry).

### 3. Comprehensive Mission Dossiers
- Detailed side panel (responsive modal on mobile devices) featuring:
  - Official operational status stamps: `STILL WORKING`, `SILENT`, or `ENDED ON PURPOSE`
  - Archival exhibit imagery with placeholder fallbacks
  - Narrative section ("The story") written for young learners
  - Key discoveries ("What we learned")
  - Mechanical breakdown ("Hardware in simple words")
  - Monospace technical specifications table (mass, coordinates, distance, mission dates)
  - Direct links to official NASA mission archives

### 4. Planned vs. Reality: Engineering Endurance
- A dedicated comparative module analyzing spacecraft longevity against original engineering warranties:
  - **Ingenuity Mars Helicopter**: Designed for 5 technology demonstration flights; achieved 72 powered flights across nearly 3 years.
  - **Opportunity Rover (MER-B)**: Engineered for a 90-sol warranty; operated for 5,111 sols (nearly 15 Earth years), traversing a marathon distance of 45.16 km.
  - Additional benchmarks for *Curiosity*, *Voyager 1*, *Sojourner*, and the *Apollo 11 Laser Retroreflector*.

### 5. "Guess the Machine" Educational Challenge
- An interactive 5-question telemetry quiz evaluating mission knowledge through clues derived directly from the archival stories.
- Features immediate feedback, progress bars, final telemetry scoring, and an option to restart.

---

## NASA Data & Open Source Assets

This project utilizes public scientific data, landing coordinates, and mission timelines published by:
- **NASA Jet Propulsion Laboratory (JPL)**: Mission logs, telemetry records, and landing coordinates for Mars rovers (*Curiosity*, *Perseverance*, *Opportunity*, *Sojourner*), *Ingenuity*, *InSight*, *Voyager 1*, *Pioneer 10*, and *Cassini*.
- **NASA Science Mission Directorate**: Historical exploration archives and educational resources.
- **NASA Lunar Reconnaissance Orbiter (LRO)** & **Planetary Data System (PDS)**: Lunar landing site coordinates (*Apollo 11*, *Apollo 15*, *Surveyor 3*, *LADEE*) and geological feature locations.

---

## Technology Stack

- **Frontend Framework**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **3D Graphics & Spatial Visualization**: Three.js, `globe.gl` (pinned version via jsDelivr CDN)
- **Build Tool**: Vite
- **Icons**: Lucide React

---

## Local Setup & Deployment

### Prerequisites
- Node.js (version 18 or higher)
- npm or pnpm package manager

### Installation

```bash
# Clone repository
git clone https://github.com/<your-username>/Abandoned-but-Not-Forgotten.git
cd Abandoned-but-Not-Forgotten

# Install dependencies
npm install

# Run local development server
npm run dev
```

Open `http://localhost:3000` in your web browser.

### Production Build

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

---

## Concluding Inscription

*"These machines were left behind. We have not forgotten them."*
