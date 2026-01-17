/**
 * Flow.interface.js
 *
 * A Flow defines how contextual information is evaluated
 * through one or more advisory gates.
 *
 * This interface is declarative only.
 * It MUST NOT execute actions, mutate state, or enforce outcomes.
 */

/**
 * @typedef {Object} FlowResult
 * @property {boolean} allowed - Aggregated advisory outcome
 * @property {string[]} reasons - Human-readable explanations
 * @property {Object[]} signals - Raw gate-level signals (opaque, non-binding)
 */

/**
 * @typedef {Object} Flow
 * @property {(context: Object) => FlowResult} evaluate
 */

export const Flow = Object.freeze({
  /**
   * Evaluate a context through the flow.
   *
   * @param {Object} context - Immutable contextual surface
   * @returns {FlowResult}
   */
  evaluate(context) {
    throw new Error(
      "Flow.evaluate is an interface contract and must be implemented."
    );
  }
});
