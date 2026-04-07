import { useState } from 'react'
import { EngineState } from '../../engine/types'

// ─── Types ────────────────────────────────────────────────────────────────────

type BtnColor = 'black' | 'red' | 'blue'

// ─── Win 3.1 beveled button ───────────────────────────────────────────────────

function W31Btn({
  label,
  action,
  color = 'black',
  disabled = false,
  onPress,
}: {
  label: string
  action: string
  color?: BtnColor
  disabled?: boolean
  onPress: (a: string) => void
}) {
  const [pressed, setPressed] = useState(false)

  const textColor =
    disabled   ? '#a0a0a0' :
    color === 'red'  ? '#800000' :
    color === 'blue' ? '#000080' :
    '#000000'

  return (
    <div
      role="button"
      style={{
        flex: 1,
        height: 22,
        minWidth: 0,
        fontSize: 11,
        fontFamily: '"MS Sans Serif", "Arial", sans-serif',
        background: '#c0c0c0',
        color: textColor,
        border: '1px solid',
        // Classic Win3.1 bevel: light top-left, dark bottom-right
        borderColor: pressed
          ? '#808080 #dfdfdf #dfdfdf #808080'
          : '#ffffff #808080 #808080 #ffffff',
        boxShadow: pressed
          ? 'inset 1px 1px 1px rgba(0,0,0,0.2)'
          : 'none',
        cursor: 'default',
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: pressed ? 1 : 0,
        paddingLeft: pressed ? 1 : 0,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      }}
      onMouseDown={() => {
        if (!disabled) {
          setPressed(true)
          onPress(action)
        }
      }}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
    >
      {label}
    </div>
  )
}

// ─── Row wrapper ──────────────────────────────────────────────────────────────

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 2, marginBottom: 2 }}>
      {children}
    </div>
  )
}

// ─── Radio button (visual only) ───────────────────────────────────────────────

function Radio({ label, checked }: { label: string; checked?: boolean }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 3,
      fontSize: 11,
      fontFamily: '"MS Sans Serif", Arial, sans-serif',
      cursor: 'default',
      userSelect: 'none',
      whiteSpace: 'nowrap',
      marginRight: 6,
    }}>
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 11,
        height: 11,
        borderRadius: '50%',
        background: '#ffffff',
        border: '1px solid',
        borderColor: '#808080 #dfdfdf #dfdfdf #808080',
        flexShrink: 0,
      }}>
        {checked && (
          <span style={{
            display: 'block',
            width: 5,
            height: 5,
            borderRadius: '50%',
            background: '#000',
          }} />
        )}
      </span>
      {label}
    </span>
  )
}

// ─── Checkbox (visual only) ───────────────────────────────────────────────────

function Checkbox({ label }: { label: string }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 3,
      fontSize: 11,
      fontFamily: '"MS Sans Serif", Arial, sans-serif',
      cursor: 'default',
      userSelect: 'none',
      flex: 1,
    }}>
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 11,
        height: 11,
        background: '#ffffff',
        border: '1px solid',
        borderColor: '#808080 #dfdfdf #dfdfdf #808080',
        flexShrink: 0,
        fontSize: 9,
        lineHeight: 1,
      }} />
      {label}
    </span>
  )
}

// ─── Windows 3.1 Calculator ──────────────────────────────────────────────────

