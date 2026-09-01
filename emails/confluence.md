# UOI Customer Portal, email templates

Eleven transactional emails. Copy below is extracted from the built HTML files,
so this page and the templates cannot drift apart.

**How to read this.** `{{fields}}` are merge fields, replaced at send time.
`[square brackets]` mark link text; destinations are listed under each email.
Every email carries the same footer, repeated under each one so a section can be
copied on its own.

**Files.** Attach the matching `.html` to each section. Rendered PNGs are in
`emails/previews/`.

---


## Login

### 1. Login OTP

| | |
|---|---|
| **File** | `01-login-otp.html` |
| **Subject** | {{otp}} is your UOI Customer Portal login code |
| **Preheader** | Code is valid for the next 3 minutes. |

Your login OTP

Dear {{first_name}},

We received your request to login to UOI Customer Portal account. Please enter this One-Time Password (OTP) on the portal login page to proceed.

Your OTP: {{otp}}

Code is valid for the next 3 minutes, after which you will need to request a new OTP.

If you need any help, feel free to reach out to our support team [here].

Regards,

United Overseas Insurance Limited

**Footer**

This is an automatically generated email, please do not reply.

Visit [www.uoi.com.sg] to learn more about our privacy and security notice.

Copyright © 2026 United Overseas Insurance Limited Co Reg. No. 197100152R. All Rights Reserved.

**UOI EMAIL DISCLAIMER**

Any person receiving this email and any attachment(s) contained, shall treat the information as confidential and not misuse, copy, disclose, distribute or retain the information in any way that amounts to a breach of confidentiality. If you are not the intended recipient, please delete all copies of this email from your computer system. As the integrity of this message cannot be guaranteed, neither UOI nor any entity in the UOB Group shall be responsible for the contents. Any opinion in this email may not necessarily represent the opinion of UOI or any entity in the UOB Group.

**Links**

| Text | Destination |
|---|---|
| here | `https://api.whatsapp.com/send/?phone=6580814843&text&type=phone_number&app_absent=0` |

---

### 2. Forget password, reset link

| | |
|---|---|
| **File** | `02-forgot-password-reset.html` |
| **Subject** | Reset your UOI Customer Portal password |
| **Preheader** | Link is valid for the next 30 minutes. |

Reset your password

Dear {{first_name}},

We received your request to reset your UOI Customer Portal account password. Click on the button below to choose a new password.

[Reset password]

Link is valid for the next 30 minutes, after which you will need to request again.

If you need any help, feel free to reach out to our support team [here].

Regards,

United Overseas Insurance Limited

**Footer**

This is an automatically generated email, please do not reply.

Visit [www.uoi.com.sg] to learn more about our privacy and security notice.

Copyright © 2026 United Overseas Insurance Limited Co Reg. No. 197100152R. All Rights Reserved.

**UOI EMAIL DISCLAIMER**

Any person receiving this email and any attachment(s) contained, shall treat the information as confidential and not misuse, copy, disclose, distribute or retain the information in any way that amounts to a breach of confidentiality. If you are not the intended recipient, please delete all copies of this email from your computer system. As the integrity of this message cannot be guaranteed, neither UOI nor any entity in the UOB Group shall be responsible for the contents. Any opinion in this email may not necessarily represent the opinion of UOI or any entity in the UOB Group.

**Button:** Reset password

**Links**

| Text | Destination |
|---|---|
| Reset password | `{{reset_url}}` |
| here | `https://api.whatsapp.com/send/?phone=6580814843&text&type=phone_number&app_absent=0` |

---

### 3. Account locked

| | |
|---|---|
| **File** | `03-account-locked.html` |
| **Subject** | Your UOI Customer Portal has been locked |
| **Preheader** | Reset your password to unlock it. |

Your account has been locked

Dear {{first_name}},

Your UOI Customer Portal account was locked on **{{lock_datetime}}** after several unsuccessful sign-in attempts. This is to protect your account.

Reset your password to unlock it.

[Reset password]

**Was this not you?** Someone may be trying to sign in to your account. Contact our support team [here].

Regards,

United Overseas Insurance Limited

**Footer**

This is an automatically generated email, please do not reply.

Visit [www.uoi.com.sg] to learn more about our privacy and security notice.

Copyright © 2026 United Overseas Insurance Limited Co Reg. No. 197100152R. All Rights Reserved.

**UOI EMAIL DISCLAIMER**

Any person receiving this email and any attachment(s) contained, shall treat the information as confidential and not misuse, copy, disclose, distribute or retain the information in any way that amounts to a breach of confidentiality. If you are not the intended recipient, please delete all copies of this email from your computer system. As the integrity of this message cannot be guaranteed, neither UOI nor any entity in the UOB Group shall be responsible for the contents. Any opinion in this email may not necessarily represent the opinion of UOI or any entity in the UOB Group.

