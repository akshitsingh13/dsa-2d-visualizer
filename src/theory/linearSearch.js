// Linear Search theory.
//
// VIDEO LINKS: every entry below is a YouTube *search* link
// (isSearchLink: true). To replace one with a specific video, open the
// search URL, pick the video, then set url to
// "https://www.youtube.com/watch?v=<id>", title/channel to the real ones,
// and isSearchLink to false.

import algorithmRegistry from "../algorithms/algorithmRegistry";

const CODE = algorithmRegistry.LS.code;

const theory = {
  id: "LS",
  title: "Linear Search",
  category: "searching",
  summary:
    "Linear search checks each element of a collection one by one, from first to last, until it finds the target or runs out of elements. It is the simplest search method and works on any list, sorted or not.",

  sections: [
    {
      id: "intuition",
      title: "The big idea",
      blocks: [
        {
          type: "paragraph",
          text: "Imagine looking for your keys by walking through every room of your house in order: bedroom, kitchen, living room, until you find them or run out of rooms. That is linear search — no cleverness, no assumptions, just a careful walk from start to finish.",
        },
        {
          type: "paragraph",
          text: "Its power is its lack of requirements. The list can be **sorted or unsorted**, contain **duplicates**, or hold any kind of data. The price is speed: in the worst case you inspect every single element, so the work grows directly with the size of the list.",
        },
        {
          type: "callout",
          tone: "tip",
          title: "Mental model",
          text: "Linear search is the baseline every other search algorithm is measured against. Whenever someone says an algorithm searches in O(log n), they mean: much faster than this walk.",
        },
      ],
    },
    {
      id: "how-it-works",
      title: "How it works",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Start at the **first element** (index 0) with a counter of comparisons at zero.",
            "Compare the current element with the **target**. That is one comparison.",
            "If they match, **stop and report the index** — this early exit is what makes the best case so fast.",
            "Otherwise move to the **next element** and repeat step 2.",
            "If you pass the last element without a match, report that the target was **not found** (this visualizer returns an empty result).",
          ],
        },
        {
          type: "callout",
          tone: "note",
          title: "One match or all matches?",
          text: "The classic version stops at the first match. This visualizer's C++ code collects matches into a `result` vector instead, which generalises the same scan to duplicates — the walk itself is identical.",
        },
      ],
    },
    {
      id: "worked-example",
      title: "Worked example",
      blocks: [
        {
          type: "paragraph",
          text: "Search for target `20` in `[40, 10, 70, 20]`. Watch the amber box move one step at a time — this is exactly what the visualizer replays:",
        },
        {
          type: "trace",
          title: "Trace: find 20 in [40, 10, 70, 20]",
          steps: [
            {
              cells: [
                { value: 40, tone: "current" },
                { value: 10, tone: "default" },
                { value: 70, tone: "default" },
                { value: 20, tone: "default" },
              ],
              explanation: "Compare index 0 (`40`) with `20` — no match. 1 comparison so far.",
            },
            {
              cells: [
                { value: 40, tone: "default" },
                { value: 10, tone: "current" },
                { value: 70, tone: "default" },
                { value: 20, tone: "default" },
              ],
              explanation: "Compare index 1 (`10`) with `20` — no match. 2 comparisons so far.",
            },
            {
              cells: [
                { value: 40, tone: "default" },
                { value: 10, tone: "default" },
                { value: 70, tone: "current" },
                { value: 20, tone: "default" },
              ],
              explanation: "Compare index 2 (`70`) with `20` — no match. 3 comparisons so far.",
            },
            {
              cells: [
                { value: 40, tone: "default" },
                { value: 10, tone: "default" },
                { value: 70, tone: "default" },
                { value: 20, tone: "found" },
              ],
              explanation: "Compare index 3 (`20`) with `20` — **match**. Found at index 3 after 4 comparisons.",
            },
          ],
        },
        {
          type: "table",
          caption: "Value inspected at each step of the trace above.",
          headers: ["Step", "Index checked", "Value seen", "Comparisons", "Result"],
          rows: [
            ["1", "0", "40", "1", "No match"],
            ["2", "1", "10", "2", "No match"],
            ["3", "2", "70", "3", "No match"],
            ["4", "3", "20", "4", "Found at index 3"],
          ],
        },
        {
          type: "paragraph",
          text: "If the target had been `99`, all four comparisons would fail and the scan would end with the message **“Target 99 not found. Returned empty result.”** — the cost of certainty is checking everything.",
        },
      ],
    },
    {
      id: "code",
      title: "Code walkthrough",
      blocks: [
        {
          type: "paragraph",
          text: "This is the exact code the visualizer's CodePanel shows. It scans the array and collects every matching index into a `result` vector:",
        },
        {
          type: "code",
          language: "cpp",
          code: CODE,
          caption: "The linear search shown in the visualizer.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Lines 1–2 set up the function and an empty `result` vector to collect matches.",
            "Line 4 starts the scan: `i` walks from `0` to the last index, one element per loop pass.",
            "Line 5 compares `arr[i]` with the target — the single comparison the counter tracks.",
            "Lines 6–7 store the matching index and return immediately in the classic version; this variant keeps every match in the vector.",
            "Line 11 runs only if nothing matched, returning the empty vector — the “not found” signal.",
          ],
        },
      ],
    },
    {
      id: "complexity",
      title: "Complexity analysis",
      blocks: [
        {
          type: "complexityTable",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "**Best O(1):** the target sits at index 0, so one comparison ends the search. The input size is irrelevant.",
            "**Average O(n):** on average you inspect about half the list (n/2 comparisons), and constant factors are dropped, leaving O(n).",
            "**Worst O(n):** the target is last, or absent — then every one of the n elements is compared exactly once.",
            "**Space O(1):** only the loop counter and a few variables are stored, no matter how big the list grows.",
          ],
        },
      ],
    },
    {
      id: "tradeoffs",
      title: "Advantages and disadvantages",
      blocks: [
        {
          type: "list",
          ordered: false,
          items: [
            "**Works on anything:** sorted, unsorted, duplicates, any data type — zero preconditions.",
            "**Trivial to write and verify:** a single loop with no tricky index math, so off-by-one bugs are rare.",
            "**Early exit:** best case is a single comparison when the target is first.",
            "**Slow on big lists:** worst-case cost grows linearly, so a million-element list can mean a million comparisons.",
            "**No reuse of work:** every search starts from scratch, even for the same target.",
          ],
        },
      ],
    },
    {
      id: "usage",
      title: "When to use it (and when not to)",
      blocks: [
        {
          type: "paragraph",
          text: "Reach for linear search when **n is small** (a handful of items — simplicity beats cleverness), when the data is **unsorted and rarely searched** (sorting first would cost more than the scan saves), or when you must find **every match**, not just the first.",
        },
        {
          type: "paragraph",
          text: "Real-world uses include scanning short configuration lists, validating small in-memory menus, and searching unsorted logs line by line. Avoid it for **large or frequently searched collections** — that is exactly the problem binary search and hash tables solve.",
        },
        {
          type: "callout",
          tone: "tip",
          title: "Rule of thumb",
          text: "Searching once through unsorted data? Linear scan wins. Searching many times? Sort once, then binary-search forever.",
        },
      ],
    },
    {
      id: "mistakes",
      title: "Common mistakes and edge cases",
      blocks: [
        {
          type: "list",
          ordered: false,
          items: [
            "**Empty input:** the loop body never runs — make sure the “not found” path still returns cleanly (this visualizer says the array is empty).",
            "**Off-by-one bounds:** looping `i <= arr.size()` reads one past the end; always stop at `i < arr.size()`.",
            "**Duplicates:** decide up front whether you want the first match, the last, or all of them — the code here returns all matches in a vector.",
            "**Comparing the wrong thing:** with objects or strings, `==` may not mean what you think; compare the right field with the right operator.",
            "**Forgetting the not-found case:** callers must handle the empty result, or a missing value silently becomes index 0 / -1 bugs downstream.",
          ],
        },
      ],
    },
    {
      id: "variations",
      title: "Variations and related concepts",
      blocks: [
        {
          type: "list",
          ordered: false,
          items: [
            "**Sentinel search:** place a copy of the target just past the end of the array so the loop needs only one check per element (no bounds test inside the loop) — a classic micro-optimisation of the same walk.",
            "**Reverse linear search:** scan from the end when matches are expected near the tail.",
            "**Binary search:** the O(log n) upgrade that requires sorted data — the next concept in this app.",
            "**Hash tables:** O(1) average lookup with extra memory and hashing complexity, for when even O(n) scans are too slow.",
          ],
        },
      ],
    },
    {
      id: "takeaways",
      title: "Key takeaways",
      blocks: [
        {
          type: "list",
          ordered: false,
          items: [
            "Linear search checks elements one by one and stops early on a match.",
            "It needs no sorted input, which is its superpower and its speed limit.",
            "Cost is O(n) worst and average, O(1) best, with O(1) extra space.",
            "Prefer it for small, unsorted, or rarely-searched data.",
            "For repeated searches over big data, sort once and switch to binary search.",
          ],
        },
      ],
    },
    {
      id: "resources",
      title: "Videos and practice",
      blocks: [],
    },
  ],

  videos: [
    {
      title: "Linear search — intuition and dry run",
      channel: "YouTube search results",
      url: "https://www.youtube.com/results?search_query=linear+search+algorithm+explained+Abdul+Bari",
      query: "linear search algorithm explained Abdul Bari",
      isSearchLink: true,
    },
    {
      title: "Linear search in C++ — code walkthrough",
      channel: "YouTube search results",
      url: "https://www.youtube.com/results?search_query=linear+search+c%2B%2B+code+mycodeschool",
      query: "linear search c++ code mycodeschool",
      isSearchLink: true,
    },
    {
      title: "Linear search visualization",
      channel: "YouTube search results",
      url: "https://www.youtube.com/results?search_query=linear+search+visualization+cs50",
      query: "linear search visualization cs50",
      isSearchLink: true,
    },
    {
      title: "Linear vs binary search — which and when",
      channel: "YouTube search results",
      url: "https://www.youtube.com/results?search_query=linear+search+vs+binary+search+neetcode",
      query: "linear search vs binary search neetcode",
      isSearchLink: true,
    },
  ],

  practice: [
    {
      title: "Contains Duplicate",
      platform: "LeetCode",
      note: "A linear scan with a twist — spot the repeat in one pass.",
    },
    {
      title: "Find the Index of the First Occurrence in a String",
      platform: "LeetCode",
      note: "Linear scanning applied to strings instead of numbers.",
    },
  ],
};

export default theory;
