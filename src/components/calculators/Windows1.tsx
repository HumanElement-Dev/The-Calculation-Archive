import { useState } from 'react'
import { EngineState } from '../../engine/types'

// ─── Windows 1.0 Calculator ──────────────────────────────────────────────────
// Microsoft Windows 1.0, released November 20, 1985.
// Characteristic aesthetic: dithered periwinkle body, yellow menu bar,
// chunky monospace buttons, thick flat shadow.

// ─── Button ───────────────────────────────────────────────────────────────────

function Win1Btn({
  label,
  action,
  onPress,
}: {
  label: string
  action: string
  onPress: (a: string) => void
}) {
  const [pressed, setPressed] = useState(false)

  return (
    <div
      role="button"
      style={{
        flex: 1,
        height: 30,
        minWidth: 0,
        border: '1px solid #000000',
        // No border-radius — Win 1.0 buttons were sharp rectangles
        borderRadius: 2,
        // Pressed: invert fill
        background: pressed ? '#000080' : '#d0d0d0',
        color:      pressed ? '#ffffff' : '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Courier New", "Lucida Console", monospace',
        fontSize: 11,
        fontWeight: 'bold',
        cursor: 'default',
        userSelect: 'none',
        letterSpacing: 0,
        // Kill anti-aliasing so text looks bitmap-rendered
        WebkitFontSmoothing: 'none',
        MozOsxFontSmoothing: 'unset',
      } as React.CSSProperties}
      onMouseDown={() => { setPressed(true); onPress(action) }}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
    >
      {label}
    </div>
  )
}

// ─── Row ─────────────────────────────────────────────────────────────────────

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
      {children}
    </div>
  )
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function Windows1({
  state,
  press,
}: {
  state: EngineState
  press: (a: string) => void
}) {
  const displayValue = state.error ? 'Error' : state.buf

  const b = (label: string, action: string) => (
    <Win1Btn key={label} label={label} action={action} onPress={press} />
  )

  return (
    <div
      style={{
        width: 256,
        boxShadow: '10px 10px 0 #000000',
        fontFamily: '"Courier New", "Lucida Console", monospace',
        // Disable sub-pixel smoothing globally so all text looks bitmap-era
        WebkitFontSmoothing: 'none',
        MozOsxFontSmoothing: 'unset',
      } as React.CSSProperties}
    >
      {/* ── Title bar ───────────────────────────────────────────────── */}
      <div
        style={{
          background: '#000080',
          color: '#ffffff',
          height: 22,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 3px',
          userSelect: 'none',
          borderBottom: '1px solid #000',
        }}
      >
        {/* System menu icon — small grey box with a dash */}
        <div
          style={{
            width: 18,
            height: 15,
            background: '#808080',
            border: '1px solid #ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 9,
            lineHeight: 1,
            color: '#000',
            flexShrink: 0,
          }}
        >
          ─
        </div>

        <span
          style={{
            fontFamily: '"Courier New", monospace',
            fontSize: 12,
            fontWeight: 'bold',
            letterSpacing: '0.08em',
          }}
        >
          Calculator
        </span>

        {/* Maximize/size box */}
        <div
          style={{
            width: 18,
            height: 15,
            background: '#c0c0c0',
            border: '1px solid #ffffff',
            flexShrink: 0,
          }}
        />
      </div>

      {/* ── Menu bar — yellow, Win 1.0 signature ────────────────────── */}
      <div
        style={{
          background: '#ffff00',
          color: '#000000',
          height: 18,
          display: 'flex',
          alignItems: 'center',
          padding: '0 8px',
          fontSize: 12,
          fontWeight: 'bold',
          userSelect: 'none',
          borderBottom: '2px solid #000000',
        }}
      >
        Edit
      </div>

      {/* ── Body — EGA-style dithered periwinkle ────────────────────── */}
      {/* Win 1.0 ran on EGA (640×350) or CGA (640×200). Intermediate colours
          were achieved by alternating two palette entries at the pixel level.
          4px tile size makes each "pixel" clearly visible at our render scale,
          matching the chunky appearance of the original CRT output. */}
      <div
        style={{
          background: [
            'repeating-conic-gradient(',
            '  #2020a0 0% 25%,',
            '  #a0a0e0 0% 50%',
            ') 0 0 / 4px 4px',
          ].join(''),
          padding: '10px 10px 12px',
        }}
      >
        {/* Display */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #000000',
            borderRadius: 0,
            textAlign: 'right',
            padding: '2px 6px',
            fontSize: 15,
            fontFamily: '"Courier New", "Lucida Console", monospace',
            fontWeight: 'bold',
            height: 28,
            lineHeight: '24px',
            color: '#000000',
            marginBottom: 10,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {displayValue}
        </div>

        {/* Button grid: 6 cols × 4 rows matching Win 1.0 layout */}
        <Row>{[b('MC','mc'),      b('7','digit_7'), b('8','digit_8'), b('9','digit_9'), b('/','div'),  b('√','sqrt')]}</Row>
        <Row>{[b('MR','rcl'),     b('4','digit_4'), b('5','digit_5'), b('6','digit_6'), b('*','mul'),  b('%','percent')]}</Row>
        <Row>{[b('M+','madd'),    b('1','digit_1'), b('2','digit_2'), b('3','digit_3'), b('-','sub'),  b('C','clear')]}</Row>
        <Row>{[b('M-','msub'),    b('0','digit_0'), b('.','dot'),     b('±','neg'),     b('+','add'),  b('=','eq')]}</Row>
      </div>
    </div>
  )
}
