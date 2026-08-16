export const ELIGIBILITY_STATUS = Object.freeze({
  ELIGIBLE: 'ELIGIBLE',
  NOT_ELIGIBLE: 'NOT_ELIGIBLE',
  INDETERMINATE: 'INDETERMINATE'
});

export const RAGTUFF_INPUT_SCHEMA = Object.freeze({
  constitutionalAttributes: 'object',
  constitutionalRuleSpecification: {
    version: 'string',
    rules: [
      {
        id: 'string',
        attribute: 'string',
        expected: 'any',
        sourceOfTruth: 'string'
      }
    ]
  }
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

function validateRuleSpecification(specification) {
  if (!specification || typeof specification !== 'object') {
    return 'MACHINE-READABLE CONSTITUTIONAL RULE SPECIFICATION REQUIRED';
  }

  if (typeof specification.version !== 'string' || specification.version.trim() === '') {
    return 'MACHINE-READABLE CONSTITUTIONAL RULE SPECIFICATION REQUIRED';
  }

  if (!Array.isArray(specification.rules) || specification.rules.length === 0) {
    return 'MACHINE-READABLE CONSTITUTIONAL RULE SPECIFICATION REQUIRED';
  }

  for (const rule of specification.rules) {
    if (!rule || typeof rule !== 'object') {
      return 'INVALID_MACHINE_READABLE_RULE_SPECIFICATION';
    }

    if (typeof rule.id !== 'string' || rule.id.trim() === '') {
      return 'INVALID_MACHINE_READABLE_RULE_SPECIFICATION';
    }

    if (typeof rule.attribute !== 'string' || rule.attribute.trim() === '') {
      return 'INVALID_MACHINE_READABLE_RULE_SPECIFICATION';
    }

    if (!hasOwn(rule, 'expected')) {
      return 'INVALID_MACHINE_READABLE_RULE_SPECIFICATION';
    }

    if (typeof rule.sourceOfTruth !== 'string' || rule.sourceOfTruth.trim() === '') {
      return 'INVALID_MACHINE_READABLE_RULE_SPECIFICATION';
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

  const { constitutionalAttributes, constitutionalRuleSpecification } = input;

  const specificationError = validateRuleSpecification(constitutionalRuleSpecification);
  if (specificationError) {
    return result({
      status: ELIGIBILITY_STATUS.INDETERMINATE,
      reasons: [{
        code: specificationError,
        message: specificationError
      }]
    });
  }

  if (!constitutionalAttributes || typeof constitutionalAttributes !== 'object') {
    return result({
      status: ELIGIBILITY_STATUS.INDETERMINATE,
      reasons: [{
        code: 'INSUFFICIENT_CONSTITUTIONAL_ATTRIBUTES',
        message: 'Structured constitutional attributes are required for evaluation.'
      }]
    });
  }

  const ruleIds = [];
  const citations = [];

  for (const rule of constitutionalRuleSpecification.rules) {
    ruleIds.push(rule.id);
    citations.push(rule.sourceOfTruth);

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
