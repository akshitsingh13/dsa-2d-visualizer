// Complexity analysis metadata — single source of truth linking algorithm
// registry ids to their theoretical derivations and live-metric configuration.
//
// Each entry is keyed by the SAME id used in algorithmRegistry (LS, BS, BUB,
// STK, QUE, LL). Every registry id MUST have an entry here (enforced by tests).
//
// Structure:
//
//   {
//     inputSize: (params) => number,           // compute n from run parameters
//     liveMetrics: [                           // which step counters to show live
//       { key: "comparisons", label: "Comparisons", stepKey: "comparisons", description: "..." },
//     ],
//     stepOperation: (step, stepIndex) => string,  // what happened in this step
//     timeComplexity: {
//       best:   { conditions, expression, derivation[], bound, label },
//       average: { ... },
//       worst:  { ... },
//     },
//     spaceComplexity: {
//       inputStorage: "...",        // e.g. "array of n elements — O(n)"
//       auxiliaryStorage: "...",    // e.g. "loop counters — O(1)"
//       totalSpace: "...",          // combined
//       bound: "O(1)" | "O(n)" | ..., // auxiliary space bound
//       derivation: [...],           // step-by-step derivation
//       notes: "...",               // algorithm-specific notes
//     },
//     notes: "...",                 // educational notes specific to algorithm
//   }
//
// `bound` uses Omega (lower bound), Theta (tight bound), or O (upper bound)
// — they are NOT interchangeable names for best/average/worst cases.
//
// Live metrics are read from step objects. Step generators already emit
// cumulative counters (comparisons, swaps, operations, nodesVisited). This
// module only reads them — it never instruments the generators separately.
//
// Derivation strings are educational (human-readable math), not computed at
// runtime. Asymptotic bounds cannot be inferred from a single execution's
// operation count.

