import {
  StoryStage,
  TimelineMilestone,
  HardwareComponent,
  ScientificFinding,
  MissionEndRecord,
  EngineerScenario,
  EvolutionEra,
} from '../types';

/**
 * 10-Stage Story sequences for NASA machines.
 * Stages:
 * 1. EARTH
 * 2. LAUNCH
 * 3. JOURNEY
 * 4. LANDING / ARRIVAL
 * 5. FIRST SIGNAL
 * 6. MISSION
 * 7. DISCOVERY
 * 8. CHALLENGE
 * 9. LAST SIGNAL / MISSION END
 * 10. LEGACY
 */
export const STORY_STAGES_BY_EXHIBIT: Record<string, StoryStage[]> = {
  opportunity: [
    {
      stageNumber: 1,
      stageName: 'EARTH',
      title: 'Born in Pasadena',
      dateOrTime: 'Year 2000 · Jet Propulsion Laboratory',
      text: 'Engineers at NASA’s Jet Propulsion Laboratory set out to answer a question that had fascinated humanity for centuries: was Mars ever warm and wet enough to support life? They built two identical twin rovers—Spirit and Opportunity—each about the size of a golf cart.',
      highlight: 'Engineered for a strict warranty of only 90 Martian days (sols).',
      visualTag: 'Cleanroom Assembly',
    },
    {
      stageNumber: 2,
      stageName: 'LAUNCH',
      title: 'Thunder in the Florida Night',
      dateOrTime: 'July 7, 2003 · Cape Canaveral Air Force Station',
      text: 'Opportunity roared into the Florida night sky atop a Delta II Heavy rocket. Folded into an origami ball inside its protective atmospheric entry shell, the rover left Earth behind at more than 38,000 kilometers per hour.',
      highlight: 'Blasted off 27 days after its twin Spirit.',
      visualTag: 'Delta II Rocket Liftoff',
    },
    {
      stageNumber: 3,
      stageName: 'JOURNEY',
      title: 'Six Months Through the Void',
      dateOrTime: 'July 2003 – January 2004 · 456 Million Kilometers',
      text: 'For 203 days, Opportunity coasted through freezing space. Ground controllers periodically fired tiny thruster bursts to steer the capsule toward a pinpoint corridor on Mars, while the rover slept inside its insulated cocoon.',
      highlight: 'Navigated across 456 million km of interplanetary space.',
      visualTag: 'Interplanetary Cruise',
    },
    {
      stageNumber: 4,
      stageName: 'LANDING',
      title: 'Interplanetary Hole-in-One',
      dateOrTime: 'January 25, 2004 · Meridiani Planum, Mars',
      text: 'After blazing through the Martian atmosphere at 19,000 km/h, giant gasbags inflated around the lander. Opportunity bounced across the red plains like a massive beach ball 26 times before rolling right into the bowl of Eagle Crater. Scientists called it an interplanetary hole-in-one.',
      highlight: 'Bounced across Mars inside 24 pressurized airbags.',
      visualTag: 'Airbag Touchdown',
    },
    {
      stageNumber: 5,
      stageName: 'FIRST SIGNAL',
      title: 'A Rover Unfurls Its Wings',
      dateOrTime: 'Sol 1 · 05:05 UTC',
      text: 'Radio telescopes on Earth caught the faint microwave chime: Opportunity was alive. The lander’s petal ramps unfolded, solar wings caught the sunlight, and the panoramic cameras sent back the first crystal-clear images of dark, layered bedrock.',
      highlight: 'First images confirmed an ancient geological outcrop.',
      visualTag: 'Chassis Petals Open',
    },
    {
      stageNumber: 6,
      stageName: 'MISSION',
      title: 'Driving Beyond All Expectations',
      dateOrTime: '2004 – 2011 · Sol 90 to Sol 2,500',
      text: 'Sol 90 came and went. The rover kept rolling. Helpful Martian whirlwinds—called "dust devils"—repeatedly swept the dust clean from its solar panels. Opportunity climbed out of Eagle Crater, rolled across vast dune fields, and peered into massive craters like Endurance and Victoria.',
      highlight: 'Drove through treacherous sand dunes without ever giving up.',
      visualTag: 'Endurance Crater Trek',
    },
    {
      stageNumber: 7,
      stageName: 'DISCOVERY',
      title: 'Martian Blueberries & Ancient Water',
      dateOrTime: 'March 2004 · Eagle & Endeavour Craters',
      text: 'Using its microscopic imager and rock grinder, Opportunity found millions of tiny gray spheres nicknamed "blueberries." They were made of hematite—a mineral that forms only when liquid water soaks through rocks. For the first time, humanity had proof that liquid water once pooled on Mars.',
      highlight: 'Definitive chemical proof of ancient Martian surface water.',
      visualTag: 'Hematite Blueberries',
    },
    {
      stageNumber: 8,
      stageName: 'CHALLENGE',
      title: 'Trapped in Purgatory Dune',
      dateOrTime: 'April 2005 · Purgatory Ripple',
      text: 'Disaster struck on Sol 446 when all six wheels sank up to their axles in a soft, hidden sand ripple. For five nail-biting weeks, engineers at JPL tested wheel maneuvers in a replica sandbox on Earth before inching Opportunity backward to freedom.',
      highlight: 'Freed from wheel-deep quicksand through patient ground simulations.',
      visualTag: 'Sandbox Rescue',
    },
    {
      stageNumber: 9,
      stageName: 'LAST SIGNAL',
      title: 'The Darkness of Perseverance Valley',
      dateOrTime: 'June 10, 2018 · Sol 5,111',
      text: 'A planet-encircling dust storm blotted out the Martian sky, plunging Perseverance Valley into near-total darkness. With no sunlight to charge its batteries, Opportunity transmitted its final engineering reading. Its last message translated simply: the sky is dark and my power is low.',
      highlight: 'Survived 57 times longer than planned before falling silent.',
      visualTag: 'Global Dust Storm',
    },
    {
      stageNumber: 10,
      stageName: 'LEGACY',
      title: 'An Olympic Marathon on Another Planet',
      dateOrTime: '2019 – Present · Resting at Endeavour Crater',
      text: 'Opportunity drove 45.16 kilometers—more than an Olympic marathon on another planet. It proved that robotic explorers could be resilient pioneers. Today, Oppy rests peacefully in Perseverance Valley under the thin red sky, but its discoveries paved the road for human boots on Mars.',
      highlight: '45.16 km driven across 14.8 Earth years.',
      visualTag: 'Enduring Monument',
    },
  ],

  ingenuity: [
    {
      stageNumber: 1,
      stageName: 'EARTH',
      title: 'The Impossible Aerodynamic Dream',
      dateOrTime: '2014 – 2020 · NASA JPL',
      text: 'Most people thought flying on Mars was impossible. The air is so thin—less than 1% the density of Earth—that generating aerodynamic lift is like trying to fly at 100,000 feet on Earth. Engineers accepted the challenge and built a drone weighing only 1.8 kilograms.',
      highlight: 'Built to answer a single question: can humans fly an aircraft on Mars?',
      visualTag: 'JPL Space Simulator Chamber',
    },
    {
      stageNumber: 2,
      stageName: 'LAUNCH',
      title: 'Tucked Under the Belly of Perseverance',
      dateOrTime: 'July 30, 2020 · Cape Canaveral',
      text: 'Ingenuity was bolted underneath the chassis of the Perseverance rover behind a carbon-fiber debris shield. Together, they launched on an Atlas V rocket toward Jezero Crater.',
      highlight: 'Carried a tiny piece of wing fabric from the Wright Brothers’ 1903 Flyer.',
      visualTag: 'Atlas V Rocket Launch',
    },
    {
      stageNumber: 3,
      stageName: 'JOURNEY',
      title: 'Hitchhiking Across the Solar System',
      dateOrTime: 'August 2020 – February 2021',
      text: 'For seven months, the tiny helicopter drew trickle power from the rover’s nuclear generator to keep its electronics from freezing in deep space temperatures approaching -130°C.',
      highlight: 'Protected inside the belly of its robotic mother ship.',
      visualTag: 'Cruise Stage Bolted',
    },
    {
      stageNumber: 4,
      stageName: 'LANDING',
      title: 'Surviving the Seven Minutes of Terror',
      dateOrTime: 'February 18, 2021 · Jezero Crater',
      text: 'Perseverance executed its rocket-powered Sky Crane landing in Jezero Crater. Weeks later, the rover gently dropped Ingenuity onto the Martian ground, drove 5 meters away, and left the tiny helicopter to face the freezing Martian night alone on its own battery.',
      highlight: 'Survived its first freezing -90°C night alone on the surface.',
      visualTag: 'Deployment to Red Dirt',
    },
    {
      stageNumber: 5,
      stageName: 'FIRST SIGNAL',
      title: 'Wright Brothers Moment on Mars',
      dateOrTime: 'April 19, 2021 · Flight 1',
      text: 'At 07:34 UTC, Ingenuity spun its dual carbon-fiber blades to 2,400 RPM. It lifted straight up 3 meters, hovered steadily in the paper-thin Martian breeze, snapped a downward photo of its own shadow, and touched down smoothly.',
      highlight: 'The first powered, controlled flight by an aircraft on another world.',
      visualTag: 'First Aerial Martian Shadow',
    },
    {
      stageNumber: 6,
      stageName: 'MISSION',
      title: 'From Technology Demo to Aerial Scout',
      dateOrTime: '2021 – 2023 · Flights 6 to 60',
      text: 'NASA planned just 5 flights. Ingenuity flew 5, then 10, then 50. It became an essential partner to the rover, flying ahead to scout rocky fields, sand dunes, and ancient river delta cliffs that the rover could not see from the ground.',
      highlight: 'Transformed into an active scout saving the rover weeks of travel.',
      visualTag: 'Flying Over Jezero Delta',
    },
    {
      stageNumber: 7,
      stageName: 'DISCOVERY',
      title: 'A Bird’s-Eye View of Ancient Delta Channels',
      dateOrTime: '2022 – 2023 · Jezero River Delta',
      text: 'Ingenuity photographed the steep ridges and boulder mounds of the delta from 24 meters altitude. These aerial scans helped rover drivers avoid impassable wheel-trapping ripples and guided scientists directly to the most promising clay-rich lakebed sediments.',
      highlight: 'Discovered safe driving corridors through hazardous Martian terrain.',
      visualTag: 'High-Altitude Aerial Imagery',
    },
    {
      stageNumber: 8,
      stageName: 'CHALLENGE',
      title: 'Winter Survival & Sensor Dropouts',
      dateOrTime: 'Martian Winter 2022',
      text: 'As Martian winter arrived, dust storms dimmed the Sun and temperatures plummeted. Ingenuity’s batteries ran so low that its internal clock reset every night. Engineers had to guess when it would wake up each morning to re-establish communication.',
      highlight: 'Overcame cold-soak brownouts through ingenious timing software.',
      visualTag: 'Freezing Winter Twilight',
    },
    {
      stageNumber: 9,
      stageName: 'LAST SIGNAL',
      title: 'The Hard Landing at Valinor Hills',
      dateOrTime: 'January 18, 2024 · Flight 72',
      text: 'During Flight 72, featureless sandy ripples confused the helicopter’s downward navigation camera. Ingenuity touched down harder than planned, clipping the tip of one carbon-fiber rotor blade. On January 25, 2024, NASA announced that while it could no longer fly, all communications and avionics remained intact.',
      highlight: 'Completed 72 flights—14 times more than originally planned.',
      visualTag: 'Damaged Blade Shadow',
    },
    {
      stageNumber: 10,
      stageName: 'LEGACY',
      title: 'The Pioneer of Planetary Aviation',
      dateOrTime: '2024 – Present · Valinor Hills, Mars',
      text: 'Ingenuity stayed airborne for over 2 hours total, covering 17 kilometers. It proved beyond doubt that aviation works in alien atmospheres. Its blueprint is now the direct foundation for future Mars sample recovery helicopters and the Dragonfly mission to Saturn’s moon Titan.',
      highlight: 'Permanently changed how humanity will explore other worlds.',
      visualTag: 'Valinor Hills Sentinel',
    },
  ],

  'voyager-1': [
    {
      stageNumber: 1,
      stageName: 'EARTH',
      title: 'The Once-in-176-Year Alignment',
      dateOrTime: '1970s · Jet Propulsion Laboratory',
      text: 'Scientists realized that in the late 1970s, Jupiter, Saturn, Uranus, and Neptune would align in a rare orbital formation that happens only once every 176 years. A single spacecraft could use the gravity of one giant planet to slingshot to the next like a cosmic pinball.',
      highlight: 'Engineered for a primary 5-year mission to Jupiter and Saturn.',
      visualTag: 'Golden Record Inscription',
    },
    {
      stageNumber: 2,
      stageName: 'LAUNCH',
      title: 'Screaming Toward the Giants',
      dateOrTime: 'September 5, 1977 · Titan IIIE-Centaur',
      text: 'Voyager 1 blasted off from Cape Canaveral, carrying a 3.7-meter dish antenna and a gold-plated copper phonograph record encoded with sounds, music, and greetings in 55 Earth languages for any extraterrestrial civilization that might one day find it.',
      highlight: 'Carries greetings from planet Earth into eternity.',
      visualTag: 'Titan IIIE Rocket Ascent',
    },
    {
      stageNumber: 3,
      stageName: 'JOURNEY',
      title: 'Crossing the Asteroid Belt',
      dateOrTime: '1977 – 1979 · Toward Jupiter',
      text: 'Coasting at 60,000 km/h, Voyager 1 pierced the Asteroid Belt without a scratch, proving that the gap between Mars and Jupiter was mostly safe, open space.',
      highlight: 'Navigated the inner solar system with pinpoint orbital timing.',
      visualTag: 'Asteroid Belt Crossing',
    },
    {
      stageNumber: 4,
      stageName: 'LANDING',
      title: 'Close Encounters with Gas Giants',
      dateOrTime: 'March 1979 & November 1980',
      text: 'Voyager 1 never landed on solid ground; its destination was the swirling atmosphere of gas giants. It skimmed past Jupiter’s Great Red Spot and threaded the delicate ring system of Saturn, using Saturn’s massive gravity to bend its course upward out of the plane of the planets.',
      highlight: 'Gravity assist slingshot boosted speed to escape velocity.',
      visualTag: 'Saturn Ring Flyby',
    },
    {
      stageNumber: 5,
      stageName: 'FIRST SIGNAL',
      title: 'Active Volcanoes in the Deep Cold',
      dateOrTime: 'March 1979 · Jovian System',
      text: 'Cameras beamed back jaw-dropping images: sulfur volcanoes erupting on Jupiter’s moon Io—the first active extraterrestrial volcanoes ever witnessed—and a smooth, fractured ice shell over Europa hinting at a hidden ocean.',
      highlight: 'Overturned textbook theories about geological activity.',
      visualTag: 'Io Volcano Plume',
    },
    {
      stageNumber: 6,
      stageName: 'MISSION',
      title: 'The Pale Blue Dot',
      dateOrTime: 'February 14, 1990 · 6 Billion km Away',
      text: 'At the request of astronomer Carl Sagan, Voyager 1 turned its camera around one final time to take a family portrait of the solar system. Earth appeared as a single speck of blue dust suspended in a sunbeam—less than one pixel wide.',
      highlight: '“That’s here. That’s home. That’s us.”',
      visualTag: 'Pale Blue Dot Portrait',
    },
    {
      stageNumber: 7,
      stageName: 'DISCOVERY',
      title: 'Crossing the Heliopause into the Starlight',
      dateOrTime: 'August 25, 2012 · 121.6 AU',
      text: 'Voyager 1 detected a sudden drop in solar wind particles and a dramatic surge in galactic cosmic rays. It had crossed the heliopause—the magnetic bubble blown by our Sun. It became the very first human-made object to enter interstellar space.',
      highlight: 'The first terrestrial machine to bathe in the raw sea of the stars.',
      visualTag: 'Interstellar Boundary',
    },
    {
      stageNumber: 8,
      stageName: 'CHALLENGE',
      title: 'Rescuing Memory Across 24 Billion Kilometers',
      dateOrTime: 'November 2023 – April 2024',
      text: 'At a distance of 24 billion kilometers, a single memory chip in Voyager’s flight computer failed, causing it to beam back repeating gibberish. Radio signals took 22.5 hours to reach the probe and another 22.5 hours to return. JPL engineers successfully isolated the broken chip and reprogrammed the code across healthy memory sectors.',
      highlight: 'The longest-distance software patch in human history.',
      visualTag: 'FDS Binary Patch',
    },
    {
      stageNumber: 9,
      stageName: 'LAST SIGNAL',
      title: 'Whispering Through Nuclear Embers',
      dateOrTime: 'Present Day · Still Transmitting',
      text: 'Voyager 1 is powered by three decaying plutonium batteries (RTGs) that lose about 4 watts of power each year. Engineers gradually turn off scientific instruments to keep its central computer and radio alive as long as possible.',
      highlight: 'Still sending scientific readings back to Earth every day.',
      visualTag: 'DSN Antenna Lock',
    },
    {
      stageNumber: 10,
      stageName: 'LEGACY',
      title: 'Humanity’s Eternal Ambassador',
      dateOrTime: 'Millions of Years Ahead',
      text: 'Long after Earth’s cities have changed and the Sun grows old, Voyager 1 will coast silently around the heart of the Milky Way galaxy. The Golden Record bolted to its flank will preserve our music, languages, and heartbeat for billions of years.',
      highlight: 'Will outlive the civilization that created it.',
      visualTag: 'Milky Way Wanderer',
    },
  ],

  'apollo-11-eagle': [
    {
      stageNumber: 1,
      stageName: 'EARTH',
      title: 'A Decade to Reach the Moon',
      dateOrTime: '1961 – 1969 · Grumman Aerospace, New York',
      text: 'Engineers designed the Lunar Module Eagle with no aerodynamic curves, because it was built strictly to operate in the airless vacuum of space. Its aluminum walls were so paper-thin that in some spots they measured less than the thickness of two sheets of kitchen foil.',
      highlight: 'Designed solely for the vacuum of space with zero aerodynamics.',
      visualTag: 'Grumman Factory Cleanroom',
    },
    {
      stageNumber: 2,
      stageName: 'LAUNCH',
      title: 'The Thunder of the Saturn V',
      dateOrTime: 'July 16, 1969 · Launch Complex 39A',
      text: 'The 110-meter-tall Saturn V rocket ignited its five F-1 engines with 7.5 million pounds of thrust. Millions of spectators watched on Florida beaches as Apollo 11 shot into Earth orbit.',
      highlight: 'The most powerful machine successfully flown by humans.',
      visualTag: 'Saturn V Ignition',
    },
    {
      stageNumber: 3,
      stageName: 'JOURNEY',
      title: 'Translunar Coast & Transposition',
      dateOrTime: 'July 16 – 19, 1969 · 384,400 Kilometers',
      text: 'Command module Columbia turned around in space, docked nose-to-nose with Eagle, and extracted it from the third stage. For three quiet days, the spacecraft coasted toward lunar orbit.',
      highlight: 'Cruised through translunar space in barbecue roll mode.',
      visualTag: 'Command Module Docking',
    },
    {
      stageNumber: 4,
      stageName: 'LANDING',
      title: 'Less Than 30 Seconds of Fuel',
      dateOrTime: 'July 20, 1969 · Mare Tranquillitatis',
      text: 'As Eagle descended, program alarms flashed in the cockpit and the automated computer guided them toward a boulder-strewn crater. Neil Armstrong took manual control, flew past the boulder field, and settled the spider-like landing gear softly into the gray dust with seconds of fuel remaining.',
      highlight: '“Houston, Tranquility Base here. The Eagle has landed.”',
      visualTag: 'Lunar Touchdown Dust Plume',
    },
    {
      stageNumber: 5,
      stageName: 'FIRST SIGNAL',
      title: 'One Giant Leap',
      dateOrTime: 'July 21, 1969 · 02:56 UTC',
      text: 'A grainy black-and-white television signal beamed back to 650 million viewers on Earth. Armstrong climbed down Eagle’s ladder, stepped off the landing footpad, and pressed the first human bootprint into the lunar soil.',
      highlight: '“That’s one small step for man, one giant leap for mankind.”',
      visualTag: 'Footprint in Lunar Regolith',
    },
    {
      stageNumber: 6,
      stageName: 'MISSION',
      title: 'Two Hours on the Sea of Tranquility',
      dateOrTime: 'July 21, 1969 · 2 Hours 31 Minutes Walk',
      text: 'Armstrong and Aldrin set up scientific experiments, planted the U.S. flag with a telescoping rod, and collected 21.5 kilograms of lunar rocks and soil using special tongs and scoops.',
      highlight: 'Collected the very first geological samples from another celestial body.',
      visualTag: 'Deploying Experiments',
    },
    {
      stageNumber: 7,
      stageName: 'DISCOVERY',
      title: 'Basalts from 4.5 Billion Years Ago',
      dateOrTime: 'Laboratory Analysis on Earth',
      text: 'The dark rocks Eagle brought back were ancient volcanic basalts rich in titanium. They confirmed that the Moon had once been covered in a molten magma ocean, revealing that Earth and Moon formed in a shared cosmic collision.',
      highlight: 'Proved the Moon formed over 4.5 billion years ago.',
      visualTag: 'Titanium-Rich Lunar Basalt',
    },
    {
      stageNumber: 8,
      stageName: 'CHALLENGE',
      title: 'A Broken Circuit Breaker',
      dateOrTime: 'July 21, 1969 · Eagle Cabin',
      text: 'While moving in bulky spacesuits inside the cramped cabin, an astronaut’s backpack accidentally snapped off the plastic knob of the engine circuit breaker. Aldrin calmly solved the crisis by jamming a plastic felt-tip pen into the breaker slot to arm the ascent rocket.',
      highlight: 'Saved by a simple felt-tip pen.',
      visualTag: 'Felt-Tip Pen Breaker Fix',
    },
    {
      stageNumber: 9,
      stageName: 'LAST SIGNAL',
      title: 'Eagle Leaves Its Lower Half Behind',
      dateOrTime: 'July 21, 1969 · 17:54 UTC',
      text: 'The upper ascent stage fired its rocket engine, blasting off from the four-legged descent stage, which served as a launch pad. The golden base remained behind in the dust, its gold foil gleaming under the stark black sky.',
      highlight: 'The descent stage has stood undisturbed at Tranquility Base since 1969.',
      visualTag: 'Descent Stage Launch Pad',
    },
    {
      stageNumber: 10,
      stageName: 'LEGACY',
      title: 'Preserved in the Airless Silence',
      dateOrTime: '1969 – Eternity · Sea of Tranquility',
      text: 'Because the Moon has no atmosphere, no wind, and no rain, the gold-foiled base of Eagle, the American flag, the discarded equipment, and the astronauts’ crisp footprints remain preserved in the lunar dust exactly as they were left on July 20, 1969.',
      highlight: 'A permanent monument to human endeavor.',
      visualTag: 'Tranquility Base Monument',
    },
  ],
};

