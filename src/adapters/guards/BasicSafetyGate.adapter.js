import SafetyGate from "../interfaces/SafetyGate.interface.js";

export default class BasicSafetyGate extends SafetyGate {
  constructor(options = {}) {
    super();
    this.name = "BasicSafetyGate";
    this.version = "0.1.0";
    this.options = options;
  }

  /**
   * Evaluate whether a given context is allowed to proceed.
   * This adapter is intentionally conservative and non-executing.
   */
  evaluate(context = {}) {
    if (typeof context !== "object" || context === null) {
      return {
        allowed: false,
        reason: "Invalid context: expected an object",
        confidence: 1.0
      };
    }

    return {
      allowed: true,
      reason: "Context structurally valid; no hazards detected at adapter level",
      confidence: 0.25
    };
  }
}
