import "./ComplexityAnalysisButton.css";

/**
 * Trigger button opening the interactive Complexity Analysis derivation modal.
 * Embedded inside the Time & Space Complexity panel header.
 */
function ComplexityAnalysisButton({ onClick, conceptName, ref }) {
  return (
    <button
      ref={ref}
      type="button"
      className="complexity-button"
      onClick={onClick}
      aria-label={`Open complexity analysis for ${conceptName}`}
    >
      <svg
        className="complexity-button-icon"
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M2 2L14 14M14 2L2 14"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span className="complexity-button-full">Complexity Analysis</span>
      <span className="complexity-button-short">Analysis</span>
    </button>
  );
}

export default ComplexityAnalysisButton;