/**
 * Fallback generator for any exhibit that doesn't have an explicit custom 10-stage breakdown.
 */
export function getStoryStagesForExhibit(exhibitId: string, exhibitName: string, zone: string, story: string, learned: string, hardware: string, planned: string, actual: string): StoryStage[] {
  if (STORY_STAGES_BY_EXHIBIT[exhibitId]) {
    return STORY_STAGES_BY_EXHIBIT[exhibitId];
  }

  return [
    {
      stageNumber: 1,
      stageName: 'EARTH',
      title: `Conception of ${exhibitName}`,
      dateOrTime: 'Planning & Design',
      text: `Engineers designed ${exhibitName} to expand human knowledge of ${zone}. Every wire, sensor, and solar cell had to withstand the extreme temperatures and cosmic radiation of space.`,
      highlight: `Engineered for: ${planned}.`,
    },
    {
      stageNumber: 2,
      stageName: 'LAUNCH',
      title: 'Leaving Earth Behind',
      dateOrTime: 'Liftoff Phase',
      text: `${exhibitName} launched into the blackness atop a multi-stage rocket, escaping Earth's gravitational pull and embarking on its voyage across the solar system.`,
      highlight: 'Ascended from Earth into interplanetary space.',
    },
    {
      stageNumber: 3,
      stageName: 'JOURNEY',
      title: 'Navigating Through the Dark',
      dateOrTime: 'Cruise Phase',
      text: `Cruising through millions of kilometers of interplanetary space, ground teams monitored the machine’s systems, conducting calibration checks while it coasted silently toward ${zone}.`,
      highlight: 'Guided across interplanetary distances by radio commands.',
    },
    {
      stageNumber: 4,
      stageName: 'LANDING',
      title: `Arrival at ${zone}`,
      dateOrTime: 'Arrival / Descent Phase',
      text: `Reaching its destination, ${exhibitName} executed its arrival maneuvers with pinpoint precision, adjusting velocity and surviving the harsh mechanical forces of deceleration.`,
      highlight: 'Successfully reached its target operational corridor.',
    },
    {
      stageNumber: 5,
      stageName: 'FIRST SIGNAL',
      title: 'Hello from Across the Solar System',
      dateOrTime: 'First Downlink',
      text: `Radio dishes on Earth detected the carrier frequency tone. ${exhibitName} announced its safe arrival, deploying solar arrays or antennas to begin its mission.`,
      highlight: 'First telemetry confirmed operational health.',
    },
    {
      stageNumber: 6,
      stageName: 'MISSION',
      title: 'Exploring an Alien World',
      dateOrTime: 'Primary Science Phase',
      text: story.slice(0, 180) + '...',
      highlight: `Planned duration: ${planned}.`,
    },
    {
      stageNumber: 7,
      stageName: 'DISCOVERY',
      title: 'Transforming Textbooks',
      dateOrTime: 'Scientific Breakthrough',
      text: learned,
      highlight: 'Delivered fundamental scientific data to Earth.',
    },
    {
      stageNumber: 8,
      stageName: 'CHALLENGE',
      title: 'The Struggle Against Alien Elements',
      dateOrTime: 'Extended Operations',
      text: `Surviving in space requires overcoming extreme thermal swings, abrasive dust, and electronic wear. ${exhibitName} pushed far past its original warranty: ${actual}.`,
      highlight: `Actual endurance: ${actual}.`,
    },
    {
      stageNumber: 9,
      stageName: 'LAST SIGNAL',
      title: 'The Final Transmission',
      dateOrTime: 'Mission Conclusion',
      text: `Whether completing its mission as planned or gradually exhausting its power source, ${exhibitName} concluded its operational duties, resting in place as a scientific artifact.`,
      highlight: 'Completed its duty with honor.',
    },
    {
      stageNumber: 10,
      stageName: 'LEGACY',
      title: 'An Unbroken Chain of Knowledge',
      dateOrTime: 'Present Day & Future',
      text: `Hardware may grow cold, but the measurements, images, and questions ${exhibitName} sent home continue to educate and inspire future generations of robotic and human explorers.`,
      highlight: 'These machines were left behind. We have not forgotten them.',
    },
  ];
}

