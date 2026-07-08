import { useState } from 'react'
import Sidebar, { type NavKey } from './Sidebar'
import MobileBottomNav from './MobileBottomNav'
import TopHeader from './TopHeader'
import FooterShort from './FooterShort'
import DashboardPage from '../../pages/DashboardPage'
import PoliciesPage from '../../pages/PoliciesPage'
import UniTravelPolicyPage from '../../pages/UniTravelPolicyPage'
import ManageAccountPage from '../../pages/ManageAccountPage'
import HelpSupportPage from '../../pages/HelpSupportPage'

export default function DashboardLayout() {
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
      case 'account':  return <ManageAccountPage onNavigateToDashboard={() => navigate('dashboard')} />
      case 'help':     return <HelpSupportPage onNavigateToDashboard={() => navigate('dashboard')} />
      default:         return <DashboardPage onNavigateToPolicies={() => setActiveNav('policies')} />
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
        <TopHeader />
        <main className="flex-1 overflow-y-auto pb-24 lg:pb-0">
          {renderPage()}
          <FooterShort />
        </main>
      </div>

      {/* ── Mobile Bottom Nav ── */}
      <MobileBottomNav activeKey={sidebarActiveKey} onNavigate={navigate} />
    </div>
  )
}
