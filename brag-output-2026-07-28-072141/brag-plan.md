# Brag Plan: UOIConnect

## What is this app?
UOIConnect is United Overseas Insurance's intermediary portal — the tool brokers and agents log into to quote UOI products, retrieve their quotations, and query policies and claims, all in one place.

## Source material
A 115s screen recording of the live UAT environment (`uoi-uatx.unqork.io/app/uoiconnect`), supplied by the user. The host is unreachable from this environment, so the recording is the only source; nothing was captured live.

**Excluded from the video for safety** (see `composition-brief.md` for the full ledger):
- The OTP screen (~26–40s) — carries a live one-time code, the account email, and an Outlook desktop notification bleeding into frame.
- Admin → Schemes & Commissions (~108–115s) — commission rates, scheme codes, and the office address. Commercially sensitive.
- The quote form's Referrals section (~78s) — the `Subcode` field renders the account code and name.
- The persistent header on every logged-in screen — every clip is cropped below y=100 in the source, so the account name and intermediary code never enter frame. No redaction bars were needed; the crop does it.

## The angle
Broker portals are usually a stack of disconnected systems — one place to quote, another to look up a policy, a phone call for claims. UOIConnect is the argument that it's one tab. The video is a straight feature walk: four real screens, each captioned with what it does, in the order a broker actually uses them.

No hype, no invented metrics. The product's own nav is the storyboard.

## Hook (first 2-3 seconds)
Clean brand field, the UOI mark, then the product name landing with the triad taken straight from the nav tabs (Quote, Policy Query, Claims Query):

> **UOIConnect**
> **Quote. Policy. Claims.**

The hook is the promise; the next four scenes are the receipts.

## Key moments (the middle)
- **The product catalogue, scrolling** — six personal lines (UniTravel, UniCar, UniPA, UniHome, InsureHome, UniHelper) each with a photo, a description, and a **Get a Quote** button sitting right there. Real footage of a real broker scrolling it.
- **Product selection, switching live** — the quote flow's Travel / Motor / Personal Accident selector, actually being switched from Travel to Motor on camera.
- **Policy Query with both tabs** — *My Quotations*, *My Policies* and *My Renewals*, with the search row and Advance Search / Clear Search. This is the "where did my quote go" problem, solved.
- **Claims Search** — search by name, claim ref, or policy number, straight from the same portal.

## Outro / punchline
Return to the brand field: UOI mark, **UOIConnect**, and the same triad that opened it — **Quote. Policy. Claims.** The bookend is the point: everything shown in between lives behind one login.

## User flow worth showing
Entry → key action → result:
1. Products & Downloads — find the product
2. Quote — pick Travel / Motor / Personal Accident and start
3. Policy Query — retrieve the quotation later
4. Claims Query — search a claim by name, ref, or policy no.

## Tone
- Preset: `app-store`
- Creative direction: clean B2B feature walk — the portal's own nav, one screen per claim
- Interpretation: 6 scenes, 2.7–4.3s each. Full-bleed real footage under a solid brand caption bar. Smooth reveals, no zoom-punches, no dramatics. Each caption states plainly what the screen does and gets out of the way. The footage does the arguing.
- **Tone was inferred, not specified** — the user supplied only the recording. `app-store` fits a B2B intermediary portal better than the `cinematic` treatment used for the customer portal. Easy to re-roll.

## Format: landscape — 1920x1080
## Duration: 22.37s

