import { useState, useRef, useEffect } from 'react'
import uoiLogo from '../../assets/uoi-logo.svg'
import { SearchOutlined, CloseOutlined } from '@ant-design/icons'
import { ChevronDownIcon } from '../icons'
import { searchIndex, type SearchResult } from '../../data/searchIndex'
import type { HelpTopicKey } from '../../data/helpTopics'

/* ─── Bold the portion of `text` matching `query` ────────── */
function HighlightMatch({ text, query }: { text: string; query: string }) {
  const idx = query ? text.toLowerCase().indexOf(query.toLowerCase()) : -1
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <span className="font-semibold">{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  )
}

/* ─── Live suggestion dropdown ───────────────────────────── */
function SearchSuggestions({
  query,
  results,
  onSelect,
}: {
  query: string
  results: SearchResult[]
  onSelect: (result: SearchResult) => void
}) {
  if (results.length === 0) return null
  return (
    <div className="absolute z-30 top-full mt-[8px] left-0 right-0 bg-white rounded-[8px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] overflow-hidden max-h-[280px] overflow-y-auto">
      {results.map(r => (
        <button
          key={r.id}
          type="button"
          onMouseDown={e => e.preventDefault()}
          onClick={() => onSelect(r)}
          className="w-full text-left px-[12px] py-[12px] bg-white hover:bg-[#f6f8fc] transition-colors border-0 cursor-pointer text-[16px] text-[#212121]"
        >
          <HighlightMatch text={r.title} query={query} />
        </button>
      ))}
    </div>
  )
}

/* ─── Logout icon — inline so its color can follow currentColor ─ */
function LogoutIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-[24px] shrink-0" aria-hidden="true">
      <path d="M5 21C4.45 21 3.97933 20.8043 3.588 20.413C3.19667 20.0217 3.00067 19.5507 3 19V5C3 4.45 3.196 3.97933 3.588 3.588C3.98 3.19667 4.45067 3.00067 5 3H11C11.2833 3 11.521 3.096 11.713 3.288C11.905 3.48 12.0007 3.71733 12 4C11.9993 4.28267 11.9033 4.52033 11.712 4.713C11.5207 4.90567 11.2833 5.00133 11 5H5V19H11C11.2833 19 11.521 19.096 11.713 19.288C11.905 19.48 12.0007 19.7173 12 20C11.9993 20.2827 11.9033 20.5203 11.712 20.713C11.5207 20.9057 11.2833 21.0013 11 21H5ZM17.175 13H10C9.71667 13 9.47933 12.904 9.288 12.712C9.09667 12.52 9.00067 12.2827 9 12C8.99933 11.7173 9.09533 11.48 9.288 11.288C9.48067 11.096 9.718 11 10 11H17.175L15.3 9.125C15.1167 8.94167 15.025 8.71667 15.025 8.45C15.025 8.18333 15.1167 7.95 15.3 7.75C15.4833 7.55 15.7167 7.44567 16 7.437C16.2833 7.42833 16.525 7.52433 16.725 7.725L20.3 11.3C20.5 11.5 20.6 11.7333 20.6 12C20.6 12.2667 20.5 12.5 20.3 12.7L16.725 16.275C16.525 16.475 16.2877 16.571 16.013 16.563C15.7383 16.555 15.5007 16.4507 15.3 16.25C15.1167 16.05 15.0293 15.8127 15.038 15.538C15.0467 15.2633 15.1423 15.034 15.325 14.85L17.175 13Z" fill="currentColor" />
    </svg>
  )
}

type Props = {
  userName?: string
  userInitials?: string
  onSearch?: (query: string) => void
  onSelectPolicy?: (slug: string) => void
  onSelectHelpTopic?: (topic: HelpTopicKey) => void
}

