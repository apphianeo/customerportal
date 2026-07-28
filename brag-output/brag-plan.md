# Brag Plan: UOI Customer Portal

## What is this app?
A customer portal for United Overseas Insurance (Singapore, member of the UOB Group) where policyholders log in with Singpass or NRIC/FIN and see every active policy, renewal status, rewards, and account settings in one place.

## The angle
Insurance portals are famously the worst-looking software people are forced to use. This one isn't. The brag is **craft applied to a boring category**: a real Singpass login flow, live policy states, a design system with actual tokens — a bank-grade product that looks like a consumer app.

The video shows the real thing working: sign in → coverage at a glance → rewards. No diagrams of what it does. The product doing it.

## Hook (first 2-3 seconds)
The real login screen lands full-frame: UOI logo, "Customer Portal", "Access your insurance policies in one place" — and the unmistakable red **Log in with Singpass** button against the airport hero photo. For a Singapore audience that button is instant recognition. No hype copy. The screen *is* the hook.

## Key moments (the middle)
- **The OTP fills itself** — six digit boxes populate one by one on the beat, then Verify. The auth flow is real, not a mockup.
- **"Your active coverage (3)"** — three policy cards arrive in sequence, each carrying its true status pill: amber `Renewal due in 30 days`, green `In force`, green `In force`.
- **Rewards with real photos** — KITH dining, Capybara bathing, HEYMAX cashback. An insurance portal that ships perks, not just PDFs.

## Outro / punchline
Pull back to the UOI mark on the page background with one line: **"Every policy. One place."** Restraint — the product already made the argument.

## User flow worth showing
Entry → key action → result:
1. Login screen → choose NRIC/FIN (Singpass sits right above it)
2. Enter credentials → OTP verification fills and verifies
3. Dashboard: active coverage, statuses, rewards

## Tone
- Preset: `polished`
- Creative direction: quiet premium fintech product film — design-system precision, no jokes
- Interpretation: Few scenes, long holds, soft crossfades. Confidence through restraint. The motion never upstages the UI; the UI is the star. No zoom-punches, no flashing text, no exclamation marks.

## Format: landscape — 1920x1080
## Duration: 20.5s

## Visual identity (from the project)
- Background: `#F6F8FC` (bg-page)
- Accent: `#005EB8` (UOI primary blue); secondary `#5C55EB` (regal)
- Text: `#212121` primary, `#6E6E6E` secondary
- Status: `#08754F` on `#ECFDF5` (in force), `#FFA826` on `#FFF8EC` (renewal due)
- Display font: Noto Sans (600 semibold — the portal's bold weight)
- Body font: Noto Sans (400/500)
- Strongest visual element: the split-screen login (logo + Singpass button + airport hero), then the coverage cards with status pills

## Share copy (draft)
Insurance dashboards don't have to look like insurance. Built the UOI Customer Portal — Singpass login, every policy in one place, rewards included.

## Audio direction
- Role: warm corporate bed with sparse, motion-matched accents
- Music: `happy-beats-business-moves-vol-9-by-ende-dot-app.mp3` (bundled; ~114.8 BPM)
- Music treatment: start at 0, low bed (~0.25-0.3 gain) so UI reads first; gentle fade-in over ~0.6s, fade out over the last ~1.2s
- Music cue guidance: preset cue file read. Strong cues to target — **4.23s** (login → sign-in action), **10.54s** (dashboard reveal), **15.81s** (rewards). Beat grid ≈0.526s spacing; OTP digits may ride consecutive beats, but policy-card reveals should land every *other* beat (~1.05s apart) so each card's status pill is readable.
- Audio-reactive treatment: none. Polished tone — no waveform or pulsing.
- SFX posture: sparse and professional. Soft key ticks for the six OTP digits, one quiet click for the login press, a soft card-arrival tick per policy card. Nothing on the end card except music.
- Audio-coupled moments: OTP digits filling; policy cards arriving one by one; the login button press.
- Restraint rule: no whooshes, no risers, no impacts. If a sound doesn't correspond to something the user actually did, it doesn't belong.

## Storyboard

### Scene 1 — Login / hook — 4.2s
Full-frame real capture of the login screen (`source-shots/01-login.png`): UOI logo, "Customer Portal", "Access your insurance policies in one place", red Singpass button, airport hero on the right. Settles with a very slow scale (1.0 → 1.02) so it breathes. At ~2.6s a small caption appears bottom-left: **UOI Customer Portal — Singapore**.
Sequential/interaction: none — hold and let the screen read.
Audio intent: music enters low and confident; the room is calm.
Audio-coupled idea: none.
Music: warm corporate bed, low.
Transition mood: soft crossfade → Scene 2

### Scene 2 — Sign in + OTP — 6.3s
The real auth flow. Cut to the filled NRIC/FIN form (`02-login-filled.png`), a cursor moves to **Login** and presses it (soft click). Cut to the OTP screen (`03-otp.png`) where the six code boxes fill **one digit at a time** on consecutive beats, each with a soft key tick, then Verify highlights.
Sequential/interaction: yes — cursor presses Login; six OTP digits appear one by one (~0.5s apart, riding the beat grid); Verify button emphasises at the end.
Audio intent: quiet competence — the sound of a real product being used.
Audio-coupled idea: key ticks per digit; one click on the Login press.
Music: same bed, unchanged.
Transition mood: clean cut on the strong cue at ~10.54s → Scene 3

### Scene 3 — Coverage at a glance — 5.3s
Dashboard (`04-dashboard.png`). Caption top-left: **Every policy, one place**. The three policy cards arrive **one by one** (every other beat, ~1.05s apart), each holding long enough to read its name and status pill: `UniCar — Renewal due in 30 days` (amber), `UniTravel (Single Trip) — In force` (green), `UniHelper — In force` (green). A soft tick per arrival.
Sequential/interaction: yes — three policy cards reveal in sequence, status pills last.
Audio intent: steady, additive — each card lands with quiet weight.
Audio-coupled idea: card-arrival tick per policy card.
Music: bed continues, slight lift.
Transition mood: soft crossfade on ~15.81s → Scene 4

### Scene 4 — Rewards + end card — 4.7s
Rewards row (`05-rewards.png`) — the four real reward cards with photography (KITH, Capybara, HEYMAX, wellness) drift up briefly under a caption: **Rewards, not just PDFs**. At ~18.6s dissolve to the end card on `#F6F8FC`: UOI logo centred with **Every policy. One place.** beneath it. Hold to the end.
Sequential/interaction: none — a gentle drift, then the end card.
Audio intent: resolve and settle; music fades under the final line.
Audio-coupled idea: none — the end card is silent apart from music.
Music: fade out over the final ~1.2s.
Transition mood: soft fade → end

**Music mood for this video:** upbeat-but-restrained corporate bed (polished)
**Audio summary:** A low warm bed runs the whole 20.5s, with sparse motion-matched UI sounds only where the user actually acts — a login click, six OTP key ticks, three card arrivals — then everything fades under the closing line.