/**
 * Interactive Timeline Milestones for NASA Machines.
 */
export const TIMELINES_BY_EXHIBIT: Record<string, TimelineMilestone[]> = {
  opportunity: [
    {
      id: 'opp-t1',
      year: '2003',
      date: 'July 7, 2003',
      title: 'Launch from Cape Canaveral',
      summary: 'Opportunity lifts off aboard a Boeing Delta II rocket, beginning its 456-million-kilometer transit to Mars.',
      category: 'launch',
      impact: 'Initiated the second half of the Mars Exploration Rover mission.',
    },
    {
      id: 'opp-t2',
      year: '2004',
      date: 'January 25, 2004',
      title: 'Airbag Landing in Eagle Crater',
      summary: 'Bounces 26 times wrapped in giant airbags, coming to rest inside Eagle Crater in Meridiani Planum.',
      category: 'landing',
      impact: 'Directly positioned the rover next to exposed bedrock layers.',
    },
    {
      id: 'opp-t3',
      year: '2004',
      date: 'March 2, 2004',
      title: 'Discovery of Hematite "Blueberries"',
      summary: 'Microscopic cameras photograph mineral concretions formed in liquid water billions of years ago.',
      category: 'discovery',
      impact: 'Confirmed Mars had liquid water capable of sustaining life.',
    },
    {
      id: 'opp-t4',
      year: '2004',
      date: 'April 2004',
      title: '90-Sol Warranty Expired',
      summary: 'Opportunity completes its primary mission with all systems healthy. NASA grants its first mission extension.',
      category: 'extension',
      impact: 'Began 14 years of unprecedented bonus science.',
    },
    {
      id: 'opp-t5',
      year: '2005',
      date: 'April – June 2005',
      title: 'Freed from Purgatory Dune',
      summary: 'All six wheels sink into soft sand. JPL engineers patiently test escape maneuvers for five weeks and pull the rover free.',
      category: 'milestone',
      impact: 'Demonstrated teleoperated rescue procedures in alien soil.',
    },
    {
      id: 'opp-t6',
      year: '2015',
      date: 'March 24, 2015',
      title: 'First Off-World Marathon (42.195 km)',
      summary: 'Opportunity passes the 26.2-mile marathon mark at Marathon Valley on the rim of Endeavour Crater.',
      category: 'milestone',
      impact: 'First human-built wheeled machine to travel a marathon on another world.',
    },
    {
      id: 'opp-t7',
      year: '2018',
      date: 'June 10, 2018',
      title: 'Final Transmission in Perseverance Valley',
      summary: 'A catastrophic global dust storm blocks sunlight. Battery drops to non-operational levels, and Opportunity enters deep sleep.',
      category: 'conclusion',
      impact: 'Final telemetry received; mission officially declared complete in Feb 2019.',
    },
  ],

  ingenuity: [
    {
      id: 'ing-t1',
      year: '2020',
      date: 'July 30, 2020',
      title: 'Launch with Perseverance',
      summary: 'Bolted to the belly of the Mars 2020 Perseverance rover, Ingenuity launches aboard an Atlas V-541.',
      category: 'launch',
      impact: 'Carried the dream of planetary aviation into deep space.',
    },
    {
      id: 'ing-t2',
      year: '2021',
      date: 'February 18, 2021',
      title: 'Touchdown in Jezero Crater',
      summary: 'Perseverance lands via the Sky Crane system, keeping Ingenuity safe behind a protective carbon shield.',
      category: 'landing',
      impact: 'Placed the aircraft in its testing ground.',
    },
    {
      id: 'ing-t3',
      year: '2021',
      date: 'April 19, 2021',
      title: 'Historic Flight 1 (Wright Brothers Moment)',
      summary: 'Spins counter-rotating rotors to 2,400 RPM, lifts 3 meters, hovers for 39 seconds, and touches down.',
      category: 'discovery',
      impact: 'First powered, controlled flight on another planet in human history.',
    },
    {
      id: 'ing-t4',
      year: '2021',
      date: 'May 7, 2021',
      title: 'Transition to Operational Scout',
      summary: 'After completing 5 demo flights, NASA extends the mission indefinitely to scout driving paths for the rover.',
      category: 'extension',
      impact: 'Transformed planetary robotics into a multi-domain aerial-ground team.',
    },
    {
      id: 'ing-t5',
      year: '2023',
      date: 'September 2023',
      title: 'Altitude Record of 24 Meters',
      summary: 'Reaches a record altitude of 24 meters above the Martian floor and speeds up to 36 km/h.',
      category: 'milestone',
      impact: 'Pushed the aerodynamic flight envelope far past design specs.',
    },
    {
      id: 'ing-t6',
      year: '2024',
      date: 'January 18, 2024',
      title: 'Flight 72 & Mission Conclusion',
      summary: 'During a landing in featureless ripples, rotor blades clip the surface. The aircraft remains upright and communicative.',
      category: 'conclusion',
      impact: 'Completed 72 flights and proved alien aviation for all future exploration.',
    },
  ],

  'voyager-1': [
    {
      id: 'voy-t1',
      year: '1977',
      date: 'September 5, 1977',
      title: 'Liftoff on Titan IIIE-Centaur',
      summary: 'Voyager 1 launches from Florida on a faster trajectory to overtake Voyager 2 on its way to Jupiter.',
      category: 'launch',
      impact: 'Embarked on humanity’s Grand Tour of the outer planets.',
    },
    {
      id: 'voy-t2',
      year: '1979',
      date: 'March 5, 1979',
      title: 'Jupiter Closest Approach',
      summary: 'Passes within 280,000 km of Jupiter, discovering volcanic plumes on Io and ring structures.',
      category: 'discovery',
      impact: 'Revealed that geological activity is not limited to rocky terrestrial planets.',
    },
    {
      id: 'voy-t3',
      year: '1980',
      date: 'November 12, 1980',
      title: 'Saturn & Titan Flyby',
      summary: 'Discovers ringlets, shepherd moons, and a dense nitrogen atmosphere blanketing Titan.',
      category: 'discovery',
      impact: 'Saturn gravity assist propelled Voyager 1 northward out of the ecliptic plane.',
    },
    {
      id: 'voy-t4',
      year: '1990',
      date: 'February 14, 1990',
      title: 'The "Pale Blue Dot" Photograph',
      summary: 'Turns cameras toward Earth from 6 billion km away, capturing our home as a single blue pixel in a sunbeam.',
      category: 'milestone',
      impact: 'Created one of the most profound philosophical images in human history.',
    },
    {
      id: 'voy-t5',
      year: '2012',
      date: 'August 25, 2012',
      title: 'Crossing the Heliopause into Interstellar Space',
      summary: 'Solar wind particles drop to zero as cosmic ray density spikes. Voyager 1 enters interstellar space at 121.6 AU.',
      category: 'milestone',
      impact: 'First human-made object to leave the gravitational and magnetic domain of the Sun.',
    },
    {
      id: 'voy-t6',
      year: '2024',
      date: 'April 2024',
      title: 'Interstellar Software Rescue',
      summary: 'JPL engineers send commands across 24 billion km to isolate a damaged chip, successfully restoring science telemetry.',
      category: 'milestone',
      impact: '47+ years of continuous operation, still whispering from the stars today.',
    },
  ],

  'apollo-11-eagle': [
    {
      id: 'apl-t1',
      year: '1969',
      date: 'July 16, 1969',
      title: 'Saturn V Liftoff from LC-39A',
      summary: 'Apollo 11 launches from Kennedy Space Center powered by 7.5 million pounds of thrust.',
      category: 'launch',
      impact: 'Began the voyage to place the first humans on the Moon.',
    },
    {
      id: 'apl-t2',
      year: '1969',
      date: 'July 20, 1969',
      title: 'Touchdown at Tranquility Base',
      summary: 'Neil Armstrong pilots Eagle past a rocky crater, touching down with under 30 seconds of fuel.',
      category: 'landing',
      impact: 'First human touchdown on another celestial world.',
    },
    {
      id: 'apl-t3',
      year: '1969',
      date: 'July 21, 1969',
      title: 'The First Steps & Science Deployment',
      summary: 'Armstrong and Aldrin spend 2h 31m on the surface, deploying seismometer and laser retroreflector.',
      category: 'discovery',
      impact: 'Returned 21.5 kg of lunar samples and began lunar laser ranging.',
    },
    {
      id: 'apl-t4',
      year: '1969',
      date: 'July 21, 1969',
      title: 'Ascent Stage Liftoff',
      summary: 'Ascent stage rocket ignites, using the gold-foiled descent stage as its launch pad to rejoin Columbia.',
      category: 'conclusion',
      impact: 'Descent stage remains undisturbed on the lunar surface as a permanent historic site.',
    },
  ],
};

