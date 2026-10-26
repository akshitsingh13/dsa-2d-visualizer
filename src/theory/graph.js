// Graph theory documentation.
//
// Explains unweighted undirected graph represented via Adjacency List,
// BFS vs DFS traversals, cycle handling, disconnected components,
// and O(V + E) complexity bounds.

import { GRAPH_CODE } from "../algorithms/graphOps";

const theory = {
  id: "GRAPH",
  title: "Graph",
  category: "data-structures",
  summary:
    "A graph represents a network of entities (vertices) linked by pairwise relationships (edges). Using an adjacency list, Breadth-First Search (BFS) and Depth-First Search (DFS) visit every reachable vertex and edge in O(V + E) time.",

  sections: [
    {
      id: "intuition",
      title: "The big idea",
      blocks: [
        {
          type: "paragraph",
          text: "While trees impose strict hierarchical parent-child relationships, a **Graph** models arbitrary networks without a central root. Vertices (nodes) can connect to any number of neighbors via edges, enabling modeling of social networks, road systems, computer networks, and state spaces.",
        },
        {
          type: "paragraph",
          text: "Traversing a graph requires systematic exploration. Because graphs may contain loops (**cycles**) or unreachable disconnected clusters, algorithms must track **visited** nodes to prevent infinite loops.",
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
            "**Adjacency List:** Each vertex stores a list of its directly connected neighbors. This compact representation uses O(V + E) space.",
            "**Breadth-First Search (BFS):** Explores vertices layer-by-layer radiating outward from a start vertex using a **Queue (FIFO)**. Guarantees finding the shortest path in unweighted graphs.",
            "**Depth-First Search (DFS):** Explores as deep as possible along each branch before **backtracking** using a **Call Stack (LIFO)**. Ideal for connectivity testing, cycle detection, and topological sorting.",
            "**Visited Set:** An auxiliary collection or boolean array `visited[v]` ensures each vertex and incident edge is explored without infinite loops caused by cycles.",
            "**Disconnected Components:** Vertices unreachable from the start vertex remain unvisited in a single traversal, demonstrating independent connected components.",
          ],
        },
        {
          type: "callout",
          tone: "note",
          title: "Adjacency List vs Adjacency Matrix",
          text: "An Adjacency Matrix requires O(V²) space and O(V²) traversal time because it checks every pair of vertices. An Adjacency List only stores active edges, allowing BFS and DFS to run in optimal O(V + E) time.",
        },
      ],
    },
    {
      id: "worked-example",
      title: "Worked example",
      blocks: [
        {
          type: "paragraph",
          text: "Consider a graph with vertices {1, 2, 3, 4, 5} and edges (1-2), (1-3), (2-4), (2-5):",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "**BFS from 1:** Enqueue 1. Dequeue 1, visit neighbors 2 and 3 (enqueue 2, 3). Dequeue 2, visit neighbors 4 and 5 (enqueue 4, 5). Dequeue 3 (no new neighbors). Dequeue 4, then 5. Order: [1, 2, 3, 4, 5].",
            "**DFS from 1:** Visit 1, recurse to 2. From 2, recurse to 4. Backtrack to 2, recurse to 5. Backtrack to 1, recurse to 3. Order: [1, 2, 4, 5, 3].",
          ],
        },
      ],
    },
    {
      id: "code",
      title: "Code walkthrough",
      blocks: [
        {
          type: "code",
          language: "cpp",
          code: GRAPH_CODE["add-vertex"],
          caption: "Add vertex — initialize empty neighbor vector in adjacency list.",
        },
        {
          type: "code",
          language: "cpp",
          code: GRAPH_CODE["add-edge"],
          caption: "Add edge — add bilateral neighbor entries for undirected connection.",
        },
        {
          type: "code",
          language: "cpp",
          code: GRAPH_CODE["remove-vertex"],
          caption: "Remove vertex — remove node and unlink all incident neighbor references.",
        },
        {
          type: "code",
          language: "cpp",
          code: GRAPH_CODE["remove-edge"],
          caption: "Remove edge — remove mutual connections from adjacency lists.",
        },
        {
          type: "code",
          language: "cpp",
          code: GRAPH_CODE.bfs,
          caption: "Breadth-First Search — iterative traversal with FIFO queue and visited tracking.",
        },
        {
          type: "code",
          language: "cpp",
          code: GRAPH_CODE.dfs,
          caption: "Depth-First Search — recursive traversal exploring branch depths before backtracking.",
        },
        {
          type: "code",
          language: "cpp",
          code: GRAPH_CODE.clear,
          caption: "Clear — clear all vertices, adjacency lists, and traversal visited states.",
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
          type: "callout",
          tone: "warning",
          title: "The O(V + E) Bound Explained",
          text: "Why O(V + E)? Each of the V vertices enters the queue or call stack at most once. For each visited vertex u, the algorithm iterates over its degree deg(u) neighbors. The sum of degrees across all vertices in an undirected graph equals 2E. Thus, the total time spent scanning adjacency lists is proportional to V + 2E = O(V + E).",
        },
      ],
    },
    {
      id: "tradeoffs",
      title: "Advantages and disadvantages",
      blocks: [
        {
          type: "table",
          headers: ["Advantage", "Disadvantage"],
          rows: [
            [
              "Adjacency list is space-efficient for sparse graphs: O(V + E) space.",
              "Checking if an edge exists between u and v takes O(deg(u)) instead of O(1) in a matrix.",
            ],
            [
              "BFS finds shortest paths in unweighted graphs in linear time.",
              "Dense graphs approach E = O(V²), where adjacency lists lose memory advantages.",
            ],
            [
              "Flexible structure models real-world arbitrary topologies.",
              "Cycles require explicit visited sets to prevent infinite loops.",
            ],
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
          text: "Use BFS when finding shortest paths in unweighted graphs or discovering nearest neighbors layer-by-layer. Use DFS for cycle detection, topological sorting, connected components, and solving path/maze exploration problems.",
        },
        {
          type: "paragraph",
          text: "Do not use unweighted BFS when edges carry arbitrary weights — use Dijkstra's Algorithm or Bellman-Ford instead.",
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
            "Forgetting to mark nodes visited before enqueueing in BFS, causing identical nodes to be enqueued multiple times.",
            "Assuming BFS or DFS visits the entire graph when disconnected components exist.",
            "Not removing reciprocal edges in undirected graphs when deleting edges or vertices.",
            "Attempting to traverse an empty graph or picking a starting vertex not present in the vertex set.",
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
            "**Directed Graph (Digraph):** Edges have a one-way orientation.",
            "**Weighted Graph:** Edges have associated weights/costs (solved by Dijkstra / Prim / Kruskal).",
            "**Bipartite Graph:** Vertices can be partitioned into two independent sets.",
            "**Directed Acyclic Graph (DAG):** Directed graph with no directed cycles, enabling topological ordering.",
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
            "Adjacency lists represent sparse graphs compactly and enable linear O(V + E) traversals.",
            "BFS uses a queue for level-order exploration and shortest paths.",
            "DFS uses a stack or recursion for deep path exploration and cycle detection.",
            "A visited set is essential to avoid infinite cycles.",
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
      title: "Graph Data Structure and BFS/DFS Explained",
      channel: "YouTube search results",
      url: "https://www.youtube.com/results?search_query=graph+data+structure+bfs+dfs+algorithms",
      query: "graph data structure bfs dfs algorithms",
      isSearchLink: true,
    },
    {
      title: "Breadth-First Search (BFS) Algorithm",
      channel: "YouTube search results",
      url: "https://www.youtube.com/results?search_query=breadth+first+search+algorithm+c%2B%2B",
      query: "breadth first search algorithm c++",
      isSearchLink: true,
    },
    {
      title: "Depth-First Search (DFS) Algorithm",
      channel: "YouTube search results",
      url: "https://www.youtube.com/results?search_query=depth+first+search+algorithm+c%2B%2B",
      query: "depth first search algorithm c++",
      isSearchLink: true,
    },
  ],

  practice: [
    {
      title: "Clone Graph",
      platform: "LeetCode",
      note: "Graph traversal with hash map to clone connected nodes.",
    },
    {
      title: "Number of Connected Components in an Undirected Graph",
      platform: "LeetCode",
      note: "Count disconnected components using BFS or DFS.",
    },
    {
      title: "Course Schedule",
      platform: "LeetCode",
      note: "Cycle detection using DFS on a directed graph.",
    },
  ],
};

export default theory;
