import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import {
  CUSTOMERS,
  activePolicyCount,
  fullName,
  isPolicyholder,
  searchCustomers,
  type Customer,
} from '../data/customers'
import { Card, Cell, EmptyState, Row, Table } from '../components/ui'
import { AuthMethodBadge, PortalStatusBadge } from '../components/status'

/**
 * Segments the console exists to make visible. "Policyholder, no portal
 * account" is the adoption gap; "registered, no products" is a marketing
 * segment that is invisible in the policy system today.
 */
const SEGMENTS = [
  { key: 'all', label: 'All customers', match: () => true },
  { key: 'portal', label: 'Portal users', match: (c: Customer) => c.portal.status !== 'not-registered' },
  {
    key: 'gap',
    label: 'Policyholders, no portal account',
    match: (c: Customer) => isPolicyholder(c) && c.portal.status === 'not-registered',
  },
  {
    key: 'prospect',
    label: 'Registered, no products',
    match: (c: Customer) => !isPolicyholder(c) && c.portal.status !== 'not-registered',
  },
  { key: 'locked', label: 'Locked', match: (c: Customer) => c.portal.status === 'locked' },
] as const

type SegmentKey = (typeof SEGMENTS)[number]['key']

export default function CustomersPage({
  onSelectCustomer,
  onSearch,
}: {
  onSelectCustomer: (nric: string) => void
  onSearch: (query: string) => void
}) {
  const [query, setQuery] = useState('')
  const [segment, setSegment] = useState<SegmentKey>('all')

  // 2k records — filtering in memory is instant, so no server round trip.
  const rows = useMemo(() => {
    const matcher = SEGMENTS.find(s => s.key === segment)!.match
    return searchCustomers(query).filter(matcher)
  }, [query, segment])

  const counts = useMemo(
    () =>
      Object.fromEntries(
        SEGMENTS.map(s => [s.key, CUSTOMERS.filter(s.match).length]),
      ) as Record<SegmentKey, number>,
    [],
  )

  return (
    <div className="flex flex-col gap-[32px]">
      <div className="flex flex-col gap-[4px]">
        <h1 className="text-[32px] font-semibold text-[#212121] leading-[1.2] m-0">Customers</h1>
        <p className="text-[16px] text-[#6e6e6e] leading-[1.5] m-0">
          Everyone with a UOI product or a portal account
        </p>
      </div>

      <Card bodyClassName="flex flex-col">
        {/* Search + segments */}
        <div className="px-[24px] py-[16px] flex flex-col gap-[16px] border-b border-[rgba(0,0,0,0.09)]">
          <div className="relative w-full max-w-[420px]">
            <Search
              size={18}
              aria-hidden="true"
              className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[#6e6e6e] pointer-events-none"
            />
            <input
              value={query}
              onChange={e => {
                setQuery(e.target.value)
                onSearch(e.target.value)
              }}
              placeholder="Search name, NRIC/FIN, email or policy no."
              aria-label="Search customers"
              className="bg-white border border-[rgba(0,0,0,0.09)] rounded-[8px] pl-[42px] pr-[16px] py-[12px] w-full text-[16px] text-[#212121] leading-[1.5] outline-none placeholder:text-[#949494] focus:border-[#005eb8] focus:shadow-[0px_0px_0px_3px_rgba(0,94,184,0.2)]"
            />
          </div>
          <div className="flex flex-wrap gap-[8px]">
            {SEGMENTS.map(s => {
              const active = s.key === segment
              return (
                <button
                  key={s.key}
                  onClick={() => setSegment(s.key)}
                  className={`rounded-[8px] px-[12px] py-[6px] text-[14px] leading-[1.5] border cursor-pointer ${
                    active
                      ? 'bg-[#eff6ff] border-[#005eb8] text-[#005eb8] font-medium'
                      : 'bg-white border-[rgba(0,0,0,0.09)] text-[#6e6e6e]'
                  }`}
                >
                  {s.label}
                  <span className={active ? 'text-[#005eb8]' : 'text-[#949494]'}> ({counts[s.key]})</span>
                </button>
              )
            })}
          </div>
        </div>

        {rows.length === 0 ? (
          <EmptyState title="No customers match" hint="Try a different name, NRIC/FIN or policy number" />
        ) : (
          <Table head={['Name', 'NRIC/FIN', 'Contact', 'Portal account', 'Sign-in method', 'Policies']}>
            {rows.map(c => (
              <Row key={c.nric} onClick={() => onSelectCustomer(c.nric)}>
                <Cell>
                  <span className="font-medium">{fullName(c)}</span>
                </Cell>
                <Cell muted>{c.nric}</Cell>
                <Cell muted>
                  <span className="flex flex-col">
                    <span>{c.email}</span>
                    <span className="text-[#949494]">{c.phone}</span>
                  </span>
                </Cell>
                <Cell>
                  <PortalStatusBadge status={c.portal.status} />
                </Cell>
                <Cell>
                  <AuthMethodBadge method={c.portal.authMethod} />
                </Cell>
                <Cell muted>
                  {c.policies.length === 0 ? (
                    <span className="text-[#949494]">None</span>
                  ) : (
                    `${activePolicyCount(c)} active of ${c.policies.length}`
                  )}
                </Cell>
              </Row>
            ))}
          </Table>
        )}

        <div className="px-[24px] py-[12px] border-t border-[rgba(0,0,0,0.09)]">
          <span className="text-[14px] text-[#6e6e6e] leading-[1.5]">
            Showing {rows.length} of {CUSTOMERS.length}
          </span>
        </div>
      </Card>
    </div>
  )
}
