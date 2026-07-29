import { useState } from 'react'
import { CartIcon, ChevronRightIcon, ArrowForwardIcon } from '../components/icons'
import recHome     from '../assets/rec-home.png'
import recAccident from '../assets/rec-accident.png'
import iconMotor      from '../assets/icon-motor.svg'
import iconTravel     from '../assets/icon-travel.svg'
import iconHelperBody from '../assets/icon-helper-body.svg'
import iconHelperHead from '../assets/icon-helper-head.svg'
import iconHome       from '../assets/icon-home.svg'
import iconAccident1  from '../assets/icon-accident-1.svg'
import iconAccident2  from '../assets/icon-accident-2.svg'

import { POLICIES, type PolicyData, type PolicyStatus, type FilterKey } from '../data/policies'
import { BUY_POLICY_URL } from '../components/dashboard/QuickActions'

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

type FilterOption = { key: FilterKey; label: string; icon?: React.ReactNode }
const FILTERS: FilterOption[] = [
  { key: 'all',      label: 'All' },
  { key: 'motor',    label: 'Motor',             icon: <MotorIcon /> },
  { key: 'travel',   label: 'Travel',            icon: <TravelIcon /> },
  { key: 'helper',   label: 'Helper',            icon: <HelperIcon /> },
  { key: 'home',     label: 'Home',              icon: <HomeIconFilter /> },
  { key: 'accident', label: 'Personal Accident', icon: <AccidentIcon /> },
]

/* ─── Status tag ─────────────────────────────────────────── */
function StatusTag({ status, label }: { status: PolicyStatus; label: string }) {
  const styles: Record<PolicyStatus, string> = {
    'in-force':    'bg-[#ecfdf5] text-[#08754f]',
    'renewal-due': 'bg-[#fff8ec] text-[#ffa826]',
    'lapsed':      'bg-[#fef2f2] text-[#dc2626]',
  }
  return (
    <span className={`inline-flex items-center px-[8px] py-[4px] rounded-[12px] text-xs font-medium leading-[1.4] ${styles[status]}`}>
      {label}
    </span>
  )
}

/* ─── Policy card — name + tag, divider, labelled rows ───── */
function PolicyCard({ policy, onSelect }: { policy: PolicyData; onSelect?: (slug: string) => void }) {
  return (
    <button
      onClick={() => policy.detailSlug ? onSelect?.(policy.detailSlug) : console.log('View policy', policy.id)}
      className="w-full text-left border-0 cursor-pointer bg-white rounded-[8px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] hover:shadow-pop transition-shadow overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-[8px] px-[24px] py-[16px]">
        <div className="flex items-center gap-[8px] flex-wrap flex-1 min-w-0">
          <span className="text-[16px] font-medium text-[#212121] leading-[1.5]">{policy.name}</span>
          <StatusTag status={policy.status} label={policy.statusLabel} />
        </div>
        <ChevronRightIcon size={20} className="shrink-0" style={{ color: '#6E6E6E' }} />
      </div>

      {/* Divider */}
      <div className="h-px bg-[rgba(0,0,0,0.09)] mx-[24px]" />

      {/* Labelled rows */}
      <div className="flex flex-col gap-[12px] px-[24px] py-[16px]">
        <DetailRow label="Policy no." value={policy.policyNo} />
        <DetailRow label="Coverage period" value={policy.coveragePeriod} />
      </div>
    </button>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-[8px] text-[14px] leading-[1.5]">
      <span className="w-[120px] sm:w-[142px] shrink-0 text-[#6e6e6e]">{label}</span>
      <span className="flex-1 min-w-0 text-[#212121]">{value}</span>
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
    description: 'Protect your home and loved ones from unforeseen events',
  },
  {
    key: 'accident',
    image: recAccident,
    icon: <PersonalAccidentIcon />,
    title: 'Personal Accident',
    price: 'From $X/year',
    description: 'Get medical coverage for accidents and have peace of mind',
  },
]

