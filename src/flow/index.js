/**
 * RagTuff Flow
 * Composition-only entrypoint.
 * No execution authority. No policy.
 */

import { RagTuffFlow } from './adapters/RagTuffFlow.adapter.js';

export function createFlow({ gates = [] } = {}) {
  return new RagTuffFlow({ gates });
}
