import { useState, useEffect, useRef } from 'react'
import { CALCULATORS } from '../data/calculators'
import { useEngine } from '../hooks/useEngine'
import TI30 from './calculators/TI30'
import HP12C from './calculators/HP12C'
import CasioFX7000G from './calculators/CasioFX7000G'
import PhotoCalculator from './PhotoCalculator'
import { skin as sharpSkin, photos as sharpPhotos } from '../skins/sharp-qt8d'

type AnimPhase = 'idle' | 'out' | 'in'

// ─── Calculator wrapper — handles hover lift + switch animation ───────────────

function CalcWrapper({
  calcId,
  phase,
}: {
  calcId: string
  phase: AnimPhase
}) {
  const { state, press } = useEngine(calcId)
  const wrapRef = useRef<HTMLDivElement>(null)

  // Base perspective tilt
  const BASE_TRANSFORM  = 'perspective(1100px) rotateX(3deg)'
  const HOVER_TRANSFORM = 'perspective(1100px) rotateX(1deg)'
  const BASE_SHADOW =
    'drop-shadow(0 44px 80px rgba(0,0,0,0.88)) drop-shadow(0 8px 18px rgba(0,0,0,0.55))'
  const HOVER_SHADOW =
    'drop-shadow(0 64px 100px rgba(0,0,0,0.95)) drop-shadow(0 18px 32px rgba(0,0,0,0.6))'

  // Switch animation overrides
  const animStyle: React.CSSProperties = (() => {
    if (phase === 'out')
      return {
        opacity: 0,
        transform:
          'perspective(1100px) rotateX(4deg) scale(0.96) translateY(12px)',
        transition: 'opacity 0.22s ease, transform 0.22s ease',
      }
    if (phase === 'in')
      return {
        opacity: 0,
        transform:
          'perspective(1100px) rotateX(4deg) scale(0.96) translateY(-12px)',
        transition: 'none',
      }
    return {
      opacity: 1,
      transform: BASE_TRANSFORM,
      transition: 'opacity 0.28s ease, transform 0.28s ease',
    }
  })()

  return (
    <div
      ref={wrapRef}
      style={{
        filter: BASE_SHADOW,
        transition:
          'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.45s ease',
        ...animStyle,
      }}
      onMouseEnter={() => {
        if (phase !== 'idle') return
        if (wrapRef.current) {
          wrapRef.current.style.transform = HOVER_TRANSFORM
          wrapRef.current.style.filter = HOVER_SHADOW
        }
      }}
      onMouseLeave={() => {
        if (wrapRef.current) {
          wrapRef.current.style.transform = BASE_TRANSFORM
          wrapRef.current.style.filter = BASE_SHADOW
        }
      }}
    >
      {calcId === 'ti30'        && <TI30 state={state} press={press} />}
      {calcId === 'hp12c'       && <HP12C state={state} press={press} />}
      {calcId === 'casiofx7000g'&& <CasioFX7000G state={state} press={press} />}
      {calcId === 'sharpqt8d'   && (
        <PhotoCalculator
          skin={sharpSkin}
          photo={sharpPhotos.full}
          state={state}
          press={press}
          width={320}
        />
      )}
    </div>
  )
}

// ─── Stage — hero display area ────────────────────────────────────────────────

interface StageProps {
  activeId: string
}

export default function Stage({ activeId }: StageProps) {
  const [visibleId, setVisibleId] = useState(activeId)
  const [phase, setPhase]         = useState<AnimPhase>('idle')
  const timerRef                  = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Animate on calculator switch
  useEffect(() => {
    if (activeId === visibleId) return

    // Clear any in-flight timer
    if (timerRef.current) clearTimeout(timerRef.current)

    setPhase('out')

    timerRef.current = setTimeout(() => {
      setVisibleId(activeId)
      setPhase('in')

      // Two rAFs — give React one frame to paint the 'in' starting state
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPhase('idle')
        })
      })
    }, 220)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [activeId]) // eslint-disable-line react-hooks/exhaustive-deps

  const meta = CALCULATORS.find((c) => c.id === visibleId)!

  return (
    <div
      style={{
        flex: 1,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--stage-bg)',
        overflow: 'hidden',
        minWidth: 0,
      }}
    >
      {/* ── Ambient glow ──────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: '48%',
          left: '50%',
          transform: 'translate(-50%, -55%)',
          width: 560,
          height: 320,
          borderRadius: '50%',
          background: `radial-gradient(ellipse, ${meta.glowColor} 0%, transparent 70%)`,
          transition: 'background 0.6s ease',
          pointerEvents: 'none',
        }}
      />

      {/* ── Subtle vignette on edges to ground the calc ───────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, transparent 55%, rgba(20,20,22,0.65) 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* ── Attribution line ──────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: 22,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: "'DM Mono', monospace",
          fontSize: 10,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.18)',
          pointerEvents: 'none',
          transition: 'opacity 0.3s ease',
          zIndex: 2,
        }}
      >
        {meta.manufacturer} · {meta.type} · {meta.year}
      </div>

      {/* ── Calculator hero ───────────────────────────────────────────────── */}
      {/* Scale wrapper — CSS renders are ~190-220px, hero stage needs them much larger.
          transform: scale() compounds correctly with CalcWrapper's own perspective/tilt. */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          transform: `scale(${visibleId === 'sharpqt8d' ? 1.3 : 1.65})`,
          transformOrigin: 'center center',
        }}
      >
        <CalcWrapper key={visibleId} calcId={visibleId} phase={phase} />
      </div>
    </div>
  )
}
