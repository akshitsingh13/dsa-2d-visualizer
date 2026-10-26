import "./LearningPage.css";
import "./Diagrams.css";
import { getTheory } from "../../theory/index";
import { getTopicResources } from "../../data/learningResources";
import { resolveComplexity } from "../Visualizer/complexityHelpers";
import { renderRichText } from "../Theory/blocks/RichText";
import { TopicVisualDiagram } from "./Diagrams";

function ExternalLinkIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5.5 2.5H2.5V10.5H10.5V7.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 2.5H10.5V5.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 2.5L6 7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Structured Complexity Analysis Table per case
function ComplexityAnalysisTable({ dsaConcept, resolvedComplexity }) {
  const getRows = () => {
    switch (dsaConcept) {
      case "LS":
        return [
          {
            caseName: "Best Case",
            condition: "Target is found at the first position (index 0)",
            ops: "1 comparison",
            time: "Θ(1)",
            explanation: "Immediate early exit upon checking the very first array slot.",
          },
          {
            caseName: "Average Case",
            condition: "Target uniformly distributed across the array",
            ops: "(n + 1) / 2 comparisons",
            time: "Θ(n)",
            explanation: "Expected index is halfway through the list; constant 1/2 factor drops.",
          },
          {
            caseName: "Worst Case",
            condition: "Target is at the final position or completely absent",
            ops: "n comparisons",
            time: "Θ(n) / O(n)",
            explanation: "Every single element in the array must be checked once.",
          },
        ];
      case "BS":
        return [
          {
            caseName: "Best Case",
            condition: "Target equals the initial midpoint element",
            ops: "1 comparison",
            time: "Θ(1)",
            explanation: "The first comparison arr[mid] == target succeeds immediately.",
          },
          {
            caseName: "Average Case",
            condition: "Target present uniformly across sorted array",
            ops: "≈ log₂(n) - 1 comparisons",
            time: "Θ(log n)",
            explanation: "Each comparison halves candidate elements: n → n/2 → n/4...",
          },
          {
            caseName: "Worst Case",
            condition: "Target absent or at final 1-element interval",
            ops: "⌊log₂(n)⌋ + 1 comparisons",
            time: "O(log n)",
            explanation: "Interval repeatedly shrinks by half until low > high.",
          },
        ];
      case "BUB":
        return [
          {
            caseName: "Best Case",
            condition: "Array is already sorted in ascending order",
            ops: "n - 1 comparisons, 0 swaps",
            time: "Ω(n) / Θ(n)",
            explanation: "With the early-exit `swapped` flag, pass 1 detects 0 swaps and halts.",
          },
          {
            caseName: "Average Case",
            condition: "Elements in random order",
            ops: "≈ n(n - 1) / 4 comparisons & swaps",
            time: "Θ(n²)",
            explanation: "Roughly half of all pairs are inverted, requiring near-full passes.",
          },
          {
            caseName: "Worst Case",
            condition: "Array sorted in reverse descending order",
            ops: "n(n - 1) / 2 comparisons & swaps",
            time: "Θ(n²) / O(n²)",
            explanation: "Every adjacent comparison results in a swap on every outer pass.",
          },
        ];
      case "STK":
        return [
          {
            caseName: "Push(x)",
            condition: "Stack not full (size < capacity)",
            ops: "1 array write + top++",
            time: "Θ(1)",
            explanation: "Direct index assignment at `arr[++top]` with zero search or element shifting.",
          },
          {
            caseName: "Pop()",
            condition: "Stack not empty (top >= 0)",
            ops: "1 read + top--",
            time: "Θ(1)",
            explanation: "Direct pointer decrement in constant time.",
          },
          {
            caseName: "Peek()",
            condition: "Stack not empty",
            ops: "1 read arr[top]",
            time: "Θ(1)",
            explanation: "Immediate constant-time read of the topmost element.",
          },
        ];
      case "QUE":
        return [
          {
            caseName: "Enqueue(x)",
            condition: "Queue not full (size < capacity)",
            ops: "1 write + rear = (rear + 1) % C",
            time: "Θ(1)",
            explanation: "Modulo pointer arithmetic recycles empty slots without shifting.",
          },
          {
            caseName: "Dequeue()",
            condition: "Queue not empty (size > 0)",
            ops: "1 read + front = (front + 1) % C",
            time: "Θ(1)",
            explanation: "Immediate removal at front pointer without moving remaining elements.",
          },
          {
            caseName: "Peek()",
            condition: "Queue not empty",
            ops: "1 read arr[front]",
            time: "Θ(1)",
            explanation: "Direct read of the front element in constant time.",
          },
        ];
      case "LL":
        return [
          {
            caseName: "Insert Head / Delete Head",
            condition: "Direct head pointer access",
            ops: "1-2 pointer rewirings",
            time: "Θ(1)",
            explanation: "Zero node traversal required; simply swing head pointer.",
          },
          {
            caseName: "Search / Delete Value",
            condition: "Target anywhere in the chain",
            ops: "Up to n node visits",
            time: "O(n)",
            explanation: "Singly linked lists lack random indexing, requiring sequential pointer walking.",
          },
          {
            caseName: "Insert Tail / Index",
            condition: "Without direct tail pointer",
            ops: "Traverse k nodes to insertion point",
            time: "O(n)",
            explanation: "Must walk from head to predecessor node before updating pointers.",
          },
        ];
      case "BST":
        return [
          {
            caseName: "Best Case (Root match / Balanced)",
            condition: "Target at root, or tree is perfectly balanced",
            ops: "1 comparison (root) or log₂(n) levels",
            time: "Ω(1) / O(log n)",
            explanation: "Each branching eliminates half of the remaining subtree.",
          },
          {
            caseName: "Average Case (Random keys)",
            condition: "Keys inserted in random uniform order",
            ops: "≈ 1.386 log₂(n) comparisons",
            time: "Θ(log n)",
            explanation: "Expected tree height scales logarithmically with node count.",
          },
          {
            caseName: "Worst Case (Skewed tree)",
            condition: "Keys inserted in ascending or descending sorted order",
            ops: "n comparisons (height h = n)",
            time: "O(n)",
            explanation: "Degenerates into a singly linked list; every node has only 1 child.",
          },
        ];
      case "GRAPH":
        return [
          {
            caseName: "Breadth-First Search (BFS)",
            condition: "Connected unweighted graph with adjacency list",
            ops: "V vertex visits + 2E edge scans",
            time: "Θ(V + E)",
            explanation: "Each vertex enqueued once; each undirected edge inspected twice.",
          },
          {
            caseName: "Depth-First Search (DFS)",
            condition: "Connected unweighted graph with adjacency list",
            ops: "V vertex visits + 2E edge scans",
            time: "Θ(V + E)",
            explanation: "Explores branches deeply before backtracking; visits all reachable nodes.",
          },
          {
            caseName: "Dense Graph Bound",
            condition: "Complete graph where E = V(V - 1) / 2",
            ops: "O(V²) edge inspections",
            time: "O(V²)",
            explanation: "When edge count E approaches V², traversal scales quadratically.",
          },
        ];
      default:
        return [
          {
            caseName: "Best Case",
            condition: "Ideal input distribution",
            ops: "Minimal operations",
            time: resolvedComplexity?.best || "O(1)",
            explanation: "Best possible execution path.",
          },
          {
            caseName: "Average Case",
            condition: "Typical uniform input",
            ops: "Expected operations",
            time: resolvedComplexity?.average || "O(n)",
            explanation: "Expected behavior on random data.",
          },
          {
            caseName: "Worst Case",
            condition: "Pathological or reverse input",
            ops: "Maximum passes / traversal",
            time: resolvedComplexity?.worst || "O(n)",
            explanation: "Upper bound under worst input.",
          },
        ];
    }
  };

  const rows = getRows();

  return (
    <div className="complexity-table-wrapper">
      <table className="edu-complexity-table">
        <thead>
          <tr>
            <th>Scenario / Operation</th>
            <th>Input Condition / Assumption</th>
            <th>Operations / Reasoning</th>
            <th>Time Bound</th>
            <th>Pedagogical Explanation</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              <td className="case-col"><strong>{row.caseName}</strong></td>
              <td className="cond-col">{row.condition}</td>
              <td className="ops-col"><code>{row.ops}</code></td>
              <td className="time-col"><strong>{row.time}</strong></td>
              <td className="desc-col">{row.explanation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Space Complexity Detailed Breakdown Card
function SpaceComplexityDetailed({ dsaConcept, resolvedComplexity }) {
  const getSpaceDetails = () => {
    switch (dsaConcept) {
      case "LS":
        return {
          auxBound: "Θ(1)",
          inputStorage: "Input array stores n integer elements: O(n) space.",
          auxiliaryStorage: "Only one integer loop counter `i` and match references are kept in memory.",
          recursionQueue: "Iterative execution; zero recursion stack or queues used.",
          verdict: "Auxiliary space is strictly Θ(1) because extra memory does not grow with input size n.",
        };
      case "BS":
        return {
          auxBound: "Θ(1)",
          inputStorage: "Input sorted array stores n elements: O(n) space.",
          auxiliaryStorage: "Three integer pointers: `low`, `high`, and `mid` in local stack frame.",
          recursionQueue: "Iterative while loop; no call stack growth.",
          verdict: "Auxiliary space is strictly Θ(1). (Note: A recursive version would require O(log n) call stack space).",
        };
      case "BUB":
        return {
          auxBound: "Θ(1)",
          inputStorage: "Input array stores n elements: O(n) space.",
          auxiliaryStorage: "Loop indices `i`, `j`, boolean `swapped` flag, and 1 swap temporary register.",
          recursionQueue: "In-place sorting; zero auxiliary arrays allocated.",
          verdict: "Auxiliary space is strictly Θ(1) because elements are swapped directly within the existing buffer.",
        };
      case "STK":
        return {
          auxBound: "Θ(1) auxiliary",
          inputStorage: "Backing array of fixed capacity C = 8: O(C) buffer.",
          auxiliaryStorage: "Single integer index `top` tracking the topmost position.",
          recursionQueue: "No recursion or dynamic heap reallocations.",
          verdict: "Auxiliary space is O(1); backing buffer is O(C) where C is fixed capacity.",
        };
      case "QUE":
        return {
          auxBound: "Θ(1) auxiliary",
          inputStorage: "Circular array buffer of fixed capacity C = 8: O(C).",
          auxiliaryStorage: "Three scalar indices: `front`, `rear`, and `size`.",
          recursionQueue: "Modulo pointer wrapping recycles slots without shifting.",
          verdict: "Auxiliary space is O(1); total queue structure space is O(C).",
        };
      case "LL":
        return {
          auxBound: "Θ(1) auxiliary",
          inputStorage: "n heap nodes, each storing 1 data value + 1 next pointer: O(n) structure space.",
          auxiliaryStorage: "Local traversal pointers `curr`, `prev` used during walks.",
          recursionQueue: "Iterative traversal; zero recursion memory.",
          verdict: "Auxiliary space per operation is O(1); total structure memory is O(n).",
        };
      case "BST":
        return {
          auxBound: "O(h) call stack",
          inputStorage: "n node allocations, each with value, left pointer, right pointer: O(n) total space.",
          auxiliaryStorage: "Recursive call stack space proportional to tree height h.",
          recursionQueue: "Balanced BST: h = ⌊log₂ n⌋ → O(log n) stack frames. Skewed BST: h = n → O(n) stack frames.",
          verdict: "Auxiliary space is O(log n) on balanced trees, degrading to O(n) in worst-case skewed trees.",
        };
      case "GRAPH":
        return {
          auxBound: "O(V) auxiliary",
          inputStorage: "Adjacency list storing V vertex heads and 2E edge endpoints: O(V + E) representation.",
          auxiliaryStorage: "Boolean array `visited[V]` of size V to prevent infinite loops.",
          recursionQueue: "BFS uses FIFO queue of depth up to V. DFS uses recursion call stack of depth up to V.",
          verdict: "Auxiliary memory is strictly O(V); graph input representation memory is O(V + E).",
        };
      default:
        return {
          auxBound: resolvedComplexity?.space || "O(1)",
          inputStorage: "Input data storage: O(n).",
          auxiliaryStorage: "Constant scalar variables.",
          recursionQueue: "No extra recursion.",
          verdict: "Auxiliary space is O(1).",
        };
    }
  };

  const details = getSpaceDetails();

  return (
    <div className="space-detailed-card">
      <div className="space-card-header-bar">
        <h4>Space Breakdown: Input vs Auxiliary Memory</h4>
        <span className="space-pill-bound">Auxiliary Bound: {details.auxBound}</span>
      </div>

      <div className="space-details-grid">
        <div className="space-detail-item">
          <span className="detail-tag input">1. Input Storage</span>
          <p className="detail-desc">{details.inputStorage}</p>
        </div>

        <div className="space-detail-item highlight">
          <span className="detail-tag aux">2. Auxiliary Scratch Space</span>
          <p className="detail-desc">{details.auxiliaryStorage}</p>
        </div>

        <div className="space-detail-item">
          <span className="detail-tag rec">3. Call Stack &amp; Queues</span>
          <p className="detail-desc">{details.recursionQueue}</p>
        </div>
      </div>

      <div className="space-verdict-banner">
        <strong>Mathematical Conclusion:</strong> {details.verdict}
      </div>
    </div>
  );
}

/**
 * LearningPage Component.
 *
 * Full-page interactive educational hub for studying algorithms and data structures.
 * Features:
 *  - Responsive non-scrolling jump navigation (Overview, How It Works, Complexity, etc.)
 *  - Deep educational theory with mental models and step breakdowns.
 *  - Interactive concept-specific visual diagrams (searching passes, LIFO stack, circular queue, BST, DFS/BFS graph).
 *  - Mathematical complexity analysis and memory space breakdown.
 *  - Curated external learning resources (articles, video tutorials, practice problems, reference code).
 *
 * @param {string} dsaConcept - Active algorithm/data-structure identifier (e.g. 'LL', 'BST').
 * @param {object} algorithmConfig - Registry configuration object.
 * @param {Function} onBack - Callback returning the user to the interactive visualizer.
 */
function LearningPage({ dsaConcept, algorithmConfig, onBack }) {
  const theory = getTheory(dsaConcept);
  const resources = getTopicResources(dsaConcept);

  const title = algorithmConfig?.name || theory?.title || "Algorithm & Data Structure";
  const category = algorithmConfig?.category || theory?.category || "Concept";

  // Extract sections
  const intuitionSection = theory?.sections?.find((s) => s.id === "intuition");
  const howItWorksSection = theory?.sections?.find((s) => s.id === "how-it-works");
  const tradeoffsSection = theory?.sections?.find((s) => s.id === "tradeoffs");
  const usageSection = theory?.sections?.find((s) => s.id === "usage");
  const mistakesSection = theory?.sections?.find((s) => s.id === "mistakes");

  const resolvedComplexity = resolveComplexity(algorithmConfig?.complexity);

  return (
    <div className="learning-page" role="main" aria-label={`Learning page for ${title}`}>
      {/* 1. Header */}
      <header className="learning-header">
        <div className="learning-title-group">
          <span className="learning-category-badge">{category}</span>
          <h1 className="learning-title">{title}</h1>
        </div>

        <button
          type="button"
          className="learning-back-btn"
          onClick={onBack}
          aria-label="Return to visualizer"
        >
          <span>&larr; Back to Visualizer</span>
        </button>
      </header>

      {/* Quick Navigation Anchor Bar (Non-scrolling, responsive grid) */}
      <nav className="learning-quick-nav" aria-label="Sections navigation">
        <a href="#introduction" className="learning-nav-chip">1. Intro</a>
        <a href="#diagram" className="learning-nav-chip">2. Diagram</a>
        <a href="#how-it-works" className="learning-nav-chip">3. How It Works</a>
        <a href="#complexity" className="learning-nav-chip">4. Complexity</a>
        <a href="#tradeoffs" className="learning-nav-chip">5. Pros &amp; Cons</a>
        <a href="#mistakes" className="learning-nav-chip">6. Pitfalls</a>
        <a href="#code" className="learning-nav-chip">7. C++ Code</a>
        <a href="#resources" className="learning-nav-chip">8. Resources</a>
      </nav>

      {/* 1. INTRODUCTION & TOPIC OVERVIEW */}
      <section id="introduction" className="learning-section">
        <h2 className="learning-section-title">1. Introduction &amp; Topic Overview</h2>
        {theory?.summary && (
          <p className="learning-lead-text">{theory.summary}</p>
        )}
        {intuitionSection && (
          <div className="learning-properties-card">
            {intuitionSection.blocks.map((block, idx) => (
              <p key={idx} style={{ margin: "6px 0" }}>
                {renderRichText(block.text)}
              </p>
            ))}
          </div>
        )}
      </section>

      {/* 2. VISUAL DIAGRAM - MANDATORY */}
      <section id="diagram" className="learning-section">
        <h2 className="learning-section-title">2. Visual Diagram &amp; Representation</h2>
        <p className="section-subtext">
          Interactive step-by-step visual diagram teaching the internal structure and mechanics:
        </p>
        <TopicVisualDiagram conceptId={dsaConcept} />
      </section>

      {/* 3. HOW IT WORKS */}
      {howItWorksSection && (
        <section id="how-it-works" className="learning-section">
          <h2 className="learning-section-title">3. How It Works &amp; Algorithm Steps</h2>
          {howItWorksSection.blocks.map((block, idx) => {
            if (block.type === "list") {
              return (
                <ol key={idx} className="learning-steps-list">
                  {block.items.map((item, itemIdx) => (
                    <li key={itemIdx}>{renderRichText(item)}</li>
                  ))}
                </ol>
              );
            }
            if (block.type === "callout") {
              return (
                <div key={idx} className="learning-properties-card note-callout">
                  <strong>{renderRichText(block.title)}: </strong>
                  <span>{renderRichText(block.text)}</span>
                </div>
              );
            }
            return null;
          })}
        </section>
      )}

      {/* 4. COMPLEXITY ANALYSIS - BEST, AVERAGE, WORST & SPACE */}
      <section id="complexity" className="learning-section">
        <h2 className="learning-section-title">4. Time &amp; Space Complexity Summary &amp; Analysis</h2>
        <p className="section-subtext">
          Complete mathematical analysis across all input cases and memory requirements:
        </p>

        {/* Time Complexity Table */}
        <ComplexityAnalysisTable
          dsaConcept={dsaConcept}
          resolvedComplexity={resolvedComplexity}
        />

        {/* Space Complexity Detailed Breakdown */}
        <SpaceComplexityDetailed
          dsaConcept={dsaConcept}
          resolvedComplexity={resolvedComplexity}
        />
      </section>

      {/* 5. ADVANTAGES & LIMITATIONS */}
      {tradeoffsSection && (
        <section id="tradeoffs" className="learning-section">
          <h2 className="learning-section-title">5. Advantages, Limitations &amp; When to Use</h2>
          <div className="learning-properties-card">
            {tradeoffsSection.blocks.map((block, idx) => {
              if (block.type === "list") {
                return (
                  <ul key={idx} className="learning-steps-list">
                    {block.items.map((item, itemIdx) => (
                      <li key={itemIdx}>{renderRichText(item)}</li>
                    ))}
                  </ul>
                );
              }
              return <p key={idx}>{renderRichText(block.text)}</p>;
            })}
          </div>

          {usageSection && (
            <div className="learning-properties-card" style={{ marginTop: "12px" }}>
              <h4 style={{ margin: "0 0 8px", fontSize: "15px" }}>When to Use (and When Not to):</h4>
              {usageSection.blocks.map((block, idx) => (
                <p key={idx} style={{ margin: "6px 0" }}>
                  {renderRichText(block.text)}
                </p>
              ))}
            </div>
          )}
        </section>
      )}

      {/* 6. COMMON MISTAKES & PITFALLS */}
      {mistakesSection && (
        <section id="mistakes" className="learning-section">
          <h2 className="learning-section-title">6. Common Mistakes &amp; Implementation Pitfalls</h2>
          <div className="learning-properties-card warning-callout">
            {mistakesSection.blocks.map((block, idx) => {
              if (block.type === "list") {
                return (
                  <ul key={idx} className="learning-steps-list">
                    {block.items.map((item, itemIdx) => (
                      <li key={itemIdx}>{renderRichText(item)}</li>
                    ))}
                  </ul>
                );
              }
              return <p key={idx}>{renderRichText(block.text)}</p>;
            })}
          </div>
        </section>
      )}

      {/* 7. C++ SOURCE CODE */}
      <section id="code" className="learning-section">
        <h2 className="learning-section-title">7. C++ Reference Implementation</h2>
        <div className="learning-code-box">
          <pre className="learning-code-pre">
            <code>
              {typeof algorithmConfig?.code === "string"
                ? algorithmConfig.code
                : typeof algorithmConfig?.code === "object"
                ? Object.values(algorithmConfig.code)[0]
                : "// Implementation available in visualizer"}
            </code>
          </pre>
        </div>
      </section>

      {/* 8. FURTHER LEARNING RESOURCES */}
      <section id="resources" className="learning-section">
        <h2 className="learning-section-title">8. Further Learning: Articles, Videos &amp; Practice</h2>

        {/* Articles */}
        <h3 className="resource-subheading">Articles &amp; References</h3>
        {resources?.articles?.length ? (
          <div className="learning-resource-grid">
            {resources.articles.map((item, idx) => (
              <a
                key={idx}
                className="learning-card"
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="learning-card-top">
                  <div className="learning-card-badge-row">
                    <span className="learning-badge article">{item.type}</span>
                    <span className="learning-source-name">{item.source}</span>
                  </div>
                  <h3 className="learning-card-title">
                    {item.title}
                    <ExternalLinkIcon />
                  </h3>
                  <p className="learning-card-desc">{item.description}</p>
                </div>
                <div className="learning-card-footer">
                  <span>Read Article &rarr;</span>
                </div>
              </a>
            ))}
          </div>
        ) : null}

        {/* Video Tutorials */}
        <h3 className="resource-subheading" style={{ marginTop: "20px" }}>Video Tutorials</h3>
        {resources?.videos?.length ? (
          <div className="learning-resource-grid">
            {resources.videos.map((item, idx) => (
              <a
                key={idx}
                className="learning-card"
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="learning-card-top">
                  <div className="learning-card-badge-row">
                    <span className="learning-badge video">{item.type}</span>
                    <span className="learning-source-name">{item.channel}</span>
                  </div>
                  <h3 className="learning-card-title">
                    {item.title}
                    <ExternalLinkIcon />
                  </h3>
                  <p className="learning-card-desc">{item.description}</p>
                </div>
                <div className="learning-card-footer">
                  <span>Watch Video &rarr;</span>
                </div>
              </a>
            ))}
          </div>
        ) : null}

        {/* Practice Problems */}
        <h3 className="resource-subheading" style={{ marginTop: "20px" }}>Practice Problems</h3>
        {resources?.practice?.length ? (
          <div className="learning-resource-grid">
            {resources.practice.map((item, idx) => (
              <a
                key={idx}
                className="learning-card"
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="learning-card-top">
                  <div className="learning-card-badge-row">
                    <span className="learning-badge practice">{item.difficulty}</span>
                    <span className="learning-source-name">{item.platform}</span>
                  </div>
                  <h3 className="learning-card-title">
                    {item.title}
                    <ExternalLinkIcon />
                  </h3>
                  <p className="learning-card-desc">{item.description}</p>
                </div>
                <div className="learning-card-footer">
                  <span>Solve Problem &rarr;</span>
                </div>
              </a>
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}

export default LearningPage;
