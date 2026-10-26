# DSA 2D Visualizer

A responsive, educational step-by-step visualizer for core Data Structures and Algorithms, built with **React 19** and **Vite**.

The application is architected around a **pure function replay model**: algorithm routines take inputs and return an immutable array of step snapshots. The visualizer replays these steps with fine-grained playback controls (Play, Pause, Step Forward, Step Back, Reset, Speed Selection), synchronized side-by-side with formatted C++ source code, live element highlights, step explanations, operation counters, rigorous time/space complexity derivations, and curated learning resources.

---

## Table of Contents

1. [Educational Objectives](#educational-objectives)
2. [Supported Algorithms & Data Structures](#supported-algorithms--data-structures)
3. [Key Features & User Interface](#key-features--user-interface)
4. [Architecture & Pure Replay Model](#architecture--pure-replay-model)
5. [Directory Structure](#directory-structure)
6. [Complexity Analysis & Derivation Engine](#complexity-analysis--derivation-engine)
7. [Learning & Resources System](#learning--resources-system)
8. [Installation & Getting Started](#installation--getting-started)
9. [Developer Guide: Adding a New Algorithm](#developer-guide-adding-a-new-algorithm)
10. [Testing & Quality Assurance](#testing--quality-assurance)
11. [Design Philosophy & Constraints](#design-philosophy--constraints)
12. [License](#license)

---

## Educational Objectives

Standard algorithm visualizations frequently jump straight to final states or show abstract animations disconnected from implementation code. DSA 2D Visualizer is built for computer science students and educators to bridge that gap:

- **Code-Visualizer Synchronization**: Every state transition explicitly points to the corresponding C++ source line (`codeLine`) and provides a human-readable description (`message`).
- **Mathematical Derivations**: Rather than just stating Big-O notation, the interactive Complexity Analysis module breaks down operation counts, summations, recurrence relations, and asymptotic bounds ($\mathcal{O}$, $\Omega$, $\Theta$) for Best, Average, and Worst cases.
- **Deep Conceptual Theory**: Dedicated learning modules provide algorithmic intuition, step-by-step execution traces, real-world applications, common pitfalls, and curated practice problems.
- **Deterministic & Sandboxed**: All algorithms run as pure deterministic generators in memory with zero side effects or external network dependencies.

---

## Supported Algorithms & Data Structures

| Category | Algorithm / Structure | Key ID | Visualizer Type | Supported Operations / Inputs |
| :--- | :--- | :--- | :--- | :--- |
| **Searching** | Linear Search | `LS` | `array` | Sequential scan with target search (`array`, `target`) |
| **Searching** | Binary Search | `BS` | `array` | Logarithmic search with Low (`L`), Mid (`M`), High (`H`) bounds and range elimination (`array`, `target`) |
| **Sorting** | Bubble Sort | `BUB` | `bars` | Adjacent element comparisons, dynamic swaps, and sorted boundary tracking (`array`) |
| **Data Structures** | Stack | `STK` | `stack` | LIFO vertical column: `Push`, `Pop`, `Peek`, `Clear` (Capacity: 8) |
| **Data Structures** | Queue | `QUE` | `queue` | FIFO horizontal row with FRONT and REAR pointers: `Enqueue`, `Dequeue`, `Peek`, `Clear` (Capacity: 8) |
| **Data Structures** | Singly Linked List | `LL` | `linkedList` | Pointer-linked nodes: `Insert Head`, `Insert Tail`, `Insert at Index`, `Delete Head`, `Delete by Value`, `Search`, `Traverse` |
| **Data Structures** | Binary Search Tree | `BST` | `tree` | Deterministic 2D SVG tree: `Insert`, `Search`, `In-Order`, `Pre-Order`, `Post-Order`, `Clear` |
| **Data Structures** | Graph | `GRAPH` | `graph` | Undirected circular 2D SVG graph: `Breadth-First Search (BFS)`, `Depth-First Search (DFS)`, `Add Vertex`, `Add Edge`, `Clear` |

---

## Key Features & User Interface

The interface uses a 4-panel responsive grid designed to keep all relevant information visible without context-switching:

1. **C++ Code Panel**: Displays clean, idiomatic C++ source code. The active line is highlighted in real-time as execution progresses through each step snapshot.
2. **Visualizer Panel**: Dedicated 2D visual canvas tailored to the active data structure or algorithm:
   - Horizontal indexed array boxes with dynamic pointer tags (`L`, `M`, `H`).
   - Value-scaled vertical bar graphs with color-coded comparison, swap, and sorted states.
   - Bounded stack frames with `TOP` indicators and overflow/underflow warnings.
   - Bounded queue slots with `FRONT` / `REAR` markers and directional flow arrows.
   - Linked nodes with next-pointer arrows, `HEAD` indicators, and traversal highlights.
   - 2D SVG Binary Search Tree layout computed via monotonic in-order x-spacing and level-depth y-coordinates.
   - 2D SVG Graph layout computed via circular vertex distribution with active frontier and edge highlights.
3. **Control Panel**:
   - Algorithm-specific parameter inputs (array entries, numeric values, indices, starting vertices).
   - In-line input validation with user-friendly error messages and automatic sort fix-up for Binary Search.
   - Persistent data structure operations with bounds checking.
   - Responsive playback bar: **Step Back**, **Play / Pause**, **Step Forward**, **Reset**, and Speed toggles (**0.5x**, **1x**, **2x**).
4. **Time & Space Complexity Panel**:
   - Asymptotic Big-O summary table (Best, Average, Worst, Auxiliary Space).
   - Live operation counters (Comparisons, Swaps, Memory Operations, Nodes Visited) that increment strictly in sync with step snapshots.
   - **Complexity Analysis Button**: Opens the detailed step-by-step mathematical derivation dialog.
5. **Learning & Resources Page**: Accessible via the header navigation, providing structured educational guides, diagrams, and external reference links for every supported topic.

---

## Architecture & Pure Replay Model

DSA 2D Visualizer enforces a strict separation between **algorithm execution** and **UI rendering**:

```
[User Input / Trigger]
          │
          ▼
┌───────────────────────────────┐
│     Pure Step Generator       │  (e.g., linearSearch, bstOps, graphOps)
│  - Receives input data        │
│  - Executes logic in memory   │
│  - Emits immutable snapshots  │
└──────────────┬────────────────┘
               │  Array of step snapshots: [ { array, codeLine, message, ... }, ... ]
               ▼
┌───────────────────────────────┐
│     useAlgorithmRunner        │  Custom Hook
│  - Manages active step index  │
│  - Handles Play/Pause timers  │
│  - Step Forward / Step Back   │
│  - Deterministic reset        │
└──────────────┬────────────────┘
               │  Current step snapshot
               ▼
┌───────────────────────────────┐
│        UI Components          │
│  - CodePanel (highlights line)│
│  - Visualizer (renders frame) │
│  - ComplexityCounter (counts) │
└───────────────────────────────┘
```

### Invariant Guarantees
- **No side effects inside step generators**: Step generator functions are pure JavaScript. They do not touch the DOM, dispatch React actions, or read browser timers.
- **Immutability**: Every step snapshot deep-copies its array or structure state (e.g., `[...currentArray]`). Mutating past step states is strictly prohibited and covered by automated regression tests.
- **Speed Independence**: Operation counts represent logical operations performed by the algorithm, completely independent of playback speed or UI frame rates.

---

## Directory Structure

```
dsa-2d-visualizer/
├── src/
│   ├── algorithms/               # Pure step generators & complexity data
│   │   ├── algorithmRegistry.js  # Central algorithm definitions & metadata
│   │   ├── binarySearch.js       # Binary search step generator & C++ source
│   │   ├── bstOps.js             # BST tree operations & traversal generators
│   │   ├── bubbleSort.js         # Bubble sort step generator & C++ source
│   │   ├── complexityAnalysis.js # Mathematical derivation records & live metric specs
│   │   ├── graphOps.js           # Graph operations, BFS, and DFS generators
│   │   ├── linearSearch.js       # Linear search step generator & C++ source
│   │   ├── linkedList.js         # Singly linked list operations & traversal
│   │   ├── queueOps.js           # Bounded queue operations
│   │   ├── stackOps.js           # Bounded stack operations
│   │   └── stepTypes.js          # Shared visual element status constants
│   ├── components/
│   │   ├── CodePanel/            # Syntax-highlighted C++ source code display
│   │   ├── ComplexityAnalysis/   # Step-by-step mathematical derivation modal
│   │   ├── Controls/             # Config-driven parameter inputs & playback bar
│   │   ├── Header/               # Application title bar & navigation links
│   │   ├── Learning/             # Comprehensive Learning & Resources pages
│   │   ├── Sidebar/              # Topic navigation categorized by algorithm domain
│   │   └── Visualizer/           # Visual canvas renderers (Array, Bars, Stack, Queue, LL, Tree, Graph)
│   ├── data/
│   │   └── learningResources.js  # Structured educational content, theory, and external links
│   ├── hooks/
│   │   └── useAlgorithmRunner.js # Playback state machine & step scheduling engine
│   ├── test/                     # Vitest test suites (159 tests across 15 suites)
│   ├── arrayHelpers.js           # Sanitization and validation for user inputs
│   ├── App.jsx                   # Main application layout coordinator
│   ├── main.jsx                  # React DOM mount point
│   └── index.css                 # Global design system tokens & styling
├── package.json
├── vite.config.js
└── eslint.config.js
```

---

## Complexity Analysis & Derivation Engine

Clicking **"Complexity Analysis"** opens a dedicated modal that provides mathematically sound derivations rather than static labels:

- **Best-Case Derivation**: Explains the precise input condition triggering minimum work (e.g., target found at mid index on first check for Binary Search, or sorted input with zero swaps for Bubble Sort), proving the asymptotic lower bound ($\Omega$ or $\Theta$).
- **Average-Case Derivation**: Explains uniform probability distribution assumptions across array indices or permutations, evaluating the expected number of comparisons.
- **Worst-Case Derivation**: Explains the adversarial input configuration (e.g., target absent, reversed array), setting up the summation or recurrence relation and showing asymptotic reduction to $\mathcal{O}(f(n))$.
- **Auxiliary Space Derivation**: Explicitly distinguishes between input space $\mathcal{O}(n)$ and algorithm auxiliary working space $\mathcal{O}(1)$ or call stack depth $\mathcal{O}(h)$, contrasting algorithm space with visualizer memory.
- **Live Execution Synchronization**: Displays live counters for the ongoing visualization run alongside theoretical limits to verify empirical execution against mathematical formulas.

---

## Learning & Resources System

The integrated Learning & Resources section provides college-level curriculum material for each topic:
- **Intuition & Core Concept**: Real-world analogies and high-level mechanics.
- **Step-by-Step Walkthrough**: Detailed trace breakdowns of algorithms on sample inputs.
- **C++ Reference Implementation**: Complete, tested code snippets matching the visualizer's line-by-line model.
- **Common Mistakes & Edge Cases**: Highlights common off-by-one errors, infinite loops, and boundary pitfalls.
- **Curated Videos & Practice Problems**: Direct references to high-quality educational videos and practice platforms.

---

## Installation & Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/akshitsingh13/dsa-2d-visualizer.git
   cd dsa-2d-visualizer
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Run the test suite**:
   ```bash
   npm test
   ```

5. **Execute ESLint check**:
   ```bash
   npm run lint
   ```

6. **Create a production build**:
   ```bash
   npm run build
   ```
   Outputs optimized static assets to `dist/`.

---

## Developer Guide: Adding a New Algorithm

To add a new algorithm (e.g., *Selection Sort* or *Binary Search Tree Deletion*):

### 1. Write the Step Generator
Create a module in `src/algorithms/` (e.g., `selectionSort.js`).
Define a named constant object for C++ code lines:
```js
export const SELECTION_SORT_LINES = {
  LOOP_I: 3,
  FIND_MIN: 5,
  SWAP: 8,
};
```
Write the pure step generator returning an array of snapshot objects:
```js
export function selectionSortSteps(initialArray) {
  const steps = [];
  const arr = [...initialArray];
  // Push initial snapshot
  steps.push({
    array: [...arr],
    codeLine: SELECTION_SORT_LINES.LOOP_I,
    message: "Starting Selection Sort",
    comparisons: 0,
    swaps: 0,
  });
  // Execute algorithm, pushing immutable copies [...arr] at every step
  return steps;
}
```

### 2. Register the Algorithm
Open `src/algorithms/algorithmRegistry.js` and add an entry:
```js
SS: {
  id: "SS",
  name: "Selection Sort",
  category: "sorting",
  visualizer: "bars",
  algorithm: (params) => selectionSortSteps(params.array),
  code: SELECTION_SORT_CODE,
  inputs: { array: true },
  complexity: {
    best: "O(n²)",
    average: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
  },
  counters: ["comparisons", "swaps"],
}
```

### 3. Add Complexity Derivation
Add mathematical derivation metadata in `src/algorithms/complexityAnalysis.js` specifying input size calculation, metrics, and best/average/worst derivations.

### 4. Add Learning Content
Add educational explanations, sections, and resources to `src/data/learningResources.js`.

### 5. Write Unit Tests
Create `src/test/selectionSort.test.js` covering:
- Normal execution path.
- Edge cases (empty array, single element, already sorted, reverse sorted).
- Snapshot immutability verification (mutating later steps does not alter earlier snapshots).

---

## Testing & Quality Assurance

The codebase maintains automated test suites using **Vitest** with 100% test passing rates across all generators, data structure operations, and derivation engines:

- **Pure Generator Verification**: Validates correct state progression and final outputs.
- **Snapshot Immutability Tests**: Guarantees that step generation deep-copies data arrays.
- **Input Validation Tests**: Ensures invalid user inputs (out-of-range indices, unsorted arrays, malformed numbers) are cleanly caught.
- **Registry & Schema Consistency Tests**: Verifies that every registered algorithm matches the required contract, code line mapping, and complexity shapes.

To run tests in watch mode during development:
```bash
npx vitest
```

---

## Design Philosophy & Constraints

- **Zero Heavy External UI Frameworks**: Built using pure semantic React and modern CSS variables without heavyweight component library dependencies, keeping load times near-instantaneous.
- **Accessibility (`a11y`)**: Features high-contrast color palettes, visible keyboard focus rings, semantic buttons, and ARIA live regions for screen readers.
- **Robust Error Handling**: Non-blocking form validation prevents runtime exceptions on user input errors.
- **Predictable Performance**: Rendering updates are tied strictly to integer step transitions, preventing memory leaks and frame jitter.

---

## License

This project is licensed under the [MIT License](LICENSE).
