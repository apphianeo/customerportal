import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Check, ChevronDown, ChevronLeft, ChevronUp, Delete, Eye, EyeOff } from 'lucide-react'
import DatePicker from '../../components/DatePicker'
import uoiLogo from '../../assets/uoi-logo.svg'
import authHero from '../../assets/auth-hero.png'
import successCircle from '../../assets/icons/success-circle.svg'
import errorNotice from '../../assets/icons/error-notice.svg'
import infoIcon from '../../assets/icons/info.svg'
import FooterShort from '../../components/layout/FooterShort'
import { useIsTouch } from '../../hooks/useIsTouch'
import { COUNTRIES } from './validation'
import type { CountryCode } from 'libphonenumber-js'

/* ── Split-screen shell: form panel + hero image + footer ── */
export function AuthShell({
  children,
  onBack,
  toast,
}: {
  children: ReactNode
  onBack?: () => void
  toast?: string
}) {
  const [showToast, setShowToast] = useState(true)
  useEffect(() => {
    if (!toast) return
    const id = setTimeout(() => setShowToast(false), 3000)
    return () => clearTimeout(id)
  }, [toast])
  const toastVisible = Boolean(toast) && showToast

  return (
    <div className="flex flex-col h-screen bg-bg-page">
      <div className="flex flex-1 min-h-0">
        {/* Left form panel — scrolls when content is taller than the viewport */}
        <div
          className="flex flex-1 flex-col items-center px-4 sm:px-6 overflow-y-auto min-w-0"
          style={{
            backgroundImage:
              'linear-gradient(90deg, rgba(0,94,184,0.06) 0%, rgba(92,85,235,0.06) 100%), linear-gradient(#fff,#fff)',
          }}
        >
          {/* Top row: Back (left) + toast (centered), in normal flow so it never overlaps content */}
          {(onBack || toastVisible) && (
            <div className="relative flex items-center justify-center w-full min-h-[24px] shrink-0 pt-8">
              {onBack && (
                <button
                  onClick={onBack}
                  className="absolute left-0 top-8 flex items-center gap-[4px] text-[14px] text-[#6e6e6e] leading-[1.5] bg-transparent border-0 p-0 cursor-pointer"
                >
                  <ChevronLeft size={20} />
                  Back
                </button>
              )}
              {toastVisible && <SuccessToast>{toast}</SuccessToast>}
            </div>
          )}
          {/* Content: centered when it fits (my-auto), scrolls with top/bottom padding when tall */}
          <div
            data-tooltip-bounds
            className="w-full max-w-[420px] flex flex-col items-center gap-8 my-auto py-6 sm:py-8"
          >
            {children}
          </div>

          {/* Mobile: the footer travels with the content instead of being pinned.
              self-stretch, not w-full — the panel centres its children, so a
              fixed-width box would just re-centre and the -mx-6 bleed would
              cancel itself out. */}
          <div className="self-stretch lg:hidden -mx-4 sm:-mx-6 mt-auto">
            <FooterShort />
          </div>
        </div>

        {/* Right hero image */}
        <div className="hidden lg:block w-1/2 shrink-0">
          <img src={authHero} alt="" className="h-full w-full object-cover" />
        </div>
      </div>

      {/* Desktop: anchored beneath the split panels */}
      <div className="hidden lg:block">
        <FooterShort />
      </div>
    </div>
  )
}

/* ── Logo + title + subtitle ── */
export function AuthHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <img src={uoiLogo} alt="UOI" className="h-[50px] w-auto" />
      <h1 className="font-h1-title font-semibold text-[#212121] text-center">
        {title}
      </h1>
      <p className="text-[16px] leading-[1.5] text-[#6e6e6e] text-center">{subtitle}</p>
    </div>
  )
}

