import { useState } from "react";
import "./ControlPanel.css";

function ControlPanel({ algorithmConfig, onRun }) {
  const [values, setValues] = useState("10,20,30,40,50");
  const [target, setTarget] = useState("30");
  const [error, setError] = useState("");

  const handleRun = () => {
    setError("");

    // Check if values are empty
    if (!values.trim()) {
      setError("Please enter array values.");
      return;
    }

    // Convert comma-separated values into numbers
    const array = values.split(",").map((value) => Number(value.trim()));

    // Check for invalid values
    if (array.some((value) => Number.isNaN(value))) {
      setError("Please enter only numbers separated by commas.");
      return;
    }

    // Check target
    if (algorithmConfig.inputs.target && target.trim() === "") {
      setError("Please enter a search value.");
      return;
    }

    const parsedTarget = Number(target);

    // Check if target is a valid number
    if (algorithmConfig.inputs.target && Number.isNaN(parsedTarget)) {
      setError("Search value must be a number.");
      return;
    }

    onRun(array, parsedTarget);
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
