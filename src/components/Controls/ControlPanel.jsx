import { useState } from "react";
import "./ControlPanel.css";
import {
  isSortedAscending,
  parseArrayInput,
  parseIndexInput,
  parseNumberInput,
} from "../../arrayHelpers";

function formatOptionLabel(option) {
  return String(option)
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

// Inputs are driven by `algorithmConfig.inputs` (see the registry contract
// in src/algorithms/algorithmRegistry.js). Supported field kinds: array,
// target, operation (a string[] of options), value, index. `operationFields`
// optionally maps each operation to the extra fields it needs. No
// algorithm-specific branching here.
function ControlPanel({
  algorithmConfig,
  onRun,
  operation,
  onOperationChange,
}) {
  const inputs = algorithmConfig.inputs;
  const showArray = Boolean(inputs.array);
  const showTarget = Boolean(inputs.target);
  const operationOptions = Array.isArray(inputs.operation)
    ? inputs.operation
    : null;
  const activeOperation = operation ?? operationOptions?.[0] ?? null;
  const fieldsForOperation =
    (activeOperation && algorithmConfig.operationFields?.[activeOperation]) ||
    null;
  const showValue =
    Boolean(inputs.value) &&
    (!operationOptions ||
      (fieldsForOperation ?? ["value"]).includes("value"));
  const showIndex =
    Boolean(inputs.index) &&
    (!operationOptions || (fieldsForOperation ?? []).includes("index"));

  const [values, setValues] = useState("10,20,30,40,50");
  const [target, setTarget] = useState("30");
  const [value, setValue] = useState("10");
  const [indexText, setIndexText] = useState("0");
  const [error, setError] = useState("");
  const [needsSort, setNeedsSort] = useState(null);

  const runArrayBased = (arrayOverride) => {
    let array;

    if (showArray) {
      const parsed = arrayOverride
        ? { ok: true, array: arrayOverride }
        : parseArrayInput(values);

      if (!parsed.ok) {
        setError(parsed.error);
        return;
      }

      array = parsed.array;

      if (
        algorithmConfig.maxLength &&
        array.length > algorithmConfig.maxLength
      ) {
        setError(
          `Please enter at most ${algorithmConfig.maxLength} values so the bars fit.`,
        );
        return;
      }

      if (
        algorithmConfig.requiresSortedArray &&
        !isSortedAscending(array)
      ) {
        setError(`${algorithmConfig.name} needs a sorted array.`);
        setNeedsSort(array);
        return;
      }
    }

    if (showTarget) {
      const parsedTarget = parseNumberInput(target, "Search value");

      if (!parsedTarget.ok) {
        setError(parsedTarget.error);
        return;
      }

      onRun({ array, target: parsedTarget.value });
      return;
    }

    onRun({ array });
  };

  const runOperationBased = () => {
    const params = { operation: activeOperation };

    if (showValue) {
      const parsedValue = parseNumberInput(value, "Value");

      if (!parsedValue.ok) {
        setError(parsedValue.error);
        return;
      }

      params.value = parsedValue.value;
    }

    if (showIndex) {
      const parsedIndex = parseIndexInput(indexText);

      if (!parsedIndex.ok) {
        setError(parsedIndex.error);
        return;
      }

      params.index = parsedIndex.value;
    }

    onRun(params);
  };

  const handleRun = () => {
    setError("");
    setNeedsSort(null);

    if (operationOptions) {
      runOperationBased();
      return;
    }

    runArrayBased();
  };

  const handleSortAndRun = () => {
    if (!needsSort) return;

    const sorted = [...needsSort].sort((a, b) => a - b);
    setValues(sorted.join(","));
    setError("");
    setNeedsSort(null);
    runArrayBased(sorted);
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

      {operationOptions && (
        <div className="control-group">
          <label>Operation</label>

          <select
            value={activeOperation}
            onChange={(event) => {
              onOperationChange(event.target.value);
              setError("");
              setNeedsSort(null);
            }}
          >
            {operationOptions.map((option) => (
              <option key={option} value={option}>
                {formatOptionLabel(option)}
              </option>
            ))}
          </select>
        </div>
      )}

      {showValue && (
        <div className="control-group">
          <label>Value</label>

          <input
            type="number"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="10"
          />
        </div>
      )}

      {showIndex && (
        <div className="control-group">
          <label>Index</label>

          <input
            type="number"
            value={indexText}
            onChange={(event) => setIndexText(event.target.value)}
            placeholder="0"
            min="0"
          />
        </div>
      )}

      {error && <p className="control-error">{error}</p>}

      {needsSort && (
        <button className="secondary" onClick={handleSortAndRun}>
          Sort array for me
        </button>
      )}

      <button onClick={handleRun}>Run Algorithm</button>
    </div>
  );
}

export default ControlPanel;
