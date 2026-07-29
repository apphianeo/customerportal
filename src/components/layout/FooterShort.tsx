export default function FooterShort() {
  return (
    <footer className="bg-primary text-white font-normal leading-relaxed">
      {/* Single line at every width — the copyright shrinks rather than wrapping */}
      <div className="flex flex-row items-center justify-between gap-3 px-6 py-4">
        <span className="text-[10px] sm:text-xs lg:text-sm min-w-0 truncate">
          Copyright © 2026 United Overseas Insurance Limited Co. Reg. No. 197100152R.
        </span>
        <span className="text-[10px] sm:text-xs lg:text-sm shrink-0 text-right">
          All Rights Reserved.
        </span>
      </div>
    </footer>
  )
}
