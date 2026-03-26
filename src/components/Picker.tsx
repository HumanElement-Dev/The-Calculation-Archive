import { CalcMeta, CALCULATORS } from '../data/calculators'

interface PickerProps {
  active: string
  onSelect: (id: string) => void
}

function PickerCard({
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
        background: isActive ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)',
        border: `0.5px solid ${isActive ? calc.accentColor.replace('1)', '0.35)') : 'rgba(255,255,255,0.08)'}`,
        borderRadius: '8px',
        padding: '8px 12px',
        minWidth: '72px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        transition: 'background 0.2s ease, border-color 0.2s ease',
        outline: 'none',
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'
          ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.16)'
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'
          ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'
        }
      }}
    >
      {/* Thumb */}
      <div
        style={{
          width: '28px',
          height: '38px',
          background: calc.thumbBg,
          border: `1px solid ${calc.thumbBorder}`,
          borderRadius: '3px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '8px',
            fontWeight: 500,
            color: calc.thumbText,
            letterSpacing: '0.05em',
          }}
        >
          {calc.thumbLabel}
        </span>
      </div>
      <span
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: '9px',
          color: 'rgba(255,255,255,0.45)',
          whiteSpace: 'nowrap',
        }}
      >
        {calc.model}
      </span>
      <span
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: '8px',
          color: 'rgba(255,255,255,0.22)',
        }}
      >
        {calc.year}
      </span>
    </button>
  )
}

export default function Picker({ active, onSelect }: PickerProps) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '8px',
        justifyContent: 'center',
        marginTop: '28px',
      }}
    >
      {CALCULATORS.map((calc) => (
        <PickerCard
          key={calc.id}
          calc={calc}
          isActive={active === calc.id}
          onSelect={() => onSelect(calc.id)}
        />
      ))}
    </div>
  )
}
