import "./ComplexityCounter.css";
import { counterLabel } from "../../algorithms/stepTypes";
import { resolveComplexity } from "./complexityHelpers";

function ComplexityCounter({ complexity, step, counters, operationKey }) {
  const resolved = resolveComplexity(complexity, operationKey);

  if (!resolved) {
    return null;
  }

  const counterKeys =
    counters && counters.length > 0 ? counters : ["comparisons"];

  return (
    <div className="complexity-counter">
      <h2>Time & Space Complexity</h2>

      {/* Theoretical Complexity */}
      <div className="complexity-grid">
        <div className="complexity-item">
          <span>Best Case</span>
          <strong>{resolved.best}</strong>
        </div>

        <div className="complexity-item">
          <span>Average Case</span>
          <strong>{resolved.average}</strong>
        </div>

        <div className="complexity-item">
          <span>Worst Case</span>
          <strong>{resolved.worst}</strong>
        </div>

        <div className="complexity-item">
          <span>Space</span>
          <strong>{resolved.space}</strong>
        </div>
      </div>

      {/* Live operation counters from the current step snapshot */}
      <div className="live-complexity">
        {counterKeys.map((key) => (
          <div key={key}>
            <span>{counterLabel(key)}</span>
            <strong>{step && step[key] != null ? step[key] : 0}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComplexityCounter;
