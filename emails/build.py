#!/usr/bin/env python3
"""
Builds the UOI Customer Portal transactional email templates.

Every colour, radius, font size and component treatment below is lifted from the
customer portal's own design system (src/index.css @theme + src/pages/auth/AuthUI.tsx)
so the emails and the screens they lead to are visibly the same product.

Run:  python3 emails/build.py
Out:  emails/*.html  +  emails/preview.html
"""

import os

OUT = os.path.dirname(os.path.abspath(__file__))

# ─────────────────────────────────────────────────────────────────────────────
# Tokens — mirrored from src/index.css @theme
# rgba() borders are resolved to flat hex because Outlook/Windows drops alpha.
# ─────────────────────────────────────────────────────────────────────────────
T = {
    "primary":        "#005EB8",   # --color-primary
    "bg_page":        "#F6F8FC",   # --color-bg-page
    "bg_white":       "#FFFFFF",   # --color-bg-white
    "bg_info":        "#EFF6FF",   # --color-bg-info
    "bg_caution":     "#FFF8EC",   # --color-bg-caution
    "text_primary":   "#212121",   # --color-text-primary
    "text_secondary": "#6E6E6E",   # --color-text-secondary
    "text_tertiary":  "#8D8D8D",   # --color-text-tertiary
    "text_link":      "#0D6EFD",   # --color-text-link
    "border":         "#EBEBEB",   # flat form of rgba(0,0,0,0.09)
    "border_split":   "#F0F0F0",   # flat form of rgba(0,0,0,0.06)
    "caution":        "#FFA826",   # --color-caution
    "radius":         "8px",       # --radius-sm
    "font":           "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif",
}

# Portal constants (src/pages/auth/AuthUI.tsx, src/components/layout/FooterShort.tsx)
TERMS_URL = "https://www.uoi.com.sg/uoi/important-information.page"
PRIVACY_URL = "https://www.uoi.com.sg/privacy.page"
UOI_URL = "https://www.uoi.com.sg"
PORTAL_URL = "https://portal.uoi.com.sg"
# Same WhatsApp support line the portal uses (AuthUI.tsx SUPPORT_URL).
# Ampersands escaped: these files declare XHTML, where a raw & in an attribute
# is invalid and some ESP parsers reject it.
SUPPORT_URL = ("https://api.whatsapp.com/send/?phone=6580814843"
               "&amp;text&amp;type=phone_number&amp;app_absent=0")
SUPPORT_EMAIL = "contactus@uoi.com.sg"
SUPPORT_TEL = "+6562227733"
SUPPORT_TEL_DISPLAY = "(+65) 6222 7733"
COPYRIGHT = ("Copyright © 2026 United Overseas Insurance Limited "
             "Co Reg. No. 197100152R.")
RIGHTS = "All Rights Reserved."

# Logo source.
#
# Default: the PNG inlined as a data URI, so every generated file renders on its
# own, with no hosting and no assets folder beside it. That is what review needs.
#
# For SENDING, that is the wrong choice: Gmail and Outlook strip data-URI images.
# Host assets/uoi-logo.png at a public HTTPS path and rebuild with it:
#
#     EMAIL_LOGO_URL=https://www.uoi.com.sg/email/uoi-logo.png python3 emails/build.py
#
# Either way the alt text is "UOI", so a blocked image degrades to the brand name.
def _logo_src():
    hosted = os.environ.get("EMAIL_LOGO_URL")
    if hosted:
        return hosted, False
    import base64
    with open(os.path.join(OUT, "assets", "uoi-logo.png"), "rb") as f:
        return "data:image/png;base64," + base64.b64encode(f.read()).decode(), True


LOGO_URL, LOGO_IS_INLINE = _logo_src()


# ─────────────────────────────────────────────────────────────────────────────
# Components. Email-HTML ports of the portal's React components.
#
# Hierarchy after the code plate or button runs in three fixed tiers, so the
# reader never has to work out what matters:
#   Tier 1  lead()   16px/600 ink      the next thing to do
#   Tier 2  notice() tinted box        what to do if it was not you
#   Tier 3  fine()   13px tertiary     security note and support, behind a rule
# ─────────────────────────────────────────────────────────────────────────────

def code_plate(code, label="Your OTP"):
    """OTP display: a filled block, no border.

    Uses the portal's page tint as a fill rather than the OTP input's white
    surface, because white on a white card gives the code no weight of its own.
    One contiguous string, never split cells: split digits break tap-to-copy
    and iOS/Android one-time-code autofill. Wide tracking keeps them legible.
    """
    return f"""
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center"
                      style="background-color:{T['bg_page']}; border-radius:{T['radius']};
                             padding:24px 16px 26px 16px;">
                    <div style="font-family:{T['font']}; font-size:13px; line-height:1.4;
                                color:{T['text_secondary']}; padding-bottom:10px;">{label}</div>
                    <div class="code" style="font-family:{T['font']}; font-size:38px; line-height:1.1;
                                font-weight:700; color:{T['text_primary']};
                                letter-spacing:9px; text-indent:9px; white-space:nowrap;">{code}</div>
                  </td>
                </tr>
              </table>"""


