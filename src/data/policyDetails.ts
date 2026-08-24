import type { PolicyStatus } from './policies'

/* Field values are plain data; the page decides how to render the special ones. */
export type FieldValue =
  | string
  | { kind: 'payment'; last4: string }
  /** Long value — clamped to 2 lines with a chevron to expand. */
  | { kind: 'expandable'; text: string }
  /** Rendered as a link (e.g. agent mobile number). */
  | { kind: 'link'; text: string; href: string }

export type Field = { label: string; value: FieldValue }

export type DocumentRow = {
  name: string
  type: string
  premium: string
  last4: string
  status: 'success' | 'rejected'
}
export type PaymentRow = {
  date: string
  type: string
  premium: string
  last4: string
  status: 'success' | 'rejected'
}

export type PolicyDetailData = {
  slug: string
  name: string
  status: PolicyStatus
  statusLabel: string
  policyNumber: string
  policyFields: Field[]
  policyholderFields: Field[]
  insuredGroups: { title: string; fields: Field[] }[]
  documents: DocumentRow[]
  payments: PaymentRow[]
  /** Total payment records — the table shows the first page of 5. */
  paymentsTotal: number
  contactFields: Field[]
  agentFields: Field[]
}

export const AREA_1_COUNTRIES =
  'Area 1 (Brunei, Cambodia, Indonesia, Laos, Malaysia, Myanmar, Philippines, Thailand and Vietnam)'

const TRAVEL_ADD_ONS =
  'Cancel For Any Reason, Pre-Existing Condition, Adventure and Sports, Golfer Cover, Pet Care'

/* ─── Shared blocks (same policyholder across this demo account) ───────── */
const POLICYHOLDER: Field[] = [
  { label: 'Salutation', value: 'MR' },
  { label: 'Name', value: 'CHRIS WONG' },
  { label: 'NRIC/FIN', value: 'S1234567A' },
  { label: 'Date of birth', value: '12/02/1966' },
  { label: 'Email', value: 'chriswong@gmail.com' },
  { label: 'Mobile number', value: '+65 91234567' },
  { label: 'Address', value: { kind: 'expandable', text: '1 ORCHARD RD, #02-01, SINGAPORE 238824' } },
]

const CONTACT: Field[] = [
  { label: 'Contact number', value: '+65 91234567' },
  { label: 'Email address', value: 'chriswong@gmail.com' },
  { label: 'Mailing address', value: { kind: 'expandable', text: '1 ORCHARD RD, #02-01, SINGAPORE 238824' } },
]

const AGENT: Field[] = [
  { label: 'Agent-in-charge (Agent ID)', value: 'Albert Tan (102434123)' },
  { label: 'Mobile number', value: { kind: 'link', text: '98123345', href: 'tel:+6598123345' } },
  { label: 'Email address', value: 'albertan@aia.com' },
]

const DOCUMENTS: DocumentRow[] = [
  { name: 'Policy Schedule', type: 'Statement', premium: 'S$245.80', last4: '9111', status: 'success' },
  { name: 'Endorsement', type: 'Statement', premium: 'S$1,250.00', last4: '9111', status: 'rejected' },
]

const PAYMENTS: PaymentRow[] = [
  { date: '20 Feb 2026', type: 'AXS', premium: 'S$245.80', last4: '9111', status: 'success' },
  { date: '15 Jan 2026', type: 'AXS', premium: 'S$1,250.00', last4: '9111', status: 'rejected' },
  { date: '8 Nov 2025', type: 'AXS', premium: 'S$1,250.00', last4: '9111', status: 'rejected' },
  { date: '3 Jan 2025', type: 'AXS', premium: 'S$1,250.00', last4: '9111', status: 'rejected' },
  { date: '22 Aug 2024', type: 'AXS', premium: 'S$1,250.00', last4: '9111', status: 'rejected' },
]

const INSURED_ADULT = {
  title: 'Insured 1 (Adult)',
  fields: [
    { label: 'Name', value: 'CHRIS WONG' },
    { label: 'NRIC/FIN', value: 'S1234567A' },
    { label: 'Date of birth', value: '12/02/1966' },
  ] as Field[],
}

