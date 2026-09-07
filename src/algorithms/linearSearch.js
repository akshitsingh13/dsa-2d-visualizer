function linearSearch(array, target) {
  const steps = [];
  let comparisons = 0;

  // Empty array
  if (array.length === 0) {
    steps.push({
      array: [...array],
      comparingIndices: [],
      foundIndex: null,
      comparisons: 0,
      codeLine: 4,
      message: "The array is empty.",
    });

    return steps;
  }

  // Traverse the array
  for (let i = 0; i < array.length; i++) {
    comparisons++;

    // Compare current element with target
    if (array[i] === target) {
      steps.push({
        array: [...array],
        comparingIndices: [i],
        foundIndex: i,
        comparisons,
        codeLine: 5,
        message: `Comparing index ${i} (value ${array[i]}) with target ${target} — match found.`,
      });

      return steps;
    }

    // Current element does not match
    steps.push({
      array: [...array],
      comparingIndices: [i],
      foundIndex: null,
      comparisons,
      codeLine: 5,
      message: `Comparing index ${i} (value ${array[i]}) with target ${target} — no match.`,
    });
  }

  return steps;
}

export default linearSearch;
