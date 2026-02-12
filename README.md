# RagTuff

## Canonical Definition
## Architectural Authority

RagTuff’s architecture is formally defined and locked in  
ARCHITECTURE.

The README is descriptive only.

If any statement in this README appears to conflict with ARCHITECTURE.md,  
ARCHITECTURE.md is authoritative and correct.
**RagTuff** is a **Strategically, Financially, and Cryptographically Engineered  
Decision-Support Positioning System**  
for **Defensive and Adversarial Analysis, Counter-Improvement Measurement, and Consequence Modeling**.

RagTuff is advisory-only by design. It models, evaluates, and positions decisions under uncertainty and adversarial pressure while preserving full human agency and external execution authority at all times.

## Non-Executable Notice
No releases, packages, or executable artifacts are published by design.
RagTuff provides analytical perspectives only and does not guarantee accuracy, completeness, or suitability for any particular decision.
RagTuff is not a standalone application and is not intended to be “run,” deployed, or executed autonomously. It is an advisory, non-custodial decision framework designed to be embedded or integrated into other systems. The absence of a runnable entrypoint is intentional and enforced.
---

## What RagTuff Is — and Is Not

### RagTuff Is
- A decision-support and positioning system
- A consequence modeling and scenario evaluation framework
- A defensive and adversarial analysis tool
- A counter-improvement measurement system
- Cryptographically integrity-preserving and audit-oriented
- Non-custodial, client-side, and user-controlled

## Operator (Human Layer)
RagTuff governs autonomous systems.

But builders still govern RagTuff.

Operator (Human Layer)

RagTuff intentionally separates framework governance from deployed economic law.

These are two different authorities:

1. Builder Governance (Framework Layer)

Builders retain control over RagTuff as a framework:
	•	Documentation and specification evolution
	•	Module and tooling development
	•	Factory design and deployment patterns
	•	New implementations and integrations

Builders govern how RagTuff is built and extended.

This layer is mutable.
⸻

2. Invariant Sovereignty (Deployed Law Layer)

Once RagTuff Core is instantiated on-chain, builders permanently relinquish control over:
	•	Supply mechanics
	•	Treasury partitioning
	•	Timelocks and unlock schedules
	•	Burn ceilings
	•	Core economic invariants
	•	Emergency override paths

No builder, operator, governance process, or automated agent can modify these.

This layer is immutable.

⸻

Summary

Builders evolve RagTuff.
Invariants govern RagTuff deployments.

Humans control the tools.
Law controls the outcomes.

- ## Operator Invariants (Human Layer)
INV-H1 — Continuous Activity
The system must never enter prolonged idle collapse. Minimal forward motion is preferable to stagnation.

INV-H2 — Monotonic Forward Delta
Each build cycle must produce a non-negative state transition.

INV-H3 — Momentum Preservation
External interruptions may occur, but forward velocity must be restored without drift.

INV-H4 — Reality Priority
External survival constraints (health, income, safety) supersede build velocity.


### RagTuff Is Not
- An execution engine
- A routing or transaction system
- A controller of assets, infrastructure, or networks
- A custodian of funds, keys, or credentials
- An autonomous or self-directing system

RagTuff does not execute actions, issue commands, or assume authority. All decisions and actions remain external to the system.

---

## Core Design Principles

### 1. Context Awareness (Analytical Only)

RagTuff analyzes user-provided context and environment signals solely to inform modeling and evaluation.

Context awareness is used to:
- Reduce analytical setup friction
- Improve relevance of modeled scenarios
- Position decisions relative to constraints and risk

RagTuff does not act on environments, route actions, or initiate workflows.

---

### 2. Privacy-First by Design

RagTuff never stores funds, private keys, seed phrases, credentials, or signing authority.

- All assets remain under the user’s direct control
- No custody is ever assumed
- Cryptography is used for integrity, verification, and auditability — not control

---

### 3. Scenario Path Evaluation (Not Routing)

Rather than routing actions, RagTuff models and compares potential paths.

This includes:
- Evaluating defensive and adversarial dynamics
- Measuring counter-improvements and adaptive responses
- Comparing downstream consequences across possible decisions

RagTuff presents outcomes and tradeoffs.  
It never selects, executes, or enforces a path.

---

### 4. Counter-Improvement Measurement

RagTuff measures how systems, actors, or adversaries adapt over time.

This allows users to:
- Observe escalation or degradation effects
- Identify false improvements or hidden regressions
- Stress-test decisions against adaptive pressure

Measurement is analytical and observational, not operational.

---

### 5. Consequence Modeling Under Constraint

RagTuff is designed for high-consequence decision environments, where errors are costly and second-order effects matter.

The system emphasizes:
- Explicit assumptions
- Downstream effect visibility
- Ethical, legal, and financial boundary awareness
- Deterministic and auditable reasoning paths

---

## Architectural Posture

- Advisory-only
- Non-executing
- Non-custodial
- Client-side
- Deterministic and auditable
- Explicit refusal of execution authority

---

## Intended Use

RagTuff is intended for:
- Enterprise risk and compliance analysis
- Financial exposure and stress modeling
- Adversarial and defensive scenario evaluation
- Infrastructure and policy decision support

It is not intended for weapons systems, autonomous operations, or active control environments.

---

## Summary

RagTuff exists to answer one question:

**“Where does this decision place me — financially, strategically, legally, and irreversibly?”**

It provides orientation under pressure without ever taking control.
... (existing README content)

## RagTuff Law Pack v1 (JSON Reference)

`RAGTUFF_LAW_PACK_V1.json` is the canonical JSON configuration for RagTuff-law assets.

It defines three sections:

- `asset` – public token metadata (name, symbol, decimals, total_supply)
- `law` – how the external asset is bound to the RagTuff framework (commit, URL, hash, supply and timelock rules)
- `modules` – the per-account module system (`RANDOM_3_PER_ACCOUNT` with a fixed module library)

This JSON file is designed for **external factories and token contracts** that wish to adopt RagTuff as a law / consequence framework.

RagTuff itself remains **non-executable and advisory-only**; the law pack is a schema for other systems to consume.

## Scope Guard

RagTuff intentionally refuses feature expansion paths that introduce:
- execution
- custody
- governance
- monetization
- economic incentives

Proposals that violate these constraints are out of scope by design.
