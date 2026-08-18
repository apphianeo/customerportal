import {
  parsePhoneNumberFromString,
  type CountryCode,
} from 'libphonenumber-js'
import { findAccount } from '../../data/accounts'

/* ─── Messages ────────────────────────────────────────────────
   Sentence case per the UOI UX writing guideline; single-line
   messages carry no terminal period. */
export const MESSAGES = {
  required: 'This field is required',
  nricInvalid: 'Please enter a valid NRIC/FIN',
  emailInvalid: 'Email address is invalid',
  phoneInvalid: 'Please enter a valid phone number',
  passwordMismatch: 'Passwords do not match',
  accountMissing: 'Account does not exist',
  accountExists: 'Account already exists, please login instead',
  passwordIncorrect: 'Password is incorrect, try again',
  passwordReused: 'Cannot reuse your last 5 passwords',
  passwordUnsafe: 'Cannot contain NRIC/FIN or words like "pass" or "pwd"',
  otpIncorrect: 'Incorrect OTP',
} as const

/* ─── NRIC / FIN ───────────────────────────────────────────────
   Singapore NRIC/FIN: prefix S/T/F/G/M, 7 digits, checksum letter. */
const NRIC_RE = /^[STFGM]\d{7}[A-Z]$/i

export function validateNric(value: string): string | undefined {
  if (!value.trim()) return undefined
  return NRIC_RE.test(value.trim()) ? undefined : MESSAGES.nricInvalid
}

/* ─── Email ────────────────────────────────────────────────────
   Must have a local part, an @, and a dotted domain (e.g. .com). */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/

export function validateEmail(value: string): string | undefined {
  if (!value.trim()) return undefined
  return EMAIL_RE.test(value.trim()) ? undefined : MESSAGES.emailInvalid
}

/* ─── Phone ────────────────────────────────────────────────────
   Length and pattern come from libphonenumber-js for the selected
   country, so each region's own digit ranges apply. */
export const COUNTRIES: { code: CountryCode; dial: string; label: string }[] = [
  { code: 'SG', dial: '+65', label: 'Singapore' },
  { code: 'MY', dial: '+60', label: 'Malaysia' },
  { code: 'ID', dial: '+62', label: 'Indonesia' },
  { code: 'VN', dial: '+84', label: 'Vietnam' },
  { code: 'CN', dial: '+86', label: 'China' },
  { code: 'HK', dial: '+852', label: 'Hong Kong' },
  { code: 'TH', dial: '+66', label: 'Thailand' },
  { code: 'PH', dial: '+63', label: 'Philippines' },
  { code: 'IN', dial: '+91', label: 'India' },
  { code: 'AU', dial: '+61', label: 'Australia' },
  { code: 'GB', dial: '+44', label: 'United Kingdom' },
  { code: 'US', dial: '+1',  label: 'United States' },
]

export function validatePhone(value: string, country: CountryCode): string | undefined {
  const digits = value.replace(/\D/g, '')
  if (!digits) return undefined
  const parsed = parsePhoneNumberFromString(digits, country)
  return parsed?.isValid() ? undefined : MESSAGES.phoneInvalid
}

/* ─── Password rules (live checkmarks) ─────────────────────── */
export const PASSWORD_RULES = [
  { label: '8 to 24 characters', test: (v: string) => v.length >= 8 && v.length <= 24 },
  { label: '1 letter', test: (v: string) => /[A-Za-z]/.test(v) },
  { label: '1 number', test: (v: string) => /[0-9]/.test(v) },
]

export function passwordMeetsRules(value: string) {
  return PASSWORD_RULES.every(r => r.test(value))
}

/* ─── Password content policy (on submit) ──────────────────── */
const BANNED_WORDS = ['pass', 'pwd']

export function validatePasswordContent(password: string, nric?: string): string | undefined {
  const lower = password.toLowerCase()
  if (BANNED_WORDS.some(w => lower.includes(w))) return MESSAGES.passwordUnsafe
  if (nric && nric.trim() && lower.includes(nric.trim().toLowerCase())) return MESSAGES.passwordUnsafe
  return undefined
}

/** Rejects anything in the account's last 5 passwords. Keyed by email now. */
export function validatePasswordHistory(password: string, email?: string): string | undefined {
  const account = email ? findAccount(email) : undefined
  if (!account) return undefined
  const lastFive = account.passwordHistory.slice(0, 5)
  return lastFive.some(p => p === password) ? MESSAGES.passwordReused : undefined
}

/* ─── Sign-in (on submit) ──────────────────────────────────────
   Email is the credential; NRIC is never typed into a login form. */
export type LoginResult =
  | { ok: true }
  | { ok: false; field: 'email' | 'password'; message: string }

export function attemptLogin(email: string, password: string): LoginResult {
  const account = findAccount(email)
  if (!account) return { ok: false, field: 'email', message: MESSAGES.accountMissing }
  if (account.password !== password) {
    return { ok: false, field: 'password', message: MESSAGES.passwordIncorrect }
  }
  return { ok: true }
}

/* ─── OTP (on submit) — mock: 999999 always fails ──────────── */
export function validateOtp(code: string): string | undefined {
  if (code.length < 6 || code === '999999') return MESSAGES.otpIncorrect
  return undefined
}
