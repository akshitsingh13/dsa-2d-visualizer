import "./InfoButton.css";

function InfoButton({ onClick, conceptName, isActive, ref }) {
  return (
    <button
      ref={ref}
      type="button"
      className={`info-button${isActive ? " active" : ""}`}
      onClick={onClick}
      aria-label={`Open learning page and resources for ${conceptName}`}
      title={`Learn ${conceptName} — Theory, Videos, Code & Practice`}
    >
      <svg
        className="info-button-icon"
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <circle
          cx="8"
          cy="8"
          r="6.5"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <circle cx="8" cy="5.2" r="0.8" fill="currentColor" />
        <path
          d="M8 7.5V11M7 7.5H8"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="info-button-full">
        {isActive ? "Back to Visualizer" : "Learning & Resources"}
      </span>
      <span className="info-button-short">
        {isActive ? "Back" : "Resources"}
      </span>
    </button>
  );
}

export default InfoButton;