**Button:** Reset password

**Links**

| Text | Destination |
|---|---|
| Reset password | `{{reset_url}}` |
| here | `https://api.whatsapp.com/send/?phone=6580814843&text&type=phone_number&app_absent=0` |

---


## Account Registration

### 4. Verify Account OTP

| | |
|---|---|
| **File** | `04-registration-otp.html` |
| **Subject** | {{otp}} is your UOI Customer Portal verification code |
| **Preheader** | Code is valid for the next 3 minutes. |

Verify your email address

Dear {{first_name}},

Welcome to UOI Customer Portal. Please enter this One-Time Password (OTP) to verify and finish setting up your account.

Your OTP: {{otp}}

Code is valid for the next 3 minutes, after which you will need to request a new OTP.

If you need any help, feel free to reach out to our support team [here].

Regards,

United Overseas Insurance Limited

**Footer**

This is an automatically generated email, please do not reply.

Visit [www.uoi.com.sg] to learn more about our privacy and security notice.

Copyright © 2026 United Overseas Insurance Limited Co Reg. No. 197100152R. All Rights Reserved.

**UOI EMAIL DISCLAIMER**

Any person receiving this email and any attachment(s) contained, shall treat the information as confidential and not misuse, copy, disclose, distribute or retain the information in any way that amounts to a breach of confidentiality. If you are not the intended recipient, please delete all copies of this email from your computer system. As the integrity of this message cannot be guaranteed, neither UOI nor any entity in the UOB Group shall be responsible for the contents. Any opinion in this email may not necessarily represent the opinion of UOI or any entity in the UOB Group.

**Links**

| Text | Destination |
|---|---|
| here | `https://api.whatsapp.com/send/?phone=6580814843&text&type=phone_number&app_absent=0` |

---


## 

### 5. You already have an account

| | |
|---|---|
| **File** | `05-existing-account.html` |
| **Subject** | You already have a UOI Customer Portal account |
| **Preheader** | No new account was created. |

You already have an account

Dear {{first_name}},

Someone tried to create a UOI Customer Portal account using **{{login_id}}** on **{{attempt_datetime}}**. An account with this email address already exists, so no new account was created.

If that was you, sign in with your existing details instead.

[Go to dashboard]

**Was this not you?** Nothing has changed and no one has gained access to your account. You can safely ignore this email.

If you need any help, feel free to reach out to our support team [here].

Regards,

United Overseas Insurance Limited

**Footer**

This is an automatically generated email, please do not reply.

Visit [www.uoi.com.sg] to learn more about our privacy and security notice.

Copyright © 2026 United Overseas Insurance Limited Co Reg. No. 197100152R. All Rights Reserved.

**UOI EMAIL DISCLAIMER**

Any person receiving this email and any attachment(s) contained, shall treat the information as confidential and not misuse, copy, disclose, distribute or retain the information in any way that amounts to a breach of confidentiality. If you are not the intended recipient, please delete all copies of this email from your computer system. As the integrity of this message cannot be guaranteed, neither UOI nor any entity in the UOB Group shall be responsible for the contents. Any opinion in this email may not necessarily represent the opinion of UOI or any entity in the UOB Group.

**Button:** Go to dashboard

**Links**

| Text | Destination |
|---|---|
| Go to dashboard | `https://portal.uoi.com.sg` |
| here | `https://api.whatsapp.com/send/?phone=6580814843&text&type=phone_number&app_absent=0` |

---


## Post Registration

### 6. Successful registration

| | |
|---|---|
| **File** | `06-welcome.html` |
| **Subject** | Welcome to UOI Customer Portal |
| **Preheader** | Your UOI Customer Portal account is ready. |

Successful registration

Dear {{first_name}},

Your UOI Customer Portal account is ready. Everything to do with your UOI policies now lives in one place.

You can view your policies and coverage dates, download policy documents and receipts, update your contact details, and see the rewards available to UOI customers, at any time.

[Go to dashboard]

If you need any help, feel free to reach out to our support team [here].

Regards,

United Overseas Insurance Limited

**Footer**

This is an automatically generated email, please do not reply.

Visit [www.uoi.com.sg] to learn more about our privacy and security notice.

Copyright © 2026 United Overseas Insurance Limited Co Reg. No. 197100152R. All Rights Reserved.

**UOI EMAIL DISCLAIMER**

