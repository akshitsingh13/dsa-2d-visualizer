// Pure input parsing / validation helpers for the ControlPanel.
// Each parser returns { ok: true, ... } or { ok: false, error: "..." }
// so the UI only has to display the error message.

// Parse a comma-separated string into an array of numbers.
// Blank entries ("10,,20" or "10,20,") are rejected with a clear error
// instead of silently becoming 0 via Number("").
export function parseArrayInput(raw) {
  if (raw == null || raw.trim() === "") {
    return { ok: false, error: "Please enter array values." };
  }

  const parts = raw.split(",");
  const array = [];

  for (const part of parts) {
    const trimmed = part.trim();

    if (trimmed === "") {
      return {
        ok: false,
        error:
          "Empty entries are not allowed. Use numbers separated by commas (e.g. 10,20,30).",
      };
    }

    const value = Number(trimmed);

    if (Number.isNaN(value)) {
      return {
        ok: false,
        error: "Please enter only numbers separated by commas.",
      };
    }

    array.push(value);
  }

  return { ok: true, array };
}

// Parse a single target / value input into a number.
export function parseNumberInput(raw, fieldName = "Value") {
  if (raw == null || String(raw).trim() === "") {
    return { ok: false, error: `Please enter ${fieldName.toLowerCase()}.` };
  }

  const value = Number(String(raw).trim());

  if (Number.isNaN(value)) {
    return { ok: false, error: `${fieldName} must be a number.` };
  }

  return { ok: true, value };
}

// Parse a non-negative integer index input.
export function parseIndexInput(raw) {
  if (raw == null || String(raw).trim() === "") {
    return { ok: false, error: "Please enter an index." };
  }

  const value = Number(String(raw).trim());

  if (!Number.isInteger(value) || value < 0) {
    return { ok: false, error: "Index must be a non-negative integer." };
  }

  return { ok: true, value };
}

// Check whether an array is sorted in non-decreasing order.
// Used by Binary Search, which requires a sorted input array.
export function isSortedAscending(array) {
  for (let i = 1; i < array.length; i++) {
    if (array[i] < array[i - 1]) {
      return false;
    }
  }

  return true;
}
