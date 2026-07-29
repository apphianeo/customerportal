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

export type AuthMethod = 'singpass' | 'account'

/* ─── Route-aware page wrappers ───────────────────────────── */
function DashboardRoute() {
  const navigate = useNavigate()
  return (
    <DashboardPage
      onNavigateToPolicies={() => navigate('/policies')}
      onSelectPolicy={slug => navigate(`/policies/${slug}`)}
      onNavigateToHelp={() => navigate('/help')}
    />
  )
}

function PoliciesRoute() {
  const navigate = useNavigate()
  return <PoliciesPage onSelectPolicy={slug => navigate(`/policies/${slug}`)} />
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

function AccountRoute({ authMethod, onLogout }: { authMethod: AuthMethod; onLogout: () => void }) {
  const navigate = useNavigate()
  return (
    <ManageAccountPage
      onNavigateToDashboard={() => navigate('/dashboard')}
      onLogout={onLogout}
      authMethod={authMethod}
    />
  )
}

function HelpRoute() {
  const navigate = useNavigate()
  return <HelpSupportPage onNavigateToDashboard={() => navigate('/dashboard')} />
}

/* ─── Auth screen — redirects into the app once signed in ── */
function LoginRoute({ onAuthenticated }: { onAuthenticated: (method?: AuthMethod) => void }) {
  const navigate = useNavigate()
  return (
    <AuthFlow
      onAuthenticated={method => {
        onAuthenticated(method)
        navigate('/dashboard', { replace: true })
      }}
    />
  )
}

function AppRoutes() {
  const [authed, setAuthed] = useState(false)
  const [authMethod, setAuthMethod] = useState<AuthMethod>('account')

  function authenticate(method: AuthMethod = 'account') {
    setAuthMethod(method)
    setAuthed(true)
  }

  function logout() {
    setAuthed(false)
  }

  if (!authed) {
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
      <Route element={<DashboardLayout onLogout={logout} />}>
        <Route path="/dashboard" element={<DashboardRoute />} />
        <Route path="/policies" element={<PoliciesRoute />} />
        <Route path="/policies/:slug" element={<PolicyDetailRoute />} />
        <Route path="/account" element={<AccountRoute authMethod={authMethod} onLogout={logout} />} />
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
