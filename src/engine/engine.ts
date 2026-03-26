import { EngineState, EngineAction, initialState } from './types'
import { formatDisplay } from './format'

function toRad(deg: number): number {
  return (deg * Math.PI) / 180
}

function computeBinary(val: number, op: string, b: number): number {
  switch (op) {
    case '+': return val + b
    case '-': return val - b
    case '*': return val * b
    case '/': return b === 0 ? Infinity : val / b
    case '^': return Math.pow(val, b)
    default: return b
  }
}

export function engineReducer(state: EngineState, action: EngineAction): EngineState {
  const { type } = action

  // On error, any digit/dot resets
  if (state.error && /^digit_/.test(type)) {
    return { ...initialState, mode: state.mode, mem: state.mem, buf: type.replace('digit_', '') }
  }
  if (state.error && type !== 'clear') {
    return state
  }

  switch (type) {
    case 'digit_0':
    case 'digit_1':
    case 'digit_2':
    case 'digit_3':
    case 'digit_4':
    case 'digit_5':
    case 'digit_6':
    case 'digit_7':
    case 'digit_8':
    case 'digit_9': {
      const d = type.replace('digit_', '')
      if (state.waiting) {
        return { ...state, buf: d, waiting: false }
      }
      if (state.buf === '0' && d !== '.') {
        return { ...state, buf: d }
      }
      if (state.buf.length >= 10) return state
      return { ...state, buf: state.buf + d }
    }

    case 'dot': {
      if (state.waiting) {
        return { ...state, buf: '0.', waiting: false }
      }
      if (state.buf.includes('.')) return state
      return { ...state, buf: state.buf + '.' }
    }

    case 'neg':
    case 'chs': {
      if (state.buf === '0' || state.buf === '0.') return state
      if (state.buf.startsWith('-')) {
        return { ...state, buf: state.buf.slice(1) }
      }
      return { ...state, buf: '-' + state.buf }
    }

    case 'add':
    case 'sub':
    case 'mul':
    case 'div': {
      const opMap: Record<string, string> = { add: '+', sub: '-', mul: '*', div: '/' }
      const newOp = opMap[type]
      const cur = parseFloat(state.buf) || 0
      if (state.val !== null && state.op !== null && !state.waiting) {
        const result = computeBinary(state.val, state.op, cur)
        if (!isFinite(result)) {
          return { ...state, buf: 'Error', error: true, val: null, op: null, waiting: true }
        }
        const disp = formatDisplay(result)
        return { ...state, buf: disp, val: result, op: newOp, waiting: true, lastResult: disp }
      }
      return { ...state, val: cur, op: newOp, waiting: true }
    }

    case 'pow': {
      const cur = parseFloat(state.buf) || 0
      if (state.val !== null && state.op !== null && !state.waiting) {
        const result = computeBinary(state.val, state.op, cur)
        const disp = formatDisplay(result)
        return { ...state, buf: disp, val: result, op: '^', waiting: true, lastResult: disp }
      }
      return { ...state, val: cur, op: '^', waiting: true }
    }

    case 'eq': {
      if (state.val === null || state.op === null) return state
      const b = parseFloat(state.buf) || 0
      const result = computeBinary(state.val, state.op, b)
      if (!isFinite(result)) {
        return { ...state, buf: 'Error', error: true, val: null, op: null, waiting: true }
      }
      const disp = formatDisplay(result)
      return { ...state, buf: disp, val: null, op: null, waiting: true, lastResult: disp }
    }

    // Unary functions
    case 'sin': {
      const x = parseFloat(state.buf)
      const arg = state.mode === 'DEG' ? toRad(x) : x
      const result = state.shift ? Math.asin(x) * (state.mode === 'DEG' ? 180 / Math.PI : 1) : Math.sin(arg)
      const disp = formatDisplay(result)
      return { ...state, buf: disp, waiting: true, shift: false, lastResult: disp }
    }
    case 'cos': {
      const x = parseFloat(state.buf)
      const arg = state.mode === 'DEG' ? toRad(x) : x
      const result = state.shift ? Math.acos(x) * (state.mode === 'DEG' ? 180 / Math.PI : 1) : Math.cos(arg)
      const disp = formatDisplay(result)
      return { ...state, buf: disp, waiting: true, shift: false, lastResult: disp }
    }
    case 'tan': {
      const x = parseFloat(state.buf)
      const arg = state.mode === 'DEG' ? toRad(x) : x
      const result = state.shift ? Math.atan(x) * (state.mode === 'DEG' ? 180 / Math.PI : 1) : Math.tan(arg)
      const disp = formatDisplay(result)
      return { ...state, buf: disp, waiting: true, shift: false, lastResult: disp }
    }
    case 'ln': {
      const x = parseFloat(state.buf)
      const result = state.shift ? Math.exp(x) : Math.log(x)
      if (!isFinite(result)) {
        return { ...state, buf: 'Error', error: true, waiting: true, shift: false }
      }
      const disp = formatDisplay(result)
      return { ...state, buf: disp, waiting: true, shift: false, lastResult: disp }
    }
    case 'log': {
      const x = parseFloat(state.buf)
      const result = state.shift ? Math.pow(10, x) : Math.log10(x)
      if (!isFinite(result)) {
        return { ...state, buf: 'Error', error: true, waiting: true, shift: false }
      }
      const disp = formatDisplay(result)
      return { ...state, buf: disp, waiting: true, shift: false, lastResult: disp }
    }
    case 'sqrt': {
      const x = parseFloat(state.buf)
      const result = state.shift ? Math.pow(x, 3) : Math.sqrt(x)
      if (!isFinite(result) || isNaN(result)) {
        return { ...state, buf: 'Error', error: true, waiting: true, shift: false }
      }
      const disp = formatDisplay(result)
      return { ...state, buf: disp, waiting: true, shift: false, lastResult: disp }
    }
    case 'sq': {
      const x = parseFloat(state.buf)
      const result = state.shift ? Math.cbrt(x) : x * x
      const disp = formatDisplay(result)
      return { ...state, buf: disp, waiting: true, shift: false, lastResult: disp }
    }
    case 'inv': {
      const x = parseFloat(state.buf)
      if (x === 0) {
        return { ...state, buf: 'Error', error: true, waiting: true, shift: false }
      }
      const result = state.shift ? /* n! */ factorial(Math.round(x)) : 1 / x
      if (!isFinite(result)) {
        return { ...state, buf: 'Error', error: true, waiting: true, shift: false }
      }
      const disp = formatDisplay(result)
      return { ...state, buf: disp, waiting: true, shift: false, lastResult: disp }
    }
    case 'pi': {
      const disp = formatDisplay(Math.PI)
      return { ...state, buf: disp, waiting: false, shift: false }
    }
    case 'percent': {
      if (state.val !== null && state.op) {
        const x = parseFloat(state.buf)
        const pct = (state.val * x) / 100
        const disp = formatDisplay(pct)
        return { ...state, buf: disp, waiting: false, shift: false, lastResult: disp }
      }
      const x = parseFloat(state.buf)
      const disp = formatDisplay(x / 100)
      return { ...state, buf: disp, waiting: true, shift: false, lastResult: disp }
    }

    // Memory (TI)
    case 'sto': {
      const v = parseFloat(state.buf)
      return { ...state, mem: v, waiting: false }
    }
    case 'rcl': {
      const disp = formatDisplay(state.mem)
      return { ...state, buf: disp, waiting: false }
    }

    // Shift keys
    case 'shift':
    case '2nd': {
      return { ...state, shift: !state.shift }
    }
    case 'shift_f': {
      return { ...state, shift: 'f' }
    }
    case 'shift_g': {
      return { ...state, shift: 'g' }
    }

    // Angle mode toggle
    case 'deg_toggle': {
      return { ...state, mode: state.mode === 'DEG' ? 'RAD' : 'DEG' }
    }

    // HP RPN ENTER
    case 'enter': {
      const cur = parseFloat(state.buf) || 0
      return { ...state, val: cur, waiting: true }
    }

    // Casio ANS
    case 'ans': {
      if (state.lastResult) {
        return { ...state, buf: state.lastResult, waiting: false }
      }
      return state
    }

    // EE / scientific notation entry
    case 'ee': {
      if (!state.buf.includes('e') && !state.buf.includes('E')) {
        return { ...state, buf: state.buf + 'e+', waiting: false }
      }
      return state
    }

    // Backspace / DEL
    case 'del':
    case 'back': {
      if (state.waiting || state.buf.length <= 1) {
        return { ...state, buf: '0', waiting: false }
      }
      return { ...state, buf: state.buf.slice(0, -1) || '0' }
    }

    // Clear
    case 'clear':
    case 'ce':
    case 'clx': {
      return { ...initialState, mode: state.mode, mem: state.mem }
    }

    default:
      return state
  }
}

function factorial(n: number): number {
  if (n < 0) return NaN
  if (n === 0 || n === 1) return 1
  if (n > 170) return Infinity
  let r = 1
  for (let i = 2; i <= n; i++) r *= i
  return r
}
