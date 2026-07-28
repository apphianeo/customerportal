import { useState } from 'react'
import Sidebar, { type NavKey } from './Sidebar'
import MobileBottomNav from './MobileBottomNav'
import TopHeader from './TopHeader'
import FooterShort from './FooterShort'
import WhatsappWidget from '../WhatsappWidget'
import DashboardPage from '../../pages/DashboardPage'
import PoliciesPage from '../../pages/PoliciesPage'
import UniTravelPolicyPage from '../../pages/UniTravelPolicyPage'
import ManageAccountPage from '../../pages/ManageAccountPage'
import HelpSupportPage from '../../pages/HelpSupportPage'
import type { AuthMethod } from '../../App'

export default function DashboardLayout({ onLogout, authMethod = 'account' }: { onLogout?: () => void; authMethod?: AuthMethod }) {
  const [activeNav, setActiveNav] = useState<NavKey>('dashboard')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [policyDetail, setPolicyDetail] = useState<string | null>(null)

  function navigate(key: NavKey) {
    setPolicyDetail(null)
    setActiveNav(key)
  }

  function goToPolicies() {
    setPolicyDetail(null)
    setActiveNav('policies')
  }

  function renderPage() {
    if (policyDetail === 'unitravel') {
      return <UniTravelPolicyPage onNavigateToDashboard={() => navigate('dashboard')} onNavigateToPolicies={goToPolicies} />
    }
    switch (activeNav) {
      case 'policies': return <PoliciesPage onSelectPolicy={setPolicyDetail} />
      case 'account':  return <ManageAccountPage onNavigateToDashboard={() => navigate('dashboard')} onLogout={onLogout} authMethod={authMethod} />
      case 'help':     return <HelpSupportPage onNavigateToDashboard={() => navigate('dashboard')} />
      default:         return <DashboardPage onNavigateToPolicies={() => setActiveNav('policies')} onSelectPolicy={setPolicyDetail} />
    }
  }

  const sidebarActiveKey = policyDetail ? 'policies' : activeNav

  return (
    <div className="flex h-screen overflow-hidden bg-bg-page">
      {/* ── Desktop Sidebar ── */}
      <Sidebar
        activeKey={sidebarActiveKey}
        onNavigate={navigate}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(c => !c)}
      />

      {/* ── Main column ── */}
      <div className="flex flex-col flex-1 min-w-0 h-full">
        <TopHeader onHome={() => navigate('dashboard')} onLogout={onLogout} />
        <main className="flex-1 overflow-y-auto pb-24 lg:pb-0">
          {renderPage()}
          <FooterShort />
        </main>
      </div>

      {/* ── Mobile Bottom Nav ── */}
      <MobileBottomNav activeKey={sidebarActiveKey} onNavigate={navigate} />

      {/* ── WhatsApp FAB (all logged-in pages) ── */}
      <WhatsappWidget />
    </div>
  )
}
