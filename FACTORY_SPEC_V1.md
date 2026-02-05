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
