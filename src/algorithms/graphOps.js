// Graph operations and step generator for unweighted graph.
//
// Graph representation: Adjacency List.
// An unweighted undirected graph represented as:
// {
//   vertices: number[],          // sorted list of unique vertex IDs
//   adj: { [v: number]: number[] } // adjacency list mapping vertex -> array of neighbors
// }
//
// Adjacency list is chosen because:
// 1. It is the canonical representation for sparse graphs, providing O(V + E) BFS and DFS traversal.
// 2. Vertex and edge additions/removals directly manipulate neighbor lists.
// 3. Clean mapping to standard C++ vector<vector<int>> or vector<int> adj[].

export const GRAPH_OPERATIONS = [
  "add-vertex",
  "add-edge",
  "remove-vertex",
  "remove-edge",
  "bfs",
  "dfs",
  "clear",
];

const STRUCT = `// Graph represented as an adjacency list
vector<vector<int>> adj;
vector<bool> visited;`;

export const GRAPH_CODE = {
  "add-vertex": `${STRUCT}

void addVertex(int u) {
    // Add vertex u to graph if not present
    if (adj.find(u) == adj.end()) {
        adj[u] = vector<int>();
    }
}`,

  "add-edge": `${STRUCT}

void addEdge(int u, int v) {
    // Add undirected edge between u and v
    adj[u].push_back(v);
    adj[v].push_back(u);
}`,

  "remove-vertex": `${STRUCT}

void removeVertex(int u) {
    // Remove all incident edges to u
    for (int neighbor : adj[u]) {
        adj[neighbor].erase(remove(adj[neighbor].begin(), adj[neighbor].end(), u), adj[neighbor].end());
    }
    adj.erase(u);
}`,

  "remove-edge": `${STRUCT}

void removeEdge(int u, int v) {
    // Remove undirected edge between u and v
    adj[u].erase(remove(adj[u].begin(), adj[u].end(), v), adj[u].end());
    adj[v].erase(remove(adj[v].begin(), adj[v].end(), u), adj[v].end());
}`,

  bfs: `${STRUCT}

void bfs(int start) {
    queue<int> q;
    visited[start] = true;
    q.push(start);

    while (!q.empty()) {
        int u = q.front();
        q.pop();
        visit(u);

        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
}`,

  dfs: `${STRUCT}

void dfs(int u) {
    visited[u] = true;
    visit(u);

    for (int v : adj[u]) {
        if (!visited[v]) {
            dfs(v);
        }
    }
}`,

  clear: `${STRUCT}

void clearGraph() {
    adj.clear();
    visited.clear();
}`,
};

export const LINES = {
  "add-vertex": { FUNC: 3, CHECK: 5, ADD: 6 },
  "add-edge": { FUNC: 3, WIRE_U: 5, WIRE_V: 6 },
  "remove-vertex": { FUNC: 3, LOOP: 5, UNLINK: 6, ERASE: 8 },
  "remove-edge": { FUNC: 3, REMOVE_U: 5, REMOVE_V: 6 },
  bfs: {
    FUNC: 3,
    INIT_Q: 4,
    VISIT_START: 5,
    PUSH_START: 6,
    LOOP: 8,
    POP: 10,
    VISIT: 11,
    FOR_NEIGHBORS: 13,
    CHECK_VISITED: 14,
    MARK_PUSH: 16,
  },
  dfs: {
    FUNC: 3,
    MARK: 4,
    VISIT: 5,
    FOR_NEIGHBORS: 7,
    CHECK_VISITED: 8,
    RECURSE: 9,
  },
  clear: { FUNC: 3, RESET: 4 },
};

// Deep clone a graph state immutably
export function cloneGraph(graph) {
  if (!graph || !graph.vertices) {
    return { vertices: [], adj: {} };
  }
  const adj = {};
  for (const v of graph.vertices) {
    adj[v] = graph.adj && graph.adj[v] ? [...graph.adj[v]] : [];
  }
  return {
    vertices: [...graph.vertices],
    adj,
  };
}

// Default initial graph with nodes [1, 2, 3, 4, 5] and simple edges
export function createDefaultGraph() {
  return {
    vertices: [1, 2, 3, 4, 5],
    adj: {
      1: [2, 3],
      2: [1, 4, 5],
      3: [1],
      4: [2],
      5: [2],
    },
  };
}

