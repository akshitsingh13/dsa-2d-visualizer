import { describe, expect, it } from "vitest";
import linkedListOperation, { LL_CODE } from "./linkedList";

function lineCount(operation) {
  return LL_CODE[operation].split("\n").length;
}

function expectValidCodeLines(operation, steps) {
  for (const step of steps) {
    expect(step.codeLine).toBeGreaterThanOrEqual(1);
    expect(step.codeLine).toBeLessThanOrEqual(lineCount(operation));
  }
}

describe("linkedListOperation", () => {
  it("inserts at the head in create / wire / head steps", () => {
    const steps = linkedListOperation([1, 2], {
      operation: "insert-head",
      value: 0,
    });

    expect(steps.length).toBe(3);
    expect(steps[0].data).toEqual([1, 2]);
    expect(steps[2].data).toEqual([0, 1, 2]);
    expect(steps[2].message).toMatch(/HEAD/);
    expectValidCodeLines("insert-head", steps);
  });

  it("inserts at the tail after visiting each node", () => {
    const steps = linkedListOperation([1, 2], {
      operation: "insert-tail",
      value: 3,
    });
    const last = steps[steps.length - 1];

    expect(last.data).toEqual([1, 2, 3]);
    expect(last.message).toMatch(/tail/);
    expect(steps.filter((step) => step.currIndex !== null).length).toBeGreaterThan(2);
    expectValidCodeLines("insert-tail", steps);
  });

  it("inserts at an index", () => {
    const steps = linkedListOperation([1, 3], {
      operation: "insert-index",
      value: 2,
      index: 1,
    });

    expect(steps[steps.length - 1].data).toEqual([1, 2, 3]);
    expectValidCodeLines("insert-index", steps);
  });

  it("rejects an out-of-range index without changing state", () => {
    const steps = linkedListOperation([1], {
      operation: "insert-index",
      value: 9,
      index: 5,
    });

    expect(steps.length).toBe(1);
    expect(steps[0].error).toBe(true);
    expect(steps[0].data).toEqual([1]);
    expect(steps[0].message).toMatch(/out of range/);
  });

  it("deletes by value and re-wires the links", () => {
    const steps = linkedListOperation([1, 2, 3], {
      operation: "delete-value",
      value: 2,
    });
    const last = steps[steps.length - 1];

    expect(last.data).toEqual([1, 3]);
    expect(last.error).toBe(false);
    expectValidCodeLines("delete-value", steps);
  });

  it("deletes the head and the last node", () => {
    const head = linkedListOperation([1, 2], {
      operation: "delete-value",
      value: 1,
    });
    expect(head[head.length - 1].data).toEqual([2]);
    expect(head[head.length - 1].message).toMatch(/HEAD/);

    const last = linkedListOperation([1, 2], {
      operation: "delete-value",
      value: 2,
    });
    expect(last[last.length - 1].data).toEqual([1]);
  });

  it("reports a missing delete value without changing state", () => {
    const steps = linkedListOperation([1, 2], {
      operation: "delete-value",
      value: 9,
    });
    const last = steps[steps.length - 1];

    expect(last.error).toBe(true);
    expect(last.data).toEqual([1, 2]);
    expect(last.message).toMatch(/not found/);
  });

  it("deletes at the head", () => {
    const steps = linkedListOperation([1, 2], { operation: "delete-head" });

    expect(steps[1].data).toEqual([2]);
    expect(steps[1].message).toMatch(/HEAD/);
    expectValidCodeLines("delete-head", steps);
  });

  it("searches node by node and highlights the match", () => {
    const steps = linkedListOperation([4, 7, 9], {
      operation: "search",
      value: 7,
    });
    const last = steps[steps.length - 1];

    expect(last.foundIndex).toBe(1);
    expect(last.message).toMatch(/Found 7 at index 1/);
    expectValidCodeLines("search", steps);
  });

  it("reports a missing search value", () => {
    const steps = linkedListOperation([4, 7], { operation: "search", value: 1 });
    const last = steps[steps.length - 1];

    expect(last.error).toBe(true);
    expect(last.data).toEqual([4, 7]);
  });

  it("traverses every node", () => {
    const steps = linkedListOperation([1, 2], { operation: "traverse" });

    expect(steps[steps.length - 1].message).toMatch(/Traversed 2 nodes/);
    expect(steps[steps.length - 1].nodesVisited).toBe(2);
    expectValidCodeLines("traverse", steps);
  });

  it("handles an empty list with clear errors and no state change", () => {
    for (const operation of [
      "delete-value",
      "delete-head",
      "search",
      "traverse",
    ]) {
      const steps = linkedListOperation([], { operation, value: 1 });

      expect(steps[0].error).toBe(true);
      expect(steps[0].data).toEqual([]);
      expect(steps[0].message).toMatch(/empty/i);
    }
  });

  it("counts visited nodes", () => {
    const steps = linkedListOperation([1, 2, 3], {
      operation: "search",
      value: 3,
    });

    expect(steps[steps.length - 1].nodesVisited).toBe(3);
  });

  it("never mutates earlier steps or the input", () => {
    const input = Object.freeze([1, 2, 3]);
    const steps = linkedListOperation(input, {
      operation: "delete-value",
      value: 2,
    });

    const snapshots = steps.map((step) => step.data);
    expect(new Set(snapshots).size).toBe(snapshots.length);
    expect(snapshots[0]).toEqual([1, 2, 3]);
    expect(snapshots[snapshots.length - 1]).toEqual([1, 3]);
  });
});
