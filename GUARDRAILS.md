# RagTuff Guardrails

## Status
This document is binding on contributors, reviewers, and maintainers.

It exists to prevent power creep, custody risk, and silent execution from ever entering RagTuff.

---

## Non-Negotiable Constraints

RagTuff must remain:

- Non-custodial
- Non-executing
- Non-authoritative
- Human-in-the-loop only

These constraints apply regardless of feature requests, integrations, or perceived convenience.

---

## Explicitly Forbidden Additions

No pull request may introduce, directly or indirectly:

- Private key handling
- Message or transaction signing
- Transaction submission or broadcasting
- Asset custody or escrow logic
- Autonomous execution
- Background agents with authority
- Silent actions without explicit human confirmation
- Privilege escalation paths
- “Optional” execution hooks

If a change enables any of the above in the future, it is forbidden now.

---

## Inability Over Intention

RagTuff must be **incapable**, not merely unwilling.

Design choices must ensure that:
- Power cannot be added quietly
- Authority cannot be extended incrementally
- Execution cannot be “turned on later”

Any design that relies on restraint rather than incapability is invalid.

---

## Review Standard

Any contribution that:
- Blurs observation with action
- Collapses separation of concerns
- Introduces latent authority

Must be rejected as a **structural violation**, regardless of intent.

“This could be useful later” is not a valid justification.

---

## Relationship to Other Documents

- README.md defines public scope
- ARCHITECTURE.md defines structure
- EXECUTION_BOUNDARIES.md defines execution limits
- GUARDRAILS.md enforces permanence

All runtime code must satisfy all of the above simultaneously.

---

## Final Invariant

RagTuff may:
- Observe
- Connect
- Simulate
- Inform

RagTuff may never:
- Act
- Execute
- Decide
- Control

This invariant is permanent and non-overrideable.
