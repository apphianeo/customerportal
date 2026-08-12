import { ChevronRight } from 'lucide-react'
import { findCustomer, findPolicy, fullName } from '../data/customers'
import { Card, DataField, EmptyState, FieldGrid } from '../components/ui'
import { PolicyStatusBadge } from '../components/status'

export default function PolicyDetailPage({
  nric,
  policyId,
  onBackToCustomers,
  onBackToCustomer,
}: {
  nric: string
  policyId: string
  onBackToCustomers: () => void
  onBackToCustomer: () => void
}) {
  const customer = findCustomer(nric)
  const policy = findPolicy(nric, policyId)

  if (!customer || !policy) {
    return (
      <Card>
        <EmptyState title="Policy not found" hint={`No policy ${policyId} for ${nric}`} />
      </Card>
    )
  }

  return (
    <div className="flex flex-col gap-[32px]">
      <div className="flex flex-col gap-[24px]">
        <nav className="flex items-center gap-[4px] flex-wrap">
          <button
            onClick={onBackToCustomers}
            className="text-[12px] text-[#949494] leading-[1.4] bg-transparent border-0 p-0 cursor-pointer"
          >
            Customers
          </button>
          <ChevronRight size={10} className="text-[#6e6e6e]" aria-hidden="true" />
          <button
            onClick={onBackToCustomer}
            className="text-[12px] text-[#949494] leading-[1.4] bg-transparent border-0 p-0 cursor-pointer"
          >
            {fullName(customer)}
          </button>
          <ChevronRight size={10} className="text-[#6e6e6e]" aria-hidden="true" />
          <span className="text-[12px] font-semibold text-[#005eb8] leading-[1.4]">
            {policy.policyNo}
          </span>
        </nav>
        <div className="flex flex-wrap items-center gap-[12px]">
          <h1 className="text-[32px] font-semibold text-[#212121] leading-[1.2] m-0">
            {policy.productName}
          </h1>
          <PolicyStatusBadge status={policy.status} label={policy.statusLabel} />
        </div>
      </div>

      <Card title="Policy details">
        <FieldGrid>
          <DataField label="Product" value={policy.productName} />
          <DataField label="Policy no." value={policy.policyNo} />
          <DataField label="Plan" value={policy.plan} />
          <DataField label="Policy effective date" value={policy.coverageFrom} />
          <DataField label="Policy expiry date" value={policy.coverageTo} />
          <DataField label="Premium amount" value={policy.premium} />
          <DataField label="Payment terms" value={policy.paymentTerms} />
          <DataField
            label="Payment method"
            value={policy.cardLast4 ? `${policy.paymentMethod} ****${policy.cardLast4}` : policy.paymentMethod}
          />
        </FieldGrid>
      </Card>

      <Card title="Policyholder">
        <FieldGrid>
          <DataField label="Name" value={fullName(customer)} />
          <DataField label="NRIC/FIN" value={customer.nric} />
          <DataField label="Date of birth" value={customer.dob} />
          <DataField label="Email" value={customer.email} />
          <DataField label="Mobile" value={customer.phone} />
          <DataField label="Address" value={customer.address} />
        </FieldGrid>
      </Card>

      <Card title="Insured persons">
        <FieldGrid>
          {policy.insuredPersons.map((person, i) => (
            <DataField key={person} label={`Insured ${i + 1}`} value={person} />
          ))}
        </FieldGrid>
      </Card>
    </div>
  )
}
