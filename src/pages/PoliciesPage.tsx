import { useState } from 'react'
import { ShoppingCartOutlined, RightOutlined, ArrowRightOutlined } from '@ant-design/icons'
import recHome     from '../assets/rec-home.png'
import recAccident from '../assets/rec-accident.png'
import recHospital from '../assets/rec-hospital.png'
import iconMotor      from '../assets/icon-motor.svg'
import iconTravel     from '../assets/icon-travel.svg'
import iconHelperBody from '../assets/icon-helper-body.svg'
import iconHelperHead from '../assets/icon-helper-head.svg'
import iconHome       from '../assets/icon-home.svg'
import iconHospital   from '../assets/icon-hospital.svg'
import iconAccident1  from '../assets/icon-accident-1.svg'
import iconAccident2  from '../assets/icon-accident-2.svg'

/* ─── Types ─────────────────────────────────────────────── */
type PolicyStatus = 'in-force' | 'renewal-due' | 'expired'
type FilterKey = 'all' | 'motor' | 'travel' | 'helper' | 'home' | 'hospital' | 'accident'

type PolicyData = {
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
}

/* ─── Data ───────────────────────────────────────────────── */
const POLICIES: PolicyData[] = [
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
]

/* ─── Filter icon components ─────────────────────────────── */
function MotorIcon() {
  return (
    <div className="flex items-center justify-center shrink-0 size-[20px]">
      <img src={iconMotor} alt="" aria-hidden="true" style={{ width: 15, height: 13.333 }} />
    </div>
  )
}
function TravelIcon() {
  return (
    <div className="flex items-center justify-center shrink-0 size-[20px]">
      <img src={iconTravel} alt="" aria-hidden="true" style={{ width: 15, height: 14.979 }} />
    </div>
  )
}
function HelperIcon() {
  return (
    <div className="overflow-hidden relative shrink-0 size-[20px]">
      <div className="absolute" style={{ inset: '55.96% 8.34% 12.49% 12.5%' }}>
        <img src={iconHelperBody} alt="" aria-hidden="true" className="absolute inset-0 size-full max-w-none" />
      </div>
      <div className="absolute" style={{ inset: '8.33% 30.2% 32.29% 34.35%' }}>
        <img src={iconHelperHead} alt="" aria-hidden="true" className="absolute inset-0 size-full max-w-none" />
      </div>
    </div>
  )
}
function HomeIconFilter() {
  return (
    <div className="flex items-center justify-center shrink-0 size-[20px]">
      <img src={iconHome} alt="" aria-hidden="true" style={{ width: 13.333, height: 15 }} />
    </div>
  )
}
function HospitalIcon() {
  return (
    <div className="flex items-center justify-center shrink-0 size-[20px]">
      <img src={iconHospital} alt="" aria-hidden="true" style={{ width: 15, height: 15 }} />
    </div>
  )
}
function AccidentIcon() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <div className="absolute" style={{ width: 5.183, height: 6.492, left: 'calc(50% - 5.74px)', top: 'calc(50% + 4.91px)', transform: 'translate(-50%, -50%)' }}>
        <img src={iconAccident1} alt="" aria-hidden="true" className="absolute inset-0 size-full max-w-none" />
      </div>
      <div className="absolute" style={{ width: 11.833, height: 15, left: 5.42, top: 2.08 }}>
        <img src={iconAccident2} alt="" aria-hidden="true" className="absolute inset-0 size-full max-w-none" />
      </div>
    </div>
  )
}

type FilterOption = { key: FilterKey; label: string; icon?: React.ReactNode }
const FILTERS: FilterOption[] = [
  { key: 'all',      label: 'All' },
  { key: 'motor',    label: 'Motor',               icon: <MotorIcon /> },
  { key: 'travel',   label: 'Travel',              icon: <TravelIcon /> },
  { key: 'helper',   label: 'Helper',              icon: <HelperIcon /> },
  { key: 'home',     label: 'Home',                icon: <HomeIconFilter /> },
  { key: 'hospital', label: 'Hospital Protection', icon: <HospitalIcon /> },
  { key: 'accident', label: 'Personal Accident',   icon: <AccidentIcon /> },
]

