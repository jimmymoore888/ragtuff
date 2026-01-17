/**
 * BasicFlow.adapter.js
 *
 * A concrete Flow implementation that consults one or more
 * SafetyGate adapters and aggregates their advisory output.
 *
 * This file performs NO execution, NO mutation, and NO enforcement.
 */

import { Flow } from "../interfaces/Flow.js";
export const BasicFlow = Object.freeze({
  /**
   * Evaluate context through all configured safety gates.
   *
   * @param {Object} context - Immutable contextual surface
   * @returns {{
   *   allowed: boolean,
   *   reasons: string[],
   *   signals: Object[]
   * }}
   */
    evaluate(context, gates = []) {
    
    const results = gates.map((gate) => gate.evaluate(context));

    const allowed = results.every((r) => r.allowed === true);

    const reasons = results.flatMap((r) => r.reason ? [r.reason] : []);

    const signals = results;

    return {
      allowed,
      reasons,
      signals
    };
  }
});
