/**
 * ConservativeSafetyGate Adapter
 *
 * A stricter, defensive implementation of the SafetyGate interface.
 * This adapter is intentionally cautious and denies by default
 * when insufficient context is provided.
 *
 * It performs NO execution and carries NO authority.
 */

import { SafetyGate } from '../interfaces/guards/SafetyGate.interface.js';

export class ConservativeSafetyGate extends SafetyGate {
  /**
   * @param {Object} context
   * @returns {SafetyAssessment}
   */
  assess(context) {
    if (!context || typeof context !== 'object') {
      return {
        allowed: false,
        reason: 'Missing or invalid context',
        flags: ['no-context', 'deny-by-default']
      };
    }

    return {
      allowed: false,
      reason: 'Conservative gate requires explicit allowance',
      flags: ['conservative', 'manual-review-recommended']
    };
  }
}
