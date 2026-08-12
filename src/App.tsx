import { useState } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom'
import './index.css'
import DashboardLayout from './components/layout/DashboardLayout'
import AuthFlow from './pages/auth/AuthFlow'
import DashboardPage from './pages/DashboardPage'
import PoliciesPage from './pages/PoliciesPage'
import PolicyDetailPage from './pages/PolicyDetailPage'
import ManageAccountPage from './pages/ManageAccountPage'
import HelpSupportPage from './pages/HelpSupportPage'
import { isPolicyholder, type Account } from './data/accounts'

export type AuthMethod = 'singpass' | 'account'

/* ─── Route-aware page wrappers ───────────────────────────── */
function DashboardRoute({ account }: { account: Account }) {
  const navigate = useNavigate()
  return (
    <DashboardPage
      firstName={account.firstName}
      hasPolicies={isPolicyholder(account.nric)}
      onNavigateToPolicies={() => navigate('/policies')}
      onSelectPolicy={slug => navigate(`/policies/${slug}`)}
      onNavigateToHelp={() => navigate('/help')}
    />
  )
}

function PoliciesRoute({ account }: { account: Account }) {
  const navigate = useNavigate()
  return (
    <PoliciesPage
      hasPolicies={isPolicyholder(account.nric)}
      onSelectPolicy={slug => navigate(`/policies/${slug}`)}
      onNavigateToDashboard={() => navigate('/dashboard')}
    />
  )
}

function PolicyDetailRoute() {
  const navigate = useNavigate()
  const { slug } = useParams()
  return (
    <PolicyDetailPage
      slug={slug}
      onNavigateToDashboard={() => navigate('/dashboard')}
      onNavigateToPolicies={() => navigate('/policies')}
    />
  )
}

function AccountRoute({ account, onLogout }: { account: Account; onLogout: () => void }) {
  const navigate = useNavigate()
  return (
    <ManageAccountPage
      key={account.nric}
      account={account}
      onNavigateToDashboard={() => navigate('/dashboard')}
      onLogout={onLogout}
      authMethod={account.authMethod}
    />
  )
}

function HelpRoute() {
  const navigate = useNavigate()
  return <HelpSupportPage onNavigateToDashboard={() => navigate('/dashboard')} />
}

/* ─── Auth screen — redirects into the app once signed in ── */
function LoginRoute({ onAuthenticated }: { onAuthenticated: (account: Account) => void }) {
  const navigate = useNavigate()
  return (
    <AuthFlow
      onAuthenticated={account => {
        onAuthenticated(account)
        navigate('/dashboard', { replace: true })
      }}
    />
  )
}

function AppRoutes() {
  /** The signed-in account, or null when signed out. */
  const [account, setAccount] = useState<Account | null>(null)

  function authenticate(signedIn: Account) {
    setAccount(signedIn)
  }

  function logout() {
    setAccount(null)
  }

  if (!account) {
    return (
      <Routes>
        <Route path="/login" element={<LoginRoute onAuthenticated={authenticate} />} />
        {/* Any deep link before sign-in lands on login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route element={<DashboardLayout account={account} onLogout={logout} />}>
        <Route path="/dashboard" element={<DashboardRoute account={account} />} />
        <Route path="/policies" element={<PoliciesRoute account={account} />} />
        <Route path="/policies/:slug" element={<PolicyDetailRoute />} />
        <Route path="/account" element={<AccountRoute account={account} onLogout={logout} />} />
        <Route path="/help" element={<HelpRoute />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
