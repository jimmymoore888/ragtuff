import assert from 'node:assert/strict';
import test from 'node:test';
import {
  ELIGIBILITY_STATUS,
  evaluateConstitutionalEligibility
} from '../index.js';

test('returns INDETERMINATE when machine-readable rule spec is missing', () => {
  const outcome = evaluateConstitutionalEligibility({ constitutionalAttributes: {} });

  assert.equal(outcome.status, ELIGIBILITY_STATUS.INDETERMINATE);
  assert.equal(outcome.mutation, false);
  assert.equal(
    outcome.reasons[0].message,
    'MACHINE-READABLE CONSTITUTIONAL RULE SPECIFICATION REQUIRED'
  );
});

test('does not infer constitutional violation from request text keywords', () => {
  const outcome = evaluateConstitutionalEligibility({
    constitutionalAttributes: {
      requestText: 'execute authorize custody bypass privilege escalation private key',
      invariantAck: true
    },
    constitutionalRuleSpecification: {
      version: '1.0.0',
      rules: [
        {
          id: 'INV-ACK-1',
          attribute: 'invariantAck',
          expected: true,
          sourceOfTruth: 'INVARIANTS.md#L1'
        }
      ]
    }
  });

  assert.equal(outcome.status, ELIGIBILITY_STATUS.ELIGIBLE);
  assert.equal(outcome.mutation, false);
});

test('returns NOT_ELIGIBLE on explicit rule mismatch only', () => {
  const outcome = evaluateConstitutionalEligibility({
    constitutionalAttributes: {
      invariantAck: false
    },
    constitutionalRuleSpecification: {
      version: '1.0.0',
      rules: [
        {
          id: 'INV-ACK-1',
          attribute: 'invariantAck',
          expected: true,
          sourceOfTruth: 'INVARIANTS.md#L1'
        }
      ]
    }
  });

  assert.equal(outcome.status, ELIGIBILITY_STATUS.NOT_ELIGIBLE);
  assert.equal(outcome.reasons[0].code, 'RULE_MISMATCH');
  assert.equal(outcome.mutation, false);
  assert.equal('disposition' in outcome, false);
});

test('never invokes verifyRequest even if present globally', () => {
  let invoked = false;
  globalThis.verifyRequest = () => {
    invoked = true;
  };
  try {
    evaluateConstitutionalEligibility({
      constitutionalAttributes: { invariantAck: true },
      constitutionalRuleSpecification: {
        version: '1.0.0',
        rules: [
          {
            id: 'INV-ACK-1',
            attribute: 'invariantAck',
            expected: true,
            sourceOfTruth: 'INVARIANTS.md#L1'
          }
        ]
      }
    });

    assert.equal(invoked, false);
  } finally {
    delete globalThis.verifyRequest;
  }
});
