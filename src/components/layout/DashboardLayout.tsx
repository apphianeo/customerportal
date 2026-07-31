import { useEffect, useRef, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Sidebar, { type NavKey } from './Sidebar'
import MobileNavDrawer from './MobileNavDrawer'
import TopHeader from './TopHeader'
import { initials, type Account } from '../../data/accounts'
import FooterShort from './FooterShort'
import WhatsappWidget from '../WhatsappWidget'
import LogoutConfirmModal from '../LogoutConfirmModal'

/** URL path ↔ sidebar key. */
const NAV_PATHS: Record<NavKey, string> = {
  dashboard: '/dashboard',
  policies: '/policies',
  account: '/account',
  help: '/help',
}

function navKeyForPath(pathname: string): NavKey {
  if (pathname.startsWith('/policies')) return 'policies'
  if (pathname.startsWith('/account')) return 'account'
  if (pathname.startsWith('/help')) return 'help'
  return 'dashboard'
}

export default function DashboardLayout({
  account,
  onLogout,
}: {
  account?: Account
  onLogout?: () => void
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [confirmLogout, setConfirmLogout] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const mainRef = useRef<HTMLElement>(null)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const activeKey = navKeyForPath(pathname)

  /** Single nav entry point — always dismisses the mobile drawer. */
  function go(key: NavKey) {
    setMenuOpen(false)
    navigate(NAV_PATHS[key])
  }

  // Every navigation starts at the top of the page, not wherever the last one ended.
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 })
  }, [pathname])

  return (
    <div className="flex h-screen overflow-hidden bg-bg-page">
      {/* ── Desktop Sidebar ── */}
      <Sidebar
        activeKey={activeKey}
        onNavigate={go}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(c => !c)}
      />

      {/* ── Main column ── */}
      <div className="flex flex-col flex-1 min-w-0 h-full">
        <TopHeader
          userInitials={account ? initials(account) : undefined}
          onHome={() => go('dashboard')}
          onLogout={() => setConfirmLogout(true)}
          menuOpen={menuOpen}
          onToggleMenu={() => setMenuOpen(o => !o)}
        />
        <main ref={mainRef} className="flex-1 overflow-y-auto">
          <Outlet />
          <FooterShort />
        </main>
      </div>

      {/* ── Mobile nav drawer ── */}
      <MobileNavDrawer
        open={menuOpen}
        activeKey={activeKey}
        onNavigate={go}
        onClose={() => setMenuOpen(false)}
      />

      {/* ── WhatsApp FAB (all logged-in pages) ── */}
      <WhatsappWidget />

      {/* ── Logout confirmation ── */}
      {confirmLogout && (
        <LogoutConfirmModal
          onClose={() => setConfirmLogout(false)}
          onConfirm={() => { setConfirmLogout(false); onLogout?.() }}
        />
      )}
    </div>
  )
}
