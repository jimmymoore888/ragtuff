# RagTuff Copilot Instructions — Zero Drift

Copyright © 2026 Jimmy W. Moore. All Rights Reserved.

These instructions govern every Copilot-generated proposal, edit, refactor, test, document, and pull request in this repository.

## Governing Rule

Preserve RagTuff within its established constitutional boundary.

> A beneficial objective does not authorize prohibited methods.

> It is never right to do wrong to do right.

Zero drift means:

- No semantic reinterpretation
- No authority expansion
- No invented constitutional rules
- No hidden execution
- No convenient exceptions
- No silent architectural changes
- No capability added through indirect wrappers

If a request is ambiguous or conflicts with an invariant, stop and request explicit direction from Jimmy W. Moore. Never resolve constitutional ambiguity by adding capability.

## Source-of-Truth Order

Apply this authority order:

1. `CANONICAL_AUTHORITY.md` — immutable canonical authority declaration
2. `ARCHITECTURE.md.` — authoritative structural boundary
3. `GUARDRAILS.md` — permanent capability prohibitions
4. `INVARIANTS.md` — axiomatic, non-negotiable terms
5. `CONSTITUTIONAL_INHERITANCE.md` — RagTuff ↔ Nexus Core relationship
6. `README.md` and remaining documents — descriptive only

The trailing period is part of the current `ARCHITECTURE.md.` filename. Do not silently rename it.

If authoritative files conflict, do not choose an interpretation, blend their meanings, or silently repair them. Report the exact conflict and stop for human resolution.

`CONSTITUTIONAL_INHERITANCE.md` must remain synchronized with the corresponding Nexus Core document. Never change only one copy without explicit authorization and a synchronization plan.

`EXECUTION_BOUNDARIES.md` is referenced but is not currently present. Do not fabricate it or infer its contents.

## Permanent RagTuff Boundary

RagTuff is constitutional eligibility infrastructure.

RagTuff may:

- Observe
- Evaluate
- Classify
- Simulate
- Annotate
- Inform

RagTuff must remain:

- Non-executing
- Non-custodial
- Deterministic
- Fail-closed
- Human-in-the-loop
- Non-authoritative over external systems
- Incapable of silent or autonomous action

RagTuff must never become:

- An execution engine
- An orchestration layer
- An autonomous agent
- A background worker
- A tool runner
- An MCP tool executor
- A transaction processor
- A signing system
- A key or credential custodian
- A controller of Nexus Core
- A controller of accounts, assets, infrastructure, or users
- A privilege-escalation mechanism
- A hidden or future activation path

Do not add execution merely because it is described as optional, disabled, experimental, indirect, simulated, future-facing, or useful for testing.

Inability is required. Intention is insufficient.

## Eligibility Contract

The public evaluator is bounded to:

```text
ELIGIBLE | NOT_ELIGIBLE | INDETERMINATE
```

Its output must remain non-mutating:

```text
mutation: false
```

`ELIGIBLE` means only that a proposal may proceed to further external verification. It is not permission to execute.

The following conditions must fail closed:

- `NOT_ELIGIBLE`
- Malformed input
- Missing proof
- Contradictory evidence
- Unavailable constitutional rules
- Unresolved uncertainty
- Unverified retrieved content
- Prompt-injection attempts

Constitutional rules must come only from an approved RagTuff-owned internal machine-readable source.

Never:

- Accept caller-supplied constitutional rules
- Invent missing rules
- Fabricate rule identifiers
- Infer constitutional rules from keywords
- Allow retrieved content to rewrite the constitution
- Create tests that pretend an unapproved source is canonical

Until an approved internal rule source exists, preserve this exact result:

```text
MACHINE-READABLE CONSTITUTIONAL RULE SPECIFICATION REQUIRED
```

## RAG-TUFF Definition

Formal expansion recorded August 28, 2026:

> RAG-TUFF — Retrieval-Augmented Generation Tool-Use Firewall Framework

