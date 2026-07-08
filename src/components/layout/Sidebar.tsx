import { useState } from 'react'
import uoiLogo from '../../assets/uoi-logo.svg'
import shieldSvg from '../../assets/shield.svg'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { PanelLeft } from 'lucide-react'

export type NavKey = 'dashboard' | 'policies' | 'account' | 'help'

type NavItemDef = {
  key: NavKey
  label: string
  icon: (active: boolean) => React.ReactNode
}

/* ─── Icons — exact Figma SVG paths, size-[20px] ─────────── */
function HomeIcon({ active }: { active: boolean }) {
  if (active) {
    return (
      <svg viewBox="0 0 20 20" fill="none" className="size-full" aria-hidden="true">
        <defs>
          <linearGradient id="home-grad" x1="3.416" y1="3.461" x2="16.667" y2="3.461" gradientUnits="userSpaceOnUse">
            <stop stopColor="#005EB8" />
            <stop offset="1" stopColor="#5C55EB" />
          </linearGradient>
        </defs>
        <path d="M3.33333 17.5V7.5L10 2.5L16.6667 7.5V17.5H11.6667V11.6667H8.33333V17.5H3.33333Z" fill="url(#home-grad)" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-full" aria-hidden="true">
      <path d="M3.33333 17.5V7.5L10 2.5L16.6667 7.5V17.5H11.6667V11.6667H8.33333V17.5H3.33333Z" fill="currentColor" />
    </svg>
  )
}

function PolicyIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-full" aria-hidden="true">
      <path d="M10 18.3333C8.06944 17.8472 6.47556 16.7394 5.21833 15.01C3.96111 13.2806 3.33278 11.3606 3.33333 9.25V4.16667L10 1.66667L16.6667 4.16667V9.25C16.6667 10.125 16.5519 10.9758 16.3225 11.8025C16.0931 12.6292 15.7633 13.4172 15.3333 14.1667L12.875 11.7083C13.0278 11.4444 13.1425 11.1703 13.2192 10.8858C13.2958 10.6014 13.3339 10.3061 13.3333 10C13.3333 9.08333 13.0069 8.29861 12.3542 7.64583C11.7014 6.99306 10.9167 6.66667 10 6.66667C9.08333 6.66667 8.29861 6.99306 7.64583 7.64583C6.99306 8.29861 6.66667 9.08333 6.66667 10C6.66667 10.9167 6.99306 11.7014 7.64583 12.3542C8.29861 13.0069 9.08333 13.3333 10 13.3333C10.2917 13.3333 10.58 13.2953 10.865 13.2192C11.15 13.1431 11.4172 13.0283 11.6667 12.875L14.3542 15.5417C13.7708 16.2222 13.1144 16.8056 12.385 17.2917C11.6556 17.7778 10.8606 18.125 10 18.3333ZM10 11.6667C9.54167 11.6667 9.14944 11.5036 8.82333 11.1775C8.49722 10.8514 8.33389 10.4589 8.33333 10C8.33278 9.54111 8.49611 9.14889 8.82333 8.82333C9.15056 8.49778 9.54278 8.33444 10 8.33333C10.4572 8.33222 10.8497 8.49556 11.1775 8.82333C11.5053 9.15111 11.6683 9.54333 11.6667 10C11.665 10.4567 11.5019 10.8492 11.1775 11.1775C10.8531 11.5058 10.4606 11.6689 10 11.6667Z" fill="currentColor" />
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-full" aria-hidden="true">
      <path d="M7.70833 18.3333L7.375 15.6667C7.19445 15.5972 7.02444 15.5139 6.865 15.4167C6.70556 15.3194 6.54917 15.2153 6.39583 15.1042L3.91667 16.1458L1.625 12.1875L3.77083 10.5625C3.75694 10.4653 3.75 10.3717 3.75 10.2817V9.71917C3.75 9.62861 3.75694 9.53472 3.77083 9.4375L1.625 7.8125L3.91667 3.85417L6.39583 4.89583C6.54861 4.78472 6.70833 4.68056 6.875 4.58333C7.04167 4.48611 7.20833 4.40278 7.375 4.33333L7.70833 1.66667H12.2917L12.625 4.33333C12.8056 4.40278 12.9758 4.48611 13.1358 4.58333C13.2958 4.68056 13.4519 4.78472 13.6042 4.89583L16.0833 3.85417L18.375 7.8125L16.2292 9.4375C16.2431 9.53472 16.25 9.62861 16.25 9.71917V10.2808C16.25 10.3714 16.2361 10.4653 16.2083 10.5625L18.3542 12.1875L16.0625 16.1458L13.6042 15.1042C13.4514 15.2153 13.2917 15.3194 13.125 15.4167C12.9583 15.5139 12.7917 15.5972 12.625 15.6667L12.2917 18.3333H7.70833ZM10.0417 12.9167C10.8472 12.9167 11.5347 12.6319 12.1042 12.0625C12.6736 11.4931 12.9583 10.8056 12.9583 10C12.9583 9.19444 12.6736 8.50694 12.1042 7.9375C11.5347 7.36806 10.8472 7.08333 10.0417 7.08333C9.22222 7.08333 8.53111 7.36806 7.96833 7.9375C7.40556 8.50694 7.12444 9.19444 7.125 10C7.12556 10.8056 7.40694 11.4931 7.96917 12.0625C8.53139 12.6319 9.22222 12.9167 10.0417 12.9167Z" fill="currentColor" />
    </svg>
  )
}

function HelpIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-full" aria-hidden="true">
      <path d="M10.6983 14.6983C10.8994 14.4967 11 14.25 11 13.9583C11 13.6667 10.8994 13.42 10.6983 13.2183C10.4972 13.0167 10.2506 12.9161 9.95833 12.9167C9.66611 12.9172 9.41972 13.0181 9.21917 13.2192C9.01861 13.4203 8.91778 13.6667 8.91667 13.9583C8.91556 14.25 9.01639 14.4967 9.21917 14.6983C9.42194 14.9 9.66833 15.0006 9.95833 15C10.2483 14.9994 10.495 14.8986 10.6983 14.6975M9.20833 11.7917H10.75C10.75 11.3333 10.8022 10.9722 10.9067 10.7083C11.0111 10.4444 11.3061 10.0833 11.7917 9.625C12.1528 9.26389 12.4375 8.92 12.6458 8.59333C12.8542 8.26667 12.9583 7.87444 12.9583 7.41667C12.9583 6.63889 12.6736 6.04167 12.1042 5.625C11.5347 5.20833 10.8611 5 10.0833 5C9.29167 5 8.64944 5.20833 8.15667 5.625C7.66389 6.04167 7.32 6.54167 7.125 7.125L8.5 7.66667C8.56944 7.41667 8.72583 7.14583 8.96917 6.85417C9.2125 6.5625 9.58389 6.41667 10.0833 6.41667C10.5278 6.41667 10.8611 6.53833 11.0833 6.78167C11.3056 7.025 11.4167 7.29222 11.4167 7.58333C11.4167 7.86111 11.3333 8.12167 11.1667 8.365C11 8.60833 10.7917 8.83389 10.5417 9.04167C9.93055 9.58333 9.55556 9.99306 9.41667 10.2708C9.27778 10.5486 9.20833 11.0556 9.20833 11.7917ZM10 18.3333C8.84722 18.3333 7.76389 18.1147 6.75 17.6775C5.73611 17.2403 4.85417 16.6464 4.10417 15.8958C3.35417 15.1453 2.76056 14.2633 2.32333 13.25C1.88611 12.2367 1.66722 11.1533 1.66667 10C1.66611 8.84667 1.885 7.76333 2.32333 6.75C2.76167 5.73667 3.35528 4.85472 4.10417 4.10417C4.85306 3.35361 5.735 2.76 6.75 2.32333C7.765 1.88667 8.84833 1.66778 10 1.66667C11.1517 1.66556 12.235 1.88444 13.25 2.32333C14.265 2.76222 15.1469 3.35583 15.8958 4.10417C16.6447 4.8525 17.2386 5.73445 17.6775 6.75C18.1164 7.76556 18.335 8.84889 18.3333 10C18.3317 11.1511 18.1128 12.2344 17.6767 13.25C17.2406 14.2656 16.6469 15.1475 15.8958 15.8958C15.1447 16.6442 14.2628 17.2381 13.25 17.6775C12.2372 18.1169 11.1539 18.3356 10 18.3333Z" fill="currentColor" />
    </svg>
  )
}

/* ─── Nav definitions ─────────────────────────────────────── */
const navItems: NavItemDef[] = [
  { key: 'dashboard', label: 'Dashboard',       icon: (a) => <HomeIcon active={a} /> },
  { key: 'policies',  label: 'Policies',        icon: () => <PolicyIcon /> },
  { key: 'account',   label: 'Manage Account',  icon: () => <SettingsIcon /> },
  { key: 'help',      label: 'Help & Support',  icon: () => <HelpIcon /> },
]

/* ─── Sidebar ─────────────────────────────────────────────── */
type Props = {
  activeKey?: NavKey
  onNavigate?: (key: NavKey) => void
  collapsed?: boolean
  onToggleCollapse?: () => void
}

