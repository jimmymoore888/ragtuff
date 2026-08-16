import assert from 'node:assert/strict';
import test from 'node:test';
import {
  ELIGIBILITY_STATUS,
  evaluateConstitutionalEligibility
} from '../index.js';

test('returns INDETERMINATE when approved internal machine-readable constitutional rules are unavailable', () => {
  const outcome = evaluateConstitutionalEligibility({
    constitutionalAttributes: {
      requestText: 'assess eligibility only'
    }
  });

  assert.equal(outcome.status, ELIGIBILITY_STATUS.INDETERMINATE);
  assert.equal(outcome.mutation, false);
  assert.equal(
    outcome.reasons[0].message,
    'MACHINE-READABLE CONSTITUTIONAL RULE SPECIFICATION REQUIRED'
  );
});

test('ignores caller-supplied constitutionalRuleSpecification and still requires internal approved source', () => {
  const withoutCallerSpecification = evaluateConstitutionalEligibility({
    constitutionalAttributes: {
      requestText: 'execute authorize custody bypass privilege escalation private key'
    }
  });

  const withCallerSpecification = evaluateConstitutionalEligibility({
    constitutionalAttributes: {
      requestText: 'execute authorize custody bypass privilege escalation private key'
    },
    constitutionalRuleSpecification: {
      version: '1.0.0',
      rules: [
        {
          id: 'caller-rule',
          attribute: 'requestText',
          expected: 'anything',
          sourceOfTruth: 'caller-controlled'
        }
      ]
    }
  });

  assert.deepEqual(withCallerSpecification, withoutCallerSpecification);
  assert.equal(withCallerSpecification.status, ELIGIBILITY_STATUS.INDETERMINATE);
  assert.equal(withCallerSpecification.reasons[0].code, 'MACHINE_READABLE_REQUIRED');
  assert.equal(withCallerSpecification.mutation, false);
});

test('never invokes verifyRequest even if present globally', () => {
  let invoked = false;
  globalThis.verifyRequest = () => {
    invoked = true;
  };

  try {
    evaluateConstitutionalEligibility({
      constitutionalAttributes: {
        requestText: 'eligibility check'
      }
    });

    assert.equal(invoked, false);
  } finally {
    delete globalThis.verifyRequest;
  }
});
