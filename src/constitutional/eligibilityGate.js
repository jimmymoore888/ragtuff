const ELIGIBILITY_VALUES = Object.freeze({
  ELIGIBLE: 'ELIGIBLE',
  NOT_ELIGIBLE: 'NOT_ELIGIBLE',
  INDETERMINATE: 'INDETERMINATE',
});

const DEFAULT_REASON_CODES = Object.freeze({
  ELIGIBLE: 'NO_CONSTITUTIONAL_VIOLATION',
  NOT_ELIGIBLE: 'CONSTITUTIONAL_VIOLATION',
  INDETERMINATE: 'INDETERMINATE_OR_INSUFFICIENT_INPUT',
});

const PROHIBITED_INDICATORS = Object.freeze([
  'execute',
  'execution',
  'authorize',
  'authorization',
  'custody',
  'control',
  'bypass',
  'privilege_escalation',
  'sign_transaction',
  'send_transaction',
  'private_key',
  'secret_key',
]);

function toArray(value) {
  return Array.isArray(value) ? value : [];
}

function detectViolations(request) {
  if (!request || typeof request !== 'object') {
    return ['INVALID_REQUEST'];
  }

  const hints = toArray(request.invariant_hints).map((hint) =>
    String(hint).toLowerCase()
  );

  const intentText = [
    request.intent,
    request.action,
    request.operation,
    request.target,
  ]
    .map((value) => (value == null ? '' : String(value).toLowerCase()))
    .join(' ');

  const violations = [];

  for (const indicator of PROHIBITED_INDICATORS) {
    const hasHint = hints.includes(indicator);
    const hasIntentSignal = intentText.includes(indicator.replace(/_/g, ' '));
    if (hasHint || hasIntentSignal) {
      violations.push(indicator.toUpperCase());
    }
  }

  return [...new Set(violations)];
}

function buildEligibilityResult({
  requestId,
  constitutionalEligibility,
  violatedInvariants,
  reasoningCode,
}) {
  return Object.freeze({
    request_id: requestId,
    constitutional_eligibility: constitutionalEligibility,
    violated_invariants: Object.freeze([...violatedInvariants]),
    reasoning_code: reasoningCode,
    mutation: false,
  });
}

function assessConstitutionalEligibility(request = {}) {
  const requestId =
    request && request.request_id != null
      ? String(request.request_id)
      : 'unknown-request';

  const violations = detectViolations(request);

  if (violations.includes('INVALID_REQUEST')) {
    return buildEligibilityResult({
      requestId,
      constitutionalEligibility: ELIGIBILITY_VALUES.INDETERMINATE,
      violatedInvariants: violations,
      reasoningCode: DEFAULT_REASON_CODES.INDETERMINATE,
    });
  }

  if (violations.length > 0) {
    return buildEligibilityResult({
      requestId,
      constitutionalEligibility: ELIGIBILITY_VALUES.NOT_ELIGIBLE,
      violatedInvariants: violations,
      reasoningCode: DEFAULT_REASON_CODES.NOT_ELIGIBLE,
    });
  }

  return buildEligibilityResult({
    requestId,
    constitutionalEligibility: ELIGIBILITY_VALUES.ELIGIBLE,
    violatedInvariants: [],
    reasoningCode: DEFAULT_REASON_CODES.ELIGIBLE,
  });
}

function isValidEligibilityResult(result) {
  if (!result || typeof result !== 'object') {
    return false;
  }

  if (!Object.values(ELIGIBILITY_VALUES).includes(result.constitutional_eligibility)) {
    return false;
  }

  if (!Array.isArray(result.violated_invariants)) {
    return false;
  }

  if (typeof result.reasoning_code !== 'string' || result.reasoning_code.length === 0) {
    return false;
  }

  if (result.mutation !== false) {
    return false;
  }

  return true;
}

function applyNexusEligibilityGate({
  request = {},
  eligibilityResult,
  verifyRequest,
}) {
  const requestId =
    request && request.request_id != null
      ? String(request.request_id)
      : 'unknown-request';

  const resolvedEligibility = eligibilityResult;

  if (!isValidEligibilityResult(resolvedEligibility)) {
    return Object.freeze({
      request_id: requestId,
      constitutional_eligibility: ELIGIBILITY_VALUES.INDETERMINATE,
      gate_outcome: 'FAIL_CLOSED',
      delta_a_allowed: 0,
      disposition: 'REJECT',
      reasoning_code: 'INVALID_OR_MISSING_RAGTUFF_RESULT',
      nexus_verification_executed: false,
    });
  }

  if (resolvedEligibility.constitutional_eligibility !== ELIGIBILITY_VALUES.ELIGIBLE) {
    return Object.freeze({
      request_id: requestId,
      constitutional_eligibility: resolvedEligibility.constitutional_eligibility,
      gate_outcome: 'FAIL_CLOSED',
      delta_a_allowed: 0,
      disposition: 'REJECT',
      reasoning_code: 'CONSTITUTIONAL_GATE_BLOCKED',
      violated_invariants: Object.freeze([...resolvedEligibility.violated_invariants]),
      nexus_verification_executed: false,
    });
  }

  if (typeof verifyRequest !== 'function') {
    return Object.freeze({
      request_id: requestId,
      constitutional_eligibility: ELIGIBILITY_VALUES.ELIGIBLE,
      gate_outcome: 'FAIL_CLOSED',
      delta_a_allowed: 0,
      disposition: 'REJECT',
      reasoning_code: 'MISSING_NEXUS_VERIFIER',
      nexus_verification_executed: false,
    });
  }

  const nexusResult = verifyRequest(request);

  return Object.freeze({
    request_id: requestId,
    constitutional_eligibility: ELIGIBILITY_VALUES.ELIGIBLE,
    gate_outcome: 'ELIGIBILITY_PASSED',
    delta_a_allowed:
      nexusResult && typeof nexusResult.delta_a_allowed === 'number'
        ? nexusResult.delta_a_allowed
        : undefined,
    disposition:
      nexusResult && typeof nexusResult.disposition === 'string'
        ? nexusResult.disposition
        : 'REJECT',
    nexus_result: nexusResult,
    nexus_verification_executed: true,
  });
}

module.exports = {
  ELIGIBILITY_VALUES,
  assessConstitutionalEligibility,
  applyNexusEligibilityGate,
  isValidEligibilityResult,
};
