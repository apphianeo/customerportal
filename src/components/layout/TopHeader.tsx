import { useState, useRef, useEffect } from 'react'
import uoiLogo from '../../assets/uoi-logo.svg'
import iconLogout from '../../assets/icon-logout.svg'
import {
  SearchOutlined,
  BellOutlined,
  DownOutlined,
  CloseOutlined,
} from '@ant-design/icons'

type Props = {
  userName?: string
  userInitials?: string
  notificationCount?: number
}

export default function TopHeader({
  userName: _userName = 'Chris Wong',
  userInitials = 'CW',
  notificationCount = 1,
}: Props) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)

  // Focus input when mobile search expands
  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus()
  }, [searchOpen])

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

        {/* ── Left: logo (mobile) or mobile search expand ── */}
        <div className="flex items-center gap-3 lg:hidden">
          {searchOpen ? (
            /* Mobile expanded search */
            <div className="flex items-center gap-2 flex-1">
              <div className="flex items-center gap-3 bg-white border border-border-default rounded-lg px-4 py-2 flex-1">
                <SearchOutlined className="text-text-tertiary text-sm shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchValue}
                  onChange={e => setSearchValue(e.target.value)}
                  placeholder="Search policies, claims..."
                  className="flex-1 text-sm text-text-primary placeholder:text-text-tertiary bg-transparent border-0 outline-none"
                />
              </div>
              <button
                onClick={() => { setSearchOpen(false); setSearchValue('') }}
                className="text-text-tertiary hover:text-text-primary transition-colors p-1"
                aria-label="Close search"
              >
                <CloseOutlined style={{ fontSize: 16 }} />
              </button>
            </div>
          ) : (
            <>
              <UoiLogo />
              <button
                onClick={() => setSearchOpen(true)}
                className="text-text-tertiary hover:text-text-primary transition-colors p-1"
                aria-label="Open search"
              >
                <SearchOutlined style={{ fontSize: 18 }} />
              </button>
            </>
          )}
        </div>

        {/* ── Right actions (always visible, hidden when mobile search open) ── */}
        <div className={[
          'flex items-center gap-4 ml-auto',
          searchOpen ? 'hidden' : '',
        ].join(' ')}>

          {/* Desktop search bar */}
          <div className="hidden lg:flex items-center gap-3 bg-white border border-border-default rounded-lg px-4 py-2 w-[360px] cursor-text">
            <SearchOutlined className="text-text-tertiary shrink-0" style={{ fontSize: 14 }} />
            <input
              type="text"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              placeholder="Search policies, claims..."
              className="flex-1 text-sm text-text-primary placeholder:text-text-tertiary bg-transparent border-0 outline-none"
            />
          </div>

          {/* Divider — desktop only */}
          <div className="hidden lg:block w-px h-[31px] bg-border-default shrink-0" />

          {/* Notification bell */}
          <NotificationBell count={notificationCount} />

          {/* User avatar */}
          <div ref={userMenuRef} className="relative">
            <button
              onClick={() => setUserMenuOpen(o => !o)}
              className="flex items-center gap-1 cursor-pointer bg-transparent border-0 p-0"
              aria-label="User menu"
            >
              <div className="flex items-center justify-center size-8 rounded-[12px] bg-bg-info">
                <span className="text-sm font-medium text-text-primary leading-none">
                  {userInitials}
                </span>
              </div>
              <DownOutlined
                className={[
                  'text-text-tertiary transition-transform duration-200',
                  userMenuOpen ? 'rotate-180' : '',
                ].join(' ')}
                style={{ fontSize: 12 }}
              />
            </button>

            {/* Dropdown */}
            {userMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-[240px] bg-white rounded-[8px] drop-shadow-[0px_1px_4px_rgba(0,0,0,0.1)] z-50 p-[12px] flex flex-col gap-[8px]">
                {/* Manage Account */}
                <button className="flex items-center w-full px-[12px] py-[10px] rounded-[8px] border-0 bg-white hover:bg-[#fafafa] transition-colors cursor-pointer text-left">
                  <span className="text-base text-[rgba(0,0,0,0.87)] leading-[1.5] flex-1 min-w-0">
                    Manage Account
                  </span>
                </button>

                {/* Privacy Policy */}
                <button className="flex items-center w-full px-[12px] py-[10px] rounded-[8px] border-0 bg-white hover:bg-[#fafafa] transition-colors cursor-pointer text-left">
                  <span className="text-base text-[rgba(0,0,0,0.87)] leading-[1.5] flex-1 min-w-0">
                    Privacy Policy
                  </span>
                </button>

                {/* Divider */}
                <div className="h-px w-full bg-border-default shrink-0" />

                {/* Log Out */}
                <button className="flex items-center gap-[10px] w-full px-[12px] py-[10px] rounded-[8px] border-0 bg-white hover:bg-[#fafafa] transition-colors cursor-pointer text-left">
                  <img src={iconLogout} alt="" aria-hidden="true" className="size-[24px] shrink-0" style={{ filter: 'invert(13%) sepia(97%) saturate(3582%) hue-rotate(344deg) brightness(90%) contrast(97%)' }} />
                  <span className="text-base font-medium text-[#991b1b] leading-[1.5] flex-1 min-w-0">
                    Log Out
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Right icons — visible when mobile search is open (bell + avatar only) ── */}
        {searchOpen && (
          <div className="flex items-center gap-3 lg:hidden">
            <NotificationBell count={notificationCount} />
          </div>
        )}
      </div>
    </header>
  )
}

/* ─── Notification Bell ─────────────────────────────────── */
function NotificationBell({ count }: { count: number }) {
  return (
    <button
      className="relative size-6 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors bg-transparent border-0 cursor-pointer"
      aria-label={`${count} notification${count !== 1 ? 's' : ''}`}
    >
      <BellOutlined style={{ fontSize: 20 }} />
      {count > 0 && (
        <span className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 flex items-center justify-center min-w-[8px] h-2 rounded-full bg-error" />
      )}
    </button>
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
