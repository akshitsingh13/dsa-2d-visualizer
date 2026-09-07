import "./CodePanel.css";

function CodePanel({ code, activeLine }) {
  if (!code) {
    return (
      <div className="code-panel-content">
        <p>No code available.</p>
      </div>
    );
  }

  const lines = code.split("\n");

  return (
    <div className="code-panel-content">
      <pre className="code-block">
        {lines.map((line, index) => {
          const lineNumber = index + 1;
          const isActive = lineNumber === activeLine;

          return (
            <div
              key={lineNumber}
              className={`code-line ${isActive ? "active" : ""}`}
            >
              <span className="line-number">{lineNumber}</span>

              <span className="line-content">{line || " "}</span>
            </div>
          );
        })}
      </pre>
    </div>
  );
}

export default CodePanel;
