import { Badge } from './ui'
import type { PolicyStatus, PortalStatus } from '../data/customers'

const PORTAL_LABEL: Record<PortalStatus, string> = {
  'not-registered': 'Not registered',
  active: 'Active',
  locked: 'Locked',
}

export function PortalStatusBadge({ status }: { status: PortalStatus }) {
  const tone = status === 'active' ? 'success' : status === 'locked' ? 'error' : 'neutral'
  return <Badge tone={tone}>{PORTAL_LABEL[status]}</Badge>
}

export function PolicyStatusBadge({ status, label }: { status: PolicyStatus; label: string }) {
  const tone = status === 'in-force' ? 'success' : status === 'renewal-due' ? 'caution' : 'neutral'
  return <Badge tone={tone}>{label}</Badge>
}

export function AuthMethodBadge({ method }: { method?: 'singpass' | 'account' }) {
  if (!method) return <span className="text-[14px] text-[#6e6e6e]">—</span>
  return (
    <Badge tone="info">{method === 'singpass' ? 'Singpass' : 'Manual sign-up'}</Badge>
  )
}
