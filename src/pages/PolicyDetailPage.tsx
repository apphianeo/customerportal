import { useState, useRef, useLayoutEffect } from 'react'
import { DownloadOutlined } from '@ant-design/icons'
import { ChevronRightIcon, ChevronDownIcon, ChevronUpIcon } from '../components/icons'
import { getPolicyDetail, type Field, type FieldValue, type PolicyDetailData } from '../data/policyDetails'
import type { PolicyStatus } from '../data/policies'
import type { Account } from '../data/accounts'

/* Official Mastercard brand mark — two interlocking circles with the wordmark. */
function MastercardIcon() {
  return (
    <svg width="34" height="23" viewBox="0 0 131 90" fill="none" role="img" aria-label="Mastercard">
      <circle cx="48" cy="32" r="30" fill="#EB001B" />
      <circle cx="83" cy="32" r="30" fill="#F79E1B" />
      {/* Overlap of the two circles */}
      <path d="M65.5 8a30 30 0 0 1 0 48 30 30 0 0 1 0-48Z" fill="#FF5F00" />
      <text
        x="65.5"
        y="84"
        textAnchor="middle"
        fontFamily="Helvetica, Arial, sans-serif"
        fontSize="20"
        fontWeight="500"
        letterSpacing="-0.5"
        fill="#1A1A1A"
      >
        mastercard
      </text>
    </svg>
  )
}

function PaymentMethodValue({ last4 }: { last4: string }) {
  return (
    <span className="flex items-center gap-[8px]">
      <MastercardIcon />
      {/* No size class — inherits 16px in the field grid, 14px inside table cells */}
      <span className="text-[#212121] leading-[1.5]">****{last4}</span>
    </span>
  )
}

/* ─── Long value — shown in full up to two lines; only clamps (with a
   chevron to expand) when the text actually overflows those two lines. ─── */
