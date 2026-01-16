# Contributing to RagTuff

Thank you for your interest in contributing to RagTuff.

RagTuff is infrastructure software built on strict boundaries of authority,
restraint, and user sovereignty. Contributions are welcome only insofar as
they preserve these boundaries.

This document defines the conditions under which contributions are accepted
or rejected.

---

## Core Principle

RagTuff is designed to observe, contextualize, and surface information.
It is not designed to act, decide, execute, or intervene on behalf of users.

Any contribution that increases authority, autonomy, or execution power
within RagTuff is out of scope and will be rejected.

---

## Definition of Disallowed Contributions ("Bad Actor Patterns")

For the purposes of this project, a **bad actor** is not defined by intent,
ethics, or character.

A bad actor is defined **structurally** as any contribution that attempts to:

- Introduce execution of transactions or messages
- Introduce signing, custody, or relay of user assets
- Add autonomous behavior, background processes, or silent defaults
- Convert advisory intelligence into directive or decision-making logic
- Optimize outcomes, routes, or strategies on behalf of the user
- Override, bypass, or infer user intent
- Reduce interpretability in the name of convenience or performance
- Add “temporary” authority with the expectation of later removal

These patterns are disallowed even if:
- They are well-intentioned
- They improve user experience
- They increase adoption
- They are requested by users or partners
- They are framed as safety, compliance, or optimization measures

---

## Non-Negotiable Invariants

All contributions must preserve the following invariants:

- RagTuff never executes actions
- RagTuff never signs or submits transactions
- RagTuff never custodies assets or credentials
- RagTuff never acts autonomously
- RagTuff never provides financial advice
- RagTuff never optimizes outcomes
- RagTuff never overrides explicit user intent
- RagTuff never hides behavior behind defaults
- RagTuff never sacrifices clarity for convenience

If a proposed change cannot truthfully affirm all of the above,
it must not be submitted.

---

## Pull Request Requirements

All pull requests must include an explicit statement confirming:

> “This change does not increase authority, autonomy, execution capability,
> or interpretive power within RagTuff.”

Pull requests that fail to include this statement, or that violate the
invariants above, will be closed without debate.

---

## Forking Policy

If you wish to build software that executes, automates, optimizes, or
acts on behalf of users, you are encouraged to fork RagTuff and do so
under a different name.

RagTuff will not evolve in that direction.

This is a design constraint, not a temporary position.
