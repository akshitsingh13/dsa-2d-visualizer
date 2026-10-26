/**
 * Resolves the theoretical complexity summary for the current view.
 * Supported complexity schema shapes:
 *   - Static plain object: `{ best, average, worst, space }`
 *   - Dictionary keyed by operation: `{ <operationKey>: { best, average, worst, space } }`
 *   - Resolver function: `(operationKey) => ({ best, average, worst, space })`
 *
 * @param {object|Function|null} complexity - Complexity definition from algorithm registry.
 * @param {string} [operationKey] - Active operation identifier for multi-operation data structures.
 * @returns {{ best: string, average: string, worst: string, space: string }|null}
 */
export function resolveComplexity(complexity, operationKey) {
  if (!complexity) return null;

  if (typeof complexity === "function") {
    return complexity(operationKey);
  }

  if (
    operationKey &&
    complexity[operationKey] &&
    typeof complexity[operationKey] === "object"
  ) {
    return complexity[operationKey];
  }

  return complexity;
}
