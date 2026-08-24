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
import AuthFlow, { SingpassLogin, SingpassPrompt } from './pages/auth/AuthFlow'
import DashboardPage from './pages/DashboardPage'
import PoliciesPage from './pages/PoliciesPage'
import PolicyDetailPage from './pages/PolicyDetailPage'
import ManageAccountPage from './pages/ManageAccountPage'
import HelpSupportPage from './pages/HelpSupportPage'
import { isPolicyholder, verifyAccount, type Account } from './data/accounts'

export type AuthMethod = 'singpass' | 'account'

/** Policies show only once the identity is verified AND matches a policyholder. */
const canSeePolicies = (account: Account) => account.verified && isPolicyholder(account.nric)

/* ─── Route-aware page wrappers ───────────────────────────── */
function DashboardRoute({ account, onStartVerify }: { account: Account; onStartVerify: () => void }) {
  const navigate = useNavigate()
  const [modalDismissed, setModalDismissed] = useState(false)
  return (
    <>
      <DashboardPage
        firstName={account.firstName}
        hasPolicies={canSeePolicies(account)}
        onNavigateToPolicies={() => navigate('/policies')}
        onSelectPolicy={slug => navigate(`/policies/${slug}`)}
        onNavigateToHelp={() => navigate('/help')}
      />
      {/* Prospect prompt: an unverified account has to verify with Singpass
          before any policies can be matched and shown. */}
      {!account.verified && !modalDismissed && (
        <SingpassPrompt
          title="Verify your identity"
          subtitle="Verify your identity with Singpass to view your policies"
          onClose={() => setModalDismissed(true)}
          onAuthenticate={onStartVerify}
        />
      )}
    </>
  )
}

function PoliciesRoute({ account }: { account: Account }) {
  const navigate = useNavigate()
  return (
    <PoliciesPage
      hasPolicies={canSeePolicies(account)}
      onSelectPolicy={slug => navigate(`/policies/${slug}`)}
      onNavigateToDashboard={() => navigate('/dashboard')}
    />
  )
}

/** Post-login identity check for a manual (unverified) account: just the
    Singpass QR scan — no Myinfo consent screen, since we are only confirming
    who they are, not pulling their profile. */
function VerifyIdentity({ onVerified }: { onVerified: () => void }) {
  return <SingpassLogin onScan={onVerified} />
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
  /** True while an unverified account is completing the Singpass check. */
  const [verifying, setVerifying] = useState(false)

  function authenticate(signedIn: Account) {
    setAccount(signedIn)
  }

  function logout() {
    setAccount(null)
    setVerifying(false)
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

  // Full-screen Singpass verification, launched from the prospect dashboard.
  if (verifying) {
    return (
      <VerifyIdentity
        onVerified={() => {
          verifyAccount(account.email)
          setAccount({ ...account, verified: true })
          setVerifying(false)
        }}
      />
    )
  }

  return (
    <Routes>
      <Route element={<DashboardLayout account={account} onLogout={logout} />}>
        <Route path="/dashboard" element={<DashboardRoute account={account} onStartVerify={() => setVerifying(true)} />} />
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
