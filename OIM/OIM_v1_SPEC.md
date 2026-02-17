# OIM v1 — OutpaceInflation Module (Canonical Spec)

**Canonical ID:** RAGTUFF-OIM-V1  
**Version:** v1.0.0  
**Status:** CANONICAL (Defensive Publication)  
**Date (UTC):** 2026-02-16  
**Scope:** RagTuff “law layer” specification (enabling description; implementation may vary)  
**Non-Promise Notice:** This specification defines invariant constraints and allowed mechanisms. It does **not** guarantee returns, yield, profit, price appreciation, or inflation outperformance.

---

## 1. Purpose

OIM (“OutpaceInflation Module”) is an invariant-governed module designed to **bias** a token ecosystem toward **inflation-resilient behavior** through *discipline, pacing, and governance constraints* around:

- Treasury allocation boundaries
- Savings/reserve behavior
- Update cadence and staleness controls
- Transparency events and auditability

OIM is intended to be **embedded** inside an execution contract (e.g., a factory-issued token contract), but RagTuff remains non-executing: it publishes the canonical constraints.

---

## 2. Design Goals

### 2.1 Goals
- **Invariant discipline:** enforce hard bounds and structured state transitions.
- **Deterministic governance surface:** small, auditable set of knobs.
- **No dependency on oracles:** can operate without price feeds.
- **Predictable cadence:** updates must respect cooldown + staleness rules.
- **Audit-grade traceability:** mandatory events for each state change.

### 2.2 Non-Goals
- No guarantee of real returns or inflation outperformance.
- No requirement to run investment strategies.
- No requirement to integrate external indices/oracles.
- No promise that any treasury actions will occur (policy may be “do nothing”).

---

## 3. Definitions

- **Treasury:** Contract-controlled balances reserved for protocol objectives.
- **Savings Vault / Reserve:** A segregated balance bucket governed by OIM constraints.
- **Benchmark:** A reference inflation measure *if used* (may be disabled). Examples: CPI-like index, basket index, custom governance metric.
- **Snapshot:** A recorded observation of benchmark or internal metrics at a specific timestamp/height.
- **Cooldown:** Minimum time between state-changing OIM actions.
- **Staleness:** Maximum allowed age of the latest Snapshot (if benchmark mode is enabled).

---

## 4. Canonical Invariants (MUST)

### I1 — No guaranteed returns
OIM MUST NOT encode promises of return, profit, or inflation outperformance.

### I2 — Explicit configuration and immutability boundaries
OIM MUST have a configuration object whose fields are:
- either immutable after initialization, OR
- mutable only through explicitly authorized governance transitions.

### I3 — Cooldown enforced
All OIM state-changing actions MUST respect a global cooldown:
- `now - last_action_time >= cooldown_seconds`

### I4 — Staleness enforced (when benchmark mode enabled)
If `benchmark_mode == ENABLED`, then any action that references benchmark data MUST require:
- `now - last_snapshot_time <= staleness_seconds`

If `benchmark_mode == DISABLED`, the system MUST NOT pretend it is benchmark-aware.

### I5 — Bounded allocation
OIM MUST define and enforce bounds on treasury/savings allocations.
Example canonical fields:
- `min_savings_bps` (minimum % of designated balances allocated to savings)
- `max_treasury_risk_bps` (maximum % allowed in “risk” category, if categories exist)

*Exact bucket definitions may vary, but bounds MUST be enforced.*

### I6 — Transparent events
Every state change MUST emit an event including:
- previous state hash (or state summary)
- new state hash (or summary)
- actor (account)
- timestamp/height
- reason code (enum)

### I7 — Emergency freeze
OIM MUST support an emergency freeze state that:
- blocks all non-admin state changes
- emits an event
- requires explicit unfreeze authorization

---

## 5. State Machine

### 5.1 States
OIM MUST implement this state model (names may vary; semantics MUST match):

- **UNINITIALIZED**: config not set.
- **ACTIVE**: normal operation; actions allowed per permissions and cooldown/staleness.
- **FROZEN**: emergency freeze; only unfreeze/config-safe operations allowed.
- **DEPRECATED**: module present but permanently disabled; no treasury actions; view-only.

