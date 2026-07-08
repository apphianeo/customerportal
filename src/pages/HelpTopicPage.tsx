import { useState } from 'react'
import { RightOutlined, UpOutlined, DownOutlined, ArrowRightOutlined } from '@ant-design/icons'

/* ─── Icons ──────────────────────────────────────────────── */
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-[16px] shrink-0" aria-hidden="true">
      <circle cx="8" cy="8" r="8" fill="#25D366" />
      <path
        d="M6.1 5.85c.13-.29.27-.3.4-.3h.32c.1 0 .24-.04.37.29.14.34.47 1.17.51 1.26.04.08.07.18.01.29-.06.1-.09.17-.18.26-.09.1-.19.22-.27.3-.09.08-.18.18-.08.35.1.18.44.73.95 1.18.65.58 1.2.76 1.38.85.18.08.28.07.38-.04.11-.11.44-.51.55-.68.11-.18.23-.15.38-.09.15.06.98.46 1.15.55.17.08.29.13.33.2.04.07.04.4-.1.79-.13.39-.79.75-1.1.8-.29.06-.65.08-1.06-.07-.24-.09-.55-.19-.95-.37-1.68-.72-2.78-2.42-2.86-2.53-.08-.11-.68-.9-.68-1.72 0-.82.43-1.22.58-1.39Z"
        fill="white"
      />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-[16px] shrink-0" aria-hidden="true">
      <path
        d="M4.4 2.4h2l1 2.6-1.3 1c.5 1.1 1.4 2 2.5 2.5l1-1.3 2.6 1v2c0 .55-.45 1-1 1.05C6.8 11 3 7.2 2.35 3.9 2.3 3.35 2.75 2.4 3.3 2.4h1.1Z"
        fill="#212121"
      />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-[16px] shrink-0" aria-hidden="true">
      <rect x="1.5" y="3" width="13" height="10" rx="1.5" stroke="#212121" strokeWidth="1.2" />
      <path d="M2.2 3.8 8 8.4l5.8-4.6" stroke="#212121" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function WarningIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-[16px] shrink-0" aria-hidden="true">
      <path d="M8 1.5 15 14H1L8 1.5Z" fill="#FFA826" />
      <rect x="7.25" y="6" width="1.5" height="4" rx="0.75" fill="white" />
      <circle cx="8" cy="11.6" r="0.9" fill="white" />
    </svg>
  )
}

/* ─── Still need help — WhatsApp / Phone / Email, matches the
   topic-page "Help Section" variant (3 contact options). ────── */
function StillNeedHelp() {
  return (
    <div className="bg-white rounded-[8px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-[24px] py-[16px] flex flex-col gap-[20px] w-full">
      <div className="flex flex-col gap-[6px]">
        <p className="text-[16px] font-medium text-[#212121] m-0">Still need help?</p>
        <p className="text-[14px] text-[#6e6e6e] m-0">We're here to assist you</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-[16px] sm:gap-[32px] w-full">
        <div className="flex-1 min-w-0 border border-[rgba(0,0,0,0.09)] rounded-[8px] p-[16px] flex flex-col gap-[8px]">
          <div className="flex gap-[8px] items-center">
            <WhatsAppIcon />
            <span className="text-[14px] font-medium text-[#212121]">WhatsApp</span>
          </div>
          <div className="flex flex-col gap-[4px]">
            <span className="text-[14px] text-[#6e6e6e]">Chat instantly</span>
            <button
              onClick={() => console.log('Start WhatsApp chat')}
              className="flex items-center gap-[8px] text-[14px] font-medium text-[#005eb8] bg-transparent border-0 p-0 cursor-pointer w-fit"
            >
              Start Chat
              <ArrowRightOutlined style={{ fontSize: 12 }} />
            </button>
          </div>
        </div>

        <div className="flex-1 min-w-0 border border-[rgba(0,0,0,0.09)] rounded-[8px] p-[16px] flex flex-col gap-[8px]">
          <div className="flex gap-[8px] items-center">
            <PhoneIcon />
            <span className="text-[14px] font-medium text-[#212121]">Phone</span>
          </div>
          <div className="flex flex-col gap-[4px]">
            <span className="text-[14px] text-[#6e6e6e]">Mon-Fri, 9AM-6PM</span>
            <span className="text-[14px] text-[#005eb8]">(+65) 6222 7733</span>
          </div>
        </div>

        <div className="flex-1 min-w-0 border border-[rgba(0,0,0,0.09)] rounded-[8px] p-[16px] flex flex-col gap-[8px]">
          <div className="flex gap-[8px] items-center">
            <EmailIcon />
            <span className="text-[14px] font-medium text-[#212121]">Email</span>
          </div>
          <div className="flex flex-col gap-[4px]">
            <span className="text-[14px] text-[#6e6e6e]">Reply within 24hrs</span>
            <span className="text-[14px] text-[#005eb8]">contactus@uoi.com.sg</span>
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
          ? <UpOutlined style={{ fontSize: 16, color: '#212121' }} className="shrink-0" />
          : <DownOutlined style={{ fontSize: 16, color: '#212121' }} className="shrink-0" />}
      </button>
      {open && (
        <div className="text-[16px] text-[#212121] leading-[1.5] [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-[24px] [&_ol]:pl-[24px] [&_li]:mb-0 [&_p]:m-0 flex flex-col gap-[12px]">
          {answer}
        </div>
      )}
    </div>
  )
}

