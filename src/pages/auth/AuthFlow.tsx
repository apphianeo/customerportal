import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import singpassBtn from '../../assets/singpass-btn.png'
import singpassLogin from '../../assets/singpass-login.png'
import singpassLogo from '../../assets/singpass-logo.png'
import {
  AuthShell,
  AuthHeader,
  Field,
  PasswordField,
  DateField,
  PhoneField,
  OtpBoxes,
  FieldError,
  PrimaryButton,
  OutlineButton,
  LinkButton,
} from './AuthUI'

type Screen =
  | 'landing'
  | 'nric'
  | 'nric-otp'
  | 'register'
  | 'register-otp'
  | 'set-password'
  | 'singpass-qr'
  | 'singpass-approve'
  | 'singpass-setup'
  | 'forgot'
  | 'reset'

const SUBTITLE = 'Access your insurance policies in one place'
const NRIC_RE = /^[STFGM]\d{7}[A-Z]$/i

/** Mask an email like ch*****@gmail.com for OTP display. */
function maskEmail(email: string) {
  const [name, domain] = email.split('@')
  if (!domain) return email
  const head = name.slice(0, 2)
  return `${head}${'*'.repeat(Math.max(name.length - 2, 3))}@${domain}`
}

export default function AuthFlow({ onAuthenticated }: { onAuthenticated: (method?: 'singpass' | 'account') => void }) {
  const [screen, setScreen] = useState<Screen>('landing')
  const [email, setEmail] = useState('')
  const [loginToast, setLoginToast] = useState<string | null>(null)

  function goLogin(toast?: string) {
    setLoginToast(toast ?? null)
    setScreen('nric')
  }

  switch (screen) {
    case 'nric':
      return (
        <NricLogin
          toast={loginToast}
          onBack={() => { setLoginToast(null); setScreen('landing') }}
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
          onVerify={() => onAuthenticated('account')}
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
        <PasswordSetup
          title="Set Password"
          subtitle="Create a password to finish setting up your account"
          buttonLabel="Create Account"
          onBack={() => setScreen('register-otp')}
          onSubmit={() => onAuthenticated('account')}
        />
      )
    case 'singpass-qr':
      return <SingpassLogin onScan={() => setScreen('singpass-approve')} />
    case 'singpass-approve':
      return (
        <SingpassApprove
          onCancel={() => setScreen('landing')}
          onAgree={() => setScreen('singpass-setup')}
        />
      )
    case 'singpass-setup':
      return (
        <PasswordSetup
          title="Create Password"
          subtitle="A password is required to complete your setup. Once set, you can also log in using your NRIC/FIN."
          buttonLabel="Complete Setup"
          onBack={() => setScreen('landing')}
          onSubmit={() => onAuthenticated('singpass')}
        />
      )
    case 'forgot':
      // Send reset link → return to login (reset itself happens via the emailed link).
      return (
        <ForgotPassword
          onBack={() => setScreen('nric')}
          onSent={() => setScreen('nric')}
        />
      )
    case 'reset':
      // Reached via the emailed reset link (not wired to an in-app button).
      return (
        <PasswordSetup
          title="Reset Password"
          subtitle="Enter your new password"
          buttonLabel="Reset Password"
          onBack={() => setScreen('nric')}
          onSubmit={() => goLogin('Password updated, login again')}
        />
      )
    default:
      return (
        <Landing
          onSingpass={() => setScreen('singpass-qr')}
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
      <AuthHeader title="Customer Portal" subtitle={SUBTITLE} />
      <div className="flex flex-col items-center gap-6 w-full">
        <button onClick={onSingpass} className="w-[228px] bg-transparent border-0 p-0 cursor-pointer">
          <img src={singpassBtn} alt="Log in with Singpass" className="w-full h-auto rounded-[8px]" />
        </button>
        <div className="flex items-center gap-4 w-full">
          <span className="flex-1 h-px bg-[rgba(0,0,0,0.09)]" />
          <span className="text-[14px] text-[#949494]">OR</span>
          <span className="flex-1 h-px bg-[rgba(0,0,0,0.09)]" />
        </div>
        <div className="w-[228px]">
          <OutlineButton onClick={onNric}>Log in with NRIC/FIN</OutlineButton>
        </div>
      </div>
      <p className="text-[14px] leading-[1.5] text-[#6e6e6e] text-center w-full">
        New user? Get started with Singpass or <LinkButton onClick={onRegister}>register manually</LinkButton>
      </p>
    </AuthShell>
  )
}

/* ────────────── Singpass login (QR) — Singpass's own page ─────── */
function SingpassLogin({ onScan }: { onScan: () => void }) {
  return (
    <div className="min-h-screen w-full bg-white overflow-auto">
      <div className="relative w-full">
        <img src={singpassLogin} alt="Log in with Singpass" className="block w-full h-auto" />
        {/* Clickable QR region → authorisation page */}
        <button
          onClick={onScan}
          aria-label="Scan QR code with Singpass app"
          className="absolute cursor-pointer"
          style={{ left: '71%', top: '44%', width: '20%', height: '28%' }}
        />
      </div>
    </div>
  )
}

/* ────────────── Singpass authorisation / consent screen ───────── */
const SINGPASS_FIELDS = ['Name', 'NRIC/FIN', 'Email Address', 'Mobile Number', 'Date of Birth', 'Registered Address', 'Sex']

function SingpassApprove({ onCancel, onAgree }: { onCancel: () => void; onAgree: () => void }) {
  return (
    <div className="min-h-screen w-full bg-[#f7f7f7] flex items-center justify-center p-6">
      <div className="w-[785px] max-w-full flex flex-col gap-8 items-center">
        <div className="w-full border border-[rgba(0,0,0,0.09)] rounded-[12px] overflow-hidden">
          <div className="bg-[#e6e5e8] border-t-[5px] border-[#ed1a3b] flex flex-col gap-9 items-center p-8">
            <img src={singpassLogo} alt="Singpass" className="h-[39px] w-auto" />
            <div className="w-full text-[18px] leading-normal text-[#6e6e6e] flex flex-col gap-4">
              <p>
                Singpass retrieves personal data from relevant government agencies to pre-fill the
                relevant fields, making digital transactions faster and more convenient.
              </p>
              <p className="font-semibold text-[#212121]">
                UOI Customer Portal by United Overseas Insurance is requesting your information from
                Singpass to register for an account.
              </p>
            </div>
          </div>
          <div className="bg-white p-8 text-[18px] text-[#212121]">
            {SINGPASS_FIELDS.map((field) => (
              <p key={field} className="leading-[2]">
                <span className="text-[#949494]">{'> '}</span>
                {field}
              </p>
            ))}
          </div>
        </div>
        <p className="text-[16px] leading-normal text-[#6e6e6e] text-center">
          Clicking the “I Agree” button permits the digital service to retrieve your data based on the{' '}
          <span className="text-[#005eb8]">Terms of Use.</span>
        </p>
        <div className="flex gap-8">
          <button
            onClick={onCancel}
            className="h-[48px] px-8 rounded-[8px] bg-white border border-[rgba(0,0,0,0.09)] text-[16px] font-medium text-[#6e6e6e] cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onAgree}
            className="h-[48px] px-8 rounded-[8px] bg-[#d93841] text-[16px] font-medium text-white cursor-pointer"
          >
            I Agree
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────── NRIC/FIN login ──────────────────────── */
function NricLogin({
  toast,
  onBack,
  onLogin,
  onForgot,
  onRegister,
}: {
  toast: string | null
  onBack: () => void
  onLogin: () => void
  onForgot: () => void
  onRegister: () => void
}) {
  const [nric, setNric] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')

  function submit() {
    if (!NRIC_RE.test(nric.trim())) {
      setError('Please enter a valid NRIC/FIN format (e.g. S1234567A)')
      return
    }
    setError('')
    onLogin()
  }

  return (
    <AuthShell onBack={onBack} toast={toast ?? undefined}>
      <AuthHeader title="Customer Portal" subtitle={SUBTITLE} />
      <div className="flex flex-col gap-4 w-full">
        <Field
          label="NRIC/FIN"
          value={nric}
          onChange={(v) => { setNric(v); setError('') }}
          placeholder="Enter NRIC/FIN"
          error={error}
        />
        <PasswordField
          label="Password"
          value={password}
          onChange={setPassword}
          show={show}
          onToggle={() => setShow((s) => !s)}
          placeholder="Enter password"
        />
        <div className="self-start text-[14px]">
          <LinkButton onClick={onForgot}>Forgot password?</LinkButton>
        </div>
        <PrimaryButton onClick={submit}>
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
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [dob, setDob] = useState('')
  const [nric, setNric] = useState('')
  const [phone, setPhone] = useState('')
  const [nricError, setNricError] = useState('')

  function submit() {
    if (!NRIC_RE.test(nric.trim())) {
      setNricError('Please enter a valid NRIC/FIN format (e.g. S1234567A)')
      return
    }
    setNricError('')
    onRequestOtp()
  }

  return (
    <AuthShell onBack={onBack}>
      <AuthHeader title="Create Account" subtitle="Provide the following details to proceed" />
      <div className="flex flex-col gap-4 w-full">
        <div className="flex gap-4 w-full">
          <Field label="First name" value={first} onChange={setFirst} placeholder="Enter first name" />
          <Field label="Last name" value={last} onChange={setLast} placeholder="Enter last name" />
        </div>
        <DateField label="Date of birth" value={dob} onChange={setDob} />
        <Field
          label="NRIC/FIN"
          value={nric}
          onChange={(v) => { setNric(v); setNricError('') }}
          placeholder="Enter NRIC/FIN"
          error={nricError}
        />
        <Field label="Email address" value={email} onChange={setEmail} placeholder="Enter email address" type="email" inputMode="email" />
        <PhoneField label="Phone number" value={phone} onChange={setPhone} />
        <PrimaryButton onClick={submit}>
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
  const [error, setError] = useState(false)

  function verify() {
    // Mock: incomplete code or the all-nines placeholder trips the error state.
    if (code.length < 6 || code === '999999') {
      setError(true)
      return
    }
    setError(false)
    onVerify()
  }

  return (
    <AuthShell onBack={onBack}>
      <AuthHeader
        title="OTP Verification"
        subtitle={`Please enter the one-time password (OTP) sent to ${maskEmail(email)}`}
      />
      <div className="flex flex-col gap-4 w-full">
        <label className="text-[14px] font-medium leading-[1.5] text-[#212121]">Enter code</label>
        <OtpBoxes value={code} onChange={(v) => { setCode(v); setError(false) }} error={error} />
        {error && <FieldError message="Incorrect OTP" />}
        <ResendRow />
        <PrimaryButton onClick={verify}>
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
  const [seconds, setSeconds] = useState(179)
  useEffect(() => {
    if (seconds <= 0) return
    const id = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(id)
  }, [seconds])
  return (
    <p className="text-[14px] leading-[1.5] text-[#212121]">
      Did not receive a code?{' '}
      {seconds > 0 ? (
        <span className="text-[#8d8d8d]">Resend ({seconds}s)</span>
      ) : (
        <LinkButton onClick={() => setSeconds(179)}>Resend</LinkButton>
      )}
    </p>
  )
}

/* ─────── Shared password screen (Set / Reset / Singpass setup) ─── */
const RULES = [
  { label: '8 to 24 characters', test: (v: string) => v.length >= 8 && v.length <= 24 },
  { label: '1 letter', test: (v: string) => /[A-Za-z]/.test(v) },
  { label: '1 number', test: (v: string) => /[0-9]/.test(v) },
]

function PasswordSetup({
  toast,
  title,
  subtitle,
  buttonLabel,
  onBack,
  onSubmit,
}: {
  toast?: string
  title: string
  subtitle: string
  buttonLabel: string
  onBack: () => void
  onSubmit: () => void
}) {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [attempted, setAttempted] = useState(false)

  const allRulesMet = RULES.every((r) => r.test(password))
  const mismatch = confirm !== '' && confirm !== password

  // Confirm-field error: live mismatch, or empty/mismatch surfaced after a submit attempt.
  const confirmError = mismatch
    ? 'Passwords do not match'
    : attempted && confirm === ''
      ? 'Please re-enter your password'
      : undefined

  function submit() {
    if (!allRulesMet || confirm !== password) {
      setAttempted(true)
      return
    }
    onSubmit()
  }

  return (
    <AuthShell onBack={onBack} toast={toast}>
      <AuthHeader title={title} subtitle={subtitle} />
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
          <div className="flex flex-col gap-2">
            <span className="text-[12px] leading-[1.4] text-[#6e6e6e]">Your password must contain at least:</span>
            {RULES.map((rule) => {
              const met = rule.test(password)
              const failed = attempted && !met
              return (
                <div key={rule.label} className="flex items-center gap-2">
                  <span
                    className={`flex items-center justify-center w-[16px] h-[16px] rounded-full border ${
                      met ? 'bg-[#08754f] border-[#08754f]' : failed ? 'border-[#dc2626]' : 'border-[#c9ced6]'
                    }`}
                  >
                    {met && <Check size={11} className="text-white" strokeWidth={3} />}
                  </span>
                  <span className={`text-[12px] leading-[1.4] ${met ? 'text-[#08754f]' : failed ? 'text-[#dc2626]' : 'text-[#6e6e6e]'}`}>
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
          error={confirmError}
        />
        <PrimaryButton onClick={submit}>
          {buttonLabel}
        </PrimaryButton>
      </div>
      <p className="text-[14px] leading-[1.5] text-[#6e6e6e] text-center w-full">
        Having trouble? <LinkButton>Contact our support team</LinkButton>
      </p>
    </AuthShell>
  )
}

/* ───────────────────────── Forgot Password ───────────────────── */
function ForgotPassword({ onBack, onSent }: { onBack: () => void; onSent: () => void }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  // Confirm on this screen, then hand the user back to login (which shows no toast).
  useEffect(() => {
    if (!sent) return
    const t = setTimeout(onSent, 1800)
    return () => clearTimeout(t)
  }, [sent, onSent])

  function send() {
    if (sent) return
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address')
      return
    }
    setError('')
    setSent(true)
  }

  return (
    <AuthShell onBack={onBack} toast={sent ? 'Password reset link sent' : undefined}>
      <AuthHeader
        title="Forgot Password"
        subtitle="Enter your account email and we'll send you a password reset link"
      />
      <div className="flex flex-col gap-4 w-full">
        <Field
          label="Email address"
          value={email}
          onChange={(v) => { setEmail(v); setError('') }}
          placeholder="Enter email address"
          type="email"
          inputMode="email"
          error={error}
        />
        <PrimaryButton onClick={send}>
          Send Reset Link
        </PrimaryButton>
      </div>
      <p className="text-[14px] leading-[1.5] text-[#6e6e6e] text-center w-full">
        Having trouble? <LinkButton>Contact our support team</LinkButton>
      </p>
    </AuthShell>
  )
}
