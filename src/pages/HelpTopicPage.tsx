import { useState } from 'react'
import { ChevronRightIcon, ChevronUpIcon, ChevronDownIcon, ArrowForwardIcon } from '../components/icons'
import whatsappIcon from '../assets/icons/whatsapp.svg'
import phoneIcon from '../assets/icons/phone.svg'
import { TOPICS, type HelpTopicKey } from '../data/helpTopics'

/* ─── Icons ──────────────────────────────────────────────── */
function WarningIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-[16px] shrink-0" aria-hidden="true">
      <path d="M8 1.5 15 14H1L8 1.5Z" fill="#FFA826" />
      <rect x="7.25" y="6" width="1.5" height="4" rx="0.75" fill="white" />
      <circle cx="8" cy="11.6" r="0.9" fill="white" />
    </svg>
  )
}

/* ─── Still need help — WhatsApp / Phone, matches the main
   Help & Support page (2 contact options). ─────────────────── */
function StillNeedHelp() {
  return (
    <div className="bg-white rounded-[8px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[24px] py-[16px] flex flex-col gap-[20px] w-full">
      <div className="flex flex-col gap-[6px]">
        <p className="text-[16px] font-semibold text-[#212121] m-0">Still need help?</p>
        <p className="text-[14px] text-[#6e6e6e] m-0">We're here to assist you</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-[16px] sm:gap-[32px] w-full">
        <div className="flex-1 min-w-0 border border-[rgba(0,0,0,0.09)] rounded-[8px] p-[16px] flex flex-col gap-[8px]">
          <div className="flex gap-[8px] items-center">
            <img src={whatsappIcon} alt="" aria-hidden="true" className="size-[16px] shrink-0" />
            <span className="text-[14px] font-medium text-[#212121]">WhatsApp</span>
          </div>
          <div className="flex flex-col gap-[4px]">
            <span className="text-[14px] text-[#6e6e6e]">Chat instantly</span>
            <button
              onClick={() => console.log('Start WhatsApp chat')}
              className="flex items-center gap-[8px] text-[14px] font-medium text-[#005eb8] bg-transparent border-0 p-0 cursor-pointer w-fit"
            >
              Start Chat
              <ArrowForwardIcon size={12} />
            </button>
          </div>
        </div>

        <div className="flex-1 min-w-0 border border-[rgba(0,0,0,0.09)] rounded-[8px] p-[16px] flex flex-col gap-[8px]">
          <div className="flex gap-[8px] items-center">
            <img src={phoneIcon} alt="" aria-hidden="true" className="size-[16px] shrink-0" />
            <span className="text-[14px] font-medium text-[#212121]">Phone</span>
          </div>
          <div className="flex flex-col gap-[4px]">
            <span className="text-[14px] text-[#6e6e6e]">Mon-Fri, 9AM-6PM</span>
            <span className="text-[14px] text-[#005eb8]">(+65) 6222 7733</span>
          </div>
        </div>
      </div>

      <div className="bg-[#fff8ec] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-[8px] px-[16px] py-[12px] flex gap-[8px] items-center">
        <WarningIcon />
        <p className="text-[14px] text-[#212121] m-0">For emergencies, call 24/7 hotline: (+65) 6222 7737</p>
      </div>
    </div>
  )
}

/* ─── FAQ accordion item ─────────────────────────────────── */
function FaqItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string
  answer: React.ReactNode
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className="w-full flex flex-col gap-[12px]">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-[12px] bg-transparent border-0 p-0 cursor-pointer text-left"
      >
        <span className="flex-1 text-[16px] font-medium text-[#212121]">{question}</span>
        {open
          ? <ChevronUpIcon size={16} style={{ color: '#212121' }} className="shrink-0" />
          : <ChevronDownIcon size={16} style={{ color: '#212121' }} className="shrink-0" />}
      </button>
      {open && (
        <div className="text-[16px] text-[#212121] leading-[1.5] [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-[24px] [&_ol]:pl-[24px] [&_li]:mb-0 [&_p]:m-0 flex flex-col gap-[12px]">
          {answer}
        </div>
      )}
    </div>
  )
}

/* ─── Main page ──────────────────────────────────────────── */
type Props = {
  topic: HelpTopicKey
  onNavigateToDashboard?: () => void
  onNavigateToHelp?: () => void
}

export default function HelpTopicPage({ topic, onNavigateToDashboard, onNavigateToHelp }: Props) {
  const content = TOPICS[topic]
  const [openIndices, setOpenIndices] = useState<Set<number>>(() => new Set([0]))

  function toggle(i: number) {
    setOpenIndices(prev => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  return (
    <div className="bg-bg-page min-h-full">
      <div className="w-full max-w-[980px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-[32px]">

        {/* Breadcrumb + title */}
        <div className="flex flex-col gap-[32px]">
          <div className="flex items-center gap-[4px] flex-wrap">
            <button onClick={onNavigateToDashboard} className="text-[12px] text-[#949494] leading-[1.4] bg-transparent border-0 p-0 cursor-pointer">
              Dashboard
            </button>
            <ChevronRightIcon size={10} style={{ color: '#6E6E6E' }} />
            <button onClick={onNavigateToHelp} className="text-[12px] text-[#949494] leading-[1.4] bg-transparent border-0 p-0 cursor-pointer">
              Help &amp; Support
            </button>
            <ChevronRightIcon size={10} style={{ color: '#6E6E6E' }} />
            <span className="text-[12px] font-bold text-[#005eb8] leading-[1.4]">{content.breadcrumbLabel}</span>
          </div>
          <h1 className="text-[28px] sm:text-[32px] font-bold text-[#212121] leading-[1.2] m-0">{content.title}</h1>
        </div>

        {/* FAQ accordion */}
        <div className="flex flex-col gap-[24px] w-full">
          {content.faqs.map((faq, i) => (
            <div key={i} className="flex flex-col gap-[24px] w-full">
              <FaqItem
                question={faq.question}
                answer={faq.answer}
                open={openIndices.has(i)}
                onToggle={() => toggle(i)}
              />
              {i < content.faqs.length - 1 && <div className="h-px bg-[rgba(0,0,0,0.09)] w-full" />}
            </div>
          ))}
        </div>

        <div className="h-px bg-[rgba(0,0,0,0.09)] w-full" />

        <StillNeedHelp />

      </div>
    </div>
  )
}
