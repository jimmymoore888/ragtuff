const test = require('node:test');
const assert = require('node:assert/strict');

const {
  ELIGIBILITY_VALUES,
  assessConstitutionalEligibility,
  applyNexusEligibilityGate,
} = require('../src/constitutional/eligibilityGate');

test('TEST 1 — ELIGIBLE + NEXUS PASS -> GRANT', () => {
  const request = { request_id: 't1', intent: 'observe market state' };
  const eligibility = assessConstitutionalEligibility(request);

  const result = applyNexusEligibilityGate({
    request,
    eligibilityResult: eligibility,
    verifyRequest: () => ({
      disposition: 'GRANT',
      delta_a_allowed: 0.2,
    }),
  });

  assert.equal(result.constitutional_eligibility, ELIGIBILITY_VALUES.ELIGIBLE);
  assert.equal(result.disposition, 'GRANT');
  assert.equal(result.nexus_verification_executed, true);
});

test('TEST 2 — NOT_ELIGIBLE even if Nexus would pass -> REJECT and no Nexus verification', () => {
  const request = {
    request_id: 't2',
    intent: 'execute external transfer',
    invariant_hints: ['execution'],
  };
  const eligibility = assessConstitutionalEligibility(request);
  let verifyExecuted = false;

  const result = applyNexusEligibilityGate({
    request,
    eligibilityResult: eligibility,
    verifyRequest: () => {
      verifyExecuted = true;
      return { disposition: 'GRANT', delta_a_allowed: 0.2 };
    },
  });

  assert.equal(eligibility.constitutional_eligibility, ELIGIBILITY_VALUES.NOT_ELIGIBLE);
  assert.equal(result.delta_a_allowed, 0);
  assert.equal(result.disposition, 'REJECT');
  assert.equal(result.nexus_verification_executed, false);
  assert.equal(verifyExecuted, false);
});

test('TEST 3 — INDETERMINATE -> FAIL CLOSED', () => {
  let verifyExecuted = false;
  const result = applyNexusEligibilityGate({
    request: { request_id: 't3' },
    eligibilityResult: {
      request_id: 't3',
      constitutional_eligibility: ELIGIBILITY_VALUES.INDETERMINATE,
      violated_invariants: [],
      reasoning_code: 'INDETERMINATE_OR_INSUFFICIENT_INPUT',
      mutation: false,
    },
    verifyRequest: () => {
      verifyExecuted = true;
      return { disposition: 'GRANT' };
    },
  });

  assert.equal(result.gate_outcome, 'FAIL_CLOSED');
  assert.equal(result.delta_a_allowed, 0);
  assert.equal(result.nexus_verification_executed, false);
  assert.equal(verifyExecuted, false);
});

test('TEST 4 — Missing RagTuff result -> FAIL CLOSED', () => {
  const result = applyNexusEligibilityGate({
    request: { request_id: 't4' },
    verifyRequest: () => ({ disposition: 'GRANT' }),
  });

  assert.equal(result.gate_outcome, 'FAIL_CLOSED');
  assert.equal(result.delta_a_allowed, 0);
  assert.equal(result.nexus_verification_executed, false);
});

test('TEST 5 — Malformed RagTuff result -> FAIL CLOSED', () => {
  const malformed = {
    request_id: 't5',
    constitutional_eligibility: 'ELIGIBLE',
    violated_invariants: [],
    mutation: true,
  };

  const result = applyNexusEligibilityGate({
    request: { request_id: 't5' },
    eligibilityResult: malformed,
    verifyRequest: () => ({ disposition: 'GRANT' }),
  });

  assert.equal(result.gate_outcome, 'FAIL_CLOSED');
  assert.equal(result.delta_a_allowed, 0);
  assert.equal(result.nexus_verification_executed, false);
});

test('TEST 6 — ELIGIBLE + NEXUS FAIL -> REJECT/SAFE_LOCK preserved', () => {
  const request = { request_id: 't6', intent: 'inspect only' };
  const eligibility = assessConstitutionalEligibility(request);

  const result = applyNexusEligibilityGate({
    request,
    eligibilityResult: eligibility,
    verifyRequest: () => ({ disposition: 'SAFE_LOCK', delta_a_allowed: 0 }),
  });

  assert.equal(result.nexus_verification_executed, true);
  assert.equal(result.disposition, 'SAFE_LOCK');
});

test('TEST 7 — Public bypass attempt blocked without valid eligibility', () => {
  let verifyExecuted = false;
  const result = applyNexusEligibilityGate({
    request: { request_id: 't7' },
    eligibilityResult: {
      request_id: 't7',
      constitutional_eligibility: 'ELIGIBLE',
      violated_invariants: [],
      reasoning_code: '',
      mutation: false,
    },
    verifyRequest: () => {
      verifyExecuted = true;
      return { disposition: 'GRANT' };
    },
  });

  assert.equal(result.gate_outcome, 'FAIL_CLOSED');
  assert.equal(result.nexus_verification_executed, false);
  assert.equal(verifyExecuted, false);
});

test('TEST 8 — Constitutional violation with strong evidence still blocks Nexus grant', () => {
  const request = {
    request_id: 't8',
    intent: 'bypass governance control',
    invariant_hints: ['bypass'],
  };
  const eligibility = assessConstitutionalEligibility(request);
  let verifyExecuted = false;

  const result = applyNexusEligibilityGate({
    request,
    eligibilityResult: eligibility,
    verifyRequest: () => {
      verifyExecuted = true;
      return { disposition: 'GRANT', delta_a_allowed: 0.2 };
    },
  });

  assert.equal(eligibility.constitutional_eligibility, ELIGIBILITY_VALUES.NOT_ELIGIBLE);
  assert.equal(result.delta_a_allowed, 0);
  assert.equal(result.disposition, 'REJECT');
  assert.equal(verifyExecuted, false);
});
