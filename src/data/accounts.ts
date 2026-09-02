/**
 * Stand-in for the accounts API.
 *
 * Email address is the account key, not NRIC/FIN. NRIC is still collected —
 * it is what matches someone to their policies — but it is captured at the
 * profile step and never used as a credential, so a PDPA-sensitive identifier
 * is not typed into a login form on every visit.
 */
export type Account = {
  /** The credential. Unique per account. */
  email: string
  password: string
  /** Most recent first — the last 5 are rejected on change. */
  passwordHistory: string[]
  authMethod: 'account' | 'singpass'
  /**
   * Whether the identity behind the account has been verified with Singpass.
   * Singpass registration sets this true; a manual sign-up starts false and
   * stays a prospect until they verify. Policies only show once verified.
   */
  verified: boolean
  salutation: string
  /** The customer's full name, stored as a single field. */
  fullName: string
  gender: 'Male' | 'Female'
  dob: string
  /** Collected at the profile step; matches the holder to their policies. */
  nric: string
  phone: string
  residentialPostal: string
  residentialAddress: string
  residentialUnit: string
  mailingSameAsResidential: boolean
  mailingPostal: string
  mailingAddress: string
  mailingUnit: string
}

/**
 * NRIC/FIN of everyone holding a UOI policy. Stands in for the policy system.
 * A portal account whose NRIC is absent here sees the prospect dashboard.
 */
export const POLICYHOLDER_NRICS = [
  'S1234567D',
  'S8912345A',
  'S7654321B',
  'G4567890X',
  'S2244668E',
  'F9988776Q',
]

export function isPolicyholder(nric: string) {
  return POLICYHOLDER_NRICS.includes(normalise(nric))
}

export const ACCOUNTS: Account[] = [
  {
    // Returning customer. Full password history, so the reuse rule fires.
    email: 'chriswong@gmail.com',
    password: 'Chris2026',
    passwordHistory: ['Chris2026', 'Summer2025', 'Winter2024', 'Orchard88', 'Marina2023'],
    authMethod: 'account',
    verified: true,
    salutation: 'MR',
    fullName: 'CHRIS WONG JUN JIE',
    gender: 'Male',
    dob: '01/01/1989',
    nric: 'S1234567D',
    phone: '91234567',
    residentialPostal: '238824',
    residentialAddress: '1 ORCHARD RD',
    residentialUnit: '#02-01',
    mailingSameAsResidential: true,
    mailingPostal: '',
    mailingAddress: '',
    mailingUnit: '',
  },
  {
    // Signed up through Singpass — personal details are read-only on Manage Account.
    email: 'meiling.tan@gmail.com',
    password: 'Portal2026',
    passwordHistory: ['Portal2026', 'Portal2025', 'Portal2024', 'Portal2023', 'Portal2022'],
    authMethod: 'singpass',
    verified: true,
    salutation: 'MS',
    fullName: 'MEI LING TAN HUI ZHEN',
    gender: 'Female',
    dob: '14/07/1992',
    nric: 'S8912345A',
    phone: '98765432',
    residentialPostal: '188024',
    residentialAddress: '55 BRAS BASAH RD',
    residentialUnit: '#12-08',
    mailingSameAsResidential: false,
    mailingPostal: '069118',
    mailingAddress: '8 CROSS ST',
    mailingUnit: '#24-03',
  },
  {
    // One password on file, so the reuse rule stays quiet.
    email: 'ravi.kumar@gmail.com',
    password: 'Bedok2026',
    passwordHistory: ['Bedok2026'],
    authMethod: 'account',
    verified: true,
    salutation: 'MR',
    fullName: 'RAVI KUMAR',
    gender: 'Male',
    dob: '23/11/1978',
    nric: 'S7654321B',
    phone: '81234567',
    residentialPostal: '460022',
    residentialAddress: '22 BEDOK SOUTH AVE 1',
    residentialUnit: '#07-114',
    mailingSameAsResidential: true,
    mailingPostal: '',
    mailingAddress: '',
    mailingUnit: '',
  },
  {
    // FIN rather than NRIC.
    email: 'aisyah.rahman@gmail.com',
    password: 'Sentosa2026',
    passwordHistory: ['Sentosa2026', 'Sentosa2025'],
    authMethod: 'account',
    verified: true,
    salutation: 'MRS',
    fullName: 'AISYAH RAHMAN',
    gender: 'Female',
    dob: '05/03/1985',
    nric: 'G4567890X',
    phone: '71234567',
    residentialPostal: '098269',
    residentialAddress: '30 SENTOSA GATEWAY',
    residentialUnit: '#05-02',
    mailingSameAsResidential: true,
    mailingPostal: '',
    mailingAddress: '',
    mailingUnit: '',
  },
  {
    // Registered through Singpass — verified, holds policies. Used to demo the
    // Singpass *login* path (scan → straight to the active dashboard).
    email: 'grace.sim@gmail.com',
    password: 'Bukit2026',
    passwordHistory: ['Bukit2026'],
    authMethod: 'singpass',
    verified: true,
    salutation: 'MDM',
    fullName: 'GRACE SIM EN QI',
    gender: 'Female',
    dob: '17/12/1971',
    nric: 'S2244668E',
    phone: '93304488',
    residentialPostal: '229832',
    residentialAddress: '77 BUKIT TIMAH RD',
    residentialUnit: '#14-02',
    mailingSameAsResidential: true,
    mailingPostal: '',
    mailingAddress: '',
    mailingUnit: '',
  },
  {
    // Registered but holds no UOI product — lands on the prospect dashboard.
    email: 'nadia.lim@gmail.com',
    password: 'Marina2026',
    passwordHistory: ['Marina2026'],
    authMethod: 'singpass',
    verified: true,
    salutation: 'MS',
    fullName: 'NADIA LIM HUI TING',
    gender: 'Female',
    dob: '09/09/1995',
    nric: 'T0011223J',
    phone: '92220000',
    residentialPostal: '018960',
    residentialAddress: '8 MARINA VIEW',
    residentialUnit: '#21-05',
    mailingSameAsResidential: true,
    mailingPostal: '',
    mailingAddress: '',
    mailingUnit: '',
  },
]

