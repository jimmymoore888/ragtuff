# RagTuff

Early infrastructure for safe, non-custodial wallet connectivity.

RagTuff is a client-side SDK designed to adapt to the crypto environment instead of forcing users or developers to adapt to it.

## What it does
- Detects the user environment and available wallets
- Evaluates live network conditions
- Routes actions based on user intent
- Never holds funds, private keys, or signing authority

## Principles
- Non-custodial by design
- No silent signing
- No forced chains
- Deterministic and inspectable behavior

## Status
RagTuff is early-stage infrastructure.

The value is in the foundation and the risk it removes.  
The real upside comes with adoption.

## Usage
```ts
import { RagTuff } from 'ragtuff'

await RagTuff.connect()
