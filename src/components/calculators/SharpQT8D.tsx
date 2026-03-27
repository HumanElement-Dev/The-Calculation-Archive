import { EngineState } from '../../engine/types'
import CalculatorButton from '../CalculatorButton'

interface SharpQT8DProps {
  state: EngineState
  press: (action: string) => void
}

// Small digit-position labels below VFD display (8 7 6 5 4 3 2 1)
function VFDPositionRow() {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '2px', marginTop: '3px' }}>
      {[8, 7, 6, 5, 4, 3, 2, 1].map((n) => (
        <span
          key={n}
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '5.5px',
            color: 'rgba(26,255,144,0.22)',
            width: '14px',
            textAlign: 'center',
          }}
        >
          {n}
        </span>
      ))}
    </div>
  )
}

export default function SharpQT8D({ state, press }: SharpQT8DProps) {
  const displayValue = state.error ? 'Error' : state.buf
  const isError = state.error

  const numBtn = (label: string, action: string) => (
    <CalculatorButton label={label} variant="num" calcFamily="sharp" onPress={() => press(action)} />
  )

  return (
    <div
      style={{
        width: '188px',
        // Flat cool grey — matches the slightly warm-neutral grey of the real body
        background: '#c2c0bc',
        borderRadius: '9px',
        boxShadow: [
          '0 30px 80px rgba(0,0,0,0.88)',
          '0 10px 28px rgba(0,0,0,0.6)',
          '0 3px 7px rgba(0,0,0,0.5)',
          // Subtle top rim catchlight — plastic sheen
          'inset 0 1px 0 rgba(255,255,255,0.38)',
          'inset 0 -1px 0 rgba(0,0,0,0.12)',
        ].join(', '),
        fontFamily: "'DM Mono', monospace",
      }}
    >
      {/* ── Ventilation grille ─────────────────────────────── */}
      {/* Fine horizontal slots across full width */}
      <div
        style={{
          height: '26px',
          borderRadius: '9px 9px 0 0',
          background: [
            '#c2c0bc',
            // Fine parallel horizontal grille slots
            `repeating-linear-gradient(
              180deg,
              transparent     0px,
              transparent     3.5px,
              rgba(0,0,0,0.18) 3.5px,
              rgba(0,0,0,0.18) 4.5px
            )`,
          ].join(', '),
        }}
      />

      {/* ── Blank grey body section ─────────────────────────── */}
      {/* Tall empty grey area — very characteristic of this model */}
      <div
        style={{
          height: '72px',
          background: '#c2c0bc',
          // Subtle ambient gradient — lit from top-left
          backgroundImage:
            'linear-gradient(160deg, rgba(255,255,255,0.08) 0%, transparent 60%)',
        }}
      />

      {/* ── Dark charcoal panel ─────────────────────────────── */}
      {/* Goes nearly edge-to-edge with just 5px grey side strips */}
      <div
        style={{
          margin: '0 5px',
          background: '#232320',
          borderRadius: '3px 3px 0 0',
          padding: '0',
          boxShadow: [
            'inset 0 2px 8px rgba(0,0,0,0.7)',
            'inset 0 0 0 1px rgba(0,0,0,0.45)',
          ].join(', '),
        }}
      >
        {/* ── Display cavity ──────────────────────────────────── */}
        {/* Deep well — the key physical feature. Uses layered shadows
            to suggest a hooded 3D pocket with glass cover on top. */}
        <div
          style={{
            margin: '8px 8px 0',
            background: '#0a0a08',
            borderRadius: '2px 2px 0 0',
            // The cavity walls: strong inset shadow left + bottom,
            // lighter inset top-right to suggest glass cover glare
            boxShadow: [
              // Deep inner shadow on left + bottom walls
              'inset 4px 0 10px rgba(0,0,0,0.9)',
              'inset 0 6px 14px rgba(0,0,0,0.95)',
              // Very faint top-right glass catchlight
              'inset -1px -1px 0 rgba(255,255,255,0.04)',
              // Outer frame
              '0 0 0 1px rgba(0,0,0,0.6)',
            ].join(', '),
            overflow: 'hidden',
          }}
        >
          {/* Glass cover lip — very subtle lighter strip at top */}
          <div
            style={{
              height: '3px',
              background:
                'linear-gradient(180deg, rgba(180,200,190,0.08) 0%, transparent 100%)',
            }}
          />

          {/* VFD display surface */}
          <div
            style={{
              background: '#050504',
              padding: '6px 6px 4px',
            }}
          >
            <div
              style={{
                fontFamily: "'Share Tech Mono', 'DM Mono', monospace",
                fontSize: '22px',
                textAlign: 'right',
                letterSpacing: '0.04em',
                lineHeight: 1,
                minHeight: '26px',
                overflow: 'hidden',
                color: isError ? '#e05050' : '#1aff90',
                textShadow: isError
                  ? '0 0 10px rgba(220,80,80,0.7)'
                  : [
                      '0 0 5px #1aff90',
                      '0 0 14px rgba(26,255,144,0.6)',
                      '0 0 28px rgba(26,255,144,0.22)',
                    ].join(', '),
              }}
            >
              {displayValue}
            </div>
            <VFDPositionRow />
          </div>

          {/* Bottom of cavity — visible floor shadow */}
          <div
            style={{
              height: '10px',
              background:
                'linear-gradient(180deg, #050504 0%, #080806 100%)',
              boxShadow: 'inset 0 -3px 6px rgba(0,0,0,0.8)',
            }}
          />
        </div>

        {/* ── Button grid ─────────────────────────────────────── */}
        <div style={{ padding: '10px 8px 12px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '6px',
            }}
          >
            {/* Row 1 */}
            {numBtn('7', 'digit_7')}
            {numBtn('8', 'digit_8')}
            {numBtn('9', 'digit_9')}
            <CalculatorButton label="C" variant="num" calcFamily="sharp" onPress={() => press('clear')} />

            {/* Row 2 */}
            {numBtn('4', 'digit_4')}
            {numBtn('5', 'digit_5')}
            {numBtn('6', 'digit_6')}
            <CalculatorButton label="−=" variant="clear" calcFamily="sharp" onPress={() => press('sub')} />

            {/* Row 3 */}
            {numBtn('1', 'digit_1')}
            {numBtn('2', 'digit_2')}
            {numBtn('3', 'digit_3')}
            <CalculatorButton label="×÷" variant="num" calcFamily="sharp" onPress={() => press('mul')} />

            {/* Row 4 — 0 is double-wide blue, · is single blue, += white */}
            <div style={{ gridColumn: 'span 2' }}>
              <CalculatorButton
                label="0"
                variant="fn"
                calcFamily="sharp"
                onPress={() => press('digit_0')}
                style={{ height: '38px', width: '100%' }}
              />
            </div>
            <CalculatorButton label="·" variant="fn" calcFamily="sharp" onPress={() => press('dot')} />
            <CalculatorButton label="+=" variant="num" calcFamily="sharp" onPress={() => press('add')} />
          </div>
        </div>
      </div>

      {/* ── Bottom grey cap ──────────────────────────────────── */}
      <div
        style={{
          height: '10px',
          margin: '0 5px',
          background: '#b8b6b2',
          borderRadius: '0 0 2px 2px',
          boxShadow: 'inset 0 1px 0 rgba(0,0,0,0.2)',
        }}
      />
      {/* Outer rounded bottom */}
      <div
        style={{
          height: '9px',
          background: 'linear-gradient(180deg, #bab8b4 0%, #aeaca8 100%)',
          borderRadius: '0 0 9px 9px',
          boxShadow: 'inset 0 1px 0 rgba(0,0,0,0.1)',
        }}
      />
    </div>
  )
}
