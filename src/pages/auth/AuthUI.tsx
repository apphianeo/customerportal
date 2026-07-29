import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ChevronLeft, Eye, EyeOff } from 'lucide-react'
import DatePicker from '../../components/DatePicker'
import uoiLogo from '../../assets/uoi-logo.svg'
import authHero from '../../assets/auth-hero.png'
import successCircle from '../../assets/icons/success-circle.svg'
import errorNotice from '../../assets/icons/error-notice.svg'
import FooterShort from '../../components/layout/FooterShort'

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
          className="flex flex-1 flex-col items-center px-6 overflow-y-auto min-w-0"
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
          <div className="w-full max-w-[420px] flex flex-col items-center gap-8 my-auto py-8">
            {children}
          </div>

          {/* Mobile: the footer travels with the content instead of being pinned */}
          <div className="w-full lg:hidden -mx-6 mt-auto">
            <FooterShort />
          </div>
        </div>

        {/* Right hero image */}
        <div className="hidden lg:block w-1/2 max-w-[720px] shrink-0">
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
      <h1 className="text-[32px] font-semibold leading-[1.2] text-[#212121] text-center">
        {title}
      </h1>
      <p className="text-[16px] leading-[1.5] text-[#6e6e6e] text-center">{subtitle}</p>
    </div>
  )
}

/* ── Inline red error message ── */
export function FieldError({ message }: { message: string }) {
  return (
    <span className="flex items-center gap-2 text-[12px] leading-[1.4] text-[#dc2626]">
      <img src={errorNotice} alt="" className="w-4 h-4 shrink-0" />
      {message}
    </span>
  )
}

const inputBase =
  'bg-white border rounded-[8px] px-[16px] py-[12px] w-full text-[16px] text-[#212121] leading-[1.5] outline-none placeholder:text-[#949494]'

function borderClasses(error?: string) {
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
}: {
  label?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  suffix?: ReactNode
  onSuffixClick?: () => void
  error?: string
  inputMode?: 'text' | 'numeric' | 'tel' | 'email'
  maxLength?: number
}) {
  return (
    <label className="flex flex-col gap-2 w-full">
      <div className="flex flex-col gap-3 w-full">
        {label && <span className="text-[14px] font-normal leading-[1.5] text-[#212121]">{label}</span>}
        <div className="relative w-full">
          <input
            type={type}
            value={value}
            placeholder={placeholder}
            inputMode={inputMode}
            maxLength={maxLength}
            onChange={(e) => onChange(e.target.value)}
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
}: {
  label: string
  value: string
  onChange: (v: string) => void
  show: boolean
  onToggle: () => void
  placeholder?: string
  error?: string
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

/* ── Phone number field with +65 prefix ── */
export function PhoneField({
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
  return (
    <div className="flex flex-col gap-3 w-full">
      <span className="text-[14px] font-normal leading-[1.5] text-[#212121]">{label}</span>
      <div className="flex gap-2 w-full">
        <div className="flex items-center justify-center bg-white border border-[rgba(0,0,0,0.09)] rounded-[8px] px-[16px] py-[12px] text-[16px] text-[#212121] leading-[1.5] shrink-0">
          +65
        </div>
        <input
          type="tel"
          inputMode="numeric"
          value={value}
          placeholder="Enter phone number"
          onChange={(e) => onChange(e.target.value.replace(/[^\d]/g, '').slice(0, 8))}
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
}: {
  value: string
  onChange: (v: string) => void
  length?: number
  error?: boolean
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
    <div className="flex gap-2 w-full">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el }}
          inputMode="numeric"
          maxLength={1}
          value={value[i] ?? ''}
          onChange={(e) => setChar(i, e.target.value)}
          onKeyDown={(e) => onKeyDown(i, e)}
          onPaste={onPaste}
          className={`flex-1 aspect-square min-w-0 text-center bg-white border rounded-[8px] text-[20px] text-[#212121] outline-none ${
            error
              ? 'border-[#dc2626]'
              : 'border-[rgba(0,0,0,0.09)] focus:border-[#005eb8] focus:shadow-[0px_0px_0px_3px_rgba(0,94,184,0.2)]'
          }`}
        />
      ))}
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
      className="text-[#005eb8] underline bg-transparent border-0 p-0 cursor-pointer font-normal"
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
