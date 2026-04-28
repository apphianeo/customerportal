import NotificationBanner from '../components/dashboard/NotificationBanner'
import QuickActions from '../components/dashboard/QuickActions'
import YourCoverage from '../components/dashboard/YourCoverage'
import Rewards from '../components/dashboard/Rewards'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

export default function DashboardPage() {
  return (
    <div className="bg-bg-page min-h-full">
      {/* Max-width content area — centred, matches Figma's 980px body */}
      <div className="w-full max-w-[980px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">

        {/* ── Notification banner ── */}
        <NotificationBanner
          title="Your UniCar policy is expiring in 30 days — 12 April 2026."
          description="Renew now to ensure continuous coverage and avoid any lapse in protection."
          ctaLabel="Renew"
          onCtaClick={() => console.log('Renew clicked')}
        />

        {/* ── Greeting + Quick Actions ── */}
        <div className="flex flex-col gap-4">
          <h1 className="text-[28px] lg:text-[32px] font-bold text-text-primary leading-tight m-0">
            {getGreeting()}, Chris! 👋
          </h1>
          <QuickActions />
        </div>

        {/* ── Your Coverage ── */}
        <YourCoverage />

        {/* ── Rewards ── */}
        <div className="h-px bg-border-default opacity-50" />
        <Rewards />

      </div>
    </div>
  )
}
