# NEAR_INTERSECT_CONFORMANCE.md

## Purpose

RagTuff remains **non-executing**.

This file defines how RagTuff **conforms** to Near-Intersect’s launch and deployment procedure **without changing RagTuff’s purpose**.

---

## Non-Execution Guarantee

RagTuff MUST remain incapable of:
- holding private keys
- signing transactions
- broadcasting transactions
- custody or fund movement
- automated treasury execution

RagTuff defines constraints. It does not perform actions.

---

## Conformance Mechanism

RagTuff conforms to Near-Intersect by publishing **Near-Intersect-compatible law profiles** that are consumable by the factory/compiler.

- Near-Intersect canonical input schema: `LAW_v1_SCHEMA`
- RagTuff publishes: `LAW_v1_PROFILE` instances that match `LAW_v1_SCHEMA` **exactly**

These profiles are the deployable “law inputs” that Near-Intersect can compile into deterministic contracts.

---

## RagTuff Anchoring Requirement (Binding)

Every `LAW_v1_PROFILE` intended for Near-Intersect deployment MUST carry RagTuff anchoring data so compiled outputs can be bound to upstream law:

- RagTuff canonical reference (file path and/or canonical doc list)
- `framework_commit` (or equivalent)
- `framework_hash` (or equivalent)
- any additional integrity anchors required by Near-Intersect

If anchoring data is missing or malformed, the profile is non-conformant for deployment.

---

## Determinism Requirement

Any Near-Intersect deploy profile MUST be deterministic and auditable.

Non-deterministic behavior (including “random module assignment”) MUST NOT appear in deploy profiles unless the randomness source and selection rule are made deterministic and verifiable as part of the law.

---

## Scope

This conformance does not make RagTuff executable.

RagTuff remains the upstream constitutional layer. Near-Intersect remains the execution wrapper.

RagTuff’s role is to publish:
- canonical law constraints
- invariants and guardrails
- Near-Intersect-compatible `LAW_v1_PROFILE` inputs
- integrity anchors for binding and audit

---
