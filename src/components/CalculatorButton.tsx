import { useState } from 'react'

type Variant = 'num' | 'op' | 'fn' | 'eq' | 'clear'
type CalcFamily = 'ti' | 'hp' | 'casio' | 'sharp'

interface ButtonDef {
  bg: string
  color: string
  bottomFace: string      // the solid-face colour that creates depth
  topHighlight: string    // inset top-edge catchlight
  fontSize: string
  height: string
  borderRadius: string
}

interface CalculatorButtonProps {
  label: string
  secondaryLabel?: string
  variant: Variant
  calcFamily: CalcFamily
  onPress: () => void
  wide?: boolean
  style?: React.CSSProperties
}

// ---------------------------------------------------------------------------
// Colour tables — one row per variant per family
// ---------------------------------------------------------------------------

const TI: Record<Variant, ButtonDef> = {
  num: {
    bg: 'linear-gradient(175deg, #332c18 0%, #261e0c 100%)',
    color: 'rgba(245,235,200,0.88)',
    bottomFace: '#0f0b03',
    topHighlight: 'rgba(255,240,180,0.07)',
    fontSize: '11.5px',
    height: '30px',
    borderRadius: '5px',
  },
  op: {
    bg: 'linear-gradient(175deg, #3e2e0c 0%, #2e2006 100%)',
    color: 'rgba(235,170,55,1)',
    bottomFace: '#130b02',
    topHighlight: 'rgba(255,200,80,0.08)',
    fontSize: '11.5px',
    height: '30px',
    borderRadius: '5px',
  },
  fn: {
    bg: 'linear-gradient(175deg, #1e2838 0%, #141c2c 100%)',
    color: 'rgba(120,165,240,0.95)',
    bottomFace: '#07101e',
    topHighlight: 'rgba(120,160,255,0.06)',
    fontSize: '11.5px',
    height: '30px',
    borderRadius: '5px',
  },
  eq: {
    bg: 'linear-gradient(175deg, #1e3416 0%, #14240e 100%)',
    color: 'rgba(145,215,90,1)',
    bottomFace: '#080f05',
    topHighlight: 'rgba(140,220,80,0.07)',
    fontSize: '11.5px',
    height: '30px',
    borderRadius: '5px',
  },
  clear: {
    bg: 'linear-gradient(175deg, #3c1c1c 0%, #2c1010 100%)',
    color: 'rgba(235,105,90,1)',
    bottomFace: '#130505',
    topHighlight: 'rgba(255,100,90,0.07)',
    fontSize: '11.5px',
    height: '30px',
    borderRadius: '5px',
  },
}

const HP: Record<Variant, ButtonDef> = {
  num: {
    bg: 'linear-gradient(175deg, #272734 0%, #1c1c28 100%)',
    color: 'rgba(220,225,255,0.78)',
    bottomFace: '#0c0c18',
    topHighlight: 'rgba(255,255,255,0.05)',
    fontSize: '10.5px',
    height: '28px',
    borderRadius: '5px',
  },
  op: {
    bg: 'linear-gradient(175deg, #102040 0%, #0b1630 100%)',
    color: 'rgba(90,148,238,1)',
    bottomFace: '#050b18',
    topHighlight: 'rgba(90,140,240,0.07)',
    fontSize: '10.5px',
    height: '28px',
    borderRadius: '5px',
  },
  fn: {
    bg: 'linear-gradient(175deg, #2c1c0c 0%, #201408 100%)',
    color: 'rgba(235,165,60,1)',
    bottomFace: '#0e0804',
    topHighlight: 'rgba(235,165,60,0.07)',
    fontSize: '10.5px',
    height: '28px',
    borderRadius: '5px',
  },
  eq: {
    bg: 'linear-gradient(175deg, #1c2e12 0%, #121e0a 100%)',
    color: 'rgba(135,210,85,1)',
    bottomFace: '#080e05',
    topHighlight: 'rgba(135,210,85,0.07)',
    fontSize: '10.5px',
    height: '28px',
    borderRadius: '5px',
  },
  clear: {
    bg: 'linear-gradient(175deg, #272734 0%, #1c1c28 100%)',
    color: 'rgba(220,225,255,0.78)',
    bottomFace: '#0c0c18',
    topHighlight: 'rgba(255,255,255,0.05)',
    fontSize: '10.5px',
    height: '28px',
    borderRadius: '5px',
  },
}

