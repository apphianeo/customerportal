import { ArrowRightOutlined } from '@ant-design/icons'

/* ─── Types ─────────────────────────────────────────────── */
type Reward = {
  id: string
  image: string
  category: string
  title: string
  description: string
  ctaLabel: string
  ctaHref?: string
}

/* ─── Data ───────────────────────────────────────────────── */
// Images sourced from Figma design assets
const REWARDS: Reward[] = [
  {
    id: '1',
    image: 'https://www.figma.com/api/mcp/asset/e50104d4-58ed-429a-aafe-780eb7cc650c',
    category: 'Dining',
    title: '10% off KITH by Casa Products',
    description: 'Enter promo code UOIKITH10 at checkout on www.kith.sg to enjoy.',
    ctaLabel: 'Shop Now',
  },
  {
    id: '2',
    image: 'https://www.figma.com/api/mcp/asset/081f65fb-e0cd-4f28-8594-bf22d01a4935',
    category: 'Wellness',
    title: '10% off Capybara Bathing',
    description: 'Enter promo code UOIBATH10 at checkout on www.bath.sg to enjoy.',
    ctaLabel: 'Shop Now',
  },
  {
    id: '3',
    image: 'https://www.figma.com/api/mcp/asset/55e117c4-d09c-4261-9702-439b2a7c4211',
    category: 'Cashback',
    title: '$5 Credit Reward for HEYMAX New User',
    description: 'Enter promo code UOIHEYMAX5 during registration to enjoy $5 credit.',
    ctaLabel: 'Claim Now',
  },
  {
    id: '4',
    image: 'https://www.figma.com/api/mcp/asset/1d9bf130-c6a3-4098-9088-1702f3ee37cb',
    category: 'Wellness',
    title: 'Complimentary Wellness Talk',
    description: 'Enjoy a complimentary wellness talk (worth $80), limited slots available.',
    ctaLabel: 'Register Now',
  },
]

/* ─── Section ────────────────────────────────────────────── */
export default function Rewards() {
  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-h2-mob lg:text-h2 font-bold text-text-primary leading-tight m-0">
          Rewards
        </h2>
        <ViewAll />
      </div>

      {/* Grid: 1-col on mobile, 2-col on sm+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {REWARDS.map(reward => (
          <RewardCard key={reward.id} reward={reward} />
        ))}
      </div>
    </div>
  )
}

/* ─── Reward Card ────────────────────────────────────────── */
function RewardCard({ reward }: { reward: Reward }) {
  return (
    <div className="flex items-stretch shadow-card rounded-lg overflow-hidden">
      {/* Thumbnail */}
      <div className="w-[120px] shrink-0 relative">
        <img
          src={reward.image}
          alt={reward.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 bg-white p-4 flex flex-col gap-3 min-w-0">
        {/* Category tag */}
        <span className="self-start bg-grey-tag text-text-secondary text-xs font-medium px-2 py-0.5 rounded-lg leading-normal">
          {reward.category}
        </span>

        {/* Copy */}
        <div className="flex flex-col gap-1">
          <p className="text-base font-medium text-text-primary leading-relaxed m-0">
            {reward.title}
          </p>
          <p className="text-sm text-text-secondary leading-relaxed m-0">
            {reward.description}
          </p>
        </div>

        {/* CTA */}
        <button className="self-start flex items-center gap-1 text-sm font-medium text-primary bg-transparent border-0 cursor-pointer p-0 hover:opacity-80 transition-opacity">
          {reward.ctaLabel}
          <ArrowRightOutlined style={{ fontSize: 12 }} />
        </button>
      </div>
    </div>
  )
}

/* ─── View All link ──────────────────────────────────────── */
function ViewAll() {
  return (
    <button className="flex items-center gap-1.5 text-base font-medium text-text-link bg-transparent border-0 cursor-pointer p-0 shrink-0 hover:opacity-80 transition-opacity">
      View All
      <ArrowRightOutlined style={{ fontSize: 13 }} />
    </button>
  )
}
