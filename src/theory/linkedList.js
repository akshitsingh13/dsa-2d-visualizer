// Linked List theory.
//
// VIDEO LINKS: every entry below is a YouTube *search* link
// (isSearchLink: true). To replace one with a specific video, open the
// search URL, pick the video, then set url to
// "https://www.youtube.com/watch?v=<id>", title/channel to the real ones,
// and isSearchLink to false.

import { LL_CODE } from "../algorithms/linkedList";

const theory = {
  id: "LL",
  title: "Linked List",
  category: "data-structures",
  summary:
    "A linked list stores elements in nodes, where each node holds a value and a pointer to the next node, forming a chain that starts at the head and ends at null.",

  sections: [
    {
      id: "intuition",
      title: "The big idea",
      blocks: [
        {
          type: "paragraph",
          text: "Imagine a treasure hunt where every clue is hidden with the location of the next clue. You only ever need to know **where the first clue is** (the `head`); each clue leads you onward until one says “the end” (`null`). A linked list works exactly like that: scattered nodes, each carrying data plus the address of its successor.",
        },
        {
          type: "paragraph",
          text: "Because nodes link by pointer rather than sitting side by side, the list can **grow and shrink one node at a time** without shifting anything — but reaching the 100th node means following 99 pointers. That single trade-off (cheap edits, expensive access) explains every row of the complexity table below.",
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
            "Each **node** stores `data` and a `next` pointer. The list tracks only the **head** (first node); the last node points to **null**.",
            "**Traverse** with a `curr` pointer: start at head, visit, advance `curr = curr->next` until null. Every visit is counted as a node visited.",
            "**Insert at head:** create the node, point its `next` at the old head, move `head` onto it — no walking required.",
            "**Insert elsewhere:** walk `curr` to the spot, then re-wire two pointers: new node's `next` first, previous node's `next` second.",
            "**Delete:** walk to the node, bypass it (`prev->next = curr->next`), then free it. Deleting the head just moves `head`.",
            "**Search:** walk and compare each node's data until a match or null.",
          ],
        },
        {
          type: "callout",
          tone: "warning",
          title: "Order of re-wiring matters",
          text: "When inserting, always link the new node's `next` BEFORE overwriting the previous node's `next`. Reverse the order and the rest of the list becomes unreachable — a leak in one assignment.",
        },
      ],
    },
    {
      id: "worked-example",
      title: "Worked example",
      blocks: [
        {
          type: "paragraph",
          text: "Build `[10, 20]` with insert-head then insert-tail, then search for `15`. Amber nodes are being created or visited; `curr` walks the chain:",
        },
        {
          type: "trace",
          title: "Trace: insert 10 at head, 20 at tail, search 15",
          steps: [
            {
              cells: [{ value: 10, tone: "current" }],
              pointers: [],
              explanation: "Insert-head on an empty list: create node `10`, its `next` is null, and `HEAD` points at it.",
            },
            {
              cells: [
                { value: 10, tone: "default" },
                { value: 20, tone: "current" },
              ],
              pointers: [{ index: 0, label: "curr", tone: "accent" }],
              explanation: "Insert-tail `20`: `curr` walks to node 0 (the tail), then the new node is linked after it.",
            },
            {
              cells: [
                { value: 10, tone: "current" },
                { value: 20, tone: "default" },
              ],
              pointers: [{ index: 0, label: "curr", tone: "accent" }],
              explanation: "Search `15`: compare node 0 (`10`) — no match, advance.",
            },
            {
              cells: [
                { value: 10, tone: "default" },
                { value: 20, tone: "current" },
              ],
              pointers: [{ index: 1, label: "curr", tone: "accent" }],
              explanation: "Compare node 1 (`20`) — no match, advance to null. `15` is **not found** after 2 visits.",
            },
          ],
        },
        {
          type: "table",
          caption: "Pointer re-wiring for insert at index 1 (value 15) on [10, 20].",
          headers: ["Step", "Action", "List after"],
          rows: [
            ["1", "Create node 15", "[10, 20] (15 unlinked)"],
            ["2", "New node's next → node 1 (20)", "[10, 20] (15 points at 20)"],
            ["3", "Node 0's next → new node", "[10, 15, 20]"],
          ],
        },
      ],
    },
    {
      id: "code",
      title: "Code walkthrough",
      blocks: [
        {
          type: "paragraph",
          text: "The visualizer shows one snippet per operation (select it in the Operation dropdown). All share the `Node` struct; the three most instructive are explained line by line, the rest follow the same walking-and-rewiring pattern:",
        },
        {
          type: "code",
          language: "cpp",
          code: LL_CODE["insert-head"],
          caption: "Insert at head — shown when Insert Head is selected.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Line 7 allocates the new node holding `x`.",
            "Line 8 aims its `next` at the current head (possibly null — fine).",
            "Line 9 swings `head` onto the new node. Three lines, zero walking: O(1).",
          ],
        },
        {
          type: "code",
          language: "cpp",
          code: LL_CODE["delete-value"],
          caption: "Delete by value — shown when Delete Value is selected.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Lines 7–9 bail out on an empty list — deleting from nothing is an error, not a crash.",
            "Lines 10–15 special-case the head: move `head` past it and free it.",
            "Lines 16–17 plant `prev`/`curr` for the walk.",
            "Lines 18–26 scan for the value; line 20 **bypasses** the found node, which unlinks it in one assignment.",
          ],
        },
        {
          type: "code",
          language: "cpp",
          code: LL_CODE.search,
          caption: "Search — shown when Search is selected. Walk, compare, return.",
        },
        {
          type: "code",
          language: "cpp",
          code: LL_CODE["insert-tail"],
          caption: "Insert at tail — walk to the end, then link. O(n) because of the walk.",
        },
        {
          type: "code",
          language: "cpp",
          code: LL_CODE["insert-index"],
          caption: "Insert at index — bounds check, walk to i−1, re-wire two pointers.",
        },
        {
          type: "code",
          language: "cpp",
          code: LL_CODE["delete-head"],
          caption: "Delete at head — move head past the first node and free it. O(1).",
        },
        {
          type: "code",
          language: "cpp",
          code: LL_CODE.traverse,
          caption: "Traverse — the curr-until-null loop every other operation contains.",
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
            "**Insert/delete at head O(1):** head is tracked directly — a few pointer assignments, no walking.",
            "**Insert at tail / index, delete by value, search, traverse O(n):** each must walk from the head, visiting up to n nodes in the worst and average cases.",
            "**Space O(n):** one node per element, plus a pointer per node — more overhead per element than an array.",
          ],
        },
        {
          type: "callout",
          tone: "note",
          title: "Why is index access O(n)?",
          text: "Arrays compute element i as base + i × size instantly. A linked list has no such arithmetic — the only route to node i is following i pointers from the head.",
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
            "**O(1) head edits:** push/pop at the front without shifting anything.",
            "**Grows gracefully:** add nodes one at a time — no resizing, no wasted capacity.",
            "**Deletion without shifting:** bypassing a node unlinks it instantly once found.",
            "**O(n) access and search:** no index arithmetic; everything starts at the head.",
            "**Pointer overhead:** every element pays for a `next` pointer plus allocation bookkeeping.",
            "**Cache-unfriendly:** scattered nodes defeat CPU caches that love contiguous arrays.",
            "**Fragile pointers:** one wrong assignment loses the list, dangles, or leaks (in C++).",
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
          text: "Use linked lists when edits concentrate at the **ends** (stacks and queues are often linked underneath), when the size **changes unpredictably**, or when you need **O(1) splicing** — cutting and rejoining chains, as in music playlists or browser history. They are also the backbone of hash-table buckets, adjacency lists, and LRU caches.",
        },
        {
          type: "paragraph",
          text: "Do not use them for **random access**, **frequent searching**, or **number crunching** — arrays win all three via cache-friendly contiguous memory. In most application code, a dynamic array is the better default.",
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
            "**Losing the head:** overwriting `head` before saving it orphans the entire list.",
            "**Wrong re-wire order:** link new→next before prev→next, or the tail is lost.",
            "**Null dereference:** walking `curr->next` without checking `curr != nullptr` — every loop needs the null test.",
            "**Leaks in C++:** bypassing without `delete` abandons memory; deleting while still linked dangles.",
            "**Empty-list operations:** delete/search/traverse on null head must report cleanly, as this visualizer's error steps do.",
            "**Index out of range:** inserting at index 5 of a 1-node list is an error, not an append — validate bounds first.",
            "**Off-by-one walks:** stopping one node early (or late) wires pointers to the wrong neighbours.",
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
            "**Doubly linked list:** each node also points backwards — O(1) deletion given the node, at double the pointer cost.",
            "**Circular list:** the tail points back to the head — round-robin scheduling and ring buffers.",
            "**Singly vs arrays:** the eternal trade — pointer flexibility against cache-friendly indexing.",
            "**Sentinel nodes:** a dummy head/tail removes null special-cases from insert/delete code.",
            "**Trees and graphs:** nodes with more pointers per node — the linked list idea, generalised.",
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
            "Nodes chain data + next pointers from head to null.",
            "Head edits are O(1); everything else walks, so O(n).",
            "Re-wire in order: new node's next first, previous node's next second.",
            "Guard null head, validate indices, and free what you unlink in C++.",
            "Prefer arrays for access and search; lists for fluid ends and splicing.",
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
      title: "Linked lists — intuition with visuals",
      channel: "YouTube search results",
      url: "https://www.youtube.com/results?search_query=linked+list+data+structure+explained+mycodeschool",
      query: "linked list data structure explained mycodeschool",
      isSearchLink: true,
    },
    {
      title: "Linked list insertion and deletion in C++",
      channel: "YouTube search results",
      url: "https://www.youtube.com/results?search_query=linked+list+insertion+deletion+c%2B%2B",
      query: "linked list insertion deletion c++",
      isSearchLink: true,
    },
    {
      title: "Linked list visualization",
      channel: "YouTube search results",
      url: "https://www.youtube.com/results?search_query=linked+list+visualization+cs50",
      query: "linked list visualization cs50",
      isSearchLink: true,
    },
    {
      title: "Reverse a linked list — interview walkthrough",
      channel: "YouTube search results",
      url: "https://www.youtube.com/results?search_query=reverse+linked+list+neetcode",
      query: "reverse linked list neetcode",
      isSearchLink: true,
    },
  ],

  practice: [
    {
      title: "Reverse Linked List",
      platform: "LeetCode",
      note: "The pointer-rewiring exam: three pointers, one pass.",
    },
    {
      title: "Merge Two Sorted Lists",
      platform: "LeetCode",
      note: "Splicing two chains without extra nodes.",
    },
    {
      title: "Linked List Cycle",
      platform: "LeetCode",
      note: "Fast and slow pointers chasing through the chain.",
    },
  ],
};

export default theory;
