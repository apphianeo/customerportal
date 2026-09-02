# Test Accounts — UOI Customer Portal

Reference for the prototype's seeded demo accounts and the sign-up / Singpass
flows. All data is mock (in-memory) — nothing here is a real credential.

## How to sign in

1. On the login screen, enter the **Login ID (email)** and **Password** below.
2. Click **Login**, then enter the OTP.
3. **OTP:** `283016` (any 6-digit code works **except** `999999`, which always fails).

## Seeded accounts

All accounts below are already verified.

| Name | Login ID (email) | Password | Sign-up type | Gender | What it demonstrates |
|------|------------------|----------|--------------|--------|----------------------|
| Chris Wong Jun Jie | `chriswong@gmail.com` | `Chris2026` | Manual | Male | Policyholder with active policies; full password history (the "can't reuse last 5" rule fires when changing password) |
| Mei Ling Tan Hui Zhen | `meiling.tan@gmail.com` | `Portal2026` | Singpass | Female | Policyholder; personal details are **read-only** in Manage Account (Singpass-sourced); **mailing address differs** from residential, so the policy contact address shows the mailing one |
| Ravi Kumar | `ravi.kumar@gmail.com` | `Bedok2026` | Manual | Male | Policyholder; fully editable profile |
| Aisyah Rahman | `aisyah.rahman@gmail.com` | `Sentosa2026` | Manual | Female | Policyholder holding a **FIN** (G-series) rather than an NRIC |
| Grace Sim En Qi | `grace.sim@gmail.com` | `Bukit2026` | Singpass | Female | Policyholder; also the identity the mock Singpass returns |
| Nadia Lim Hui Ting | `nadia.lim@gmail.com` | `Marina2026` | Singpass | Female | Verified but **not a policyholder** → lands on the prospect (empty) dashboard |

## Flows for creating / verifying an account

- **Register Manually** — *Create Account → Register Manually*: fill in the form,
  verify the email with OTP `283016`, then complete the Singpass identity step.
  The dashboard and policy pages then reflect the name you entered. The account
  is only created once the Singpass identity step completes.
- **Register with Singpass (Retrieve MyInfo)** — *Create Account → Retrieve with
  Singpass*: pre-fills the profile from MyInfo (Grace's identity in this mock).
- **Log in with Singpass** — the QR scan on the login screen always signs in as
  **Grace Sim En Qi** (the mock Singpass identity).
- **Retrieve with Singpass** inside **Manage Account**: QR login → MyInfo consent
  → profile fields fill (read-only) with a "MyInfo successfully retrieved" toast.

## Notes

- Policyholder and contact details on a policy page follow the **signed-in
  account** (name, NRIC/FIN, DOB, gender, mobile, email, address).
- Policies only show once an account is **verified AND its NRIC/FIN matches a
  policyholder** — otherwise the prospect (empty) dashboard is shown (e.g. Nadia).
