import { describe, expect, it } from "vitest";
import graphOperation, {
  GRAPH_CODE,
  GRAPH_OPERATIONS,
  createDefaultGraph,
} from "./graphOps";

describe("Graph Step Generator", () => {
  it("defines all graph operations and C++ source code", () => {
    expect(GRAPH_OPERATIONS).toEqual([
      "add-vertex",
      "add-edge",
      "remove-vertex",
      "remove-edge",
      "bfs",
      "dfs",
      "clear",
    ]);

    for (const op of GRAPH_OPERATIONS) {
      expect(typeof GRAPH_CODE[op]).toBe("string");
      expect(GRAPH_CODE[op].length).toBeGreaterThan(0);
    }
  });

  describe("Graph modifications (Vertices and Edges)", () => {
    it("adds a new isolated vertex", () => {
      const g = { vertices: [1, 2], adj: { 1: [2], 2: [1] } };
      const steps = graphOperation(g, { operation: "add-vertex", value: 3 });
      const last = steps[steps.length - 1];

      expect(last.error).toBe(false);
      expect(last.data.vertices).toEqual([1, 2, 3]);
      expect(last.data.adj[3]).toEqual([]);
    });

    it("rejects duplicate vertices with error step", () => {
      const g = { vertices: [1, 2], adj: { 1: [], 2: [] } };
      const steps = graphOperation(g, { operation: "add-vertex", value: 2 });
      const last = steps[steps.length - 1];

      expect(last.error).toBe(true);
      expect(last.message).toMatch(/already exists/i);
      expect(last.data.vertices).toEqual([1, 2]);
    });

    it("adds an undirected edge between two existing vertices", () => {
      const g = { vertices: [1, 2, 3], adj: { 1: [], 2: [], 3: [] } };
      const steps = graphOperation(g, {
        operation: "add-edge",
        value: 1,
        targetVertex: 3,
      });
      const last = steps[steps.length - 1];

      expect(last.error).toBe(false);
      expect(last.data.adj[1]).toContain(3);
      expect(last.data.adj[3]).toContain(1);
    });

    it("rejects self-loops or non-existent vertices when adding edge", () => {
      const g = { vertices: [1, 2], adj: { 1: [], 2: [] } };
      // Self loop
      const stepSelf = graphOperation(g, {
        operation: "add-edge",
        value: 1,
        targetVertex: 1,
      }).pop();
      expect(stepSelf.error).toBe(true);
      expect(stepSelf.message).toMatch(/self-loop/i);

      // Non-existent vertex
      const stepMissing = graphOperation(g, {
        operation: "add-edge",
        value: 1,
        targetVertex: 99,
      }).pop();
      expect(stepMissing.error).toBe(true);
      expect(stepMissing.message).toMatch(/does not exist/i);
    });

    it("removes a vertex and unlinks incident edges from neighbors", () => {
      const g = {
        vertices: [1, 2, 3],
        adj: {
          1: [2, 3],
          2: [1],
          3: [1],
        },
      };
      const steps = graphOperation(g, {
        operation: "remove-vertex",
        value: 1,
      });
      const last = steps[steps.length - 1];

      expect(last.error).toBe(false);
      expect(last.data.vertices).toEqual([2, 3]);
      expect(last.data.adj[2]).toEqual([]);
      expect(last.data.adj[3]).toEqual([]);
      expect(last.data.adj[1]).toBeUndefined();
    });

    it("removes an undirected edge between two vertices", () => {
      const g = {
        vertices: [1, 2],
        adj: { 1: [2], 2: [1] },
      };
      const steps = graphOperation(g, {
        operation: "remove-edge",
        value: 1,
        targetVertex: 2,
      });
      const last = steps[steps.length - 1];

      expect(last.error).toBe(false);
      expect(last.data.adj[1]).toEqual([]);
      expect(last.data.adj[2]).toEqual([]);
    });
  });

  describe("Breadth-First Search (BFS)", () => {
    it("returns error step on empty graph", () => {
      const steps = graphOperation(
        { vertices: [], adj: {} },
        { operation: "bfs", value: 1 },
      );
      const last = steps[steps.length - 1];
      expect(last.error).toBe(true);
      expect(last.message).toMatch(/empty/i);
    });

    it("returns error on invalid starting vertex", () => {
      const g = createDefaultGraph();
      const steps = graphOperation(g, { operation: "bfs", value: 999 });
      const last = steps[steps.length - 1];
      expect(last.error).toBe(true);
      expect(last.message).toMatch(/not in the graph/i);
    });

    it("traverses in level-order radiating outward using queue", () => {
      // 1 connected to 2 and 3; 2 connected to 4 and 5
      const g = createDefaultGraph();
      const steps = graphOperation(g, { operation: "bfs", value: 1 });
      const last = steps[steps.length - 1];

      expect(last.error).toBe(false);
      expect(last.traversalOrder).toEqual([1, 2, 3, 4, 5]);
      expect(last.nodesVisited).toBe(5);
      expect(last.edgesExplored).toBeGreaterThan(0);
    });

    it("handles graphs with cycles without infinite loops", () => {
      // Triangle: 1-2, 2-3, 3-1
      const g = {
        vertices: [1, 2, 3],
        adj: {
          1: [2, 3],
          2: [1, 3],
          3: [1, 2],
        },
      };
      const steps = graphOperation(g, { operation: "bfs", value: 1 });
      const last = steps[steps.length - 1];

      expect(last.error).toBe(false);
      expect(last.traversalOrder).toEqual([1, 2, 3]);
    });

    it("handles disconnected components by noting unvisited vertices", () => {
      // Component A: 1-2; Component B: 3-4
      const g = {
        vertices: [1, 2, 3, 4],
        adj: {
          1: [2],
          2: [1],
          3: [4],
          4: [3],
        },
      };
      const steps = graphOperation(g, { operation: "bfs", value: 1 });
      const last = steps[steps.length - 1];

      expect(last.error).toBe(false);
      expect(last.traversalOrder).toEqual([1, 2]);
      expect(last.message).toMatch(/disconnected components/i);
    });
  });

  describe("Depth-First Search (DFS)", () => {
    it("returns error step on empty graph", () => {
      const steps = graphOperation(
        { vertices: [], adj: {} },
        { operation: "dfs", value: 1 },
      );
      const last = steps[steps.length - 1];
      expect(last.error).toBe(true);
      expect(last.message).toMatch(/empty/i);
    });

    it("returns error on invalid starting vertex", () => {
      const g = createDefaultGraph();
      const steps = graphOperation(g, { operation: "dfs", value: 999 });
      const last = steps[steps.length - 1];
      expect(last.error).toBe(true);
      expect(last.message).toMatch(/not in the graph/i);
    });

    it("explores branch depths before backtracking", () => {
      // Graph: 1 connects to 2, 3. 2 connects to 4, 5.
      // From 1: visits 2, from 2 visits 4, backtracks, visits 5, backtracks, visits 3.
      const g = createDefaultGraph();
      const steps = graphOperation(g, { operation: "dfs", value: 1 });
      const last = steps[steps.length - 1];

      expect(last.error).toBe(false);
      expect(last.traversalOrder).toEqual([1, 2, 4, 5, 3]);
      expect(last.nodesVisited).toBe(5);
    });

    it("detects cycle / back-edges cleanly during DFS", () => {
      const g = {
        vertices: [1, 2, 3],
        adj: {
          1: [2, 3],
          2: [1, 3],
          3: [1, 2],
        },
      };
      const steps = graphOperation(g, { operation: "dfs", value: 1 });
      const last = steps[steps.length - 1];

      expect(last.error).toBe(false);
      expect(last.traversalOrder).toEqual([1, 2, 3]);
    });

    it("handles isolated single vertex", () => {
      const g = { vertices: [7], adj: { 7: [] } };
      const steps = graphOperation(g, { operation: "dfs", value: 7 });
      const last = steps[steps.length - 1];

      expect(last.error).toBe(false);
      expect(last.traversalOrder).toEqual([7]);
      expect(last.nodesVisited).toBe(1);
    });
  });

  describe("Clear and Step Immutability", () => {
    it("clears all vertices and edges", () => {
      const g = createDefaultGraph();
      const steps = graphOperation(g, { operation: "clear" });
      const last = steps[steps.length - 1];

      expect(last.error).toBe(false);
      expect(last.data.vertices).toEqual([]);
      expect(last.data.adj).toEqual({});
    });

    it("ensures historical step snapshots are never mutated", () => {
      const g = { vertices: [1], adj: { 1: [] } };
      const steps = graphOperation(g, { operation: "add-vertex", value: 2 });

      expect(steps.length).toBeGreaterThan(1);
      const firstStepVertices = steps[0].data.vertices;
      const lastStepVertices = steps[steps.length - 1].data.vertices;

      expect(firstStepVertices).toEqual([1]);
      expect(lastStepVertices).toEqual([1, 2]);
    });
  });
});
