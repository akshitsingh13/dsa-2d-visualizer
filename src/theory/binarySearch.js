// Binary Search theory.
//
// VIDEO LINKS: every entry below is a YouTube *search* link
// (isSearchLink: true). To replace one with a specific video, open the
// search URL, pick the video, then set url to
// "https://www.youtube.com/watch?v=<id>", title/channel to the real ones,
// and isSearchLink to false.

import { BINARY_SEARCH_CODE } from "../algorithms/binarySearch";

const theory = {
  id: "BS",
  title: "Binary Search",
  category: "searching",
  summary:
    "Binary search finds a target in a sorted list by repeatedly halving the search range: compare the middle element, then discard the half that cannot contain the target.",

  sections: [
    {
      id: "intuition",
      title: "The big idea",
      blocks: [
        {
          type: "paragraph",
          text: "Imagine guessing a number between 1 and 100. You guess 50; told “higher”, you guess 75; told “lower”, you guess 62. Every answer **halves the possibilities**. Binary search plays exactly this game with a sorted list: each comparison eliminates half of the remaining candidates.",
        },
        {
          type: "paragraph",
          text: "Halving is absurdly powerful. A list of a **million** sorted numbers needs at most **20** comparisons, because 2²⁰ ≈ 1,000,000. The catch — and it is non-negotiable — is that the list must be **sorted first**. On unsorted data the “throw away half” step can discard the target itself, and every answer after that is nonsense.",
        },
        {
          type: "callout",
          tone: "warning",
          title: "Sorted input required",
          text: "Binary search on an unsorted array is not slow — it is wrong. This visualizer refuses unsorted input and offers to sort it for you. Always sort first, then search.",
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
            "Track the live search range with two pointers: **low** (start) and **high** (end). Greyed-out boxes in the visualizer are indices already outside this range.",
            "While `low <= high`, compute the middle: **mid = low + (high − low) / 2**.",
            "Compare `arr[mid]` with the target — one comparison.",
            "On a match, **report mid** and stop.",
            "If `arr[mid] < target`, the target must be right of mid: discard the left half by setting **low = mid + 1**.",
            "If `arr[mid] > target`, discard the right half by setting **high = mid − 1**.",
            "If the range empties (`low > high`), the target is **not present**.",
          ],
        },
        {
          type: "callout",
          tone: "tip",
          title: "Why not (low + high) / 2?",
          text: "Adding two large indices can overflow a fixed-size integer before the division happens. Writing `low + (high − low) / 2` never exceeds `high`, so it is overflow-safe — same middle, no risk.",
        },
      ],
    },
    {
      id: "worked-example",
      title: "Worked example",
      blocks: [
        {
          type: "paragraph",
          text: "Search for target `23` in the sorted array `[2, 5, 8, 12, 16, 23, 38]`. `L`, `M`, `H` mark the low, mid and high pointers; grey boxes are eliminated:",
        },
        {
          type: "trace",
          title: "Trace: find 23 in [2, 5, 8, 12, 16, 23, 38]",
          steps: [
            {
              cells: [
                { value: 2, tone: "default" },
                { value: 5, tone: "default" },
                { value: 8, tone: "default" },
                { value: 12, tone: "default" },
                { value: 16, tone: "default" },
                { value: 23, tone: "default" },
                { value: 38, tone: "default" },
              ],
              pointers: [
                { index: 0, label: "L", tone: "muted" },
                { index: 6, label: "H", tone: "muted" },
              ],
              explanation: "Start with the full range: `low = 0`, `high = 6`.",
            },
            {
              cells: [
                { value: 2, tone: "default" },
                { value: 5, tone: "default" },
                { value: 8, tone: "default" },
                { value: 12, tone: "current" },
                { value: 16, tone: "default" },
                { value: 23, tone: "default" },
                { value: 38, tone: "default" },
              ],
              pointers: [
                { index: 0, label: "L", tone: "muted" },
                { index: 3, label: "M", tone: "accent" },
                { index: 6, label: "H", tone: "muted" },
              ],
              explanation: "`mid = (0 + 6) / 2 = 3`. Compare `arr[3] = 12` with `23` — `12 < 23`, so the answer lies right of mid.",
            },
            {
              cells: [
                { value: 2, tone: "eliminated" },
                { value: 5, tone: "eliminated" },
                { value: 8, tone: "eliminated" },
                { value: 12, tone: "eliminated" },
                { value: 16, tone: "default" },
                { value: 23, tone: "default" },
                { value: 38, tone: "default" },
              ],
              pointers: [
                { index: 4, label: "L", tone: "muted" },
                { index: 6, label: "H", tone: "muted" },
              ],
              explanation: "Discard the left half `[0..3]`. New range: `low = 4`, `high = 6`.",
            },
            {
              cells: [
                { value: 2, tone: "eliminated" },
                { value: 5, tone: "eliminated" },
                { value: 8, tone: "eliminated" },
                { value: 12, tone: "eliminated" },
                { value: 16, tone: "default" },
                { value: 23, tone: "current" },
                { value: 38, tone: "default" },
              ],
              pointers: [
                { index: 4, label: "L", tone: "muted" },
                { index: 5, label: "M", tone: "accent" },
                { index: 6, label: "H", tone: "muted" },
              ],
              explanation: "`mid = (4 + 6) / 2 = 5`. Compare `arr[5] = 23` with `23` — **match**. Found at index 5 after just 2 comparisons.",
            },
          ],
        },
        {
          type: "table",
          caption: "Range and decision at each comparison of the trace above.",
          headers: ["Comparison", "low", "mid", "high", "arr[mid]", "Decision"],
          rows: [
            ["1", "0", "3", "6", "12", "12 < 23, discard left half"],
            ["2", "4", "5", "6", "23", "Equal — found at index 5"],
          ],
        },
        {
          type: "paragraph",
          text: "Searching for `7` instead would narrow `0..6` → `0..2` → `2..2`, then exhaust the range with `low = 2, high = 1` and report **not found** — three comparisons for a seven-element list.",
        },
      ],
    },
    {
      id: "code",
      title: "Code walkthrough",
      blocks: [
        {
          type: "paragraph",
          text: "This is the exact iterative code the visualizer's CodePanel shows. Iterative beats recursive here: same logic, no call-stack overhead.",
        },
        {
          type: "code",
          language: "cpp",
          code: BINARY_SEARCH_CODE,
          caption: "Iterative binary search, as shown in the visualizer.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Lines 2–3 plant the `low` and `high` flags at the two ends of the array.",
            "Line 5 keeps looping while the range is non-empty; `low > high` means exhaustion.",
            "Line 6 computes `mid` with the overflow-safe formula.",
            "Lines 7–8 compare and return `mid` on a match — the green step in the visualizer.",
            "Lines 9–10 discard the left half when the middle value is too small.",
            "Lines 11–13 discard the right half when it is too big.",
            "Line 16 runs only on exhaustion and returns `-1`, the classic “absent” signal.",
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
            "**Best O(1):** the first middle element is the target — one comparison, done.",
            "**Average and worst O(log n):** each comparison halves n (n → n/2 → n/4 … → 1), and halving down to 1 takes about log₂ n steps. For n = 1,000,000 that is ~20 comparisons.",
            "**Space O(1):** the iterative version stores only `low`, `high` and `mid` — no recursion stack, no copies.",
          ],
        },
        {
          type: "callout",
          tone: "note",
          title: "Why log n?",
          text: "Ask: how many times can you halve n before reaching 1? That count k satisfies n / 2ᵏ = 1, i.e. k = log₂ n. Each halving is one comparison, hence O(log n).",
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
            "**Extremely fast:** O(log n) turns million-element searches into ~20 steps.",
            "**Tiny memory footprint:** O(1) extra space, iterative.",
            "**Simple loop:** no recursion, no clever data structures.",
            "**Sorted input mandatory:** unsorted data gives wrong answers, and sorting costs O(n log n) up front.",
            "**Poor fit for changing data:** every insertion can mean re-sorting; balanced trees or hash tables serve dynamic data better.",
            "**Only equality search on arrays:** no ranking, no prefix queries — other structures cover those.",
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
          text: "Use binary search when the data is **sorted (or cheap to sort once) and searched often**: dictionary lookups, auto-complete prefix ranges, version-control bisecting, and numeric answers like square roots. Standard libraries expose it as `binary_search`, `lower_bound` and `upper_bound` — the same halving loop with different return contracts.",
        },
        {
          type: "paragraph",
          text: "Do not use it on **unsorted data**, on **linked lists** (no O(1) middle access — walking to mid costs O(n) per step, killing the speedup), or when you search **once** (a linear scan is cheaper than sort-then-search).",
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
            "**Unsorted input:** the #1 bug — results look plausible but are wrong. Sort first, every time.",
            "**Overflow in mid:** `(low + high) / 2` can overflow; use `low + (high − low) / 2`.",
            "**Off-by-one updates:** `low = mid` instead of `mid + 1` (or `high = mid` instead of `mid − 1`) can loop forever — always exclude the checked mid.",
            "**Wrong loop condition:** `low < high` skips checking the last single element; use `low <= high`.",
            "**Empty array:** `high` starts at −1, the loop never runs, return −1 — correct, but test it explicitly.",
            "**Duplicates:** plain binary search returns *some* matching index, not necessarily the first — use lower/upper bound variants when position matters.",
            "**Infinite loops in while-formulations:** if the range never shrinks, re-check the update lines first.",
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
            "**Recursive binary search:** same halving as recursion — elegant, but pays call-stack overhead per level.",
            "**lower_bound / upper_bound:** find the first element ≥ target (or > target) — the workhorses behind insertion points and counting duplicates.",
            "**Binary search on answers:** halve a numeric range (e.g. minimum feasible capacity) instead of an array — same loop, new domain.",
            "**Interpolation search:** guess mid by value instead of position — faster on uniform data, worse guarantees.",
            "**Binary search trees:** the halving idea baked into a data structure that also supports inserts.",
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
            "Binary search halves a sorted range per comparison: O(log n) time, O(1) space.",
            "Sorted input is a correctness requirement, not an optimisation.",
            "Compute mid as `low + (high − low) / 2` and always exclude mid when narrowing.",
            "Duplicates yield an arbitrary match — reach for lower/upper bound for positions.",
            "One search? Scan. Many searches? Sort once, binary-search forever.",
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
      title: "Binary search — intuition and dry run",
      channel: "YouTube search results",
      url: "https://www.youtube.com/results?search_query=binary+search+algorithm+explained+Abdul+Bari",
      query: "binary search algorithm explained Abdul Bari",
      isSearchLink: true,
    },
    {
      title: "Binary search in C++ — code walkthrough",
      channel: "YouTube search results",
      url: "https://www.youtube.com/results?search_query=binary+search+c%2B%2B+code+walkthrough",
      query: "binary search c++ code walkthrough",
      isSearchLink: true,
    },
    {
      title: "Binary search visualization",
      channel: "YouTube search results",
      url: "https://www.youtube.com/results?search_query=binary+search+visualization+cs50",
      query: "binary search visualization cs50",
      isSearchLink: true,
    },
    {
      title: "Lower bound and upper bound — interview follow-up",
      channel: "YouTube search results",
      url: "https://www.youtube.com/results?search_query=binary+search+lower+bound+upper+bound+take+u+forward",
      query: "binary search lower bound upper bound take u forward",
      isSearchLink: true,
    },
  ],

  practice: [
    {
      title: "Binary Search",
      platform: "LeetCode",
      note: "The textbook implementation — mid formula, bounds, and -1 included.",
    },
    {
      title: "Search Insert Position",
      platform: "LeetCode",
      note: "What to return when the target is absent: the insertion point.",
    },
    {
      title: "First Bad Version",
      platform: "LeetCode",
      note: "Binary search on a true/false predicate instead of an array.",
    },
  ],
};

export default theory;
