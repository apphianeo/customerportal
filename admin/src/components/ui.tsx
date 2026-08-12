import type { ReactNode } from 'react'

/* Same tokens as the customer portal, tuned denser — an internal console shows
   far more rows per screen than a customer-facing page. */

export function Card({
  title,
  action,
  children,
  bodyClassName = 'p-[24px] flex flex-col gap-[24px]',
}: {
  title?: string
  action?: ReactNode
  children: ReactNode
  bodyClassName?: string
}) {
  return (
    <section className="rounded-[8px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] bg-white w-full overflow-hidden">
      {title && (
        <header className="border-b border-[rgba(0,0,0,0.09)] px-[24px] py-[16px] flex items-center justify-between gap-[16px]">
          <h2 className="text-[18px] font-semibold text-[#212121] m-0">{title}</h2>
          {action}
        </header>
      )}
      <div className={bodyClassName}>{children}</div>
    </section>
  )
}

/** Label above value — the read-only counterpart of a form field. */
export function DataField({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex flex-col gap-[4px] min-w-0">
      <span className="text-[14px] text-[#6e6e6e] leading-[1.5]">{label}</span>
      <span className="text-[16px] text-[#212121] leading-[1.5] break-words">{value || '—'}</span>
    </div>
  )
}

export function FieldGrid({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[24px] w-full">{children}</div>
}

type Tone = 'success' | 'caution' | 'error' | 'neutral' | 'info'

const TONES: Record<Tone, string> = {
  success: 'bg-[#ecfdf5] text-[#08754f]',
  caution: 'bg-[#fff8ec] text-[#b06f00]',
  error: 'bg-[#fef2f2] text-[#dc2626]',
  neutral: 'bg-[#f2f2f2] text-[#6e6e6e]',
  info: 'bg-[#eff6ff] text-[#005eb8]',
}

export function Badge({ tone = 'neutral', children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center rounded-[16px] px-[12px] py-[2px] text-[12px] leading-[1.4] font-medium whitespace-nowrap ${TONES[tone]}`}
    >
      {children}
    </span>
  )
}

export function PrimaryButton({
  children,
  onClick,
  disabled,
  title,
}: {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  title?: string
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className="rounded-[8px] px-[24px] py-[12px] text-[16px] font-medium leading-[1.5] bg-[#005eb8] text-white border-0 cursor-pointer disabled:bg-[#e0e0e0] disabled:text-[#9e9e9e] disabled:cursor-not-allowed"
    >
      {children}
    </button>
  )
}

export function OutlineButton({
  children,
  onClick,
  disabled,
  title,
}: {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  title?: string
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className="rounded-[8px] px-[24px] py-[12px] text-[16px] font-medium leading-[1.5] bg-white border border-[#005eb8] text-[#005eb8] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] cursor-pointer disabled:border-[#e0e0e0] disabled:text-[#9e9e9e] disabled:cursor-not-allowed"
    >
      {children}
    </button>
  )
}

/* ─── Table ─────────────────────────────────────────────────── */

export function Table({ head, children }: { head: ReactNode[]; children: ReactNode }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-[#fafafa]">
            {head.map((h, i) => (
              <th
                key={i}
                className="text-[14px] font-medium text-[#6e6e6e] leading-[1.5] px-[16px] py-[12px] whitespace-nowrap border-b border-[rgba(0,0,0,0.09)]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

export function Row({ onClick, children }: { onClick?: () => void; children: ReactNode }) {
  return (
    <tr
      onClick={onClick}
      className={`border-b border-[rgba(0,0,0,0.06)] last:border-0 ${
        onClick ? 'cursor-pointer hover:bg-[#f6f8fc]' : ''
      }`}
    >
      {children}
    </tr>
  )
}

export function Cell({ children, muted }: { children: ReactNode; muted?: boolean }) {
  return (
    <td
      className={`text-[14px] leading-[1.5] px-[16px] py-[14px] align-middle ${
        muted ? 'text-[#6e6e6e]' : 'text-[#212121]'
      }`}
    >
      {children}
    </td>
  )
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="py-[48px] flex flex-col items-center gap-[4px] text-center">
      <p className="text-[16px] text-[#212121] m-0">{title}</p>
      {hint && <p className="text-[14px] text-[#6e6e6e] m-0">{hint}</p>}
    </div>
  )
}
