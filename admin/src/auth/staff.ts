/**
 * Staff identity.
 *
 * In production this is OIDC against the corporate IdP (Entra ID) — the console
 * never sees a password, and AD group membership maps to the roles below. This
 * module is the seam: replace `signIn` with a redirect to the IdP and read the
 * role from the returned token's group claims. Nothing above it changes.
 */

export type StaffRole = 'support' | 'admin'

export type StaffUser = {
  id: string
  name: string
  email: string
  role: StaffRole
  department: string
}

export const ROLE_LABEL: Record<StaffRole, string> = {
  support: 'Support agent',
  admin: 'Administrator',
}

/** What each role is allowed to do. Read-only console, so this stays small. */
export const PERMISSIONS = {
  viewCustomers: ['support', 'admin'],
  unlockAccount: ['admin'],
  viewAuditLog: ['admin'],
} as const satisfies Record<string, readonly StaffRole[]>

export type Permission = keyof typeof PERMISSIONS

export function can(user: StaffUser | null, permission: Permission): boolean {
  if (!user) return false
  return (PERMISSIONS[permission] as readonly StaffRole[]).includes(user.role)
}

/** Stand-ins for accounts that would live in the corporate directory. */
export const DIRECTORY: StaffUser[] = [
  {
    id: 'u-1',
    name: 'Priya Menon',
    email: 'priya.menon@uoi.com.sg',
    role: 'support',
    department: 'Customer Service',
  },
  {
    id: 'u-2',
    name: 'Marcus Teo',
    email: 'marcus.teo@uoi.com.sg',
    role: 'admin',
    department: 'Operations',
  },
]

export const staffInitials = (u: StaffUser) =>
  u.name
    .split(' ')
    .map(part => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
