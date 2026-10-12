// Category intros shown as the collapsible "About <category>" section at
// the top of every concept page. Comparison tables reflect the algorithms
// currently in the app and their registry complexity numbers.

const categories = {
  searching: {
    id: "searching",
    title: "Searching",
    summary:
      "Searching means finding whether a value exists in a collection, and where. Almost every program does it — checking a username, finding a product, locating a record — so how fast you can search shapes how fast your whole program feels.",
    body: [
      {
        type: "paragraph",
        text: "There are two basic strategies. **Linear search** walks through the items one by one and works on any list, sorted or not. **Binary search** is dramatically faster, but it demands a **sorted** list, because it finds the target by repeatedly throwing away the half that cannot contain it.",
      },
      {
        type: "paragraph",
        text: "The trade-off is the whole story of this category: pay the cost of **sorting once** up front, and every later search becomes cheap. If you only search once, or the data keeps changing order, a linear scan can honestly be the faster overall choice.",
      },
    ],
    comparison: {
      caption: "The searching algorithms in this app.",
      headers: ["Algorithm", "Needs sorted input?", "Time", "Space", "Best for"],
      rows: [
        ["Linear Search", "No", "O(n)", "O(1)", "Small or unsorted lists, one-off searches"],
        ["Binary Search", "Yes", "O(log n)", "O(1)", "Large sorted lists, repeated searches"],
      ],
    },
    learningPath: [
      "Start with **Linear Search**: the scan-everything baseline every other search is measured against.",
      "Then learn **Binary Search**: the halving idea, the L/M/H pointers, and why sorted input is non-negotiable.",
    ],
  },

  sorting: {
    id: "sorting",
    title: "Sorting",
    summary:
      "Sorting arranges a collection into order — smallest to largest, A to Z, oldest to newest. Ordered data unlocks fast searching, clean reports, and simpler logic everywhere else in a program.",
    body: [
      {
        type: "paragraph",
        text: "Sorting is one of the most studied problems in computer science because nearly everything is easier once data is ordered. Dozens of algorithms exist, trading **speed**, **memory**, **simplicity**, and whether they keep equal elements in their original relative order (called **stability**).",
      },
      {
        type: "paragraph",
        text: "This app starts with **Bubble Sort**: the simplest sorting idea — compare neighbours, swap them if they are out of order, repeat. It is slow on big lists, but its passes make the mechanics of sorting visible, which is exactly why it is taught first.",
      },
    ],
    comparison: {
      caption: "The sorting algorithms in this app.",
      headers: ["Algorithm", "How it works", "Time (avg / worst)", "Space", "Best for"],
      rows: [
        ["Bubble Sort", "Adjacent compare-and-swap passes", "O(n²)", "O(1)", "Learning the basics, tiny or nearly-sorted lists"],
      ],
    },
    learningPath: [
      "Start with **Bubble Sort**: passes, the bubbling largest element, and the swapped-flag optimisation.",
    ],
  },

  "data-structures": {
    id: "data-structures",
    title: "Data Structures",
    summary:
      "Data structures are ways of organising data so that the operations you need most are fast and natural. Picking the right one — a stack, a queue, or a linked list — is often worth more than clever code.",
    body: [
      {
        type: "paragraph",
        text: "Arrays give you instant access by index but awkward insertions. The three structures here each fix a different pain: a **stack** remembers the most recent thing first (undo, function calls), a **queue** serves things in arrival order (scheduling, Buffers), and a **linked list** grows and shrinks gracefully by chaining nodes with pointers.",
      },
      {
        type: "paragraph",
        text: "Notice what they share: every core operation costs **O(1)** except the ones that must walk the structure. Learning to spot which end you add to, which end you remove from, and what happens when the structure is empty covers most bugs before they happen.",
      },
    ],
    comparison: {
      caption: "The data structures in this app.",
      headers: ["Structure", "Core idea", "Key operations", "Good for"],
      rows: [
        ["Stack", "Last in, first out (LIFO)", "Push, pop, peek — O(1)", "Undo/redo, call stack, bracket matching, depth-first search"],
        ["Queue", "First in, first out (FIFO)", "Enqueue, dequeue, peek — O(1)", "Scheduling, buffers, breadth-first search"],
        ["Linked List", "Nodes chained by next pointers", "Insert at head O(1), search/delete O(n)", "Lists that grow and shrink often, custom memory layouts"],
      ],
    },
    learningPath: [
      "Start with the **Stack**: one end, two operations, and the overflow/underflow habit.",
      "Then the **Queue**: two ends, arrival order, and why the front and rear both matter.",
      "Finish with the **Linked List**: nodes, pointers, head and null — the foundation of trees and graphs later.",
    ],
  },
};

export function getCategoryTheory(category) {
  return categories[category] ?? null;
}

export default categories;
