import { useState } from "react";
import "./ControlPanel.css";
import { parseArrayInput, parseNumberInput } from "../../arrayHelpers";

function ControlPanel({ algorithmConfig, onRun }) {
  const [values, setValues] = useState("10,20,30,40,50");
  const [target, setTarget] = useState("30");
  const [error, setError] = useState("");

  const handleRun = () => {
    setError("");

    const parsedArray = parseArrayInput(values);

    if (!parsedArray.ok) {
      setError(parsedArray.error);
      return;
    }

    // Check target
    if (algorithmConfig.inputs.target) {
      const parsedTarget = parseNumberInput(target, "Search value");

      if (!parsedTarget.ok) {
        setError(parsedTarget.error);
        return;
      }

      onRun(parsedArray.array, parsedTarget.value);
      return;
    }

    onRun(parsedArray.array);
  };

  return (
    <div className="control-panel">
      <h2>{algorithmConfig.name}</h2>

      <div className="control-group">
        <label>Values</label>

        <input
          type="text"
          value={values}
          onChange={(event) => setValues(event.target.value)}
          placeholder="10,20,30,40,50"
        />
      </div>

      {algorithmConfig.inputs.target && (
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