export default function Windows31({
  state,
  press,
}: {
  state: EngineState
  press: (a: string) => void
}) {
  const displayValue = state.error ? 'Error' : state.buf

  // Functional button
  const f = (label: string, action: string, color?: BtnColor) => (
    <W31Btn key={label} label={label} action={action} color={color} onPress={press} />
  )
  // Non-engine button — looks fully active, just does nothing when pressed
  const d = (label: string, color: BtnColor = 'blue') => (
    <W31Btn key={label} label={label} action="" color={color} onPress={() => {}} />
  )

  // Win3.1 raised-border style (used for checkbox/radio panels)
  const panel: React.CSSProperties = {
    border: '1px solid',
    borderColor: '#808080 #dfdfdf #dfdfdf #808080',
    background: '#c0c0c0',
  }

  return (
    <div
      style={{
        width: 360,
        background: '#c0c0c0',
        fontFamily: '"MS Sans Serif", Arial, sans-serif',
        // Win3.1 outer window frame
        border: '2px solid',
        borderColor: '#dfdfdf #404040 #404040 #dfdfdf',
        boxShadow: 'inset 1px 1px 0 #ffffff',
      }}
    >
      {/* ── Title bar ────────────────────────────────────────────────── */}
      <div style={{
        background: '#000080',
        color: '#ffffff',
        fontSize: 11,
        fontWeight: 'bold',
        padding: '2px 3px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        userSelect: 'none',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          {/* System menu icon */}
          <div style={{
            width: 16, height: 12,
            background: '#c0c0c0',
            border: '1px solid',
            borderColor: '#dfdfdf #808080 #808080 #dfdfdf',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 8, color: '#000', lineHeight: 1,
          }}>─</div>
          <span>Calculator</span>
        </div>
        {/* Minimize / Maximize */}
        <div style={{ display: 'flex', gap: 2 }}>
          {['▾', '▴'].map((ic, i) => (
            <div key={i} style={{
              width: 16, height: 12,
              background: '#c0c0c0',
              border: '1px solid',
              borderColor: '#dfdfdf #808080 #808080 #dfdfdf',
              boxShadow: 'inset 1px 1px 0 #ffffff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 9, color: '#000', cursor: 'default',
            }}>{ic}</div>
          ))}
        </div>
      </div>

      {/* ── Menu bar ─────────────────────────────────────────────────── */}
      <div style={{
        borderBottom: '1px solid #808080',
        padding: '1px 4px',
        display: 'flex',
        fontSize: 11,
        userSelect: 'none',
        background: '#c0c0c0',
      }}>
        {['Edit', 'View', 'Help'].map(item => (
          <span key={item} style={{ padding: '1px 5px', cursor: 'default' }}>{item}</span>
        ))}
      </div>

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div style={{ padding: '3px 4px 4px' }}>

        {/* Display */}
        <div style={{
          background: '#ffffff',
          border: '1px solid',
          borderColor: '#808080 #dfdfdf #dfdfdf #808080',
          textAlign: 'right',
          padding: '1px 5px',
          fontSize: 17,
          fontFamily: '"Courier New", monospace',
          minHeight: 26,
          lineHeight: '24px',
          color: '#000',
          marginBottom: 3,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}>
          {displayValue}
        </div>

        {/* Mode radio row: Hex / Dec / Oct / Bin | Degrees / Radians / Grads */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          padding: '2px 4px',
          marginBottom: 2,
          ...panel,
        }}>
          <Radio label="Hex" />
          <Radio label="Dec" checked />
          <Radio label="Oct" />
          <Radio label="Bin" />
          <span style={{ width: 1, alignSelf: 'stretch', background: '#808080', margin: '0 5px' }} />
          <Radio label="Degrees" checked />
          <Radio label="Radians" />
          <Radio label="Grads" />
        </div>

        {/* Inv / Hyp / blank / blank   +   Backspace / CE / C */}
        <div style={{ display: 'flex', gap: 2, marginBottom: 2 }}>
          {/* Left side — aligns with scientific panel */}
          <div style={{ display: 'flex', gap: 2, width: 158, flexShrink: 0 }}>
            <div style={{ flex: 1, height: 22, display: 'flex', alignItems: 'center', ...panel }}>
              <Checkbox label="Inv" />
            </div>
            <div style={{ flex: 1, height: 22, display: 'flex', alignItems: 'center', ...panel }}>
              <Checkbox label="Hyp" />
            </div>
            {/* Two blank raised boxes */}
            <div style={{
              flex: 1, height: 22,
              border: '1px solid',
              borderColor: '#dfdfdf #808080 #808080 #dfdfdf',
              background: '#c0c0c0',
            }} />
            <div style={{
              flex: 1, height: 22,
              border: '1px solid',
              borderColor: '#dfdfdf #808080 #808080 #dfdfdf',
              background: '#c0c0c0',
            }} />
          </div>
          {/* Right side — Backspace, CE, C */}
          <div style={{ display: 'flex', gap: 2, flex: 1 }}>
            {f('Backspace', 'back', 'blue')}
            {f('CE', 'clear', 'blue')}
            {f('C', 'clear', 'blue')}
          </div>
        </div>

        {/* Main button area */}
        <div style={{ display: 'flex', gap: 4 }}>

          {/* ── Scientific panel (5 cols × 5 rows) ───────────── */}
          <div style={{ width: 158, flexShrink: 0 }}>
            <Row>{[d('Sta'), d('F-E','red'), d('('), d(')','red'), f('MC','mc','blue')]}</Row>
            <Row>{[d('Ave'), d('dms','red'), d('Exp'), f('ln','ln','red'), f('MR','rcl','blue')]}</Row>
            <Row>{[d('Sum'), f('sin','sin','red'), d('x^y'), f('log','log','red'), f('MS','sto','blue')]}</Row>
            <Row>{[d('s'), f('cos','cos','red'), d('x^3'), d('n!','red'), d('M+')]}</Row>
            <Row>{[d('Dat'), f('tan','tan','red'), f('x²','sq','blue'), f('1/x','inv','red'), f('pi','pi','blue')]}</Row>
          </div>

          {/* ── Main numpad (6 cols × 5 rows) ────────────────── */}
          <div style={{ flex: 1 }}>
            <Row>{[f('7','digit_7'), f('8','digit_8'), f('9','digit_9'), f('/','div','red'), d('Mod'), d('And')]}</Row>
            <Row>{[f('4','digit_4'), f('5','digit_5'), f('6','digit_6'), f('*','mul','red'), d('Or'),  d('Xor')]}</Row>
            <Row>{[f('1','digit_1'), f('2','digit_2'), f('3','digit_3'), f('-','sub','red'), d('Lsh'), d('Not')]}</Row>
            <Row>{[f('0','digit_0'), f('+/-','neg'), f('.','dot'), f('+','add','red'), f('=','eq','red'), d('Int')]}</Row>
            <Row>{[d('A'), d('B'), d('C','blue'), d('D'), d('E'), d('F')]}</Row>
          </div>

        </div>
      </div>
    </div>
  )
}
