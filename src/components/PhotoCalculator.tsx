import { useState, useCallback } from 'react'
import { EngineState } from '../engine/types'

// ─── Types matching skin.json ────────────────────────────────────────────────

interface SkinButton {
  id: string
  label: string
  action: string          // human-readable (e.g. "7", "subtract", "decimal")
  x: number               // 0-1 fraction of image width
  y: number               // 0-1 fraction of image height
  width: number
  height: number
  keyboardKey?: string
  shiftAction?: string
  splitGroup?: string     // shared key for buttons that are halves of one physical key
  splitHalf?: 'top' | 'bottom'
}

interface SkinDisplay {
  x: number
  y: number
  width: number
  height: number
  fontFamily: string
  fontSize: string        // e.g. "6.0cqw" — relative to container
  color: string
  textAlign: 'left' | 'center' | 'right'
  padding: string
  effect: string          // "led-green" | "lcd" | "vfd-amber" etc.
}

export interface SkinData {
  meta: {
    id: string
    name: string
    manufacturer: string
    year: number
    description: string
    imageFile: string
    thumbnailFile: string
    naturalWidth: number
    naturalHeight: number
  }
  display: SkinDisplay
  buttons: SkinButton[]
}

interface PhotoCalculatorProps {
  skin: SkinData
  photo: string           // resolved URL / import
  state: EngineState
  press: (action: string) => void
  width?: number          // rendered width in px, default 300
}

// ─── Action mapping ──────────────────────────────────────────────────────────
// Maps skin.json human-readable actions → engine action strings

const ACTION_MAP: Record<string, string> = {
  // Digits
  '0': 'digit_0', '1': 'digit_1', '2': 'digit_2', '3': 'digit_3',
  '4': 'digit_4', '5': 'digit_5', '6': 'digit_6', '7': 'digit_7',
  '8': 'digit_8', '9': 'digit_9',
  // Operations
  add: 'add', subtract: 'sub', multiply: 'mul', divide: 'div',
  equals: 'eq', decimal: 'dot', negate: 'neg', clear: 'clear',
  backspace: 'back', enter: 'enter', ans: 'ans', percent: 'percent',
  shift: 'shift', '2nd': '2nd', sto: 'sto', rcl: 'rcl',
  sin: 'sin', cos: 'cos', tan: 'tan', ln: 'ln', log: 'log',
  sqrt: 'sqrt', sq: 'sq', inv: 'inv', pi: 'pi', ee: 'ee',
}

function resolveAction(raw: string): string {
  return ACTION_MAP[raw] ?? raw
}

// ─── Display glow effect ─────────────────────────────────────────────────────

function getDisplayGlow(effect: string, color: string, isError: boolean): React.CSSProperties {
  if (isError) {
    return { color: '#e05050', textShadow: '0 0 10px rgba(220,80,80,0.7)' }
  }
  switch (effect) {
    case 'led-green':
    case 'vfd-green':
      return {
        color,
        textShadow: [
          `0 0 5px ${color}`,
          `0 0 14px ${color}88`,
          `0 0 28px ${color}40`,
        ].join(', '),
      }
    case 'vfd-amber':
      return {
        color,
        textShadow: `0 0 6px ${color}, 0 0 16px ${color}80`,
      }
    case 'lcd':
      return { color }
    default:
      return { color }
  }
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function PhotoCalculator({
  skin,
  photo,
  state,
  press,
  width = 300,
}: PhotoCalculatorProps) {
  const [flashId, setFlashId] = useState<string | null>(null)
  const [hoverId, setHoverId] = useState<string | null>(null)

  const { naturalWidth, naturalHeight } = skin.meta
  const aspectRatio = naturalHeight / naturalWidth
  const height = width * aspectRatio

  const displayValue = state.error ? 'Error' : state.buf

  const handlePress = useCallback((btn: SkinButton) => {
    setFlashId(btn.id)
    setTimeout(() => setFlashId(null), 90)
    press(resolveAction(btn.action))
  }, [press])

  // For split buttons, determine if sibling half is hovered (so we highlight the group)
  const hoverGroup = hoverId
    ? skin.buttons.find((b) => b.id === hoverId)?.splitGroup ?? null
    : null

  const glowStyle = getDisplayGlow(skin.display.effect, skin.display.color, state.error)

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        // Container query context so fontSize "6cqw" works
        containerType: 'inline-size',
        // Prevent text selection while clicking buttons
        userSelect: 'none',
      }}
    >
      {/* ── Base photo ─────────────────────────────────────────────────── */}
      {/* objectFit: contain lets a transparent-background PNG sit naturally
          without clipping; the dark stage shows through transparent edges */}
      <img
        src={photo}
        alt={skin.meta.name}
        draggable={false}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />

      {/* ── Display overlay ─────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          left:   `${skin.display.x * 100}%`,
          top:    `${skin.display.y * 100}%`,
          width:  `${skin.display.width * 100}%`,
          height: `${skin.display.height * 100}%`,
          display: 'flex',
          alignItems: 'center',
          justifyContent:
            skin.display.textAlign === 'right' ? 'flex-end' :
            skin.display.textAlign === 'left'  ? 'flex-start' : 'center',
          padding: skin.display.padding,
          // Slightly darken behind the text so it reads over the photo
          background: 'rgba(0,0,0,0.35)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}
      >
        <span
          style={{
            fontFamily: "'Share Tech Mono', 'DM Mono', monospace",
            fontSize: skin.display.fontSize,
            lineHeight: 1,
            letterSpacing: '0.05em',
            ...glowStyle,
          }}
        >
          {displayValue}
        </span>
      </div>

      {/* ── Button hotspots ─────────────────────────────────────────────── */}
      {skin.buttons.map((btn) => {
        const isFlashing = flashId === btn.id
        const isHovered  = hoverId === btn.id
        // Sibling half of a split button is also active when any part of the group is hovered
        const groupHovered = btn.splitGroup != null && btn.splitGroup === hoverGroup

        const bg = isFlashing
          ? 'rgba(255,255,255,0.30)'
          : isHovered
            ? 'rgba(255,255,255,0.10)'
            : groupHovered
              ? 'rgba(255,255,255,0.05)'
              : 'transparent'

        return (
          <button
            key={btn.id}
            onMouseDown={() => handlePress(btn)}
            onMouseEnter={() => setHoverId(btn.id)}
            onMouseLeave={() => setHoverId(null)}
            style={{
              position: 'absolute',
              left:   `${btn.x * 100}%`,
              top:    `${btn.y * 100}%`,
              width:  `${btn.width * 100}%`,
              height: `${btn.height * 100}%`,
              background: bg,
              border: 'none',
              // For split buttons, draw a faint dividing line between halves
              borderTop: btn.splitHalf === 'bottom' && groupHovered
                ? '1px solid rgba(255,255,255,0.18)'
                : 'none',
              borderRadius: btn.splitHalf === 'top'
                ? '3px 3px 0 0'
                : btn.splitHalf === 'bottom'
                  ? '0 0 3px 3px'
                  : '4px',
              cursor: 'pointer',
              padding: 0,
              // Debug: uncomment to see hotspot outlines
              // outline: '1px solid rgba(255,0,0,0.4)',
              transition: 'background 0.05s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
            aria-label={btn.label}
          >
            {/* Label tooltip — appears on hover for split buttons */}
            {btn.splitGroup && isHovered && (
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '7px',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.85)',
                  letterSpacing: '0.02em',
                  pointerEvents: 'none',
                  textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                  userSelect: 'none',
                }}
              >
                {btn.label}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