export default function Sidebar({
  activeKey = 'dashboard',
  onNavigate,
  collapsed = false,
  onToggleCollapse,
}: Props) {
  return (
    <aside
      className={[
        'hidden lg:flex flex-col h-full overflow-y-auto',
        'bg-white border-r border-border-default shadow-card z-20',
        'transition-all duration-200 px-[16px] py-[24px]',
        collapsed ? 'w-[80px]' : 'w-[240px]',
      ].join(' ')}
    >
      {/* ── Logo + toggle ── */}
      {collapsed ? (
        <div className="flex flex-col gap-[16px] items-start shrink-0 mb-[16px]">
          <img src={uoiLogo} alt="UOI" width={48} height={24} className="object-contain" />
          <button
            onClick={onToggleCollapse}
            aria-label="Expand sidebar"
            className="flex items-center justify-center w-[48px] h-[40px] text-[#8D8D8D] hover:text-primary transition-colors"
          >
            <PanelLeft size={18} />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between shrink-0 mb-[24px]">
          <img src={uoiLogo} alt="UOI" width={100} height={51} className="object-contain shrink-0" />
          <button
            onClick={onToggleCollapse}
            aria-label="Collapse sidebar"
            className="text-[#8D8D8D] hover:text-primary transition-colors"
          >
            <PanelLeft size={18} />
          </button>
        </div>
      )}

      {/* ── Nav ── */}
      <nav className="flex flex-col flex-1">
        <ul className="flex flex-col gap-[12px] list-none m-0 p-0">
          {navItems.map(({ key, label, icon }) => (
            <li key={key}>
              <NavItem
                label={label}
                icon={icon(activeKey === key)}
                isActive={activeKey === key}
                collapsed={collapsed}
                onClick={() => onNavigate?.(key)}
              />
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Promo card ── */}
      {!collapsed && (
        <div className="mt-[16px] shrink-0">
          <PromoCard />
        </div>
      )}
    </aside>
  )
}

/* ─── Nav Item ─────────────────────────────────────────────── */
function NavItem({
  label,
  icon,
  isActive,
  collapsed,
  onClick,
}: {
  label: string
  icon: React.ReactNode
  isActive: boolean
  collapsed: boolean
  onClick: () => void
}) {
  if (isActive) {
    return (
      <button
        onClick={onClick}
        title={collapsed ? label : undefined}
        className="flex items-start w-full cursor-pointer border-0 p-0 bg-transparent"
      >
        {/* Gradient accent bar */}
        <span className="w-[4px] self-stretch shrink-0 bg-gradient-to-b from-primary to-regal rounded-tl-[8px] rounded-bl-[8px]" />
        {/* Content */}
        <span
          className={[
            'flex items-center bg-gradient-to-r from-primary/10 to-regal/10',
            'rounded-tr-[8px] rounded-br-[8px] text-primary flex-1',
            collapsed ? 'justify-center py-[10px] px-[12px]' : 'gap-[12px] pl-[10px] pr-[12px] py-[10px]',
          ].join(' ')}
        >
          <span className="size-[20px] shrink-0 flex items-center justify-center">{icon}</span>
          {!collapsed && (
            <span className="text-sm font-medium leading-relaxed flex-1 min-w-0 text-left">{label}</span>
          )}
        </span>
      </button>
    )
  }

  return (
    <button
      onClick={onClick}
      title={collapsed ? label : undefined}
      className={[
        'flex items-center w-full cursor-pointer border-0 bg-transparent rounded-[8px]',
        'text-[#8D8D8D] hover:bg-grey-tag transition-colors py-[10px] px-[12px]',
        collapsed ? 'justify-center' : 'gap-[12px]',
      ].join(' ')}
    >
      <span className="size-[20px] shrink-0 flex items-center justify-center">{icon}</span>
      {!collapsed && (
        <span className="text-sm leading-relaxed flex-1 min-w-0 text-left">{label}</span>
      )}
    </button>
  )
}

/* ─── Promo Card ───────────────────────────────────────────── */
function PromoCard() {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  return (
    <div className="relative rounded-[8px] px-[12px] py-[16px] bg-gradient-to-r from-primary to-regal overflow-hidden shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)]">
      <img src={shieldSvg} alt="" aria-hidden="true" className="absolute -right-3 top-0 h-full w-auto pointer-events-none select-none" />

      <div className="relative flex flex-col gap-[8px]">
        <span className="self-start bg-white/20 rounded-full px-[10px] py-[3px] text-[11px] text-white font-medium">
          Recommended
        </span>
        <p className="text-sm text-white font-medium leading-relaxed m-0">
          Protect your next trip from $10 onwards!
        </p>
        <button
          className="flex items-center justify-center gap-2 w-full h-8 rounded-[8px] bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] text-primary text-sm font-medium cursor-pointer border-0 hover:bg-bg-info transition-colors"
          onClick={() => setDismissed(true)}
        >
          Buy Now <ShoppingCartOutlined />
        </button>
      </div>
    </div>
  )
}