/* ─── Topic content ──────────────────────────────────────── */
export type HelpTopicKey = 'getting-started' | 'policies' | 'payments' | 'account'

type Faq = { question: string; answer: React.ReactNode }
type TopicContent = { breadcrumbLabel: string; title: string; faqs: Faq[] }

const LINK = 'text-[#005eb8] underline'

const TOPICS: Record<HelpTopicKey, TopicContent> = {
  'getting-started': {
    breadcrumbLabel: 'Getting Started',
    title: 'Getting Started',
    faqs: [
      {
        question: 'How do I access the UOI Customer Portal?',
        answer: (
          <p>
            You can access the UOI Customer Portal at any time through your web browser on desktop or mobile. Visit the portal URL and log in using your Singpass app, or your NRIC/FIN number and password. No app download is required — the portal is fully accessible via your mobile browser.
          </p>
        ),
      },
      {
        question: 'How do I create a new account?',
        answer: (
          <>
            <p>You can register for a Customer Portal account in two ways:</p>
            <ul>
              <li>Via Singpass: Tap 'Log in with Singpass' and follow the on-screen instructions. Singpass will pre-fill your personal details automatically.</li>
              <li>Via NRIC/FIN: Tap 'Log in with NRIC/FIN', then select 'Create an Account' and enter your details manually.</li>
            </ul>
            <p>
              If you experience any issues during registration, please contact us at{' '}
              <a href="#" className={LINK}>help@uoi.com.sg</a>.
            </p>
          </>
        ),
      },
      {
        question: 'What can I do on the UOI Customer Portal?',
        answer: (
          <>
            <p>The Customer Portal lets you manage all your UOI insurance needs in one place, including:</p>
            <ul>
              <li>View all your active policies (Travel, Home, Motor, Helper, Personal Accident)</li>
              <li>Submit and track insurance claims</li>
              <li>Download policy documents and renewal notices</li>
              <li>Update your personal and contact information</li>
              <li>Access your rewards and promotions</li>
              <li>Make premium payments and view payment history</li>
            </ul>
          </>
        ),
      },
    ],
  },
  policies: {
    breadcrumbLabel: 'Policies',
    title: 'Policies',
    faqs: [
      {
        question: 'How do I view my active policies?',
        answer: (
          <p>
            All your active UOI policies are displayed on your Dashboard under 'Your Coverage'. Tap any policy card to view its full details, including coverage period, insured persons, policy number, and benefit limits. You can also access all policies by tapping 'Policies' in the navigation menu.
          </p>
        ),
      },
      {
        question: "What does 'Not Covered' mean on a policy card?",
        answer: (
          <p>
            'Not Covered' means you do not currently hold an active policy for that insurance category. You can purchase a new policy by tapping 'Get Quote' on the card, or by visiting{' '}
            <a href="#" className={LINK}>uoi.com.sg</a>. Coverage categories shown on your dashboard include Travel, Home, Motor, Helper, and Personal Accident.
          </p>
        ),
      },
      {
        question: 'How do I download my policy documents?',
        answer: (
          <>
            <p>To download your policy documents:</p>
            <ol>
              <li>Go to 'Policies' in the navigation</li>
              <li>Select the relevant policy</li>
              <li>Tap the 'Documents' tab</li>
              <li>Tap the download icon next to the document you need</li>
            </ol>
            <p>Available documents include your policy schedule, renewal notices, and certificate of insurance.</p>
          </>
        ),
      },
      {
        question: 'How do I renew my policy?',
        answer: (
          <p>
            If your policy is due for renewal, you will receive a notification via email. You can also initiate renewal directly from the portal by viewing your policy details and tapping 'Renew'. Annual policies are typically renewable 30 days before expiry. For assisted renewal, please contact us at{' '}
            <a href="#" className={LINK}>contactus@uoi.com.sg</a> or call (+65) 6222 7733.
          </p>
        ),
      },
      {
        question: 'Can I make changes to an existing policy?',
        answer: (
          <p>
            Certain policy amendments can be made through the portal, such as updating contact details or adding insured persons. For structural changes to your policy (e.g. changing coverage limits or plan type), please contact our team at{' '}
            <a href="#" className={LINK}>contactus@uoi.com.sg</a>. If your policy was purchased via an agent, please reach out to your agent directly for amendments.
          </p>
        ),
      },
      {
        question: 'How do I view my payment history for a policy?',
        answer: (
          <p>
            Payment history is available under each policy's detail page. Navigate to 'Policies', select your policy, and tap the 'Payment History' tab. You will see a list of past transactions including payment dates, amounts, and payment methods.
          </p>
        ),
      },
    ],
  },
  payments: {
    breadcrumbLabel: 'Payment',
    title: 'Payment',
    faqs: [
      {
        question: 'Where can I view my upcoming premium payments?',
        answer: (
          <p>
            Your upcoming payment schedule is shown in each policy's 'Payment History' tab under Policies. If you are enrolled in GIRO, your premium will be automatically deducted on the due date. You will also receive an email reminder 14 days before your premium is due.
          </p>
        ),
      },
      {
        question: 'My payment failed. What should I do?',
        answer: (
          <>
            <p>If your payment did not go through:</p>
            <ol>
              <li>Check that your card details are up to date</li>
              <li>Ensure sufficient funds are available</li>
              <li>Try an alternative payment method</li>
              <li>If the issue persists, contact your bank or contact us at contactus@uoi.com.sg</li>
            </ol>
            <p>Please ensure your premium is paid before the due date to avoid a lapse in coverage.</p>
          </>
        ),
      },
      {
        question: 'How do I set up or cancel GIRO payments?',
        answer: (
          <p>
            To set up GIRO, please download and complete the GIRO form available at{' '}
            <a href="#" className={LINK}>uoi.com.sg/contact-us</a> under 'Forms', and mail it to us at 146 Robinson Road #02-01 UOI Building, Singapore 068909. To cancel an existing GIRO arrangement, contact us at{' '}
            <a href="#" className={LINK}>contactus@uoi.com.sg</a> or call (+65) 6222 7733.
          </p>
        ),
      },
    ],
  },
  account: {
    breadcrumbLabel: 'Account & Settings',
    title: 'Account & Settings',
    faqs: [
      {
        question: 'How do I update my contact details?',
        answer: (
          <>
            <p>To update your mobile number, email address, or mailing address:</p>
            <ol>
              <li>Log in to the portal</li>
              <li>Tap your profile icon at the top right</li>
              <li>Go to 'Account Settings'</li>
              <li>Update your details and tap 'Save Changes'</li>
            </ol>
            <p>
              Changes will take effect immediately. If you need to update your NRIC or legal name, please contact us directly at{' '}
              <a href="#" className={LINK}>contactus@uoi.com.sg</a> with a copy of your identification document.
            </p>
          </>
        ),
      },
      {
        question: 'How do I close or deactivate my portal account?',
        answer: (
          <p>
            To deactivate your Customer Portal account, please contact us at{' '}
            <a href="#" className={LINK}>contactus@uoi.com.sg</a> with your full name, NRIC, and request for account deactivation. Please note that account deactivation does not cancel any active insurance policies. Active policies will continue until their expiry date.
          </p>
        ),
      },
    ],
  },
}

