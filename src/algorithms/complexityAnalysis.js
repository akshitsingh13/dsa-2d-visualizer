// Complexity analysis metadata — single source of truth linking algorithm
// registry ids to their theoretical derivations and live-metric configuration.
//
// Every registry id (LS, BS, BUB, STK, QUE, LL, BST, GRAPH) has an entry here.
//
// Each derivation step provides:
//   - op: What operation are we counting?
//   - count: Mathematical expression / count
//   - explanation: Step-by-step pedagogical explanation
//
// Space complexity also provides structured derivation steps separating input,
// auxiliary, recursion/stack, and visualization history.

export const COMPLEXITY_ANALYSIS = {
  LS: {
    id: "LS",
    title: "Linear Search",
    category: "searching",
    definition: "Linear search checks each element of a collection sequentially from first to last until the target is found or all elements are checked. It works on any list, sorted or unsorted.",
    workedExample: {
      "problem": "Search for target 20 in array [40, 10, 70, 20].",
      "steps": [
            "Compare index 0 (40) with 20: no match (1 comparison).",
            "Compare index 1 (10) with 20: no match (2 comparisons).",
            "Compare index 2 (70) with 20: no match (3 comparisons).",
            "Compare index 3 (20) with 20: match found! (4 comparisons)."
      ],
      "result": "Target found at index 3 after 4 comparisons (n comparisons in worst case)."
},

    inputSize: (params, currentData) => {
      if (params && Array.isArray(params.array)) return params.array.length;
      if (Array.isArray(currentData)) return currentData.length;
      return 0;
    },

    liveMetrics: [
      {
        key: "comparisons",
        label: "Comparisons",
        stepKey: "comparisons",
        description: "Each time the current element is compared with the target.",
      },
    ],

    stepOperation: (step) => {
      if (step.comparingIndices && step.comparingIndices.length > 0) {
        const idx = step.comparingIndices[0];
        return `Comparing index ${idx} (value ${step.array[idx]}) with target.`;
      }
      return step.message || "Linear Search step";
    },

    timeComplexity: {
      worst: {
        conditions: "Target is absent from the array, or located at the final index (n - 1).",
        expression: "n comparisons",
        bound: "O(n)",
        exactBound: "Theta(n)",
        label: "O(n)",
        steps: [
          {
            op: "Input Size Definition",
            count: "n elements",
            explanation: "The input array has size n, indexed from 0 to n - 1.",
          },
          {
            op: "Identify Dominant Operation",
            count: "1 equality comparison per element",
            explanation: "In each loop iteration i, the algorithm executes `if (arr[i] == target)`.",
          },
          {
            op: "Count Executions",
            count: "n comparisons",
            explanation: "Because the target is at the end or not present, the loop cannot terminate early and checks every element from index 0 to n - 1.",
          },
          {
            op: "Formulate Cost Function T(n)",
            count: "T(n) = c₁·n + c₀",
            explanation: "Let c₁ be the cost of loop control and comparison, and c₀ be setup overhead. Here T(n) = n comparisons.",
          },
          {
            op: "Simplify Lower-Order Terms & Constants",
            count: "Drop constant factor c₁ and offset c₀",
            explanation: "As n grows towards infinity, the linear term n dominates the total work.",
          },
          {
            op: "Asymptotic Bound",
            count: "T(n) ∈ O(n) and T(n) ∈ Θ(n)",
            explanation: "Worst-case running time is tightly bounded by Θ(n), with upper bound O(n).",
          },
        ],
      },
      best: {
        conditions: "Target is found at index 0 on the very first comparison.",
        expression: "1 comparison",
        bound: "Theta(1)",
        exactBound: "Theta(1)",
        label: "O(1)",
        steps: [
          {
            op: "First Element Check",
            count: "1 comparison at index 0",
            explanation: "The loop starts at i = 0 and compares `arr[0] == target`.",
          },
          {
            op: "Early Exit Trigger",
            count: "Immediate match",
            explanation: "The condition evaluates to true, so the function adds index 0 to results and returns immediately.",
          },
          {
            op: "Formulate Cost Function T(n)",
            count: "T(n) = 1",
            explanation: "The number of comparisons is exactly 1, independent of how large n is.",
          },
          {
            op: "Asymptotic Bound",
            count: "T(n) ∈ Θ(1)",
            explanation: "Because exactly 1 constant-time step occurs, the best-case running time is Θ(1).",
          },
        ],
      },
      average: {
        conditions: "Target is present and equally likely to be at any index from 0 to n - 1.",
        expression: "T(n) = (n + 1) / 2",
        bound: "Theta(n)",
        exactBound: "Theta(n)",
        label: "O(n)",
        steps: [
          {
            op: "Uniform Probability Assumption",
            count: "P(target at index i) = 1/n",
            explanation: "Assume the target is uniformly distributed across all n possible indices.",
          },
          {
            op: "Sum Comparisons for Each Position",
            count: "1 + 2 + 3 + ... + n = n(n + 1) / 2",
            explanation: "Finding an element at index i takes i + 1 comparisons.",
          },
          {
            op: "Calculate Expected Value",
            count: "E[T(n)] = (1/n) · [n(n + 1) / 2] = (n + 1) / 2",
            explanation: "Dividing the arithmetic sum by n yields the average comparisons: ~n/2.",
          },
          {
            op: "Asymptotic Simplification",
            count: "Drop constant 1/2 factor",
            explanation: "(1/2)n + 1/2 scales linearly with n. Dropping constants yields Θ(n).",
          },
          {
            op: "Asymptotic Bound",
            count: "T(n) ∈ Θ(n)",
            explanation: "Average-case running time is linear in the size of the array: Θ(n).",
          },
        ],
      },
    },

    spaceComplexity: {
      bound: "O(1)",
      exactBound: "Theta(1)",
      inputStorage: "Input array stores n integer elements: O(n) space.",
      auxiliaryStorage: "Loop index variable `i` and match references: O(1) extra space.",
      totalSpace: "Total space is O(n) due to input array, but auxiliary space is O(1).",
      notes: "The visualizer collects matching indices in a result vector. In standard search returning a single index, extra space is strictly O(1).",
      steps: [
        {
          op: "Distinguish Input vs Auxiliary Memory",
          count: "Input: O(n) | Auxiliary: O(1)",
          explanation: "Input storage belongs to the caller. Auxiliary space only measures extra memory allocated by the algorithm itself.",
        },
        {
          op: "Identify Auxiliary Variables",
          count: "int i, result container",
          explanation: "The algorithm uses a single loop index integer `i` to traverse the array.",
        },
        {
          op: "Assess Memory Growth as n Grows",
          count: "S(n) = c (constant)",
          explanation: "Whether n = 10 or n = 1,000,000, only the same constant number of scalar variables are maintained.",
        },
        {
          op: "Asymptotic Auxiliary Bound",
          count: "S(n) ∈ Θ(1)",
          explanation: "Because extra memory does not scale with input size, auxiliary space complexity is Θ(1).",
        },
      ],
    },
  },

  BS: {
    id: "BS",
    title: "Binary Search",
    category: "searching",
    definition: "Binary search finds a target key in a sorted collection by repeatedly halving the search space, comparing the target with the middle element.",
    workedExample: {
      "problem": "Search for target 23 in sorted array [2, 5, 8, 12, 16, 23, 38, 56, 72, 91] (n = 10).",
      "steps": [
            "Range [0..9]: mid = (0 + 9)/2 = 4 (value 16). 23 > 16, narrow to right half [5..9].",
            "Range [5..9]: mid = (5 + 9)/2 = 7 (value 56). 23 < 56, narrow to left half [5..6].",
            "Range [5..6]: mid = (5 + 6)/2 = 5 (value 23). Match found at index 5!"
      ],
      "result": "Target found at index 5 in only 3 comparisons (\u230alog\u2082 10\u230b + 1 = 4 max)."
},

    inputSize: (params, currentData) => {
      if (params && Array.isArray(params.array)) return params.array.length;
      if (Array.isArray(currentData)) return currentData.length;
      return 0;
    },

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
      return step.message || "Binary Search step";
    },

    timeComplexity: {
      worst: {
        conditions: "Target is not present, or is found on the very last 1-element interval.",
        expression: "T(n) = ⌊log₂(n)⌋ + 1",
        bound: "O(log n)",
        exactBound: "Theta(log n)",
        label: "O(log n)",
        steps: [
          {
            op: "Input Assumption",
            count: "Sorted array of size n",
            explanation: "Binary search strictly requires a sorted array so comparisons discard half the elements.",
          },
          {
            op: "Identify Halving Mechanism",
            count: "Interval size after k steps: n / 2^k",
            explanation: "Each iteration computes mid and eliminates half the search space: n → n/2 → n/4 → n/8 ...",
          },
          {
            op: "Formulate Termination Equation",
            count: "n / 2^k = 1",
            explanation: "The search terminates when the search interval is reduced to a single element.",
          },
          {
            op: "Solve for k (Number of Iterations)",
            count: "2^k = n  ==>  k = log₂(n)",
            explanation: "Taking base-2 logarithm of both sides gives k = log₂(n) iterations.",
          },
          {
            op: "Add Final Boundary Comparison",
            count: "T(n) = ⌊log₂(n)⌋ + 1",
            explanation: "At most ⌊log₂(n)⌋ + 1 comparisons occur before low > high.",
          },
          {
            op: "Asymptotic Bound",
            count: "T(n) ∈ Θ(log n)",
            explanation: "Dropping constant additions yields logarithmic time complexity: Θ(log n).",
          },
        ],
      },
      best: {
        conditions: "Target matches the exact middle element on the first comparison.",
        expression: "T(n) = 1",
        bound: "Theta(1)",
        exactBound: "Theta(1)",
        label: "O(1)",
        steps: [
          {
            op: "Initial Middle Computation",
            count: "mid = low + (high - low) / 2",
            explanation: "The initial middle index of the full array [0, n - 1] is calculated in 1 step.",
          },
          {
            op: "Immediate Equality Comparison",
            count: "1 comparison: arr[mid] == target",
            explanation: "If arr[mid] matches the target value immediately, the condition evaluates to true.",
          },
          {
            op: "Immediate Return",
            count: "T(n) = 1",
            explanation: "The algorithm returns mid immediately without entering subsequent halving steps.",
          },
          {
            op: "Asymptotic Bound",
            count: "T(n) ∈ Θ(1)",
            explanation: "Best-case running time is constant: Θ(1).",
          },
        ],
      },
      average: {
        conditions: "Target is uniformly distributed across the array.",
        expression: "T(n) ≈ log₂(n) - 1",
        bound: "Theta(log n)",
        exactBound: "Theta(log n)",
        label: "O(log n)",
        steps: [
          {
            op: "Internal Node Depth in Decision Tree",
            count: "Tree height h = ⌈log₂(n)⌉",
            explanation: "Binary search can be modeled as a balanced binary decision tree with n nodes.",
          },
          {
            op: "Level-by-Level Node Distribution",
            count: "Level i contains 2^i nodes requiring i + 1 comparisons",
            explanation: "Most nodes (half of all elements) reside in the bottom-most levels of the tree.",
          },
          {
            op: "Calculate Expected Path Length",
            count: "E[T(n)] = (1/n) · ∑ i·2^i ≈ log₂(n) - 1",
            explanation: "Weighting by probability yields an expected average of ~log₂(n) comparisons.",
          },
          {
            op: "Asymptotic Bound",
            count: "T(n) ∈ Θ(log n)",
            explanation: "Average-case running time is logarithmic: Θ(log n).",
          },
        ],
      },
    },

    spaceComplexity: {
      bound: "O(1)",
      exactBound: "Theta(1)",
      inputStorage: "Input sorted array of n elements: O(n).",
      auxiliaryStorage: "Three integer variables `low`, `high`, and `mid`: O(1) extra space.",
      totalSpace: "O(n) total space including input; O(1) auxiliary space.",
      notes: "This iterative implementation uses O(1) auxiliary space. A recursive implementation would use O(log n) call stack space.",
      steps: [
        {
          op: "Distinguish Iterative vs Recursive Architecture",
          count: "Iterative while loop",
          explanation: "Our visualizer uses an iterative while (low <= high) loop, not recursion.",
        },
        {
          op: "Inventory Auxiliary Variables",
          count: "low, high, mid",
          explanation: "Only three integer pointer variables are stored in the stack frame.",
        },
        {
          op: "No Dynamic Allocation",
          count: "0 heap memory allocations",
          explanation: "No auxiliary arrays or call stack growth occur during search.",
        },
        {
          op: "Asymptotic Auxiliary Bound",
          count: "S(n) ∈ Θ(1)",
          explanation: "Auxiliary space is strictly constant: Θ(1).",
        },
      ],
    },
  },

  BUB: {
    id: "BUB",
    title: "Bubble Sort",
    category: "sorting",
    definition: "Bubble sort is a comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.",
    workedExample: {
      "problem": "Sort array [5, 1, 4, 2, 8] in ascending order using Bubble Sort.",
      "steps": [
            "Pass 1: (5 > 1) swap -> [1, 5, 4, 2, 8]; (5 > 4) swap -> [1, 4, 5, 2, 8]; (5 > 2) swap -> [1, 4, 2, 5, 8]; (5 < 8) no swap. Largest element 8 bubbles to end.",
            "Pass 2: (1 < 4) ok; (4 > 2) swap -> [1, 2, 4, 5, 8]; (4 < 5) ok. Element 5 in place.",
            "Pass 3: (1 < 2) ok; (2 < 4) ok. 0 swaps executed, early-exit triggered!"
      ],
      "result": "Array sorted in 3 passes with early exit optimization."
},

    inputSize: (params, currentData) => {
      if (params && Array.isArray(params.array)) return params.array.length;
      if (Array.isArray(currentData)) return currentData.length;
      return 0;
    },

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
        description: "Each time adjacent inverted elements are swapped.",
      },
    ],

    stepOperation: (step) => {
      if (step.swappingIndices && step.swappingIndices.length > 0) {
        return `Swapping elements at indices ${step.swappingIndices.join(", ")}.`;
      }
      if (step.comparingIndices && step.comparingIndices.length > 0) {
        return `Comparing indices ${step.comparingIndices.join(", ")}.`;
      }
      return step.message || "Bubble Sort step";
    },

    timeComplexity: {
      worst: {
        conditions: "Array is sorted in reverse descending order (every pair inverted).",
        expression: "T(n) = n(n - 1) / 2 comparisons and swaps",
        bound: "O(n²)",
        exactBound: "Theta(n²)",
        label: "O(n²)",
        steps: [
          {
            op: "Outer Loop Structure",
            count: "n - 1 passes (i = 0 to n - 2)",
            explanation: "Each pass bubbles the largest unsorted element to its final sorted position at the right.",
          },
          {
            op: "Inner Loop Comparisons Per Pass",
            count: "Pass 1: n-1 | Pass 2: n-2 | ... | Pass n-1: 1",
            explanation: "On pass i, the inner loop runs j from 0 to n - i - 2, performing n - i - 1 comparisons.",
          },
          {
            op: "Sum Arithmetic Series",
            count: "∑_{k=1}^{n-1} k = (n - 1) + (n - 2) + ... + 1",
            explanation: "Summing the comparisons over all passes gives standard arithmetic progression formula.",
          },
          {
            op: "Evaluate Closed-Form Expression",
            count: "T(n) = n(n - 1) / 2 = (1/2)n² - (1/2)n",
            explanation: "Algebraic expansion yields quadratic term (1/2)n² and linear term -(1/2)n.",
          },
          {
            op: "Drop Lower-Order Terms and Constants",
            count: "Drop -(1/2)n and coefficient 1/2",
            explanation: "For large n, n² dominates the execution time completely.",
          },
          {
            op: "Asymptotic Bound",
            count: "T(n) ∈ Θ(n²)",
            explanation: "Worst-case running time is quadratic: Θ(n²).",
          },
        ],
      },
      best: {
        conditions: "Array is already sorted in ascending order with early-exit `swapped` optimization.",
        expression: "T(n) = n - 1 comparisons, 0 swaps",
        bound: "Omega(n)",
        exactBound: "Theta(n)",
        label: "O(n)",
        steps: [
          {
            op: "Early-Exit Flag Initialization",
            count: "bool swapped = false",
            explanation: "Our implementation sets a boolean `swapped` flag to false before each outer pass.",
          },
          {
            op: "First Pass Execution",
            count: "n - 1 comparisons",
            explanation: "Pass 1 compares every adjacent pair: arr[0]>arr[1], arr[1]>arr[2], ... arr[n-2]>arr[n-1].",
          },
          {
            op: "No Inversions Detected",
            count: "0 swaps",
            explanation: "Because the array is already sorted, no adjacent elements are out of order. `swapped` remains false.",
          },
          {
            op: "Early Break Triggered",
            count: "break after pass 1",
            explanation: "After pass 1, `if (!swapped) break;` executes, stopping all remaining n - 2 passes immediately.",
          },
          {
            op: "Asymptotic Bound",
            count: "T(n) = n - 1 ∈ Θ(n)",
            explanation: "With the early-exit optimization, best-case running time is linear: Θ(n). Without it, it would be Θ(n²).",
          },
        ],
      },
      average: {
        conditions: "Elements are randomly ordered.",
        expression: "T(n) ≈ n(n - 1) / 2 comparisons, ~n(n - 1) / 4 swaps",
        bound: "Theta(n²)",
        exactBound: "Theta(n²)",
        label: "O(n²)",
        steps: [
          {
            op: "Expected Inversions in Random Permutation",
            count: "E[inversions] = n(n - 1) / 4",
            explanation: "Any given pair of elements has a 50% probability of being inverted in a random array.",
          },
          {
            op: "Pass Count Before Premature Termination",
            count: "Early exit rarely triggers early",
            explanation: "In random data, swaps occur until the final few passes, so the outer loop executes almost completely.",
          },
          {
            op: "Total Comparison Work",
            count: "T(n) ≈ c · n²",
            explanation: "Comparisons still sum across nearly all n passes, proportional to n²/2.",
          },
          {
            op: "Asymptotic Bound",
            count: "T(n) ∈ Θ(n²)",
            explanation: "Average-case running time remains quadratic: Θ(n²).",
          },
        ],
      },
    },

    spaceComplexity: {
      bound: "O(1)",
      exactBound: "Theta(1)",
      inputStorage: "Input array stores n elements: O(n).",
      auxiliaryStorage: "Loop counters `i`, `j`, boolean `swapped`, and swap temp variable: O(1).",
      totalSpace: "O(n) total; O(1) auxiliary.",
      notes: "Bubble sort is an in-place sorting algorithm. It swaps elements directly within the input array without allocating extra arrays.",
      steps: [
        {
          op: "In-Place Sorting Principle",
          count: "0 auxiliary array allocations",
          explanation: "Sorting modifies the input array directly in-place via adjacent index swaps.",
        },
        {
          op: "Auxiliary Variable Count",
          count: "4 scalar variables (i, j, swapped, temp)",
          explanation: "Only loop control indices, one boolean flag, and one temporary swap register are used.",
        },
        {
          op: "Independence from n",
          count: "S(n) = O(1)",
          explanation: "Space usage does not scale with array size n.",
        },
        {
          op: "Asymptotic Auxiliary Bound",
          count: "S(n) ∈ Θ(1)",
          explanation: "Auxiliary space complexity is strictly Θ(1).",
        },
      ],
    },
  },

  STK: {
    id: "STK",
    title: "Stack",
    category: "data-structures",
    definition: "A stack is a linear, last-in-first-out (LIFO) data structure where elements are added (pushed) and removed (popped) from the same end, called the top.",

    inputSize: (params, currentData) => {
      if (Array.isArray(currentData)) return currentData.length;
      if (params && Array.isArray(params.array)) return params.array.length;
      return 0;
    },

    liveMetrics: [
      {
        key: "operations",
        label: "Operations",
        stepKey: "operations",
        description: "Number of successful stack operations performed so far.",
      },
    ],

    stepOperation: (step) => step.message || "Stack operation step",
    operations: {
      "push": {
            "name": "Push",
            "description": "Places an element on top of the stack after verifying capacity.",
            "workedExample": {
                  "problem": "Push value 40 onto stack [10, 20, 30] (capacity = 8).",
                  "steps": [
                        "Check overflow: top index is 2, capacity limit is 7 (2 < 7, safe).",
                        "Increment top pointer: top = 3.",
                        "Write element into backing array: arr[3] = 40."
                  ],
                  "result": "Stack becomes [10, 20, 30, 40]. Time = 3 CPU instructions."
            },
            "timeComplexity": {
                  "worst": {
                        "conditions": "Stack with capacity bounds check.",
                        "expression": "T(n) = 1 bound check + 1 index increment + 1 write",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Overflow Check",
                                    "count": "if (top >= capacity - 1)",
                                    "explanation": "Verifies bounds in 1 comparison."
                              },
                              {
                                    "op": "Increment Top",
                                    "count": "top = top + 1;",
                                    "explanation": "Updates scalar index in 1 cycle."
                              },
                              {
                                    "op": "Array Write",
                                    "count": "arr[top] = x;",
                                    "explanation": "Direct array index write in 1 cycle."
                              },
                              {
                                    "op": "Independence from n",
                                    "count": "0 element shifts",
                                    "explanation": "Writing at the top requires zero shifting of existing elements."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(1)",
                                    "explanation": "Strictly constant time: \u0398(1)."
                              }
                        ]
                  },
                  "best": {
                        "conditions": "Normal push on non-full stack.",
                        "expression": "T(n) = 3 operations",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Constant Execution",
                                    "count": "Direct write",
                                    "explanation": "Immediate array write."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(1)",
                                    "explanation": "Strictly constant time: \u0398(1)."
                              }
                        ]
                  },
                  "average": {
                        "conditions": "Sequence of arbitrary push operations.",
                        "expression": "T(n) = \u0398(1)",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Amortized Cost",
                                    "count": "Constant per push",
                                    "explanation": "Fixed-size or amortized dynamic arrays provide O(1) push."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(1)",
                                    "explanation": "Average-case time complexity is \u0398(1)."
                              }
                        ]
                  }
            },
            "spaceComplexity": {
                  "bound": "O(1)",
                  "exactBound": "Theta(1) auxiliary",
                  "inputStorage": "Backing array of capacity C = 8: O(C).",
                  "auxiliaryStorage": "0 additional memory: O(1).",
                  "totalSpace": "O(C) total; O(1) auxiliary.",
                  "notes": "Modifies fixed backing buffer in place without auxiliary allocations.",
                  "steps": [
                        {
                              "op": "In-Place Write",
                              "count": "Direct slot usage",
                              "explanation": "Uses preallocated array slot."
                        },
                        {
                              "op": "Asymptotic Auxiliary Bound",
                              "count": "S_aux(n) \u2208 \u0398(1)",
                              "explanation": "Auxiliary space is strictly O(1)."
                        }
                  ]
            }
      },
      "pop": {
            "name": "Pop",
            "description": "Removes and returns the top element from the stack.",
            "workedExample": {
                  "problem": "Pop from stack [10, 20, 30].",
                  "steps": [
                        "Check underflow: top is 2 (2 >= 0, safe).",
                        "Read top element: x = arr[2] (value 30).",
                        "Decrement top: top = 1."
                  ],
                  "result": "Returns 30. Stack becomes [10, 20]."
            },
            "timeComplexity": {
                  "worst": {
                        "conditions": "Any non-empty stack.",
                        "expression": "T(n) = 1 underflow check + 1 read + 1 decrement",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Underflow Check",
                                    "count": "if (top < 0)",
                                    "explanation": "1 comparison."
                              },
                              {
                                    "op": "Read Top Value",
                                    "count": "int x = arr[top];",
                                    "explanation": "1 direct array read."
                              },
                              {
                                    "op": "Decrement Top Pointer",
                                    "count": "top = top - 1;",
                                    "explanation": "1 scalar decrement."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(1)",
                                    "explanation": "Strictly constant time: \u0398(1)."
                              }
                        ]
                  },
                  "best": {
                        "conditions": "Stack is empty (underflow condition).",
                        "expression": "T(n) = 1 comparison",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Immediate Return",
                                    "count": "top == -1",
                                    "explanation": "Immediately detects underflow."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(1)",
                                    "explanation": "Best case is constant time: \u0398(1)."
                              }
                        ]
                  },
                  "average": {
                        "conditions": "Arbitrary sequence of pops.",
                        "expression": "T(n) = \u0398(1)",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Direct Index Math",
                                    "count": "top = top - 1",
                                    "explanation": "Pop never shifts elements."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(1)",
                                    "explanation": "Average-case time complexity is \u0398(1)."
                              }
                        ]
                  }
            },
            "spaceComplexity": {
                  "bound": "O(1)",
                  "exactBound": "Theta(1) auxiliary",
                  "inputStorage": "Backing array of capacity C: O(C).",
                  "auxiliaryStorage": "1 scalar return variable: O(1).",
                  "totalSpace": "O(C) total; O(1) auxiliary.",
                  "notes": "Decrements index without extra allocations.",
                  "steps": [
                        {
                              "op": "Scalar Register",
                              "count": "int x",
                              "explanation": "Temporarily holds popped value."
                        },
                        {
                              "op": "Asymptotic Auxiliary Bound",
                              "count": "S_aux(n) \u2208 \u0398(1)",
                              "explanation": "Auxiliary space is O(1)."
                        }
                  ]
            }
      },
      "peek": {
            "name": "Peek",
            "description": "Inspects the top element without removing it from the stack.",
            "workedExample": {
                  "problem": "Peek stack [10, 20, 30].",
                  "steps": [
                        "Check underflow: top = 2 >= 0.",
                        "Read arr[top] (value 30)."
                  ],
                  "result": "Returns 30. Stack remains [10, 20, 30]."
            },
            "timeComplexity": {
                  "worst": {
                        "conditions": "Any stack.",
                        "expression": "T(n) = 1 array read",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Direct Memory Read",
                                    "count": "return arr[top];",
                                    "explanation": "Reads array element in O(1) time."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(1)",
                                    "explanation": "Strictly constant time: \u0398(1)."
                              }
                        ]
                  },
                  "best": {
                        "conditions": "Non-empty stack.",
                        "expression": "T(n) = 1",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Direct Read",
                                    "count": "arr[top]",
                                    "explanation": "Immediate memory read."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(1)",
                                    "explanation": "Strictly constant time: \u0398(1)."
                              }
                        ]
                  },
                  "average": {
                        "conditions": "Arbitrary peek operations.",
                        "expression": "T(n) = \u0398(1)",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Single Instruction",
                                    "count": "Array read",
                                    "explanation": "Consistent O(1)."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(1)",
                                    "explanation": "Average-case time complexity is \u0398(1)."
                              }
                        ]
                  }
            },
            "spaceComplexity": {
                  "bound": "O(1)",
                  "exactBound": "Theta(1) auxiliary",
                  "inputStorage": "Backing array of capacity C: O(C).",
                  "auxiliaryStorage": "0 extra space: O(1).",
                  "totalSpace": "O(C) total; O(1) auxiliary.",
                  "notes": "Read-only operation.",
                  "steps": [
                        {
                              "op": "Zero Allocation",
                              "count": "0 memory allocations",
                              "explanation": "Read-only access."
                        },
                        {
                              "op": "Asymptotic Auxiliary Bound",
                              "count": "S_aux(n) \u2208 \u0398(1)",
                              "explanation": "Auxiliary space is O(1)."
                        }
                  ]
            }
      },
      "clear": {
            "name": "Clear",
            "description": "Resets the stack to empty by resetting the top pointer index to -1.",
            "workedExample": {
                  "problem": "Clear stack [10, 20, 30].",
                  "steps": [
                        "Set top = -1."
                  ],
                  "result": "Stack becomes empty []."
            },
            "timeComplexity": {
                  "worst": {
                        "conditions": "Any stack.",
                        "expression": "T(n) = 1 assignment",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Pointer Reset",
                                    "count": "top = -1;",
                                    "explanation": "Single integer assignment resets the entire stack."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(1)",
                                    "explanation": "Strictly constant time: \u0398(1)."
                              }
                        ]
                  },
                  "best": {
                        "conditions": "Any stack.",
                        "expression": "T(n) = 1",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Single Write",
                                    "count": "top = -1",
                                    "explanation": "Immediate write."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(1)",
                                    "explanation": "Strictly constant time: \u0398(1)."
                              }
                        ]
                  },
                  "average": {
                        "conditions": "Any stack.",
                        "expression": "T(n) = \u0398(1)",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Scalar Write",
                                    "count": "top = -1",
                                    "explanation": "Immediate assignment."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(1)",
                                    "explanation": "Average-case time complexity is \u0398(1)."
                              }
                        ]
                  }
            },
            "spaceComplexity": {
                  "bound": "O(1)",
                  "exactBound": "Theta(1) auxiliary",
                  "inputStorage": "Backing array: O(C).",
                  "auxiliaryStorage": "0 extra space: O(1).",
                  "totalSpace": "O(C) total; O(1) auxiliary.",
                  "notes": "Zero additional memory.",
                  "steps": [
                        {
                              "op": "Zero Allocation",
                              "count": "0 auxiliary memory",
                              "explanation": "Modifies single variable."
                        },
                        {
                              "op": "Asymptotic Auxiliary Bound",
                              "count": "S_aux(n) \u2208 \u0398(1)",
                              "explanation": "Auxiliary space is O(1)."
                        }
                  ]
            }
      }
},

    timeComplexity: {
      worst: {
        conditions: "Any single operation (push, pop, peek) with capacity bounds check.",
        expression: "T(n) = 1 array access",
        bound: "Theta(1)",
        exactBound: "Theta(1)",
        label: "O(1)",
        steps: [
          {
            op: "Direct Index Access",
            count: "1 index computation: arr[top]",
            explanation: "Stack maintains a pointer index `top`. No search or iteration is required.",
          },
          {
            op: "Push Operation Cost",
            count: "1 bound check + 1 assignment + 1 top++",
            explanation: "Push checks `top < capacity - 1`, sets `arr[++top] = val`. Exactly 3 CPU instructions.",
          },
          {
            op: "Pop Operation Cost",
            count: "1 underflow check + 1 top--",
            explanation: "Pop checks `top >= 0` and decrements `top`. Exactly 2 CPU instructions.",
          },
          {
            op: "Peek Operation Cost",
            count: "1 underflow check + 1 read arr[top]",
            explanation: "Reads element at `arr[top]` directly without modifying structure.",
          },
          {
            op: "Asymptotic Bound",
            count: "T(n) ∈ Θ(1)",
            explanation: "Every primitive stack operation completes in constant time: Θ(1).",
          },
        ],
      },
      best: {
        conditions: "Direct array access on non-empty, non-full stack.",
        expression: "T(n) = 1",
        bound: "Theta(1)",
        exactBound: "Theta(1)",
        label: "O(1)",
        steps: [
          {
            op: "Constant Operation Execution",
            count: "1 step",
            explanation: "Immediate array access and pointer adjustment.",
          },
          {
            op: "Asymptotic Bound",
            count: "T(n) ∈ Θ(1)",
            explanation: "Best-case time complexity is constant: Θ(1).",
          },
        ],
      },
      average: {
        conditions: "Arbitrary sequence of m push/pop/peek operations.",
        expression: "T(n) = O(1) per operation",
        bound: "Theta(1)",
        exactBound: "Theta(1)",
        label: "O(1)",
        steps: [
          {
            op: "Per-Operation Independence",
            count: "Each op is O(1)",
            explanation: "No operation depends on the number of elements currently stored in the stack.",
          },
          {
            op: "Sequence Cost",
            count: "Total for m operations = m · O(1) = O(m)",
            explanation: "Average cost per operation is amortized and strictly constant: Θ(1).",
          },
        ],
      },
    },

    spaceComplexity: {
      bound: "O(capacity)",
      exactBound: "Theta(1) auxiliary",
      inputStorage: "Backing array of fixed capacity C = 8: O(C).",
      auxiliaryStorage: "One integer index `top`: O(1) auxiliary space.",
      totalSpace: "O(C) where C is fixed capacity.",
      notes: "Fixed capacity array avoids dynamic reallocations. In dynamic array stacks, amortized push space is O(n).",
      steps: [
        {
          op: "Backing Storage Definition",
          count: "Fixed capacity C = 8 elements",
          explanation: "Memory is allocated upfront for the fixed capacity buffer.",
        },
        {
          op: "Auxiliary State Allocation",
          count: "int top",
          explanation: "Only an integer variable tracking the top index is maintained.",
        },
        {
          op: "Auxiliary Bound",
          count: "S_aux(n) ∈ Θ(1)",
          explanation: "Auxiliary space used during any operation is strictly constant: Θ(1).",
        },
      ],
    },
  },

  QUE: {
    id: "QUE",
    title: "Queue",
    category: "data-structures",
    definition: "A queue is a linear, first-in-first-out (FIFO) data structure where elements are added (enqueued) at the rear and removed (dequeued) from the front.",

    inputSize: (params, currentData) => {
      if (Array.isArray(currentData)) return currentData.length;
      if (params && Array.isArray(params.array)) return params.array.length;
      return 0;
    },

    liveMetrics: [
      {
        key: "operations",
        label: "Operations",
        stepKey: "operations",
        description: "Number of successful queue operations performed so far.",
      },
    ],

    stepOperation: (step) => step.message || "Queue operation step",
    operations: {
      "enqueue": {
            "name": "Enqueue",
            "description": "Appends an element to the rear of the queue after capacity verification.",
            "workedExample": {
                  "problem": "Enqueue value 40 into queue [10, 20, 30] (capacity = 8).",
                  "steps": [
                        "Check overflow: rear = 2, capacity limit is 7 (2 < 7, safe).",
                        "Increment rear pointer: rear = 3.",
                        "Write element into queue: arr[3] = 40."
                  ],
                  "result": "Queue becomes [10, 20, 30, 40]. Time = 3 CPU instructions."
            },
            "timeComplexity": {
                  "worst": {
                        "conditions": "Queue with fixed capacity bounds check.",
                        "expression": "T(n) = 1 bound check + 1 index increment + 1 write",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Overflow Check",
                                    "count": "if (rear >= capacity - 1)",
                                    "explanation": "Verifies capacity boundary."
                              },
                              {
                                    "op": "Increment Rear",
                                    "count": "rear = rear + 1;",
                                    "explanation": "Updates scalar index."
                              },
                              {
                                    "op": "Write Value",
                                    "count": "arr[rear] = x;",
                                    "explanation": "Direct array index assignment."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(1)",
                                    "explanation": "Strictly constant time: \u0398(1)."
                              }
                        ]
                  },
                  "best": {
                        "conditions": "Normal enqueue on non-full queue.",
                        "expression": "T(n) = 3 operations",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Direct Write",
                                    "count": "Direct slot write",
                                    "explanation": "Immediate array write."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(1)",
                                    "explanation": "Best-case time complexity is \u0398(1)."
                              }
                        ]
                  },
                  "average": {
                        "conditions": "Arbitrary enqueue operations.",
                        "expression": "T(n) = \u0398(1)",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Consistent Operation Cost",
                                    "count": "Constant per element",
                                    "explanation": "Zero element shifts required."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(1)",
                                    "explanation": "Average-case time complexity is \u0398(1)."
                              }
                        ]
                  }
            },
            "spaceComplexity": {
                  "bound": "O(1)",
                  "exactBound": "Theta(1) auxiliary",
                  "inputStorage": "Backing array of capacity C = 8: O(C).",
                  "auxiliaryStorage": "0 extra space: O(1).",
                  "totalSpace": "O(C) total; O(1) auxiliary.",
                  "notes": "Modifies fixed backing buffer in place without auxiliary allocations.",
                  "steps": [
                        {
                              "op": "In-Place Insertion",
                              "count": "Preallocated buffer slot",
                              "explanation": "Writes directly to buffer."
                        },
                        {
                              "op": "Asymptotic Auxiliary Bound",
                              "count": "S_aux(n) \u2208 \u0398(1)",
                              "explanation": "Auxiliary space is strictly O(1)."
                        }
                  ]
            }
      },
      "dequeue": {
            "name": "Dequeue",
            "description": "Removes and returns the front element from the queue.",
            "workedExample": {
                  "problem": "Dequeue from queue [10, 20, 30].",
                  "steps": [
                        "Check underflow: front = 0, rear = 2 (front <= rear, safe).",
                        "Read front value: x = arr[0] (value 10).",
                        "Increment front pointer: front = 1."
                  ],
                  "result": "Returns 10. Queue elements become [20, 30]."
            },
            "timeComplexity": {
                  "worst": {
                        "conditions": "Non-empty queue.",
                        "expression": "T(n) = 1 underflow check + 1 read + 1 pointer increment",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Underflow Verification",
                                    "count": "if (front > rear)",
                                    "explanation": "1 comparison."
                              },
                              {
                                    "op": "Read Front Value",
                                    "count": "int x = arr[front];",
                                    "explanation": "1 array read."
                              },
                              {
                                    "op": "Advance Front Pointer",
                                    "count": "front = front + 1;",
                                    "explanation": "Advances pointer without shifting remaining elements."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(1)",
                                    "explanation": "Strictly constant time: \u0398(1)."
                              }
                        ]
                  },
                  "best": {
                        "conditions": "Queue is empty (underflow condition).",
                        "expression": "T(n) = 1 check",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Immediate Underflow Check",
                                    "count": "front > rear",
                                    "explanation": "Immediate return."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(1)",
                                    "explanation": "Best-case time complexity is \u0398(1)."
                              }
                        ]
                  },
                  "average": {
                        "conditions": "Arbitrary sequence of dequeues.",
                        "expression": "T(n) = \u0398(1)",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Two-Pointer Queue Principle",
                                    "count": "front = front + 1",
                                    "explanation": "Using two pointers (or circular modulo) eliminates naive O(n) element shifting."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(1)",
                                    "explanation": "Average-case time complexity is \u0398(1)."
                              }
                        ]
                  }
            },
            "spaceComplexity": {
                  "bound": "O(1)",
                  "exactBound": "Theta(1) auxiliary",
                  "inputStorage": "Backing array of capacity C: O(C).",
                  "auxiliaryStorage": "1 scalar return variable: O(1).",
                  "totalSpace": "O(C) total; O(1) auxiliary.",
                  "notes": "Advances index without extra allocations.",
                  "steps": [
                        {
                              "op": "Scalar Variable",
                              "count": "int x",
                              "explanation": "Temporarily holds dequeued value."
                        },
                        {
                              "op": "Asymptotic Auxiliary Bound",
                              "count": "S_aux(n) \u2208 \u0398(1)",
                              "explanation": "Auxiliary space is O(1)."
                        }
                  ]
            }
      },
      "peek": {
            "name": "Peek",
            "description": "Inspects the front element without removing it from the queue.",
            "workedExample": {
                  "problem": "Peek queue [10, 20, 30].",
                  "steps": [
                        "Check underflow: front <= rear.",
                        "Read arr[front] (value 10)."
                  ],
                  "result": "Returns 10. Queue remains [10, 20, 30]."
            },
            "timeComplexity": {
                  "worst": {
                        "conditions": "Any queue.",
                        "expression": "T(n) = 1 read",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Direct Array Read",
                                    "count": "return arr[front];",
                                    "explanation": "Reads array element in O(1) time."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(1)",
                                    "explanation": "Strictly constant time: \u0398(1)."
                              }
                        ]
                  },
                  "best": {
                        "conditions": "Non-empty queue.",
                        "expression": "T(n) = 1",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Direct Read",
                                    "count": "arr[front]",
                                    "explanation": "Immediate memory read."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(1)",
                                    "explanation": "Strictly constant time: \u0398(1)."
                              }
                        ]
                  },
                  "average": {
                        "conditions": "Arbitrary peek operations.",
                        "expression": "T(n) = \u0398(1)",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Direct Memory Read",
                                    "count": "arr[front]",
                                    "explanation": "Single CPU instruction."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(1)",
                                    "explanation": "Average-case time complexity is \u0398(1)."
                              }
                        ]
                  }
            },
            "spaceComplexity": {
                  "bound": "O(1)",
                  "exactBound": "Theta(1) auxiliary",
                  "inputStorage": "Backing array of capacity C: O(C).",
                  "auxiliaryStorage": "0 extra space: O(1).",
                  "totalSpace": "O(C) total; O(1) auxiliary.",
                  "notes": "Read-only operation.",
                  "steps": [
                        {
                              "op": "Zero Allocation",
                              "count": "0 memory allocations",
                              "explanation": "Read-only access."
                        },
                        {
                              "op": "Asymptotic Auxiliary Bound",
                              "count": "S_aux(n) \u2208 \u0398(1)",
                              "explanation": "Auxiliary space is O(1)."
                        }
                  ]
            }
      },
      "clear": {
            "name": "Clear",
            "description": "Resets the queue to empty by resetting front and rear pointers.",
            "workedExample": {
                  "problem": "Clear queue [10, 20, 30].",
                  "steps": [
                        "Set front = 0, rear = -1."
                  ],
                  "result": "Queue becomes empty []."
            },
            "timeComplexity": {
                  "worst": {
                        "conditions": "Any queue.",
                        "expression": "T(n) = 2 assignments",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Pointer Resets",
                                    "count": "front = 0; rear = -1;",
                                    "explanation": "Two integer assignments reset the entire queue."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(1)",
                                    "explanation": "Strictly constant time: \u0398(1)."
                              }
                        ]
                  },
                  "best": {
                        "conditions": "Any queue.",
                        "expression": "T(n) = 2 writes",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Constant Execution",
                                    "count": "front = 0; rear = -1;",
                                    "explanation": "Immediate write."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(1)",
                                    "explanation": "Strictly constant time: \u0398(1)."
                              }
                        ]
                  },
                  "average": {
                        "conditions": "Any queue.",
                        "expression": "T(n) = \u0398(1)",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Fixed Instructions",
                                    "count": "Two assignments",
                                    "explanation": "Constant time cost."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(1)",
                                    "explanation": "Average-case time complexity is \u0398(1)."
                              }
                        ]
                  }
            },
            "spaceComplexity": {
                  "bound": "O(1)",
                  "exactBound": "Theta(1) auxiliary",
                  "inputStorage": "Backing array: O(C).",
                  "auxiliaryStorage": "0 extra space: O(1).",
                  "totalSpace": "O(C) total; O(1) auxiliary.",
                  "notes": "Zero additional memory.",
                  "steps": [
                        {
                              "op": "Zero Allocation",
                              "count": "0 auxiliary memory",
                              "explanation": "Modifies two scalar variables."
                        },
                        {
                              "op": "Asymptotic Auxiliary Bound",
                              "count": "S_aux(n) \u2208 \u0398(1)",
                              "explanation": "Auxiliary space is O(1)."
                        }
                  ]
            }
      }
},

    timeComplexity: {
      worst: {
        conditions: "Any single operation (enqueue, dequeue, peek) in circular array.",
        expression: "T(n) = 1 array access with modulo arithmetic",
        bound: "Theta(1)",
        exactBound: "Theta(1)",
        label: "O(1)",
        steps: [
          {
            op: "Circular Buffer Addressing",
            count: "rear = (rear + 1) % capacity",
            explanation: "Modulo arithmetic allows O(1) wrapping without shifting elements.",
          },
          {
            op: "Enqueue Operation Cost",
            count: "1 full check + 1 write + 1 modulo increment",
            explanation: "Checks `size < capacity`, writes `arr[rear] = val`, increments size. Exactly O(1).",
          },
          {
            op: "Dequeue Operation Cost",
            count: "1 empty check + 1 read + 1 modulo increment",
            explanation: "Checks `size > 0`, reads `arr[front]`, updates `front = (front + 1) % C`. Exactly O(1).",
          },
          {
            op: "Peek Operation Cost",
            count: "1 check + 1 read arr[front]",
            explanation: "Reads front element in constant time without element shifts.",
          },
          {
            op: "Asymptotic Bound",
            count: "T(n) ∈ Θ(1)",
            explanation: "Every primitive circular queue operation runs in constant time: Θ(1).",
          },
        ],
      },
      best: {
        conditions: "Normal queue operation without error conditions.",
        expression: "T(n) = 1",
        bound: "Theta(1)",
        exactBound: "Theta(1)",
        label: "O(1)",
        steps: [
          {
            op: "Immediate Constant Access",
            count: "1 operation",
            explanation: "Direct array access at front or rear pointer.",
          },
          {
            op: "Asymptotic Bound",
            count: "T(n) ∈ Θ(1)",
            explanation: "Best-case time complexity is Θ(1).",
          },
        ],
      },
      average: {
        conditions: "Arbitrary sequence of enqueue/dequeue operations.",
        expression: "T(n) = O(1) per operation",
        bound: "Theta(1)",
        exactBound: "Theta(1)",
        label: "O(1)",
        steps: [
          {
            op: "No Element Shifting",
            count: "0 shifts required",
            explanation: "Unlike a naive array queue that shifts elements on dequeue taking O(n), circular pointers maintain O(1).",
          },
          {
            op: "Asymptotic Bound",
            count: "T(n) ∈ Θ(1)",
            explanation: "Average-case time per operation is Θ(1).",
          },
        ],
      },
    },

    spaceComplexity: {
      bound: "O(capacity)",
      exactBound: "Theta(1) auxiliary",
      inputStorage: "Backing array of capacity C = 8: O(C).",
      auxiliaryStorage: "Indices `front`, `rear`, and `size`: O(1) auxiliary space.",
      totalSpace: "O(C) total storage; O(1) auxiliary.",
      notes: "Circular queue recycles slots with modulo arithmetic, ensuring zero memory waste.",
      steps: [
        {
          op: "Backing Buffer Size",
          count: "Fixed capacity C = 8 slots",
          explanation: "Fixed array buffer preallocated in memory.",
        },
        {
          op: "Pointer Variables",
          count: "int front, rear, size",
          explanation: "Three scalar integer indices track position and fill count.",
        },
        {
          op: "Asymptotic Auxiliary Bound",
          count: "S_aux(n) ∈ Θ(1)",
          explanation: "Auxiliary memory is strictly constant: Θ(1).",
        },
      ],
    },
  },

  LL: {
    id: "LL",
    title: "Linked List",
    category: "data-structures",
    definition: "A linked list is a linear data structure consisting of nodes where each node contains a data element and a pointer (reference) to the next node in sequence. Unlike arrays, nodes do not require contiguous memory allocation.",

    inputSize: (params, currentData) => {
      if (Array.isArray(currentData)) return currentData.length;
      if (params && Array.isArray(params.array)) return params.array.length;
      return 0;
    },

    liveMetrics: [
      {
        key: "nodesVisited",
        label: "Nodes Visited",
        stepKey: "nodesVisited",
        description: "Number of list nodes traversed (curr pointer advanced) during the current operation.",
      },
    ],

    stepOperation: (step) => step.message || "Linked List operation step",
    operations: {
      "insert-head": {
            "name": "Insert at Head",
            "description": "Allocates a new node and attaches it before the current head, making the new node the first element of the list.",
            "workedExample": {
                  "problem": "Insert value 42 at the head of list [10, 20].",
                  "steps": [
                        "Allocate new Node(42) with next = nullptr.",
                        "Set new node's next pointer to current head node (10): node->next = head.",
                        "Swing head pointer onto new node: head = node."
                  ],
                  "result": "List becomes [42, 10, 20]. Traversal hops = 0."
            },
            "timeComplexity": {
                  "worst": {
                        "conditions": "Any linked list of size n (empty, single-node, or large).",
                        "expression": "T(n) = 1 allocation + 2 pointer assignments",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Memory Allocation",
                                    "count": "Node* node = new Node(x);",
                                    "explanation": "Allocates one node in heap memory: 1 step."
                              },
                              {
                                    "op": "Next Pointer Wiring",
                                    "count": "node->next = head;",
                                    "explanation": "Links the new node to point to the current head: 1 write."
                              },
                              {
                                    "op": "Head Update",
                                    "count": "head = node;",
                                    "explanation": "Updates list head pointer: 1 write."
                              },
                              {
                                    "op": "Size Independence",
                                    "count": "0 traversal hops",
                                    "explanation": "Head is directly accessible via head pointer; no nodes are walked regardless of n."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(1)",
                                    "explanation": "Strictly constant time: \u0398(1)."
                              }
                        ]
                  },
                  "best": {
                        "conditions": "List is empty (head is null) or has 1 node.",
                        "expression": "T(n) = 1 pointer assignment",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Immediate Head Assignment",
                                    "count": "head = new Node(x);",
                                    "explanation": "Immediate pointer update."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(1)",
                                    "explanation": "Best case is constant time: \u0398(1)."
                              }
                        ]
                  },
                  "average": {
                        "conditions": "Arbitrary insertions at the head across any list size.",
                        "expression": "T(n) = \u0398(1)",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Consistent Operation Count",
                                    "count": "Exactly 3 CPU instructions",
                                    "explanation": "Every head insertion performs identical pointer operations."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(1)",
                                    "explanation": "Average case is constant time: \u0398(1)."
                              }
                        ]
                  }
            },
            "spaceComplexity": {
                  "bound": "O(1)",
                  "exactBound": "Theta(1) auxiliary",
                  "inputStorage": "Existing list of n nodes: O(n).",
                  "auxiliaryStorage": "1 newly allocated node + 1 pointer variable: O(1) auxiliary space.",
                  "totalSpace": "O(n) total list memory; O(1) auxiliary per insertion.",
                  "notes": "Allocates one Node struct (data + next pointer) dynamically on the heap.",
                  "steps": [
                        {
                              "op": "Heap Node Allocation",
                              "count": "1 node struct = sizeof(int) + sizeof(Node*)",
                              "explanation": "Allocates memory for the single new element."
                        },
                        {
                              "op": "Auxiliary Variables",
                              "count": "Node* node",
                              "explanation": "Single temporary pointer in stack frame."
                        },
                        {
                              "op": "Asymptotic Auxiliary Bound",
                              "count": "S_aux(n) \u2208 \u0398(1)",
                              "explanation": "Auxiliary space is O(1)."
                        }
                  ]
            }
      },
      "insert-tail": {
            "name": "Insert at Tail",
            "description": "Traverses the entire list to reach the last node, then attaches a newly allocated node after it.",
            "workedExample": {
                  "problem": "Insert value 30 at the tail of list [10, 20].",
                  "steps": [
                        "Allocate new Node(30) with next = nullptr.",
                        "Start curr pointer at head (10). Advance curr to node 20 (curr->next == nullptr).",
                        "Set curr->next = new node."
                  ],
                  "result": "List becomes [10, 20, 30]. Visited 2 nodes (all n nodes)."
            },
            "timeComplexity": {
                  "worst": {
                        "conditions": "List contains n nodes and has no dedicated tail pointer reference.",
                        "expression": "T(n) = n - 1 node traversals + 1 pointer assignment",
                        "bound": "O(n)",
                        "exactBound": "Theta(n)",
                        "label": "O(n)",
                        "steps": [
                              {
                                    "op": "Traversal Start",
                                    "count": "curr = head",
                                    "explanation": "Starts pointer walk from first node."
                              },
                              {
                                    "op": "Walk to Final Node",
                                    "count": "while (curr->next != null) curr = curr->next;",
                                    "explanation": "Advances curr through all n - 1 links to locate the current tail."
                              },
                              {
                                    "op": "Constant Work Per Step",
                                    "count": "n - 1 pointer dereferences",
                                    "explanation": "Each step reads next pointer: (n - 1) \u00b7 O(1) = O(n)."
                              },
                              {
                                    "op": "Attach New Node",
                                    "count": "curr->next = new Node(x);",
                                    "explanation": "Appends new node to tail in 1 write."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) = c\u2081\u00b7(n - 1) + c\u2080 \u2208 \u0398(n)",
                                    "explanation": "Worst-case time complexity is linear: \u0398(n)."
                              }
                        ]
                  },
                  "best": {
                        "conditions": "List is empty (head == null).",
                        "expression": "T(n) = 1 assignment",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Empty List Check",
                                    "count": "if (head == null) head = new Node(x);",
                                    "explanation": "Detects empty list and immediately sets head with 0 hops."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(1)",
                                    "explanation": "Best case is constant time: \u0398(1)."
                              }
                        ]
                  },
                  "average": {
                        "conditions": "List has n elements.",
                        "expression": "T(n) = n node traversals",
                        "bound": "Theta(n)",
                        "exactBound": "Theta(n)",
                        "label": "O(n)",
                        "steps": [
                              {
                                    "op": "Must Reach Last Node",
                                    "count": "Always requires reaching tail",
                                    "explanation": "Unless a tail pointer is maintained, appending always visits every existing node."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(n)",
                                    "explanation": "Average-case time complexity is linear: \u0398(n)."
                              }
                        ]
                  }
            },
            "spaceComplexity": {
                  "bound": "O(1)",
                  "exactBound": "Theta(1) auxiliary",
                  "inputStorage": "Existing list of n nodes: O(n).",
                  "auxiliaryStorage": "1 new node + traversal pointer `curr`: O(1) auxiliary space.",
                  "totalSpace": "O(n) total list memory; O(1) auxiliary.",
                  "notes": "Traversing iteratively requires only one pointer variable.",
                  "steps": [
                        {
                              "op": "New Node Memory",
                              "count": "1 Node allocation",
                              "explanation": "Allocates single node for the new element."
                        },
                        {
                              "op": "Auxiliary Pointers",
                              "count": "Node* curr",
                              "explanation": "Iterative traversal uses O(1) extra space."
                        },
                        {
                              "op": "Asymptotic Auxiliary Bound",
                              "count": "S_aux(n) \u2208 \u0398(1)",
                              "explanation": "Auxiliary space is O(1)."
                        }
                  ]
            }
      },
      "insert-index": {
            "name": "Insert at Index",
            "description": "Walks to position index - 1 and inserts the new node by re-wiring next pointers.",
            "workedExample": {
                  "problem": "Insert value 15 at index 1 in list [10, 20].",
                  "steps": [
                        "Allocate new Node(15).",
                        "Walk curr to index 0 (node 10).",
                        "Set new node's next = curr->next (points to node 20).",
                        "Set curr->next = new node."
                  ],
                  "result": "List becomes [10, 15, 20]."
            },
            "timeComplexity": {
                  "worst": {
                        "conditions": "Inserting at the end of the list (index = n).",
                        "expression": "T(n) = n - 1 pointer steps",
                        "bound": "O(n)",
                        "exactBound": "Theta(n)",
                        "label": "O(n)",
                        "steps": [
                              {
                                    "op": "Traverse to Target Position",
                                    "count": "for (int k = 0; k < index - 1; k++) curr = curr->next;",
                                    "explanation": "Advances curr pointer k times to find insertion point."
                              },
                              {
                                    "op": "Worst-Case Index",
                                    "count": "index = n requires n - 1 hops",
                                    "explanation": "Walking to the tail requires inspecting all prior nodes."
                              },
                              {
                                    "op": "Re-wire Pointers",
                                    "count": "newNode->next = curr->next; curr->next = newNode;",
                                    "explanation": "Re-wires 2 pointers in O(1) time once located."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(n)",
                                    "explanation": "Worst-case time complexity is linear: \u0398(n)."
                              }
                        ]
                  },
                  "best": {
                        "conditions": "Inserting at index 0 (equivalent to insert-head).",
                        "expression": "T(n) = 1 pointer assignment",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Index 0 Early Exit",
                                    "count": "if (index == 0) insertHead(x);",
                                    "explanation": "Directly delegates to insert-head without traversal."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(1)",
                                    "explanation": "Best-case time complexity is constant: \u0398(1)."
                              }
                        ]
                  },
                  "average": {
                        "conditions": "Target index is uniformly distributed between 0 and n.",
                        "expression": "T(n) \u2248 n / 2 node hops",
                        "bound": "Theta(n)",
                        "exactBound": "Theta(n)",
                        "label": "O(n)",
                        "steps": [
                              {
                                    "op": "Expected Traversal Distance",
                                    "count": "E[hops] = n / 2",
                                    "explanation": "On average, the requested index lies halfway through the list."
                              },
                              {
                                    "op": "Asymptotic Simplification",
                                    "count": "Drop constant factor 1/2",
                                    "explanation": "Work scales proportionally with n."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(n)",
                                    "explanation": "Average-case time complexity is linear: \u0398(n)."
                              }
                        ]
                  }
            },
            "spaceComplexity": {
                  "bound": "O(1)",
                  "exactBound": "Theta(1) auxiliary",
                  "inputStorage": "Existing list of n nodes: O(n).",
                  "auxiliaryStorage": "1 new node + scalar loop counter `k` + pointer `curr`: O(1) auxiliary space.",
                  "totalSpace": "O(n) total; O(1) auxiliary.",
                  "notes": "Non-recursive implementation maintains O(1) auxiliary space.",
                  "steps": [
                        {
                              "op": "Memory Allocation",
                              "count": "1 node struct",
                              "explanation": "Single new element dynamically created."
                        },
                        {
                              "op": "Loop Variables",
                              "count": "int k, Node* curr",
                              "explanation": "Constant number of scalar registers."
                        },
                        {
                              "op": "Asymptotic Auxiliary Bound",
                              "count": "S_aux(n) \u2208 \u0398(1)",
                              "explanation": "Auxiliary space is O(1)."
                        }
                  ]
            }
      },
      "delete-head": {
            "name": "Delete Head",
            "description": "Removes the first node of the list and advances the head pointer to the second node.",
            "workedExample": {
                  "problem": "Delete the head of list [10, 20, 30].",
                  "steps": [
                        "Store pointer to current head node (10): temp = head.",
                        "Advance head pointer to next node (20): head = head->next.",
                        "Free memory of old head: delete temp."
                  ],
                  "result": "List becomes [20, 30]. Traversal hops = 0."
            },
            "timeComplexity": {
                  "worst": {
                        "conditions": "Any non-empty linked list of size n.",
                        "expression": "T(n) = 1 pointer assignment + 1 deallocation",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Store Head Reference",
                                    "count": "Node* temp = head;",
                                    "explanation": "Captures address of first node to prevent memory leak: 1 step."
                              },
                              {
                                    "op": "Advance Head Pointer",
                                    "count": "head = head->next;",
                                    "explanation": "Reassigns head pointer to point to second node: 1 pointer write."
                              },
                              {
                                    "op": "Free Memory",
                                    "count": "delete temp;",
                                    "explanation": "Deallocates memory of the removed node: 1 step."
                              },
                              {
                                    "op": "Independence from n",
                                    "count": "0 traversal hops",
                                    "explanation": "No loop exists; head is directly accessible."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(1)",
                                    "explanation": "Strictly constant time: \u0398(1)."
                              }
                        ]
                  },
                  "best": {
                        "conditions": "List is empty (head == null) or has 1 node.",
                        "expression": "T(n) = 1 check",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Immediate Return",
                                    "count": "if (head == null) return;",
                                    "explanation": "Immediate null check and return."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(1)",
                                    "explanation": "Best-case time complexity is constant: \u0398(1)."
                              }
                        ]
                  },
                  "average": {
                        "conditions": "General deletion at head across arbitrary operations.",
                        "expression": "T(n) = \u0398(1)",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Fixed Instruction Sequence",
                                    "count": "Always 3 CPU operations",
                                    "explanation": "Every head deletion executes the identical sequence."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(1)",
                                    "explanation": "Average-case time complexity is strictly \u0398(1)."
                              }
                        ]
                  }
            },
            "spaceComplexity": {
                  "bound": "O(1)",
                  "exactBound": "Theta(1) auxiliary",
                  "inputStorage": "Remaining list of n - 1 nodes: O(n).",
                  "auxiliaryStorage": "1 temporary pointer `temp`: O(1) auxiliary space.",
                  "totalSpace": "O(n) total list memory; O(1) auxiliary space.",
                  "notes": "Reclaims memory of the removed node back to the system heap.",
                  "steps": [
                        {
                              "op": "Pointer Variable",
                              "count": "Node* temp",
                              "explanation": "Single pointer in local stack frame."
                        },
                        {
                              "op": "Heap Reclaim",
                              "count": "free(temp)",
                              "explanation": "Deallocates 1 node."
                        },
                        {
                              "op": "Asymptotic Auxiliary Bound",
                              "count": "S_aux(n) \u2208 \u0398(1)",
                              "explanation": "Auxiliary space is O(1)."
                        }
                  ]
            }
      },
      "delete-value": {
            "name": "Delete Value",
            "description": "Searches for the first occurrence of a specific value and bypasses its node by linking the previous node directly to the next node.",
            "workedExample": {
                  "problem": "Delete value 20 from list [10, 20, 30].",
                  "steps": [
                        "Check head (10 != 20). Initialize prev = 10, curr = 20.",
                        "Compare curr (20 == 20): match found!",
                        "Bypass node: prev->next = curr->next (node 10 links to 30).",
                        "Free node 20."
                  ],
                  "result": "List becomes [10, 30]."
            },
            "timeComplexity": {
                  "worst": {
                        "conditions": "Target value is absent from list, or located at the tail node (index n - 1).",
                        "expression": "T(n) = n node comparisons",
                        "bound": "O(n)",
                        "exactBound": "Theta(n)",
                        "label": "O(n)",
                        "steps": [
                              {
                                    "op": "Traversal Loop",
                                    "count": "while (curr != null && curr->data != x)",
                                    "explanation": "Scans nodes sequentially with prev and curr pointers."
                              },
                              {
                                    "op": "Worst-Case Search Length",
                                    "count": "n comparisons",
                                    "explanation": "When value is absent or at end, loop visits all n nodes."
                              },
                              {
                                    "op": "Node Bypass",
                                    "count": "prev->next = curr->next;",
                                    "explanation": "Unlinks node in O(1) once found."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(n)",
                                    "explanation": "Worst-case time complexity is linear: \u0398(n)."
                              }
                        ]
                  },
                  "best": {
                        "conditions": "Target value is at the head node (index 0).",
                        "expression": "T(n) = 1 comparison + head update",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Head Value Match",
                                    "count": "if (head->data == x) head = head->next;",
                                    "explanation": "First comparison matches immediately; bypasses head without traversal."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(1)",
                                    "explanation": "Best-case time complexity is constant: \u0398(1)."
                              }
                        ]
                  },
                  "average": {
                        "conditions": "Target value is uniformly distributed across the list.",
                        "expression": "T(n) \u2248 n / 2 comparisons",
                        "bound": "Theta(n)",
                        "exactBound": "Theta(n)",
                        "label": "O(n)",
                        "steps": [
                              {
                                    "op": "Expected Search Distance",
                                    "count": "E[visits] = (n + 1) / 2 \u2248 n / 2",
                                    "explanation": "On average, value is located halfway through the list."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(n)",
                                    "explanation": "Average-case time complexity is linear: \u0398(n)."
                              }
                        ]
                  }
            },
            "spaceComplexity": {
                  "bound": "O(1)",
                  "exactBound": "Theta(1) auxiliary",
                  "inputStorage": "List of n nodes: O(n).",
                  "auxiliaryStorage": "Pointers `prev`, `curr`: O(1) auxiliary space.",
                  "totalSpace": "O(n) total list memory; O(1) auxiliary space.",
                  "notes": "In-place pointer rewiring requires zero additional array allocations.",
                  "steps": [
                        {
                              "op": "Pointer Variables",
                              "count": "Node* prev, Node* curr",
                              "explanation": "Two pointer registers tracking traversal."
                        },
                        {
                              "op": "Asymptotic Auxiliary Bound",
                              "count": "S_aux(n) \u2208 \u0398(1)",
                              "explanation": "Auxiliary space is O(1)."
                        }
                  ]
            }
      },
      "search": {
            "name": "Search",
            "description": "Sequentially compares each node's data with the target key until a match is found or the end of the list is reached.",
            "workedExample": {
                  "problem": "Search for value 20 in list [10, 20, 30].",
                  "steps": [
                        "Compare index 0 (value 10 with 20): no match, advance curr = curr->next.",
                        "Compare index 1 (value 20 with 20): match found!",
                        "Return node index 1."
                  ],
                  "result": "Target 20 found at index 1 after 2 node visits."
            },
            "timeComplexity": {
                  "worst": {
                        "conditions": "Target value is absent from list or located at the tail node.",
                        "expression": "T(n) = n node comparisons",
                        "bound": "O(n)",
                        "exactBound": "Theta(n)",
                        "label": "O(n)",
                        "steps": [
                              {
                                    "op": "Sequential Scan",
                                    "count": "while (curr != null)",
                                    "explanation": "Walks from head to tail following next pointers."
                              },
                              {
                                    "op": "Comparison per Node",
                                    "count": "curr->data == target",
                                    "explanation": "Inspects data value at each node."
                              },
                              {
                                    "op": "Full Traversal",
                                    "count": "n node hops",
                                    "explanation": "Target is absent or at end, checking all n elements."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(n)",
                                    "explanation": "Worst-case time complexity is linear: \u0398(n)."
                              }
                        ]
                  },
                  "best": {
                        "conditions": "Target value is located at the head node.",
                        "expression": "T(n) = 1 comparison",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "First Node Match",
                                    "count": "head->data == target",
                                    "explanation": "Matches on the very first comparison at index 0."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(1)",
                                    "explanation": "Best-case time complexity is constant: \u0398(1)."
                              }
                        ]
                  },
                  "average": {
                        "conditions": "Target key is equally likely to be at any of the n node positions.",
                        "expression": "T(n) \u2248 n / 2 comparisons",
                        "bound": "Theta(n)",
                        "exactBound": "Theta(n)",
                        "label": "O(n)",
                        "steps": [
                              {
                                    "op": "Uniform Probability",
                                    "count": "P(position = k) = 1/n",
                                    "explanation": "Sum of positions: (1/n) * (n(n+1)/2) = (n+1)/2."
                              },
                              {
                                    "op": "Asymptotic Simplification",
                                    "count": "(n + 1)/2 \u2248 n / 2",
                                    "explanation": "Constant multiplier 1/2 is omitted in asymptotic notation."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(n)",
                                    "explanation": "Average-case time complexity is linear: \u0398(n)."
                              }
                        ]
                  }
            },
            "spaceComplexity": {
                  "bound": "O(1)",
                  "exactBound": "Theta(1) auxiliary",
                  "inputStorage": "List of n nodes: O(n).",
                  "auxiliaryStorage": "Single traversal pointer `curr`: O(1) auxiliary space.",
                  "totalSpace": "O(n) total list memory; O(1) auxiliary space.",
                  "notes": "Search only reads pointers without modifying memory or allocating structures.",
                  "steps": [
                        {
                              "op": "Traversal Pointer",
                              "count": "Node* curr",
                              "explanation": "One pointer variable allocated on stack."
                        },
                        {
                              "op": "Asymptotic Auxiliary Bound",
                              "count": "S_aux(n) \u2208 \u0398(1)",
                              "explanation": "Auxiliary space is O(1)."
                        }
                  ]
            }
      },
      "traverse": {
            "name": "Traverse",
            "description": "Visits and processes every node in the linked list sequentially from head to tail.",
            "workedExample": {
                  "problem": "Traverse list [10, 20, 30] to print all elements.",
                  "steps": [
                        "Start at head: visit node 10, print 10.",
                        "Advance curr: visit node 20, print 20.",
                        "Advance curr: visit node 30, print 30.",
                        "Advance curr to nullptr: traversal complete."
                  ],
                  "result": "Printed [10, 20, 30]. Visited exactly 3 nodes."
            },
            "timeComplexity": {
                  "worst": {
                        "conditions": "Any linked list of size n.",
                        "expression": "T(n) = n node visits",
                        "bound": "O(n)",
                        "exactBound": "Theta(n)",
                        "label": "O(n)",
                        "steps": [
                              {
                                    "op": "Iteration Over Entire List",
                                    "count": "while (curr != null)",
                                    "explanation": "Walks from head through all n nodes until null pointer."
                              },
                              {
                                    "op": "Per-Node Action",
                                    "count": "visit(curr->data); curr = curr->next;",
                                    "explanation": "Constant time work performed per node."
                              },
                              {
                                    "op": "Total Cost Function",
                                    "count": "T(n) = n \u00b7 c",
                                    "explanation": "Total work is strictly proportional to list length n."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(n)",
                                    "explanation": "Worst-case time complexity is linear: \u0398(n)."
                              }
                        ]
                  },
                  "best": {
                        "conditions": "List is empty (head == null).",
                        "expression": "T(n) = 0 visits (1 null check)",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Immediate Null Detection",
                                    "count": "head == null",
                                    "explanation": "Loop terminates immediately."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(1)",
                                    "explanation": "Best-case time complexity is constant: \u0398(1)."
                              }
                        ]
                  },
                  "average": {
                        "conditions": "Non-empty list of size n.",
                        "expression": "T(n) = n visits",
                        "bound": "Theta(n)",
                        "exactBound": "Theta(n)",
                        "label": "O(n)",
                        "steps": [
                              {
                                    "op": "Complete Visit Requirement",
                                    "count": "Must process all n elements",
                                    "explanation": "Traversal by definition inspects every existing node."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(n)",
                                    "explanation": "Average-case time complexity is linear: \u0398(n)."
                              }
                        ]
                  }
            },
            "spaceComplexity": {
                  "bound": "O(1)",
                  "exactBound": "Theta(1) auxiliary",
                  "inputStorage": "List of n nodes: O(n).",
                  "auxiliaryStorage": "Single traversal pointer `curr`: O(1) auxiliary space.",
                  "totalSpace": "O(n) total list memory; O(1) auxiliary space.",
                  "notes": "Iterative traversal consumes no extra memory.",
                  "steps": [
                        {
                              "op": "Pointer Storage",
                              "count": "Node* curr",
                              "explanation": "Single pointer register."
                        },
                        {
                              "op": "Asymptotic Auxiliary Bound",
                              "count": "S_aux(n) \u2208 \u0398(1)",
                              "explanation": "Auxiliary space is O(1)."
                        }
                  ]
            }
      }
},

    timeComplexity: {
      worst: {
        conditions: "Operations requiring full traversal to the tail or an absent element (search, insert-tail, delete-value).",
        expression: "T(n) = n node traversals",
        bound: "O(n)",
        exactBound: "Theta(n)",
        label: "O(n)",
        steps: [
          {
            op: "Pointer Traversal Mechanism",
            count: "curr = curr->next",
            explanation: "Because singly linked lists lack random access, reaching position k requires walking k sequential pointers from head.",
          },
          {
            op: "Worst-Case Path Length",
            count: "n pointer hops",
            explanation: "Searching for an absent key or inserting at tail requires advancing curr through all n existing nodes.",
          },
          {
            op: "Constant Work Per Hop",
            count: "1 pointer read + 1 comparison",
            explanation: "Each node visit takes constant time O(1). Total work is n · O(1) = O(n).",
          },
          {
            op: "Head Operation Distinction",
            count: "insert-head / delete-head = O(1)",
            explanation: "If an operation only modifies the head pointer, it takes O(1) because no traversal loop executes.",
          },
          {
            op: "Asymptotic Bound",
            count: "T(n) ∈ O(n)",
            explanation: "General traversal and search in a singly linked list has worst-case time complexity O(n).",
          },
        ],
      },
      best: {
        conditions: "Operation at head of list (insert-head, delete-head, or search finding value at head node).",
        expression: "T(n) = 1 pointer rewiring",
        bound: "Theta(1)",
        exactBound: "Theta(1)",
        label: "O(1)",
        steps: [
          {
            op: "Immediate Head Access",
            count: "head pointer available in O(1)",
            explanation: "The list maintains a direct reference to the head node.",
          },
          {
            op: "Pointer Update",
            count: "newNode->next = head; head = newNode;",
            explanation: "Rewiring pointer references requires 2 pointer writes, with zero traversal.",
          },
          {
            op: "Asymptotic Bound",
            count: "T(n) ∈ Θ(1)",
            explanation: "Head insertion and deletion run in constant time: Θ(1).",
          },
        ],
      },
      average: {
        conditions: "Target node is uniformly distributed across the n nodes.",
        expression: "T(n) ≈ n / 2 node visits",
        bound: "Theta(n)",
        exactBound: "Theta(n)",
        label: "O(n)",
        steps: [
          {
            op: "Uniform Node Position Expectation",
            count: "Average position = n / 2",
            explanation: "On average, a random search or index insertion traverses halfway through the list.",
          },
          {
            op: "Expected Node Visits",
            count: "E[T(n)] = (n + 1) / 2 ≈ n / 2",
            explanation: "Traversing n/2 nodes takes (1/2)n · O(1) time.",
          },
          {
            op: "Asymptotic Simplification",
            count: "Drop constant 1/2 factor",
            explanation: "Linear scaling yields average-case time complexity Θ(n).",
          },
        ],
      },
    },

    spaceComplexity: {
      bound: "O(n)",
      exactBound: "Theta(1) auxiliary",
      inputStorage: "Each node stores 1 data integer + 1 next pointer: 2 words × n = O(n).",
      auxiliaryStorage: "Temporary traversal pointers `curr`, `prev`: O(1) auxiliary space.",
      totalSpace: "O(n) structure storage; O(1) auxiliary space per operation.",
      notes: "Nodes are dynamically allocated on the heap as elements are inserted.",
      steps: [
        {
          op: "Per-Node Storage Allocation",
          count: "sizeof(int) + sizeof(Node*) per node",
          explanation: "Every element requires extra overhead for its next pointer compared to raw array storage.",
        },
        {
          op: "Structure Space Growth",
          count: "S_struct(n) = 2w · n = O(n)",
          explanation: "Total memory consumed by n nodes scales linearly with n.",
        },
        {
          op: "Auxiliary Traversal Memory",
          count: "curr, prev pointers = O(1)",
          explanation: "During any single traversal or insert, only a constant number of pointer variables exist.",
        },
        {
          op: "Asymptotic Auxiliary Bound",
          count: "S_aux(n) ∈ Θ(1)",
          explanation: "Auxiliary space is O(1); total data structure space is O(n).",
        },
      ],
    },
  },

  BST: {
    id: "BST",
    title: "Binary Search Tree",
    category: "data-structures",
    definition: "A binary search tree (BST) is a hierarchical node-based binary tree data structure where each node has at most two children, and all keys in the left subtree are smaller while all keys in the right subtree are greater than the node's key.",

    inputSize: (params, currentData) => {
      const count = (node) => (node ? 1 + count(node.left) + count(node.right) : 0);
      if (currentData && (currentData.value !== undefined || currentData.id !== undefined)) {
        return count(currentData);
      }
      if (params && params.data) {
        if (typeof params.data.size === "number") return params.data.size;
        return count(params.data);
      }
      return 0;
    },

    liveMetrics: [
      {
        key: "comparisons",
        label: "Comparisons",
        stepKey: "comparisons",
        description: "Number of key comparisons made while navigating down the tree.",
      },
      {
        key: "nodesVisited",
        label: "Nodes Visited",
        stepKey: "nodesVisited",
        description: "Number of tree nodes visited during the operation.",
      },
    ],

    stepOperation: (step) => {
      if (step.foundNodeId != null) return "Found target node in BST";
      if (step.comparingNodeId != null) return "Comparing key at current node";
      if (step.traversalOrder && step.traversalOrder.length > 0) return "Traversing BST";
      return step.message || "BST operation";
    },
    operations: {
      "insert": {
            "name": "Insert",
            "description": "Compares key with current node and branches left if smaller or right if greater until reaching an empty leaf position.",
            "workedExample": {
                  "problem": "Insert value 25 into BST with root 20 (right child 30).",
                  "steps": [
                        "Compare 25 with root 20: 25 > 20, branch right to node 30.",
                        "Compare 25 with node 30: 25 < 30, branch left to nullptr.",
                        "Attach new Node(25) as left child of node 30."
                  ],
                  "result": "Node 25 inserted at depth 2. Visited 2 nodes."
            },
            "timeComplexity": {
                  "worst": {
                        "conditions": "Degenerate (skewed) tree where keys were inserted in sorted order (tree height h = n).",
                        "expression": "T(n) = n node comparisons",
                        "bound": "O(n)",
                        "exactBound": "Theta(n)",
                        "label": "O(n)",
                        "steps": [
                              {
                                    "op": "Degenerate Tree Structure",
                                    "count": "Height h = n",
                                    "explanation": "When elements arrive in ascending or descending order, every node has only one child, forming a linked list."
                              },
                              {
                                    "op": "Path to Leaf",
                                    "count": "Descend n levels",
                                    "explanation": "Insertion traverses from root all the way down the skewed chain."
                              },
                              {
                                    "op": "Comparison Cost",
                                    "count": "1 comparison per level",
                                    "explanation": "Total cost = n \u00b7 O(1) = O(n)."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 O(n)",
                                    "explanation": "Worst-case time complexity is linear: O(n)."
                              }
                        ]
                  },
                  "best": {
                        "conditions": "Tree is empty (insert at root), or tree is balanced and new node attaches near the top.",
                        "expression": "T(n) = 1 assignment",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Empty Tree Check",
                                    "count": "root == null",
                                    "explanation": "Direct assignment as root node."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(1)",
                                    "explanation": "Best-case time complexity is constant: \u0398(1)."
                              }
                        ]
                  },
                  "average": {
                        "conditions": "Keys inserted in random uniform order producing approximately balanced tree.",
                        "expression": "T(n) \u2248 2 ln(n) \u2248 1.386 log\u2082(n) comparisons",
                        "bound": "Theta(log n)",
                        "exactBound": "Theta(log n)",
                        "label": "O(log n)",
                        "steps": [
                              {
                                    "op": "Expected Tree Height",
                                    "count": "E[h] = O(log n)",
                                    "explanation": "In a randomly constructed BST, expected depth of a newly inserted node is logarithmic."
                              },
                              {
                                    "op": "Branching Elimination",
                                    "count": "Eliminates ~half remaining nodes per step",
                                    "explanation": "Each comparison branches left or right."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(log n)",
                                    "explanation": "Average-case time complexity is logarithmic: \u0398(log n)."
                              }
                        ]
                  }
            },
            "spaceComplexity": {
                  "bound": "O(h)",
                  "exactBound": "O(h) call stack",
                  "inputStorage": "Existing BST of n nodes: O(n).",
                  "auxiliaryStorage": "Recursion call stack equal to tree height h: O(log n) balanced, O(n) skewed.",
                  "totalSpace": "O(n) structure memory; O(h) auxiliary call stack.",
                  "notes": "Iterative BST insertion uses O(1) auxiliary space.",
                  "steps": [
                        {
                              "op": "New Node Heap Storage",
                              "count": "1 node struct (val, left, right)",
                              "explanation": "Dynamic heap allocation for the inserted key."
                        },
                        {
                              "op": "Call Stack Depth",
                              "count": "Height h frames",
                              "explanation": "Recursive implementation pushes 1 frame per level descended."
                        },
                        {
                              "op": "Asymptotic Auxiliary Bound",
                              "count": "S_aux(n) = O(h)",
                              "explanation": "O(log n) on balanced trees; O(n) on skewed trees."
                        }
                  ]
            }
      },
      "search": {
            "name": "Search",
            "description": "Searches for a target key by comparing it with nodes and branching left or right.",
            "workedExample": {
                  "problem": "Search for value 15 in BST with root 20 (left child 10, right child of 10 is 15).",
                  "steps": [
                        "Compare 15 with root 20: 15 < 20, branch left to node 10.",
                        "Compare 15 with node 10: 15 > 10, branch right to node 15.",
                        "Compare 15 with node 15: match found!"
                  ],
                  "result": "Target 15 found at depth 2 after 3 comparisons."
            },
            "timeComplexity": {
                  "worst": {
                        "conditions": "Degenerate tree of height h = n and key is at deepest leaf or absent.",
                        "expression": "T(n) = n comparisons",
                        "bound": "O(n)",
                        "exactBound": "Theta(n)",
                        "label": "O(n)",
                        "steps": [
                              {
                                    "op": "Skewed Path",
                                    "count": "Traverse entire single-child line",
                                    "explanation": "Tree degenerates into a linear chain of length n."
                              },
                              {
                                    "op": "Per-Node Comparison",
                                    "count": "1 comparison per node",
                                    "explanation": "Must check all n nodes."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 O(n)",
                                    "explanation": "Worst-case time complexity is linear: O(n)."
                              }
                        ]
                  },
                  "best": {
                        "conditions": "Target key is located directly at the root node.",
                        "expression": "T(n) = 1 comparison",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Root Key Match",
                                    "count": "root->data == target",
                                    "explanation": "Matches on first comparison."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(1)",
                                    "explanation": "Best-case time complexity is constant: \u0398(1)."
                              }
                        ]
                  },
                  "average": {
                        "conditions": "Random keys forming a balanced tree of height h = O(log n).",
                        "expression": "T(n) \u2248 1.386 log\u2082(n) comparisons",
                        "bound": "Theta(log n)",
                        "exactBound": "Theta(log n)",
                        "label": "O(log n)",
                        "steps": [
                              {
                                    "op": "Binary Division",
                                    "count": "N_remaining = N / 2 per step",
                                    "explanation": "Each branch halves the search candidate set."
                              },
                              {
                                    "op": "Average Depth",
                                    "count": "Depth \u2248 log\u2082(n)",
                                    "explanation": "Average search length matches node depth."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(log n)",
                                    "explanation": "Average-case time complexity is logarithmic: \u0398(log n)."
                              }
                        ]
                  }
            },
            "spaceComplexity": {
                  "bound": "O(h)",
                  "exactBound": "O(h) call stack",
                  "inputStorage": "BST of n nodes: O(n).",
                  "auxiliaryStorage": "Recursion call stack equal to depth descended: O(h).",
                  "totalSpace": "O(n) total; O(h) auxiliary.",
                  "notes": "Iterative search runs in strictly O(1) auxiliary space.",
                  "steps": [
                        {
                              "op": "Stack Frames",
                              "count": "Depth frames",
                              "explanation": "Each recursive call pushes 1 frame."
                        },
                        {
                              "op": "Asymptotic Auxiliary Bound",
                              "count": "S_aux(n) = O(h)",
                              "explanation": "Auxiliary space is O(h)."
                        }
                  ]
            }
      },
      "delete": {
            "name": "Delete",
            "description": "Locates and removes a key. Handles three node cases: leaf node (direct removal), single-child (bypass), two-children (replace with in-order successor).",
            "workedExample": {
                  "problem": "Delete node 20 with two children (left child 10, right child 30).",
                  "steps": [
                        "Locate node 20 at root.",
                        "Find in-order successor (minimum in right subtree): node 30.",
                        "Copy successor value 30 to root node.",
                        "Delete successor node from right subtree."
                  ],
                  "result": "Node 20 deleted. Tree invariant preserved."
            },
            "timeComplexity": {
                  "worst": {
                        "conditions": "Degenerate tree of height h = n.",
                        "expression": "T(n) = n node visits",
                        "bound": "O(n)",
                        "exactBound": "Theta(n)",
                        "label": "O(n)",
                        "steps": [
                              {
                                    "op": "Locate Node",
                                    "count": "Descend skewed path",
                                    "explanation": "Finding node takes O(n) in worst-case linear chain."
                              },
                              {
                                    "op": "Find Successor",
                                    "count": "Descend to leaf",
                                    "explanation": "Successor search also bounded by tree height O(n)."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 O(n)",
                                    "explanation": "Worst-case time complexity is linear: O(n)."
                              }
                        ]
                  },
                  "best": {
                        "conditions": "Node to delete is root and is a leaf node (tree has 1 node).",
                        "expression": "T(n) = 1 comparison + delete",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Immediate Leaf Match",
                                    "count": "Root matches and has no children",
                                    "explanation": "Direct deletion with 0 hops."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(1)",
                                    "explanation": "Best-case time complexity is constant: \u0398(1)."
                              }
                        ]
                  },
                  "average": {
                        "conditions": "Random keys forming a balanced tree of height h = O(log n).",
                        "expression": "T(n) = O(log n)",
                        "bound": "Theta(log n)",
                        "exactBound": "Theta(log n)",
                        "label": "O(log n)",
                        "steps": [
                              {
                                    "op": "Search Phase",
                                    "count": "O(log n) comparisons",
                                    "explanation": "Locating the node takes logarithmic time."
                              },
                              {
                                    "op": "Successor Replacement Phase",
                                    "count": "O(log n) traversal",
                                    "explanation": "Finding minimum in right subtree takes at most height h steps."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(log n)",
                                    "explanation": "Average-case time complexity is logarithmic: \u0398(log n)."
                              }
                        ]
                  }
            },
            "spaceComplexity": {
                  "bound": "O(h)",
                  "exactBound": "O(h) call stack",
                  "inputStorage": "BST of n nodes: O(n).",
                  "auxiliaryStorage": "Call stack frames equal to tree height: O(h).",
                  "totalSpace": "O(n) total; O(h) auxiliary.",
                  "notes": "Auxiliary space is determined by recursion stack depth.",
                  "steps": [
                        {
                              "op": "Call Stack Frame Chain",
                              "count": "Up to h frames",
                              "explanation": "Recursive delete and successor unlinking."
                        },
                        {
                              "op": "Asymptotic Auxiliary Bound",
                              "count": "S_aux(n) = O(h)",
                              "explanation": "O(log n) balanced, O(n) skewed."
                        }
                  ]
            }
      },
      "inorder": {
            "name": "In-Order Traversal",
            "description": "Visits left subtree, root, right subtree recursively. Yields elements in ascending sorted order.",
            "workedExample": {
                  "problem": "In-order traversal of BST with root 20, left child 10, right child 30.",
                  "steps": [
                        "Traverse left subtree: visit 10.",
                        "Visit root: visit 20.",
                        "Traverse right subtree: visit 30."
                  ],
                  "result": "Output order: [10, 20, 30] (sorted)."
            },
            "timeComplexity": {
                  "worst": {
                        "conditions": "Any BST of size n.",
                        "expression": "T(n) = 2n + 1 recursive calls = 2n null checks + n visits",
                        "bound": "Theta(n)",
                        "exactBound": "Theta(n)",
                        "label": "O(n)",
                        "steps": [
                              {
                                    "op": "Every Node Visited Once",
                                    "count": "n node visits",
                                    "explanation": "Every node in the tree is visited exactly once."
                              },
                              {
                                    "op": "Leaf Null Checks",
                                    "count": "n + 1 null pointer returns",
                                    "explanation": "Every leaf has two null pointers inspected."
                              },
                              {
                                    "op": "Cost Function",
                                    "count": "T(n) = 2n + 1 \u2208 \u0398(n)",
                                    "explanation": "Strictly linear in the number of nodes."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(n)",
                                    "explanation": "Time complexity across all cases is tightly bounded by \u0398(n)."
                              }
                        ]
                  },
                  "best": {
                        "conditions": "Empty BST (root == null).",
                        "expression": "T(n) = 1 check",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Immediate Return",
                                    "count": "root == null",
                                    "explanation": "Immediate return."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(1)",
                                    "explanation": "Constant time for empty tree: \u0398(1)."
                              }
                        ]
                  },
                  "average": {
                        "conditions": "Non-empty BST of size n.",
                        "expression": "T(n) = \u0398(n)",
                        "bound": "Theta(n)",
                        "exactBound": "Theta(n)",
                        "label": "O(n)",
                        "steps": [
                              {
                                    "op": "Full Node Enumeration",
                                    "count": "Processes all n nodes",
                                    "explanation": "Traversal inspects every element."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(n)",
                                    "explanation": "Average-case time complexity is linear: \u0398(n)."
                              }
                        ]
                  }
            },
            "spaceComplexity": {
                  "bound": "O(h)",
                  "exactBound": "O(h) call stack",
                  "inputStorage": "BST of n nodes: O(n).",
                  "auxiliaryStorage": "Call stack frames equal to tree height: O(h).",
                  "totalSpace": "O(n) total; O(h) auxiliary.",
                  "notes": "Space is proportional to height h: O(log n) on balanced trees, O(n) on degenerate trees.",
                  "steps": [
                        {
                              "op": "Call Stack Depth",
                              "count": "h frames",
                              "explanation": "Maximum active stack frames equal maximum tree depth."
                        },
                        {
                              "op": "Asymptotic Auxiliary Bound",
                              "count": "S_aux(n) = O(h)",
                              "explanation": "O(log n) balanced, O(n) skewed."
                        }
                  ]
            }
      },
      "preorder": {
            "name": "Pre-Order Traversal",
            "description": "Visits root, left subtree, right subtree recursively. Used for serializing or cloning tree hierarchies.",
            "workedExample": {
                  "problem": "Pre-order traversal of BST with root 20, left 10, right 30.",
                  "steps": [
                        "Visit root: 20.",
                        "Traverse left subtree: 10.",
                        "Traverse right subtree: 30."
                  ],
                  "result": "Output order: [20, 10, 30]."
            },
            "timeComplexity": {
                  "worst": {
                        "conditions": "Any BST of size n.",
                        "expression": "T(n) = 2n + 1 calls",
                        "bound": "Theta(n)",
                        "exactBound": "Theta(n)",
                        "label": "O(n)",
                        "steps": [
                              {
                                    "op": "Node Processing",
                                    "count": "n node visits",
                                    "explanation": "Processes all n nodes."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(n)",
                                    "explanation": "Linear time complexity: \u0398(n)."
                              }
                        ]
                  },
                  "best": {
                        "conditions": "Empty BST.",
                        "expression": "T(n) = 1 check",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Immediate Return",
                                    "count": "root == null",
                                    "explanation": "Immediate return."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(1)",
                                    "explanation": "Constant time: \u0398(1)."
                              }
                        ]
                  },
                  "average": {
                        "conditions": "Non-empty BST of size n.",
                        "expression": "T(n) = \u0398(n)",
                        "bound": "Theta(n)",
                        "exactBound": "Theta(n)",
                        "label": "O(n)",
                        "steps": [
                              {
                                    "op": "Full Tree Visit",
                                    "count": "Visits all n nodes",
                                    "explanation": "Every node processed."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(n)",
                                    "explanation": "Average-case time complexity is linear: \u0398(n)."
                              }
                        ]
                  }
            },
            "spaceComplexity": {
                  "bound": "O(h)",
                  "exactBound": "O(h) call stack",
                  "inputStorage": "BST of n nodes: O(n).",
                  "auxiliaryStorage": "Call stack frames equal to height h: O(h).",
                  "totalSpace": "O(n) total; O(h) auxiliary.",
                  "notes": "Auxiliary space is O(h).",
                  "steps": [
                        {
                              "op": "Stack Depth",
                              "count": "Height h",
                              "explanation": "Pushes frames up to tree height."
                        },
                        {
                              "op": "Asymptotic Auxiliary Bound",
                              "count": "S_aux(n) = O(h)",
                              "explanation": "Auxiliary space is O(h)."
                        }
                  ]
            }
      },
      "postorder": {
            "name": "Post-Order Traversal",
            "description": "Visits left subtree, right subtree, root recursively. Used for bottom-up operations like deleting or freeing nodes.",
            "workedExample": {
                  "problem": "Post-order traversal of BST with root 20, left 10, right 30.",
                  "steps": [
                        "Traverse left subtree: 10.",
                        "Traverse right subtree: 30.",
                        "Visit root: 20."
                  ],
                  "result": "Output order: [10, 30, 20]."
            },
            "timeComplexity": {
                  "worst": {
                        "conditions": "Any BST of size n.",
                        "expression": "T(n) = 2n + 1 calls",
                        "bound": "Theta(n)",
                        "exactBound": "Theta(n)",
                        "label": "O(n)",
                        "steps": [
                              {
                                    "op": "Node Visits",
                                    "count": "n visits",
                                    "explanation": "Visits all n nodes."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(n)",
                                    "explanation": "Linear time complexity: \u0398(n)."
                              }
                        ]
                  },
                  "best": {
                        "conditions": "Empty BST.",
                        "expression": "T(n) = 1 check",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Empty Check",
                                    "count": "root == null",
                                    "explanation": "Immediate return."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(1)",
                                    "explanation": "Constant time: \u0398(1)."
                              }
                        ]
                  },
                  "average": {
                        "conditions": "Non-empty BST of size n.",
                        "expression": "T(n) = \u0398(n)",
                        "bound": "Theta(n)",
                        "exactBound": "Theta(n)",
                        "label": "O(n)",
                        "steps": [
                              {
                                    "op": "Complete Walk",
                                    "count": "Processes all n nodes",
                                    "explanation": "Linear work."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(n)",
                                    "explanation": "Average-case time complexity is linear: \u0398(n)."
                              }
                        ]
                  }
            },
            "spaceComplexity": {
                  "bound": "O(h)",
                  "exactBound": "O(h) call stack",
                  "inputStorage": "BST of n nodes: O(n).",
                  "auxiliaryStorage": "Call stack frames equal to height h: O(h).",
                  "totalSpace": "O(n) total; O(h) auxiliary.",
                  "notes": "Auxiliary space is O(h).",
                  "steps": [
                        {
                              "op": "Stack Depth",
                              "count": "Height h",
                              "explanation": "Pushes frames up to tree height."
                        },
                        {
                              "op": "Asymptotic Auxiliary Bound",
                              "count": "S_aux(n) = O(h)",
                              "explanation": "Auxiliary space is O(h)."
                        }
                  ]
            }
      },
      "clear": {
            "name": "Clear",
            "description": "Frees all nodes in the binary search tree and resets the root pointer to null.",
            "workedExample": {
                  "problem": "Clear BST with 3 nodes.",
                  "steps": [
                        "Post-order traversal deallocates leaves 10 and 30.",
                        "Deallocates root 20.",
                        "Sets root = nullptr."
                  ],
                  "result": "Tree becomes empty null."
            },
            "timeComplexity": {
                  "worst": {
                        "conditions": "BST with n nodes.",
                        "expression": "T(n) = n node deallocations",
                        "bound": "Theta(n)",
                        "exactBound": "Theta(n)",
                        "label": "O(n)",
                        "steps": [
                              {
                                    "op": "Node Deallocation",
                                    "count": "n delete operations",
                                    "explanation": "Frees each of the n nodes."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(n)",
                                    "explanation": "Time complexity is linear: \u0398(n)."
                              }
                        ]
                  },
                  "best": {
                        "conditions": "Empty BST (root == null).",
                        "expression": "T(n) = 1 assignment",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Immediate Root Reset",
                                    "count": "root = null",
                                    "explanation": "Immediate assignment."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(1)",
                                    "explanation": "Constant time: \u0398(1)."
                              }
                        ]
                  },
                  "average": {
                        "conditions": "BST of size n.",
                        "expression": "T(n) = \u0398(n)",
                        "bound": "Theta(n)",
                        "exactBound": "Theta(n)",
                        "label": "O(n)",
                        "steps": [
                              {
                                    "op": "Memory Reclamation",
                                    "count": "Reclaims n nodes",
                                    "explanation": "Linear deallocation cost."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(n) \u2208 \u0398(n)",
                                    "explanation": "Average-case time complexity is linear: \u0398(n)."
                              }
                        ]
                  }
            },
            "spaceComplexity": {
                  "bound": "O(h)",
                  "exactBound": "O(h) call stack",
                  "inputStorage": "Reclaims O(n) memory.",
                  "auxiliaryStorage": "Call stack frames equal to height h: O(h).",
                  "totalSpace": "O(1) after completion; O(h) during recursive deletion.",
                  "notes": "Post-order recursive free uses O(h) stack depth.",
                  "steps": [
                        {
                              "op": "Recursive Free Stack",
                              "count": "Height h",
                              "explanation": "Post-order traversal pushes up to h frames."
                        },
                        {
                              "op": "Asymptotic Auxiliary Bound",
                              "count": "S_aux(n) = O(h)",
                              "explanation": "Auxiliary space is O(h)."
                        }
                  ]
            }
      }
},

    timeComplexity: {
      worst: {
        conditions: "Keys were inserted in strictly ascending or descending sorted order, producing a degenerate/skewed tree.",
        expression: "T(n) = n node comparisons (tree height h = n)",
        bound: "O(n)",
        exactBound: "Theta(n)",
        label: "O(n)",
        steps: [
          {
            op: "Degenerate Tree Structure",
            count: "Height h = n",
            explanation: "When keys arrive sorted (e.g., 10, 20, 30, 40), every inserted node becomes the right child of its predecessor with no left branches.",
          },
          {
            op: "Equivalence to Linked List",
            count: "Single path of length n",
            explanation: "The BST degenerates into a singly linked list where every level has exactly 1 node.",
          },
          {
            op: "Search Path Length",
            count: "Traverse all n levels",
            explanation: "Searching for the largest key requires visiting every node from root to the bottom leaf.",
          },
          {
            op: "Cost Function T(n)",
            count: "T(n) = n comparisons",
            explanation: "Each level requires 1 comparison with the node's key.",
          },
          {
            op: "Asymptotic Bound",
            count: "T(n) ∈ O(n)",
            explanation: "Without self-balancing (like AVL or Red-Black trees), an unbalanced BST worst-case time is linear: O(n).",
          },
        ],
      },
      best: {
        conditions: "Target is at root (O(1)), or tree is perfectly balanced (height h = ⌊log₂ n⌋).",
        expression: "T(n) = 1 (root match) or O(log n) (balanced path)",
        bound: "Omega(1)",
        exactBound: "Omega(1)",
        label: "Ω(1) or O(log n)",
        steps: [
          {
            op: "Root Comparison",
            count: "1 comparison: root->val == target",
            explanation: "If the search target is at the root node, search terminates immediately in 1 step: Ω(1).",
          },
          {
            op: "Balanced Tree Height",
            count: "h = ⌊log₂ n⌋",
            explanation: "In a balanced BST, both subtrees have equal size, dividing candidate nodes in half at each step.",
          },
          {
            op: "Balanced Path Complexity",
            count: "T(n) = O(log n)",
            explanation: "At each step, 1 comparison eliminates half the remaining subtree: Θ(log n).",
          },
        ],
      },
      average: {
        conditions: "Keys inserted in random uniform order yielding approximately balanced tree.",
        expression: "T(n) ≈ 2 ln(n) ≈ 1.386 log₂(n)",
        bound: "Theta(log n)",
        exactBound: "Theta(log n)",
        label: "O(log n)",
        steps: [
          {
            op: "Expected Tree Height for Random Insertions",
            count: "E[h] ≈ 2.99 log₂(n)",
            explanation: "Mathematical analysis of random binary search trees proves expected height scales logarithmically.",
          },
          {
            op: "Average Depth of a Node",
            count: "E[depth] = 2 ln(n) - O(1) ≈ 1.386 log₂(n)",
            explanation: "The average successful search visits approximately 1.386 log₂(n) nodes.",
          },
          {
            op: "Asymptotic Bound",
            count: "T(n) ∈ Θ(log n)",
            explanation: "Average-case search, insertion, and deletion run in logarithmic time: Θ(log n).",
          },
        ],
      },
    },

    spaceComplexity: {
      bound: "O(n)",
      exactBound: "O(h) call stack auxiliary",
      inputStorage: "Each node stores value, left child, right child: 3 words × n = O(n).",
      auxiliaryStorage: "Recursive call stack equal to tree height h: O(log n) balanced, O(n) skewed.",
      totalSpace: "O(n) structure storage; O(h) recursion stack space.",
      notes: "Iterative search avoids recursion stack space, using O(1) auxiliary space.",
      steps: [
        {
          op: "Node Heap Allocation",
          count: "n nodes × (value + left* + right*)",
          explanation: "Storing n keys in the tree takes O(n) total memory.",
        },
        {
          op: "Call Stack Frame Depth",
          count: "Depth = tree height h",
          explanation: "Recursive insert, search, or delete pushes one stack frame per level descended.",
        },
        {
          op: "Balanced vs Skewed Auxiliary Stack Space",
          count: "Balanced: O(log n) | Skewed: O(n)",
          explanation: "When balanced, stack depth is O(log n). If skewed into a line, stack depth is O(n).",
        },
      ],
    },
  },

  GRAPH: {
    id: "GRAPH",
    title: "Graph",
    category: "data-structures",
    definition: "A graph is a non-linear data structure consisting of a finite set of vertices (nodes) and a set of edges connecting pairs of vertices. In an adjacency list representation, each vertex maintains a list of its direct neighbors.",

    inputSize: (params, currentData) => {
      if (currentData && Array.isArray(currentData.vertices)) {
        return currentData.vertices.length;
      }
      if (params && params.data && Array.isArray(params.data.vertices)) {
        return params.data.vertices.length;
      }
      return 0;
    },

    liveMetrics: [
      {
        key: "nodesVisited",
        label: "Nodes Visited",
        stepKey: "nodesVisited",
        description: "Number of unique vertices visited during the traversal.",
      },
      {
        key: "edgesExplored",
        label: "Edges Explored",
        stepKey: "edgesExplored",
        description: "Number of incident edges inspected along neighbor adjacency lists.",
      },
    ],

    stepOperation: (step) => {
      if (step.activeEdge != null) return "Inspecting / traversing graph edge";
      if (step.activeVertex != null) return "Visiting graph vertex";
      return step.message || "Graph traversal step";
    },
    operations: {
      "add-vertex": {
            "name": "Add Vertex",
            "description": "Registers a new vertex ID in the vertex set and initializes its empty adjacency list entry.",
            "workedExample": {
                  "problem": "Add vertex 4 to graph with vertices [1, 2, 3].",
                  "steps": [
                        "Check if vertex 4 exists in vertex set (not found).",
                        "Append 4 to vertices array.",
                        "Initialize empty adjacency vector: adj[4] = []."
                  ],
                  "result": "Graph vertices become [1, 2, 3, 4]."
            },
            "timeComplexity": {
                  "worst": {
                        "conditions": "Adding new vertex.",
                        "expression": "T(n) = 1 set insertion + 1 map initialization",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Vertex Registration",
                                    "count": "vertices.push(u)",
                                    "explanation": "Adds vertex to list in O(1) amortized time."
                              },
                              {
                                    "op": "Adjacency Initialization",
                                    "count": "adj[u] = []",
                                    "explanation": "Allocates empty neighbor list in O(1)."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(V) \u2208 \u0398(1)",
                                    "explanation": "Constant time: \u0398(1)."
                              }
                        ]
                  },
                  "best": {
                        "conditions": "Adding vertex.",
                        "expression": "T(n) = 1",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Immediate Allocation",
                                    "count": "Direct assignment",
                                    "explanation": "Constant time execution."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(V) \u2208 \u0398(1)",
                                    "explanation": "Strictly constant time: \u0398(1)."
                              }
                        ]
                  },
                  "average": {
                        "conditions": "Arbitrary vertex additions.",
                        "expression": "T(n) = \u0398(1)",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Amortized List Insertion",
                                    "count": "Constant cost",
                                    "explanation": "Adjacency list allocation is O(1)."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(V) \u2208 \u0398(1)",
                                    "explanation": "Average-case time complexity is \u0398(1)."
                              }
                        ]
                  }
            },
            "spaceComplexity": {
                  "bound": "O(1)",
                  "exactBound": "Theta(1) auxiliary",
                  "inputStorage": "Adjacency list of V vertices: O(V + E).",
                  "auxiliaryStorage": "1 vertex descriptor: O(1).",
                  "totalSpace": "O(V + E); O(1) auxiliary per added vertex.",
                  "notes": "Allocates empty neighbor container.",
                  "steps": [
                        {
                              "op": "Vertex Node Allocation",
                              "count": "1 vertex entry",
                              "explanation": "Adds 1 element to vertex table."
                        },
                        {
                              "op": "Asymptotic Auxiliary Bound",
                              "count": "S_aux \u2208 \u0398(1)",
                              "explanation": "Auxiliary space is O(1)."
                        }
                  ]
            }
      },
      "add-edge": {
            "name": "Add Edge",
            "description": "Inserts an undirected edge between vertices u and v by adding each to the other's adjacency list.",
            "workedExample": {
                  "problem": "Add undirected edge (1, 2) to graph.",
                  "steps": [
                        "Append 2 to adjacency list of 1: adj[1].push(2).",
                        "Append 1 to adjacency list of 2: adj[2].push(1)."
                  ],
                  "result": "Edge (1, 2) created. Adjacency lists updated."
            },
            "timeComplexity": {
                  "worst": {
                        "conditions": "Adding edge to adjacency list (duplicate checking scans degree deg(u)).",
                        "expression": "T(deg) = O(deg(u) + deg(v))",
                        "bound": "O(deg(u))",
                        "exactBound": "O(deg(u))",
                        "label": "O(deg(u))",
                        "steps": [
                              {
                                    "op": "Duplicate Edge Check",
                                    "count": "Scan existing neighbors",
                                    "explanation": "Checks if edge already exists in neighbor list of size deg(u)."
                              },
                              {
                                    "op": "Append Edge Endpoints",
                                    "count": "adj[u].push(v); adj[v].push(u);",
                                    "explanation": "Two list appends take O(1) time each."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T \u2208 O(deg(u))",
                                    "explanation": "Bounded by vertex degree: O(deg(u)). Without duplicate checks, O(1)."
                              }
                        ]
                  },
                  "best": {
                        "conditions": "Vertices have zero existing edges (degree 0).",
                        "expression": "T = 2 appends",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Immediate Append",
                                    "count": "Direct list push",
                                    "explanation": "Instant insertion when neighbor list is empty."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T \u2208 \u0398(1)",
                                    "explanation": "Constant time: \u0398(1)."
                              }
                        ]
                  },
                  "average": {
                        "conditions": "Typical graph edge addition.",
                        "expression": "T = O(1) average degree",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Adjacency List Append",
                                    "count": "O(1) list insertion",
                                    "explanation": "Direct append to adjacency vector."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T \u2208 \u0398(1)",
                                    "explanation": "Average-case time complexity is \u0398(1) (or O(deg) with duplicate scan)."
                              }
                        ]
                  }
            },
            "spaceComplexity": {
                  "bound": "O(1)",
                  "exactBound": "Theta(1) auxiliary",
                  "inputStorage": "Adjacency list stores V vertices and 2E edge endpoints: O(V + E).",
                  "auxiliaryStorage": "2 edge integers: O(1).",
                  "totalSpace": "O(V + E); O(1) auxiliary.",
                  "notes": "Each undirected edge consumes two integer slots (u->v and v->u).",
                  "steps": [
                        {
                              "op": "Edge Slots",
                              "count": "2 integer entries in adjacency vectors",
                              "explanation": "Stores forward and reverse references."
                        },
                        {
                              "op": "Asymptotic Auxiliary Bound",
                              "count": "S_aux \u2208 \u0398(1)",
                              "explanation": "Auxiliary space is O(1)."
                        }
                  ]
            }
      },
      "remove-vertex": {
            "name": "Remove Vertex",
            "description": "Removes vertex u and all incident edges connected to u across all neighboring adjacency lists.",
            "workedExample": {
                  "problem": "Remove vertex 2 from graph with edges (1, 2) and (2, 3).",
                  "steps": [
                        "Inspect neighbors of 2: [1, 3].",
                        "Remove 2 from adj[1] and adj[3].",
                        "Delete adj[2] and remove 2 from vertices list."
                  ],
                  "result": "Vertex 2 and incident edges deleted."
            },
            "timeComplexity": {
                  "worst": {
                        "conditions": "Dense graph where vertex is connected to many neighbors.",
                        "expression": "T(V, E) = O(V + E)",
                        "bound": "O(V + E)",
                        "exactBound": "Theta(V + E)",
                        "label": "O(V + E)",
                        "steps": [
                              {
                                    "op": "Remove Incident Edges",
                                    "count": "Scan neighbor lists",
                                    "explanation": "Must filter out vertex u from each neighbor's adjacency list."
                              },
                              {
                                    "op": "Vertex Set Filtering",
                                    "count": "Filter vertices array of size V",
                                    "explanation": "Removes u from vertex list."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T \u2208 O(V + E)",
                                    "explanation": "Worst-case time complexity is O(V + E)."
                              }
                        ]
                  },
                  "best": {
                        "conditions": "Isolated vertex with degree 0.",
                        "expression": "T = O(V)",
                        "bound": "Omega(deg(u))",
                        "exactBound": "Omega(deg(u))",
                        "label": "\u03a9(deg(u))",
                        "steps": [
                              {
                                    "op": "Zero Neighbors",
                                    "count": "0 incident edges to remove",
                                    "explanation": "Only vertex table updated."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T \u2208 \u03a9(deg(u))",
                                    "explanation": "Lower bounded by vertex degree."
                              }
                        ]
                  },
                  "average": {
                        "conditions": "Average graph vertex removal.",
                        "expression": "T = O(V + deg(u))",
                        "bound": "Theta(V + E)",
                        "exactBound": "Theta(V + E)",
                        "label": "O(V + E)",
                        "steps": [
                              {
                                    "op": "Incidence Cleanup",
                                    "count": "Cleanup across neighbor lists",
                                    "explanation": "Inspects incident edges."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T \u2208 \u0398(V + E)",
                                    "explanation": "Average-case time complexity is O(V + E)."
                              }
                        ]
                  }
            },
            "spaceComplexity": {
                  "bound": "O(1)",
                  "exactBound": "Theta(1) auxiliary",
                  "inputStorage": "Adjacency list: O(V + E).",
                  "auxiliaryStorage": "Loop indices: O(1).",
                  "totalSpace": "O(V + E); O(1) auxiliary.",
                  "notes": "Removes data in place without auxiliary graph allocations.",
                  "steps": [
                        {
                              "op": "In-Place Cleanup",
                              "count": "In-place edge filtering",
                              "explanation": "Reclaims edge memory."
                        },
                        {
                              "op": "Asymptotic Auxiliary Bound",
                              "count": "S_aux \u2208 \u0398(1)",
                              "explanation": "Auxiliary space is O(1)."
                        }
                  ]
            }
      },
      "remove-edge": {
            "name": "Remove Edge",
            "description": "Removes an undirected edge (u, v) from both adj[u] and adj[v].",
            "workedExample": {
                  "problem": "Remove edge (1, 2) from graph.",
                  "steps": [
                        "Filter 2 out of adj[1].",
                        "Filter 1 out of adj[2]."
                  ],
                  "result": "Edge (1, 2) removed."
            },
            "timeComplexity": {
                  "worst": {
                        "conditions": "Vertices u and v have high degree.",
                        "expression": "T = O(deg(u) + deg(v))",
                        "bound": "O(deg(u))",
                        "exactBound": "O(deg(u))",
                        "label": "O(deg(u))",
                        "steps": [
                              {
                                    "op": "Linear Scan of Neighbor Lists",
                                    "count": "Scan adj[u] and adj[v]",
                                    "explanation": "Must search through neighbor lists to locate and erase edge endpoints."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T \u2208 O(deg(u) + deg(v))",
                                    "explanation": "Time complexity is bounded by vertex degree: O(deg(u))."
                              }
                        ]
                  },
                  "best": {
                        "conditions": "Target edge is at index 0 of neighbor lists.",
                        "expression": "T = 2 checks",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "First Neighbor Match",
                                    "count": "Edge is first element",
                                    "explanation": "Immediate removal."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T \u2208 \u0398(1)",
                                    "explanation": "Best-case time complexity is constant: \u0398(1)."
                              }
                        ]
                  },
                  "average": {
                        "conditions": "Average degree graph.",
                        "expression": "T = O(deg(u))",
                        "bound": "Theta(deg(u))",
                        "exactBound": "Theta(deg(u))",
                        "label": "O(deg(u))",
                        "steps": [
                              {
                                    "op": "Neighbor Search",
                                    "count": "Scans half of neighbor list",
                                    "explanation": "Proportional to degree."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T \u2208 \u0398(deg(u))",
                                    "explanation": "Average-case time complexity is O(deg(u))."
                              }
                        ]
                  }
            },
            "spaceComplexity": {
                  "bound": "O(1)",
                  "exactBound": "Theta(1) auxiliary",
                  "inputStorage": "Adjacency list: O(V + E).",
                  "auxiliaryStorage": "0 extra space: O(1).",
                  "totalSpace": "O(V + E); O(1) auxiliary.",
                  "notes": "Removes integers from existing lists in place.",
                  "steps": [
                        {
                              "op": "In-Place Deletion",
                              "count": "Erase from vector",
                              "explanation": "Zero auxiliary memory."
                        },
                        {
                              "op": "Asymptotic Auxiliary Bound",
                              "count": "S_aux \u2208 \u0398(1)",
                              "explanation": "Auxiliary space is O(1)."
                        }
                  ]
            }
      },
      "bfs": {
            "name": "Breadth-First Search (BFS)",
            "description": "Explores graph level-by-level radiating outward from start vertex using a FIFO Queue. Finds shortest paths in unweighted graphs.",
            "workedExample": {
                  "problem": "BFS starting at vertex 1 in triangle graph with vertices {1, 2, 3}.",
                  "steps": [
                        "Mark 1 visited. Enqueue 1 into FIFO queue.",
                        "Dequeue 1. Inspect neighbors [2, 3]: mark both visited and enqueue both.",
                        "Dequeue 2: all neighbors already visited.",
                        "Dequeue 3: all neighbors already visited. Queue empty."
                  ],
                  "result": "Visited order: [1, 2, 3]. Found shortest paths in 1 hop."
            },
            "timeComplexity": {
                  "worst": {
                        "conditions": "Arbitrary connected unweighted graph represented as an adjacency list.",
                        "expression": "T(V, E) = O(V + E)",
                        "bound": "O(V + E)",
                        "exactBound": "Theta(V + E)",
                        "label": "O(V + E)",
                        "steps": [
                              {
                                    "op": "Vertex Queue Management",
                                    "count": "V enqueue and dequeue operations",
                                    "explanation": "Every reachable vertex is enqueued and dequeued exactly once: O(V)."
                              },
                              {
                                    "op": "Edge Traversal Work",
                                    "count": "Sum of degrees = 2E edge inspections",
                                    "explanation": "When vertex u is dequeued, all its incident edges in adj[u] are scanned. Sum over all vertices is 2E."
                              },
                              {
                                    "op": "Total Work Derivation",
                                    "count": "T(V, E) = c\u2081\u00b7V + c\u2082\u00b7E",
                                    "explanation": "Combining vertex visits and edge examinations yields strictly O(V + E)."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(V, E) \u2208 \u0398(V + E)",
                                    "explanation": "Worst-case time complexity is linear in graph size: \u0398(V + E)."
                              }
                        ]
                  },
                  "best": {
                        "conditions": "Isolated start vertex (degree 0) or goal vertex is the start vertex.",
                        "expression": "T = 1 vertex visit",
                        "bound": "Omega(1)",
                        "exactBound": "Omega(1)",
                        "label": "\u03a9(1)",
                        "steps": [
                              {
                                    "op": "Start Node Check",
                                    "count": "Queue pop start node",
                                    "explanation": "Zero edges to traverse."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T \u2208 \u03a9(1)",
                                    "explanation": "Best-case time complexity is constant: \u03a9(1)."
                              }
                        ]
                  },
                  "average": {
                        "conditions": "Arbitrary graph with V vertices and E edges.",
                        "expression": "T(V, E) = \u0398(V + E)",
                        "bound": "Theta(V + E)",
                        "exactBound": "Theta(V + E)",
                        "label": "O(V + E)",
                        "steps": [
                              {
                                    "op": "Systematic Exploration",
                                    "count": "All reachable V and E visited",
                                    "explanation": "BFS explores every edge and vertex in the component."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(V, E) \u2208 \u0398(V + E)",
                                    "explanation": "Average-case time complexity is linear: \u0398(V + E)."
                              }
                        ]
                  }
            },
            "spaceComplexity": {
                  "bound": "O(V)",
                  "exactBound": "O(V) auxiliary",
                  "inputStorage": "Adjacency list: O(V + E).",
                  "auxiliaryStorage": "Visited boolean set of size V + FIFO queue holding up to V vertices: O(V).",
                  "totalSpace": "O(V + E) input graph; O(V) auxiliary space.",
                  "notes": "In worst case (e.g. star graph where center connects to all nodes), queue holds V - 1 vertices.",
                  "steps": [
                        {
                              "op": "Visited Array Memory",
                              "count": "bool visited[V]",
                              "explanation": "Requires 1 bit/byte per vertex: O(V)."
                        },
                        {
                              "op": "FIFO Queue Memory",
                              "count": "queue<int> Q",
                              "explanation": "Holds at most V vertices at peak layer width: O(V)."
                        },
                        {
                              "op": "Asymptotic Auxiliary Bound",
                              "count": "S_aux(V, E) \u2208 \u0398(V)",
                              "explanation": "Auxiliary space complexity is strictly O(V)."
                        }
                  ]
            }
      },
      "dfs": {
            "name": "Depth-First Search (DFS)",
            "description": "Explores as deep as possible along each branch before backtracking using a Call Stack. Used for cycle detection and connectivity.",
            "workedExample": {
                  "problem": "DFS starting at vertex 1 in line graph 1 - 2 - 3.",
                  "steps": [
                        "Visit vertex 1. Mark visited. Recurse on neighbor 2.",
                        "Visit vertex 2. Mark visited. Recurse on neighbor 3.",
                        "Visit vertex 3. Mark visited. No unvisited neighbors. Backtrack to 2, then to 1."
                  ],
                  "result": "Visited order: [1, 2, 3]. Recursion depth = 3."
            },
            "timeComplexity": {
                  "worst": {
                        "conditions": "Arbitrary connected unweighted graph represented as an adjacency list.",
                        "expression": "T(V, E) = O(V + E)",
                        "bound": "O(V + E)",
                        "exactBound": "Theta(V + E)",
                        "label": "O(V + E)",
                        "steps": [
                              {
                                    "op": "Vertex Recursion Calls",
                                    "count": "V recursive invocations",
                                    "explanation": "Every reachable vertex is visited exactly once: O(V)."
                              },
                              {
                                    "op": "Edge Traversal Work",
                                    "count": "2E total edge inspections",
                                    "explanation": "Each directed edge (u, v) is checked once when visiting u."
                              },
                              {
                                    "op": "Total Work Derivation",
                                    "count": "T(V, E) = c\u2081\u00b7V + c\u2082\u00b7E",
                                    "explanation": "Summing vertex and edge loops yields O(V + E)."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(V, E) \u2208 \u0398(V + E)",
                                    "explanation": "Worst-case time complexity is linear: \u0398(V + E)."
                              }
                        ]
                  },
                  "best": {
                        "conditions": "Isolated start vertex (degree 0).",
                        "expression": "T = 1 visit",
                        "bound": "Omega(1)",
                        "exactBound": "Omega(1)",
                        "label": "\u03a9(1)",
                        "steps": [
                              {
                                    "op": "Isolated Vertex Check",
                                    "count": "1 call, 0 neighbors",
                                    "explanation": "Terminates immediately."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T \u2208 \u03a9(1)",
                                    "explanation": "Best-case time complexity is constant: \u03a9(1)."
                              }
                        ]
                  },
                  "average": {
                        "conditions": "Arbitrary graph with V vertices and E edges.",
                        "expression": "T(V, E) = \u0398(V + E)",
                        "bound": "Theta(V + E)",
                        "exactBound": "Theta(V + E)",
                        "label": "O(V + E)",
                        "steps": [
                              {
                                    "op": "Complete Component Walk",
                                    "count": "Visits all reachable vertices and incident edges",
                                    "explanation": "Deep branch exploration."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T(V, E) \u2208 \u0398(V + E)",
                                    "explanation": "Average-case time complexity is linear: \u0398(V + E)."
                              }
                        ]
                  }
            },
            "spaceComplexity": {
                  "bound": "O(V)",
                  "exactBound": "O(V) auxiliary",
                  "inputStorage": "Adjacency list: O(V + E).",
                  "auxiliaryStorage": "Visited set of size V + recursion call stack of depth up to V: O(V).",
                  "totalSpace": "O(V + E) input graph; O(V) auxiliary recursion stack space.",
                  "notes": "In worst case (a linear chain graph 1-2-3-...-V), recursion depth is V frames.",
                  "steps": [
                        {
                              "op": "Visited Array Memory",
                              "count": "bool visited[V]",
                              "explanation": "O(V) tracking array."
                        },
                        {
                              "op": "Call Stack Frame Depth",
                              "count": "Depth up to V frames",
                              "explanation": "Deep chain graph requires V stack frames."
                        },
                        {
                              "op": "Asymptotic Auxiliary Bound",
                              "count": "S_aux(V, E) \u2208 \u0398(V)",
                              "explanation": "Auxiliary space complexity is strictly O(V)."
                        }
                  ]
            }
      },
      "clear": {
            "name": "Clear",
            "description": "Removes all vertices and edges, resetting the graph to an empty state.",
            "workedExample": {
                  "problem": "Clear graph with 3 vertices and 2 edges.",
                  "steps": [
                        "Clear adjacency list map: adj.clear().",
                        "Clear vertex array: vertices.clear()."
                  ],
                  "result": "Graph becomes empty (0 vertices, 0 edges)."
            },
            "timeComplexity": {
                  "worst": {
                        "conditions": "Graph with V vertices and E edges.",
                        "expression": "T = O(V + E) deallocation",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Reset Graph Structure",
                                    "count": "vertices = []; adj = {};",
                                    "explanation": "Directly reinitializes containers to empty."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T \u2208 \u0398(1)",
                                    "explanation": "Strictly constant time: \u0398(1)."
                              }
                        ]
                  },
                  "best": {
                        "conditions": "Any graph.",
                        "expression": "T = 1",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Immediate Reset",
                                    "count": "Reset containers",
                                    "explanation": "Immediate operation."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T \u2208 \u0398(1)",
                                    "explanation": "Constant time: \u0398(1)."
                              }
                        ]
                  },
                  "average": {
                        "conditions": "Any graph.",
                        "expression": "T = \u0398(1)",
                        "bound": "Theta(1)",
                        "exactBound": "Theta(1)",
                        "label": "O(1)",
                        "steps": [
                              {
                                    "op": "Container Reset",
                                    "count": "Rebind to empty",
                                    "explanation": "Instant operation."
                              },
                              {
                                    "op": "Asymptotic Bound",
                                    "count": "T \u2208 \u0398(1)",
                                    "explanation": "Average-case time complexity is \u0398(1)."
                              }
                        ]
                  }
            },
            "spaceComplexity": {
                  "bound": "O(1)",
                  "exactBound": "Theta(1) auxiliary",
                  "inputStorage": "Reclaims all O(V + E) memory.",
                  "auxiliaryStorage": "0 extra space: O(1).",
                  "totalSpace": "O(1) after clear.",
                  "notes": "Resets memory to empty.",
                  "steps": [
                        {
                              "op": "Memory Reclamation",
                              "count": "Frees all vertices and edge lists",
                              "explanation": "Zero auxiliary memory."
                        },
                        {
                              "op": "Asymptotic Auxiliary Bound",
                              "count": "S_aux \u2208 \u0398(1)",
                              "explanation": "Auxiliary space is O(1)."
                        }
                  ]
            }
      }
},

    timeComplexity: {
      worst: {
        conditions: "Arbitrary connected unweighted graph represented as an adjacency list.",
        expression: "T(V, E) = O(V + E)",
        bound: "O(V + E)",
        exactBound: "Theta(V + E)",
        label: "O(V + E)",
        steps: [
          {
            op: "Representation Choice: Adjacency List",
            count: "adj[u] = list of neighbors",
            explanation: "Each vertex u has a list of incident edges. Scanning neighbors takes O(deg(u)) time.",
          },
          {
            op: "Vertex Exploration Work",
            count: "V vertices visited exactly once: O(V)",
            explanation: "A boolean `visited` array ensures each vertex is enqueued (BFS) or pushed (DFS) at most once.",
          },
          {
            op: "Edge Exploration Work",
            count: "∑_{u ∈ V} deg(u) = 2E edge endpoint inspections",
            explanation: "In an undirected graph, every edge {u, v} appears twice: once in adj[u] and once in adj[v].",
          },
          {
            op: "Combine Vertex and Edge Work",
            count: "T(V, E) = c₁·V + c₂·(2E)",
            explanation: "Total operations equal the work to visit all V vertices plus scanning all 2E edge endpoints.",
          },
          {
            op: "Asymptotic Bound",
            count: "T(V, E) ∈ Θ(V + E)",
            explanation: "Total time complexity is linear in the size of the graph: Θ(V + E). In dense graphs where E = O(V²), this is O(V²).",
          },
        ],
      },
      best: {
        conditions: "Graph with 1 isolated vertex, or target node reached immediately at root.",
        expression: "T(V, E) = O(1)",
        bound: "Omega(1)",
        exactBound: "Omega(1)",
        label: "O(1)",
        steps: [
          {
            op: "Single Vertex Processing",
            count: "1 vertex visit, 0 edge inspections",
            explanation: "Starting node is marked visited and dequeued immediately.",
          },
          {
            op: "Asymptotic Bound",
            count: "T(V, E) ∈ Ω(1)",
            explanation: "Best-case running time is constant: Ω(1).",
          },
        ],
      },
      average: {
        conditions: "Connected unweighted graph across connected components.",
        expression: "T(V, E) = O(V + E)",
        bound: "Theta(V + E)",
        exactBound: "Theta(V + E)",
        label: "O(V + E)",
        steps: [
          {
            op: "Complete Component Traversal",
            count: "All reachable vertices & edges explored",
            explanation: "BFS/DFS visits every reachable node and inspects all incident edges.",
          },
          {
            op: "Asymptotic Bound",
            count: "T(V, E) ∈ Θ(V + E)",
            explanation: "Average-case time complexity is Θ(V + E).",
          },
        ],
      },
    },

    spaceComplexity: {
      bound: "O(V + E)",
      exactBound: "O(V) auxiliary",
      inputStorage: "Adjacency list storing V vertices and 2E edge references: O(V + E).",
      auxiliaryStorage: "Visited boolean array of size V + BFS queue or DFS recursion stack of depth up to V: O(V).",
      totalSpace: "O(V + E) input representation; O(V) auxiliary space.",
      notes: "An adjacency matrix would consume O(V²) space regardless of edges. The adjacency list is space-optimal for sparse graphs.",
      steps: [
        {
          op: "Adjacency List Input Memory",
          count: "V vertex heads + 2E edge entries = O(V + E)",
          explanation: "Graph structure storage is proportional to vertices plus edges.",
        },
        {
          op: "Auxiliary Visited Tracking",
          count: "bool visited[V] = O(V)",
          explanation: "Tracking visited vertices requires a boolean array or set of size V.",
        },
        {
          op: "Auxiliary Frontier Storage",
          count: "BFS queue / DFS stack = up to V vertices",
          explanation: "In worst case (e.g. star graph), queue or recursion stack holds up to V vertices.",
        },
        {
          op: "Asymptotic Auxiliary Bound",
          count: "S_aux(V, E) ∈ Θ(V)",
          explanation: "Auxiliary space complexity is O(V). Total space including input is O(V + E).",
        },
      ],
    },
  },
};

