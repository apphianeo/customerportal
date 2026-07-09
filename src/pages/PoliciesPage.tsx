import { useState, useRef, useEffect } from 'react'
import { CartIcon, ChevronRightIcon, ArrowForwardIcon, ChevronDownIcon, ChevronUpIcon } from '../components/icons'
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

import { POLICIES, type PolicyData, type PolicyStatus, type FilterKey } from '../data/policies'

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

/* ─── Recommendation icons — solid filled icons, "Not yet covered" ─ */
function HomeInsuranceIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-[20px]" aria-hidden="true">
      <path d="M10 2L18 9V18H2V9L10 2Z" fill="#005EB8" />
      <rect x="8.75" y="9.5" width="2.5" height="7" fill="white" />
      <rect x="6.5" y="11.75" width="7" height="2.5" fill="white" />
    </svg>
  )
}

function PersonalAccidentIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-[20px]" aria-hidden="true">
      <path d="M10 1.5L17 4V9.5C17 13.5 14 16.8 10 18.5C6 16.8 3 13.5 3 9.5V4L10 1.5Z" fill="#D6DDE8" />
      <circle cx="10" cy="8.3" r="2.4" fill="#1E4B8F" />
      <path d="M10 11.3C7.3 11.3 5.2 12.9 5.2 14.8V15.4C6.8 16.6 8.3 17.4 10 17.9C11.7 17.4 13.2 16.6 14.8 15.4V14.8C14.8 12.9 12.7 11.3 10 11.3Z" fill="#1E4B8F" />
    </svg>
  )
}