function RecommendationCard({ item }: { item: RecommendationItem }) {
  // Height follows the content — the fixed 143px cropped text on narrow screens
  return (
    <div className="flex min-h-[143px] rounded-[8px] overflow-hidden shadow-[0px_1px_2px_rgba(0,0,0,0.05)] hover:shadow-pop transition-shadow">
      <div className="w-[96px] sm:w-[120px] shrink-0">
        <img src={item.image} alt="" aria-hidden="true" className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 bg-white p-[16px] flex flex-col gap-[12px] justify-center min-w-0">
        <div className="flex flex-col gap-[4px]">
          {/* Title and price share a row when there's room, and stack when there isn't */}
          <div className="flex flex-wrap items-center justify-between gap-x-[12px] gap-y-[4px]">
            <div className="flex items-center gap-[12px] min-w-0">
              <div className="flex items-center justify-center size-[32px] rounded-[8px] shrink-0"
                style={{ background: 'linear-gradient(90deg, rgba(0,94,184,0.1) 0.618%, rgba(92,85,235,0.1) 100%)' }}>
                {item.icon}
              </div>
              <span className="text-[16px] font-medium text-[#212121] leading-[1.5]">{item.title}</span>
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

/* ─── Main page ──────────────────────────────────────────── */
type Props = {
  onSelectPolicy?: (slug: string) => void
}

export default function PoliciesPage({ onSelectPolicy }: Props) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')

  const countFor = (key: FilterKey) =>
    key === 'all' ? POLICIES.length : POLICIES.filter(p => p.category === key).length

  const visible = activeFilter === 'all'
    ? POLICIES
    : POLICIES.filter(p => p.category === activeFilter)

  return (
    <div className="bg-bg-page min-h-full">
      <div className="w-full max-w-[1044px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-[32px]">

        {/* ── Breadcrumbs ── */}
        <div className="flex items-center gap-[4px]">
          <span className="text-[12px] text-[#8d8d8d] leading-[1.4]">Dashboard</span>
          <ChevronRightIcon size={10} style={{ color: '#6E6E6E' }} />
          <span className="text-[12px] font-semibold text-[#005eb8] leading-[1.4]">Policies</span>
        </div>

        {/* ── Title row ── */}
        <div className="flex items-center gap-[12px]">
          <h1 className="flex-1 text-[32px] font-semibold text-[#212121] leading-[1.2] m-0">Policies</h1>
          <a
            href={BUY_POLICY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-[8px] bg-[#005eb8] text-white font-medium text-[16px] leading-[1.5] px-[16px] py-[12px] rounded-[8px] border-0 cursor-pointer shadow-[0px_1px_2px_rgba(0,0,0,0.05)] shrink-0"
          >
            Buy Policy
            <CartIcon size={20} />
          </a>
        </div>

        {/* ── Filter pills + policy cards ── */}
        <div className="flex flex-col gap-[24px]">

          {/* Filter pills */}
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

          {/* Policy cards */}
          <div className="flex flex-col gap-[24px]">
            {visible.length === 0 ? (
              <p className="text-sm text-[#8d8d8d] py-4 text-center">No policies in this category</p>
            ) : (
              visible.map(policy => <PolicyCard key={policy.id} policy={policy} onSelect={onSelectPolicy} />)
            )}
          </div>

        </div>

        {/* ── Disclaimer ── */}
        <p className="text-[14px] text-[#212121] leading-[1.5] m-0">
          The policy overview includes only active policies and those inactive for 180 days. If you can't find a policy, please contact us{' '}
          <a href="https://api.whatsapp.com/send/?phone=6580814843&text&type=phone_number&app_absent=0" className="text-[#005eb8] hover:underline">here</a>.
        </p>

        {/* ── Divider ── */}
        <div className="h-px bg-border-default opacity-50" />

        {/* ── Not yet covered ── */}
        <div className="flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[4px]">
            <h2 className="text-[18px] font-semibold text-[#212121] m-0 leading-[1.5]">Not yet covered?</h2>
            <p className="text-[14px] text-[#6e6e6e] leading-[1.5] m-0">
              Recommended coverage based on your profile
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
