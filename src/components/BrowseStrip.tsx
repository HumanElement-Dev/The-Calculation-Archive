import { CALCULATORS, CalcMeta } from '../data/calculators'

interface BrowseStripProps {
  activeId: string
  onSelect: (id: string) => void
}

function ThumbCard({
  calc,
  isActive,
  onSelect,
}: {
  calc: CalcMeta
  isActive: boolean
  onSelect: () => void
}) {
  return (
    <button
      onClick={onSelect}
      style={{
        flexShrink: 0,
        background: isActive
          ? 'rgba(255,255,255,0.07)'
          : 'rgba(255,255,255,0.025)',
        border: `1px solid ${
          isActive
            ? calc.accentColor.replace('1)', '0.32)')
            : 'rgba(255,255,255,0.07)'
        }`,
        borderRadius: 8,
        padding: '7px 13px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        transition: 'background 0.15s ease, border-color 0.15s ease',
        outline: 'none',
        minWidth: 148,
      }}
      onMouseEnter={(e) => {
        if (!isActive)
          (e.currentTarget as HTMLElement).style.background =
            'rgba(255,255,255,0.05)'
      }}
      onMouseLeave={(e) => {
        if (!isActive)
          (e.currentTarget as HTMLElement).style.background =
            'rgba(255,255,255,0.025)'
      }}
    >
      {/* Mini body swatch */}
      <div
        style={{
          width: 22,
          height: 30,
          background: calc.thumbBg,
          border: `1px solid ${calc.thumbBorder}`,
          borderRadius: 3,
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

      {/* Label */}
      <div style={{ textAlign: 'left' }}>
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 11,
            color: isActive
              ? 'rgba(255,255,255,0.88)'
              : 'rgba(255,255,255,0.48)',
            letterSpacing: '0.02em',
            whiteSpace: 'nowrap',
          }}
        >
          {calc.model}
        </div>
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 9,
            color: 'rgba(255,255,255,0.22)',
            marginTop: 1,
          }}
        >
          {calc.manufacturer.split(' ')[0]} · {calc.year}
        </div>
      </div>
    </button>
  )
}

export default function BrowseStrip({ activeId, onSelect }: BrowseStripProps) {
  return (
    <div
      style={{
        height: 76,
        background: 'var(--panel-bg)',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        gap: 14,
        flexShrink: 0,
      }}
    >
      {/* Label */}
      <span
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 9,
          color: 'rgba(255,255,255,0.2)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          flexShrink: 0,
          whiteSpace: 'nowrap',
        }}
      >
        Collection
      </span>

      {/* Divider */}
      <div
        style={{
          width: 1,
          height: 22,
          background: 'rgba(255,255,255,0.08)',
          flexShrink: 0,
        }}
      />

      {/* Scrollable thumb row */}
      <div
        className="hide-scroll"
        style={{
          display: 'flex',
          gap: 7,
          overflowX: 'auto',
          flex: 1,
        }}
      >
        {CALCULATORS.map((calc) => (
          <ThumbCard
            key={calc.id}
            calc={calc}
            isActive={activeId === calc.id}
            onSelect={() => onSelect(calc.id)}
          />
        ))}
      </div>
    </div>
  )
}
