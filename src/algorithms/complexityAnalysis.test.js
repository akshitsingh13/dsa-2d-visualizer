import { describe, expect, it } from "vitest";
import {
  getComplexityAnalysis,
  getAlgorithmIds,
  computeLiveMetrics,
  computeSpaceMetrics,
} from "./complexityAnalysis";
import algorithmRegistry from "./algorithmRegistry";

const REGISTRY_IDS = Object.keys(algorithmRegistry);

describe("complexityAnalysis registry parity", () => {
  it("covers every registry id and vice versa", () => {
    const analysisIds = getAlgorithmIds();

    expect(analysisIds.sort()).toEqual([...REGISTRY_IDS].sort());

    for (const id of REGISTRY_IDS) {
      const analysis = getComplexityAnalysis(id);
      expect(analysis, id).not.toBe(null);
      expect(analysis.id).toBe(id);
      expect(analysis.title).toBe(algorithmRegistry[id].name);
      expect(analysis.category).toBe(algorithmRegistry[id].category);
    }

    expect(getComplexityAnalysis("NOPE")).toBe(null);
  });
});

describe("complexityAnalysis entry shape", () => {
  it("has all required top-level fields", () => {
    for (const id of REGISTRY_IDS) {
      const analysis = getComplexityAnalysis(id);

      expect(typeof analysis.inputSize, `${id} inputSize`).toBe("function");
      expect(Array.isArray(analysis.liveMetrics), `${id} liveMetrics`).toBe(
        true,
      );
      expect(analysis.liveMetrics.length, `${id} liveMetrics`).toBeGreaterThan(
        0,
      );
      expect(typeof analysis.stepOperation, `${id} stepOperation`).toBe(
        "function",
      );

      const tc = analysis.timeComplexity;
      expect(tc.best, `${id} timeComplexity.best`).toBeTruthy();
      expect(tc.average, `${id} timeComplexity.average`).toBeTruthy();
      expect(tc.worst, `${id} timeComplexity.worst`).toBeTruthy();

      const sc = analysis.spaceComplexity;
      expect(sc.inputStorage, `${id} space.inputStorage`).toBeTruthy();
      expect(sc.auxiliaryStorage, `${id} space.auxiliaryStorage`).toBeTruthy();
      expect(sc.totalSpace, `${id} space.totalSpace`).toBeTruthy();
      expect(sc.bound, `${id} space.bound`).toBeTruthy();
      expect(Array.isArray(sc.derivation), `${id} space.derivation`).toBe(
        true,
      );
      expect(sc.derivation.length, `${id} space.derivation`).toBeGreaterThan(0);
    }
  });

  it("every live metric has required fields", () => {
    for (const id of REGISTRY_IDS) {
      const analysis = getComplexityAnalysis(id);

      for (const metric of analysis.liveMetrics) {
        expect(typeof metric.key, `${id} metric.key`).toBe("string");
        expect(typeof metric.label, `${id} metric.label`).toBe("string");
        expect(typeof metric.stepKey, `${id} metric.stepKey`).toBe("string");
        expect(typeof metric.description, `${id} metric.description`).toBe(
          "string",
        );
        expect(metric.key.length).toBeGreaterThan(0);
        expect(metric.label.length).toBeGreaterThan(0);
      }
    }
  });

  it("every complexity case has derivation and valid bound notation", () => {
    const validBounds = ["Omega(", "Theta(", "O("];

    for (const id of REGISTRY_IDS) {
      const analysis = getComplexityAnalysis(id);

      for (const caseName of ["best", "average", "worst"]) {
        const tc = analysis.timeComplexity[caseName];

        expect(typeof tc.conditions, `${id} ${caseName} conditions`).toBe(
          "string",
        );
        expect(tc.conditions.length).toBeGreaterThan(0);
        expect(typeof tc.expression, `${id} ${caseName} expression`).toBe(
          "string",
        );
        expect(tc.expression.length).toBeGreaterThan(0);
        expect(Array.isArray(tc.derivation), `${id} ${caseName} derivation`).toBe(
          true,
        );
        expect(tc.derivation.length).toBeGreaterThan(0);

        for (const line of tc.derivation) {
          expect(typeof line, `${id} ${caseName} derivation line`).toBe(
            "string",
          );
          expect(line.length).toBeGreaterThan(0);
        }

        expect(typeof tc.bound, `${id} ${caseName} bound`).toBe("string");
        expect(
          validBounds.some((prefix) => tc.bound.startsWith(prefix)),
          `${id} ${caseName} bound uses Omega/Theta/O notation`,
        ).toBe(true);

        expect(typeof tc.label, `${id} ${caseName} label`).toBe("string");
        expect(tc.label.length).toBeGreaterThan(0);
      }
    }
  });

  it("uses Omega/Theta/O correctly (not interchangeable with best/average/worst)", () => {
    // Best case should be Omega or Theta (lower/tight bound), not bare O
    const bs = getComplexityAnalysis("BS");
    expect(bs.timeComplexity.best.bound.startsWith("Theta")).toBe(true);
    expect(bs.timeComplexity.best.bound.startsWith("O(")).toBe(false);

    // Worst case should be O or Theta (upper/tight bound)
    const ls = getComplexityAnalysis("LS");
    expect(ls.timeComplexity.worst.bound.startsWith("O(")).toBe(true);

    // Bubble sort best case with early exit should be Omega(n)
    const bub = getComplexityAnalysis("BUB");
    expect(bub.timeComplexity.best.bound.startsWith("Omega")).toBe(true);
  });
});

