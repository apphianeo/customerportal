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
import { fullName, isPolicyholder, type Account } from './data/accounts'

export type AuthMethod = 'singpass' | 'account'

/** Policies show only once the identity is verified AND matches a policyholder. */
const canSeePolicies = (account: Account) => account.verified && isPolicyholder(account.nric)

/* ─── Route-aware page wrappers ───────────────────────────── */
function DashboardRoute({ account }: { account: Account }) {
  const navigate = useNavigate()
  return (
    <DashboardPage
      name={fullName(account)}
      hasPolicies={canSeePolicies(account)}
      onNavigateToPolicies={() => navigate('/policies')}
      onSelectPolicy={slug => navigate(`/policies/${slug}`)}
      onNavigateToHelp={() => navigate('/help')}
    />
  )
}

function PoliciesRoute({
  account,
  bannerDismissed,
  onDismissBanner,
}: {
  account: Account
  bannerDismissed: boolean
  onDismissBanner: () => void
}) {
  const navigate = useNavigate()
  return (
    <PoliciesPage
      hasPolicies={canSeePolicies(account)}
      onSelectPolicy={slug => navigate(`/policies/${slug}`)}
      onNavigateToDashboard={() => navigate('/dashboard')}
      bannerDismissed={bannerDismissed}
      onDismissBanner={onDismissBanner}
    />
  )
}

function PolicyDetailRoute({ account }: { account: Account }) {
  const navigate = useNavigate()
  const { slug } = useParams()
  return (
    <PolicyDetailPage
      slug={slug}
      account={account}
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
  /** Policies-page notice: dismissing hides it for the rest of the session but
      it returns on the next sign-in, so the flag is reset on each login. */
  const [policiesBannerDismissed, setPoliciesBannerDismissed] = useState(false)

  function authenticate(signedIn: Account) {
    setAccount(signedIn)
    setPoliciesBannerDismissed(false)
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
        <Route
          path="/policies"
          element={
            <PoliciesRoute
              account={account}
              bannerDismissed={policiesBannerDismissed}
              onDismissBanner={() => setPoliciesBannerDismissed(true)}
            />
          }
        />
        <Route path="/policies/:slug" element={<PolicyDetailRoute account={account} />} />
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
