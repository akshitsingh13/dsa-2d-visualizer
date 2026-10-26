import { useEffect, useRef, useState } from "react";
import "./ComplexityAnalysisModal.css";
import {
  getComplexityAnalysis,
  resolveOperationAnalysis,
  computeLiveMetrics,
  computeSpaceMetrics,
} from "../../algorithms/complexityAnalysis";
import { counterLabel } from "../../algorithms/stepTypes";

const BOUND_LABELS = {
  Omega: "Ω (lower bound)",
  Theta: "Θ (tight bound)",
  O: "O (upper bound)",
};

function boundTypeLabel(bound) {
  if (!bound) return "";
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

// Educational Overview: Concept Definition and Active Operation
function EducationalOverview({ definition, operationName, operationDescription }) {
  if (!definition && !operationDescription) return null;

  return (
    <div className="complexity-concept-overview">
      {definition && (
        <div className="concept-definition-box">
          <span className="concept-definition-tag">Concept Definition</span>
          <p className="concept-definition-text">{definition}</p>
        </div>
      )}
      {operationName && operationDescription && (
        <div className="operation-definition-box">
          <div className="operation-header-line">
            <span className="operation-tag">Operation Being Analysed</span>
            <strong className="operation-name-text">{operationName}</strong>
          </div>
          <p className="operation-description-text">{operationDescription}</p>
        </div>
      )}
    </div>
  );
}

// Worked Example Trace
function WorkedExampleBox({ workedExample }) {
  if (!workedExample) return null;

  return (
    <div className="complexity-worked-example-box">
      <div className="example-header">
        <span className="example-badge">Worked Example Walkthrough</span>
        <strong className="example-problem-text">{workedExample.problem}</strong>
      </div>
      {Array.isArray(workedExample.steps) && workedExample.steps.length > 0 && (
        <ol className="example-steps-list">
          {workedExample.steps.map((st, i) => (
            <li key={i} className="example-step-item">
              <span className="step-num">{i + 1}.</span>
              <span className="step-text">{st}</span>
            </li>
          ))}
        </ol>
      )}
      {workedExample.result && (
        <div className="example-result-line">
          <strong>Outcome:</strong> {workedExample.result}
        </div>
      )}
    </div>
  );
}

// Interactive Derivation Stepper with Next/Prev and "Show Full Derivation" toggle
function DerivationStepper({ steps, caseTitle, bound, exactBound }) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [showFull, setShowFull] = useState(false);
  const [prevCase, setPrevCase] = useState(caseTitle);

  // Adjust state during render when props change (idiomatic React pattern)
  if (prevCase !== caseTitle) {
    setPrevCase(caseTitle);
    setCurrentStepIdx(0);
  }

  if (!steps || steps.length === 0) {
    return <p className="derivation-empty">No derivation steps available.</p>;
  }

  const activeStep = steps[currentStepIdx] || steps[0];

  return (
    <div className="derivation-stepper-box">
      <div className="derivation-stepper-header">
        <div className="stepper-title-area">
          <h3>Mathematical Derivation</h3>
          <span className="stepper-progress">
            {showFull ? "Full Calculation View" : `Step ${currentStepIdx + 1} of ${steps.length}`}
          </span>
        </div>

        <div className="stepper-mode-controls">
          <button
            type="button"
            className="toggle-view-btn"
            onClick={() => setShowFull(!showFull)}
            aria-pressed={showFull}
          >
            {showFull ? "Step-by-Step Mode" : "Show Full Derivation"}
          </button>
        </div>
      </div>

      {!showFull ? (
        /* Single Step Interactive Viewer */
        <div className="step-interactive-card">
          <div className="step-card-header">
            <span className="step-badge">Step {currentStepIdx + 1}</span>
            <h4 className="step-operation-title">{activeStep.op}</h4>
          </div>

          <div className="step-math-highlight">
            <span className="math-badge">Mathematical Expression / Count</span>
            <code className="math-formula">{activeStep.count}</code>
          </div>

          <p className="step-explanation-text">{activeStep.explanation}</p>

          <div className="step-navigation-bar">
            <button
              type="button"
              className="step-nav-btn"
              onClick={() => setCurrentStepIdx((prev) => Math.max(0, prev - 1))}
              disabled={currentStepIdx === 0}
            >
              &larr; Previous Step
            </button>

            <div className="step-indicators" aria-hidden="true">
              {steps.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`step-dot ${idx === currentStepIdx ? "active" : ""}`}
                  onClick={() => setCurrentStepIdx(idx)}
                  title={`Go to step ${idx + 1}`}
                  aria-label={`Go to step ${idx + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              className="step-nav-btn primary"
              onClick={() =>
                setCurrentStepIdx((prev) => Math.min(steps.length - 1, prev + 1))
              }
              disabled={currentStepIdx === steps.length - 1}
            >
              Next Step &rarr;
            </button>
          </div>
        </div>
      ) : (
        /* Full Derivation Sequential View */
        <div className="full-derivation-list">
          {steps.map((step, idx) => (
            <div key={idx} className="full-step-item">
              <div className="full-step-number">{idx + 1}</div>
              <div className="full-step-content">
                <div className="full-step-top">
                  <span className="full-step-title">{step.op}</span>
                  <code className="full-step-formula">{step.count}</code>
                </div>
                <p className="full-step-desc">{step.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="derivation-conclusion-banner">
        <span className="conclusion-label">Final Asymptotic Bound:</span>
        <div className="conclusion-bounds">
          <span className="main-bound">{bound}</span>
          {exactBound && <span className="exact-bound">{boundTypeLabel(exactBound)}</span>}
        </div>
      </div>
    </div>
  );
}

// Live execution measurements panel (supporting verification)
function LiveExecutionVerification({
  liveValues,
  liveMetrics,
  stepDescription,
  inputSize,
  hasExecuted,
}) {
  return (
    <div className="live-verification-panel">
      <div className="verification-header">
        <div>
          <h4>Live Execution Verification</h4>
          <span className="verification-subtext">
            Compare actual runtime measurements of this run with the mathematical model
          </span>
        </div>
        <div className="input-size-pill">
          Input size n = <strong>{inputSize}</strong>
        </div>
      </div>

      {!hasExecuted ? (
        <div className="empty-execution-state">
          <p>
            No algorithm execution steps yet. Run the algorithm in the visualizer to see live operation counts.
          </p>
        </div>
      ) : (
        <>
          <p className="active-step-msg">
            <strong>Current state:</strong> {stepDescription || "Running"}
          </p>

          <div className="live-counters-grid">
            {Object.entries(liveValues).map(([key, value]) => {
              const metric = liveMetrics.find((m) => m.key === key);
              if (!metric) return null;

              return (
                <div key={key} className="counter-chip">
                  <div className="counter-top">
                    <span className="counter-name">{counterLabel(metric.key)}</span>
                    <span className="counter-val" data-key={key}>
                      {value}
                    </span>
                  </div>
                  <span className="counter-sub">{metric.description}</span>
                </div>
              );
            })}
          </div>

          <p className="verification-distinction-note">
            * <strong>Notice:</strong> The counters above report only the current single execution. Theoretical bounds describe all possible inputs as n &rarr; &infin; and cannot be inferred from a single execution.
          </p>
        </>
      )}
    </div>
  );
}

/**
 * ComplexityAnalysisModal Component.
 *
 * Full-featured educational modal dialog presenting mathematical step-by-step
 * derivations for time and auxiliary-space complexity.
 *
 * Features:
 *  - Concept definition and selected operation summary.
 *  - Concrete worked example walkthrough.
 *  - Interactive time complexity stepper (Worst / Best / Average cases).
 *  - Full derivation sequence view toggle.
 *  - Input vs. Auxiliary space breakdown.
 *  - Live execution measurements verification.
 *  - Accessible keyboard navigation (Tab loop, Esc to close).
 */
function ComplexityAnalysisModal({
  algorithmConfig,
  currentStepIndex,
  steps,
  params,
  activeOperation,
  currentData,
  onClose,
}) {
  const dialogRef = useRef(null);
  const [tab, setTab] = useState("time"); // "time" | "space"
  const [activeCase, setActiveCase] = useState("worst"); // "worst" | "best" | "average"

  const baseAnalysis = getComplexityAnalysis(algorithmConfig.id);
  // Resolve operation-specific analysis if activeOperation is present, or fallback to concept
  const analysis = resolveOperationAnalysis(baseAnalysis, activeOperation);

  // Compute actual visualizer input size honestly from currentData or params
  const inputSize = baseAnalysis ? baseAnalysis.inputSize(params, currentData) : 0;

  const hasExecuted = Array.isArray(steps) && steps.length > 0;
  const live = computeLiveMetrics(steps, currentStepIndex, analysis?.liveMetrics ?? []);
  const spaceMetrics = analysis?.spaceComplexity
    ? computeSpaceMetrics({ spaceComplexity: analysis.spaceComplexity }, inputSize)
    : (baseAnalysis ? computeSpaceMetrics(baseAnalysis, inputSize) : null);

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
    { id: "worst", title: "Worst Case", data: analysis?.timeComplexity?.worst },
    { id: "best", title: "Best Case", data: analysis?.timeComplexity?.best },
    { id: "average", title: "Average Case", data: analysis?.timeComplexity?.average },
  ];

  const selectedCaseData = analysis?.timeComplexity?.[activeCase];

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
        {/* Header */}
        <header className="complexity-header">
          <div className="complexity-heading">
            <div className="badge-row">
              <span className="complexity-chip">
                {algorithmConfig.category ? algorithmConfig.category.replace("-", " ") : "Concept"}
              </span>
              {activeOperation && (
                <span className="operation-chip">
                  Operation: <strong>{analysis?.operationName || activeOperation}</strong>
                </span>
              )}
            </div>
            <h1 id="complexity-title">
              {algorithmConfig.name}
              {analysis?.operationName ? ` (${analysis.operationName})` : ""} &mdash; Complexity Derivation
            </h1>
            <p className="complexity-input-size">
              Current input size n = {inputSize} {inputSize === 1 ? "element" : "elements"}
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

        {/* Primary Navigation: Time vs Space */}
        <nav className="complexity-tabs" aria-label="Complexity tabs">
          <button
            type="button"
            className={`complexity-tab ${tab === "time" ? "active" : ""}`}
            onClick={() => setTab("time")}
            aria-selected={tab === "time"}
          >
            Time Complexity Derivation
          </button>
          <button
            type="button"
            className={`complexity-tab ${tab === "space" ? "active" : ""}`}
            onClick={() => setTab("space")}
            aria-selected={tab === "space"}
          >
            Space Complexity Derivation
          </button>
        </nav>

        {/* Modal Main Content */}
        <div className="complexity-body">
          {/* Educational Concept & Operation Overview */}
          <EducationalOverview
            definition={analysis?.definition}
            operationName={analysis?.operationName}
            operationDescription={analysis?.operationDescription}
          />

          {/* Worked Example Walkthrough */}
          <WorkedExampleBox workedExample={analysis?.workedExample} />

          {tab === "time" && (
            <div className="time-derivation-section">
              {/* Case Switcher: Worst / Best / Average */}
              <div className="case-selector-bar">
                <span className="case-selector-label">Select Case Scenario:</span>
                <div className="case-selector-buttons" role="tablist">
                  {timeCases.map((tc) => (
                    <button
                      key={tc.id}
                      type="button"
                      className={`case-button ${activeCase === tc.id ? "active" : ""}`}
                      onClick={() => setActiveCase(tc.id)}
                      aria-pressed={activeCase === tc.id}
                    >
                      <span className="case-btn-title">{tc.title}</span>
                      <span className="case-btn-bound">{tc.data?.label || ""}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Case Conditions Context Box */}
              {selectedCaseData && (
                <div className="case-conditions-banner">
                  <span className="condition-flag">Assumed Input Condition:</span>
                  <p className="condition-text">{selectedCaseData.conditions}</p>
                </div>
              )}

              {/* 1. PRIMARY FEATURE: Step-by-Step Derivation */}
              {selectedCaseData ? (
                <DerivationStepper
                  steps={selectedCaseData.steps}
                  caseTitle={activeCase}
                  bound={selectedCaseData.label}
                  exactBound={selectedCaseData.exactBound}
                />
              ) : (
                <p className="no-case-data">No derivation data for this case.</p>
              )}

              {/* 2. SECONDARY FEATURE: Live Execution Verification */}
              <LiveExecutionVerification
                liveValues={live.values}
                liveMetrics={analysis?.liveMetrics ?? []}
                stepDescription={live.currentStepDescription}
                inputSize={inputSize}
                hasExecuted={hasExecuted}
              />
            </div>
          )}

          {tab === "space" && spaceMetrics && (
            <div className="space-derivation-section">
              {/* Space Breakdown Cards */}
              <div className="space-summary-grid">
                <div className="space-card input">
                  <span className="space-pill input">Input Space</span>
                  <p className="space-card-desc">{spaceMetrics.inputStorage}</p>
                </div>

                <div className="space-card aux highlight">
                  <span className="space-pill aux">Auxiliary Space</span>
                  <span className="space-card-bound">{spaceMetrics.bound}</span>
                  <p className="space-card-desc">{spaceMetrics.auxiliaryStorage}</p>
                </div>

                <div className="space-card total">
                  <span className="space-pill total">Total Space</span>
                  <p className="space-card-desc">{spaceMetrics.totalSpace}</p>
                </div>
              </div>

              {/* Space Step-by-Step Derivation */}
              <DerivationStepper
                steps={spaceMetrics.steps}
                caseTitle="Auxiliary Space"
                bound={spaceMetrics.bound}
                exactBound={spaceMetrics.exactBound}
              />

              {spaceMetrics.notes && (
                <div className="space-architectural-note">
                  <strong>Implementation Details:</strong> {spaceMetrics.notes}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
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
