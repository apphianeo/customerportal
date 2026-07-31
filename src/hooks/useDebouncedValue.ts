import { useEffect, useState } from 'react'

/**
 * Trails `value` by `delay` ms. Inline validation reads the debounced copy so
 * an error only appears once the user pauses, never mid-keystroke.
 */
export function useDebouncedValue<T>(value: T, delay = 500): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])

  return debounced
}
