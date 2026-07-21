import { useRef, type ReactNode } from 'react'
import { ChevronLeft, Eye, EyeOff, Check } from 'lucide-react'
import uoiLogo from '../../assets/uoi-logo.svg'
import authHero from '../../assets/auth-hero.png'
import FooterShort from '../../components/layout/FooterShort'

/* ── Split-screen shell: form panel + hero image + footer ── */
export function AuthShell({
  children,
  onBack,
  toast,
}: {
  children: ReactNode
  onBack?: () => void
  toast?: ReactNode
}) {
  return (
    <div className="flex flex-col h-screen bg-bg-page">
      <div className="flex flex-1 min-h-0">
        {/* Left form panel */}
        <div
          className="relative flex flex-1 flex-col items-center justify-center px-6 py-16 overflow-y-auto min-w-0"
          style={{
            backgroundImage:
              'linear-gradient(90deg, rgba(0,94,184,0.06) 0%, rgba(92,85,235,0.06) 100%), linear-gradient(#fff,#fff)',
          }}
        >
          {onBack && (
            <button
              onClick={onBack}
              className="absolute top-6 left-6 flex items-center gap-1 text-[14px] text-[#212121] leading-[1.5] bg-transparent border-0 p-0 cursor-pointer"
            >
              <ChevronLeft size={18} />
              Back
            </button>
          )}
          {toast && (
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10">{toast}</div>
          )}
          <div className="w-full max-w-[420px] flex flex-col items-center gap-8">
            {children}
          </div>
        </div>

        {/* Right hero image */}
        <div className="hidden lg:block w-1/2 max-w-[720px] shrink-0">
          <img src={authHero} alt="" className="h-full w-full object-cover" />
        </div>
      </div>
      <FooterShort />
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

/* ── Text input with label ── */
export function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  suffix,
  onSuffixClick,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  suffix?: ReactNode
  onSuffixClick?: () => void
}) {
  return (
    <label className="flex flex-col gap-2 w-full">
      <span className="text-[14px] font-medium leading-[1.5] text-[#212121]">{label}</span>
      <div className="relative w-full">
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="bg-white border border-[rgba(0,0,0,0.09)] rounded-[8px] px-[16px] py-[12px] w-full text-[16px] text-[#212121] leading-[1.5] outline-none placeholder:text-[#8d8d8d] focus:border-[#005eb8] focus:shadow-[0px_0px_0px_3px_rgba(0,94,184,0.2)]"
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
}: {
  label: string
  value: string
  onChange: (v: string) => void
  show: boolean
  onToggle: () => void
  placeholder?: string
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
    />
  )
}

/* ── Date field (native picker) ── */
export function DateField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return <Field label={label} value={value} onChange={onChange} placeholder="DD/MM/YYYY" type="date" />
}

/* ── 6-box OTP input ── */
export function OtpBoxes({
  value,
  onChange,
  length = 6,
}: {
  value: string
  onChange: (v: string) => void
  length?: number
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
          className="flex-1 aspect-square min-w-0 text-center bg-white border border-[rgba(0,0,0,0.09)] rounded-[8px] text-[20px] text-[#212121] outline-none focus:border-[#005eb8] focus:shadow-[0px_0px_0px_3px_rgba(0,94,184,0.2)]"
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
      className="w-full rounded-[8px] px-[24px] py-[12px] text-[16px] font-medium leading-[1.5] transition-colors disabled:cursor-not-allowed bg-[#005eb8] text-white hover:bg-[#004f9c] disabled:bg-[#e0e0e0] disabled:text-[#9e9e9e]"
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
      className="w-full rounded-[8px] px-[24px] py-[12px] text-[16px] font-medium leading-[1.5] bg-white border border-[#005eb8] text-[#005eb8] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] hover:bg-[#f5f9ff] cursor-pointer"
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

/* ── Green success toast ── */
export function SuccessToast({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 bg-[#ecfdf5] rounded-[8px] px-[16px] py-[12px] drop-shadow-[0px_4px_12px_rgba(0,0,0,0.12)]">
      <Check size={18} className="text-[#08754f]" />
      <span className="text-[14px] leading-[1.5] text-[#08754f]">{children}</span>
    </div>
  )
}
