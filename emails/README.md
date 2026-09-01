# UOI Customer Portal, email templates

Eight HTML email templates for the customer portal, built from the portal's own
design system so the email and the screen it leads to look like the same product.
Copy comes from *Customer Portal Figma & Templates*, the uploaded PDF.

| # | Scenario | File |
|---|----------|------|
| 1 | Login OTP | `01-login-otp.html` |
| 2 | Login, forgot password reset link | `02-forgot-password-reset.html` |
| 3 | Manual account registration OTP | `03-registration-otp.html` |
| 4 | Change Login ID (email address) OTP | `04-change-login-id-otp.html` |
| 5 | Welcome, successful sign up | `05-welcome.html` |
| 6 | Sign-in after six months of inactivity | `06-inactivity-signin.html` |
| 7 | Successful change of login ID | `07-login-id-changed.html` |
| 8 | Successful change of password | `08-password-changed.html` |

Open `preview.html` in a browser to see all eight rendered at 600px with sample data.

Logo, one card, then the legal block at 11px on the canvas below it, with no
rule between them.

---

## What changed from the current design, and why

**1. The hero photo is gone.**
In the current email the stock photo of a woman at a laptop is the single largest
element and carries no information. On a phone it pushes the OTP, the only thing
the reader actually wants, below the fold. It has been replaced by a 4px bar in
the portal's primary blue: brand presence is instant, and the code sits in the
first screenful. As a bonus, most corporate mail clients block images by default,
so a photo-led email currently arrives as a grey box; this one doesn't depend on
images at all.

**2. The code is an object, not a sentence.**
`Your OTP: 946683` inside a paragraph is not scannable. The code now sits in a
filled block at 38px with wide tracking, with the expiry directly beneath it
inside the same block. The fill is the portal's page tint (`#F6F8FC`, no
border): on a white card a bordered white plate gives the code no weight of its
own. Code and validity are one thing to read, not two.

**3. Expiry is stated once and stated correctly.**
The spec table says 3 minutes; the current email says 5. The templates use 3
minutes throughout. Set it from one config value on the backend so the copy and
the token can't drift apart again.

**4. The yellow highlighter is gone.**
Highlighting on "OTP" reads as an unfinished Word document. Emphasis now comes
from type scale and the plate, which is what the portal does.

**5. Copy cut by roughly half.**
Before: *"To ensure secure access to your UOIConnect account, we've generated a
One-Time Password (OTP) for you. Please enter this OTP on the portal login page
to proceed."* After: *"Enter this code to finish signing in to UOI Customer Portal."*
Nobody reads a transactional email; they scan it for one thing.

**6. The footer is legal text only.**
The blue copyright bar and the link row are gone. What remains is the required
legal block: no-reply notice, privacy link, copyright, and the UOI email
disclaimer. It sits below the card on the page canvas at 11px, the smallest type
in the email, so it reads as document chrome rather than message content. The
support route moved inside the card as closing fine print at 13px.

**6b. Three fixed tiers after the code.**
Everything below the code or button reads in the same three steps, so no one has
to work out what matters:

| Tier | Component | Style | Carries |
|---|---|---|---|
| 1 | `lead()` | 16px/600, `#212121` | the next action |
| 2 | `notice()` | tinted box, 8px radius | what to do if it was not you |
| 3 | `fine()` | 13px, `#8D8D8D`, behind a hairline | security note, support |

**8. The three notice emails say what to do if it wasn't you.**
Templates 6, 7 and 8 confirm something that already happened, so a caution box
carries the recovery route and they close on it rather than repeating a help
line underneath. Templates 1 to 5 keep the help line, since nothing has
happened yet that the reader might need to undo.

---

## Reused portal components

Nothing here is a new visual language. Every value is lifted from
`src/index.css` (`@theme`) and `src/pages/auth/AuthUI.tsx`.

