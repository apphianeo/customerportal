import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import singpassBtn from '../../assets/singpass-btn.png'
import {
  AuthShell,
  AuthHeader,
  Field,
  PasswordField,
  DateField,
  OtpBoxes,
  PrimaryButton,
  OutlineButton,
  LinkButton,
  SuccessToast,
} from './AuthUI'

type Screen =
  | 'landing'
  | 'nric'
  | 'nric-otp'
  | 'register'
  | 'register-otp'
  | 'set-password'
  | 'forgot'

/** Mask an email like ch*****@gmail.com for OTP display. */
function maskEmail(email: string) {
  const [name, domain] = email.split('@')
  if (!domain) return email
  const head = name.slice(0, 2)
  return `${head}${'*'.repeat(Math.max(name.length - 2, 3))}@${domain}`
}

export default function AuthFlow({ onAuthenticated }: { onAuthenticated: () => void }) {
  const [screen, setScreen] = useState<Screen>('landing')
  const [email, setEmail] = useState('')

  switch (screen) {
    case 'nric':
      return (
        <NricLogin
          onBack={() => setScreen('landing')}
          onLogin={() => setScreen('nric-otp')}
          onForgot={() => setScreen('forgot')}
          onRegister={() => setScreen('register')}
        />
      )
    case 'nric-otp':
      return (
        <OtpVerification
          email="user@gmail.com"
          onBack={() => setScreen('nric')}
          onVerify={onAuthenticated}
        />
      )
    case 'register':
      return (
        <CreateAccount
          email={email}
          setEmail={setEmail}
          onBack={() => setScreen('landing')}
          onRequestOtp={() => setScreen('register-otp')}
          onLogin={() => setScreen('nric')}
        />
      )
    case 'register-otp':
      return (
        <OtpVerification
          email={email || 'user@gmail.com'}
          onBack={() => setScreen('register')}
          onVerify={() => setScreen('set-password')}
        />
      )
    case 'set-password':
      return (
        <SetPassword
          onBack={() => setScreen('register-otp')}
          onCreate={onAuthenticated}
        />
      )
    case 'forgot':
      return <ForgotPassword onBack={() => setScreen('nric')} />
    default:
      return (
        <Landing
          onSingpass={onAuthenticated}
          onNric={() => setScreen('nric')}
          onRegister={() => setScreen('register')}
        />
      )
  }
}

/* ─────────────────────────── Landing ─────────────────────────── */
function Landing({
  onSingpass,
  onNric,
  onRegister,
}: {
  onSingpass: () => void
  onNric: () => void
  onRegister: () => void
}) {
  return (
    <AuthShell>
      <AuthHeader title="Log In Customer Portal" subtitle="Access your insurance policies in one place." />
      <div className="flex flex-col items-center gap-6 w-full">
        <button
          onClick={onSingpass}
          className="w-[228px] bg-transparent border-0 p-0 cursor-pointer"
        >
          <img src={singpassBtn} alt="Log in with Singpass" className="w-full h-auto rounded-[8px]" />
        </button>
        <div className="flex items-center gap-4 w-full">
          <span className="flex-1 h-px bg-[rgba(0,0,0,0.09)]" />
          <span className="text-[14px] text-[#949494]">OR</span>
          <span className="flex-1 h-px bg-[rgba(0,0,0,0.09)]" />
        </div>
        <div className="w-[228px]">
          <OutlineButton onClick={onNric}>Log In with NRIC/FIN</OutlineButton>
        </div>
      </div>
      <p className="text-[14px] leading-[1.5] text-[#6e6e6e] text-center w-full">
        New user? Get started with Singpass or <LinkButton onClick={onRegister}>register manually</LinkButton>
      </p>
    </AuthShell>
  )
}

/* ─────────────────────── NRIC/FIN login ──────────────────────── */
function NricLogin({
  onBack,
  onLogin,
  onForgot,
  onRegister,
}: {
  onBack: () => void
  onLogin: () => void
  onForgot: () => void
  onRegister: () => void
}) {
  const [nric, setNric] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const canSubmit = nric.trim() !== '' && password !== ''

  return (
    <AuthShell onBack={onBack}>
      <AuthHeader title="Log In Customer Portal" subtitle="Access your insurance policies in one place." />
      <div className="flex flex-col gap-4 w-full">
        <Field label="NRIC/FIN" value={nric} onChange={setNric} placeholder="Enter NRIC/FIN" />
        <PasswordField
          label="Password"
          value={password}
          onChange={setPassword}
          show={show}
          onToggle={() => setShow((s) => !s)}
          placeholder="Enter password"
        />
        <div className="self-start">
          <LinkButton onClick={onForgot}>Forgot password?</LinkButton>
        </div>
        <PrimaryButton onClick={onLogin} disabled={!canSubmit}>
          Login
        </PrimaryButton>
      </div>
      <p className="text-[14px] leading-[1.5] text-[#6e6e6e] text-center w-full">
        New user? Get started with Singpass or <LinkButton onClick={onRegister}>register manually</LinkButton>
      </p>
    </AuthShell>
  )
}