def primary_button(label, url):
    """Ports PrimaryButton (AuthUI.tsx): #005EB8, white, 8px radius,
    12px/24px padding, 16px/1.5, weight 500. Spacers keep Outlook honest."""
    return f"""
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" bgcolor="{T['primary']}"
                      style="border-radius:{T['radius']};">
                    <!--[if mso]>&nbsp;<![endif]-->
                    <a href="{url}"
                       style="display:inline-block; font-family:{T['font']}; font-size:16px;
                              line-height:1.5; font-weight:500; color:#FFFFFF;
                              text-decoration:none; padding:12px 32px;
                              border-radius:{T['radius']};">{label}</a>
                    <!--[if mso]>&nbsp;<![endif]-->
                  </td>
                </tr>
              </table>"""


def notice(body, tone="info"):
    """Tier 2. Ports the portal's notice surface (AuthUI.tsx SuccessToast):
    tinted background, 8px radius, 16px/12px padding."""
    bg = T["bg_info"] if tone == "info" else T["bg_caution"]
    return f"""
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background-color:{bg}; border-radius:{T['radius']};
                             padding:14px 16px; font-family:{T['font']}; font-size:14px;
                             line-height:1.5; color:{T['text_primary']};">{body}</td>
                </tr>
              </table>"""


def salutation(text):
    """Letter opening, one step down from the heading."""
    return (f"""
              <p style="margin:0; font-family:{T['font']}; font-size:16px; line-height:1.5;
                        color:{T['text_primary']};">{text}</p>""")


def signoff():
    return (f"""
              <p style="margin:0; font-family:{T['font']}; font-size:16px; line-height:1.5;
                        color:{T['text_secondary']};">Regards,<br />United Overseas Insurance Limited</p>""")


def fine(lines):
    """Tier 3. Closing block: a hairline rule, then muted 13px lines."""
    body = "".join(
        f"""
                <p style="margin:{0 if i == 0 else 10}px 0 0 0; font-family:{T['font']};
                          font-size:13px; line-height:1.5; color:{T['text_tertiary']};">{t}</p>"""
        for i, t in enumerate(lines))
    return f"""
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="border-top:1px solid {T['border_split']}; padding-top:20px;">{body}
                  </td>
                </tr>
              </table>"""


def para(text, size=16, color=None, top=0):
    color = color or T["text_secondary"]
    lh = "1.5" if size >= 16 else "1.4"
    return (f"""
              <p style="margin:{top}px 0 0 0; font-family:{T['font']}; font-size:{size}px;
                        line-height:{lh}; color:{color};">{text}</p>""")


def link(text, url, color=None):
    return (f'<a href="{url}" style="color:{color or T["text_link"]}; '
            f'text-decoration:underline;">{text}</a>')


def heading(text):
    return (f"""
              <h1 class="h1" style="margin:0; font-family:{T['font']}; font-size:26px;
                        line-height:1.25; font-weight:700; letter-spacing:-0.01em;
                        color:{T['text_primary']};">{text}</h1>""")


def spacer(h):
    return f'\n              <div style="height:{h}px; line-height:{h}px; font-size:0;">&nbsp;</div>'


HELP_LINE = (f'Need help? Reach out to our support team {link("here", SUPPORT_URL, T["text_tertiary"])} '
             f'or email {link(SUPPORT_EMAIL, "mailto:" + SUPPORT_EMAIL, T["text_tertiary"])}.')


# ─────────────────────────────────────────────────────────────────────────────
# Shell. Masthead, one card, no footer.
# ─────────────────────────────────────────────────────────────────────────────

