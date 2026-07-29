import { useState, useRef, useEffect } from 'react'
import uoiLogo from '../../assets/uoi-logo.svg'
import { ChevronDownIcon } from '../icons'
import { Menu, X } from 'lucide-react'

/* ─── Logout icon — inline so its color can follow currentColor ─ */
function LogoutIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-[16px] shrink-0" aria-hidden="true">
      <path d="M5 21C4.45 21 3.97933 20.8043 3.588 20.413C3.19667 20.0217 3.00067 19.5507 3 19V5C3 4.45 3.196 3.97933 3.588 3.588C3.98 3.19667 4.45067 3.00067 5 3H11C11.2833 3 11.521 3.096 11.713 3.288C11.905 3.48 12.0007 3.71733 12 4C11.9993 4.28267 11.9033 4.52033 11.712 4.713C11.5207 4.90567 11.2833 5.00133 11 5H5V19H11C11.2833 19 11.521 19.096 11.713 19.288C11.905 19.48 12.0007 19.7173 12 20C11.9993 20.2827 11.9033 20.5203 11.712 20.713C11.5207 20.9057 11.2833 21.0013 11 21H5ZM17.175 13H10C9.71667 13 9.47933 12.904 9.288 12.712C9.09667 12.52 9.00067 12.2827 9 12C8.99933 11.7173 9.09533 11.48 9.288 11.288C9.48067 11.096 9.718 11 10 11H17.175L15.3 9.125C15.1167 8.94167 15.025 8.71667 15.025 8.45C15.025 8.18333 15.1167 7.95 15.3 7.75C15.4833 7.55 15.7167 7.44567 16 7.437C16.2833 7.42833 16.525 7.52433 16.725 7.725L20.3 11.3C20.5 11.5 20.6 11.7333 20.6 12C20.6 12.2667 20.5 12.5 20.3 12.7L16.725 16.275C16.525 16.475 16.2877 16.571 16.013 16.563C15.7383 16.555 15.5007 16.4507 15.3 16.25C15.1167 16.05 15.0293 15.8127 15.038 15.538C15.0467 15.2633 15.1423 15.034 15.325 14.85L17.175 13Z" fill="currentColor" />
    </svg>
  )
}

const PRIVACY_URL = 'https://www.uoi.com.sg/privacy.page'

type Props = {
  userInitials?: string
  onLogout?: () => void
  onHome?: () => void
  menuOpen?: boolean
  onToggleMenu?: () => void
}

export default function TopHeader({
  userInitials = 'CW',
  onLogout,
  onHome,
  menuOpen = false,
  onToggleMenu,
}: Props) {
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)

  // Close user menu on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <header className="sticky top-0 z-10 h-[61px] bg-white border-b border-border-default shrink-0">
      <div className="flex items-center justify-between h-full px-6">

        {/* ── Left: menu toggle + logo (mobile only; sidebar carries it on desktop) ── */}
        <div className="flex items-center gap-[12px] lg:hidden">
          <button
            onClick={onToggleMenu}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="bg-transparent border-0 p-0 cursor-pointer flex items-center text-[#212121]"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <button onClick={onHome} aria-label="Go to dashboard" className="bg-transparent border-0 p-0 cursor-pointer">
            <UoiLogo />
          </button>
        </div>

        {/* ── Right: user avatar + dropdown ── */}
        <div className="flex items-center ml-auto">
          <div ref={userMenuRef} className="relative">
            <button
              onClick={() => setUserMenuOpen(o => !o)}
              className="flex items-center gap-[4px] cursor-pointer bg-transparent border-0 p-0"
              aria-label="User menu"
            >
              <div className="flex items-center justify-center size-8 rounded-[8px] bg-[rgba(51,133,230,0.12)]">
                <span className="text-sm font-medium text-text-primary leading-none">
                  {userInitials}
                </span>
              </div>
              <ChevronDownIcon
                size={12}
                className={[
                  'transition-transform duration-200',
                  userMenuOpen ? 'rotate-180' : '',
                ].join(' ')}
                style={{ color: '#6E6E6E' }}
              />
            </button>

            {/* Dropdown */}
            {userMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-[240px] bg-white rounded-[8px] drop-shadow-[0px_1px_4px_rgba(0,0,0,0.1)] z-50 p-[12px] flex flex-col gap-[8px]">
                {/* Privacy Policy */}
                <a
                  href={PRIVACY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center w-full p-[8px] rounded-[8px] bg-white hover:bg-[#f6f6f6] transition-colors cursor-pointer"
                >
                  <span className="text-[14px] text-[#212121] leading-[1.5] flex-1 min-w-0">
                    Privacy Policy
                  </span>
                </a>

                {/* Divider */}
                <div className="h-px w-full bg-border-default shrink-0" />

                {/* Log Out */}
                <button
                  onClick={() => { setUserMenuOpen(false); onLogout?.() }}
                  className="flex items-center gap-[10px] w-full p-[8px] rounded-[8px] border-0 bg-white hover:bg-[#f6f6f6] transition-colors cursor-pointer text-left text-[#dc2626]"
                >
                  <LogoutIcon />
                  <span className="text-[14px] leading-[1.5] flex-1 min-w-0">
                    Log Out
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </header>
  )
}

/* ─── UOI Logo (mobile header) ──────────────────────────── */
function UoiLogo() {
  return (
    <img
      src={uoiLogo}
      alt="UOI"
      width={72}
      height={37}
      className="object-contain shrink-0"
    />
  )
}
