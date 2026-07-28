# Brag Plan: UOI Customer Portal

## What is this app?
A customer portal for United Overseas Insurance (Singapore) where policyholders log in with Singpass or NRIC/FIN and see every active policy, its renewal status, and their rewards in one place.

## The angle
Insurance is the product everyone owns and nobody can locate. It lives in PDF attachments, renewal letters, and an email you archived in 2023. The cinematic premise treats *finding your own policy* as the problem worth a trailer — then answers it with the real product, shot big.

The drama comes from scale and restraint: full-bleed captures, ALL CAPS declaratives, long holds, cuts landing on the beat. Not from hype. Every claim on screen is copy that already exists in the product.

**Honesty constraint:** no invented statistics. The hook is a general observation about insurance, not a fabricated number about UOI or its policyholders. Every policy name, status pill, date, and reward on screen is real data from `src/`.

## Hook (first 2-3 seconds)
Deep navy field, near-black. Two ALL CAPS lines land one after the other, each slamming in fast and then holding:

> **EVERYONE OWNS INSURANCE.**
> **ALMOST NO ONE CAN FIND IT.**

No product, no logo, no UI yet. The second line is the promise the rest of the video pays off.

## Key moments (the middle)
- **The Singpass button, held like a hero shot** — the real login screen pushes in slowly from 0.95. For a Singapore audience that red button is instant recognition; it establishes this is a real, live-market product, not a portfolio mock.
- **Six OTP digits hammering in on the beat** — the auth flow is genuine. Each digit lands on a consecutive beat, then Verify. The product being *used*, not described.
- **Three policy cards sweeping in with true status** — `UNICAR — Renewal due in 30 days` (amber), `UNITRAVEL (SINGLE TRIP) — In force` (green), `UNIHELPER — In force` (green). Every other beat so each status pill is actually readable. This is the payoff to "almost no one can find it."

## Outro / punchline
Rewards rack past — KITH, Capybara Bathing, HEYMAX, Wellness Talk — then a hard cut to the end card: UOI mark on the portal's own `#F6F8FC`, with

> **EVERY POLICY. ONE PLACE.**

The line answers the hook verbatim. Music resolves under it.

## User flow worth showing
Entry → key action → result:
1. Login screen — Singpass, or NRIC/FIN below it
2. OTP verification — six digits fill, Verify
3. Dashboard — active coverage with live statuses, then rewards

## Tone
- Preset: `cinematic`
- Creative direction: trailer-scale treatment of a category nobody makes trailers for
- Interpretation: 5 scenes, 4-5.5s each. Full-bleed captures, big ALL CAPS type, dramatic push-ins and wipes rather than quick cuts. Long settled holds — the pace comes from weight and beat-locked transitions, never from pulling text before it can be read.

## Format: landscape — 1920x1080
## Duration: 22.9s

## Visual identity (from the project)
- Background: `#F6F8FC` (bg-page) for product/end scenes; `#0A1A2F` deep navy (darkened from brand `#005EB8`) for the title fields
- Accent: `#005EB8` (primary); secondary `#5C55EB` (regal); `#F09252` (accent)
- Text: `#212121` primary, `#6E6E6E` secondary; white on the navy fields
- Status: `#065F46` on `#ECFDF5` (in force), `#FFA826` on `#FFF8EC` (renewal due)
- Display font: Noto Sans 600/700, ALL CAPS, wide tracking for title cards
- Body font: Noto Sans 400/500
- Strongest visual element: the split-screen login (UOI logo + Singpass button + airport hero), then the coverage cards with their status pills

## Share copy (draft)
Everyone owns insurance. Almost no one can find it. Built the UOI Customer Portal — Singpass login, every policy and renewal date in one place, rewards included.

## Audio direction
- Role: cinematic support — a low, steady bed that carries weight without narrating the drama
- Music: `happy-beats-business-moves-vol-12-by-ende-dot-app.mp3` (bundled; ~110 BPM)
- **Library constraint (flagged):** the bundled library is entirely the "Happy Beats / Business Moves" series — upbeat corporate, not orchestral trailer. There is no true cinematic swell available. vol-12 is the closest fit: it has the slowest tempo and the clearest strong-beat structure. The cinematic quality must therefore come from **typography, scale, holds, and beat-locked cutting** — not from the score. Keep the bed low (~0.22-0.28 gain) so it reads as underscore rather than corporate stock.
- Music treatment: start at 0, fade in ~0.8s under the hook, hold low through the product scenes, fade out over the final ~1.4s beneath the end card.
- Music cue guidance: preset cue file read (110 BPM, beat grid ≈0.545s). **Every scene boundary lands on a strong cue:** 8.74s (login → OTP), 13.11s (OTP → coverage), 18.56s (coverage → rewards), 22.93s (final beat, end of video). Sequential reveals: OTP digits ride *consecutive* beats (0.545s apart — accents, not text, so this is safe); policy cards ride *every other* beat (~1.09s apart) so each status pill clears the reading floor.
- Audio-reactive treatment: none. Cinematic here means controlled, not pulsing. No waveforms, no music-driven glow.
- SFX posture: sparse and weighty. A low sub-hit under each title line, soft key ticks for the six OTP digits, one restrained impact per policy card arrival, one final hit on the end card.
- Audio-coupled moments: the two hook lines landing; six OTP digits; three policy-card arrivals; the end-card slam.
- Restraint rule: no risers, no whooshes, no braams. At most one low hit per beat, and nothing at all under the rewards drift. If a sound doesn't correspond to something appearing or something the user did, it doesn't belong.

