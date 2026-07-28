# Hyperframes Composition Brief: UOIConnect

## Objective
Create a short, app-store-style feature walk for UOIConnect, the UOI intermediary portal, built from real screen-recording footage.

## Output
- Composition directory: `brag-output-2026-07-28-072141/composition/`
- Rendered video: `brag-output-2026-07-28-072141/brag.mp4`
- Format: landscape — 1920x1080
- Duration: 22.37s

## Source Material
- Source: a 115s screen recording of `uoi-uatx.unqork.io/app/uoiconnect` (UAT), supplied by the user as a zip. The host is blocked by this environment's network policy, so nothing was captured live.
- Product name: UOIConnect (United Overseas Insurance intermediary portal)
- Strongest claim: the portal's own nav — Quote, Policy Query, Claims Query — behind one login
- Key UI moments used: the Personal product grid, the quote Product Selection, Policy Query's My Quotations / My Policies / My Renewals, and Claims Search
- Copy that must appear verbatim (all read off the product):
  - PRODUCTS & DOWNLOADS
  - GET A QUOTE
  - POLICY QUERY
  - CLAIMS QUERY
  - My Quotations. My Policies. My Renewals.
  - Travel, Motor, Personal Accident

## Redaction ledger (binding)

Everything below was **excluded by cropping or by not using the segment at all**. No frame of the render may contain any of it.

| Item | Where in the source | Why | How handled |
|---|---|---|---|
| Live OTP `946683` + account email | ~26–40s | A one-time code and an account identifier on screen | Segment not used at all |
| Outlook desktop notification | ~33–40s | Desktop bleed-through; unprofessional and shows mail content | Segment not used at all |
| `Good day, Apphia SuperUser (A2026027)` header | Every logged-in screen, y≈0–75 | Account name + intermediary code | Every clip cropped from y=100 down, so it is outside frame |
| Schemes & Commissions (Comm Rate 20%, codes 46AF/46AI/46SF/46SI) | ~108–115s | Commercially sensitive commission terms | Segment not used at all |
| Office address (Margaret Drive 36, #28-09, 140036) | ~110–115s | Business address | Segment not used at all |
| Quote form `Subcode: A2026027 Apphia SuperUser` | ~78s | Account code + name | Segment not used; quote scene uses the Product Selection screens instead |
| Login screen with prefilled email | ~0–25s | Account identifier | Segment not used at all |

Source clips were cut with `crop=1296:729:97:100` from the 1908x906 recording, then scaled to 1920x1080 (1.48x). The crop origin at y=100 is what removes the account header; it also keeps the nav tabs in frame, which anchor every screen.

Claims Search returned **No Records Found**, so no client names, claim IDs or policy numbers appear anywhere in the footage.

## Creative Direction
- Tone preset: `app-store`
- Creative direction: clean B2B feature walk — the portal's own nav, one screen per claim
- Interpretation: 6 scenes, 2.7–4.3s. Full-bleed real footage under a solid `#005EB8` caption bar. Smooth reveals, no zoom-punches. Captions state what the screen does and get out of the way.
- Angle: broker portals are usually several disconnected systems; UOIConnect is the argument that it's one tab. Four real screens, in the order a broker uses them.
- Hook: UOI mark → **UOIConnect** → **Quote. Policy. Claims.**
- Outro / punchline: the identical lockup as a bookend
- Avoid:
  - Generic SaaS language
  - Abstract filler visuals
  - Invented metrics or claims about volume, speed, or adoption
  - Any frame containing the redaction-ledger items above

## Visual Identity
- Brand blue: `#005EB8` (caption bar, rule, nav active state in footage)
- Background: `#F6F8FC` (brand fields, scenes 1 and 6)
- Text: `#212121` primary, `#6E6E6E` secondary; white on the blue bar
- Display font: Noto Sans 700; Body: Noto Sans 400/500 (bundled locally at `assets/fonts/NotoSans.woff2`)
- Visual references: the six product cards with photography; the blue active nav tab; the UOI mark

## Storyboard
Use the storyboard in `brag-plan.md` as the creative contract.

Scene summary:
1. Hook / brand field — 3.55s — logo, UOIConnect, rule, "Quote. Policy. Claims."
2. Products & Downloads — 4.24s — real scroll through the six-card Personal grid
3. Get a quote — 4.23s — Product Selection switching Travel → Motor on camera
4. Policy Query — 3.80s — My Quotations / My Policies / My Renewals, search, tab switch
5. Claims Search — 2.73s — search by name, claim ref, or policy no.
6. End card — 3.82s — the opening lockup as a bookend

## Audio
- Audio role: light corporate bed under a sparse UI-accent layer
- Audio arc: fade in under the hook → steady through the four feature scenes → thin and fade under the end card
- Music: `assets/music/bed.mp3` (`happy-beats-business-moves-vol-10`, ~110 BPM). This is the one tone in this set where the bundled library's upbeat-corporate character is the right choice rather than a compromise.
- Music treatment: start 0, fade in ~0.6s, baseline gain ~0.28, fade out over the final ~1.3s
- Music cue guidance: bundled preset (110 BPM, beat grid ≈0.545s). Scene boundaries at 3.55 / 7.79 / 12.02 (beat grid) and **15.82 / 18.55 / 22.37 (strong cues — three locks)**.
- Audio-reactive treatment: none
- Audio-coupled moments:
  - Scene cuts at 3.55, 7.79, 12.02, 15.82, 18.55 — one soft UI click each, standing in for the tab change the cut represents
  - End-card wordmark landing — one warmer accent
- SFX selection guidance: sparse, low high-frequency risk (clicks repeat five times). Chosen:
  - `sfx/click.ogg` (`ui/click2`, 0.06s, balanced, low HF risk) — scene cuts
  - `sfx/accent.ogg` (`impact/impactSoft_medium_001`, 0.18s, warm, low HF risk) — end card
- Audio files: copied into `composition/assets/music/` and `composition/assets/sfx/`

## Hyperframes Instructions
Built against `hyperframes-core` (composition contract, `data-*` timing, video/audio media rules), `hyperframes-animation`, `hyperframes-creative`, `hyperframes-keyframes`, `hyperframes-cli`. This is the `/brag` workflow, not the `hyperframes` entry-point interview.

Requirements:
- Show real UI from the product — four real footage clips carry scenes 2–5.
- `<video>` elements must be muted and inline; the framework owns playback (no `.play()` calls).
- Keep all text readable: ~0.8s settled for short labels, ~0.3s/word for sentences. Scene 5 is the tightest at 2.73s and carries a six-word lead.
- Total duration 22.37s (within 15–25s).
- Include the music bed and the five-click SFX layer.
- Beat-lock the last three scene boundaries to strong cues within ±0.15s.
- GSAP and Noto Sans are vendored locally — this environment has no CDN access and render-time network fetches are banned by the determinism contract.
- Run `npx hyperframes check` before render — brag's single gate.
