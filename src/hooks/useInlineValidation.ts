import { useState } from 'react'
import { useDebouncedValue } from './useDebouncedValue'

/**
 * How long a pause counts as "done typing". Has to clear the gap between
 * keystrokes — a slow typist sits around 700ms/char — or the error fires
 * between characters instead of after the user stops.
 */
export const INLINE_VALIDATION_DELAY = 800

/**
 * Inline validation that fires once typing stops.
 *
 * The error surfaces when the value has been still for `delay`, or immediately
 * when the user leaves the field or submits. Editing clears the "left the
 * field" flag, so correcting a flagged value goes quiet until typing settles
 * again.
 *
 * `isComplete` is an optional extra gate for fields where a partial value is
 * meaningless to judge — a half-typed confirm-password is never a match, so
 * flagging it mid-entry is just noise.
 */
export function useInlineValidation({
  value,
  validate,
  isComplete,
  requiredMessage,
  delay = INLINE_VALIDATION_DELAY,
}: {
  value: string
  validate: (v: string) => string | undefined
  /** Optional: suppress the paused check until the value is worth judging. */
  isComplete?: (v: string) => boolean
  /** Shown for an empty field once the user leaves it or submits. */
  requiredMessage?: string
  delay?: number
}) {
  const [left, setLeft] = useState(false)
  const debounced = useDebouncedValue(value, delay)

  // An empty field is "not yet filled in", never "wrong", so it only speaks up
  // once the user has moved on.
  const judge = (v: string) =>
    v.trim() ? validate(v) : left ? requiredMessage : undefined

  // Leaving the field (or submitting) judges the live value straight away.
  // Otherwise wait for typing to settle.
  const settled = debounced === value
  const error = left
    ? judge(value)
    : settled && (isComplete?.(value) ?? true)
      ? judge(debounced)
      : undefined

  return {
    error,
    /** Whether the field is valid right now, ignoring the display gates. */
    isValid: value.trim() ? !validate(value) : !requiredMessage,
    /** Spread onto the field: validates immediately when the user tabs away. */
    onBlur: () => setLeft(true),
    /** Force the error into view — used on submit. */
    show: () => setLeft(true),
    /** Call from onChange so corrections are quiet until finished. */
    reset: () => setLeft(false),
  }
}
