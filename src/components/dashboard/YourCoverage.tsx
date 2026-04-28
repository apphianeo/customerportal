import { useState } from 'react'
import { RightOutlined, ArrowRightOutlined, InfoCircleOutlined } from '@ant-design/icons'
import iconMotor      from '../../assets/icon-motor.svg'
import iconTravel     from '../../assets/icon-travel.svg'
import iconHelperBody from '../../assets/icon-helper-body.svg'
import iconHelperHead from '../../assets/icon-helper-head.svg'
import iconHome       from '../../assets/icon-home.svg'
import iconHospital   from '../../assets/icon-hospital.svg'
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
  { key: 'motor',    label: 'Motor',               icon: <MotorIcon /> },
  { key: 'travel',   label: 'Travel',              icon: <TravelIcon /> },
  { key: 'helper',   label: 'Helper',              icon: <HelperIcon /> },
  { key: 'home',     label: 'Home',                icon: <HomeIcon /> },
  { key: 'hospital', label: 'Hospital Protection', icon: <HospitalIcon /> },
  { key: 'accident', label: 'Personal Accident',   icon: <AccidentIcon /> },
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
      <div className="flex gap-[12px] overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
        {FILTERS.map(({ key, label, icon }) => {
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
