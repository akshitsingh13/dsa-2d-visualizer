import ArrayBox from "./ArrayBox";
import PointerLabels from "./PointerLabels";
import "./ArrayVisualizer.css";

/**
 * ArrayVisualizer component.
 * Renders an indexed horizontal array of elements along with search boundary pointers (L, M, H)
 * and active comparison highlights during Linear Search and Binary Search execution.
 *
 * @param {Object} props
 * @param {import('../../algorithms/linearSearch.js').LinearSearchStep | import('../../algorithms/binarySearch.js').BinarySearchStep} props.step
 * @returns {JSX.Element}
 */
function ArrayVisualizer({ step }) {
  if (!step) {
    return (
      <div className="visualizer-empty">Run the algorithm to visualize it.</div>
    );
  }

  const comparing = step.comparingIndices || [];
  const hasRange = step.low != null && step.high != null;

  const pointers = [];

  if (step.low != null) {
    pointers.push({ index: step.low, label: "L", tone: "muted" });
  }

  if (step.mid != null) {
    pointers.push({ index: step.mid, label: "M", tone: "accent" });
  }

  if (step.high != null) {
    pointers.push({ index: step.high, label: "H", tone: "muted" });
  }

  return (
    <div className="array-visualizer">
      <div className="array-row">
        {step.array.map((value, index) => {
          let status = "default";

          if (hasRange && (index < step.low || index > step.high)) {
            status = "eliminated";
          }

          if (comparing.includes(index)) {
            status = "current";
          }

          if (index === step.foundIndex) {
            status = "found";
          }

          return <ArrayBox key={index} value={value} status={status} />;
        })}
      </div>

      {pointers.length > 0 && (
        <PointerLabels pointers={pointers} length={step.array.length} />
      )}

      <div
        className={`step-message${step.error ? " error" : ""}`}
        aria-live="polite"
      >
        {step.message}
      </div>

      {step.comparisons != null && (
        <div className="comparison-count">Comparisons: {step.comparisons}</div>
      )}
    </div>
  );
}

export default ArrayVisualizer;
