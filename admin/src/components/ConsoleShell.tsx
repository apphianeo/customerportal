import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ChevronDown, LogOut, Users } from 'lucide-react'
import uoiLogo from '../../../src/assets/uoi-logo.svg'
import { ROLE_LABEL, staffInitials, type StaffUser } from '../auth/staff'

/**
 * Deliberately plainer than the customer portal — same tokens and typography,
 * but no marketing surface. An internal console is a tool, not a storefront.
 */
export default function ConsoleShell({
  user,
  onSignOut,
  onHome,
  children,
}: {
  user: StaffUser
  onSignOut: () => void
  onHome: () => void
  children: ReactNode
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  return (
    <div className="min-h-screen bg-bg-page flex flex-col">
      <header className="bg-white border-b border-[rgba(0,0,0,0.09)] sticky top-0 z-20">
        <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 h-[64px] flex items-center justify-between gap-[16px]">
          <button
            onClick={onHome}
            className="flex items-center gap-[12px] bg-transparent border-0 p-0 cursor-pointer min-w-0"
          >
            <img src={uoiLogo} alt="UOI" className="h-[32px] w-auto shrink-0" />
            <span className="hidden sm:inline text-[16px] font-semibold text-[#212121] leading-[1.5] whitespace-nowrap">
              Internal Console
            </span>
          </button>

          <nav className="flex items-center gap-[8px] ml-auto mr-[8px]">
            <button
              onClick={onHome}
              className="flex items-center gap-[8px] rounded-[8px] px-[12px] py-[8px] text-[14px] leading-[1.5] text-[#005eb8] bg-[#eff6ff] border-0 cursor-pointer font-medium"
            >
              <Users size={16} aria-hidden="true" />
              Customers
            </button>
          </nav>

          <div className="relative shrink-0" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Account menu"
              className="flex items-center gap-[8px] bg-transparent border-0 p-0 cursor-pointer"
            >
              <span className="flex items-center justify-center size-[32px] rounded-[8px] bg-[#eff6ff] text-[#005eb8] text-[12px] font-semibold">
                {staffInitials(user)}
              </span>
              <ChevronDown size={16} className="text-[#6e6e6e]" aria-hidden="true" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-full mt-[8px] w-[260px] bg-white border border-[rgba(0,0,0,0.09)] rounded-[8px] shadow-[0px_10px_35px_0px_rgba(0,94,184,0.12)] overflow-hidden">
                <div className="px-[16px] py-[12px] border-b border-[rgba(0,0,0,0.09)] flex flex-col gap-[2px]">
                  <span className="text-[14px] font-medium text-[#212121] leading-[1.5]">
                    {user.name}
                  </span>
                  <span className="text-[12px] text-[#6e6e6e] leading-[1.4] break-all">
                    {user.email}
                  </span>
                  <span className="text-[12px] text-[#005eb8] leading-[1.4] mt-[4px]">
                    {ROLE_LABEL[user.role]} · {user.department}
                  </span>
                </div>
                <button
                  onClick={onSignOut}
                  className="w-full flex items-center gap-[8px] px-[16px] py-[12px] text-[14px] text-[#212121] leading-[1.5] bg-white border-0 cursor-pointer hover:bg-[#f6f6f6] text-left"
                >
                  <LogOut size={16} aria-hidden="true" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-[#005eb8] text-white">
        <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-[16px] flex flex-wrap gap-[8px] justify-between">
          <span className="text-[12px] leading-[1.5]">
            UOI Internal Console · Access is logged
          </span>
          <span className="text-[12px] leading-[1.5]">United Overseas Insurance Limited</span>
        </div>
      </footer>
    </div>
  )
}
