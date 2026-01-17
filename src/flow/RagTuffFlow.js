/**
 * RagTuffFlow
 *
 * Declarative lifecycle sequencing for RagTuff.
 * This file defines the allowed phases of operation,
 * without performing execution or invoking adapters.
 *
 * Flow must never exceed Context.
 */

export const RagTuffFlow = Object.freeze({
  BOOTSTRAP: "bootstrap",
  CONTEXT_READY: "context_ready",
  SAFETY_EVALUATION: "safety_evaluation",
  INTENT_DECLARATION: "intent_declaration",
  ADAPTER_CONSIDERATION: "adapter_consideration",
  TERMINATION: "termination",
});
