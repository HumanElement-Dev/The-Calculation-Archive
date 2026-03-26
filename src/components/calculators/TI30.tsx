import { EngineState } from '../../engine/types'
import CalculatorButton from '../CalculatorButton'

interface TI30Props {
  state: EngineState
  press: (action: string) => void
}

export default function TI30({ state, press }: TI30Props) {
  const displayValue = state.error ? 'Error' : state.buf
  const isError = state.error

  const btn = (
    label: string,
    action: string,
    variant: 'num' | 'op' | 'fn' | 'eq' | 'clear',
    secondary?: string
  ) => (
    <CalculatorButton
      label={label}
      secondaryLabel={secondary}
      variant={variant}
      calcFamily="ti"
      onPress={() => press(action)}
    />
  )

  return (
    // Outer chassis — slightly darker, creates the body-edge illusion
    <div
      style={{
        background: '#0e0b03',
        borderRadius: '13px 13px 19px 19px',
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
          width: '190px',
          background: 'linear-gradient(168deg, #28220f 0%, #1e1a0a 55%, #161305 100%)',
          borderRadius: '11px 11px 17px 17px',
          padding: '0 0 12px 0',
          fontFamily: "'DM Mono', monospace",
          boxShadow: 'inset 0 1px 0 rgba(210,165,50,0.08)',
        }}
      >
        {/* Gold shimmer top stripe */}
        <div
          style={{
            height: '6px',
            background: 'linear-gradient(90deg, #1a1506 0%, #3a2e10 25%, #c8a030 50%, #3a2e10 75%, #1a1506 100%)',
            borderRadius: '10px 10px 0 0',
            boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.4), 0 1px 0 rgba(210,165,50,0.1)',
          }}
        />

        {/* Brand label */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            padding: '6px 12px 2px',
          }}
        >
          <span
            style={{
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.18em',
              color: 'rgba(210,168,55,0.65)',
              textTransform: 'uppercase',
            }}
          >
            Texas Instruments
          </span>
          <span
            style={{
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.05em',
              color: 'rgba(210,168,55,0.75)',
            }}
          >
            TI-30
          </span>
        </div>

        {/* Screen area */}
        <div style={{ padding: '4px 10px 8px' }}>
          {/* Screen bezel — outer recessed frame */}
          <div
            style={{
              background: '#0e0c06',
              borderRadius: '4px',
              padding: '3px',
              boxShadow: [
                'inset 0 2px 6px rgba(0,0,0,0.85)',
                'inset 0 0 0 1px rgba(0,0,0,0.6)',
                '0 1px 0 rgba(210,165,50,0.06)',
              ].join(', '),
            }}
          >
            {/* LCD panel */}
            <div
              style={{
                background: '#1e2a18',
                borderRadius: '2px',
                padding: '6px 8px 5px',
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
                <span style={{ color: state.mode === 'DEG' ? 'rgba(140,200,90,0.65)' : 'rgba(140,200,90,0.2)' }}>
                  DEG
                </span>
                <span style={{ color: state.mem !== 0 ? 'rgba(140,200,90,0.65)' : 'rgba(140,200,90,0.18)' }}>
                  M
                </span>
                <span
                  style={{
                    color: state.shift
                      ? 'rgba(120,165,240,0.85)'
                      : 'rgba(120,165,240,0.2)',
                  }}
                >
                  2nd
                </span>
              </div>

              {/* Main display */}
              <div
                style={{
                  fontFamily: "'Share Tech Mono', 'DM Mono', monospace",
                  fontSize: '22px',
                  textAlign: 'right',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  minHeight: '26px',
                  overflow: 'hidden',
                  color: isError ? '#e05050' : '#9dca70',
                  textShadow: isError
                    ? '0 0 10px rgba(220,80,80,0.6)'
                    : '0 0 10px rgba(140,205,90,0.45), 0 0 24px rgba(100,180,60,0.18)',
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
            {/* Row 1 — function */}
            {btn('2nd', '2nd', 'fn')}
            {btn('sin', 'sin', 'fn', 'arcsin')}
            {btn('cos', 'cos', 'fn', 'arccos')}
            {btn('tan', 'tan', 'fn', 'arctan')}
            {btn('ln', 'ln', 'fn', 'eˣ')}

            {/* Row 2 — function */}
            {btn('π', 'pi', 'fn', 'log')}
            {btn('x²', 'sq', 'fn', '³√x')}
            {btn('√x', 'sqrt', 'fn', 'x³')}
            {btn('yˣ', 'pow', 'op', 'x√y')}
            {btn('1/x', 'inv', 'fn', 'n!')}

            {/* Row 3 */}
            {btn('EE', 'ee', 'op')}
            {btn('7', 'digit_7', 'num')}
            {btn('8', 'digit_8', 'num')}
            {btn('9', 'digit_9', 'num')}
            {btn('÷', 'div', 'op')}

            {/* Row 4 */}
            {btn('+/−', 'neg', 'op')}
            {btn('4', 'digit_4', 'num')}
            {btn('5', 'digit_5', 'num')}
            {btn('6', 'digit_6', 'num')}
            {btn('×', 'mul', 'op')}

            {/* Row 5 */}
            {btn('STO', 'sto', 'op')}
            {btn('1', 'digit_1', 'num')}
            {btn('2', 'digit_2', 'num')}
            {btn('3', 'digit_3', 'num')}
            {btn('−', 'sub', 'op')}

            {/* Row 6 */}
            {btn('RCL', 'rcl', 'op')}
            {btn('0', 'digit_0', 'num')}
            {btn('.', 'dot', 'num')}
            {btn('=', 'eq', 'eq')}
            {btn('+', 'add', 'op')}
          </div>

          {/* Bottom 2-button utility row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '4px',
              marginTop: '4px',
            }}
          >
            <CalculatorButton
              label="CE/C"
              variant="clear"
              calcFamily="ti"
              onPress={() => press('clear')}
            />
            <CalculatorButton
              label={state.mode === 'DEG' ? 'DEG' : 'RAD'}
              variant="op"
              calcFamily="ti"
              onPress={() => press('deg_toggle')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
