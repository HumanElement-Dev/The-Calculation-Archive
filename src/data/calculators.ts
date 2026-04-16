export interface CalcMeta {
  id: string
  manufacturer: string
  model: string
  fullName: string
  type: string
  category: string
  year: number
  description: string
  launchPrice: string
  launchPriceToday: string
  displayType: string
  functions: number
  power: string
  weight: string
  notes: string[]
  thumbLabel: string
  thumbBg: string
  thumbBorder: string
  thumbText: string
  accentColor: string
  glowColor: string
}

export interface CategoryGroup {
  id: string
  label: string
  calcIds: string[]
  icon: string   // SVG path d-attribute (16×16 viewBox)
  iconType?: 'fill' | 'stroke'  // default fill; stroke for line-art icons
}

export const CALCULATORS: CalcMeta[] = [
  {
    id: 'sharpqt8d',
    manufacturer: 'Sharp',
    model: 'micro Compet QT-8D',
    fullName: 'Sharp micro Compet QT-8D',
    type: 'Basic',
    category: 'early',
    year: 1969,
    description:
      'One of the first truly pocket-sized electronic calculators, the QT-8D used a vacuum fluorescent display and ran on batteries — a radical departure from the room-filling machines of its era.',
    launchPrice: '$345',
    launchPriceToday: '≈ $2,900 today',
    displayType: '8-digit VFD',
    functions: 4,
    power: '4 × AA batteries',
    weight: '0.48 lbs',
    notes: [
      'Among the first truly pocket-sized calculators',
      'Vacuum fluorescent display — distinctive warm green glow',
      "Sold alongside Sharp's desktop Compet line",
    ],
    thumbLabel: 'QT',
    thumbBg: '#c0beb8',
    thumbBorder: 'rgba(40,40,35,0.18)',
    thumbText: 'rgba(30,30,28,0.65)',
    accentColor: 'rgba(50,50,48,1)',
    glowColor: 'rgba(26,255,144,0.06)',
  },
  {
    id: 'ti30',
    manufacturer: 'Texas Instruments',
    model: 'TI-30',
    fullName: 'Texas Instruments TI-30',
    type: 'Scientific',
    category: 'led',
    year: 1976,
    description:
      'The TI-30 democratised scientific computing. At $24.95 it undercut every competitor and became the defining calculator of secondary education, selling millions in its first years alone.',
    launchPrice: '$24.95',
    launchPriceToday: '≈ $135 today',
    displayType: '8-digit LED',
    functions: 31,
    power: '9V battery',
    weight: '0.35 lbs',
    notes: [
      'Best-selling scientific calculator of its era',
      'Replaced the slide rule in classrooms worldwide',
      'LED display legible in full daylight',
    ],
    thumbLabel: 'TI',
    thumbBg: '#211d0d',
    thumbBorder: 'rgba(210,160,40,0.2)',
    thumbText: 'rgba(210,160,40,0.7)',
    accentColor: 'rgba(210,160,40,1)',
    glowColor: 'rgba(200,155,45,0.07)',
  },
  {
    id: 'hp12c',
    manufacturer: 'Hewlett-Packard',
    model: 'HP-12C',
    fullName: 'Hewlett-Packard HP-12C',
    type: 'Financial',
    category: 'financial',
    year: 1981,
    description:
      'The HP-12C has been in continuous production since 1981 — longer than any other calculator in history. Its RPN input and gold-standard financial functions made it the essential tool of Wall Street for four decades.',
    launchPrice: '$150',
    launchPriceToday: '≈ $510 today',
    displayType: '10-digit LCD',
    functions: 120,
    power: '3 × button cells',
    weight: '0.2 lbs',
    notes: [
      'In continuous production since 1981',
      'Required on CFA examinations',
      'Reverse Polish Notation input system',
    ],
    thumbLabel: 'hp',
    thumbBg: '#0e1220',
    thumbBorder: 'rgba(70,110,210,0.25)',
    thumbText: 'rgba(80,130,220,0.7)',
    accentColor: 'rgba(80,130,220,1)',
    glowColor: 'rgba(70,110,210,0.07)',
  },
  {
    id: 'win1',
    manufacturer: 'Microsoft',
    model: 'Calculator',
    fullName: 'Microsoft Windows 1.0 Calculator',
    type: 'Software',
    category: 'software',
    year: 1985,
    description:
      'Shipped with Windows 1.0 on November 20, 1985, this was the first calculator most PC users ever touched. Its dithered periwinkle body and yellow menu bar are pure EGA-era artefacts — colours that could only exist as 2×2 pixel checkerboard patterns on the hardware of the day.',
    launchPrice: 'Bundled with Windows 1.0',
    launchPriceToday: '≈ $115 today (Windows 1.0 retail)',
    displayType: 'GUI window',
    functions: 14,
    power: 'AC (PC)',
    weight: '—',
    notes: [
      'First ever Windows application for most users',
      'Body colour simulated via EGA pixel dithering',
      'Standard mode only — no scientific view',
    ],
    thumbLabel: '1.0',
    thumbBg: '#000080',
    thumbBorder: 'rgba(255,255,0,0.35)',
    thumbText: 'rgba(255,255,0,0.85)',
    accentColor: 'rgba(255,255,0,1)',
    glowColor: 'rgba(0,0,128,0.08)',
  },
  {
    id: 'win31',
    manufacturer: 'Microsoft',
    model: 'Calculator',
    fullName: 'Microsoft Windows 3.1 Calculator',
    type: 'Software',
    category: 'software',
    year: 1992,
    description:
      'Bundled with Windows 3.1 in 1992, this calculator was millions of users\' first encounter with a desktop GUI application. Its beveled 3D buttons and navy title bar became the defining visual language of an era.',
    launchPrice: 'Bundled with Windows 3.1',
    launchPriceToday: '≈ $65 today (Windows 3.1 retail)',
    displayType: 'GUI window',
    functions: 18,
    power: 'AC (PC)',
    weight: '—',
    notes: [
      'Shipped with Windows 3.1 and Windows 95',
      'Introduced millions to GUI software interaction',
      'Classic Win32 beveled 3D visual style',
    ],
    thumbLabel: '3.1',
    thumbBg: '#000080',
    thumbBorder: 'rgba(192,192,192,0.35)',
    thumbText: 'rgba(192,192,192,0.85)',
    accentColor: 'rgba(192,192,192,1)',
    glowColor: 'rgba(0,0,128,0.08)',
  },
  {
    id: 'waltons-primeline',
    manufacturer: 'Waltons',
    model: 'Primeline Workmate',
    fullName: 'Waltons Primeline Workmate Basic Calculator',
    type: 'Desktop',
    category: 'lcd',
    year: 2008,
    description:
      'A 12-digit solar-assisted desktop calculator from South African stationer Waltons. The Workmate is a classroom and office staple — known for its candy-colour body and satisfyingly chunky tactile buttons.',
    launchPrice: '≈ R49.95',
    launchPriceToday: '≈ R129 today',
    displayType: 'LCD (12-digit)',
    functions: 14,
    power: 'Solar + LR1130 battery',
    weight: '0.26 lbs',
    notes: [
      'South African classroom and office staple',
      'Available in multiple candy colours',
      'Solar-assisted with battery backup',
    ],
    thumbLabel: 'WP',
    thumbBg: '#e8006e',
    thumbBorder: 'rgba(255,255,255,0.25)',
    thumbText: 'rgba(255,255,255,0.90)',
    accentColor: 'rgba(255,80,160,1)',
    glowColor: 'rgba(232,0,110,0.10)',
  },
  {
    id: 'casiofx7000g',
    manufacturer: 'Casio',
    model: 'fx-7000G',
    fullName: 'Casio fx-7000G',
    type: 'Graphing',
    category: 'graphing',
    year: 1985,
    description:
      "The world's first graphing calculator. The fx-7000G brought function plotting to a pocket device, reshaping mathematics education and setting the template for every graphing calculator that followed.",
    launchPrice: '$89.95',
    launchPriceToday: '≈ $260 today',
    displayType: 'Dot-matrix LCD',
    functions: 82,
    power: '2 × CR2025',
    weight: '0.19 lbs',
    notes: [
      "World's first consumer graphing calculator",
      '64 × 96 pixel LCD — revolutionary for 1985',
      'Established the graphing calculator as a product category',
    ],
    thumbLabel: 'fx',
    thumbBg: '#14141e',
    thumbBorder: 'rgba(150,148,210,0.2)',
    thumbText: 'rgba(155,152,218,0.65)',
    accentColor: 'rgba(155,152,218,1)',
    glowColor: 'rgba(150,148,210,0.06)',
  },
]