### 5.2 Transitions
Allowed transitions:

- UNINITIALIZED → ACTIVE (initialize/configure)
- ACTIVE → FROZEN (freeze)
- FROZEN → ACTIVE (unfreeze)
- ACTIVE → DEPRECATED (irreversible)
- FROZEN → DEPRECATED (irreversible)

**DEPRECATED is terminal.**

---

## 6. Canonical Data Schema (Enabling)

Implementations MUST be able to represent these concepts (field names may vary).

### 6.1 OimConfig
- `version: "v1.0.0"`
- `cooldown_seconds: u64`
- `benchmark_mode: {DISABLED, ENABLED}`
- `staleness_seconds: u64` *(only meaningful if ENABLED)*
- `min_savings_bps: u16` *(0..=10000)*
- `max_treasury_risk_bps: u16` *(0..=10000)*
- `admin_authority: AccountId` *(multisig/governance wrapper recommended)*
- `upgrade_policy: {LOCKED, GOVERNANCE_ONLY}`

### 6.2 OimState
- `status: {UNINITIALIZED, ACTIVE, FROZEN, DEPRECATED}`
- `last_action_time: u64`
- `last_snapshot_time: u64` *(0 if none)*
- `last_snapshot_id: u64`
- `action_nonce: u64` *(monotonic)*
- `config_hash: bytes32` *(hash of config for audit anchoring)*

### 6.3 Snapshot (optional when benchmark enabled)
- `snapshot_id: u64`
- `time: u64`
- `source: string` *(human-readable)*
- `value: i128` *(scaled integer; e.g., bps or fixed-point)*
- `notes: string` *(optional)*

---

## 7. Canonical Interfaces (Enabling)

### 7.1 Views (MUST)
- `oim_get_config() -> OimConfig`
- `oim_get_state() -> OimState`
- `oim_is_active() -> bool`
- `oim_last_snapshot() -> Option<SnapshotSummary>`

### 7.2 Admin / Governance (MUST)
- `oim_initialize(config: OimConfig)`  
  Requirements:
  - only admin/governance
  - state == UNINITIALIZED
  - emits event `OimInitialized`

- `oim_freeze(reason_code)`  
  Requirements:
  - only admin/governance
  - state == ACTIVE
  - emits event `OimFrozen`

- `oim_unfreeze(reason_code)`  
  Requirements:
  - only admin/governance
  - state == FROZEN
  - emits event `OimUnfrozen`

- `oim_deprecate(reason_code)`  
  Requirements:
  - only admin/governance
  - state != DEPRECATED
  - irreversible
  - emits event `OimDeprecated`

### 7.3 Snapshot ingestion (ONLY if benchmark enabled)
- `oim_snapshot_ingest(snapshot: Snapshot)`  
  Requirements:
  - only authorized feeder OR governance-approved method
  - state == ACTIVE
  - cooldown MAY apply (implementation choice) but staleness logic must be consistent
  - emits event `OimSnapshotIngested`

---

## 8. Canonical Checks (MUST)

Implementations MUST enforce:

1) **Authority checks** for admin methods.  
2) **Cooldown checks** for every state-changing call (except initialize).  
3) **Staleness checks** for any benchmark-referencing actions when enabled.  
4) **Allocation bounds** at the moment a treasury/savings allocation is changed.  
5) **Freeze blocks**: if state == FROZEN, only unfreeze/deprecate/view allowed.  
6) **Deprecation terminality**.

---

## 9. Security & Threat Model (Minimal)

- **Oracle manipulation risk:** benchmark mode should be optional; if enabled, treat feeder as high-trust.
- **Governance capture risk:** admin_authority SHOULD be multisig with time delay for parameter changes.
- **Event integrity:** events are part of auditability; absence is a failure.
- **State drift:** config_hash and action_nonce reduce ambiguity.

---

## 10. Conformance

A contract “conforms to OIM v1” iff it:
- includes the required states + transitions,
- enforces invariants I1–I7,
- exposes the required views,
- and emits required events on state changes.

---

## 11. Versioning

- Patch/minor changes must be backwards compatible with invariants.
- Major version changes require a new canonical spec file (e.g., OIM_v2_SPEC.md).
