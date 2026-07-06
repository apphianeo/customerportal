import { ArrowRightOutlined, TagOutlined } from '@ant-design/icons'

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
        <span className="flex items-center justify-center size-[60px] rounded-full bg-bg-info text-primary text-2xl">
          <TagOutlined />
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
    <button className="flex items-center gap-1.5 text-base font-medium text-text-link bg-transparent border-0 cursor-pointer p-0 shrink-0 hover:opacity-80 transition-opacity">
      View All
      <ArrowRightOutlined style={{ fontSize: 13 }} />
    </button>
  )
}
