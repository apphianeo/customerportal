#!/usr/bin/env python3
"""
Three information-hierarchy alternatives for the same email.

Same words in every one. Only the ranking changes: what is big, what is muted,
what is grouped, and what order it arrives in. Run this, open
emails/variants/index.html, pick one, and it gets applied to all six templates.

Run:  python3 emails/variants.py
Out:  emails/variants/*.html  +  emails/variants/index.html
"""

import os

import build as B
from build import T, link, spacer, code_plate, primary_button, shell

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "variants")
os.makedirs(OUT, exist_ok=True)

BODY = ("We received your request to login to UOI Customer Portal account. Please "
        "enter this One-Time Password (OTP) on the portal login page to proceed.")
VALIDITY = ("Code is valid for the next 3 minutes, after which you will need to "
            "request a new OTP.")
HELP = ("If you need any help, feel free to reach out to our support team "
        + link("here", B.SUPPORT_URL) + ".")
SUBJECT = "{{otp}} is your UOI Customer Portal login code"
PRE = "Code is valid for the next 3 minutes."


def p(text, size=16, color=None, weight=None, top=0):
    color = color or T["text_secondary"]
    lh = "1.5" if size >= 15 else "1.45"
    w = f" font-weight:{weight};" if weight else ""
    return (f"""
              <p style="margin:{top}px 0 0 0; font-family:{T['font']}; font-size:{size}px;
                        line-height:{lh}; color:{color};{w}">{text}</p>""")


def heading(text):
    return (f"""
              <h1 class="h1" style="margin:0; font-family:{T['font']}; font-size:26px;
                        line-height:1.25; font-weight:700; letter-spacing:-0.01em;
                        color:{T['text_primary']};">{text}</h1>""")


def closing(lines, rule=True, size=13):
    """The ceremonial tail: help line and sign-off, ranked below the message."""
    body = "".join(
        f"""
                <p style="margin:{0 if i == 0 else 12}px 0 0 0; font-family:{T['font']};
                          font-size:{size}px; line-height:1.5;
                          color:{T['text_tertiary']};">{t}</p>"""
        for i, t in enumerate(lines))
    border = f"border-top:1px solid {T['border_split']}; padding-top:20px;" if rule else ""
    return f"""
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="{border}">{body}
                  </td>
                </tr>
              </table>"""


SIGNOFF = "Regards,<br />United Overseas Insurance Limited"


# ─────────────────────────────────────────────────────────────────────────────
# A. Descending scale. Same order, same copy. Only the ranking changes.
# ─────────────────────────────────────────────────────────────────────────────
VARIANT_A = shell(SUBJECT, PRE, [
    heading("Your login OTP"),
    spacer(16),
    p("Dear {{first_name}},", 16, T["text_primary"]),
    spacer(12),
    p(BODY),
    spacer(26),
    code_plate("{{otp}}"),
    spacer(14),
    p(VALIDITY, 14, T["text_tertiary"]),
    spacer(26),
    closing([HELP, SIGNOFF]),
])

# ─────────────────────────────────────────────────────────────────────────────
# B. Payload first. The code sits above the explanation, so it lands in the
#    first screenful on a phone. Validity returns to a caption inside the block.
# ─────────────────────────────────────────────────────────────────────────────
VARIANT_B = shell(SUBJECT, PRE, [
    heading("Your login OTP"),
    spacer(16),
    p("Dear {{first_name}},", 16, T["text_primary"]),
    spacer(20),
    f"""
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center"
                      style="background-color:{T['bg_page']}; border-radius:{T['radius']};
                             padding:24px 16px 20px 16px;">
                    <div style="font-family:{T['font']}; font-size:13px; line-height:1.4;
                                color:{T['text_secondary']}; padding-bottom:10px;">Your OTP</div>
                    <div class="code" style="font-family:{T['font']}; font-size:38px; line-height:1.1;
                                font-weight:700; color:{T['text_primary']};
                                letter-spacing:9px; text-indent:9px; white-space:nowrap;">{{{{otp}}}}</div>
                    <div style="font-family:{T['font']}; font-size:12px; line-height:1.4;
                                color:{T['text_tertiary']}; padding-top:12px;">Valid for 3 minutes</div>
                  </td>
                </tr>
              </table>""",
    spacer(22),
    p(BODY, 15),
    spacer(6),
    p("After 3 minutes you will need to request a new OTP.", 15),
    spacer(26),
    closing([HELP, SIGNOFF]),
])

