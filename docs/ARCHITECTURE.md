# RagTuff Architecture

This document defines the canonical architecture of RagTuff.

It exists to enforce the non-custodial, user-sovereign, and safety-first
principles defined in the README. Code must conform to this structure.
This document has higher authority than individual implementations.

---

## Architectural Model

RagTuff is a **hybrid sovereign node**:

- Personal by default
- Federated by choice
- Shared protocol, never shared control

Execution occurs locally or in user-controlled environments.
No centralized authority exists within RagTuff.

---

## High-Level Structure

RagTuff is organized into clearly separated layers to prevent
accidental custody, coercion, or privilege escalation.
Each layer has strict responsibility boundaries.

---

## Core Layer

**Purpose:** Node lifecycle and enforcement of system-wide constraints.

Responsibilities:
- Node initialization and shutdown
- Configuration loading
- Capability enforcement
- Explicit failure handling

Constraints:
- Core may not bypass permission checks
- Core may not elevate privileges automatically
- Core must surface consequences before action

---

## Wallet Layer

**Purpose:** Wallet discovery and connection negotiation only.

Responsibilities:
- Wallet detection
- Session negotiation
- Capability classification (read / sign / execute)

Explicitly forbidden:
- Private key storage
- Background signing
- Implicit execution
- Silent permission escalation

Detection, connection, and signing are intentionally separated.

---

## Network Layer

**Purpose:** Blockchain and network abstraction.

Responsibilities:
- Chain definitions
- RPC/provider abstraction
- Adapter interfaces per network

Constraints:
- No bundled custodial services
- No embedded private RPC keys
- Providers must be replaceable and observable

---

## Federation Layer

**Purpose:** Optional node-to-node interaction.

Responsibilities:
- Node discovery (opt-in)
- Capability handshake
- Policy enforcement

Constraints:
- No automatic trust
- No shared state
- No remote execution authority
- Federation is optional and reversible

---

## Security Layer

**Purpose:** Hard enforcement of safety boundaries.

Responsibilities:
- Permission scopes
- Action auditing (local)
- Non-bypassable guardrails

Security code may not be disabled by configuration.

---

## No-Go Zone (Permanent)

RagTuff will never include:

- Custody of keys or funds
- Background or automated signing
- Forced execution
- Profit guarantees
- Trading automation
- Central command authority

If a feature requires any of the above, it is incompatible with RagTuff.

---

## Allowed Capabilities

RagTuff may:

- Detect wallets
- Negotiate connections
- Read blockchain state
- Prepare unsigned transactions
- Request explicit user-side signing
- Interoperate with other nodes without obedience

---

## Architectural Authority

This document is canonical.

If implementation conflicts with this architecture,
the implementation must change — not the architecture.
