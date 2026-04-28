import { useState } from 'react'
import uoiLogo from '../../assets/uoi-logo.svg'
import {
  HomeOutlined,
  HomeFilled,
  FileProtectOutlined,
  FileTextOutlined,
  TagsOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  ShoppingCartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'

export type NavKey = 'dashboard' | 'policies' | 'claims' | 'rewards' | 'account' | 'help'

const primaryNav: { key: NavKey; label: string; icon: React.ReactNode; activeIcon: React.ReactNode }[] = [
  { key: 'dashboard', label: 'Dashboard',  icon: <HomeOutlined />,          activeIcon: <HomeFilled /> },
  { key: 'policies',  label: 'Policies',   icon: <FileProtectOutlined />,   activeIcon: <FileProtectOutlined /> },
  { key: 'claims',    label: 'Claims',     icon: <FileTextOutlined />,      activeIcon: <FileTextOutlined /> },
  { key: 'rewards',   label: 'Rewards',    icon: <TagsOutlined />,          activeIcon: <TagsOutlined /> },
]

const secondaryNav: { key: NavKey; label: string; icon: React.ReactNode }[] = [
  { key: 'account', label: 'Manage Account',  icon: <SettingOutlined /> },
  { key: 'help',    label: 'Help & Support',  icon: <QuestionCircleOutlined /> },
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
        collapsed ? 'w-[64px]' : 'w-60',
      ].join(' ')}
    >
      {/* ── Top: logo + collapse ── */}
      <div className="flex items-center justify-between px-4 pt-6 pb-4 shrink-0">
        {!collapsed && <UoiLogo />}
        <button
          onClick={onToggleCollapse}
          className="text-text-tertiary hover:text-text-primary transition-colors ml-auto"
          aria-label="Toggle sidebar"
        >
          {collapsed ? <MenuUnfoldOutlined style={{ fontSize: 18 }} /> : <MenuFoldOutlined style={{ fontSize: 18 }} />}
        </button>
      </div>

      {/* ── Primary nav ── */}
      <nav className="flex flex-col gap-3 px-4 flex-1">
        <ul className="flex flex-col gap-1 list-none m-0 p-0">
          {primaryNav.map(({ key, label, icon, activeIcon }) => {
            const isActive = activeKey === key
            return (
              <li key={key}>
                <NavItem
                  label={label}
                  icon={isActive ? activeIcon : icon}
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
                  icon={icon}
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
        <div className="px-4 pb-6 mt-4 shrink-0">
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
  if (isActive) {
    return (
      <button
        onClick={onClick}
        title={collapsed ? label : undefined}
        className="flex items-stretch w-full rounded-lg overflow-hidden cursor-pointer bg-transparent border-0 p-0"
      >
        {/* Left gradient bar */}
        <span className="w-1 shrink-0 bg-gradient-to-b from-primary to-regal" />
        {/* Content */}
        <span
          className={[
            'flex items-center gap-3 flex-1 py-2.5 rounded-r-lg',
            'bg-gradient-to-r from-primary/10 to-regal/10',
            collapsed ? 'justify-center px-3' : 'pl-2.5 pr-3',
          ].join(' ')}
        >
          <span className="text-primary text-[20px] shrink-0">{icon}</span>
          {!collapsed && (
            <span className="text-primary text-sm font-medium leading-relaxed">{label}</span>
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
        'flex items-center gap-3 w-full rounded-lg py-2.5 cursor-pointer',
        'bg-transparent border-0 text-text-secondary hover:bg-grey-tag transition-colors',
        collapsed ? 'justify-center px-3' : 'px-3',
      ].join(' ')}
    >
      <span className="text-[20px] shrink-0">{icon}</span>
      {!collapsed && (
        <span className="text-sm leading-relaxed text-left">{label}</span>
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
      {/* Decorative circles */}
      <span className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-white/10 pointer-events-none" />
      <span className="absolute -bottom-6 -right-2 w-20 h-20 rounded-full bg-white/10 pointer-events-none" />

      <div className="relative flex flex-col gap-2">
        {/* Badge */}
        <span className="self-start bg-white/20 rounded-full px-2.5 py-0.5 text-[11px] text-white font-medium">
          Recommended
        </span>
        {/* Copy */}
        <p className="text-sm text-white font-medium leading-relaxed m-0">
          Protect your next trip from $10 onwards!
        </p>
        {/* CTA */}
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