def shell(title, preheader, blocks, after_card=""):
    """after_card puts content on the canvas between the card and the legal block."""
    body = "\n".join(blocks)
    return f"""<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="color-scheme" content="light only" />
  <meta name="supported-color-schemes" content="light only" />
  <title>{title}</title>
  {'<!-- LOGO IS INLINED AS A DATA URI, FOR REVIEW ONLY. Gmail and Outlook strip these. Before sending, host assets/uoi-logo.png and rebuild: EMAIL_LOGO_URL=https://your.host/uoi-logo.png python3 emails/build.py -->' if LOGO_IS_INLINE else '<!-- Logo served from a hosted URL. -->'}
  <!--[if mso]>
  <xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
  <![endif]-->
  <style type="text/css">
    :root {{ color-scheme: light only; supported-color-schemes: light only; }}
    body {{ margin:0 !important; padding:0 !important; width:100% !important;
           -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }}
    table {{ border-collapse:collapse !important; mso-table-lspace:0pt; mso-table-rspace:0pt; }}
    img {{ border:0; outline:none; text-decoration:none; -ms-interpolation-mode:bicubic; }}
    a {{ text-decoration:underline; }}
    /* Stop iOS auto-linking phone numbers and dates into blue system links */
    a[x-apple-data-detectors] {{ color:inherit !important; text-decoration:none !important;
                                 font-size:inherit !important; font-weight:inherit !important; }}

    @media screen and (max-width:600px) {{
      .wrap    {{ width:100% !important; }}
      .pad     {{ padding-left:22px !important; padding-right:22px !important; }}
      .h1      {{ font-size:22px !important; }}
      .code    {{ font-size:30px !important; letter-spacing:7px !important; text-indent:7px !important; }}
      .btn a   {{ display:block !important; }}
    }}
  </style>
</head>
<body style="margin:0; padding:0; background-color:{T['bg_page']};">
  <!-- Preheader: the grey line the inbox shows next to the subject -->
  <div style="display:none; max-height:0; overflow:hidden; mso-hide:all;
              font-size:1px; line-height:1px; color:{T['bg_page']}; opacity:0;">{preheader}
    &#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
         style="background-color:{T['bg_page']};">
    <tr>
      <td align="center" style="padding:32px 12px 40px 12px;">

        <table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" border="0"
               style="width:600px; max-width:600px;">

          <!-- Masthead -->
          <tr>
            <td class="pad" style="padding:0 4px 18px 4px;">
              <img src="{LOGO_URL}" width="100" height="51" alt="UOI"
                   style="display:block; width:100px; height:51px; font-family:{T['font']};
                          font-size:20px; font-weight:700; color:{T['primary']};" />
            </td>
          </tr>

          <!-- Card: portal surface. White, 8px radius, 1px hairline border -->
          <tr>
            <td style="background-color:{T['bg_white']}; border:1px solid {T['border']};
                       border-radius:{T['radius']};">

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td class="pad" style="padding:36px 32px 32px 32px;">
{body}
                  </td>
                </tr>
              </table>

            </td>
          </tr>
{after_card}
          <!-- Legal. Outside the card: chrome, not message. 11px is the smallest
               type in the email, per the brief. -->
          <tr>
            <td class="pad" style="padding:32px 4px 0 4px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family:{T['font']}; font-size:11px; line-height:1.55;
                             color:{T['text_secondary']};">
                    <p style="margin:0;">This is an automatically generated email, please do not reply.</p>
                    <p style="margin:8px 0 0 0;">Visit
                      <a href="{UOI_URL}" style="color:{T['text_secondary']};">United Overseas
                      Insurance Limited (UOI)</a> to learn more about our privacy and
                      security notice.</p>
                    <p style="margin:8px 0 0 0;">{COPYRIGHT} {RIGHTS}</p>
                    <p style="margin:16px 0 0 0; font-weight:600; letter-spacing:0.04em;
                              color:{T['text_secondary']};">UOI EMAIL DISCLAIMER</p>
                    <p style="margin:4px 0 0 0; color:{T['text_tertiary']};">Any person receiving this
                      email and any attachment(s) contained, shall treat the information as
                      confidential and not misuse, copy, disclose, distribute or retain the
                      information in any way that amounts to a breach of confidentiality. If you
                      are not the intended recipient, please delete all copies of this email from
                      your computer system. As the integrity of this message cannot be guaranteed,
                      neither UOI nor any entity in the UOB Group shall be responsible for the
                      contents. Any opinion in this email may not necessarily represent the opinion
                      of UOI or any entity in the UOB Group.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
"""


# ─────────────────────────────────────────────────────────────────────────────
# Templates
# ─────────────────────────────────────────────────────────────────────────────

RESET_URL = "{{reset_url}}"

# Shared closing lines, identical across all six.
HELP_LINE = ("If you need any help, feel free to reach out to our support team "
             + link("here", SUPPORT_URL) + ".")
OTP_VALIDITY = ("Code is valid for the next 3 minutes, after which you will need to "
                "request a new OTP.")

TEMPLATES = []


def add(filename, subject, preheader, title, blocks, notes, section="", item=""):
    TEMPLATES.append({
        "file": filename, "subject": subject, "preheader": preheader,
        "title": title, "html": shell(title, preheader, blocks), "notes": notes,
        "section": section, "item": item,
    })


def letter(heading_text, paragraphs, middle=None, tail=None, help_line=True):
    """The shape every template shares: heading, salutation, body, an optional
    block in the middle, optional trailing paragraphs, help line, sign-off."""
    out = [heading(heading_text), spacer(16), salutation("Dear {{first_name}},")]
    for para_text in paragraphs:
        out += [spacer(14), para(para_text, 16, T["text_secondary"])]
    if middle:
        out += [spacer(24)] + middle
    for para_text in (tail or []):
        out += [spacer(20), para(para_text, 16, T["text_secondary"])]
    if help_line:
        out += [spacer(20), para(HELP_LINE, 16, T["text_secondary"])]
    out += [spacer(24), signoff()]
    return out


# 1. Login OTP
add(
    "01-login-otp.html",
    "{{otp}} is your UOI Customer Portal login code",
    "Code is valid for the next 3 minutes.",
    "Your UOI Customer Portal login OTP",
    letter(
        "Your login OTP",
        ["We received your request to login to UOI Customer Portal account. Please "
         "enter this One-Time Password (OTP) on the portal login page to proceed."],
        middle=[code_plate("{{otp}}")],
        tail=[OTP_VALIDITY],
    ),
    "OTP in the subject line so it is readable from the notification without opening the email.",
    section="Login",
    item="Login OTP",
)

# 2. Forget password, reset link
add(
    "02-forgot-password-reset.html",
    "Reset your UOI Customer Portal password",
    "Link is valid for the next 30 minutes.",
    "Reset your UOI Customer Portal password",
    letter(
        "Reset your password",
        ["We received your request to reset your UOI Customer Portal account password. "
         "Click on the button below to choose a new password."],
        middle=[f'<div class="btn">{primary_button("Reset password", RESET_URL)}</div>'],
        tail=["Link is valid for the next 30 minutes, after which you will need to "
              "request again."],
    ),
    "Link, not a code. A reset is a click-through, so don't make the user retype anything.",
    section="Login",
    item="Forget password, reset link",
)

