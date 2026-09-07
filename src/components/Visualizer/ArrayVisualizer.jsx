import ArrayBox from "./ArrayBox";
import "./ArrayVisualizer.css";

function ArrayVisualizer({ step }) {
  if (!step) {
    return (
      <div className="visualizer-empty">Run the algorithm to visualize it.</div>
    );
  }

  return (
    <div className="array-visualizer">
      <div className="array-row">
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

      <div className="step-message">{step.message}</div>

      <div className="comparison-count">Comparisons: {step.comparisons}</div>
    </div>
  );
}

export default ArrayVisualizer;
