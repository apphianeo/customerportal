import { useState, type ReactNode } from 'react'
import { ChevronRightIcon, ChevronDownIcon, ChevronUpIcon } from '../components/icons'
import whatsappIcon from '../assets/icons/whatsapp.svg'
import phoneIcon from '../assets/icons/phone.svg'

function Link({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-text-secondary underline">
      {children}
    </a>
  )
}

type Faq = { q: string; a: ReactNode }
type Category = { title: string; items: Faq[] }

const CATEGORIES: Category[] = [
  {
    title: 'Getting started',
    items: [
      {
        q: 'How do I access the UOI Customer Portal?',
        a: 'You can access the UOI Customer Portal at any time through your web browser on desktop or mobile. Visit the portal URL and log in using your Singpass app, or your NRIC/FIN number and password. No app download is required, the portal is fully accessible via your mobile browser.',
      },
      {
        q: 'What can I do on the UOI Customer Portal?',
        a: (
          <>
            The Customer Portal lets you manage all your UOI insurance needs in one place, including:
            <ul className="list-disc pl-[20px] mt-[8px] flex flex-col gap-[4px]">
              <li>View all your active policies (Travel, Home, Motor, Helper, Personal Accident)</li>
              <li>Download policy documents and renewal notices</li>
              <li>Update your personal and contact information</li>
              <li>Access your rewards and promotions</li>
              <li>View payment history</li>
            </ul>
          </>
        ),
      },
    ],
  },
  {
    title: 'Policies',
    items: [
      {
        q: 'How do I view my active policies?',
        a: "All your active UOI policies are displayed on your Dashboard under 'Your active coverage'. Tap any policy card to view its full details, including coverage period, insured persons, policy number, and benefit limits. You can also access all policies by tapping 'Policies' in the navigation menu.",
      },
      {
        q: 'How do I renew my policy?',
        a: (
          <>
            If your policy is due for renewal, you will receive a notification via email. You can also initiate renewal
            directly from the portal by viewing your policy details and tapping 'Renew'. Annual policies are typically
            renewable 30 days before expiry. For assisted renewal, please contact us{' '}
            <Link href="https://api.whatsapp.com/send/?phone=6580814843&text&type=phone_number&app_absent=0">here</Link> or call{' '}
            <Link href="tel:+6562227733">(+65) 62227733</Link>.
          </>
        ),
      },
      {
        q: 'Can I make changes to an existing policy?',
        a: (
          <>
            Certain policy amendments can be made through the portal, such as updating contact details or adding insured
            persons. For structural changes to your policy (e.g. changing coverage limits or plan type), please contact
            our team <Link href="https://api.whatsapp.com/send/?phone=6580814843&text&type=phone_number&app_absent=0">here</Link>. If your policy was purchased via an agent,
            please reach out to your agent directly for amendments.
          </>
        ),
      },
      {
        q: 'How do I view my payment history for a policy?',
        a: "Payment history is available under each policy's detail page. Navigate to 'Policies', select your policy, and tap the 'Payment History' tab. You will see a list of past transactions including payment dates, amounts, and payment methods.",
      },
      {
        q: 'How do I make a claim?',
        a: (
          <>
            Simply follow the steps{' '}
            <Link href="https://www.uoi.com.sg/claims-assistance.page">here</Link> to file for your
            claims or directly through your individual policy page.
          </>
        ),
      },
    ],
  },
  {
    title: 'Payment',
    items: [
      {
        q: 'Where can I view my upcoming premium payments?',
        a: 'Your upcoming payment schedule is shown in each policy\'s "Payment History" tab under Policies. If you are enrolled in GIRO, your premium will be automatically deducted on the due date. You will also receive an email reminder 14 days before your premium is due.',
      },
      {
        q: 'My payment failed. What should I do?',
        a: (
          <>
            If your payment did not go through:
            <ol className="list-decimal pl-[20px] mt-[8px] flex flex-col gap-[4px]">
              <li>Check that your card details are up to date</li>
              <li>Ensure sufficient funds are available</li>
              <li>Try an alternative payment method</li>
              <li>If the issue persists, contact your bank or contact us at <Link href="mailto:contactus@uoi.com.sg">contactus@uoi.com.sg</Link></li>
            </ol>
            <p className="mt-[8px] m-0">Please ensure your premium is paid before the due date to avoid a lapse in coverage.</p>
          </>
        ),
      },
    ],
  },
  {
    title: 'Account & settings',
    items: [
      {
        q: 'How do I update my contact details?',
        a: (
          <>
            You can update your contact number and email address under Manage Account → Contact information. This updates
            your marketing contact details. To update contact info tied to a specific policy, please update it on the
            Policies page.
          </>
        ),
      },
      {
        q: 'How do I close or deactivate my portal account?',
        a: (
          <>
            To deactivate your Customer Portal account, please contact us{' '}
            <Link href="https://api.whatsapp.com/send/?phone=6580814843&text&type=phone_number&app_absent=0">here</Link> with your full name, NRIC, and request for account
            deactivation. Please note that account deactivation does not cancel any active insurance policies. Active
            policies will continue until their expiry date.
          </>
        ),
      },
    ],
  },
]