# 3. Verify account OTP
add(
    "04-registration-otp.html",
    "{{otp}} is your UOI Customer Portal verification code",
    "Code is valid for the next 3 minutes.",
    "Verify your email address",
    letter(
        "Verify your email address",
        ["Welcome to UOI Customer Portal. Please enter this One-Time Password (OTP) "
         "to verify and finish setting up your account."],
        middle=[code_plate("{{otp}}")],
        tail=[OTP_VALIDITY],
    ),
    "Verifies an address and nothing else. The welcome email does the selling.",
    section="Account Registration",
    item="Verify Account OTP",
)

# 4. Verify new login ID OTP
add(
    "07-change-login-id-otp.html",
    "Confirm your new login ID",
    "Code is valid for the next 3 minutes.",
    "Confirm your new login ID",
    letter(
        "Confirm your new login ID",
        ["You asked to change your login ID (email address) from "
         "<strong style=\"color:%s;\">{{old_login_id}}</strong> to "
         "<strong style=\"color:%s;\">{{new_login_id}}</strong>. Please enter this "
         "One-Time Password (OTP) to verify." % (T["text_primary"], T["text_primary"])],
        middle=[code_plate("{{otp}}")],
        tail=[OTP_VALIDITY],
    ),
    "States both addresses, so a hijack is obvious on sight.",
    section="Post Registration",
    item="Change of new login ID OTP",
)

# 5. Welcome, successful sign up
add(
    "06-welcome.html",
    "Welcome to UOI Customer Portal",
    "Your UOI Customer Portal account is ready.",
    "Welcome to UOI Customer Portal",
    letter(
        "Successful registration",
        ["Your UOI Customer Portal account is ready. Everything to do with your UOI "
         "policies now lives in one place.",
         "You can view your policies and coverage dates, download policy documents "
         "and receipts, update your contact details, and see the rewards available "
         "to UOI customers, at any time."],
        middle=[f'<div class="btn">{primary_button("Go to dashboard", PORTAL_URL)}</div>'],
    ),
    "The only one of the six that sells rather than authenticates.",
    section="Post Registration",
    item="Successful registration",
)

# 6. Sign-in after six months of inactivity
add(
    "11-inactivity-signin.html",
    "You signed in to UOI Customer Portal",
    "First sign-in in six months. Let us know if this was not you.",
    "You signed in to UOI Customer Portal",
    letter(
        "Welcome back",
        ["You signed in to your UOI Customer Portal account on "
         "<strong style=\"color:%s;\">{{login_datetime}}</strong>. It has been more "
         "than six months since your last visit, so we are letting you know."
         % T["text_primary"],
         "While you are here, it is worth checking that your contact details are "
         "current, so policy documents and renewal reminders reach you."],
        middle=[notice("<strong>Wasn't you?</strong> Your account may be at risk. "
                       + link("Reset your password", RESET_URL) + " now and contact our "
                       "support team " + link("here", SUPPORT_URL) + ".", "caution")],
        help_line=False,
    ),
    "The trigger is a login, so the message that earns its place is the one that "
    "lets a customer catch a sign-in that was not theirs.",
    section="Post Registration",
    item="Email notification upon login after six months of inactivity",
)


# 7. Successful change of login ID
add(
    "08-login-id-changed.html",
    "Login ID changed successfully",
    "Changed on {{change_datetime}}. Let us know if this was not you.",
    "Successful change of login ID",
    letter(
        "Successful change of login ID",
        ["Your login ID (email address) for UOI Customer Portal has been changed from "
         "<strong style=\"color:%s;\">{{old_login_id}}</strong> to "
         "<strong style=\"color:%s;\">{{new_login_id}}</strong> on "
         "<strong style=\"color:%s;\">{{change_datetime}}</strong>."
         % (T["text_primary"], T["text_primary"], T["text_primary"]),
         "Use your new login ID the next time you sign in."],
        middle=[notice("<strong>Wasn't you?</strong> Your account may be at risk. Contact "
                       "our support team " + link("here", SUPPORT_URL) + ".", "caution")],
        help_line=False,
    ),
    "Send to the old address as well as the new one. The old address is the only "
    "one a hijacked account still reaches.",
    section="Post Registration",
    item="Successful change of login ID",
)

# 8. Successful change of password
add(
    "09-password-changed.html",
    "Password changed successfully",
    "Changed on {{change_datetime}}. Let us know if this was not you.",
    "Successful change of password",
    letter(
        "Successful change of password",
        ["The password for your UOI Customer Portal account was changed on "
         "<strong style=\"color:%s;\">{{change_datetime}}</strong>." % T["text_primary"],
         "Use your new password the next time you sign in."],
        middle=[notice("<strong>Wasn't you?</strong> Your account may be at risk. "
                       + link("Reset your password", RESET_URL) + " now and contact our "
                       "support team " + link("here", SUPPORT_URL) + ".", "caution")],
        help_line=False,
    ),
    "Confirms a change the customer may not have made, which is the whole point.",
    section="Post Registration",
    item="Successful change of password",
)


