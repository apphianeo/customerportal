/**
 * Stand-in for the accounts API. The prototype validates against this the way
 * the real form will validate against the backend, so the error states are
 * exercised end to end.
 *
 * Each account is shaped to exercise a different flow — see
 * docs/TEST-ACCOUNTS.md for the walkthrough.
 */
export type Account = {
  nric: string
  password: string
  /** Most recent first — the last 5 are rejected on change. */
  passwordHistory: string[]
  /** How the account was created; Singpass locks the personal detail fields. */
  authMethod: 'account' | 'singpass'
  salutation: string
  firstName: string
  lastName: string
  dob: string
  email: string
  phone: string
  residentialPostal: string
  residentialAddress: string
  residentialUnit: string
  mailingSameAsResidential: boolean
  mailingPostal: string
  mailingAddress: string
  mailingUnit: string
}

export const ACCOUNTS: Account[] = [
  {
    // Returning customer, created an account manually. Has a full password
    // history, so the "last 5 passwords" rule can fire.
    nric: 'S1234567D',
    password: 'Chris2026',
    passwordHistory: ['Chris2026', 'Summer2025', 'Winter2024', 'Orchard88', 'Marina2023'],
    authMethod: 'account',
    salutation: 'Mr',
    firstName: 'Chris',
    lastName: 'Wong',
    dob: '01/01/1989',
    email: 'chriswong@gmail.com',
    phone: '91234567',
    residentialPostal: '645123',
    residentialAddress: '123 Pasir Ris St 21',
    residentialUnit: '#03-21',
    mailingSameAsResidential: true,
    mailingPostal: '',
    mailingAddress: '',
    mailingUnit: '',
  },
  {
    // Signed up through Singpass — personal details are read-only on Manage
    // Account, and there is no Save Changes button on that card.
    nric: 'S8912345A',
    password: 'Portal2026',
    passwordHistory: ['Portal2026', 'Portal2025', 'Portal2024', 'Portal2023', 'Portal2022'],
    authMethod: 'singpass',
    salutation: 'Ms',
    firstName: 'Mei Ling',
    lastName: 'Tan',
    dob: '14/07/1992',
    email: 'meiling.tan@gmail.com',
    phone: '98765432',
    residentialPostal: '188024',
    residentialAddress: '55 Bras Basah Rd',
    residentialUnit: '#12-08',
    mailingSameAsResidential: false,
    mailingPostal: '069118',
    mailingAddress: '8 Cross St',
    mailingUnit: '#24-03',
  },
  {
    // Newly created account — only one password on file, so nothing is
    // rejected by the reuse rule. Separate mailing address.
    nric: 'S7654321B',
    password: 'Bedok2026',
    passwordHistory: ['Bedok2026'],
    authMethod: 'account',
    salutation: 'Mr',
    firstName: 'Ravi',
    lastName: 'Kumar',
    dob: '23/11/1978',
    email: 'ravi.kumar@gmail.com',
    phone: '81234567',
    residentialPostal: '460022',
    residentialAddress: '22 Bedok South Ave 1',
    residentialUnit: '#07-114',
    mailingSameAsResidential: true,
    mailingPostal: '',
    mailingAddress: '',
    mailingUnit: '',
  },
  {
    // Foreign identification number, and a phone number that is not Singaporean
    // — useful for the country-code picker on Manage Account.
    nric: 'G4567890X',
    password: 'Sentosa2026',
    passwordHistory: ['Sentosa2026', 'Sentosa2025'],
    authMethod: 'account',
    salutation: 'Mrs',
    firstName: 'Aisyah',
    lastName: 'Rahman',
    dob: '05/03/1985',
    email: 'aisyah.rahman@gmail.com',
    phone: '71234567',
    residentialPostal: '098269',
    residentialAddress: '30 Sentosa Gateway',
    residentialUnit: '#05-02',
    mailingSameAsResidential: true,
    mailingPostal: '',
    mailingAddress: '',
    mailingUnit: '',
  },
]

const normalise = (nric: string) => nric.trim().toUpperCase()

export function findAccount(nric: string) {
  return ACCOUNTS.find(a => a.nric === normalise(nric))
}

export function accountExists(nric: string) {
  return Boolean(findAccount(nric))
}

/** A profile for someone who just registered — they aren't in ACCOUNTS yet. */
export function draftAccount(input: Partial<Account> & { nric: string }): Account {
  return {
    password: '',
    passwordHistory: [],
    authMethod: 'account',
    salutation: 'Mr',
    firstName: 'there',
    lastName: '',
    dob: '',
    email: '',
    phone: '',
    residentialPostal: '',
    residentialAddress: '',
    residentialUnit: '',
    mailingSameAsResidential: true,
    mailingPostal: '',
    mailingAddress: '',
    mailingUnit: '',
    ...input,
  }
}

export const fullName = (a: Account) => `${a.firstName} ${a.lastName}`.trim()

export const initials = (a: Account) =>
  `${a.firstName[0] ?? ''}${a.lastName[0] ?? ''}`.toUpperCase()
