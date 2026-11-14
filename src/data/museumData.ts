import { Exhibit, MuseumConfig, QuizQuestion } from '../types';

/**
 * Generates an accurate, highly detailed equirectangular Moon color texture (SVG data URI).
 *
 * True-to-scale planetary mapping:
 * - Nearside maria aligned with real Apollo/Surveyor landing coordinates
 *   (Mare Tranquillitatis, Serenitatis, Imbrium, Crisium, Procellarum, Nubium)
 * - Mountain ranges (Montes Apenninus where Apollo 15 landed)
 * - Spectacular ray systems (Tycho & Copernicus bright ejecta streaks)
 * - Hundreds of craters with 3D shadow crescents and illuminated rims
 */
function createMoonTexture(): string {
  const rng = (seed: number) => {
    let s = seed;
    return () => { s = (s * 16807 + 0) % 2147483647; return s / 2147483647; };
  };
  const rand = rng(42);

  // Highland mineral variegation patches (anorthosite crust)
  let highlands = '';
  for (let i = 0; i < 220; i++) {
    const x = Math.floor(rand() * 2048);
    const y = Math.floor(rand() * 1024);
    const w = 50 + Math.floor(rand() * 200);
    const h = 30 + Math.floor(rand() * 120);
    const lum = 54 + Math.floor(rand() * 26);
    highlands += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${Math.floor(rand()*18)}" fill="hsl(220,4%,${lum}%)" opacity="${0.2 + rand()*0.3}"/>`;
  }

  // Lunar Maria (Dark volcanic basalt plains - accurately positioned)
  const maria = `
    <!-- Oceanus Procellarum (Ocean of Storms - vast western plains) -->
    <ellipse cx="710" cy="490" rx="210" ry="190" fill="#2E333C" opacity="0.82"/>
    <ellipse cx="760" cy="530" rx="160" ry="140" fill="#292D35" opacity="0.6"/>
    <!-- Mare Imbrium (Sea of Showers - lat 33°N, lng 16°W ≈ x:933, y:324) -->
    <ellipse cx="935" cy="325" rx="175" ry="135" fill="#2C313A" opacity="0.85"/>
    <ellipse cx="925" cy="320" rx="140" ry="110" fill="#262A32" opacity="0.65"/>
    <!-- Sinus Iridum (Bay of Rainbows - northwest rim of Imbrium) -->
    <ellipse cx="850" cy="255" rx="55" ry="42" fill="#2A2E36" opacity="0.75"/>
    <!-- Mare Serenitatis (Sea of Serenity - lat 28°N, lng 17°E ≈ x:1120, y:352) -->
    <ellipse cx="1120" cy="355" rx="105" ry="85" fill="#35332F" opacity="0.8"/>
    <!-- Mare Tranquillitatis (Apollo 11 site! lat 0.67°N, lng 23.47°E ≈ x:1157, y:508) -->
    <ellipse cx="1160" cy="505" rx="130" ry="95" fill="#2A303A" opacity="0.88"/>
    <ellipse cx="1170" cy="510" rx="100" ry="75" fill="#242932" opacity="0.6"/>
    <!-- Mare Crisium (Sea of Crises - lat 17°N, lng 59°E ≈ x:1360, y:415) -->
    <ellipse cx="1360" cy="415" rx="75" ry="58" fill="#2B3038" opacity="0.85"/>
    <!-- Mare Nubium (lat 21°S, lng 16°W ≈ x:933, y:631) -->
    <ellipse cx="935" cy="630" rx="95" ry="70" fill="#2D323A" opacity="0.78"/>
    <!-- Mare Humorum (lat 24°S, lng 38°W ≈ x:807, y:648) -->
    <ellipse cx="810" cy="650" rx="65" ry="55" fill="#2B2F36" opacity="0.8"/>
    <!-- Mare Fecunditatis (lat 8°S, lng 51°E ≈ x:1314, y:557) -->
    <ellipse cx="1315" cy="555" rx="95" ry="80" fill="#2E333C" opacity="0.75"/>
    <!-- Mare Nectaris (lat 15°S, lng 35°E ≈ x:1223, y:597) -->
    <ellipse cx="1225" cy="595" rx="60" ry="50" fill="#2D323A" opacity="0.78"/>
    <!-- Mare Vaporum (Sea of Vapors - center near Apennines) -->
    <ellipse cx="1040" cy="435" rx="50" ry="40" fill="#2F333B" opacity="0.7"/>
    <!-- Far-side Mare Moscoviense & Tsiolkovsky -->
    <ellipse cx="320" cy="360" rx="45" ry="35" fill="#32363E" opacity="0.5"/>
    <ellipse cx="440" cy="620" rx="55" ry="40" fill="#2B2E35" opacity="0.55"/>
  `;

  // Montes Apenninus mountain range (Apollo 15 site at x:1045, y:363)
  const apennines = `
    <!-- Montes Apenninus mountain chain arc -->
    <path d="M 970 420 Q 1030 380 1055 360 Q 1090 330 1110 325" stroke="#D2D6E0" stroke-width="7" fill="none" opacity="0.75" stroke-linecap="round"/>
    <path d="M 970 420 Q 1030 380 1055 360 Q 1090 330 1110 325" stroke="#1A1C22" stroke-width="3" fill="none" opacity="0.5" stroke-linecap="round"/>
    <!-- Hadley Rille / Canyon fault nearby -->
    <path d="M 1042 360 Q 1048 365 1046 372" stroke="#181A20" stroke-width="2" fill="none" opacity="0.8"/>
  `;

  // Tycho & Copernicus ray systems (bright radial ejecta streaks)
  let rays = '';
  // Tycho rays (crater at x:960, y:758) - rays stretch across half the Moon
  for (let a = 0; a < 360; a += 15) {
    const rad = (a * Math.PI) / 180;
    const len = 150 + rand() * 450;
    const x2 = 960 + Math.cos(rad) * len;
    const y2 = 758 + Math.sin(rad) * len;
    rays += `<line x1="960" y1="758" x2="${Math.floor(x2)}" y2="${Math.floor(y2)}" stroke="#E4E8F2" stroke-width="${1.2 + rand()*2}" opacity="${0.12 + rand()*0.2}"/>`;
  }
  // Copernicus rays (crater at x:910, y:457)
  for (let a = 0; a < 360; a += 22) {
    const rad = (a * Math.PI) / 180;
    const len = 90 + rand() * 220;
    const x2 = 910 + Math.cos(rad) * len;
    const y2 = 457 + Math.sin(rad) * len;
    rays += `<line x1="910" y1="457" x2="${Math.floor(x2)}" y2="${Math.floor(y2)}" stroke="#D6DAE4" stroke-width="${1 + rand()*1.8}" opacity="${0.14 + rand()*0.18}"/>`;
  }
  // Kepler rays (crater at x:808, y:465)
  for (let a = 0; a < 360; a += 30) {
    const rad = (a * Math.PI) / 180;
    const len = 50 + rand() * 110;
    const x2 = 808 + Math.cos(rad) * len;
    const y2 = 465 + Math.sin(rad) * len;
    rays += `<line x1="808" y1="465" x2="${Math.floor(x2)}" y2="${Math.floor(y2)}" stroke="#D0D4DE" stroke-width="1.2" opacity="0.15"/>`;
  }

  // Craters with optical depth: dark inner shadow crescent + bright rim highlight
  let craters = '';
  const prominentCraters = [
    { name: 'Tycho', cx: 960, cy: 758, r: 42, peak: true },
    { name: 'Copernicus', cx: 910, cy: 457, r: 45, peak: true },
    { name: 'Kepler', cx: 808, cy: 465, r: 24, peak: false },
    { name: 'Aristarchus', cx: 753, cy: 377, r: 28, bright: true },
    { name: 'Plato', cx: 916, cy: 218, r: 48, darkFloor: true },
    { name: 'Archimedes', cx: 945, cy: 343, r: 38, darkFloor: true },
    { name: 'Eratosthenes', cx: 958, cy: 429, r: 28, peak: true },
    { name: 'Ptolemaeus', cx: 1014, cy: 564, r: 52, darkFloor: true },
    { name: 'Alphonsus', cx: 1008, cy: 588, r: 44, peak: true },
    { name: 'Clavius', cx: 940, cy: 844, r: 65, darkFloor: false },
    { name: 'Langrenus', cx: 1370, cy: 562, r: 48, peak: true },
    { name: 'Theophilus', cx: 1173, cy: 576, r: 45, peak: true },
    { name: 'Posidonius', cx: 1195, cy: 331, r: 38, peak: false },
    { name: 'Far-Side Tsiolkovsky', cx: 440, cy: 620, r: 50, darkFloor: true },
    { name: 'Far-Side Daedalus', cx: 115, cy: 545, r: 40, peak: true },
    { name: 'Far-Side Korolev', cx: 135, cy: 488, r: 60, peak: false },
    { name: 'Far-Side Hertzsprung', cx: 290, cy: 502, r: 65, peak: false },
  ];

  for (const c of prominentCraters) {
    const rimColor = c.bright ? '#FFFFFF' : '#D0D4DF';
    const floorColor = c.darkFloor ? '#20242B' : '#333740';
    craters += `
      <!-- Crater ${c.name} -->
      <circle cx="${c.cx}" cy="${c.cy}" r="${c.r}" fill="${floorColor}" stroke="${rimColor}" stroke-width="${c.r > 40 ? 3 : 2}" opacity="0.9"/>
      <!-- Sunward inner shadow crescent -->
      <path d="M ${c.cx - c.r * 0.7} ${c.cy - c.r * 0.7} A ${c.r} ${c.r} 0 0 1 ${c.cx + c.r * 0.7} ${c.cy + c.r * 0.7} A ${c.r * 0.8} ${c.r * 0.8} 0 0 0 ${c.cx - c.r * 0.7} ${c.cy - c.r * 0.7}" fill="#14161B" opacity="0.6"/>
      <!-- Sunlit opposite rim arc -->
      <path d="M ${c.cx - c.r * 0.8} ${c.cy + c.r * 0.6} A ${c.r} ${c.r} 0 0 0 ${c.cx + c.r * 0.8} ${c.cy - c.r * 0.6}" stroke="#FFFFFF" stroke-width="${c.r > 40 ? 2.5 : 1.5}" fill="none" opacity="0.85"/>
      ${c.peak ? `<circle cx="${c.cx}" cy="${c.cy}" r="${c.r * 0.18}" fill="#DDE1EB" stroke="#1A1C22" stroke-width="0.8"/>` : ''}
    `;
  }

  // Hundreds of background craters
  for (let i = 0; i < 280; i++) {
    const cx = Math.floor(rand() * 2048);
    const cy = 40 + Math.floor(rand() * 944);
    const r = 2.5 + Math.floor(rand() * 16);
    const lum = 40 + Math.floor(rand() * 26);
    craters += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="hsl(220,3%,${lum}%)" stroke="hsl(220,4%,${lum + 22}%)" stroke-width="${r > 8 ? 1.4 : 0.7}" opacity="${0.35 + rand()*0.45}"/>`;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="2048" height="1024" viewBox="0 0 2048 1024">
    <defs>
      <linearGradient id="moonBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#484C55"/>
        <stop offset="15%" stop-color="#555963"/>
        <stop offset="50%" stop-color="#5C616B"/>
        <stop offset="85%" stop-color="#555963"/>
        <stop offset="100%" stop-color="#484C55"/>
      </linearGradient>
      <filter id="moonBlur" x="-5%" y="-5%" width="110%" height="110%">
        <feGaussianBlur stdDeviation="7"/>
      </filter>
    </defs>
    <!-- Base highland terrain -->
    <rect width="2048" height="1024" fill="url(#moonBg)"/>
    <g filter="url(#moonBlur)">${highlands}</g>
    <!-- Maria (Dark Basalt Seas) -->
    ${maria}
    <!-- Mountain ranges -->
    ${apennines}
    <!-- Bright ray ejecta splashes -->
    ${rays}
    <!-- Impact craters with 3D shadows and rims -->
    ${craters}
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Generates an equirectangular Moon grayscale bump map (SVG data URI)
 * giving physical 3D elevation to mountain ranges, crater rims, and maria depressions.
 */
function createMoonBumpMap(): string {
  const prominentCraters = [
    { cx: 960, cy: 758, r: 42 },
    { cx: 910, cy: 457, r: 45 },
    { cx: 808, cy: 465, r: 24 },
    { cx: 753, cy: 377, r: 28 },
    { cx: 916, cy: 218, r: 48 },
    { cx: 945, cy: 343, r: 38 },
    { cx: 958, cy: 429, r: 28 },
    { cx: 1014, cy: 564, r: 52 },
    { cx: 1173, cy: 576, r: 45 },
    { cx: 1370, cy: 562, r: 48 },
  ];

  let bumpCraters = '';
  for (const c of prominentCraters) {
    bumpCraters += `
      <circle cx="${c.cx}" cy="${c.cy}" r="${c.r * 1.15}" fill="none" stroke="#FFFFFF" stroke-width="6" opacity="0.8"/>
      <circle cx="${c.cx}" cy="${c.cy}" r="${c.r}" fill="#252525" opacity="0.85"/>
      <circle cx="${c.cx}" cy="${c.cy}" r="${c.r * 0.2}" fill="#DDDDDD" opacity="0.7"/>
    `;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="2048" height="1024" viewBox="0 0 2048 1024">
    <!-- Base 50% neutral elevation -->
    <rect width="2048" height="1024" fill="#808080"/>
    <!-- Maria basins (depressed below baseline) -->
    <g fill="#454545" opacity="0.6">
      <ellipse cx="710" cy="490" rx="210" ry="190"/>
      <ellipse cx="935" cy="325" rx="175" ry="135"/>
      <ellipse cx="1120" cy="355" rx="105" ry="85"/>
      <ellipse cx="1160" cy="505" rx="130" ry="95"/>
      <ellipse cx="1360" cy="415" rx="75" ry="58"/>
      <ellipse cx="935" cy="630" rx="95" ry="70"/>
      <ellipse cx="810" cy="650" rx="65" ry="55"/>
      <ellipse cx="1315" cy="555" rx="95" ry="80"/>
    </g>
    <!-- Montes Apenninus mountain ridge (elevation up to 5km) -->
    <path d="M 970 420 Q 1030 380 1055 360 Q 1090 330 1110 325" stroke="#FFFFFF" stroke-width="12" fill="none" opacity="0.8" stroke-linecap="round"/>
    ${bumpCraters}
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Generates an accurate, highly detailed equirectangular Mars color texture (SVG data URI).
 *
 * True-to-scale planetary mapping:
 * - Olympus Mons (tallest volcano in solar system at lat 18.65°N, lng 133.8°W ≈ x:262, y:405)
 * - Tharsis Montes volcanic trio (Ascraeus, Pavonis, Arsia Mons)
 * - Valles Marineris canyon system (spanning 4,000 km across x:512 to 853, y:568 to 600)
 * - Jezero Crater with river delta fan (Perseverance & Ingenuity at lat 18.38°N, lng 77.58°E ≈ x:1465, y:407)
 * - Gale Crater with Mount Sharp (Curiosity at lat -4.59°S, lng 137.44°E ≈ x:1805, y:538)
 * - Meridiani Planum (Opportunity at lat -1.95°S, lng -5.53°W ≈ x:992, y:523)
 * - Elysium Planitia (InSight at lat 4.5°N, lng 135.62°E ≈ x:1795, y:486)
 * - Ares Vallis ancient flood basin (Sojourner at x:835, y:403)
 * - North & South polar ice caps with spiral troughs
 * - Syrtis Major volcanic shield & Hellas impact basin
 */
function createMarsTexture(): string {
  const rng = (seed: number) => {
    let s = seed;
    return () => { s = (s * 16807 + 0) % 2147483647; return s / 2147483647; };
  };
  const rand = rng(137);

  // Terrain variation & dunes
  let terrain = '';
  for (let i = 0; i < 240; i++) {
    const x = Math.floor(rand() * 2048);
    const y = 60 + Math.floor(rand() * 904);
    const w = 50 + Math.floor(rand() * 220);
    const h = 30 + Math.floor(rand() * 150);
    const hue = 14 + Math.floor(rand() * 20); // 14-34 rust to golden ochre
    const sat = 45 + Math.floor(rand() * 30);
    const lum = 24 + Math.floor(rand() * 22);
    terrain += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${Math.floor(rand()*25)}" fill="hsl(${hue},${sat}%,${lum}%)" opacity="${0.22 + rand()*0.32}"/>`;
  }

  // Crustal dichotomy (darker northern lowlands, brighter southern cratered highlands)
  const dichotomy = `
    <!-- Northern lowland plains (Acidalia, Utopia, Vastitas Borealis) -->
    <rect x="0" y="0" width="2048" height="470" fill="#422013" opacity="0.28"/>
    <!-- Southern highlands boundary -->
    <path d="M 0 470 Q 200 450 400 480 Q 600 495 900 460 Q 1100 440 1400 475 Q 1700 490 2048 470" fill="none" stroke="#36170B" stroke-width="6" opacity="0.35"/>
  `;

  // Major Dark Albedo Regions (Syrtis Major, Acidalia, Sinus Sabaeus, Mare Tyrrhenum)
  const darkAlbedo = `
    <!-- Syrtis Major (prominent dark triangular basalt shield near Jezero at x:1416, y:466) -->
    <polygon points="1370,420 1450,425 1470,510 1420,535 1375,490" fill="#2E1208" opacity="0.6"/>
    <!-- Acidalia Planitia (dark northern plain at x:700, y:330) -->
    <ellipse cx="700" cy="330" rx="130" ry="75" fill="#32140A" opacity="0.4"/>
    <!-- Sinus Sabaeus & Meridiani (Opportunity site at x:992, y:523) -->
    <ellipse cx="1020" cy="530" rx="160" ry="45" fill="#2C1208" opacity="0.55"/>
    <!-- Mare Tyrrhenum / Cimmerium belt across south -->
    <ellipse cx="1650" cy="570" rx="200" ry="60" fill="#2E1308" opacity="0.45"/>
    <!-- Hellas Planitia (vast circular basin at lat -42°S, lng 70°E ≈ x:1422, y:750) -->
    <ellipse cx="1422" cy="750" rx="130" ry="95" fill="#5E2C1A" stroke="#7A3C24" stroke-width="4" opacity="0.7"/>
    <ellipse cx="1422" cy="750" rx="100" ry="70" fill="#753820" opacity="0.4"/>
    <!-- Argyre Planitia (southern impact basin at x:773, y:796) -->
    <ellipse cx="773" cy="796" rx="90" ry="68" fill="#582817" stroke="#723620" stroke-width="3" opacity="0.65"/>
  `;

  // Valles Marineris Canyon System (x:512 to 853, y:568 to 600 - 4000km long, 7km deep!)
  const canyons = `
    <!-- Valles Marineris main rift -->
    <path d="M 520 575 Q 600 565 700 578 Q 780 588 860 572 Q 890 568 920 574" stroke="#1D0803" stroke-width="16" fill="none" opacity="0.88" stroke-linecap="round"/>
    <path d="M 520 575 Q 600 565 700 578 Q 780 588 860 572 Q 890 568 920 574" stroke="#321106" stroke-width="8" fill="none" opacity="0.75" stroke-linecap="round"/>
    <!-- Coprates & Melas Chasma (deepest sections) -->
    <ellipse cx="720" cy="578" rx="70" ry="12" fill="#150502" opacity="0.85"/>
    <ellipse cx="640" cy="570" rx="50" ry="10" fill="#150502" opacity="0.85"/>
    <!-- Branching tributary canyons (Candor & Ophir Chasma) -->
    <path d="M 680 568 Q 695 545 725 548" stroke="#260C04" stroke-width="6" fill="none" opacity="0.7" stroke-linecap="round"/>
    <path d="M 750 580 Q 780 605 820 608" stroke="#260C04" stroke-width="5" fill="none" opacity="0.7" stroke-linecap="round"/>
    <!-- Noctis Labyrinthus (chaotic western canyon maze) -->
    <path d="M 515 575 Q 490 565 470 580 Q 450 568 430 582" stroke="#2A0F05" stroke-width="4" fill="none" opacity="0.65" stroke-linecap="round"/>
  `;

  // Olympus Mons & Tharsis Volcanoes
  const volcanoes = `
    <!-- Olympus Mons (colossal 21km shield volcano at x:262, y:405) -->
    <circle cx="262" cy="405" r="76" fill="#6A321E" opacity="0.75"/>
    <circle cx="262" cy="405" r="56" fill="#783C25" opacity="0.6"/>
    <circle cx="262" cy="405" r="35" fill="#88462C" opacity="0.5"/>
    <!-- Basal scarp cliff (6km sheer drop-off) -->
    <circle cx="262" cy="405" r="76" fill="none" stroke="#9E5436" stroke-width="3" opacity="0.7"/>
    <!-- Summit Caldera complex (multi-ringed collapse crater) -->
    <circle cx="262" cy="403" r="18" fill="#3D180C" stroke="#90482E" stroke-width="2.5" opacity="0.85"/>
    <circle cx="264" cy="401" r="9" fill="#250C05" opacity="0.8"/>

    <!-- Tharsis Montes alignment -->
    <!-- Ascraeus Mons (lat 11.9°N, lng -104.5°W ≈ x:429, y:444) -->
    <circle cx="429" cy="444" r="34" fill="#6D331F" stroke="#924B30" stroke-width="2" opacity="0.7"/>
    <circle cx="429" cy="444" r="14" fill="#38150A" stroke="#7C3B24" stroke-width="1.5" opacity="0.8"/>
    <!-- Pavonis Mons (lat 0.8°N, lng -113.0°W ≈ x:381, y:507) -->
    <circle cx="381" cy="507" r="30" fill="#6D331F" stroke="#924B30" stroke-width="2" opacity="0.7"/>
    <circle cx="381" cy="507" r="12" fill="#38150A" stroke="#7C3B24" stroke-width="1.5" opacity="0.8"/>
    <!-- Arsia Mons (lat -8.4°S, lng -121.1°W ≈ x:335, y:559) -->
    <circle cx="335" cy="559" r="36" fill="#6D331F" stroke="#924B30" stroke-width="2" opacity="0.7"/>
    <circle cx="335" cy="559" r="16" fill="#38150A" stroke="#7C3B24" stroke-width="1.5" opacity="0.8"/>

    <!-- Elysium Mons (near InSight at x:1795, y:486 -> volcano at x:1740, y:420) -->
    <circle cx="1740" cy="420" r="36" fill="#6A311D" stroke="#8E462C" stroke-width="2" opacity="0.65"/>
    <circle cx="1740" cy="420" r="14" fill="#351308" stroke="#783820" stroke-width="1.5" opacity="0.75"/>
  `;

  // Famous Landing Site Geological Features
  const landingFeatures = `
    <!-- Jezero Crater (Perseverance & Ingenuity at x:1465, y:407) -->
    <circle cx="1465" cy="407" r="28" fill="#4B2011" stroke="#8A482E" stroke-width="2" opacity="0.8"/>
    <!-- Jezero western river delta fan (ancient lake sediment) -->
    <path d="M 1445 407 Q 1455 401 1463 406" stroke="#9E5D3C" stroke-width="3" fill="none" opacity="0.9"/>

    <!-- Gale Crater (Curiosity at x:1805, y:538) -->
    <circle cx="1805" cy="538" r="34" fill="#471E10" stroke="#88452B" stroke-width="2" opacity="0.8"/>
    <!-- Mount Sharp (Aeolis Mons central mound, 5km high) -->
    <circle cx="1805" cy="538" r="15" fill="#753C24" stroke="#995638" stroke-width="1.5" opacity="0.9"/>
  `;

  // Polar Ice Caps (Water ice & CO2 dry ice frost with spiral valleys)
  const polarCaps = `
    <!-- North Polar Cap (Planum Boreum - dazzling white/ice-blue frost) -->
    <ellipse cx="1024" cy="22" rx="550" ry="50" fill="#E8EFF8" opacity="0.95"/>
    <ellipse cx="1024" cy="16" rx="460" ry="36" fill="#F4F8FC" opacity="0.9"/>
    <ellipse cx="1024" cy="12" rx="350" ry="24" fill="#FFFFFF" opacity="0.9"/>
    <!-- Chasma Boreale & spiral troughs (wind-carved dark canyons in ice) -->
    <path d="M 820 28 Q 940 18 1040 32 Q 1160 42 1250 25" stroke="#7A523A" stroke-width="2.5" fill="none" opacity="0.45"/>
    <path d="M 870 20 Q 980 30 1090 18 Q 1200 12 1220 22" stroke="#7A523A" stroke-width="2" fill="none" opacity="0.4"/>

    <!-- South Polar Cap (Planum Australe - CO2 frost) -->
    <ellipse cx="1024" cy="1002" rx="420" ry="44" fill="#DEE6F0" opacity="0.88"/>
    <ellipse cx="1024" cy="1006" rx="320" ry="32" fill="#EBF2FA" opacity="0.85"/>
    <ellipse cx="1024" cy="1010" rx="220" ry="20" fill="#F8FAFC" opacity="0.8"/>
  `;

  // Impact craters
  let craters = '';
  for (let i = 0; i < 160; i++) {
    const cx = Math.floor(rand() * 2048);
    const cy = 60 + Math.floor(rand() * 904);
    const r = 2.5 + Math.floor(rand() * 14);
    craters += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#38160B" stroke="#723A24" stroke-width="${r > 8 ? 1.4 : 0.7}" opacity="${0.3 + rand()*0.4}"/>`;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="2048" height="1024" viewBox="0 0 2048 1024">
    <defs>
      <linearGradient id="marsBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#5E2815"/>
        <stop offset="12%" stop-color="#73351E"/>
        <stop offset="35%" stop-color="#803D24"/>
        <stop offset="50%" stop-color="#8A4228"/>
        <stop offset="65%" stop-color="#803D24"/>
        <stop offset="88%" stop-color="#73351E"/>
        <stop offset="100%" stop-color="#5E2815"/>
      </linearGradient>
      <!-- Tharsis volcanic bulge radial elevation brightening -->
      <radialGradient id="tharsisBulge" cx="0.18" cy="0.48" r="0.25">
        <stop offset="0%" stop-color="#9C5234" stop-opacity="0.45"/>
        <stop offset="100%" stop-color="#8A4228" stop-opacity="0"/>
      </radialGradient>
      <filter id="marsBlur" x="-5%" y="-5%" width="110%" height="110%">
        <feGaussianBlur stdDeviation="8"/>
      </filter>
    </defs>
    <!-- Base rusty desert sphere -->
    <rect width="2048" height="1024" fill="url(#marsBg)"/>
    <rect width="2048" height="1024" fill="url(#tharsisBulge)"/>
    <g filter="url(#marsBlur)">${terrain}</g>
    <!-- Crustal dichotomy & Dark Albedo regions -->
    ${dichotomy}
    ${darkAlbedo}
    <!-- Valles Marineris Grand Canyon -->
    ${canyons}
    <!-- Shield Volcanoes -->
    ${volcanoes}
    <!-- Famous Landing Sites -->
    ${landingFeatures}
    <!-- Impact Craters -->
    ${craters}
    <!-- Polar Ice Caps -->
    ${polarCaps}
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Generates an equirectangular Mars grayscale bump map (SVG data URI)
 * giving physical 3D elevation to Olympus Mons (21km), Tharsis volcanoes,
 * and deep chasm cuts to Valles Marineris (7km).
 */
function createMarsBumpMap(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="2048" height="1024" viewBox="0 0 2048 1024">
    <!-- Base 50% elevation -->
    <rect width="2048" height="1024" fill="#757575"/>
    <!-- Northern lowlands (3-5km lower) -->
    <rect x="0" y="0" width="2048" height="470" fill="#505050" opacity="0.45"/>
    <!-- Hellas basin depression (7km deep impact basin) -->
    <ellipse cx="1422" cy="750" rx="130" ry="95" fill="#252525" opacity="0.8"/>
    <!-- Argyre basin depression -->
    <ellipse cx="773" cy="796" rx="90" ry="68" fill="#353535" opacity="0.7"/>

    <!-- Valles Marineris canyon chasm (cuts 7km deep into surface) -->
    <path d="M 520 575 Q 600 565 700 578 Q 780 588 860 572 Q 890 568 920 574" stroke="#101010" stroke-width="18" fill="none" opacity="0.95" stroke-linecap="round"/>

    <!-- Olympus Mons elevation cone (rising to 21km summit!) -->
    <circle cx="262" cy="405" r="76" fill="#C0C0C0" opacity="0.8"/>
    <circle cx="262" cy="405" r="56" fill="#D8D8D8" opacity="0.8"/>
    <circle cx="262" cy="405" r="35" fill="#FFFFFF" opacity="0.9"/>
    <!-- Caldera pit in summit -->
    <circle cx="262" cy="403" r="18" fill="#303030" opacity="0.85"/>

    <!-- Tharsis Montes volcanoes -->
    <circle cx="429" cy="444" r="34" fill="#E0E0E0" opacity="0.8"/>
    <circle cx="429" cy="444" r="14" fill="#303030" opacity="0.8"/>
    <circle cx="381" cy="507" r="30" fill="#E0E0E0" opacity="0.8"/>
    <circle cx="381" cy="507" r="12" fill="#303030" opacity="0.8"/>
    <circle cx="335" cy="559" r="36" fill="#E0E0E0" opacity="0.8"/>
    <circle cx="335" cy="559" r="16" fill="#303030" opacity="0.8"/>
    <circle cx="1740" cy="420" r="36" fill="#D5D5D5" opacity="0.75"/>

    <!-- Polar ice plateaus -->
    <ellipse cx="1024" cy="22" rx="550" ry="50" fill="#B8B8B8" opacity="0.6"/>
    <ellipse cx="1024" cy="1002" rx="420" ry="44" fill="#B0B0B0" opacity="0.6"/>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Generates a clean gray placeholder image (SVG data URI) for hardware exhibits.
 * Easily replace `exhibit.image` in EXHIBITS with any NASA archive image URL.
 */
export function createGrayHardwarePlaceholder(title: string, years: string, zone: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
    <rect width="800" height="500" fill="#27272A"/>
    <rect x="20" y="20" width="760" height="460" fill="#3F3F46" stroke="#52525B" stroke-width="2"/>
    <line x1="20" y1="20" x2="780" y2="480" stroke="#52525B" stroke-width="1" stroke-dasharray="6 6"/>
    <line x1="780" y1="20" x2="20" y2="480" stroke="#52525B" stroke-width="1" stroke-dasharray="6 6"/>
    <rect x="190" y="165" width="420" height="170" rx="6" fill="#27272A" stroke="#71717A" stroke-width="1.5"/>
    <text x="400" y="215" fill="#A1A1AA" font-family="monospace" font-size="13" text-anchor="middle" letter-spacing="2">GRAY PLACEHOLDER IMAGE</text>
    <text x="400" y="255" fill="#F4F4F5" font-family="sans-serif" font-weight="bold" font-size="22" text-anchor="middle">${title}</text>
    <text x="400" y="290" fill="#D4D4D8" font-family="monospace" font-size="14" text-anchor="middle">${zone.toUpperCase()} · ${years}</text>
    <text x="400" y="318" fill="#A1A1AA" font-family="monospace" font-size="11" text-anchor="middle">Replace exhibit.image URL with NASA photograph</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// ============================================================================
// 1. CENTRAL CONFIGURATION OBJECT (Replace placeholder texture URLs here)
// ============================================================================
export const CONFIG: MuseumConfig = {
  // Exact pinned version of globe.gl from jsDelivr CDN
  globeCdnUrl: 'https://cdn.jsdelivr.net/npm/globe.gl@2.35.1/dist/globe.gl.min.js',
  textures: {
    Moon: {
      // Replace globeImageUrl with your NASA LRO Moon texture URL when ready
      globeImageUrl: createMoonTexture(),
      bumpImageUrl: createMoonBumpMap(),
      atmosphereEnabled: false, // Strictly no atmosphere on the Moon
      label: 'The Moon (Luna)',
      subtitle: 'Earth’s airless rocky companion — home to Apollo landers, rovers, and robotic surveyors.',
      radiusKm: '1,737.4 km',
      gravity: '1.62 m/s² (0.166 g)',
    },
    Mars: {
      // Replace globeImageUrl with your NASA Viking / MGS Mars texture URL when ready
      globeImageUrl: createMarsTexture(),
      bumpImageUrl: createMarsBumpMap(),
      atmosphereEnabled: true,
      atmosphereColor: '#F97316',
      atmosphereAltitude: 0.14,
      label: 'Mars (The Red Planet)',
      subtitle: 'A world inhabited entirely by robots — rovers, landers, and the first aircraft to fly on another planet.',
      radiusKm: '3,389.5 km',
      gravity: '3.72 m/s² (0.38 g)',
    },
  },
  placeholderImageBase: createGrayHardwarePlaceholder('NASA Hardware Exhibit', 'Archive', 'Space'),
};

// ============================================================================
// 2. CENTRAL EXHIBIT DATA ARRAY (Single source of truth for the entire site)
// ============================================================================
export const EXHIBITS: Exhibit[] = [
  // ------------------------------ MOON EXHIBITS ------------------------------
  {
    id: 'apollo-11-eagle',
    zone: 'Moon',
    name: 'Apollo 11 Lunar Module "Eagle"',
    years: '1969',
    status: 'SILENT',
    lat: 0.6741,
    lng: 23.473,
    story:
      'On July 20, 1969, the Lunar Module Eagle carried Neil Armstrong and Buzz Aldrin to a safe touchdown on the Sea of Tranquility with less than 30 seconds of landing fuel remaining. When the astronauts blasted off to rejoin command module Columbia, Eagle’s gold-foiled descent stage stayed behind as their launch pad. Because the Moon has no wind or rain, the octagonal base and the astronauts’ bootprints around it remain preserved in the gray lunar dust.',
    learned:
      'Proved that humans could land precisely on another world, walk on its surface, and return ancient volcanic basalt rocks that revealed the Moon formed over 4.5 billion years ago.',
    hardware:
      'A four-legged spider-like landing base wrapped in shiny gold thermal blankets to block extreme heat and cold, plus a throttleable rocket engine and shock-absorbing aluminum honeycomb legs.',
    planned: '21.6 hours on surface',
    actual: '21.6 hours active (resting intact since 1969)',
    source: 'https://science.nasa.gov/mission/apollo-11/',
    image: createGrayHardwarePlaceholder('Apollo 11 "Eagle" Descent Stage', '1969', 'Moon'),
    landingSite: 'Mare Tranquillitatis (Sea of Tranquility)',
    massKg: '2,033 kg (dry descent stage)',
  },
  {
    id: 'apollo-11-lrrr',
    zone: 'Moon',
    name: 'Apollo 11 Laser Retroreflector',
    years: '1969–Present',
    status: 'STILL WORKING',
    lat: 0.6734,
    lng: 23.4729,
    story:
      'Placed on the lunar soil just steps away from the Apollo 11 lander, this suitcase-sized tray of special glass prisms requires zero batteries or electricity. Observatories on Earth fire powerful laser pulses at it and time how long a single photon takes to bounce back. More than five decades after Apollo 11 left the Moon, scientists still bounce lasers off this mirror array every week.',
    learned:
      'Revealed that the Moon is slowly spiraling away from Earth by about 3.8 centimeters (1.5 inches) every single year—about the speed your fingernails grow—and proved the Moon has a partially fluid core.',
    hardware:
      'An aluminum frame holding 100 fused-silica "corner-cube" prisms that bounce any incoming beam of light straight back in the exact direction it came from.',
    planned: '10 years of measurements',
    actual: '55+ years (still reflecting lasers today)',
    source: 'https://science.nasa.gov/mission/apollo-11/',
    image: createGrayHardwarePlaceholder('Apollo 11 Laser Retroreflector', '1969–Present', 'Moon'),
    landingSite: 'Mare Tranquillitatis (Sea of Tranquility)',
    massKg: '23.6 kg',
    plannedVsRealityFeatured: true,
    plannedRatioPercent: 18,
    multiplierText: '5.5× longer and counting',
  },
  {
    id: 'surveyor-3',
    zone: 'Moon',
    name: 'Surveyor 3 Robotic Lander',
    years: '1967–1969',
    status: 'SILENT',
    lat: -3.0155,
    lng: -23.418,
    story:
      'Surveyor 3 bounced twice during its automated landing in the Ocean of Storms in April 1967 before settling inside a gentle crater. It used a small mechanical scoop to dig trenches and test how strong the lunar soil was before human astronauts arrived. Two and a half years later, Apollo 12 astronauts Pete Conrad and Alan Bean landed right next to it and walked over to inspect the dusty robot in person.',
    learned:
      'Confirmed that the lunar surface was firm enough to support heavy Apollo spacecraft without sinking, and showed how solar radiation and micrometeorites weather metal and glass over time.',
    hardware:
      'A triangular aluminum frame with three folding shock-absorber legs, a rotating mirror television camera, and an electric claw arm on a folding pantograph hinge.',
    planned: '14 Earth days (1 lunar day)',
    actual: '14 days active (visited by astronauts in 1969)',
    source: 'https://science.nasa.gov/mission/surveyor-3/',
    image: createGrayHardwarePlaceholder('Surveyor 3 Lander', '1967–1969', 'Moon'),
    landingSite: 'Oceanus Procellarum (Ocean of Storms)',
    massKg: '296 kg (landed mass)',
  },
  {
    id: 'apollo-15-rover',
    zone: 'Moon',
    name: 'Apollo 15 Lunar Roving Vehicle',
    years: '1971',
    status: 'SILENT',
    lat: 26.1322,
    lng: 3.6339,
    story:
      'Nicknamed the "Moon Buggy," this folding electric car arrived tucked tightly inside the side of the Apollo 15 lander like a giant mechanical origami kit. Astronauts Dave Scott and Jim Irwin unfolded it and drove 27.9 kilometers across rugged craters and along the edge of Hadley Rille canyon. Before leaving, they parked the rover and pointed its television camera at their spacecraft so people on Earth could watch them blast off live.',
    learned:
      'Allowed astronauts to travel far beyond walking distance to collect the famous 4.1-billion-year-old "Genesis Rock" from the Apennine Mountains.',
    hardware:
      'A featherweight aluminum chassis with four independent electric motors, woven piano-wire mesh tires that never go flat, and a T-shaped joystick controller instead of a steering wheel.',
    planned: '3 lunar surface drives (~3 hours total)',
    actual: '3 hours 2 minutes driven (27.9 km)',
    source: 'https://science.nasa.gov/mission/apollo-15/',
    image: createGrayHardwarePlaceholder('Apollo 15 Lunar Roving Vehicle', '1971', 'Moon'),
    landingSite: 'Hadley–Apennine Region',
    massKg: '210 kg (empty weight on Earth)',
  },
  {
    id: 'ladee',
    zone: 'Moon',
    name: 'LADEE Lunar Atmosphere Explorer',
    years: '2013–2014',
    status: 'ENDED ON PURPOSE',
    lat: 11.97,
    lng: -93.25,
    story:
      'The Lunar Atmosphere and Dust Environment Explorer (LADEE) skimmed just 20 kilometers above the Moon’s craters to study its ultra-thin exosphere and floating dust particles. Because the Moon’s lumpy gravity pulls low-flying spacecraft downward once their fuel runs out, engineers steered LADEE to crash on the far side of the Moon away from historic Apollo landing sites. It struck the rim of Sundman V crater at over 5,800 kilometers per hour in April 2014.',
    learned:
      'Discovered that tiny meteoroid showers constantly kick up a halo of microscopic lunar dust and measured neon, helium, and argon atoms in the Moon’s whisper-thin exosphere.',
    hardware:
      'A modular carbon-composite cylinder carrying a dust impact detector, an ultraviolet spectrometer, and a high-speed laser communications terminal that beamed data to Earth at broadband speeds.',
    planned: '100 days of science',
    actual: '128 days of science (deliberate far-side impact)',
    source: 'https://science.nasa.gov/mission/ladee/',
    image: createGrayHardwarePlaceholder('LADEE Lunar Orbiter', '2013–2014', 'Moon'),
    landingSite: 'Sundman V Crater Rim (Lunar Far Side)',
    massKg: '248.2 kg (dry mass)',
  },

  // ------------------------------ MARS EXHIBITS ------------------------------
  {
    id: 'ingenuity',
    zone: 'Mars',
    name: 'Ingenuity',
    years: '2021–2024',
    status: 'SILENT',
    lat: 18.4447,
    lng: 77.4508,
    story:
      'Tucked underneath the belly of the Perseverance rover, Ingenuity was designed as a risky 30-day experiment to see if a helicopter could fly in Mars’s paper-thin air, which has just 1% the density of Earth’s atmosphere. Not only did it lift off on April 19, 2021—carrying a postage-stamp piece of fabric from the Wright brothers’ 1903 airplane—it transformed into an aerial scout for the rover. After 72 flights across nearly three years, a hard landing in sandy ripples damaged its carbon-fiber rotor blades in January 2024, leaving it standing upright in Valinor Hills.',
    learned:
      'Proved that powered, controlled flight is possible in the ultra-thin Martian atmosphere and scouted rocky trails from the air to help rovers plan safer routes.',
    hardware:
      'A tissue-box-sized body weighing just 1.8 kilograms on Earth, spun aloft by two 1.2-meter carbon-fiber propellers rotating at 2,400 RPM—about five times faster than a passenger helicopter on Earth.',
    planned: '5 flights',
    actual: '72 flights',
    source: 'https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/',
    image: createGrayHardwarePlaceholder('Ingenuity Mars Helicopter', '2021–2024', 'Mars'),
    landingSite: 'Jezero Crater / Valinor Hills',
    massKg: '1.8 kg',
    plannedVsRealityFeatured: true,
    plannedRatioPercent: 7,
    multiplierText: '14.4× more flights than planned',
  },
  {
    id: 'opportunity',
    zone: 'Mars',
    name: 'Opportunity',
    years: '2004–2018',
    status: 'SILENT',
    lat: -1.9462,
    lng: -5.5266,
    story:
      'Bouncing to a stop inside a giant cluster of airbags in January 2004, Opportunity rolled out into Eagle Crater on a mission expected to last just 90 Martian days before dust smothered its solar panels. Instead, helpful Martian whirlwinds repeatedly blew the dust off its wings, allowing "Oppy" to drive a record-shattering 45.16 kilometers—more than a full marathon on another planet. In June 2018, a planet-encircling dust storm blotted out the Sun over Perseverance Valley, putting the rover into a deep sleep from which it never woke.',
    learned:
      'Found tiny spherical mineral "blueberries" made of hematite and ancient gypsum veins that proved liquid water once soaked the ground and pooled on the surface of Mars.',
    hardware:
      'A six-wheeled golf-cart-sized solar rover with a "rocker-bogie" suspension that climbed over boulders, a panoramic camera mast at human eye level, and a diamond-tipped rock abrasion grinder on its robotic arm.',
    planned: '90 days',
    actual: 'about 14 years',
    source: 'https://science.nasa.gov/mission/mer-opportunity/',
    image: createGrayHardwarePlaceholder('Opportunity Rover (MER-B)', '2004–2018', 'Mars'),
    landingSite: 'Meridiani Planum / Perseverance Valley',
    massKg: '185 kg',
    plannedVsRealityFeatured: true,
    plannedRatioPercent: 2,
    multiplierText: '57× longer than planned (5,111 sols)',
  },
  {
    id: 'curiosity',
    zone: 'Mars',
    name: 'Curiosity',
    years: '2012–Present',
    status: 'STILL WORKING',
    lat: -4.5895,
    lng: 137.4417,
    story:
      'Too heavy for landing airbags, Curiosity was lowered to the floor of Gale Crater in August 2012 on steel cables from a hovering rocket-powered "Sky Crane." For over a decade, the car-sized rover has been steadily climbing the layered foothills of Mount Sharp, drilling dozens of holes into ancient mudstones and sandstones. Even with battered aluminum wheels punctured by sharp Martian rocks, Curiosity continues analyzing rock powder in its onboard chemistry labs today.',
    learned:
      'Discovered that ancient Gale Crater held a calm freshwater lake billions of years ago with all the chemical building blocks—carbon, hydrogen, nitrogen, oxygen, phosphorus, and sulfur—needed to support microbial life.',
    hardware:
      'An SUV-sized rolling laboratory powered by a heat-generating plutonium battery (MMRTG), equipped with a rock-vaporizing head laser (ChemCam), a rotary percussion drill, and two internal chemical ovens.',
    planned: '2 years',
    actual: '12+ years (still climbing Mount Sharp)',
    source: 'https://science.nasa.gov/mission/msl-curiosity/',
    image: createGrayHardwarePlaceholder('Curiosity Rover (MSL)', '2012–Present', 'Mars'),
    landingSite: 'Gale Crater / Aeolis Mons (Mount Sharp)',
    massKg: '899 kg',
    plannedVsRealityFeatured: true,
    plannedRatioPercent: 16,
    multiplierText: '6× planned lifetime and still active',
  },
  {
    id: 'perseverance',
    zone: 'Mars',
    name: 'Perseverance',
    years: '2021–Present',
    status: 'STILL WORKING',
    lat: 18.38,
    lng: 77.58,
    story:
      'Touching down in the ancient river delta of Jezero Crater in February 2021, Perseverance is the most advanced robotic astrobiologist ever sent to Mars. As it drives across dried-up riverbeds and crater rims, it cores chalk-sized cylinders of Martian rock and seals them inside ultra-clean titanium tubes for a future return mission to Earth. Along the way, it recorded the first actual audio of Martian wind and produced breathable oxygen straight out of Mars’s carbon dioxide air.',
    learned:
      'Collected core samples of igneous and sedimentary lakebed rocks containing organic molecules and proved with the MOXIE experiment that future astronauts can manufacture oxygen directly from the Martian atmosphere.',
    hardware:
      'A nuclear-powered six-wheeled rover featuring 23 cameras, two microphones, a ground-penetrating radar, an oxygen-making toaster-sized box (MOXIE), and a complex robotic carousel of 43 titanium sample tubes.',
    planned: '2 years',
    actual: '4+ years (actively collecting samples)',
    source: 'https://science.nasa.gov/mission/mars-2020-perseverance/',
    image: createGrayHardwarePlaceholder('Perseverance Rover', '2021–Present', 'Mars'),
    landingSite: 'Jezero Crater River Delta',
    massKg: '1,025 kg',
  },
  {
    id: 'sojourner',
    zone: 'Mars',
    name: 'Sojourner',
    years: '1997',
    status: 'SILENT',
    lat: 19.13,
    lng: -33.22,
    story:
      'On July 4, 1997, the Mars Pathfinder lander unfolded its petal-like ramps in Ares Vallis and released Sojourner, the very first wheeled rover ever to drive on Mars. Only about the size of a microwave oven, Sojourner stayed close to its base station so Pathfinder could relay its radio signals back to Earth. It spent 83 Martian days sniffing boulders given cartoon names like "Barnacle Bill" and "Yogi" before the base lander’s battery grew too cold to wake up.',
    learned:
      'Demonstrated that low-cost airbag landings and small six-wheeled rovers work on Mars, and found rounded pebbles suggesting catastrophic ancient floods once rushed through Ares Vallis.',
    hardware:
      'A 10.6-kilogram six-wheeled mini-rover topped with a flat solar panel, insulated against freezing Martian nights with ultra-light silica aerogel ("frozen smoke"), and carrying an X-ray rock sensor on its nose.',
    planned: '7 days',
    actual: '83 days',
    source: 'https://science.nasa.gov/mission/mars-pathfinder/',
    image: createGrayHardwarePlaceholder('Sojourner Rover', '1997', 'Mars'),
    landingSite: 'Ares Vallis (Carl Sagan Memorial Station)',
    massKg: '10.6 kg',
    plannedVsRealityFeatured: true,
    plannedRatioPercent: 8,
    multiplierText: '11.8× longer than planned',
  },
  {
    id: 'insight',
    zone: 'Mars',
    name: 'InSight Lander',
    years: '2018–2022',
    status: 'SILENT',
    lat: 4.5024,
    lng: 135.6234,
    story:
      'Unlike rovers built to roll across craters, InSight landed on the flat plains of Elysium Planitia in November 2018 to stay completely still and listen to the heartbeat of Mars. Using its robotic arm, it placed an ultra-sensitive dome-covered seismometer directly onto the ground to detect rumbles deep inside the planet. Over four years, fine red dust gradually coated its round solar panels until the lander sent home one final dusty selfie in December 2022 and powered down forever.',
    learned:
      'Detected more than 1,300 "marsquakes" and meteoroid impacts, allowing scientists to measure the exact thickness of Mars’s crust, mantle, and surprisingly large liquid iron-alloy core.',
    hardware:
      'A stationary three-legged platform with two circular fan-folded solar arrays, a robotic arm, a weather station, and a vacuum-sealed seismic sensor sensitive enough to detect vibrations smaller than a hydrogen atom.',
    planned: '2 years',
    actual: '4 years',
    source: 'https://science.nasa.gov/mission/insight/',
    image: createGrayHardwarePlaceholder('InSight Mars Lander', '2018–2022', 'Mars'),
    landingSite: 'Elysium Planitia',
    massKg: '358 kg',
  },

  // --------------------------- DEEP SPACE EXHIBITS ---------------------------
  {
    id: 'voyager-1',
    zone: 'Deep Space',
    name: 'Voyager 1',
    years: '1977–Present',
    status: 'STILL WORKING',
    lat: 34.9,
    lng: -101.2,
    story:
      'Launched on September 5, 1977, Voyager 1 flew past Jupiter and Saturn before using Saturn’s gravity to sling itself northward out of the plane of the planets. On Valentine’s Day 1990, from 6 billion kilometers away, it turned its camera backward one last time to snap the famous "Pale Blue Dot" portrait of Earth suspended in a sunbeam. In August 2012, Voyager 1 crossed the heliopause to become the first human-made object to enter interstellar space, where it still whispers back to Earth across more than 22light-hours of emptiness.',
    learned:
      'Revealed active volcanoes on Jupiter’s moon Io, intricate ringlets and shepherd moons at Saturn, a thick nitrogen haze on Titan, and the first direct particle readings of the interstellar medium between the stars.',
    hardware:
      'A 10-sided electronics bus crowned by a 3.7-meter white dish antenna, powered by three plutonium radioisotope generators, running on 69 kilobytes of computer memory, and carrying the gold-plated Copper Phonograph Record of Earth sounds and greetings.',
    planned: '5 years (Jupiter & Saturn flybys)',
    actual: '47+ years (still communicating from interstellar space)',
    source: 'https://science.nasa.gov/mission/voyager/voyager-1/',
    image: createGrayHardwarePlaceholder('Voyager 1 Interstellar Probe', '1977–Present', 'Deep Space'),
    distanceFromEarth: '24.6 billion km (164.5 AU)',
    distanceAu: 164.5,
    landingSite: 'Interstellar Space (Constellation Ophiuchus direction)',
    massKg: '721.9 kg (launch mass)',
    plannedVsRealityFeatured: true,
    plannedRatioPercent: 10,
    multiplierText: '9.5× planned lifetime and still transmitting',
  },
  {
    id: 'pioneer',
    zone: 'Deep Space',
    name: 'Pioneer 10',
    years: '1972–2003',
    status: 'SILENT',
    lat: 26.0,
    lng: 71.4,
    story:
      'Launched in March 1972, Pioneer 10 was humanity’s trailblazer to the outer Solar System: the first spacecraft ever to navigate through the Asteroid Belt and the first to fly closely past giant Jupiter. After surviving Jupiter’s fierce radiation belts, its trajectory flung it onto an escape path heading toward the red star Aldebaran in the constellation Taurus. NASA heard Pioneer 10’s last faint radio beep on January 23, 2003, from 12 billion kilometers away, and the silent probe continues coasting through the dark at 43,000 km/h.',
    learned:
      'Proved that spacecraft could safely cross the Asteroid Belt without being destroyed and mapped Jupiter’s enormous magnetic field and intense radiation belts so later missions like Voyager and Galileo could survive.',
    hardware:
      'A lightweight spin-stabilized dish spacecraft powered by four plutonium SNAP-19 nuclear generators on long booms, carrying a gold-anodized aluminum plaque engraved with drawings of a man, a woman, and a map showing Earth’s cosmic address.',
    planned: '21 months',
    actual: '30 years and 10 months of radio contact',
    source: 'https://science.nasa.gov/mission/pioneer-10/',
    image: createGrayHardwarePlaceholder('Pioneer 10 Deep Space Probe', '1972–2003', 'Deep Space'),
    distanceFromEarth: '20.1 billion km (134.4 AU)',
    distanceAu: 134.4,
    landingSite: 'Outer Heliosphere / Heading toward Aldebaran (Taurus)',
    massKg: '258 kg',
  },
  {
    id: 'cassini',
    zone: 'Deep Space',
    name: 'Cassini',
    years: '1997–2017',
    status: 'ENDED ON PURPOSE',
    lat: -9.4,
    lng: -53.0,
    story:
      'After a seven-year journey from Earth, the school-bus-sized Cassini spacecraft entered orbit around Saturn in 2004 and dropped the European Huygens lander onto the hazy moon Titan. For 13 years, Cassini looped through the Saturnian system and discovered towering geysers of salty water spraying out of the icy moon Enceladus. Because Enceladus and Titan might harbor conditions suitable for life, NASA engineers decided not to leave Cassini drifting when its fuel ran low; on September 15, 2017, they steered it to burn up like a meteor inside Saturn’s golden clouds.',
    learned:
      'Discovered a warm subsurface ocean shooting water plumes out of Enceladus, liquid methane lakes and rain on Titan, and sampled the inner gap between Saturn’s cloud tops and its rings during 22 daring "Grand Finale" dives.',
    hardware:
      'A 6.7-meter-tall flagpole of science instruments with 12 sensors, a 4-meter high-gain dish antenna, dual rocket engines, and three radioisotope power generators—all vaporized inside Saturn to keep icy moons pristine.',
    planned: '4 years in Saturn orbit',
    actual: '13 years at Saturn (20 years total in space)',
    source: 'https://science.nasa.gov/mission/cassini/',
    image: createGrayHardwarePlaceholder('Cassini Saturn Orbiter', '1997–2017', 'Deep Space'),
    distanceFromEarth: '1.43 billion km (9.5 AU — Saturn Atmosphere)',
    distanceAu: 9.5,
    landingSite: 'Vaporized in Saturn’s Upper Atmosphere (9.4° S, 53° W)',
    massKg: '2,125 kg (dry orbiter mass)',
  },
];

// ============================================================================
// 3. QUIZ GENERATOR ("Guess the machine" — built from central EXHIBITS array)
// ============================================================================
export function getQuizQuestions(exhibits: Exhibit[]): QuizQuestion[] {
  const findExhibit = (id: string) => exhibits.find((e) => e.id === id)!;

  const ingenuity = findExhibit('ingenuity');
  const opportunity = findExhibit('opportunity');
  const voyager1 = findExhibit('voyager-1');
  const cassini = findExhibit('cassini');
  const surveyor3 = findExhibit('surveyor-3');

  return [
    {
      id: 'q1',
      exhibitId: ingenuity.id,
      zone: ingenuity.zone,
      prompt:
        'I rode to Mars tucked under the belly of a larger rover for a 30-day flight test in air just 1% as thick as Earth’s. Instead of stopping after 5 flights, I completed 72 flights before a sandy landing damaged my rotor blades in 2024. Which machine am I?',
      clueFromStory: ingenuity.story,
      options: ['Ingenuity', 'Sojourner', 'Curiosity', 'Apollo 15 Lunar Roving Vehicle'],
      correctAnswer: ingenuity.name,
    },
    {
      id: 'q2',
      exhibitId: opportunity.id,
      zone: opportunity.zone,
      prompt:
        'I bounced onto Mars inside giant airbags in 2004 with a planned lifetime of only 90 days. Helpful Martian whirlwinds kept cleaning dust off my solar panels, letting me drive more than a marathon (45.16 km) over about 14 years until a global dust storm put me to sleep in 2018. Which machine am I?',
      clueFromStory: opportunity.story,
      options: ['InSight Lander', 'Opportunity', 'Perseverance', 'Surveyor 3 Robotic Lander'],
      correctAnswer: opportunity.name,
    },
    {
      id: 'q3',
      exhibitId: voyager1.id,
      zone: voyager1.zone,
      prompt:
        'Launched in 1977, I snapped the famous "Pale Blue Dot" photo of Earth from 6 billion kilometers away and carry a Golden Record of Earth sounds. In 2012, I became the first human-made object to enter interstellar space—and I am STILL WORKING today. Which machine am I?',
      clueFromStory: voyager1.story,
      options: ['Pioneer 10', 'Voyager 1', 'Cassini', 'LADEE Lunar Atmosphere Explorer'],
      correctAnswer: voyager1.name,
    },
    {
      id: 'q4',
      exhibitId: cassini.id,
      zone: cassini.zone,
      prompt:
        'I spent 13 years orbiting Saturn, dropped the Huygens probe onto Titan, and discovered icy water geysers spraying from Enceladus. When my fuel ran low in 2017, my mission was ENDED ON PURPOSE by diving into Saturn’s clouds to keep its moons clean. Which machine am I?',
      clueFromStory: cassini.story,
      options: ['Cassini', 'Pioneer 10', 'Voyager 1', 'InSight Lander'],
      correctAnswer: cassini.name,
    },
    {
      id: 'q5',
      exhibitId: surveyor3.id,
      zone: surveyor3.zone,
      prompt:
        'I bounced twice while landing in the Moon’s Ocean of Storms in April 1967 and used a small mechanical scoop to test the lunar soil. Two and a half years later, Apollo 12 astronauts landed right next to me and walked over to inspect me in person! Which machine am I?',
      clueFromStory: surveyor3.story,
      options: [
        'Apollo 11 Lunar Module "Eagle"',
        'Surveyor 3 Robotic Lander',
        'Apollo 11 Laser Retroreflector',
        'LADEE Lunar Atmosphere Explorer',
      ],
      correctAnswer: surveyor3.name,
    },
  ];
}