// Ensure backward-compatible `derivation` string array on all case objects, operations, and spaceComplexity
for (const entry of Object.values(COMPLEXITY_ANALYSIS)) {
  for (const caseName of ["best", "average", "worst"]) {
    const c = entry.timeComplexity[caseName];
    if (c && Array.isArray(c.steps) && !c.derivation) {
      c.derivation = c.steps.map((s) => `${s.op}: ${s.count} — ${s.explanation}`);
    }
  }
  if (entry.spaceComplexity && Array.isArray(entry.spaceComplexity.steps) && !entry.spaceComplexity.derivation) {
    entry.spaceComplexity.derivation = entry.spaceComplexity.steps.map(
      (s) => `${s.op}: ${s.count} — ${s.explanation}`,
    );
  }

  // Populate operations derivations
  if (entry.operations) {
    for (const opData of Object.values(entry.operations)) {
      if (opData.timeComplexity) {
        for (const caseName of ["best", "average", "worst"]) {
          const c = opData.timeComplexity[caseName];
          if (c && Array.isArray(c.steps) && !c.derivation) {
            c.derivation = c.steps.map((s) => `${s.op}: ${s.count} — ${s.explanation}`);
          }
        }
      }
      if (opData.spaceComplexity && Array.isArray(opData.spaceComplexity.steps) && !opData.spaceComplexity.derivation) {
        opData.spaceComplexity.derivation = opData.spaceComplexity.steps.map(
          (s) => `${s.op}: ${s.count} — ${s.explanation}`,
        );
      }
    }
  }
}

