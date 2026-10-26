// Named code-line constants for the C++ source below:
//
//  1  void bubbleSort(vector<int>& arr) {
//  2      int n = arr.size();
//  3      for (int i = 0; i < n - 1; i++) {
//  4          bool swapped = false;
//  5          for (int j = 0; j < n - i - 1; j++) {
//  6              if (arr[j] > arr[j + 1]) {
//  7                  swap(arr[j], arr[j + 1]);
//  8                  swapped = true;
//  9              }
// 10          }
// 11          if (!swapped) {
// 12              break;
// 13          }
// 14      }
// 15  }
export const LINES = {
  FUNC: 1,
  OUTER_LOOP: 3,
  SWAPPED_INIT: 4,
  INNER_LOOP: 5,
  COMPARE: 6,
  SWAP: 7,
  SWAPPED_SET: 8,
  EARLY_CHECK: 11,
  EARLY_BREAK: 12,
};

export const BUBBLE_SORT_CODE = `void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) {
            break;
        }
    }
}`;

/**
 * Pure step generator for Bubble Sort with early-exit optimization.
 * Steps through the array, comparing adjacent elements and swapping them if out of order.
 * If a pass completes with 0 swaps, the array is already sorted and terminates immediately.
 *
 * Time Complexity:
 *   - Best Case: Ω(n) / Θ(n) when array is already sorted (1 pass, 0 swaps).
 *   - Average Case: Θ(n²) on arbitrary random inputs.
 *   - Worst Case: O(n²) / Θ(n²) when array is reverse sorted (n(n - 1) / 2 comparisons and swaps).
 * Auxiliary Space:
 *   - O(1) in-place sorting modifying elements in-place with scalar registers.
 *
 * @param {number[]} array - List of numeric values to sort (max length 12 recommended for visualization).
 * @returns {Array<object>} Sequence of immutable step snapshots for animation.
 */
function bubbleSort(array) {
  const steps = [];
  const data = [...array];
  let comparisons = 0;
  let swaps = 0;
  const sorted = new Array(data.length).fill(false);

  const sortedIndices = () => {
    const indices = [];
    for (let k = 0; k < sorted.length; k++) {
      if (sorted[k]) indices.push(k);
    }
    return indices;
  };

  const snapshot = (fields) => ({
    array: [...data],
    comparingIndices: [],
    swappingIndices: [],
    sortedIndices: sortedIndices(),
    comparisons,
    swaps,
    ...fields,
  });

  // Empty array
  if (data.length === 0) {
    steps.push(
      snapshot({
        codeLine: LINES.FUNC,
        message: "The array is empty. Nothing to sort.",
      }),
    );

    return steps;
  }

  // Single element
  if (data.length === 1) {
    sorted[0] = true;
    steps.push(
      snapshot({
        codeLine: LINES.FUNC,
        message: "A single element is already sorted.",
      }),
    );

    return steps;
  }

  for (let i = 0; i < data.length - 1; i++) {
    let swapped = false;
    const lastUnsorted = data.length - 1 - i;

    steps.push(
      snapshot({
        codeLine: LINES.OUTER_LOOP,
        message: `Pass ${i + 1}: bubbling the largest remaining value to index ${lastUnsorted}.`,
      }),
    );

    for (let j = 0; j < data.length - i - 1; j++) {
      comparisons++;

      // Compare adjacent pair
      steps.push(
        snapshot({
          comparingIndices: [j, j + 1],
          codeLine: LINES.COMPARE,
          message: `Pass ${i + 1}: comparing indices ${j} and ${j + 1} (${data[j]} and ${data[j + 1]}).`,
        }),
      );

      if (data[j] > data[j + 1]) {
        const bigger = data[j];
        const smaller = data[j + 1];
        const temp = data[j];
        data[j] = data[j + 1];
        data[j + 1] = temp;
        swaps++;
        swapped = true;

        // Distinct swap step
        steps.push(
          snapshot({
            swappingIndices: [j, j + 1],
            codeLine: LINES.SWAP,
            message: `${bigger} > ${smaller} — swapping indices ${j} and ${j + 1}.`,
          }),
        );
      }
    }

    // The last element of this pass reached its final position.
    sorted[lastUnsorted] = true;

    // Early exit: no swaps means the array is already sorted.
    if (!swapped) {
      for (let k = 0; k < data.length; k++) sorted[k] = true;
      steps.push(
        snapshot({
          codeLine: LINES.EARLY_BREAK,
          message: `No swaps in pass ${i + 1} — the array is already sorted.`,
        }),
      );

      return steps;
    }

    steps.push(
      snapshot({
        codeLine: LINES.EARLY_CHECK,
        message: `Pass ${i + 1} complete. ${data[lastUnsorted]} is in its final position at index ${lastUnsorted}.`,
      }),
    );
  }

  for (let k = 0; k < data.length; k++) sorted[k] = true;
  steps.push(
    snapshot({
      codeLine: LINES.OUTER_LOOP,
      message: "All passes complete. Array is sorted.",
    }),
  );

  return steps;
}

export default bubbleSort;
