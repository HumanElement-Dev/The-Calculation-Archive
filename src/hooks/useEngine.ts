import { useReducer, useRef, useCallback } from 'react'
import { EngineState, initialState } from '../engine/types'
import { engineReducer } from '../engine/engine'

const stateCache = new Map<string, EngineState>()

export function useEngine(calcId: string) {
  const idRef = useRef(calcId)
  const saved = stateCache.get(calcId) ?? initialState

  const [state, dispatch] = useReducer(
    (s: EngineState, action: { type: string }) => {
      const next = engineReducer(s, action)
      stateCache.set(idRef.current, next)
      return next
    },
    saved
  )

  const press = useCallback((action: string) => {
    dispatch({ type: action })
  }, [])

  return { state, press }
}