/* ─── Per-product detail pages ─────────────────────────────────────────── */
export const POLICY_DETAILS: PolicyDetailData[] = [
  /* ── UniTravel ── */
  {
    slug: 'unitravel',
    name: 'UniTravel (Single Trip)',
    status: 'in-force',
    statusLabel: 'In force',
    policyNumber: 'DHOPF50050002500',
    policyFields: [
      { label: 'Product', value: 'UniTravel' },
      { label: 'Policy no.', value: 'DHOPF50050002500' },
      { label: 'Plan', value: 'Plus' },
      { label: 'Group type', value: 'Individual' },
      { label: 'Trip type', value: 'Single Trip' },
      { label: 'Destination', value: { kind: 'expandable', text: AREA_1_COUNTRIES } },
      { label: 'Policy effective date', value: '08/10/2026' },
      { label: 'Policy expiry date', value: '13/10/2026' },
      { label: 'Payment method', value: { kind: 'payment', last4: '9111' } },
      { label: 'Payment terms', value: 'Single Payment' },
      { label: 'Premium amount', value: '$265.20' },
      { label: 'Promo code', value: 'None' },
      { label: 'Add-on', value: { kind: 'expandable', text: TRAVEL_ADD_ONS } },
    ],
    policyholderFields: POLICYHOLDER,
    insuredGroups: [INSURED_ADULT],
    documents: DOCUMENTS,
    payments: PAYMENTS,
    paymentsTotal: 10,
    contactFields: CONTACT,
    agentFields: AGENT,
  },

  /* ── UniCar ── */
  {
    slug: 'unicar',
    name: 'UniCar',
    status: 'renewal-due',
    statusLabel: 'Renewal due in 30 days',
    policyNumber: 'PNF320104124A23',
    policyFields: [
      { label: 'Product', value: 'UniCar' },
      { label: 'Policy no.', value: 'PNF320104124A23' },
      { label: 'Plan', value: 'Comprehensive Essential' },
      { label: 'Vehicle no.', value: 'SLM 8821 X' },
      { label: 'Vehicle make & model', value: 'Toyota Corolla Altis 1.6' },
      { label: 'Year of manufacture', value: '2021' },
      { label: 'Policy effective date', value: '13/02/2025' },
      { label: 'Policy expiry date', value: '13/02/2026' },
      { label: 'Payment method', value: { kind: 'payment', last4: '9111' } },
      { label: 'Payment terms', value: 'Annual' },
      { label: 'Premium amount', value: '$1,250.00' },
      { label: 'No-claim discount', value: '30%' },
      { label: 'Excess', value: '$600.00' },
    ],
    policyholderFields: POLICYHOLDER,
    insuredGroups: [
      {
        title: 'Named driver 1',
        fields: [
          { label: 'Name', value: 'CHRIS WONG' },
          { label: 'NRIC/FIN', value: 'S1234567A' },
          { label: 'Date of birth', value: '12/02/1966' },
        ],
      },
    ],
    documents: DOCUMENTS,
    payments: PAYMENTS,
    paymentsTotal: 10,
    contactFields: CONTACT,
    agentFields: AGENT,
  },

  /* ── UniHelper ── */
  {
    slug: 'unihelper',
    name: 'UniHelper',
    status: 'in-force',
    statusLabel: 'In force',
    policyNumber: 'PNF320104124A24',
    policyFields: [
      { label: 'Product', value: 'UniHelper' },
      { label: 'Policy no.', value: 'PNF320104124A24' },
      { label: 'Plan', value: 'Value' },
      { label: 'Helper name', value: 'MARIA SANTOS' },
      { label: 'Work permit no.', value: 'W1234567N' },
      { label: 'Security bond', value: '$5,000.00' },
      { label: 'Policy effective date', value: '02/01/2026' },
      { label: 'Policy expiry date', value: '01/01/2027' },
      { label: 'Payment method', value: { kind: 'payment', last4: '9111' } },
      { label: 'Payment terms', value: 'Annual' },
      { label: 'Premium amount', value: '$35.20' },
      { label: 'Promo code', value: 'None' },
      { label: 'Add-on', value: 'None' },
    ],
    policyholderFields: POLICYHOLDER,
    insuredGroups: [
      {
        title: 'Insured helper',
        fields: [
          { label: 'Name', value: 'MARIA SANTOS' },
          { label: 'Work permit no.', value: 'W1234567N' },
          { label: 'Date of birth', value: '04/07/1992' },
          { label: 'Nationality', value: 'Filipino' },
        ],
      },
    ],
    documents: DOCUMENTS,
    payments: PAYMENTS,
    paymentsTotal: 10,
    contactFields: CONTACT,
    agentFields: AGENT,
  },

  /* ── UniHelper (expired) ── */
  {
    slug: 'unihelper-expired',
    name: 'UniHelper',
    status: 'lapsed',
    statusLabel: 'Expired',
    policyNumber: 'PNF320104124A23',
    policyFields: [
      { label: 'Product', value: 'UniHelper' },
      { label: 'Policy no.', value: 'PNF320104124A23' },
      { label: 'Plan', value: 'Value' },
      { label: 'Helper name', value: 'RINA DEWI' },
      { label: 'Work permit no.', value: 'W7654321N' },
      { label: 'Security bond', value: '$5,000.00' },
      { label: 'Policy effective date', value: '12/11/2025' },
      { label: 'Policy expiry date', value: '15/11/2025' },
      { label: 'Payment method', value: { kind: 'payment', last4: '9111' } },
      { label: 'Payment terms', value: 'Annual' },
      { label: 'Premium amount', value: '$35.20' },
      { label: 'Promo code', value: 'None' },
      { label: 'Add-on', value: 'None' },
    ],
    policyholderFields: POLICYHOLDER,
    insuredGroups: [
      {
        title: 'Insured helper',
        fields: [
          { label: 'Name', value: 'RINA DEWI' },
          { label: 'Work permit no.', value: 'W7654321N' },
          { label: 'Date of birth', value: '18/03/1990' },
          { label: 'Nationality', value: 'Indonesian' },
        ],
      },
    ],
    documents: DOCUMENTS,
    payments: PAYMENTS,
    paymentsTotal: 10,
    contactFields: CONTACT,
    agentFields: AGENT,
  },

  /* ── UniHome ── */
  {
    slug: 'unihome',
    name: 'UniHome',
    status: 'in-force',
    statusLabel: 'In force',
    policyNumber: 'PNF320104124A25',
    policyFields: [
      { label: 'Product', value: 'UniHome' },
      { label: 'Policy no.', value: 'PNF320104124A25' },
      { label: 'Plan', value: 'Premier' },
      { label: 'Property type', value: 'HDB — 4 Room' },
      { label: 'Property address', value: { kind: 'expandable', text: '1 ORCHARD RD, #02-01, SINGAPORE 238824' } },
      { label: 'Sum insured (renovation)', value: '$100,000.00' },
      { label: 'Sum insured (contents)', value: '$50,000.00' },
      { label: 'Policy effective date', value: '01/03/2026' },
      { label: 'Policy expiry date', value: '28/02/2027' },
      { label: 'Payment method', value: { kind: 'payment', last4: '9111' } },
      { label: 'Payment terms', value: 'Annual' },
      { label: 'Premium amount', value: '$180.00' },
      { label: 'Promo code', value: 'None' },
      { label: 'Add-on', value: 'None' },
    ],
    policyholderFields: POLICYHOLDER,
    insuredGroups: [
      {
        title: 'Insured property',
        fields: [
          { label: 'Property address', value: { kind: 'expandable', text: '1 ORCHARD RD, #02-01, SINGAPORE 238824' } },
          { label: 'Property type', value: 'HDB — 4 Room' },
          { label: 'Occupancy', value: 'Owner-occupied' },
        ],
      },
    ],
    documents: DOCUMENTS,
    payments: PAYMENTS,
    paymentsTotal: 10,
    contactFields: CONTACT,
    agentFields: AGENT,
  },

  /* ── Personal Accident ── */
  {
    slug: 'personal-accident',
    name: 'Personal Accident',
    status: 'in-force',
    statusLabel: 'In force',
    policyNumber: 'PNF320104124A26',
    policyFields: [
      { label: 'Product', value: 'Personal Accident' },
      { label: 'Policy no.', value: 'PNF320104124A26' },
      { label: 'Plan', value: 'Enhanced' },
      { label: 'Coverage type', value: 'Individual' },
      { label: 'Accidental death benefit', value: '$200,000.00' },
      { label: 'Medical expenses limit', value: '$10,000.00' },
      { label: 'Policy effective date', value: '01/04/2026' },
      { label: 'Policy expiry date', value: '31/03/2027' },
      { label: 'Payment method', value: { kind: 'payment', last4: '9111' } },
      { label: 'Payment terms', value: 'Annual' },
      { label: 'Premium amount', value: '$120.00' },
      { label: 'Promo code', value: 'None' },
      { label: 'Add-on', value: 'None' },
    ],
    policyholderFields: POLICYHOLDER,
    insuredGroups: [INSURED_ADULT],
    documents: DOCUMENTS,
    payments: PAYMENTS,
    paymentsTotal: 10,
    contactFields: CONTACT,
    agentFields: AGENT,
  },
]

export function getPolicyDetail(slug: string | undefined) {
  return POLICY_DETAILS.find(p => p.slug === slug)
}
