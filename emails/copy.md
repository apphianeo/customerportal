# Email copy

Every word in the five templates, in the order it appears. Edit here, hand it
back, and it gets applied to `build.py`.

`{{fields}}` are merge fields, replaced at send time. Leave the braces alone
unless you want the field itself changed.

**One line is shared across all five emails** (marked SHARED below). Editing it
changes all five.

---

## 1. Login OTP · `01-login-otp.html`

- **Subject:** {{otp}} is your UOI Customer Portal OTP
- **Preheader:** Expires in 3 minutes. UOI will never ask you for this OTP.

| Slot | Copy |
|---|---|
| Heading | Your login OTP |
| Intro | Hi {{first_name}}, enter this OTP in the window where you started signing in to UOI Customer Portal. |
| Code | {{otp}} |
| Code caption | Expires in 3 minutes |
| Tier 1, bold | Didn't try to sign in? |
| Tier 1, body | Someone else may know your password. [Change it now]. |
| Tier 3, SHARED | Need help? Reach out to our support team [here] or email [contactus@uoi.com.sg]. |

---

## 2. Forgot password, reset link · `02-forgot-password-reset.html`

- **Subject:** Reset your UOI Customer Portal password
- **Preheader:** Your reset link expires in 30 minutes.

| Slot | Copy |
|---|---|
| Heading | Reset your password |
| Intro | Hi {{first_name}}, we received a request to reset the password for **{{login_id}}**. |
| Tier 1, bold | Choose a new password: |
| Button | Reset password |
| Under button | This link expires in 30 minutes and works once. |
| Tier 2, box | **Didn't request this?** Ignore this email. Your password stays as it is, and no one can reset it without this link. |
| Tier 3 | Button not working? Paste this into your browser: {{reset_url}} |
| Tier 3, SHARED | Need help? Reach out to our support team [here] or email [contactus@uoi.com.sg]. |

---

## 3. Registration OTP · `03-registration-otp.html`

- **Subject:** {{otp}} is your UOI Customer Portal sign-up OTP
- **Preheader:** Verify your email to finish creating your account.

| Slot | Copy |
|---|---|
| Heading | Verify your email address |
| Intro | Welcome to UOI Customer Portal. Enter this OTP to verify **{{login_id}}** and finish setting up your account. |
| Code | {{otp}} |
| Code caption | Expires in 3 minutes |
| Tier 3 | If you didn't sign up for UOI Customer Portal, ignore this email. No account will be created. |
| Tier 3, SHARED | Need help? Reach out to our support team [here] or email [contactus@uoi.com.sg]. |

---

## 4. Change Login ID OTP · `04-change-login-id-otp.html`

- **Subject:** {{otp}} is your OTP to confirm your new UOI login ID
- **Preheader:** Confirm your new UOI Customer Portal login ID. Expires in 3 minutes.

| Slot | Copy |
|---|---|
| Heading | Confirm your new login ID |
| Intro | Hi {{first_name}}, you asked to change your login ID from **{{old_login_id}}** to **{{new_login_id}}**. Enter this OTP to confirm. |
| Code | {{otp}} |
| Code caption | Expires in 3 minutes |
| Tier 2, box | **Didn't request this change?** Your account may be at risk. Call us now at [(+65) 6222 7733] and don't enter the OTP above. |
| Tier 3 | Until you confirm, keep signing in with your current login ID. |
| Tier 3, SHARED | Need help? Reach out to our support team [here] or email [contactus@uoi.com.sg]. |

---

## 5. Welcome · `05-welcome.html`

- **Subject:** Welcome to UOI Customer Portal
- **Preheader:** Your account is ready. Here is what you can do with it.

| Slot | Copy |
|---|---|
| Heading | Welcome to UOI Customer Portal |
| Intro | Hi {{first_name}}, your account is ready. Everything to do with your UOI policies now lives in one place. |
| Tier 1, bold | Sign in to get started: |
| Button | Go to my dashboard |

Benefit rows, each a bold title and a body line:

| # | Title | Body |
|---|---|---|
| 1 | All your policies in one place | Motor, travel, home, helper and personal accident, each with its policy number, coverage dates and renewal status. |
| 2 | Documents on demand | Download policy documents, schedules and receipts yourself, at any hour. |
| 3 | Claims start from the policy | Open the policy, submit the claim. The details we hold are already attached. |
| 4 | Update your own details | Change your contact details, your password or your login ID, without paperwork. |
| 5 | Rewards for UOI customers | Member offers and perks, refreshed regularly. |

Closing:

| Slot | Copy |
|---|---|
| Tier 3 | You are receiving this because an account was created for **{{login_id}}** on UOI Customer Portal. |
| Tier 3, SHARED | Need help? Reach out to our support team [here] or email [contactus@uoi.com.sg]. |

---

## Notes on editing

- `[square brackets]` mark link text. The destination is set in `build.py`, not here.
- **Bold** in the tables is bold in the email.
- Tier 1 is the bold line introducing the next action. Tier 2 is the tinted box.
  Tier 3 is the muted fine print behind a hairline rule. Moving a line between
  tiers changes its weight and colour, so say so if you want that rather than
  just a wording change.
- Keep the code caption short. It sits directly under the code inside the same
  block, and a long caption competes with the digits.
