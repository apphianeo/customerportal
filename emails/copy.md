# Email copy

Every word in the eight templates, in the order it appears. Taken from
*Customer Portal Figma & Templates*, the uploaded PDF, which is the source of
truth for wording.

`{{fields}}` are merge fields, replaced at send time.

Every email shares the same shape: heading, salutation, body, an OTP block or
button, the help line, the sign-off, then the legal block below the card.

---

## 1. Login OTP · `01-login-otp.html`

- **Subject:** {{otp}} is your UOI Customer Portal login code
- **Preheader:** Code is valid for the next 3 minutes.

| Slot | Copy |
|---|---|
| Heading | Your login OTP |
| Salutation | Dear {{first_name}}, |
| Body | We received your request to login to UOI Customer Portal account. Please enter this One-Time Password (OTP) on the portal login page to proceed. |
| OTP block | Your OTP<br>**{{otp}}** |
| Validity | Code is valid for the next 3 minutes, after which you will need to request a new OTP. |
| Help | If you need any help, feel free to reach out to our support team [here]. |
| Sign-off | Regards,<br>United Overseas Insurance Limited |

---

## 2. Forget password, reset link · `02-forgot-password-reset.html`

- **Subject:** Reset your UOI Customer Portal password
- **Preheader:** Link is valid for the next 30 minutes.

| Slot | Copy |
|---|---|
| Heading | Reset your password |
| Salutation | Dear {{first_name}}, |
| Body | We received your request to reset your UOI Customer Portal account password. Click on the button below to choose a new password. |
| Button | Reset password, href `{{reset_url}}` |
| Validity | Link is valid for the next 30 minutes, after which you will need to request again. |
| Help | If you need any help, feel free to reach out to our support team [here]. |
| Sign-off | Regards,<br>United Overseas Insurance Limited |

---

## 3. Verify account OTP · `03-registration-otp.html`

- **Subject:** {{otp}} is your UOI Customer Portal verification code
- **Preheader:** Code is valid for the next 3 minutes.

| Slot | Copy |
|---|---|
| Heading | Verify your email address |
| Salutation | Dear {{first_name}}, |
| Body | Welcome to UOI Customer Portal. Please enter this One-Time Password (OTP) to verify and finish setting up your account. |
| OTP block | Your OTP<br>**{{otp}}** |
| Validity | Code is valid for the next 3 minutes, after which you will need to request a new OTP. |
| Help | If you need any help, feel free to reach out to our support team [here]. |
| Sign-off | Regards,<br>United Overseas Insurance Limited |

---

## 4. Verify new login ID OTP · `04-change-login-id-otp.html`

- **Subject:** Confirm your new login ID
- **Preheader:** Code is valid for the next 3 minutes.

| Slot | Copy |
|---|---|
| Heading | Confirm your new login ID |
| Salutation | Dear {{first_name}}, |
| Body | You asked to change your login ID (email address) from **{{old_login_id}}** to **{{new_login_id}}**. Please enter this One-Time Password (OTP) to verify. |
| OTP block | Your OTP<br>**{{otp}}** |
| Validity | Code is valid for the next 3 minutes, after which you will need to request a new OTP. |
| Help | If you need any help, feel free to reach out to our support team [here]. |
| Sign-off | Regards,<br>United Overseas Insurance Limited |

---

## 5. Welcome, successful sign up · `05-welcome.html`

- **Subject:** Welcome to UOI Customer Portal
- **Preheader:** Your UOI Customer Portal account is ready.

| Slot | Copy |
|---|---|
| Heading | Successful registration |
| Salutation | Dear {{first_name}}, |
| Body 1 | Your UOI Customer Portal account is ready. Everything to do with your UOI policies now lives in one place. |
| Body 2 | You can view your policies and coverage dates, download policy documents and receipts, update your contact details, and see the rewards available to UOI customers, at any time. |
| Button | Go to dashboard, href `PORTAL_URL` |
| Help | If you need any help, feel free to reach out to our support team [here]. |
| Sign-off | Regards,<br>United Overseas Insurance Limited |

---

## 6. Sign-in after six months of inactivity · `06-inactivity-signin.html`