export const COMPLEXITY_ANALYSIS = {
  LS: {
    id: "LS",
    title: "Linear Search",
    category: "searching",

    inputSize: (params) => (params && params.array ? params.array.length : 0),

    liveMetrics: [
      {
        key: "comparisons",
        label: "Comparisons",
        stepKey: "comparisons",
        description: "Each time the current element is compared with the target.",
      },
    ],

    stepOperation: (step) => {
      if (step.comparingIndices.length > 0) {
        const idx = step.comparingIndices[0];
        return `Comparing index ${idx} (value ${step.array[idx]}) with target.`;
      }
      return step.message;
    },

    timeComplexity: {
      best: {
        conditions: "Target is at index 0 (first element checked).",
        expression: "1 comparison",
        derivation: [
          "The loop checks index 0 first.",
          "If arr[0] === target, the function returns immediately.",
          "Total comparisons = 1.",
        ],
        bound: "Theta(1)",
        label: "O(1)",
      },
      average: {
        conditions:
          "Target is equally likely to be at any position, or absent with some probability.",
        expression: "(n + 1) / 2 comparisons on average",
        derivation: [
          "If the target is at index i (0-based), the loop makes i + 1 comparisons.",
          "Average over all positions: (1 + 2 + ... + n) / n = (n + 1) / 2.",
          "Dropping lower-order terms and constants: Theta(n).",
        ],
        bound: "Theta(n)",
        label: "O(n)",
      },
      worst: {
        conditions:
          "Target is at the last index, or not present in the array at all.",
        expression: "n comparisons",
        derivation: [
          "The loop inspects every element once: n iterations.",
          "Each iteration performs one comparison with the target.",
          "Total comparisons = n.",
        ],
        bound: "O(n)",
        label: "O(n)",
      },
    },

    spaceComplexity: {
      inputStorage: "The input array holds n elements — O(n).",
      auxiliaryStorage:
        "Only a loop counter `i` and a few local variables are used — O(1) extra space beyond the input.",
      totalSpace: "O(n) including input; O(1) auxiliary.",
      bound: "O(1)",
      derivation: [
        "Input array: n elements → O(n) space.",
        "Auxiliary: one integer loop counter and a result reference → O(1) extra space.",
        "Total space = O(n) + O(1) = O(n). Auxiliary space = O(1).",
      ],
      notes:
        "The result vector can hold up to n indices if every element matches, but in the common case it holds a single result or is empty. This visualizer reports all matches in the result vector.",
    },

    notes:
      "Linear search makes no assumptions about input order — it works on sorted and unsorted arrays alike. Its simplicity is its strength; its O(n) worst case is its limitation on large data.",
  },

  BS: {
    id: "BS",
    title: "Binary Search",
    category: "searching",

    inputSize: (params) => (params && params.array ? params.array.length : 0),

    liveMetrics: [
      {
        key: "comparisons",
        label: "Comparisons",
        stepKey: "comparisons",
        description: "Each time arr[mid] is compared with the target.",
      },
    ],

    stepOperation: (step) => {
      if (step.mid != null) {
        return `mid = ${step.mid}; comparing arr[${step.mid}] with target.`;
      }
      return step.message;
    },

    timeComplexity: {
      best: {
        conditions: "The target equals the middle element on the first comparison.",
        expression: "1 comparison",
        derivation: [
          "Compute mid = (low + high) / 2.",
          "If arr[mid] === target, return immediately.",
          "Total comparisons = 1.",
        ],
        bound: "Theta(1)",
        label: "O(1)",
      },
      average: {
        conditions:
          "Target is present in the array (position unknown).",
        expression: "~log₂(n) comparisons",
        derivation: [
          "Each comparison halves the search range: n → n/2 → n/4 → ... → 1.",
          "The number of halvings to reach 1 is log₂(n).",
          "Average comparisons ≈ log₂(n).",
        ],
        bound: "Theta(log n)",
        label: "O(log n)",
      },
      worst: {
        conditions:
          "Target is absent, or is found only on the final possible comparison.",
        expression: "floor(log₂(n)) + 1 comparisons",
        derivation: [
          "The range shrinks by half each iteration until low > high.",
          "Maximum iterations = number of times n can be halved before reaching 0, plus one final check.",
          "Total = floor(log₂(n)) + 1.",
        ],
        bound: "O(log n)",
        label: "O(log n)",
      },
    },

    spaceComplexity: {
      inputStorage: "The input array holds n elements — O(n).",
      auxiliaryStorage:
        "Three integer variables: low, high, mid — O(1) extra space. Iterative (no recursion stack).",
      totalSpace: "O(n) including input; O(1) auxiliary.",
      bound: "O(1)",
      derivation: [
        "Input array: n elements → O(n) space.",
        "Auxiliary: low, high, mid integers → O(1) extra space.",
        "No recursion, so no call-stack usage.",
        "Total space = O(n); auxiliary space = O(1).",
      ],
      notes:
        "This is the iterative implementation. A recursive version would use O(log n) stack space.",
    },

    notes:
      "Binary search REQUIRES a sorted array. The visualizer enforces this — unsorted input is rejected with an option to sort automatically. The overflow-safe mid formula `low + (high - low) / 2` is used instead of `(low + high) / 2`.",
  },

  BUB: {
    id: "BUB",
    title: "Bubble Sort",
    category: "sorting",

    inputSize: (params) => (params && params.array ? params.array.length : 0),

    liveMetrics: [
      {
        key: "comparisons",
        label: "Comparisons",
        stepKey: "comparisons",
        description: "Each time two adjacent elements are compared.",
      },
      {
        key: "swaps",
        label: "Swaps",
        stepKey: "swaps",
        description: "Each time two adjacent elements are swapped because they are out of order.",
      },
    ],

    stepOperation: (step) => {
      if (step.swappingIndices && step.swappingIndices.length > 0) {
        return `Swapping elements at indices ${step.swappingIndices.join(", ")}.`;
      }
      if (step.comparingIndices && step.comparingIndices.length > 0) {
        return `Comparing indices ${step.comparingIndices.join(", ")}.`;
      }
      return step.message;
    },

    timeComplexity: {
      best: {
        conditions: "Array is already sorted (or becomes sorted after pass 1).",
        expression: "n - 1 comparisons, 0 swaps",
        derivation: [
          "Pass 1 compares every adjacent pair once: n - 1 comparisons.",
          "No swaps occur, so the `swapped` flag stays false and the loop breaks after pass 1.",
          "Total comparisons = n - 1; total swaps = 0.",
        ],
        bound: "Omega(n)",
        label: "O(n)",
      },
      average: {
        conditions: "Elements are in random order.",
        expression: "~n(n - 1) / 4 comparisons on average",
        derivation: [
          "Worst case performs (n - 1) + (n - 2) + ... + 1 = n(n - 1) / 2 comparisons.",
          "On average, roughly half of those comparisons lead to swaps, and the inner loop runs close to full length on most passes.",
          "Expected comparisons ≈ n(n - 1) / 4.",
          "Dropping lower-order terms: Theta(n²).",
        ],
        bound: "Theta(n²)",
        label: "O(n²)",
      },
      worst: {
        conditions: "Array is in reverse order (largest element at the start).",
        expression: "n(n - 1) / 2 comparisons, n(n - 1) / 2 swaps",
        derivation: [
          "Pass 1: n - 1 comparisons (largest bubbles to end).",
          "Pass 2: n - 2 comparisons.",
          "...",
          "Last pass: 1 comparison.",
          "Total comparisons = (n - 1) + (n - 2) + ... + 1 = n(n - 1) / 2.",
          "Every comparison results in a swap in reverse order, so swaps = n(n - 1) / 2 as well.",
          "Dropping lower-order terms: Theta(n²).",
        ],
        bound: "O(n²)",
        label: "O(n²)",
      },
    },

    spaceComplexity: {
      inputStorage: "The input array holds n elements — O(n).",
      auxiliaryStorage:
        "Loop counters `i` and `j`, a boolean `swapped` flag, and one temporary variable for swapping — O(1) extra space. Sorting is in-place.",
      totalSpace: "O(n) including input; O(1) auxiliary.",
      bound: "O(1)",
      derivation: [
        "Input array: n elements → O(n) space.",
        "Auxiliary: i, j, swapped, temp → O(1) extra space.",
        "No additional arrays allocated; elements are swapped within the input array.",
        "Total space = O(n); auxiliary space = O(1).",
      ],
      notes:
        "Bubble sort is stable (equal elements never swap past each other) and in-place, but its O(n²) time makes it impractical for large lists. It is primarily a teaching algorithm.",
    },

    notes:
      "The visualizer caps input at 12 values so the bars fit on screen. The swapped-flag early-exit optimization gives O(n) best case on already-sorted input.",
  },

  STK: {
    id: "STK",
    title: "Stack",
    category: "data-structures",

    inputSize: (params) => (params && params.array ? params.array.length : 0),

    liveMetrics: [
      {
        key: "operations",
        label: "Operations",
        stepKey: "operations",
        description: "Number of successful stack operations performed so far (push/pop/peek/clear). Failed operations (overflow/underflow) do not increment this counter.",
      },
    ],

    stepOperation: (step) => {
      return step.message || "Stack operation step.";
    },

    timeComplexity: {
      best: {
        conditions: "Any single push/pop/peek operation on a non-full/non-empty stack.",
        expression: "O(1) — constant time",
        derivation: [
          "Push: write to arr[top] and increment top — one array access.",
          "Pop: read arr[top] and decrement top — one array access.",
          "Peek: read arr[top] only — one array access.",
          "No loops, no searching — every operation completes in constant time.",
        ],
        bound: "Theta(1)",
        label: "O(1)",
      },
      average: {
        conditions: "Typical usage with normal push/pop/peek mix.",
        expression: "O(1) per operation",
        derivation: [
          "Each individual stack operation is O(1).",
          "A sequence of m operations is O(m) total.",
        ],
        bound: "Theta(1)",
        label: "O(1)",
      },
      worst: {
        conditions: "Push on a full stack (overflow) or pop/peek on an empty stack (underflow).",
        expression: "O(1) — the check itself is constant time",
        derivation: [
          "Overflow/underflow checks are simple comparisons (top == capacity - 1 or top == -1).",
          "The operation is rejected without modifying state — still O(1).",
        ],
        bound: "Theta(1)",
        label: "O(1)",
      },
    },

    spaceComplexity: {
      inputStorage: "The backing array has fixed capacity (8 in this visualizer) — O(capacity).",
      auxiliaryStorage:
        "One integer `top` index — O(1) extra space.",
      totalSpace: "O(capacity) ≈ O(n) where n is current stack size.",
      bound: "O(n)",
      derivation: [
        "Backing array: fixed capacity C → O(C) space. With C = 8, this is effectively constant.",
        "Auxiliary: top index → O(1) extra space.",
        "Total space = O(C) + O(1) = O(C). Since capacity bounds the number of elements, this is O(n) relative to stored elements.",
      ],
      notes:
        "Capacity is fixed at 8 in this visualizer. A linked-list-based stack would use O(n) node allocations instead.",
    },

    notes:
      "Stack is LIFO (last-in, first-out). The `operations` counter increments only for successful operations; overflow and underflow errors leave state unchanged and do not increment the counter.",
  },

  QUE: {
    id: "QUE",
    title: "Queue",
    category: "data-structures",

    inputSize: (params) => (params && params.array ? params.array.length : 0),

    liveMetrics: [
      {
        key: "operations",
        label: "Operations",
        stepKey: "operations",
        description: "Number of successful queue operations performed so far (enqueue/dequeue/peek/clear). Failed operations (overflow/underflow) do not increment this counter.",
      },
    ],

    stepOperation: (step) => {
      return step.message || "Queue operation step.";
    },

    timeComplexity: {
      best: {
        conditions: "Any single enqueue/dequeue/peek operation on a non-full/non-empty queue.",
        expression: "O(1) — constant time",
        derivation: [
          "Enqueue: write to arr[rear] and increment rear — one array access.",
          "Dequeue: read arr[front] and increment front — one array access.",
          "Peek: read arr[front] only — one array access.",
          "No loops, no searching — every operation completes in constant time.",
        ],
        bound: "Theta(1)",
        label: "O(1)",
      },
      average: {
        conditions: "Typical usage with normal enqueue/dequeue mix.",
        expression: "O(1) per operation",
        derivation: [
          "Each individual queue operation is O(1).",
          "A sequence of m operations is O(m) total.",
        ],
        bound: "Theta(1)",
        label: "O(1)",
      },
      worst: {
        conditions: "Enqueue on a full queue (overflow) or dequeue/peek on an empty queue (underflow).",
        expression: "O(1) — the check itself is constant time",
        derivation: [
          "Overflow/underflow checks are simple comparisons.",
          "The operation is rejected without modifying state — still O(1).",
        ],
        bound: "Theta(1)",
        label: "O(1)",
      },
    },

    spaceComplexity: {
      inputStorage: "The backing array has fixed capacity (8 in this visualizer) — O(capacity).",
      auxiliaryStorage:
        "Two integer indices `front` and `rear` — O(1) extra space.",
      totalSpace: "O(capacity) ≈ O(n) where n is current queue size.",
      bound: "O(n)",
      derivation: [
        "Backing array: fixed capacity C → O(C) space. With C = 8, this is effectively constant.",
        "Auxiliary: front, rear indices → O(1) extra space.",
        "Total space = O(C) + O(1) = O(C). Since capacity bounds the number of elements, this is O(n) relative to stored elements.",
      ],
      notes:
        "A naive array queue wastes space as front advances (freed slots at the front become unusable). A circular queue recycles those slots with modulo arithmetic.",
    },

    notes:
      "Queue is FIFO (first-in, first-out). The `operations` counter increments only for successful operations; overflow and underflow errors leave state unchanged and do not increment the counter.",
  },

  LL: {
    id: "LL",
    title: "Linked List",
    category: "data-structures",

    inputSize: (params) => (params && params.array ? params.array.length : 0),

    liveMetrics: [
      {
        key: "nodesVisited",
        label: "Nodes visited",
        stepKey: "nodesVisited",
        description: "Number of list nodes traversed (curr pointer advanced) during the current operation.",
      },
    ],

    stepOperation: (step) => {
      return step.message || "Linked list operation step.";
    },

    timeComplexity: {
      best: {
        conditions: "Insert/delete at head, or target found at head.",
        expression: "O(1)",
        derivation: [
          "Insert at head: create node, wire next, update head — no traversal needed.",
          "Delete head: read head, advance head pointer, free node — no traversal needed.",
          "Search for value at head: one comparison, found immediately.",
        ],
        bound: "Theta(1)",
        label: "O(1)",
      },
      average: {
        conditions: "Target is equally likely to be at any position, or insertion at random index.",
        expression: "O(n) node visits",
        derivation: [
          "Operations that traverse (insert-tail, insert-index, delete-value, search, traverse) must walk from head to the target position.",
          "Average position is n / 2, so average node visits ≈ n / 2.",
          "Dropping constants: Theta(n).",
        ],
        bound: "Theta(n)",
        label: "O(n)",
      },
      worst: {
        conditions: "Target is at the tail, absent (requires full traversal), or insertion/deletion at the last index.",
        expression: "n node visits",
        derivation: [
          "Every node must be visited to reach the tail or confirm absence.",
          "Insert/delete at index n (the end) requires walking n - 1 nodes to find the predecessor.",
          "Total node visits = n.",
        ],
        bound: "O(n)",
        label: "O(n)",
      },
    },

    spaceComplexity: {
      inputStorage: "Each node stores one element's data plus a next pointer — O(n) for n nodes.",
      auxiliaryStorage:
        "During traversal: curr and prev pointer variables — O(1) extra space per operation.",
      totalSpace: "O(n) for the list structure; O(1) auxiliary per operation.",
      bound: "O(n)",
      derivation: [
        "Each node: data value + next pointer → 2 words per node.",
        "n nodes → O(n) total structure space.",
        "Auxiliary during any single operation: curr, prev, temp pointers → O(1) extra space.",
        "Total space = O(n); auxiliary space per operation = O(1).",
      ],
      notes:
        "Linked list nodes are scattered in memory (not contiguous), which makes them cache-unfriendly compared to arrays but allows O(1) insertions/deletions at known positions.",
    },

    notes:
      "Per-operation complexity differs: insert-head O(1), insert-tail O(n), insert-index O(n), delete-value O(n), delete-head O(1), search O(n), traverse O(n). The registry stores per-operation complexity keyed by operation name.",
  },
};

