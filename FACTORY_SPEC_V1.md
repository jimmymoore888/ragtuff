# RagTuff Factory Spec v1

This document defines a minimal factory contract that can deploy
RagTuff-law fungible token contracts using `RAGTUFF_LAW_PACK_V1.json`
(or a compatible object) as input.

The factory is **external** to RagTuff. RagTuff itself remains
non-executable and advisory-only.

---

## 1. Purpose

- Deploy many RagTuff-law fungible tokens from a single master contract.
- Accept a JSON "law pack" as input (asset + law + modules).
- Enforce RagTuff constraints at creation time so that every child token
  is RagTuff-law compliant.

The factory **never**:
- takes custody of user funds
- operates as a controller or governor
- changes the law or modules of already-created tokens.

---

## 2. Interface (high level)

### 2.1. Method: `create_token(config)`

- **Input**: `config` (deserialized `RAGTUFF_LAW_PACK_V1`-compatible object)
- **Output**: `token_account_id` (the account where the new token contract is deployed)

Call pattern (conceptual):

```ts
create_token(config: LawPack) -> AccountId
## 3. Validation Rules

The factory MUST enforce the following rules before creating a token.

### 3.1. Law binding

- `config.law.framework == "RAGTUFF"`
- `config.law.framework_version` is in the allowed version list (for v1, `"1.0"`).
- `config.law.upgradable == false`.

If any of these fail, the token is not considered RagTuff-law compliant and
creation MUST abort.

### 3.2. Supply

- `config.law.supply.type == "FIXED"`.
- `config.law.supply.minting_allowed == false`.

The v1 factory does **not** support mintable or elastic supply variants.

### 3.3. Timelock

If `config.law.timelock.enabled == true`:

- `config.law.timelock.model == "DETERMINISTIC"`.
- `config.law.timelock.interval_years > 0`.
- `config.law.timelock.unlock_window_days > 0`.
- `config.law.timelock.cycles > 0`.

The factory only performs basic sanity checks. The child token contract
is responsible for enforcing the full time semantics.

### 3.4. Modules

- `config.modules.assignment_mode == "RANDOM_3_PER_ACCOUNT"`.
- `config.modules.library_version` is a supported version (e.g. `1`).
- `config.modules.library.length >= 3`.
- All `id` fields in `config.modules.library` are distinct.

If any validation fails, `create_token(config)` MUST abort with a clear error.

---

## 4. Deployment Behavior

If validation succeeds, the factory performs these steps:

### 4.1. Create subaccount

- Derive a new token account ID using the asset symbol and an index or hash.
  Example pattern:

  - symbol `RTS` → lowercase `rts`
  - index `0001`
  - final account: `rts-0001.<factory_root>.near`

The exact naming convention can vary, but the factory MUST guarantee
uniqueness.

### 4.2. Deploy token implementation code

- Deploy a single, pre-audited NEP-141-compatible token WASM.
- On factory initialization, the implementation code hash is stored.
- Before deployment, the factory verifies that the code hash of the
  stored binary matches the expected value.

This ensures all child tokens share the same audited implementation.

### 4.3. Initialize the token contract

- Call the child token’s initializer (e.g. `new(config)`).
- Pass through the full `asset`, `law`, and `modules` sections.
- Set the token’s initial owner/creator to:
  - the caller of `create_token`, or
  - a dedicated `owner_id` field inside `config` (if defined).

### 4.4. Record token metadata

Store a `TokenInfo` record in the factory’s registry containing:

- `token_account_id`
- `creator_account_id`
- a minimal summary, such as:
  - `asset.symbol`
  - `law.framework_commit`
  - `modules.library_version`

This allows explorers and tools to discover RagTuff-law tokens created
by this factory.

---

## 5. Invariants Guaranteed by the Factory

Every token created by `FACTORY_SPEC_V1` MUST satisfy:

- Uses the same audited token implementation code.
- Has a fixed total supply with **no** minting entry points.
- Embeds a RagTuff law reference:
  - `framework == "RAGTUFF"`
  - stable `framework_version`
  - `framework_commit`, `framework_url`, and `framework_hash` stored on-chain.
- Uses `RANDOM_3_PER_ACCOUNT` module assignment with a fixed module library.
- Does not expose any method to change its RagTuff law reference after
  initialization.

Any token that violates these conditions is **not** a RagTuff-law token,
even if it copies naming or surface metadata.

---

## 6. Non-Goals

The factory explicitly does **not**:

- Manage user balances or custody funds.
- Implement governance, voting, or economic incentives.
- Upgrade child token contracts.
- Execute autonomous actions on behalf of users.
- Act as a controller or risk engine.

It is strictly a **deployment tool** that enforces RagTuff constraints at
creation time.

---

## 7. Relationship to RagTuff

- RagTuff (this repo) defines:
  - the decision / consequence framework,
  - the law pack format (`RAGTUFF_LAW_PACK_V1.json`),
  - and high-level constraints for compliant factories and tokens.

- The factory:
  - lives as a separate contract/codebase,
  - consumes the law pack as `config`,
  - guarantees that created tokens respect RagTuff-law v1.

RagTuff itself remains **non-executable and advisory-only**. The factory
and child token contracts are optional external consumers of the law.
