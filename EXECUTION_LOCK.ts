/**
 * EXECUTION LOCK — NON-REMOVABLE SAFETY BOUNDARY
 *
 * RagTuff is architecturally forbidden from:
 * - Holding private keys
 * - Signing transactions
 * - Broadcasting transactions
 * - Acting as an execution agent
 *
 * This file enforces that constraint at runtime.
 *
 * Removal or circumvention constitutes a violation
 * of project intent and guardrails.
 */

const FORBIDDEN_APIS = [
  'signTransaction',
  'signAllTransactions',
  'sendTransaction',
  'sendRawTransaction',
  'privateKey',
  'secretKey',
  'Keypair',
  'Wallet',
  'Signer',
];

function panic(reason: string): never {
  throw new Error(
    `[RagTuff EXECUTION LOCK] Forbidden execution capability detected: ${reason}`
  );
}

// Global interception guard
export function enforceExecutionLock(scope: Record<string, any>) {
  for (const key of FORBIDDEN_APIS) {
    if (key in scope) {
      panic(key);
    }
  }
}

// Immediate self-check
enforceExecutionLock(globalThis as any);
