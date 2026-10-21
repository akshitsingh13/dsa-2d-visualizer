import { describe, expect, it } from "vitest";
import queueOperation, { QUEUE_CAPACITY, QUEUE_CODE } from "./queueOps";

function lineCount(operation) {
  return QUEUE_CODE[operation].split("\n").length;
}

describe("queueOperation", () => {
  it("enqueues at the rear in two steps", () => {
    const steps = queueOperation([10], { operation: "enqueue", value: 20 }, 0);

    expect(steps.length).toBe(2);
    expect(steps[0].data).toEqual([10]);
    expect(steps[1].data).toEqual([10, 20]);
    expect(steps[1].highlightIndex).toBe(1);
    expect(steps[1].operations).toBe(1);
    expect(steps[1].codeLine).toBeLessThanOrEqual(lineCount("enqueue"));
  });

  it("dequeues from the front and shifts the rest", () => {
    const steps = queueOperation([1, 2, 3], { operation: "dequeue" }, 0);

    expect(steps[0].highlightIndex).toBe(0);
    expect(steps[1].data).toEqual([2, 3]);
    expect(steps[1].message).toMatch(/Dequeued 1/);
    expect(steps[1].message).toMatch(/shift left/);
  });

  it("peeks at the front without changing the queue", () => {
    const steps = queueOperation([5, 6], { operation: "peek" }, 1);

    expect(steps.length).toBe(1);
    expect(steps[0].data).toEqual([5, 6]);
    expect(steps[0].highlight).toBe("found");
    expect(steps[0].message).toMatch(/front of the queue is 5/);
  });

  it("clears the queue", () => {
    const steps = queueOperation([1, 2], { operation: "clear" }, 0);

    expect(steps[steps.length - 1].data).toEqual([]);
  });

  it("rejects enqueue on a full queue without changing state", () => {
    const full = [1, 2, 3, 4, 5, 6, 7, 8];
    expect(full.length).toBe(QUEUE_CAPACITY);

    const steps = queueOperation(full, { operation: "enqueue", value: 9 }, 7);

    expect(steps.length).toBe(1);
    expect(steps[0].error).toBe(true);
    expect(steps[0].data).toEqual(full);
    expect(steps[0].operations).toBe(7);
    expect(steps[0].message).toMatch(/overflow/i);
  });

  it("rejects dequeue and peek on an empty queue", () => {
    const dequeue = queueOperation([], { operation: "dequeue" }, 3);
    const peek = queueOperation([], { operation: "peek" }, 3);

    expect(dequeue[0].error).toBe(true);
    expect(dequeue[0].message).toMatch(/underflow/i);
    expect(dequeue[0].operations).toBe(3);
    expect(peek[0].error).toBe(true);
  });

  it("handles a single element", () => {
    const steps = queueOperation([7], { operation: "dequeue" }, 0);

    expect(steps[1].data).toEqual([]);
    expect(steps[1].message).toMatch(/now empty/);
  });

  it("never mutates earlier steps or the input", () => {
    const input = Object.freeze([1, 2, 3]);
    const steps = queueOperation(input, { operation: "dequeue" }, 0);

    expect(steps[0].data).toEqual([1, 2, 3]);
    expect(steps[1].data).toEqual([2, 3]);
    expect(steps[0].data).not.toBe(steps[1].data);
  });
});
