# RagTuff
## Core Design Principles
RagTuff is designed as adaptive, privacy-first infrastructure that reduces friction while preserving full user control. Its approach stands out through the following principles:

### 1. Environment Detection
RagTuff intelligently detects the user’s environment, including available wallets and network context, to streamline access and reduce unnecessary setup steps.

### 2. Privacy-First by Design
RagTuff never stores funds, private keys, seed phrases, or credentials and never possesses signing authority. All assets remain under the user’s direct control at all times.

### 3. Flexible and Adaptive Routing
Actions are routed based on user intent rather than forcing users onto specific chains or protocols. RagTuff remains user-centric, avoiding one-size-fits-all workflows.
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
