import { RightOutlined, ArrowRightOutlined } from '@ant-design/icons'

/* ─── Quick action icons — solid blue, matches design system ─ */
function GettingStartedIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-[18px]" aria-hidden="true">
      <circle cx="10" cy="10" r="8" stroke="#005EB8" strokeWidth="1.6" />
      <circle cx="10" cy="10" r="2" fill="#005EB8" />
      <path d="M10 2V5M10 15V18M2 10H5M15 10H18" stroke="#005EB8" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function PoliciesIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-[18px]" aria-hidden="true">
      <rect x="4" y="2.5" width="12" height="15" rx="1.5" stroke="#005EB8" strokeWidth="1.6" />
      <path d="M7 7H13M7 10.5H13M7 14H10.5" stroke="#005EB8" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function PaymentsIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-[18px]" aria-hidden="true">
      <rect x="2" y="4.5" width="16" height="11" rx="1.8" stroke="#005EB8" strokeWidth="1.6" />
      <path d="M2 8.5H18" stroke="#005EB8" strokeWidth="1.6" />
      <rect x="4.5" y="11.5" width="4" height="1.8" rx="0.9" fill="#005EB8" />
    </svg>
  )
}

function AccountSettingsIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-[18px]" aria-hidden="true">
      <rect x="4.5" y="9" width="11" height="8" rx="1.6" stroke="#005EB8" strokeWidth="1.6" />
      <path d="M6.8 9V6.5C6.8 4.6 8.3 3 10 3C11.7 3 13.2 4.6 13.2 6.5V9" stroke="#005EB8" strokeWidth="1.6" />
      <circle cx="10" cy="12.7" r="1.1" fill="#005EB8" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-[16px] shrink-0" aria-hidden="true">
      <circle cx="8" cy="8" r="8" fill="#25D366" />
      <path
        d="M8 3.6c-2.43 0-4.4 1.97-4.4 4.4 0 .78.2 1.53.59 2.19L3.6 12.4l2.26-.59a4.38 4.38 0 0 0 2.14.55c2.43 0 4.4-1.97 4.4-4.4S10.43 3.6 8 3.6Zm0 0"
        fill="#25D366"
      />
      <path
        d="M6.1 5.85c.13-.29.27-.3.4-.3h.32c.1 0 .24-.04.37.29.14.34.47 1.17.51 1.26.04.08.07.18.01.29-.06.1-.09.17-.18.26-.09.1-.19.22-.27.3-.09.08-.18.18-.08.35.1.18.44.73.95 1.18.65.58 1.2.76 1.38.85.18.08.28.07.38-.04.11-.11.44-.51.55-.68.11-.18.23-.15.38-.09.15.06.98.46 1.15.55.17.08.29.13.33.2.04.07.04.4-.1.79-.13.39-.79.75-1.1.8-.29.06-.65.08-1.06-.07-.24-.09-.55-.19-.95-.37-1.68-.72-2.78-2.42-2.86-2.53-.08-.11-.68-.9-.68-1.72 0-.82.43-1.22.58-1.39Z"
        fill="white"
      />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-[16px] shrink-0" aria-hidden="true">
      <path
        d="M4.4 2.4h2l1 2.6-1.3 1c.5 1.1 1.4 2 2.5 2.5l1-1.3 2.6 1v2c0 .55-.45 1-1 1.05C6.8 11 3 7.2 2.35 3.9 2.3 3.35 2.75 2.4 3.3 2.4h1.1Z"
        fill="#212121"
      />
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

const QUICK_ACTIONS = [
  { icon: <GettingStartedIcon />, title: 'Getting Started', subtitle: 'Set up and explore your portal' },
  { icon: <PoliciesIcon />, title: 'Policies', subtitle: 'View and download your coverage' },
  { icon: <PaymentsIcon />, title: 'Payments & Billing', subtitle: 'Manage premiums and view invoices' },
  { icon: <AccountSettingsIcon />, title: 'Account & Settings', subtitle: 'Update your login and security' },
]

function QuickActionCard({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <button
      onClick={() => console.log('Open help topic', title)}
      className="bg-white rounded-[8px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[12px] py-[16px] flex flex-col items-center justify-center gap-[16px] text-center cursor-pointer border-0"
    >
      <div
        className="flex items-center justify-center size-[36px] rounded-[9px] shrink-0"
        style={{ backgroundImage: 'linear-gradient(90deg, rgba(0,94,184,0.1) 0%, rgba(92,85,235,0.1) 100%)' }}
      >
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
}

export default function HelpSupportPage({ onNavigateToDashboard }: Props) {
  return (
    <div className="bg-bg-page min-h-full">
      <div className="w-full max-w-[980px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-[32px]">

        {/* Breadcrumb + title */}
        <div className="flex flex-col gap-[32px]">
          <div className="flex items-center gap-[4px] flex-wrap">
            <button onClick={onNavigateToDashboard} className="text-[12px] text-[#949494] leading-[1.4] bg-transparent border-0 p-0 cursor-pointer hover:text-[#6e6e6e] transition-colors">
              Dashboard
            </button>
            <RightOutlined style={{ fontSize: 10, color: '#6E6E6E' }} />
            <span className="text-[12px] font-bold text-[#005eb8] leading-[1.4]">Help &amp; Support</span>
          </div>
          <h1 className="text-[28px] sm:text-[32px] font-bold text-[#212121] leading-[1.2] m-0">How can we help you?</h1>
        </div>

        {/* Quick action cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] w-full">
          {QUICK_ACTIONS.map(action => (
            <QuickActionCard key={action.title} {...action} />
          ))}
        </div>

        <div className="border-t border-[rgba(0,0,0,0.09)] w-full" />

        {/* Still need help */}
        <div className="bg-white rounded-[8px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[24px] py-[16px] flex flex-col gap-[20px] w-full">
          <div className="flex flex-col gap-[6px]">
            <p className="text-[16px] font-medium text-[#212121] m-0">Still need help?</p>
            <p className="text-[14px] text-[#6e6e6e] m-0">We're here to assist you!</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-[16px] sm:gap-[32px] w-full">
            <div className="flex-1 min-w-0 border border-[rgba(0,0,0,0.09)] rounded-[8px] p-[16px] flex flex-col gap-[8px]">
              <div className="flex gap-[8px] items-center">
                <WhatsAppIcon />
                <span className="text-[14px] font-medium text-[#212121]">WhatsApp</span>
              </div>
              <div className="flex flex-col gap-[4px]">
                <span className="text-[14px] text-[#6e6e6e]">Chat instantly</span>
                <button
                  onClick={() => console.log('Start WhatsApp chat')}
                  className="flex items-center gap-[8px] text-[14px] font-medium text-[#005eb8] bg-transparent border-0 p-0 cursor-pointer w-fit"
                >
                  Start Chat
                  <ArrowRightOutlined style={{ fontSize: 12 }} />
                </button>
              </div>
            </div>

            <div className="flex-1 min-w-0 border border-[rgba(0,0,0,0.09)] rounded-[8px] p-[16px] flex flex-col gap-[8px]">
              <div className="flex gap-[8px] items-center">
                <PhoneIcon />
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
