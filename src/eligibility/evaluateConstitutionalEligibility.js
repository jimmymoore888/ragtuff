export const ELIGIBILITY_STATUS = Object.freeze({
  ELIGIBLE: 'ELIGIBLE',
  NOT_ELIGIBLE: 'NOT_ELIGIBLE',
  INDETERMINATE: 'INDETERMINATE'
});

export const RAGTUFF_INPUT_SCHEMA = Object.freeze({
  constitutionalAttributes: 'object'
});

export const RAGTUFF_OUTPUT_SCHEMA = Object.freeze({
  status: 'ELIGIBLE | NOT_ELIGIBLE | INDETERMINATE',
  mutation: false,
  reasons: [
    {
      code: 'string',
      message: 'string',
      ruleId: 'string (optional)',
      sourceOfTruth: 'string (optional)'
    }
  ],
  evaluatedRuleIds: 'string[]',
  sourceOfTruthCitations: 'string[]'
});

function result({ status, reasons = [], evaluatedRuleIds = [], sourceOfTruthCitations = [] }) {
  return Object.freeze({
    status,
    mutation: false,
    reasons: Object.freeze(reasons.map((reason) => Object.freeze({ ...reason }))),
    evaluatedRuleIds: Object.freeze([...evaluatedRuleIds]),
    sourceOfTruthCitations: Object.freeze([...sourceOfTruthCitations])
  });
}

function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function isPrimitive(value) {
  return value === null || ['string', 'number', 'boolean'].includes(typeof value);
}

function getApprovedInternalConstitutionalRuleSpecification() {
  // No approved internal machine-readable constitutional rule source is currently available.
  return null;
}

function validateRuleSpecification(specification) {
  if (!specification || typeof specification !== 'object') {
    return 'MACHINE_READABLE_REQUIRED';
  }

  if (typeof specification.version !== 'string' || specification.version.trim() === '') {
    return 'INVALID_INTERNAL_RULE_SPECIFICATION';
  }

  if (!Array.isArray(specification.rules) || specification.rules.length === 0) {
    return 'INVALID_INTERNAL_RULE_SPECIFICATION';
  }

  for (const rule of specification.rules) {
    if (!rule || typeof rule !== 'object') {
      return 'INVALID_INTERNAL_RULE_SPECIFICATION';
    }

    if (typeof rule.id !== 'string' || rule.id.trim() === '') {
      return 'INVALID_INTERNAL_RULE_SPECIFICATION';
    }

    if (typeof rule.attribute !== 'string' || rule.attribute.trim() === '') {
      return 'INVALID_INTERNAL_RULE_SPECIFICATION';
    }

    if (!hasOwn(rule, 'expected')) {
      return 'INVALID_INTERNAL_RULE_SPECIFICATION';
    }

    if (!isPrimitive(rule.expected)) {
      return 'UNSUPPORTED_EXPECTED_VALUE_TYPE';
    }

    if (typeof rule.sourceOfTruth !== 'string' || rule.sourceOfTruth.trim() === '') {
      return 'INVALID_INTERNAL_RULE_SPECIFICATION';
    }
  }

  return null;
}

/**
 * Bounded RagTuff eligibility assessment.
 * RagTuff evaluates constitutional eligibility only and returns a bounded result.
 */
export function evaluateConstitutionalEligibility(input) {
  if (!input || typeof input !== 'object') {
    return result({
      status: ELIGIBILITY_STATUS.INDETERMINATE,
      reasons: [{
        code: 'INVALID_INPUT',
        message: 'Input must be an object.'
      }]
    });
  }

  const { constitutionalAttributes } = input;

  if (!constitutionalAttributes || typeof constitutionalAttributes !== 'object') {
    return result({
      status: ELIGIBILITY_STATUS.INDETERMINATE,
      reasons: [{
        code: 'INSUFFICIENT_CONSTITUTIONAL_ATTRIBUTES',
        message: 'Structured constitutional attributes are required for evaluation.'
      }]
    });
  }

  const constitutionalRuleSpecification = getApprovedInternalConstitutionalRuleSpecification();
  const specificationError = validateRuleSpecification(constitutionalRuleSpecification);

  if (specificationError) {
    const specMessages = {
      MACHINE_READABLE_REQUIRED: 'MACHINE-READABLE CONSTITUTIONAL RULE SPECIFICATION REQUIRED',
      INVALID_INTERNAL_RULE_SPECIFICATION: 'Approved internal machine-readable constitutional rule specification is invalid.',
      UNSUPPORTED_EXPECTED_VALUE_TYPE: 'Machine-readable rules support only primitive expected values (string, number, boolean, null).'
    };

    return result({
      status: ELIGIBILITY_STATUS.INDETERMINATE,
      reasons: [{
        code: specificationError,
        message: specMessages[specificationError]
      }]
    });
  }

  const ruleIds = [];
  const citations = [];

  for (const rule of constitutionalRuleSpecification.rules) {
    if (!hasOwn(constitutionalAttributes, rule.attribute)) {
      return result({
        status: ELIGIBILITY_STATUS.INDETERMINATE,
        evaluatedRuleIds: ruleIds,
        sourceOfTruthCitations: citations,
        reasons: [{
          code: 'INSUFFICIENT_CONSTITUTIONAL_ATTRIBUTES',
          message: `Missing required constitutional attribute: ${rule.attribute}`,
          ruleId: rule.id,
          sourceOfTruth: rule.sourceOfTruth
        }]
      });
    }

    ruleIds.push(rule.id);
    citations.push(rule.sourceOfTruth);

    if (constitutionalAttributes[rule.attribute] !== rule.expected) {
      return result({
        status: ELIGIBILITY_STATUS.NOT_ELIGIBLE,
        evaluatedRuleIds: ruleIds,
        sourceOfTruthCitations: citations,
        reasons: [{
          code: 'RULE_MISMATCH',
          message: `Constitutional rule ${rule.id} not satisfied.`,
          ruleId: rule.id,
          sourceOfTruth: rule.sourceOfTruth
        }]
      });
    }
  }

  return result({
    status: ELIGIBILITY_STATUS.ELIGIBLE,
    evaluatedRuleIds: ruleIds,
    sourceOfTruthCitations: citations,
    reasons: [{
      code: 'ALL_RULES_SATISFIED',
      message: 'All machine-readable constitutional rules were satisfied.'
    }]
  });
}
