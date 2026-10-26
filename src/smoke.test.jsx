import { createElement as h } from "react";
import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import App from "./App";
import algorithmRegistry from "./algorithms/algorithmRegistry";
import ArrayVisualizer from "./components/Visualizer/ArrayVisualizer";
import BarVisualizer from "./components/Visualizer/BarVisualizer";
import StackVisualizer from "./components/Visualizer/StackVisualizer";
import QueueVisualizer from "./components/Visualizer/QueueVisualizer";
import LinkedListVisualizer from "./components/Visualizer/LinkedListVisualizer";
import TreeVisualizer from "./components/Visualizer/TreeVisualizer";
import ControlPanel from "./components/Controls/ControlPanel";
import ComplexityCounter from "./components/Visualizer/ComplexityCounter";
import linearSearch from "./algorithms/linearSearch";
import binarySearch from "./algorithms/binarySearch";
import bubbleSort from "./algorithms/bubbleSort";
import stackOperation from "./algorithms/stackOps";
import queueOperation from "./algorithms/queueOps";
import linkedListOperation from "./algorithms/linkedList";
import bstOperation from "./algorithms/bstOps";

// Server-render smoke tests: catch runtime errors in the component tree
// without needing a browser. Interactions are covered by manual testing.
describe("component smoke tests", () => {
  it("renders the full App in its default state", () => {
    const html = renderToString(h(App));

    expect(html).toMatch(/DSA Visualizer/);
    expect(html).toMatch(/Linear Search/);
    expect(html).toMatch(/Run Algorithm/);
    expect(html).toMatch(/Run the algorithm to visualize it/);
  });

  it("renders every visualizer with and without a step", () => {
    const cases = [
      [ArrayVisualizer, linearSearch([1, 2, 3], 2).pop()],
      [ArrayVisualizer, binarySearch([1, 2, 3], 2).pop()],
      [BarVisualizer, bubbleSort([3, 1, 2]).pop()],
      [StackVisualizer, stackOperation([], { operation: "push", value: 5 }, 0).pop()],
      [QueueVisualizer, queueOperation([], { operation: "enqueue", value: 5 }, 0).pop()],
      [
        LinkedListVisualizer,
        linkedListOperation([], { operation: "insert-head", value: 5 }).pop(),
      ],
      [
        TreeVisualizer,
        bstOperation(null, { operation: "insert", value: 50 }).pop(),
      ],
    ];

    for (const [Component, step] of cases) {
      const withStep = renderToString(
        h(Component, { step, config: {}, dataState: [] }),
      );
      const withoutStep = renderToString(
        h(Component, { step: null, config: {}, dataState: [] }),
      );

      expect(withStep).toMatch(/step-message/);
      expect(withoutStep.length).toBeGreaterThan(0);
    }
  });

  it("renders error steps with the error style", () => {
    const overflow = stackOperation(
      [1, 2, 3, 4, 5, 6, 7, 8],
      { operation: "push", value: 9 },
      0,
    ).pop();
    const html = renderToString(h(StackVisualizer, { step: overflow }));

    expect(html).toMatch(/step-message error/);
    expect(html).toMatch(/overflow/);
  });

  it("renders the ControlPanel for every registry entry", () => {
    for (const [, config] of Object.entries(algorithmRegistry)) {
      const operation = Array.isArray(config.inputs.operation)
        ? config.inputs.operation[0]
        : null;
      const html = renderToString(
        h(ControlPanel, {
          algorithmConfig: config,
          operation,
          onOperationChange: () => {},
          onRun: () => {},
        }),
      );

      expect(html).toMatch(/Run Algorithm/);
    }
  });

  it("renders the ComplexityCounter for every registry entry", () => {
    for (const [, config] of Object.entries(algorithmRegistry)) {
      const operation = Array.isArray(config.inputs.operation)
        ? config.inputs.operation[0]
        : undefined;
      const html = renderToString(
        h(ComplexityCounter, {
          complexity: config.complexity,
          step: { comparisons: 2, swaps: 1, operations: 1, nodesVisited: 1 },
          counters: config.counters,
          operationKey: operation,
        }),
      );

      expect(html).toMatch(/Time &amp; Space Complexity/);
    }
  });
});
