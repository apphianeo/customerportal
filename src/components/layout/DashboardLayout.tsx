import { useState } from 'react'
import Sidebar, { type NavKey } from './Sidebar'
import MobileBottomNav from './MobileBottomNav'
import TopHeader from './TopHeader'
import FooterShort from './FooterShort'

type Props = {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
  const [activeNav, setActiveNav] = useState<NavKey>('dashboard')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen bg-bg-page">
      {/* ── Desktop Sidebar ── */}
      <Sidebar
        activeKey={activeNav}
        onNavigate={setActiveNav}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(c => !c)}
      />

      {/* ── Main column ── */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Top header */}
        <TopHeader />

        {/* Scrollable page content */}
        <main className="flex-1 pb-24 lg:pb-0 overflow-y-auto">
          {children}
          <FooterShort />
        </main>
      </div>

      {/* ── Mobile Bottom Nav ── */}
      <MobileBottomNav activeKey={activeNav} onNavigate={setActiveNav} />
    </div>
  )
}
