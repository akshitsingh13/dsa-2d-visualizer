import "./ComplexityCounter.css";

function ComplexityCounter({ complexity, step }) {
  if (!complexity) {
    return null;
  }

  const comparisons = step ? step.comparisons : 0;

  return (
    <div className="complexity-counter">
      <h2>Time & Space Complexity</h2>

      {/* Theoretical Complexity */}
      <div className="complexity-grid">
        <div className="complexity-item">
          <span>Best Case</span>
          <strong>{complexity.best}</strong>
        </div>

        <div className="complexity-item">
          <span>Average Case</span>
          <strong>{complexity.average}</strong>
        </div>

        <div className="complexity-item">
          <span>Worst Case</span>
          <strong>{complexity.worst}</strong>
        </div>

        <div className="complexity-item">
          <span>Space</span>
          <strong>{complexity.space}</strong>
        </div>
      </div>

      {/* Live Complexity */}
      <div className="live-complexity">
        <div>
          <span>Current Comparisons</span>
          <strong>{comparisons}</strong>
        </div>

        <div>
          <span>Current Time Complexity</span>
          <strong>O({comparisons})</strong>
        </div>
      </div>
    </div>
  );
}

export default ComplexityCounter;
