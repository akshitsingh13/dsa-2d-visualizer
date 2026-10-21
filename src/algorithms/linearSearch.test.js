import { describe, expect, it } from "vitest";
import linearSearch, { LINES } from "./linearSearch";
import algorithmRegistry from "./algorithmRegistry";

// Every generated codeLine must point at a real line of the registry code.
function codeLineCount() {
  return algorithmRegistry.LS.code.split("\n").length;
}

describe("linearSearch", () => {
  it("finds the target with a clear result message", () => {
    const steps = linearSearch([10, 20, 30], 20);
    const last = steps[steps.length - 1];

    expect(last.foundIndex).toBe(1);
    expect(last.message).toBe("Found target 20 at index 1.");
    expect(last.codeLine).toBe(LINES.RETURN_FOUND);
  });

  it("ends with a not-found step when the target is missing", () => {
    const steps = linearSearch([10, 20, 30], 99);
    const last = steps[steps.length - 1];

    expect(last.foundIndex).toBe(null);
    expect(last.comparingIndices).toEqual([]);
    expect(last.message).toBe("Target 99 not found. Returned empty result.");
    expect(last.codeLine).toBe(LINES.RETURN_EMPTY);
    expect(steps.length).toBe(4); // 3 comparisons + final result step
  });

  it("handles an empty array", () => {
    const steps = linearSearch([], 5);

    expect(steps.length).toBe(1);
    expect(steps[0].comparisons).toBe(0);
    expect(steps[0].message).toMatch(/empty/i);
  });

  it("handles a single element (found and missing)", () => {
    expect(linearSearch([7], 7).pop().foundIndex).toBe(0);
    expect(linearSearch([7], 8).pop().foundIndex).toBe(null);
  });

  it("finds duplicate values", () => {
    const steps = linearSearch([5, 5, 5], 5);

    expect(steps[steps.length - 1].foundIndex).toBe(0);
  });

  it("counts comparisons monotonically", () => {
    const steps = linearSearch([1, 2, 3, 4], 4);

    expect(steps.map((step) => step.comparisons)).toEqual([1, 2, 3, 4]);
  });

  it("never mutates earlier steps or the input", () => {
    const input = Object.freeze([3, 1, 2]);
    const steps = linearSearch(input, 2);

    // Distinct snapshot references, all equal to the original input.
    expect(new Set(steps.map((step) => step.array)).size).toBe(steps.length);

    for (const step of steps) {
      expect(step.array).toEqual([3, 1, 2]);
      expect(step.codeLine).toBeGreaterThanOrEqual(1);
      expect(step.codeLine).toBeLessThanOrEqual(codeLineCount());
    }
  });
});
