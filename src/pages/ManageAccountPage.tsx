import { useState, useEffect } from 'react'
import { ChevronRightIcon } from '../components/icons'
import successCircle from '../assets/icons/success-circle.svg'
import ChangePasswordModal from '../components/ChangePasswordModal'
import DatePicker from '../components/DatePicker'

/* ─── Field — editable or locked (grey) ─── */
function Field({
  label,
  value,
  onChange,
  disabled,
  placeholder,
}: {
  label: string
  value: string
  onChange?: (v: string) => void
  disabled?: boolean
  placeholder?: string
}) {
  return (
    <label className="flex flex-col gap-[8px] w-full">
      <span className="text-[14px] text-[#212121] leading-[1.5]">{label}</span>
      {disabled ? (
        <div aria-disabled="true" className="bg-[#f5f5f5] border border-[rgba(0,0,0,0.09)] rounded-[8px] px-[16px] py-[12px] w-full">
          <span className="text-[16px] text-[#949494] leading-[1.5]">{value}</span>
        </div>
      ) : (
        <input
          value={value}
          placeholder={placeholder}
          onChange={e => onChange?.(e.target.value)}
          className="bg-white border border-[rgba(0,0,0,0.09)] rounded-[8px] px-[16px] py-[12px] w-full text-[16px] text-[#212121] leading-[1.5] outline-none placeholder:text-[#949494] focus:border-[#005eb8] focus:shadow-[0px_0px_0px_3px_rgba(0,94,184,0.2)]"
        />
      )}
    </label>
  )
}

/* ─── Checkbox row ─── */
function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <button type="button" onClick={onChange} className="flex items-center gap-[8px] bg-transparent border-0 p-0 cursor-pointer text-left">
      <span className={`flex items-center justify-center size-[18px] rounded-[4px] border shrink-0 ${checked ? 'bg-[#005eb8] border-[#005eb8]' : 'bg-white border-[rgba(0,0,0,0.25)]'}`}>
        {checked && (
          <svg viewBox="0 0 12 12" className="size-[12px]" aria-hidden="true">
            <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className="text-[14px] text-[#212121] leading-[1.5]">{label}</span>
    </button>
  )
}

/* ─── "Save Changes" CTA, separated from the fields by a rule ─── */
function SaveButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="border border-[#005eb8] text-[#005eb8] bg-white px-[24px] py-[12px] rounded-[8px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] font-medium text-[16px] cursor-pointer"
    >
      Save Changes
    </button>
  )
}

/* ─── Card ─── */
function Card({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
  footer?: React.ReactNode
}) {
  return (
    <div className="rounded-[8px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] overflow-hidden bg-white w-full">
      <div className="border-b border-[rgba(0,0,0,0.09)] px-[24px] py-[16px] flex flex-col gap-[4px]">
        <h2 className="text-[18px] font-semibold text-[#212121] m-0">{title}</h2>
        {subtitle && <p className="text-[14px] text-[#6e6e6e] m-0 leading-[1.5]">{subtitle}</p>}
      </div>
      <div className="p-[24px] flex flex-col gap-[24px]">{children}</div>
      {/* Action row — rule meets both card edges, 16px above and below */}
      {footer && (
        <div className="border-t border-[rgba(0,0,0,0.09)] px-[24px] py-[16px] flex justify-end">
          {footer}
        </div>
      )}
    </div>
  )
}

type Props = {
  onNavigateToDashboard?: () => void
  onLogout?: () => void
  authMethod?: 'singpass' | 'account'
}

