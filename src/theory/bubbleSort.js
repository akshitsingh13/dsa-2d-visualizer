// Bubble Sort theory.
//
// VIDEO LINKS: every entry below is a YouTube *search* link
// (isSearchLink: true). To replace one with a specific video, open the
// search URL, pick the video, then set url to
// "https://www.youtube.com/watch?v=<id>", title/channel to the real ones,
// and isSearchLink to false.

import { BUBBLE_SORT_CODE } from "../algorithms/bubbleSort";

const theory = {
  id: "BUB",
  title: "Bubble Sort",
  category: "sorting",
  summary:
    "Bubble sort orders a list by repeatedly stepping through it, comparing neighbouring pairs and swapping them when they are out of order, so large values bubble to the end.",

  sections: [
    {
      id: "intuition",
      title: "The big idea",
      blocks: [
        {
          type: "paragraph",
          text: "Imagine lining up children by height: you walk down the line, and whenever two neighbours stand in the wrong order, you swap them. After one full walk, the tallest child is guaranteed to be at the end — the big values **bubble up** like air in water. Repeat for the rest, and the line sorts itself.",
        },
        {
          type: "paragraph",
          text: "Each pass fixes the position of one more element at the end, so the unsorted region shrinks from the right. It is beautifully simple and beautifully slow on big lists — which is why bubble sort survives as a **teaching tool** rather than a production tool.",
        },
        {
          type: "callout",
          tone: "tip",
          title: "Mental model",
          text: "One pass = one element (the largest remaining) floats to its final spot. After pass k, the last k elements are sorted and never touched again — watch the green suffix grow in the visualizer.",
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
            "Repeat passes over the list: pass 1 compares indices `0..n-2`, pass 2 compares `0..n-3`, and so on — the sorted suffix is skipped every time.",
            "Inside a pass, compare each **adjacent pair** `arr[j]` and `arr[j+1]` — one comparison.",
            "If the left value is **greater**, **swap** them so the larger moves right.",
            "Track whether **any swap** happened with a `swapped` flag, reset at the start of each pass.",
            "After a pass, the last element of the unsorted region is final — mark it **sorted**.",
            "If a whole pass makes **no swaps**, the list is already ordered: stop early (the `break`).",
          ],
        },
      ],
    },
    {
      id: "worked-example",
      title: "Worked example",
      blocks: [
        {
          type: "paragraph",
          text: "Sort `[5, 1, 4, 2, 3]`. Amber pairs are being compared, the accent pair just swapped, green is final:",
        },
        {
          type: "trace",
          title: "Trace: pass 1 on [5, 1, 4, 2, 3]",
          steps: [
            {
              cells: [
                { value: 5, tone: "current" },
                { value: 1, tone: "current" },
                { value: 4, tone: "default" },
                { value: 2, tone: "default" },
                { value: 3, tone: "default" },
              ],
              explanation: "Compare 5 and 1 — out of order, so they swap.",
            },
            {
              cells: [
                { value: 1, tone: "default" },
                { value: 5, tone: "default" },
                { value: 4, tone: "current" },
                { value: 2, tone: "default" },
                { value: 3, tone: "default" },
              ],
              explanation: "Array is now `[1, 5, 4, 2, 3]`. Compare 5 and 4 — swap again.",
            },
            {
              cells: [
                { value: 1, tone: "default" },
                { value: 4, tone: "default" },
                { value: 5, tone: "default" },
                { value: 2, tone: "current" },
                { value: 3, tone: "default" },
              ],
              explanation: "Array is `[1, 4, 5, 2, 3]`. Compare 5 and 2 — swap; 5 keeps bubbling right.",
            },
            {
              cells: [
                { value: 1, tone: "default" },
                { value: 4, tone: "default" },
                { value: 2, tone: "default" },
                { value: 5, tone: "default" },
                { value: 3, tone: "current" },
              ],
              explanation: "Array is `[1, 4, 2, 5, 3]`. Compare 5 and 3 — swap. 5 reaches the end.",
            },
            {
              cells: [
                { value: 1, tone: "default" },
                { value: 4, tone: "default" },
                { value: 2, tone: "default" },
                { value: 3, tone: "default" },
                { value: 5, tone: "sorted" },
              ],
              explanation: "Pass 1 complete: `[1, 4, 2, 3, 5]` and **5 is final** at index 4.",
            },
          ],
        },
        {
          type: "table",
          caption: "Passes 2 and 3 continue on the shrinking unsorted region.",
          headers: ["Pass", "Comparisons made", "Swaps", "Array after pass", "Newly final"],
          rows: [
            ["2", "1↔4, 4↔2, 4↔3", "2", "[1, 2, 3, 4, 5]", "4 at index 3"],
            ["3", "1↔2, 2↔3", "0", "[1, 2, 3, 4, 5]", "All — early exit, already sorted"],
          ],
        },
        {
          type: "paragraph",
          text: "Total: **9 comparisons, 6 swaps**, and the `swapped` flag ends the run one pass early — exactly what the visualizer's counters show.",
        },
      ],
    },
    {
      id: "code",
      title: "Code walkthrough",
      blocks: [
        {
          type: "paragraph",
          text: "The exact code from the visualizer's CodePanel, including the `swapped` early-exit optimisation:",
        },
        {
          type: "code",
          language: "cpp",
          code: BUBBLE_SORT_CODE,
          caption: "Bubble sort with the swapped flag, as shown in the visualizer.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Line 3 runs passes; pass `i` leaves the last `i` elements alone (`n − i − 1` bound).",
            "Line 4 resets the `swapped` flag at the start of every pass.",
            "Line 5 walks adjacent pairs within the unsorted region only.",
            "Line 6 compares neighbours — each check is one comparison.",
            "Lines 7–8 swap out-of-order neighbours and record that work happened.",
            "Lines 11–13 quit early when a pass swaps nothing: the list is sorted.",
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
            "**Best O(n):** an already-sorted list needs one full pass of n−1 comparisons with zero swaps, then the flag breaks out. One pass, linear work.",
            "**Average and worst O(n²):** pass 1 does n−1 comparisons, pass 2 does n−2, and so on — (n−1) + (n−2) + … + 1 = n(n−1)/2, which grows quadratically.",
            "**Space O(1):** sorting happens inside the same array; only loop counters and temporaries are extra.",
          ],
        },
        {
          type: "callout",
          tone: "note",
          title: "Why n(n−1)/2?",
          text: "It is the number of pairs in the list: every pair gets compared at most once per sort. For n = 1000 that is already ~500,000 comparisons — doubling n quadruples the work.",
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
            "**Dead simple:** two nested loops and a swap — easy to write, trace, and teach.",
            "**In-place:** O(1) extra memory; the array is sorted where it sits.",
            "**Stable:** equal elements never swap past each other, so their original order survives.",
            "**Adaptive-ish:** the swapped flag gives O(n) on sorted or nearly-sorted input.",
            "**Quadratic worst case:** O(n²) makes it unusable for large lists — merge sort and quicksort exist for a reason.",
            "**Many wasted writes:** swaps touch memory constantly, which also hurts real-world speed.",
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
          text: "Use bubble sort for **learning**, for **tiny lists** (a handful of items where simplicity wins), or for **nearly-sorted data** where the swapped flag finishes in one or two passes. Its stability also suits toy problems where equal items must keep their order.",
        },
        {
          type: "paragraph",
          text: "Do not use it for anything large or performance-sensitive: standard libraries sort with O(n log n) algorithms, and even simple insertion sort usually beats bubble sort in practice. Treat bubble sort as a stepping stone, not a destination.",
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
            "**Wrong inner bound:** comparing up to `n − 1` instead of `n − i − 1` re-checks the sorted suffix and can read past the array when accessing `arr[j+1]`.",
            "**Forgetting the swapped flag:** without it you always pay all n−1 passes, even on sorted input.",
            "**Not resetting the flag:** `swapped` must reset each pass, or the early exit never (or wrongly) triggers.",
            "**Empty or single-element input:** zero or one passes needed — handle gracefully instead of assuming work exists.",
            "**Assuming stability without checking:** this implementation is stable only because it swaps on strict `>`; using `>=` would break stability.",
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
            "**Optimised bubble sort:** this visualizer's version — skip the sorted suffix and break early with the swapped flag.",
            "**Cocktail shaker sort:** passes alternate direction (left-to-right, then right-to-left), settling small values leftward faster.",
            "**Selection sort:** also O(n²), but picks the minimum each pass instead of swapping neighbours — fewer writes, not stable.",
            "**Insertion sort:** builds the sorted prefix one element at a time — O(n²) worst case but excellent on nearly-sorted data.",
            "**Merge sort / quicksort:** the O(n log n) upgrades for real workloads.",
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
            "Each pass bubbles the largest remaining value to its final spot; the green suffix only grows.",
            "Adjacent compare-and-swap makes it stable and in-place.",
            "Cost is O(n²) worst/average from n(n−1)/2 comparisons, O(n) best via the swapped flag.",
            "Learn the mechanics here, then reach for O(n log n) sorts in real code.",
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
      title: "Bubble sort — intuition and dry run",
      channel: "YouTube search results",
      url: "https://www.youtube.com/results?search_query=bubble+sort+algorithm+explained+Abdul+Bari",
      query: "bubble sort algorithm explained Abdul Bari",
      isSearchLink: true,
    },
    {
      title: "Bubble sort in C++ — code walkthrough",
      channel: "YouTube search results",
      url: "https://www.youtube.com/results?search_query=bubble+sort+c%2B%2B+code+mycodeschool",
      query: "bubble sort c++ code mycodeschool",
      isSearchLink: true,
    },
    {
      title: "Bubble sort visualization",
      channel: "YouTube search results",
      url: "https://www.youtube.com/results?search_query=bubble+sort+visualization+cs50",
      query: "bubble sort visualization cs50",
      isSearchLink: true,
    },
    {
      title: "Bubble vs selection vs insertion sort",
      channel: "YouTube search results",
      url: "https://www.youtube.com/results?search_query=bubble+sort+vs+selection+sort+vs+insertion+sort",
      query: "bubble sort vs selection sort vs insertion sort",
      isSearchLink: true,
    },
  ],

  practice: [
    {
      title: "Sort an Array",
      platform: "LeetCode",
      note: "Implement a sort yourself — try bubble sort first, then feel why faster sorts matter.",
    },
    {
      title: "Sort Colors",
      platform: "LeetCode",
      note: "Sorting with constraints: only three distinct values to arrange.",
    },
  ],
};

export default theory;
