import linearSearch from "./linearSearch";

// Registry contract — the single source of truth for every visualizer.
// Each entry must have:
//
//   {
//     name: "Binary Search",
//     category: "searching" | "sorting" | "data-structures",
//     visualizer: "array" | "bars" | "stack" | "queue" | "linkedList",
//     algorithm: fn,                 // pure step generator (no UI logic)
//     code: `...C++ source...`,      // shown in CodePanel (string, or
//                                    // { operation: code } / fn for
//                                    // operation-based structures)
//     inputs: { array: true, target: true, ... },
//                                    // drives ControlPanel. Supported keys:
//                                    // array, target, operation (string[] of
//                                    // options), value, index.
//                                    // Optional `operationFields` maps each
//                                    // operation to the extra fields it needs.
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
};

export default algorithmRegistry;
