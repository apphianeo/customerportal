# Hyperframes Composition Brief: UOI Customer Portal

## Objective
Create a short launch-style brag video for the UOI Customer Portal — a Singapore insurance customer portal built in React + TypeScript + Vite + Tailwind v4.

## Output
- Composition directory: `brag-output/composition/`
- Rendered video: `brag-output/brag.mp4`
- Format: landscape — 1920x1080
- Duration: 20.5 seconds

## Source Material
- Project root: `/Users/apphianeo/Desktop/code/customer-portal`
- Primary files read: `src/index.css` (design tokens), `src/pages/auth/*`, `src/pages/DashboardPage.tsx`, `src/components/dashboard/*`, `src/pages/PoliciesPage.tsx`, `package.json`
- **Real UI captures** (use these as the visual centrepiece — 2880x1800 @2x, shot from the running app):
  - `brag-output/source-shots/01-login.png` — split-screen login, UOI logo, Singpass button, airport hero
  - `brag-output/source-shots/02-login-filled.png` — NRIC/FIN + password filled
  - `brag-output/source-shots/03-otp.png` — OTP verification, six boxes filled
  - `brag-output/source-shots/04-dashboard.png` — dashboard, coverage cards, status pills
  - `brag-output/source-shots/05-rewards.png` — rewards cards with real photography
  - `brag-output/source-shots/06-policies.png` — policies list
- Product name: UOI Customer Portal
- Tagline / strongest claim: "Access your insurance policies in one place"
- Key UI moment to recreate: the login → OTP → dashboard flow, then the coverage cards with live status pills
- Copy that must appear verbatim:
  - `Access your insurance policies in one place`
  - `Every policy, one place`
  - `Every policy. One place.`
  - `Rewards, not just PDFs`
  - `UOI Customer Portal — Singapore`

## Creative Direction
- Tone preset: `polished`
- Creative direction: quiet premium fintech product film — design-system precision, no jokes
- Interpretation: Four scenes, long holds, soft crossfades. The motion serves the UI and never upstages it. No zoom-punches, no flashing text, no exclamation marks. Confidence through restraint.
- Angle: Insurance portals are the worst-looking software people are forced to use. This one isn't. The brag is craft applied to a boring category — a real Singpass auth flow, live policy states, a proper design system. Show the product working, not a diagram of what it does.
- Hook: The real login screen full-frame — UOI logo, "Customer Portal", and the unmistakable red Singpass button against the airport hero. The screen is the hook.
- Outro / punchline: "Every policy. One place." under the UOI mark.
- Avoid:
  - Generic SaaS language
  - Abstract filler visuals
  - Unrelated visual redesign (do not restyle the product; the captures are the truth)

## Visual Identity
- Background: `#F6F8FC` (bg-page)
- Text: `#212121` primary, `#6E6E6E` secondary
- Accent: `#005EB8` (UOI primary blue); secondary `#5C55EB` (regal)
- Status colors: `#08754F` on `#ECFDF5`; `#FFA826` on `#FFF8EC`
- Display font: Noto Sans 600 (the portal's bold weight is 600, not 700 — match it)
- Body font: Noto Sans 400/500
- Visual references from the project: split-screen login, coverage cards with pill badges, rewards cards with photography, the UOI wordmark

## Storyboard
Use the storyboard in `brag-output/brag-plan.md` as the creative contract.

Scene summary:
1. **Login / hook** — 4.2s — the real login screen; caption `UOI Customer Portal — Singapore` late in the scene
2. **Sign in + OTP** — 6.3s — cursor presses Login; six OTP digits fill one by one on the beat; Verify emphasises
3. **Coverage at a glance** — 5.3s — dashboard; three policy cards arrive in sequence with readable status pills; caption `Every policy, one place`
4. **Rewards + end card** — 4.7s — rewards row drifts under `Rewards, not just PDFs`, then dissolve to UOI mark + `Every policy. One place.`

## Audio
- Audio role: warm corporate bed with sparse, motion-matched accents
- Audio arc: low bed in from 0, unchanged through the flow, slight lift at the dashboard, fades out under the final line
- Music: `happy-beats-business-moves-vol-9-by-ende-dot-app.mp3` (~114.8 BPM)
- Music treatment: gain ~0.25–0.3 so UI reads first; ~0.6s fade-in; ~1.2s fade-out at the end
- Music cue guidance: bundled preset at `~/.claude/skills/brag/assets/music/cues/happy-beats-business-moves-vol-9-by-ende-dot-app.music-cues.json`. Strong cues to consider locking: **4.23s** (login → sign-in), **10.54s** (dashboard reveal), **15.81s** (rewards). Beat grid ≈0.526s. OTP digits may ride consecutive beats; policy cards should land every *other* beat (~1.05s) so status pills stay readable.
- Audio-reactive treatment: none — polished tone, explicitly no pulsing/waveform.
- Audio-coupled moments:
  - Scene 2 login press — one quiet UI click
  - Scene 2 OTP — six soft key ticks, one per digit
  - Scene 3 policy cards — one soft tick per card arrival
- SFX selection guidance: quiet, professional, low high-frequency risk. Keys from `assets/sfx/keyboard/`, click from `assets/sfx/ui/` or `interface/`. No whooshes, risers, or impacts.
- SFX analysis guidance: `~/.claude/skills/brag/assets/sfx/sfx-analysis.md` — prefer low high-frequency-risk files for the repeated OTP ticks.
- Exact SFX choice: Hyperframes chooses filenames, timestamps, density, and volume after the animation exists.
- Audio files: copy chosen music and SFX into `brag-output/composition/assets/`

## Hyperframes Instructions
Load `hyperframes-core`, `hyperframes-animation`, `hyperframes-creative`, `hyperframes-keyframes`, `hyperframes-cli`. This is the `/brag` workflow — do not enter the `hyperframes` entry-point intent interview.

Requirements:
- Show real UI: the captured screenshots are the centrepiece of every scene except the end card.
- Keep all text readable: short captions hold ≥0.8s settled; the closing line holds longer.
- Total duration 20.5s (within 15–25s).
- Include the music bed and the sparse SFX layer.
- Beat-lock 1–3 major reveals within ±0.15s of a strong cue; snap sequential OTP digits / policy cards to the beat grid within ±0.10s. Mark them with `// beat-locked` / `// beat-grid` comments.
- Audio-reactive is explicitly **none** for this tone — document that choice rather than adding pulsing.
- Use local assets only.
- Run `npx hyperframes check` before render — brag's single gate.