/* ─── Main page ──────────────────────────────────────────── */
type Props = {
  topic: HelpTopicKey
  onNavigateToDashboard?: () => void
  onNavigateToHelp?: () => void
}

export default function HelpTopicPage({ topic, onNavigateToDashboard, onNavigateToHelp }: Props) {
  const content = TOPICS[topic]
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="bg-bg-page min-h-full">
      <div className="w-full max-w-[980px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-[32px]">

        {/* Breadcrumb + title */}
        <div className="flex flex-col gap-[32px]">
          <div className="flex items-center gap-[4px] flex-wrap">
            <button onClick={onNavigateToDashboard} className="text-[12px] text-[#949494] leading-[1.4] bg-transparent border-0 p-0 cursor-pointer hover:text-[#6e6e6e] transition-colors">
              Dashboard
            </button>
            <RightOutlined style={{ fontSize: 10, color: '#6E6E6E' }} />
            <button onClick={onNavigateToHelp} className="text-[12px] text-[#949494] leading-[1.4] bg-transparent border-0 p-0 cursor-pointer hover:text-[#6e6e6e] transition-colors">
              Help &amp; Support
            </button>
            <RightOutlined style={{ fontSize: 10, color: '#6E6E6E' }} />
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
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
              {i < content.faqs.length - 1 && <div className="h-px bg-[rgba(0,0,0,0.09)] w-full" />}
            </div>
          ))}
        </div>

        <StillNeedHelp />

      </div>
    </div>
  )
}
