import { useState } from 'react'
import { Eye, EyeOff, Check } from 'lucide-react'
import closeIcon from '../assets/icons/close.svg'
import errorNotice from '../assets/icons/error-notice.svg'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { useInlineValidation } from '../hooks/useInlineValidation'
import {
  MESSAGES,
  PASSWORD_RULES as RULES,
  attemptLogin,
  passwordMeetsRules,
  validatePasswordContent,
  validatePasswordHistory,
} from '../pages/auth/validation'

function PasswordInput({
  value,
  onChange,
  placeholder,
  show,
  onToggle,
  error,
  onBlur,
}: {
  value: string
  onChange: (v: string) => void
  placeholder: string
  show: boolean
  onToggle: () => void
  error?: boolean
  onBlur?: () => void
}) {
  return (
    <div className="relative w-full">
      <input
        type={show ? 'text' : 'password'}
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        onBlur={onBlur}
        style={{ paddingRight: 44 }}
        className={`bg-white border rounded-[8px] px-[16px] py-[12px] w-full text-[16px] text-[#212121] leading-[1.5] outline-none placeholder:text-[#949494] ${
          error ? 'border-[#dc2626]' : 'border-[rgba(0,0,0,0.09)] focus:border-[#005eb8] focus:shadow-[0px_0px_0px_3px_rgba(0,94,184,0.2)]'
        }`}
      />
      <button
        type="button"
        tabIndex={-1}
        onClick={onToggle}
        className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[#6e6e6e] bg-transparent border-0 p-0 cursor-pointer flex items-center"
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  )
}

export default function ChangePasswordModal({
  email,
  nric,
  onClose,
  onSignIn,
}: {
  /** Identifies the account, so the current password can be checked. */
  email?: string
  nric?: string
  onClose: () => void
  onSignIn: () => void
}) {
  const [current, setCurrent] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [attempted, setAttempted] = useState(false)
  const [currentError, setCurrentError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [done, setDone] = useState(false)

  // Checkmarks tick once typing settles
  const debouncedPassword = useDebouncedValue(password)
  const confirmInline = useInlineValidation({
    value: confirm,
    validate: v => (v !== debouncedPassword ? MESSAGES.passwordMismatch : undefined),
    // Silent only while the entry could still turn into the password. The moment
    // it diverges it can never match, so flag it as soon as typing settles.
    isComplete: v => Boolean(debouncedPassword) && !debouncedPassword.startsWith(v),
  })
  const mismatch = Boolean(confirmInline.error)

  function submit() {
    // Prove it is really them before anything else
    if (email) {
      const result = attemptLogin(email, current)
      if (!result.ok) {
        setCurrentError(MESSAGES.passwordIncorrect)
        return
      }
    }
    if (!passwordMeetsRules(password) || confirm !== password) {
      setAttempted(true)
      confirmInline.show()
      return
    }
    const contentError = validatePasswordContent(password, nric)
    if (contentError) {
      setPasswordError(contentError)
      return
    }
    const historyError = validatePasswordHistory(password, email)
    if (historyError) {
      setPasswordError(historyError)
      return
    }
    setPasswordError('')
    setDone(true)
  }

  // Confirmation — password changed, user must sign in again
  if (done) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
        <div className="relative bg-white rounded-[12px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] p-[24px] w-[600px] max-w-full flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[4px]">
            <h2 className="font-h2-title font-semibold text-[#212121] m-0">Password updated</h2>
            <p className="text-[14px] text-[#6e6e6e] leading-[1.5] m-0">
              You will be logged out of all active sessions as your password was changed
            </p>
          </div>
          <button
            onClick={onSignIn}
            className="self-end rounded-[8px] px-[32px] py-[14px] text-[16px] font-medium leading-[1.5] bg-[#005eb8] text-white cursor-pointer"
          >
            Sign In
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div className="relative bg-white rounded-[12px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] p-[24px] w-[600px] max-w-full flex flex-col gap-[16px]" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-start gap-[16px]">
          <div className="flex flex-col gap-[12px] flex-1 min-w-0">
            <h2 className="font-h2-title font-semibold text-[#212121] m-0">Change password</h2>
            <p className="text-[14px] text-[#6e6e6e] leading-[1.5] m-0">
              You will be logged out of all active sessions after your password is changed
            </p>
          </div>
          <button onClick={onClose} aria-label="Close" className="bg-transparent border-0 p-0 cursor-pointer shrink-0">
            <img src={closeIcon} alt="" className="w-[20px] h-[20px]" />
          </button>
        </div>

        {/* Current password */}
        <div className="flex flex-col gap-[8px] w-full">
          <label className="text-[14px] text-[#212121] leading-[1.5]">Current password</label>
          <PasswordInput
            value={current}
            onChange={v => { setCurrent(v); setCurrentError('') }}
            placeholder="Enter current password"
            show={showCurrent}
            onToggle={() => setShowCurrent(s => !s)}
            error={Boolean(currentError)}
          />
          {currentError && (
            <span className="flex items-center gap-2 text-[12px] leading-[1.4] text-[#dc2626]">
              <img src={errorNotice} alt="" className="w-4 h-4 shrink-0" />
              {currentError}
            </span>
          )}
        </div>

        {/* New password */}
        <div className="flex flex-col gap-[8px] w-full">
          <label className="text-[14px] text-[#212121] leading-[1.5]">New password</label>
          <PasswordInput
            value={password}
            onChange={v => { setPassword(v); setPasswordError('') }}
            placeholder="Enter new password"
            show={showPw}
            onToggle={() => setShowPw(s => !s)}
            error={Boolean(passwordError)}
          />
          {passwordError && (
            <span className="flex items-center gap-2 text-[12px] leading-[1.4] text-[#dc2626]">
              <img src={errorNotice} alt="" className="w-4 h-4 shrink-0" />
              {passwordError}
            </span>
          )}
          <div className="flex flex-col gap-[8px] pt-[4px]">
            <span className="text-[12px] leading-[1.4] text-[#6e6e6e]">Your password must contain at least:</span>
            {RULES.map(rule => {
              const met = rule.test(debouncedPassword)
              const failed = attempted && !met
              return (
                <div key={rule.label} className="flex items-center gap-[8px]">
                  <span className={`flex items-center justify-center w-[16px] h-[16px] rounded-full border ${met ? 'bg-[#08754f] border-[#08754f]' : failed ? 'border-[#dc2626]' : 'border-[#c9ced6]'}`}>
                    {met && <Check size={11} className="text-white" strokeWidth={3} />}
                  </span>
                  <span className={`text-[12px] leading-[1.4] ${met ? 'text-[#08754f]' : failed ? 'text-[#dc2626]' : 'text-[#6e6e6e]'}`}>{rule.label}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Confirm password */}
        <div className="flex flex-col gap-[8px] w-full">
          <label className="text-[14px] text-[#212121] leading-[1.5]">Confirm new password</label>
          <PasswordInput value={confirm} onChange={v => { setConfirm(v); confirmInline.reset() }} onBlur={confirmInline.onBlur} placeholder="Re-enter new password" show={showConfirm} onToggle={() => setShowConfirm(s => !s)} error={mismatch} />
          {mismatch && (
            <span className="flex items-center gap-2 text-[12px] leading-[1.4] text-[#dc2626]">
              <img src={errorNotice} alt="" className="w-4 h-4 shrink-0" />
              {MESSAGES.passwordMismatch}
            </span>
          )}
        </div>

        {/* Action */}
        <button
          onClick={submit}
          className="self-end rounded-[8px] px-[32px] py-[14px] text-[16px] font-medium leading-[1.5] bg-[#005eb8] text-white cursor-pointer"
        >
          Update Password
        </button>
      </div>
    </div>
  )
}
