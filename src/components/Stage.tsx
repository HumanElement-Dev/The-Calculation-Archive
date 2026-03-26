import { useState, useEffect, useRef } from 'react'
import { CALCULATORS } from '../data/calculators'
import { useEngine } from '../hooks/useEngine'
import TI30 from './calculators/TI30'
import HP12C from './calculators/HP12C'
import CasioFX7000G from './calculators/CasioFX7000G'
import Picker from './Picker'

type AnimPhase = 'idle' | 'out' | 'in'

function CalcWrapper({
  calcId,
  phase,
}: {
  calcId: string
  phase: AnimPhase
}) {
  const { state, press } = useEngine(calcId)

  const animStyle: React.CSSProperties = (() => {
    if (phase === 'out') {
      return {
        opacity: 0,
        transform: 'perspective(800px) rotateX(4deg) scale(0.96) translateY(8px)',
        transition: 'opacity 0.22s ease, transform 0.22s ease',
      }
    }
    if (phase === 'in') {
      return {
        opacity: 0,
        transform: 'perspective(800px) rotateX(4deg) scale(0.96) translateY(-8px)',
        transition: 'none',
      }
    }
    return {
      opacity: 1,
      transform: 'perspective(800px) rotateX(4deg)',
      transition: 'opacity 0.28s ease, transform 0.28s ease',
    }
  })()

  const hoverRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    if (hoverRef.current) {
      hoverRef.current.style.transform = 'perspective(800px) rotateX(1.5deg) translateY(-6px)'
      hoverRef.current.style.filter =
        'drop-shadow(0 60px 90px rgba(0,0,0,0.95)) drop-shadow(0 16px 30px rgba(0,0,0,0.6))'
    }
  }
  const handleMouseLeave = () => {
    if (hoverRef.current) {
      hoverRef.current.style.transform = 'perspective(800px) rotateX(4deg)'
      hoverRef.current.style.filter =
        'drop-shadow(0 50px 80px rgba(0,0,0,0.95)) drop-shadow(0 12px 24px rgba(0,0,0,0.7))'
    }
  }

  return (
    <div
      ref={hoverRef}
      style={{
        filter: 'drop-shadow(0 50px 80px rgba(0,0,0,0.95)) drop-shadow(0 12px 24px rgba(0,0,0,0.7))',
        transition: 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.45s ease',
        ...animStyle,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {calcId === 'ti30' && <TI30 state={state} press={press} />}
      {calcId === 'hp12c' && <HP12C state={state} press={press} />}
      {calcId === 'casiofx7000g' && <CasioFX7000G state={state} press={press} />}
    </div>
  )
}

export default function Stage() {
  const [activeId, setActiveId] = useState('ti30')
  const [visibleId, setVisibleId] = useState('ti30')
  const [phase, setPhase] = useState<AnimPhase>('idle')

  const activeMeta = CALCULATORS.find((c) => c.id === activeId)!

  const handleSelect = (id: string) => {
    if (id === activeId || phase !== 'idle') return
    setPhase('out')
    setTimeout(() => {
      setActiveId(id)
      setVisibleId(id)
      setPhase('in')
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPhase('idle')
        })
      })
    }, 200)
  }

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        background: '#0b0b0c',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 0 60px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -60%)',
          width: '340px',
          height: '220px',
          borderRadius: '50%',
          background: `radial-gradient(ellipse, ${activeMeta.glowColor} 0%, transparent 70%)`,
          transition: 'background 0.6s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Attribution */}
      <div
        style={{
          fontSize: '10px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.14)',
          marginBottom: '20px',
          fontFamily: "'DM Mono', monospace",
          transition: 'opacity 0.3s ease',
        }}
      >
        {activeMeta.manufacturer} · {activeMeta.type} · {activeMeta.year}
      </div>

      {/* Calculator — keyed so each calc gets its own component instance */}
      <CalcWrapper key={visibleId} calcId={visibleId} phase={phase} />

      {/* Picker */}
      <Picker active={activeId} onSelect={handleSelect} />
    </div>
  )
}