export default function ManageAccountPage({ onNavigateToDashboard, onLogout, authMethod = 'account' }: Props) {
  const singpass = authMethod === 'singpass'

  // Personal (editable only for account-created users)
  const [first, setFirst] = useState('Chris')
  const [last, setLast] = useState('Wong')
  const [dob, setDob] = useState('01/01/1989')
  const [nric, setNric] = useState('S89234567D')

  // Address
  const [resPostal, setResPostal] = useState('645123')
  const [resAddr, setResAddr] = useState('123 Pasir Ris St 21')
  const [resUnit, setResUnit] = useState('#03-21')
  const [mailingSame, setMailingSame] = useState(true)
  const [mailPostal, setMailPostal] = useState('')
  const [mailAddr, setMailAddr] = useState('')
  const [mailUnit, setMailUnit] = useState('')

  // Contact
  const [contact, setContact] = useState('+65 9123 4567')
  const [email, setEmail] = useState('chriswong@gmail.com')
  const [consent, setConsent] = useState(true)

  const [toast, setToast] = useState<string | null>(null)
  const [showChangePw, setShowChangePw] = useState(false)

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3000)
    return () => clearTimeout(t)
  }, [toast])

  return (
    <div className="bg-bg-page min-h-full">
      {toast && (
        <div className="fixed top-[85px] inset-x-0 z-30 px-4 sm:px-6 lg:px-8 pointer-events-none">
          <div className="max-w-[980px] mx-auto flex justify-center">
            <div className="bg-[#ecfdf5] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-[8px] px-[16px] py-[12px] flex gap-[8px] items-center pointer-events-auto">
              <img src={successCircle} alt="" aria-hidden="true" className="size-[16px] shrink-0" />
              <p className="text-[14px] text-[#212121] leading-[1.5] m-0">{toast}</p>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-[1044px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-[32px]">

        {/* Breadcrumb + title — 32px rhythm between breadcrumb, header and content */}
        <div className="flex flex-col gap-[32px]">
          <div className="flex items-center gap-[4px] flex-wrap">
            <button onClick={onNavigateToDashboard} className="text-[12px] text-[#949494] leading-[1.4] bg-transparent border-0 p-0 cursor-pointer">
              Dashboard
            </button>
            <ChevronRightIcon size={10} style={{ color: '#6E6E6E' }} />
            <span className="text-[12px] font-semibold text-[#005eb8] leading-[1.4]">Manage Account</span>
          </div>
          <h1 className="text-[32px] font-semibold text-[#212121] leading-[1.2] m-0">Manage Account</h1>
        </div>

        {/* Personal details */}
        <Card
          title="Personal details"
          footer={!singpass && <SaveButton onClick={() => setToast('Personal details updated successfully')} />}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[24px] w-full">
            <Field label="First name" value={first} onChange={setFirst} disabled={singpass} />
            <Field label="Last name" value={last} onChange={setLast} disabled={singpass} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[24px] w-full">
            <DatePicker label="Date of birth" value={dob} onChange={setDob} disabled={singpass} />
            <Field label="NRIC/FIN" value={nric} onChange={setNric} disabled={singpass} />
          </div>
        </Card>

        {/* Address */}
        <Card
          title="Address"
          footer={<SaveButton onClick={() => setToast('Address updated successfully')} />}
        >
          <div className="flex flex-col gap-[16px] w-full">
            <span className="text-[14px] font-medium text-[#212121] leading-[1.5]">Residential address</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[24px] w-full">
              <Field label="Postal code" value={resPostal} onChange={setResPostal} />
              <Field label="Address" value={resAddr} onChange={setResAddr} />
            </div>
            <Field label="Unit number" value={resUnit} onChange={setResUnit} />
          </div>

          <div className="flex flex-col gap-[16px] w-full">
            <span className="text-[14px] font-medium text-[#212121] leading-[1.5]">Mailing address</span>
            <Checkbox checked={mailingSame} onChange={() => setMailingSame(v => !v)} label="Mailing address same as residential" />
            {!mailingSame && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[24px] w-full">
                  <Field label="Postal code" value={mailPostal} onChange={setMailPostal} placeholder="Enter postal code" />
                  <Field label="Address" value={mailAddr} onChange={setMailAddr} placeholder="Enter address" />
                </div>
                <Field label="Unit number" value={mailUnit} onChange={setMailUnit} placeholder="Enter unit number" />
              </>
            )}
          </div>

        </Card>

        {/* Contact information */}
        <Card
          title="Contact information"
          subtitle="This is for marketing communications only. To update your contact info for your policy, please update in policy page."
          footer={<SaveButton onClick={() => setToast('Contact information updated successfully')} />}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[24px] w-full">
            <Field label="Contact number" value={contact} onChange={setContact} />
            <Field label="Email address" value={email} onChange={setEmail} />
          </div>
          <Checkbox checked={consent} onChange={() => setConsent(v => !v)} label="I consent to receiving marketing communications" />
        </Card>

        {/* Login & security */}
        <Card title="Login & security">
          <Field label="Account authenticator" value={singpass ? 'Linked via Singpass' : 'System Creation'} disabled />
          <div className="flex flex-col gap-[12px] w-full">
            <span className="text-[14px] text-[#212121] leading-[1.5]">Password</span>
            <button
              onClick={() => setShowChangePw(true)}
              className="self-start border border-[#005eb8] text-[#005eb8] bg-white px-[24px] py-[12px] rounded-[8px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] font-medium text-[16px] cursor-pointer"
            >
              Update Password
            </button>
          </div>
        </Card>
      </div>

      {showChangePw && (
        <ChangePasswordModal
          onClose={() => setShowChangePw(false)}
          onSignIn={() => { setShowChangePw(false); onLogout?.() }}
        />
      )}
    </div>
  )
}
