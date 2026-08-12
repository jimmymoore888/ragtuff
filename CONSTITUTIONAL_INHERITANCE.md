CONSTITUTIONAL INHERITANCE

Version: 1.0.0
Date: August 11, 2026
Author: Jimmy W. Moore
Status: Governing Architecture Declaration

⸻

1. Purpose

This document formally declares the constitutional inheritance and governing relationship between RagTuff and Nexus Core.

This document is intentionally mirrored without modification in both repositories.

The copy contained in RagTuff and the copy contained in Nexus Core represent the same architectural declaration and shall remain synchronized.

Neither repository may interpret this declaration in a manner that defeats the governing function of the other.

The governing architecture is:

[
\boxed{
\text{Foundational Moral Principle}
\rightarrow
\text{RagTuff Constitutional Boundaries}
\rightarrow
\text{Nexus Core Verification Gate}
\rightarrow
\text{ALLOW / REJECT / SAFE_LOCK}
}
]

⸻

2. Foundational Principle

The governing principle of the combined architecture is:

A beneficial objective does not authorize prohibited methods.

A system may not justify an otherwise prohibited action solely because the system predicts, calculates, claims, or expects that the action will produce a beneficial outcome.

The objective does not erase the boundary.

The expected benefit does not override the invariant.

The optimization target does not create authority.

⸻

3. RagTuff — Constitutional Boundary Layer

RagTuff defines the constitutional boundary.

RagTuff establishes the invariants governing what the architecture must not authorize.

These boundaries include the prohibited classes formally defined by RagTuff, including applicable restrictions concerning:

* unbounded authority;
* hidden or unauthorized execution;
* unauthorized custody or control;
* privilege escalation;
* prohibited manipulation;
* bypass of established authority boundaries;
* irreversible or insufficiently recoverable harm;
* circumvention of constitutional safeguards.

RagTuff therefore answers the first governing question:

Is this action constitutionally permissible at all?

If the answer is NO, downstream optimization, adaptation, predicted utility, efficiency, performance, or claimed benefit cannot convert the prohibited action into an authorized action.

⸻

4. Nexus Core — Verification and Adaptation Layer

Nexus Core operates within the constitutional boundary established by RagTuff.

Nexus Core applies the principle:

Verification Before Adaptation

[
\boxed{
\Delta A \leq \Delta V
}
]

where:

[
\Delta A

\text{permitted increase in adaptation or operational capability}
]

and:

[
\Delta V

\text{verified increase in the system’s ability to safely validate, constrain, observe, recover, or govern that adaptation}
]

Nexus Core therefore answers the second governing question:

If the proposed action is constitutionally permissible, has sufficient verification capacity been established to authorize the proposed adaptation?

Nexus Core does not obtain authority from its verification mathematics to override a RagTuff invariant.

⸻

5. Constitutional Precedence

Define:

[
I(x)=
\begin{cases}
1, & \text{if action }x\text{ violates one or more governing invariants}\
0, & \text{if no governing invariant is violated}
\end{cases}
]

If:

[
I(x)=1
]

then:

[
\boxed{
\Delta A_{\text{allowed}}=0
}
]

and the action shall not proceed under the combined architecture.

Operational disposition shall be:

[
\boxed{
\text{REJECT}
}
]

or, where continued operation cannot be safely established:

[
\boxed{
\text{SAFE_LOCK}
}
]

If:

[
I(x)=0
]

then and only then may Nexus Core evaluate the permissible adaptation envelope:

[
\boxed{
0\leq\Delta A_{\text{allowed}}\leq\Delta V
}
]

Therefore:

Verification capacity may constrain a constitutionally permissible action, but verification capacity cannot make a constitutionally prohibited action permissible.

⸻

6. No Beneficial-Outcome Override

The combined architecture explicitly rejects reasoning of the following form:

[
\text{Predicted Benefit}

\text{Predicted Harm}
\Rightarrow
\text{Automatic Authorization}
]

when the proposed action violates a governing invariant.

A system cannot obtain authorization merely by asserting:

“The prohibited action is necessary because the final result will be beneficial.”

Under this architecture:

[
\boxed{
\text{Constitutional Permission}
\text{ precedes }
\text{Optimization}
}
]

No optimization objective, utility calculation, performance target, adaptation request, economic incentive, autonomous decision, or predicted beneficial outcome supersedes a governing invariant.

⸻

7. Architectural Inheritance

The relationship between the systems is:

[
\boxed{
\text{RagTuff}
\rightarrow
\text{Nexus Core}
\rightarrow
\text{Operational Decision}
}
]

RagTuff establishes the boundary.

Nexus Core governs verified adaptation inside that boundary.

REJECT and SAFE_LOCK provide operational expressions of the refusal to proceed when governing requirements are not satisfied.

Accordingly:

[
\boxed{
\text{BOUNDARY}
+
\text{VERIFICATION}

\text{CONSTRAINED EXECUTION}
}
]

Neither component shall be interpreted in a manner that nullifies the governing function of the other.

⸻

8. Standalone Operational Independence

Constitutional inheritance does not require RagTuff and Nexus Core to operate as a single executable program.

