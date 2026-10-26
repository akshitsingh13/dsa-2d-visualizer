// Named code-line constants for the C++ source below:
//
//  1  int binarySearch(vector<int> arr, int target) {
//  2      int low = 0;
//  3      int high = arr.size() - 1;
//  4
//  5      while (low <= high) {
//  6          int mid = low + (high - low) / 2;
//  7          if (arr[mid] == target) {
//  8              return mid;
//  9          } else if (arr[mid] < target) {
// 10              low = mid + 1;
// 11          } else {
// 12              high = mid - 1;
// 13          }
// 14      }
// 15
// 16      return -1;
// 17  }
export const LINES = {
  FUNC: 1,
  INIT_LOW: 2,
  INIT_HIGH: 3,
  WHILE: 5,
  MID: 6,
  COMPARE: 7,
  RETURN_FOUND: 8,
  GO_RIGHT: 9,
  NARROW_RIGHT: 10,
  NARROW_LEFT: 12,
  RETURN_NOT_FOUND: 16,
};

export const BINARY_SEARCH_CODE = `int binarySearch(vector<int> arr, int target) {
    int low = 0;
    int high = arr.size() - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return -1;
}`;

/**
 * Pure step generator for Binary Search.
 * Repeatedly divides a sorted search range in half, comparing the midpoint with the target.
 *
 * Preconditions:
 *   - Input array MUST be sorted in ascending order (validated by ControlPanel).
 *
 * Time Complexity:
 *   - Best Case: Ω(1) / Θ(1) when target is at the initial middle index.
 *   - Average Case: Θ(log n) expected steps.
 *   - Worst Case: O(log n) / Θ(log n) when target requires halving down to 1 element or is absent.
 * Auxiliary Space:
 *   - O(1) iterative execution with low, high, mid pointers.
 *
 * @param {number[]} array - Sorted array in ascending order.
 * @param {number} target - Value to find.
 * @returns {Array<object>} Sequence of immutable step snapshots for animation.
 */
function binarySearch(array, target) {
  const steps = [];
  const data = [...array];
  let comparisons = 0;

  const snapshot = (fields) => ({
    array: [...data],
    low: null,
    high: null,
    mid: null,
    comparingIndices: [],
    foundIndex: null,
    comparisons,
    ...fields,
  });

  // Empty array
  if (data.length === 0) {
    steps.push(
      snapshot({
        low: 0,
        high: -1,
        codeLine: LINES.RETURN_NOT_FOUND,
        message: `The array is empty. Target ${target} not found.`,
      }),
    );

    return steps;
  }

  let low = 0;
  let high = data.length - 1;

  // Initial range
  steps.push(
    snapshot({
      low,
      high,
      codeLine: LINES.WHILE,
      message: `Starting binary search for ${target}. Range: low = ${low}, high = ${high}.`,
    }),
  );

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    // Compute mid
    steps.push(
      snapshot({
        low,
        high,
        mid,
        comparingIndices: [mid],
        codeLine: LINES.MID,
        message: `mid = (${low} + ${high}) / 2 = ${mid}. Checking value ${data[mid]}.`,
      }),
    );

    comparisons++;

    // Found
    if (data[mid] === target) {
      steps.push(
        snapshot({
          low,
          high,
          mid,
          comparingIndices: [mid],
          foundIndex: mid,
          codeLine: LINES.RETURN_FOUND,
          message: `Found target ${target} at index ${mid}.`,
        }),
      );

      return steps;
    }

    // Compare arr[mid] with target
    if (data[mid] < target) {
      steps.push(
        snapshot({
          low,
          high,
          mid,
          comparingIndices: [mid],
          codeLine: LINES.COMPARE,
          message: `Comparing arr[${mid}] = ${data[mid]} with target ${target} — ${data[mid]} < ${target}.`,
        }),
      );

      const discardedFrom = low;
      const discardedTo = mid;
      low = mid + 1;

      // Narrow right: discard the left half
      steps.push(
        snapshot({
          low,
          high,
          codeLine: LINES.NARROW_RIGHT,
          message:
            `Target is greater — discarding left half ` +
            `[${discardedFrom}..${discardedTo}]. New range: low = ${low}, high = ${high}.`,
        }),
      );
    } else {
      steps.push(
        snapshot({
          low,
          high,
          mid,
          comparingIndices: [mid],
          codeLine: LINES.COMPARE,
          message: `Comparing arr[${mid}] = ${data[mid]} with target ${target} — ${data[mid]} > ${target}.`,
        }),
      );

      const discardedFrom = mid;
      const discardedTo = high;
      high = mid - 1;

      // Narrow left: discard the right half
      steps.push(
        snapshot({
          low,
          high,
          codeLine: LINES.NARROW_LEFT,
          message:
            `Target is smaller — discarding right half ` +
            `[${discardedFrom}..${discardedTo}]. New range: low = ${low}, high = ${high}.`,
        }),
      );
    }
  }

  // Range exhausted: final step with a clear result message.
  steps.push(
    snapshot({
      low,
      high,
      codeLine: LINES.RETURN_NOT_FOUND,
      message: `Target ${target} not found. Range exhausted (low = ${low}, high = ${high}).`,
    }),
  );

  return steps;
}

export default binarySearch;