/* ── Legal consent line, shown wherever an action is binding ── */
export const TERMS_URL = 'https://www.uoi.com.sg/uoi/important-information.page'
export const PRIVACY_URL = 'https://www.uoi.com.sg/privacy.page'
export const SUPPORT_URL =
  'https://api.whatsapp.com/send/?phone=6580814843&text&type=phone_number&app_absent=0'

export function LegalLine() {
  return (
    <p className="text-[14px] leading-[1.5] text-[#6e6e6e] text-center w-full m-0">
      By continuing, you agree to our{' '}
      <a href={TERMS_URL} target="_blank" rel="noopener noreferrer" className="text-text-secondary underline">T&Cs</a>
      {' '}and{' '}
      <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer" className="text-text-secondary underline">Privacy Notice</a>
    </p>
  )
}

/** Support link — opens WhatsApp in a new tab. */
export function SupportLine() {
  return (
    <p className="text-[14px] leading-[1.5] text-[#6e6e6e] text-center w-full m-0">
      Having trouble?{' '}
      <a href={SUPPORT_URL} target="_blank" rel="noopener noreferrer" className="text-text-secondary underline">
        Contact our support team
      </a>
    </p>
  )
}

/* ── Marketing consent checkbox ── */
export function ConsentCheckbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center gap-2 w-full bg-transparent border-0 p-0 cursor-pointer text-left"
    >
      <span
        aria-hidden="true"
        className={`flex items-center justify-center size-[18px] rounded-[4px] border shrink-0 ${
          checked ? 'bg-[#005eb8] border-[#005eb8]' : 'bg-white border-[rgba(0,0,0,0.25)]'
        }`}
      >
        {checked && (
          <svg viewBox="0 0 12 12" className="size-[12px]" aria-hidden="true">
            <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className="text-[14px] leading-[1.5] text-[#212121]">{label}</span>
    </button>
  )
}

/* ── Info tooltip beside a field label ──
   Desktop (hover-capable pointer): hover or keyboard focus opens it, leaving
   or blurring closes it. Touch: tap the icon to toggle, tap outside to close.
   Portalled and measured so it sits beside the icon without being clipped by
   the form, and flips to the other side when it would run off-screen. */
const TIP_WIDTH = 280
const TIP_GAP = 12
const TIP_EDGE = 8
const ARROW = 8

type Side = 'right' | 'left' | 'below'

