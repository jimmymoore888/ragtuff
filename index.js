/**
 * RagTuff Public Interface
 *
 * This module exposes non-custodial, non-signing,
 * environment-aware connectivity primitives.
 *
 * No function in this interface may execute transactions,
 * sign messages, or act autonomously.
 */

export function detectEnvironment() {
  throw new Error("Not implemented: environment detection is advisory only");
}

export function connectWallet() {
  throw new Error("Not implemented: RagTuff never initiates connections");
}

export function routeIntent(intent) {
  throw new Error(
    "Not implemented: intent routing is advisory and non-authoritative"
  );
}
