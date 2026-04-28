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
      {/* Left accent bar */}
      <div className="self-stretch flex items-stretch shrink-0">
        <div className="w-[8px] bg-caution rounded-bl-[8px] rounded-tl-[8px]" />
      </div>

      {/* Content */}
      <div className="flex-1 bg-white border border-solid border-white px-4 py-3 rounded-br-[8px] rounded-tr-[8px] min-w-0">
        <div className="flex gap-3 items-start">
          {/* Warning icon — padded top to align with first text line */}
          <span className="pt-px shrink-0 text-caution" style={{ fontSize: 16 }}>
            <ExclamationCircleFilled />
          </span>

          {/* Text + CTA */}
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <p className="text-sm font-medium text-text-primary leading-relaxed">
              {title}
            </p>
            <p className="text-xs text-text-secondary leading-normal">
              {description}
            </p>
            {ctaLabel && (
              <button
                onClick={onCtaClick}
                className="self-start flex items-center gap-1.5 text-sm font-medium text-primary cursor-pointer bg-transparent border-0 p-0 mt-0.5 hover:opacity-80 transition-opacity"
              >
                {ctaLabel}
                <ArrowRightOutlined style={{ fontSize: 12 }} />
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
