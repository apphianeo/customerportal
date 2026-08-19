#!/usr/bin/env python3
"""
Builds the UOI Connect transactional email templates.

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
SUPPORT_EMAIL = "contactus@uoi.com.sg"
SUPPORT_TEL = "+6562227733"
SUPPORT_TEL_DISPLAY = "(+65) 6222 7733"
COPYRIGHT = ("Copyright © 2026 United Overseas Insurance Limited "
             "Co. Reg. No. 197100152R.")
RIGHTS = "All Rights Reserved."

# Replace with the absolute HTTPS URL you host the logo at before sending.
LOGO_URL = "https://www.uoi.com.sg/email/uoi-logo.png"


# ─────────────────────────────────────────────────────────────────────────────
# Components — email-HTML ports of the portal's React components
# ─────────────────────────────────────────────────────────────────────────────

def code_plate(code, expiry):
    """OTP display.

    Ports the portal's OTP digit box (AuthUI.tsx: white surface, 1px
    rgba(0,0,0,0.09) border, 8px radius, 20px #212121, centred) to a single
    plate. Deliberately ONE contiguous string rather than six separate boxes:
    split cells would break tap-to-copy and iOS/Android one-time-code autofill.
    Wide tracking restores the read-as-separate-digits feel.
    """
    return f"""
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                     style="border-collapse:separate;">
                <tr>
                  <td align="center"
                      style="background-color:{T['bg_white']}; border:1px solid {T['border']};
                             border-radius:{T['radius']}; padding:20px 16px 16px 16px;">
                    <div style="font-family:{T['font']}; font-size:34px; line-height:1.2;
                                font-weight:600; color:{T['text_primary']};
                                letter-spacing:8px; text-indent:8px; white-space:nowrap;">{code}</div>
                    <div style="font-family:{T['font']}; font-size:12px; line-height:1.4;
                                color:{T['text_tertiary']}; padding-top:10px;">{expiry}</div>
                  </td>
                </tr>
              </table>"""


def primary_button(label, url):
    """Ports PrimaryButton (AuthUI.tsx): #005EB8, white, 8px radius,
    12px/24px padding, 16px/1.5, weight 500. VML fallback for Outlook."""
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
    """Ports the portal's notice/toast surface (AuthUI.tsx SuccessToast):
    tinted background, 8px radius, 16px/12px padding."""
    bg = T["bg_info"] if tone == "info" else T["bg_caution"]
    return f"""
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background-color:{bg}; border-radius:{T['radius']};
                             padding:12px 16px; font-family:{T['font']}; font-size:14px;
                             line-height:1.5; color:{T['text_primary']};">{body}</td>
                </tr>
              </table>"""


def para(text, size=16, color=None, top=0):
    color = color or T["text_primary"]
    lh = "1.5" if size >= 16 else "1.4"
    return (f"""
              <p style="margin:{top}px 0 0 0; font-family:{T['font']}; font-size:{size}px;
                        line-height:{lh}; color:{color};">{text}</p>""")


def link(text, url):
    return (f'<a href="{url}" style="color:{T["text_link"]}; text-decoration:underline;">'
            f'{text}</a>')


# ─────────────────────────────────────────────────────────────────────────────
# Shell
# ─────────────────────────────────────────────────────────────────────────────

