import { useState } from 'react'
import { ChevronRightIcon } from '../icons'
import EmptyCoverage from '../EmptyCoverage'
import iconMotor      from '../../assets/icon-motor.svg'
import iconTravel     from '../../assets/icon-travel.svg'
import iconHelperBody from '../../assets/icon-helper-body.svg'
import iconHelperHead from '../../assets/icon-helper-head.svg'
import iconHome       from '../../assets/icon-home.svg'
import iconAccident1  from '../../assets/icon-accident-1.svg'
import iconAccident2  from '../../assets/icon-accident-2.svg'

/* ─── Filter icons ───────────────────────────────────────── */
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
function HomeIcon() {
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

/* ─── Types ─────────────────────────────────────────────── */
type PolicyStatus = 'in-force' | 'renewal-due' | 'expired'

type PolicyDetail = {
  id: string
  name: string
  policyNo: string
  status: PolicyStatus
  statusLabel: string
  coveragePeriod: string
  category: FilterKey
  detailSlug?: string
}

type FilterKey = 'all' | 'motor' | 'travel' | 'helper' | 'home' | 'accident'

/* ─── Data ───────────────────────────────────────────────── */
const POLICIES: PolicyDetail[] = [
  {
    id: '1',
    name: 'UniCar',
    policyNo: 'PNF320104124A23',
    status: 'renewal-due',
    statusLabel: 'Renewal due in 30 days',
    coveragePeriod: '2/1/2026 - 1/1/2027 (12 Months)',
    category: 'motor',
    detailSlug: 'unicar',
  },
  {
    id: '2',
    name: 'UniTravel (Single Trip)',
    policyNo: 'PNF320104124A23',
    status: 'in-force',
    statusLabel: 'In force',
    coveragePeriod: '8/4/2026 - 13/4/2026 (6 Days)',
    category: 'travel',
    detailSlug: 'unitravel',
  },
  {
    id: '3',
    name: 'UniHelper',
    policyNo: 'PNF320104124A23',
    status: 'in-force',
    statusLabel: 'In force',
    coveragePeriod: '2/1/2026 - 1/1/2027 (12 Months)',
    category: 'helper',
    detailSlug: 'unihelper',
  },
]

/**
 * The coverage period reads "start - end (duration)"; a policy's expiry is the
 * end date, formatted D/M/YYYY. Returned as a timestamp so it can be sorted.
 */
function parseExpiry(coveragePeriod: string): number {
  const end = coveragePeriod.split('-')[1] ?? ''
  const match = end.match(/(\d+)\/(\d+)\/(\d+)/)
  if (!match) return Infinity
  const [, day, month, year] = match
  return new Date(Number(year), Number(month) - 1, Number(day)).getTime()
}

type FilterOption = {
  key: FilterKey
  label: string
  icon?: React.ReactNode
}

const FILTERS: FilterOption[] = [
  { key: 'all',      label: 'All' },
  { key: 'motor',    label: 'Motor',               icon: <MotorIcon /> },
  { key: 'travel',   label: 'Travel',              icon: <TravelIcon /> },
  { key: 'helper',   label: 'Helper',              icon: <HelperIcon /> },
  { key: 'home',     label: 'Home',              icon: <HomeIcon /> },
  { key: 'accident', label: 'Personal Accident', icon: <AccidentIcon /> },
]

/* ─── Main section ───────────────────────────────────────── */
type Props = {
  onViewPolicies?: () => void
  onSelectPolicy?: (slug: string) => void
  /** False → no UOI products on file; show the empty state. */
  hasPolicies?: boolean
}

export default function YourCoverage({ onViewPolicies, onSelectPolicy, hasPolicies = true }: Props) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')

  // No policies on file → the header, counts and chips all read zero.
  // Otherwise order the cards by expiration date, soonest first.
  const policies = hasPolicies
    ? [...POLICIES].sort((a, b) => parseExpiry(a.coveragePeriod) - parseExpiry(b.coveragePeriod))
    : []

  const countFor = (key: FilterKey) =>
    key === 'all' ? policies.length : policies.filter(p => p.category === key).length

  // Soonest expiry within a category — Infinity when it holds no policies.
  const categoryExpiry = (key: FilterKey) => {
    const inCategory = policies.filter(p => p.category === key)
    return inCategory.length
      ? Math.min(...inCategory.map(p => parseExpiry(p.coveragePeriod)))
      : Infinity
  }

  // Category chips follow the same soonest-expiry order as the cards. Empty
  // categories — and the no-policies case, where every category is empty — fall
  // back to alphabetical. "All" always leads.
  const orderedFilters = [
    FILTERS[0],
    ...FILTERS.slice(1).sort((a, b) => {
      const ea = categoryExpiry(a.key)
      const eb = categoryExpiry(b.key)
      return ea !== eb ? ea - eb : a.label.localeCompare(b.label)
    }),
  ]

  const visible = activeFilter === 'all'
    ? policies
    : policies.filter(p => p.category === activeFilter)

  return (
    <div className="flex flex-col gap-4">
      {/* ── Header ── */}
      <div className="flex items-center gap-7">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <h2 className="font-h3-title font-semibold text-text-primary m-0">
            Your active coverage
          </h2>
          <span className="text-[18px] text-text-tertiary leading-relaxed">
            ({policies.length})
          </span>
        </div>
        <ViewAll onClick={onViewPolicies} />
      </div>

      {/* ── Filter pills — scrollable on mobile ── */}
      <div className="flex gap-[12px] overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
        {orderedFilters.map(({ key, label, icon }) => {
          const count = countFor(key)
          const isActive = activeFilter === key
          const isEmpty = count === 0 && key !== 'all'

          /* "All" pill — no icon, user-specified 12px h-padding */
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
              <span className={[
                'flex items-center gap-[4px] text-sm leading-[1.5]',
              ].join(' ')}>
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

      {/* ── Policy cards, or the empty state ── */}
      <div className="flex flex-col gap-4">
        {!hasPolicies ? (
          <EmptyCoverage action={{ label: 'Browse Policies', onClick: onViewPolicies }} />
        ) : visible.length === 0 ? (
          <p className="text-sm text-text-tertiary py-4 text-center">
            No policies in this category
          </p>
        ) : (
          visible.map(policy => (
            <PolicyCard
              key={policy.id}
              policy={policy}
              onClick={() => policy.detailSlug ? onSelectPolicy?.(policy.detailSlug) : onViewPolicies?.()}
            />
          ))
        )}
      </div>
    </div>
  )
}

/* ─── Policy Card ────────────────────────────────────────── */
function PolicyCard({ policy, onClick }: { policy: PolicyDetail; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="w-full bg-white rounded-[8px] shadow-card text-left cursor-pointer border-0 overflow-hidden hover:shadow-pop transition-shadow">
      {/* Header: name + status tag + chevron */}
      <div className="flex items-center gap-2 px-4 pt-4 pb-4">
        <div className="flex items-center gap-2 flex-wrap flex-1 min-w-0">
          <span className="text-base font-medium text-text-primary leading-relaxed">
            {policy.name}
          </span>
          <StatusTag status={policy.status} label={policy.statusLabel} />
        </div>
        <ChevronRightIcon size={20} className="shrink-0" style={{ color: '#6E6E6E' }} />
      </div>

      {/* Divider */}
      <div className="h-px bg-[rgba(0,0,0,0.09)] mx-4" />

      {/* Labelled detail rows */}
      <div className="flex flex-col gap-3 px-4 py-4">
        <DetailRow label="Policy no." value={policy.policyNo} />
        <DetailRow label="Coverage period" value={policy.coveragePeriod} />
      </div>
    </button>
  )
}

/* ─── Label + value row ──────────────────────────────────── */
function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2 text-sm leading-relaxed">
      <span className="w-[110px] sm:w-[142px] shrink-0 text-text-secondary">{label}</span>
      <span className="flex-1 min-w-0 text-text-primary">{value}</span>
    </div>
  )
}

/* ─── Status Tag ─────────────────────────────────────────── */
function StatusTag({ status, label }: { status: PolicyStatus; label: string }) {
  const styles: Record<PolicyStatus, string> = {
    'in-force':    'bg-bg-success text-success',
    'renewal-due': 'bg-bg-caution text-caution',
    'expired':     'bg-grey-tag text-text-secondary',
  }
  return (
    <span className={`inline-flex items-center px-[8px] py-[4px] rounded-pill text-xs font-medium ${styles[status]}`}>
      {label}
    </span>
  )
}

/* ─── View All link ──────────────────────────────────────── */
function ViewAll({ onClick }: { onClick?: () => void }) {
  return (
    <button onClick={onClick} className="text-base font-medium text-text-link bg-transparent border-0 cursor-pointer p-0 shrink-0">
      View All
    </button>
  )
}