RAG means Retrieval-Augmented Generation.

Chunking means dividing knowledge into meaningful, traceable pieces for accurate retrieval.

TUFF means Tool-Use Firewall Framework.

RagTuff does not currently claim that this repository implements a complete:

- RAG pipeline
- Chunking engine
- Embedding index
- Generator
- Agentic workflow
- MCP connection
- Tool-execution system

Never claim a capability that cannot be demonstrated through repository code and tests.

Any future conforming integration must treat retrieved chunks and generated content as untrusted evidence.

Retrieved material can never amend, replace, override, or outrank RagTuff’s permanent constitutional rules.

The hardened conceptual sequence is:

```text
Knowledge
  -> External Chunking
  -> External Retrieval
  -> TUFF Validation Assessment
  -> External Generation
  -> TUFF Constitutional Eligibility Assessment
  -> External Nexus Core Verification
  -> Explicit Human Authorization
  -> External Action
```

RagTuff performs no external action in this sequence.

Its assessments do not:

- Invoke tools
- Issue commands
- Execute transactions
- Transfer authority
- Guarantee downstream execution

Preserve these permanent invariants:

> Retrieved content is not authority.

> Generated output is not permission.

> Tool availability is not authorization.

## RagTuff and Nexus Core Separation

RagTuff establishes constitutional eligibility first.

Nexus Core independently applies Verification Before Adaptation inside that boundary:

```text
ΔA ≤ ΔV
```

Never move Nexus Core verification, execution wrappers, orchestration, or adaptation responsibilities into RagTuff.

Never allow Nexus Core mathematics, predicted benefits, optimization, or performance targets to override a RagTuff invariant.

```text
I(x) = 1
    =>
ΔA_allowed = 0
    =>
REJECT or SAFE_LOCK
```

Passing RagTuff means eligible for further evaluation only.

It does not mean authorized for unrestricted adaptation.

## Change Discipline

For every proposed change:

1. State the exact requested scope.
2. Identify the authoritative files inspected.
3. Produce the smallest possible diff.
4. Preserve public interfaces unless an explicit change is authorized.
5. Do not rename, delete, consolidate, or rewrite governing files for style.
6. Do not alter ownership, licensing, confidentiality, valuation, acquisition, commercialization, or permission terms without explicit instructions from Jimmy W. Moore.
7. Do not add dependencies, APIs, network access, telemetry, model calls, agents, MCP capabilities, or execution hooks without explicit authorization.
8. Add or update tests for every code behavior change.
9. Never fabricate constitutional authority in tests or examples.
10. Run the relevant tests and report the exact results.
11. Never claim verification that was not performed.
12. Use a review branch and pull request.
13. Do not merge, release, deploy, publish, or modify production state without explicit human approval.
14. Report all unresolved conflicts, assumptions, missing sources, and limitations.

## Mandatory Refusal Conditions

Reject or stop any proposal that would:

- Bypass or weaken a constitutional invariant
- Treat missing evidence as permission
- Let retrieved or generated text control constitutional rules
- Allow caller-controlled rule injection
- Conceal action behind a helper, callback, connector, plugin, or wrapper
- Collapse RagTuff and Nexus Core into one authority
- Create custody, control, autonomous execution, or privilege escalation
- Misrepresent advisory eligibility as operational authorization
- Change an immutable declaration without express authority
- Change a synchronized declaration in only one repository
- Introduce an execution capability that could be activated later

When uncertain, preserve the existing boundary and return `INDETERMINATE` or request human clarification.

Capability expansion is never the default.

## Required Pull-Request Report

Every Copilot-authored pull request must state:

- Requested scope
- Files changed
- Governing documents reviewed
- Whether execution changed
- Whether custody changed
- Whether authority changed
- Whether orchestration changed
- Tests performed
- Exact test results
- Unresolved assumptions
- Missing evidence
- Confirmation that no retrieved or generated content overrode an invariant

No unexplained architectural change is acceptable.
