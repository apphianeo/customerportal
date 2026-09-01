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
    coveragePeriod: '13/02/2025 - 13/02/2026 (12 Months)',
    detailSlug: 'unicar',
    premiumAmount: '$265.20',
    premiumDueDate: 'NA (Non-Renewal)',
    recurringPayment: 'No (Non-Renewal)',
    paymentMethod: 'mastercard',
    cardLast4: '9111',
  },
  {
    id: '2',
    name: 'UniTravel',
    policyNo: 'PNF320104124A23',
    status: 'in-force',
    statusLabel: 'In force',
    category: 'travel',
    insuredPerson: 'Chris Wong',
    coveragePeriod: '08/04/2026 - 13/04/2026 (6 Days)',
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
    coveragePeriod: '02/01/2026 - 01/01/2027 (12 Months)',
    detailSlug: 'unihelper',
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
    detailSlug: 'unihelper-expired',
    premiumAmount: '$35.20',
    premiumDueDate: 'NA (Non-Renewal)',
    recurringPayment: 'No (Non-Renewal)',
    paymentMethod: 'mastercard',
    cardLast4: '9111',
  },
]
