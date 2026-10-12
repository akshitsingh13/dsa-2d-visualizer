import { useState } from "react";
import "./ControlPanel.css";
import { parseArrayInput, parseNumberInput } from "../../arrayHelpers";

// Inputs are driven by `algorithmConfig.inputs` (see the registry contract
// in src/algorithms/algorithmRegistry.js): each supported field kind is
// rendered only when the current algorithm declares it. No
// algorithm-specific branching here.
function ControlPanel({ algorithmConfig, onRun }) {
  const [values, setValues] = useState("10,20,30,40,50");
  const [target, setTarget] = useState("30");
  const [error, setError] = useState("");

  const showArray = Boolean(algorithmConfig.inputs.array);
  const showTarget = Boolean(algorithmConfig.inputs.target);

  const handleRun = () => {
    setError("");

    let array;

    if (showArray) {
      const parsedArray = parseArrayInput(values);

      if (!parsedArray.ok) {
        setError(parsedArray.error);
        return;
      }

      array = parsedArray.array;
    }

    if (showTarget) {
      const parsedTarget = parseNumberInput(target, "Search value");

      if (!parsedTarget.ok) {
        setError(parsedTarget.error);
        return;
      }

      onRun(array, parsedTarget.value);
      return;
    }

    onRun(array);
  };

  return (
    <div className="control-panel">
      <h2>{algorithmConfig.name}</h2>

      {showArray && (
        <div className="control-group">
          <label>Values</label>

          <input
            type="text"
            value={values}
            onChange={(event) => setValues(event.target.value)}
            placeholder="10,20,30,40,50"
          />
        </div>
      )}

      {showTarget && (
        <div className="control-group">
          <label>Search</label>

          <input
            type="number"
            value={target}
            onChange={(event) => setTarget(event.target.value)}
          />
        </div>
      )}

      {error && <p className="control-error">{error}</p>}

      <button onClick={handleRun}>Run Algorithm</button>
    </div>
  );
}

export default ControlPanel;
