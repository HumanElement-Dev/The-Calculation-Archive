import { EngineState } from '../../engine/types'
import CalculatorButton from '../CalculatorButton'

interface HP12CProps {
  state: EngineState
  press: (action: string) => void
}

type HpVariant = 'num' | 'op' | 'fn' | 'eq' | 'clear'

export default function HP12C({ state, press }: HP12CProps) {
  const displayValue = state.error ? 'Error' : state.buf
  const isError = state.error

  const btn = (label: string, action: string, variant: HpVariant) => (
    <CalculatorButton
      label={label}
      variant={variant}
      calcFamily="hp"
      onPress={() => press(action)}
    />
  )

  return (
    // Outer chassis
    <div
      style={{
        background: '#0a0a12',
        borderRadius: '10px 10px 15px 15px',
        padding: '2px',
        boxShadow: [
          '0 32px 80px rgba(0,0,0,0.95)',
          '0 12px 30px rgba(0,0,0,0.75)',
          '0 4px 8px rgba(0,0,0,0.6)',
        ].join(', '),
      }}
    >
      {/* Inner body */}
      <div
        style={{
          width: '220px',
          background: 'linear-gradient(170deg, #1c1c24 0%, #14141e 100%)',
          borderRadius: '8px 8px 13px 13px',
          padding: '0 0 12px 0',
          fontFamily: "'DM Mono', monospace",
          boxShadow: 'inset 0 1px 0 rgba(80,120,220,0.07)',
        }}
      >
        {/* HP header bar */}
        <div
          style={{
            height: '30px',
            background: 'linear-gradient(180deg, #1c1e2e 0%, #14161e 100%)',
            borderRadius: '7px 7px 0 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 12px',
            boxShadow: [
              'inset 0 1px 0 rgba(255,255,255,0.04)',
              '0 1px 0 rgba(0,0,0,0.4)',
            ].join(', '),
          }}
        >
          <span
            style={{
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.28em',
              color: 'rgba(85,135,230,0.85)',
            }}
          >
            hp
          </span>
          <span
            style={{
              fontSize: '8px',
              fontWeight: 400,
              letterSpacing: '0.1em',
              color: 'rgba(85,135,230,0.35)',
            }}
          >
            12C
          </span>
        </div>

        {/* Screen area */}
        <div style={{ padding: '8px 10px 8px' }}>
          {/* Bezel */}
          <div
            style={{
              background: '#0a0c14',
              borderRadius: '4px',
              padding: '3px',
              boxShadow: [
                'inset 0 2px 6px rgba(0,0,0,0.85)',
                'inset 0 0 0 1px rgba(0,0,0,0.6)',
                '0 1px 0 rgba(80,120,220,0.05)',
              ].join(', '),
            }}
          >
            {/* LCD panel */}
            <div
              style={{
                background: '#1a2218',
                borderRadius: '2px',
                padding: '5px 8px',
                boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.5)',
              }}
            >
              {/* Annotation row */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '3px',
                  fontSize: '6px',
                  letterSpacing: '0.06em',
                  fontWeight: 500,
                }}
              >
                <span style={{ color: 'rgba(120,180,80,0.4)' }}>FIN</span>
                <span
                  style={{
                    color: 'rgba(235,165,60,0.9)',
                    opacity: state.shift === 'f' ? 1 : 0.2,
                  }}
                >
                  f
                </span>
                <span
                  style={{
                    color: 'rgba(135,210,85,0.9)',
                    opacity: state.shift === 'g' ? 1 : 0.2,
                  }}
                >
                  g
                </span>
              </div>

              {/* Main display */}
              <div
                style={{
                  fontFamily: "'Share Tech Mono', 'DM Mono', monospace",
                  fontSize: '20px',
                  textAlign: 'right',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  minHeight: '24px',
                  overflow: 'hidden',
                  color: isError ? '#e05050' : '#8ab868',
                  textShadow: isError
                    ? '0 0 10px rgba(220,80,80,0.6)'
                    : '0 0 10px rgba(120,180,80,0.4), 0 0 22px rgba(90,160,50,0.16)',
                }}
              >
                {displayValue}
              </div>
            </div>
          </div>
        </div>

        {/* Button grid */}
        <div style={{ padding: '0 8px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '4px',
            }}
          >
            {/* Row 1 */}
            {btn('f', 'shift_f', 'fn')}
            {btn('g', 'shift_g', 'eq')}
            {btn('STO', 'sto', 'num')}
            {btn('RCL', 'rcl', 'num')}
            {btn('ENTER', 'enter', 'num')}

            {/* Row 2 — financial */}
            {btn('n', 'digit_0', 'num')}
            {btn('i', 'digit_0', 'num')}
            {btn('PV', 'digit_0', 'num')}
            {btn('PMT', 'digit_0', 'num')}
            {btn('FV', 'digit_0', 'num')}

            {/* Row 3 */}
            {btn('CHS', 'chs', 'num')}
            {btn('7', 'digit_7', 'num')}
            {btn('8', 'digit_8', 'num')}
            {btn('9', 'digit_9', 'num')}
            {btn('÷', 'div', 'op')}

            {/* Row 4 */}
            {btn('yˣ', 'pow', 'num')}
            {btn('4', 'digit_4', 'num')}
            {btn('5', 'digit_5', 'num')}
            {btn('6', 'digit_6', 'num')}
            {btn('×', 'mul', 'op')}

            {/* Row 5 */}
            {btn('1/x', 'inv', 'num')}
            {btn('1', 'digit_1', 'num')}
            {btn('2', 'digit_2', 'num')}
            {btn('3', 'digit_3', 'num')}
            {btn('−', 'sub', 'op')}

            {/* Row 6 */}
            {btn('%', 'percent', 'num')}
            {btn('0', 'digit_0', 'num')}
            {btn('.', 'dot', 'num')}
            {btn('ENTER', 'enter', 'num')}
            {btn('+', 'add', 'op')}
          </div>

          {/* Bottom row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '4px',
              marginTop: '4px',
            }}
          >
            <CalculatorButton label="CLX" variant="clear" calcFamily="hp" onPress={() => press('clx')} />
            <CalculatorButton label="←" variant="num" calcFamily="hp" onPress={() => press('back')} />
          </div>
        </div>
      </div>
    </div>
  )
}
