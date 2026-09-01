# Email copy

Every word in the eleven templates, in the order it appears. Taken from
*Customer Portal Figma & Templates*, the uploaded PDF, which is the source of
truth for wording.

`{{fields}}` are merge fields, replaced at send time.

Every email shares the same shape: heading, salutation, body, an OTP block,
button or caution box, the sign-off, then the legal block below the card.
Templates 1 to 5 and 11 carry the help line. Templates 6 to 10 close on their
caution box, which already routes to support; template 11's notice does not, so
it keeps the help line.

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
| Caution box | **Wasn't you?** Your account may be at risk. [Reset your password] now and contact our support team [here]. |
| Sign-off | Regards,<br>United Overseas Insurance Limited |

---

## 7. Successful change of login ID · `07-login-id-changed.html`

- **Subject:** Login ID changed successfully
- **Preheader:** Changed on {{change_datetime}}. Let us know if this was not you.

| Slot | Copy |
|---|---|
| Heading | Successful change of login ID |
| Salutation | Dear {{first_name}}, |
| Body 1 | Your login ID (email address) for UOI Customer Portal has been changed from **{{old_login_id}}** to **{{new_login_id}}** on **{{change_datetime}}**. |
| Body 2 | Use your new login ID the next time you sign in. |
| Caution box | **Wasn't you?** Your account may be at risk. Contact our support team [here]. |
| Sign-off | Regards,<br>United Overseas Insurance Limited |

**Send this to the old address as well as the new one.** If someone else changed
the login ID, the old address is the only one the customer still reaches.

---

## 8. Successful change of password · `08-password-changed.html`

- **Subject:** Password changed successfully
- **Preheader:** Changed on {{change_datetime}}. Let us know if this was not you.

| Slot | Copy |
|---|---|
| Heading | Successful change of password |
| Salutation | Dear {{first_name}}, |
| Body 1 | The password for your UOI Customer Portal account was changed on **{{change_datetime}}**. |
| Body 2 | Use your new password the next time you sign in. |
| Caution box | **Wasn't you?** Your account may be at risk. [Reset your password] now and contact our support team [here]. |
| Sign-off | Regards,<br>United Overseas Insurance Limited |

---

## 9. Successful change of contact details · `09-contact-details-changed.html`

- **Subject:** Contact details changed successfully
- **Preheader:** Changed on {{change_datetime}}. Let us know if this was not you.

| Slot | Copy |
|---|---|
| Heading | Successful change of contact details |
| Salutation | Dear {{first_name}}, |
| Body 1 | The following details on your UOI Customer Portal account were changed on **{{change_datetime}}**: **{{changed_fields}}**. |
| Body 2 | Policy documents and renewal reminders will go to your updated details from now on. |
| Caution box | **Wasn't you?** Your account may be at risk. [Reset your password] now and contact our support team [here]. |
| Sign-off | Regards,<br>United Overseas Insurance Limited |

`{{changed_fields}}` is a plain phrase from the backend, e.g. "mobile number and
mailing address". **If the mobile number changed, send an SMS to the old number
too**, on the same principle as template 7 and the old email address.

---

## 10. Account locked after failed sign-in attempts · `10-account-locked.html`

- **Subject:** Your UOI Customer Portal account has been locked
- **Preheader:** Reset your password to unlock it.

| Slot | Copy |
|---|---|
| Heading | Your account has been locked |
| Salutation | Dear {{first_name}}, |
| Body 1 | Your UOI Customer Portal account was locked on **{{lock_datetime}}** after several unsuccessful sign-in attempts. This is to protect your account. |
| Body 2 | Reset your password to unlock it. |
| Button | Reset password, href `{{reset_url}}` |
| Caution box | **Wasn't you?** Someone may be trying to sign in to your account. Contact our support team [here]. |
| Sign-off | Regards,<br>United Overseas Insurance Limited |

The copy says nothing about how many attempts triggered the lock, or whether it
lifts on its own. **If the lock expires automatically, add that as a third line**
so people who would rather wait than reset know they can.

---

## 11. Registration attempted on an existing address · `11-existing-account.html`

- **Subject:** You already have a UOI Customer Portal account
- **Preheader:** No new account was created.

| Slot | Copy |
|---|---|
| Heading | You already have an account |
| Salutation | Dear {{first_name}}, |
| Body 1 | Someone tried to create a UOI Customer Portal account using **{{login_id}}** on **{{attempt_datetime}}**. An account with this email address already exists, so no new account was created. |
| Body 2 | If that was you, sign in with your existing details instead. |
| Button | Sign in, href `PORTAL_URL` |
| Info box | **Wasn't you?** Nothing has changed and no one has gained access to your account. You can safely ignore this email. |
| Help | If you need any help, feel free to reach out to our support team [here]. |
| Sign-off | Regards,<br>United Overseas Insurance Limited |

The notice is **info blue, not caution amber**: a failed sign-up compromises
nothing, so this email reassures rather than alarms. It is also what lets the
sign-up screen stay silent about whether an address is registered.

---

## Legal block, all eleven

Below the card on the page canvas, at 11px, the smallest type in the email.

| Slot | Copy |
|---|---|
| Line 1 | This is an automatically generated email, please do not reply. |
| Line 2 | Visit [United Overseas Insurance Limited (UOI)] to learn more about our privacy and security notice. |
| Line 3 | Copyright © 2026 United Overseas Insurance Limited Co Reg. No. 197100152R. All Rights Reserved. |
| Label | UOI EMAIL DISCLAIMER |
| Disclaimer | Any person receiving this email and any attachment(s) contained, shall treat the information as confidential and not misuse, copy, disclose, distribute or retain the information in any way that amounts to a breach of confidentiality. If you are not the intended recipient, please delete all copies of this email from your computer system. As the integrity of this message cannot be guaranteed, neither UOI nor any entity in the UOB Group shall be responsible for the contents. Any opinion in this email may not necessarily represent the opinion of UOI or any entity in the UOB Group. |

Edited once in `shell()` in `build.py`, so a change lands on all eleven at once.

---

## Merge fields

| Field | Used in |
|---|---|
| `{{first_name}}` | all eleven |
| `{{otp}}` | 1, 3, 4 (subject and body) |
| `{{old_login_id}}` / `{{new_login_id}}` | 4, 7 |
| `{{reset_url}}` | 2, 8, 9, 10 |
| `{{login_datetime}}` | 6 |
| `{{change_datetime}}` | 7, 8, 9 |
| `{{changed_fields}}` | 9 |
| `{{lock_datetime}}` | 10 |
| `{{attempt_datetime}}` | 11 |
| `{{login_id}}` | 11 |

Constants, not merge fields: `SUPPORT_URL` (WhatsApp), `PORTAL_URL`, `CHANGE_PW_URL`.

---

## Notes on editing

- `[square brackets]` mark link text. Destinations live in `build.py`.
- Edit `build.py`, not the HTML files. They are overwritten on every build.
