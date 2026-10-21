import ArrayBox from "../../Visualizer/ArrayBox";
import PointerLabels from "../../Visualizer/PointerLabels";
// Reuse the exact box/pointer look of the array visualizer.
import "../../Visualizer/ArrayVisualizer.css";
import "../../Visualizer/PointerLabels.css";
import { renderRichText } from "./RichText";
import "./Trace.css";

function TraceStep({ step, stepNumber }) {
  const pointers = (step.pointers || []).map((pointer, index) => ({
    index: pointer.index ?? index,
    label: pointer.label,
    tone: pointer.tone || "muted",
  }));

  return (
    <li className="theory-trace-step">
      <div className="theory-trace-boxes">
        <div className="theory-trace-row">
          {step.cells.length === 0 ? (
            <span className="theory-trace-empty">empty</span>
          ) : (
            step.cells.map((cell, index) => (
              <ArrayBox key={index} value={cell.value} status={cell.tone || "default"} />
            ))
          )}
        </div>

        {pointers.length > 0 ? (
          <PointerLabels pointers={pointers} length={step.cells.length} />
        ) : null}
      </div>

      <p className="theory-trace-explanation">
        <span className="theory-trace-number">Step {stepNumber}. </span>
        {renderRichText(step.explanation)}
      </p>
    </li>
  );
}

function Trace({ block }) {
  return (
    <div className="theory-trace">
      {block.title ? <h3 className="theory-trace-title">{block.title}</h3> : null}

      <ol className="theory-trace-steps">
        {block.steps.map((step, index) => (
          <TraceStep key={index} step={step} stepNumber={index + 1} />
        ))}
      </ol>
    </div>
  );
}

export default Trace;
