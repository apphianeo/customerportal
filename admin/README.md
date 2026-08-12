# UOI Internal Console

Staff-facing console for customer and policy administration. Separate app,
separate build, separate auth — shares only the design tokens with the customer
portal.

```bash
npm run dev:admin      # http://localhost:5174
npm run build:admin    # → dist-admin/
```

The customer portal is untouched: `npm run dev` still serves it on 5173.

## Sign in

Mock identity provider. Click "Sign in with UOI account", then pick a staff
identity:

| Account | Role | Can |
|---|---|---|
| Priya Menon | Support agent | View everything, read-only |
| Marcus Teo | Administrator | Also unlock portal accounts |

## Why it is built this way

**The primary entity is a person, not a portal account.** Someone can hold UOI
policies without ever registering, and can register without buying anything.
Portal status and policy ownership are independent attributes. This is what
makes the two invisible segments visible:

- *Policyholders, no portal account* — the adoption gap
- *Registered, no products* — a marketing segment absent from the policy system

**Staff auth is not email and password.** `src/auth/staff.ts` is the seam for
OIDC against the corporate IdP. Swap `DIRECTORY` for token group claims and
nothing above it changes. Offboarding, MFA, and access requests then run through
IT's existing process rather than a credential table in this app.

**Search is client-side.** At ~2k customers, filtering in memory is instant.
Revisit past roughly 20k.

**Every view is audited.** `src/data/audit.ts` records who viewed which customer
and when, including searches. No UI for it in v1 — it exists because retrofitting
an audit trail means touching every screen, and a compliance reviewer will ask
for it first.

## Assumptions, confirmed with the product owner

1. The portal is open to anyone, policyholder or not.
2. One NRIC/FIN is one unique customer. No identity merging.
3. Support agents see unmasked PII. Views are still logged.
4. Account states are `not-registered`, `active`, `locked`.
5. Locking is automatic after 6 months of inactivity, non-policyholders only.
6. Around 2,000 customers.

## Not built yet

- Real API. `src/data/customers.ts` stands in for the policy system; replace that
  one module.
- View-as-customer (read-only impersonation) — highest-value support feature.
- Audit log UI.
- Claims, reports, and policy servicing. The existing admin portal covers
  reports; this console should not duplicate it.

## Known gap in the customer portal

The portal has **no lockout logic today** — nothing counts failed sign-in or OTP
attempts, and nothing marks an account dormant. The `locked` state modelled here
needs a corresponding change on the portal side before it means anything in
production.