const normalise = (value: string) => value.trim().toUpperCase()
const normaliseEmail = (email: string) => email.trim().toLowerCase()

export function findAccount(email: string) {
  return ACCOUNTS.find(a => a.email === normaliseEmail(email))
}

export function accountExists(email: string) {
  return Boolean(findAccount(email))
}

export function findAccountByNric(nric: string) {
  return ACCOUNTS.find(a => a.nric === normalise(nric))
}

/** Registering adds the account for the rest of the session, so you can sign in again. */
export function registerAccount(account: Account) {
  const existing = findAccount(account.email)
  if (existing) return existing
  ACCOUNTS.push(account)
  return account
}

/**
 * Mark an account verified after a Singpass identity check. Singpass returns
 * the person's real, verified NRIC/FIN, so we adopt it — that is what matches
 * the account to any policies they hold, unlocking the active dashboard.
 */
export function verifyAccount(email: string) {
  const account = findAccount(email)
  if (account) {
    account.verified = true
    account.nric = SINGPASS_IDENTITY.nric
  }
  return account
}

/** A profile for someone mid-registration — not in ACCOUNTS yet. */
export function draftAccount(input: Partial<Account> & { email: string }): Account {
  return {
    password: '',
    passwordHistory: [],
    authMethod: 'account',
    // A fresh sign-up is a prospect until they verify with Singpass.
    verified: false,
    salutation: 'MR',
    fullName: 'there',
    gender: 'Male',
    dob: '',
    nric: '',
    phone: '',
    residentialPostal: '',
    residentialAddress: '',
    residentialUnit: '',
    mailingSameAsResidential: true,
    mailingPostal: '',
    mailingAddress: '',
    mailingUnit: '',
    ...input,
    email: normaliseEmail(input.email),
  }
}

export const fullName = (a: Account) => a.fullName.trim()

/**
 * Names are stored exactly as entered — the profile form and MyInfo both
 * shout — but they read as prose wherever someone is greeted by name, so
 * soften them there. Presentation only: the stored value stays authoritative,
 * and casing the user meant ("McDonald") does not survive the round trip.
 */
export const titleCaseName = (value: string) =>
  value
    .toLowerCase()
    .replace(/(^|[\s'-])([a-z])/g, (_, sep: string, ch: string) => sep + ch.toUpperCase())

/** First letters of the first two words of the full name — e.g. "GRACE SIM EN QI" → "GS". */
export const initials = (a: Account) => {
  const words = a.fullName.trim().split(/\s+/)
  return `${words[0]?.[0] ?? ''}${words[1]?.[0] ?? ''}`.toUpperCase()
}

/* ─── Singpass ───────────────────────────────────────────────────
   What the Singpass App hands back after authentication. Grace holds
   policies but has never registered, so the first Singpass sign-in runs
   the first-time path; afterwards she is a returning user. */
export const SINGPASS_IDENTITY = {
  salutation: 'MDM',
  fullName: 'GRACE SIM EN QI',
  gender: 'Female' as const,
  dob: '17/12/1971',
  nric: 'S2244668E',
  email: 'grace.sim@gmail.com',
  phone: '93304488',
  residentialPostal: '229832',
  residentialAddress: '77 BUKIT TIMAH RD',
  residentialUnit: '#14-02',
}
