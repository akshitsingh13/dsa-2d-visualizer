/**
 * Pure input parsing and validation helpers for the visualizer ControlPanel.
 * Each parser returns `{ ok: true, ... }` or `{ ok: false, error: string }`
 * ensuring predictable, testable UI state without uncaught runtime exceptions.
 */

/**
 * Parses a comma-separated string into an array of numeric values.
 * Rejects blank entries ("10,,20" or "10,20,") and non-numeric inputs.
 *
 * @param {string} raw - Comma-separated input string.
 * @returns {{ ok: true, array: number[] } | { ok: false, error: string }}
 */
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

/**
 * Parses a single input into a valid number.
 *
 * @param {string|number} raw - Input value.
 * @param {string} [fieldName="Value"] - Name used in human-friendly validation error.
 * @returns {{ ok: true, value: number } | { ok: false, error: string }}
 */
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

/**
 * Parses a non-negative integer index input.
 *
 * @param {string|number} raw - Input value.
 * @returns {{ ok: true, value: number } | { ok: false, error: string }}
 */
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

/**
 * Checks whether an array is sorted in non-decreasing order.
 * Essential precondition for Binary Search.
 *
 * @param {number[]} array - Array to check.
 * @returns {boolean} True if sorted in ascending order.
 */
export function isSortedAscending(array) {
  for (let i = 1; i < array.length; i++) {
    if (array[i] < array[i - 1]) {
      return false;
    }
  }

  return true;
}
