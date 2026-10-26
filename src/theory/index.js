// Theory lookup — the single source of truth linking theory content to
// registry ids. Every key here MUST match an id in algorithmRegistry, and
// every registry id MUST have an entry here (enforced by tests).
//
// Concept content lives in one file per concept (linearSearch.js,
// binarySearch.js, bubbleSort.js, stack.js, queue.js, linkedList.js);
// category intros live in categories.js. This module only wires them up.

import linearSearchTheory from "./linearSearch";
import binarySearchTheory from "./binarySearch";
import bubbleSortTheory from "./bubbleSort";
import stackTheory from "./stack";
import queueTheory from "./queue";
import linkedListTheory from "./linkedList";
import bstTheory from "./bst";

export { REQUIRED_SECTION_IDS, SECTION_TITLES } from "./sections";

export const BLOCK_TYPES = [
  "paragraph",
  "list",
  "code",
  "table",
  "callout",
  "trace",
  "complexityTable",
];

export const CATEGORY_TITLES = {
  searching: "Searching",
  sorting: "Sorting",
  "data-structures": "Data Structures",
};

export function categoryTitle(category) {
  return CATEGORY_TITLES[category] || category;
}

const theories = {
  LS: linearSearchTheory,
  BS: binarySearchTheory,
  BUB: bubbleSortTheory,
  STK: stackTheory,
  QUE: queueTheory,
  LL: linkedListTheory,
  BST: bstTheory,
};

export function getTheory(id) {
  return theories[id] ?? null;
}

export { getCategoryTheory } from "./categories";
