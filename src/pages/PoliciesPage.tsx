import { useState } from 'react'
import NotificationBanner from '../components/dashboard/NotificationBanner'
import { SUPPORT_URL } from './auth/AuthUI'
import { CartIcon, ChevronRightIcon } from '../components/icons'
import iconMotor      from '../assets/icon-motor.svg'
import iconTravel     from '../assets/icon-travel.svg'
import iconHelperBody from '../assets/icon-helper-body.svg'
import iconHelperHead from '../assets/icon-helper-head.svg'
import iconHome       from '../assets/icon-home.svg'
import iconAccident1  from '../assets/icon-accident-1.svg'
import iconAccident2  from '../assets/icon-accident-2.svg'

import { POLICIES, type PolicyData, type PolicyStatus, type FilterKey } from '../data/policies'
import EmptyCoverage from '../components/EmptyCoverage'
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
      <div className="flex items-center gap-[8px] p-[16px]">
        <div className="flex items-center gap-[8px] flex-wrap flex-1 min-w-0">
          <span className="text-[16px] font-medium text-[#212121] leading-[1.5]">{policy.name}</span>
          <StatusTag status={policy.status} label={policy.statusLabel} />
        </div>
        <ChevronRightIcon size={20} className="shrink-0" style={{ color: '#6E6E6E' }} />
      </div>

      {/* Divider */}
      <div className="h-px bg-[rgba(0,0,0,0.09)] mx-[16px]" />

      {/* Labelled rows */}
      <div className="flex flex-col gap-[12px] p-[16px]">
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
/* ─── Main page ──────────────────────────────────────────── */
type Props = {
  /** False → no UOI products on file; show the empty state. */
  hasPolicies?: boolean
  onNavigateToDashboard?: () => void
  onSelectPolicy?: (slug: string) => void
  /** Session-scoped dismissal of the standing notice, owned by the app. */
  bannerDismissed?: boolean
  onDismissBanner?: () => void
}

export default function PoliciesPage({ onSelectPolicy, onNavigateToDashboard, hasPolicies = true, bannerDismissed, onDismissBanner }: Props) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')

  // No policies on file → counts and chips all read zero
  const policies = hasPolicies ? POLICIES : []

  const countFor = (key: FilterKey) =>
    key === 'all' ? policies.length : policies.filter(p => p.category === key).length

  const visible = activeFilter === 'all'
    ? policies
    : policies.filter(p => p.category === activeFilter)

  return (
    <div className="bg-bg-page min-h-full">
      <div className="screen-container flex flex-col gap-[32px]">

        {/* ── Standing note: the portal is not the system of record ── */}
        <NotificationBanner
          tone="info"
          dismissed={bannerDismissed}
          onDismiss={onDismissBanner}
          title="Policy information displayed in this portal may not reflect all recent changes made to your policy"
          description={
            <>
              Please refer to your latest policy documents for the most accurate and up-to-date
              information. If you need assistance or have any questions, please contact us{' '}
              <a
                href={SUPPORT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary underline"
              >
                here
              </a>
              .
            </>
          }
        />

        {/* ── Breadcrumbs ── */}
        <div className="flex items-center gap-[4px]">
          <button
            onClick={onNavigateToDashboard}
            className="text-[12px] text-[#8d8d8d] leading-[1.4] bg-transparent border-0 p-0 cursor-pointer"
          >
            Dashboard
          </button>
          <ChevronRightIcon size={10} style={{ color: '#6E6E6E' }} />
          <span className="text-[12px] font-semibold text-[#005eb8] leading-[1.4]">Policies</span>
        </div>

        {/* ── Title row ── */}
        <div className="flex items-center gap-[12px]">
          <h1 className="flex-1 font-h1-title font-semibold text-[#212121] m-0">Policies</h1>
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

          {/* Policy cards, or the empty state */}
          <div className="flex flex-col gap-[24px]">
            {!hasPolicies ? (
              <EmptyCoverage />
            ) : visible.length === 0 ? (
              <p className="text-sm text-[#8d8d8d] py-4 text-center">No policies in this category</p>
            ) : (
              visible.map(policy => <PolicyCard key={policy.id} policy={policy} onSelect={onSelectPolicy} />)
            )}
          </div>

        </div>

        {/* ── Disclaimer ── */}
        <p className="text-[14px] text-[#212121] leading-[1.5] m-0">
          The policy overview includes only active policies and those inactive for 180 days. If you can't find a policy, please contact us{' '}
          <a href="https://api.whatsapp.com/send/?phone=6580814843&text&type=phone_number&app_absent=0" className="text-text-secondary underline">here</a>.
        </p>

      </div>
    </div>
  )
}
