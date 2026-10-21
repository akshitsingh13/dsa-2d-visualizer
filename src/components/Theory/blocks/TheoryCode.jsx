import "./TheoryCode.css";

function TheoryCode({ block }) {
  const lines = String(block.code).split("\n");

  return (
    <figure className="theory-code">
      <pre className="theory-code-block">
        {lines.map((line, index) => (
          <div key={index + 1} className="theory-code-line">
            <span className="theory-code-number">{index + 1}</span>
            <span className="theory-code-text">{line || " "}</span>
          </div>
        ))}
      </pre>

      {block.caption ? (
        <figcaption className="theory-code-caption">{block.caption}</figcaption>
      ) : null}
    </figure>
  );
}

export default TheoryCode;
