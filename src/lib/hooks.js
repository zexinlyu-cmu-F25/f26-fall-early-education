import { useEffect, useRef } from 'react'

export function useInterval(fn, ms, active = true) {
  const ref = useRef(fn)
  useEffect(() => {
    ref.current = fn
  })
  useEffect(() => {
    if (!active) return
    const id = setInterval(() => ref.current(), ms)
    return () => clearInterval(id)
  }, [ms, active])
}
