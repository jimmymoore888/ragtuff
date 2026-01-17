/**
 * RagTuffEngine
 * Orchestrates flow evaluation without execution authority.
 */
export class RagTuffEngine {
  constructor({ flow }) {
    this.flow = flow;
  }

  run(context) {
    const result = this.flow.evaluate(context);

    return Object.freeze({
      allowed: result.allowed,
      reasons: result.reasons,
      signals: result.signals,
      meta: {
        evaluatedAt: Date.now(),
        engine: 'ragtuft-engine'
      }
    });
  }
}
