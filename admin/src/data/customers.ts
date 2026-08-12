/**
 * The console's primary entity is a *person*, not a portal account.
 *
 * Someone can hold UOI policies without ever registering on the portal, and
 * can register on the portal without holding any policy. Both are real, so
 * portal status and policy ownership are independent attributes rather than
 * the thing that decides whether a record exists.
 *
 * Stands in for the policy-system API. Swap this module for real calls and
 * nothing above it changes.
 */

export type PortalStatus =
  /** Holds products with us, but has never created a portal login. */
  | 'not-registered'
  | 'active'
  /** Auto-locked after 6 months of inactivity, non-policyholders only. */
  | 'locked'

export type PolicyStatus = 'in-force' | 'renewal-due' | 'lapsed'

export type Policy = {
  id: string
  productName: string
  policyNo: string
  status: PolicyStatus
  statusLabel: string
  plan: string
  coverageFrom: string
  coverageTo: string
  premium: string
  paymentTerms: string
  paymentMethod: string
  cardLast4: string
  insuredPersons: string[]
}

export type Customer = {
  /** NRIC/FIN is the unique key — one identifier, one person. */
  nric: string
  salutation: string
  firstName: string
  lastName: string
  dob: string
  email: string
  phone: string
  address: string
  postal: string
  portal: {
    status: PortalStatus
    /** Absent when they have never registered. */
    authMethod?: 'singpass' | 'account'
    registeredOn?: string
    lastLoginOn?: string
    lockedOn?: string
  }
  policies: Policy[]
}

const policy = (p: Policy) => p

