/**
 * Audit trail.
 *
 * There is no UI for this in v1 — it exists because "who looked at which
 * customer, and when" is the first thing a compliance reviewer asks for, and
 * because recording it from day one costs nothing while retrofitting it means
 * touching every screen. In production these are writes to an append-only
 * store, not an in-memory array.
 */
import type { StaffUser } from '../auth/staff'

export type AuditAction =
  | 'staff.signed-in'
  | 'staff.signed-out'
  | 'customer.searched'
  | 'customer.viewed'
  | 'policy.viewed'
  | 'account.unlocked'

export type AuditEvent = {
  id: string
  at: string
  actorId: string
  actorEmail: string
  actorRole: string
  action: AuditAction
  /** NRIC of the customer the action concerned, when there is one. */
  subject?: string
  detail?: string
}

const events: AuditEvent[] = []

export function record(
  actor: StaffUser | null,
  action: AuditAction,
  subject?: string,
  detail?: string,
) {
  if (!actor) return
  events.push({
    id: `evt-${events.length + 1}`,
    at: new Date().toISOString(),
    actorId: actor.id,
    actorEmail: actor.email,
    actorRole: actor.role,
    action,
    subject,
    detail,
  })
}

export function auditLog(): readonly AuditEvent[] {
  return events
}
