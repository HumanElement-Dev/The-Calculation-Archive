import { EngineState } from '../../engine/types'
import CalculatorButton from '../CalculatorButton'

interface CasioProps {
  state: EngineState
  press: (action: string) => void
}

export default function CasioFX7000G({ state, press }: CasioProps) {
  const displayValue = state.error ? 'Error' : state.buf
  const isError = state.error

  const btn = (
    label: string,
    action: string,
    variant: 'num' | 'op' | 'fn' | 'eq' | 'clear'
  ) => (
    <CalculatorButton
      label={label}
      variant={variant}
      calcFamily="casio"
      onPress={() => press(action)}
    />
  )

  return (
    // Outer chassis
    <div
      style={{
        background: '#0e0e14',
        borderRadius: '8px 8px 13px 13px',
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
          width: '200px',
          background: 'linear-gradient(170deg, #1e1e26 0%, #16161e 100%)',
          borderRadius: '6px 6px 11px 11px',
          padding: '0 0 12px 0',
          fontFamily: "'DM Mono', monospace",
          boxShadow: 'inset 0 1px 0 rgba(160,155,215,0.06)',
        }}
      >
        {/* Casio header bar */}
        <div
          style={{
            height: '22px',
            background: 'linear-gradient(180deg, #1c1c28 0%, #14141e 100%)',
            borderRadius: '5px 5px 0 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 10px',
            boxShadow: [
              'inset 0 1px 0 rgba(255,255,255,0.04)',
              '0 1px 0 rgba(0,0,0,0.4)',
            ].join(', '),
          }}
        >
          <span
            style={{
              fontSize: '9px',
              fontWeight: 600,
              letterSpacing: '0.2em',
              color: 'rgba(160,155,215,0.6)',
            }}
          >
            CASIO
          </span>
          <span
            style={{
              fontSize: '7px',
              fontWeight: 400,
              letterSpacing: '0.1em',
              color: 'rgba(160,155,215,0.3)',
            }}
          >
            fx-7000G
          </span>
        </div>

        {/* Screen area */}
        <div style={{ padding: '6px 8px 6px' }}>
          {/* Bezel */}
          <div
            style={{
              background: '#0c0c14',
              borderRadius: '4px',
              padding: '3px',
              boxShadow: [
                'inset 0 2px 6px rgba(0,0,0,0.85)',
                'inset 0 0 0 1px rgba(0,0,0,0.6)',
                '0 1px 0 rgba(160,155,215,0.04)',
              ].join(', '),
            }}
          >
            {/* LCD panel */}
            <div
              style={{
                background: '#141e1a',
                borderRadius: '2px',
                padding: '4px 6px',
                boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.5)',
              }}
            >
              {/* Indicators */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '2px',
                  fontSize: '5.5px',
                  letterSpacing: '0.06em',
                  fontWeight: 500,
                }}
              >
                <span style={{ color: 'rgba(100,195,140,0.4)' }}>COMP</span>
                <span
                  style={{
                    color: 'rgba(100,195,140,0.9)',
                    opacity: state.shift ? 1 : 0.2,
                  }}
                >
                  SHIFT
                </span>
              </div>

              {/* Main display */}
              <div
                style={{
                  fontFamily: "'Share Tech Mono', 'DM Mono', monospace",
                  fontSize: '15px',
                  textAlign: 'right',
                  letterSpacing: '-0.01em',
                  lineHeight: 1,
                  minHeight: '19px',
                  overflow: 'hidden',
                  color: isError ? '#e05050' : '#72c8a0',
                  textShadow: isError
                    ? '0 0 8px rgba(220,80,80,0.6)'
                    : '0 0 8px rgba(100,195,140,0.4)',
                }}
              >
                {displayValue}
              </div>

              {/* Sub-display */}
              <div
                style={{
                  fontFamily: "'Share Tech Mono', 'DM Mono', monospace",
                  fontSize: '8px',
                  textAlign: 'right',
                  color: 'rgba(100,195,140,0.3)',
                  marginTop: '2px',
                  lineHeight: 1,
                  minHeight: '10px',
                  overflow: 'hidden',
                }}
              >
                {state.op && state.val !== null ? `${state.val} ${state.op}` : ''}
              </div>
            </div>
          </div>
        </div>

        {/* Button grid — 6 columns */}
        <div style={{ padding: '0 7px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: '3px',
            }}
          >
            {/* Row 1 */}
            {btn('SHIFT', 'shift', 'op')}
            {btn('MODE', 'deg_toggle', 'op')}
            {btn('sin', 'sin', 'fn')}
            {btn('cos', 'cos', 'fn')}
            {btn('tan', 'tan', 'fn')}
            {btn('AC', 'clear', 'clear')}

            {/* Row 2 */}
            {btn('ALPHA', 'shift', 'op')}
            {btn('GRAPH', 'digit_0', 'op')}
            {btn('ln', 'ln', 'fn')}
            {btn('log', 'log', 'fn')}
            {btn('√', 'sqrt', 'fn')}
            {btn('DEL', 'del', 'clear')}

            {/* Row 3 */}
            {btn('7', 'digit_7', 'num')}
            {btn('8', 'digit_8', 'num')}
            {btn('9', 'digit_9', 'num')}
            {btn('÷', 'div', 'op')}
            {btn('×', 'mul', 'op')}
            {btn('xʸ', 'pow', 'num')}

            {/* Row 4 */}
            {btn('4', 'digit_4', 'num')}
            {btn('5', 'digit_5', 'num')}
            {btn('6', 'digit_6', 'num')}
            {btn('−', 'sub', 'op')}
            {btn('+', 'add', 'op')}
            {btn('x²', 'sq', 'fn')}

            {/* Row 5 */}
            {btn('1', 'digit_1', 'num')}
            {btn('2', 'digit_2', 'num')}
            {btn('3', 'digit_3', 'num')}
            {btn('(−)', 'neg', 'num')}
            {btn('=', 'eq', 'op')}
            {btn('π', 'pi', 'fn')}

            {/* Row 6 */}
            {btn('0', 'digit_0', 'num')}
            {btn('.', 'dot', 'num')}
            {btn('EXP', 'ee', 'num')}
            {btn('ANS', 'ans', 'num')}
            <div style={{ gridColumn: 'span 2' }}>
              <CalculatorButton
                label="EXE"
                variant="clear"
                calcFamily="casio"
                onPress={() => press('eq')}
                style={{ height: '22px', width: '100%' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