const CA: Record<Variant, ButtonDef> = {
  num: {
    bg: 'linear-gradient(175deg, #242434 0%, #1a1a28 100%)',
    color: 'rgba(215,215,245,0.8)',
    bottomFace: '#0e0e1c',
    topHighlight: 'rgba(255,255,255,0.05)',
    fontSize: '9.5px',
    height: '22px',
    borderRadius: '4px',
  },
  op: {
    bg: 'linear-gradient(175deg, #1e1e32 0%, #16162a 100%)',
    color: 'rgba(165,165,235,0.95)',
    bottomFace: '#0c0c1a',
    topHighlight: 'rgba(165,165,235,0.06)',
    fontSize: '9.5px',
    height: '22px',
    borderRadius: '4px',
  },
  fn: {
    bg: 'linear-gradient(175deg, #1c2c1a 0%, #141e12 100%)',
    color: 'rgba(105,205,135,0.95)',
    bottomFace: '#0c1408',
    topHighlight: 'rgba(105,205,135,0.06)',
    fontSize: '9.5px',
    height: '22px',
    borderRadius: '4px',
  },
  eq: {
    bg: 'linear-gradient(175deg, #1e1e32 0%, #16162a 100%)',
    color: 'rgba(165,165,235,0.95)',
    bottomFace: '#0c0c1a',
    topHighlight: 'rgba(165,165,235,0.06)',
    fontSize: '9.5px',
    height: '22px',
    borderRadius: '4px',
  },
  clear: {
    bg: 'linear-gradient(175deg, #3a1e1e 0%, #2a1414 100%)',
    color: 'rgba(235,110,100,1)',
    bottomFace: '#180808',
    topHighlight: 'rgba(235,110,100,0.07)',
    fontSize: '9.5px',
    height: '22px',
    borderRadius: '4px',
  },
}

// Sharp micro Compet — light grey body, white/cream keys, blue 0/., red −=
const SH: Record<Variant, ButtonDef> = {
  // num: white/cream — all standard keys (7-9, 4-6, 1-3, C, ×÷, +=)
  num: {
    bg: 'linear-gradient(175deg, #e6e4dc 0%, #d4d2ca 100%)',
    color: '#1a1a18',
    bottomFace: '#9a9890',
    topHighlight: 'rgba(255,255,255,0.55)',
    fontSize: '14px',
    height: '38px',
    borderRadius: '7px',
  },
  // fn: blue — 0 and decimal point
  fn: {
    bg: 'linear-gradient(175deg, #5a7ec8 0%, #4a6ab8 100%)',
    color: '#ffffff',
    bottomFace: '#283e70',
    topHighlight: 'rgba(255,255,255,0.18)',
    fontSize: '14px',
    height: '38px',
    borderRadius: '7px',
  },
  // clear: red — the −= key
  clear: {
    bg: 'linear-gradient(175deg, #c83830 0%, #b02e28 100%)',
    color: '#ffffff',
    bottomFace: '#601810',
    topHighlight: 'rgba(255,255,255,0.12)',
    fontSize: '13px',
    height: '38px',
    borderRadius: '7px',
  },
  // op/eq not used on Sharp, fallback to neutral
  op: {
    bg: 'linear-gradient(175deg, #e6e4dc 0%, #d4d2ca 100%)',
    color: '#1a1a18',
    bottomFace: '#9a9890',
    topHighlight: 'rgba(255,255,255,0.55)',
    fontSize: '14px',
    height: '38px',
    borderRadius: '7px',
  },
  eq: {
    bg: 'linear-gradient(175deg, #e6e4dc 0%, #d4d2ca 100%)',
    color: '#1a1a18',
    bottomFace: '#9a9890',
    topHighlight: 'rgba(255,255,255,0.55)',
    fontSize: '14px',
    height: '38px',
    borderRadius: '7px',
  },
}