// Helper to resolve operation-specific or concept-level analysis
export function resolveOperationAnalysis(analysis, operationKey) {
  if (!analysis) return null;
  if (operationKey && analysis.operations && analysis.operations[operationKey]) {
    const op = analysis.operations[operationKey];
    return {
      definition: analysis.definition,
      operationKey,
      operationName: op.name,
      operationDescription: op.description,
      workedExample: op.workedExample,
      timeComplexity: op.timeComplexity,
      spaceComplexity: op.spaceComplexity || analysis.spaceComplexity,
      liveMetrics: analysis.liveMetrics,
      inputSize: analysis.inputSize,
    };
  }

  return {
    definition: analysis.definition,
    operationKey: null,
    operationName: null,
    operationDescription: null,
    workedExample: analysis.workedExample,
    timeComplexity: analysis.timeComplexity,
    spaceComplexity: analysis.spaceComplexity,
    liveMetrics: analysis.liveMetrics,
    inputSize: analysis.inputSize,
  };
}

export function getComplexityAnalysis(id) {
  return COMPLEXITY_ANALYSIS[id] ?? null;
}

export function getAlgorithmIds() {
  return Object.keys(COMPLEXITY_ANALYSIS);
}

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

export function computeSpaceMetrics(analysis, inputSize) {
  if (!analysis) return null;

  const { spaceComplexity } = analysis;

  return {
    inputStorage: spaceComplexity.inputStorage,
    auxiliaryStorage: spaceComplexity.auxiliaryStorage,
    totalSpace: spaceComplexity.totalSpace,
    bound: spaceComplexity.bound,
    exactBound: spaceComplexity.exactBound,
    inputSize,
    notes: spaceComplexity.notes,
    steps: spaceComplexity.steps,
  };
}

export function evaluateGrowthModel(bound, n) {
  if (!n || n <= 0) return 0;
  const b = String(bound || "").toLowerCase();
  if (b.includes("1")) return 1;
  if (b.includes("log")) return Math.ceil(Math.log2(n));
  if (b.includes("n²") || b.includes("n^2")) return n * n;
  if (b.includes("v + e") || b.includes("v+e")) return n + Math.floor(n * 1.5);
  if (b.includes("n")) return n;
  return n;
}