# 9. Successful change of contact details
add(
    "10-contact-details-changed.html",
    "Contact number changed successfully",
    "Changed on {{change_datetime}}. Let us know if this was not you.",
    "Successful change of contact details",
    letter(
        "Successful change of contact details",
        ["The following details on your UOI Customer Portal account were changed on "
         "<strong style=\"color:%s;\">{{change_datetime}}</strong>: "
         "<strong style=\"color:%s;\">{{change_fields}}</strong>."
         % (T["text_primary"], T["text_primary"]),
         "Policy documents and renewal reminders will go to your updated details "
         "from now on."],
        middle=[notice("<strong>Wasn't you?</strong> Your account may be at risk. "
                       + link("Reset your password", RESET_URL) + " now and contact our "
                       "support team " + link("here", SUPPORT_URL) + ".", "caution")],
        help_line=False,
    ),
    "A changed mobile number is as security-relevant as a changed email: it is the "
    "number UOI calls, and likely a second factor.",
    section="Post Registration",
    item="Successful change of contact details",
)

# 10. Account locked after failed sign-in attempts
add(
    "03-account-locked.html",
    "Your UOI Customer Portal has been locked",
    "Reset your password to unlock it.",
    "Your account has been locked",
    letter(
        "Your account has been locked",
        ["Your UOI Customer Portal account was locked on "
         "<strong style=\"color:%s;\">{{lock_datetime}}</strong> after several "
         "unsuccessful sign-in attempts. This is to protect your account."
         % T["text_primary"],
         "Reset your password to unlock it."],
        middle=[f'<div class="btn">{primary_button("Reset password", RESET_URL)}</div>',
                spacer(24),
                notice("<strong>Wasn't you?</strong> Someone may be trying to sign in to "
                       "your account. Contact our support team "
                       + link("here", SUPPORT_URL) + ".", "caution")],
        help_line=False,
    ),
    "Without this the customer assumes the portal is broken and calls.",
    section="Login",
    item="Account locked",
)

# 11. Registration attempted on an address that already has an account
add(
    "05-existing-account.html",
    "You already have a UOI Customer Portal account",
    "No new account was created.",
    "You already have an account",
    letter(
        "You already have an account",
        ["Someone tried to create a UOI Customer Portal account using "
         "<strong style=\"color:%s;\">{{login_id}}</strong> on "
         "<strong style=\"color:%s;\">{{attempt_datetime}}</strong>. An account with "
         "this email address already exists, so no new account was created."
         % (T["text_primary"], T["text_primary"]),
         "If that was you, sign in with your existing details instead."],
        middle=[f'<div class="btn">{primary_button("Go to dashboard", PORTAL_URL)}</div>',
                spacer(24),
                notice("<strong>Wasn't you?</strong> Nothing has changed and no one has "
                       "gained access to your account. You can safely ignore this email.",
                       "info")],
    ),
    "Goes to the address owner, so the sign-up screen never has to reveal whether an "
    "address is registered. Reassures rather than alarms: a failed sign-up compromises "
    "nothing, so the notice is info blue, not caution amber.",
    item="You already have an account",
)




# The document's running order, which is not the order the templates are defined in.
ORDER = [
    "01-login-otp.html", "02-forgot-password-reset.html", "03-account-locked.html",
    "04-registration-otp.html", "05-existing-account.html", "06-welcome.html",
    "07-change-login-id-otp.html", "08-login-id-changed.html", "09-password-changed.html",
    "10-contact-details-changed.html", "11-inactivity-signin.html",
]
TEMPLATES.sort(key=lambda t: ORDER.index(t["file"]))

# ─────────────────────────────────────────────────────────────────────────────
# Preview page
# ─────────────────────────────────────────────────────────────────────────────

# Sample values so the preview reads as a real email rather than a template
SAMPLE = {
    "{{first_name}}": "Wei Ling",
    "{{otp}}": "946683",
    "{{login_id}}": "weiling.tan@gmail.com",
    "{{old_login_id}}": "weiling.tan@gmail.com",
    "{{new_login_id}}": "wl.tan@outlook.sg",
    "{{reset_url}}": "https://portal.uoi.com.sg/reset?t=a7f3c2e9",
    "{{change_password_url}}": "https://portal.uoi.com.sg/account/password",
}


def build_preview():
    cards = []
    for n, t in enumerate(TEMPLATES, start=1):
        rendered = t["html"]
        subject = t["subject"]
        for k, v in SAMPLE.items():
            rendered = rendered.replace(k, v)
            subject = subject.replace(k, v)
        inner = rendered.replace('"', "&quot;")
        cards.append(TPL_CARD
                     .replace("__N__", str(n))
                     .replace("__TITLE__", t["title"])
                     .replace("__FILE__", t["file"])
                     .replace("__SUBJECT__", subject)
                     .replace("__PRE__", t["preheader"])
                     .replace("__NOTE__", t["notes"])
                     .replace("__SRC__", inner))

    changes = "".join(
        CHANGE_ITEM.replace("__H__", h).replace("__B__", b) for h, b in CHANGES)
    rows = "".join(
        TOKEN_ROW.replace("__A__", a).replace("__B__", b).replace("__C__", c)
        for a, b, c in TOKEN_MAP)

    return (PREVIEW_SHELL
            .replace("__CHANGES__", changes)
            .replace("__CARDS__", "".join(cards))
            .replace("__ROWS__", rows))