Any person receiving this email and any attachment(s) contained, shall treat the information as confidential and not misuse, copy, disclose, distribute or retain the information in any way that amounts to a breach of confidentiality. If you are not the intended recipient, please delete all copies of this email from your computer system. As the integrity of this message cannot be guaranteed, neither UOI nor any entity in the UOB Group shall be responsible for the contents. Any opinion in this email may not necessarily represent the opinion of UOI or any entity in the UOB Group.

**Button:** Go to dashboard

**Links**

| Text | Destination |
|---|---|
| Go to dashboard | `https://portal.uoi.com.sg` |
| here | `https://api.whatsapp.com/send/?phone=6580814843&text&type=phone_number&app_absent=0` |

---

### 7. Change of new login ID OTP

| | |
|---|---|
| **File** | `07-change-login-id-otp.html` |
| **Subject** | Confirm your new login ID |
| **Preheader** | Code is valid for the next 3 minutes. |

Confirm your new login ID

Dear {{first_name}},

You asked to change your login ID (email address) from **{{old_login_id}}** to **{{new_login_id}}**. Please enter this One-Time Password (OTP) to verify.

Your OTP: {{otp}}

Code is valid for the next 3 minutes, after which you will need to request a new OTP.

If you need any help, feel free to reach out to our support team [here].

Regards,

United Overseas Insurance Limited

**Footer**

This is an automatically generated email, please do not reply.

Visit [www.uoi.com.sg] to learn more about our privacy and security notice.

Copyright © 2026 United Overseas Insurance Limited Co Reg. No. 197100152R. All Rights Reserved.

**UOI EMAIL DISCLAIMER**

Any person receiving this email and any attachment(s) contained, shall treat the information as confidential and not misuse, copy, disclose, distribute or retain the information in any way that amounts to a breach of confidentiality. If you are not the intended recipient, please delete all copies of this email from your computer system. As the integrity of this message cannot be guaranteed, neither UOI nor any entity in the UOB Group shall be responsible for the contents. Any opinion in this email may not necessarily represent the opinion of UOI or any entity in the UOB Group.

**Links**

| Text | Destination |
|---|---|
| here | `https://api.whatsapp.com/send/?phone=6580814843&text&type=phone_number&app_absent=0` |

---

### 8. Successful change of login ID

| | |
|---|---|
| **File** | `08-login-id-changed.html` |
| **Subject** | Login ID changed successfully |
| **Preheader** | Changed on {{change_datetime}}. Let us know if this was not you. |

Successful change of login ID

Dear {{first_name}},

Your login ID (email address) for UOI Customer Portal has been changed from **{{old_login_id}}** to **{{new_login_id}}** on **{{change_datetime}}**.

Use your new login ID the next time you sign in.

**Was this not you?** Your account may be at risk. Contact our support team [here].

Regards,

United Overseas Insurance Limited

**Footer**

This is an automatically generated email, please do not reply.

Visit [www.uoi.com.sg] to learn more about our privacy and security notice.

Copyright © 2026 United Overseas Insurance Limited Co Reg. No. 197100152R. All Rights Reserved.

**UOI EMAIL DISCLAIMER**

Any person receiving this email and any attachment(s) contained, shall treat the information as confidential and not misuse, copy, disclose, distribute or retain the information in any way that amounts to a breach of confidentiality. If you are not the intended recipient, please delete all copies of this email from your computer system. As the integrity of this message cannot be guaranteed, neither UOI nor any entity in the UOB Group shall be responsible for the contents. Any opinion in this email may not necessarily represent the opinion of UOI or any entity in the UOB Group.

**Links**

| Text | Destination |
|---|---|
| here | `https://api.whatsapp.com/send/?phone=6580814843&text&type=phone_number&app_absent=0` |

---

### 9. Successful change of password

| | |
|---|---|
| **File** | `09-password-changed.html` |
| **Subject** | Password changed successfully |
| **Preheader** | Changed on {{change_datetime}}. Let us know if this was not you. |

Successful change of password

Dear {{first_name}},

The password for your UOI Customer Portal account was changed on **{{change_datetime}}**.

Use your new password the next time you sign in.

**Was this not you?** Your account may be at risk. [Reset your password] now and contact our support team [here].

Regards,

United Overseas Insurance Limited

**Footer**

This is an automatically generated email, please do not reply.

Visit [www.uoi.com.sg] to learn more about our privacy and security notice.

Copyright © 2026 United Overseas Insurance Limited Co Reg. No. 197100152R. All Rights Reserved.

**UOI EMAIL DISCLAIMER**

