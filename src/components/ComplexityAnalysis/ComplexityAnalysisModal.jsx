import { useEffect, useRef, useState } from "react";
import "./ComplexityAnalysisModal.css";
import {
  getComplexityAnalysis,
  computeLiveMetrics,
  computeSpaceMetrics,
} from "../../algorithms/complexityAnalysis";
import { counterLabel } from "../../algorithms/stepTypes";
import { resolveComplexity } from "../../components/Visualizer/complexityHelpers";

const BOUND_LABELS = {
  Omega: "Ω (lower bound)",
  Theta: "Θ (tight bound)",
  O: "O (upper bound)",
};

function boundTypeLabel(bound) {
  const prefix = bound.split("(")[0];
  return BOUND_LABELS[prefix] || bound;
}

function focusableIn(container) {
  return [...container.querySelectorAll(
    'a[href], button:not([disabled]), select, input, [tabindex]:not([tabindex="-1"])',
  )].filter(
    (element) => element.offsetParent !== null || element === document.activeElement,
  );
}

// Formats a mathematical expression for display, showing step-by-step
// derivations as a list of lines.
function DerivationBlock({ derivation }) {
  return (
    <div className="derivation-block">
      {derivation.map((line, index) => (
        <div key={index} className="derivation-line">
          <span className="derivation-line-number">{index + 1}.</span>
          <span className="derivation-line-text">{line}</span>
        </div>
      ))}
    </div>
  );
}

// A single complexity case (Best / Average / Worst) with its derivation.
function ComplexityCase({ type, caseData }) {
  return (
    <section className={`complexity-case ${type}`}>
      <h3 className="case-title">{type}</h3>

      <p className="case-conditions">{caseData.conditions}</p>

      <p className="case-expression">
        <strong>Operation count:</strong> {caseData.expression}
      </p>

      <DerivationBlock derivation={caseData.derivation} />

      <div className="case-bound">
        <span className="case-bound-label">Resulting complexity:</span>
        <span className="case-bound-value">
          {caseData.label}
          <span className="case-bound-type">
            {" " + boundTypeLabel(caseData.bound)}
          </span>
        </span>
      </div>
    </section>
  );
}