export const CUSTOMERS: Customer[] = [
  {
    nric: 'S1234567D',
    salutation: 'Mr',
    firstName: 'Chris',
    lastName: 'Wong',
    dob: '01/01/1989',
    email: 'chriswong@gmail.com',
    phone: '+65 9123 4567',
    address: '123 Pasir Ris St 21, #03-21',
    postal: '645123',
    portal: {
      status: 'active',
      authMethod: 'account',
      registeredOn: '12 Mar 2025',
      lastLoginOn: '02 Aug 2026',
    },
    policies: [
      policy({
        id: 'p-1',
        productName: 'UniTravel (Single Trip)',
        policyNo: 'DHOPF50050002500',
        status: 'in-force',
        statusLabel: 'In force',
        plan: 'Plus',
        coverageFrom: '08/10/2026',
        coverageTo: '13/10/2026',
        premium: 'S$265.20',
        paymentTerms: 'Single Payment',
        paymentMethod: 'Mastercard',
        cardLast4: '9111',
        insuredPersons: ['Chris Wong'],
      }),
      policy({
        id: 'p-2',
        productName: 'UniCar',
        policyNo: 'PNF320104124A23',
        status: 'renewal-due',
        statusLabel: 'Renewal due in 30 days',
        plan: 'Comprehensive',
        coverageFrom: '13/02/2025',
        coverageTo: '13/02/2026',
        premium: 'S$1,250.00',
        paymentTerms: 'Annual',
        paymentMethod: 'Mastercard',
        cardLast4: '9111',
        insuredPersons: ['Chris Wong'],
      }),
    ],
  },
  {
    nric: 'S8912345A',
    salutation: 'Ms',
    firstName: 'Mei Ling',
    lastName: 'Tan',
    dob: '14/07/1992',
    email: 'meiling.tan@gmail.com',
    phone: '+65 9876 5432',
    address: '55 Bras Basah Rd, #12-08',
    postal: '188024',
    portal: {
      status: 'active',
      authMethod: 'singpass',
      registeredOn: '04 Jan 2026',
      lastLoginOn: '30 Jul 2026',
    },
    policies: [
      policy({
        id: 'p-3',
        productName: 'UniHome',
        policyNo: 'HOM880234110B01',
        status: 'in-force',
        statusLabel: 'In force',
        plan: 'Premier',
        coverageFrom: '01/01/2026',
        coverageTo: '01/01/2027',
        premium: 'S$420.00',
        paymentTerms: 'Annual',
        paymentMethod: 'Visa',
        cardLast4: '4102',
        insuredPersons: ['Mei Ling Tan'],
      }),
    ],
  },
  {
    // Policyholder who has never signed up — the portal adoption gap.
    nric: 'S7654321B',
    salutation: 'Mr',
    firstName: 'Ravi',
    lastName: 'Kumar',
    dob: '23/11/1978',
    email: 'ravi.kumar@gmail.com',
    phone: '+65 8123 4567',
    address: '22 Bedok South Ave 1, #07-114',
    postal: '460022',
    portal: { status: 'not-registered' },
    policies: [
      policy({
        id: 'p-4',
        productName: 'UniHelper',
        policyNo: 'HLP450912330C11',
        status: 'in-force',
        statusLabel: 'In force',
        plan: 'Standard',
        coverageFrom: '15/05/2026',
        coverageTo: '15/05/2028',
        premium: 'S$598.00',
        paymentTerms: 'Single Payment',
        paymentMethod: 'PayNow',
        cardLast4: '',
        insuredPersons: ['Maria Santos'],
      }),
      policy({
        id: 'p-5',
        productName: 'Personal Accident',
        policyNo: 'PAC110455221D07',
        status: 'lapsed',
        statusLabel: 'Lapsed',
        plan: 'Essential',
        coverageFrom: '01/03/2024',
        coverageTo: '01/03/2025',
        premium: 'S$180.00',
        paymentTerms: 'Annual',
        paymentMethod: 'Mastercard',
        cardLast4: '2277',
        insuredPersons: ['Ravi Kumar'],
      }),
    ],
  },
  {
    nric: 'G4567890X',
    salutation: 'Mrs',
    firstName: 'Aisyah',
    lastName: 'Rahman',
    dob: '05/03/1985',
    email: 'aisyah.rahman@gmail.com',
    phone: '+65 7123 4567',
    address: '30 Sentosa Gateway, #05-02',
    postal: '098269',
    portal: {
      status: 'active',
      authMethod: 'account',
      registeredOn: '22 Jun 2026',
      lastLoginOn: '28 Jul 2026',
    },
    policies: [
      policy({
        id: 'p-6',
        productName: 'UniTravel (Annual)',
        policyNo: 'DHOPF50050009913',
        status: 'in-force',
        statusLabel: 'In force',
        plan: 'Elite',
        coverageFrom: '01/07/2026',
        coverageTo: '01/07/2027',
        premium: 'S$385.00',
        paymentTerms: 'Annual',
        paymentMethod: 'Amex',
        cardLast4: '3005',
        insuredPersons: ['Aisyah Rahman', 'Idris Rahman'],
      }),
    ],
  },
  {
    // Registered but never bought — invisible today, and a marketing segment.
    nric: 'T0011223J',
    salutation: 'Ms',
    firstName: 'Nadia',
    lastName: 'Lim',
    dob: '09/09/1995',
    email: 'nadia.lim@gmail.com',
    phone: '+65 9222 0000',
    address: '8 Marina View, #21-05',
    postal: '018960',
    portal: {
      status: 'active',
      authMethod: 'singpass',
      registeredOn: '18 Jul 2026',
      lastLoginOn: '01 Aug 2026',
    },
    policies: [],
  },
  {
    // Registered, no products, dormant → auto-locked at 6 months.
    nric: 'S4433221C',
    salutation: 'Mr',
    firstName: 'Daniel',
    lastName: 'Ong',
    dob: '30/04/1990',
    email: 'daniel.ong@gmail.com',
    phone: '+65 8555 1212',
    address: '19 Tampines Ave 4, #10-33',
    postal: '529765',
    portal: {
      status: 'locked',
      authMethod: 'account',
      registeredOn: '02 Nov 2025',
      lastLoginOn: '04 Jan 2026',
      lockedOn: '04 Jul 2026',
    },
    policies: [],
  },
  {
    nric: 'S2244668E',
    salutation: 'Mdm',
    firstName: 'Grace',
    lastName: 'Sim',
    dob: '17/12/1971',
    email: 'grace.sim@gmail.com',
    phone: '+65 9330 4488',
    address: '77 Bukit Timah Rd, #14-02',
    postal: '229832',
    portal: { status: 'not-registered' },
    policies: [
      policy({
        id: 'p-7',
        productName: 'UniHome',
        policyNo: 'HOM880234998F42',
        status: 'renewal-due',
        statusLabel: 'Renewal due in 14 days',
        plan: 'Standard',
        coverageFrom: '20/08/2025',
        coverageTo: '20/08/2026',
        premium: 'S$310.00',
        paymentTerms: 'Annual',
        paymentMethod: 'GIRO',
        cardLast4: '',
        insuredPersons: ['Grace Sim'],
      }),
    ],
  },
  {
    nric: 'F9988776Q',
    salutation: 'Mr',
    firstName: 'Tomas',
    lastName: 'Novak',
    dob: '11/06/1988',
    email: 'tomas.novak@gmail.com',
    phone: '+65 8800 2231',
    address: '3 Robinson Rd, #08-11',
    postal: '048542',
    portal: {
      status: 'active',
      authMethod: 'account',
      registeredOn: '09 Feb 2026',
      lastLoginOn: '25 Jul 2026',
    },
    policies: [
      policy({
        id: 'p-8',
        productName: 'UniCar',
        policyNo: 'PNF320104777G88',
        status: 'in-force',
        statusLabel: 'In force',
        plan: 'Third Party',
        coverageFrom: '05/04/2026',
        coverageTo: '05/04/2027',
        premium: 'S$860.00',
        paymentTerms: 'Annual',
        paymentMethod: 'Visa',
        cardLast4: '7741',
        insuredPersons: ['Tomas Novak'],
      }),
    ],
  },
]

/* ─── Derived views ─────────────────────────────────────────── */

export const fullName = (c: Customer) => `${c.firstName} ${c.lastName}`

export const initials = (c: Customer) =>
  `${c.firstName[0] ?? ''}${c.lastName[0] ?? ''}`.toUpperCase()

export const isPolicyholder = (c: Customer) => c.policies.length > 0

export const activePolicyCount = (c: Customer) =>
  c.policies.filter(p => p.status !== 'lapsed').length

export function findCustomer(nric: string) {
  return CUSTOMERS.find(c => c.nric === nric.trim().toUpperCase())
}

export function findPolicy(nric: string, policyId: string) {
  return findCustomer(nric)?.policies.find(p => p.id === policyId)
}

/** Name, NRIC, email, phone and policy number all hit the same search box. */
export function searchCustomers(query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return CUSTOMERS
  return CUSTOMERS.filter(c =>
    [
      fullName(c),
      c.nric,
      c.email,
      c.phone.replace(/\s/g, ''),
      ...c.policies.map(p => p.policyNo),
      ...c.policies.map(p => p.productName),
    ].some(field => field.toLowerCase().includes(q)),
  )
}
