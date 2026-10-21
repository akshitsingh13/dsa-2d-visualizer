import "./StackVisualizer.css";

function StackVisualizer({ step, config, dataState }) {
  const items = step ? step.data : (dataState ?? []);
  const capacity = config?.capacity ?? 8;
  const highlightIndex = step?.highlightIndex;
  const highlight = step?.highlight;
  const topIndex = items.length - 1;

  const ordered = items
    .map((value, index) => ({ value, index }))
    .reverse();

  return (
    <div className="stack-visualizer">
      <div className="stack-size">
        Size: {items.length} / {capacity}
      </div>

      <div className="stack-column">
        {ordered.length === 0 && (
          <div className="stack-empty">Stack is empty. Push a value to begin.</div>
        )}

        {ordered.map(({ value, index }) => (
          <div key={index} className="stack-row">
            <div
              className={`stack-box${highlightIndex === index && highlight ? ` ${highlight}` : ""}`}
            >
              {value}
            </div>

            {index === topIndex && (
              <span className="stack-top-label">{"<-"} TOP</span>
            )}
          </div>
        ))}
      </div>

      <div
        className={`step-message${step?.error ? " error" : ""}`}
        aria-live="polite"
      >
        {step ? step.message : "Choose an operation and press Run Algorithm."}
      </div>
    </div>
  );
}

export default StackVisualizer;
