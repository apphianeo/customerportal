const COPYRIGHT = 'Copyright © 2026 United Overseas Insurance Limited Co. Reg. No. 197100152R.'
const RIGHTS = 'All Rights Reserved.'

export default function FooterShort() {
  return (
    <footer className="bg-primary text-white font-normal leading-relaxed">
      {/* Mobile — one centred sentence that wraps naturally */}
      <div className="sm:hidden px-6 py-4 text-center text-xs">
        {COPYRIGHT} {RIGHTS}
      </div>

      {/* Desktop — split across the full width */}
      <div className="hidden sm:flex flex-row items-center justify-between gap-3 px-6 py-4 text-xs lg:text-sm">
        <span>{COPYRIGHT}</span>
        <span className="shrink-0 text-right">{RIGHTS}</span>
      </div>
    </footer>
  )
}
