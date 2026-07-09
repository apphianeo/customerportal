import { ChevronRightIcon, ArrowForwardIcon } from '../components/icons'
import whatsappIcon from '../assets/icons/whatsapp.svg'
import phoneIcon from '../assets/icons/phone.svg'
import type { HelpTopicKey } from '../data/helpTopics'

/* ─── Quick action icons — solid blue glyphs, matches provided
   reference images precisely. ────────────────────────────────── */
function GettingStartedIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#005EB8" className="size-[22px]" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M12 13.5c-4.42 0-8 2.24-8 5v1.5c0 .55.45 1 1 1h14c.55 0 1-.45 1-1V18.5c0-2.76-3.58-5-8-5Z" />
    </svg>
  )
}

function AccountSettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#005EB8" className="size-[20px]" aria-hidden="true">
      <path d="M12 1a4.5 4.5 0 0 0-4.5 4.5V9H7a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 12 1Zm0 2a2.5 2.5 0 0 1 2.5 2.5V9h-5V5.5A2.5 2.5 0 0 1 12 3Zm0 9a1.75 1.75 0 0 1 1 3.19V17a1 1 0 1 1-2 0v-1.81A1.75 1.75 0 0 1 12 12Z" />
    </svg>
  )
}

function PoliciesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-[22px]" aria-hidden="true">
      <path d="M12 2 4.5 5v6c0 5.2 3.2 9.5 7.5 10.9 1.05-.34 2.04-.83 2.93-1.44a5 5 0 1 1 5.7-7.86A20 20 0 0 0 19.5 11V5L12 2Z" fill="#005EB8" />
      <circle cx="16.2" cy="15.2" r="2.7" fill="none" stroke="#005EB8" strokeWidth="1.7" />
      <line x1="18.1" y1="17.1" x2="20.2" y2="19.2" stroke="#005EB8" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

function PaymentsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#005EB8" className="size-[22px]" aria-hidden="true">
      <path d="M20 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 12H4v-6h16v6Zm0-9H4V7h16v1Z" />
      <rect x="6" y="13.4" width="3.2" height="1.7" rx="0.85" fill="white" />
    </svg>
  )
}

function WarningIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-[16px] shrink-0" aria-hidden="true">
      <path d="M8 1.5 15 14H1L8 1.5Z" fill="#FFA826" />
      <rect x="7.25" y="6" width="1.5" height="4" rx="0.75" fill="white" />
      <circle cx="8" cy="11.6" r="0.9" fill="white" />
    </svg>
  )
}

const QUICK_ACTIONS: { icon: React.ReactNode; title: string; subtitle: string; topic: HelpTopicKey }[] = [
  { icon: <GettingStartedIcon />, title: 'Getting Started', subtitle: 'Set up and explore your portal', topic: 'getting-started' },
  { icon: <PoliciesIcon />, title: 'Policies', subtitle: 'View and download your coverage', topic: 'policies' },
  { icon: <PaymentsIcon />, title: 'Payments & Billing', subtitle: 'Manage premiums and view invoices', topic: 'payments' },
  { icon: <AccountSettingsIcon />, title: 'Account & Settings', subtitle: 'Update your login and security', topic: 'account' },
]

function QuickActionCard({ icon, title, subtitle, onClick }: { icon: React.ReactNode; title: string; subtitle: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-[8px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] hover:shadow-pop transition-shadow px-[12px] py-[16px] flex flex-col items-center justify-center gap-[16px] text-center cursor-pointer border-0"
    >
      <div className="flex items-center justify-center size-[48px] rounded-[12px] shrink-0 bg-[rgba(0,94,184,0.08)]">
        {icon}
      </div>
      <div className="flex flex-col gap-[4px] items-center">
        <p className="text-[16px] font-medium text-[#212121] m-0">{title}</p>
        <p className="text-[14px] text-[#6e6e6e] m-0">{subtitle}</p>
      </div>
    </button>
  )
}

type Props = {
  onNavigateToDashboard?: () => void
  onSelectTopic?: (topic: HelpTopicKey) => void
}

export default function HelpSupportPage({ onNavigateToDashboard, onSelectTopic }: Props) {
  return (
    <div className="bg-bg-page min-h-full">
      <div className="w-full max-w-[980px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-[32px]">

        {/* Breadcrumb + title */}
        <div className="flex flex-col gap-[32px]">
          <div className="flex items-center gap-[4px] flex-wrap">
            <button onClick={onNavigateToDashboard} className="text-[12px] text-[#949494] leading-[1.4] bg-transparent border-0 p-0 cursor-pointer">
              Dashboard
            </button>
            <ChevronRightIcon size={10} style={{ color: '#6E6E6E' }} />
            <span className="text-[12px] font-bold text-[#005eb8] leading-[1.4]">Help &amp; Support</span>
          </div>
          <h1 className="text-[28px] sm:text-[32px] font-bold text-[#212121] leading-[1.2] m-0">How can we help you?</h1>
        </div>

        {/* Quick action cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] w-full">
          {QUICK_ACTIONS.map(({ topic, ...action }) => (
            <QuickActionCard key={topic} {...action} onClick={() => onSelectTopic?.(topic)} />
          ))}
        </div>

        <div className="border-t border-[rgba(0,0,0,0.09)] w-full" />

        {/* Still need help */}
        <div className="bg-white rounded-[8px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[24px] py-[16px] flex flex-col gap-[20px] w-full">
          <div className="flex flex-col gap-[6px]">
            <p className="text-[16px] font-semibold text-[#212121] m-0">Still need help?</p>
            <p className="text-[14px] text-[#6e6e6e] m-0">We're here to assist you!</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-[16px] sm:gap-[32px] w-full">
            <div className="flex-1 min-w-0 border border-[rgba(0,0,0,0.09)] rounded-[8px] p-[16px] flex flex-col gap-[8px]">
              <div className="flex gap-[8px] items-center">
                <img src={whatsappIcon} alt="" aria-hidden="true" className="size-[16px] shrink-0" />
                <span className="text-[14px] font-medium text-[#212121]">WhatsApp</span>
              </div>
              <div className="flex flex-col gap-[4px]">
                <span className="text-[14px] text-[#6e6e6e]">Chat instantly</span>
                <button
                  onClick={() => console.log('Start WhatsApp chat')}
                  className="flex items-center gap-[8px] text-[14px] font-medium text-[#005eb8] bg-transparent border-0 p-0 cursor-pointer w-fit"
                >
                  Start Chat
                  <ArrowForwardIcon size={12} />
                </button>
              </div>
            </div>

            <div className="flex-1 min-w-0 border border-[rgba(0,0,0,0.09)] rounded-[8px] p-[16px] flex flex-col gap-[8px]">
              <div className="flex gap-[8px] items-center">
                <img src={phoneIcon} alt="" aria-hidden="true" className="size-[16px] shrink-0" />
                <span className="text-[14px] font-medium text-[#212121]">Phone</span>
              </div>
              <div className="flex flex-col gap-[4px]">
                <span className="text-[14px] text-[#6e6e6e]">Mon-Fri, 9AM-6PM</span>
                <span className="text-[14px] text-[#005eb8]">(+65) 6222 7733</span>
              </div>
            </div>
          </div>

          <div className="bg-[#fff8ec] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-[8px] px-[16px] py-[12px] flex gap-[8px] items-center">
            <WarningIcon />
            <p className="text-[14px] text-[#212121] m-0">For emergencies, call 24/7 hotline: (+65) 6222 7737</p>
          </div>
        </div>

      </div>
    </div>
  )
}