export function getComplexityAnalysis(id) {
  return COMPLEXITY_ANALYSIS[id] ?? null;
}

export function getAlgorithmIds() {
  return Object.keys(COMPLEXITY_ANALYSIS);
}

// Compute cumulative live metrics from steps up to the current index.
// Each metric key maps to a step property (e.g. "comparisons" -> step.comparisons).
// Returns { [key]: cumulativeValue } and the description of the current step.
export function computeLiveMetrics(steps, currentStepIndex, liveMetrics) {
  if (!steps || steps.length === 0) {
    return {
      values: liveMetrics.reduce((acc, m) => ({ ...acc, [m.key]: 0 }), {}),
      currentStepDescription: "No steps executed yet.",
    };
  }

  const idx = Math.min(Math.max(currentStepIndex, 0), steps.length - 1);
  const step = steps[idx];

  const values = {};
  for (const metric of liveMetrics) {
    const raw = step && step[metric.stepKey] != null ? step[metric.stepKey] : 0;
    values[metric.key] = Number.isFinite(raw) ? raw : 0;
  }

  return {
    values,
    currentStepDescription:
      step && typeof step.message === "string" ? step.message : "",
  };
}

// Compute logical space metrics for an algorithm given input size.
// Returns an object with inputStorage, auxiliaryStorage, totalSpace, bound.
// Note: these are logical element counts, not bytes or heap measurements.
// Visualization snapshot memory (step history) is reported separately by callers.
export function computeSpaceMetrics(analysis, inputSize) {
  if (!analysis) return null;

  const { spaceComplexity } = analysis;

  return {
    inputStorage: spaceComplexity.inputStorage,
    auxiliaryStorage: spaceComplexity.auxiliaryStorage,
    totalSpace: spaceComplexity.totalSpace,
    bound: spaceComplexity.bound,
    inputSize,
    derivation: spaceComplexity.derivation,
    notes: spaceComplexity.notes,
  };
}

// Get the theoretical complexity entry for a specific operation key.
// For plain-complexity algorithms (search/sort), operationKey is ignored.
// For operation-keyed algorithms (Linked List), returns the entry for that operation.
export function resolveTimeComplexity(analysis, operationKey) {
  if (!analysis) return null;

  const { timeComplexity } = analysis;

  if (
    operationKey &&
    timeComplexity[operationKey] &&
    typeof timeComplexity[operationKey] === "object"
  ) {
    return timeComplexity[operationKey];
  }

  // Return all three cases for plain-complexity algorithms
  return timeComplexity;
}
