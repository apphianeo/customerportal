import { useState, useEffect } from 'react'
import { ChevronRightIcon } from '../components/icons'
import successCircle from '../assets/icons/success-circle.svg'
import ChangePasswordModal from '../components/ChangePasswordModal'
import DatePicker from '../components/DatePicker'
import { ACCOUNTS, type Account } from '../data/accounts'
import { PhoneField, SUPPORT_URL } from './auth/AuthUI'
import retrieveMyInfo from '../assets/retrieve-myinfo.png'
import type { CountryCode } from 'libphonenumber-js'

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
    <label className="flex flex-col gap-[12px] w-full">
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
  subtitle?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
}) {
  return (
    <div className="rounded-[8px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] overflow-hidden bg-white w-full">
      <div className="border-b border-[rgba(0,0,0,0.09)] px-[24px] py-[16px] flex flex-col gap-[4px]">
        <h2 className="font-h3-title font-semibold text-[#212121] m-0">{title}</h2>
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
  account?: Account
}

export default function ManageAccountPage({ onNavigateToDashboard, onLogout, authMethod = 'account', account }: Props) {
  const singpass = authMethod === 'singpass'
  const seed = account ?? ACCOUNTS[0]

  // Personal (editable only for account-created users)
  const [first, setFirst] = useState(seed.firstName)
  const [last, setLast] = useState(seed.lastName)
  const [dob, setDob] = useState(seed.dob)
  const [nric, setNric] = useState(seed.nric)

  // Address
  const [resPostal, setResPostal] = useState(seed.residentialPostal)
  const [resAddr, setResAddr] = useState(seed.residentialAddress)
  const [resUnit, setResUnit] = useState(seed.residentialUnit)
  const [mailingSame, setMailingSame] = useState(seed.mailingSameAsResidential)
  const [mailPostal, setMailPostal] = useState(seed.mailingPostal)
  const [mailAddr, setMailAddr] = useState(seed.mailingAddress)
  const [mailUnit, setMailUnit] = useState(seed.mailingUnit)

  // Contact
  const [contact, setContact] = useState(seed.phone)
  const [country, setCountry] = useState<CountryCode>('SG')
  const [email, setEmail] = useState(seed.email)
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

      <div className="screen-container flex flex-col gap-[32px]">

        {/* Breadcrumb + title — 32px rhythm between breadcrumb, header and content */}
        <div className="flex flex-col gap-[32px]">
          <div className="flex items-center gap-[4px] flex-wrap">
            <button onClick={onNavigateToDashboard} className="text-[12px] text-[#949494] leading-[1.4] bg-transparent border-0 p-0 cursor-pointer">
              Dashboard
            </button>
            <ChevronRightIcon size={10} style={{ color: '#6E6E6E' }} />
            <span className="text-[12px] font-semibold text-[#005eb8] leading-[1.4]">Manage Account</span>
          </div>
          <h1 className="font-h1-title font-semibold text-[#212121] m-0">Manage Account</h1>
        </div>

        {/* MyInfo banner — retrieving from Singpass is offered to everyone */}
        <div className="rounded-[8px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] bg-white w-full px-[24px] py-[16px] flex flex-wrap items-center justify-between gap-[16px]">
            <div className="flex flex-col gap-[4px] min-w-0">
              <h2 className="text-[16px] font-semibold text-[#212121] m-0">Update details with MyInfo</h2>
              {/* Only Singpass accounts have locked fields to explain */}
              {singpass && (
                <p className="text-[14px] text-[#6e6e6e] leading-[1.5] m-0">
                  Some details are read-only because they are linked to your Singpass profile
                </p>
              )}
            </div>
            <button
              onClick={() => setToast('Details retrieved from MyInfo')}
              className="shrink-0 bg-transparent border-0 p-0 cursor-pointer"
            >
              <img
                src={retrieveMyInfo}
                alt="Retrieve MyInfo with Singpass"
                className="w-[155px] h-[55px] object-contain"
              />
            </button>
        </div>

        {/* Profile — personal details and residential address in one card */}
        <Card
          title="Profile"
          footer={<SaveButton onClick={() => setToast('Profile updated successfully')} />}
        >
          <div className="flex flex-col gap-[16px] w-full">
            <span className="text-[14px] font-semibold text-[#212121] leading-[1.5]">Personal details</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[24px] w-full">
              <Field label="First name" value={first} onChange={setFirst} disabled={singpass} />
              <Field label="Last name" value={last} onChange={setLast} disabled={singpass} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[24px] w-full">
              <DatePicker label="Date of birth" value={dob} onChange={setDob} disabled={singpass} />
              <Field label="NRIC/FIN" value={nric} onChange={setNric} disabled={singpass} />
            </div>
          </div>

          <div className="flex flex-col gap-[16px] w-full">
            <span className="text-[14px] font-semibold text-[#212121] leading-[1.5]">Residential address</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[24px] w-full">
              <Field label="Postal code" value={resPostal} onChange={setResPostal} disabled={singpass} />
              <Field label="Address" value={resAddr} onChange={setResAddr} disabled={singpass} />
            </div>
            <Field label="Unit number" value={resUnit} onChange={setResUnit} disabled={singpass} />
            <Checkbox checked={mailingSame} onChange={() => setMailingSame(v => !v)} label="Mailing address same as residential" />
          </div>

          {!mailingSame && (
            <div className="flex flex-col gap-[16px] w-full">
              <span className="text-[14px] font-semibold text-[#212121] leading-[1.5]">Mailing address</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[24px] w-full">
                <Field label="Postal code" value={mailPostal} onChange={setMailPostal} placeholder="Enter postal code" />
                <Field label="Address" value={mailAddr} onChange={setMailAddr} placeholder="Enter address" />
              </div>
              <Field label="Unit number" value={mailUnit} onChange={setMailUnit} placeholder="Enter unit number" />
            </div>
          )}
        </Card>

        {/* Contact information */}
        <Card
          title="Contact information"
          footer={<SaveButton onClick={() => setToast('Contact information updated successfully')} />}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[24px] w-full items-start">
            <PhoneField
              label="Mobile number"
              value={contact}
              onChange={setContact}
              country={country}
              onCountryChange={setCountry}
              placeholder="Enter Mobile number"
            />
            <div className="flex flex-col gap-[8px] w-full">
              <Field label="Email address" value={email} onChange={setEmail} />
              <span className="text-[12px] leading-[1.4] text-[#6e6e6e]">
                This is for UOI's correspondences only. To change portal login email address,
                please contact UOI{' '}
                <a
                  href={SUPPORT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary underline"
                >
                  here
                </a>
                .
              </span>
            </div>
          </div>
          <Checkbox checked={consent} onChange={() => setConsent(v => !v)} label="I consent to receiving marketing communications" />
        </Card>

        {/* Login & security */}
        <Card title="Login & security">
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
          email={email}
          nric={nric}
          onClose={() => setShowChangePw(false)}
          onSignIn={() => { setShowChangePw(false); onLogout?.() }}
        />
      )}
    </div>
  )
}
