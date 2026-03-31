import { useState } from 'react'
import { EngineState } from '../../engine/types'

// ─── Win 3.1 button — proper component so useState is a valid hook ────────────

interface Win31ButtonProps {
  label: string
  action: string
  span?: number
  variant?: 'normal' | 'operator' | 'equals' | 'memory' | 'clear' | 'back'
  onPress: (action: string) => void
}

function Win31Button({ label, action, span, variant = 'normal', onPress }: Win31ButtonProps) {
  const [pressed, setPressed] = useState(false)

  const textColor =
    variant === 'operator' || variant === 'equals'
      ? '#800000'
      : variant === 'back' || variant === 'clear'
      ? '#000080'
      : '#000000'

  return (
    <div
      role="button"
      tabIndex={0}
      style={{
        gridColumn: span ? `span ${span}` : undefined,
        fontSize: '11px',
        fontFamily: "'MS Sans Serif', Arial, sans-serif",
        background: '#c0c0c0',
        color: textColor,
        border: '1.5px solid',
        borderColor: pressed
          ? '#808080 #dfdfdf #dfdfdf #808080'
          : '#dfdfdf #808080 #808080 #dfdfdf',
        boxShadow: pressed ? 'inset 1px 1px 0 #808080' : 'inset 1px 1px 0 #ffffff',
        cursor: 'default',
        minHeight: '26px',
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: pressed ? '2px' : undefined,
        paddingLeft: pressed ? '2px' : undefined,
      }}
      onMouseDown={() => {
        setPressed(true)
        onPress(action)
      }}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onPress(action)
      }}
    >
      {label}
    </div>
  )
}

// ─── Windows 3.1 Calculator ───────────────────────────────────────────────────

interface Windows31Props {
  state: EngineState
  press: (action: string) => void
}

export default function Windows31({ state, press }: Windows31Props) {
  const displayValue = state.error ? 'Error' : state.buf

  const btn = (
    label: string,
    action: string,
    variant?: Win31ButtonProps['variant'],
    span?: number
  ) => (
    <Win31Button
      key={`${label}-${action}`}
      label={label}
      action={action}
      variant={variant}
      span={span}
      onPress={press}
    />
  )

  // Win3.1 border — lighter on top/left, darker on bottom/right
  const win3Border: React.CSSProperties = {
    border: '1.5px solid',
    borderColor: '#dfdfdf #808080 #808080 #dfdfdf',
    boxShadow: 'inset 1px 1px 0 #ffffff',
  }

  return (
    <div
      style={{
        width: '224px',
        background: '#c0c0c0',
        ...win3Border,
        fontFamily: "'MS Sans Serif', Arial, sans-serif",
      }}
    >
      {/* ── Title bar ──────────────────────────────────────────────────────── */}
      <div
        style={{
          background: '#000080',
          color: '#ffffff',
          fontSize: '11px',
          fontWeight: 'bold',
          padding: '2px 3px 2px 4px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          userSelect: 'none',
        }}
      >
        {/* System menu icon + title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          {/* System menu box */}
          <div
            style={{
              width: 16,
              height: 13,
              background: '#c0c0c0',
              border: '1px solid',
              borderColor: '#dfdfdf #808080 #808080 #dfdfdf',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '8px',
              color: '#000',
              lineHeight: 1,
            }}
          >
            ─
          </div>
          <span>Calculator</span>
        </div>

        {/* Minimize + Maximize buttons */}
        <div style={{ display: 'flex', gap: '2px' }}>
          {['▾', '▴'].map((icon, i) => (
            <div
              key={i}
              style={{
                width: 16,
                height: 13,
                background: '#c0c0c0',
                border: '1.5px solid',
                borderColor: '#dfdfdf #808080 #808080 #dfdfdf',
                boxShadow: 'inset 1px 1px 0 #ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '8px',
                color: '#000',
                cursor: 'default',
              }}
            >
              {icon}
            </div>
          ))}
        </div>
      </div>

      {/* ── Menu bar ───────────────────────────────────────────────────────── */}
      <div
        style={{
          borderBottom: '1px solid #808080',
          padding: '2px 6px',
          display: 'flex',
          gap: '8px',
          fontSize: '11px',
          userSelect: 'none',
          background: '#c0c0c0',
        }}
      >
        {['Edit', 'View', 'Help'].map((item) => (
          <span key={item} style={{ padding: '1px 3px', cursor: 'default' }}>
            {item}
          </span>
        ))}
      </div>

      {/* ── Display ────────────────────────────────────────────────────────── */}
      <div style={{ padding: '6px 6px 4px' }}>
        <div
          style={{
            background: '#ffffff',
            border: '1.5px solid',
            borderColor: '#808080 #dfdfdf #dfdfdf #808080',
            textAlign: 'right',
            padding: '2px 6px',
            fontSize: '20px',
            fontWeight: 'bold',
            fontFamily: "'Share Tech Mono', 'Courier New', monospace",
            minHeight: '28px',
            lineHeight: '24px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            color: '#000000',
          }}
        >
          {displayValue}
        </div>
      </div>

      {/* ── Button area ────────────────────────────────────────────────────── */}
      <div style={{ padding: '0 6px 6px' }}>

        {/* Row 1 — Back · CE · C */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '3px',
            marginBottom: '3px',
          }}
        >
          {btn('Back', 'back', 'back')}
          {btn('CE', 'ce', 'back')}
          {btn('C', 'clear', 'clear')}
        </div>

        {/* Main 6-column grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '3px',
          }}
        >
          {/* Row 2 */}
          {btn('MC', 'mc', 'memory')}
          {btn('7', 'digit_7')}
          {btn('8', 'digit_8')}
          {btn('9', 'digit_9')}
          {btn('/', 'div', 'operator')}
          {btn('sqrt', 'sqrt', 'operator')}

          {/* Row 3 */}
          {btn('MR', 'rcl', 'memory')}
          {btn('4', 'digit_4')}
          {btn('5', 'digit_5')}
          {btn('6', 'digit_6')}
          {btn('*', 'mul', 'operator')}
          {btn('%', 'pct', 'operator')}

          {/* Row 4 */}
          {btn('MS', 'sto', 'memory')}
          {btn('1', 'digit_1')}
          {btn('2', 'digit_2')}
          {btn('3', 'digit_3')}
          {btn('-', 'sub', 'operator')}
          {btn('1/x', 'inv', 'operator')}

          {/* Row 5 */}
          {btn('M+', 'madd', 'memory')}
          {btn('0', 'digit_0', undefined, 2)}
          {btn('+/-', 'neg')}
          {btn('.', 'dot')}
          {btn('+', 'add', 'operator')}
          {btn('=', 'eq', 'equals')}
        </div>
      </div>
    </div>
  )
}
