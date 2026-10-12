// Queue theory.
//
// VIDEO LINKS: every entry below is a YouTube *search* link
// (isSearchLink: true). To replace one with a specific video, open the
// search URL, pick the video, then set url to
// "https://www.youtube.com/watch?v=<id>", title/channel to the real ones,
// and isSearchLink to false.

import { QUEUE_CODE } from "../algorithms/queueOps";

const theory = {
  id: "QUE",
  title: "Queue",
  category: "data-structures",
  summary:
    "A queue is a first-in, first-out collection where new elements join at the rear and leave from the front — like a line of people waiting.",

  sections: [
    {
      id: "intuition",
      title: "The big idea",
      blocks: [
        {
          type: "paragraph",
          text: "Think of a ticket line: newcomers join at the **back**, the person at the **front** gets served next, and nobody cuts in. A queue enforces exactly this fairness — **first in, first out (FIFO)**. Where a stack replays history backwards, a queue preserves arrival order.",
        },
        {
          type: "paragraph",
          text: "That makes queues the structure of **waiting and scheduling**: print jobs, plateaued web requests, and graph traversals all need “whoever arrived first goes first”. Two ends, two jobs — `enqueue` at the rear, `dequeue` at the front.",
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
            "**Enqueue(x):** add `x` at the **rear**. If the queue is full (here: 8 elements), refuse with an **overflow** error.",
            "**Dequeue():** remove and return the **front** element; everything behind shifts one step forward. Empty queue? Refuse with an **underflow** error.",
            "**Peek():** look at the front element **without removing it**.",
            "Track both ends with `front` and `rear` indices (`front > rear` means empty).",
            "**Clear():** reset both ends to empty in one step.",
          ],
        },
        {
          type: "callout",
          tone: "warning",
          title: "The wasted-space trap",
          text: "In a naive array queue, dequeuing advances `front` forever while freed slots pile up behind it — the array looks full while half empty. The classic fix is a circular queue that wraps indices around with modulo. This visualizer shifts elements left instead, which is simple but costs O(n) per dequeue in a real array.",
        },
      ],
    },
    {
      id: "worked-example",
      title: "Worked example",
      blocks: [
        {
          type: "paragraph",
          text: "Enqueue `10`, enqueue `20`, then dequeue once. `FRONT`/`REAR` labels ride on the first/last box — both sit on one box when a single element remains:",
        },
        {
          type: "trace",
          title: "Trace: enqueue 10, enqueue 20, dequeue",
          steps: [
            {
              cells: [{ value: 10, tone: "current" }],
              pointers: [
                { index: 0, label: "FRONT", tone: "muted" },
                { index: 0, label: "REAR", tone: "muted" },
              ],
              explanation: "Enqueue `10`: it is simultaneously front and rear.",
            },
            {
              cells: [
                { value: 10, tone: "default" },
                { value: 20, tone: "current" },
              ],
              pointers: [
                { index: 0, label: "FRONT", tone: "muted" },
                { index: 1, label: "REAR", tone: "muted" },
              ],
              explanation: "Enqueue `20`: it joins at the rear; `10` still waits at the front.",
            },
            {
              cells: [{ value: 20, tone: "default" }],
              pointers: [
                { index: 0, label: "FRONT", tone: "muted" },
                { index: 0, label: "REAR", tone: "muted" },
              ],
              explanation: "Dequeue: `10` leaves from the front, `20` shifts left and inherits both labels.",
            },
          ],
        },
        {
          type: "table",
          caption: "Front and rear after each step of the trace.",
          headers: ["Step", "Action", "Queue", "Front", "Rear"],
          rows: [
            ["1", "Enqueue 10", "[10]", "10", "10"],
            ["2", "Enqueue 20", "[10, 20]", "10", "20"],
            ["3", "Dequeue → 10", "[20]", "20", "20"],
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
          text: "The visualizer shows one snippet per operation (select it in the Operation dropdown), all sharing an array with `front` and `rear` indices:",
        },
        {
          type: "code",
          language: "cpp",
          code: QUEUE_CODE.enqueue,
          caption: "Enqueue — the CodePanel shows this when Enqueue is selected.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Line 2 guards the full queue (`rear == MAX − 1`) — the overflow branch.",
            "Line 5 advances `rear` to the free slot.",
            "Line 6 stores the value at the new rear.",
          ],
        },
        {
          type: "code",
          language: "cpp",
          code: QUEUE_CODE.dequeue,
          caption: "Dequeue — shown when Dequeue is selected.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Line 2 guards the empty queue (`front > rear`) — the underflow branch.",
            "Line 5 reads the front value.",
            "Line 6 advances `front`, and line 7 returns the value.",
          ],
        },
        {
          type: "code",
          language: "cpp",
          code: QUEUE_CODE.peek,
          caption: "Peek — shown when Peek is selected. Same guard, no removal.",
        },
        {
          type: "code",
          language: "cpp",
          code: QUEUE_CODE.clear,
          caption: "Clear — shown when Clear is selected. Both ends reset at once.",
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
            "**Enqueue / dequeue / peek O(1):** each touches only one end — a single array access regardless of size.",
            "**Space O(n):** the array stores all n waiting elements.",
            "**Honest footnote:** this O(1) dequeue assumes front/rear indices (or a circular buffer). Physically shifting every element left, as the animation suggests, would cost O(n) — fine for learning, wasteful in production.",
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
            "**Fair ordering:** arrival order is preserved automatically — no timestamps or priorities needed.",
            "**O(1) ends:** both enqueue and dequeue are constant-time with indices.",
            "**Simple contract:** two ends, three operations, almost nothing to misuse.",
            "**No middle access:** like stacks, interior elements are unreachable by design.",
            "**Naive arrays waste space:** freed front slots are unusable without shifting or wrapping — use a circular queue in real code.",
            "**Fixed capacity (array version):** bursts beyond 8 slots overflow here.",
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
          text: "Use a queue for anything that must be served **in arrival order**: task schedulers, print spools, message buffers, request throttling (“recent calls” windows), and **breadth-first search**, which is literally “dequeue a node, enqueue its neighbours” on repeat.",
        },
        {
          type: "paragraph",
          text: "Do not use a plain queue when the **newest** item matters most (stack), when **priority** beats arrival order (priority queue / heap), or when you need **both ends** (deque).",
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
            "**Dequeue/peek on empty:** the underflow guard (`front > rear`) must come first, always.",
            "**Enqueue on full:** refusing beats silently overwriting the front element.",
            "**Front/rear mix-ups:** enqueue touches `rear`, dequeue touches `front` — swapping them builds a very confusing stack.",
            "**Forgetting the shift or wrap:** in this visualizer the boxes visibly shift left; in index-based code the `front++` does the same job — pick one mechanism and be consistent.",
            "**Assuming peek removes:** peek only looks. Loops that never dequeue spin forever.",
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
            "**Circular queue:** indices wrap with modulo, recycling freed slots — the production fix for the wasted-space trap.",
            "**Deque (double-ended queue):** add and remove at both ends; a stack and a queue in one structure.",
            "**Priority queue:** dequeue order follows importance, not arrival — usually a heap underneath.",
            "**Implementing queues with stacks (and vice versa):** classic interview puzzle proving the two are inter-expressible with amortised O(1) cost.",
            "**BFS:** breadth-first search is a queue algorithm; DFS is its stack twin.",
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
            "A queue is FIFO: enqueue at the rear, dequeue at the front.",
            "End operations are O(1) with front/rear indices; space is O(n).",
            "Naive arrays strand empty front slots — circular queues recycle them.",
            "It is the structure of fairness: scheduling, buffering, BFS.",
            "Need newest-first, priority, or both ends? Pick a stack, heap, or deque.",
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
      title: "Queue data structure — intuition",
      channel: "YouTube search results",
      url: "https://www.youtube.com/results?search_query=queue+data+structure+explained+mycodeschool",
      query: "queue data structure explained mycodeschool",
      isSearchLink: true,
    },
    {
      title: "Circular queue in C++",
      channel: "YouTube search results",
      url: "https://www.youtube.com/results?search_query=circular+queue+c%2B%2B+implementation",
      query: "circular queue c++ implementation",
      isSearchLink: true,
    },
    {
      title: "Queue with two stacks — interview problem",
      channel: "YouTube search results",
      url: "https://www.youtube.com/results?search_query=implement+queue+using+stacks+neetcode",
      query: "implement queue using stacks neetcode",
      isSearchLink: true,
    },
    {
      title: "BFS uses a queue — graph traversal",
      channel: "YouTube search results",
      url: "https://www.youtube.com/results?search_query=breadth+first+search+queue+explained",
      query: "breadth first search queue explained",
      isSearchLink: true,
    },
  ],

  practice: [
    {
      title: "Implement Queue using Stacks",
      platform: "LeetCode",
      note: "Build FIFO behaviour out of two LIFO stacks.",
    },
    {
      title: "Number of Recent Calls",
      platform: "LeetCode",
      note: "A sliding time window is a queue problem in disguise.",
    },
    {
      title: "Binary Tree Level Order Traversal",
      platform: "LeetCode",
      note: "Breadth-first traversal — queues doing what they do best.",
    },
  ],
};

export default theory;
