function linearSearch(array, target) {
    const steps = [];
    let comparisons = 0;

    if (array.length === 0) {
        steps.push({
            array: array,
            comparingIndices: [],
            foundIndex: null,
            comparisons: 0,
            message: "The array is empty."
        });

        return steps;
    }

    for (let i = 0; i < array.length; i++) {
        comparisons++;

        if (array[i] === target) {
            steps.push({
                array: array,
                comparingIndices: [i],
                foundIndex: i,
                comparisons: comparisons,
                message: `Comparing index ${i} (value ${array[i]}) with target ${target} — match found.`
            });

            return steps;
        }

        steps.push({
            array: array,
            comparingIndices: [i],
            foundIndex: null,
            comparisons: comparisons,
            message: `Comparing index ${i} (value ${array[i]}) with target ${target} — no match.`
        });
    }

    return steps;
}

console.log(linearSearch([10, 20, 30, 40, 50], 30));
console.log(linearSearch([10, 20, 30, 40, 50], 99));