/**
 * Helper to get or generate timeline milestones for any exhibit.
 */
export function getTimelineForExhibit(exhibit: {
  id: string;
  name: string;
  years: string;
  status: string;
  story: string;
  learned: string;
  zone: string;
}): TimelineMilestone[] {
  if (TIMELINES_BY_EXHIBIT[exhibit.id]) {
    return TIMELINES_BY_EXHIBIT[exhibit.id];
  }

  const yearParts = exhibit.years.split('–');
  const startYear = yearParts[0].trim().replace(/[^0-9]/g, '') || '1970';
  const endYear = (yearParts[1] || yearParts[0]).trim().replace(/[^0-9]/g, '') || startYear;

  return [
    {
      id: `${exhibit.id}-t1`,
      year: startYear,
      title: 'Mission Launch & Deployment',
      summary: `${exhibit.name} commenced its flight into ${exhibit.zone}, navigating toward its exploration target.`,
      category: 'launch',
      impact: 'Initial trajectory established and systems initialized.',
    },
    {
      id: `${exhibit.id}-t2`,
      year: startYear,
      title: `Arrival & Arrival Verification at ${exhibit.zone}`,
      summary: `Successful arrival and telemetry acquisition confirmed the integrity of instruments and systems.`,
      category: 'landing',
      impact: 'Surface or orbital contact established.',
    },
    {
      id: `${exhibit.id}-t3`,
      year: String(Math.min(Number(startYear) + 1, Number(endYear))),
      title: 'Primary Scientific Discoveries',
      summary: exhibit.learned.slice(0, 160) + '...',
      category: 'discovery',
      impact: 'Fundamentally expanded scientific understanding.',
    },
    {
      id: `${exhibit.id}-t4`,
      year: endYear,
      title: exhibit.status === 'STILL WORKING' || exhibit.status === 'STILL ACTIVE' ? 'Active Operations' : 'Mission Conclusion',
      summary: exhibit.story.slice(0, 160) + '...',
      category: exhibit.status === 'STILL WORKING' || exhibit.status === 'STILL ACTIVE' ? 'milestone' : 'conclusion',
      impact: `Status: ${exhibit.status}. Preserved as an enduring educational artifact.`,
    },
  ];
}

/**
 * Interactive Hardware Anatomy ("INSIDE THE MACHINE").
 */
