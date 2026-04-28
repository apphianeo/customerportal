import { useState } from 'react'
import {
  RightOutlined,
  ArrowRightOutlined,
  CarOutlined,
  CompassOutlined,
  UserOutlined,
  HomeOutlined,
  MedicineBoxOutlined,
  SafetyCertificateOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons'

/* ─── Types ─────────────────────────────────────────────── */
type PolicyStatus = 'in-force' | 'renewal-due' | 'expired'

type PolicyDetail = {
  id: string
  name: string
  policyNo: string
  status: PolicyStatus
  statusLabel: string
  details: string[]         // each item separated by • in the UI
  category: FilterKey
}

type FilterKey = 'all' | 'motor' | 'travel' | 'helper' | 'home' | 'hospital' | 'accident'

/* ─── Data ───────────────────────────────────────────────── */
const POLICIES: PolicyDetail[] = [
  {
    id: '1',
    name: 'UniCar',
    policyNo: 'PNF320104124A23',
    status: 'renewal-due',
    statusLabel: 'Renewal Due in 30 Days',
    details: ['Comprehensive Essential Plan', '2/1/2026 - 1/1/2027 (12 Months)'],
    category: 'motor',
  },
  {
    id: '2',
    name: 'UniTravel (Single Trip)',
    policyNo: 'PNF320104124A23',
    status: 'in-force',
    statusLabel: 'In Force',
    details: ['Area 1', 'Value Plan', '8/4/2026 - 13/4/2026 (6 Days)'],
    category: 'travel',
  },
  {
    id: '3',
    name: 'UniHelper',
    policyNo: 'PNF320104124A23',
    status: 'in-force',
    statusLabel: 'In Force',
    details: ['Value Plan', '2/1/2026 - 1/1/2027 (12 Months)'],
    category: 'helper',
  },
]

type FilterOption = {
  key: FilterKey
  label: string
  icon?: React.ReactNode
}

const FILTERS: FilterOption[] = [
  { key: 'all',      label: 'All' },
  { key: 'motor',    label: 'Motor',              icon: <CarOutlined /> },
  { key: 'travel',   label: 'Travel',             icon: <CompassOutlined /> },
  { key: 'helper',   label: 'Helper',             icon: <UserOutlined /> },
  { key: 'home',     label: 'Home',               icon: <HomeOutlined /> },
  { key: 'hospital', label: 'Hospital Protection',icon: <MedicineBoxOutlined /> },
  { key: 'accident', label: 'Personal Accident',  icon: <SafetyCertificateOutlined /> },
]

/* ─── Main section ───────────────────────────────────────── */
export default function YourCoverage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')

  const countFor = (key: FilterKey) =>
    key === 'all' ? POLICIES.length : POLICIES.filter(p => p.category === key).length

  const visible = activeFilter === 'all'
    ? POLICIES
    : POLICIES.filter(p => p.category === activeFilter)

  return (
    <div className="flex flex-col gap-6">
      {/* ── Header ── */}
      <div className="flex items-center gap-7">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <h2 className="text-h2-mob lg:text-h2 font-bold text-text-primary m-0 leading-relaxed">
            Your Coverage
          </h2>
          <span className="text-h2-mob lg:text-h2 text-text-tertiary leading-relaxed">
            ({POLICIES.length})
          </span>
        </div>
        <ViewAll />
      </div>

      {/* ── Filter pills — scrollable on mobile ── */}
      <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
        {FILTERS.map(({ key, label, icon }) => {
          const count = countFor(key)
          const isActive = activeFilter === key
          const isEmpty = count === 0

          return (
            <button
              key={key}
              onClick={() => !isEmpty && setActiveFilter(key)}
              disabled={isEmpty}
              className={[
                'flex items-center gap-2 px-3 py-2 rounded-pill text-sm whitespace-nowrap',
                'border transition-colors shrink-0',
                // Active
                isActive
                  ? 'bg-primary text-white border-primary font-medium'
                  // Empty / disabled
                  : isEmpty
                    ? 'bg-bg-disabled-field text-text-disabled border-border-default cursor-not-allowed'
                    // Normal
                    : 'bg-white text-text-secondary border-border-default hover:border-primary hover:text-primary cursor-pointer',
              ].join(' ')}
            >
              {/* icon — only non-All pills */}
              {icon && (
                <span className={[
                  'text-[14px] leading-none',
                  isActive ? 'text-white' : isEmpty ? 'text-text-disabled' : 'text-text-secondary',
                ].join(' ')}>
                  {icon}
                </span>
              )}
              <span>{label}</span>
              {/* count badge — not shown for "All" active (already in heading) */}
              {key !== 'all' && (
                <span className={isActive ? 'text-white/80' : 'text-text-tertiary'}>
                  ({count})
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* ── Policy cards ── */}
      <div className="flex flex-col gap-4">
        {visible.length === 0 ? (
          <p className="text-sm text-text-tertiary py-4 text-center">
            No policies in this category.
          </p>
        ) : (
          visible.map(policy => (
            <PolicyCard key={policy.id} policy={policy} />
          ))
        )}
      </div>
    </div>
  )
}

/* ─── Policy Card ────────────────────────────────────────── */
function PolicyCard({ policy }: { policy: PolicyDetail }) {
  return (
    <button className="flex items-center gap-1 w-full bg-white rounded-xl p-4 shadow-card text-left cursor-pointer border-0 hover:shadow-md transition-shadow">
      {/* Details */}
      <div className="flex flex-col gap-[4px] flex-1 min-w-0">
        {/* Name + status tag */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-base font-medium text-text-primary leading-relaxed">
            {policy.name}
          </span>
          <StatusTag status={policy.status} label={policy.statusLabel} />
        </div>

        {/* Policy number */}
        <span className="text-sm text-text-secondary leading-relaxed">
          Policy No: {policy.policyNo}
        </span>

        {/* Detail metadata — bullet-separated, wraps on mobile */}
        <div className="flex items-center flex-wrap gap-x-2 gap-y-0.5">
          {policy.details.map((detail, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span className="text-text-secondary text-xs">•</span>}
              <span className="text-sm text-text-secondary leading-relaxed">
                {detail}
                {/* info icon on "Area 1" for travel policies */}
                {detail.startsWith('Area') && (
                  <InfoCircleOutlined
                    className="ml-1 text-text-tertiary"
                    style={{ fontSize: 13 }}
                  />
                )}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Right chevron */}
      <RightOutlined className="text-text-tertiary shrink-0 ml-2" style={{ fontSize: 16 }} />
    </button>
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
    <span className={`inline-flex items-center px-2 py-0.5 rounded-pill text-xs font-medium ${styles[status]}`}>
      {label}
    </span>
  )
}

/* ─── View All link ──────────────────────────────────────── */
function ViewAll() {
  return (
    <button className="flex items-center gap-1.5 text-base font-medium text-text-link bg-transparent border-0 cursor-pointer p-0 shrink-0 hover:opacity-80 transition-opacity">
      View All
      <ArrowRightOutlined style={{ fontSize: 13 }} />
    </button>
  )
}
