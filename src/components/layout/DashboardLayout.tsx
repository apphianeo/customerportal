import { useState } from 'react'
import Sidebar, { type NavKey } from './Sidebar'
import MobileBottomNav from './MobileBottomNav'
import TopHeader from './TopHeader'
import FooterShort from './FooterShort'
import DashboardPage from '../../pages/DashboardPage'
import PoliciesPage from '../../pages/PoliciesPage'

export default function DashboardLayout() {
  const [activeNav, setActiveNav] = useState<NavKey>('dashboard')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  function renderPage() {
    switch (activeNav) {
      case 'policies': return <PoliciesPage />
      default:         return <DashboardPage />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-bg-page">
      {/* ── Desktop Sidebar ── */}
      <Sidebar
        activeKey={activeNav}
        onNavigate={setActiveNav}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(c => !c)}
      />

      {/* ── Main column ── */}
      <div className="flex flex-col flex-1 min-w-0 h-full">
        <TopHeader />
        <main className="flex-1 overflow-y-auto pb-24 lg:pb-0">
          {renderPage()}
          <FooterShort />
        </main>
      </div>

      {/* ── Mobile Bottom Nav ── */}
      <MobileBottomNav activeKey={activeNav} onNavigate={setActiveNav} />
    </div>
  )
}
