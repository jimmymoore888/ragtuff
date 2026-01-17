/**
 * Flow composition entry.
 * No execution authority.
 */

import { RagTuffFlow } from './adapters/RagTuffFlow.adapter.js';

export function createFlow({ gates = [] } = {}) {
  return new RagTuffFlow({ gates });
}
