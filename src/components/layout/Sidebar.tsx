import { useState } from 'react'
import uoiLogo from '../../assets/uoi-logo.svg'
import {
  HomeOutlined,
  HomeFilled,
  TagsOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  ShoppingCartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'

export type NavKey = 'dashboard' | 'policies' | 'claims' | 'rewards' | 'account' | 'help'

const primaryNav: { key: NavKey; label: string; icon: React.ReactNode; activeIcon: React.ReactNode }[] = [
  { key: 'dashboard', label: 'Dashboard',  icon: <HomeOutlined />,   activeIcon: <HomeFilled /> },
  { key: 'policies',  label: 'Policies',   icon: <PolicyIcon />,     activeIcon: <PolicyIcon /> },
  { key: 'claims',    label: 'Claims',     icon: <ClaimsIcon />,     activeIcon: <ClaimsIcon /> },
  { key: 'rewards',   label: 'Rewards',    icon: <TagsOutlined />,   activeIcon: <TagsOutlined /> },
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
        collapsed ? 'w-[48px]' : 'w-60',
      ].join(' ')}
    >
      {/* ── Top: logo + collapse ── */}
      {collapsed ? (
        <div className="flex items-center justify-center h-[40px] shrink-0">
          <button
            onClick={onToggleCollapse}
            className="w-[48px] h-[40px] flex items-center justify-center text-text-tertiary hover:text-text-primary transition-colors"
            aria-label="Toggle sidebar"
          >
            <MenuUnfoldOutlined style={{ fontSize: 18 }} />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between px-4 pt-6 pb-4 shrink-0">
          <UoiLogo />
          <button
            onClick={onToggleCollapse}
            className="text-text-tertiary hover:text-text-primary transition-colors ml-auto"
            aria-label="Toggle sidebar"
          >
            <MenuFoldOutlined style={{ fontSize: 18 }} />
          </button>
        </div>
      )}

      {/* ── Primary nav ── */}
      <nav className={['flex flex-col gap-3 flex-1', collapsed ? 'px-0' : 'px-4'].join(' ')}>
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
        <div className={['border-t border-border-default my-1', collapsed ? 'mx-3' : ''].join(' ')} />

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
    if (collapsed) {
      return (
        <button
          onClick={onClick}
          title={label}
          className="flex items-start w-full cursor-pointer bg-transparent border-0 p-0 shrink-0"
        >
          <span className="self-stretch shrink-0 bg-gradient-to-b from-primary to-regal rounded-tl-[8px] rounded-bl-[8px]" style={{ width: 4 }} />
          <span className="flex items-center justify-center flex-1 py-[10px] bg-gradient-to-r from-primary/10 to-regal/10 rounded-tr-[8px] rounded-br-[8px]">
            <span className="size-5 shrink-0 flex items-center justify-center text-primary">{icon}</span>
          </span>
        </button>
      )
    }

    return (
      <button
        onClick={onClick}
        className="flex items-start w-full cursor-pointer bg-transparent border-0 p-0 shrink-0"
      >
        {/* 4px gradient accent bar — self-stretch fills the button height */}
        <span className="self-stretch w-[4px] shrink-0 bg-gradient-to-b from-primary to-regal rounded-tl-[8px] rounded-bl-[8px]" />
        {/* Content pill */}
        <span className="flex items-center gap-3 flex-1 py-[10px] pl-[10px] pr-3 bg-gradient-to-r from-primary/10 to-regal/10 rounded-tr-[8px] rounded-br-[8px]">
          <span className="size-5 shrink-0 flex items-center justify-center text-primary">{icon}</span>
          <span className="text-primary text-sm font-medium leading-relaxed flex-1 min-w-0">{label}</span>
        </span>
      </button>
    )
  }

  return (
    <button
      onClick={onClick}
      title={collapsed ? label : undefined}
      className={[
        'flex items-center justify-center w-full cursor-pointer',
        'bg-transparent border-0 text-text-secondary hover:bg-grey-tag transition-colors',
        collapsed ? 'py-[10px]' : 'gap-3 rounded-[8px] py-[10px] px-3',
      ].join(' ')}
    >
      <span className="size-5 shrink-0 flex items-center justify-center">{icon}</span>
      {!collapsed && (
        <span className="text-sm leading-relaxed text-left flex-1 min-w-0">{label}</span>
      )}
    </button>
  )
}

