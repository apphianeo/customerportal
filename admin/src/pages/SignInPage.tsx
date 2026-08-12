import { useState } from 'react'
import uoiLogo from '../../../src/assets/uoi-logo.svg'
import { DIRECTORY, ROLE_LABEL, type StaffUser } from '../auth/staff'
import { OutlineButton } from '../components/ui'

/**
 * Stands in for the OIDC hop to the corporate IdP. The console shows a button,
 * the IdP collects credentials and MFA, and we get an identity back — the real
 * version differs only in that the middle screen is Microsoft's, not ours.
 */
export default function SignInPage({ onSignIn }: { onSignIn: (user: StaffUser) => void }) {
  const [atIdp, setAtIdp] = useState(false)

  return (
    <div className="min-h-screen bg-bg-page flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-[420px] flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <img src={uoiLogo} alt="UOI" className="h-[50px] w-auto" />
          <h1 className="text-[32px] font-semibold leading-[1.2] text-[#212121] m-0">
            Internal Console
          </h1>
          <p className="text-[16px] leading-[1.5] text-[#6e6e6e] m-0">
            Customer and policy administration for UOI staff
          </p>
        </div>

        {!atIdp ? (
          <div className="w-full flex flex-col gap-4">
            <button
              onClick={() => setAtIdp(true)}
              className="w-full rounded-[8px] px-[24px] py-[12px] text-[16px] font-medium leading-[1.5] bg-[#005eb8] text-white border-0 cursor-pointer"
            >
              Sign in with UOI account
            </button>
            <p className="text-[12px] leading-[1.5] text-[#6e6e6e] text-center m-0">
              Access is managed by IT. Staff accounts and roles come from the corporate
              directory — this console never handles your password.
            </p>
          </div>
        ) : (
          /* The mock IdP: pick which staff identity to come back as. */
          <div className="w-full bg-white rounded-[12px] shadow-[0px_10px_35px_0px_rgba(0,94,184,0.12)] p-[24px] flex flex-col gap-[16px]">
            <div className="flex flex-col gap-[4px]">
              <span className="text-[12px] uppercase tracking-wide text-[#949494] leading-[1.4]">
                Identity provider
              </span>
              <h2 className="text-[20px] font-semibold text-[#212121] m-0">Choose an account</h2>
              <p className="text-[14px] text-[#6e6e6e] leading-[1.5] m-0">
                Stand-in for the corporate sign-in page. Roles here mirror directory groups.
              </p>
            </div>
            <div className="flex flex-col gap-[8px]">
              {DIRECTORY.map(user => (
                <button
                  key={user.id}
                  onClick={() => onSignIn(user)}
                  className="w-full text-left bg-white border border-[rgba(0,0,0,0.09)] rounded-[8px] px-[16px] py-[12px] cursor-pointer hover:bg-[#f6f6f6] flex flex-col gap-[2px]"
                >
                  <span className="text-[16px] text-[#212121] leading-[1.5]">{user.name}</span>
                  <span className="text-[14px] text-[#6e6e6e] leading-[1.5]">
                    {user.email} · {ROLE_LABEL[user.role]}
                  </span>
                </button>
              ))}
            </div>
            <OutlineButton onClick={() => setAtIdp(false)}>Cancel</OutlineButton>
          </div>
        )}
      </div>
    </div>
  )
}
