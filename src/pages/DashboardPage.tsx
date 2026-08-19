import NotificationBanner from '../components/dashboard/NotificationBanner'
import QuickActions from '../components/dashboard/QuickActions'
import YourCoverage from '../components/dashboard/YourCoverage'
import Rewards from '../components/dashboard/Rewards'
import { titleCaseName } from '../data/accounts'

/** Stand-in when there is no name to greet — a word, not a name, so left alone. */
const GUEST_NAME = 'there'

type Props = {
  firstName?: string
  /** False → prospect dashboard: no policies matched this NRIC/FIN. */
  hasPolicies?: boolean
  onNavigateToPolicies?: () => void
  onSelectPolicy?: (slug: string) => void
  onNavigateToHelp?: () => void
}

export default function DashboardPage({
  firstName = GUEST_NAME,
  hasPolicies = true,
  onNavigateToPolicies,
  onSelectPolicy,
  onNavigateToHelp,
}: Props) {
  const greetingName = firstName === GUEST_NAME ? GUEST_NAME : titleCaseName(firstName)

  return (
    <div className="bg-bg-page min-h-full">
      {/* Max-width content area — centred, matches Figma's 980px body */}
      <div className="screen-container flex flex-col gap-8">

        {/* ── Notification banner — renewal notices only apply to policyholders ── */}
        {hasPolicies && (
        <NotificationBanner
          title="Your UniCar policy is expiring in 30 days — 12 April 2026"
          description={
            <>
              Contact UOI at{' '}
              <a href="tel:+6562227733" className="text-text-secondary underline">(+65) 6222 7733</a>{' '}
              to ensure continuous coverage and avoid any lapse in protection
            </>
          }
        />
        )}

        {/* ── Greeting + Quick Actions ── */}
        <div className="flex flex-col gap-4">
          <h1 className="font-h1-title font-semibold text-text-primary m-0">
            Welcome, {greetingName} 👋
          </h1>
          <QuickActions onHelp={onNavigateToHelp} />
        </div>

        {/* ── Your Coverage — the empty state keeps the header and chips ── */}
        <YourCoverage
          hasPolicies={hasPolicies}
          onViewPolicies={onNavigateToPolicies}
          onSelectPolicy={onSelectPolicy}
        />

        {/* ── Rewards ── */}
        <Rewards />

      </div>
    </div>
  )
}
