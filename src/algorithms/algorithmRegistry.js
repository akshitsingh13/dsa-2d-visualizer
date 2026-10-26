import linearSearch from "./linearSearch";
import binarySearch, { BINARY_SEARCH_CODE } from "./binarySearch";
import bubbleSort, { BUBBLE_SORT_CODE } from "./bubbleSort";
import stackOperation, { STACK_CAPACITY, STACK_CODE } from "./stackOps";
import queueOperation, { QUEUE_CAPACITY, QUEUE_CODE } from "./queueOps";
import linkedListOperation, { LL_CODE, LL_OPERATIONS } from "./linkedList";
import bstOperation, { BST_CODE, BST_OPERATIONS } from "./bstOps";
import graphOperation, { GRAPH_CODE, GRAPH_OPERATIONS } from "./graphOps";

// Registry contract — the single source of truth for every visualizer.
// Each entry must have:
//
//   {
//     name: "Binary Search",
//     category: "searching" | "sorting" | "data-structures",
//     visualizer: "array" | "bars" | "stack" | "queue" | "linkedList",
//     algorithm: fn,                 // pure step generator (no UI logic)
//     code: `...C++ source...`,      // shown in CodePanel (string, or an
//                                    // object / function keyed by operation
//                                    // for operation-based structures)
//     inputs: { array: true, target: true, ... },
//                                    // drives ControlPanel. Supported keys:
//                                    // array, target, operation (string[] of
//                                    // options), value, index.
//     operationFields: { push: ["value"], ... },  // optional: which extra
//                                    // fields each operation needs
//     requiresSortedArray: true,     // optional: reject unsorted input
//     maxLength: 12,                 // optional: cap array length
//     capacity: 8,                   // optional: data-structure capacity
//     complexity: { best, average, worst, space },
//                                    // or { <operation>: {...} } / fn for
//                                    // operation-based structures,
//     counters: ["comparisons"],     // live step counters shown next to the
//                                    // complexity table.
//   }

