import {
  HomeFilled,
  HomeOutlined,
  FileProtectOutlined,
  FileTextOutlined,
  TagsOutlined,
} from '@ant-design/icons'
import type { NavKey } from './Sidebar'

const mobileNavItems: { key: NavKey; label: string; icon: React.ReactNode; activeIcon: React.ReactNode }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: <HomeOutlined />,        activeIcon: <HomeFilled /> },
  { key: 'policies',  label: 'Policies',  icon: <FileProtectOutlined />, activeIcon: <FileProtectOutlined /> },
  { key: 'claims',    label: 'Claims',    icon: <FileTextOutlined />,    activeIcon: <FileTextOutlined /> },
  { key: 'rewards',   label: 'Rewards',   icon: <TagsOutlined />,        activeIcon: <TagsOutlined /> },
]

type Props = {
  activeKey?: NavKey
  onNavigate?: (key: NavKey) => void
}

export default function MobileBottomNav({ activeKey = 'dashboard', onNavigate }: Props) {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-border-default" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <ul className="flex list-none m-0 p-0">
        {mobileNavItems.map(({ key, label, icon, activeIcon }) => {
          const isActive = activeKey === key
          return (
            <li key={key} className="flex-1">
              <button
                onClick={() => onNavigate?.(key)}
                className={[
                  'flex flex-col items-center justify-center gap-1 w-full py-2 border-0 cursor-pointer bg-transparent transition-colors',
                  isActive ? 'text-primary' : 'text-text-tertiary hover:text-text-secondary',
                ].join(' ')}
              >
                <span className="text-[20px] leading-none">
                  {isActive ? activeIcon : icon}
                </span>
                <span
                  className={[
                    'text-[10px] leading-none',
                    isActive ? 'font-medium' : 'font-normal',
                  ].join(' ')}
                >
                  {label}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
