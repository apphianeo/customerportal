import { useEffect, useRef, useState } from 'react'
import { Calendar as CalIcon, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const pad = (n: number) => String(n).padStart(2, '0')

/** Mask free-typed input into DD/MM/YYYY as the user types. */
function maskDate(raw: string) {
  const digits = raw.replace(/\D/g, '').slice(0, 8)
  let out = digits.slice(0, 2)
  if (digits.length >= 3) out += '/' + digits.slice(2, 4)
  if (digits.length >= 5) out += '/' + digits.slice(4, 8)
  return out
}

/** Parse a complete DD/MM/YYYY into parts (returns null if incomplete/invalid). */
function parseDate(value: string) {
  const m = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
  if (!m) return null
  const d = Number(m[1]), mo = Number(m[2]), y = Number(m[3])
  if (mo < 1 || mo > 12 || d < 1 || d > new Date(y, mo, 0).getDate()) return null
  return { d, m: mo, y }
}

type Props = {
  label?: string
  value: string
  onChange: (v: string) => void
  error?: string
  disabled?: boolean
  placeholder?: string
}

export default function DatePicker({ label, value, onChange, error, disabled, placeholder = 'DD/MM/YYYY' }: Props) {
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState<'month' | 'year' | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  const today = new Date()
  const parsed = parseDate(value)
  const [viewY, setViewY] = useState(parsed ? parsed.y : today.getFullYear())
  const [viewM, setViewM] = useState(parsed ? parsed.m - 1 : today.getMonth())

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) { setOpen(false); setMenu(null) }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  function toggleCalendar() {
    if (disabled) return
    const p = parseDate(value)
    if (p) { setViewY(p.y); setViewM(p.m - 1) }
    setMenu(null)
    setOpen(o => !o)
  }

  function selectDay(day: number) {
    onChange(`${pad(day)}/${pad(viewM + 1)}/${viewY}`)
    setMenu(null)
    setOpen(false)
  }

  function prevMonth() {
    setViewM(m => (m === 0 ? (setViewY(y => y - 1), 11) : m - 1))
  }
  function nextMonth() {
    setViewM(m => (m === 11 ? (setViewY(y => y + 1), 0) : m + 1))
  }

  const firstDow = new Date(viewY, viewM, 1).getDay()
  const daysInMonth = new Date(viewY, viewM + 1, 0).getDate()
  const selected = parseDate(value)
  const isSelected = (day: number) =>
    !!selected && selected.d === day && selected.m === viewM + 1 && selected.y === viewY

  const years: number[] = []
  for (let y = today.getFullYear(); y >= 1920; y--) years.push(y)

  if (disabled) {
    return (
      <label className="flex flex-col gap-[8px] w-full">
        {label && <span className="text-[14px] text-[#212121] leading-[1.5]">{label}</span>}
        <div className="bg-[#f5f5f5] border border-[rgba(0,0,0,0.09)] rounded-[8px] px-[16px] py-[12px] w-full flex items-center justify-between gap-[8px]">
          <span className="text-[16px] text-[#949494] leading-[1.5]">{value || placeholder}</span>
          <CalIcon size={18} className="text-[#bdbdbd] shrink-0" />
        </div>
      </label>
    )
  }

  return (
    <label className="flex flex-col gap-[8px] w-full">
      {label && <span className="text-[14px] text-[#212121] leading-[1.5]">{label}</span>}
      <div ref={ref} className="relative w-full">
        <input
          value={value}
          placeholder={placeholder}
          inputMode="numeric"
          maxLength={10}
          onChange={e => onChange(maskDate(e.target.value))}
          style={{ paddingRight: 44 }}
          className={`bg-white border rounded-[8px] px-[16px] py-[12px] w-full text-[16px] text-[#212121] leading-[1.5] outline-none placeholder:text-[#949494] ${
            error ? 'border-[#dc2626]' : 'border-[rgba(0,0,0,0.09)] focus:border-[#005eb8] focus:shadow-[0px_0px_0px_3px_rgba(0,94,184,0.2)]'
          }`}
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={toggleCalendar}
          aria-label="Open calendar"
          className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[#6e6e6e] bg-transparent border-0 p-0 cursor-pointer flex items-center"
        >
          <CalIcon size={18} />
        </button>

        {open && (
          <div className="absolute z-30 top-full mt-[8px] left-0 w-[320px] max-w-full bg-white border border-[rgba(0,0,0,0.09)] rounded-[8px] shadow-[0px_10px_35px_0px_rgba(0,94,184,0.12)]">
            {/* Header */}
            <div className="bg-[#005eb8] flex items-center justify-between px-[12px] py-[10px] gap-[8px] rounded-t-[8px]">
              <button type="button" onClick={prevMonth} aria-label="Previous month" className="text-white bg-transparent border-0 p-[2px] cursor-pointer flex items-center">
                <ChevronLeft size={20} />
              </button>
              <div className="flex items-center gap-[12px]">
                {/* Month dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setMenu(m => (m === 'month' ? null : 'month'))}
                    className="flex items-center gap-[4px] text-white text-[16px] font-semibold bg-transparent border-0 p-0 cursor-pointer"
                  >
                    {MONTHS[viewM]}
                    <ChevronDown size={14} />
                  </button>
                  {menu === 'month' && (
                    <div className="absolute z-40 top-full mt-[6px] left-0 w-[140px] max-h-[220px] overflow-y-auto bg-white border border-[rgba(0,0,0,0.09)] rounded-[8px] shadow-[0px_4px_12px_rgba(0,0,0,0.12)] py-[4px]">
                      {MONTHS.map((mo, i) => (
                        <button
                          key={mo}
                          type="button"
                          onClick={() => { setViewM(i); setMenu(null) }}
                          className={`w-full text-left px-[12px] py-[8px] text-[14px] cursor-pointer border-0 bg-white hover:bg-[#f6f6f6] ${i === viewM ? 'text-[#005eb8] font-medium' : 'text-[#212121]'}`}
                        >
                          {mo}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {/* Year dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setMenu(m => (m === 'year' ? null : 'year'))}
                    className="flex items-center gap-[4px] text-white text-[16px] font-semibold bg-transparent border-0 p-0 cursor-pointer"
                  >
                    {viewY}
                    <ChevronDown size={14} />
                  </button>
                  {menu === 'year' && (
                    <div className="absolute z-40 top-full mt-[6px] left-0 w-[100px] max-h-[220px] overflow-y-auto bg-white border border-[rgba(0,0,0,0.09)] rounded-[8px] shadow-[0px_4px_12px_rgba(0,0,0,0.12)] py-[4px]">
                      {years.map(y => (
                        <button
                          key={y}
                          type="button"
                          onClick={() => { setViewY(y); setMenu(null) }}
                          className={`w-full text-left px-[12px] py-[8px] text-[14px] cursor-pointer border-0 bg-white hover:bg-[#f6f6f6] ${y === viewY ? 'text-[#005eb8] font-medium' : 'text-[#212121]'}`}
                        >
                          {y}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <button type="button" onClick={nextMonth} aria-label="Next month" className="text-white bg-transparent border-0 p-[2px] cursor-pointer flex items-center">
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Grid */}
            <div className="p-[12px]">
              <div className="grid grid-cols-7 mb-[4px]">
                {WEEKDAYS.map(w => (
                  <span key={w} className="text-[12px] text-[#6e6e6e] text-center py-[4px]">{w}</span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-y-[2px]">
                {Array.from({ length: firstDow }).map((_, i) => <span key={`b${i}`} />)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1
                  const sel = isSelected(day)
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => selectDay(day)}
                      className={`mx-auto flex items-center justify-center size-[32px] rounded-full text-[14px] cursor-pointer border-0 ${
                        sel ? 'bg-[#005eb8] text-white' : 'bg-transparent text-[#212121] hover:bg-[#f6f6f6]'
                      }`}
                    >
                      {pad(day)}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
      {error && (
        <span className="flex items-center gap-[8px] text-[12px] leading-[1.4] text-[#dc2626]">{error}</span>
      )}
    </label>
  )
}