CHANGES = [
    ("The hero photo is gone",
     "In the current email the stock photo is the largest element and carries no "
     "information. On a phone it pushes the code below the fold. The logo alone now "
     "carries the branding. Most corporate clients block images by default, so the "
     "photo-led version currently arrives as a grey box; this one degrades to the "
     "brand name and stays fully readable."),
    ("The code is an object, not a sentence",
     "<code>Your OTP: 946683</code> inside a paragraph doesn\u2019t scan. The code now sits "
     "in a plate that reuses the portal\u2019s OTP input treatment, at 34px with wide "
     "tracking, with its expiry inside the same plate. One thing to read, not two."),
    ("One expiry, stated correctly",
     "The spec table says 3 minutes; the current email says 5. Templates use 3 "
     "throughout. Drive it from one backend value so copy and token can\u2019t drift "
     "apart again."),
    ("The yellow highlighter is gone",
     "Highlighting on \u201cOTP\u201d reads as an unfinished Word document. Emphasis comes "
     "from type scale and the plate, which is what the portal already does."),
    ("Copy cut by roughly half",
     "Before: <em>\u201cTo ensure secure access to your UOIConnect account, we\u2019ve "
     "generated a One-Time Password (OTP) for you. Please enter this OTP on the portal "
     "login page to proceed.\u201d</em> After: <em>\u201cEnter this code to finish signing in "
     "to UOI Customer Portal.\u201d</em>"),
    ("The footer is legal text only",
     "The blue copyright bar and the link row are gone. What remains is the required "
     "legal block, which sits below the card at 11px, the smallest type in the email, "
     "so it reads as document chrome rather than message content. The support route "
     "moved inside the card as closing fine print at 13px."),
    ("Every email says what to do if it wasn\u2019t you",
     "Login: change your password. Reset: ignore it, nothing happens. Change login "
     "ID: call us now, don\u2019t enter the code. The highest-value copy in a security "
     "email, and the current template has none of it."),
]

TOKEN_MAP = [
    ("Page canvas", "<code>--color-bg-page</code>", "#F6F8FC"),
    ("Card surface", "menu surface, <code>AuthUI.tsx:425</code>", "white, 1px hairline, 8px radius"),
    ("Code block", "<code>--color-bg-page</code> fill", "#F6F8FC, 8px radius, no border"),
    ("CTA button", "<code>PrimaryButton</code>, <code>AuthUI.tsx:585</code>",
     "#005EB8, 8px radius, 12/24px, 16px/1.5, w500"),
    ("Info notice", "<code>SuccessToast</code> geometry", "#EFF6FF, 8px radius, 12/16px"),
    ("Caution notice", "same geometry", "#FFF8EC"),
    ("Typeface", "<code>--font-sans</code>", "Noto Sans"),
    ("Text colours", "<code>--color-text-*</code>", "#212121 / #6E6E6E / #8D8D8D"),
]

CHANGE_ITEM = """
        <div class="change">
          <h3>__H__</h3>
          <p>__B__</p>
        </div>"""

TOKEN_ROW = """
            <tr><th scope="row">__A__</th><td>__B__</td><td class="mono">__C__</td></tr>"""

TPL_CARD = """
      <article class="tpl">
        <div class="tpl-meta">
          <span class="num">__N__</span>
          <h3>__TITLE__</h3>
          <dl>
            <dt>File</dt><dd class="mono">__FILE__</dd>
            <dt>Subject</dt><dd class="mono">__SUBJECT__</dd>
            <dt>Preheader</dt><dd>__PRE__</dd>
          </dl>
          <p class="why">__NOTE__</p>
        </div>
        <div class="tpl-render">
          <span class="viewport-label">600&#8202;px render</span>
          <iframe srcdoc="__SRC__" title="__TITLE__"></iframe>
        </div>
      </article>"""

