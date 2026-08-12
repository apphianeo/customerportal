# Test accounts & validation cheat sheet

Mock data lives in [`src/data/accounts.ts`](../src/data/accounts.ts). It resets on every page
reload — nothing is persisted.

**Email address is the login credential.** NRIC/FIN is still collected, at the
profile step, and is only used to match someone to their policies.

## Accounts on file

| | A — Chris Wong | B — Mei Ling Tan | C — Ravi Kumar | D — Aisyah Rahman | E — Nadia Lim |
|---|---|---|---|---|---|
| **Email** | chriswong@gmail.com | meiling.tan@gmail.com | ravi.kumar@gmail.com | aisyah.rahman@gmail.com | nadia.lim@gmail.com |
| **Password** | `Chris2026` | `Portal2026` | `Bedok2026` | `Sentosa2026` | `Marina2026` |
| NRIC/FIN | S1234567D | S8912345A | S7654321B | G4567890X | T0011223J |
| Created via | Manual | **Singpass** | Manual | Manual | Singpass |
| Holds policies | Yes | Yes | Yes | Yes | **No** |
| Dashboard | A | A | A | A | **B — prospect** |
| Passwords on file | 5 | 5 | 1 | 2 | 1 |

**OTP:** any 6 digits works except `999999`, which always fails.

### What each one is for

- **A — Chris Wong.** The default. Full password history, so the reuse rule fires.
- **B — Mei Ling Tan.** Singpass account. Personal details are read-only on
  Manage Account and that card has no Save Changes button.
- **C — Ravi Kumar.** One password on file, so the reuse rule stays quiet.
- **D — Aisyah Rahman.** FIN rather than NRIC (`G` prefix).
- **E — Nadia Lim.** Registered but holds no UOI product — the only way to see
  **Dashboard B**, the prospect view.

---

## The three entry paths

### 1. Log in with email

| To see | Enter |
|---|---|
| Success | chriswong@gmail.com + `Chris2026` → OTP `123456` |
| "Account does not exist" | nobody@gmail.com + any password |
| "Password is incorrect, try again" | chriswong@gmail.com + `wrongpass` |
| "Email address is invalid" | `notanemail`, then stop typing |
| "Incorrect OTP" | log in, then enter `999999` |

### 2. Create an account — two steps

**Step 1** collects email + password. **Step 2** collects name, DOB, NRIC/FIN and
phone, then the account is created.

| To see | Enter |
|---|---|
| Success | any unused email, e.g. newuser@gmail.com |
| "Account already exists, please login instead" | chriswong@gmail.com at step 1 |
| Dashboard A after signing up | NRIC `S1234567D` at step 2 (a known policyholder) |
| Dashboard B after signing up | NRIC `S9999999Z` at step 2 (no policies) |

The account persists for the rest of the session, so you can sign out and log
back in with it. A page reload clears it.

### 3. Singpass

Landing → "Log in with Singpass" → click the QR block → "I Agree".

Singpass returns **Grace Sim** (`S2244668E`), a policyholder who has never
registered, so:

- **First time** → Create Password, with her Singpass email shown read-only and
  the note that it will be her login. Then Dashboard A.
- **Returning** → sign out (do not reload) and repeat: it skips the password
  screen and goes straight to the dashboard.

## Password rules

| To see | Enter |
|---|---|
| Checkmarks tick one by one | `abc` → `abcd1234` |
| "Passwords do not match" | `Bedok2027` / `Bedok2028` |
| `Cannot contain NRIC/FIN or words like "pass" or "pwd"` | `mypassword1` or `mypwd1234` |
| "Cannot reuse your last 5 passwords" | sign in as **A**, Manage Account → Update Password → `Orchard88` |
| Accepted | `Bedok2027x` |

A's last five: `Chris2026`, `Summer2025`, `Winter2024`, `Orchard88`, `Marina2023`.

## Forgot password

Login → "Forgot password?" → any valid email → "Password reset link sent" toast →
Reset Password screen.

---

## When errors appear

- **On pause** — 800ms after the last keystroke, without leaving the field.
- **On blur** — leaving the field validates immediately.
- **On CTA** — forces every error into view, including empty required fields.

Confirm-password is the exception: it stays quiet while what you have typed could
still become the password, and flags the moment it diverges.