## Visual identity (from the product)
- Brand blue: `#005EB8` (the portal's primary — nav active state, buttons, footer band)
- Background: `#F6F8FC` for brand fields
- Text: `#212121` primary, `#6E6E6E` secondary; white on the blue caption bar
- Accent: the portal's magenta→violet quote CTA gradient appears in-footage only; not used in chrome
- Display font: Noto Sans 700
- Body font: Noto Sans 400/500
- Strongest visual element: the six product cards with photography, and the blue active nav tab that anchors every screen

## Share copy (draft)
UOIConnect — the UOI intermediary portal. Quote any product, retrieve your quotations, and search policies and claims from one login.

## Audio direction
- Role: light corporate bed, sitting under a sparse UI-accent layer
- Music: `happy-beats-business-moves-vol-10-by-ende-dot-app.mp3` (bundled; ~110 BPM, 60s)
- Music treatment: start at 0, fade in ~0.6s, baseline gain ~0.28, fade out over the final ~1.3s. This is the one tone in the set where the bundled library's upbeat-corporate character is actually right rather than a compromise.
- Music cue guidance: preset cue file read (110 BPM, beat grid ≈0.545s). **Every scene boundary sits on a beat, and three land on strong cues:** 15.82s (policy → claims), 18.55s (claims → end card), 22.37s (final beat). Earlier cuts at 3.55s, 7.79s and 12.02s are ordinary beat-grid points.
- Audio-reactive treatment: none. A feature walk shouldn't pulse.
- SFX posture: sparse. One soft UI click per scene transition — matching the fact that each cut *is* a navigation action in the portal — and one warmer accent on the end card. Nothing else.
- Audio-coupled moments: the five scene cuts; the end-card landing.
- Restraint rule: no risers, no whooshes, no impacts. This is a product tour, not a trailer. If a sound doesn't correspond to a tab change, it doesn't belong.

## Storyboard

### Scene 1 — Hook / brand field — 3.55s (0 → 3.55)
Full-bleed `#F6F8FC`. UOI mark fades up centred at ~0.25s. **UOIConnect** lands beneath it at ~0.82s (beat), then a thin `#005EB8` rule draws, then **Quote. Policy. Claims.** at ~1.90s (beat). All three hold to the cut.
Sequential/interaction: yes — logo, wordmark, rule, triad in sequence, each holding ≥1.6s settled.
Audio intent: calm, professional open; the bed establishes without announcing.
Audio-coupled idea: none — the open should be clean.
Music: fade in over ~0.6s, low.
Transition mood: smooth wipe → Scene 2

### Scene 2 — Products & Downloads — 4.24s (3.55 → 7.79)
Real footage (`assets/video/products.mp4`, cut from 45.20s): the Personal tab's product grid, scrolling. Six cards with photography — UniTravel, UniCar, UniPA, UniHome, InsureHome, UniHelper — each with **Product Details** and **Get a Quote**. Caption bar: eyebrow **PRODUCTS & DOWNLOADS**, lead *Every product, quote-ready*.
Sequential/interaction: yes — captured scroll through the grid; this is a real user moving, not a pan we added.
Audio intent: steady; the bed carries.
Audio-coupled idea: one soft click on the cut in.
Music: unchanged.
Transition mood: smooth wipe → Scene 3

### Scene 3 — Get a quote — 4.23s (7.79 → 12.02)
Real footage (`quote.mp4`, cut from 68.00s): the quote flow's **Product Selection** — Travel, Motor, Personal Accident — being switched from Travel to Motor on camera, with *Choose product under…* updating beneath. Caption bar: **GET A QUOTE**, lead *Travel, Motor, Personal Accident*.
Sequential/interaction: yes — a real selector change captured live.
Audio intent: unchanged; one accent marks the navigation.
Audio-coupled idea: soft click on the cut.
Music: unchanged.
Transition mood: smooth wipe → Scene 4

### Scene 4 — Policy Query — 3.80s (12.02 → 15.82)
Real footage (`policy.mp4`, cut from 92.00s): **My Quotations** / **My Policies** / **My Renewals** tabs, the search field (*Search by Name or Proposal No*), and **Advance Search** / **Clear Search**; the tab switches on camera. Caption bar: **POLICY QUERY**, lead *My Quotations. My Policies. My Renewals.*
Sequential/interaction: yes — captured tab switch.
Audio intent: steady.
Audio-coupled idea: soft click on the cut.
Music: unchanged.
Transition mood: smooth wipe on strong cue 15.82s → Scene 5

### Scene 5 — Claims Search — 2.73s (15.82 → 18.55)
Real footage (`claims.mp4`, cut from 102.20s): **Claims Search** with the UOI claims line and email, the search field reading *Search by Name or Claim Ref No. or Policy No*, plus **Advance Search**. Caption bar: **CLAIMS QUERY**, lead *By name, claim ref, or policy no.*
Sequential/interaction: none — the shortest scene; it states one capability and moves.
Audio intent: steady, slightly lighter as the walk resolves.
Audio-coupled idea: soft click on the cut.
Music: unchanged.
Transition mood: smooth wipe on strong cue 18.55s → Scene 6

### Scene 6 — End card — 3.82s (18.55 → 22.37)
Back to `#F6F8FC`. UOI mark, **UOIConnect**, the `#005EB8` rule, and **Quote. Policy. Claims.** — the same lockup that opened the film, now as the close. Holds to the final beat.
Sequential/interaction: yes — logo, wordmark, rule, triad, in the same order as Scene 1.
Audio intent: resolve; the bed thins and settles.
Audio-coupled idea: one warmer accent as the wordmark lands.
Music: fade out over the final ~1.3s.
Transition mood: smooth fade → end

**Music mood for this video:** upbeat-corporate (app-store — the one tone where this library is the right choice, not a compromise)
**Audio summary:** A light corporate bed runs the full 22.4s under five soft UI clicks — one per scene cut, each standing in for the tab change it represents — plus one warmer accent on the end card, with the last three cuts landing on strong beats and the bed fading under the closing lockup.
