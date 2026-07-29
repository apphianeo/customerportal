import NotificationBanner from '../components/dashboard/NotificationBanner'
import QuickActions from '../components/dashboard/QuickActions'
import YourCoverage from '../components/dashboard/YourCoverage'
import Rewards from '../components/dashboard/Rewards'

type Props = {
  onNavigateToPolicies?: () => void
  onSelectPolicy?: (slug: string) => void
  onNavigateToHelp?: () => void
}

export default function DashboardPage({ onNavigateToPolicies, onSelectPolicy, onNavigateToHelp }: Props) {
  return (
    <div className="bg-bg-page min-h-full">
      {/* Max-width content area — centred, matches Figma's 980px body */}
      <div className="w-full max-w-[1044px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">

        {/* ── Notification banner ── */}
        <NotificationBanner
          title="Your UniCar policy is expiring in 30 days — 12 April 2026"
          description={
            <>
              Contact UOI at{' '}
              <a href="tel:+6562227733" className="text-primary">(+65) 6222 7733</a>{' '}
              to ensure continuous coverage and avoid any lapse in protection
            </>
          }
        />

        {/* ── Greeting + Quick Actions ── */}
        <div className="flex flex-col gap-4">
          <h1 className="text-[32px] font-semibold text-text-primary leading-tight m-0">
            Welcome, Chris 👋
          </h1>
          <QuickActions onHelp={onNavigateToHelp} />
        </div>

        {/* ── Your Coverage ── */}
        <YourCoverage onViewPolicies={onNavigateToPolicies} onSelectPolicy={onSelectPolicy} />

        {/* ── Rewards ── */}
        <Rewards />

      </div>
    </div>
  )
}
