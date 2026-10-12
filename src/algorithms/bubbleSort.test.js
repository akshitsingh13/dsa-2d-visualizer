import { describe, expect, it } from "vitest";
import bubbleSort, { BUBBLE_SORT_CODE, LINES } from "./bubbleSort";

const LINE_COUNT = BUBBLE_SORT_CODE.split("\n").length;

function expectValidCodeLines(steps) {
  for (const step of steps) {
    expect(step.codeLine).toBeGreaterThanOrEqual(1);
    expect(step.codeLine).toBeLessThanOrEqual(LINE_COUNT);
  }
}

describe("bubbleSort", () => {
  it("sorts an unsorted array and ends all green", () => {
    const steps = bubbleSort([5, 3, 4, 1, 2]);
    const last = steps[steps.length - 1];

    expect(last.array).toEqual([1, 2, 3, 4, 5]);
    expect(last.sortedIndices).toEqual([0, 1, 2, 3, 4]);
    expect(last.message).toMatch(/sorted/);
    expect(last.swaps).toBeGreaterThan(0);
    expectValidCodeLines(steps);
  });

  it("emits compare steps and distinct swap steps", () => {
    const steps = bubbleSort([2, 1]);

    expect(
      steps.some((step) => step.codeLine === LINES.COMPARE),
    ).toBe(true);
    expect(steps.some((step) => step.codeLine === LINES.SWAP)).toBe(true);

    const swapStep = steps.find((step) => step.codeLine === LINES.SWAP);
    expect(swapStep.swappingIndices).toEqual([0, 1]);
    expect(swapStep.array).toEqual([1, 2]);
  });

  it("marks the end of each pass as sorted", () => {
    const steps = bubbleSort([3, 2, 1]);
    const passComplete = steps.find((step) =>
      step.message.includes("final position"),
    );

    expect(passComplete).toBeDefined();
    expect(passComplete.sortedIndices.length).toBeGreaterThan(0);
  });

  it("exits early with a message for an already-sorted array", () => {
    const steps = bubbleSort([1, 2, 3, 4]);

    expect(steps[steps.length - 1].message).toMatch(/already sorted/);
    expect(steps[steps.length - 1].swaps).toBe(0);
    expect(steps[steps.length - 1].sortedIndices).toEqual([0, 1, 2, 3]);
  });

  it("handles an empty array and a single element", () => {
    expect(bubbleSort([]).length).toBe(1);
    expect(bubbleSort([])[0].message).toMatch(/empty/);

    const single = bubbleSort([9]);
    expect(single.length).toBe(1);
    expect(single[0].sortedIndices).toEqual([0]);
  });

  it("handles duplicates", () => {
    const steps = bubbleSort([3, 1, 2, 1]);

    expect(steps[steps.length - 1].array).toEqual([1, 1, 2, 3]);
  });

  it("counts comparisons and swaps monotonically", () => {
    const steps = bubbleSort([3, 2, 1]);
    const comparisons = steps.map((step) => step.comparisons);
    const swaps = steps.map((step) => step.swaps);

    for (let i = 1; i < comparisons.length; i++) {
      expect(comparisons[i]).toBeGreaterThanOrEqual(comparisons[i - 1]);
      expect(swaps[i]).toBeGreaterThanOrEqual(swaps[i - 1]);
    }
  });

  it("never mutates earlier steps or the input", () => {
    const input = Object.freeze([4, 2, 5, 1, 3]);
    const steps = bubbleSort(input);

    expect(new Set(steps.map((step) => step.array)).size).toBe(steps.length);
    expect(steps[0].array).toEqual([4, 2, 5, 1, 3]);
  });
});
