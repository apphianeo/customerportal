# Test accounts & validation cheat sheet

Mock data lives in [`src/data/accounts.ts`](../src/data/accounts.ts). It resets on every page
reload — nothing is persisted.

Whoever you sign in as drives the dashboard greeting, the avatar initials in the
header, and every field on Manage Account.

## Accounts on file

| | A — Chris Wong | B — Mei Ling Tan | C — Ravi Kumar | D — Aisyah Rahman |
|---|---|---|---|---|
| **NRIC/FIN** | `S1234567D` | `S8912345A` | `S7654321B` | `G4567890X` |
| **Password** | `Chris2026` | `Portal2026` | `Bedok2026` | `Sentosa2026` |
| Created via | Manual sign-up | **Singpass** | Manual sign-up | Manual sign-up |
| Email | chriswong@gmail.com | meiling.tan@gmail.com | ravi.kumar@gmail.com | aisyah.rahman@gmail.com |
| Phone | 9123 4567 | 9876 5432 | 8123 4567 | 7123 4567 |
| Mailing address | same as residential | **separate** | same as residential | same as residential |
| Passwords on file | 5 | 5 | 1 | 2 |

**OTP:** any 6 digits works except `999999`, which always fails.

### What each one is for

- **A — Chris Wong.** The default. Full password history, so the reuse rule fires.
- **B — Mei Ling Tan.** Singpass account. Personal details are read-only, that
  card has no Save Changes button, and Account authenticator reads "Linked via
  Singpass". Also the only one with a separate mailing address.
- **C — Ravi Kumar.** Only one password on file, so the reuse rule stays quiet —
  the contrast against A.
- **D — Aisyah Rahman.** FIN rather than NRIC (`G` prefix), for checking the
  NRIC/FIN validation accepts both.

Signing in through **Singpass** (the QR flow) always lands on account B, so the
locked-field behaviour is reachable without knowing a password.

---

## Login

| To see | Enter |
|---|---|
| Success | `S1234567D` + `Chris2026` → OTP `123456` |
| "Account does not exist" | `S5555555Z` + any password |
| "Password is incorrect, try again" | `S1234567D` + `wrongpass` |
| "Please enter a valid NRIC/FIN" | `S123`, then stop typing — appears after ~1s |
| "Incorrect OTP" | log in, then enter `999999` |

## Create account

Any NRIC **not** in the table above registers cleanly, and the name you enter is
what greets you on the dashboard.

| To see | Enter |
|---|---|
| Success | NRIC `S9876543Z`, email `chris@gmail.com`, phone `91234567` |
| "Account already exists, please login instead" | NRIC `S1234567D` |
| "Email address is invalid" | `notanemail`, then stop typing |
| "Please enter a valid phone number" | `123` with +65 selected, then stop typing |
| Same number, different country | type `91234567`, switch +65 → +1 |

## Password rules

Reached via Create Account → OTP → Set Password, or Singpass → I Agree, or
Manage Account → Update Password.

| To see | Enter |
|---|---|
| Checkmarks tick one by one | `abc` → `abcd1234` |
| "Passwords do not match" | `Bedok2027` / `Bedok2028` |
| `Cannot contain NRIC/FIN or words like "pass" or "pwd"` | `mypassword1` or `mypwd1234` |
| Cannot contain NRIC/FIN | `S1234567D` inside the password, e.g. `xS1234567Dx` |
| "Cannot reuse your last 5 passwords" | sign in as **A**, Manage Account → Update Password → `Orchard88` |
| Reuse rule staying quiet | same steps as **C**, whose only old password is `Bedok2026` |
| Accepted | `Bedok2027x` |

A's last five: `Chris2026`, `Summer2025`, `Winter2024`, `Orchard88`, `Marina2023`.
A brand-new registration has no history, so nothing is rejected there.

## Forgot password

Login → "Forgot password?" → any valid email → "Password reset link sent" toast →
Reset Password screen. An invalid email errors after a pause, or on the CTA.

## Singpass

Landing → "Log in with Singpass" → click the QR block → "I Agree" → Create Password
→ signed in as **B**, with locked personal details.

---

## When errors appear

- **On pause** — 800ms after the last keystroke, without leaving the field.
- **On blur** — leaving the field validates immediately.
- **On CTA** — forces every error into view, including empty required fields.

800ms rather than 500ms because a slow typist leaves ~700ms between keystrokes,
and at 500ms the error fired *between characters* instead of after they stopped.
Tune it via `INLINE_VALIDATION_DELAY` in
[`src/hooks/useInlineValidation.ts`](../src/hooks/useInlineValidation.ts).

Confirm-password is the one exception: it stays quiet while what you have typed
could still become the password, and flags the moment it diverges.