# ─────────────────────────────────────────────────────────────────────────────
# C. Two zones. The card holds the message only. The help line and sign-off move
#    out onto the canvas, so ceremony sits with the other chrome.
# ─────────────────────────────────────────────────────────────────────────────
AFTER_CARD = f"""
          <tr>
            <td class="pad" style="padding:20px 4px 0 4px; font-family:{T['font']};
                       font-size:13px; line-height:1.6; color:{T['text_tertiary']};">
              <p style="margin:0;">{HELP}</p>
              <p style="margin:12px 0 0 0;">{SIGNOFF}</p>
            </td>
          </tr>"""

VARIANT_C = shell(SUBJECT, PRE, [
    heading("Your login OTP"),
    spacer(16),
    p("Dear {{first_name}},", 16, T["text_primary"]),
    spacer(12),
    p(BODY),
    spacer(26),
    code_plate("{{otp}}"),
    spacer(14),
    p(VALIDITY, 14, T["text_tertiary"]),
], after_card=AFTER_CARD)


VARIANTS = [
    ("A", "Descending scale", "variant-a.html", VARIANT_A,
     "Nothing moves and nothing is cut. The four paragraphs after the heading stop "
     "being identical: body stays 16px, the validity line drops to 14px tertiary, and "
     "the help line and sign-off drop to 13px behind a hairline. Spacing groups them "
     "instead of spreading them evenly.",
     "Safest. Keeps the letter intact, fixes only the flatness."),
    ("B", "Payload first", "variant-b.html", VARIANT_B,
     "The OTP block moves above the explanation, so the code is the first thing in "
     "view on a phone rather than the fourth. Validity returns to a caption inside the "
     "block, shortened to three words. The explanation follows at 15px for anyone who "
     "wants it.",
     "Recommended. Fastest to the payload, and the reason the email exists."),
    ("C", "Two zones", "variant-c.html", VARIANT_C,
     "The card holds the message and nothing else. The help line and sign-off move out "
     "onto the canvas, above the legal block, at 13px. Ceremony sits with the other "
     "chrome rather than inside the message.",
     "Biggest visual change. The card gets short and every line in it earns its place."),
]


