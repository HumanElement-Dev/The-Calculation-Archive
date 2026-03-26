export interface EngineState {
  buf: string
  val: number | null
  op: string | null
  waiting: boolean
  mem: number
  shift: boolean | 'f' | 'g'
  mode: 'DEG' | 'RAD'
  lastResult: string | null
  error: boolean
}

export interface EngineAction {
  type: string
}

export const initialState: EngineState = {
  buf: '0',
  val: null,
  op: null,
  waiting: false,
  mem: 0,
  shift: false,
  mode: 'DEG',
  lastResult: null,
  error: false,
}
