import uoiLogo from '../../assets/uoi-logo.svg'
import { PanelLeft } from 'lucide-react'
import { navItems } from './navItems'

export type NavKey = 'dashboard' | 'policies' | 'account' | 'help'

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
          <button onClick={() => onNavigate?.('dashboard')} aria-label="Go to dashboard" className="bg-transparent border-0 p-0 cursor-pointer">
            <img src={uoiLogo} alt="UOI" width={48} height={24} className="object-contain" />
          </button>
          <button
            onClick={onToggleCollapse}
            aria-label="Expand sidebar"
            className="flex items-center justify-center w-[48px] h-[40px] text-[#8D8D8D]"
          >
            <PanelLeft size={18} />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between shrink-0 mb-[24px]">
          <button onClick={() => onNavigate?.('dashboard')} aria-label="Go to dashboard" className="bg-transparent border-0 p-0 cursor-pointer shrink-0">
            <img src={uoiLogo} alt="UOI" width={100} height={51} className="object-contain shrink-0" />
          </button>
          <button
            onClick={onToggleCollapse}
            aria-label="Collapse sidebar"
            className="text-[#8D8D8D]"
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
                icon={icon}
                isActive={activeKey === key}
                collapsed={collapsed}
                onClick={() => onNavigate?.(key)}
              />
            </li>
          ))}
        </ul>
      </nav>
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
  return (
    <button
      onClick={onClick}
      title={collapsed ? label : undefined}
      className={[
        'flex items-center w-full cursor-pointer border-0 py-[10px] px-[12px]',
        collapsed ? 'justify-center' : 'gap-[12px]',
        isActive
          ? 'rounded-[4px] bg-[rgba(51,133,230,0.12)] text-primary'
          : 'rounded-[8px] bg-transparent text-[#8D8D8D]',
      ].join(' ')}
    >
      <span className="size-[20px] shrink-0 flex items-center justify-center">{icon}</span>
      {!collapsed && (
        <span
          className={[
            'text-sm leading-relaxed flex-1 min-w-0 text-left',
            isActive ? 'font-medium' : '',
          ].join(' ')}
        >
          {label}
        </span>
      )}
    </button>
  )
}

