import { CalcMeta } from '../data/calculators'

interface InfoPanelProps {
  calc: CalcMeta
  isOpen: boolean
  onClose: () => void  // "Try It" — closes panel so user can interact
}

const SPECS = (calc: CalcMeta) => [
  { label: 'Launch Price', value: calc.launchPrice, sub: calc.launchPriceToday },
  { label: 'Display',      value: calc.displayType },
  { label: 'Functions',    value: String(calc.functions) },
  { label: 'Power',        value: calc.power },
  { label: 'Weight',       value: calc.weight },
]

export default function InfoPanel({ calc, isOpen, onClose }: InfoPanelProps) {
  return (
    <div
      style={{
        width: isOpen ? 296 : 0,
        minWidth: isOpen ? 296 : 0,
        flexShrink: 0,
        overflow: 'hidden',
        transition: 'width 0.32s cubic-bezier(0.4,0,0.2,1), min-width 0.32s cubic-bezier(0.4,0,0.2,1)',
        position: 'relative',
        borderLeft: isOpen ? '1px solid rgba(0,0,0,0.12)' : 'none',
      }}
    >
      {/* The actual panel — fixed 296px, scrollable */}
      <div
        style={{
          width: 296,
          height: '100%',
          background: '#f3f2ef',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          overflowX: 'hidden',
          opacity: isOpen ? 1 : 0,
          transition: 'opacity 0.18s ease',
        }}
      >
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div style={{ padding: '20px 20px 16px', flexShrink: 0 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: 8,
              marginBottom: 5,
            }}
          >
            {/* Title + year badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', flex: 1 }}>
              <h2
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: calc.model.length > 12 ? 14 : 18,
                  fontWeight: 600,
                  color: '#111',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2,
                }}
              >
                {calc.model}
              </h2>
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  color: '#777',
                  background: '#e5e3df',
                  padding: '2px 7px',
                  borderRadius: 4,
                  letterSpacing: '0.05em',
                  flexShrink: 0,
                }}
              >
                {calc.year}
              </span>
            </div>

            {/* Try It button */}
            <button
              onClick={onClose}
              style={{
                flexShrink: 0,
                height: 28,
                padding: '0 11px',
                background: '#111',
                border: 'none',
                borderRadius: 5,
                color: '#fff',
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                cursor: 'pointer',
                letterSpacing: '0.06em',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                whiteSpace: 'nowrap',
              }}
            >
              Try it →
            </button>
          </div>

          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              color: '#999',
              letterSpacing: '0.04em',
            }}
          >
            {calc.manufacturer}
          </div>
        </div>

        <Divider />

        {/* ── Description ─────────────────────────────────────────────────── */}
        <div style={{ padding: '15px 20px', flexShrink: 0 }}>
          <p
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 13,
              color: '#333',
              lineHeight: 1.72,
              margin: 0,
            }}
          >
            {calc.description}
          </p>
        </div>

        <Divider />

        {/* ── Spec grid ───────────────────────────────────────────────────── */}
        <div style={{ padding: '4px 20px 8px', flexShrink: 0 }}>
          {SPECS(calc).map((row, i, arr) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom:
                  i < arr.length - 1 ? '1px solid #eae8e4' : 'none',
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  color: '#999',
                  letterSpacing: '0.05em',
                  paddingTop: 1,
                }}
              >
                {row.label}
              </span>
              <div style={{ textAlign: 'right' }}>
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 12,
                    color: '#111',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                  }}
                >
                  {row.value}
                </div>
                {row.sub && (
                  <div
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 9,
                      color: '#bbb',
                      marginTop: 2,
                    }}
                  >
                    {row.sub}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <Divider />

        {/* ── Notes ───────────────────────────────────────────────────────── */}
        <div style={{ padding: '14px 20px 24px', flex: 1 }}>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 9,
              color: '#bbb',
              letterSpacing: '0.13em',
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            Notes
          </div>
          {calc.notes.map((note, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 8,
                marginBottom: 9,
                alignItems: 'flex-start',
              }}
            >
              <span
                style={{
                  color: '#ccc',
                  marginTop: 2,
                  flexShrink: 0,
                  lineHeight: 1,
                }}
              >
                ·
              </span>
              <span
                style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontSize: 12,
                  color: '#555',
                  lineHeight: 1.65,
                }}
              >
                {note}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Divider() {
  return (
    <div
      style={{
        height: 1,
        background: '#e4e2de',
        margin: '0 20px',
        flexShrink: 0,
      }}
    />
  )
}
