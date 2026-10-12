import { describe, expect, it } from "vitest";
import stackOperation, { STACK_CAPACITY, STACK_CODE } from "./stackOps";

function lineCount(operation) {
  return STACK_CODE[operation].split("\n").length;
}

describe("stackOperation", () => {
  it("pushes a value in two steps and becomes the top", () => {
    const steps = stackOperation([10], { operation: "push", value: 20 }, 0);

    expect(steps.length).toBe(2);
    expect(steps[0].data).toEqual([10]);
    expect(steps[1].data).toEqual([10, 20]);
    expect(steps[1].highlightIndex).toBe(1);
    expect(steps[1].operations).toBe(1);
    expect(steps[1].codeLine).toBeLessThanOrEqual(lineCount("push"));
  });

  it("pops the top value and reports it", () => {
    const steps = stackOperation([10, 20], { operation: "pop" }, 1);

    expect(steps[0].data).toEqual([10, 20]);
    expect(steps[0].highlightIndex).toBe(1);
    expect(steps[1].data).toEqual([10]);
    expect(steps[1].message).toMatch(/Popped 20/);
    expect(steps[1].operations).toBe(2);
  });

  it("peeks without changing the stack", () => {
    const steps = stackOperation([10, 20], { operation: "peek" }, 2);

    expect(steps.length).toBe(1);
    expect(steps[0].data).toEqual([10, 20]);
    expect(steps[0].highlight).toBe("found");
    expect(steps[0].message).toMatch(/top of the stack is 20/);
  });

  it("clears the stack", () => {
    const steps = stackOperation([1, 2, 3], { operation: "clear" }, 0);

    expect(steps[steps.length - 1].data).toEqual([]);
    expect(steps[steps.length - 1].message).toMatch(/now empty/);
  });

  it("rejects push on a full stack without changing state", () => {
    const full = [1, 2, 3, 4, 5, 6, 7, 8];
    expect(full.length).toBe(STACK_CAPACITY);

    const steps = stackOperation(full, { operation: "push", value: 9 }, 4);

    expect(steps.length).toBe(1);
    expect(steps[0].error).toBe(true);
    expect(steps[0].data).toEqual(full);
    expect(steps[0].operations).toBe(4); // failed ops do not count
    expect(steps[0].message).toMatch(/overflow/i);
  });

  it("rejects pop and peek on an empty stack", () => {
    const pop = stackOperation([], { operation: "pop" }, 2);
    const peek = stackOperation([], { operation: "peek" }, 2);

    expect(pop[0].error).toBe(true);
    expect(pop[0].message).toMatch(/underflow/i);
    expect(pop[0].operations).toBe(2);
    expect(peek[0].error).toBe(true);
    expect(peek[0].operations).toBe(2);
  });

  it("handles a single element and clear on empty", () => {
    const popped = stackOperation([7], { operation: "pop" }, 0);
    expect(popped[1].data).toEqual([]);
    expect(popped[1].message).toMatch(/now empty/);

    const cleared = stackOperation([], { operation: "clear" }, 0);
    expect(cleared[0].error).toBe(false);
    expect(cleared[0].data).toEqual([]);
  });

  it("never mutates earlier steps or the input", () => {
    const input = Object.freeze([1, 2]);
    const steps = stackOperation(input, { operation: "push", value: 3 }, 0);

    expect(steps[0].data).toEqual([1, 2]);
    expect(steps[1].data).toEqual([1, 2, 3]);
    expect(steps[0].data).not.toBe(steps[1].data);
  });
});
