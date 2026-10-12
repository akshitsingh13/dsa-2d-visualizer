// Section ids and titles shared by every theory entry. Kept in its own
// module (no imports) so concept files can use it without creating an
// import cycle with theory/index.js.

export const REQUIRED_SECTION_IDS = [
  "intuition",
  "how-it-works",
  "worked-example",
  "code",
  "complexity",
  "tradeoffs",
  "usage",
  "mistakes",
  "variations",
  "takeaways",
  "resources",
];

export const SECTION_TITLES = {
  intuition: "The big idea",
  "how-it-works": "How it works",
  "worked-example": "Worked example",
  code: "Code walkthrough",
  complexity: "Complexity analysis",
  tradeoffs: "Advantages and disadvantages",
  usage: "When to use it (and when not to)",
  mistakes: "Common mistakes and edge cases",
  variations: "Variations and related concepts",
  takeaways: "Key takeaways",
  resources: "Videos and practice",
};
