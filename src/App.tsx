import { useState } from 'react'
import './index.css'
import DashboardLayout from './components/layout/DashboardLayout'
import AuthFlow from './pages/auth/AuthFlow'

export default function App() {
  const [authed, setAuthed] = useState(false)

  if (!authed) return <AuthFlow onAuthenticated={() => setAuthed(true)} />
  return <DashboardLayout />
}
