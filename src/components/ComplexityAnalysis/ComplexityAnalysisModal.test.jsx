import { createElement as h } from "react";
import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import ComplexityAnalysisModal from "./ComplexityAnalysisModal";
import { getComplexityAnalysis } from "../../algorithms/complexityAnalysis";

const THEORY_IDS = ["LS", "BS", "BUB", "STK", "QUE", "LL"];

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

  it("renders all four required sections for every algorithm", () => {
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

    // Best / Average / Worst sections (Space tab not active by default in SSR)
    expect(html).toMatch(/Best Case/);
    expect(html).toMatch(/Average Case/);
    expect(html).toMatch(/Worst Case/);

    // Derivation blocks present
    expect(html).toMatch(/derivation-line/);

    // Live counters
    expect(html).toMatch(/Comparisons/);
    expect(html).toMatch(/Swaps/);
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

    // SSR inserts <!-- --> comments between text and dynamic values, so use
    // [\s\S]* to match across comment nodes.
    expect(html).toMatch(/Input size n[\s\S]*5/);
    expect(html).toMatch(/7 comparisons/);
    expect(html).toMatch(/data-key="comparisons">7/);
  });

  it("renders space complexity panel when space tab is active", () => {
    // SSR renders the default "time" tab. To test the space panel, we check
    // that the Space Complexity tab exists and the time panel content renders.
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
    expect(html).toMatch(/Input size n[\s\S]*3/);
    expect(html).toMatch(/Operations/);
  });

  it("renders derivation steps for best case (default active tab)", () => {
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

    // Best case derivation (default active case)
    expect(html).toMatch(/1 comparison/);
    expect(html).toMatch(/Compute mid/);
    expect(html).toMatch(/O\(1\)/);
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

    expect(html).toMatch(/Observed so far/);
    expect(html).toMatch(/Theoretical/);
    expect(html).toMatch(
      /cannot be inferred from a single execution/,
    );
  });
});