Any person receiving this email and any attachment(s) contained, shall treat the information as confidential and not misuse, copy, disclose, distribute or retain the information in any way that amounts to a breach of confidentiality. If you are not the intended recipient, please delete all copies of this email from your computer system. As the integrity of this message cannot be guaranteed, neither UOI nor any entity in the UOB Group shall be responsible for the contents. Any opinion in this email may not necessarily represent the opinion of UOI or any entity in the UOB Group.

**Links**

| Text | Destination |
|---|---|
| Reset your password | `{{reset_url}}` |
| here | `https://api.whatsapp.com/send/?phone=6580814843&text&type=phone_number&app_absent=0` |

---

### 10. Successful change of contact details

| | |
|---|---|
| **File** | `10-contact-details-changed.html` |
| **Subject** | Contact number changed successfully |
| **Preheader** | Changed on {{change_datetime}}. Let us know if this was not you. |

Successful change of contact details

Dear {{first_name}},

The following details on your UOI Customer Portal account were changed on **{{change_datetime}}**: **{{change_fields}}**.

Policy documents and renewal reminders will go to your updated details from now on.

**Was this not you?** Your account may be at risk. [Reset your password] now and contact our support team [here].

Regards,

United Overseas Insurance Limited

**Footer**

This is an automatically generated email, please do not reply.

Visit [www.uoi.com.sg] to learn more about our privacy and security notice.

Copyright © 2026 United Overseas Insurance Limited Co Reg. No. 197100152R. All Rights Reserved.

**UOI EMAIL DISCLAIMER**

Any person receiving this email and any attachment(s) contained, shall treat the information as confidential and not misuse, copy, disclose, distribute or retain the information in any way that amounts to a breach of confidentiality. If you are not the intended recipient, please delete all copies of this email from your computer system. As the integrity of this message cannot be guaranteed, neither UOI nor any entity in the UOB Group shall be responsible for the contents. Any opinion in this email may not necessarily represent the opinion of UOI or any entity in the UOB Group.

**Links**

| Text | Destination |
|---|---|
| Reset your password | `{{reset_url}}` |
| here | `https://api.whatsapp.com/send/?phone=6580814843&text&type=phone_number&app_absent=0` |

---

### 11. Email notification upon login after six months of inactivity

| | |
|---|---|
| **File** | `11-inactivity-signin.html` |
| **Subject** | You signed in to UOI Customer Portal |
| **Preheader** | First sign-in in six months. Let us know if this was not you. |

Welcome back

Dear {{first_name}},

You signed in to your UOI Customer Portal account on **{{login_datetime}}**. It has been more than six months since your last visit, so we are letting you know.

While you are here, it is worth checking that your contact details are current, so policy documents and renewal reminders reach you.

**Was this not you?** Your account may be at risk. [Reset your password] now and contact our support team [here].

Regards,

United Overseas Insurance Limited

**Footer**

This is an automatically generated email, please do not reply.

Visit [www.uoi.com.sg] to learn more about our privacy and security notice.

Copyright © 2026 United Overseas Insurance Limited Co Reg. No. 197100152R. All Rights Reserved.

**UOI EMAIL DISCLAIMER**

Any person receiving this email and any attachment(s) contained, shall treat the information as confidential and not misuse, copy, disclose, distribute or retain the information in any way that amounts to a breach of confidentiality. If you are not the intended recipient, please delete all copies of this email from your computer system. As the integrity of this message cannot be guaranteed, neither UOI nor any entity in the UOB Group shall be responsible for the contents. Any opinion in this email may not necessarily represent the opinion of UOI or any entity in the UOB Group.

**Links**

| Text | Destination |
|---|---|
| Reset your password | `{{reset_url}}` |
| here | `https://api.whatsapp.com/send/?phone=6580814843&text&type=phone_number&app_absent=0` |

---


## Merge fields

| Field | Used in |
|---|---|
| `{{attempt_datetime}}` | 5 |
| `{{change_datetime}}` | 8, 9, 10 |
| `{{change_fields}}` | 10 |
| `{{first_name}}` | 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 |
| `{{lock_datetime}}` | 3 |
| `{{login_datetime}}` | 11 |
| `{{login_id}}` | 5 |
| `{{new_login_id}}` | 7, 8 |
| `{{old_login_id}}` | 7, 8 |
| `{{otp}}` | 1, 4, 7 |
| `{{reset_url}}` | 2, 3, 9, 10, 11 |

Not merge fields, but constants set once in the template build:

| Constant | Value |
|---|---|
| Support link (`here`) | `https://api.whatsapp.com/send/?phone=6580814843&amp;text&amp;type=phone_number&amp;app_absent=0` |
| Portal link (button) | `https://portal.uoi.com.sg` |
| Privacy link | `https://www.uoi.com.sg` |
