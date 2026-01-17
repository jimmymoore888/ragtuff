/**
 * SafetyGate Interface Contract
 *
 * This interface defines a non-executable, non-authoritative
 * safety evaluation boundary.
 *
 * - MUST NOT perform actions
 * - MUST NOT mutate state
 * - MUST NOT access external systems
 *
 * Implementations may evaluate context and flow,
 * but may only return a declarative assessment.
 */

/**
 * @typedef {Object} SafetyAssessment
 * @property {boolean} allowed - Whether the flow is permitted to proceed
 * @property {string} reason - Human-readable justification
 * @property {string[]} flags - Optional categorical signals (e.g. "risk", "policy")
 */

/**
 * @interface SafetyGate
 */
export class SafetyGate {
  /**
   * Evaluate a flow within a given context.
   *
   * @param {Object} context - Immutable RagTuffContext
   * @param {Object} flow - Declarative RagTuffFlow
   * @returns {SafetyAssessment}
   */
  evaluate(context, flow) {
    throw new Error("SafetyGate.evaluate() must be implemented by an adapter.");
  }
}
