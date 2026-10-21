// Stack theory.
//
// VIDEO LINKS: every entry below is a YouTube *search* link
// (isSearchLink: true). To replace one with a specific video, open the
// search URL, pick the video, then set url to
// "https://www.youtube.com/watch?v=<id>", title/channel to the real ones,
// and isSearchLink to false.

import { STACK_CODE } from "../algorithms/stackOps";

const theory = {
  id: "STK",
  title: "Stack",
  category: "data-structures",
  summary:
    "A stack is a last-in, first-out collection where you add (push) and remove (pop) elements from the same end, called the top — like a pile of plates.",

  sections: [
    {
      id: "intuition",
      title: "The big idea",
      blocks: [
        {
          type: "paragraph",
          text: "Think of a pile of plates: you add new plates on **top**, and you take plates from the **top**. The last plate you put down is the first one you pick up — **last in, first out (LIFO)**. A stack enforces exactly this discipline on data: one door in, same door out.",
        },
        {
          type: "paragraph",
          text: "That single restriction is the whole point. By forbidding access to the middle, a stack perfectly models **nesting and backtracking**: function calls, undo history, and brackets all open and close in reverse order, and a stack replays that order for free.",
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
            "**Push(x):** place `x` on the top. If the stack is full (here: 8 elements), refuse with an **overflow** error instead of corrupting memory.",
            "**Pop():** remove and return the top element. If the stack is empty, refuse with an **underflow** error.",
            "**Peek():** look at the top element **without removing it** — the safe way to inspect.",
            "Track the top with an index (`top = −1` means empty) or just use the end of an array.",
            "**Clear():** reset to empty in one step.",
          ],
        },
        {
          type: "callout",
          tone: "warning",
          title: "Empty and full are the whole game",
          text: "Nearly every stack bug is a missing emptiness or fullness check. Pop or peek only when something is there; push only when there is room.",
        },
      ],
    },
    {
      id: "worked-example",
      title: "Worked example",
      blocks: [
        {
          type: "paragraph",
          text: "The classic stack job: checking whether brackets balance in `([])`. Read left to right — push every opener, and on every closer check it matches the top, then pop. Boxes below run bottom → top, amber marks the newest:",
        },
        {
          type: "trace",
          title: "Trace: is ([]) balanced?",
          steps: [
            {
              cells: [{ value: "(", tone: "current" }],
              explanation: "Read `(` — an opener, so **push** it.",
            },
            {
              cells: [
                { value: "(", tone: "default" },
                { value: "[", tone: "current" },
              ],
              explanation: "Read `[` — an opener, so **push** it on top.",
            },
            {
              cells: [{ value: "(", tone: "default" }],
              explanation: "Read `]` — a closer. Top is `[`, a match, so **pop** it.",
            },
            {
              cells: [],
              explanation: "Read `)` — a closer. Top is `(`, a match, so **pop** it. Input exhausted and the stack is **empty: balanced**.",
            },
          ],
        },
        {
          type: "table",
          caption: "Same trace as a table — symbol, action, stack after.",
          headers: ["Symbol read", "Action", "Stack after (bottom → top)"],
          rows: [
            ["(", "Push", "("],
            ["[", "Push", "( ["],
            ["]", "Matches top — pop", "("],
            [")", "Matches top — pop", "Empty → balanced"],
          ],
        },
        {
          type: "paragraph",
          text: "Try `([)]` yourself: when `)` arrives the top is `[` — mismatch, so the string is unbalanced. One failed match check is all it takes, and the visualizer's pop/peek steps replay exactly this rhythm.",
        },
      ],
    },
    {
      id: "code",
      title: "Code walkthrough",
      blocks: [
        {
          type: "paragraph",
          text: "The visualizer shows one snippet per operation (select it in the Operation dropdown). All four share an array `arr` and a `top` index:",
        },
        {
          type: "code",
          language: "cpp",
          code: STACK_CODE.push,
          caption: "Push — the CodePanel shows this when Push is selected.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Line 2 guards the full stack (`top == MAX − 1`) — the overflow branch the visualizer turns into a red error step.",
            "Line 5 advances `top` to the free slot.",
            "Line 6 stores the value, which becomes the new top.",
          ],
        },
        {
          type: "code",
          language: "cpp",
          code: STACK_CODE.pop,
          caption: "Pop — shown when Pop is selected.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Line 2 guards the empty stack (`top == −1`) — the underflow branch.",
            "Line 5 reads the top value before touching anything.",
            "Line 6 retreats `top`, and line 7 hands the value back.",
          ],
        },
        {
          type: "code",
          language: "cpp",
          code: STACK_CODE.peek,
          caption: "Peek — shown when Peek is selected. Same guard, no removal.",
        },
        {
          type: "code",
          language: "cpp",
          code: STACK_CODE.clear,
          caption: "Clear — shown when Clear is selected. One assignment empties everything.",
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
            "**Push / pop / peek O(1):** each touches only the top slot — one array access, independent of size. Best, average and worst are identical because there is no searching or shifting.",
            "**Space O(n):** the array holds all n elements, so memory grows with the contents, not the operations.",
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
            "**O(1) everything:** push, pop and peek cost the same whether the stack holds 3 or 3 million items.",
            "**Tiny implementation:** an array and an index are enough.",
            "**Natural nesting model:** recursion, undo and brackets map onto it with zero translation.",
            "**No middle access:** the kth element is unreachable without popping everything above it.",
            "**Fixed capacity (array version):** a full stack overflows — size it right or use a linked version.",
            "**Overflow/underflow discipline required:** every operation needs its guard check.",
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
          text: "Use a stack whenever the most recent item must be handled first: the **function call stack** (each call pushes a frame, `return` pops it), **undo/redo** (each action pushes state, undo pops it), **balanced parentheses**, **depth-first search**, and **expression evaluation** (infix-to-postfix and postfix calculators are stack machines).",
        },
        {
          type: "paragraph",
          text: "Do not use a stack when you need the **oldest** item first (that is a queue), **random access** by index (that is an array), or to **search** contents (that is a list, tree, or hash table).",
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
            "**Pop/peek on empty:** always check emptiness first — underflow is the classic crash.",
            "**Push on full:** an 8-slot array silently overwriting slot 9 corrupts memory; the guard must refuse.",
            "**Off-by-one top:** decide once whether `top` points at the top element or the next free slot, and initialise empty consistently (`−1` vs `0`).",
            "**Peek vs pop confusion:** peeking in a loop without popping never advances — infinite loops love this bug.",
            "**Forgetting LIFO order:** popping twice returns the last two items in *reverse* — correct for stacks, surprising if you expected a queue.",
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
            "**Linked stack:** nodes chained by pointers instead of an array — no capacity limit, small per-node overhead.",
            "**Call stack:** the running program's own stack of function frames — recursion depth limits come from here.",
            "**Undo systems:** editors push document states; undo pops, redo re-pushes from a second stack.",
            "**Monotonic stacks:** keep elements in sorted order inside the stack — the trick behind “next greater element” problems.",
            "**Queue:** the mirror image — FIFO instead of LIFO, covered next in this app.",
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
            "A stack is LIFO: push and pop at the top only.",
            "Every operation is O(1); space is O(n).",
            "Guard every push (overflow) and every pop/peek (underflow).",
            "It is the natural tool for nesting: calls, undo, brackets, DFS.",
            "Need oldest-first or random access? Pick a queue or an array instead.",
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
      title: "Stack data structure — intuition",
      channel: "YouTube search results",
      url: "https://www.youtube.com/results?search_query=stack+data+structure+explained+mycodeschool",
      query: "stack data structure explained mycodeschool",
      isSearchLink: true,
    },
    {
      title: "Stack in C++ — array implementation",
      channel: "YouTube search results",
      url: "https://www.youtube.com/results?search_query=stack+implementation+c%2B%2B+array",
      query: "stack implementation c++ array",
      isSearchLink: true,
    },
    {
      title: "Balanced parentheses with a stack",
      channel: "YouTube search results",
      url: "https://www.youtube.com/results?search_query=balanced+parentheses+stack+neetcode",
      query: "balanced parentheses stack neetcode",
      isSearchLink: true,
    },
    {
      title: "Stack vs queue — which and when",
      channel: "YouTube search results",
      url: "https://www.youtube.com/results?search_query=stack+vs+queue+data+structure",
      query: "stack vs queue data structure",
      isSearchLink: true,
    },
  ],

  practice: [
    {
      title: "Valid Parentheses",
      platform: "LeetCode",
      note: "The bracket trace above, as a graded problem.",
    },
    {
      title: "Min Stack",
      platform: "LeetCode",
      note: "Design a stack with O(1) push, pop and minimum.",
    },
    {
      title: "Evaluate Reverse Polish Notation",
      platform: "LeetCode",
      note: "A postfix calculator is a stack machine in disguise.",
    },
  ],
};

export default theory;
