import "./BarVisualizer.css";

function BarVisualizer({ step }) {
  if (!step) {
    return (
      <div className="visualizer-empty">Run the algorithm to visualize it.</div>
    );
  }

  const values = step.array || [];
  const comparing = step.comparingIndices || [];
  const swapping = step.swappingIndices || [];
  const sorted = step.sortedIndices || [];

  // Scale bar heights to the value range so any numbers fit.
  const max = values.length === 0 ? 1 : Math.max(...values);
  const min = values.length === 0 ? 0 : Math.min(...values);
  const range = max - min || 1;
  const heightOf = (value) => 8 + ((value - min) / range) * 92;

  return (
    <div className="bars-visualizer">
      <div className="bars-row">
        {values.length === 0 && (
          <div className="bars-empty">The array is empty.</div>
        )}

        {values.map((value, index) => {
          let status = "default";

          if (sorted.includes(index)) {
            status = "sorted";
          }

          if (comparing.includes(index)) {
            status = "current";
          }

          if (swapping.includes(index)) {
            status = "swapping";
          }

          return (
            <div key={index} className="bar-column">
              <span className="bar-value">{value}</span>
              <div
                className={`bar ${status}`}
                style={{ height: `${heightOf(value)}%` }}
              />
            </div>
          );
        })}
      </div>

      <div
        className={`step-message${step.error ? " error" : ""}`}
        aria-live="polite"
      >
        {step.message}
      </div>
    </div>
  );
}

export default BarVisualizer;
