import { useEffect, useRef, useState } from 'react'
import { useDebouncedValue } from './useDebouncedValue'
import { isCompletePostalCode, lookupPostalCode } from '../data/postalLookup'

export type PostalLookupStatus = 'idle' | 'loading'

export type PostalAutofill = {
  status: PostalLookupStatus
  /**
   * The address on screen is the one the lookup supplied, so it is shown
   * locked — the postal code owns it, and editing it by hand would only let
   * the two disagree.
   */
  locked: boolean
}

/**
 * Fills the address from the postal code once six digits have settled.
 *
 * Only overwrites an address the user has not typed themselves — once they
 * edit it by hand, a later lookup leaves it alone. Clearing the field opts
 * back in.
 *
 * A filled address belongs to its code, so it is dropped the moment that code
 * stops standing behind it: edited down to fewer than six digits, or changed
 * to one nothing matches. Either way the field comes back empty and editable
 * rather than keeping an address for a building the user no longer claims.
 *
 * A code with no match is otherwise silent: the user just types the address.
 * There is nothing they could do about a miss, so an error would only be noise.
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
}): PostalAutofill {
  /** Codes we have finished looking up, so "loading" needs no state of its own. */
  const [settledCode, setSettledCode] = useState<string | null>(null)
  /** The last value we filled in, so manual edits are detectable. */
  const [autoFilled, setAutoFilled] = useState('')
  /** Read inside the effect without making them dependencies. */
  const addressRef = useRef(address)
  const autoFilledRef = useRef(autoFilled)
  useEffect(() => { addressRef.current = address }, [address])

  /** Kept in step by hand: the effect reads it again before React re-renders. */
  function fill(value: string) {
    autoFilledRef.current = value
    setAutoFilled(value)
    setAddress(value)
  }

  const debouncedPostal = useDebouncedValue(postal, 400)
  const complete = isCompletePostalCode(debouncedPostal)

  useEffect(() => {
    if (!complete) {
      // The code that produced the address is gone, so the address goes too
      if (autoFilledRef.current && addressRef.current === autoFilledRef.current) fill('')
      return
    }
    let cancelled = false
    lookupPostalCode(debouncedPostal).then(result => {
      if (cancelled) return
      setSettledCode(debouncedPostal)
      // Respect anything the user typed themselves
      const untouched = addressRef.current === '' || addressRef.current === autoFilledRef.current
      if (!untouched) return
      // A miss clears our own fill; a hit replaces it
      if (result || autoFilledRef.current) fill(result?.address ?? '')
    })
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [complete, debouncedPostal, setAddress])

  return {
    status: !complete || settledCode === debouncedPostal ? 'idle' : 'loading',
    locked: autoFilled !== '' && address === autoFilled,
  }
}
