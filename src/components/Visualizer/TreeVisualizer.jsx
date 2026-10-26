import { useMemo } from "react";
import "./TreeVisualizer.css";

const NODE_RADIUS = 22;
const LEVEL_HEIGHT = 64;

/**
 * Computes deterministic (x, y) 2D layout coordinates for a binary tree using
 * recursive in-order traversal for monotonic horizontal spacing and depth for vertical position.
 *
 * @param {Object|null} root - Root node of the binary tree
 * @returns {{ nodes: Array, edges: Array, width: number, height: number }}
 */
function computeTreeLayout(root) {
  if (!root) return { nodes: [], edges: [], width: 200, height: 200 };

  const nodes = [];
  const edges = [];

  // In-order traversal gives clean monotonic x-coordinates without overlaps
  const rawNodes = [];
  function collect(node, depth, parentNode = null) {
    if (!node) return;
    collect(node.left, depth + 1, node);
    rawNodes.push({ node, depth, parentNode });
    collect(node.right, depth + 1, node);
  }
  collect(root, 0);

  // Spacing:
  const xSpacing = 52;
  const paddingX = 40;
  const totalWidth = Math.max(300, (rawNodes.length + 1) * xSpacing + paddingX * 2);

  // Map node id -> { x, y }
  const posMap = new Map();
  let maxDepth = 0;

  rawNodes.forEach((item, index) => {
    const x = paddingX + (index + 1) * xSpacing;
    const y = item.depth * LEVEL_HEIGHT + 36;
    if (item.depth > maxDepth) maxDepth = item.depth;
    posMap.set(item.node.id, { x, y, value: item.node.value });
    nodes.push({ id: item.node.id, value: item.node.value, x, y });
  });

  // Collect edges
  function collectEdges(node) {
    if (!node) return;
    const parentPos = posMap.get(node.id);
    if (node.left) {
      const leftPos = posMap.get(node.left.id);
      if (parentPos && leftPos) {
        edges.push({
          fromId: node.id,
          toId: node.left.id,
          x1: parentPos.x,
          y1: parentPos.y,
          x2: leftPos.x,
          y2: leftPos.y,
        });
      }
      collectEdges(node.left);
    }
    if (node.right) {
      const rightPos = posMap.get(node.right.id);
      if (parentPos && rightPos) {
        edges.push({
          fromId: node.id,
          toId: node.right.id,
          x1: parentPos.x,
          y1: parentPos.y,
          x2: rightPos.x,
          y2: rightPos.y,
        });
      }
      collectEdges(node.right);
    }
  }
  collectEdges(root);

  const totalHeight = Math.max(220, (maxDepth + 1) * LEVEL_HEIGHT + 60);

  return { nodes, edges, width: totalWidth, height: totalHeight };
}

/**
 * TreeVisualizer component.
 * Renders a Binary Search Tree (BST) using SVG nodes and connecting edges,
 * highlighting traversal paths, comparison nodes, and target discoveries.
 *
 * @param {Object} props
 * @param {Object} [props.step] Current animation step state
 * @param {Object|null} [props.dataState] Tree root node when step is idle
 * @returns {JSX.Element}
 */
function TreeVisualizer({ step, dataState }) {
  const treeRoot = step ? step.data : (dataState ?? null);

  const { nodes, edges, width, height } = useMemo(
    () => computeTreeLayout(treeRoot),
    [treeRoot],
  );

  const activeNodeId = step?.activeNodeId;
  const comparingNodeId = step?.comparingNodeId;
  const foundNodeId = step?.foundNodeId;
  const traversalOrder = step?.traversalOrder || [];

  const getNodeStatus = (id) => {
    if (foundNodeId === id) return "found";
    if (activeNodeId === id || comparingNodeId === id) return "current";
    return "default";
  };

  const isEdgeActive = (fromId, toId) => {
    return (
      (activeNodeId === toId && edges.some((e) => e.fromId === fromId && e.toId === toId)) ||
      (comparingNodeId === toId && edges.some((e) => e.fromId === fromId && e.toId === toId))
    );
  };

  return (
    <div className="tree-visualizer">
      <div className="tree-canvas-container">
        {!treeRoot ? (
          <div className="tree-empty">
            Tree is empty. Insert a value to build the Binary Search Tree.
          </div>
        ) : (
          <svg
            className="tree-svg"
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
          >
            {/* Render connecting edges */}
            {edges.map((edge) => (
              <line
                key={`edge-${edge.fromId}-${edge.toId}`}
                x1={edge.x1}
                y1={edge.y1}
                x2={edge.x2}
                y2={edge.y2}
                className={`tree-edge${isEdgeActive(edge.fromId, edge.toId) ? " active" : ""}`}
              />
            ))}

            {/* Render tree nodes */}
            {nodes.map((node) => {
              const status = getNodeStatus(node.id);
              return (
                <g key={`node-${node.id}`} transform={`translate(${node.x}, ${node.y})`}>
                  <circle
                    r={NODE_RADIUS}
                    className={`tree-node-circle ${status}`}
                  />
                  <text className="tree-node-text">{node.value}</text>
                </g>
              );
            })}
          </svg>
        )}
      </div>

      {traversalOrder.length > 0 && (
        <div className="tree-traversal-bar">
          <span className="tree-traversal-label">Traversal:</span>
          <div className="tree-traversal-items">
            {traversalOrder.map((val, idx) => (
              <span key={idx} className="tree-traversal-badge">
                {val}
              </span>
            ))}
          </div>
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

export default TreeVisualizer;