export const CATEGORIES: CategoryGroup[] = [
  {
    id: 'mechanical',
    label: 'Mechanical',
    calcIds: [],
    icon: 'M7 1v2.1A5 5 0 0 0 4.2 4.6L2.4 3.6 1 5l1 1.8A5 5 0 0 0 2 8a5 5 0 0 0 .1 1.2L1 11l1.4 1.4 1.8-1A5 5 0 0 0 7 12.9V15h2v-2.1A5 5 0 0 0 11.8 11.4l1.8 1 1.4-1.4-1-1.8A5 5 0 0 0 14 8a5 5 0 0 0-.1-1.2L15 5 13.6 3.6l-1.8 1A5 5 0 0 0 9 3.1V1H7zm1 5a2 2 0 1 1 0 4 2 2 0 0 1 0-4z',
  },
  {
    id: 'early',
    label: 'Early Electronic',
    calcIds: ['sharpqt8d'],
    icon: 'M4 5h8a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm1 2v2h2V7H5zm3 0v2h2V7H8z',
  },
  {
    id: 'led',
    label: 'LED Era',
    calcIds: ['ti30'],
    icon: 'M4 2h8v1H4zM3 3h1v5H3zM12 3h1v5h-1zM4 7.5h8v1H4zM3 8.5h1v5H3zM12 8.5h1v5h-1zM4 13h8v1H4z',
  },
  {
    id: 'lcd',
    label: 'LCD Era',
    calcIds: ['waltons-primeline'],
    icon: 'M1 3h14v10H1V3zm1 1v8h12V4H2zm2 1h3v2H4V5zm5 0h3v2H9V5zm-5 3h3v2H4V8zm5 0h3v2H9V8z',
  },
  {
    id: 'graphing',
    label: 'Graphing',
    calcIds: ['casiofx7000g'],
    icon: 'M2 13L6 8l3 2 3-5 2 2',
    iconType: 'stroke',
  },
  {
    id: 'financial',
    label: 'Financial',
    calcIds: ['hp12c'],
    icon: 'M2 13V9h3v4H2zm4 0V6h3v7H6zm4 0V3h3v10h-3z',
  },
  {
    id: 'education',
    label: 'Education',
    calcIds: [],
    icon: 'M8 3L2 6v7h5.5V7H8v6H13.5V6L8 3z',
  },
  {
    id: 'modern',
    label: 'Modern',
    calcIds: [],
    icon: 'M2 2h5v5H2zM9 2h5v5H9zM2 9h5v5H2zM9 9h5v5H9z',
  },
  {
    id: 'software',
    label: 'Software',
    calcIds: ['win1', 'win31'],
    icon: 'M4 1v12l3-3 2 5 2-1-2-5 3.5-.5z',
  },
  {
    id: 'experimental',
    label: 'Experimental',
    calcIds: [],
    icon: 'M6 2h4v4l3 7H3L6 6V2zM5.5 2h5',
    iconType: 'stroke',
  },
]
