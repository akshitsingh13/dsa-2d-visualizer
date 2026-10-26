import { describe, expect, it } from "vitest";
import bstOperation, {
  BST_CODE,
  BST_OPERATIONS,
  countNodes,
  treeToInorder,
} from "./bstOps";

function buildTreeFromValues(values) {
  let root = null;
  for (const v of values) {
    const steps = bstOperation(root, { operation: "insert", value: v });
    root = steps[steps.length - 1].data;
  }
  return root;
}

describe("BST Step Generator", () => {
  it("defines standard BST operations and code", () => {
    expect(BST_OPERATIONS).toEqual([
      "insert",
      "search",
      "delete",
      "inorder",
      "preorder",
      "postorder",
      "clear",
    ]);
    for (const op of BST_OPERATIONS) {
      expect(typeof BST_CODE[op]).toBe("string");
      expect(BST_CODE[op].length).toBeGreaterThan(0);
    }
  });

  describe("Insertion", () => {
    it("inserts root node on empty tree", () => {
      const steps = bstOperation(null, { operation: "insert", value: 50 });
      expect(steps.length).toBeGreaterThan(0);
      const last = steps[steps.length - 1];
      expect(last.error).toBe(false);
      expect(last.data).not.toBe(null);
      expect(last.data.value).toBe(50);
      expect(last.data.left).toBe(null);
      expect(last.data.right).toBe(null);
    });

    it("inserts left and right children maintaining BST ordering", () => {
      let root = null;
      // Insert root 50
      root = bstOperation(root, { operation: "insert", value: 50 }).pop().data;
      // Insert 30 (left)
      root = bstOperation(root, { operation: "insert", value: 30 }).pop().data;
      // Insert 70 (right)
      root = bstOperation(root, { operation: "insert", value: 70 }).pop().data;

      expect(root.value).toBe(50);
      expect(root.left.value).toBe(30);
      expect(root.right.value).toBe(70);
      expect(treeToInorder(root)).toEqual([30, 50, 70]);
    });

    it("handles duplicates by returning error step without mutating tree", () => {
      const root = buildTreeFromValues([50, 30, 70]);
      const steps = bstOperation(root, { operation: "insert", value: 30 });
      const last = steps[steps.length - 1];
      expect(last.error).toBe(true);
      expect(last.message).toMatch(/duplicate/i);
      expect(treeToInorder(last.data)).toEqual([30, 50, 70]);
    });
  });

  describe("Searching", () => {
    it("returns error on searching empty tree", () => {
      const steps = bstOperation(null, { operation: "search", value: 10 });
      const last = steps[steps.length - 1];
      expect(last.error).toBe(true);
      expect(last.message).toMatch(/empty/i);
    });

    it("successfully finds existing target node", () => {
      const root = buildTreeFromValues([50, 20, 70, 10, 30, 60, 80]);
      const steps = bstOperation(root, { operation: "search", value: 30 });
      const last = steps[steps.length - 1];
      expect(last.error).toBe(false);
      expect(last.foundNodeId).not.toBe(null);
      expect(last.message).toMatch(/found/i);
      expect(last.comparisons).toBeGreaterThanOrEqual(1);
    });

    it("reports not found for non-existent target", () => {
      const root = buildTreeFromValues([50, 20, 70]);
      const steps = bstOperation(root, { operation: "search", value: 99 });
      const last = steps[steps.length - 1];
      expect(last.error).toBe(true);
      expect(last.message).toMatch(/not found/i);
    });
  });

  describe("Deletion", () => {
    it("returns error when deleting from an empty tree", () => {
      const steps = bstOperation(null, { operation: "delete", value: 10 });
      const last = steps[steps.length - 1];
      expect(last.error).toBe(true);
      expect(last.message).toMatch(/empty/i);
    });

    it("returns error when deleting non-existent node", () => {
      const root = buildTreeFromValues([50, 20, 70]);
      const steps = bstOperation(root, { operation: "delete", value: 100 });
      const last = steps[steps.length - 1];
      expect(last.error).toBe(true);
      expect(last.message).toMatch(/not found/i);
    });

    it("deletes a leaf node (0 children)", () => {
      const root = buildTreeFromValues([50, 30, 70, 20]);
      const steps = bstOperation(root, { operation: "delete", value: 20 });
      const last = steps[steps.length - 1];
      expect(last.error).toBe(false);
      expect(treeToInorder(last.data)).toEqual([30, 50, 70]);
      expect(last.data.left.left).toBe(null);
    });

    it("deletes a node with one child", () => {
      // 50 -> 30 -> 20 (30 has only left child 20)
      const root = buildTreeFromValues([50, 30, 70, 20]);
      const steps = bstOperation(root, { operation: "delete", value: 30 });
      const last = steps[steps.length - 1];
      expect(last.error).toBe(false);
      expect(treeToInorder(last.data)).toEqual([20, 50, 70]);
      expect(last.data.left.value).toBe(20);
    });

    it("deletes a node with two children using in-order successor", () => {
      // Tree:
      //        50
      //       /  \
      //      30   70
      //     /  \
      //    20  40
      // Delete 30: in-order successor of 30 is 40
      const root = buildTreeFromValues([50, 30, 70, 20, 40]);
      const steps = bstOperation(root, { operation: "delete", value: 30 });
      const last = steps[steps.length - 1];
      expect(last.error).toBe(false);
      expect(treeToInorder(last.data)).toEqual([20, 40, 50, 70]);
      expect(last.data.left.value).toBe(40);
      expect(last.data.left.left.value).toBe(20);
      expect(last.data.left.right).toBe(null);
    });

    it("deletes root node with two children", () => {
      const root = buildTreeFromValues([50, 30, 70, 60, 80]);
      const steps = bstOperation(root, { operation: "delete", value: 50 });
      const last = steps[steps.length - 1];
      expect(last.error).toBe(false);
      // In-order successor of 50 is 60
      expect(last.data.value).toBe(60);
      expect(treeToInorder(last.data)).toEqual([30, 60, 70, 80]);
    });
  });

  describe("Traversals", () => {
    it("returns error on traversing an empty tree", () => {
      for (const op of ["inorder", "preorder", "postorder"]) {
        const steps = bstOperation(null, { operation: op });
        const last = steps[steps.length - 1];
        expect(last.error).toBe(true);
        expect(last.message).toMatch(/empty/i);
      }
    });

    it("performs in-order traversal (Left, Root, Right) in sorted order", () => {
      const root = buildTreeFromValues([50, 30, 70, 20, 40]);
      const steps = bstOperation(root, { operation: "inorder" });
      const last = steps[steps.length - 1];
      expect(last.error).toBe(false);
      expect(last.traversalOrder).toEqual([20, 30, 40, 50, 70]);
    });

    it("performs pre-order traversal (Root, Left, Right)", () => {
      const root = buildTreeFromValues([50, 30, 70, 20, 40]);
      const steps = bstOperation(root, { operation: "preorder" });
      const last = steps[steps.length - 1];
      expect(last.error).toBe(false);
      expect(last.traversalOrder).toEqual([50, 30, 20, 40, 70]);
    });

    it("performs post-order traversal (Left, Right, Root)", () => {
      const root = buildTreeFromValues([50, 30, 70, 20, 40]);
      const steps = bstOperation(root, { operation: "postorder" });
      const last = steps[steps.length - 1];
      expect(last.error).toBe(false);
      expect(last.traversalOrder).toEqual([20, 40, 30, 70, 50]);
    });
  });

  describe("Clear / Reset and Immortality (step history immutability)", () => {
    it("clears all nodes", () => {
      const root = buildTreeFromValues([50, 30, 70]);
      const steps = bstOperation(root, { operation: "clear" });
      const last = steps[steps.length - 1];
      expect(last.error).toBe(false);
      expect(last.data).toBe(null);
    });

    it("ensures historical steps retain their immutable snapshots", () => {
      const root = buildTreeFromValues([50]);
      const steps = bstOperation(root, { operation: "insert", value: 25 });

      expect(steps.length).toBeGreaterThan(1);
      // Ensure modifying one step does not mutate other snapshots
      const firstStepData = steps[0].data;
      const lastStepData = steps[steps.length - 1].data;

      expect(countNodes(firstStepData)).toBe(1);
      expect(countNodes(lastStepData)).toBe(2);
    });
  });
});
