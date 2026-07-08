import { useState } from 'react'
import { RightOutlined } from '@ant-design/icons'

/* ─── Input field — disabled (Singpass-verified) or editable ─ */
function InputField({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string
  value: string
  onChange?: (v: string) => void
  disabled?: boolean
}) {
  return (
    <div className="flex flex-col gap-[8px] w-full">
      <span className="text-[14px] text-[#212121] leading-[1.5]">{label}</span>
      {disabled ? (
        <div className="bg-[#f5f5f5] border border-[rgba(0,0,0,0.09)] rounded-[8px] px-[16px] py-[12px] w-full">
          <span className="text-[16px] text-[#bdbdbd] leading-[1.5]">{value}</span>
        </div>
      ) : (
        <input
          value={value}
          onChange={e => onChange?.(e.target.value)}
          className="bg-white border border-[rgba(0,0,0,0.09)] rounded-[8px] px-[16px] py-[12px] w-full text-[16px] text-[#212121] leading-[1.5] outline-none focus:border-[#005eb8] transition-colors"
        />
      )}
    </div>
  )
}

/* ─── Form card — matches the "Policy Module" section pattern ─ */
function FormCard({
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
      <div className="border-b border-[rgba(0,0,0,0.09)] px-[24px] py-[16px] flex flex-col gap-[8px]">
        <h2 className="text-[18px] font-semibold text-[#212121] m-0">{title}</h2>
        {subtitle && <p className="text-[14px] text-[#6e6e6e] m-0">{subtitle}</p>}
      </div>
      <div className="p-[24px] flex flex-col gap-[24px]">
        {children}
      </div>
      {footer && (
        <div className="bg-white border-t border-[rgba(0,0,0,0.09)] px-[24px] py-[16px] flex items-center justify-between gap-[16px] flex-wrap">
          {footer}
        </div>
      )}
    </div>
  )
}

type Props = {
  onNavigateToDashboard?: () => void
}

export default function ManageAccountPage({ onNavigateToDashboard }: Props) {
  const [contactNumber, setContactNumber] = useState('91234567')
  const [email, setEmail] = useState('chriswong@gmail.com')

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
            <span className="text-[12px] font-bold text-[#005eb8] leading-[1.4]">Manage Account</span>
          </div>
          <h1 className="text-[28px] sm:text-[32px] font-bold text-[#212121] leading-[1.2] m-0">Manage Account</h1>
        </div>

        {/* Personal Information */}
        <FormCard
          title="Personal Information"
          subtitle="Identity details are verified with Singpass and cannot be self-edited."
          footer={
            <>
              <p className="text-[12px] font-medium text-[#949494] m-0">Changes apply to your account immediately.</p>
              <button
                disabled
                className="border border-[rgba(0,0,0,0.09)] text-[#bdbdbd] bg-white px-[24px] py-[12px] rounded-[8px] font-medium text-[16px] cursor-not-allowed"
              >
                Save Changes
              </button>
            </>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[24px] w-full">
            <InputField label="First Name" value="Chris" disabled />
            <InputField label="Last Name" value="Wong" disabled />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[24px] w-full">
            <InputField label="Date of Birth" value="01 Jan 1989" disabled />
            <InputField label="NRIC/FIN" value="S89234567D" disabled />
          </div>
          <InputField label="Address" value="123 Pasir Ris St 21 #03-21 Singapore 645123" disabled />
        </FormCard>

        {/* Contact Information */}
        <FormCard
          title="Contact Information"
          subtitle="This is for marketing communications only. To update your contact info for your policy, please update in policy page."
          footer={
            <>
              <p className="text-[12px] font-medium text-[#949494] m-0">Changes apply to all account immediately.</p>
              <button
                onClick={() => console.log('Save contact information', { contactNumber, email })}
                className="border border-[#005eb8] text-[#005eb8] bg-white px-[24px] py-[12px] rounded-[8px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] font-medium text-[16px] cursor-pointer hover:bg-[#f0f7ff] transition-colors"
              >
                Save Changes
              </button>
            </>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[24px] w-full">
            <InputField label="Contact Number" value={contactNumber} onChange={setContactNumber} />
            <InputField label="Email Address" value={email} onChange={setEmail} />
          </div>
        </FormCard>

        {/* Login & Security */}
        <FormCard title="Login & Security">
          <InputField label="Account Authenticator" value="Linked via Singpass" disabled />
          <div className="flex flex-col gap-[12px] w-full">
            <span className="text-[14px] text-[#212121] leading-[1.5]">Password</span>
            <button
              onClick={() => console.log('Update password')}
              className="self-start border border-[#005eb8] text-[#005eb8] bg-white px-[24px] py-[12px] rounded-[8px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] font-medium text-[16px] cursor-pointer hover:bg-[#f0f7ff] transition-colors"
            >
              Update Password
            </button>
          </div>
        </FormCard>

      </div>
    </div>
  )
}