function HospitalIconGrad() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-[20px]" aria-hidden="true">
      <rect x="2" y="2" width="16" height="16" rx="3" fill="#005EB8" />
      <rect x="8.9" y="5.2" width="2.2" height="6" fill="white" />
      <rect x="6.9" y="7.2" width="6.2" height="2.2" fill="white" />
      <circle cx="6.7" cy="14.3" r="0.9" fill="white" />
      <circle cx="10" cy="14.3" r="0.9" fill="white" />
      <circle cx="13.3" cy="14.3" r="0.9" fill="white" />
    </svg>
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
    'in-force':    'bg-[#ecfdf5] text-[#08754f]',
    'renewal-due': 'bg-[#fff8ec] text-[#ffa826]',
    'lapsed':      'bg-[#fef2f2] text-[#dc2626]',
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
function PolicyCard({ policy, onSelect }: { policy: PolicyData; onSelect?: (slug: string) => void }) {
  const isRenewal = policy.status === 'renewal-due'

  return (
    <button
      onClick={() => policy.detailSlug ? onSelect?.(policy.detailSlug) : console.log('View policy', policy.id)}
      className={[
        'w-full text-left border-0 cursor-pointer bg-transparent p-0',
        'rounded-[8px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] hover:shadow-pop transition-shadow overflow-hidden',
        isRenewal ? 'border-l-[6px] border-l-[#ffb020]' : '',
      ].join(' ')}
    >
      {/* Header */}
      <div className="bg-white border-b border-[rgba(0,0,0,0.09)] flex items-center justify-between px-[24px] py-[16px] w-full">
        <div className="flex flex-col gap-[4px] items-start">
          <div className="flex gap-[8px] items-center flex-wrap">
            <span className="text-[18px] font-medium text-[#212121] leading-[1.5]">{policy.name}</span>
            <StatusTag status={policy.status} label={policy.statusLabel} />
          </div>
          <span className="text-[14px] text-[#6e6e6e] leading-[1.5]">Policy No: {policy.policyNo}</span>
        </div>
        <ChevronRightIcon size={16} className="shrink-0" style={{ color: '#6E6E6E' }} />
      </div>

      {/* Body — 3-col x 2-row metadata grid */}
      <div className="bg-white p-[24px] w-full">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-[24px] gap-y-[16px] sm:gap-y-[24px]">
          {[
            { label: 'Insured Person(s)', value: policy.insuredPerson },
            { label: 'Coverage Period',   value: policy.coveragePeriod },
            { label: 'Premium Amount',    value: policy.premiumAmount },
            { label: 'Premium Due Date',  value: policy.premiumDueDate },
            { label: 'Recurring Payment', value: policy.recurringPayment },
            { label: 'Payment Method',    value: null },
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
    </button>
  )
}

/* ─── Select dropdown — matches UOI design system Dropdown ───
   Closed: white field, grey border. Open: blue border + 3px blue
   halo, chevron flips to point up, menu below with hover state. */
function SelectDropdown({
  label,
  value,
  options,
  onChange,
  className,
}: {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={rootRef} className={['relative', className || 'w-full sm:w-[320px]'].join(' ')}>
      <div className={open ? 'p-[3px] rounded-[8px] bg-[rgba(0,94,184,0.2)] -m-[3px]' : ''}>
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          className={[
            'flex items-center gap-[8px] bg-white border border-solid rounded-[8px] px-[16px] py-[12px] w-full cursor-pointer',
            open ? 'border-[#005eb8]' : 'border-[rgba(0,0,0,0.09)]',
          ].join(' ')}
        >
          <span className="text-[16px] text-[#949494] whitespace-nowrap">{label}:</span>
          <span className="flex-1 text-[16px] text-[#212121] text-left truncate">{value}</span>
          {open
            ? <ChevronUpIcon size={12} className="shrink-0" style={{ color: '#005eb8' }} />
            : <ChevronDownIcon size={12} className="shrink-0" style={{ color: '#6E6E6E' }} />}
        </button>
      </div>
      {open && (
        <div className="absolute z-20 top-full mt-[8px] left-0 right-0 bg-white rounded-[8px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] overflow-hidden max-h-[260px] overflow-y-auto">
          {options.map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setOpen(false) }}
              className={[
                'w-full text-left p-[12px] text-[16px] text-[#212121] cursor-pointer border-0 transition-colors',
                opt === value ? 'bg-[#f6f8fc]' : 'bg-white hover:bg-[#f6f8fc] transition-colors',
              ].join(' ')}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── Not Yet Covered — recommendation cards ─────────────── */
type RecommendationItem = {
  key: string
  image: string
  icon: React.ReactNode
  title: string
  price: string
  description: string
}

const RECOMMENDATIONS: RecommendationItem[] = [
  {
    key: 'home',
    image: recHome,
    icon: <HomeInsuranceIcon />,
    title: 'Home Insurance',
    price: 'From $X/year',
    description: 'Protect your home and loved ones from unforeseen events.',
  },
  {
    key: 'accident',
    image: recAccident,
    icon: <PersonalAccidentIcon />,
    title: 'Personal Accident',
    price: 'From $X/year',
    description: 'Get medical coverage for accidents and have peace of mind.',
  },
  {
    key: 'hospital',
    image: recHospital,
    icon: <HospitalIconGrad />,
    title: 'Hospital Protection',
    price: 'From $X/year',
    description: 'Cover day-to-day hospital expenses when you need it most.',
  },
]

function RecommendationCard({ item }: { item: RecommendationItem }) {
  return (
    <div className="flex h-[143px] rounded-[8px] overflow-hidden shadow-[0px_1px_2px_rgba(0,0,0,0.05)] hover:shadow-pop transition-shadow">
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
        <button className="flex items-center gap-1.5 text-[14px] font-medium text-[#005eb8] bg-transparent border-0 cursor-pointer p-0">
          Get Quote
          <ArrowForwardIcon size={12} />
        </button>
      </div>
    </div>
  )
}

/* ─── Status / date-range filter options ─────────────────── */
const STATUS_LABELS: Record<PolicyStatus, string> = {
  'in-force':    'In Force',
  'renewal-due': 'Renewal Due',
  'lapsed':      'Lapsed',
}
const STATUS_OPTIONS = ['All', 'In Force', 'Renewal Due', 'Lapsed']

function coverageStartDate(period: string): Date | null {
  const match = period.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/)
  if (!match) return null
  const [, day, month, year] = match
  return new Date(Number(year), Number(month) - 1, Number(day))
}

const DATE_RANGE_OPTIONS = ['All Time', 'Past 1 Year', 'Past 2 Years', 'Past 3 Years']

function yearsBackFor(label: string): number | null {
  switch (label) {
    case 'Past 1 Year':  return 1
    case 'Past 2 Years': return 2
    case 'Past 3 Years': return 3
    default:              return null
  }
}

/* ─── Main page ──────────────────────────────────────────── */
type Props = {
  onSelectPolicy?: (slug: string) => void
}

export default function PoliciesPage({ onSelectPolicy }: Props) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')
  const [statusFilter, setStatusFilter] = useState('All')
  const [dateRangeFilter, setDateRangeFilter] = useState('All Time')

  const countFor = (key: FilterKey) =>
    key === 'all' ? POLICIES.length : POLICIES.filter(p => p.category === key).length

  const visible = POLICIES.filter(p => {
    if (activeFilter !== 'all' && p.category !== activeFilter) return false
    if (statusFilter !== 'All' && STATUS_LABELS[p.status] !== statusFilter) return false
    const yearsBack = yearsBackFor(dateRangeFilter)
    if (yearsBack !== null) {
      const startDate = coverageStartDate(p.coveragePeriod)
      if (startDate) {
        const cutoff = new Date()
        cutoff.setFullYear(cutoff.getFullYear() - yearsBack)
        if (startDate < cutoff) return false
      }
    }
    return true
  })

  const hasActiveFilters = activeFilter !== 'all' || statusFilter !== 'All' || dateRangeFilter !== 'All Time'

  function clearFilters() {
    setActiveFilter('all')
    setStatusFilter('All')
    setDateRangeFilter('All Time')
  }

  return (
    <div className="bg-bg-page min-h-full">
      <div className="w-full max-w-[980px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-[32px]">

        {/* ── Breadcrumbs ── */}
        <div className="flex items-center gap-[4px]">
          <span className="text-[12px] text-[#8d8d8d] leading-[1.4]">Dashboard</span>
          <ChevronRightIcon size={10} style={{ color: '#6E6E6E' }} />
          <span className="text-[12px] font-bold text-[#005eb8] leading-[1.4]">Policies</span>
        </div>

        {/* ── Title row ── */}
        <div className="flex items-center gap-[12px]">
          <h1 className="flex-1 text-[32px] font-bold text-[#212121] leading-[1.2] m-0">Policies</h1>
          <button className="flex items-center gap-[8px] bg-[#005eb8] text-white font-medium text-[16px] leading-[1.5] px-[16px] py-[12px] rounded-[8px] border-0 cursor-pointer shadow-[0px_1px_2px_rgba(0,0,0,0.05)] shrink-0">
            Buy Policy
            <CartIcon size={20} />
          </button>
        </div>

        {/* ── Filter pills, date/status filters, and policy cards — 24px rhythm ── */}
        <div className="flex flex-col gap-[24px]">

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
                    'shrink-0 whitespace-nowrap cursor-pointer transition-colors',
                    isActive ? 'bg-primary text-white font-medium border-0' : 'bg-white border border-[rgba(0,0,0,0.09)] text-[#6e6e6e]',
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
                      : 'bg-white border-[rgba(0,0,0,0.09)] cursor-pointer',
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

        {/* ── Date range / status filters ── */}
        <div className="flex flex-col sm:flex-row gap-[16px] items-start sm:items-center w-full">
          <SelectDropdown label="Date Range" value={dateRangeFilter} options={DATE_RANGE_OPTIONS} onChange={setDateRangeFilter} className="w-full sm:w-[320px]" />
          <SelectDropdown label="Status" value={statusFilter} options={STATUS_OPTIONS} onChange={setStatusFilter} className="w-full sm:w-[320px]" />
          <button
            onClick={clearFilters}
            disabled={!hasActiveFilters}
            className={[
              'text-[16px] font-medium bg-transparent border-0 h-[32px]',
              hasActiveFilters ? 'text-[#005eb8] cursor-pointer' : 'text-[#bdbdbd] cursor-not-allowed',
            ].join(' ')}
          >
            Clear Filter
          </button>
        </div>

        {/* ── Policy cards ── */}
        <div className="flex flex-col gap-[24px]">
          {visible.length === 0 ? (
            <p className="text-sm text-[#8d8d8d] py-4 text-center">No policies in this category.</p>
          ) : (
            visible.map(policy => <PolicyCard key={policy.id} policy={policy} onSelect={onSelectPolicy} />)
          )}
        </div>

        </div>

        {/* ── Disclaimer ── */}
        <p className="text-[14px] text-[#212121] leading-[1.5] m-0">
          The policy overview includes only active policies and those inactive for 180 days. If you can't find a policy, reach out to us at{' '}
          <a href="mailto:help@uoi.com.sg" className="text-[#005eb8] hover:underline">
            help@uoi.com.sg
          </a>
          .
        </p>

        {/* ── Divider ── */}
        <div className="h-px bg-border-default opacity-50" />

        {/* ── Not yet covered ── */}
        <div className="flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[4px]">
            <h2 className="text-[18px] font-bold text-[#212121] m-0 leading-[1.5]">Not yet covered?</h2>
            <p className="text-[14px] text-[#6e6e6e] leading-[1.5] m-0">
              You might be missing critical coverage. Here's what we recommend based on your profile.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
            {RECOMMENDATIONS.map(item => (
              <RecommendationCard key={item.key} item={item} />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