export const HARDWARE_COMPONENTS_BY_EXHIBIT: Record<string, HardwareComponent[]> = {
  opportunity: [
    {
      id: 'opp-hw-eyes',
      name: 'Pancam & Navcam Stereoscopic Mast',
      role: 'Eyes & Optics',
      analogy: 'Think of this camera mast as human eyes standing 1.5 meters tall.',
      simpleExplanation: 'Two color cameras spaced like human eyes provided 3D stereoscopic vision, allowing ground drivers to see boulders, sand ripples, and rock layers in full perspective.',
      whyItMatters: 'Allowed the rover to build 3D terrain maps and avoid hazards before driving forward.',
      specSnippet: '1024x1024 CCD sensor · 8-position filter wheel for multi-spectral geology.',
    },
    {
      id: 'opp-hw-wheels',
      name: 'Rocker-Bogie 6-Wheel Suspension',
      role: 'Mobility & Legs',
      analogy: 'Like a mechanical spider that never lifts more than half its legs at a time.',
      simpleExplanation: 'Six aluminum wheels with independent electric motors mounted to rocking titanium legs. When one side climbs over a boulder, the other side rocks down to keep all six wheels touching the ground.',
      whyItMatters: 'Prevented the rover from tipping over on rocky slopes up to 30 degrees.',
      specSnippet: 'Cleats machined into aluminum rims · Max speed 5 cm/sec (0.18 km/h).',
    },
    {
      id: 'opp-hw-power',
      name: 'Triple-Junction Solar Array Wings',
      role: 'Power & Heart',
      analogy: 'Like mechanical leaves drinking in the dim Martian sunlight.',
      simpleExplanation: 'A 1.3-square-meter blanket of gallium arsenide solar cells that converted sunlight into roughly 140 watts of electricity—about enough to power a single bright lightbulb.',
      whyItMatters: 'Stored energy in two rechargeable lithium-ion batteries to survive the -90°C nights.',
      specSnippet: 'Produced ~900 watt-hours/sol initially; cleaned by Martian dust devils.',
    },
    {
      id: 'opp-hw-arm',
      name: 'Instrument Deployment Robotic Arm (IDD)',
      role: 'Hands & Instruments',
      analogy: 'A geologist’s rock hammer and magnifying glass on a folding arm.',
      simpleExplanation: 'A 5-jointed mechanical arm carrying a diamond-tipped grinding wheel (RAT), a microscope, and two chemical spectrometers to analyze the mineral composition of rocks.',
      whyItMatters: 'Scraped away billions of years of surface dust to read the fresh rock beneath.',
      specSnippet: 'Rock Abrasion Tool (RAT) ground 5 mm deep into volcanic basalts.',
    },
    {
      id: 'opp-hw-antenna',
      name: 'High-Gain Steerable Dish Antenna',
      role: 'Voice to Earth',
      analogy: 'A megaphone pointing directly across hundreds of millions of kilometers.',
      simpleExplanation: 'A steerable microwave dish that tracked Earth across the Martian sky, beaming science photos and telemetry directly to NASA’s Deep Space Network dishes on Earth.',
      whyItMatters: 'Radio signals took between 4 and 24 minutes to travel one way to Earth.',
      specSnippet: 'X-band transceiver beaming at up to 28.8 kilobits per second.',
    },
  ],

  ingenuity: [
    {
      id: 'ing-hw-rotors',
      name: 'Dual Counter-Rotating Carbon Blades',
      role: 'Mobility & Legs',
      analogy: 'Two giant ceiling fans spinning in opposite directions at blinding speed.',
      simpleExplanation: 'Two 1.2-meter rotors spun in opposite directions at 2,400 RPM—roughly five times faster than a helicopter on Earth. Because they spin opposite each other, they cancel out rotational torque without needing a heavy tail rotor.',
      whyItMatters: 'Provided enough lift to fly in air thinner than at the top of Mount Everest.',
      specSnippet: 'Carbon-fiber composite blades with foam core · 1.2 meters rotor span.',
    },
    {
      id: 'ing-hw-brain',
      name: 'Smartphone-Grade Autonomy Processor',
      role: 'Brain & Memory',
      analogy: 'A smartphone processor flying an alien aircraft with zero human help.',
      simpleExplanation: 'Radio signals take too long for a human on Earth to hold a joystick. Ingenuity had to fly itself. A Qualcomm Snapdragon processor analyzed 30 downward camera frames per second to track features on the ground and balance in the air.',
      whyItMatters: 'Calculated complex flight stability equations 500 times every second.',
      specSnippet: 'Snapdragon 801 CPU running Linux OS · Laser rangefinder altimeter.',
    },
    {
      id: 'ing-hw-solar',
      name: 'Crown Solar Panel & Lithium Batteries',
      role: 'Power & Heart',
      analogy: 'A tiny solar hat that gathers enough juice for 90-second bursts of flight.',
      simpleExplanation: 'A small solar panel perched above the rotor hub charged six Sony lithium-ion batteries. Most of the energy wasn’t used for flying—it was used by internal survival heaters to keep the electronics from freezing overnight.',
      whyItMatters: 'Recharged in roughly one Martian sol for a 2-to-3 minute flight.',
      specSnippet: 'Six standard lithium-ion cells delivering 350 watts peak flight power.',
    },
    {
      id: 'ing-hw-eyes',
      name: 'Color Terrain & Grayscale Navcam',
      role: 'Eyes & Optics',
      analogy: 'A downward-facing high-speed eye watching the ground rush past.',
      simpleExplanation: 'A high-speed black-and-white camera tracked sand ripples and rocks on the ground to calculate velocity, while a high-resolution 13-megapixel color camera took scenic aerial photos.',
      whyItMatters: 'Provided the first high-resolution aerial scouting photos of Mars.',
      specSnippet: '13 MP Sony color sensor + 0.3 MP Omnivision navigation sensor.',
    },
    {
      id: 'ing-hw-legs',
      name: 'Carbon-Fiber Landing Legs',
      role: 'Mobility & Legs',
      analogy: 'Four flexible grasshopper legs that soak up landing shocks.',
      simpleExplanation: 'Four featherweight legs made of carbon-fiber composite tubes angled outward to prevent tipping on rocky slopes. They flexed slightly on impact to absorb the shock of touchdown.',
      whyItMatters: 'Kept the rotating blades safe from touching rocks on landing.',
      specSnippet: 'Weighed less than 50 grams each · Supported 1.8 kg chassis.',
    },
  ],

  'voyager-1': [
    {
      id: 'voy-hw-antenna',
      name: '3.7-Meter High-Gain Dish Antenna',
      role: 'Voice to Earth',
      analogy: 'A giant satellite umbrella whispering across the solar system.',
      simpleExplanation: 'The dominant feature of Voyager is a parabolic white dish antenna spanning 3.7 meters. It must point continuously at Earth to send its 22-watt radio signal across billions of kilometers.',
      whyItMatters: 'Without this precise aim, Voyager’s signal would be lost forever in space.',
      specSnippet: 'Transmits on S-band and X-band frequencies at ~160 bits per second.',
    },
    {
      id: 'voy-hw-power',
      name: 'Plutonium Radioisotope Thermoelectric Generators (RTG)',
      role: 'Power & Heart',
      analogy: 'A nuclear furnace that converts warm decaying metal into electricity.',
      simpleExplanation: 'Far beyond Jupiter, sunlight is too weak for solar panels. Three canisters filled with pellets of Plutonium-238 generate heat as the atoms decay. Thermocouples convert that heat directly into continuous electricity.',
      whyItMatters: 'Has supplied uninterrupted electrical power for over 47 years.',
      specSnippet: 'Generates ~225 watts today (down from 470 watts at launch).',
    },
    {
      id: 'voy-hw-brain',
      name: 'Triple-Redundant 69-Kilobyte Computers',
      role: 'Brain & Memory',
      analogy: 'A computer with less memory than a single digital watch photo.',
      simpleExplanation: 'Three dual-redundant computer systems (Computer Command, Flight Data, and Attitude Control) with a total of about 69 kilobytes of memory. They run on magnetic tape and magnetic core memory that cannot be erased by radiation.',
      whyItMatters: 'So reliable that engineers could patch software in 2024 across 24 billion km.',
      specSnippet: 'Magnetic core memory · 8-track digital tape recorder.',
    },
    {
      id: 'voy-hw-record',
      name: 'The Golden Record Phonograph',
      role: 'Hands & Instruments',
      analogy: 'A cosmic message in a bottle for the year 1,000,000,000.',
      simpleExplanation: 'A 12-inch gold-plated copper phonograph record protected by an aluminum case. Encoded with grooves containing 115 photographs of Earth, natural sounds (wind, thunder, bird songs), music from Bach to Chuck Berry, and spoken greetings in 55 languages.',
      whyItMatters: 'Carries humanity’s cultural memory long after Earth is gone.',
      specSnippet: 'Includes ultra-pure Uranium-238 electroplated on cover to act as a cosmic clock.',
    },
  ],

  'apollo-11-eagle': [
    {
      id: 'apl-hw-legs',
      name: 'Spider Landing Gear & Crushable Honeycomb Cartridges',
      role: 'Mobility & Legs',
      analogy: 'Shock absorbers on a lunar buggy that crush safely so the cabin stays level.',
      simpleExplanation: 'Four cantilevered landing legs built from lightweight aluminum tubing. Inside each primary strut was a cylinder of aluminum honeycomb that crushed on impact to absorb the shock of touchdown.',
      whyItMatters: 'Prevented the lander from bouncing or tipping over on uneven lunar rocks.',
      specSnippet: 'Diameter footprint 9.4 meters · 1.5-meter surface sensing probes.',
    },
    {
      id: 'apl-hw-engine',
      name: 'Throttleable Descent Rocket Engine (DPS)',
      role: 'Power & Heart',
      analogy: 'The gas pedal of a rocket ship that can gently slow down from 6,000 km/h to zero.',
      simpleExplanation: 'A revolutionary rocket engine that could vary its thrust smoothly between 10% and 60% and at 100%. Powered by hypergolic propellants that ignited spontaneously on contact without needing spark plugs.',
      whyItMatters: 'Allowed Neil Armstrong to hover and maneuver sideways to avoid boulder fields.',
      specSnippet: 'Maximum 43.9 kN thrust · Aerozine 50 and nitrogen tetroxide.',
    },
    {
      id: 'apl-hw-foil',
      name: 'Kapton & Mylar Thermal Radiation Blankets',
      role: 'Eyes & Optics',
      analogy: 'A shiny gold emergency space blanket protecting against 260-degree temperature swings.',
      simpleExplanation: 'Layers of aluminized Mylar and golden Kapton film wrapped around the descent stage. With no air on the Moon to circulate heat, the sunny side reaches +120°C while the shadow plunges to -130°C.',
      whyItMatters: 'Kept fuel tanks and computer compartments from overheating or freezing solid.',
      specSnippet: '25 micro-thin layers of polyimide and aluminized plastic film.',
    },
    {
      id: 'apl-hw-antenna',
      name: 'S-Band Steerable High-Gain Dish Antenna',
      role: 'Voice to Earth',
      analogy: 'A direct telephone line connecting astronauts on the Moon to Houston, Texas.',
      simpleExplanation: 'A 66-centimeter parabolic dish antenna mounted on the upper stage that tracked Earth across the black sky, beaming live black-and-white television pictures and astronaut heart rates.',
      whyItMatters: 'Carried Neil Armstrong’s famous words to 650 million listeners on Earth.',
      specSnippet: 'Transmitted voice, telemetry, and slow-scan television at 2.2 GHz.',
    },
  ],
};

