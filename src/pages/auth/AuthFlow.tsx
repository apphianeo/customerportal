import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import singpassBtn from '../../assets/singpass-btn.png'
import singpassLogin from '../../assets/singpass-login.png'
import singpassLogo from '../../assets/singpass-logo.png'
import { useDebouncedValue } from '../../hooks/useDebouncedValue'
import { useInlineValidation } from '../../hooks/useInlineValidation'
import { accountExists, draftAccount, findAccount, type Account } from '../../data/accounts'
import type { CountryCode } from 'libphonenumber-js'
import {
  MESSAGES,
  PASSWORD_RULES,
  attemptLogin,
  passwordMeetsRules,
  validateEmail,
  validateNric,
  validateOtp,
  validatePasswordContent,
  validatePasswordHistory,
  validatePhone,
} from './validation'
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

/** Signing in with Singpass lands on the Singpass-created demo profile. */
const SINGPASS_DEMO_NRIC = 'S8912345A'

/** Mask an email like ch*****@gmail.com for OTP display. */
function maskEmail(email: string) {
  const [name, domain] = email.split('@')
  if (!domain) return email
  const head = name.slice(0, 2)
  return `${head}${'*'.repeat(Math.max(name.length - 2, 3))}@${domain}`
}

export default function AuthFlow({
  onAuthenticated,
}: {
  /** The account carries its own authMethod — Singpass profiles stay locked. */
  onAuthenticated: (account: Account) => void
}) {
  const [screen, setScreen] = useState<Screen>('landing')
  const [email, setEmail] = useState('')
  /** Carried from Create Account into the password screens for the content/history rules. */
  const [nric, setNric] = useState('')
  /** Registration details, so a new user is greeted by their own name. */
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [phone, setPhone] = useState('')
  const [dob, setDob] = useState('')
  const [loginToast, setLoginToast] = useState<string | null>(null)

  /** The account behind the current NRIC, or a draft built from the sign-up form. */
  function currentAccount(): Account {
    return (
      findAccount(nric) ??
      draftAccount({ nric, firstName: first || 'there', lastName: last, email, phone, dob })
    )
  }

  function goLogin(toast?: string) {
    setLoginToast(toast ?? null)
    setScreen('nric')
  }

  switch (screen) {
    case 'nric':
      return (
        <NricLogin
          nric={nric}
          setNric={setNric}
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
          onVerify={() => onAuthenticated(currentAccount())}
        />
      )
    case 'register':
      return (
        <CreateAccount
          email={email}
          setEmail={setEmail}
          nric={nric}
          setNric={setNric}
          first={first}
          setFirst={setFirst}
          last={last}
          setLast={setLast}
          phone={phone}
          setPhone={setPhone}
          dob={dob}
          setDob={setDob}
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
          nric={nric}
          onBack={() => setScreen('register-otp')}
          onSubmit={() => onAuthenticated(currentAccount())}
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
          nric={nric}
          onBack={() => setScreen('landing')}
          onSubmit={() =>
            onAuthenticated(
              findAccount(SINGPASS_DEMO_NRIC) ?? { ...currentAccount(), authMethod: 'singpass' },
            )
          }
        />
      )
    case 'forgot':
      // Send reset link → straight on to setting the new password.
      return (
        <ForgotPassword
          onBack={() => setScreen('nric')}
          onSent={() => setScreen('reset')}
        />
      )
    case 'reset':
      return (
        <PasswordSetup
          title="Reset Password"
          subtitle="Enter your new password"
          buttonLabel="Reset Password"
          nric={nric}
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
  nric,
  setNric,
  onBack,
  onLogin,
  onForgot,
  onRegister,
}: {
  nric: string
  setNric: (v: string) => void
  toast: string | null
  onBack: () => void
  onLogin: () => void
  onForgot: () => void
  onRegister: () => void
}) {
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  /** Errors raised by submitting — cleared as soon as the field is edited. */
  const [nricSubmitError, setNricSubmitError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  // Quiet until the user pauses on a full-length NRIC, or leaves the field
  const nricInline = useInlineValidation({
    value: nric,
    validate: validateNric,
    requiredMessage: MESSAGES.nricInvalid,
  })
  const nricError = nricSubmitError || nricInline.error

  function submit() {
    nricInline.show()
    if (!nricInline.isValid) return
    const result = attemptLogin(nric, password)
    if (!result.ok) {
      if (result.field === 'nric') setNricSubmitError(result.message)
      else setPasswordError(result.message)
      return
    }
    setNricSubmitError('')
    setPasswordError('')
    onLogin()
  }

  return (
    <AuthShell onBack={onBack} toast={toast ?? undefined}>
      <AuthHeader title="Customer Portal" subtitle={SUBTITLE} />
      <div className="flex flex-col gap-4 w-full">
        <Field
          label="NRIC/FIN"
          value={nric}
          onChange={(v) => { setNric(v); setNricSubmitError(''); nricInline.reset() }}
          onBlur={nricInline.onBlur}
          placeholder="Enter NRIC/FIN"
          error={nricError}
        />
        <PasswordField
          label="Password"
          value={password}
          onChange={(v) => { setPassword(v); setPasswordError('') }}
          show={show}
          onToggle={() => setShow((s) => !s)}
          placeholder="Enter password"
          error={passwordError}
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
  nric,
  setNric,
  first,
  setFirst,
  last,
  setLast,
  phone,
  setPhone,
  dob,
  setDob,
  onBack,
  onRequestOtp,
  onLogin,
}: {
  email: string
  setEmail: (v: string) => void
  nric: string
  setNric: (v: string) => void
  first: string
  setFirst: (v: string) => void
  last: string
  setLast: (v: string) => void
  phone: string
  setPhone: (v: string) => void
  dob: string
  setDob: (v: string) => void
  onBack: () => void
  onRequestOtp: () => void
  onLogin: () => void
}) {
  const [country, setCountry] = useState<CountryCode>('SG')
  const [nricSubmitError, setNricSubmitError] = useState('')

  // Each field stays quiet until the user pauses on a finished-looking value,
  // or leaves the field. Submitting forces every error into view.
  const nricInline = useInlineValidation({
    value: nric,
    validate: validateNric,
    requiredMessage: MESSAGES.nricInvalid,
  })
  const emailInline = useInlineValidation({
    value: email,
    validate: validateEmail,
    requiredMessage: MESSAGES.emailInvalid,
  })
  const phoneInline = useInlineValidation({
    value: phone,
    validate: v => validatePhone(v, country),
    requiredMessage: MESSAGES.phoneInvalid,
  })

  const nricError = nricSubmitError || nricInline.error

  function submit() {
    nricInline.show()
    emailInline.show()
    phoneInline.show()

    if (!nricInline.isValid) return
    // Registering an NRIC that already has an account
    if (accountExists(nric)) {
      setNricSubmitError(MESSAGES.accountExists)
      return
    }
    if (!emailInline.isValid || !phoneInline.isValid) return
    setNricSubmitError('')
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
          onChange={(v) => { setNric(v); setNricSubmitError(''); nricInline.reset() }}
          onBlur={nricInline.onBlur}
          placeholder="Enter NRIC/FIN"
          error={nricError}
        />
        <Field
          label="Email address"
          value={email}
          onChange={(v) => { setEmail(v); emailInline.reset() }}
          onBlur={emailInline.onBlur}
          placeholder="Enter email address"
          type="email"
          inputMode="email"
          error={emailInline.error}
        />
        <PhoneField
          label="Phone number"
          value={phone}
          onChange={(v) => { setPhone(v); phoneInline.reset() }}
          onBlur={phoneInline.onBlur}
          country={country}
          onCountryChange={setCountry}
          error={phoneInline.error}
        />
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
  const [error, setError] = useState('')

  function verify() {
    // Mock: an incomplete code or the all-nines placeholder fails verification.
    const otpError = validateOtp(code)
    if (otpError) {
      setError(otpError)
      return
    }
    setError('')
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
        <OtpBoxes value={code} onChange={(v) => { setCode(v); setError('') }} error={Boolean(error)} />
        {error && <FieldError message={error} />}
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


function PasswordSetup({
  toast,
  title,
  subtitle,
  buttonLabel,
  nric,
  onBack,
  onSubmit,
}: {
  toast?: string
  title: string
  subtitle: string
  buttonLabel: string
  /** Drives the "cannot contain NRIC" and password-history checks. */
  nric?: string
  onBack: () => void
  onSubmit: () => void
}) {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [attempted, setAttempted] = useState(false)
  const [passwordError, setPasswordError] = useState('')

  // Checkmarks tick as the user types, once typing settles
  const debouncedPassword = useDebouncedValue(password)

  const allRulesMet = passwordMeetsRules(password)
  // Only flag a mismatch once the confirm entry is at least as long as the
  // password — otherwise every prefix reads as "does not match".
  const confirmInline = useInlineValidation({
    value: confirm,
    validate: v => (v !== debouncedPassword ? MESSAGES.passwordMismatch : undefined),
    // Silent only while the entry could still turn into the password. The moment
    // it diverges it can never match, so flag it as soon as typing settles.
    isComplete: v => Boolean(debouncedPassword) && !debouncedPassword.startsWith(v),
  })
  const mismatch = Boolean(confirmInline.error)

  // Confirm-field error: live mismatch, or empty/mismatch surfaced after a submit attempt.
  const confirmError = mismatch
    ? MESSAGES.passwordMismatch
    : attempted && confirm === ''
      ? 'Please re-enter your password'
      : undefined

  function submit() {
    if (!allRulesMet || confirm !== password) {
      setAttempted(true)
      confirmInline.show()
      return
    }
    // Content policy — no NRIC/FIN, no "pass"/"pwd"
    const contentError = validatePasswordContent(password, nric)
    if (contentError) {
      setPasswordError(contentError)
      return
    }
    // Reuse policy — checked against the last 5 passwords on file
    const historyError = validatePasswordHistory(password, nric)
    if (historyError) {
      setPasswordError(historyError)
      return
    }
    setPasswordError('')
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
            onChange={(v) => { setPassword(v); setPasswordError('') }}
            show={showPw}
            onToggle={() => setShowPw((s) => !s)}
            placeholder="Enter password"
            error={passwordError}
          />
          <div className="flex flex-col gap-2">
            <span className="text-[12px] leading-[1.4] text-[#6e6e6e]">Your password must contain at least:</span>
            {PASSWORD_RULES.map((rule) => {
              const met = rule.test(debouncedPassword)
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
          onChange={(v) => { setConfirm(v); confirmInline.reset() }}
          onBlur={confirmInline.onBlur}
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
  const emailInline = useInlineValidation({
    value: email,
    validate: validateEmail,
    requiredMessage: MESSAGES.emailInvalid,
  })
  const emailError = error || emailInline.error

  // Confirm on this screen, then hand the user back to login (which shows no toast).
  useEffect(() => {
    if (!sent) return
    const t = setTimeout(onSent, 1800)
    return () => clearTimeout(t)
  }, [sent, onSent])

  function send() {
    if (sent) return
    emailInline.show()
    if (!emailInline.isValid) return
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
          onChange={(v) => { setEmail(v); setError(''); emailInline.reset() }}
          onBlur={emailInline.onBlur}
          placeholder="Enter email address"
          type="email"
          inputMode="email"
          error={emailError}
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
