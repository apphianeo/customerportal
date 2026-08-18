import { useEffect, useState } from 'react'
import closeIcon from '../assets/icons/close.svg'
import errorNotice from '../assets/icons/error-notice.svg'
import { useInlineValidation } from '../hooks/useInlineValidation'
import { OtpBoxes } from '../pages/auth/AuthUI'
import { accountExists } from '../data/accounts'
import { MESSAGES, maskEmail, validateEmail, validateOtp } from '../pages/auth/validation'

/* ── Modal chrome, shared by all three steps ── */
function Shell({
  title,
  subtitle,
  onClose,
  children,
  footer,
}: {
  title: string
  subtitle?: string
  onClose?: () => void
  children?: React.ReactNode
  footer: React.ReactNode
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div
        onClick={e => e.stopPropagation()}
        className="relative bg-white rounded-[12px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] p-[24px] w-[600px] max-w-full max-h-full overflow-y-auto flex flex-col gap-[32px]"
      >
        <div className="flex flex-col gap-[24px] w-full">
          <div className="flex flex-col gap-[12px] w-full pr-[32px]">
            <h2 className="font-h2-title font-semibold text-[#212121] m-0">{title}</h2>
            {subtitle && <p className="text-[14px] leading-[1.5] text-[#6e6e6e] m-0">{subtitle}</p>}
          </div>
          {children}
        </div>
        {footer}
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-[24px] top-[26px] bg-transparent border-0 p-0 cursor-pointer"
          >
            <img src={closeIcon} alt="" className="w-[20px] h-[20px]" />
          </button>
        )}
      </div>
    </div>
  )
}

function ErrorLine({ message }: { message: string }) {
  return (
    <span className="flex items-center gap-2 text-[12px] leading-[1.4] text-[#dc2626]">
      <img src={errorNotice} alt="" className="w-4 h-4 shrink-0" />
      {message}
    </span>
  )
}

function EmailInput({
  label,
  value,
  onChange,
  placeholder,
  error,
  onBlur,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder: string
  error?: string
  onBlur?: () => void
}) {
  return (
    <label className="flex flex-col gap-[8px] w-full">
      <div className="flex flex-col gap-[12px] w-full">
        <span className="text-[14px] leading-[1.5] text-[#212121]">{label}</span>
        <input
          type="email"
          inputMode="email"
          value={value}
          placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
          onBlur={onBlur}
          className={`bg-white border rounded-[8px] px-[16px] py-[12px] w-full text-[16px] text-[#212121] leading-[1.5] outline-none placeholder:text-[#949494] ${
            error
              ? 'border-[#dc2626]'
              : 'border-[rgba(0,0,0,0.09)] focus:border-[#005eb8] focus:shadow-[0px_0px_0px_3px_rgba(0,94,184,0.2)]'
          }`}
        />
      </div>
      {error && <ErrorLine message={error} />}
    </label>
  )
}

function PrimaryAction({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="self-end rounded-[8px] px-[32px] py-[14px] text-[16px] font-medium leading-[1.5] bg-[#005eb8] text-white border-0 cursor-pointer"
    >
      {children}
    </button>
  )
}

function ResendRow() {
  const [seconds, setSeconds] = useState(179)
  useEffect(() => {
    if (seconds <= 0) return
    const id = setInterval(() => setSeconds(s => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(id)
  }, [seconds])
  return (
    <p className="text-[14px] leading-[1.5] text-[#212121] m-0">
      Did not receive a code?{' '}
      {seconds > 0 ? (
        <span className="text-[#949494]">Resend ({seconds}s)</span>
      ) : (
        <button
          onClick={() => setSeconds(179)}
          className="text-text-secondary underline bg-transparent border-0 p-0 cursor-pointer"
        >
          Resend
        </button>
      )}
    </p>
  )
}

type Step = 'form' | 'otp' | 'done'

/**
 * Changing the login ID is a credential change, so it is verified by OTP and
 * ends by signing the user out of every session — same shape as the password
 * change beside it.
 */
export default function ChangeLoginIdModal({
  email,
  onClose,
  onSignIn,
}: {
  /** The address currently on the account. */
  email: string
  onClose: () => void
  onSignIn: () => void
}) {
  const [step, setStep] = useState<Step>('form')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [nextSubmitError, setNextSubmitError] = useState('')
  const [code, setCode] = useState('')
  const [otpError, setOtpError] = useState('')

  const nextInline = useInlineValidation({
    value: next,
    validate: validateEmail,
    requiredMessage: MESSAGES.required,
  })
  const nextError = nextSubmitError || nextInline.error

  const confirmInline = useInlineValidation({
    value: confirm,
    validate: v => (v !== next ? MESSAGES.emailMismatch : undefined),
    requiredMessage: MESSAGES.required,
    // A half-typed address can still turn into a match, so stay quiet until
    // it can no longer become one.
    isComplete: v => Boolean(next) && !next.startsWith(v),
  })

  function submitForm() {
    nextInline.show()
    confirmInline.show()
    if (!nextInline.isValid || !confirmInline.isValid) return
    // Somebody else already signs in with this address
    if (accountExists(next)) {
      setNextSubmitError(MESSAGES.accountExists)
      return
    }
    setNextSubmitError('')
    setStep('otp')
  }

  function verify() {
    if (!code.trim()) {
      setOtpError(MESSAGES.required)
      return
    }
    const error = validateOtp(code)
    if (error) {
      setOtpError(error)
      return
    }
    setOtpError('')
    setStep('done')
  }

  if (step === 'done') {
    return (
      <Shell
        title="Login ID (email address) updated"
        subtitle="You will be logged out of all active sessions as your Login ID (email address) was changed"
        footer={<PrimaryAction onClick={onSignIn}>Sign In</PrimaryAction>}
      />
    )
  }

  if (step === 'otp') {
    return (
      <Shell
        title="OTP verification"
        subtitle={`Please enter the one-time password (OTP) sent to ${maskEmail(next)}`}
        onClose={onClose}
        footer={<PrimaryAction onClick={verify}>Verify</PrimaryAction>}
      >
        <div className="flex flex-col gap-[12px] w-full">
          <OtpBoxes value={code} onChange={v => { setCode(v); setOtpError('') }} error={Boolean(otpError)} />
          {otpError && <ErrorLine message={otpError} />}
          <ResendRow />
        </div>
      </Shell>
    )
  }

  return (
    <Shell
      title="Change login ID (email address)"
      subtitle="Changing your login ID (email address) will sign you out of all active sessions. You will need to log in again."
      onClose={onClose}
      footer={<PrimaryAction onClick={submitForm}>Confirm</PrimaryAction>}
    >
      <div className="flex flex-col gap-[4px] w-full">
        <span className="text-[14px] leading-[1.5] text-[#6e6e6e]">Current login ID (email address)</span>
        <span className="text-[16px] leading-[1.5] text-[#212121]">{email}</span>
      </div>
      <EmailInput
        label="New login ID (email address)"
        value={next}
        onChange={v => { setNext(v); setNextSubmitError(''); nextInline.reset() }}
        onBlur={nextInline.onBlur}
        placeholder="Enter new login ID"
        error={nextError}
      />
      <EmailInput
        label="Confirm new login ID (email address)"
        value={confirm}
        onChange={v => { setConfirm(v); confirmInline.reset() }}
        onBlur={confirmInline.onBlur}
        placeholder="Re-enter new login ID"
        error={confirmInline.error}
      />
    </Shell>
  )
}
