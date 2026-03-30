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
  { id: 'early',     label: 'Early Electronic', calcIds: ['sharpqt8d'] },
  { id: 'led',       label: 'LED Era',           calcIds: ['ti30'] },
  { id: 'financial', label: 'Financial',         calcIds: ['hp12c'] },
  { id: 'graphing',  label: 'Graphing',          calcIds: ['casiofx7000g'] },
]