/**
 * Pure step generator for Unweighted Undirected Graph operations.
 * Graph representation: Adjacency list mapping vertex ID -> array of neighbors.
 *
 * Supported operations:
 *   - add-vertex: O(1) time, O(1) aux space
 *   - add-edge: O(deg(u)) duplicate check, O(1) aux space
 *   - remove-vertex: O(V + E) time, O(1) aux space
 *   - remove-edge: O(deg(u)) time, O(1) aux space
 *   - bfs: O(V + E) time, O(V) aux space (FIFO queue + visited set)
 *   - dfs: O(V + E) time, O(V) aux call stack (backtracking recursion + visited set)
 *   - clear: Θ(1) container reset
 *
 * @param {{ vertices: number[], adj: Object }} data - Current graph adjacency list.
 * @param {{ operation: string, value?: number, targetVertex?: number }} params - Operation details.
 * @param {number} prevCount - Cumulative operations counter.
 * @returns {Array<object>} Sequence of immutable step snapshots for animation.
 */
export default function graphOperation(data, params, prevCount = 0) {
  void prevCount;
  const { operation, value, targetVertex } = params;
  const steps = [];
  const graph = cloneGraph(data);
  let nodesVisited = 0;
  let edgesExplored = 0;

  const snapshot = (fields) => ({
    data: cloneGraph(graph),
    activeVertex: null,
    activeEdge: null, // [u, v]
    visitedVertices: [],
    queuedVertices: [], // queue for BFS, recursion stack for DFS
    traversalOrder: [],
    nodesVisited,
    edgesExplored,
    error: false,
    ...fields,
  });

  const fail = (codeLine, message) => {
    steps.push(snapshot({ codeLine, error: true, message }));
    return steps;
  };

  // ============================ CLEAR ============================
  if (operation === "clear") {
    const L = LINES.clear;
    graph.vertices = [];
    graph.adj = {};
    steps.push(
      snapshot({
        codeLine: L.RESET,
        message: "Cleared all vertices and edges from the graph.",
      }),
    );
    return steps;
  }

  // ============================ ADD VERTEX ============================
  if (operation === "add-vertex") {
    const L = LINES["add-vertex"];
    const u = value;

    if (u == null) {
      return fail(L.FUNC, "Please specify a vertex value to add.");
    }

    if (graph.vertices.includes(u)) {
      return fail(
        L.CHECK,
        `Vertex ${u} already exists in the graph. Cannot add duplicate vertex.`,
      );
    }

    steps.push(
      snapshot({
        activeVertex: u,
        codeLine: L.FUNC,
        message: `Adding new vertex ${u} to the graph.`,
      }),
    );

    graph.vertices.push(u);
    graph.vertices.sort((a, b) => a - b);
    graph.adj[u] = [];

    steps.push(
      snapshot({
        activeVertex: u,
        codeLine: L.ADD,
        message: `Vertex ${u} added successfully with 0 edges.`,
      }),
    );
    return steps;
  }

  // ============================ ADD EDGE ============================
  if (operation === "add-edge") {
    const L = LINES["add-edge"];
    const u = value;
    const v = targetVertex;

    if (u == null || v == null) {
      return fail(
        L.FUNC,
        "Please provide both source vertex (Value) and target vertex (Target) to add an edge.",
      );
    }

    if (!graph.vertices.includes(u)) {
      return fail(L.FUNC, `Source vertex ${u} does not exist in the graph.`);
    }

    if (!graph.vertices.includes(v)) {
      return fail(L.FUNC, `Target vertex ${v} does not exist in the graph.`);
    }

    if (u === v) {
      return fail(L.FUNC, `Self-loops on vertex ${u} are not supported in this simple unweighted graph.`);
    }

    if (graph.adj[u].includes(v)) {
      return fail(L.FUNC, `Edge between ${u} and ${v} already exists.`);
    }

    steps.push(
      snapshot({
        activeVertex: u,
        codeLine: L.FUNC,
        message: `Connecting undirected edge between vertex ${u} and vertex ${v}.`,
      }),
    );

    graph.adj[u].push(v);
    graph.adj[u].sort((a, b) => a - b);
    graph.adj[v].push(u);
    graph.adj[v].sort((a, b) => a - b);
    edgesExplored++;

    steps.push(
      snapshot({
        activeVertex: u,
        activeEdge: [u, v],
        codeLine: L.WIRE_V,
        message: `Edge (${u}, ${v}) added successfully.`,
      }),
    );
    return steps;
  }

  // ============================ REMOVE VERTEX ============================
  if (operation === "remove-vertex") {
    const L = LINES["remove-vertex"];
    const u = value;

    if (u == null) {
      return fail(L.FUNC, "Please specify a vertex value to remove.");
    }

    if (!graph.vertices.includes(u)) {
      return fail(L.FUNC, `Vertex ${u} does not exist in the graph.`);
    }

    steps.push(
      snapshot({
        activeVertex: u,
        codeLine: L.FUNC,
        message: `Locating vertex ${u} and removing all incident edges.`,
      }),
    );

    // Remove incident edges from neighbors
    const neighbors = [...graph.adj[u]];
    for (const n of neighbors) {
      graph.adj[n] = graph.adj[n].filter((x) => x !== u);
    }
    delete graph.adj[u];
    graph.vertices = graph.vertices.filter((x) => x !== u);

    steps.push(
      snapshot({
        codeLine: L.ERASE,
        message: `Vertex ${u} and all its connected edges removed successfully.`,
      }),
    );
    return steps;
  }

  // ============================ REMOVE EDGE ============================
  if (operation === "remove-edge") {
    const L = LINES["remove-edge"];
    const u = value;
    const v = targetVertex;

    if (u == null || v == null) {
      return fail(
        L.FUNC,
        "Please provide both source vertex (Value) and target vertex (Target) to remove an edge.",
      );
    }

    if (!graph.vertices.includes(u) || !graph.vertices.includes(v)) {
      return fail(L.FUNC, `One or both vertices (${u}, ${v}) do not exist in the graph.`);
    }

    if (!graph.adj[u].includes(v)) {
      return fail(L.FUNC, `No edge exists between vertex ${u} and vertex ${v}.`);
    }

    steps.push(
      snapshot({
        activeEdge: [u, v],
        codeLine: L.FUNC,
        message: `Removing undirected edge between ${u} and ${v}.`,
      }),
    );

    graph.adj[u] = graph.adj[u].filter((x) => x !== v);
    graph.adj[v] = graph.adj[v].filter((x) => x !== u);

    steps.push(
      snapshot({
        codeLine: L.REMOVE_V,
        message: `Edge (${u}, ${v}) removed successfully.`,
      }),
    );
    return steps;
  }

  // ============================ BFS ============================
  if (operation === "bfs") {
    const L = LINES.bfs;
    const start = value;

    if (graph.vertices.length === 0) {
      return fail(L.FUNC, "Graph is empty. Add vertices and edges before traversing.");
    }

    if (start == null || !graph.vertices.includes(start)) {
      return fail(
        L.FUNC,
        `Start vertex ${start} is not in the graph. Choose an existing vertex (e.g. ${graph.vertices[0]}).`,
      );
    }

    const visited = new Set();
    const queue = [start];
    const traversalOrder = [];
    visited.add(start);

    steps.push(
      snapshot({
        activeVertex: start,
        visitedVertices: [...visited],
        queuedVertices: [...queue],
        traversalOrder: [...traversalOrder],
        codeLine: L.VISIT_START,
        message: `Starting BFS from vertex ${start}. Marked as visited and enqueued.`,
      }),
    );

    while (queue.length > 0) {
      const u = queue.shift();
      nodesVisited++;
      traversalOrder.push(u);

      steps.push(
        snapshot({
          activeVertex: u,
          visitedVertices: [...visited],
          queuedVertices: [...queue],
          traversalOrder: [...traversalOrder],
          codeLine: L.VISIT,
          message: `Dequeued vertex ${u}. Processing its neighbors. Traversal: [${traversalOrder.join(", ")}].`,
        }),
      );

      // Explore neighbors in deterministic sorted order
      const neighbors = [...(graph.adj[u] || [])].sort((a, b) => a - b);

      for (const v of neighbors) {
        edgesExplored++;

        if (!visited.has(v)) {
          visited.add(v);
          queue.push(v);

          steps.push(
            snapshot({
              activeVertex: u,
              activeEdge: [u, v],
              visitedVertices: [...visited],
              queuedVertices: [...queue],
              traversalOrder: [...traversalOrder],
              codeLine: L.MARK_PUSH,
              message: `Discovered unvisited neighbor ${v} via edge (${u}, ${v}). Enqueued ${v}.`,
            }),
          );
        } else {
          steps.push(
            snapshot({
              activeVertex: u,
              activeEdge: [u, v],
              visitedVertices: [...visited],
              queuedVertices: [...queue],
              traversalOrder: [...traversalOrder],
              codeLine: L.CHECK_VISITED,
              message: `Neighbor ${v} is already visited. Skipping edge (${u}, ${v}).`,
            }),
          );
        }
      }
    }

    // Check for disconnected components
    const unvisited = graph.vertices.filter((v) => !visited.has(v));
    const disconnectedMsg =
      unvisited.length > 0
        ? ` Note: Vertices [${unvisited.join(", ")}] belong to disconnected components.`
        : "";

    steps.push(
      snapshot({
        visitedVertices: [...visited],
        queuedVertices: [],
        traversalOrder: [...traversalOrder],
        codeLine: L.FUNC,
        message: `BFS traversal complete: [${traversalOrder.join(", ")}].${disconnectedMsg}`,
      }),
    );

    return steps;
  }

  // ============================ DFS ============================
  if (operation === "dfs") {
    const L = LINES.dfs;
    const start = value;

    if (graph.vertices.length === 0) {
      return fail(L.FUNC, "Graph is empty. Add vertices and edges before traversing.");
    }

    if (start == null || !graph.vertices.includes(start)) {
      return fail(
        L.FUNC,
        `Start vertex ${start} is not in the graph. Choose an existing vertex (e.g. ${graph.vertices[0]}).`,
      );
    }

    const visited = new Set();
    const callStack = [];
    const traversalOrder = [];

    function dfsVisit(u, parent = null) {
      visited.add(u);
      callStack.push(u);
      nodesVisited++;
      traversalOrder.push(u);

      steps.push(
        snapshot({
          activeVertex: u,
          activeEdge: parent != null ? [parent, u] : null,
          visitedVertices: [...visited],
          queuedVertices: [...callStack],
          traversalOrder: [...traversalOrder],
          codeLine: L.VISIT,
          message: `Visited vertex ${u}. Current DFS path: [${callStack.join(" -> ")}]. Traversal: [${traversalOrder.join(", ")}].`,
        }),
      );

      const neighbors = [...(graph.adj[u] || [])].sort((a, b) => a - b);

      for (const v of neighbors) {
        edgesExplored++;

        if (!visited.has(v)) {
          steps.push(
            snapshot({
              activeVertex: u,
              activeEdge: [u, v],
              visitedVertices: [...visited],
              queuedVertices: [...callStack],
              traversalOrder: [...traversalOrder],
              codeLine: L.RECURSE,
              message: `Exploring unvisited neighbor ${v} from ${u} via edge (${u}, ${v}). Recursing into DFS(${v}).`,
            }),
          );

          dfsVisit(v, u);

          steps.push(
            snapshot({
              activeVertex: u,
              visitedVertices: [...visited],
              queuedVertices: [...callStack],
              traversalOrder: [...traversalOrder],
              codeLine: L.FOR_NEIGHBORS,
              message: `Backtracked to vertex ${u}. Continuing neighbor exploration.`,
            }),
          );
        } else if (v !== parent) {
          // Detected cycle / back edge
          steps.push(
            snapshot({
              activeVertex: u,
              activeEdge: [u, v],
              visitedVertices: [...visited],
              queuedVertices: [...callStack],
              traversalOrder: [...traversalOrder],
              codeLine: L.CHECK_VISITED,
              message: `Neighbor ${v} is already visited (cycle/back-edge (${u}, ${v}) detected). Skipping.`,
            }),
          );
        }
      }

      callStack.pop();
    }

    steps.push(
      snapshot({
        activeVertex: start,
        visitedVertices: [],
        queuedVertices: [start],
        traversalOrder: [],
        codeLine: L.FUNC,
        message: `Starting DFS from vertex ${start}.`,
      }),
    );

    dfsVisit(start);

    // Check disconnected components
    const unvisited = graph.vertices.filter((v) => !visited.has(v));
    const disconnectedMsg =
      unvisited.length > 0
        ? ` Note: Vertices [${unvisited.join(", ")}] belong to disconnected components.`
        : "";

    steps.push(
      snapshot({
        visitedVertices: [...visited],
        queuedVertices: [],
        traversalOrder: [...traversalOrder],
        codeLine: L.FUNC,
        message: `DFS traversal complete: [${traversalOrder.join(", ")}].${disconnectedMsg}`,
      }),
    );

    return steps;
  }

  return steps;
}
