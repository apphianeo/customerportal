#!/usr/bin/env python3
"""
Builds emails/confluence.md: the copy for all eleven templates, extracted from
the generated HTML so it can never drift from what actually ships.

Paste it into Confluence. The Cloud editor converts pasted Markdown into real
headings, tables and formatting, so this arrives editable rather than as a wall
of text. Attach the matching .html file to each section.

Run:  python3 emails/confluence.py
Out:  emails/confluence.md
"""

import io
import os
import re
from html.parser import HTMLParser

import build as B

OUT = os.path.dirname(os.path.abspath(__file__))


class Extract(HTMLParser):
    """Pulls visible text out of the card, keeping block breaks, bold and links."""

    def __init__(self):
        super().__init__()
        self.parts = []
        self.skip = 0
        self.href = None

    def handle_starttag(self, tag, attrs):
        if tag in ("style", "head", "title"):
            self.skip += 1
        if tag in ("p", "h1", "div", "tr", "br"):
            self.parts.append("\n")
        if tag == "strong":
            self.parts.append("**")
        if tag == "a":
            self.href = dict(attrs).get("href", "")
            self.parts.append("[")

    def handle_endtag(self, tag):
        if tag in ("style", "head", "title"):
            self.skip = max(0, self.skip - 1)
        if tag in ("p", "h1", "div", "tr"):
            self.parts.append("\n")
        if tag == "strong":
            self.parts.append("**")
        if tag == "a":
            self.parts.append("]")
            self.href = None

    def handle_data(self, data):
        if not self.skip:
            self.parts.append(data)


def body_lines(path):
    html = io.open(path, encoding="utf-8").read()
    card = html[html.index('padding:36px 32px 32px 32px;">'):html.index("<!-- Legal")]
    p = Extract()
    p.feed(card)
    lines = [re.sub(r"\s+", " ", l).strip() for l in "".join(p.parts).split("\n")]
    lines = [l for l in lines
             if l and l != "&nbsp;" and "padding:36px" not in l]
    # The code block extracts as a label line then the code; the document writes
    # it as one line, so join them back.
    out = []
    skip = False
    for i, l in enumerate(lines):
        if skip:
            skip = False
            continue
        if l == "Your OTP" and i + 1 < len(lines):
            out.append(f"Your OTP: {lines[i + 1]}")
            skip = True
        else:
            out.append(l)
    return out


LEGAL = """This is an automatically generated email, please do not reply.

Visit [United Overseas Insurance Limited (UOI)] to learn more about our privacy
and security notice.

Copyright © 2026 United Overseas Insurance Limited Co Reg. No. 197100152R. All
Rights Reserved.

**UOI EMAIL DISCLAIMER**

Any person receiving this email and any attachment(s) contained, shall treat the
information as confidential and not misuse, copy, disclose, distribute or retain
the information in any way that amounts to a breach of confidentiality. If you
are not the intended recipient, please delete all copies of this email from your
computer system. As the integrity of this message cannot be guaranteed, neither
UOI nor any entity in the UOB Group shall be responsible for the contents. Any
opinion in this email may not necessarily represent the opinion of UOI or any
entity in the UOB Group."""


def main():
    out = ["""# UOI Customer Portal, email templates

Eleven transactional emails. Copy below is extracted from the built HTML files,
so this page and the templates cannot drift apart.

**How to read this.** `{{fields}}` are merge fields, replaced at send time.
`[square brackets]` mark link text; destinations are listed under each email.
Every email closes with the same footer, given once at the bottom rather than
repeated eleven times.

**Files.** Attach the matching `.html` to each section. Rendered PNGs are in
`emails/previews/`.

---
"""]

    section = None
    for n, t in enumerate(B.TEMPLATES, start=1):
        if t["section"] != section:
            section = t["section"]
            out.append(f"\n## {section}\n")

        lines = body_lines(os.path.join(OUT, t["file"]))
        body = "\n\n".join(lines)

        links = []
        html = io.open(os.path.join(OUT, t["file"]), encoding="utf-8").read()
        for href, text in re.findall(r'<a href="([^"]+)"[^>]*>(.*?)</a>', html, re.S):
            text = re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", text)).strip()
            href = href.replace("&amp;", "&")
            if (text and href != B.UOI_URL          # footer link, documented once
                    and (text, href) not in links):
                links.append((text, href))
        btn = re.search(r'padding:12px 32px;\s*border-radius:[^"]*">([^<]+)</a>', html)

        out.append(f"""### {n}. {t['item']}

| | |
|---|---|
| **File** | `{t['file']}` |
| **Subject** | {t['subject']} |
| **Preheader** | {t['preheader']} |

{body}
""")
        if btn:
            out.append(f"**Button:** {btn.group(1).strip()}\n")
        if links:
            rows = "\n".join(f"| {a} | `{b}` |" for a, b in links)
            out.append(f"""**Links**

| Text | Destination |
|---|---|
{rows}
""")
        out.append("---\n")

    fields = {}
    for t in B.TEMPLATES:
        for f in sorted(set(re.findall(r"\{\{[a-z_]+\}\}",
                                       io.open(os.path.join(OUT, t["file"]),
                                               encoding="utf-8").read()))):
            fields.setdefault(f, []).append(str(B.TEMPLATES.index(t) + 1))
    field_rows = "\n".join(f"| `{f}` | {', '.join(ns)} |"
                           for f, ns in sorted(fields.items()))

    out.append(f"""
## Footer, on all eleven

{LEGAL}

---

## Merge fields

| Field | Used in |
|---|---|
{field_rows}

Not merge fields, but constants set once in the template build:

| Constant | Value |
|---|---|
| Support link (`here`) | `{B.SUPPORT_URL}` |
| Portal link (button) | `{B.PORTAL_URL}` |
| Privacy link | `{B.UOI_URL}` |
""")

    with open(os.path.join(OUT, "confluence.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(out))
    print("wrote confluence.md")


if __name__ == "__main__":
    main()
