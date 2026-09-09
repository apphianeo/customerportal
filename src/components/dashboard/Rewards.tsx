import { ArrowForwardIcon } from '../icons'
import imgKith     from '../../assets/rewards/kith.png'
import imgBath     from '../../assets/rewards/bath.png'
import imgWellness from '../../assets/rewards/wellness.png'

type Reward = {
  id: string
  category: string
  title: string
  description: string
  ctaLabel: string
  image: string
  /** Opened in a new tab when the card is clicked. */
  href: string
}

const REWARDS: Reward[] = [
  {
    id: 'casa',
    category: 'Lifestyle',
    title: '10% off CASA products',
    description:
      'Simply enter UOIFRIENDS10 to receive 10% off selected CASA products sitewide. Excludes Ferroli products and spare parts.',
    ctaLabel: 'Shop Now',
    image: imgKith,
    href: 'https://shop.casa.sg/',
  },
  {
    id: 'dental',
    category: 'Wellness',
    title: 'Dental care from S$109',
    description:
      'Simply show your UOI Customer Portal account to enjoy exclusive dental care rates at Khoo Teck Puat Hospital.',
    ctaLabel: 'View More',
    image: imgWellness,
    href: '/rewards/dental-care.pdf',
  },
  {
    id: 'sports-screening',
    category: 'Wellness',
    title: 'Sports and fitness screening',
    description:
      'Simply show your UOI Customer Portal account to enjoy exclusive screening packages at Khoo Teck Puat Hospital.',
    ctaLabel: 'View More',
    image: imgBath,
    href: '/rewards/sports-screening.pdf',
  },
]

/* ─── Section ────────────────────────────────────────────── */
export default function Rewards() {
  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <h2 className="font-h3-title font-semibold text-text-primary m-0">
        Rewards
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {REWARDS.map((reward) => (
          <RewardCard key={reward.id} reward={reward} />
        ))}
      </div>
    </div>
  )
}

/* ─── Reward card ────────────────────────────────────────── */
function RewardCard({ reward }: { reward: Reward }) {
  return (
    <a
      href={reward.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full bg-white rounded-[8px] shadow-card overflow-hidden text-left cursor-pointer no-underline hover:shadow-pop transition-shadow"
    >
      {/* Image */}
      <div className="w-[120px] shrink-0 self-stretch">
        <img src={reward.image} alt="" className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-4 flex-1 min-w-0">
        <span className="self-start text-[12px] font-medium text-[#1e40af] bg-bg-info px-[8px] py-[4px] rounded-pill leading-[1.4]">
          {reward.category}
        </span>
        <div className="flex flex-col gap-1">
          <p className="text-base font-medium text-text-primary leading-relaxed m-0">
            {reward.title}
          </p>
          <p className="text-sm text-text-secondary leading-relaxed m-0">
            {reward.description}
          </p>
        </div>
        <span className="flex items-center gap-1 text-sm font-medium text-primary">
          {reward.ctaLabel}
          <ArrowForwardIcon size={16} />
        </span>
      </div>
    </a>
  )
}
