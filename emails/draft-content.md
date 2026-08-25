# Draft content, for audit

Nothing here is in the HTML yet. Audit, mark up, hand back.

**Design change requested:** remove the 4px blue rule at the top of the card.
The card becomes a plain white rounded rectangle with a hairline border on the
light grey canvas. Logo above it, legal block below it, unchanged.

**Register change:** the supplied copy moves to a formal letter format, a
salutation and a sign-off around the body. Applied consistently to all six.

---

## Issues to resolve before this is buildable

These are in the copy as supplied. Numbers refer to the emails below.

| # | Where | Issue | Proposed |
|---|---|---|---|
| 1 | 3 and 4 | "Link is valid for the next 30 minutes" but both deliver an OTP, not a link, and OTPs elsewhere are 3 minutes | "Code is valid for the next 3 minutes, after which you will need to request a new OTP" |
| 2 | 1, 3, 4 | `946683` written literally | `{{otp}}` |
| 3 | 4 | `weiling.tan@gmail.com` and `wl.tan@outlook.sg` written literally, these are my sample values | `{{old_login_id}}` and `{{new_login_id}}` |
| 4 | all | `{{first name}}` with a space breaks Handlebars, Mustache and Liquid | `{{first_name}}` |
| 5 | 2 | `{{Reset Password}}` is the button, not a merge field | Button labelled "Reset password", href `{{reset_url}}` |
| 6 | all | `http://www.uoi.com.sg` is plain HTTP | `https://www.uoi.com.sg` |

**A seventh, which is a judgment call rather than an error.** The supplied copy
drops the "Didn't try to sign in?" and "Didn't request this?" blocks. Combined
with removing the anti-phishing line earlier, emails 1, 2 and 4 would carry no
guidance at all for the case where the recipient did not make the request. On a
password reset and a login-ID change that is the single most valuable line in
the message. Drafts below keep a one-line version of it. Strike it if you want
it gone.

---

## 1. Login OTP

- **Subject:** {{otp}} is your UOI Customer Portal OTP
- **Preheader:** Code is valid for the next 3 minutes.

> **Your login OTP**
>
> Dear {{first_name}},
>
> We received your request to login to UOI Customer Portal account. Please enter
> this One-Time Password (OTP) on the portal login page to proceed.
>
> ┌──────────────────────────────┐
> │  Your OTP                    │
> │  **{{otp}}**                 │
> │  Code is valid for the next  │
> │  3 minutes, after which you  │
> │  will need to request a new  │
> │  OTP                         │
> └──────────────────────────────┘
>
> **Didn't try to login?** Someone else may know your password. [Change it now].
>
> If you need any help, feel free to reach out to our support team [here].
>
> Regards,
> United Overseas Insurance Limited

**Note.** "Your OTP", the digits and the validity line sit together inside the
filled block, so the code and its expiry read as one object. Same three lines you
wrote, just grouped.

---

## 2. Reset your password

- **Subject:** Reset your UOI Customer Portal password
- **Preheader:** Link is valid for the next 30 minutes.

> **Reset your password**
>
> Dear {{first_name}},
>
> We received your request to reset your UOI Customer Portal account password.
> Click on the button below to choose a new password.
>
> [ **Reset password** ]   ← button, href `{{reset_url}}`
>
> Link is valid for the next 30 minutes, after which you will need to request again.
>
> **Didn't request this?** Ignore this email. Your password stays as it is, and
> no one can reset it without this link.
>
> If you need any help, feel free to reach out to our support team [here].
>
> Regards,
> United Overseas Insurance Limited
>
> Button not working? Paste this into your browser: {{reset_url}}

---

## 3. Verify account OTP

- **Subject:** {{otp}} is your UOI Customer Portal sign-up OTP
- **Preheader:** Code is valid for the next 3 minutes.

> **Verify your email address**
>
> Dear {{first_name}},
>
> Welcome to UOI Customer Portal. Please enter this One-Time Password (OTP) to
> verify and finish setting up your account.
>
> ┌──────────────────────────────┐
> │  Your OTP                    │
> │  **{{otp}}**                 │
> │  Code is valid for the next  │
> │  3 minutes, after which you  │
> │  will need to request a new  │
> │  OTP                         │
> └──────────────────────────────┘
>
> If you didn't sign up for UOI Customer Portal, ignore this email. No account
> will be created.
>
> If you need any help, feel free to reach out to our support team [here].
>
> Regards,
> United Overseas Insurance Limited

---

## 4. Verify new account login ID

- **Subject:** {{otp}} is your OTP to confirm your new UOI login ID
- **Preheader:** Code is valid for the next 3 minutes.

