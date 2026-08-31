import { useEffect, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import singpassLoginBtn from '../../assets/singpass-login-btn.svg'
import singpassRetrieveBtn from '../../assets/singpass-retrieve-btn.svg'
import singpassVerifyBtn from '../../assets/singpass-verify-btn.svg'
import closeIcon from '../../assets/icons/close.svg'
import singpassLogo from '../../assets/singpass-logo.png'
import uoiLogo from '../../assets/uoi-logo.svg'
import { useDebouncedValue } from '../../hooks/useDebouncedValue'
import { useInlineValidation } from '../../hooks/useInlineValidation'
import { useIsTouch } from '../../hooks/useIsTouch'
import { usePostalAutofill } from '../../hooks/usePostalAutofill'
import {
  SINGPASS_IDENTITY,
  accountExists,
  draftAccount,
  findAccount,
  findAccountByNric,
  registerAccount,
  type Account,
} from '../../data/accounts'
import type { CountryCode } from 'libphonenumber-js'
import {
  MESSAGES,
  PASSWORD_RULES,
  attemptLogin,
  maskEmail,
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
  LegalLine,
  SupportLine,
  ConsentCheckbox,
  MockNumericKeypad,
} from './AuthUI'

const MARKETING_CONSENT_LABEL = 'I consent to receiving marketing communications'

const NRIC_TOOLTIP =
  'NRIC/FIN is collected to securely match and display your existing or future UOI insurance policies'

/**
 * Fields with no format rule of their own still have to be filled in.
 *
 * Deliberately not wired to onBlur: an error appearing under an empty field on
 * blur reflows everything below it, and on touch that lands the tap the user
 * was already making on the wrong control. The check runs on submit instead.
 */
const NO_FORMAT_RULE = () => undefined

function useRequired(value: string) {
  return useInlineValidation({
    value,
    validate: NO_FORMAT_RULE,
    requiredMessage: MESSAGES.required,
  })
}

type Screen =
  | 'landing'
  | 'login-otp'
  /** Create Account: choose Retrieve-with-Singpass or Sign-up-manually. */
  | 'register-choose'
  /** The details form — pre-filled from Myinfo, or typed manually. */
  | 'register-details'
  | 'singpass-login-qr'
  | 'singpass-register-qr'
  | 'singpass-approve'
  /** Both paths end here: set the login email + password, then verify by OTP. */
  | 'register-credentials'
  | 'register-otp'
  /** Manual sign-ups verify their identity with Singpass before the account is
      created — a full screen shown between the email OTP and the dashboard. */
  | 'register-verify'
  | 'register-verify-qr'
  | 'forgot'
  | 'reset'

const SUBTITLE = 'Access your insurance policies in one place'

export default function AuthFlow({
  onAuthenticated,
}: {
  /** The account carries its own authMethod — Singpass profiles stay locked. */
  onAuthenticated: (account: Account) => void
}) {
  const [screen, setScreen] = useState<Screen>('landing')
  /** Email is the credential, so it is the one value that spans every screen. */
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  /** Captured up front, then verified by Singpass. */
  const [nric, setNric] = useState('')
  const [dob, setDob] = useState('')
  /** One field on the form; split into first/last only when building the account. */
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [postal, setPostal] = useState('')
  const [line, setLine] = useState('')
  const [unit, setUnit] = useState('')
  const [mailingSame, setMailingSame] = useState(true)
  const [mailPostal, setMailPostal] = useState('')
  const [mailLine, setMailLine] = useState('')
  const [mailUnit, setMailUnit] = useState('')
  const [loginToast, setLoginToast] = useState<string | null>(null)
  /** True when the current registration came in through Singpass (→ verified). */
  const [singpassReg, setSingpassReg] = useState(false)
  /**
   * A sign-in that matched no account. Which identifier was tried drives the
   * dialog's title; both offer the same next step — create an account.
   */
  const [noAccount, setNoAccount] = useState<null | 'singpass' | 'loginId'>(null)

  function goLogin(toast?: string) {
    setLoginToast(toast ?? null)
    setScreen('landing')
  }

  /** Existing account, or the profile Singpass just handed us. */
  function currentAccount(): Account {
    return (
      findAccount(email) ??
      draftAccount({
        email,
        password,
        passwordHistory: password ? [password] : [],
        // Registering manually: only what the user typed. Singpass verifies who
        // they are, but the profile is theirs to fill in and edit later.
        authMethod: 'account',
        fullName: fullName.trim() || 'there',
        nric,
        dob,
        phone,
        residentialPostal: postal,
        residentialAddress: line,
        residentialUnit: unit,
        mailingSameAsResidential: mailingSame,
        mailingPostal: mailingSame ? '' : mailPostal,
        mailingAddress: mailingSame ? '' : mailLine,
        mailingUnit: mailingSame ? '' : mailUnit,
      })
    )
  }

  /** Sign-up complete — keep the account so the user can sign in again. */
  function finishRegistration(overrides: Partial<Account> = {}) {
    onAuthenticated(registerAccount({ ...currentAccount(), ...overrides }))
  }

  /** Singpass login — authenticate an existing account only. Never creates
      credentials: an identity with no account returns to the landing with the
      "no account linked" dialog, which directs the user to register. */
  function onSingpassLogin() {
    const existing = findAccountByNric(SINGPASS_IDENTITY.nric)
    if (existing) {
      onAuthenticated(existing)
    } else {
      setScreen('landing')
      setNoAccount('singpass')
    }
  }

  /** Singpass registration — Myinfo auto-populates the profile onto the Create
      Account form; the user reviews it, then sets their own login ID + password
      and verifies by email OTP. This registration is Singpass-verified. */
  function onSingpassRegistered() {
    setNric(SINGPASS_IDENTITY.nric)
    setDob(SINGPASS_IDENTITY.dob)
    setFullName(SINGPASS_IDENTITY.fullName)
    setPhone(SINGPASS_IDENTITY.phone)
    setPostal(SINGPASS_IDENTITY.residentialPostal)
    setLine(SINGPASS_IDENTITY.residentialAddress)
    setUnit(SINGPASS_IDENTITY.residentialUnit)
    setEmail('') // the user picks their own login ID later
    setSingpassReg(true)
    setScreen('register-details')
  }

  /** Login scans and signs straight in (no consent screen); registration goes
      through the Myinfo data-consent screen first. */
  function startSingpassLogin() {
    setSingpassReg(false)
    setScreen('singpass-login-qr')
  }
  function startSingpassRegister() {
    setScreen('singpass-register-qr')
  }

  return (
    <>
      {renderScreen()}
      {noAccount && (
        <NoAccountModal
          variant={noAccount}
          onClose={() => setNoAccount(null)}
          onRetrieveSingpass={() => { setNoAccount(null); startSingpassRegister() }}
          onSignupManually={() => { setNoAccount(null); setSingpassReg(false); setScreen('register-details') }}
          onLogin={() => setNoAccount(null)}
        />
      )}
    </>
  )

  function renderScreen() {
  switch (screen) {
    case 'login-otp':
      return (
        <OtpVerification
          email={email}
          onBack={() => setScreen('landing')}
          onVerify={() => onAuthenticated(currentAccount())}
        />
      )
    case 'register-choose':
      return (
        <RegisterChoose
          onRetrieve={startSingpassRegister}
          onManual={() => { setSingpassReg(false); setScreen('register-details') }}
          onBack={() => setScreen('landing')}
          onLogin={() => setScreen('landing')}
        />
      )
    case 'register-details':
      return (
        <RegisterDetails
          singpass={singpassReg}
          fullName={fullName}
          setFullName={setFullName}
          nric={nric}
          setNric={setNric}
          dob={dob}
          setDob={setDob}
          phone={phone}
          setPhone={setPhone}
          postal={postal}
          setPostal={setPostal}
          line={line}
          setLine={setLine}
          unit={unit}
          setUnit={setUnit}
          mailingSame={mailingSame}
          setMailingSame={setMailingSame}
          mailPostal={mailPostal}
          setMailPostal={setMailPostal}
          mailLine={mailLine}
          setMailLine={setMailLine}
          mailUnit={mailUnit}
          setMailUnit={setMailUnit}
          onBack={() => setScreen('register-choose')}
          onNext={() => setScreen('register-credentials')}
          onLogin={() => setScreen('landing')}
        />
      )
    case 'singpass-login-qr':
      // Login authenticates straight away — no Myinfo consent screen.
      return <SingpassLogin onScan={onSingpassLogin} />
    case 'singpass-register-qr':
      return <SingpassLogin onScan={() => setScreen('singpass-approve')} />
    case 'singpass-approve':
      return (
        <SingpassApprove
          onCancel={() => setScreen('landing')}
          onAgree={onSingpassRegistered}
        />
      )
    case 'register-credentials':
      return (
        <RegisterCredentials
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          onBack={() => setScreen('register-details')}
          onNext={() => setScreen('register-otp')}
          onLogin={() => setScreen('landing')}
        />
      )
    case 'register-otp':
      return (
        <OtpVerification
          email={email}
          onBack={() => setScreen('register-credentials')}
          onVerify={() =>
            singpassReg
              ? // Registered through Singpass — identity is already verified, so
                // the account is created straight away.
                finishRegistration({
                  authMethod: 'singpass',
                  verified: true,
                  salutation: SINGPASS_IDENTITY.salutation,
                })
              : // Manual sign-up — must verify identity with Singpass first. The
                // account is not created until that step completes.
                setScreen('register-verify')
          }
        />
      )
    case 'register-verify':
      return (
        <VerifyIdentity
          onBack={() => setScreen('register-credentials')}
          onContinue={() => setScreen('register-verify-qr')}
        />
      )
    case 'register-verify-qr':
      // The identity check itself — Singpass's own QR page. Scanning verifies the
      // person, and only then is the account actually created.
      return (
        <SingpassLogin
          onScan={() =>
            finishRegistration({
              verified: true,
              // Singpass returns the verified NRIC/FIN — adopt it so the new
              // account matches any policies the holder has.
              nric: SINGPASS_IDENTITY.nric,
            })
          }
        />
      )
    case 'forgot':
      // Send reset link → straight on to setting the new password.
      return (
        <ForgotPassword
          email={email}
          setEmail={setEmail}
          onBack={() => setScreen('landing')}
          onSent={() => setScreen('reset')}
        />
      )
    case 'reset':
      return (
        <PasswordSetup
          title="Reset Password"
          subtitle="Enter your new password"
          buttonLabel="Reset Password"
          email={email}
          onBack={() => setScreen('landing')}
          onSubmit={() => goLogin('Password updated, login again')}
        />
      )
    default:
      return (
        <LoginLanding
          email={email}
          setEmail={setEmail}
          toast={loginToast}
          onSingpass={startSingpassLogin}
          onLogin={() => setScreen('login-otp')}
          onForgot={() => setScreen('forgot')}
          onRegister={() => setScreen('register-choose')}
          onNoAccount={() => setNoAccount('loginId')}
        />
      )
  }
  }
}

/* ─────────────────────────── Landing ─────────────────────────── */
/* One screen: Singpass, or the email + password login form inline — matching
   the design's login landing (no intermediate "choose a method" step). */
function LoginLanding({
  email,
  setEmail,
  toast,
  onSingpass,
  onLogin,
  onForgot,
  onRegister,
  onNoAccount,
}: {
  email: string
  setEmail: (v: string) => void
  toast: string | null
  onSingpass: () => void
  onLogin: () => void
  onForgot: () => void
  onRegister: () => void
  /** No account matched the login ID — hand off to the "no account" dialog. */
  onNoAccount: () => void
}) {
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  /** Errors raised by submitting — cleared as soon as the field is edited. */
  const [emailSubmitError, setEmailSubmitError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const emailInline = useInlineValidation({
    value: email,
    validate: validateEmail,
    requiredMessage: MESSAGES.required,
  })
  const emailError = emailSubmitError || emailInline.error

  const passwordRequired = useRequired(password)
  const passwordFieldError = passwordError || passwordRequired.error

  function submit() {
    emailInline.show()
    passwordRequired.show()
    if (!emailInline.isValid || !passwordRequired.isValid) return
    const result = attemptLogin(email, password)
    if (!result.ok) {
      // A missing account is the "no account linked" case — direct the user to
      // register via the dialog rather than an inline field error. A wrong
      // password stays inline.
      if (result.field === 'email') {
        setEmailSubmitError('')
        onNoAccount()
      } else {
        setPasswordError(result.message)
      }
      return
    }
    setEmailSubmitError('')
    setPasswordError('')
    onLogin()
  }

  return (
    <AuthShell toast={toast ?? undefined}>
      <AuthHeader title="Customer Portal" subtitle={SUBTITLE} />
      <div className="flex flex-col gap-6 w-full">
        {/* Full-width button in the official Singpass red (#D93841); the official
            "Log in with singpass" lockup stays its natural size and is centred,
            so the red just extends evenly on both sides. */}
        <button
          onClick={onSingpass}
          aria-label="Log in with Singpass"
          className="w-full h-[52px] bg-[#d93841] rounded-[8px] border-0 p-0 cursor-pointer flex items-center justify-center overflow-hidden"
        >
          <img src={singpassLoginBtn} alt="" className="h-[40px] w-auto" />
        </button>
        <div className="flex items-center gap-4 w-full">
          <span className="flex-1 h-px bg-[rgba(0,0,0,0.09)]" />
          <span className="text-[14px] text-[#949494]">OR</span>
          <span className="flex-1 h-px bg-[rgba(0,0,0,0.09)]" />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <Field
            label="Login ID (email address)"
            value={email}
            onChange={(v) => { setEmail(v); setEmailSubmitError(''); emailInline.reset() }}
            onBlur={emailInline.onBlur}
            placeholder="Enter login ID"
            type="email"
            inputMode="email"
            error={emailError}
          />
          <PasswordField
            label="Password"
            value={password}
            onChange={(v) => { setPassword(v); setPasswordError(''); passwordRequired.reset() }}
            show={show}
            onToggle={() => setShow((s) => !s)}
            placeholder="Enter password"
            error={passwordFieldError}
          />
          <div className="self-start text-[14px]">
            <LinkButton onClick={onForgot}>Forgot password?</LinkButton>
          </div>
          <PrimaryButton onClick={submit}>
            Login
          </PrimaryButton>
        </div>
      </div>
      {/* Legal line always leads; the secondary action follows */}
      <div className="flex flex-col gap-3 w-full">
        <LegalLine />
        <p className="text-[14px] leading-[1.5] text-[#6e6e6e] text-center w-full m-0">
          New user? <LinkButton onClick={onRegister}>Register here</LinkButton>
        </p>
      </div>
    </AuthShell>
  )
}

/* ────────────── Singpass login (QR) — Singpass's own page ───────
   A screenshot of Singpass's page with the two sign-in options made
   clickable, since we cannot host their app. */
/* ── Decorative QR ──
   The real page shows a live session token, and here "scanning" is a click,
   so this only has to read as a QR. Drawn as SVG so it stays sharp at any
   size — the screenshot it replaces went soft on any HiDPI display. */
const QR_MODULES = 25

const QR_CELLS = (() => {
  let seed = 20260701
  const rand = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648
  return Array.from({ length: QR_MODULES }, () =>
    Array.from({ length: QR_MODULES }, () => rand() > 0.47),
  )
})()

function QrCode() {
  const n = QR_MODULES
  // Corner finders are drawn separately, and the badge sits over the middle
  const isFinder = (x: number, y: number) =>
    (x < 8 && y < 8) || (x >= n - 8 && y < 8) || (x < 8 && y >= n - 8)
  const isBadge = (x: number, y: number) => x >= 9 && x <= 15 && y >= 9 && y <= 15

  return (
    <svg viewBox={`0 0 ${n} ${n}`} className="block w-full h-full" role="img" aria-label="Singpass QR code">
      <rect width={n} height={n} fill="#ffffff" />
      {QR_CELLS.map((row, y) =>
        row.map((on, x) =>
          on && !isFinder(x, y) && !isBadge(x, y) ? (
            <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#111111" />
          ) : null,
        ),
      )}
      {[[0, 0], [n - 7, 0], [0, n - 7]].map(([fx, fy]) => (
        <g key={`${fx}-${fy}`}>
          <rect x={fx} y={fy} width="7" height="7" fill="#111111" />
          <rect x={fx + 1} y={fy + 1} width="5" height="5" fill="#ffffff" />
          <rect x={fx + 2} y={fy + 2} width="3" height="3" fill="#111111" />
        </g>
      ))}
    </svg>
  )
}

/* ── Singpass log-in page ──
   Singpass's own page, rebuilt in markup rather than shown as a screenshot so
   it renders crisply at every window size. Their styling, not ours. */
export function SingpassLogin({ onScan }: { onScan: () => void }) {
  const footerLinks = ['Contact us', 'FAQs', 'Terms of use', 'Privacy statement', 'Report vulnerability']

  return (
    <div className="min-h-screen w-full bg-[#f0eeec] flex flex-col font-sans">
      {/* Government identity banner */}
      <div className="bg-[#ebe9e7] px-[24px] py-[4px] flex items-center gap-[8px] text-[12px] text-[#333333]">
        <span aria-hidden="true" className="text-[#d0021b]">◤</span>
        <span>A Singapore Government Agency Website</span>
        <button type="button" className="flex items-center gap-[3px] text-[#0f70cf] bg-transparent border-0 p-0 cursor-pointer">
          How to identify <ChevronDown size={12} aria-hidden="true" />
        </button>
      </div>

      <header className="px-[56px] py-[24px]">
        <img src={singpassLogo} alt="Singpass" className="h-[22px] w-auto" />
      </header>

      <main className="flex-1 flex flex-col items-center px-4 pt-[80px]">
        <div className="w-[620px] max-w-full">
          <div className="bg-white rounded-[8px] p-[28px] flex flex-col sm:flex-row gap-[40px] sm:gap-[68px]">
            {/* Who you are logging in to */}
            <div className="flex-1 min-w-0">
              <div className="size-[40px] rounded-[8px] border border-[rgba(0,0,0,0.08)] bg-white flex items-center justify-center">
                <img src={uoiLogo} alt="" className="h-[16px] w-auto" />
              </div>
              <p className="mt-[26px] text-[13px] leading-[1.5] text-[#6e6e6e] m-0">You are logging in to</p>
              <p className="mt-[6px] text-[20px] font-semibold leading-[1.3] text-[#212121] m-0">
                UOI Insurance Customer Portal
              </p>
            </div>

            {/* Choose a login method */}
            <div className="w-full sm:w-[242px] shrink-0 flex flex-col items-center">
              <p className="text-[13px] leading-[1.5] text-[#6e6e6e] m-0">Choose a login method</p>
              <button
                type="button"
                onClick={onScan}
                aria-label="Scan QR code with Singpass app"
                className="mt-[16px] w-[152px] rounded-[8px] border-2 border-[#d0021b] bg-white p-[10px] cursor-pointer flex flex-col items-center gap-[6px]"
              >
                <span className="relative block size-[112px]">
                  <QrCode />
                  {/* Singpass badge, as on the real code */}
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[30px] rounded-[7px] bg-[#d0021b] flex items-center justify-center text-white text-[17px] font-semibold leading-none">
                    i
                  </span>
                </span>
                <img src={singpassLogo} alt="" className="h-[11px] w-auto" />
              </button>
              <button
                type="button"
                onClick={onScan}
                className="mt-[22px] w-full rounded-[4px] bg-[#f5f5f5] px-[16px] py-[12px] border-0 cursor-pointer flex items-center justify-center gap-[10px] text-[15px] font-semibold text-[#212121]"
              >
                <span aria-hidden="true" className="text-[#d0021b] tracking-[1px] leading-none">•••</span>
                Use password
              </button>
            </div>
          </div>

          <div className="mt-[16px] flex justify-end gap-[24px] text-[12px] text-[#6e6e6e]">
            <span>Register for Singpass</span>
            <span>Download Singpass app</span>
          </div>
        </div>
      </main>

      <footer className="px-[24px] py-[16px] flex flex-wrap items-end justify-between gap-[16px] text-[13px] text-[#333333]">
        <div className="flex flex-wrap gap-[20px]">
          {footerLinks.map(link => <span key={link}>{link}</span>)}
        </div>
        <div className="flex items-end gap-[24px]">
          <span className="text-[13px] text-[#333333]">Last updated 1 July 2026</span>
          <span className="text-[8px] leading-[1.3] tracking-[0.5px] text-[#6e6e6e] uppercase">
            Powered by<br /><strong className="text-[11px] text-[#333333]">GovTech Singapore</strong>
          </span>
          <span className="text-[8px] leading-[1.3] tracking-[0.5px] text-[#6e6e6e] uppercase">
            In support of<br /><strong className="text-[11px] text-[#333333]">Smart Nation Singapore</strong>
          </span>
        </div>
      </footer>
    </div>
  )
}

/* ────────────── Singpass authorisation / consent screen ─────────
   Singpass's own page, so it follows their styling rather than ours. */
const SINGPASS_FIELDS = [
  'Name',
  'NRIC/FIN',
  'Email Address',
  'Mobile Number',
  'Date of Birth',
  'Registered Address',
]

export function SingpassApprove({ onCancel, onAgree }: { onCancel: () => void; onAgree: () => void }) {
  return (
    <div className="min-h-screen w-full bg-[#f7f7f7] flex items-center justify-center p-6">
      <div className="w-[636px] max-w-full flex flex-col gap-[26px] items-center">
        <div className="w-full border border-[rgba(0,0,0,0.09)] rounded-[10px] overflow-hidden">
          <div className="bg-[#e6e5e8] border-t-[4px] border-[#ed1a3b] flex flex-col gap-[29px] items-center p-[26px]">
            <img src={singpassLogo} alt="Singpass" className="h-[32px] w-auto" />
            <div className="w-full text-[14.5px] leading-normal text-[#6e6e6e] flex flex-col gap-4">
              <p className="m-0">
                Singpass retrieves personal data from relevant government agencies to pre-fill the
                relevant fields, making digital transactions faster and more convenient.
              </p>
              <p className="m-0 font-bold text-[#212121]">
                UOI Customer Portal by United Overseas Insurance is requesting your information from
                Singpass to register for an account.
              </p>
            </div>
          </div>
          <div className="bg-white p-[26px] text-[14.5px] text-[#212121]">
            {SINGPASS_FIELDS.map((field) => (
              <p key={field} className="leading-[2] m-0">
                <span className="text-[#949494]">{'> '}</span>
                {field}
              </p>
            ))}
          </div>
        </div>
        <p className="text-[13px] leading-normal text-[#6e6e6e] text-center m-0">
          Clicking the “I Agree” button permits the digital service to retrieve your data based on the{' '}
          <span className="text-[#005eb8]">Terms of Use.</span>
        </p>
        <div className="flex gap-[26px]">
          <button
            onClick={onCancel}
            className="h-[39px] px-[26px] rounded-[8px] bg-white border border-[rgba(0,0,0,0.09)] text-[13px] font-medium text-[#6e6e6e] cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onAgree}
            className="h-[39px] px-[26px] rounded-[8px] bg-[#d93841] text-[13px] font-medium text-white border-0 cursor-pointer"
          >
            I Agree
          </button>
        </div>
      </div>
    </div>
  )
}

/* ────────────── Create Account — choose a registration method ─────
   Retrieve the profile from Myinfo via Singpass (verified), or sign up by
   filling the form manually (unverified until they later verify). */
function RegisterChoose({
  onRetrieve,
  onManual,
  onBack,
  onLogin,
}: {
  onRetrieve: () => void
  onManual: () => void
  onBack: () => void
  onLogin: () => void
}) {
  return (
    <AuthShell onBack={onBack}>
      <AuthHeader
        title="Create Account"
        subtitle="Speed up your registration process by retrieving data from Myinfo using Singpass"
      />
      <div className="flex flex-col gap-6 w-full">
        <button
          onClick={onRetrieve}
          aria-label="Retrieve with Singpass"
          className="w-full h-[52px] bg-[#d93841] rounded-[8px] border-0 p-0 cursor-pointer flex items-center justify-center overflow-hidden"
        >
          <img src={singpassRetrieveBtn} alt="" className="h-[40px] w-auto" />
        </button>
        <div className="flex items-center gap-4 w-full">
          <span className="flex-1 h-px bg-[rgba(0,0,0,0.09)]" />
          <span className="text-[14px] text-[#949494]">OR</span>
          <span className="flex-1 h-px bg-[rgba(0,0,0,0.09)]" />
        </div>
        <OutlineButton onClick={onManual}>Register Manually</OutlineButton>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <LegalLine />
        <p className="text-[14px] leading-[1.5] text-[#6e6e6e] text-center w-full m-0">
          Already have an account? <LinkButton onClick={onLogin}>Log in</LinkButton>
        </p>
      </div>
    </AuthShell>
  )
}

/* ────────────── Create Account — identifiers, then Singpass ──────
   NRIC/FIN and date of birth are captured first, then Singpass verifies
   the person behind them and supplies the rest of the profile. */
function RegisterDetails({
  singpass,
  fullName,
  setFullName,
  nric,
  setNric,
  dob,
  setDob,
  phone,
  setPhone,
  postal,
  setPostal,
  line,
  setLine,
  unit,
  setUnit,
  mailingSame,
  setMailingSame,
  mailPostal,
  setMailPostal,
  mailLine,
  setMailLine,
  mailUnit,
  setMailUnit,
  onBack,
  onNext,
  onLogin,
}: {
  /** True when the form was auto-filled from Myinfo (a verified Singpass sign-up). */
  singpass: boolean
  fullName: string
  setFullName: (v: string) => void
  nric: string
  setNric: (v: string) => void
  dob: string
  setDob: (v: string) => void
  phone: string
  setPhone: (v: string) => void
  postal: string
  setPostal: (v: string) => void
  line: string
  setLine: (v: string) => void
  unit: string
  setUnit: (v: string) => void
  mailingSame: boolean
  setMailingSame: (v: boolean) => void
  mailPostal: string
  setMailPostal: (v: string) => void
  mailLine: string
  setMailLine: (v: string) => void
  mailUnit: string
  setMailUnit: (v: string) => void
  onBack: () => void
  onNext: () => void
  onLogin: () => void
}) {
  const [country, setCountry] = useState<CountryCode>('SG')
  /** Set on submit when the NRIC/FIN already belongs to an account. */
  const [nricTaken, setNricTaken] = useState(false)

  // A six-digit postal code identifies a building, so the street fills itself
  usePostalAutofill({ postal, address: line, setAddress: setLine })
  usePostalAutofill({ postal: mailPostal, address: mailLine, setAddress: setMailLine })

  const nricInline = useInlineValidation({
    value: nric,
    validate: validateNric,
    requiredMessage: MESSAGES.required,
  })
  const phoneInline = useInlineValidation({
    value: phone,
    validate: v => validatePhone(v, country),
    requiredMessage: MESSAGES.required,
  })

  // Unit number is optional — every other field on the form has to be filled.
  const nameRequired = useRequired(fullName)
  const dobRequired = useRequired(dob)
  const postalRequired = useRequired(postal)
  const lineRequired = useRequired(line)
  const mailPostalRequired = useRequired(mailPostal)
  const mailLineRequired = useRequired(mailLine)

  function submit() {
    const checks = [
      nameRequired,
      dobRequired,
      nricInline,
      phoneInline,
      postalRequired,
      lineRequired,
      // The mailing block only exists while the addresses differ.
      ...(mailingSame ? [] : [mailPostalRequired, mailLineRequired]),
    ]
    checks.forEach(c => c.show())
    if (checks.some(c => !c.isValid)) return
    // Manual sign-up: the NRIC/FIN is valid but may already belong to an account.
    // Skipped for a Singpass retrieval — the identity is verified and expected.
    if (!singpass && findAccountByNric(nric)) {
      setNricTaken(true)
      return
    }
    onNext()
  }

  return (
    <AuthShell onBack={onBack}>
      <AuthHeader title="Create Account" subtitle="Enter your details to get started" />
      <div className="flex flex-col gap-8 w-full">
        {/* Personal details */}
        <div className="flex flex-col gap-6 w-full">
          <Field
            label="Full name"
            value={fullName}
            onChange={(v) => { setFullName(v.toUpperCase()); nameRequired.reset() }}
            placeholder="Enter full name"
            autoCapitalize="characters"
            disabled={singpass}
            error={nameRequired.error}
          />
          {/* No onBlur — opening the calendar blurs the input, which would
              flash "required" underneath the picker the user just opened. */}
          <DateField
            label="Date of birth"
            value={dob}
            onChange={(v) => { setDob(v); dobRequired.reset() }}
            error={dobRequired.error}
            disabled={singpass}
          />
          <Field
            label="NRIC/FIN"
            value={nric}
            onChange={(v) => { setNric(v.toUpperCase()); nricInline.reset(); setNricTaken(false) }}
            onBlur={nricInline.onBlur}
            placeholder="Enter NRIC/FIN"
            autoCapitalize="characters"
            disabled={singpass}
            error={nricTaken ? (
              <span>
                NRIC/FIN already registered, please{' '}
                <button
                  type="button"
                  onMouseDown={e => e.preventDefault()}
                  onClick={onLogin}
                  className="underline text-[#dc2626] bg-transparent border-0 p-0 cursor-pointer"
                >
                  login
                </button>
              </span>
            ) : nricInline.error}
            labelTooltip={NRIC_TOOLTIP}
          />
          <PhoneField
            label="Mobile number"
            value={phone}
            onChange={(v) => { setPhone(v); phoneInline.reset() }}
            onBlur={phoneInline.onBlur}
            country={country}
            onCountryChange={setCountry}
            error={phoneInline.error}
            placeholder="Enter Mobile number"
          />
        </div>

        {/* Residential address */}
        <div className="flex flex-col gap-6 w-full">
          <h2 className="text-[14px] font-semibold leading-[1.5] text-[#212121] m-0">
            Residential address
          </h2>
          <Field
            label="Postal code"
            value={postal}
            onChange={(v) => { setPostal(v); postalRequired.reset() }}
            placeholder="Enter postal code"
            inputMode="numeric"
            autoCapitalize="characters"
            maxLength={6}
            disabled={singpass}
            error={postalRequired.error}
          />
          <Field
            label="Address"
            value={line}
            onChange={(v) => { setLine(v.toUpperCase()); lineRequired.reset() }}
            placeholder="Enter address"
            autoCapitalize="characters"
            disabled={singpass}
            error={lineRequired.error}
          />
          {/* Optional — a landed address has no unit */}
          <Field
            label="Unit number"
            value={unit}
            onChange={(v) => setUnit(v.toUpperCase())}
            placeholder="Enter unit number"
            inputMode="numeric"
            autoCapitalize="characters"
            disabled={singpass}
          />
          <ConsentCheckbox
            checked={mailingSame}
            onChange={setMailingSame}
            label="Mailing address same as residential"
            disabled={singpass}
          />
        </div>

        {/* Unticking reveals where post should go instead */}
        {!mailingSame && (
          <div className="flex flex-col gap-6 w-full">
            <h2 className="text-[14px] font-semibold leading-[1.5] text-[#212121] m-0">
              Mailing address
            </h2>
            <Field
              label="Postal code"
              value={mailPostal}
              onChange={(v) => { setMailPostal(v); mailPostalRequired.reset() }}
              placeholder="Enter postal code"
              inputMode="numeric"
              autoCapitalize="characters"
              maxLength={6}
              error={mailPostalRequired.error}
            />
            <Field
              label="Address"
              value={mailLine}
              onChange={(v) => { setMailLine(v.toUpperCase()); mailLineRequired.reset() }}
              placeholder="Enter address"
              autoCapitalize="characters"
              error={mailLineRequired.error}
            />
            <Field
              label="Unit number"
              value={mailUnit}
              onChange={(v) => setMailUnit(v.toUpperCase())}
              placeholder="Enter unit number"
              inputMode="numeric"
              autoCapitalize="characters"
            />
          </div>
        )}

        <PrimaryButton onClick={submit}>Continue</PrimaryButton>
      </div>
      {/* No legal line here — consent was given on the Create Account start screen */}
      <p className="text-[14px] leading-[1.5] text-[#6e6e6e] text-center w-full m-0">
        Already have an account? <LinkButton onClick={onLogin}>Log in</LinkButton>
      </p>
    </AuthShell>
  )
}

/* ────────────── Create Account — verify identity (manual flow) ────
   A manual sign-up proves who they are with Singpass before the account is
   created. Shown full-screen between the email OTP step and the dashboard, so
   verification happens up front rather than as a prompt on the dashboard.
   Backing out here means no account is created. */
function VerifyIdentity({ onBack, onContinue }: { onBack: () => void; onContinue: () => void }) {
  return (
    <AuthShell onBack={onBack}>
      <AuthHeader
        title="Verify identity"
        subtitle="To comply with local regulations and protect against fraud, please verify your identity to view your policies"
      />
      <button
        onClick={onContinue}
        aria-label="Continue with Singpass"
        className="w-full h-[52px] bg-[#d93841] rounded-[8px] border-0 p-0 cursor-pointer flex items-center justify-center overflow-hidden"
      >
        <img src={singpassVerifyBtn} alt="" className="h-[40px] w-auto" />
      </button>
    </AuthShell>
  )
}

/* ─── "No account linked" dialog ───────────────────────────────
   Shown on the landing when a Singpass or login-ID sign-in matches no
   account. Both variants offer the same next step — create an account with
   Singpass MyInfo or manually — and differ only in the title. */
function NoAccountModal({
  variant,
  onClose,
  onRetrieveSingpass,
  onSignupManually,
  onLogin,
}: {
  variant: 'singpass' | 'loginId'
  onClose: () => void
  onRetrieveSingpass: () => void
  onSignupManually: () => void
  onLogin: () => void
}) {
  const title = variant === 'singpass'
    ? 'No account linked to Singpass'
    : 'No account linked to login ID'
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative bg-white rounded-[12px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] p-[24px] w-[500px] max-w-full flex flex-col gap-[24px]"
      >
        <div className="flex flex-col gap-[12px] w-full">
          <div className="flex items-start gap-[8px] w-full">
            <h2 className="flex-1 min-w-0 font-h2-title font-semibold text-[#212121] m-0">{title}</h2>
            <button onClick={onClose} aria-label="Close" className="shrink-0 bg-transparent border-0 p-0 cursor-pointer">
              <img src={closeIcon} alt="" className="w-[20px] h-[20px]" />
            </button>
          </div>
          <p className="text-[16px] leading-[1.5] text-[#212121] m-0">
            Create an account using Singpass MyInfo or manually
          </p>
        </div>

        {/* Create an account via Singpass MyInfo (Retrieve) */}
        <button
          onClick={onRetrieveSingpass}
          aria-label="Create an account with Singpass"
          className="w-full h-[48px] bg-[#d93841] rounded-[8px] border-0 p-0 cursor-pointer flex items-center justify-center overflow-hidden"
        >
          <img src={singpassRetrieveBtn} alt="" className="h-[40px] w-auto" />
        </button>

        <div className="flex items-center gap-4 w-full">
          <span className="flex-1 h-px bg-[rgba(0,0,0,0.09)]" />
          <span className="text-[14px] text-[#949494]">OR</span>
          <span className="flex-1 h-px bg-[rgba(0,0,0,0.09)]" />
        </div>

        <button
          onClick={onSignupManually}
          className="w-full border border-[#005eb8] text-[#005eb8] bg-white px-[24px] py-[12px] rounded-[8px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] font-medium text-[16px] cursor-pointer"
        >
          Register Manually
        </button>

        <div className="flex flex-col gap-3 w-full">
          <LegalLine />
          <p className="text-[14px] leading-[1.5] text-[#6e6e6e] text-center w-full m-0">
            Already have an account? <LinkButton onClick={onLogin}>Log in</LinkButton>
          </p>
        </div>
      </div>
    </div>
  )
}

/* ────────────── Create Account — login details after Singpass ─────
   Email and password only. NRIC comes later, at the profile step, so a
   PDPA-sensitive identifier is never a login credential. */
function RegisterCredentials({
  email,
  setEmail,
  password,
  setPassword,
  onBack,
  onNext,
  onLogin,
}: {
  email: string
  setEmail: (v: string) => void
  password: string
  setPassword: (v: string) => void
  onBack: () => void
  onNext: () => void
  onLogin: () => void
}) {
  const [confirm, setConfirm] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [attempted, setAttempted] = useState(false)
  const [emailSubmitError, setEmailSubmitError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const debouncedPassword = useDebouncedValue(password)
  const allRulesMet = passwordMeetsRules(password)

  const emailInline = useInlineValidation({
    value: email,
    validate: validateEmail,
    requiredMessage: MESSAGES.required,
  })
  const emailError = emailSubmitError || emailInline.error

  const passwordRequired = useRequired(password)
  const passwordFieldError = passwordError || passwordRequired.error

  const confirmInline = useInlineValidation({
    value: confirm,
    validate: v => (v !== debouncedPassword ? MESSAGES.passwordMismatch : undefined),
    isComplete: v => Boolean(debouncedPassword) && !debouncedPassword.startsWith(v),
  })
  const confirmError = confirmInline.error
    ? MESSAGES.passwordMismatch
    : attempted && confirm === ''
      ? MESSAGES.required
      : undefined

  function submit() {
    // Surface every empty field at once — bailing out on the first failure
    // would leave the fields below it looking fine.
    emailInline.show()
    passwordRequired.show()
    confirmInline.show()
    setAttempted(true)
    if (!emailInline.isValid) return
    // Signing up with an email that already has an account — the Login ID is taken
    if (accountExists(email)) {
      setEmailSubmitError(MESSAGES.loginIdTaken)
      return
    }
    if (!passwordRequired.isValid || !allRulesMet || confirm !== password) return
    // NRIC is not known yet, so only the banned-word rule can run here.
    const contentError = validatePasswordContent(password)
    if (contentError) {
      setPasswordError(contentError)
      return
    }
    setEmailSubmitError('')
    setPasswordError('')
    onNext()
  }

  return (
    <AuthShell onBack={onBack}>
      <AuthHeader title="Complete Profile" subtitle="Set up your login details" />
      <div className="flex flex-col gap-4 w-full">
        <Field
          label="Login ID (email address)"
          value={email}
          onChange={(v) => { setEmail(v); setEmailSubmitError(''); emailInline.reset() }}
          onBlur={emailInline.onBlur}
          placeholder="Enter email address"
          type="email"
          inputMode="email"
          error={emailError}
        />
        <div className="flex flex-col gap-2 w-full">
          <PasswordField
            label="Password"
            value={password}
            onChange={(v) => { setPassword(v); setPasswordError(''); passwordRequired.reset() }}
            show={showPw}
            onToggle={() => setShowPw((s) => !s)}
            placeholder="Enter password"
            error={passwordFieldError}
          />
          <PasswordRules password={debouncedPassword} attempted={attempted} />
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
          Verify Email
        </PrimaryButton>
      </div>
      {/* No legal line here — consent was given on the Create Account start screen */}
      <p className="text-[14px] leading-[1.5] text-[#6e6e6e] text-center w-full m-0">
        Already have an account? <LinkButton onClick={onLogin}>Log in</LinkButton>
      </p>
    </AuthShell>
  )
}

/* ──────────────────────── OTP Verification ─────────────────────
   The prototype's stand-in for the code that would arrive by SMS. */
const MOCK_OTP = '283016'

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
  /** Touch only — a desktop browser has a real keyboard already. */
  const isTouch = useIsTouch()
  const [keypadOpen, setKeypadOpen] = useState(false)

  function edit(next: string) {
    setCode(next.slice(0, 6))
    setError('')
  }

  function verify() {
    if (!code.trim()) {
      setError(MESSAGES.required)
      return
    }
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
        <OtpBoxes
          value={code}
          onChange={edit}
          error={Boolean(error)}
          onFocusChange={setKeypadOpen}
          suppressNativeKeyboard={isTouch}
        />
        {error && <FieldError message={error} />}
        <ResendRow />
        <PrimaryButton onClick={verify}>
          Continue
        </PrimaryButton>
      </div>
      <SupportLine />
      {isTouch && (
        <>
          {/* Reserved for the whole screen, not just while the keypad is up:
              collapsing it on blur reflows the page between a button's press
              and its release, and the tap lands on whatever slid underneath. */}
          <div className="shrink-0 h-[280px]" aria-hidden="true" />
          {keypadOpen && <MockNumericKeypad
            /* iOS drops the suggestion the moment the user types their own */
            suggestion={code ? undefined : MOCK_OTP}
            onSuggestion={() => edit(MOCK_OTP)}
            onDigit={(d) => edit(code + d)}
            onBackspace={() => edit(code.slice(0, -1))}
          />}
        </>
      )}
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


/** Live rule checklist, shared by every screen that sets a password. */
function PasswordRules({ password, attempted }: { password: string; attempted: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[12px] leading-[1.4] text-[#6e6e6e]">Your password must contain at least:</span>
      {PASSWORD_RULES.map((rule) => {
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
  )
}

function PasswordSetup({
  toast,
  title,
  subtitle,
  buttonLabel,
  email,
  showConsent,
  onBack,
  onSubmit,
}: {
  toast?: string
  title: string
  subtitle: string
  buttonLabel: string
  /** Drives the password-history check. Never shown — Singpass owns the address. */
  email?: string
  /** Sign-up screens ask for marketing consent; a password reset does not. */
  showConsent?: boolean
  onBack: () => void
  onSubmit: (password: string) => void
}) {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [attempted, setAttempted] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [marketingConsent, setMarketingConsent] = useState(true)

  // Checkmarks tick as the user types, once typing settles
  const debouncedPassword = useDebouncedValue(password)

  const allRulesMet = passwordMeetsRules(password)
  const passwordRequired = useRequired(password)
  const passwordFieldError = passwordError || passwordRequired.error
  const confirmInline = useInlineValidation({
    value: confirm,
    validate: v => (v !== debouncedPassword ? MESSAGES.passwordMismatch : undefined),
    // Silent only while the entry could still turn into the password. The moment
    // it diverges it can never match, so flag it as soon as typing settles.
    isComplete: v => Boolean(debouncedPassword) && !debouncedPassword.startsWith(v),
  })
  const mismatch = Boolean(confirmInline.error)

  const confirmError = mismatch
    ? MESSAGES.passwordMismatch
    : attempted && confirm === ''
      ? MESSAGES.required
      : undefined

  function submit() {
    passwordRequired.show()
    confirmInline.show()
    setAttempted(true)
    if (!passwordRequired.isValid || !allRulesMet || confirm !== password) return
    // Content policy — no "pass"/"pwd"
    const contentError = validatePasswordContent(password)
    if (contentError) {
      setPasswordError(contentError)
      return
    }
    // Reuse policy — checked against the last 5 passwords on file
    const historyError = validatePasswordHistory(password, email)
    if (historyError) {
      setPasswordError(historyError)
      return
    }
    setPasswordError('')
    onSubmit(password)
  }

  return (
    <AuthShell onBack={onBack} toast={toast}>
      <AuthHeader title={title} subtitle={subtitle} />
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-2 w-full">
          <PasswordField
            label="Password"
            value={password}
            onChange={(v) => { setPassword(v); setPasswordError(''); passwordRequired.reset() }}
            show={showPw}
            onToggle={() => setShowPw((s) => !s)}
            placeholder="Enter password"
            error={passwordFieldError}
          />
          <PasswordRules password={debouncedPassword} attempted={attempted} />
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
        {showConsent && (
          <ConsentCheckbox
            checked={marketingConsent}
            onChange={setMarketingConsent}
            label={MARKETING_CONSENT_LABEL}
          />
        )}
        <PrimaryButton onClick={submit}>
          {buttonLabel}
        </PrimaryButton>
      </div>
      <div className="flex flex-col gap-3 w-full">
        {showConsent && <LegalLine />}
        <SupportLine />
      </div>
    </AuthShell>
  )
}

/* ───────────────────────── Forgot Password ───────────────────── */
function ForgotPassword({
  email,
  setEmail,
  onBack,
  onSent,
}: {
  email: string
  setEmail: (v: string) => void
  onBack: () => void
  onSent: () => void
}) {
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const emailInline = useInlineValidation({
    value: email,
    validate: validateEmail,
    requiredMessage: MESSAGES.required,
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
        subtitle="Enter your login ID (email address) and we will send you a password reset link"
      />
      <div className="flex flex-col gap-4 w-full">
        <Field
          label="Login ID (email address)"
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
      <SupportLine />
    </AuthShell>
  )
}
