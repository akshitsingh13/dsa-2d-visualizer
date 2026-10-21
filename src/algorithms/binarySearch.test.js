import { describe, expect, it } from "vitest";
import binarySearch, { BINARY_SEARCH_CODE, LINES } from "./binarySearch";

const LINE_COUNT = BINARY_SEARCH_CODE.split("\n").length;

function expectValidCodeLines(steps) {
  for (const step of steps) {
    expect(step.codeLine).toBeGreaterThanOrEqual(1);
    expect(step.codeLine).toBeLessThanOrEqual(LINE_COUNT);
  }
}

describe("binarySearch", () => {
  it("finds the target and reports its index", () => {
    const steps = binarySearch([10, 20, 30, 40, 50], 30);
    const last = steps[steps.length - 1];

    expect(last.foundIndex).toBe(2);
    expect(last.message).toBe("Found target 30 at index 2.");
    expect(last.codeLine).toBe(LINES.RETURN_FOUND);
    expectValidCodeLines(steps);
  });

  it("starts with the full range and computes mid", () => {
    const steps = binarySearch([10, 20, 30, 40, 50], 30);

    expect(steps[0].low).toBe(0);
    expect(steps[0].high).toBe(4);
    expect(steps[0].codeLine).toBe(LINES.WHILE);
    expect(steps[1].mid).toBe(2);
    expect(steps[1].codeLine).toBe(LINES.MID);
  });

  it("says which half is discarded when narrowing", () => {
    const steps = binarySearch([10, 20, 30, 40, 50], 10);
    const messages = steps.map((step) => step.message);

    expect(messages.some((message) => message.includes("right half"))).toBe(
      true,
    );

    const right = binarySearch([10, 20, 30, 40, 50], 50);
    expect(
      right.map((step) => step.message).some((message) => message.includes("left half")),
    ).toBe(true);
  });

  it("ends with a not-found step when the target is missing", () => {
    const steps = binarySearch([10, 20, 30, 40, 50], 99);
    const last = steps[steps.length - 1];

    expect(last.foundIndex).toBe(null);
    expect(last.message).toMatch(/not found/);
    expect(last.codeLine).toBe(LINES.RETURN_NOT_FOUND);
    expectValidCodeLines(steps);
  });

  it("handles targets smaller or larger than all elements", () => {
    expect(binarySearch([10, 20, 30], 1).pop().foundIndex).toBe(null);
    expect(binarySearch([10, 20, 30], 100).pop().foundIndex).toBe(null);
  });

  it("handles an empty array", () => {
    const steps = binarySearch([], 5);

    expect(steps.length).toBe(1);
    expect(steps[0].comparisons).toBe(0);
    expect(steps[0].message).toMatch(/empty/);
  });

  it("handles a single element (found and missing)", () => {
    expect(binarySearch([7], 7).pop().foundIndex).toBe(0);
    expect(binarySearch([7], 8).pop().foundIndex).toBe(null);
  });

  it("finds a duplicate value", () => {
    const steps = binarySearch([1, 2, 2, 2, 3], 2);
    const last = steps[steps.length - 1];

    expect(last.foundIndex).not.toBe(null);
    expect([1, 2, 2, 2, 3][last.foundIndex]).toBe(2);
  });

  it("never mutates earlier steps or the input", () => {
    const input = Object.freeze([1, 2, 3, 4, 5, 6]);
    const steps = binarySearch(input, 4);

    expect(new Set(steps.map((step) => step.array)).size).toBe(steps.length);

    for (const step of steps) {
      expect(step.array).toEqual([1, 2, 3, 4, 5, 6]);
    }
  });
});
