// Resolve the theoretical complexity for the current view. Supported shapes:
//   - { best, average, worst, space }                       (plain object)
//   - { <operationKey>: { best, ... }, ... }                (keyed by operation)
//   - (operationKey) => ({ best, ... })                     (function of operation)
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
