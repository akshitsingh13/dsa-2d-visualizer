# DSA 2D Visualizer

A step-by-step visualizer for data structures and algorithms, built with
React + Vite. Every algorithm is a **pure function** that returns an array of
step snapshots; the UI only replays those steps (play / pause / next /
previous / reset) alongside the C++ source with the active line highlighted.

![App screenshot](docs/screenshot.png)
![Demo GIF](docs/demo.gif)

> The images above are placeholders — drop real screenshots/GIFs into `docs/`.

## Features

- 2×2 panel layout: C++ code panel, visualizer + playback controls, control
  panel, and a theory + live-counter complexity panel.
- Playback with Previous / Play / Next / Reset and slow / normal / fast
  speed control.
- Live operation counters (comparisons, swaps, operations, nodes visited)
  next to the theoretical Big-O table.
- Input validation with clear error messages (including a sorted-array check
  with a "Sort array for me" fix-up for Binary Search).
- Persistent Stack / Queue / Linked List state across runs, with overflow /
  underflow and out-of-range handling.
- Keyboard-accessible controls with visible focus styles and
  `aria-live` step messages.
- 74 unit tests (Vitest) covering every step generator.

## Supported algorithms

| Algorithm   | Category         | Visualizer | Inputs                              |
| ----------- | ---------------- | ---------- | ----------------------------------- |
| Linear Search | Searching      | array      | array + target                      |
| Binary Search | Searching      | array (L/M/H pointers, eliminated shading) | sorted array + target |
| Bubble Sort | Sorting          | bars (compare / swap / sorted states) | array (max 12 values) |
| Stack       | Data Structures  | vertical column with TOP label, capacity 8 | Push / Pop / Peek / Clear |
| Queue       | Data Structures  | horizontal row with FRONT / REAR labels, capacity 8 | Enqueue / Dequeue / Peek / Clear |
| Linked List | Data Structures  | nodes with data/next cells, HEAD + curr/prev pointers, null terminator | Insert (head/tail/index), Delete (value/head), Search, Traverse |

## How to run

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm test         # run the Vitest unit tests
npm run build    # production build
npm run lint     # ESLint
```

## Project structure

```
src/
  algorithms/               # pure step generators (no UI logic)
    algorithmRegistry.js    # single source of truth (see contract below)
    linearSearch.js         # + LINES constants for code highlighting
    binarySearch.js
    bubbleSort.js
    stackOps.js / queueOps.js / linkedList.js
    stepTypes.js            # shared element states + counter labels
  arrayHelpers.js           # pure input parsing / validation
  hooks/useAlgorithmRunner.js  # step replay: play/pause/next/prev/reset/speed
  components/
    Sidebar/                # sections built from registry categories
    CodePanel/              # C++ display with active-line highlight
    Controls/               # ControlPanel (config-driven inputs) + PlaybackControls
    Visualizer/             # ArrayVisualizer, BarVisualizer, StackVisualizer,
                            # QueueVisualizer, LinkedListVisualizer, PointerLabels,
                            # ComplexityCounter (+ complexityHelpers)
    Theory/                 # TheoryButton + TheoryModal (dialog shell)
                            # TheoryContent + Resources + blocks/ renderers
  theory/                   # theory content: one file per concept
                            # (linearSearch.js, ...), categories.js, index.js lookup
```

## Theory cards

Every concept has a **Read & Learn More** button in the top-right corner of
the Controls panel. It opens a theory dialog (sidebar stays visible) with an
in-depth page: intuition, how it works, a worked trace, the exact C++ code
from the visualizer, complexity analysis, trade-offs, usage, mistakes,
variations, takeaways, videos and practice problems. Opening the dialog
pauses playback without losing the current run; closing (Esc, backdrop,
close button) returns focus to the button and the run continues untouched.

Content is plain JS data rendered by React — never HTML strings. The schema
per concept (`src/theory/<concept>.js`):

```js
{
  id: "BS", title: "Binary Search", category: "searching",
  summary: "1-2 sentence definition",
  sections: [
    { id: "intuition", title: "The big idea", blocks: [...] },
    // ...all ids in REQUIRED_SECTION_IDS (see src/theory/sections.js)
  ],
  videos: [{ title, channel, url, query, isSearchLink }],
  practice: [{ title, platform, note }],   // names only, never URLs
}
```

Block types (`src/components/Theory/blocks/`, see `BLOCK_TYPES` in
`src/theory/index.js`): `paragraph`, `list`, `code`, `table`, `callout`
(`tip`/`warning`/`note`), `trace` (static boxes in the visualizer style),
`complexityTable` (rendered straight from the registry, so theory and
visualizer can never disagree). Text supports `**bold**` and `` `code` ``.

### How to add theory for a new algorithm

1. Copy `src/theory/linearSearch.js` to `src/theory/<concept>.js`, set `id`
   to the registry id, and fill in all eleven required sections plus
   `videos` (3+) and `practice` (2+).
2. Import the C++ from the algorithm module (e.g. `BINARY_SEARCH_CODE`) for
   `code` blocks — never retype it, so it stays identical to the CodePanel.
3. Register the file in `src/theory/index.js` (`theories` map). If the
   category is new, add an intro to `src/theory/categories.js`.
4. Run `npm test` — the theory suite checks id parity, required sections,
   block validity, video URL forms, and code/complexity equality with the
   registry.

### How to replace a YouTube search link with a direct video link

1. Open the search URL from the theory file and pick the video.
2. Confirm the title and channel match the topic.
3. In the theory file, set `url` to `https://www.youtube.com/watch?v=<id>`,
   `title`/`channel` to the real ones, and `isSearchLink` to `false`.
4. The UI then shows the video title and channel instead of the
   "Search on YouTube" label. Never invent video IDs.

## How to add a new algorithm

## How to add a new algorithm

1. Write a pure step generator in `src/algorithms/`:
   `myAlgo(input...) -> steps[]`. Every step must be an **immutable snapshot**
   with `{ ..., codeLine, message }` plus the counters your algorithm reports
   (e.g. `comparisons`). Never mutate a previous step — copy data with
   `[...data]`.
2. Add a `LINES` object next to the generator mapping names to 1-based lines
   of your C++ snippet (e.g. `LINES = { FOR_LOOP: 4, COMPARE: 5 }`), and use
   those names in the steps instead of magic numbers.
3. Register it in `src/algorithms/algorithmRegistry.js`:

```js
MY: {
  name: "My Algo",
  category: "searching",       // searching | sorting | data-structures
  visualizer: "array",         // array | bars | stack | queue | linkedList
  algorithm: myAlgo,
  code: `...C++ source...`,    // string, or { op: code } per operation
  inputs: { array: true, target: true },
  complexity: { best: "O(1)", average: "O(n)", worst: "O(n)", space: "O(1)" },
  counters: ["comparisons"],   // live counters read from each step
},
```

4. If you need a new visual style, add a component in
   `src/components/Visualizer/` (with its own CSS file using the tokens in
   `src/index.css`), map it in the `VISUALIZERS` lookup in `src/App.jsx`,
   and reference it from the registry entry.
5. Add Vitest tests for the generator: normal case, empty input, single
   element, duplicates, not-found / error paths, and the invariant that
   steps never mutate earlier steps. Run `npm test`, `npm run lint`, and
   `npm run build` — all three must pass.
