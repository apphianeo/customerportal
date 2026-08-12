import { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom'
import './index.css'
import ConsoleShell from './components/ConsoleShell'
import SignInPage from './pages/SignInPage'
import CustomersPage from './pages/CustomersPage'
import CustomerDetailPage from './pages/CustomerDetailPage'
import PolicyDetailPage from './pages/PolicyDetailPage'
import { can, type StaffUser } from './auth/staff'
import { record } from './data/audit'
import { findCustomer, type PortalStatus } from './data/customers'

/** Status changes made this session, keyed by NRIC. Real version writes to the API. */
type StatusOverrides = Record<string, PortalStatus>

function CustomersRoute({ user }: { user: StaffUser }) {
  const navigate = useNavigate()
  return (
    <CustomersPage
      onSelectCustomer={nric => navigate(`/customers/${nric}`)}
      onSearch={query => {
        // Searches are logged too — they reveal which customers were looked for.
        if (query.trim().length >= 3) record(user, 'customer.searched', undefined, query.trim())
      }}
    />
  )
}

function CustomerDetailRoute({
  user,
  overrides,
  onUnlock,
}: {
  user: StaffUser
  overrides: StatusOverrides
  onUnlock: (nric: string) => void
}) {
  const navigate = useNavigate()
  const { nric = '' } = useParams()

  useEffect(() => {
    if (findCustomer(nric)) record(user, 'customer.viewed', nric)
  }, [nric, user])

  return (
    <CustomerDetailPage
      nric={nric}
      user={user}
      statusOverride={overrides[nric]}
      onBack={() => navigate('/customers')}
      onSelectPolicy={policyId => navigate(`/customers/${nric}/policies/${policyId}`)}
      onUnlock={onUnlock}
    />
  )
}

function PolicyDetailRoute({ user }: { user: StaffUser }) {
  const navigate = useNavigate()
  const { nric = '', policyId = '' } = useParams()

  useEffect(() => {
    record(user, 'policy.viewed', nric, policyId)
  }, [nric, policyId, user])

  return (
    <PolicyDetailPage
      nric={nric}
      policyId={policyId}
      onBackToCustomers={() => navigate('/customers')}
      onBackToCustomer={() => navigate(`/customers/${nric}`)}
    />
  )
}

function SignedIn({
  user,
  onSignOut,
  overrides,
  onUnlock,
}: {
  user: StaffUser
  onSignOut: () => void
  overrides: StatusOverrides
  onUnlock: (nric: string) => void
}) {
  const navigate = useNavigate()
  return (
    <ConsoleShell user={user} onSignOut={onSignOut} onHome={() => navigate('/customers')}>
      <Routes>
        <Route path="/customers" element={<CustomersRoute user={user} />} />
        <Route
          path="/customers/:nric"
          element={<CustomerDetailRoute user={user} overrides={overrides} onUnlock={onUnlock} />}
        />
        <Route
          path="/customers/:nric/policies/:policyId"
          element={<PolicyDetailRoute user={user} />}
        />
        <Route path="*" element={<Navigate to="/customers" replace />} />
      </Routes>
    </ConsoleShell>
  )
}

function ConsoleRoutes() {
  const [user, setUser] = useState<StaffUser | null>(null)
  const [overrides, setOverrides] = useState<StatusOverrides>({})

  function signIn(staff: StaffUser) {
    setUser(staff)
    record(staff, 'staff.signed-in')
  }

  function signOut() {
    record(user, 'staff.signed-out')
    setUser(null)
  }

  function unlock(nric: string) {
    // Belt and braces — the control is already hidden from support agents.
    if (!can(user, 'unlockAccount')) return
    setOverrides(o => ({ ...o, [nric]: 'active' }))
    record(user, 'account.unlocked', nric)
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/sign-in" element={<SignInPage onSignIn={signIn} />} />
        <Route path="*" element={<Navigate to="/sign-in" replace />} />
      </Routes>
    )
  }

  return <SignedIn user={user} onSignOut={signOut} overrides={overrides} onUnlock={unlock} />
}

export default function App() {
  return (
    <BrowserRouter>
      <ConsoleRoutes />
    </BrowserRouter>
  )
}
