import { createElement as h } from "react";
import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import ComplexityAnalysisModal from "./ComplexityAnalysisModal";
import { getComplexityAnalysis } from "../../algorithms/complexityAnalysis";

const THEORY_IDS = ["LS", "BS", "BUB", "STK", "QUE", "LL", "BST", "GRAPH"];

describe("ComplexityAnalysisModal smoke tests", () => {
  it("renders the modal for every algorithm with dialog semantics", () => {
    for (const id of THEORY_IDS) {
      const config = {
        id,
        name: getComplexityAnalysis(id).title,
        category: getComplexityAnalysis(id).category,
      };

      const html = renderToString(
        h(ComplexityAnalysisModal, {
          algorithmConfig: config,
          currentStepIndex: 0,
          steps: [],
          params: { array: [10, 20, 30] },
          onClose: () => {},
        }),
      );

      expect(html).toMatch(/role="dialog"/);
      expect(html).toMatch(/aria-modal="true"/);
      expect(html).toMatch(/aria-labelledby="complexity-title"/);
      expect(html).toMatch(config.name);
      expect(html).toMatch(/Time Complexity/);
      expect(html).toMatch(/Space Complexity/);
      expect(html).toMatch(/Back to visualizer/);
    }
  });

  it("renders all four required cases and derivation stepper for every algorithm", () => {
    const config = {
      id: "BUB",
      name: "Bubble Sort",
      category: "sorting",
    };

    const html = renderToString(
      h(ComplexityAnalysisModal, {
        algorithmConfig: config,
        currentStepIndex: 0,
        steps: [],
        params: { array: [5, 3, 1] },
        onClose: () => {},
      }),
    );

    // Case selectors present
    expect(html).toMatch(/Worst Case/);
    expect(html).toMatch(/Best Case/);
    expect(html).toMatch(/Average Case/);

    // Derivation Stepper present
    expect(html).toMatch(/Mathematical Derivation/);
    expect(html).toMatch(/Step 1/);
    expect(html).toMatch(/Next Step/);
    expect(html).toMatch(/Show Full Derivation/);
  });

  it("renders live counters with values from current step", () => {
    const config = {
      id: "LS",
      name: "Linear Search",
      category: "searching",
    };

    const steps = [{ comparisons: 3 }, { comparisons: 5 }, { comparisons: 7 }];

    const html = renderToString(
      h(ComplexityAnalysisModal, {
        algorithmConfig: config,
        currentStepIndex: 2,
        steps,
        params: { array: [10, 20, 30, 40, 50], target: 40 },
        onClose: () => {},
      }),
    );

    expect(html).toMatch(/Current input size n[\s\S]*5/);
    expect(html).toMatch(/data-key="comparisons">7/);
    expect(html).toMatch(/Live Execution Verification/);
  });

  it("renders space complexity panel when space tab is active", () => {
    const config = {
      id: "STK",
      name: "Stack",
      category: "data-structures",
    };

    const html = renderToString(
      h(ComplexityAnalysisModal, {
        algorithmConfig: config,
        currentStepIndex: 0,
        steps: [],
        params: { array: [1, 2, 3] },
        onClose: () => {},
      }),
    );

    expect(html).toMatch(/Space Complexity/);
    expect(html).toMatch(/Current input size n[\s\S]*3/);
  });

  it("renders derivation steps for worst case (default active case)", () => {
    const config = {
      id: "BS",
      name: "Binary Search",
      category: "searching",
    };

    const html = renderToString(
      h(ComplexityAnalysisModal, {
        algorithmConfig: config,
        currentStepIndex: 0,
        steps: [],
        params: { array: [10, 20, 30, 40, 50], target: 30 },
        onClose: () => {},
      }),
    );

    expect(html).toMatch(/Mathematical Derivation/);
    expect(html).toMatch(/O\(log n\)/);
  });

  it("distinguishes live observed vs theoretical bounds", () => {
    const config = {
      id: "LS",
      name: "Linear Search",
      category: "searching",
    };

    const html = renderToString(
      h(ComplexityAnalysisModal, {
        algorithmConfig: config,
        currentStepIndex: 0,
        steps: [{ comparisons: 1 }],
        params: { array: [5], target: 5 },
        onClose: () => {},
      }),
    );

    expect(html).toMatch(/Live Execution Verification/);
    expect(html).toMatch(/cannot be inferred from a single execution/);
  });

  it("renders BST and Graph complexity analysis with mathematical derivation", () => {
    const bstConfig = {
      id: "BST",
      name: "Binary Search Tree",
      category: "data-structures",
    };

    const bstHtml = renderToString(
      h(ComplexityAnalysisModal, {
        algorithmConfig: bstConfig,
        currentStepIndex: 0,
        steps: [{ comparisons: 2, nodesVisited: 3 }],
        params: { data: { size: 7 } },
        onClose: () => {},
      }),
    );

    expect(bstHtml).toMatch(/Binary Search Tree/);
    expect(bstHtml).toMatch(/Mathematical Derivation/);
    expect(bstHtml).toMatch(/Current input size n[\s\S]*7/);
    expect(bstHtml).toMatch(/Final Asymptotic Bound/);

    const graphConfig = {
      id: "GRAPH",
      name: "Graph",
      category: "data-structures",
    };

    const graphHtml = renderToString(
      h(ComplexityAnalysisModal, {
        algorithmConfig: graphConfig,
        currentStepIndex: 0,
        steps: [{ nodesVisited: 4, edgesExplored: 6 }],
        params: { data: { vertices: [1, 2, 3, 4] } },
        onClose: () => {},
      }),
    );

    expect(graphHtml).toMatch(/Graph/);
    expect(graphHtml).toMatch(/Mathematical Derivation/);
    expect(graphHtml).toMatch(/Current input size n[\s\S]*4/);
  });

  it("renders operation-specific definitions and derivations for Linked List insert-head", () => {
    const llConfig = {
      id: "LL",
      name: "Linked List",
      category: "data-structures",
    };

    const html = renderToString(
      h(ComplexityAnalysisModal, {
        algorithmConfig: llConfig,
        activeOperation: "insert-head",
        currentStepIndex: 0,
        steps: [],
        currentData: [10, 20],
        params: null,
        onClose: () => {},
      }),
    );

    expect(html).not.toMatch(/No derivation data for this case/);
    expect(html).toMatch(/Concept Definition/);
    expect(html).toMatch(/Insert at Head/);
    expect(html).toMatch(/Worked Example Walkthrough/);
    expect(html).toMatch(/Current input size n[\s\S]*2/);
    expect(html).toMatch(/Mathematical Derivation/);
    expect(html).toMatch(/O\(1\)/);
  });
});
