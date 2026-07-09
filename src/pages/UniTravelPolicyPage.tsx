import { useState } from 'react'
import { Tooltip } from 'antd'
import { DownloadOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { ChevronRightIcon } from '../components/icons'

/* ─── Info icon — grey filled circle, matches design system ─ */
function InfoIcon() {
  return (
    <svg viewBox="0 0 16 16" className="shrink-0" style={{ width: 13, height: 13 }} aria-hidden="true">
      <circle cx="8" cy="8" r="8" fill="#BDBDBD" />
      <circle cx="8" cy="4.75" r="1" fill="white" />
      <rect x="7.1" y="7" width="1.8" height="5" rx="0.9" fill="white" />
    </svg>
  )
}

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

/* ─── Info icon — solid blue circle, matches the add-ons banner ─ */
function InfoIconBlue() {
  return (
    <svg viewBox="0 0 16 16" className="shrink-0" style={{ width: 16, height: 16 }} aria-hidden="true">
      <circle cx="8" cy="8" r="8" fill="#005EB8" />
      <circle cx="8" cy="4.75" r="1" fill="white" />
      <rect x="7.1" y="7" width="1.8" height="5" rx="0.9" fill="white" />
    </svg>
  )
}

const AREA_1_COUNTRIES =
  'Area 1 (Brunei, Cambodia, Indonesia, Laos, Malaysia, Myanmar, Philippines, Thailand and Vietnam)'

/* ─── Truncated text — clamps to 2 lines, full text on hover ─ */
function TruncatedText({ text }: { text: string }) {
  return (
    <Tooltip
      title={text}
      color="white"
      placement="top"
      styles={{
        root: { maxWidth: 280 },
        container: {
          color: '#212121',
          fontSize: 14,
          lineHeight: 1.5,
          padding: 12,
          borderRadius: 8,
          boxShadow: '0px 0px 4.5px rgba(0, 0, 0, 0.12)',
        },
      }}
    >
      <p className="cursor-help m-0" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {text}
      </p>
    </Tooltip>
  )
}

/* ─── Field grid — 3-col label/value pairs, matches Policy Module ─ */
function FieldGrid({ fields }: { fields: { label: string; value: React.ReactNode }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-[24px] gap-y-[24px] w-full">
      {fields.map((f, i) => (
        <div key={i} className="flex flex-col gap-[4px] min-w-0">
          <span className="text-[14px] text-[#6e6e6e] leading-[1.5]">{f.label}</span>
          <span className="text-[16px] text-[#212121] leading-[1.5]">{f.value}</span>
        </div>
      ))}
    </div>
  )
}

function PaymentMethodValue({ last4 }: { last4: string }) {
  return (
    <div className="flex items-center gap-[8px]">
      <div className="border border-[rgba(0,0,0,0.09)] rounded-[2px] px-[4px] py-[2px] flex items-center justify-center">
        <MastercardIcon />
      </div>
      <span className="text-[16px] text-[#212121] leading-[1.5]">****{last4}</span>
    </div>
  )
}

/* ─── Section card — matches the "Policy Module" card pattern ─ */
function SectionCard({
  id,
  title,
  subtitle,
  action,
  children,
}: {
  id: string
  title: string
  subtitle?: React.ReactNode
  action?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div
      id={id}
      className="rounded-[8px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] overflow-hidden bg-white"
      style={{ scrollMarginTop: 90 }}
    >
      <div className="border-b border-[rgba(0,0,0,0.09)] px-[24px] py-[16px] flex gap-[24px] items-center">
        <div className="flex flex-col gap-[8px] flex-1 min-w-0">
          <h2 className="text-[18px] font-semibold text-[#212121] m-0">{title}</h2>
          {subtitle && <p className="text-[14px] text-[#6e6e6e] m-0">{subtitle}</p>}
        </div>
        {action}
      </div>
      <div className="p-[24px] flex flex-col gap-[24px]">
        {children}
      </div>
    </div>
  )
}

/* ─── Documents / Payments table ─────────────────────────── */
function DataTable({ columns, rows }: { columns: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="bg-white border border-[rgba(0,0,0,0.09)] rounded-[8px] overflow-x-auto">
      <table className="w-full border-collapse min-w-[600px]">
        <thead>
          <tr className="bg-[#f9fafb] border-b border-[rgba(0,0,0,0.09)]">
            {columns.map(col => (
              <th key={col} className="text-left px-[16px] py-[12px] text-[14px] font-medium text-[#949494] whitespace-nowrap">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i < rows.length - 1 ? 'border-b border-[rgba(0,0,0,0.09)]' : ''}>
              {row.map((cell, j) => (
                <td key={j} className="px-[16px] py-[12px] text-[14px] text-[#212121] whitespace-nowrap">
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

function StatusBadge({ label, tone }: { label: string; tone: 'success' | 'error' }) {
  const styles = tone === 'success' ? 'bg-[#ecfdf5] text-[#08754f]' : 'bg-[#fef2f2] text-[#dc2626]'
  return (
    <span className={`inline-flex items-center px-[8px] py-[4px] rounded-[24px] text-xs font-medium ${styles}`}>
      {label}
    </span>
  )
}

/* ─── Tabs ───────────────────────────────────────────────── */
type TabKey = 'policy' | 'policyholder' | 'insured' | 'documents' | 'payments' | 'contact' | 'others'

const TABS: { key: TabKey; label: string }[] = [
  { key: 'policy',       label: 'Policy Details' },
  { key: 'policyholder', label: 'Policyholder Details' },
  { key: 'insured',      label: 'Insured Details' },
  { key: 'documents',    label: 'Documents' },
  { key: 'payments',     label: 'Payments' },
  { key: 'contact',      label: 'Contact Details' },
  { key: 'others',       label: 'Others' },
]

/* ─── Main page ──────────────────────────────────────────── */
type Props = {
  onNavigateToDashboard?: () => void
  onNavigateToPolicies?: () => void
}

export default function UniTravelPolicyPage({ onNavigateToDashboard, onNavigateToPolicies }: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>('policy')

  function goToTab(key: TabKey) {
    setActiveTab(key)
    document.getElementById(`section-${key}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="bg-bg-page min-h-full">
      {/* ── Breadcrumb + title — scrolls away normally ── */}
      <div className="w-full max-w-[980px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col gap-[24px]">

        {/* Breadcrumbs */}
        <div className="flex items-center gap-[4px] flex-wrap">
          <button onClick={onNavigateToDashboard} className="text-[12px] text-[#949494] leading-[1.4] bg-transparent border-0 p-0 cursor-pointer">
            Dashboard
          </button>
          <ChevronRightIcon size={10} style={{ color: '#6E6E6E' }} />
          <button onClick={onNavigateToPolicies} className="text-[12px] text-[#949494] leading-[1.4] bg-transparent border-0 p-0 cursor-pointer">
            Policies
          </button>
          <ChevronRightIcon size={10} style={{ color: '#6E6E6E' }} />
          <span className="text-[12px] font-bold text-[#005eb8] leading-[1.4]">
            UniTravel (Single Trip) - DHOPF50050002500
          </span>
        </div>

        {/* Title row */}
        <div className="flex flex-col sm:flex-row gap-[16px] sm:items-start sm:justify-between">
          <div className="flex flex-col gap-[12px] flex-1 min-w-0">
            <div className="flex gap-[12px] items-center flex-wrap">
              <h1 className="text-[28px] sm:text-[32px] font-bold text-[#212121] leading-[1.2] m-0">
                UniTravel (Single Trip)
              </h1>
              <span className="inline-flex items-center px-[8px] py-[4px] rounded-[12px] text-xs font-medium bg-[#ecfdf5] text-[#08754f]">
                In Force
              </span>
            </div>
            <div className="flex flex-col gap-[8px]">
              <p className="text-[14px] text-[#6e6e6e] leading-[1.5] m-0">Policy Number: DHOPF50050002500</p>
              <div className="flex flex-wrap items-center gap-[8px] text-[14px] text-[#6e6e6e]">
                <span className="flex items-center">
                  Plus Plan (Area 1)
                  <Tooltip
                    title={AREA_1_COUNTRIES}
                    color="white"
                    placement="top"
                    styles={{
                      root: { maxWidth: 280 },
                      container: {
                        color: '#212121',
                        fontSize: 14,
                        lineHeight: 1.5,
                        padding: 12,
                        borderRadius: 8,
                        boxShadow: '0px 0px 4.5px rgba(0, 0, 0, 0.12)',
                      },
                    }}
                  >
                    <span className="cursor-help flex items-center" style={{ paddingLeft: 4 }}>
                      <InfoIcon />
                    </span>
                  </Tooltip>
                </span>
                <span>•</span>
                <span>8/10/2026 - 13/10/2026 (6 days)</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => console.log('Download policy')}
            className="flex items-center justify-center gap-2 border border-[#005eb8] text-[#005eb8] bg-white px-[24px] py-[12px] rounded-[8px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] font-medium text-[16px] w-full sm:w-auto shrink-0 h-fit cursor-pointer"
          >
            Download Policy
            <DownloadOutlined style={{ fontSize: 20 }} />
          </button>
        </div>
      </div>

      {/* ── Sticky tab bar only ── */}
      <div className="sticky top-0 z-10 bg-bg-page pt-[24px]">
        <div className="w-full max-w-[980px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-[4px] overflow-x-auto scrollbar-hide border-b border-[rgba(0,0,0,0.09)]">
            {TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => goToTab(tab.key)}
                className={[
                  'px-[12px] pb-[12px] text-[14px] whitespace-nowrap bg-transparent border-0 border-b-2 -mb-px cursor-pointer',
                  activeTab === tab.key ? 'text-[#005eb8] font-medium border-b-[#005eb8]' : 'text-[#212121] border-b-transparent',
                ].join(' ')}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="w-full max-w-[980px] mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-[24px] flex flex-col gap-[24px]">

        <SectionCard id="section-policy" title="Policy Details">
          <FieldGrid fields={[
            { label: 'Product', value: 'UniTravel' },
            { label: 'Policy Number', value: 'DHOPF50050002500' },
            { label: 'Plan', value: 'Plus' },
            { label: 'Group Type', value: 'Individual' },
            { label: 'Trip Type', value: 'Single Trip' },
            { label: 'Destination', value: <TruncatedText text={AREA_1_COUNTRIES} /> },
            { label: 'Policy Effective Date', value: '08/10/2026' },
            { label: 'Policy Expiry Date', value: '13/10/2026' },
            { label: 'Payment Method', value: <PaymentMethodValue last4="9111" /> },
            { label: 'Payment Terms', value: 'Single Payment' },
            { label: 'Premium Amount', value: '$265.20' },
            { label: 'Promo Code', value: 'None' },
            { label: 'Add-On', value: 'None' },
          ]} />

          {/* Add-ons alert */}
          <div className="bg-[#eff6ff] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-[8px] px-[16px] py-[12px] flex flex-col sm:flex-row gap-[12px] sm:items-center">
            <div className="flex gap-[8px] items-center flex-1 min-w-0">
              <InfoIconBlue />
              <p className="text-[14px] text-[#212121] m-0">Supercharge your plan with exclusive add-ons.</p>
            </div>
            <button
              onClick={() => console.log('Open add-ons')}
              className="flex items-center gap-2 border border-[#005eb8] text-[#005eb8] bg-white h-[32px] px-[16px] rounded-[8px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] font-medium text-[14px] cursor-pointer shrink-0"
            >
              <PlusCircleOutlined style={{ fontSize: 16 }} />
              Add-Ons
            </button>
          </div>

          <p className="text-[14px] text-[#212121] leading-[1.5] m-0">
            If you'd like more information about policy, please refer to the{' '}
            <a href="#" className="text-[#005eb8] underline">policy wording</a>.
          </p>
        </SectionCard>

        <SectionCard id="section-policyholder" title="Policyholder Details">
          <FieldGrid fields={[
            { label: 'Salutation', value: 'Mr' },
            { label: 'Name', value: 'Chris Wong' },
            { label: 'NRIC/FIN', value: 'S1234567A' },
            { label: 'Date of Birth', value: '12/02/1966' },
            { label: 'Email', value: 'chriswong@gmail.com' },
            { label: 'Mobile Number', value: '+65 9123 4567' },
            { label: 'Address', value: '123 Silat Avenue, Singapore 164123' },
          ]} />
        </SectionCard>

        <SectionCard id="section-insured" title="Insured Details">
          <div className="flex flex-col gap-[12px] w-full">
            <p className="text-[16px] font-semibold text-[#212121] m-0">Insured 1 (Adult)</p>
            <FieldGrid fields={[
              { label: 'Name', value: 'Chris Wong' },
              { label: 'NRIC/FIN', value: 'S1234567A' },
              { label: 'Date of Birth', value: '12/02/1966' },
            ]} />
          </div>
        </SectionCard>

        <SectionCard id="section-documents" title="Documents">
          <DataTable
            columns={['Document', 'Type', 'Date', 'Action']}
            rows={[
              ['Adhoc Communication Letter', 'Statement', '20 Jan 2026', <DownloadOutlined key="dl" style={{ fontSize: 16, color: '#6E6E6E' }} />],
              ['Renewal Notice', 'Payment', '20 Jan 2026', <DownloadOutlined key="dl" style={{ fontSize: 16, color: '#6E6E6E' }} />],
              ['Renewal Notice', 'Payment', '20 Jan 2026', <DownloadOutlined key="dl" style={{ fontSize: 16, color: '#6E6E6E' }} />],
              ['Adhoc Communication Letter', 'Statement', '20 Jan 2026', <DownloadOutlined key="dl" style={{ fontSize: 16, color: '#6E6E6E' }} />],
            ]}
          />
          <p className="text-[14px] text-[#949494] m-0">Showing 1-4 of 4</p>
        </SectionCard>

        <SectionCard id="section-payments" title="Payments">
          <DataTable
            columns={['Transaction Date', 'Type', 'Premium', 'Payment Method', 'Status', 'Action']}
            rows={[
              ['20 Feb 2026', 'AXS', 'S$245.80', <PaymentMethodValue key="pm" last4="9111" />, <StatusBadge key="st" label="Success" tone="success" />, <DownloadOutlined key="dl" style={{ fontSize: 16, color: '#6E6E6E' }} />],
              ['15 Jan 2026', 'AXS', 'S$1,250.00', <PaymentMethodValue key="pm" last4="9111" />, <StatusBadge key="st" label="Error" tone="error" />, <DownloadOutlined key="dl" style={{ fontSize: 16, color: '#6E6E6E' }} />],
            ]}
          />
          <p className="text-[14px] text-[#949494] m-0">Showing 1-2 of 2</p>
        </SectionCard>

        <SectionCard
          id="section-contact"
          title="Contact Details"
          subtitle="All policy documents will be sent to the contact information tied to this specific policy."
          action={
            <button
              onClick={() => console.log('Edit contact details')}
              className="flex items-center justify-center border border-[#005eb8] text-[#005eb8] bg-white h-[32px] px-[16px] rounded-[8px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] font-medium text-[14px] cursor-pointer shrink-0"
            >
              Edit
            </button>
          }
        >
          <FieldGrid fields={[
            { label: 'Contact Number', value: '+65 9123 4567' },
            { label: 'Email Address', value: 'chriswong@gmail.com' },
            { label: 'Mailing Address', value: '123 Silat Avenue, Singapore 164123' },
          ]} />
        </SectionCard>

        <SectionCard
          id="section-others"
          title="Others"
          subtitle={
            <>
              If policy is purchased via an agent, please contact agent for any updates or changes to policy. For more information, please refer to{' '}
              <a href="#" className="text-[#005eb8] underline">FAQ.</a>
            </>
          }
        >
          <FieldGrid fields={[
            { label: 'Agent-in-Charge (Agent ID)', value: 'Albert Tan (102434123)' },
            { label: 'Mobile Number', value: '9812 32345' },
            { label: 'Email Address', value: 'albertan@aia.com' },
          ]} />
        </SectionCard>

      </div>
    </div>
  )
}