export function InfoTooltip({ text }: { text: string }) {
  const [open, setOpen] = useState(false)
  /** Hover-capable pointers get the hover affordance; touch gets tap-to-toggle. */
  const canHover = !useIsTouch()
  const anchorRef = useRef<HTMLSpanElement>(null)
  const tipRef = useRef<HTMLSpanElement>(null)
  const [pos, setPos] = useState({ top: 0, left: 0, width: TIP_WIDTH, side: 'right' as Side, arrowX: 0 })

  const place = useCallback(() => {
    const anchor = anchorRef.current
    if (!anchor) return
    const r = anchor.getBoundingClientRect()
    const height = tipRef.current?.offsetHeight ?? 0

    // Stay inside the form column rather than the raw viewport, so the card
    // lines up with the fields instead of bleeding into the screen's padding.
    const bounds = anchor.closest('[data-tooltip-bounds]')?.getBoundingClientRect()
    const minX = Math.max(TIP_EDGE, bounds?.left ?? TIP_EDGE)
    const maxX = Math.min(window.innerWidth - TIP_EDGE, bounds?.right ?? window.innerWidth - TIP_EDGE)
    const width = Math.min(TIP_WIDTH, Math.max(0, maxX - minX))

    // Beside the icon by preference — right, then left. On a narrow phone
    // neither side fits, and clamping to the edge would sit the card on top of
    // the icon and swallow the tap that closes it, so drop below it instead.
    const side: Side = r.right + TIP_GAP + width <= maxX
      ? 'right'
      : r.left - TIP_GAP - width >= minX
        ? 'left'
        : 'below'

    const clamp = (x: number) => Math.min(Math.max(minX, x), Math.max(minX, maxX - width))
    const left = side === 'right'
      ? r.right + TIP_GAP
      : side === 'left'
        ? r.left - TIP_GAP - width
        : clamp(r.left + r.width / 2 - width / 2)
    const top = side === 'below'
      ? r.bottom + TIP_GAP
      : Math.min(
          Math.max(TIP_EDGE, r.top + r.height / 2 - height / 2),
          Math.max(TIP_EDGE, window.innerHeight - height - TIP_EDGE),
        )
    // Keep the arrow over the icon even once the card has been clamped.
    setPos({ top, left, width, side, arrowX: r.left + r.width / 2 - left - ARROW / 2 })
  }, [])

  useLayoutEffect(() => {
    if (!open) return
    // Twice: once to mount, once with the measured height so it centres.
    place()
    const id = requestAnimationFrame(place)
    window.addEventListener('scroll', place, true)
    window.addEventListener('resize', place)
    return () => {
      cancelAnimationFrame(id)
      window.removeEventListener('scroll', place, true)
      window.removeEventListener('resize', place)
    }
  }, [open, place])

  // Outside-tap dismissal only matters on touch, where there is no unhover.
  useEffect(() => {
    if (!open || canHover) return
    function handle(e: PointerEvent) {
      const t = e.target as Node
      if (anchorRef.current?.contains(t) || tipRef.current?.contains(t)) return
      setOpen(false)
    }
    document.addEventListener('pointerdown', handle)
    return () => document.removeEventListener('pointerdown', handle)
  }, [open, canHover])

  const hoverProps = canHover
    ? {
        onMouseEnter: () => setOpen(true),
        onMouseLeave: () => setOpen(false),
        onFocus: () => setOpen(true),
        onBlur: () => setOpen(false),
      }
    : {}

  return (
    <span ref={anchorRef} className="inline-flex items-center">
      <button
        type="button"
        aria-label={text}
        aria-expanded={open}
        /* The icon lives inside a <label>, so a plain click would focus the
           field and pop the keyboard open on touch. */
        onClick={(e) => {
          e.preventDefault()
          if (!canHover) setOpen(o => !o)
        }}
        {...hoverProps}
        className="flex items-center bg-transparent border-0 p-0 cursor-pointer"
      >
        <img src={infoIcon} alt="" className="size-[16px]" />
      </button>
      {open && createPortal(
        <span
          ref={tipRef}
          role="tooltip"
          style={{
            position: 'fixed',
            top: pos.top,
            left: pos.left,
            width: pos.width,
          }}
          className="z-[100] block bg-white rounded-[8px] p-[12px] drop-shadow-[0px_0px_4.5px_rgba(0,0,0,0.12)] text-[14px] leading-[1.5] text-[#212121] text-left"
        >
          {/* Arrow points back at the icon, from whichever side it landed */}
          <span
            aria-hidden="true"
            className="absolute size-[8px] rotate-45 bg-white"
            style={
              pos.side === 'below'
                ? { top: -ARROW / 2, left: pos.arrowX }
                : pos.side === 'right'
                  ? { top: '50%', left: -ARROW / 2, transform: 'translateY(-50%) rotate(45deg)' }
                  : { top: '50%', right: -ARROW / 2, transform: 'translateY(-50%) rotate(45deg)' }
            }
          />
          {text}
        </span>,
        document.body,
      )}
    </span>
  )
}

/* ── Inline red error message ── */
export function FieldError({ message }: { message: ReactNode }) {
  return (
    <span className="flex items-center gap-2 text-[12px] leading-[1.4] text-[#dc2626]">
      <img src={errorNotice} alt="" className="w-4 h-4 shrink-0" />
      {message}
    </span>
  )
}

const inputBase =
  'bg-white border rounded-[8px] px-[16px] py-[12px] w-full text-[16px] text-[#212121] leading-[1.5] outline-none placeholder:text-[#949494]'

