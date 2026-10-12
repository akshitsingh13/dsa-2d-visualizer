// Theory lookup — the single source of truth linking theory content to
// registry ids. Every key here MUST match an id in algorithmRegistry, and
// every registry id MUST have an entry here (enforced by tests).
//
// Full block content lands in Phase 3; each concept file exports its entry.

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

export const CATEGORY_TITLES = {
  searching: "Searching",
  sorting: "Sorting",
  "data-structures": "Data Structures",
};

export function categoryTitle(category) {
  return CATEGORY_TITLES[category] || category;
}

function stubEntry(id, title, category, summary) {
  return {
    id,
    title,
    category,
    summary,
    sections: REQUIRED_SECTION_IDS.map((sectionId) => ({
      id: sectionId,
      title: SECTION_TITLES[sectionId],
      blocks: [],
    })),
    videos: [],
    practice: [],
  };
}

const theories = {
  LS: stubEntry(
    "LS",
    "Linear Search",
    "searching",
    "Linear search checks each element of a collection one by one, from first to last, until it finds the target or runs out of elements. It is the simplest search method and works on any list, sorted or not.",
  ),
  BS: stubEntry(
    "BS",
    "Binary Search",
    "searching",
    "Binary search finds a target in a sorted list by repeatedly halving the search range: compare the middle element, then discard the half that cannot contain the target.",
  ),
  BUB: stubEntry(
    "BUB",
    "Bubble Sort",
    "sorting",
    "Bubble sort orders a list by repeatedly stepping through it, comparing neighbouring pairs and swapping them when they are out of order, so large values bubble to the end.",
  ),
  STK: stubEntry(
    "STK",
    "Stack",
    "data-structures",
    "A stack is a last-in, first-out collection where you add (push) and remove (pop) elements from the same end, called the top — like a pile of plates.",
  ),
  QUE: stubEntry(
    "QUE",
    "Queue",
    "data-structures",
    "A queue is a first-in, first-out collection where new elements join at the rear and leave from the front — like a line of people waiting.",
  ),
  LL: stubEntry(
    "LL",
    "Linked List",
    "data-structures",
    "A linked list stores elements in nodes, where each node holds a value and a pointer to the next node, forming a chain that starts at the head and ends at null.",
  ),
};

export function getTheory(id) {
  return theories[id] ?? null;
}

// Category intros land in Phase 2 (src/theory/categories.js).
export function getCategoryTheory(category) {
  return categories[category] ?? null;
}

const categories = {};
