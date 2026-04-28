import { useState } from 'react'
import { ExclamationCircleFilled, CloseOutlined, ArrowRightOutlined } from '@ant-design/icons'

type Props = {
  title: string
  description: string
  ctaLabel?: string
  onCtaClick?: () => void
}

export default function NotificationBanner({ title, description, ctaLabel, onCtaClick }: Props) {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  return (
    <div className="flex items-center drop-shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
      {/* Left accent bar — flex items-center self-stretch per Figma spec */}
      <div className="flex items-center self-stretch shrink-0">
        <div className="w-[8px] h-full bg-caution rounded-tl-[8px] rounded-bl-[8px]" />
      </div>

      {/* Content */}
      <div className="flex-[1_0_0] bg-white border border-solid border-white px-4 py-3 rounded-tr-[8px] rounded-br-[8px] min-w-0">
        <div className="flex gap-3 items-start w-full">

          {/* Warning icon — 2px top pad aligns with first text line */}
          <div className="flex items-center pt-[2px] shrink-0">
            <span className="size-4 flex items-center justify-center text-caution">
              <ExclamationCircleFilled style={{ fontSize: 16 }} />
            </span>
          </div>

          {/* Text + CTA */}
          <div className="flex flex-col gap-[4px] flex-[1_0_0] min-w-0 overflow-hidden">
            <p className="text-sm font-medium text-text-primary leading-normal m-0">
              {title}
            </p>
            <p className="text-[12px] text-text-secondary leading-[1.4] m-0">
              {description}
            </p>
            {ctaLabel && (
              <button
                onClick={onCtaClick}
                className="self-start flex items-center gap-2 text-sm font-medium text-primary cursor-pointer bg-transparent border-0 p-0 hover:opacity-80 transition-opacity"
              >
                {ctaLabel}
                <ArrowRightOutlined style={{ fontSize: 16 }} />
              </button>
            )}
          </div>

          {/* Dismiss */}
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss notification"
            className="shrink-0 size-4 flex items-center justify-center text-text-tertiary hover:text-text-primary transition-colors bg-transparent border-0 cursor-pointer p-0"
          >
            <CloseOutlined style={{ fontSize: 12 }} />
          </button>

        </div>
      </div>
    </div>
  )
}