def build_index():
    cards = []
    for key, name, fname, html, what, verdict in VARIANTS:
        rendered = html.replace("{{otp}}", "946683").replace("{{first_name}}", "Wei Ling")
        cards.append(f"""
      <section class="v">
        <header>
          <span class="key">{key}</span>
          <h2>{name}</h2>
          <p class="what">{what}</p>
          <p class="verdict">{verdict}</p>
        </header>
        <div class="frame"><div class="clip"><iframe
             srcdoc="{rendered.replace('"', '&quot;')}" title="{name}"></iframe></div></div>
      </section>""")

    return f"""<title>Email Hierarchy Options</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap">
<style>
  :root {{
    --ground:#F6F8FC; --surface:#FFFFFF; --ink:#212121; --muted:#6E6E6E;
    --faint:#8D8D8D; --accent:#005EB8; --hairline:#E3E9F2; --rail:#EEF2F8;
    --viewport:#EDF1F7;
    --sans:'Noto Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;
    --mono:'JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,monospace;
  }}
  @media (prefers-color-scheme: dark) {{
    :root:not([data-theme="light"]) {{
      --ground:#0F1621; --surface:#161F2C; --ink:#E6ECF5; --muted:#9AA8BC;
      --faint:#71809A; --accent:#5AA5EE; --hairline:#232F41; --rail:#1B2634;
      --viewport:#0A1018;
    }}
  }}
  :root[data-theme="dark"] {{
    --ground:#0F1621; --surface:#161F2C; --ink:#E6ECF5; --muted:#9AA8BC;
    --faint:#71809A; --accent:#5AA5EE; --hairline:#232F41; --rail:#1B2634;
    --viewport:#0A1018;
  }}
  *{{box-sizing:border-box}}
  body{{margin:0;background:var(--ground);color:var(--ink);font-family:var(--sans);
       font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased}}
  .shell{{max-width:1240px;margin:0 auto;padding:0 32px}}
  header.mast{{padding:80px 0 40px;border-bottom:1px solid var(--hairline)}}
  .eyebrow{{font-family:var(--mono);font-size:12px;font-weight:500;letter-spacing:.14em;
           text-transform:uppercase;color:var(--accent);margin:0 0 20px}}
  h1{{font-size:clamp(2rem,4.5vw,3rem);font-weight:800;letter-spacing:-.03em;
      line-height:1.05;margin:0 0 20px;text-wrap:balance;max-width:20ch}}
  .lede{{font-size:1.15rem;line-height:1.55;color:var(--muted);margin:0;max-width:62ch}}
  .diag{{padding:56px 0;border-bottom:1px solid var(--hairline)}}
  .diag h2{{font-size:1.5rem;font-weight:700;letter-spacing:-.02em;margin:0 0 12px}}
  .diag p{{color:var(--muted);max-width:66ch;margin:0 0 16px}}
  .diag ul{{margin:0;padding:0;list-style:none;display:grid;gap:14px;max-width:66ch}}
  .diag li{{position:relative;padding-left:20px;color:var(--muted)}}
  .diag li::before{{content:"";position:absolute;left:0;top:.62em;width:6px;height:6px;
                   border-radius:50%;background:var(--accent)}}
  .diag strong{{color:var(--ink);font-weight:600}}
  .grid{{padding:56px 0 40px;display:grid;gap:28px;
        grid-template-columns:repeat(auto-fit,minmax(430px,1fr))}}
  .v{{background:var(--surface);border:1px solid var(--hairline);border-radius:12px;
     overflow:hidden;display:flex;flex-direction:column}}
  .v header{{padding:22px 24px;border-bottom:1px solid var(--hairline)}}
  .key{{display:inline-block;font-family:var(--mono);font-size:12px;font-weight:500;
       color:var(--accent);border:1px solid var(--accent);border-radius:999px;
       padding:1px 10px;margin-bottom:12px}}
  .v h2{{font-size:1.15rem;font-weight:700;margin:0 0 10px;letter-spacing:-.01em}}
  .what{{margin:0 0 12px;font-size:13.5px;line-height:1.6;color:var(--muted)}}
  .verdict{{margin:0;font-size:13.5px;line-height:1.6;color:var(--ink);
           border-left:3px solid var(--accent);padding-left:12px}}
  /* The iframe renders at a true 640px and is scaled to fit the column, so all
     three show the desktop layout rather than reflowing to mobile widths. */
  .frame{{background:var(--viewport);height:698px;overflow:hidden;
         display:flex;justify-content:center}}
  .clip{{width:461px;height:698px;overflow:hidden}}
  iframe{{width:640px;height:970px;border:0;display:block;
         transform:scale(.72);transform-origin:top left}}
  @media (max-width:900px){{
    .frame,.clip{{height:auto;width:100%;overflow:visible}}
    iframe{{width:100%;height:1010px;transform:none}}
  }}
  footer.end{{padding:40px 0 80px;color:var(--faint);font-size:13px;
             border-top:1px solid var(--hairline)}}
  a{{color:var(--accent)}}
  :focus-visible{{outline:2px solid var(--accent);outline-offset:3px}}
  @media (max-width:900px){{.shell{{padding:0 20px}}header.mast{{padding:52px 0 32px}}}}
</style>

<div class="shell">
  <header class="mast">
    <p class="eyebrow">Hierarchy options &middot; Login OTP</p>
    <h1>Three ways to rank the same email</h1>
    <p class="lede">Identical words in all three, taken from the templates document.
      What changes is the ranking: what is big, what is muted, what is grouped, and
      what order it arrives in. Pick one and it gets applied to all six templates.</p>
  </header>

  <section class="diag">
    <h2>Why it currently reads heavy</h2>
    <p>Not word count. The email is 60 words in the card. The problem is that
      almost none of them are ranked.</p>
    <ul>
      <li><strong>Four paragraphs in a row at identical treatment.</strong> Body,
        validity, help and sign-off are all 16px in the same grey. Four equal blocks
        read as a wall, so the eye has to process all of them to discover that three
        are minor.</li>
      <li><strong>Even spacing gives no grouping.</strong> Every gap is roughly the
        same, so nothing tells the reader which lines belong together. Proximity is
        the cheapest grouping tool in the box and it is currently unused.</li>
      <li><strong>The payload is fourth in line.</strong> Heading, salutation, then a
        two-line paragraph, and only then the code. On a phone that is most of the
        first screenful spent before the reason for the email.</li>
      <li><strong>Ceremony takes half the card.</strong> Validity, help and sign-off
        are five of the nine lines. They belong in the email; they do not belong at
        the same rank as the message.</li>
    </ul>
  </section>

  <div class="grid">{''.join(cards)}
  </div>

  <footer class="end">
    All three keep the letter format, the copy and the legal block exactly as they
    are. Mixing is fine: B's payload order with C's moved sign-off, for instance.
  </footer>
</div>
"""


def main():
    for _key, _name, fname, html, _what, _v in VARIANTS:
        with open(os.path.join(OUT, fname), "w", encoding="utf-8") as f:
            f.write(html)
        print("wrote", fname)
    with open(os.path.join(OUT, "index.html"), "w", encoding="utf-8") as f:
        f.write(build_index())
    print("wrote index.html")


if __name__ == "__main__":
    main()
