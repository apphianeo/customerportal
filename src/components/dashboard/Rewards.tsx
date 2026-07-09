import { ArrowForwardIcon } from '../icons'

/* ─── Rewards tag icon — solid blue tag (design library) ──── */
function RewardsTagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-[30px]" aria-hidden="true">
      <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
    </svg>
  )
}

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

      {/* Empty state — rewards program not yet live */}
      <div className="flex flex-col items-center justify-center gap-6 bg-white rounded-xl shadow-card p-10 min-h-[320px] text-center">
        <span className="flex items-center justify-center size-[60px] rounded-full bg-bg-info text-primary">
          <RewardsTagIcon />
        </span>
        <div className="flex flex-col gap-2 max-w-[480px]">
          <p className="text-base font-semibold text-text-primary leading-relaxed m-0">
            Exclusive rewards are coming soon!
          </p>
          <p className="text-sm text-text-secondary leading-relaxed m-0">
            Stay tuned for exciting benefits and exclusive offers designed just for you.
          </p>
        </div>
      </div>
    </div>
  )
}

/* ─── View All link ──────────────────────────────────────── */
function ViewAll() {
  return (
    <button className="flex items-center gap-1.5 text-base font-medium text-text-link bg-transparent border-0 cursor-pointer p-0 shrink-0">
      View All
      <ArrowForwardIcon size={13} />
    </button>
  )
}