> **Confirm your new login ID**
>
> Dear {{first_name}},
>
> You asked to change your login ID (email address) from **{{old_login_id}}** to
> **{{new_login_id}}**. Please enter this One-Time Password (OTP) to verify.
>
> ┌──────────────────────────────┐
> │  Your OTP                    │
> │  **{{otp}}**                 │
> │  Code is valid for the next  │
> │  3 minutes, after which you  │
> │  will need to request a new  │
> │  OTP                         │
> └──────────────────────────────┘
>
> **Didn't request this change?** Your account may be at risk. Call us now at
> [(+65) 6222 7733] and don't enter the OTP above.
>
> If you need any help, feel free to reach out to our support team [here].
>
> Regards,
> United Overseas Insurance Limited

---

## 5. Welcome to UOI Customer Portal

**Drafted. You asked for something simple, so this is a short letter rather than
the benefits list that was there before.**

- **Subject:** Welcome to UOI Customer Portal
- **Preheader:** Your account is ready.

> **Welcome to UOI Customer Portal**
>
> Dear {{first_name}},
>
> Your UOI Customer Portal account is ready. Everything to do with your UOI
> policies now lives in one place.
>
> You can view your policies and coverage dates, download policy documents and
> receipts, update your contact details, and see the rewards available to UOI
> customers, at any time.
>
> [ **Go to my dashboard** ]   ← button
>
> If you need any help, feel free to reach out to our support team [here].
>
> Regards,
> United Overseas Insurance Limited

**Alternative, if you would rather keep it scannable:** replace the single
paragraph with four short lines.

> - View your policies, coverage dates and renewal status
> - Download policy documents, schedules and receipts
> - Update your contact details, password or login ID
> - See rewards available to UOI customers

---

## 6. Sign-in after six months of inactivity

**Drafted. One decision needed before this is right.** The trigger is a login,
so the email can be framed two ways:

- **A security notice**, telling the customer a sign-in happened on a long
  dormant account so they can act if it was not them. Dormant accounts are the
  usual target for credential stuffing, so this is the version that earns its
  place. **Recommended, and drafted below.**
- **A welcome back**, treating the sign-in as a return to re-engage. Warmer, but
  it tells the customer something they already know, since they are the one
  looking at the screen.

The draft leads warm and carries the security fact, so it works either way.

- **Subject:** You signed in to UOI Customer Portal
- **Preheader:** First sign-in in six months. Let us know if this was not you.

> **Welcome back**
>
> Dear {{first_name}},
>
> You signed in to your UOI Customer Portal account on {{login_datetime}}. It has
> been more than six months since your last visit, so we are letting you know.
>
> While you are here, it is worth checking that your contact details are current,
> so policy documents and renewal reminders reach you.
>
> [ **Review my details** ]   ← button
>
> **Wasn't you?** Your account may be at risk. [Change your password] now and
> call us at [(+65) 6222 7733].
>
> If you need any help, feel free to reach out to our support team [here].
>
> Regards,
> United Overseas Insurance Limited

**Needs from the backend:**

| Field | Notes |
|---|---|
| `{{login_datetime}}` | Date and time of the sign-in, with the timezone, e.g. "25 August 2026, 10:42 SGT". Without a timezone the customer cannot tell whether an unfamiliar time is suspicious. |

**Worth deciding:** whether to also show device or browser, and approximate
location. Both make an unauthorised sign-in far easier to spot, and both need the
backend to capture and store them. Say the word and I will add the slots.

**Also worth deciding:** whether six months of dormancy should trigger anything
beyond an email, such as forcing a password change on next sign-in. Out of scope
for the copy, but it is the question this email raises.

---

## Legal block, all six

Unchanged apart from the HTTPS fix.

> This is an automatically generated email, please do not reply.
>
> Visit [https://www.uoi.com.sg] to learn more about our privacy and security notice.
>
> Copyright © 2026 United Overseas Insurance Limited Co Reg. No. 197100152R. All Rights Reserved.
>
> **UOI EMAIL DISCLAIMER**
>
> Any person receiving this email and any attachment(s) contained, shall treat the
> information as confidential and not misuse, copy, disclose, distribute or retain
> the information in any way that amounts to a breach of confidentiality. If you are
> not the intended recipient, please delete all copies of this email from your
> computer system. As the integrity of this message cannot be guaranteed, neither
> UOI nor any entity in the UOB Group shall be responsible for the contents. Any
> opinion in this email may not necessarily represent the opinion of UOI or any
> entity in the UOB Group.

---

## Merge fields once this is applied

| Field | Used in |
|---|---|
| `{{first_name}}` | 1, 2, 3, 4, 5, 6 |
| `{{otp}}` | 1, 3, 4 (subject and body) |
| `{{old_login_id}}` / `{{new_login_id}}` | 4 |
| `{{reset_url}}` | 2 |
| `{{login_datetime}}` | 6, new |

Constants, not merge fields: `SUPPORT_URL` (WhatsApp), `PORTAL_URL`,
`CHANGE_PW_URL`.