Nothing in this declaration prevents either repository from being independently:

* cloned;
* built;
* compiled;
* executed;
* tested;
* simulated;
* benchmarked;
* audited;
* inspected;
* validated;
* researched;
* evaluated;
* subjected to CI/CD testing;
* subjected to adversarial or failure testing within authorized conditions.

Nexus Core may therefore continue to operate and run its own tests independently.

RagTuff may likewise be evaluated independently.

The governing distinction is:

[
\boxed{
\text{Standalone Execution}
\neq
\text{Standalone Authority}
}
]

Independent execution does not eliminate constitutional inheritance when the system is being interpreted, integrated, deployed, or represented as part of the combined architecture.

⸻

9. No Runtime Dependency Created by This File

This declaration is an architectural governance contract.

It does not, by itself, create a mandatory:

* runtime dependency;
* package dependency;
* network dependency;
* API dependency;
* shared process;
* shared executable;
* shared database;
* shared test runner;
* shared build system;
* shared deployment environment.

The repositories may retain independent engineering environments.

Any future technical integration between RagTuff and Nexus Core shall preserve the governing precedence established by this declaration.

⸻

10. Non-Override Rule

Nexus Core SHALL NOT interpret:

[
\Delta A\leq\Delta V
]

as authority to violate a RagTuff invariant.

Likewise, RagTuff SHALL NOT be interpreted as eliminating Nexus Core’s requirement for verification before adaptation merely because an action has passed the constitutional boundary.

Passing RagTuff means:

[
\text{The action is eligible for further evaluation.}
]

It does not automatically mean:

[
\text{The action is authorized for unrestricted adaptation.}
]

Nexus Core must still determine the permitted adaptation envelope.

⸻

11. Fail-Closed Governing Logic

The combined architecture follows the logical sequence:

REQUEST
   |
   v
RAGTUFF CONSTITUTIONAL CHECK
   |
   +---- VIOLATION ----> REJECT / SAFE_LOCK
   |
   v
NO CONSTITUTIONAL VIOLATION
   |
   v
NEXUS CORE VERIFICATION
   |
   +---- ΔA > ΔV ----> REJECT / LIMIT / SAFE_LOCK
   |
   v
ΔA <= ΔV
   |
   v
AUTHORIZED WITHIN VERIFIED BOUNDS

Where required constitutional or verification information is unavailable, indeterminate, contradictory, or insufficient, the absence of proof shall not automatically be treated as proof of permission.

The architecture shall fail toward the safer authorized state.

⸻

12. Lock-and-Key Relationship

RagTuff and Nexus Core are architecturally interlocked but operationally separable.

RagTuff supplies the constitutional boundary.

Nexus Core supplies the verification constraint governing adaptation inside that boundary.

The relationship can therefore be represented as:

[
\boxed{
\text{RagTuff}
;\longleftrightarrow;
\text{CONSTITUTIONAL INHERITANCE}
;\longleftrightarrow;
\text{Nexus Core}
}
]

The constitutional inheritance declaration is the explicit interface connecting the governing functions of both architectures.

⸻

13. Synchronization Requirement

This file shall exist under the identical filename:

CONSTITUTIONAL_INHERITANCE.md

in both repositories.

The intended repository structure is:

RagTuff/
├── README.md
├── CONSTITUTIONAL_INHERITANCE.md
└── ...
Nexus-Core/
├── README.md
├── CONSTITUTIONAL_INHERITANCE.md
└── ...

The two copies should remain textually identical.

A modification to the governing declaration should be reflected in both repositories so that engineers, auditors, researchers, reviewers, and prospective acquirers encounter the same governing architecture regardless of which repository they inspect first.

Version identifiers should remain synchronized.

Where cryptographic integrity verification is used, matching file hashes may be recorded to demonstrate that both repositories contain the identical declaration.

⸻

14. Governing Invariant

The combined governing invariant is:

[
\boxed{
I(x)=1
\Rightarrow
\Delta A_{\text{allowed}}=0
}
]

otherwise:

[
\boxed{
I(x)=0
\Rightarrow
0\leq\Delta A_{\text{allowed}}\leq\Delta V
}
]

Therefore:

[
\boxed{
\text{No claimed beneficial outcome authorizes a prohibited method.}
}
]

and:

[
\boxed{
\text{No permissible method authorizes adaptation beyond verified capacity.}
}
]

Together these establish the governing relationship:

[
\boxed{
\text{RagTuff Constitutional Boundary}
+
\text{Nexus Core Verification Before Adaptation}

\text{Constitutionally Constrained, Verified Adaptation}
}
]

⸻

Declaration

This document establishes the explicit architectural inheritance between RagTuff and Nexus Core.

RagTuff defines the boundary.

Nexus Core verifies adaptation within the boundary.

Neither overrides the other.

Neither predicted benefit nor optimization creates authority to cross a prohibited boundary.

Independent testing and execution remain permitted without dissolving the governing relationship.

⸻

Document: CONSTITUTIONAL_INHERITANCE.md
Version: 1.0.0
Established: August 11, 2026
Author: Jimmy W. Moore
