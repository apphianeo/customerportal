import { useEffect, useState } from 'react'

/**
 * Whether the primary pointer is a finger rather than a mouse.
 *
 * Drives the interactions that have no touch equivalent: hover-to-open
 * tooltips become tap-to-toggle, and the OTP screen swaps the system keyboard
 * for its own. Starts false so the first render assumes a pointer device, then
 * corrects once the media query can be read.
 */
export function useIsTouch() {
  const [isTouch, setIsTouch] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const sync = () => setIsTouch(!mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  return isTouch
}