function borderClasses(error?: ReactNode) {
  return error
    ? 'border-[#dc2626]'
    : 'border-[rgba(0,0,0,0.09)] focus:border-[#005eb8] focus:shadow-[0px_0px_0px_3px_rgba(0,94,184,0.2)]'
}

/* ── Text input with label ── */
export function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  suffix,
  onSuffixClick,
  error,
  inputMode,
  maxLength,
  onBlur,
  labelTooltip,
  autoCapitalize,
}: {
  label?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  suffix?: ReactNode
  onSuffixClick?: () => void
  error?: ReactNode
  inputMode?: 'text' | 'numeric' | 'tel' | 'email'
  maxLength?: number
  onBlur?: () => void
  /** Renders an info icon next to the label with this copy in a popover. */
  labelTooltip?: string
  /** Mobile keyboard hint — shifts to caps automatically as the user types. */
  autoCapitalize?: 'none' | 'words' | 'characters'
}) {
  return (
    <label className="flex flex-col gap-2 w-full">
      <div className="flex flex-col gap-3 w-full">
        {label && (
          <span className="flex items-center gap-2 text-[14px] font-normal leading-[1.5] text-[#212121]">
            {label}
            {labelTooltip && <InfoTooltip text={labelTooltip} />}
          </span>
        )}
        <div className="relative w-full">
          <input
            type={type}
            value={value}
            placeholder={placeholder}
            inputMode={inputMode}
            autoCapitalize={autoCapitalize}
            maxLength={maxLength}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            className={`${inputBase} ${borderClasses(error)}`}
            style={suffix ? { paddingRight: 44 } : undefined}
          />
          {suffix && (
            <button
              type="button"
              tabIndex={-1}
              onClick={onSuffixClick}
              className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[#6e6e6e] bg-transparent border-0 p-0 cursor-pointer flex items-center"
            >
              {suffix}
            </button>
          )}
        </div>
      </div>
      {error && <FieldError message={error} />}
    </label>
  )
}

/* ── Password input with show/hide toggle ── */
export function PasswordField({
  label,
  value,
  onChange,
  show,
  onToggle,
  placeholder,
  error,
  onBlur,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  show: boolean
  onToggle: () => void
  placeholder?: string
  error?: string
  onBlur?: () => void
}) {
  return (
    <Field
      label={label}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={show ? 'text' : 'password'}
      suffix={show ? <EyeOff size={18} /> : <Eye size={18} />}
      onSuffixClick={onToggle}
      error={error}
      onBlur={onBlur}
    />
  )
}

/* ── Date-of-birth field — type directly or pick from the calendar ── */
export function DateField({
  label,
  value,
  onChange,
  error,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  error?: string
}) {
  return <DatePicker label={label} value={value} onChange={onChange} error={error} />
}

/* ── Country code dropdown — searchable, keyboard accessible ── */
const MENU_GAP = 12
const MENU_EDGE = 8
/** Below this the list is not worth showing, so flipping wins over shrinking. */
const MENU_MIN_HEIGHT = 160

function CountrySelect({
  country,
  onChange,
}: {
  country: CountryCode
  onChange: (c: CountryCode) => void
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  /** Viewport coords — the menu is portalled out so cards cannot clip it. */
  const [pos, setPos] = useState({ top: 0, bottom: 0, left: 0, width: 0, maxHeight: 240, up: false })

  const selected = COUNTRIES.find(c => c.code === country) ?? COUNTRIES[0]
  const matches = COUNTRIES.filter(c =>
    `${c.label} ${c.dial}`.toLowerCase().includes(query.trim().toLowerCase()),
  )

  const place = useCallback(() => {
    const anchor = ref.current
    if (!anchor) return
    const r = anchor.getBoundingClientRect()
    // Span the whole phone field — dial code plus number — rather than a fixed
    // width, which overhung the field on a narrow phone.
    const field = (anchor.parentElement ?? anchor).getBoundingClientRect()
    const width = Math.min(field.width, window.innerWidth - MENU_EDGE * 2)

    // Drop down while the viewport has room for a usable list; otherwise flip
    // above the field. Either way the height is capped to the space that is
    // actually there, so the list scrolls inside itself rather than running
    // off the bottom of the page and over the footer.
    const spaceBelow = window.innerHeight - r.bottom - MENU_GAP - MENU_EDGE
    const spaceAbove = r.top - MENU_GAP - MENU_EDGE
    const up = spaceBelow < MENU_MIN_HEIGHT && spaceAbove > spaceBelow

    setPos({
      top: r.bottom + MENU_GAP,
      // Anchored from the bottom when flipped, so it grows upwards without
      // having to be measured first.
      bottom: window.innerHeight - r.top + MENU_GAP,
      left: Math.min(Math.max(MENU_EDGE, field.left), window.innerWidth - width - MENU_EDGE),
      width,
      maxHeight: Math.max(MENU_MIN_HEIGHT, up ? spaceAbove : spaceBelow),
      up,
    })
  }, [])

  useLayoutEffect(() => {
    if (!open) return
    place()
    window.addEventListener('scroll', place, true)
    window.addEventListener('resize', place)
    return () => {
      window.removeEventListener('scroll', place, true)
      window.removeEventListener('resize', place)
    }
  }, [open, place])

  useEffect(() => {
    if (!open) return
    searchRef.current?.focus()
    function handleClick(e: MouseEvent) {
      const t = e.target as Node
      if (ref.current?.contains(t) || menuRef.current?.contains(t)) return
      setOpen(false)
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  function pick(code: CountryCode) {
    onChange(code)
    setQuery('')
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        aria-label="Country code"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen(o => !o)}
        className={`bg-white rounded-[8px] px-[16px] py-[12px] w-[93px] flex items-center gap-2 text-[16px] text-[#212121] leading-[1.5] cursor-pointer outline-none border ${
          open
            ? 'border-[#005eb8] shadow-[0px_0px_0px_3px_rgba(0,94,184,0.2)]'
            : 'border-[rgba(0,0,0,0.09)]'
        }`}
      >
        <span className="flex-1 text-left">{selected.dial}</span>
        {open
          ? <ChevronUp size={16} className="shrink-0 text-[#212121]" aria-hidden="true" />
          : <ChevronDown size={16} className="shrink-0 text-[#212121]" aria-hidden="true" />}
      </button>

      {open && createPortal(
        <div
          ref={menuRef}
          role="listbox"
          aria-label="Country code"
          style={{
            position: 'fixed',
            left: pos.left,
            width: pos.width,
            maxHeight: pos.maxHeight,
            ...(pos.up ? { bottom: pos.bottom } : { top: pos.top }),
          }}
          className="z-[100] flex flex-col bg-white rounded-[8px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] border border-[rgba(0,0,0,0.09)] overflow-hidden"
        >
          <input
            ref={searchRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search"
            aria-label="Search country"
            className="w-full shrink-0 px-[12px] py-[12px] text-[16px] text-[#212121] leading-[1.5] outline-none placeholder:text-[#949494] border-b border-[rgba(0,0,0,0.09)]"
          />
          <div className="flex-1 min-h-0 overflow-y-auto">
            {matches.length === 0 ? (
              <p className="px-[12px] py-[12px] text-[16px] text-[#949494] leading-[1.5] m-0">
                No matches
              </p>
            ) : (
              matches.map(c => {
                const isSelected = c.code === country
                return (
                  <button
                    key={c.code}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => pick(c.code)}
                    className={`w-full flex items-center gap-[10px] px-[12px] py-[12px] bg-white border-0 cursor-pointer text-left text-[16px] leading-[1.5] hover:bg-[#f6f6f6] ${
                      isSelected ? 'text-[#005eb8] font-medium' : 'text-[#212121]'
                    }`}
                  >
                    <span className="flex-1 min-w-0">{c.label} ({c.dial})</span>
                    {isSelected && <Check size={24} className="shrink-0" aria-hidden="true" />}
                  </button>
                )
              })
            )}
          </div>
        </div>,
        document.body,
      )}
    </div>
  )
}

/* ── Phone number field — country code drives validation ── */
export function PhoneField({
  label,
  value,
  onChange,
  country,
  onCountryChange,
  error,
  onBlur,
  placeholder = 'Enter phone number',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  country: CountryCode
  onCountryChange: (c: CountryCode) => void
  error?: string
  onBlur?: () => void
  placeholder?: string
}) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <span className="text-[14px] font-normal leading-[1.5] text-[#212121]">{label}</span>
      <div className="flex gap-2 w-full">
        <CountrySelect country={country} onChange={onCountryChange} />
        <input
          type="tel"
          inputMode="numeric"
          value={value}
          placeholder={placeholder}
          /* No fixed length — each country's own digit range is enforced on validate */
          onChange={(e) => onChange(e.target.value.replace(/[^\d]/g, '').slice(0, 15))}
          onBlur={onBlur}
          className={`${inputBase} ${borderClasses(error)}`}
        />
      </div>
      {error && <FieldError message={error} />}
    </div>
  )
}

/* ── 6-box OTP input ── */
export function OtpBoxes({
  value,
  onChange,
  length = 6,
  error,
  onFocusChange,
  suppressNativeKeyboard,
}: {
  value: string
  onChange: (v: string) => void
  length?: number
  error?: boolean
  /** Fires when focus enters or leaves the group as a whole. */
  onFocusChange?: (focused: boolean) => void
  /** Prototype keypad is driving input, so keep the system keyboard down. */
  suppressNativeKeyboard?: boolean
}) {
  const refs = useRef<(HTMLInputElement | null)[]>([])

  function setChar(i: number, char: string) {
    const digit = char.replace(/\D/g, '').slice(-1)
    const next = value.split('')
    next[i] = digit
    const joined = next.join('').slice(0, length)
    onChange(joined)
    if (digit && i < length - 1) refs.current[i + 1]?.focus()
  }

  function onKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !value[i] && i > 0) refs.current[i - 1]?.focus()
  }

  function onPaste(e: React.ClipboardEvent) {
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    if (digits) {
      e.preventDefault()
      onChange(digits)
      refs.current[Math.min(digits.length, length - 1)]?.focus()
    }
  }

  return (
    <div
      className="flex gap-[12px] w-full items-center justify-center"
      onFocus={() => onFocusChange?.(true)}
      /* Moving between boxes keeps focus inside the group — only report a
         real exit, or the keypad would flicker on every hop. */
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) onFocusChange?.(false)
      }}
    >
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el }}
          inputMode={suppressNativeKeyboard ? 'none' : 'numeric'}
          /* Lets a real device lift the code straight out of the SMS. */
          autoComplete={i === 0 ? 'one-time-code' : 'off'}
          maxLength={1}
          value={value[i] ?? ''}
          onChange={(e) => setChar(i, e.target.value)}
          onKeyDown={(e) => onKeyDown(i, e)}
          onPaste={onPaste}
          /* 60x60 per the design. flex-1 with a max width lets the row shrink
             on a narrow phone without the boxes growing tall to match. */
          className={`flex-1 min-w-0 max-w-[60px] h-[60px] text-center bg-white border rounded-[8px] text-[16px] text-[#212121] outline-none ${
            error
              ? 'border-[#dc2626]'
              : 'border-[rgba(0,0,0,0.09)] focus:border-[#005eb8] focus:shadow-[0px_0px_0px_3px_rgba(0,94,184,0.2)]'
          }`}
        />
      ))}
    </div>
  )
}