## Storyboard

### Scene 1 — Hook / title field — 4.4s (0 → 4.39)
Full-bleed deep navy `#0A1A2F`. Line 1 **EVERYONE OWNS INSURANCE.** slams in at ~0.3s (fast in, ~0.35s) and holds. Line 2 **ALMOST NO ONE CAN FIND IT.** lands on the beat at ~2.19s and holds to the cut. ALL CAPS, large, wide tracking, centred, generous margins. Nothing else on screen.
Sequential/interaction: yes — two title lines reveal in sequence, each holding ≥1.9s settled (well over the ~1.5s floor for a 5-word line).
Audio intent: establish weight and stillness; the room is serious.
Audio-coupled idea: a low sub-hit under each line as it lands.
Music: low bed, fading in over ~0.8s.
Transition mood: dramatic wipe → Scene 2

### Scene 2 — The login, held as a hero shot — 4.4s (4.39 → 8.74)
Full-frame real capture of the login screen (`source-shots/01-login.png`): UOI logo, "Customer Portal", the red **Log in with Singpass** button, "Log in with NRIC/FIN" beneath it, airport hero on the right. Slow push-in from scale 0.95 → 1.0 across the whole scene. At ~5.34s a small-caps caption sits bottom-left: **UOI CUSTOMER PORTAL — SINGAPORE**. At ~6.56s the product's own subtitle appears beneath it: *Access your insurance policies in one place.*
Sequential/interaction: none — the push-in carries it; let the screen read.
Audio intent: arrival. The bed opens up slightly as the product lands.
Audio-coupled idea: none — no sound on a static reveal.
Music: bed continues, low.
Transition mood: hard cut on strong cue 8.74s → Scene 3

### Scene 3 — Authentication — 4.4s (8.74 → 13.11)
The real OTP screen (`source-shots/03-otp.png`), framed large. Title **OTP VERIFICATION** reads from the product itself. The six code boxes fill **one digit at a time** on consecutive beats — 9.29, 9.83, 10.37, 10.93, 11.46, 12.02 — each with a soft key tick. At ~12.55s the **Verify** button emphasises.
Sequential/interaction: yes — six OTP digits appear one by one on the beat grid; Verify emphasises at the end. Digits are single glyphs, not lines of copy, so consecutive-beat spacing is safe.
Audio intent: mechanical competence — the sound of a real auth flow completing.
Audio-coupled idea: key tick per digit; one softer accent on Verify.
Music: unchanged.
Transition mood: hard cut on strong cue 13.11s → Scene 4

### Scene 4 — Every policy, one place — 5.5s (13.11 → 18.56)
Dashboard (`source-shots/04-dashboard.png`). Overlay caption top-left: **YOUR ACTIVE COVERAGE** (the product's own section heading). The three policy cards sweep in **one by one on every other beat** — 13.64, 14.73, 15.84 — each holding long enough to read name and status pill:
- `UniCar` — **Renewal due in 30 days** (amber `#FFA826` on `#FFF8EC`)
- `UniTravel (Single Trip)` — **In force** (green `#065F46` on `#ECFDF5`)
- `UniHelper` — **In force** (green)

All three then hold together on screen for ~2.7s. This is the longest hold in the video and the emotional payoff of the hook.
Sequential/interaction: yes — three policy cards reveal in sequence at ~1.09s spacing, status pills landing with each card.
Audio intent: additive weight — each card lands with quiet authority.
Audio-coupled idea: one restrained low impact per card arrival.
Music: bed lifts slightly across the three arrivals.
Transition mood: dramatic wipe on strong cue 18.56s → Scene 5

### Scene 5 — Rewards, then the end card — 4.4s (18.56 → 22.93)
The rewards row (`source-shots/05-rewards.png`) drifts up briefly — the four real reward cards with their photography: *10% off KITH by Casa Products*, *10% off Capybara Bathing*, *$5 Credit Reward for HEYMAX New User*, *Complimentary Wellness Talk*. Small caption: **REWARDS INCLUDED.** At ~20.75s hard cut to the end card on the portal's own `#F6F8FC`: UOI logo centred, and beneath it in ALL CAPS —

> **EVERY POLICY. ONE PLACE.**

Hold to 22.93s.
Sequential/interaction: none — a gentle drift, then the slam.
Audio intent: resolve. The bed thins and settles under the final line.
Audio-coupled idea: one final low hit on the end-card cut; nothing under the rewards drift.
Music: fade out over the final ~1.4s.
Transition mood: hard cut → end

**Music mood for this video:** cinematic-restrained (bundled corporate bed used as low underscore — see library constraint above)
**Audio summary:** A low bed runs the full 22.9s under a sparse, weighty accent layer — two sub-hits on the title lines, six key ticks as the OTP fills, three impacts as the policy cards land, one final hit on the end card — with every scene boundary cut to a strong beat and everything fading under the closing line.