/* ─── Accordion item ─── */
function FaqItem({ item, isLast }: { item: Faq; isLast: boolean }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-[16px] w-full px-[16px] py-[16px] bg-transparent border-0 cursor-pointer text-left"
      >
        <span className="flex-1 min-w-0 text-[16px] text-[#212121] leading-[1.5]">{item.q}</span>
        {open
          ? <ChevronUpIcon size={20} className="shrink-0" style={{ color: '#6E6E6E' }} />
          : <ChevronDownIcon size={20} className="shrink-0" style={{ color: '#6E6E6E' }} />}
      </button>
      {open && (
        <div className="px-[16px] pb-[16px] text-[16px] text-[#6e6e6e] leading-[1.5]">
          {item.a}
        </div>
      )}
      {/* Divider is inset to the text column, not full-bleed */}
      {!isLast && <div className="h-px bg-[rgba(0,0,0,0.09)] mx-[16px]" />}
    </div>
  )
}

/* ─── Category card ─── */
function CategoryCard({ category }: { category: Category }) {
  return (
    <div className="rounded-[8px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] overflow-hidden bg-white w-full">
      <div className="px-[16px] pt-[16px] pb-[8px]">
        <h2 className="text-[16px] font-semibold text-[#212121] m-0">{category.title}</h2>
      </div>
      {category.items.map((item, i) => (
        <FaqItem key={item.q} item={item} isLast={i === category.items.length - 1} />
      ))}
    </div>
  )
}

type Props = {
  onNavigateToDashboard?: () => void
}

export default function HelpSupportPage({ onNavigateToDashboard }: Props) {
  return (
    <div className="bg-bg-page min-h-full">
      <div className="screen-container flex flex-col gap-[32px]">

        {/* Breadcrumb + title — 32px rhythm between breadcrumb, header and content */}
        <div className="flex flex-col gap-[32px]">
          <div className="flex items-center gap-[4px]">
            <button onClick={onNavigateToDashboard} className="text-[12px] text-[#949494] leading-[1.4] bg-transparent border-0 p-0 cursor-pointer">
              Dashboard
            </button>
            <ChevronRightIcon size={10} style={{ color: '#6E6E6E' }} />
            <span className="text-[12px] font-semibold text-[#005eb8] leading-[1.4]">Help &amp; Support</span>
          </div>
          <h1 className="font-h1-title font-semibold text-[#212121] m-0">Help &amp; Support</h1>
        </div>

        {/* FAQ categories — cards keep their own 24px rhythm */}
        <div className="flex flex-col gap-[24px]">
          {CATEGORIES.map(cat => <CategoryCard key={cat.title} category={cat} />)}
        </div>

        {/* Still need help? */}
        <div className="rounded-[8px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] bg-white w-full px-[24px] py-[16px] flex flex-col gap-[16px]">
          <h2 className="font-h3-title font-semibold text-[#212121] m-0">Still need help?</h2>

          {/* Operating hours */}
          <div className="border border-[rgba(0,0,0,0.09)] rounded-[8px] p-[16px] flex flex-col gap-[8px]">
            <span className="text-[16px] font-medium text-[#212121] leading-[1.5]">Operating Hours</span>
            <div className="text-[14px] text-[#6e6e6e] leading-[1.5]">
              <p className="m-0">Monday - Thursday: 8.45am to 5.45pm, Friday: 8.45am to 4.45pm</p>
              <p className="m-0">Close on weekends and public holidays</p>
            </div>
          </div>

          {/* Contact channels */}
          <div className="flex flex-col sm:flex-row gap-[16px] items-stretch">
            <div className="flex-1 min-w-0 border border-[rgba(0,0,0,0.09)] rounded-[8px] p-[16px] flex flex-col gap-[8px]">
              <div className="flex items-center gap-[8px]">
                <img src={whatsappIcon} alt="" aria-hidden="true" className="size-[16px] shrink-0" />
                <span className="text-[16px] font-medium text-[#212121] leading-[1.5]">WhatsApp</span>
              </div>
              <div className="flex flex-wrap items-center gap-[8px] text-[14px] leading-[1.5]">
                <span className="text-[#6e6e6e]">Chat instantly:</span>
                <Link href="https://api.whatsapp.com/send/?phone=6580814843&text&type=phone_number&app_absent=0">(+65) 80814843</Link>
              </div>
            </div>
            <div className="flex-1 min-w-0 border border-[rgba(0,0,0,0.09)] rounded-[8px] p-[16px] flex flex-col gap-[8px]">
              <div className="flex items-center gap-[8px]">
                <img src={phoneIcon} alt="" aria-hidden="true" className="size-[16px] shrink-0" />
                <span className="text-[16px] font-medium text-[#212121] leading-[1.5]">Phone</span>
              </div>
              <div className="flex flex-col gap-[4px] text-[14px] leading-[1.5]">
                <div className="flex flex-wrap items-center gap-[8px]">
                  <span className="text-[#6e6e6e]">General Hotline:</span>
                  <Link href="tel:+6562227733">(+65) 62227733</Link>
                </div>
                <div className="flex flex-wrap items-center gap-[8px]">
                  <span className="text-[#6e6e6e]">24 Hours Emergency Assist Hotline:</span>
                  <Link href="tel:+6562227737">(+65) 62227737</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
