import ArrayBox from "./ArrayBox";

// Temporary fake step for testing
const fakeStep = {
  array: [10, 20, 30, 40, 50],
  comparingIndices: [2],
  foundIndex: null,
  comparisons: 3,
  message: "Comparing index 2 (value 30) with target 30 — match found.",
};

function ArrayVisualizer({ step = fakeStep }) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {step.array.map((value, index) => {
          let status = "default";

          if (step.comparingIndices.includes(index)) {
            status = "current";
          }

          if (index === step.foundIndex) {
            status = "found";
          }

          return (
            <ArrayBox key={index} value={value} index={index} status={status} />
          );
        })}
      </div>

      <p>{step.message}</p>

      <p>Comparisons: {step.comparisons}</p>
    </div>
  );
}

export default ArrayVisualizer;