def shell(title, preheader, blocks):
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
    /* Stop iOS auto-linking phone numbers/dates into blue system links */
    a[x-apple-data-detectors] {{ color:inherit !important; text-decoration:none !important;
                                 font-size:inherit !important; font-weight:inherit !important; }}

    @media screen and (max-width:600px) {{
      .wrap    {{ width:100% !important; }}
      .pad     {{ padding-left:20px !important; padding-right:20px !important; }}
      .h1      {{ font-size:20px !important; }}   /* portal --font-size-h2-mob step */
      .code    {{ font-size:28px !important; letter-spacing:6px !important; text-indent:6px !important; }}
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
      <td align="center" style="padding:32px 12px;">

        <table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" border="0"
               style="width:600px; max-width:600px;">

          <!-- Masthead: logo on the page canvas, above the card -->
          <tr>
            <td class="pad" style="padding:0 32px 16px 32px;">
              <img src="{LOGO_URL}" width="100" height="51" alt="UOI"
                   style="display:block; width:100px; height:51px; font-family:{T['font']};
                          font-size:20px; font-weight:700; color:{T['primary']};" />
            </td>
          </tr>

          <!-- Card: portal surface — white, 8px radius, 1px hairline border -->
          <tr>
            <td style="background-color:{T['bg_white']}; border:1px solid {T['border']};
                       border-radius:{T['radius']};">

              <!-- Brand rule: the portal's primary blue, doing the job the stock photo used to -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background-color:{T['primary']}; height:4px; line-height:4px;
                             font-size:0; border-radius:{T['radius']} {T['radius']} 0 0;">&nbsp;</td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td class="pad" style="padding:32px;">
{body}
                  </td>
                </tr>
              </table>

              <!-- Anti-phishing strip: the one line that makes this email hard to fake -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td class="pad" style="background-color:{T['bg_page']}; padding:16px 32px;
                             border-top:1px solid {T['border_split']};
                             border-radius:0 0 {T['radius']} {T['radius']};
                             font-family:{T['font']}; font-size:12px; line-height:1.5;
                             color:{T['text_secondary']};">
                    <strong style="color:{T['text_primary']};">UOI will never ask you</strong>
                    for your OTP, password or card details by phone, email or SMS.
                    If someone does, hang up and call us at
                    <a href="tel:{SUPPORT_TEL}" style="color:{T['text_secondary']};">{SUPPORT_TEL_DISPLAY}</a>.
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Help -->
          <tr>
            <td class="pad" align="center" style="padding:24px 32px 0 32px; font-family:{T['font']};
                       font-size:14px; line-height:1.5; color:{T['text_secondary']};">
              Need help? Email {link(SUPPORT_EMAIL, 'mailto:' + SUPPORT_EMAIL)}
              or call {link(SUPPORT_TEL_DISPLAY, 'tel:' + SUPPORT_TEL)}.
            </td>
          </tr>

          <!-- Legal — compressed from 6 paragraphs to 2 lines -->
          <tr>
            <td class="pad" align="center" style="padding:16px 32px 0 32px; font-family:{T['font']};
                       font-size:11px; line-height:1.5; color:{T['text_tertiary']};">
              This is an automated message — please do not reply.
              This email and any attachment are confidential and intended only for the named
              recipient. If it reached you in error, please delete it and notify us.
              <br /><br />
              <a href="{UOI_URL}" style="color:{T['text_tertiary']};">uoi.com.sg</a> &nbsp;&middot;&nbsp;
              <a href="{PRIVACY_URL}" style="color:{T['text_tertiary']};">Privacy Notice</a> &nbsp;&middot;&nbsp;
              <a href="{TERMS_URL}" style="color:{T['text_tertiary']};">Important Information</a>
            </td>
          </tr>

          <tr><td style="height:16px; line-height:16px; font-size:0;">&nbsp;</td></tr>

          <!-- Footer bar — ports FooterShort.tsx: primary blue, 12px white -->
          <tr>
            <td class="pad" align="center"
                style="background-color:{T['primary']}; border-radius:{T['radius']};
                       padding:12px 24px; font-family:{T['font']};
                       font-size:12px; line-height:1.5; color:#FFFFFF;">
              {COPYRIGHT} {RIGHTS}
            </td>
          </tr>
          <tr><td style="height:24px; line-height:24px; font-size:0;">&nbsp;</td></tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
"""


def heading(text):
    return (f"""
              <h1 class="h1" style="margin:0; font-family:{T['font']}; font-size:24px;
                        line-height:1.2; font-weight:600; color:{T['text_primary']};">{text}</h1>""")


def spacer(h):
    return f'\n              <div style="height:{h}px; line-height:{h}px; font-size:0;">&nbsp;</div>'


# ─────────────────────────────────────────────────────────────────────────────
# Templates
# ─────────────────────────────────────────────────────────────────────────────

CHANGE_PW_URL = "{{change_password_url}}"
RESET_URL = "{{reset_url}}"

TEMPLATES = []


def add(filename, subject, preheader, title, blocks, notes):
    TEMPLATES.append({
        "file": filename, "subject": subject, "preheader": preheader,
        "title": title, "html": shell(title, preheader, blocks), "notes": notes,
    })


# 1 — Login OTP
add(
    "01-login-otp.html",
    "{{otp_code}} is your UOI Connect login code",
    "Expires in 3 minutes. UOI will never ask you for this code.",
    "Your UOI Connect login code",
    [
        heading("Your login code"),
        para("Hi {{first_name}}, enter this code to finish signing in to UOI Connect.",
             16, T["text_secondary"], 12),
        spacer(24),
        code_plate("{{otp_code}}", "Expires in 3 minutes"),
        spacer(24),
        notice(
            "<strong>Didn't try to sign in?</strong> Someone may know your password. "
            f'{link("Change it now", CHANGE_PW_URL)}.', "caution"),
    ],
    "Code in the subject line so it is readable from the notification without opening the email.",
)

# 2 — Forgot password → reset link
add(
    "02-forgot-password-reset.html",
    "Reset your UOI Connect password",
    "Your reset link expires in 30 minutes.",
    "Reset your UOI Connect password",
    [
        heading("Reset your password"),
        para("Hi {{first_name}}, we received a request to reset the password for "
             "<strong style=\"color:%s;\">{{login_id}}</strong>." % T["text_primary"],
             16, T["text_secondary"], 12),
        spacer(24),
        f'<div class="btn">{primary_button("Reset password", RESET_URL)}</div>',
        spacer(20),
        para("This link expires in 30 minutes and can be used once.",
             14, T["text_tertiary"]),
        spacer(24),
        notice("<strong>Didn't request this?</strong> Ignore this email — your password "
               "stays exactly as it is, and no one can reset it without this link.", "info"),
        spacer(24),
        para('Button not working? Paste this into your browser:<br />'
             f'<span style="color:{T["text_link"]}; word-break:break-all;">{RESET_URL}</span>',
             12, T["text_tertiary"]),
    ],
    "Link, not a code — a reset is a click-through, so don't make the user retype anything.",
)

# 3 — Manual account registration OTP
add(
    "03-registration-otp.html",
    "{{otp_code}} is your UOI Connect verification code",
    "Verify your email to finish creating your account.",
    "Verify your email address",
    [
        heading("Verify your email address"),
        para("Welcome to UOI Connect. Enter this code to confirm "
             "<strong style=\"color:%s;\">{{login_id}}</strong> and finish setting up "
             "your account." % T["text_primary"], 16, T["text_secondary"], 12),
        spacer(24),
        code_plate("{{otp_code}}", "Expires in 3 minutes"),
        spacer(24),
        notice("Once verified you can view your policies, download documents and "
               "file a claim — all in one place.", "info"),
        spacer(24),
        para("If you didn't sign up for UOI Connect, you can safely ignore this email. "
             "No account will be created.", 14, T["text_tertiary"]),
    ],
    "Reassures rather than warns — a stranger receiving this has nothing at risk yet.",
)

# 4 — Change Login ID OTP
add(
    "04-change-login-id-otp.html",
    "{{otp_code}} is your code to confirm your new login ID",
    "Confirm your new UOI Connect login ID. Expires in 3 minutes.",
    "Confirm your new login ID",
    [
        heading("Confirm your new login ID"),
        para("Hi {{first_name}}, you asked to change the email you sign in with from "
             "<strong style=\"color:%s;\">{{old_login_id}}</strong> to "
             "<strong style=\"color:%s;\">{{new_login_id}}</strong>."
             % (T["text_primary"], T["text_primary"]), 16, T["text_secondary"], 12),
        spacer(24),
        code_plate("{{otp_code}}", "Expires in 3 minutes"),
        spacer(24),
        notice("<strong>Didn't request this change?</strong> Your account may be at risk. "
               f'Call us now at {link(SUPPORT_TEL_DISPLAY, "tel:" + SUPPORT_TEL)} — '
               "don't enter the code above.", "caution"),
        spacer(24),
        para("Until the change is confirmed, keep signing in with your current login ID. "
             "We've also notified your previous address.", 14, T["text_tertiary"]),
    ],
    "The highest-risk email of the four — states both addresses so a hijack is obvious on sight.",
)


# ─────────────────────────────────────────────────────────────────────────────
# Preview page
# ─────────────────────────────────────────────────────────────────────────────

# Sample values so the preview reads as a real email rather than a template
SAMPLE = {
    "{{first_name}}": "Wei Ling",
    "{{otp_code}}": "946683",
    "{{login_id}}": "weiling.tan@gmail.com",
    "{{old_login_id}}": "weiling.tan@gmail.com",
    "{{new_login_id}}": "wl.tan@outlook.sg",
    "{{reset_url}}": "https://connect.uoi.com.sg/reset?t=a7f3c2e9",
    "{{change_password_url}}": "https://connect.uoi.com.sg/account/password",
}


def build_preview():
    import base64
    with open(os.path.join(OUT, "assets", "uoi-logo.png"), "rb") as f:
        logo_data = "data:image/png;base64," + base64.b64encode(f.read()).decode()

    cards = []
    for t in TEMPLATES:
        rendered = t["html"].replace(LOGO_URL, logo_data)
        for k, v in SAMPLE.items():
            rendered = rendered.replace(k, v)
        subject = t["subject"]
        for k, v in SAMPLE.items():
            subject = subject.replace(k, v)
        t = {**t, "subject": subject}
        # Each template sits in an iframe srcdoc, so quotes must be entity-escaped
        inner = rendered.replace('"', "&quot;")
        cards.append(f"""
    <section class="tpl">
      <header>
        <h2>{t['title']}</h2>
        <dl>
          <dt>File</dt><dd><code>{t['file']}</code></dd>
          <dt>Subject</dt><dd><code>{t['subject']}</code></dd>
          <dt>Preheader</dt><dd>{t['preheader']}</dd>
        </dl>
        <p class="note">{t['notes']}</p>
      </header>
      <div class="frame"><iframe srcdoc="{inner}" title="{t['title']}"></iframe></div>
    </section>""")

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>UOI Connect email templates</title>
<style>
  :root {{ color-scheme: light; }}
  * {{ box-sizing: border-box; }}
  body {{ margin:0; background:{T['bg_page']}; color:{T['text_primary']};
         font-family:'Noto Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif; }}
  .page {{ max-width:1400px; margin:0 auto; padding:48px 24px 80px; }}
  h1 {{ font-size:32px; line-height:1.2; margin:0 0 8px; }}
  .lede {{ font-size:16px; line-height:1.5; color:{T['text_secondary']};
          margin:0 0 48px; max-width:60ch; }}
  .grid {{ display:grid; gap:32px; grid-template-columns:repeat(auto-fit,minmax(420px,1fr)); }}
  .tpl {{ background:#fff; border:1px solid {T['border']}; border-radius:8px; overflow:hidden; }}
  .tpl header {{ padding:20px 24px; border-bottom:1px solid {T['border_split']}; }}
  .tpl h2 {{ font-size:18px; margin:0 0 12px; }}
  dl {{ display:grid; grid-template-columns:88px 1fr; gap:4px 12px; margin:0 0 12px;
       font-size:13px; line-height:1.5; }}
  dt {{ color:{T['text_tertiary']}; }}
  dd {{ margin:0; color:{T['text_secondary']}; }}
  code {{ font-family:ui-monospace,SFMono-Regular,Menlo,monospace; font-size:12px;
         background:{T['bg_page']}; padding:1px 5px; border-radius:4px;
         color:{T['text_primary']}; }}
  .note {{ margin:0; font-size:13px; line-height:1.5; color:{T['text_secondary']};
          border-left:3px solid {T['primary']}; padding-left:12px; }}
  .frame {{ background:{T['bg_page']}; }}
  iframe {{ width:100%; height:790px; border:0; display:block; }}
</style>
</head>
<body>
  <div class="page">
    <h1>UOI Connect email templates</h1>
    <p class="lede">Four transactional templates built from the customer portal's own design
    system — same tokens, same button, same card, same footer. Rendered live below at 600px.</p>
    <div class="grid">{''.join(cards)}
    </div>
  </div>
</body>
</html>
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