/* ─── Custom icons (exact paths from Figma) ────────────── */
function PolicyIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-full" aria-hidden="true">
      <path d="M10 18.3333C8.06944 17.8472 6.47556 16.7394 5.21833 15.01C3.96111 13.2806 3.33278 11.3606 3.33333 9.25V4.16667L10 1.66667L16.6667 4.16667V9.25C16.6667 10.125 16.5519 10.9758 16.3225 11.8025C16.0931 12.6292 15.7633 13.4172 15.3333 14.1667L12.875 11.7083C13.0278 11.4444 13.1425 11.1703 13.2192 10.8858C13.2958 10.6014 13.3339 10.3061 13.3333 10C13.3333 9.08333 13.0069 8.29861 12.3542 7.64583C11.7014 6.99306 10.9167 6.66667 10 6.66667C9.08333 6.66667 8.29861 6.99306 7.64583 7.64583C6.99306 8.29861 6.66667 9.08333 6.66667 10C6.66667 10.9167 6.99306 11.7014 7.64583 12.3542C8.29861 13.0069 9.08333 13.3333 10 13.3333C10.2917 13.3333 10.58 13.2953 10.865 13.2192C11.15 13.1431 11.4172 13.0283 11.6667 12.875L14.3542 15.5417C13.7708 16.2222 13.1144 16.8056 12.385 17.2917C11.6556 17.7778 10.8606 18.125 10 18.3333ZM10 11.6667C9.54167 11.6667 9.14944 11.5036 8.82333 11.1775C8.49722 10.8514 8.33389 10.4589 8.33333 10C8.33278 9.54111 8.49611 9.14889 8.82333 8.82333C9.15056 8.49778 9.54278 8.33444 10 8.33333C10.4572 8.33222 10.8497 8.49556 11.1775 8.82333C11.5053 9.15111 11.6683 9.54333 11.6667 10C11.665 10.4567 11.5019 10.8492 11.1775 11.1775C10.8531 11.5058 10.4606 11.6689 10 11.6667Z" fill="currentColor"/>
    </svg>
  )
}

function ClaimsIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-full" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M11.875 2.08333C11.875 2.02808 11.8531 1.97509 11.814 1.93602C11.7749 1.89695 11.7219 1.875 11.6667 1.875H5.83333C5.22555 1.875 4.64265 2.11644 4.21288 2.54621C3.78311 2.97598 3.54167 3.55888 3.54167 4.16667V15.8333C3.54167 16.4411 3.78311 17.024 4.21288 17.4538C4.64265 17.8836 5.22555 18.125 5.83333 18.125H14.1667C14.7745 18.125 15.3573 17.8836 15.7871 17.4538C16.2169 17.024 16.4583 16.4411 16.4583 15.8333V7.6225C16.4583 7.56725 16.4364 7.51426 16.3973 7.47519C16.3582 7.43612 16.3053 7.41417 16.25 7.41417H12.5C12.3342 7.41417 12.1753 7.34832 12.0581 7.23111C11.9408 7.1139 11.875 6.95493 11.875 6.78917V2.08333ZM12.5 10.2083C12.6658 10.2083 12.8247 10.2742 12.9419 10.3914C13.0592 10.5086 13.125 10.6676 13.125 10.8333C13.125 10.9991 13.0592 11.1581 12.9419 11.2753C12.8247 11.3925 12.6658 11.4583 12.5 11.4583H7.5C7.33424 11.4583 7.17527 11.3925 7.05806 11.2753C6.94085 11.1581 6.875 10.9991 6.875 10.8333C6.875 10.6676 6.94085 10.5086 7.05806 10.3914C7.17527 10.2742 7.33424 10.2083 7.5 10.2083H12.5ZM12.5 13.5417C12.6658 13.5417 12.8247 13.6075 12.9419 13.7247C13.0592 13.8419 13.125 14.0009 13.125 14.1667C13.125 14.3324 13.0592 14.4914 12.9419 14.6086C12.8247 14.7258 12.6658 14.7917 12.5 14.7917H7.5C7.33424 14.7917 7.17527 14.7258 7.05806 14.6086C6.94085 14.4914 6.875 14.3324 6.875 14.1667C6.875 14.0009 6.94085 13.8419 7.05806 13.7247C7.17527 13.6075 7.33424 13.5417 7.5 13.5417H12.5Z" fill="currentColor"/>
      <path d="M13.125 2.35333C13.125 2.2 13.2858 2.1025 13.405 2.19833C13.5061 2.28 13.5958 2.375 13.6742 2.48333L16.185 5.98083C16.2417 6.06083 16.18 6.16417 16.0817 6.16417H13.3333C13.2781 6.16417 13.2251 6.14222 13.186 6.10315C13.1469 6.06408 13.125 6.01109 13.125 5.95583V2.35333Z" fill="currentColor"/>
    </svg>
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