const algorithmRegistry = {
  LS: {
    name: "Linear Search",
    category: "searching",
    visualizer: "array",
    algorithm: linearSearch,

    code: `vector<int> linearSearch(vector<int> arr, int target) {
    vector<int> result;

    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) {
            result.push_back(i);
            return result;
        }
    }

    return result;
}`,

    inputs: {
      array: true,
      target: true,
    },

    complexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },

    counters: ["comparisons"],
  },

  BS: {
    name: "Binary Search",
    category: "searching",
    visualizer: "array",
    algorithm: binarySearch,
    code: BINARY_SEARCH_CODE,

    inputs: {
      array: true,
      target: true,
    },

    requiresSortedArray: true,

    complexity: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)",
      space: "O(1)",
    },

    counters: ["comparisons"],
  },

  BUB: {
    name: "Bubble Sort",
    category: "sorting",
    visualizer: "bars",
    algorithm: bubbleSort,
    code: BUBBLE_SORT_CODE,

    inputs: {
      array: true,
    },

    maxLength: 12,

    complexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)",
    },

    counters: ["comparisons", "swaps"],
  },

  STK: {
    name: "Stack",
    category: "data-structures",
    visualizer: "stack",
    algorithm: stackOperation,
    code: STACK_CODE,

    inputs: {
      operation: ["push", "pop", "peek", "clear"],
      value: true,
    },

    operationFields: {
      push: ["value"],
      pop: [],
      peek: [],
      clear: [],
    },

    capacity: STACK_CAPACITY,

    complexity: {
      best: "O(1)",
      average: "O(1)",
      worst: "O(1)",
      space: "O(n)",
    },

    counters: ["operations"],
  },

  QUE: {
    name: "Queue",
    category: "data-structures",
    visualizer: "queue",
    algorithm: queueOperation,
    code: QUEUE_CODE,

    inputs: {
      operation: ["enqueue", "dequeue", "peek", "clear"],
      value: true,
    },

    operationFields: {
      enqueue: ["value"],
      dequeue: [],
      peek: [],
      clear: [],
    },

    capacity: QUEUE_CAPACITY,

    complexity: {
      best: "O(1)",
      average: "O(1)",
      worst: "O(1)",
      space: "O(n)",
    },

    counters: ["operations"],
  },

  LL: {
    name: "Linked List",
    category: "data-structures",
    visualizer: "linkedList",
    algorithm: linkedListOperation,
    code: LL_CODE,

    inputs: {
      operation: LL_OPERATIONS,
      value: true,
      index: true,
    },

    operationFields: {
      "insert-head": ["value"],
      "insert-tail": ["value"],
      "insert-index": ["value", "index"],
      "delete-value": ["value"],
      "delete-head": [],
      search: ["value"],
      traverse: [],
    },

    complexity: {
      "insert-head": {
        best: "O(1)",
        average: "O(1)",
        worst: "O(1)",
        space: "O(n)",
      },
      "insert-tail": {
        best: "O(n)",
        average: "O(n)",
        worst: "O(n)",
        space: "O(n)",
      },
      "insert-index": {
        best: "O(n)",
        average: "O(n)",
        worst: "O(n)",
        space: "O(n)",
      },
      "delete-value": {
        best: "O(n)",
        average: "O(n)",
        worst: "O(n)",
        space: "O(n)",
      },
      "delete-head": {
        best: "O(1)",
        average: "O(1)",
        worst: "O(1)",
        space: "O(n)",
      },
      search: {
        best: "O(n)",
        average: "O(n)",
        worst: "O(n)",
        space: "O(n)",
      },
      traverse: {
        best: "O(n)",
        average: "O(n)",
        worst: "O(n)",
        space: "O(n)",
      },
    },

    counters: ["nodesVisited"],
  },

  BST: {
    name: "Binary Search Tree",
    category: "data-structures",
    visualizer: "tree",
    algorithm: bstOperation,
    code: BST_CODE,

    inputs: {
      operation: BST_OPERATIONS,
      value: true,
    },

    operationFields: {
      insert: ["value"],
      search: ["value"],
      delete: ["value"],
      inorder: [],
      preorder: [],
      postorder: [],
      clear: [],
    },

    complexity: {
      insert: {
        best: "O(1)",
        average: "O(log n)",
        worst: "O(n)",
        space: "O(h)",
      },
      search: {
        best: "O(1)",
        average: "O(log n)",
        worst: "O(n)",
        space: "O(h)",
      },
      delete: {
        best: "O(1)",
        average: "O(log n)",
        worst: "O(n)",
        space: "O(h)",
      },
      inorder: {
        best: "O(n)",
        average: "O(n)",
        worst: "O(n)",
        space: "O(h)",
      },
      preorder: {
        best: "O(n)",
        average: "O(n)",
        worst: "O(n)",
        space: "O(h)",
      },
      postorder: {
        best: "O(n)",
        average: "O(n)",
        worst: "O(n)",
        space: "O(h)",
      },
      clear: {
        best: "O(1)",
        average: "O(1)",
        worst: "O(1)",
        space: "O(1)",
      },
    },

    counters: ["comparisons", "nodesVisited"],
  },

  GRAPH: {
    name: "Graph",
    category: "data-structures",
    visualizer: "graph",
    algorithm: graphOperation,
    code: GRAPH_CODE,

    inputs: {
      operation: GRAPH_OPERATIONS,
      value: true,
      targetVertex: true,
    },

    operationFields: {
      "add-vertex": ["value"],
      "add-edge": ["value", "targetVertex"],
      "remove-vertex": ["value"],
      "remove-edge": ["value", "targetVertex"],
      bfs: ["value"],
      dfs: ["value"],
      clear: [],
    },

    complexity: {
      "add-vertex": {
        best: "O(1)",
        average: "O(1)",
        worst: "O(1)",
        space: "O(V + E)",
      },
      "add-edge": {
        best: "O(1)",
        average: "O(1)",
        worst: "O(deg(u))",
        space: "O(V + E)",
      },
      "remove-vertex": {
        best: "O(deg(u))",
        average: "O(V + E)",
        worst: "O(V + E)",
        space: "O(V + E)",
      },
      "remove-edge": {
        best: "O(1)",
        average: "O(deg(u))",
        worst: "O(deg(u))",
        space: "O(V + E)",
      },
      bfs: {
        best: "O(1)",
        average: "O(V + E)",
        worst: "O(V + E)",
        space: "O(V)",
      },
      dfs: {
        best: "O(1)",
        average: "O(V + E)",
        worst: "O(V + E)",
        space: "O(V)",
      },
      clear: {
        best: "O(1)",
        average: "O(1)",
        worst: "O(1)",
        space: "O(1)",
      },
    },

    counters: ["nodesVisited", "edgesExplored"],
  },
};

export default algorithmRegistry;