/**
 * Helper to get or generate hardware component breakdown for any exhibit.
 */
export function getHardwareForExhibit(exhibit: {
  id: string;
  name: string;
  hardware: string;
  zone: string;
}): HardwareComponent[] {
  if (HARDWARE_COMPONENTS_BY_EXHIBIT[exhibit.id]) {
    return HARDWARE_COMPONENTS_BY_EXHIBIT[exhibit.id];
  }

  return [
    {
      id: `${exhibit.id}-hw-heart`,
      name: 'Power & Thermal Heart',
      role: 'Power & Heart',
      analogy: 'The beating heart pumping electrical life and warmth through the machine.',
      simpleExplanation: `Provides continuous electrical energy through solar arrays or radioisotope generators, sustaining internal heaters against the extreme vacuum cold of ${exhibit.zone}.`,
      whyItMatters: 'Without steady power and warmth, internal electronic semiconductors freeze and fail permanently.',
      specSnippet: 'Engineered for extreme thermal gradients and deep space radiation.',
    },
    {
      id: `${exhibit.id}-hw-voice`,
      name: 'Deep Space Telecommunications Array',
      role: 'Voice to Earth',
      analogy: 'The machine’s voice and ears whispering across millions of kilometers.',
      simpleExplanation: 'High-gain and omnidirectional antennas communicating on S-band and X-band frequencies directly with NASA’s Deep Space Network dishes on Earth.',
      whyItMatters: 'Transmits every scientific discovery, telemetry packet, and receives all ground flight commands.',
      specSnippet: 'Direct-to-Earth microwave radio link.',
    },
    {
      id: `${exhibit.id}-hw-mobility`,
      name: 'Structural Chassis & Mobility/Landing System',
      role: 'Mobility & Legs',
      analogy: 'The skeleton and feet that stand firm or journey across alien ground.',
      simpleExplanation: exhibit.hardware.slice(0, 180) + '...',
      whyItMatters: 'Absorbs landing kinetic energy and withstands the mechanical vibration of launch and touchdown.',
      specSnippet: 'Constructed from aerospace aluminum alloys and titanium joints.',
    },
    {
      id: `${exhibit.id}-hw-payload`,
      name: 'Primary Scientific Instrument Suite',
      role: 'Hands & Instruments',
      analogy: 'The scientist’s eyes, magnifying glass, and laboratory bench.',
      simpleExplanation: 'Specialized sensors, spectrometers, or cameras designed specifically to measure the environment of space and alien surfaces.',
      whyItMatters: 'Directly fulfilled the primary scientific objectives set by NASA and international researchers.',
      specSnippet: 'Calibrated payload for in-situ extraterrestrial investigation.',
    },
  ];
}

/**
 * Key Scientific Discoveries ("WHAT DID WE LEARN?").
 */
export const SCIENTIFIC_FINDINGS_BY_EXHIBIT: Record<string, ScientificFinding[]> = {
  opportunity: [
    {
      id: 'opp-sci-water',
      title: 'Persistent Liquid Surface Water',
      whatWeFound: 'Found layered sedimentary sandstones and sulfate minerals with ripple marks formed in ancient shallow, salty lakes.',
      whyItMatters: 'Proved Mars was not always a frozen, bone-dry desert; billions of years ago, liquid water stood on the surface long enough for life to have potentially begun.',
      scientificTermExplained: 'Sedimentary Rock: Layers of minerals and sand deposited by water over thousands of years and hardened over time.',
    },
    {
      id: 'opp-sci-blueberries',
      title: 'Hematite Concretion Spheres',
      whatWeFound: 'Discovered millions of BB-sized spheres made of iron oxide (hematite) weathering out of rock layers.',
      whyItMatters: 'On Earth, these spherical concretions only grow when groundwater slowly dissolves and redeposits iron minerals inside porous rocks.',
      scientificTermExplained: 'Concretion: A hard compact mass of mineral matter formed by the precipitation of mineral cement in the spaces between particles.',
    },
    {
      id: 'opp-sci-gypsum',
      title: 'Pure Veins of Gypsum at Endeavour Crater',
      whatWeFound: 'Found bright white veins of calcium sulfate (gypsum) filling cracks in rocks near the rim of Endeavour Crater.',
      whyItMatters: 'Indicates neutral, non-acidic water flowed through the rock fractures—water that would have been gentle enough to drink and friendly to microbial life.',
      scientificTermExplained: 'Gypsum Vein: A mineral deposit left behind when water carrying dissolved calcium evaporated through underground cracks.',
    },
  ],

  ingenuity: [
    {
      id: 'ing-sci-aero',
      title: 'Aerodynamic Feasibility in Ultra-Thin Air',
      whatWeFound: 'Proved that controlled aerodynamic flight is possible in atmospheric densities less than 1% of Earth’s sea-level pressure.',
      whyItMatters: 'Opened the entire atmospheric dimension of other planets. Future planetary missions will routinely include aerial scouts and heavy cargo drones.',
      scientificTermExplained: 'Aerodynamic Lift: The upward mechanical force generated by wings or rotor blades moving through air.',
    },
    {
      id: 'ing-sci-mapping',
      title: 'Aerial Reconnaissance of River Delta Channels',
      whatWeFound: 'Mapped 3D topographic relief of sedimentary river channels and boulder mounds that were invisible from ground level.',
      whyItMatters: 'Prevented the Perseverance rover from driving into impassable sand ripple traps and identified high-priority core sampling targets.',
      scientificTermExplained: 'Delta: A landform created by deposition of sediment that is carried by a river as the water enters a lake or ocean.',
    },
    {
      id: 'ing-sci-dust',
      title: 'Dust Transport Dynamics on Mars',
      whatWeFound: 'High-speed downward cameras recorded how rotor blade downdrafts pick up and disperse fine Martian sand particles.',
      whyItMatters: 'Provides real-world empirical data on how wind moves dust grains across Martian sand dunes and impact crater rims.',
      scientificTermExplained: 'Particle Saltation: The specific movement of sand grains hopping or bouncing across a surface propelled by wind.',
    },
  ],

  'voyager-1': [
    {
      id: 'voy-sci-interstellar',
      title: 'Direct Measurement of the Interstellar Medium',
      whatWeFound: 'Detected a 40-fold increase in the density of ambient plasma outside the heliopause.',
      whyItMatters: 'Gave humanity our very first direct sample of the matter that exists between the stars, outside the influence of our Sun’s solar wind.',
      scientificTermExplained: 'Interstellar Medium: The matter and radiation that exists in the space between the star systems in a galaxy.',
    },
    {
      id: 'voy-sci-io',
      title: 'Active Extraterrestrial Volcanism on Io',
      whatWeFound: 'Captured towering 300-kilometer plumes of sulfur and gas shooting from the surface of Jupiter’s moon Io.',
      whyItMatters: 'Proved for the first time that moons can have active volcanoes powered by gravitational tidal heating from nearby giant planets.',
      scientificTermExplained: 'Tidal Heating: Friction generated inside a celestial body when it is stretched and squeezed by the gravity of an orbiting planet.',
    },
    {
      id: 'voy-sci-rings',
      title: 'Complex Resonances in Saturn’s Rings',
      whatWeFound: 'Revealed that Saturn’s rings are not smooth sheets, but thousands of delicate ringlets sculpted by tiny shepherd moons.',
      whyItMatters: 'Transformed planetary physics, explaining how gravitational resonances keep cosmic debris organized into ring systems.',
      scientificTermExplained: 'Shepherd Moon: A small moon orbiting near the edges of a planetary ring whose gravity shapes the ring’s boundaries.',
    },
  ],

  'apollo-11-eagle': [
    {
      id: 'apl-sci-age',
      title: 'Origin and Age of the Moon',
      whatWeFound: 'Returned 21.5 kg of titanium-rich basalt and breccia dated to over 4.5 billion years old.',
      whyItMatters: 'Provided the empirical foundation proving the Moon formed in a giant collision between ancient proto-Earth and a Mars-sized body named Theia.',
      scientificTermExplained: 'Basalt: A dark, fine-grained volcanic rock formed by the rapid cooling of lava rich in magnesium and iron.',
    },
    {
      id: 'apl-sci-retro',
      title: 'Laser Ranging of Lunar Recession Rate',
      whatWeFound: 'Corner-cube prism retroreflector left in the soil reflects lasers fired from Earth with millimeter precision.',
      whyItMatters: 'Proved the Moon is steadily spiraling away from Earth at 3.8 centimeters per year and confirmed that the Moon possesses a partially fluid core.',
      scientificTermExplained: 'Lunar Laser Ranging: Timing how long light takes to bounce off a mirror on the Moon to measure distance down to millimeters.',
    },
  ],
};

/**
 * Helper to get or generate scientific findings for any exhibit.
 */
export function getScientificFindingsForExhibit(exhibit: {
  id: string;
  name: string;
  learned: string;
  story: string;
}): ScientificFinding[] {
  if (SCIENTIFIC_FINDINGS_BY_EXHIBIT[exhibit.id]) {
    return SCIENTIFIC_FINDINGS_BY_EXHIBIT[exhibit.id];
  }

  return [
    {
      id: `${exhibit.id}-sci-1`,
      title: 'Primary Scientific Measurement',
      whatWeFound: exhibit.learned,
      whyItMatters: 'Directly validated theoretical models and rewritten planetary science textbooks on Earth.',
      scientificTermExplained: 'In-situ Science: Measurements collected directly inside the target environment rather than through a remote telescope.',
    },
    {
      id: `${exhibit.id}-sci-2`,
      title: 'Environmental & Geological Baseline',
      whatWeFound: `Recorded long-term radiation levels, surface geology, and ambient atmospheric or vacuum conditions at the exploration site.`,
      whyItMatters: 'Established crucial safety and environmental baselines needed for future robotic and human spaceflight missions.',
      scientificTermExplained: 'Telemetry: The automated recording and electrical transmission of data from remote sources to receiving stations.',
    },
  ];
}

