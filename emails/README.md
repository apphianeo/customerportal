# UOI Customer Portal — transactional email templates

Four HTML email templates for the customer portal's authentication flows, built
from the portal's own design system so the email and the screen it leads to look
like the same product.

| # | Scenario | File |
|---|----------|------|
| 1 | Login — OTP | `01-login-otp.html` |
| 2 | Login — forgot password, reset link | `02-forgot-password-reset.html` |
| 3 | Manual account registration — OTP | `03-registration-otp.html` |
| 4 | Change Login ID (email address) — OTP | `04-change-login-id-otp.html` |

Open `preview.html` in a browser to see all four rendered at 600px with sample data.

---

## What changed from the current design, and why

**1. The hero photo is gone.**
In the current email the stock photo of a woman at a laptop is the single largest
element and carries no information. On a phone it pushes the OTP — the only thing
the reader actually wants — below the fold. It has been replaced by a 4px bar in
the portal's primary blue: brand presence is instant, and the code sits in the
first screenful. As a bonus, most corporate mail clients block images by default,
so a photo-led email currently arrives as a grey box; this one doesn't depend on
images at all.

**2. The code is an object, not a sentence.**
`Your OTP: 946683` inside a paragraph is not scannable. The code now sits in a
bordered plate reusing the portal's OTP input treatment (white, 1px hairline,
8px radius), at 34px with wide tracking, with the expiry directly beneath it
inside the same plate. Code and validity are one thing to read, not two.

**3. Expiry is stated once and stated correctly.**
The spec table says 3 minutes; the current email says 5. The templates use 3
minutes throughout — set it from one config value on the backend so the copy and
the token can't drift apart again.

**4. The yellow highlighter is gone.**
Highlighting on "OTP" reads as an unfinished Word document. Emphasis now comes
from type scale and the plate, which is what the portal does.

**5. Copy cut by roughly half.**
Before: *"To ensure secure access to your UOIConnect account, we've generated a
One-Time Password (OTP) for you. Please enter this OTP on the portal login page
to proceed."* After: *"Enter this code to finish signing in to UOI Customer Portal."*
Nobody reads a transactional email; they scan it for one thing.

**6. The disclaimer is proportionate.**
The current legal block runs six lines of ~7px grey text and is physically larger
than the message. Compressed to two sentences at 11px, and moved outside the card
so it reads as chrome rather than content. *Check this wording with Legal before
sending — it's a condensation, not a legal review.*

**7. A "we will never ask" strip.**
Every template carries one line: *UOI will never ask you for your OTP, password
or card details by phone, email or SMS.* An OTP email is the single most spoofed
message an insurer sends. This line, plus the absence of the generic stock photo
that phishing kits also use, makes the real email easier to trust and the fake
one easier to spot.

**8. Each email states what to do if it wasn't you.**
Login OTP → change your password. Reset link → ignore it, nothing happens.
Change Login ID → call us now, don't enter the code. This is the highest-value
copy in a security email and the current template has none of it.

---

## Reused portal components

Nothing here is a new visual language. Every value is lifted from
`src/index.css` (`@theme`) and `src/pages/auth/AuthUI.tsx`.

| Email element | Portal source | Spec |
|---|---|---|
| Page canvas | `--color-bg-page` | `#F6F8FC` |
| Card surface | menu/card surface, `AuthUI.tsx:425` | white, 1px hairline, `--radius-sm` 8px |
| Brand rule | `--color-primary` | `#005EB8`, 4px |
| Code plate | OTP digit box, `AuthUI.tsx:557` | white, 1px `rgba(0,0,0,.09)`, 8px radius, centred |
| CTA button | `PrimaryButton`, `AuthUI.tsx:585` | `#005EB8`, white, 8px radius, 12px/24px, 16px/1.5, weight 500 |
| Info notice | `SuccessToast` geometry, `AuthUI.tsx:625` | `--color-bg-info` `#EFF6FF`, 8px radius, 12px/16px |
| Caution notice | same geometry | `--color-bg-caution` `#FFF8EC` |
| Footer bar | `FooterShort.tsx` | `--color-primary` bar, 12px white |
| Type | `--font-sans` + scale | Noto Sans; 24/1.2 heading, 16/1.5 body, 14/1.4 small, 12/1.4 caption |
| Text colours | `--color-text-*` | `#212121` / `#6E6E6E` / `#8D8D8D`; links `#0D6EFD` |

Two deliberate deviations, both forced by the medium:

- **`rgba()` borders resolved to flat hex** (`#EBEBEB`, `#F0F0F0`). Outlook on
  Windows drops the alpha channel and renders them black.
- **Shadows dropped.** `--shadow-card` is invisible in most clients; the hairline
  border carries the same separation. Nothing else changes.

---

## Editing and building

Templates are generated so the shell stays identical across all four:

```bash
python3 emails/build.py     # writes the 4 templates + preview.html
```

Edit `build.py`, not the HTML files — they are overwritten on every build.
Component functions (`code_plate`, `primary_button`, `notice`) are at the top;
per-template copy is in the `TEMPLATES` section near the bottom.

### Before you send

1. **Host the logo.** `LOGO_URL` in `build.py` points at a placeholder. Upload
   `assets/uoi-logo.png` (300×150, displayed at 100×51) to a public HTTPS path
   and update the constant. Alt text is `UOI` so a blocked image degrades cleanly.
2. **Wire the merge fields.** Currently Handlebars-style; swap the delimiters for
   whatever your ESP uses.

| Field | Used in |
|---|---|
| `{{first_name}}` | 1, 2, 4 |
| `{{otp_code}}` | 1, 3, 4 (subject + body) |
| `{{login_id}}` | 2, 3 |
| `{{old_login_id}}` / `{{new_login_id}}` | 4 |
| `{{reset_url}}` | 2 |
| `{{change_password_url}}` | 1 |

3. **Send a plain-text alternative.** Transactional mail without a `text/plain`
   part takes a spam-score hit. The code and the URL are all it needs to contain.
4. **Check SPF, DKIM and DMARC** on the sending domain. No amount of design makes
   an unauthenticated OTP email trustworthy.

### Open questions for the team

- **Code in the subject line** (`946683 is your UOI Customer Portal login code`) — this is
  what Google, Stripe and Apple do; the code is readable from the lock-screen
  notification without opening the mail. The tradeoff is shoulder-surfing. Worth a
  decision either way; templates 1, 3 and 4 currently do it.
- **Reset link validity** is written as 30 minutes in template 2 — confirm against
  the backend token TTL.
- **Row 5 of the spec table** ("Others") was cut off in the screenshot. Send me the
  remaining scenarios and they'll slot into the same shell.

### QA before launch

Render tests in Litmus or Email on Acid, minimum: Outlook 2016/2019 Windows
(the strictest), Outlook 365 web, Gmail web + iOS + Android, Apple Mail macOS +
iOS, Samsung Mail. Specifically check: the code plate border on Outlook Windows,
the button on Outlook Windows, and that Gmail's dark mode does not invert the
code plate — `color-scheme: light only` is set to prevent it, but Gmail Android
ignores it and force-inverts, which is why every colour here still has adequate
contrast when flipped.
