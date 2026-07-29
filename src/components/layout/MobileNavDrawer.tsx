import { navItems } from './navItems'
import type { NavKey } from './Sidebar'

/**
 * Mobile navigation drawer — slides in from the left under the header,
 * dimming the page behind it. Replaces the old bottom tab bar so every
 * destination is reachable on small screens.
 */
export default function MobileNavDrawer({
  open,
  activeKey,
  onNavigate,
  onClose,
}: {
  open: boolean
  activeKey: NavKey
  onNavigate: (key: NavKey) => void
  onClose: () => void
}) {
  if (!open) return null

  return (
    <div className="lg:hidden fixed inset-x-0 top-[61px] bottom-0 z-40 flex">
      {/* Drawer */}
      <nav className="w-[60%] max-w-[280px] h-full bg-white overflow-y-auto px-[16px] py-[24px] shrink-0">
        <ul className="flex flex-col gap-[12px] list-none m-0 p-0">
          {navItems.map(({ key, label, icon }) => {
            const isActive = activeKey === key
            return (
              <li key={key}>
                <button
                  onClick={() => { onNavigate(key); onClose() }}
                  className={[
                    'flex items-center gap-[12px] w-full cursor-pointer border-0 py-[12px] px-[12px] text-left',
                    isActive
                      ? 'rounded-[4px] bg-[rgba(51,133,230,0.12)] text-primary'
                      : 'rounded-[8px] bg-transparent text-[#8D8D8D]',
                  ].join(' ')}
                >
                  <span className="size-[20px] shrink-0 flex items-center justify-center">{icon}</span>
                  <span className={['text-[16px] leading-relaxed flex-1 min-w-0', isActive ? 'font-medium' : ''].join(' ')}>
                    {label}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Dimmed page behind — tap to dismiss */}
      <button
        onClick={onClose}
        aria-label="Close menu"
        className="flex-1 h-full bg-black/40 border-0 p-0 cursor-pointer"
      />
    </div>
  )
}
