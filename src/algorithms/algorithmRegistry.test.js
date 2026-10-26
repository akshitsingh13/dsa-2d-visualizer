import { describe, expect, it } from "vitest";
import algorithmRegistry from "./algorithmRegistry";
import { resolveComplexity } from "../components/Visualizer/complexityHelpers";

const VALID_CATEGORIES = ["searching", "sorting", "data-structures"];
const VALID_VISUALIZERS = [
  "array",
  "bars",
  "stack",
  "queue",
  "linkedList",
  "tree",
  "graph",
];

describe("algorithmRegistry contract", () => {
  const entries = Object.entries(algorithmRegistry);

  it("registers eight algorithms", () => {
    expect(entries.length).toBe(8);
  });

  it("gives every entry the required fields", () => {
    for (const [id, config] of entries) {
      expect(typeof config.name, id).toBe("string");
      expect(VALID_CATEGORIES, id).toContain(config.category);
      expect(VALID_VISUALIZERS, id).toContain(config.visualizer);
      expect(typeof config.algorithm, id).toBe("function");
      expect(config.code, id).toBeTruthy();
      expect(typeof config.inputs, id).toBe("object");
      expect(config.complexity, id).toBeTruthy();
      expect(Array.isArray(config.counters), id).toBe(true);
      expect(config.counters.length, id).toBeGreaterThan(0);
    }
  });

  it("covers all three sidebar categories", () => {
    const categories = new Set(entries.map(([, config]) => config.category));

    expect(categories.has("searching")).toBe(true);
    expect(categories.has("sorting")).toBe(true);
    expect(categories.has("data-structures")).toBe(true);
  });

  it("resolves per-operation complexity for the linked list", () => {
    const complexity = algorithmRegistry.LL.complexity;

    expect(resolveComplexity(complexity, "insert-head").best).toBe("O(1)");
    expect(resolveComplexity(complexity, "search").worst).toBe("O(n)");
  });

  it("resolves plain complexity objects unchanged", () => {
    expect(resolveComplexity(algorithmRegistry.LS.complexity).worst).toBe(
      "O(n)",
    );
    expect(resolveComplexity(null)).toBe(null);
  });

  it("resolves function complexity", () => {
    const fn = (operation) => ({ best: operation });

    expect(resolveComplexity(fn, "push").best).toBe("push");
  });
});
