# RagTuff Intent Contract

## Purpose
An Intent represents a user's expressed goal or request.
Intents are declarative, non-executing, and non-authoritative.

RagTuff may observe, annotate, or contextualize an Intent.
RagTuff may never act on an Intent.

---

## Core Properties

### intent.type
**Required.**
A high-level category describing the user's goal.

Examples (non-exhaustive):
- "connect"
- "observe"
- "route"
- "inspect"

This field must never imply execution.

---

### intent.target
**Optional.**
A user-specified reference (e.g., network name, wallet provider, resource).

RagTuff does not validate or act on the target.
It is treated as informational context only.

---

### intent.constraints
**Optional.**
User-declared limits or preferences.

Examples:
- preferred networks
- excluded environments
- privacy preferences

Constraints restrict suggestions only.
They never cause action.

---

### intent.context
**Optional.**
User-supplied metadata.

Examples:
- environment hints
- session metadata
- application state

Context may be surfaced or annotated.
It may not alter authority.

---

### intent.confirmation
**Optional.**
A boolean indicating whether the user explicitly acknowledges
that RagTuff does not act on their behalf.

If present, this field reinforces non-autonomy.
If absent, RagTuff must assume no permission to act.

---

## Explicit Non-Guarantees

An Intent:
- is not a command
- is not a transaction
- is not advice
- is not executable
- does not imply approval or recommendation

---

## Invariants

The following are invariant and non-negotiable:

- Intents are user-initiated only
- Intents are never auto-generated
- Intents never trigger execution
- Intents never grant authority
- Intents never bypass user confirmation