/**
 * Detailed Mission Conclusion Records ("THE END OF THE MISSION").
 */
export const MISSION_END_RECORDS_BY_EXHIBIT: Record<string, MissionEndRecord> = {
  opportunity: {
    endDate: 'February 13, 2019 (Last Contact: June 10, 2018)',
    statusLabel: 'SILENT IN PERSEVERANCE VALLEY',
    whyItEnded: 'A planet-encircling dust storm blotted out the Sun over Meridiani Planum, reducing atmospheric opacity (tau) above 10.8.',
    whatHappened: 'Solar panels could no longer generate power. The rover automatically shut down non-essential systems and entered a low-power fault mode. As the storm persisted for months, nighttime temperatures dropped below the survival limits of the unpowered internal electronics.',
    wasPlanned: false,
    currentState: 'Resting completely intact and preserved in the dry, rust-colored sands of Perseverance Valley on the rim of Endeavour Crater.',
    finalMessageOrTelemetry: 'Last telemetry frame received June 10, 2018 (Sol 5,111): battery voltage dropped below 22V, atmospheric opacity tau > 10.8.',
  },

  ingenuity: {
    endDate: 'January 25, 2024 (Last Flight: January 18, 2024)',
    statusLabel: 'MISSION COMPLETE / RETIRED SENTINEL',
    whyItEnded: 'Loss of visual navigation cues over featureless sand ripples during Flight 72 led to an emergency descent that clipped the tips of its carbon-fiber rotor blades.',
    whatHappened: 'While the aircraft landed upright and retained full electrical and radio communication capabilities with the rover, the aerodynamic imbalance from the chipped rotor tips prevented any further controlled flights.',
    wasPlanned: false,
    currentState: 'Standing upright in Valinor Hills on its four carbon legs. Continues to log daily weather, temperature, and avionics sensor readings into its onboard memory.',
    finalMessageOrTelemetry: 'Flight 72 data log: 72 flights completed, 128.8 minutes cumulative air time, 17.0 km distance covered.',
  },

  'voyager-1': {
    endDate: 'Still Operational (Expected RTG depletion ~2025–2030)',
    statusLabel: 'STILL ACTIVE IN INTERSTELLAR SPACE',
    whyItEnded: 'Mission is still actively operating 47+ years after its 1977 launch.',
    whatHappened: 'Engineers systematically turn off individual heater circuits and scientific instruments to stretch the remaining 225 watts of electrical output from its plutonium RTGs.',
    wasPlanned: true,
    currentState: 'Coasting at 61,000 km/h toward the constellation Ophiuchus in interstellar space, 24.6 billion km (164.5 AU) from Earth.',
    finalMessageOrTelemetry: 'Continuous Deep Space Network telemetry downlink at 160 bits/sec across 22.5 light-hours of emptiness.',
  },

  'apollo-11-eagle': {
    endDate: 'July 21, 1969 (Ascent Stage Departure)',
    statusLabel: 'HISTORIC LUNAR MONUMENT',
    whyItEnded: 'Planned mission architecture: the descent stage was engineered specifically as an expendable launch pad to blast the ascent stage back into lunar orbit.',
    whatHappened: 'Neil Armstrong and Buzz Aldrin ignited the ascent rocket engine, separating the crew cabin and leaving the four-legged gold-foiled descent stage resting permanently on the Sea of Tranquility.',
    wasPlanned: true,
    currentState: 'Resting exactly as left at 0.674° N, 23.473° E. Undisturbed by weather or atmospheric erosion for over five decades.',
    finalMessageOrTelemetry: 'Commemorative plaque inscription: “Here men from the planet Earth first set foot upon the Moon, July 1969 A.D. We came in peace for all mankind.”',
  },
};

/**
 * Helper to get or generate mission end record for any exhibit.
 */
export function getMissionEndRecordForExhibit(exhibit: {
  id: string;
  name: string;
  years: string;
  status: string;
  actual: string;
  story: string;
  planned: string;
}): MissionEndRecord {
  if (MISSION_END_RECORDS_BY_EXHIBIT[exhibit.id]) {
    return MISSION_END_RECORDS_BY_EXHIBIT[exhibit.id];
  }

  const isStillActive = exhibit.status === 'STILL WORKING' || exhibit.status === 'STILL ACTIVE';
  const isEndedAsPlanned = exhibit.status === 'ENDED AS PLANNED' || exhibit.status === 'ENDED ON PURPOSE';

  return {
    endDate: isStillActive ? 'Ongoing Operation' : exhibit.years.split('–')[1] || exhibit.years,
    statusLabel: exhibit.status,
    whyItEnded: isStillActive
      ? 'The spacecraft continues to receive power and transmit telemetry back to Earth.'
      : `Concluded its operational journey after achieving: ${exhibit.actual}.`,
    whatHappened: isStillActive
      ? `Systems continue operating in accordance with extended flight operations guidelines.`
      : `Following the completion of its planned science phase, transmitters were powered down or the vehicle exhausted its consumable energy resources.`,
    wasPlanned: isEndedAsPlanned || isStillActive,
    currentState: isStillActive
      ? 'Actively operating, powered by onboard generators or solar arrays.'
      : 'Resting intact and undisturbed at its final celestial resting site, preserved for future human generations.',
    finalMessageOrTelemetry: `Historical Mission Log: Planned for ${exhibit.planned}, achieved ${exhibit.actual}.`,
  };
}

/**
 * 4 Real NASA Decision Scenarios ("YOU ARE THE ENGINEER").
 */
export const ENGINEER_SCENARIOS: EngineerScenario[] = [
  {
    id: 'sc-opportunity-storm',
    missionName: 'Opportunity Rover',
    missionId: 'opportunity',
    missionYear: '2018 (Sol 5,111)',
    zone: 'Mars',
    title: 'The Great Dust Storm of Perseverance Valley',
    problem: 'A massive global dust storm has turned day into night over your landing site. Atmospheric opacity has surged to a record tau of 10.8. Your solar arrays are generating only 22 watt-hours per sol—far below the 100 watt-hours needed just to keep the clock and survival heaters running.',
    context: 'At night, Martian temperatures drop to -90°C. If the rover runs out of power while awake, the batteries will freeze and short-circuit.',
    options: [
      {
        id: 'A',
        label: 'Continuous Transmit Mode',
        description: 'Keep the radio transmitter broadcasting at full power so ground controllers know every second what is happening on Mars.',
        consequence: 'Drains remaining battery reserve in less than 40 minutes, causing sudden catastrophic shutdown before nightfall.',
        isRealNasaChoice: false,
      },
      {
        id: 'B',
        label: 'Deep Sleep Conservation Strategy',
        description: 'Command the rover to shut off all scientific instruments, stop communications, and enter a deep sleep to conserve every milliwatt until the Sun returns.',
        consequence: 'Prolonged battery life for several weeks. Real NASA controllers chose this, sending commands to preserve power through the storm.',
        isRealNasaChoice: true,
      },
      {
        id: 'C',
        label: 'Emergency Wheel Shake',
        description: 'Spin all six wheels at maximum RPM in place, hoping the mechanical vibration will shake the dust off the solar panels.',
        consequence: 'In total darkness, spinning wheels consumes high battery power without generating sunlight. Also risks digging the wheels into soft sand.',
        isRealNasaChoice: false,
      },
    ],
    realNasaDecision: 'NASA chosen Option B. Ground controllers sent commands putting Opportunity into deep sleep. While the storm ultimately lasted longer than the rover’s unheated electronics could survive, this strategy gave the machine its only scientific chance of survival.',
    engineeringLogic: 'In space exploration, power conservation always trumps data collection during an environmental crisis. You cannot do science tomorrow if your batteries freeze tonight.',
  },

  {
    id: 'sc-ingenuity-atmosphere',
    missionName: 'Ingenuity Mars Helicopter',
    missionId: 'ingenuity',
    missionYear: '2021 (Design Phase)',
    zone: 'Mars',
    title: 'Generating Lift in 1% Atmospheric Density',
    problem: 'Mars’s atmosphere is less than 1% as dense as Earth’s at sea level. A standard drone propeller would have to be hundreds of meters wide or spin so fast the tips would break the sound barrier and tear the aircraft apart.',
    context: 'Every single gram of mass added to the helicopter requires extra battery power that must also be lifted into the air.',
    options: [
      {
        id: 'A',
        label: 'High-RPM Dual Counter-Rotating Rotors',
        description: 'Use two lightweight 1.2-meter carbon-fiber rotors spinning in opposite directions at 2,400 RPM with an ultra-light 1.8 kg chassis.',
        consequence: 'Generates sufficient aerodynamic lift while counteracting torque without needing a heavy tail rotor. Tested successfully in JPL vacuum chambers.',
        isRealNasaChoice: true,
      },
      {
        id: 'B',
        label: 'Gasoline Engine with Heavy Propeller',
        description: 'Use a miniature combustion engine to produce high mechanical horsepower for large propellers.',
        consequence: 'Combustion engines require atmospheric oxygen to burn fuel. Mars has virtually zero oxygen (95% CO2), so the engine would not ignite.',
        isRealNasaChoice: false,
      },
      {
        id: 'C',
        label: 'Helium Aerostat Balloon Hybrid',
        description: 'Attach a small helium balloon to carry 80% of the helicopter’s weight.',
        consequence: 'In 1% atmospheric density, a balloon would need to be the size of a two-story house to lift 1 kg. Strong Martian winds would shred or blow it away.',
        isRealNasaChoice: false,
      },
    ],
    realNasaDecision: 'NASA chose Option A. Engineers crafted ultra-stiff carbon-fiber blades with a specialized aerodynamic camber, spinning at 2,400 RPM. This made Ingenuity the first successful aircraft on an alien planet.',
    engineeringLogic: 'When atmospheric density drops by 99%, you must simultaneously minimize mass (1.8 kg) and maximize blade speed (2,400 RPM) while avoiding supersonic shock waves at blade tips.',
  },

  {
    id: 'sc-voyager-memory',
    missionName: 'Voyager 1',
    missionId: 'voyager-1',
    missionYear: '2024 (24 Billion km from Earth)',
    zone: 'Deep Space',
    title: 'The Interstellar Memory Bit-Flip',
    problem: 'At 164 AU from Earth, Voyager 1 begins beaming back a repeating sequence of binary zeroes and ones. A single chip in the Flight Data System (FDS) containing vital operating code has suffered a hardware failure from cosmic radiation.',
    context: 'A radio signal takes 22.5 hours to travel to the spacecraft and another 22.5 hours to confirm receipt. A wrong command could permanently disable the computer.',
    options: [
      {
        id: 'A',
        label: 'Full Cold System Reboot',
        description: 'Cut power to the entire computer and restart the mainframe from scratch.',
        consequence: 'At 47 years old, the frozen power circuits may fail to turn back on, ending the mission permanently.',
        isRealNasaChoice: false,
      },
      {
        id: 'B',
        label: 'Code Partition & Interstellar Memory Relocation',
        description: 'Isolate the 3% damaged code and split the software package into smaller sections stored in healthy memory sectors elsewhere in the 69 KB computer.',
        consequence: 'Requires months of meticulous binary mapping. Successfully restored normal science telemetry in April 2024.',
        isRealNasaChoice: true,
      },
      {
        id: 'C',
        label: 'Switch to Backup Computer Module',
        description: 'Immediately command the spacecraft to switch to its secondary backup FDS computer.',
        consequence: 'The backup FDS computer failed back in 1981; switching to it would leave the spacecraft completely uncommunicative.',
        isRealNasaChoice: false,
      },
    ],
    realNasaDecision: 'NASA chose Option B. Over five months, JPL engineers meticulously divided the damaged code into fragments and re-linked the instructions to healthy memory locations across the 47-year-old computer.',
    engineeringLogic: 'Never reboot legacy hardware in deep space if you cannot guarantee it will power back up. Work around damaged memory sectors through modular software relocation.',
  },

  {
    id: 'sc-surveyor-bounce',
    missionName: 'Surveyor 3',
    missionId: 'surveyor-3',
    missionYear: '1967 (Ocean of Storms)',
    zone: 'Moon',
    title: 'The Bouncing Lunar Lander',
    problem: 'During terminal descent to the Moon, highly reflective lunar dust fools the automated landing radar. The three throttleable rocket engines fail to shut down at the programmed 4-meter altitude mark, and the spacecraft strikes the lunar ground with engines firing.',
    context: 'The lander rebounds 10 meters back into the lunar sky and begins falling back down toward the crater rim.',
    options: [
      {
        id: 'A',
        label: 'Fire Emergency Escape Thrusters',
        description: 'Throttle engines to 100% to push the spacecraft back into lunar orbit.',
        consequence: 'Not enough propellant remains in the landing tanks to reach orbit; the spacecraft would run out of fuel mid-ascent and crash at high speed.',
        isRealNasaChoice: false,
      },
      {
        id: 'B',
        label: 'Manual Ground Engine Cut Command',
        description: 'Ground controllers immediately transmit an override command from Earth to shut down all three rocket engines before the second bounce.',
        consequence: 'The command arrives just as the lander touches down on its third small hop, settling safely inside the crater without tipping over.',
        isRealNasaChoice: true,
      },
      {
        id: 'C',
        label: 'Eject Landing Gear Shock Absorbers',
        description: 'Jettison the footpads to lower the center of gravity.',
        consequence: 'Without footpads, the metal chassis would smash directly into jagged rocks, puncturing fuel tanks and avionics.',
        isRealNasaChoice: false,
      },
    ],
    realNasaDecision: 'NASA ground controllers in Pasadena quickly radioed a manual engine shutoff command. Surveyor 3 settled safely in Oceanus Procellarum, proving the lunar soil was firm enough to land Apollo astronauts.',
    engineeringLogic: 'When sensors provide conflicting or anomalous feedback during a planetary landing, human flight controllers must have emergency override authority to shut down active propulsion.',
  },
];

