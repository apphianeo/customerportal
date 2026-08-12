# Test accounts

Mock data lives in [`src/data/accounts.ts`](../src/data/accounts.ts) and resets on page reload.
Email is the login credential. **OTP: any 6 digits except `999999`, which always fails.**

| Account | Email | Password | What it is for |
|---|---|---|---|
| Chris Wong | chriswong@gmail.com | `Chris2026` | The default. Manual account, so everything on Manage Account is editable. Five old passwords, so the reuse rule fires. |
| Mei Ling Tan | meiling.tan@gmail.com | `Portal2026` | Singpass account — personal details and residential address are read-only. Only one with a separate mailing address. |
| Ravi Kumar | ravi.kumar@gmail.com | `Bedok2026` | One password on file, so the reuse rule stays quiet. |
| Aisyah Rahman | aisyah.rahman@gmail.com | `Sentosa2026` | FIN rather than NRIC (`G` prefix). |
| Nadia Lim | nadia.lim@gmail.com | `Marina2026` | No policies — the prospect dashboard and the Policies empty state. |

**Singpass sign-in** returns Grace Sim (`grace.sim@gmail.com`), a policyholder with no portal
account, so it runs the first-time path. Sign out without reloading to see the returning one.

**Manual sign-up** takes any unused email. The NRIC decides the dashboard: `S1234567D` for
active coverage, anything else (e.g. `S9876543Z`) for the prospect view.
