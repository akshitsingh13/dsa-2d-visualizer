import algorithmRegistry from "../../../algorithms/algorithmRegistry";
import { resolveComplexity } from "../../Visualizer/complexityHelpers";
// Reuse the shared theory table look.
import "./TheoryTable.css";

function formatOperationLabel(option) {
  return String(option)
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

// Renders the complexity table straight from the registry entry, so the
// theory numbers and the visualizer's Complexity panel can never disagree.
// Plain complexities get one row per case; keyed (per-operation)
// complexities get one row per operation. Array-based structures with an
// operation selector reuse the single complexity for every operation.
function ComplexityTable({ theoryId }) {
  const config = algorithmRegistry[theoryId];
  if (!config) return null;

  const complexity = config.complexity;
  const operations = Array.isArray(config.inputs?.operation)
    ? config.inputs.operation
    : null;
  const isKeyed =
    complexity &&
    typeof complexity === "object" &&
    !complexity.best &&
    typeof complexity !== "function";

  if (isKeyed || (operations && typeof complexity === "object" && complexity.best)) {
    const rows = (isKeyed ? Object.keys(complexity) : operations).map(
      (operation) => {
        const resolved = resolveComplexity(complexity, operation);
        return [
          formatOperationLabel(operation),
          resolved.best,
          resolved.average,
          resolved.worst,
          resolved.space,
        ];
      },
    );

    return (
      <figure className="theory-table-wrap">
        <table className="theory-table">
          <caption>
            Time and space complexity per operation — same numbers as the
            visualizer&apos;s Complexity panel.
          </caption>

          <thead>
            <tr>
              <th scope="col">Operation</th>
              <th scope="col">Best</th>
              <th scope="col">Average</th>
              <th scope="col">Worst</th>
              <th scope="col">Space</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </figure>
    );
  }

  const resolved = resolveComplexity(complexity);

  return (
    <figure className="theory-table-wrap">
      <table className="theory-table">
        <caption>
          Time and space complexity — same numbers as the visualizer&apos;s
          Complexity panel.
        </caption>

        <thead>
          <tr>
            <th scope="col">Case</th>
            <th scope="col">Time</th>
            <th scope="col">Space</th>
          </tr>
        </thead>

        <tbody>
          {[
            ["Best", resolved.best],
            ["Average", resolved.average],
            ["Worst", resolved.worst],
          ].map(([label, value]) => (
            <tr key={label}>
              <td>{label}</td>
              <td>{value}</td>
              <td>—</td>
            </tr>
          ))}
          <tr>
            <td>Space</td>
            <td>—</td>
            <td>{resolved.space}</td>
          </tr>
        </tbody>
      </table>
    </figure>
  );
}

export default ComplexityTable;