const DEFS: Record<CalcFamily, Record<Variant, ButtonDef>> = { ti: TI, hp: HP, casio: CA, sharp: SH }

// ---------------------------------------------------------------------------
// Shadow builder — the core technique
// The bottom face is a solid box-shadow offset that creates physical thickness.
// On press, translateY collapses the key down by exactly that amount.
// ---------------------------------------------------------------------------

const DEPTH = { ti: 4, hp: 4, casio: 3, sharp: 5 }

function buildShadow(def: ButtonDef, family: CalcFamily, pressed: boolean): string {
  const d = DEPTH[family]
  if (pressed) {
    return [
      `0 1px 0 ${def.bottomFace}`,
      `0 2px 6px rgba(0,0,0,0.5)`,
      `inset 0 1px 0 ${def.topHighlight}`,
      `inset 0 2px 4px rgba(0,0,0,0.25)`,
    ].join(', ')
  }
  return [
    `0 ${d}px 0 ${def.bottomFace}`,               // solid bottom face — the depth
    `0 ${d + 3}px 10px rgba(0,0,0,0.45)`,         // ambient cast shadow
    `inset 0 1px 0 ${def.topHighlight}`,           // top-edge catchlight
    `inset 0 -1px 0 rgba(0,0,0,0.2)`,             // bottom-edge inner darken
  ].join(', ')
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CalculatorButton({
  label,
  secondaryLabel,
  variant,
  calcFamily,
  onPress,
  wide,
  style: extraStyle,
}: CalculatorButtonProps) {
  const [pressed, setPressed] = useState(false)
  const def = DEFS[calcFamily][variant]
  const depth = DEPTH[calcFamily]

  const handleDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setPressed(true)
    onPress()
  }

  const handleUp = () => setPressed(false)

  const secondaryColor =
    calcFamily === 'ti'
      ? 'rgba(120,165,240,0.72)'
      : calcFamily === 'hp'
      ? 'rgba(235,165,60,0.72)'
      : calcFamily === 'sharp'
      ? 'rgba(60,60,55,0.55)'
      : 'rgba(105,205,135,0.72)'

  const btnStyle: React.CSSProperties = {
    fontFamily: "'DM Mono', monospace",
    background: def.bg,
    color: def.color,
    fontSize: def.fontSize,
    height: def.height,
    borderRadius: def.borderRadius,
    border: 'none',
    cursor: 'pointer',
    userSelect: 'none',
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1px',
    // The physics: press translates down by (depth - 1)px, shadow collapses
    transform: pressed ? `translateY(${depth - 1}px)` : 'translateY(0)',
    boxShadow: buildShadow(def, calcFamily, pressed),
    transition: pressed
      ? 'transform 0.04s ease, box-shadow 0.04s ease'
      : 'transform 0.1s ease, box-shadow 0.1s ease',
    letterSpacing: '0.01em',
    ...(wide ? { gridColumn: 'span 2' } : {}),
    ...extraStyle,
  }

  return (
    <button
      style={btnStyle}
      onMouseDown={handleDown}
      onMouseUp={handleUp}
      onMouseLeave={handleUp}
    >
      {secondaryLabel && (
        <span
          style={{
            fontSize: '5.5px',
            color: secondaryColor,
            lineHeight: 1,
            letterSpacing: '0.03em',
            fontWeight: 400,
          }}
        >
          {secondaryLabel}
        </span>
      )}
      <span style={{ lineHeight: 1, fontWeight: 500 }}>{label}</span>
    </button>
  )
}
