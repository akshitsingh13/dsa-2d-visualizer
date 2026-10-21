import { describe, expect, it } from "vitest";
import {
  isSortedAscending,
  parseArrayInput,
  parseIndexInput,
  parseNumberInput,
} from "./arrayHelpers";

describe("parseArrayInput", () => {
  it("parses a normal comma-separated list", () => {
    expect(parseArrayInput("10,20,30")).toEqual({
      ok: true,
      array: [10, 20, 30],
    });
  });

  it("trims whitespace around entries", () => {
    expect(parseArrayInput("  1 , 2 ,3  ")).toEqual({
      ok: true,
      array: [1, 2, 3],
    });
  });

  it("rejects double commas instead of turning blanks into 0", () => {
    const result = parseArrayInput("10,,20");
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/empty/i);
  });

  it("rejects a trailing comma", () => {
    const result = parseArrayInput("10,20,");
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/empty/i);
  });

  it("rejects non-numeric entries", () => {
    const result = parseArrayInput("10,abc,20");
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/numbers/);
  });

  it("rejects empty input", () => {
    expect(parseArrayInput("").ok).toBe(false);
    expect(parseArrayInput("   ").ok).toBe(false);
  });

  it("parses negative and decimal values", () => {
    expect(parseArrayInput("-5,2.5,0")).toEqual({
      ok: true,
      array: [-5, 2.5, 0],
    });
  });
});

describe("parseNumberInput", () => {
  it("parses a valid number", () => {
    expect(parseNumberInput("30", "Search value")).toEqual({
      ok: true,
      value: 30,
    });
  });

  it("rejects blank input with a clear error", () => {
    const result = parseNumberInput("  ", "Search value");
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/search value/i);
  });

  it("rejects non-numeric input", () => {
    expect(parseNumberInput("abc", "Value").ok).toBe(false);
  });
});

describe("parseIndexInput", () => {
  it("parses a valid index", () => {
    expect(parseIndexInput("2")).toEqual({ ok: true, value: 2 });
  });

  it("rejects negative, decimal and non-numeric input", () => {
    expect(parseIndexInput("-1").ok).toBe(false);
    expect(parseIndexInput("1.5").ok).toBe(false);
    expect(parseIndexInput("x").ok).toBe(false);
    expect(parseIndexInput("").ok).toBe(false);
  });
});

describe("isSortedAscending", () => {
  it("accepts sorted arrays (duplicates allowed)", () => {
    expect(isSortedAscending([])).toBe(true);
    expect(isSortedAscending([1])).toBe(true);
    expect(isSortedAscending([1, 2, 2, 3])).toBe(true);
  });

  it("rejects unsorted arrays", () => {
    expect(isSortedAscending([1, 3, 2])).toBe(false);
    expect(isSortedAscending([5, 4, 3])).toBe(false);
  });
});