function ExpandableValue({ text }: { text: string }) {
  const [open, setOpen] = useState(false)
  const [overflowing, setOverflowing] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  // Measure against the two-line clamp (only while collapsed). If the content
  // is taller than the clamp, it overflows and earns a chevron.
  useLayoutEffect(() => {
    const el = ref.current
    if (!el || open) return
    const check = () => setOverflowing(el.scrollHeight > el.clientHeight + 1)
    check()
    const ro = new ResizeObserver(check)
    ro.observe(el)
    return () => ro.disconnect()
  }, [text, open])

  const clamp = !open
  return (
    <span className="flex items-end gap-[8px] w-full">
      <span
        ref={ref}
        className="text-[16px] text-[#212121] leading-[1.5] flex-1 min-w-0"
        style={clamp ? { display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' } : undefined}
      >
        {text}
      </span>
      {overflowing && (
        <button
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Show less' : 'Show more'}
          className="shrink-0 bg-transparent border-0 p-0 cursor-pointer flex items-center pb-[4px]"
        >
          {open
            ? <ChevronUpIcon size={14} style={{ color: '#6E6E6E' }} />
            : <ChevronDownIcon size={14} style={{ color: '#6E6E6E' }} />}
        </button>
      )}
    </span>
  )
}

/* Renders a data-only field value into its visual form. */
function FieldValueView({ value }: { value: FieldValue }) {
  if (typeof value === 'string') {
    return <span className="text-[16px] text-[#212121] leading-[1.5] truncate">{value}</span>
  }
  if (value.kind === 'payment') return <PaymentMethodValue last4={value.last4} />
  if (value.kind === 'link') {
    return (
      <a href={value.href} className="text-[16px] text-[#212121] no-underline leading-[1.5] truncate">
        {value.text}
      </a>
    )
  }
  return <ExpandableValue text={value.text} />
}

/* ─── Field grid — 3-col label/value pairs, 24px gutters ─── */
function FieldGrid({ fields }: { fields: Field[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-[24px] gap-y-[24px] w-full">
      {fields.map((f, i) => (
        <div key={i} className="flex flex-col gap-[4px] min-w-0 text-[16px]">
          <span className="text-[14px] text-[#6e6e6e] leading-[1.5]">{f.label}</span>
          <FieldValueView value={f.value} />
        </div>
      ))}
    </div>
  )
}

/* ─── Section card ─── */
function SectionCard({
  id,
  title,
  subtitle,
  children,
}: {
  id: string
  title: string
  subtitle?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div
      id={id}
      className="rounded-[8px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] overflow-hidden bg-white"
      style={{ scrollMarginTop: 110 }}
    >
      <div className="border-b border-[rgba(0,0,0,0.09)] p-[16px] flex flex-col gap-[4px]">
        <h2 className="font-h3-title font-semibold text-[#212121] m-0">{title}</h2>
        {subtitle && <p className="text-[14px] text-[#6e6e6e] m-0 leading-[1.5]">{subtitle}</p>}
      </div>
      <div className="p-[16px] flex flex-col gap-[24px]">{children}</div>
    </div>
  )
}

/* ─── Documents / Payments table ─────────────────────────── */
/**
 * The last column is the row action. On a phone, where the table scrolls
 * horizontally, it stays pinned to the right edge (a soft shadow marks where
 * the content passes beneath) so the action is reachable without scrolling to
 * the end. On desktop the table fits, so it is just an ordinary last column —
 * no pinning, no shadow, and no divider line before it.
 */
function DataTable({ columns, rows }: { columns: string[]; rows: React.ReactNode[][] }) {
  const lastCol = columns.length - 1
  const pinned = 'sticky right-0 z-[1] w-[72px] shadow-[-6px_0_6px_-6px_rgba(0,0,0,0.12)] md:static md:w-auto md:shadow-none'

  return (
    <div className="bg-white border border-[rgba(0,0,0,0.09)] rounded-[8px] overflow-x-auto">
      <table className="w-full border-collapse min-w-[600px]">
        <thead>
          <tr className="bg-[#f9fafb] border-b border-[rgba(0,0,0,0.09)]">
            {columns.map((col, j) => (
              <th
                key={col}
                className={`text-left px-[16px] py-[12px] text-[14px] font-medium text-[#949494] whitespace-nowrap ${
                  j === lastCol ? `bg-[#f9fafb] ${pinned}` : ''
                }`}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i < rows.length - 1 ? 'border-b border-[rgba(0,0,0,0.09)]' : ''}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-[16px] py-[12px] text-[14px] text-[#212121] whitespace-nowrap ${
                    j === lastCol ? `bg-white ${pinned}` : ''
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function PolicyStatusTag({ status, label }: { status: PolicyStatus; label: string }) {
  const styles: Record<PolicyStatus, string> = {
    'in-force': 'bg-[#ecfdf5] text-[#08754f]',
    'renewal-due': 'bg-[#fff8ec] text-[#ffa826]',
    'lapsed': 'bg-[#fef2f2] text-[#dc2626]',
  }
  return (
    <span className={`inline-flex items-center px-[8px] py-[4px] rounded-[12px] text-xs font-medium ${styles[status]}`}>
      {label}
    </span>
  )
}

/* ─── Pagination — page 1 of 2, matching the design ─── */
function Pagination() {
  const [page, setPage] = useState(1)
  return (
    <div className="flex items-center gap-[12px]">
      <button
        onClick={() => setPage(p => Math.max(1, p - 1))}
        disabled={page === 1}
        aria-label="Previous page"
        className="size-[40px] flex items-center justify-center bg-transparent border-0 cursor-pointer disabled:cursor-not-allowed rotate-180"
      >
        <ChevronRightIcon size={16} style={{ color: page === 1 ? '#BDBDBD' : '#6E6E6E' }} />
      </button>
      {[1, 2].map(n => (
        <button
          key={n}
          onClick={() => setPage(n)}
          className={[
            'size-[40px] rounded-[8px] text-[14px] cursor-pointer border-0',
            page === n ? 'bg-[#005eb8] text-white font-medium' : 'bg-transparent text-[#212121]',
          ].join(' ')}
        >
          {n}
        </button>
      ))}
      <button
        onClick={() => setPage(p => Math.min(2, p + 1))}
        disabled={page === 2}
        aria-label="Next page"
        className="size-[40px] flex items-center justify-center bg-transparent border-0 cursor-pointer disabled:cursor-not-allowed"
      >
        <ChevronRightIcon size={16} style={{ color: page === 2 ? '#BDBDBD' : '#6E6E6E' }} />
      </button>
    </div>
  )
}

/* ─── Tabs ───────────────────────────────────────────────── */
type TabKey = 'policy' | 'policyholder' | 'insured' | 'documents' | 'payments' | 'contact' | 'agent'

const TABS: { key: TabKey; label: string }[] = [
  { key: 'policy',       label: 'Policy details' },
  { key: 'policyholder', label: 'Policyholder details' },
  { key: 'insured',      label: 'Insured details' },
  { key: 'documents',    label: 'Documents' },
  { key: 'payments',     label: 'Payments' },
  { key: 'contact',      label: 'Contact details' },
  { key: 'agent',        label: 'Agent details' },
]

const downloadIcon = (
  <button
    onClick={() => console.log('Download document')}
    aria-label="Download"
    className="bg-transparent border-0 p-0 cursor-pointer flex items-center"
  >
    <DownloadOutlined style={{ fontSize: 16, color: '#6E6E6E' }} />
  </button>
)

/* Compose the customer's correspondence address into one line. Contact details
   are where documents are sent, so use the mailing address when it differs from
   the residential one. */
function accountAddress(a: Account): string {
  const useMailing = !a.mailingSameAsResidential && Boolean(a.mailingAddress || a.mailingPostal)
  const line = useMailing ? a.mailingAddress : a.residentialAddress
  const unit = useMailing ? a.mailingUnit : a.residentialUnit
  const postal = useMailing ? a.mailingPostal : a.residentialPostal
  return [line, unit, postal ? `SINGAPORE ${postal}` : ''].filter(Boolean).join(', ')
}

/* Policyholder + contact details belong to the signed-in customer, so they are
   read from the account rather than the per-policy demo data. */
function policyholderFromAccount(a: Account): Field[] {
  return [
    { label: 'Salutation', value: a.salutation },
    { label: 'Name', value: a.fullName },
    { label: 'NRIC/FIN', value: a.nric },
    { label: 'Date of birth', value: a.dob },
  ]
}

function contactFromAccount(a: Account): Field[] {
  return [
    { label: 'Mobile number', value: a.phone ? `+65 ${a.phone}` : '-' },
    { label: 'Email address', value: a.email },
    { label: 'Address', value: { kind: 'expandable', text: accountAddress(a) } },
  ]
}

/* For insured groups flagged `self` (the insured is the policyholder), fill the
   identity fields from the account and leave the rest of the group untouched. */
function applyAccountToInsured(
  groups: PolicyDetailData['insuredGroups'],
  account?: Account,
): PolicyDetailData['insuredGroups'] {
  if (!account) return groups
  return groups.map(group => {
    if (!group.self) return group
    return {
      ...group,
      fields: group.fields.map(f => {
        if (f.label === 'Name') return { ...f, value: account.fullName }
        if (f.label === 'NRIC/FIN' || f.label === 'FIN') return { ...f, value: account.nric }
        if (f.label === 'Date of birth') return { ...f, value: account.dob }
        if (f.label === 'Gender') return { ...f, value: account.gender }
        return f
      }),
    }
  })
}

/* ─── Main page ──────────────────────────────────────────── */
type Props = {
  slug?: string
  account?: Account
  onNavigateToDashboard?: () => void
  onNavigateToPolicies?: () => void
}

export default function PolicyDetailPage({ slug, account, onNavigateToDashboard, onNavigateToPolicies }: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>('policy')
  const policy: PolicyDetailData | undefined = getPolicyDetail(slug)
  // Identity blocks follow the signed-in customer, not the demo data.
  const policyholderFields = account ? policyholderFromAccount(account) : policy?.policyholderFields ?? []
  const contactFields = account ? contactFromAccount(account) : policy?.contactFields ?? []
  const insuredGroups = policy ? applyAccountToInsured(policy.insuredGroups, account) : []

  function goToTab(key: TabKey) {
    setActiveTab(key)
    document.getElementById(`section-${key}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  if (!policy) {
    return (
      <div className="bg-bg-page min-h-full">
        <div className="screen-container flex flex-col gap-[16px]">
          <h1 className="font-h1-title font-semibold text-[#212121] m-0">Policy not found</h1>
          <p className="text-[16px] text-[#6e6e6e] m-0">We couldn't find that policy</p>
          <button
            onClick={onNavigateToPolicies}
            className="self-start border border-[#005eb8] text-[#005eb8] bg-white px-[24px] py-[12px] rounded-[8px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] font-medium text-[16px] cursor-pointer"
          >
            Back to Policies
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-bg-page min-h-full">
      {/* ── Breadcrumb + title — scroll away normally ── */}
      <div className="bg-bg-page pt-[24px] md:pt-[32px] px-4">
        <div className="w-full max-w-[980px] mx-auto flex flex-col gap-[32px]">

        {/* ── Breadcrumbs ── */}
        <div className="flex items-center gap-[4px] flex-wrap">
          <button onClick={onNavigateToDashboard} className="text-[12px] text-[#949494] leading-[1.4] bg-transparent border-0 p-0 cursor-pointer">
            Dashboard
          </button>
          <ChevronRightIcon size={10} style={{ color: '#6E6E6E' }} />
          <button onClick={onNavigateToPolicies} className="text-[12px] text-[#949494] leading-[1.4] bg-transparent border-0 p-0 cursor-pointer">
            Policies
          </button>
          <ChevronRightIcon size={10} style={{ color: '#6E6E6E' }} />
          <span className="text-[12px] font-semibold text-[#005eb8] leading-[1.4]">
            {policy.name} - {policy.policyNumber}
          </span>
        </div>

        {/* ── Title + actions ── */}
        <div className="flex flex-col sm:flex-row gap-[16px] sm:items-center sm:justify-between">
          <div className="flex gap-[12px] items-center flex-wrap min-w-0">
            <h1 className="font-h1-title font-semibold text-[#212121] m-0">
              {policy.name}
            </h1>
            <PolicyStatusTag status={policy.status} label={policy.statusLabel} />
          </div>
          <div className="flex flex-col sm:flex-row gap-[16px] sm:items-center shrink-0">
            {/* Desktop: Submit Claim (left) then Download Policy (right).
                Mobile (stacked): Download Policy first, then Submit Claim. */}
            <a
              href="https://www.uoi.com.sg/claims-assistance.page"
              target="_blank"
              rel="noopener noreferrer"
              className="order-2 sm:order-1 flex items-center justify-center bg-white border border-[#005eb8] text-[#005eb8] px-[24px] py-[12px] rounded-[8px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] font-medium text-[16px] no-underline whitespace-nowrap cursor-pointer"
            >
              Submit Claim
            </a>
            <button
              onClick={() => console.log('Download policy', policy.slug)}
              className="order-1 sm:order-2 flex items-center justify-center gap-2 bg-[#005eb8] text-white px-[24px] py-[12px] rounded-[8px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] font-medium text-[16px] border-0 whitespace-nowrap cursor-pointer"
            >
              Download Policy
              <DownloadOutlined style={{ fontSize: 20 }} />
            </button>
          </div>
        </div>

        </div>
      </div>

      {/* ── Tabs — anchored to the top while the content scrolls ── */}
      <div className="sticky top-0 z-10 bg-bg-page pt-[24px] md:pt-[32px] pb-[24px] px-4">
        <div className="w-full max-w-[980px] mx-auto">
        <div
          /* 0.5px hairline bottom line, matching the design's inner-shadow rule
             (a 1px border reads too thick). */
          className="flex overflow-x-auto scrollbar-hide select-none shadow-[inset_0_-0.5px_0_0_rgba(0,0,0,0.09)]"
          /* pan-x hands the gesture to the scroller, so a drag scrolls the
             strip instead of picking up and sliding the label under the finger */
          style={{ touchAction: 'pan-x', overscrollBehaviorX: 'contain' }}
        >
          {TABS.map(tab => {
            const active = activeTab === tab.key
            return (
              <button
                key={tab.key}
                onClick={() => goToTab(tab.key)}
                className="shrink-0 flex flex-col items-center gap-[12px] px-[12px] pt-[12px] bg-transparent border-0 cursor-pointer"
              >
                <span className={`text-[14px] leading-[1.5] whitespace-nowrap ${active ? 'text-[#005eb8] font-medium' : 'text-[#212121] font-normal'}`}>
                  {tab.label}
                </span>
                {/* Underline sits under the label (with a slight overhang), not the full tab */}
                <span className={`h-[2px] w-[calc(100%+8px)] ${active ? 'bg-[#005eb8]' : 'bg-transparent'}`} />
              </button>
            )
          })}
        </div>

        </div>
      </div>

      {/* ── Section cards ── */}
      <div className="px-4 pb-8">
        <div className="w-full max-w-[980px] mx-auto flex flex-col gap-[24px]">

        {/* ── Sections ── */}
        <SectionCard id="section-policy" title="Policy details">
          <FieldGrid fields={policy.policyFields} />
          <p className="text-[14px] text-[#6e6e6e] leading-[1.5] m-0">
            If you'd like more information about policy, please refer to the{' '}
            <a href="#" className="text-text-secondary underline">policy wording</a>.
          </p>
        </SectionCard>

        <SectionCard id="section-policyholder" title="Policyholder details">
          <FieldGrid fields={policyholderFields} />
        </SectionCard>

        <SectionCard id="section-insured" title="Insured details">
          {insuredGroups.map(group => (
            <div key={group.title} className="flex flex-col gap-[12px] w-full">
              <p className="text-[16px] font-semibold text-[#212121] m-0">{group.title}</p>
              <FieldGrid fields={group.fields} />
            </div>
          ))}
        </SectionCard>

        <SectionCard id="section-documents" title="Documents">
          <DataTable
            columns={['Document', 'Date', 'Action']}
            rows={policy.documents.map(d => [
              d.name,
              d.date,
              downloadIcon,
            ])}
          />
          <p className="text-[14px] text-[#949494] m-0">
            Showing 1-{policy.documents.length} of {policy.documents.length}
          </p>
        </SectionCard>

        <SectionCard id="section-payments" title="Payment">
          <DataTable
            columns={['Transaction Date', 'Type', 'Payment Method', 'Premium', 'Action']}
            rows={policy.payments.map(p => [
              p.date,
              p.type,
              <PaymentMethodValue key="pm" last4={p.last4} />,
              p.premium,
              downloadIcon,
            ])}
          />
          {/* Pagination only appears once the history spans more than one page
              (10 rows per page); otherwise just the count is shown. */}
          {policy.paymentsTotal > 10 ? (
            <div className="relative flex flex-col sm:block gap-[12px] items-stretch">
              <p className="text-[14px] text-[#949494] m-0 text-left sm:absolute sm:left-0 sm:top-1/2 sm:-translate-y-1/2">
                Showing 1-{policy.payments.length} of {policy.paymentsTotal}
              </p>
              <div className="flex justify-center">
                <Pagination />
              </div>
            </div>
          ) : (
            <p className="text-[14px] text-[#949494] m-0">
              Showing 1-{policy.payments.length} of {policy.paymentsTotal}
            </p>
          )}
        </SectionCard>

        <SectionCard
          id="section-contact"
          title="Contact details"
          subtitle="All policy documents will be sent to the contact information tied to this specific policy"
        >
          <FieldGrid fields={contactFields} />
        </SectionCard>

        <SectionCard id="section-agent" title="Agent details">
          <FieldGrid fields={policy.agentFields} />
        </SectionCard>

        <p className="text-[14px] text-[#6e6e6e] leading-[1.5] m-0">
          For any amendments to your policy, please contact us{' '}
          <a
            href="https://api.whatsapp.com/send/?phone=6580814843&text&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary underline"
          >
            here
          </a>.
        </p>

        </div>
      </div>
    </div>
  )
}
