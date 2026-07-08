export type PolicyStatus = 'in-force' | 'renewal-due' | 'lapsed'
export type FilterKey = 'all' | 'motor' | 'travel' | 'helper' | 'home' | 'hospital' | 'accident'

export type PolicyData = {
  id: string
  name: string
  policyNo: string
  status: PolicyStatus
  statusLabel: string
  category: FilterKey
  insuredPerson: string
  coveragePeriod: string
  premiumAmount: string
  premiumDueDate: string
  recurringPayment: string
  paymentMethod: string
  cardLast4: string
  detailSlug?: string
}

export const POLICIES: PolicyData[] = [
  {
    id: '1',
    name: 'UniCar',
    policyNo: 'PNF320104124A23',
    status: 'renewal-due',
    statusLabel: 'Renewal Due in 30 Days',
    category: 'motor',
    insuredPerson: 'Chris Wong',
    coveragePeriod: '12/12/2026 - 15/12/2026',
    premiumAmount: '$265.20',
    premiumDueDate: 'NA (Non-Renewal)',
    recurringPayment: 'No (Non-Renewal)',
    paymentMethod: 'mastercard',
    cardLast4: '9111',
  },
  {
    id: '2',
    name: 'UniTravel (Single Trip)',
    policyNo: 'PNF320104124A23',
    status: 'in-force',
    statusLabel: 'In Force',
    category: 'travel',
    insuredPerson: 'Chris Wong',
    coveragePeriod: '8/10/2026 - 13/10/2026',
    premiumAmount: '$265.20',
    premiumDueDate: 'NA (Non-Renewal)',
    recurringPayment: 'No (Non-Renewal)',
    paymentMethod: 'mastercard',
    cardLast4: '9111',
    detailSlug: 'unitravel',
  },
  {
    id: '3',
    name: 'UniHelper',
    policyNo: 'PNF320104124A23',
    status: 'in-force',
    statusLabel: 'In Force',
    category: 'helper',
    insuredPerson: 'Chris Wong',
    coveragePeriod: '12/11/2026 - 15/11/2026',
    premiumAmount: '$35.20',
    premiumDueDate: 'NA (Non-Renewal)',
    recurringPayment: 'No (Non-Renewal)',
    paymentMethod: 'mastercard',
    cardLast4: '9111',
  },
  {
    id: '4',
    name: 'UniHelper',
    policyNo: 'PNF320104124A23',
    status: 'lapsed',
    statusLabel: 'Lapsed',
    category: 'helper',
    insuredPerson: 'Chris Wong',
    coveragePeriod: '12/11/2025 - 15/11/2025',
    premiumAmount: '$35.20',
    premiumDueDate: 'NA (Non-Renewal)',
    recurringPayment: 'No (Non-Renewal)',
    paymentMethod: 'mastercard',
    cardLast4: '9111',
  },
]