| Email element | Portal source | Spec |
|---|---|---|
| Page canvas | `--color-bg-page` | `#F6F8FC` |
| Card surface | menu/card surface, `AuthUI.tsx:425` | white, 1px hairline, `--radius-sm` 8px |
| Code block | `--color-bg-page` fill | `#F6F8FC`, 8px radius, no border, centred |
| CTA button | `PrimaryButton`, `AuthUI.tsx:585` | `#005EB8`, white, 8px radius, 12px/24px, 16px/1.5, weight 500 |
| Info notice | `SuccessToast` geometry, `AuthUI.tsx:625` | `--color-bg-info` `#EFF6FF`, 8px radius, 12px/16px |
| Caution notice | same geometry | `--color-bg-caution` `#FFF8EC` |
| Type | `--font-sans` + scale | Noto Sans; 26/1.25 heading, 16/1.5 body, 14/1.4 small, 13/1.5 fine |
| Text colours | `--color-text-*` | `#212121` / `#6E6E6E` / `#8D8D8D`; links `#0D6EFD` |
| Legal block | below the card | 11px/1.55, `#6E6E6E`, separated by space |

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

Edit `build.py`, not the HTML files. They are overwritten on every build.
Component functions (`code_plate`, `primary_button`, `notice`) are at the top;
per-template copy is in the `TEMPLATES` section near the bottom.

### Before you send

1. **Host the logo and rebuild.** By default the logo is inlined as a data URI,
   so every generated file renders on its own with no hosting and no assets
   folder beside it. That is right for review and wrong for sending: Gmail and
   Outlook strip data-URI images. Upload `assets/uoi-logo.png` (300×150,
   displayed at 100×51) to a public HTTPS path, then rebuild with it:

   ```bash
   EMAIL_LOGO_URL=https://www.uoi.com.sg/email/uoi-logo.png python3 emails/build.py
   ```

   Files built the default way carry a warning comment in the head; files built
   with `EMAIL_LOGO_URL` do not, so you can tell them apart at a glance. Alt text
   is `UOI` either way, so a blocked image degrades to the brand name.
2. **Wire the merge fields.** Currently Handlebars-style; swap the delimiters for
   whatever your ESP uses.

| Field | Used in |
|---|---|
| `{{first_name}}` | all eight |
| `{{otp}}` | 1, 3, 4 (subject + body) |
| `{{login_datetime}}` | 6 |
| `{{change_datetime}}` | 7, 8 |
| `{{old_login_id}}` / `{{new_login_id}}` | 4, 7 |
| `{{reset_url}}` | 2, 8 |

Template 5's button links to `PORTAL_URL`; every `here` support link points at
`SUPPORT_URL`, the same WhatsApp line the portal uses (`AuthUI.tsx`). Both are
constants, not merge fields.

3. **Send a plain-text alternative.** Transactional mail without a `text/plain`
   part takes a spam-score hit. The code and the URL are all it needs to contain.
4. **Check SPF, DKIM and DMARC** on the sending domain. No amount of design makes
   an unauthenticated OTP email trustworthy.

### Open questions for the team

- **Code in the subject line** (`946683 is your UOI Customer Portal login code`). This is
  what Google, Stripe and Apple do; the code is readable from the lock-screen
  notification without opening the mail. The tradeoff is shoulder-surfing. Worth a
  decision either way; templates 1, 3 and 4 currently do it.
- **Reset link validity** is written as 30 minutes in template 2. Confirm against
  the backend token TTL.
- **Template 7 must go to the old address too.** If someone else changed the login
  ID, the old address is the only one the customer still reaches. Sending only to
  the new address means a hijack is never seen.
- **Row 5 of the spec table** ("Others") was cut off in the screenshot. Send me the
  remaining scenarios and they'll slot into the same shell.

### QA before launch

Render tests in Litmus or Email on Acid, minimum: Outlook 2016/2019 Windows
(the strictest), Outlook 365 web, Gmail web + iOS + Android, Apple Mail macOS +
iOS, Samsung Mail. Specifically check: the code plate border on Outlook Windows,
the button on Outlook Windows, and that Gmail's dark mode does not invert the
code plate. `color-scheme: light only` is set to prevent it, but Gmail Android
ignores it and force-inverts, which is why every colour here still has adequate
contrast when flipped.