/* ───────────────────────── Create Account ────────────────────── */
function CreateAccount({
  email,
  setEmail,
  onBack,
  onRequestOtp,
  onLogin,
}: {
  email: string
  setEmail: (v: string) => void
  onBack: () => void
  onRequestOtp: () => void
  onLogin: () => void
}) {
  const [nric, setNric] = useState('')
  const [dob, setDob] = useState('')
  const canSubmit = nric.trim() !== '' && dob !== '' && /\S+@\S+\.\S+/.test(email)

  return (
    <AuthShell onBack={onBack}>
      <AuthHeader title="Create Account" subtitle="Please ensure your details are correct to proceed." />
      <div className="flex flex-col gap-4 w-full">
        <Field label="NRIC/FIN" value={nric} onChange={setNric} placeholder="Enter NRIC/FIN" />
        <DateField label="Date of birth" value={dob} onChange={setDob} />
        <Field label="Email address" value={email} onChange={setEmail} placeholder="Enter email address" type="email" />
        <PrimaryButton onClick={onRequestOtp} disabled={!canSubmit}>
          Request OTP
        </PrimaryButton>
      </div>
      <p className="text-[14px] leading-[1.5] text-[#6e6e6e] text-center w-full">
        Already have an account? <LinkButton onClick={onLogin}>Log in</LinkButton>
      </p>
    </AuthShell>
  )
}

/* ──────────────────────── OTP Verification ───────────────────── */
function OtpVerification({
  email,
  onBack,
  onVerify,
}: {
  email: string
  onBack: () => void
  onVerify: () => void
}) {
  const [code, setCode] = useState('')

  return (
    <AuthShell onBack={onBack}>
      <AuthHeader
        title="OTP Verification"
        subtitle={`Please enter the one-time password (OTP) sent to ${maskEmail(email)}.`}
      />
      <div className="flex flex-col gap-4 w-full">
        <label className="text-[14px] font-medium leading-[1.5] text-[#212121]">Enter code</label>
        <OtpBoxes value={code} onChange={setCode} />
        <ResendRow />
        <PrimaryButton onClick={onVerify} disabled={code.length < 6}>
          Verify
        </PrimaryButton>
      </div>
      <p className="text-[14px] leading-[1.5] text-[#6e6e6e] text-center w-full">
        Having trouble? <LinkButton>Contact our support team</LinkButton>
      </p>
    </AuthShell>
  )
}

function ResendRow() {
  const [seconds, setSeconds] = useState(119)
  useEffect(() => {
    if (seconds <= 0) return
    const id = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(id)
  }, [seconds])
  return (
    <p className="text-[14px] leading-[1.5] text-[#212121]">
      Didn't receive a code?{' '}
      {seconds > 0 ? (
        <span className="text-[#8d8d8d]">Resend ({seconds}s)</span>
      ) : (
        <LinkButton onClick={() => setSeconds(119)}>Resend</LinkButton>
      )}
    </p>
  )
}

/* ────────────────────────── Set Password ─────────────────────── */
const RULES = [
  { label: '8 to 24 characters', test: (v: string) => v.length >= 8 && v.length <= 24 },
  { label: '1 letter', test: (v: string) => /[A-Za-z]/.test(v) },
  { label: '1 number', test: (v: string) => /[0-9]/.test(v) },
]

function SetPassword({ onBack, onCreate }: { onBack: () => void; onCreate: () => void }) {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const allRulesMet = RULES.every((r) => r.test(password))
  const canSubmit = allRulesMet && confirm === password

  return (
    <AuthShell
      onBack={onBack}
      toast={<SuccessToast>Email address verified</SuccessToast>}
    >
      <AuthHeader title="Set Password" subtitle="Create a strong password to finish setting up your account." />
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-2 w-full">
          <PasswordField
            label="Password"
            value={password}
            onChange={setPassword}
            show={showPw}
            onToggle={() => setShowPw((s) => !s)}
            placeholder="Enter password"
          />
          <div className="flex flex-col gap-1 pt-1">
            <span className="text-[12px] text-[#6e6e6e]">Your password must contain at least:</span>
            {RULES.map((rule) => {
              const met = rule.test(password)
              return (
                <div key={rule.label} className="flex items-center gap-2">
                  <span
                    className={`flex items-center justify-center w-[14px] h-[14px] rounded-full border ${
                      met ? 'bg-[#08754f] border-[#08754f]' : 'border-[#c9ced6]'
                    }`}
                  >
                    {met && <Check size={10} className="text-white" strokeWidth={3} />}
                  </span>
                  <span className={`text-[12px] ${met ? 'text-[#08754f]' : 'text-[#8d8d8d]'}`}>
                    {rule.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
        <PasswordField
          label="Confirm password"
          value={confirm}
          onChange={setConfirm}
          show={showConfirm}
          onToggle={() => setShowConfirm((s) => !s)}
          placeholder="Re-enter password"
        />
        <PrimaryButton onClick={onCreate} disabled={!canSubmit}>
          Create Account
        </PrimaryButton>
      </div>
      <p className="text-[14px] leading-[1.5] text-[#6e6e6e] text-center w-full">
        Having trouble? <LinkButton>Contact our support team</LinkButton>
      </p>
    </AuthShell>
  )
}

/* ───────────────────────── Forgot Password ───────────────────── */
function ForgotPassword({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const canSubmit = /\S+@\S+\.\S+/.test(email)

  return (
    <AuthShell
      onBack={onBack}
      toast={sent ? <SuccessToast>Reset link sent to your email</SuccessToast> : undefined}
    >
      <AuthHeader
        title="Forgot Password"
        subtitle="Enter your account's email address and we'll send you an email to reset your password."
      />
      <div className="flex flex-col gap-4 w-full">
        <Field label="Email address" value={email} onChange={setEmail} placeholder="Enter email address" type="email" />
        <PrimaryButton onClick={() => setSent(true)} disabled={!canSubmit}>
          Send Reset Link
        </PrimaryButton>
      </div>
      <p className="text-[14px] leading-[1.5] text-[#6e6e6e] text-center w-full">
        Having trouble? <LinkButton>Contact our support team</LinkButton>
      </p>
    </AuthShell>
  )
}
