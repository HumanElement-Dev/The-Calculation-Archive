import { useState, useRef, useCallback, useEffect } from 'react'
import type { SkinData } from './PhotoCalculator'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SkinEditorProps {
  skin: SkinData
  photo: string
  onClose: () => void
}

type RegionMap = Record<string, { x: number; y: number; w: number; h: number }>

// ─── Helpers ──────────────────────────────────────────────────────────────────

function clamp(v: number, min = 0, max = 1): number {
  return Math.max(min, Math.min(max, v))
}

function initRegions(skin: SkinData): RegionMap {
  const map: RegionMap = {}
  map['display'] = {
    x: skin.display.x,
    y: skin.display.y,
    w: skin.display.width,
    h: skin.display.height,
  }
  for (const btn of skin.buttons) {
    map[btn.id] = { x: btn.x, y: btn.y, w: btn.width, h: btn.height }
  }
  return map
}

function borderColor(regionKey: string, skin: SkinData): string {
  if (regionKey === 'display') return '#00e5c0'
  const btn = skin.buttons.find((b) => b.id === regionKey)
  if (btn?.splitGroup != null) return 'rgba(255,160,60,0.85)'
  return 'rgba(255,80,80,0.85)'
}

function regionLabel(regionKey: string, skin: SkinData): string {
  if (regionKey === 'display') return 'DISPLAY'
  const btn = skin.buttons.find((b) => b.id === regionKey)
  if (!btn) return regionKey
  if (btn.splitHalf) return `${btn.label} (${btn.splitHalf})`
  return btn.label
}

// ─── Component ────────────────────────────────────────────────────────────────

const TOOLBAR_H  = 49   // px — toolbar + border
const STATUSBAR_H = 36   // px — status bar + border
const PADDING_V   = 32   // px — scroll area top + bottom padding

