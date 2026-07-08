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
import HelpTopicPage from '../../pages/HelpTopicPage'
import type { HelpTopicKey } from '../../data/helpTopics'
import SearchResultsPage from '../../pages/SearchResultsPage'

export default function DashboardLayout() {
  const [activeNav, setActiveNav] = useState<NavKey>('dashboard')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [policyDetail, setPolicyDetail] = useState<string | null>(null)
  const [helpTopic, setHelpTopic] = useState<HelpTopicKey | null>(null)
  const [searchQuery, setSearchQuery] = useState<string | null>(null)

  function navigate(key: NavKey) {
    setPolicyDetail(null)
    setHelpTopic(null)
    setSearchQuery(null)
    setActiveNav(key)
  }

  function goToPolicies() {
    setPolicyDetail(null)
    setSearchQuery(null)
    setActiveNav('policies')
  }

  function goToHelp() {
    setHelpTopic(null)
    setSearchQuery(null)
    setActiveNav('help')
  }

  function selectPolicy(slug: string) {
    setSearchQuery(null)
    setPolicyDetail(slug)
  }

  function selectHelpTopic(topic: HelpTopicKey) {
    setSearchQuery(null)
    setHelpTopic(topic)
  }

  function performSearch(query: string) {
    setPolicyDetail(null)
    setHelpTopic(null)
    setSearchQuery(query)
  }

  function renderPage() {
    if (policyDetail === 'unitravel') {
      return <UniTravelPolicyPage onNavigateToDashboard={() => navigate('dashboard')} onNavigateToPolicies={goToPolicies} />
    }
    if (helpTopic) {
      return <HelpTopicPage topic={helpTopic} onNavigateToDashboard={() => navigate('dashboard')} onNavigateToHelp={goToHelp} />
    }
    if (searchQuery !== null) {
      return (
        <SearchResultsPage
          query={searchQuery}
          onNavigateToDashboard={() => navigate('dashboard')}
          onSelectPolicy={selectPolicy}
          onSelectHelpTopic={selectHelpTopic}
        />
      )
    }
    switch (activeNav) {
      case 'policies': return <PoliciesPage onSelectPolicy={setPolicyDetail} />
      case 'account':  return <ManageAccountPage onNavigateToDashboard={() => navigate('dashboard')} />
      case 'help':     return <HelpSupportPage onNavigateToDashboard={() => navigate('dashboard')} onSelectTopic={setHelpTopic} />
      default:         return <DashboardPage onNavigateToPolicies={() => setActiveNav('policies')} onSelectPolicy={setPolicyDetail} />
    }
  }

  const sidebarActiveKey = policyDetail ? 'policies' : helpTopic ? 'help' : activeNav

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
        <TopHeader onSearch={performSearch} onSelectPolicy={selectPolicy} onSelectHelpTopic={selectHelpTopic} />
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
