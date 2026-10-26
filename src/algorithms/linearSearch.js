// Named code-line constants for the C++ source stored in the registry entry.
// The registry code for Linear Search is:
//
//  1  vector<int> linearSearch(vector<int> arr, int target) {
//  2      vector<int> result;
//  3
//  4      for (int i = 0; i < arr.size(); i++) {
//  5          if (arr[i] == target) {
//  6              result.push_back(i);
//  7              return result;
//  8          }
//  9      }
// 10
// 11      return result;
// 12  }
//
// Use these names instead of magic numbers so editing the code string cannot
// silently break line highlighting.
export const LINES = {
  FUNC: 1,
  FOR_LOOP: 4,
  COMPARE: 5,
  PUSH_RESULT: 6,
  RETURN_FOUND: 7,
  RETURN_EMPTY: 11,
};

/**
 * Pure step generator for Linear Search.
 * Iterates through the collection one element at a time, comparing against the target.
 *
 * Time Complexity:
 *   - Best Case: Ω(1) / Θ(1) when target is at index 0.
 *   - Average Case: Θ(n) when target is uniformly distributed.
 *   - Worst Case: O(n) / Θ(n) when target is at the end or absent.
 * Auxiliary Space:
 *   - O(1) iterative scan using constant scalar variables.
 *
 * @param {number[]} array - Input list of numbers (sorted or unsorted).
 * @param {number} target - Value to find.
 * @returns {Array<object>} Sequence of immutable step snapshots for animation.
 */
function linearSearch(array, target) {
  const steps = [];
  let comparisons = 0;
  const snapshot = [...array];

  // Empty array: single step with a clear result message.
  if (snapshot.length === 0) {
    steps.push({
      array: [...snapshot],
      comparingIndices: [],
      foundIndex: null,
      comparisons: 0,
      codeLine: LINES.RETURN_EMPTY,
      message: `The array is empty. Target ${target} not found. Returned empty result.`,
    });

    return steps;
  }

  // Traverse the array
  for (let i = 0; i < snapshot.length; i++) {
    comparisons++;

    // Compare current element with target
    if (snapshot[i] === target) {
      steps.push({
        array: [...snapshot],
        comparingIndices: [i],
        foundIndex: i,
        comparisons,
        codeLine: LINES.RETURN_FOUND,
        message: `Found target ${target} at index ${i}.`,
      });

      return steps;
    }

    // Current element does not match
    steps.push({
      array: [...snapshot],
      comparingIndices: [i],
      foundIndex: null,
      comparisons,
      codeLine: LINES.COMPARE,
      message: `Comparing index ${i} (value ${snapshot[i]}) with target ${target} — no match.`,
    });
  }

  // Target never matched: final step with a clear result message.
  steps.push({
    array: [...snapshot],
    comparingIndices: [],
    foundIndex: null,
    comparisons,
    codeLine: LINES.RETURN_EMPTY,
    message: `Target ${target} not found. Returned empty result.`,
  });

  return steps;
}

export default linearSearch;
