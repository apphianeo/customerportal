const ICON_GRADIENT = 'linear-gradient(90deg, rgba(0, 94, 184, 0.10) 0.62%, rgba(92, 85, 235, 0.10) 100%), #FFF'

/* ─── Icons — matching the Figma-exported Cart / Messaging glyphs ─ */
function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-full" aria-hidden="true">
      <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
  )
}

function MessagingIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-full" aria-hidden="true">
      <rect x="4" y="3" width="16" height="13" rx="4" fill="currentColor" />
      <path d="M6 14.5V19l4.5-3.5H6Z" fill="currentColor" />
      <circle cx="8.5" cy="9.5" r="1.15" fill="white" />
      <circle cx="12" cy="9.5" r="1.15" fill="white" />
      <circle cx="15.5" cy="9.5" r="1.15" fill="white" />
    </svg>
  )
}

type QuickAction = {
  key: string
  icon: React.ReactNode
  title: string
  description: string
  onClick?: () => void
}

const ACTIONS: QuickAction[] = [
  {
    key: 'buy',
    icon: <CartIcon />,
    title: 'Buy New Policy',
    description: 'Explore a wide range of policies',
  },
  {
    key: 'help',
    icon: <MessagingIcon />,
    title: 'Help & Support',
    description: 'Learn more about our FAQs',
  },
]

export default function QuickActions() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-5">
      {ACTIONS.map(({ key, ...action }) => (
        <QuickActionCard key={key} {...action} />
      ))}
    </div>
  )
}

function QuickActionCard({ icon, title, description, onClick }: QuickAction) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 w-full bg-white rounded-lg p-4 shadow-card text-left cursor-pointer border-0 hover:shadow-pop transition-shadow"
    >
      {/* Icon container */}
      <span
        className="size-8 flex items-center justify-center shrink-0 text-primary"
        style={{ background: ICON_GRADIENT, borderRadius: '8px' }}
      >
        <span className="size-5">{icon}</span>
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
