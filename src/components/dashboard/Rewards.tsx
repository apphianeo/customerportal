import { ArrowForwardIcon } from '../icons'
import imgKith     from '../../assets/rewards/kith.png'
import imgBath     from '../../assets/rewards/bath.png'
import imgHeymax   from '../../assets/rewards/heymax.png'
import imgWellness from '../../assets/rewards/wellness.png'

type Reward = {
  id: string
  category: string
  title: string
  description: string
  ctaLabel: string
  image: string
}

const REWARDS: Reward[] = [
  {
    id: 'kith',
    category: 'Dining',
    title: '10% off KITH by Casa Products',
    description: 'Enter promo code UOIKITH10 at checkout on www.kith.sg to enjoy',
    ctaLabel: 'Shop Now',
    image: imgKith,
  },
  {
    id: 'bath',
    category: 'Wellness',
    title: '10% off Capybara Bathing',
    description: 'Enter promo code UOIBATH10 at checkout on www.bath.sg to enjoy',
    ctaLabel: 'Shop Now',
    image: imgBath,
  },
  {
    id: 'heymax',
    category: 'Cashback',
    title: '$5 Credit Reward for HEYMAX New User',
    description: 'Enter promo code UOIHEYMAX5 during registration to enjoy $5 credit',
    ctaLabel: 'Claim Now',
    image: imgHeymax,
  },
  {
    id: 'wellness-talk',
    category: 'Wellness',
    title: 'Complimentary Wellness Talk',
    description: 'Enjoy a complimentary wellness talk (worth $80), limited slots available',
    ctaLabel: 'Register Now',
    image: imgWellness,
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
    <button className="flex w-full bg-white rounded-[8px] shadow-card overflow-hidden text-left cursor-pointer border-0 hover:shadow-pop transition-shadow">
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
    </button>
  )
}
