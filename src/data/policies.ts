export type PolicyStatus = 'in-force' | 'renewal-due' | 'lapsed'
export type FilterKey = 'all' | 'motor' | 'travel' | 'helper' | 'home' | 'accident'

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
    statusLabel: 'Renewal due in 30 days',
    category: 'motor',
    insuredPerson: 'Chris Wong',
    coveragePeriod: '13/2/2025 - 13/2/2026 (12 Months)',
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
    statusLabel: 'In force',
    category: 'travel',
    insuredPerson: 'Chris Wong',
    coveragePeriod: '8/4/2026 - 13/4/2026 (6 Days)',
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
    statusLabel: 'In force',
    category: 'helper',
    insuredPerson: 'Chris Wong',
    coveragePeriod: '2/1/2026 - 1/1/2027 (12 Months)',
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
    statusLabel: 'Expired',
    category: 'helper',
    insuredPerson: 'Chris Wong',
    coveragePeriod: '12/11/2025 - 15/11/2025 (12 Months)',
    premiumAmount: '$35.20',
    premiumDueDate: 'NA (Non-Renewal)',
    recurringPayment: 'No (Non-Renewal)',
    paymentMethod: 'mastercard',
    cardLast4: '9111',
  },
]
