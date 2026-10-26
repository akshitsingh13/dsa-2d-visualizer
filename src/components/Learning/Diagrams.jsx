import { useState } from "react";
import "./Diagrams.css";

// 1. Linear Search Educational Step Diagram
export function LinearSearchDiagram() {
  const steps = [
    {
      label: "Step 1: Check Index 0",
      description: "Compare target (20) with arr[0] (40). 40 ≠ 20. Target not found yet.",
      array: [
        { val: 40, state: "comparing", label: "i = 0" },
        { val: 10, state: "unvisited" },
        { val: 70, state: "unvisited" },
        { val: 20, state: "target" },
        { val: 50, state: "unvisited" },
      ],
      comparisons: 1,
    },
    {
      label: "Step 2: Check Index 1",
      description: "Advance i = 1. Compare target (20) with arr[1] (10). 10 ≠ 20. Move forward.",
      array: [
        { val: 40, state: "checked" },
        { val: 10, state: "comparing", label: "i = 1" },
        { val: 70, state: "unvisited" },
        { val: 20, state: "target" },
        { val: 50, state: "unvisited" },
      ],
      comparisons: 2,
    },
    {
      label: "Step 3: Check Index 2",
      description: "Advance i = 2. Compare target (20) with arr[2] (70). 70 ≠ 20. Move forward.",
      array: [
        { val: 40, state: "checked" },
        { val: 10, state: "checked" },
        { val: 70, state: "comparing", label: "i = 2" },
        { val: 20, state: "target" },
        { val: 50, state: "unvisited" },
      ],
      comparisons: 3,
    },
    {
      label: "Step 4: Check Index 3 (Found!)",
      description: "Advance i = 3. Compare target (20) with arr[3] (20). 20 == 20! Match found at index 3.",
      array: [
        { val: 40, state: "checked" },
        { val: 10, state: "checked" },
        { val: 70, state: "checked" },
        { val: 20, state: "found", label: "Match! i = 3" },
        { val: 50, state: "unvisited" },
      ],
      comparisons: 4,
    },
  ];

  const [stepIdx, setStepIdx] = useState(0);
  const current = steps[stepIdx];

  return (
    <div className="edu-diagram-box">
      <div className="diagram-header">
        <span className="diagram-title">Interactive Walkthrough: Searching for Target = 20</span>
        <span className="diagram-step-counter">
          Step {stepIdx + 1} of {steps.length}
        </span>
      </div>

      <div className="diagram-canvas">
        <div className="array-diagram-row">
          {current.array.map((item, idx) => (
            <div key={idx} className="array-diagram-cell-wrapper">
              <span className="cell-index">[{idx}]</span>
              <div className={`array-diagram-cell ${item.state}`}>
                {item.val}
              </div>
              {item.label && <span className="cell-pointer">{item.label}</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="diagram-caption">
        <strong>{current.label}:</strong> {current.description}
        <span className="metric-tag">Total Comparisons: {current.comparisons}</span>
      </div>

      <div className="diagram-controls">
        <button
          type="button"
          onClick={() => setStepIdx((p) => Math.max(0, p - 1))}
          disabled={stepIdx === 0}
          className="diag-nav-btn"
        >
          &larr; Previous Step
        </button>
        <button
          type="button"
          onClick={() => setStepIdx((p) => Math.min(steps.length - 1, p + 1))}
          disabled={stepIdx === steps.length - 1}
          className="diag-nav-btn primary"
        >
          Next Step &rarr;
        </button>
      </div>
    </div>
  );
}

// 2. Binary Search Educational Step Diagram
export function BinarySearchDiagram() {
  const steps = [
    {
      label: "Step 1: Check Entire Sorted Range",
      description: "Low = 0, High = 6. Mid = 0 + (6 - 0) / 2 = 3. arr[3] = 34. Target (56) > 34, so discard left half [0..3].",
      array: [
        { val: 12, state: "normal" },
        { val: 18, state: "normal" },
        { val: 25, state: "normal" },
        { val: 34, state: "mid", pointer: "mid (3)" },
        { val: 45, state: "normal" },
        { val: 56, state: "target" },
        { val: 89, state: "normal" },
      ],
      low: 0,
      high: 6,
    },
    {
      label: "Step 2: Narrow Search Interval to Right Half",
      description: "Low = 4, High = 6. Mid = 4 + (6 - 4) / 2 = 5. arr[5] = 56. 56 == Target (56). Found at index 5!",
      array: [
        { val: 12, state: "discarded" },
        { val: 18, state: "discarded" },
        { val: 25, state: "discarded" },
        { val: 34, state: "discarded" },
        { val: 45, state: "normal" },
        { val: 56, state: "found", pointer: "mid = target (5)" },
        { val: 89, state: "normal" },
      ],
      low: 4,
      high: 6,
    },
  ];

  const [stepIdx, setStepIdx] = useState(0);
  const current = steps[stepIdx];

  return (
    <div className="edu-diagram-box">
      <div className="diagram-header">
        <span className="diagram-title">Interactive Walkthrough: Binary Search Target = 56</span>
        <span className="diagram-step-counter">
          Step {stepIdx + 1} of {steps.length}
        </span>
      </div>

      <div className="diagram-canvas">
        <div className="array-diagram-row">
          {current.array.map((item, idx) => (
            <div key={idx} className="array-diagram-cell-wrapper">
              <span className="cell-index">
                {idx === current.low ? "L " : ""}
                {idx === current.high ? "H " : ""}
                [{idx}]
              </span>
              <div className={`array-diagram-cell ${item.state}`}>
                {item.val}
              </div>
              {item.pointer && <span className="cell-pointer">{item.pointer}</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="diagram-caption">
        <strong>{current.label}:</strong> {current.description}
      </div>

      <div className="diagram-controls">
        <button
          type="button"
          onClick={() => setStepIdx((p) => Math.max(0, p - 1))}
          disabled={stepIdx === 0}
          className="diag-nav-btn"
        >
          &larr; Previous Step
        </button>
        <button
          type="button"
          onClick={() => setStepIdx((p) => Math.min(steps.length - 1, p + 1))}
          disabled={stepIdx === steps.length - 1}
          className="diag-nav-btn primary"
        >
          Next Step &rarr;
        </button>
      </div>
    </div>
  );
}

// 3. Bubble Sort Educational Step Diagram
export function BubbleSortDiagram() {
  const steps = [
    {
      label: "Pass 1, Comparison 1",
      description: "Compare arr[0] (50) and arr[1] (20). Since 50 > 20, swap them.",
      array: [
        { val: 50, state: "comparing" },
        { val: 20, state: "comparing" },
        { val: 40, state: "normal" },
        { val: 10, state: "normal" },
      ],
      swapped: true,
    },
    {
      label: "Pass 1, Comparison 2",
      description: "Compare arr[1] (50) and arr[2] (40). 50 > 40, swap them.",
      array: [
        { val: 20, state: "normal" },
        { val: 50, state: "comparing" },
        { val: 40, state: "comparing" },
        { val: 10, state: "normal" },
      ],
      swapped: true,
    },
    {
      label: "Pass 1, Comparison 3 (Largest Bubbled to End)",
      description: "Compare arr[2] (50) and arr[3] (10). 50 > 10, swap them. 50 is now locked in its final sorted position!",
      array: [
        { val: 20, state: "normal" },
        { val: 40, state: "normal" },
        { val: 10, state: "normal" },
        { val: 50, state: "sorted", pointer: "Sorted" },
      ],
      swapped: true,
    },
    {
      label: "Pass 2, Comparison 1",
      description: "Compare arr[0] (20) and arr[1] (40). 20 < 40, no swap needed.",
      array: [
        { val: 20, state: "comparing" },
        { val: 40, state: "comparing" },
        { val: 10, state: "normal" },
        { val: 50, state: "sorted" },
      ],
      swapped: false,
    },
    {
      label: "Pass 2, Comparison 2",
      description: "Compare arr[1] (40) and arr[2] (10). 40 > 10, swap them. 40 is now in final sorted position!",
      array: [
        { val: 20, state: "normal" },
        { val: 10, state: "normal" },
        { val: 40, state: "sorted", pointer: "Sorted" },
        { val: 50, state: "sorted" },
      ],
      swapped: true,
    },
    {
      label: "Pass 3 (Final Check)",
      description: "Compare arr[0] (20) and arr[1] (10). 20 > 10, swap. All elements now fully sorted: [10, 20, 40, 50].",
      array: [
        { val: 10, state: "sorted" },
        { val: 20, state: "sorted" },
        { val: 40, state: "sorted" },
        { val: 50, state: "sorted" },
      ],
      swapped: true,
    },
  ];

  const [stepIdx, setStepIdx] = useState(0);
  const current = steps[stepIdx];

  return (
    <div className="edu-diagram-box">
      <div className="diagram-header">
        <span className="diagram-title">Interactive Walkthrough: Bubble Sort Mechanics</span>
        <span className="diagram-step-counter">
          Step {stepIdx + 1} of {steps.length}
        </span>
      </div>

      <div className="diagram-canvas">
        <div className="array-diagram-row">
          {current.array.map((item, idx) => (
            <div key={idx} className="array-diagram-cell-wrapper">
              <span className="cell-index">[{idx}]</span>
              <div className={`array-diagram-cell ${item.state}`}>
                {item.val}
              </div>
              {item.pointer && <span className="cell-pointer">{item.pointer}</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="diagram-caption">
        <strong>{current.label}:</strong> {current.description}
      </div>

      <div className="diagram-controls">
        <button
          type="button"
          onClick={() => setStepIdx((p) => Math.max(0, p - 1))}
          disabled={stepIdx === 0}
          className="diag-nav-btn"
        >
          &larr; Previous Step
        </button>
        <button
          type="button"
          onClick={() => setStepIdx((p) => Math.min(steps.length - 1, p + 1))}
          disabled={stepIdx === steps.length - 1}
          className="diag-nav-btn primary"
        >
          Next Step &rarr;
        </button>
      </div>
    </div>
  );
}

// 4. Stack Educational Step Diagram
export function StackDiagram() {
  const steps = [
    {
      op: "Initial Empty Stack",
      desc: "Top = -1. Stack capacity = 4. Currently holding 0 elements.",
      items: [],
      top: -1,
    },
    {
      op: "Push(10)",
      desc: "Increment top to 0. Place 10 at arr[top].",
      items: [10],
      top: 0,
    },
    {
      op: "Push(25)",
      desc: "Increment top to 1. Place 25 at arr[top]. 25 is now the newest element (LIFO).",
      items: [10, 25],
      top: 1,
    },
    {
      op: "Peek()",
      desc: "Read element at arr[top] (25) without removing it. Top remains 1.",
      items: [10, 25],
      top: 1,
    },
    {
      op: "Pop()",
      desc: "Return element 25 at arr[top] and decrement top to 0. 25 is removed from stack.",
      items: [10],
      top: 0,
    },
  ];

  const [stepIdx, setStepIdx] = useState(0);
  const current = steps[stepIdx];

  return (
    <div className="edu-diagram-box">
      <div className="diagram-header">
        <span className="diagram-title">Stack Lifecycle: Push, Peek, and Pop (LIFO)</span>
        <span className="diagram-step-counter">
          Step {stepIdx + 1} of {steps.length}
        </span>
      </div>

      <div className="diagram-canvas vertical-center">
        <div className="stack-vertical-container">
          <div className="stack-slot-label">TOP &rarr;</div>
          <div className="stack-box-column">
            {[3, 2, 1, 0].map((slotIdx) => {
              const val = current.items[slotIdx];
              const isTop = slotIdx === current.top;
              return (
                <div
                  key={slotIdx}
                  className={`stack-cell ${val !== undefined ? "filled" : "empty"} ${
                    isTop ? "is-top" : ""
                  }`}
                >
                  <span className="stack-slot-index">[{slotIdx}]</span>
                  <span className="stack-cell-val">{val !== undefined ? val : "—"}</span>
                  {isTop && <span className="top-indicator">&larr; TOP</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="diagram-caption">
        <strong>{current.op}:</strong> {current.desc}
      </div>

      <div className="diagram-controls">
        <button
          type="button"
          onClick={() => setStepIdx((p) => Math.max(0, p - 1))}
          disabled={stepIdx === 0}
          className="diag-nav-btn"
        >
          &larr; Previous Step
        </button>
        <button
          type="button"
          onClick={() => setStepIdx((p) => Math.min(steps.length - 1, p + 1))}
          disabled={stepIdx === steps.length - 1}
          className="diag-nav-btn primary"
        >
          Next Step &rarr;
        </button>
      </div>
    </div>
  );
}

// 5. Queue Educational Step Diagram
export function QueueDiagram() {
  const steps = [
    {
      op: "Initial Empty Queue",
      desc: "Front = 0, Rear = 0, Size = 0. No elements stored.",
      slots: ["—", "—", "—", "—"],
      front: 0,
      rear: 0,
    },
    {
      op: "Enqueue(15)",
      desc: "Place 15 at rear (index 0). Advance rear = (0 + 1) % 4 = 1. Size = 1.",
      slots: [15, "—", "—", "—"],
      front: 0,
      rear: 1,
    },
    {
      op: "Enqueue(42)",
      desc: "Place 42 at rear (index 1). Advance rear = (1 + 1) % 4 = 2. Size = 2.",
      slots: [15, 42, "—", "—"],
      front: 0,
      rear: 2,
    },
    {
      op: "Dequeue() -> 15",
      desc: "Read element at front (15). Advance front = (0 + 1) % 4 = 1. Size = 1. First-in 15 is first-out!",
      slots: ["—", 42, "—", "—"],
      front: 1,
      rear: 2,
    },
  ];

  const [stepIdx, setStepIdx] = useState(0);
  const current = steps[stepIdx];

  return (
    <div className="edu-diagram-box">
      <div className="diagram-header">
        <span className="diagram-title">Circular Queue: Enqueue and Dequeue (FIFO)</span>
        <span className="diagram-step-counter">
          Step {stepIdx + 1} of {steps.length}
        </span>
      </div>

      <div className="diagram-canvas">
        <div className="queue-horizontal-track">
          {current.slots.map((val, idx) => {
            const isFront = idx === current.front;
            const isRear = idx === current.rear;
            return (
              <div key={idx} className="queue-slot-wrapper">
                <span className="queue-pointer-label">
                  {isFront ? "FRONT" : ""}
                </span>
                <div className={`queue-cell ${val !== "—" ? "filled" : "empty"}`}>
                  {val}
                </div>
                <span className="queue-pointer-label bottom">
                  {isRear ? "REAR" : ""}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="diagram-caption">
        <strong>{current.op}:</strong> {current.desc}
      </div>

      <div className="diagram-controls">
        <button
          type="button"
          onClick={() => setStepIdx((p) => Math.max(0, p - 1))}
          disabled={stepIdx === 0}
          className="diag-nav-btn"
        >
          &larr; Previous Step
        </button>
        <button
          type="button"
          onClick={() => setStepIdx((p) => Math.min(steps.length - 1, p + 1))}
          disabled={stepIdx === steps.length - 1}
          className="diag-nav-btn primary"
        >
          Next Step &rarr;
        </button>
      </div>
    </div>
  );
}

// 6. Linked List Educational Step Diagram
export function LinkedListDiagram() {
  const steps = [
    {
      op: "Initial Two-Node List",
      desc: "HEAD points to Node(10) -> Node(20) -> NULL.",
      nodes: [
        { val: 10, next: "20" },
        { val: 20, next: "null" },
      ],
      action: "existing",
    },
    {
      op: "Insert at Head: Allocate Node(5)",
      desc: "Allocate new node holding value 5. Its next pointer points to old head (Node 10).",
      nodes: [
        { val: 5, next: "10", highlight: "new" },
        { val: 10, next: "20" },
        { val: 20, next: "null" },
      ],
      action: "insert-head",
    },
    {
      op: "Update Head Pointer",
      desc: "Swing HEAD pointer to the new node 5. Completed in O(1) time without element shifting!",
      nodes: [
        { val: 5, next: "10", isHead: true },
        { val: 10, next: "20" },
        { val: 20, next: "null" },
      ],
      action: "complete",
    },
  ];

  const [stepIdx, setStepIdx] = useState(0);
  const current = steps[stepIdx];

  return (
    <div className="edu-diagram-box">
      <div className="diagram-header">
        <span className="diagram-title">Singly Linked List: Pointer Rewiring</span>
        <span className="diagram-step-counter">
          Step {stepIdx + 1} of {steps.length}
        </span>
      </div>

      <div className="diagram-canvas">
        <div className="ll-diagram-chain">
          <div className="ll-head-tag">HEAD &rarr;</div>
          {current.nodes.map((node, idx) => (
            <div key={idx} className="ll-node-wrapper">
              <div className={`ll-node-card ${node.highlight || ""}`}>
                <span className="ll-data">{node.val}</span>
                <span className="ll-next-box">&rarr;</span>
              </div>
              {idx < current.nodes.length - 1 ? (
                <div className="ll-arrow-line">&rarr;</div>
              ) : (
                <div className="ll-null-tag">NULL</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="diagram-caption">
        <strong>{current.op}:</strong> {current.desc}
      </div>

      <div className="diagram-controls">
        <button
          type="button"
          onClick={() => setStepIdx((p) => Math.max(0, p - 1))}
          disabled={stepIdx === 0}
          className="diag-nav-btn"
        >
          &larr; Previous Step
        </button>
        <button
          type="button"
          onClick={() => setStepIdx((p) => Math.min(steps.length - 1, p + 1))}
          disabled={stepIdx === steps.length - 1}
          className="diag-nav-btn primary"
        >
          Next Step &rarr;
        </button>
      </div>
    </div>
  );
}

// 7. Binary Search Tree Educational Step Diagram
export function BSTDiagram() {
  const steps = [
    {
      op: "Initial BST Root",
      desc: "Root contains 50. All left descendants must be < 50; right descendants must be > 50.",
      activeNodes: [50],
    },
    {
      op: "Insert 30 (30 < 50) and 70 (70 > 50)",
      desc: "30 branches into left child of 50. 70 branches into right child of 50.",
      activeNodes: [50, 30, 70],
    },
    {
      op: "Insert 20 (20 < 50, 20 < 30)",
      desc: "20 navigates left from 50 to 30, then left from 30 to become its left leaf.",
      activeNodes: [50, 30, 70, 20],
    },
    {
      op: "Insert 40 (40 < 50, 40 > 30)",
      desc: "40 navigates left from 50 to 30, then right from 30 to become its right leaf.",
      activeNodes: [50, 30, 70, 20, 40],
    },
    {
      op: "In-Order Traversal Walk",
      desc: "In-order traversal (Left, Root, Right) yields perfectly sorted order: [20, 30, 40, 50, 70]!",
      activeNodes: [50, 30, 70, 20, 40],
      isTraversal: true,
    },
  ];

  const [stepIdx, setStepIdx] = useState(0);
  const current = steps[stepIdx];

  return (
    <div className="edu-diagram-box">
      <div className="diagram-header">
        <span className="diagram-title">BST Structure & In-Order Sorting Property</span>
        <span className="diagram-step-counter">
          Step {stepIdx + 1} of {steps.length}
        </span>
      </div>

      <div className="diagram-canvas">
        <svg width="340" height="190" className="tree-svg">
          {/* Level 0 to Level 1 lines */}
          {current.activeNodes.includes(30) && (
            <line x1="170" y1="36" x2="100" y2="86" stroke="var(--border-subtle)" strokeWidth="2" />
          )}
          {current.activeNodes.includes(70) && (
            <line x1="170" y1="36" x2="240" y2="86" stroke="var(--border-subtle)" strokeWidth="2" />
          )}
          {/* Level 1 to Level 2 lines */}
          {current.activeNodes.includes(20) && (
            <line x1="100" y1="86" x2="60" y2="146" stroke="var(--border-subtle)" strokeWidth="2" />
          )}
          {current.activeNodes.includes(40) && (
            <line x1="100" y1="86" x2="140" y2="146" stroke="var(--border-subtle)" strokeWidth="2" />
          )}

          {/* Root 50 */}
          <circle cx="170" cy="36" r="20" className="tree-svg-node" />
          <text x="170" y="41" textAnchor="middle" className="tree-svg-text">50</text>

          {/* Node 30 */}
          {current.activeNodes.includes(30) && (
            <>
              <circle cx="100" cy="86" r="18" className="tree-svg-node" />
              <text x="100" y="91" textAnchor="middle" className="tree-svg-text">30</text>
            </>
          )}

          {/* Node 70 */}
          {current.activeNodes.includes(70) && (
            <>
              <circle cx="240" cy="86" r="18" className="tree-svg-node" />
              <text x="240" y="91" textAnchor="middle" className="tree-svg-text">70</text>
            </>
          )}

          {/* Node 20 */}
          {current.activeNodes.includes(20) && (
            <>
              <circle cx="60" cy="146" r="16" className="tree-svg-node" />
              <text x="60" y="151" textAnchor="middle" className="tree-svg-text">20</text>
            </>
          )}

          {/* Node 40 */}
          {current.activeNodes.includes(40) && (
            <>
              <circle cx="140" cy="146" r="16" className="tree-svg-node" />
              <text x="140" y="151" textAnchor="middle" className="tree-svg-text">40</text>
            </>
          )}
        </svg>
      </div>

      <div className="diagram-caption">
        <strong>{current.op}:</strong> {current.desc}
      </div>

      <div className="diagram-controls">
        <button
          type="button"
          onClick={() => setStepIdx((p) => Math.max(0, p - 1))}
          disabled={stepIdx === 0}
          className="diag-nav-btn"
        >
          &larr; Previous Step
        </button>
        <button
          type="button"
          onClick={() => setStepIdx((p) => Math.min(steps.length - 1, p + 1))}
          disabled={stepIdx === steps.length - 1}
          className="diag-nav-btn primary"
        >
          Next Step &rarr;
        </button>
      </div>
    </div>
  );
}

// 8. Graph BFS & DFS Traversal Educational Step Diagram
export function GraphDiagram() {
  const [traversalMode, setTraversalMode] = useState("bfs"); // "bfs" | "dfs"
  const [stepIdx, setStepIdx] = useState(0);

  const bfsSteps = [
    {
      title: "BFS Step 1: Start at Vertex 1",
      desc: "Enqueue 1. Mark 1 visited. Queue: [1]. Visited: {1}.",
      visited: [1],
      active: 1,
      frontier: [],
      order: [1],
    },
    {
      title: "BFS Step 2: Explore Level 1 Neighbors",
      desc: "Dequeue 1. Inspect incident edges (1-2) and (1-3). Enqueue 2 and 3. Queue: [2, 3]. Visited: {1, 2, 3}.",
      visited: [1, 2, 3],
      active: 1,
      frontier: [2, 3],
      order: [1, 2, 3],
    },
    {
      title: "BFS Step 3: Explore Level 2 Neighbors",
      desc: "Dequeue 2. Inspect incident edges (2-4) and (2-5). Enqueue 4 and 5. Queue: [3, 4, 5]. Visited: {1, 2, 3, 4, 5}.",
      visited: [1, 2, 3, 4, 5],
      active: 2,
      frontier: [4, 5],
      order: [1, 2, 3, 4, 5],
    },
  ];

  const dfsSteps = [
    {
      title: "DFS Step 1: Start at Vertex 1",
      desc: "Visit 1. Mark visited. Call stack: [1]. First neighbor is 2.",
      visited: [1],
      active: 1,
      order: [1],
    },
    {
      title: "DFS Step 2: Deep Dive into Branch 1 -> 2 -> 4",
      desc: "Visit 2, then recurse immediately to 4 (deepest leaf). Call stack: [1, 2, 4]. Order: [1, 2, 4].",
      visited: [1, 2, 4],
      active: 4,
      order: [1, 2, 4],
    },
    {
      title: "DFS Step 3: Backtrack to 2, Visit 5, then 3",
      desc: "Backtrack to 2, visit neighbor 5. Backtrack to 1, visit 3. Traversal complete: [1, 2, 4, 5, 3]!",
      visited: [1, 2, 4, 5, 3],
      active: 3,
      order: [1, 2, 4, 5, 3],
    },
  ];

  const steps = traversalMode === "bfs" ? bfsSteps : dfsSteps;
  const current = steps[stepIdx] || steps[0];

  return (
    <div className="edu-diagram-box">
      <div className="diagram-header">
        <span className="diagram-title">Graph Traversal: BFS Layer-by-Layer vs DFS Deep-Branch</span>
        <div className="diag-toggle-row">
          <button
            type="button"
            className={`diag-mode-pill ${traversalMode === "bfs" ? "active" : ""}`}
            onClick={() => {
              setTraversalMode("bfs");
              setStepIdx(0);
            }}
          >
            BFS (Queue)
          </button>
          <button
            type="button"
            className={`diag-mode-pill ${traversalMode === "dfs" ? "active" : ""}`}
            onClick={() => {
              setTraversalMode("dfs");
              setStepIdx(0);
            }}
          >
            DFS (Stack/Recursion)
          </button>
        </div>
      </div>

      <div className="diagram-canvas">
        <svg width="340" height="200" className="graph-svg">
          {/* Edges */}
          <line x1="170" y1="40" x2="100" y2="100" stroke="var(--border-subtle)" strokeWidth="2" />
          <line x1="170" y1="40" x2="240" y2="100" stroke="var(--border-subtle)" strokeWidth="2" />
          <line x1="100" y1="100" x2="60" y2="165" stroke="var(--border-subtle)" strokeWidth="2" />
          <line x1="100" y1="100" x2="140" y2="165" stroke="var(--border-subtle)" strokeWidth="2" />

          {/* Node 1 */}
          <circle cx="170" cy="40" r="18" className={`graph-svg-node ${current.visited.includes(1) ? "visited" : ""} ${current.active === 1 ? "active" : ""}`} />
          <text x="170" y="45" textAnchor="middle" className="graph-svg-text">1</text>

          {/* Node 2 */}
          <circle cx="100" cy="100" r="18" className={`graph-svg-node ${current.visited.includes(2) ? "visited" : ""} ${current.active === 2 ? "active" : ""}`} />
          <text x="100" y="105" textAnchor="middle" className="graph-svg-text">2</text>

          {/* Node 3 */}
          <circle cx="240" cy="100" r="18" className={`graph-svg-node ${current.visited.includes(3) ? "visited" : ""} ${current.active === 3 ? "active" : ""}`} />
          <text x="240" y="105" textAnchor="middle" className="graph-svg-text">3</text>

          {/* Node 4 */}
          <circle cx="60" cy="165" r="18" className={`graph-svg-node ${current.visited.includes(4) ? "visited" : ""} ${current.active === 4 ? "active" : ""}`} />
          <text x="60" y="170" textAnchor="middle" className="graph-svg-text">4</text>

          {/* Node 5 */}
          <circle cx="140" cy="165" r="18" className={`graph-svg-node ${current.visited.includes(5) ? "visited" : ""} ${current.active === 5 ? "active" : ""}`} />
          <text x="140" y="170" textAnchor="middle" className="graph-svg-text">5</text>
        </svg>

        <div className="traversal-order-chip">
          <strong>Visit Order:</strong> [{current.order.join(" &rarr; ")}]
        </div>
      </div>

      <div className="diagram-caption">
        <strong>{current.title}:</strong> {current.desc}
      </div>

      <div className="diagram-controls">
        <button
          type="button"
          onClick={() => setStepIdx((p) => Math.max(0, p - 1))}
          disabled={stepIdx === 0}
          className="diag-nav-btn"
        >
          &larr; Previous Step
        </button>
        <button
          type="button"
          onClick={() => setStepIdx((p) => Math.min(steps.length - 1, p + 1))}
          disabled={stepIdx === steps.length - 1}
          className="diag-nav-btn primary"
        >
          Next Step &rarr;
        </button>
      </div>
    </div>
  );
}

// Router component to pick the appropriate diagram for the concept
export function TopicVisualDiagram({ conceptId }) {
  switch (conceptId) {
    case "LS":
      return <LinearSearchDiagram />;
    case "BS":
      return <BinarySearchDiagram />;
    case "BUB":
      return <BubbleSortDiagram />;
    case "STK":
      return <StackDiagram />;
    case "QUE":
      return <QueueDiagram />;
    case "LL":
      return <LinkedListDiagram />;
    case "BST":
      return <BSTDiagram />;
    case "GRAPH":
      return <GraphDiagram />;
    default:
      return null;
  }
}
