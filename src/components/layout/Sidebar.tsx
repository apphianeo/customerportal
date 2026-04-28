import { useState } from 'react'
import uoiLogo from '../../assets/uoi-logo.svg'
import { Home, Shield, FileText, Tag, Settings, HelpCircle } from 'lucide-react'
import { ShoppingCartOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

export type NavKey = 'dashboard' | 'policies' | 'claims' | 'rewards' | 'account' | 'help'

type NavItemDef = {
  key: NavKey
  label: string
  icon: (active: boolean) => React.ReactNode
}

const primaryNav: NavItemDef[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: (active) => (
      <Home
        size={24}
        strokeWidth={1.5}
        fill={active ? 'currentColor' : 'none'}
      />
    ),
  },
  {
    key: 'policies',
    label: 'Policies',
    icon: (active) => (
      <Shield
        size={24}
        strokeWidth={1.5}
        fill={active ? 'currentColor' : 'none'}
      />
    ),
  },
  {
    key: 'claims',
    label: 'Claims',
    icon: (active) => (
      <FileText
        size={24}
        strokeWidth={1.5}
        fill={active ? 'currentColor' : 'none'}
      />
    ),
  },
  {
    key: 'rewards',
    label: 'Rewards',
    icon: (_active) => (
      <Tag size={24} strokeWidth={1.5} fill="currentColor" />
    ),
  },
]

const secondaryNav: NavItemDef[] = [
  {
    key: 'account',
    label: 'Manage Account',
    icon: (_active) => (
      <Settings size={24} strokeWidth={1.5} fill="currentColor" />
    ),
  },
  {
    key: 'help',
    label: 'Help & Support',
    icon: (_active) => (
      <HelpCircle size={24} strokeWidth={1.5} fill="currentColor" />
    ),
  },
]

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
        'hidden lg:flex flex-col sticky top-0 h-screen overflow-y-auto',
        'bg-white border-r border-border-default shadow-card z-20',
        'transition-all duration-200',
        collapsed ? 'w-[80px]' : 'w-[260px]',
      ].join(' ')}
    >
      {/* ── Top: logo + collapse ── */}
      {collapsed ? (
        <div className="flex items-center justify-center h-[60px] shrink-0">
          <button
            onClick={onToggleCollapse}
            className="flex items-center justify-center text-[#64748b] hover:text-[#1e3a8a] transition-colors"
            aria-label="Expand sidebar"
          >
            <MenuUnfoldOutlined style={{ fontSize: 18 }} />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between px-[16px] pt-6 pb-4 shrink-0">
          <UoiLogo />
          <button
            onClick={onToggleCollapse}
            className="text-[#64748b] hover:text-[#1e3a8a] transition-colors ml-auto"
            aria-label="Collapse sidebar"
          >
            <MenuFoldOutlined style={{ fontSize: 18 }} />
          </button>
        </div>
      )}

      {/* ── Primary nav ── */}
      <nav className="flex flex-col gap-3 flex-1 px-[16px]">
        <ul className="flex flex-col gap-1 list-none m-0 p-0">
          {primaryNav.map(({ key, label, icon }) => {
            const isActive = activeKey === key
            return (
              <li key={key}>
                <NavItem
                  label={label}
                  icon={icon(isActive)}
                  isActive={isActive}
                  collapsed={collapsed}
                  onClick={() => onNavigate?.(key)}
                />
              </li>
            )
          })}
        </ul>

        {/* Divider */}
        <div className="border-t border-border-default my-1" />

        {/* Secondary nav */}
        <ul className="flex flex-col gap-1 list-none m-0 p-0">
          {secondaryNav.map(({ key, label, icon }) => {
            const isActive = activeKey === key
            return (
              <li key={key}>
                <NavItem
                  label={label}
                  icon={icon(isActive)}
                  isActive={isActive}
                  collapsed={collapsed}
                  onClick={() => onNavigate?.(key)}
                />
              </li>
            )
          })}
        </ul>
      </nav>

      {/* ── Promo card ── */}
      {!collapsed && (
        <div className="px-[16px] pb-6 mt-4 shrink-0">
          <PromoCard />
        </div>
      )}
    </aside>
  )
}

/* ─── Nav Item ─────────────────────────────────────────── */
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
  return (
    <button
      onClick={onClick}
      title={collapsed ? label : undefined}
      className={[
        'relative overflow-hidden flex items-center w-full cursor-pointer border-0 p-0',
        'rounded-[8px] py-[10px]',
        isActive
          ? 'bg-gradient-to-r from-primary/10 to-regal/10 text-[#1e3a8a]'
          : 'bg-transparent text-[#64748b] hover:bg-grey-tag transition-colors',
        collapsed ? 'px-[16px]' : 'px-[16px]',
      ].join(' ')}
    >
      {/* Active indicator bar — absolute, ignores padding */}
      {isActive && (
        <span className="absolute left-0 top-0 bottom-0 w-[4px] self-stretch bg-[#1e3a8a] rounded-tl-[8px] rounded-bl-[8px]" />
      )}

      {/* Icon */}
      {collapsed ? (
        <span className="flex-1 flex justify-center">
          {icon}
        </span>
      ) : (
        <span className="flex items-center gap-[10px]">
          <span className="shrink-0 flex items-center justify-center">{icon}</span>
          <span className="text-sm font-medium leading-relaxed">{label}</span>
        </span>
      )}
    </button>
  )
}

/* ─── UOI Logo ─────────────────────────────────────────── */
function UoiLogo() {
  return (
    <img
      src={uoiLogo}
      alt="UOI"
      width={100}
      height={51}
      className="object-contain shrink-0"
    />
  )
}

/* ─── Promo Card ───────────────────────────────────────── */
function PromoCard() {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  return (
    <div className="relative rounded-lg p-3 bg-gradient-to-r from-primary to-regal overflow-hidden">
      <span className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-white/10 pointer-events-none" />
      <span className="absolute -bottom-6 -right-2 w-20 h-20 rounded-full bg-white/10 pointer-events-none" />

      <div className="relative flex flex-col gap-2">
        <span className="self-start bg-white/20 rounded-full px-2.5 py-0.5 text-[11px] text-white font-medium">
          Recommended
        </span>
        <p className="text-sm text-white font-medium leading-relaxed m-0">
          Protect your next trip from $10 onwards!
        </p>
        <button
          className="flex items-center justify-center gap-2 w-full h-8 rounded-lg bg-white shadow-card text-primary text-sm font-medium cursor-pointer border-0 mt-1 hover:bg-bg-info transition-colors"
          onClick={() => setDismissed(true)}
        >
          Buy Now <ShoppingCartOutlined />
        </button>
      </div>
    </div>
  )
}
