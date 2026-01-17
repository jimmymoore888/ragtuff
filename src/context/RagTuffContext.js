/**
 * RagTuffContext
 *
 * Canonical, read-only contextual surface for RagTuff.
 * This object defines what the system is allowed to know —
 * not what it is allowed to do.
 *
 * No execution.
 * No mutation.
 * No external access.
 */

export function createRagTuffContext({
  environment,
  platform,
  capabilities = [],
  constraints = {},
  metadata = {}
}) {
  return Object.freeze({
    environment: String(environment),

    platform: Object.freeze({
      name: String(platform?.name || "unknown"),
      version: String(platform?.version || "unknown"),
    }),

    capabilities: Object.freeze([...capabilities]),

    constraints: Object.freeze({
      custody: Boolean(constraints.custody === true),
      execution: Boolean(constraints.execution === true),
      persistence: Boolean(constraints.persistence === true),
    }),

    metadata: Object.freeze({ ...metadata }),
  });
}
