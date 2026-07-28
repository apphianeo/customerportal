import { useState } from 'react'
import './index.css'
import DashboardLayout from './components/layout/DashboardLayout'
import AuthFlow from './pages/auth/AuthFlow'

export type AuthMethod = 'singpass' | 'account'

export default function App() {
  const [authed, setAuthed] = useState(false)
  const [authMethod, setAuthMethod] = useState<AuthMethod>('account')

  function authenticate(method: AuthMethod = 'account') {
    setAuthMethod(method)
    setAuthed(true)
  }

  function logout() {
    setAuthed(false)
  }

  if (!authed) return <AuthFlow onAuthenticated={authenticate} />
  return <DashboardLayout onLogout={logout} authMethod={authMethod} />
}
