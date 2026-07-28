# Hyperframes Composition Brief: UOI Customer Portal

## Objective
Create a short, cinematic launch-style brag video for the UOI Customer Portal.

## Output
- Composition directory: `brag-output-2026-07-28-065000/composition/`
- Rendered video: `brag-output-2026-07-28-065000/brag.mp4`
- Format: landscape — 1920x1080
- Duration: 22.93s

## Source Material
- Project root: `/home/user/customerportal`
- Primary files read: `src/index.css` (design tokens), `src/pages/auth/AuthFlow.tsx`, `src/pages/auth/AuthUI.tsx`, `src/components/dashboard/YourCoverage.tsx`, `src/components/dashboard/Rewards.tsx`, `src/pages/DashboardPage.tsx`, `package.json`
- Product name: UOI Customer Portal (United Overseas Insurance, Singapore)
- Tagline / strongest claim: *Access your insurance policies in one place* (the product's own auth subtitle)
- Key UI moments to recreate: real captures of the login screen, the OTP verification screen, the dashboard coverage section, and the rewards row
- Copy that must appear verbatim:
  - EVERYONE OWNS INSURANCE.
  - ALMOST NO ONE CAN FIND IT.
  - Access your insurance policies in one place
  - YOUR ACTIVE COVERAGE
  - UniCar / Renewal due in 30 days
  - UniTravel (Single Trip) / In force
  - UniHelper / In force
  - EVERY POLICY. ONE PLACE.

**Data integrity rule:** every policy name, status label, date and reward on screen comes from `src/`. No invented statistics, no fabricated claims about UOI or its customers. The hook is a general observation about insurance, not a metric.

## Creative Direction
- Tone preset: `cinematic`
- Creative direction: trailer-scale treatment of a category nobody makes trailers for
- Interpretation: 5 scenes, 4-5.5s each. Full-bleed captures, big ALL CAPS type, dramatic push-ins and wipes rather than quick cuts. Long settled holds; pace comes from weight and beat-locked transitions, never from pulling text before it can be read.
- Angle: Insurance is the product everyone owns and nobody can locate — it lives in PDF attachments and archived email. The cinematic premise treats *finding your own policy* as the problem worth a trailer, then answers it with the real product shot big.
- Hook: deep navy field; **EVERYONE OWNS INSURANCE.** then **ALMOST NO ONE CAN FIND IT.**
- Outro / punchline: **EVERY POLICY. ONE PLACE.** on the portal's own `#F6F8FC`, under the UOI mark
- Avoid:
  - Generic SaaS language
  - Abstract filler visuals
  - Unrelated visual redesign
  - Invented numbers or claims

## Visual Identity
- Background: `#F6F8FC` (product/end scenes); `#0A1A2F` deep navy (title fields)
- Text: `#212121` primary, `#6E6E6E` secondary, white on navy
- Accent: `#005EB8` primary, `#5C55EB` regal, `#F09252` accent
- Status: `#065F46` on `#ECFDF5` (in force), `#FFA826` on `#FFF8EC` (renewal due)
- Display font: Noto Sans 700, ALL CAPS, wide tracking
- Body font: Noto Sans 400/500
- Visual references from the project: split-screen login with Singpass button + airport hero; six-box OTP; coverage cards with status pills; rewards row photography; `uoi-logo.svg`

## Storyboard
Use the storyboard in `brag-plan.md` as the creative contract.

Scene summary:
1. Hook / title field — 4.39s — two ALL CAPS lines land in sequence on navy
2. Login hero shot — 4.35s — real login capture, slow push-in, product subtitle
3. Authentication — 4.37s — OTP screen, six digits fill on the beat, Verify
4. Every policy, one place — 5.45s — dashboard, three policy cards sweep in with true status pills, long hold
5. Rewards + end card — 4.37s — rewards drift, hard cut to logo + closing line

## Audio
- Audio role: cinematic support — a low, steady bed carrying weight without narrating the drama
- Audio arc: fade in under the hook → hold low through login and auth → slight lift across the policy-card arrivals → thin and fade out under the end card
- Music: `assets/music/bed.mp3` (`happy-beats-business-moves-vol-12`, ~110 BPM)
- Music treatment: start at 0, fade in ~0.8s, baseline gain ~0.25, fade out over the final ~1.4s
- **Library constraint:** the bundled library is entirely the upbeat-corporate "Happy Beats / Business Moves" series — there is no orchestral trailer bed available. vol-12 is the slowest and most structured. Keep it low so it reads as underscore; the cinematic weight must come from typography, scale, holds and beat-locked cutting.
- Music cue guidance: bundled preset at `assets/music/cues/happy-beats-business-moves-vol-12-by-ende-dot-app.music-cues.json` (110 BPM, beat grid ≈0.545s). Strong cues to lock scene boundaries: **8.74s**, **13.11s**, **18.56s**, **22.93s**. Beat grid for sequential events: OTP digits at 9.29/9.83/10.37/10.93/11.46/12.02; policy cards at 13.64/14.73/15.84 (every other beat).
- Audio-reactive treatment: none — cinematic here means controlled, not pulsing. No waveforms, no music-driven glow.
- Audio-coupled moments:
  - Scene 1 — two title lines landing — low sub-hit under each
  - Scene 3 — six OTP digits — key tick per digit, fired at the same timestamp as the visual
  - Scene 3 — Verify emphasis — one softer accent
  - Scene 4 — three policy-card arrivals — one restrained impact each
  - Scene 5 — end-card cut — one final hit
- SFX selection guidance: sparse and weighty; sound must correspond to something appearing or something the user did. Nothing under the rewards drift.
- SFX analysis guidance: `.claude/skills/brag/assets/sfx/sfx-analysis.md`. Chosen (all low/medium HF risk, warm):
  - `sfx/hit-heavy.ogg` (`impactSoft_heavy_002`, 0.57s warm transient) — title lines, end card
  - `sfx/hit-card.ogg` (`impactSoft_medium_001`, 0.18s warm transient, low HF) — policy cards
  - `sfx/key.ogg` (`ui/click2`, 0.06s, low HF) — OTP digits, repeated 6× so low-HF matters
  - `sfx/verify.ogg` (`interface/click_003`, 0.01s, low HF) — Verify emphasis
- Audio files: copied into `composition/assets/music/` and `composition/assets/sfx/`

## Hyperframes Instructions
Built against `hyperframes-core` (composition contract + `data-*` timing), `hyperframes-animation` (motion), `hyperframes-creative` (design), `hyperframes-keyframes` (seek-safe keyframes), `hyperframes-cli` (check/render). This is the `/brag` workflow — not the `hyperframes` entry-point intent interview.

Requirements:
- Show real UI from the source project — four real captures are used.
- Keep all text readable: reading floor of ~0.8s settled for short labels, ~0.3s/word for sentences.
- Total duration 22.93s (within 15-25s).
- Include the music bed and the sparse SFX layer.
- Beat-lock the four scene boundaries to strong cues within ±0.15s; snap OTP digits and policy cards to the beat grid within ±0.10s.
- Run `npx hyperframes check` before render — brag's single gate.
