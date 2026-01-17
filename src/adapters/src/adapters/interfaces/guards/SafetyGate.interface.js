/**
 * SafetyGate Interface Contract
 *
 * This file defines a non-executable contract for evaluating safety conditions.
 * It MUST NOT perform actions, mutate state, access wallets, or trigger execution.
 *
 * Implementations may evaluate context and return an assessment only.
 */

/**
 * @typedef {Object} SafetyAssessment
 * @property {boolean} allowed - Whether the action is permitted.
 * @property {string} reason - Human-readable explanation.
 * @property {string[]} flags - Optional machine-readable markers.
 */

/**
 * @interface SafetyGate
 */
export class SafetyGate {
  /**
   * Evaluate a proposed action in context.
   *
   * @param {Object} context - Read-only contextual data.
   * @returns {SafetyAssessment}
   */
  evaluate(context) {
    throw new Error("SafetyGate.evaluate() must be implemented.");
  }
}
