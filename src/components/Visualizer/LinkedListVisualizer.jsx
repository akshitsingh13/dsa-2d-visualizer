import { Fragment } from "react";
import { PointerLabel } from "./PointerLabels";
import "./LinkedListVisualizer.css";

function LinkedListVisualizer({ step, dataState }) {
  const list = step ? step.data : (dataState ?? []);

  const statusOf = (index) => {
    if (step?.foundIndex === index) return "found";
    if (step?.activeIndex === index) return "current";
    if (step?.currIndex === index) return "current";
    return "default";
  };

  return (
    <div className="ll-visualizer">
      <div className="ll-row">
        {list.length === 0 && (
          <div className="ll-empty">List is empty. Insert a value to begin.</div>
        )}

        {list.map((value, index) => (
          <Fragment key={index}>
            <div className="ll-slot">
              <span
                className={`ll-head-label${index === 0 ? " visible" : ""}`}
                aria-hidden="true"
              >
                HEAD
              </span>

              <div className={`ll-node ${statusOf(index)}`}>
                <span className="ll-data">{value}</span>
                <span className="ll-next">{"->"}</span>
              </div>

              <span className="ll-pointer-stack">
                {step?.currIndex === index && (
                  <PointerLabel label="curr" tone="accent" />
                )}
                {step?.prevIndex === index && (
                  <PointerLabel label="prev" tone="muted" />
                )}
              </span>
            </div>

            {index < list.length - 1 && (
              <span className="ll-link" aria-hidden="true">
                {"->"}
              </span>
            )}
          </Fragment>
        ))}

        {list.length > 0 && (
          <div className="ll-slot">
            <span className="ll-head-label" aria-hidden="true">
              {"\u00a0"}
            </span>
            <div className="ll-null">null</div>
            <span className="ll-pointer-stack" />
          </div>
        )}
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

export default LinkedListVisualizer;