/* ─── Status tag ─────────────────────────────────────────── */
function StatusTag({ status, label }: { status: PolicyStatus; label: string }) {
  const styles: Record<PolicyStatus, string> = {
    'in-force':    'bg-[#ecfdf5] text-[#065f46]',
    'renewal-due': 'bg-[#fff8ec] text-[#ffa826]',
    'expired':     'bg-[#f5f5f5] text-[#6e6e6e]',
  }
  return (
    <span className={`inline-flex items-center px-[8px] py-[2px] rounded-[12px] text-xs font-medium leading-[1.4] ${styles[status]}`}>
      {label}
    </span>
  )
}

/* ─── Mastercard icon ────────────────────────────────────── */
function MastercardIcon() {
  return (
    <svg width="25" height="20" viewBox="0 0 152 108" fill="none" aria-hidden="true">
      <rect width="152" height="108" rx="6" fill="white" />
      <rect x="0.5" y="0.5" width="151" height="107" rx="5.5" stroke="black" strokeOpacity="0.09" />
      <circle cx="60" cy="54" r="36" fill="#EB001B" />
      <circle cx="92" cy="54" r="36" fill="#F79E1B" />
      <path d="M76 27.4c7.3 5.5 12 14.1 12 23.8s-4.7 18.3-12 23.8c-7.3-5.5-12-14.1-12-23.8S68.7 32.9 76 27.4z" fill="#FF5F00" />
    </svg>
  )
}