/**
 * Hardware Evolution Across Decades ("THEN VS NOW").
 * 1970s -> 1990s -> 2000s -> 2010s -> 2020s.
 */
export const EVOLUTION_ERAS: EvolutionEra[] = [
  {
    decade: '1970s',
    title: 'The Analog Dawn',
    representativeMachine: 'Apollo 15 Lunar Rover & Viking 1',
    years: '1971 – 1976',
    tagline: 'Vacuum tubes, film tape, and human joy-stick controls in the vacuum.',
    computing: '4 to 64 KB magnetic core memory; discrete logic circuits; zero on-board autonomy.',
    cameras: 'Analog vidicon vacuum-tube television cameras; 0.5-megapixel equivalent resolution; black-and-white filters.',
    mobility: 'Electric piano-wire mesh wheels driven by human astronauts (28 km range); stationary landers with static pads.',
    autonomy: 'Zero autonomous hazard avoidance; all movements required live human steering or pre-scripted radar burns.',
    power: 'Silver-zinc non-rechargeable chemical batteries (Apollo LRV) & early SNAP-19 plutonium RTGs (Viking).',
    instruments: 'Mechanical scoops, quartz seismometers, and gas chromatograph mass spectrometers.',
  },
  {
    decade: '1990s',
    title: 'The Micro-Robotic Spark',
    representativeMachine: 'Mars Pathfinder / Sojourner',
    years: '1997',
    tagline: 'A microwave-sized pioneer proving six wheels could roll on another world.',
    computing: 'Intel 80C85 8-bit processor running at 2 MHz; 512 KB RAM; 176 KB flash memory.',
    cameras: 'Miniature stereoscopic black-and-white CCD cameras (768x484 pixels); laser dot projectors for obstacle detection.',
    mobility: 'First rocker-bogie suspension system; 6 independent electric motors; max speed 1 cm/sec (0.04 km/h); total range 100 meters.',
    autonomy: 'Basic hazard avoidance: stopped when laser dots detected rocks higher than 5 centimeters.',
    power: '0.22 m² solar array generating 16 watts peak; non-rechargeable lithium thionyl chloride backup battery.',
    instruments: 'Alpha Proton X-ray Spectrometer (APXS) pressed against rocks to analyze elemental chemistry.',
  },
  {
    decade: '2000s',
    title: 'The Marathon Explorers',
    representativeMachine: 'Spirit & Opportunity (MER)',
    years: '2004 – 2018',
    tagline: 'Golf-cart-sized field geologists that turned 90-day sprints into 14-year odysseys.',
    computing: 'Radiation-hardened BAE RAD6000 32-bit CPU at 20 MHz; 128 MB DRAM; 256 MB flash memory.',
    cameras: 'Pancam & Navcam 1024x1024 CCD stereo cameras with 8-color optical filter wheels; microscopic rock imager.',
    mobility: 'Heavy-duty rocker-bogie suspension; 45.16 km total distance driven; climbed slopes up to 32 degrees.',
    autonomy: 'AutoNav visual odometry algorithm; mapped 3D terrain grids and picked its own way around boulders.',
    power: '1.3 m² triple-junction gallium arsenide solar wings generating up to 140 watts; rechargeable lithium-ion cells.',
    instruments: 'Mössbauer spectrometer, APXS, miniature thermal emission spectrometer (Mini-TES), and Rock Abrasion Tool.',
  },
  {
    decade: '2010s',
    title: 'The Nuclear Rolling Labs',
    representativeMachine: 'Curiosity (MSL) & Cassini',
    years: '2011 – Present',
    tagline: 'SUV-sized laboratories carrying internal chemistry ovens and rock-vaporizing lasers.',
    computing: 'Dual redundant BAE RAD750 32-bit PowerPC CPUs at 133 MHz; 256 MB RAM; 2 GB flash memory.',
    cameras: 'Mastcam 2-megapixel HD zoom color cameras; ChemCam laser telescope; Mars Hand Lens Imager (MAHLI).',
    mobility: 'Aluminum wheels with titanium flex spokes; climbed 400+ vertical meters up the layered foothills of Mount Sharp.',
    autonomy: 'Full hazard avoidance driving while analyzing terrain ahead; smart laser targeting of rocks.',
    power: 'Multi-Mission Radioisotope Thermoelectric Generator (MMRTG) with 4.8 kg Plutonium-238 providing continuous 110W power day and night.',
    instruments: 'SAM chemistry lab (ovens heating rock powder to 1,000°C), CheMin X-ray diffraction, and 1-megawatt pulsing rock laser.',
  },
  {
    decade: '2020s',
    title: 'The Era of Alien Flight & Sample Caching',
    representativeMachine: 'Perseverance & Ingenuity Helicopter',
    years: '2020 – Present',
    tagline: 'Robotic astrobiologists drilling core samples while aerial drones scout from above.',
    computing: 'Smartphone-grade Qualcomm Snapdragon 801 CPU (Ingenuity) + BAE RAD750 (Rover); Linux OS running onboard alien flight software.',
    cameras: '23 cameras total: 4K zoom video, SuperCam microphone recording actual Martian soundscapes, downward high-speed flight cameras.',
    mobility: 'Ground + Aerial exploration: 6-wheeled rover paired with a 1.8 kg twin-rotor helicopter flying at 36 km/h up to 24 meters high.',
    autonomy: 'Terrain Relative Navigation (TRN) for landing; real-time flight autopilot evaluating 500 balance calculations/sec.',
    power: 'Nuclear MMRTG (Rover) + Solar-recharged lithium-ion flight batteries (Helicopter); MOXIE oxygen generation system.',
    instruments: 'PIXL X-ray fluorescence, SHERLOC ultraviolet Raman laser, RIMFAX ground-penetrating radar, and 43 hermetic titanium sample tubes for Earth return.',
  },
];