- **Subject:** You signed in to UOI Customer Portal
- **Preheader:** First sign-in in six months. Let us know if this was not you.

| Slot | Copy |
|---|---|
| Heading | Welcome back |
| Salutation | Dear {{first_name}}, |
| Body 1 | You signed in to your UOI Customer Portal account on **{{login_datetime}}**. It has been more than six months since your last visit, so we are letting you know. |
| Body 2 | While you are here, it is worth checking that your contact details are current, so policy documents and renewal reminders reach you. |
| Caution box | **Wasn't you?** Your account may be at risk. [Change your password] now. |
| Help | If you need any help, feel free to reach out to our support team [here]. |
| Sign-off | Regards,<br>United Overseas Insurance Limited |

---

## 7. Successful change of login ID · `07-login-id-changed.html`

- **Subject:** Your UOI Customer Portal login ID has been changed
- **Preheader:** Changed on {{change_datetime}}. Let us know if this was not you.

| Slot | Copy |
|---|---|
| Heading | Successful change of login ID |
| Salutation | Dear {{first_name}}, |
| Body 1 | Your login ID (email address) for UOI Customer Portal has been changed from **{{old_login_id}}** to **{{new_login_id}}** on **{{change_datetime}}**. |
| Body 2 | Use your new login ID the next time you sign in. |
| Caution box | **Wasn't you?** Your account may be at risk. Call us now at [(+65) 6222 7733]. |
| Help | If you need any help, feel free to reach out to our support team [here]. |
| Sign-off | Regards,<br>United Overseas Insurance Limited |

**Send this to the old address as well as the new one.** If someone else changed
the login ID, the old address is the only one the customer still reaches.

---

## 8. Successful change of password · `08-password-changed.html`

- **Subject:** Your UOI Customer Portal password has been changed
- **Preheader:** Changed on {{change_datetime}}. Let us know if this was not you.

| Slot | Copy |
|---|---|
| Heading | Successful change of password |
| Salutation | Dear {{first_name}}, |
| Body 1 | The password for your UOI Customer Portal account was changed on **{{change_datetime}}**. |
| Body 2 | Use your new password the next time you sign in. |
| Caution box | **Wasn't you?** Your account may be at risk. [Reset your password] now and call us at [(+65) 6222 7733]. |
| Help | If you need any help, feel free to reach out to our support team [here]. |
| Sign-off | Regards,<br>United Overseas Insurance Limited |

---

## Legal block, all eight

Below the card on the page canvas, at 11px, the smallest type in the email.

| Slot | Copy |
|---|---|
| Line 1 | This is an automatically generated email, please do not reply. |
| Line 2 | Visit [United Overseas Insurance Limited (UOI)] to learn more about our privacy and security notice. |
| Line 3 | Copyright © 2026 United Overseas Insurance Limited Co Reg. No. 197100152R. All Rights Reserved. |
| Label | UOI EMAIL DISCLAIMER |
| Disclaimer | Any person receiving this email and any attachment(s) contained, shall treat the information as confidential and not misuse, copy, disclose, distribute or retain the information in any way that amounts to a breach of confidentiality. If you are not the intended recipient, please delete all copies of this email from your computer system. As the integrity of this message cannot be guaranteed, neither UOI nor any entity in the UOB Group shall be responsible for the contents. Any opinion in this email may not necessarily represent the opinion of UOI or any entity in the UOB Group. |

Edited once in `shell()` in `build.py`, so a change lands on all eight at once.

---

## Merge fields

| Field | Used in |
|---|---|
| `{{first_name}}` | all eight |
| `{{otp}}` | 1, 3, 4 (subject and body) |
| `{{old_login_id}}` / `{{new_login_id}}` | 4, 7 |
| `{{reset_url}}` | 2, 8 |
| `{{login_datetime}}` | 6 |
| `{{change_datetime}}` | 7, 8 |

Constants, not merge fields: `SUPPORT_URL` (WhatsApp), `PORTAL_URL`, `CHANGE_PW_URL`.

---

## Notes on editing

- `[square brackets]` mark link text. Destinations live in `build.py`.
- Edit `build.py`, not the HTML files. They are overwritten on every build.
