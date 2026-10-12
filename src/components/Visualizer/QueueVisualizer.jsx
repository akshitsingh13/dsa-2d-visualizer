import "./QueueVisualizer.css";

function QueueVisualizer({ step, config, dataState }) {
  const items = step ? step.data : (dataState ?? []);
  const capacity = config?.capacity ?? 8;
  const highlightIndex = step?.highlightIndex;
  const highlight = step?.highlight;
  const lastIndex = items.length - 1;

  return (
    <div className="queue-visualizer">
      <div className="queue-size">
        Size: {items.length} / {capacity}
      </div>

      <div className="queue-row-wrap">
        <span className="queue-arrow">{"<-"} out</span>

        <div className="queue-row">
          {items.length === 0 && (
            <div className="queue-empty">
              Queue is empty. Enqueue a value to begin.
            </div>
          )}

          {items.map((value, index) => (
            <div key={index} className="queue-slot">
              <div
                className={`queue-box${highlightIndex === index && highlight ? ` ${highlight}` : ""}`}
              >
                {value}
              </div>

              <div className="queue-labels">
                {index === 0 && (
                  <span className="queue-label">FRONT</span>
                )}
                {index === lastIndex && (
                  <span className="queue-label">REAR</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <span className="queue-arrow">{"<-"} in</span>
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

export default QueueVisualizer;
