import "./TheoryButton.css";

function TheoryButton({ onClick, conceptName, ref }) {
  return (
    <button
      ref={ref}
      type="button"
      className="theory-button"
      onClick={onClick}
      aria-label={`Read and learn more about ${conceptName}`}
    >
      <svg
        className="theory-button-icon"
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M2 2.5C2 1.95 2.45 1.5 3 1.5H8V13.5H3C2.45 13.5 2 13.05 2 12.5V2.5Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M14 2.5C14 1.95 13.55 1.5 13 1.5H8V13.5H13C13.55 13.5 14 13.05 14 12.5V2.5Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M8 1.5V13.5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>

      <span className="theory-button-full">Read &amp; Learn More</span>
      <span className="theory-button-short">Learn More</span>
    </button>
  );
}

export default TheoryButton;