/* ── Mock iOS numeric keyboard ──
   Prototype only. A page cannot draw into the real system keyboard, so the OTP
   screen renders its own and keeps the native one down — that is the only way
   to show the "From Messages" strip iOS puts above the keypad for SMS codes. */
const KEYPAD_ROWS = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']]

/** Keeps focus in the OTP field, so tapping a key never dismisses the keypad. */
const holdFocus = (e: { preventDefault: () => void }) => e.preventDefault()

function KeypadKey({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onMouseDown={holdFocus}
      onClick={onClick}
      className="flex-1 h-[46px] rounded-[5px] bg-white border-0 text-[25px] text-black cursor-pointer drop-shadow-[0px_1px_0px_rgba(0,0,0,0.25)]"
    >
      {children}
    </button>
  )
}

export function MockNumericKeypad({
  suggestion,
  onSuggestion,
  onDigit,
  onBackspace,
}: {
  /** The code iOS would have lifted out of the SMS; hidden once typing starts. */
  suggestion?: string
  onSuggestion: () => void
  onDigit: (digit: string) => void
  onBackspace: () => void
}) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[90] bg-[#d1d3d9] select-none"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {suggestion && (
        <button
          type="button"
          onMouseDown={holdFocus}
          onClick={onSuggestion}
          className="w-full flex flex-col items-center gap-[2px] bg-[#efeff4] border-y border-[rgba(0,0,0,0.12)] px-[16px] py-[4px] cursor-pointer"
        >
          <span className="text-[12px] leading-[1.4] text-[#6e6e6e]">From Messages</span>
          <span className="text-[16px] font-semibold leading-[1.5] text-[#212121]">{suggestion}</span>
        </button>
      )}
      <div className="flex flex-col gap-[7px] px-[6px] py-[8px]">
        {KEYPAD_ROWS.map((row) => (
          <div key={row[0]} className="flex gap-[6px]">
            {row.map((k) => (
              <KeypadKey key={k} onClick={() => onDigit(k)}>{k}</KeypadKey>
            ))}
          </div>
        ))}
        <div className="flex gap-[6px] items-center">
          <span className="flex-1 h-[46px]" />
          <KeypadKey onClick={() => onDigit('0')}>0</KeypadKey>
          <button
            type="button"
            aria-label="Delete"
            onMouseDown={holdFocus}
            onClick={onBackspace}
            className="flex-1 h-[46px] flex items-center justify-center rounded-[5px] bg-transparent border-0 text-black cursor-pointer"
          >
            <Delete size={24} />
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Full-width primary button ── */
export function PrimaryButton({
  children,
  onClick,
  disabled,
  type = 'button',
}: {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit'
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full rounded-[8px] px-[24px] py-[12px] text-[16px] font-medium leading-[1.5] transition-colors disabled:cursor-not-allowed bg-[#005eb8] text-white disabled:bg-[#e0e0e0] disabled:text-[#9e9e9e]"
    >
      {children}
    </button>
  )
}

/* ── Full-width outline button (e.g. NRIC/FIN) ── */
export function OutlineButton({
  children,
  onClick,
}: {
  children: ReactNode
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-[8px] px-[24px] py-[12px] text-[16px] font-medium leading-[1.5] bg-white border border-[#005eb8] text-[#005eb8] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] cursor-pointer"
    >
      {children}
    </button>
  )
}

/* ── Inline text link ── */
export function LinkButton({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-text-secondary underline bg-transparent border-0 p-0 cursor-pointer font-normal"
    >
      {children}
    </button>
  )
}

/* ── Success toast: green check, dark text (matches Figma) ── */
export function SuccessToast({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 bg-[#ecfdf5] rounded-[8px] px-[16px] py-[12px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
      <img src={successCircle} alt="" className="w-4 h-4 shrink-0" />
      <span className="text-[14px] leading-[1.5] text-[#212121] whitespace-nowrap">{children}</span>
    </div>
  )
}
