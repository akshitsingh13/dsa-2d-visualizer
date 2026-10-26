import { useMemo } from "react";
import "./GraphVisualizer.css";

const NODE_RADIUS = 22;

// Layout algorithm: Circular layout arranges n vertices evenly around a circle.
// This guarantees deterministic, clutter-free rendering for unweighted graphs.
function computeGraphLayout(graph) {
  if (!graph || !graph.vertices || graph.vertices.length === 0) {
    return { nodes: [], edges: [], width: 340, height: 300 };
  }

  const { vertices, adj } = graph;
  const n = vertices.length;

  const width = 420;
  const height = 320;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(130, Math.max(70, 25 * n));

  const posMap = new Map();
  const nodes = [];

  // Compute circular coordinates
  vertices.forEach((v, i) => {
    // Start from top (-PI / 2) and distribute clockwise
    const angle = (2 * Math.PI * i) / n - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    posMap.set(v, { x, y });
    nodes.push({ id: v, x, y });
  });

  // Extract unique undirected edges
  const edges = [];
  const edgeSet = new Set();

  for (const u of vertices) {
    const neighbors = adj[u] || [];
    for (const v of neighbors) {
      const key = u < v ? `${u}-${v}` : `${v}-${u}`;
      if (!edgeSet.has(key)) {
        edgeSet.add(key);
        const p1 = posMap.get(u);
        const p2 = posMap.get(v);
        if (p1 && p2) {
          edges.push({
            u,
            v,
            x1: p1.x,
            y1: p1.y,
            x2: p2.x,
            y2: p2.y,
          });
        }
      }
    }
  }

  return { nodes, edges, width, height };
}

function GraphVisualizer({ step, dataState }) {
  const { nodes, edges, width, height } = useMemo(() => {
    const currentGraph = step ? step.data : (dataState ?? { vertices: [], adj: {} });
    return computeGraphLayout(currentGraph);
  }, [step, dataState]);

  const activeVertex = step?.activeVertex;
  const activeEdge = step?.activeEdge;
  const visitedVertices = step?.visitedVertices || [];
  const queuedVertices = step?.queuedVertices || [];
  const traversalOrder = step?.traversalOrder || [];

  const getNodeStatus = (v) => {
    if (activeVertex === v) return "current";
    if (visitedVertices.includes(v)) return "visited";
    if (queuedVertices.includes(v)) return "queued";
    return "default";
  };

  const isEdgeActive = (u, v) => {
    if (!activeEdge) return false;
    const [e1, e2] = activeEdge;
    return (e1 === u && e2 === v) || (e1 === v && e2 === u);
  };

  return (
    <div className="graph-visualizer">
      <div className="graph-canvas-container">
        {nodes.length === 0 ? (
          <div className="graph-empty">
            Graph is empty. Add vertices and edges to begin.
          </div>
        ) : (
          <svg
            className="graph-svg"
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
          >
            {/* Edges */}
            {edges.map((edge) => (
              <line
                key={`edge-${edge.u}-${edge.v}`}
                x1={edge.x1}
                y1={edge.y1}
                x2={edge.x2}
                y2={edge.y2}
                className={`graph-edge${isEdgeActive(edge.u, edge.v) ? " active" : ""}`}
              />
            ))}

            {/* Vertices */}
            {nodes.map((node) => {
              const status = getNodeStatus(node.id);
              return (
                <g
                  key={`vertex-${node.id}`}
                  transform={`translate(${node.x}, ${node.y})`}
                >
                  <circle
                    r={NODE_RADIUS}
                    className={`graph-node-circle ${status}`}
                  />
                  <text className="graph-node-text">{node.id}</text>
                </g>
              );
            })}
          </svg>
        )}
      </div>

      {(queuedVertices.length > 0 || traversalOrder.length > 0) && (
        <div className="graph-aux-bar">
          {queuedVertices.length > 0 && (
            <div className="graph-traversal-row">
              <span className="graph-aux-label">
                Active Structure (Queue / Stack):
              </span>
              <div className="graph-aux-items">
                {queuedVertices.map((v, i) => (
                  <span key={i} className="graph-badge">
                    {v}
                  </span>
                ))}
              </div>
            </div>
          )}

          {traversalOrder.length > 0 && (
            <div className="graph-traversal-row">
              <span className="graph-aux-label">Traversal Sequence:</span>
              <div className="graph-aux-items">
                {traversalOrder.map((v, i) => (
                  <span key={i} className="graph-badge">
                    {v}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div
        className={`step-message${step?.error ? " error" : ""}`}
        aria-live="polite"
      >
        {step ? step.message : "Choose an operation and press Run Algorithm."}
      </div>
    </div>
  );
}

export default GraphVisualizer;
