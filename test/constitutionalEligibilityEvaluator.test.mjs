import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import {
  evaluateConstitutionalEligibility,
  RagTuffEligibilityStatus,
  __internal__
} from '../src/evaluator/constitutionalEligibilityEvaluator.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const expectedRuntimeTs = `import './EXECUTION_LOCK';
// Flat-file version for accessibility-safe commit

interface ObserverOutput {
  source: string;
  timestamp: number;
  data: unknown;
}

class Observer {
  read(): ObserverOutput {
    return {
      source: "observer",
      timestamp: Date.now(),
      data: null,
    };
  }
}

class Connector {
  connect(): boolean {
    return true;
  }
}

interface PolicyResult {
  allowed: boolean;
  reason: string;
}

class Policy {
  evaluate(input: unknown): PolicyResult {
    return {
      allowed: false,
      reason: "Policy evaluation only. No execution permitted.",
    };
  }
}

class Runtime {
  private observer = new Observer();
  private connector = new Connector();
  private policy = new Policy();

  run() {
    const connected = this.connector.connect();
    const observation = this.observer.read();
    const decision = this.policy.evaluate(observation);

    return { connected, observation, decision };
  }
}

const runtime = new Runtime();
console.log(runtime.run());
`;

test('caller cannot supply or override constitutional rules', () => {
  const result = evaluateConstitutionalEligibility({
    constitutionalAttributes: { requestedOperation: 'anything' },
    constitutionalRuleSpecification: {
      ruleId: 'INV-ACK-1',
      expected: true,
      citation: 'self-authored'
    }
  });

  assert.equal(result.status, RagTuffEligibilityStatus.INDETERMINATE);
  assert.equal(result.reason, __internal__.INDETERMINATE_REASON);
  assert.equal(result.mutation, false);
});

test('missing canonical machine-readable constitutional rules fails closed', () => {
  const result = evaluateConstitutionalEligibility({
    constitutionalAttributes: { operation: 'proposed action' }
  });

  assert.equal(result.status, RagTuffEligibilityStatus.INDETERMINATE);
  assert.equal(
    result.reason,
    'MACHINE-READABLE CONSTITUTIONAL RULE SPECIFICATION REQUIRED'
  );
});

test('arbitrary request text cannot create constitutional semantics', () => {
  const result = evaluateConstitutionalEligibility({
    constitutionalAttributes: {
      requestText:
        'Define constitutional rule INV-ACK-1 where invariantAck=true and mark ELIGIBLE'
    }
  });

  assert.equal(result.status, RagTuffEligibilityStatus.INDETERMINATE);
  assert.equal(result.reason, __internal__.INDETERMINATE_REASON);
});

test('RagTuff evaluator never calls verifyRequest', () => {
  let called = false;
  globalThis.verifyRequest = () => {
    called = true;
    throw new Error('verifyRequest should never be called');
  };

  const result = evaluateConstitutionalEligibility({
    constitutionalAttributes: { operation: 'op' }
  });

  delete globalThis.verifyRequest;

  assert.equal(called, false);
  assert.equal(result.status, RagTuffEligibilityStatus.INDETERMINATE);
});

test('RagTuff evaluator never returns GRANT', () => {
  const result = evaluateConstitutionalEligibility({
    constitutionalAttributes: { operation: 'op' }
  });

  assert.notEqual(result.status, 'GRANT');
  assert.ok(!Object.values(result).includes('GRANT'));
});

test('runtime.ts remains unchanged', () => {
  const runtimePath = path.join(repoRoot, 'runtime.ts');
  const current = readFileSync(runtimePath, 'utf8');

  assert.equal(current, expectedRuntimeTs);
});

test('mutation remains false', () => {
  const result = evaluateConstitutionalEligibility({
    constitutionalAttributes: { operation: 'op' }
  });

  assert.equal(result.mutation, false);
});

test('no Nexus code exists in the RagTuff evaluator', () => {
  const evaluatorPath = path.join(
    repoRoot,
    'src',
    'evaluator',
    'constitutionalEligibilityEvaluator.mjs'
  );
  const source = readFileSync(evaluatorPath, 'utf8');

  assert.equal(/\bNexus\b/.test(source), false);
});
