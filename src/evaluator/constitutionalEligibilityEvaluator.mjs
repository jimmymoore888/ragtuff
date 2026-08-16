const INDETERMINATE_REASON =
  'MACHINE-READABLE CONSTITUTIONAL RULE SPECIFICATION REQUIRED';

export const RagTuffEligibilityStatus = Object.freeze({
  ELIGIBLE: 'ELIGIBLE',
  NOT_ELIGIBLE: 'NOT_ELIGIBLE',
  INDETERMINATE: 'INDETERMINATE'
});

/**
 * Public evaluator input: caller supplies only constitutional attributes/facts.
 *
 * @typedef {Object} ConstitutionalEligibilityInput
 * @property {Object<string, unknown>} [constitutionalAttributes]
 */

/**
 * @typedef {Object} ConstitutionalEligibilityResult
 * @property {'ELIGIBLE'|'NOT_ELIGIBLE'|'INDETERMINATE'} status
 * @property {string} reason
 * @property {Object<string, unknown>} constitutionalAttributes
 * @property {string[]} invariantViolations
 * @property {boolean} mutation
 */

function getCanonicalConstitutionalRuleSpecification() {
  return null;
}

function sanitizeConstitutionalAttributes(constitutionalAttributes) {
  if (!constitutionalAttributes || typeof constitutionalAttributes !== 'object') {
    return Object.freeze({});
  }

  return Object.freeze({ ...constitutionalAttributes });
}

/**
 * Evaluate constitutional eligibility using caller-supplied facts and
 * RagTuff-controlled canonical constitutional rules.
 *
 * Until an approved machine-readable canonical rule source exists,
 * this evaluator fails closed as INDETERMINATE.
 *
 * @param {ConstitutionalEligibilityInput} [input]
 * @returns {ConstitutionalEligibilityResult}
 */
export function evaluateConstitutionalEligibility(input = {}) {
  const constitutionalAttributes = sanitizeConstitutionalAttributes(
    input.constitutionalAttributes
  );

  const canonicalRuleSpecification = getCanonicalConstitutionalRuleSpecification();

  void canonicalRuleSpecification;

  return Object.freeze({
    status: RagTuffEligibilityStatus.INDETERMINATE,
    reason: INDETERMINATE_REASON,
    constitutionalAttributes,
    invariantViolations: Object.freeze([]),
    mutation: false
  });
}

export const __internal__ = Object.freeze({
  getCanonicalConstitutionalRuleSpecification,
  INDETERMINATE_REASON
});
