import { useEffect, useRef, useState } from 'react'
import { useDebouncedValue } from './useDebouncedValue'
import { isCompletePostalCode, lookupPostalCode } from '../data/postalLookup'

export type PostalLookupStatus = 'idle' | 'loading'

/**
 * Fills the address from the postal code once six digits have settled.
 *
 * Only overwrites an address the user has not typed themselves — once they
 * edit it by hand, a later lookup leaves it alone. Clearing the field opts
 * back in.
 *
 * A code with no match is silent: the user just types the address. There is
 * nothing they could do about a miss, so an error would only be noise.
 *
 * The status is derived from which code has been resolved rather than stored,
 * so the effect only ever writes state from the resolved promise.
 */
export function usePostalAutofill({
  postal,
  address,
  setAddress,
}: {
  postal: string
  address: string
  setAddress: (v: string) => void
}) {
  /** Codes we have finished looking up, so "loading" needs no state of its own. */
  const [settledCode, setSettledCode] = useState<string | null>(null)
  /** The last value we filled in, so manual edits are detectable. */
  const autoFilled = useRef('')
  /** Read inside the effect without making it a dependency. */
  const addressRef = useRef(address)
  useEffect(() => { addressRef.current = address }, [address])

  const debouncedPostal = useDebouncedValue(postal, 400)
  const complete = isCompletePostalCode(debouncedPostal)

  useEffect(() => {
    if (!complete) return
    let cancelled = false
    lookupPostalCode(debouncedPostal).then(result => {
      if (cancelled) return
      setSettledCode(debouncedPostal)
      if (!result) return
      // Respect anything the user typed themselves
      const untouched = addressRef.current === '' || addressRef.current === autoFilled.current
      if (untouched) {
        autoFilled.current = result.address
        setAddress(result.address)
      }
    })
    return () => { cancelled = true }
  }, [complete, debouncedPostal, setAddress])

  return !complete || settledCode === debouncedPostal ? 'idle' : 'loading'
}