describe("computeLiveMetrics", () => {
  const lsAnalysis = getComplexityAnalysis("LS");

  it("returns zeros for empty steps", () => {
    const result = computeLiveMetrics([], 0, lsAnalysis.liveMetrics);

    expect(result.values.comparisons).toBe(0);
    expect(result.currentStepDescription).toBe("No steps executed yet.");
  });

  it("returns cumulative counters from current step", () => {
    const steps = [
      { comparisons: 1 },
      { comparisons: 2 },
      { comparisons: 3 },
    ];

    const result = computeLiveMetrics(steps, 2, lsAnalysis.liveMetrics);

    expect(result.values.comparisons).toBe(3);
  });

  it("clamps index to valid range", () => {
    const steps = [{ comparisons: 5 }];

    const result = computeLiveMetrics(steps, 100, lsAnalysis.liveMetrics);

    expect(result.values.comparisons).toBe(5);
  });

  it("returns empty values object for no liveMetrics", () => {
    const result = computeLiveMetrics([{ comparisons: 1 }], 0, []);

    expect(result.values).toEqual({});
  });
});

describe("computeSpaceMetrics", () => {
  it("returns space metrics with input size", () => {
    const ls = getComplexityAnalysis("LS");
    const metrics = computeSpaceMetrics(ls, 10);

    expect(metrics.inputSize).toBe(10);
    expect(metrics.bound).toBe("O(1)");
    expect(metrics.inputStorage).toContain("O(n)");
    expect(metrics.auxiliaryStorage).toContain("O(1)");
    expect(metrics.totalSpace).toContain("O(n)");
  });

  it("returns null for missing analysis", () => {
    expect(computeSpaceMetrics(null, 5)).toBe(null);
  });
});

describe("algorithm-specific complexity correctness", () => {
  it("Linear Search: best Theta(1), worst O(n)", () => {
    const ls = getComplexityAnalysis("LS");

    expect(ls.timeComplexity.best.bound).toBe("Theta(1)");
    expect(ls.timeComplexity.worst.bound).toBe("O(n)");
    expect(ls.timeComplexity.average.bound).toBe("Theta(n)");

    expect(ls.timeComplexity.best.expression).toBe("1 comparison");
    expect(ls.timeComplexity.worst.expression).toBe("n comparisons");
  });

  it("Binary Search: best Theta(1), average/worst Theta/O(log n)", () => {
    const bs = getComplexityAnalysis("BS");

    expect(bs.timeComplexity.best.bound).toBe("Theta(1)");
    expect(bs.timeComplexity.average.bound).toBe("Theta(log n)");
    expect(bs.timeComplexity.worst.bound).toBe("O(log n)");
  });

  it("Bubble Sort: best Omega(n) due to early exit, worst O(n²)", () => {
    const bub = getComplexityAnalysis("BUB");

    expect(bub.timeComplexity.best.bound).toBe("Omega(n)");
    expect(bub.timeComplexity.average.bound).toBe("Theta(n²)");
    expect(bub.timeComplexity.worst.bound).toBe("O(n²)");

    // Verify derivation mentions the swap count formula
    const worstDerivation = bub.timeComplexity.worst.derivation.join(" ");
    expect(worstDerivation).toContain("n(n - 1) / 2");
  });

  it("Stack/Queue: all cases Theta(1)", () => {
    const stk = getComplexityAnalysis("STK");
    const que = getComplexityAnalysis("QUE");

    for (const caseName of ["best", "average", "worst"]) {
      expect(stk.timeComplexity[caseName].bound).toBe("Theta(1)");
      expect(que.timeComplexity[caseName].bound).toBe("Theta(1)");
    }
  });

  it("Linked List: per-operation complexity", () => {
    const ll = getComplexityAnalysis("LL");

    // insert-head and delete-head are O(1)
    expect(ll.timeComplexity.best.bound).toBe("Theta(1)");

    // search and traverse are O(n)
    expect(ll.timeComplexity.worst.bound).toBe("O(n)");

    // live metric is nodesVisited
    expect(ll.liveMetrics[0].key).toBe("nodesVisited");
    expect(ll.liveMetrics[0].stepKey).toBe("nodesVisited");
  });

  it("Bubble Sort has two live metrics (comparisons and swaps)", () => {
    const bub = getComplexityAnalysis("BUB");

    const keys = bub.liveMetrics.map((m) => m.key);
    expect(keys).toContain("comparisons");
    expect(keys).toContain("swaps");
  });
});