export default function TopHeader({
  userName: _userName = 'Chris Wong',
  userInitials = 'CW',
  onSearch,
  onSelectPolicy,
  onSelectHelpTopic,
}: Props) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)

  const suggestions = searchFocused && searchValue.trim()
    ? searchIndex(searchValue).slice(0, 6)
    : []

  function handleSelectSuggestion(result: SearchResult) {
    if (result.kind === 'policy') {
      if (result.slug) onSelectPolicy?.(result.slug)
      else console.log('View policy', result.id)
    } else {
      onSelectHelpTopic?.(result.topic)
    }
    setSearchValue('')
    setSearchFocused(false)
    setSearchOpen(false)
  }

  function submitSearch() {
    const q = searchValue.trim()
    if (!q) return
    onSearch?.(q)
    setSearchFocused(false)
    setSearchOpen(false)
  }

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
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setSearchFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <header ref={headerRef} className="sticky top-0 z-10 h-[61px] bg-white border-b border-border-default shrink-0">
      <div className="flex items-center justify-between h-full px-6">

        {/* ── Left: logo (mobile) or mobile search expand ── */}
        <div className="flex items-center gap-3 lg:hidden">
          {searchOpen ? (
            /* Mobile expanded search */
            <div className="flex items-center gap-2 flex-1">
              <div className="relative flex-1">
                <div className="flex items-center gap-3 bg-white border border-border-default rounded-[8px] px-4 py-2 w-full">
                  <SearchOutlined className="text-text-tertiary text-sm shrink-0" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onKeyDown={e => { if (e.key === 'Enter') submitSearch() }}
                    placeholder="Search policies, claims..."
                    className="flex-1 text-sm text-text-primary placeholder:text-text-tertiary bg-transparent border-0 outline-none"
                  />
                </div>
                <SearchSuggestions query={searchValue} results={suggestions} onSelect={handleSelectSuggestion} />
              </div>
              <button
                onClick={() => { setSearchOpen(false); setSearchValue('') }}
                className="text-text-tertiary p-1"
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
                className="text-text-tertiary p-1"
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
          <div className="hidden lg:block relative w-[360px] shrink-0">
            <div className="flex items-center gap-3 bg-white border border-border-default rounded-[8px] px-4 py-2 w-full cursor-text">
              <SearchOutlined className="text-text-tertiary shrink-0" style={{ fontSize: 14 }} />
              <input
                type="text"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onKeyDown={e => { if (e.key === 'Enter') submitSearch() }}
                placeholder="Search policies, claims..."
                className="flex-1 text-sm text-text-primary placeholder:text-text-tertiary bg-transparent border-0 outline-none"
              />
            </div>
            <SearchSuggestions query={searchValue} results={suggestions} onSelect={handleSelectSuggestion} />
          </div>

          {/* Divider — desktop only */}
          <div className="hidden lg:block w-px h-[31px] bg-border-default shrink-0" />

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
                {/* Manage Account */}
                <button className="flex items-center w-full px-[12px] py-[10px] rounded-[8px] border-0 bg-white hover:bg-[#f6f8fc] transition-colors cursor-pointer text-left">
                  <span className="text-base text-[rgba(0,0,0,0.87)] leading-[1.5] flex-1 min-w-0">
                    Manage Account
                  </span>
                </button>

                {/* Privacy Policy */}
                <button className="flex items-center w-full px-[12px] py-[10px] rounded-[8px] border-0 bg-white hover:bg-[#f6f8fc] transition-colors cursor-pointer text-left">
                  <span className="text-base text-[rgba(0,0,0,0.87)] leading-[1.5] flex-1 min-w-0">
                    Privacy Policy
                  </span>
                </button>

                {/* Divider */}
                <div className="h-px w-full bg-border-default shrink-0" />

                {/* Log Out */}
                <button className="flex items-center gap-[10px] w-full px-[12px] py-[10px] rounded-[8px] border-0 bg-white hover:bg-[#f6f8fc] transition-colors cursor-pointer text-left text-[#dc2626]">
                  <LogoutIcon />
                  <span className="text-base font-medium leading-[1.5] flex-1 min-w-0">
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