export default function SkinEditor({ skin, photo, onClose }: SkinEditorProps) {
  const [regions, setRegions] = useState<RegionMap>(() => initRegions(skin))
  const [selectedKey, setSelectedKey] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [viewportH, setViewportH] = useState(window.innerHeight)

  useEffect(() => {
    const handler = () => setViewportH(window.innerHeight)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  const { naturalWidth, naturalHeight } = skin.meta
  const aspectRatio = naturalHeight / naturalWidth

  // Fit image so the full calculator is always visible without scrolling
  const availH = viewportH - TOOLBAR_H - STATUSBAR_H - PADDING_V
  const imageHeight = Math.min(Math.round(availH), 900)
  const EDITOR_WIDTH = Math.round(imageHeight / aspectRatio)

  const containerRef = useRef<HTMLDivElement>(null)

  // We store drag state in refs so mousemove handlers don't go stale
  const dragRef = useRef<{
    mode: 'drag' | 'resize'
    key: string
    startMouseX: number
    startMouseY: number
    startX: number
    startY: number
    startW: number
    startH: number
    containerW: number
    containerH: number
  } | null>(null)

  // ── Drag / resize handlers ─────────────────────────────────────────────────

  const getContainerSize = useCallback(() => {
    const el = containerRef.current
    if (!el) return { w: EDITOR_WIDTH, h: EDITOR_WIDTH }
    return { w: el.offsetWidth, h: el.offsetHeight }
  }, [])

  const handleBoxMouseDown = useCallback(
    (e: React.MouseEvent, key: string, mode: 'drag' | 'resize') => {
      e.preventDefault()
      e.stopPropagation()
      setSelectedKey(key)

      const { w, h } = getContainerSize()
      const reg = regions[key]

      dragRef.current = {
        mode,
        key,
        startMouseX: e.clientX,
        startMouseY: e.clientY,
        startX: reg.x,
        startY: reg.y,
        startW: reg.w,
        startH: reg.h,
        containerW: w,
        containerH: h,
      }
    },
    [regions, getContainerSize]
  )

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      const d = dragRef.current
      if (!d) return

      const dx = (e.clientX - d.startMouseX) / d.containerW
      const dy = (e.clientY - d.startMouseY) / d.containerH

      setRegions((prev) => {
        const reg = prev[d.key]
        if (!reg) return prev

        let next: typeof reg
        if (d.mode === 'drag') {
          next = {
            ...reg,
            x: clamp(d.startX + dx),
            y: clamp(d.startY + dy),
          }
        } else {
          // resize: minimum 10px as fraction
          const minW = 10 / d.containerW
          const minH = 10 / d.containerH
          next = {
            ...reg,
            w: clamp(d.startW + dx, minW, 1 - reg.x),
            h: clamp(d.startH + dy, minH, 1 - reg.y),
          }
        }
        return { ...prev, [d.key]: next }
      })
    }

    function onMouseUp() {
      dragRef.current = null
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  // ── Copy JSON ──────────────────────────────────────────────────────────────

  const handleCopyJson = useCallback(async () => {
    const disp = regions['display']
    const output = {
      meta: { ...skin.meta },
      capabilities: (skin as unknown as Record<string, unknown>)['capabilities'],
      display: {
        ...skin.display,
        x: disp.x,
        y: disp.y,
        width: disp.w,
        height: disp.h,
      },
      buttons: skin.buttons.map((btn) => {
        const reg = regions[btn.id]
        if (!reg) return btn
        return {
          ...btn,
          x: reg.x,
          y: reg.y,
          width: reg.w,
          height: reg.h,
        }
      }),
    }

    // Remove undefined capabilities key if not present
    if (output.capabilities === undefined) {
      delete output.capabilities
    }

    try {
      await navigator.clipboard.writeText(JSON.stringify(output, null, 2))
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Fallback: create a temporary textarea
      const ta = document.createElement('textarea')
      ta.value = JSON.stringify(output, null, 2)
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [regions, skin])

  // ── Selected region info ───────────────────────────────────────────────────

  const selReg = selectedKey ? regions[selectedKey] : null

  // ── Render ─────────────────────────────────────────────────────────────────

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
    background: '#0b0b0c',
    fontFamily: "'DM Mono', monospace",
    overflow: 'hidden',
    userSelect: 'none',
  }

  const toolbarStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
    flexShrink: 0,
  }

  const closeBtnStyle: React.CSSProperties = {
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.12)',
    color: 'rgba(255,255,255,0.55)',
    borderRadius: 5,
    padding: '5px 12px',
    fontSize: 11,
    fontFamily: "'DM Mono', monospace",
    cursor: 'pointer',
    letterSpacing: '0.08em',
  }

  const titleStyle: React.CSSProperties = {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
  }

  const copyBtnStyle: React.CSSProperties = {
    background: copied ? 'rgba(0,229,192,0.15)' : 'rgba(255,255,255,0.06)',
    border: `1px solid ${copied ? 'rgba(0,229,192,0.4)' : 'rgba(255,255,255,0.12)'}`,
    color: copied ? '#00e5c0' : 'rgba(255,255,255,0.55)',
    borderRadius: 5,
    padding: '5px 14px',
    fontSize: 11,
    fontFamily: "'DM Mono', monospace",
    cursor: 'pointer',
    letterSpacing: '0.08em',
    transition: 'all 0.15s ease',
    minWidth: 100,
  }

  const scrollAreaStyle: React.CSSProperties = {
    flex: 1,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px 0',
  }

  const imageContainerStyle: React.CSSProperties = {
    position: 'relative',
    width: EDITOR_WIDTH,
    height: imageHeight,
    flexShrink: 0,
    cursor: 'default',
  }

  const statusBarStyle: React.CSSProperties = {
    flexShrink: 0,
    borderTop: '1px solid rgba(255,255,255,0.07)',
    padding: '8px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: 24,
    fontSize: 10,
    color: 'rgba(255,255,255,0.35)',
    fontFamily: "'DM Mono', monospace",
    letterSpacing: '0.06em',
    minHeight: 36,
  }

  const allKeys = ['display', ...skin.buttons.map((b) => b.id)]

  return (
    <div style={containerStyle}>
      {/* ── Toolbar ──────────────────────────────────────────────────────────── */}
      <div style={toolbarStyle}>
        <button style={closeBtnStyle} onClick={onClose}>
          ← Close
        </button>

        <span style={titleStyle}>
          Skin Editor — {skin.meta.name}
        </span>

        <button style={copyBtnStyle} onClick={handleCopyJson}>
          {copied ? 'Copied! ✓' : 'Copy JSON'}
        </button>
      </div>

      {/* ── Image + overlays ─────────────────────────────────────────────────── */}
      <div style={scrollAreaStyle}>
        <div
          ref={containerRef}
          style={imageContainerStyle}
          onMouseDown={(e) => {
            // Click outside any box to deselect
            if (e.target === containerRef.current) {
              setSelectedKey(null)
            }
          }}
        >
          <img
            src={photo}
            alt={skin.meta.name}
            draggable={false}
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              pointerEvents: 'none',
            }}
          />

          {allKeys.map((key) => {
            const reg = regions[key]
            if (!reg) return null

            const isSelected = selectedKey === key
            const border = borderColor(key, skin)
            const label = regionLabel(key, skin)

            const boxStyle: React.CSSProperties = {
              position: 'absolute',
              left: `${reg.x * 100}%`,
              top: `${reg.y * 100}%`,
              width: `${reg.w * 100}%`,
              height: `${reg.h * 100}%`,
              border: `1px solid ${border}`,
              boxSizing: 'border-box',
              cursor: 'move',
              boxShadow: isSelected ? '0 0 0 2px white' : undefined,
              background: isSelected
                ? 'rgba(255,255,255,0.06)'
                : 'rgba(255,255,255,0.02)',
              overflow: 'visible',
            }

            const labelStyle: React.CSSProperties = {
              position: 'absolute',
              top: 1,
              left: 2,
              fontSize: 8,
              color: 'white',
              fontFamily: "'DM Mono', monospace",
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              maxWidth: '90%',
              textOverflow: 'ellipsis',
              lineHeight: 1,
              textShadow: '0 1px 3px rgba(0,0,0,0.9)',
              letterSpacing: '0.04em',
            }

            const handleStyle: React.CSSProperties = {
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 8,
              height: 8,
              background: 'rgba(0,0,0,0.55)',
              border: `1px solid ${border}`,
              boxSizing: 'border-box',
              cursor: 'se-resize',
            }

            return (
              <div
                key={key}
                style={boxStyle}
                onMouseDown={(e) => handleBoxMouseDown(e, key, 'drag')}
              >
                <span style={labelStyle}>{label}</span>
                <div
                  style={handleStyle}
                  onMouseDown={(e) => {
                    e.stopPropagation()
                    handleBoxMouseDown(e, key, 'resize')
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Status bar ───────────────────────────────────────────────────────── */}
      <div style={statusBarStyle}>
        {selectedKey && selReg ? (
          <>
            <span style={{ color: 'rgba(255,255,255,0.6)' }}>
              Selected:{' '}
              <span style={{ color: 'white' }}>
                {selectedKey}
              </span>
              {selectedKey !== 'display' && (() => {
                const btn = skin.buttons.find((b) => b.id === selectedKey)
                return btn ? ` (${btn.label})` : ''
              })()}
            </span>
            <span>
              x:<span style={{ color: 'rgba(255,255,255,0.7)', marginLeft: 4 }}>{selReg.x.toFixed(3)}</span>
            </span>
            <span>
              y:<span style={{ color: 'rgba(255,255,255,0.7)', marginLeft: 4 }}>{selReg.y.toFixed(3)}</span>
            </span>
            <span>
              w:<span style={{ color: 'rgba(255,255,255,0.7)', marginLeft: 4 }}>{selReg.w.toFixed(3)}</span>
            </span>
            <span>
              h:<span style={{ color: 'rgba(255,255,255,0.7)', marginLeft: 4 }}>{selReg.h.toFixed(3)}</span>
            </span>
          </>
        ) : (
          <span>Click a region to select it</span>
        )}
      </div>
    </div>
  )
}