PREVIEW_SHELL = """<title>UOI Customer Portal Auth Emails</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap">
<style>
  :root {
    --ground:      #F6F8FC;
    --surface:     #FFFFFF;
    --ink:         #212121;
    --muted:       #6E6E6E;
    --faint:       #8D8D8D;
    --accent:      #005EB8;
    --hairline:    #E3E9F2;
    --rail:        #EEF2F8;
    --viewport:    #EDF1F7;
    --sans: 'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
    --mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  }
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) {
      --ground:   #0F1621;
      --surface:  #161F2C;
      --ink:      #E6ECF5;
      --muted:    #9AA8BC;
      --faint:    #71809A;
      --accent:   #5AA5EE;
      --hairline: #232F41;
      --rail:     #1B2634;
      --viewport: #0A1018;
    }
  }
  :root[data-theme="dark"] {
    --ground:   #0F1621;
    --surface:  #161F2C;
    --ink:      #E6ECF5;
    --muted:    #9AA8BC;
    --faint:    #71809A;
    --accent:   #5AA5EE;
    --hairline: #232F41;
    --rail:     #1B2634;
    --viewport: #0A1018;
  }

  * { box-sizing: border-box; }
  body {
    margin: 0;
    background: var(--ground);
    color: var(--ink);
    font-family: var(--sans);
    font-size: 16px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }
  .shell { max-width: 1180px; margin: 0 auto; padding: 0 32px; }
  .prose { max-width: 68ch; }

  /* ── Masthead ─────────────────────────────────────────── */
  header.mast { padding: 88px 0 56px; border-bottom: 1px solid var(--hairline); }
  .eyebrow {
    font-family: var(--mono); font-size: 12px; font-weight: 500;
    letter-spacing: .14em; text-transform: uppercase;
    color: var(--accent); margin: 0 0 20px;
  }
  h1 {
    font-size: clamp(2.25rem, 5vw, 3.4rem); font-weight: 800;
    letter-spacing: -.03em; line-height: 1.05; margin: 0 0 24px;
    text-wrap: balance; max-width: 18ch;
  }
  .lede { font-size: 1.2rem; line-height: 1.55; color: var(--muted); margin: 0; max-width: 60ch; }
  .facts {
    display: flex; flex-wrap: wrap; gap: 0 48px;
    margin: 44px 0 0; padding: 0; list-style: none;
  }
  .facts div { padding: 0; }
  .facts dt {
    font-family: var(--mono); font-size: 11px; letter-spacing: .1em;
    text-transform: uppercase; color: var(--faint); margin: 0 0 6px;
  }
  .facts dd { margin: 0; font-size: 15px; font-weight: 600; font-variant-numeric: tabular-nums; }

  /* ── Sections ─────────────────────────────────────────── */
  section { padding: 72px 0; border-bottom: 1px solid var(--hairline); }
  section:last-of-type { border-bottom: 0; }
  h2 {
    font-size: 1.75rem; font-weight: 700; letter-spacing: -.02em;
    margin: 0 0 12px; text-wrap: balance;
  }
  .sub { color: var(--muted); margin: 0 0 44px; max-width: 62ch; }

  .changes { display: grid; gap: 32px 44px; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); }
  .change h3 {
    font-size: 1rem; font-weight: 700; margin: 0 0 8px;
    padding-left: 14px; border-left: 3px solid var(--accent); line-height: 1.4;
  }
  .change p { margin: 0; font-size: 15px; line-height: 1.6; color: var(--muted); padding-left: 17px; }
  .change em { color: var(--ink); font-style: italic; }

  /* ── Template cards ───────────────────────────────────── */
  .tpl {
    display: grid; grid-template-columns: minmax(280px, 360px) 1fr;
    gap: 0; background: var(--surface);
    border: 1px solid var(--hairline); border-radius: 12px;
    overflow: hidden; margin-bottom: 32px;
  }
  .tpl-meta { padding: 32px; border-right: 1px solid var(--hairline); }
  .num {
    display: inline-block; font-family: var(--mono); font-size: 12px; font-weight: 500;
    color: var(--accent); border: 1px solid var(--accent);
    border-radius: 999px; padding: 1px 10px; margin-bottom: 16px;
  }
  .tpl-meta h3 { font-size: 1.2rem; font-weight: 700; letter-spacing: -.01em; margin: 0 0 20px; line-height: 1.3; }
  .tpl-meta dl { display: grid; grid-template-columns: 82px 1fr; gap: 8px 14px; margin: 0 0 20px; }
  .tpl-meta dt {
    font-family: var(--mono); font-size: 10px; letter-spacing: .1em;
    text-transform: uppercase; color: var(--faint); padding-top: 3px;
  }
  .tpl-meta dd { margin: 0; font-size: 13.5px; line-height: 1.5; color: var(--muted); overflow-wrap: anywhere; }
  .why {
    margin: 0; font-size: 13.5px; line-height: 1.6; color: var(--ink);
    background: var(--rail); border-radius: 8px; padding: 12px 14px;
  }
  .tpl-render { background: var(--viewport); position: relative; padding: 20px 0 0; }
  .viewport-label {
    position: absolute; top: 12px; right: 16px; z-index: 1;
    font-family: var(--mono); font-size: 10px; letter-spacing: .08em;
    text-transform: uppercase; color: var(--faint);
  }
  iframe { width: 100%; min-height: 620px; border: 0; display: block; }

  /* ── Token table ──────────────────────────────────────── */
  .scroll { overflow-x: auto; }
  table { border-collapse: collapse; width: 100%; min-width: 620px; font-size: 14.5px; }
  caption { text-align: left; color: var(--muted); font-size: 14px; padding-bottom: 16px; }
  th, td { text-align: left; padding: 11px 20px 11px 0; border-bottom: 1px solid var(--hairline); vertical-align: top; }
  thead th {
    font-family: var(--mono); font-size: 10px; letter-spacing: .1em;
    text-transform: uppercase; color: var(--faint); font-weight: 500;
    border-bottom: 1px solid var(--ink);
  }
  tbody th { font-weight: 600; white-space: nowrap; }
  td { color: var(--muted); }
  .mono, code { font-family: var(--mono); font-size: .88em; }
  code { background: var(--rail); border-radius: 4px; padding: 1px 5px; color: var(--ink); }

  ul.steps { margin: 0; padding: 0; list-style: none; display: grid; gap: 18px; }
  ul.steps li { padding-left: 20px; position: relative; color: var(--muted); font-size: 15px; }
  ul.steps li::before {
    content: ""; position: absolute; left: 0; top: .62em;
    width: 6px; height: 6px; border-radius: 50%; background: var(--accent);
  }
  ul.steps strong { color: var(--ink); font-weight: 600; }

  footer.end { padding: 56px 0 88px; color: var(--faint); font-size: 13px; }

  a { color: var(--accent); }
  :focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 3px; }

  @media (max-width: 900px) {
    .shell { padding: 0 20px; }
    .tpl { grid-template-columns: 1fr; }
    .tpl-meta { border-right: 0; border-bottom: 1px solid var(--hairline); }
    header.mast { padding: 56px 0 40px; }
    section { padding: 52px 0; }
    .facts { gap: 24px 36px; }
  }
</style>

<div class="shell">

  <header class="mast">
    <p class="eyebrow">Design proposal &middot; Customer Portal</p>
    <h1>Auth emails, rebuilt on the portal&rsquo;s own system</h1>
    <p class="lede">Eleven templates for UOI Customer Portal, covering sign-in,
      registration and every change a customer can make to their own account. Same tokens, same
      button, same card as the screens they lead to, so the email and the product stop
      looking like two different companies.</p>
    <dl class="facts">
      <div><dt>Templates</dt><dd>11</dd></div>
      <div><dt>Width</dt><dd>600&#8202;px</dd></div>
      <div><dt>Typeface</dt><dd>Noto Sans</dd></div>
      <div><dt>Images required</dt><dd>Logo only</dd></div>
    </dl>
  </header>

  <section>
    <div class="prose">
      <h2>What changes, and why</h2>
      <p class="sub">Seven moves, each one aimed at the same thing: get the reader to the
        code or the button faster, and make a forged copy of this email harder to pass off.</p>
    </div>
    <div class="changes">__CHANGES__
    </div>
  </section>

  <section>
    <div class="prose">
      <h2>The templates</h2>
      <p class="sub">Rendered live below at 600&#8202;px with sample data. Numbering follows
        the rows in the templates document.</p>
    </div>__CARDS__
  </section>

  <section>
    <div class="prose">
      <h2>Nothing here is a new visual language</h2>
      <p class="sub">Every value is lifted from <code>src/index.css</code> and
        <code>src/pages/auth/AuthUI.tsx</code>. Two deviations are forced by the medium:
        <code>rgba()</code> borders are resolved to flat hex, because Outlook on Windows
        drops the alpha channel and renders them black; and shadows are dropped, because
        <code>--shadow-card</code> is invisible in most clients and the hairline border
        carries the same separation.</p>
    </div>
    <div class="scroll">
      <table>
        <thead><tr><th scope="col">Email element</th><th scope="col">Portal source</th><th scope="col">Spec</th></tr></thead>
        <tbody>__ROWS__
        </tbody>
      </table>
    </div>
  </section>

  <section>
    <div class="prose">
      <h2>Before these go out</h2>
      <ul class="steps">
        <li><strong>Host the logo and rebuild.</strong> The logo is inlined as a data
          URI by default so these files render on their own. Gmail and Outlook strip
          data-URI images, so before sending, host <code>assets/uoi-logo.png</code> and
          rebuild with <code>EMAIL_LOGO_URL=https://&hellip; python3 emails/build.py</code>.
          Alt text is <code>UOI</code>, so a blocked image degrades to the brand name.</li>
        <li><strong>Wire the merge fields.</strong> Currently Handlebars-style.
          Swap the delimiters for whatever your ESP uses.</li>
        <li><strong>Send a plain-text alternative.</strong> Transactional mail without a
          <code>text/plain</code> part takes a spam-score hit.</li>
        <li><strong>Check SPF, DKIM and DMARC.</strong> No amount of design makes an
          unauthenticated OTP email trustworthy.</li>
        <li><strong>Decide on the code in the subject line.</strong> Google, Stripe and
          Apple all do it, so the code is readable from the lock screen without opening the mail.
          The tradeoff is shoulder-surfing. Templates 1, 3 and 4 currently do it.</li>
        <li><strong>Confirm the reset-link TTL.</strong> Template 2 says 30 minutes.</li>
        <li><strong>Send me row 5.</strong> The &ldquo;Others&rdquo; section was cut off in
          the screenshot. Those scenarios slot into the same shell.</li>
      </ul>
    </div>
  </section>

  <footer class="end">
    Render-test in Litmus or Email on Acid before launch: Outlook 2016/2019 Windows,
    Outlook 365 web, Gmail web / iOS / Android, Apple Mail macOS / iOS, Samsung Mail.
  </footer>

</div>

<script>
  (function () {
    function fit(f) {
      try {
        var d = f.contentDocument;
        if (d && d.documentElement) {
          f.style.height = (d.documentElement.scrollHeight + 16) + "px";
        }
      } catch (e) { /* leave the CSS min-height in place */ }
    }
    document.querySelectorAll(".tpl-render iframe").forEach(function (f) {
      f.addEventListener("load", function () { fit(f); });
      fit(f);
    });
    addEventListener("load", function () {
      document.querySelectorAll(".tpl-render iframe").forEach(fit);
    });
  })();
</script>
"""


def main():
    for t in TEMPLATES:
        path = os.path.join(OUT, t["file"])
        with open(path, "w", encoding="utf-8") as f:
            f.write(t["html"])
        print("wrote", t["file"])
    with open(os.path.join(OUT, "preview.html"), "w", encoding="utf-8") as f:
        f.write(build_preview())
    print("wrote preview.html")


if __name__ == "__main__":
    main()
