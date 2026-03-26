export interface CalcMeta {
  id: string
  manufacturer: string
  model: string
  type: string
  year: number
  thumbLabel: string
  thumbBg: string
  thumbBorder: string
  thumbText: string
  accentColor: string
  glowColor: string
}

export const CALCULATORS: CalcMeta[] = [
  {
    id: 'ti30',
    manufacturer: 'Texas Instruments',
    model: 'TI-30',
    type: 'Scientific',
    year: 1976,
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
    type: 'Financial',
    year: 1981,
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
    type: 'Graphing',
    year: 1985,
    thumbLabel: 'fx',
    thumbBg: '#14141e',
    thumbBorder: 'rgba(150,148,210,0.2)',
    thumbText: 'rgba(155,152,218,0.65)',
    accentColor: 'rgba(155,152,218,1)',
    glowColor: 'rgba(150,148,210,0.06)',
  },
]
