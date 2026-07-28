import { useState } from 'react'
import { Eye, EyeOff, Check } from 'lucide-react'
import closeIcon from '../assets/icons/close.svg'

const RULES = [
  { label: '8 to 24 characters', test: (v: string) => v.length >= 8 && v.length <= 24 },
  { label: '1 letter', test: (v: string) => /[A-Za-z]/.test(v) },
  { label: '1 number', test: (v: string) => /[0-9]/.test(v) },
]

function PasswordInput({
  value,
  onChange,
  placeholder,
  show,
  onToggle,
  error,
}: {
  value: string
  onChange: (v: string) => void
  placeholder: string
  show: boolean
  onToggle: () => void
  error?: boolean
}) {
  return (
    <div className="relative w-full">
      <input
        type={show ? 'text' : 'password'}
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
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

export default function ChangePasswordModal({ onClose, onSignIn }: { onClose: () => void; onSignIn: () => void }) {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [attempted, setAttempted] = useState(false)
  const [done, setDone] = useState(false)

  const allRulesMet = RULES.every(r => r.test(password))
  const mismatch = confirm !== '' && confirm !== password

  function submit() {
    if (!allRulesMet || confirm !== password) {
      setAttempted(true)
      return
    }
    setDone(true)
  }

  // Confirmation — password changed, user must sign in again
  if (done) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
        <div className="relative bg-white rounded-[12px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] p-[24px] w-[480px] max-w-full flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[4px]">
            <h2 className="text-[20px] font-semibold leading-[1.2] text-[#212121] m-0">Password updated</h2>
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
      <div className="relative bg-white rounded-[12px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] p-[24px] w-[480px] max-w-full flex flex-col gap-[16px]" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-start gap-[16px]">
          <div className="flex flex-col gap-[4px] flex-1 min-w-0">
            <h2 className="text-[20px] font-semibold leading-[1.2] text-[#212121] m-0">Choose new password</h2>
            <p className="text-[14px] text-[#6e6e6e] leading-[1.5] m-0">
              You will be logged out of all active sessions after your password is changed
            </p>
          </div>
          <button onClick={onClose} aria-label="Close" className="bg-transparent border-0 p-0 cursor-pointer shrink-0">
            <img src={closeIcon} alt="" className="w-[24px] h-[24px]" />
          </button>
        </div>

        {/* New password */}
        <div className="flex flex-col gap-[8px] w-full">
          <label className="text-[14px] text-[#212121] leading-[1.5]">Enter new password</label>
          <PasswordInput value={password} onChange={setPassword} placeholder="Enter password" show={showPw} onToggle={() => setShowPw(s => !s)} />
          <div className="flex flex-col gap-[8px] pt-[4px]">
            <span className="text-[12px] leading-[1.4] text-[#6e6e6e]">Your password must contain at least:</span>
            {RULES.map(rule => {
              const met = rule.test(password)
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
          <PasswordInput value={confirm} onChange={setConfirm} placeholder="Re-enter new password" show={showConfirm} onToggle={() => setShowConfirm(s => !s)} error={mismatch} />
          {mismatch && <span className="text-[12px] leading-[1.4] text-[#dc2626]">Passwords do not match</span>}
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
