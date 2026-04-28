const ICON_GRADIENT = 'linear-gradient(90deg, rgba(0, 94, 184, 0.10) 0.62%, rgba(92, 85, 235, 0.10) 100%), #FFF'

type QuickAction = {
  key: string
  emoji: string
  title: string
  description: string
  onClick?: () => void
}

const ACTIONS: QuickAction[] = [
  {
    key: 'claim',
    emoji: '🧾',
    title: 'Submit Claim',
    description: 'Prepare documents for claims',
  },
  {
    key: 'buy',
    emoji: '🛒',
    title: 'Buy New Policy',
    description: 'Explore a wide range of policies',
  },
  {
    key: 'help',
    emoji: '💬',
    title: 'Help & Support',
    description: 'Learn more about our FAQs',
  },
]

export default function QuickActions() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-5">
      {ACTIONS.map(({ key, ...action }) => (
        <QuickActionCard key={key} {...action} />
      ))}
    </div>
  )
}

function QuickActionCard({ emoji, title, description, onClick }: QuickAction) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 w-full bg-white rounded-lg p-4 shadow-card text-left cursor-pointer border-0 hover:shadow-md transition-shadow"
    >
      {/* Icon container */}
      <span
        className="size-8 flex items-center justify-center shrink-0 text-base"
        style={{ background: ICON_GRADIENT, borderRadius: '8px' }}
      >
        {emoji}
      </span>

      {/* Text */}
      <span className="flex flex-col gap-0.5 min-w-0">
        <span className="text-base font-medium text-text-primary leading-relaxed">
          {title}
        </span>
        <span className="text-sm text-text-secondary leading-relaxed">
          {description}
        </span>
      </span>
    </button>
  )
}
