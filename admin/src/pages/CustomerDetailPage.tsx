import { ChevronRight } from 'lucide-react'
import {
  activePolicyCount,
  findCustomer,
  fullName,
  initials,
  type PortalStatus,
} from '../data/customers'
import { Card, Cell, DataField, EmptyState, FieldGrid, OutlineButton, Row, Table } from '../components/ui'
import { AuthMethodBadge, PolicyStatusBadge, PortalStatusBadge } from '../components/status'
import { can, type StaffUser } from '../auth/staff'

export default function CustomerDetailPage({
  nric,
  user,
  statusOverride,
  onBack,
  onSelectPolicy,
  onUnlock,
}: {
  nric: string
  user: StaffUser | null
  /** Set when an admin unlocked the account this session. */
  statusOverride?: PortalStatus
  onBack: () => void
  onSelectPolicy: (policyId: string) => void
  onUnlock: (nric: string) => void
}) {
  const customer = findCustomer(nric)

  if (!customer) {
    return (
      <div className="flex flex-col gap-[24px]">
        <Breadcrumb onBack={onBack} current="Not found" />
        <Card>
          <EmptyState title="Customer not found" hint={`No record for ${nric}`} />
        </Card>
      </div>
    )
  }

  const portal = { ...customer.portal, status: statusOverride ?? customer.portal.status }
  const canUnlock = can(user, 'unlockAccount')

  return (
    <div className="flex flex-col gap-[32px]">
      <div className="flex flex-col gap-[24px]">
        <Breadcrumb onBack={onBack} current={fullName(customer)} />
        <div className="flex flex-wrap items-center justify-between gap-[16px]">
          <div className="flex items-center gap-[16px] min-w-0">
            <span className="flex items-center justify-center size-[48px] rounded-[8px] bg-[#eff6ff] text-[#005eb8] text-[16px] font-semibold shrink-0">
              {initials(customer)}
            </span>
            <div className="flex flex-col gap-[4px] min-w-0">
              <h1 className="text-[32px] font-semibold text-[#212121] leading-[1.2] m-0">
                {fullName(customer)}
              </h1>
              <span className="text-[14px] text-[#6e6e6e] leading-[1.5]">{customer.nric}</span>
            </div>
          </div>
          <div className="flex items-center gap-[12px]">
            <PortalStatusBadge status={portal.status} />
            {portal.status === 'locked' && (
              <OutlineButton
                onClick={() => onUnlock(customer.nric)}
                disabled={!canUnlock}
                title={canUnlock ? undefined : 'Administrators only'}
              >
                Unlock account
              </OutlineButton>
            )}
          </div>
        </div>
      </div>

      {/* Portal account — the thing the customer portal owns */}
      <Card title="Portal account">
        <FieldGrid>
          <DataField label="Status" value={<PortalStatusBadge status={portal.status} />} />
          <DataField label="Sign-in method" value={<AuthMethodBadge method={portal.authMethod} />} />
          <DataField label="Registered on" value={portal.registeredOn} />
          <DataField label="Last sign-in" value={portal.lastLoginOn} />
          {portal.status === 'locked' && portal.lockedOn && (
            <DataField label="Locked on" value={portal.lockedOn} />
          )}
        </FieldGrid>
        {portal.status === 'not-registered' && (
          <p className="text-[14px] text-[#6e6e6e] leading-[1.5] m-0">
            Holds {customer.policies.length === 1 ? 'a policy' : 'policies'} with UOI but has never
            created a portal login, so there is nothing to reset or unlock.
          </p>
        )}
        {portal.status === 'locked' && (
          <p className="text-[14px] text-[#6e6e6e] leading-[1.5] m-0">
            Locked automatically after 6 months without a sign-in. Applies to accounts holding no
            UOI products.
          </p>
        )}
      </Card>

      {/* Personal details — from the policy system, not editable here */}
      <Card title="Personal details">
        <FieldGrid>
          <DataField label="Salutation" value={customer.salutation} />
          <DataField label="Name" value={fullName(customer)} />
          <DataField label="NRIC/FIN" value={customer.nric} />
          <DataField label="Date of birth" value={customer.dob} />
          <DataField label="Email" value={customer.email} />
          <DataField label="Mobile" value={customer.phone} />
          <DataField label="Address" value={customer.address} />
          <DataField label="Postal code" value={customer.postal} />
        </FieldGrid>
      </Card>

      {/* Policies */}
      <Card
        title="Policies"
        action={
          <span className="text-[14px] text-[#6e6e6e] leading-[1.5]">
            {customer.policies.length === 0
              ? 'No products'
              : `${activePolicyCount(customer)} active of ${customer.policies.length}`}
          </span>
        }
        bodyClassName=""
      >
        {customer.policies.length === 0 ? (
          <EmptyState
            title="No policies held"
            hint="Registered on the portal but has not bought a UOI product"
          />
        ) : (
          <Table head={['Product', 'Policy no.', 'Status', 'Coverage', 'Premium', '']}>
            {customer.policies.map(p => (
              <Row key={p.id} onClick={() => onSelectPolicy(p.id)}>
                <Cell>
                  <span className="font-medium">{p.productName}</span>
                </Cell>
                <Cell muted>{p.policyNo}</Cell>
                <Cell>
                  <PolicyStatusBadge status={p.status} label={p.statusLabel} />
                </Cell>
                <Cell muted>
                  {p.coverageFrom} – {p.coverageTo}
                </Cell>
                <Cell muted>{p.premium}</Cell>
                <Cell muted>
                  <ChevronRight size={16} className="text-[#949494]" aria-hidden="true" />
                </Cell>
              </Row>
            ))}
          </Table>
        )}
      </Card>
    </div>
  )
}

function Breadcrumb({ onBack, current }: { onBack: () => void; current: string }) {
  return (
    <nav className="flex items-center gap-[4px] flex-wrap">
      <button
        onClick={onBack}
        className="text-[12px] text-[#949494] leading-[1.4] bg-transparent border-0 p-0 cursor-pointer"
      >
        Customers
      </button>
      <ChevronRight size={10} className="text-[#6e6e6e]" aria-hidden="true" />
      <span className="text-[12px] font-semibold text-[#005eb8] leading-[1.4]">{current}</span>
    </nav>
  )
}
