import { useState } from 'react'
import { CALCULATORS, CATEGORIES } from '../data/calculators'

interface SidebarProps {
  activeId: string
  onSelect: (id: string) => void
}

export default function Sidebar({ activeId, onSelect }: SidebarProps) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  const toggle = (id: string) =>
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }))

  const calcById = Object.fromEntries(CALCULATORS.map((c) => [c.id, c]))

  return (
    <div
      style={{
        width: 232,
        flexShrink: 0,
        background: 'var(--panel-bg)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* ── Search ──────────────────────────────────────────────────────────── */}
      <div style={{ padding: '12px 14px 8px', flexShrink: 0 }}>
        <div
          style={{
            height: 32,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 7,
            display: 'flex',
            alignItems: 'center',
            padding: '0 10px',
            gap: 8,
          }}
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <circle cx="4.5" cy="4.5" r="3.2" stroke="rgba(255,255,255,0.28)" strokeWidth="1.1" />
            <line x1="7" y1="7" x2="10" y2="10" stroke="rgba(255,255,255,0.28)" strokeWidth="1.1" strokeLinecap="round" />
          </svg>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              color: 'rgba(255,255,255,0.22)',
              letterSpacing: '0.03em',
            }}
          >
            Search calculators...
          </span>
        </div>
      </div>

      {/* ── Category tree ───────────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '6px 0 4px' }}>
        {CATEGORIES.map((cat) => {
          const isCollapsed = !!collapsed[cat.id]
          return (
            <div key={cat.id}>
              {/* Category header */}
              <button
                onClick={() => toggle(cat.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '7px 14px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 7,
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 9,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.32)',
                  }}
                >
                  <span
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.18)',
                      display: 'inline-block',
                      flexShrink: 0,
                    }}
                  />
                  {cat.label}
                </span>
                <span
                  style={{
                    fontSize: 9,
                    color: 'rgba(255,255,255,0.22)',
                    transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                    display: 'inline-block',
                    lineHeight: 1,
                  }}
                >
                  ▾
                </span>
              </button>

              {/* Calculator rows */}
              {!isCollapsed &&
                cat.calcIds.map((calcId) => {
                  const calc = calcById[calcId]
                  if (!calc) return null
                  const isActive = calcId === activeId

                  return (
                    <button
                      key={calcId}
                      onClick={() => onSelect(calcId)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '7px 14px 7px 26px',
                        background: isActive
                          ? 'rgba(255,255,255,0.055)'
                          : 'none',
                        border: 'none',
                        borderLeft: `2px solid ${
                          isActive
                            ? calc.accentColor
                            : 'transparent'
                        }`,
                        cursor: 'pointer',
                        transition: 'background 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive)
                          (e.currentTarget as HTMLElement).style.background =
                            'rgba(255,255,255,0.03)'
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive)
                          (e.currentTarget as HTMLElement).style.background =
                            'none'
                      }}
                    >
                      {/* Colour swatch mini-thumb */}
                      <div
                        style={{
                          width: 20,
                          height: 26,
                          background: calc.thumbBg,
                          border: `1px solid ${calc.thumbBorder}`,
                          borderRadius: 2,
                          flexShrink: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: 6,
                            color: calc.thumbText,
                            fontWeight: 600,
                          }}
                        >
                          {calc.thumbLabel}
                        </span>
                      </div>

                      {/* Name + year */}
                      <div style={{ textAlign: 'left', overflow: 'hidden' }}>
                        <div
                          style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: 11,
                            color: isActive
                              ? 'rgba(255,255,255,0.88)'
                              : 'rgba(255,255,255,0.55)',
                            letterSpacing: '0.02em',
                            lineHeight: 1.25,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {calc.model}
                        </div>
                        <div
                          style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: 9,
                            color: 'rgba(255,255,255,0.24)',
                            marginTop: 1,
                          }}
                        >
                          {calc.year}
                        </div>
                      </div>
                    </button>
                  )
                })}
            </div>
          )
        })}
      </div>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <div
        style={{
          padding: '10px 14px',
          borderTop: '1px solid var(--border)',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 9,
            color: 'rgba(255,255,255,0.18)',
            letterSpacing: '0.08em',
          }}
        >
          v1.0 · The Archive
        </span>
      </div>
    </div>
  )
}