// Live counters showing cumulative values up to the current step.
function LiveMetricsPanel({ liveValues, liveMetrics, stepDescription }) {
  return (
    <div className="live-metrics-panel">
      <h3>Live operation counters</h3>
      <p className="current-step">
        <strong>Current step:</strong> {stepDescription}
      </p>

      <div className="metrics-grid">
        {Object.entries(liveValues).map(([key, value]) => {
          const metric = liveMetrics.find((m) => m.key === key);
          if (!metric) return null;

          return (
            <div key={key} className="metric-card">
              <span className="metric-label">
                {counterLabel(metric.key)} ({metric.label})
              </span>
              <span className="metric-value" data-key={key}>
                {value}
              </span>
              <p className="metric-description">{metric.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Space complexity panel showing input vs auxiliary breakdown.
function SpaceComplexityPanel({ spaceMetrics }) {
  if (!spaceMetrics) {
    return (
      <div className="space-complexity-panel">
        <h3>Space Complexity</h3>
        <p className="space-note">
          Space analysis is not available for this algorithm.
        </p>
      </div>
    );
  }

  return (
    <div className="space-complexity-panel">
      <h3>Space Complexity</h3>

      <div className="space-breakdown">
        <div className="space-item">
          <span className="space-label">Input storage</span>
          <span className="space-value">{spaceMetrics.inputStorage}</span>
        </div>

        <div className="space-item">
          <span className="space-label">Auxiliary storage</span>
          <span className="space-value">{spaceMetrics.auxiliaryStorage}</span>
        </div>

        <div className="space-item">
          <span className="space-label">Total space</span>
          <span className="space-value">{spaceMetrics.totalSpace}</span>
        </div>

        <div className="space-item space-item-bound">
          <span className="space-label">Auxiliary space bound</span>
          <span className="space-value space-value-bound">
            {spaceMetrics.bound}
          </span>
        </div>
      </div>

      <p className="space-note">
        <strong>Input size n:</strong> {spaceMetrics.inputSize} element{spaceMetrics.inputSize === 1 ? "" : "s"}.
      </p>

      <h4>Derivation</h4>
      <DerivationBlock derivation={spaceMetrics.derivation} />

      <p className="space-note">
        <strong>Note:</strong> These are logical element counts, not bytes or
        exact RAM consumption. The visualizer stores immutable step snapshots
        for playback; that visualization history is separate from the
        algorithm's own memory usage.
      </p>
    </div>
  );
}

function ComplexityAnalysisModal({
  algorithmConfig,
  currentStepIndex,
  steps,
  params,
  onClose,
}) {
  const dialogRef = useRef(null);
  const [tab, setTab] = useState("time"); // "time" | "space"
  const [activeCase, setActiveCase] = useState("best"); // "best" | "average" | "worst"

  const analysis = getComplexityAnalysis(algorithmConfig.id);
  const inputSize = analysis
    ? analysis.inputSize(params)
    : 0;

  const live = computeLiveMetrics(steps, currentStepIndex, analysis?.liveMetrics ?? []);
  const spaceMetrics = analysis ? computeSpaceMetrics(analysis, inputSize) : null;

  const theoretical = resolveComplexity(algorithmConfig.complexity);

  // Move focus into the dialog on open and lock body scroll.
  useEffect(() => {
    dialogRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const handleBackdropMouseDown = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleDialogKeyDown = (event) => {
    if (event.key === "Escape") {
      onClose();
      return;
    }

    if (event.key !== "Tab" || !dialogRef.current) return;

    const focusable = focusableIn(dialogRef.current);
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const timeCases = [
    { id: "best", title: "Best Case", data: analysis?.timeComplexity.best },
    { id: "average", title: "Average Case", data: analysis?.timeComplexity.average },
    { id: "worst", title: "Worst Case", data: analysis?.timeComplexity.worst },
  ];

  return (
    <div className="complexity-backdrop" onMouseDown={handleBackdropMouseDown}>
      <div
        ref={dialogRef}
        className="complexity-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="complexity-title"
        tabIndex={-1}
        onKeyDown={handleDialogKeyDown}
      >
        <header className="complexity-header">
          <div className="complexity-heading">
            <p className="complexity-chip">
              {algorithmConfig.category.charAt(0).toUpperCase() +
                algorithmConfig.category.slice(1)}
            </p>
            <h1 id="complexity-title">{algorithmConfig.name}</h1>
            <p className="complexity-input-size">
              Input size n = {inputSize}{inputSize === 1 ? " element" : " elements"}
            </p>
          </div>

          <button
            type="button"
            className="complexity-close-button"
            onClick={onClose}
            aria-label="Close complexity analysis and return to visualizer"
          >
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M3 3L13 13M13 3L3 13"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>

        <nav className="complexity-tabs" aria-label="Complexity tabs">
          <button
            type="button"
            className={`complexity-tab ${tab === "time" ? "active" : ""}`}
            onClick={() => setTab("time")}
            aria-selected={tab === "time"}
          >
            Time Complexity
          </button>
          <button
            type="button"
            className={`complexity-tab ${tab === "space" ? "active" : ""}`}
            onClick={() => setTab("space")}
            aria-selected={tab === "space"}
          >
            Space Complexity
          </button>
        </nav>

        <div className="complexity-body">
          {tab === "time" && (
            <div className="time-section">
              <LiveMetricsPanel
                liveValues={live.values}
                liveMetrics={analysis?.liveMetrics ?? []}
                stepDescription={live.currentStepDescription}
              />

              <h2>Theoretical Time Complexity</h2>
              <p className="theory-note">
                The best / average / worst cases describe how the algorithm
                behaves on different inputs of size n. They are not interchangeable
                names for O / Omega / Theta — those notations describe upper,
                lower, and tight bounds respectively.
              </p>

              <div className="case-selector">
                {timeCases.map((tc) => (
                  <button
                    key={tc.id}
                    type="button"
                    className={`case-button ${
                      activeCase === tc.id ? "active" : ""
                    }`}
                    onClick={() => setActiveCase(tc.id)}
                    aria-pressed={activeCase === tc.id}
                  >
                    {tc.title}
                  </button>
                ))}
              </div>

              {activeCase && analysis ? (
                <ComplexityCase
                  type={activeCase.charAt(0).toUpperCase() + activeCase.slice(1)}
                  caseData={analysis.timeComplexity[activeCase]}
                />
              ) : null}

              <div className="live-vs-theoretical">
                <h3>Live run vs theoretical bounds</h3>
                <p className="comparison-note">
                  <strong>Observed so far:</strong>{" "}
                  {live.values.comparisons != null
                    ? `${live.values.comparisons} comparison${live.values.comparisons === 1 ? "" : "s"}`
                    : "n/a"}
                  {live.values.swaps != null
                    ? `, ${live.values.swaps} swap${live.values.swaps === 1 ? "" : "s"}`
                    : ""}
                  {live.values.operations != null
                    ? `, ${live.values.operations} operation${
                        live.values.operations === 1 ? "" : "s"
                      }`
                    : ""}
                  {live.values.nodesVisited != null
                    ? `, ${live.values.nodesVisited} node visit${
                        live.values.nodesVisited === 1 ? "" : "s"
                      }`
                    : ""}
                  .
                </p>
                <p className="comparison-note">
                  <strong>Theoretical (from registry):</strong> Best{" "}
                  {theoretical?.best}, Average {theoretical?.average}, Worst{" "}
                  {theoretical?.worst}. Space {theoretical?.space}.
                </p>
                <p className="comparison-note">
                  <strong>Distinction:</strong> The live counters show what this
                  particular execution has done up to the current step. The
                  theoretical bounds describe all possible inputs of size n —
                  they cannot be inferred from a single execution&rsquo;s count.
                </p>
              </div>
            </div>
          )}

          {tab === "space" && (
            <SpaceComplexityPanel
              spaceMetrics={spaceMetrics}
              algorithmTitle={algorithmConfig.name}
            />
          )}
        </div>

        <footer className="complexity-footer">
          <button
            type="button"
            className="complexity-back-button"
            onClick={onClose}
          >
            Back to visualizer
          </button>
        </footer>
      </div>
    </div>
  );
}

export default ComplexityAnalysisModal;