/* ─── Policy card ────────────────────────────────────────── */
function PolicyCard({ policy }: { policy: PolicyData }) {
  const isRenewal = policy.status === 'renewal-due'

  return (
    <div className="bg-white rounded-[8px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] flex items-stretch overflow-hidden">
      {/* Amber accent bar — renewal only */}
      {isRenewal && <div className="w-[6px] bg-[#ffb020] shrink-0 self-stretch" />}

      {/* Card body */}
      <div className={[
        'flex flex-1 gap-[12px] items-start min-w-0',
        isRenewal ? 'pl-[18px] pr-[24px] py-[24px]' : 'p-[24px]',
      ].join(' ')}>
        {/* Left — details */}
        <div className="flex flex-1 flex-col gap-[24px] min-w-0">
          {/* Name + status tag + policy number */}
          <div className="flex flex-col gap-[4px]">
            <div className="flex gap-[8px] items-center flex-wrap">
              <span className="text-[18px] font-medium text-[#212121] leading-[1.5]">{policy.name}</span>
              <StatusTag status={policy.status} label={policy.statusLabel} />
            </div>
            <span className="text-[14px] text-[#6e6e6e] leading-[1.5]">Policy No: {policy.policyNo}</span>
          </div>

          {/* 3-col metadata grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-[24px] gap-y-[16px]">
            {[
              { label: 'Insured Person(s)',  value: policy.insuredPerson },
              { label: 'Coverage Period',    value: policy.coveragePeriod },
              { label: 'Premium Amount',     value: policy.premiumAmount },
              { label: 'Premium Due Date',   value: policy.premiumDueDate },
              { label: 'Recurring Payment',  value: policy.recurringPayment },
              { label: 'Payment Method',     value: null },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-[4px]">
                <span className="text-[14px] text-[#6e6e6e] leading-[1.5]">{label}</span>
                {value !== null ? (
                  <span className="text-[16px] text-[#212121] leading-[1.5]">{value}</span>
                ) : (
                  <div className="flex items-center gap-[8px]">
                    <div className="border border-[rgba(0,0,0,0.09)] rounded-[2px] px-[4px] py-[2px] flex items-center justify-center">
                      <MastercardIcon />
                    </div>
                    <span className="text-[16px] text-[#212121] leading-[1.5]">****{policy.cardLast4}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right — action buttons */}
        <div className="flex flex-col gap-[8px] shrink-0 w-[160px]">
          {isRenewal && (
            <button className="w-full bg-[#005eb8] text-white font-medium text-[16px] leading-[1.5] px-[16px] py-[12px] rounded-[8px] border-0 cursor-pointer hover:bg-[#004e9a] transition-colors text-center">
              Renew
            </button>
          )}
          <button className="w-full border border-[#005eb8] text-[#005eb8] font-medium text-[16px] leading-[1.5] px-[16px] py-[12px] rounded-[8px] bg-white cursor-pointer hover:bg-[#f0f7ff] transition-colors text-center">
            Submit Claim
          </button>
          <button className="w-full text-[#005eb8] font-medium text-[16px] leading-[1.5] h-[32px] bg-transparent border-0 cursor-pointer hover:opacity-80 transition-opacity text-center flex items-center justify-center">
            View Policy
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Not Yet Covered card ───────────────────────────────── */
type RecommendationItem = {
  image: string
  icon: React.ReactNode
  title: string
  price: string
  description: string
}

const RECOMMENDATIONS: RecommendationItem[] = [
  {
    image: recHome,
    icon: (
      <div className="flex items-center justify-center size-[20px]">
        <img src={iconHome} alt="" aria-hidden="true" style={{ width: 13.333, height: 15 }} />
      </div>
    ),
    title: 'Home Insurance',
    price: 'From $X/year',
    description: 'Protect your home and loved ones from unforeseen events.',
  },
  {
    image: recAccident,
    icon: (
      <div className="relative size-[20px]">
        <div className="absolute" style={{ width: 5.183, height: 6.492, left: 'calc(50% - 5.74px)', top: 'calc(50% + 4.91px)', transform: 'translate(-50%, -50%)' }}>
          <img src={iconAccident1} alt="" aria-hidden="true" className="absolute inset-0 size-full max-w-none" />
        </div>
        <div className="absolute" style={{ width: 11.833, height: 15, left: 5.42, top: 2.08 }}>
          <img src={iconAccident2} alt="" aria-hidden="true" className="absolute inset-0 size-full max-w-none" />
        </div>
      </div>
    ),
    title: 'Personal Accident',
    price: 'From $X/year',
    description: 'Get coverage for accidents and have peace of mind.',
  },
  {
    image: recHospital,
    icon: (
      <div className="flex items-center justify-center size-[20px]">
        <img src={iconHospital} alt="" aria-hidden="true" style={{ width: 15, height: 15 }} />
      </div>
    ),
    title: 'Hospital Protection',
    price: 'From $X/year',
    description: 'Cover day-to-day hospital expenses when you need it most.',
  },
]

function RecommendationCard({ item }: { item: RecommendationItem }) {
  return (
    <div className="flex h-[143px] rounded-[8px] overflow-hidden shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
      <div className="w-[120px] shrink-0 h-full">
        <img src={item.image} alt="" aria-hidden="true" className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 bg-white p-[16px] flex flex-col gap-[12px] justify-center min-w-0">
        <div className="flex flex-col gap-[4px]">
          <div className="flex items-center justify-between gap-[12px]">
            <div className="flex items-center gap-[12px] min-w-0">
              <div className="flex items-center justify-center size-[32px] rounded-[8px] shrink-0"
                style={{ background: 'linear-gradient(90deg, rgba(0,94,184,0.1) 0.618%, rgba(92,85,235,0.1) 100%)' }}>
                {item.icon}
              </div>
              <span className="text-[16px] font-medium text-[#212121] leading-[1.5] whitespace-nowrap">{item.title}</span>
            </div>
            <span className="text-[12px] text-[#6e6e6e] leading-[1.4] shrink-0 whitespace-nowrap">{item.price}</span>
          </div>
          <p className="text-[14px] text-[#6e6e6e] leading-[1.5]">{item.description}</p>
        </div>
        <button className="flex items-center gap-1.5 text-[14px] font-medium text-[#005eb8] bg-transparent border-0 cursor-pointer p-0 hover:opacity-80 transition-opacity">
          Get Quote
          <ArrowRightOutlined style={{ fontSize: 12 }} />
        </button>
      </div>
    </div>
  )
}

/* ─── Main page ──────────────────────────────────────────── */
export default function PoliciesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')

  const countFor = (key: FilterKey) =>
    key === 'all' ? POLICIES.length : POLICIES.filter(p => p.category === key).length

  const visible = activeFilter === 'all'
    ? POLICIES
    : POLICIES.filter(p => p.category === activeFilter)

  return (
    <div className="bg-bg-page min-h-full">
      <div className="w-full max-w-[980px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-[32px]">

        {/* ── Breadcrumbs ── */}
        <div className="flex items-center gap-[4px]">
          <span className="text-[12px] text-[#8d8d8d] leading-[1.4]">Dashboard</span>
          <RightOutlined style={{ fontSize: 10, color: '#8d8d8d' }} />
          <span className="text-[12px] font-bold text-[#005eb8] leading-[1.4]">Policies</span>
        </div>

        {/* ── Title row ── */}
        <div className="flex items-center gap-[12px]">
          <h1 className="flex-1 text-[32px] font-bold text-[#212121] leading-[1.2] m-0">Policies</h1>
          <button className="flex items-center gap-[8px] bg-[#005eb8] text-white font-medium text-[16px] leading-[1.5] px-[16px] py-[12px] rounded-[8px] border-0 cursor-pointer hover:bg-[#004e9a] transition-colors shadow-[0px_1px_2px_rgba(0,0,0,0.05)] shrink-0">
            Buy Policy
            <ShoppingCartOutlined style={{ fontSize: 20 }} />
          </button>
        </div>

        {/* ── Filter pills ── */}
        <div className="flex gap-[12px] overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
          {FILTERS.map(({ key, label, icon }) => {
            const count = countFor(key)
            const isActive = activeFilter === key
            const isEmpty = count === 0 && key !== 'all'

            if (key === 'all') {
              return (
                <button
                  key="all"
                  onClick={() => setActiveFilter('all')}
                  className={[
                    'flex items-center justify-center px-[20px] py-[8px] rounded-[24px]',
                    'shrink-0 whitespace-nowrap border-0 cursor-pointer transition-colors',
                    isActive ? 'bg-primary text-white font-medium' : 'bg-white border border-[rgba(0,0,0,0.09)] text-[#6e6e6e]',
                  ].join(' ')}
                >
                  <span className="text-sm leading-[1.5]">{label}</span>
                </button>
              )
            }

            return (
              <button
                key={key}
                onClick={() => !isEmpty && setActiveFilter(key)}
                disabled={isEmpty}
                className={[
                  'flex items-center gap-[8px] px-[12px] py-[8px] rounded-[24px]',
                  'shrink-0 whitespace-nowrap border transition-colors',
                  isActive
                    ? 'bg-primary border-primary cursor-pointer [&_img]:brightness-0 [&_img]:invert'
                    : isEmpty
                      ? 'bg-[#f5f5f5] border-[rgba(0,0,0,0.09)] cursor-not-allowed'
                      : 'bg-white border-[rgba(0,0,0,0.09)] hover:border-primary cursor-pointer',
                ].join(' ')}
              >
                {icon}
                <span className="flex items-center gap-[4px] text-sm leading-[1.5]">
                  <span className={isActive ? 'text-white font-medium' : isEmpty ? 'text-[#9e9e9e]' : 'text-[#6e6e6e]'}>
                    {label}
                  </span>
                  <span className={isActive ? 'text-white/80' : isEmpty ? 'text-[#9e9e9e]' : 'text-[#8d8d8d]'}>
                    ({count})
                  </span>
                </span>
              </button>
            )
          })}
        </div>

        {/* ── Policy cards ── */}
        <div className="flex flex-col gap-[24px]">
          {visible.length === 0 ? (
            <p className="text-sm text-[#8d8d8d] py-4 text-center">No policies in this category.</p>
          ) : (
            visible.map(policy => <PolicyCard key={policy.id} policy={policy} />)
          )}
        </div>

        {/* ── Unable to find policy ── */}
        <p className="text-[14px] text-[#6e6e6e] leading-[1.5]">
          Unable to find a policy? Please contact us at{' '}
          <a href="mailto:help@uoi.com.sg" className="text-[#005eb8] hover:underline">
            help@uoi.com.sg
          </a>
          .
        </p>

        {/* ── Not yet covered ── */}
        <div className="flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[4px]">
            <h2 className="text-[18px] font-bold text-[#212121] m-0 leading-[1.5]">🛡️ Not yet covered?</h2>
            <p className="text-[14px] text-[#6e6e6e] leading-[1.5] m-0">
              You might be missing critical coverage. Here's what we recommend based on your profile.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
            {RECOMMENDATIONS.map(item => (
              <RecommendationCard key={item.title} item={item} />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
