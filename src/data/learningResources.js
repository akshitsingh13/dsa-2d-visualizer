// Curated online learning resources for each supported algorithm and data structure.
// Categories:
//  - articles: In-depth technical explainers and documentation
//  - videos: High-quality educational video tutorials (YouTube)
//  - sourceCode: Official reference implementations and documentation (cppreference / GitHub)
//  - practice: Curated practice problems from LeetCode with problem numbers and links
//  - exploreMore: Verified search queries for open exploration

export const TOPIC_RESOURCES = {
  LS: {
    id: "LS",
    name: "Linear Search",
    category: "searching",
    articles: [
      {
        title: "Linear Search Algorithm — Complete Guide",
        source: "GeeksforGeeks",
        type: "Article",
        description:
          "Detailed explanation of sequential search, pseudocode, edge cases, and step-by-step trace.",
        url: "https://www.geeksforgeeks.org/linear-search/",
      },
      {
        title: "Linear Search — Programiz Tutorial",
        source: "Programiz",
        type: "Tutorial",
        description:
          "Clear visual breakdown of linear search with time and space complexity walkthroughs.",
        url: "https://www.programiz.com/dsa/linear-search",
      },
      {
        title: "Linear Search",
        source: "Wikipedia",
        type: "Reference",
        description:
          "Theoretical analysis, history, and average vs worst-case comparison bounds.",
        url: "https://en.wikipedia.org/wiki/Linear_search",
      },
    ],
    videos: [
      {
        title: "Linear Search in 3 Minutes",
        channel: "Michael Sambol",
        type: "Video",
        description:
          "Concise, high-level animated walkthrough of the linear search algorithm.",
        url: "https://www.youtube.com/watch?v=4GPdGsB3OSc",
      },
      {
        title: "Linear Search Algorithm Explained with C++ Code",
        channel: "Abdul Bari",
        type: "Video",
        description:
          "In-depth theoretical intuition and code analysis from a recognized CS educator.",
        url: "https://www.youtube.com/watch?v=_HRA37X8N_Q",
      },
      {
        title: "CS50 — Linear Search",
        channel: "CS50",
        type: "Video",
        description:
          "Harvard CS50 lecture demonstration of linear search vs binary search.",
        url: "https://www.youtube.com/watch?v=TwsgCHYmbbA",
      },
    ],
    sourceCode: [
      {
        title: "std::find — C++ Standard Library Implementation",
        source: "cppreference.com",
        type: "Documentation",
        description:
          "Official reference for C++ std::find, which performs linear search on generic iterators.",
        url: "https://en.cppreference.com/w/cpp/algorithm/find",
      },
      {
        title: "The Algorithms / C++ — Linear Search",
        source: "GitHub",
        type: "Source Code",
        description:
          "Clean, open-source C++ linear search implementation with test cases.",
        url: "https://github.com/TheAlgorithms/C-Plus-Plus/blob/master/search/linear_search.cpp",
      },
    ],
    practice: [
      {
        title: "Find Target Indices After Sorting Array",
        platform: "LeetCode 2089",
        difficulty: "Easy",
        description: "Identify indices matching a target value across an array.",
        url: "https://leetcode.com/problems/find-target-indices-after-sorting-array/",
      },
      {
        title: "Check If N and Its Double Exist",
        platform: "LeetCode 1346",
        difficulty: "Easy",
        description: "Check if there exists two indices matching a target condition.",
        url: "https://leetcode.com/problems/check-if-n-and-its-double-exist/",
      },
    ],
    exploreMore: [
      {
        title: "Explore Sentinel Linear Search",
        query: "sentinel linear search algorithm",
        url: "https://www.google.com/search?q=sentinel+linear+search+algorithm",
      },
      {
        title: "Explore Linear Search vs Binary Search",
        query: "linear search vs binary search trade offs",
        url: "https://www.google.com/search?q=linear+search+vs+binary+search+trade+offs",
      },
    ],
  },

  BS: {
    id: "BS",
    name: "Binary Search",
    category: "searching",
    articles: [
      {
        title: "Binary Search — Detailed Analysis",
        source: "GeeksforGeeks",
        type: "Article",
        description:
          "Iterative and recursive implementations, midpoint overflow prevention, and invariant proofs.",
        url: "https://www.geeksforgeeks.org/binary-search/",
      },
      {
        title: "Binary Search Algorithm",
        source: "Wikipedia",
        type: "Reference",
        description:
          "Formal definition, logarithmic derivation, and historical edge cases in midpoint calculation.",
        url: "https://en.wikipedia.org/wiki/Binary_search_algorithm",
      },
      {
        title: "Binary Search — Programiz",
        source: "Programiz",
        type: "Tutorial",
        description:
          "Visual explanation showing search interval halving at each iteration.",
        url: "https://www.programiz.com/dsa/binary-search",
      },
    ],
    videos: [
      {
        title: "Binary Search in 4 Minutes",
        channel: "Michael Sambol",
        type: "Video",
        description:
          "Clear animation of low, mid, and high pointers narrowing the search space.",
        url: "https://www.youtube.com/watch?v=P3YID7liBug",
      },
      {
        title: "Binary Search Algorithm — Abdul Bari",
        channel: "Abdul Bari",
        type: "Video",
        description:
          "Mastery lesson on binary search recurrences, recurrence trees, and best/worst derivations.",
        url: "https://www.youtube.com/watch?v=C2apEw9pgtw",
      },
      {
        title: "Binary Search — CS50",
        channel: "CS50",
        type: "Video",
        description:
          "Phone book tearing demonstration of O(log n) efficiency by David J. Malan.",
        url: "https://www.youtube.com/watch?v=T98PIp4omUA",
      },
    ],
    sourceCode: [
      {
        title: "std::binary_search — C++ Standard Library",
        source: "cppreference.com",
        type: "Documentation",
        description:
          "Official documentation for std::binary_search, std::lower_bound, and std::upper_bound.",
        url: "https://en.cppreference.com/w/cpp/algorithm/binary_search",
      },
      {
        title: "The Algorithms / C++ — Binary Search",
        source: "GitHub",
        type: "Source Code",
        description:
          "Robust C++ implementation showing iterative and recursive variants.",
        url: "https://github.com/TheAlgorithms/C-Plus-Plus/blob/master/search/binary_search.cpp",
      },
    ],
    practice: [
      {
        title: "Binary Search",
        platform: "LeetCode 704",
        difficulty: "Easy",
        description: "Classic binary search on a sorted integer array in O(log n).",
        url: "https://leetcode.com/problems/binary-search/",
      },
      {
        title: "Search Insert Position",
        platform: "LeetCode 35",
        difficulty: "Easy",
        description: "Return target index or the index where it would be inserted.",
        url: "https://leetcode.com/problems/search-insert-position/",
      },
      {
        title: "First Bad Version",
        platform: "LeetCode 278",
        difficulty: "Easy",
        description: "Minimize API calls to locate the first corrupted version.",
        url: "https://leetcode.com/problems/first-bad-version/",
      },
    ],
    exploreMore: [
      {
        title: "Explore Binary Search on Answer / Monotonic Predicates",
        query: "binary search on answer space tutorial",
        url: "https://www.google.com/search?q=binary+search+on+answer+space+tutorial",
      },
      {
        title: "Explore Lower Bound vs Upper Bound",
        query: "std lower_bound upper_bound difference explained",
        url: "https://www.google.com/search?q=std+lower_bound+upper_bound+difference+explained",
      },
    ],
  },

  BUB: {
    id: "BUB",
    name: "Bubble Sort",
    category: "sorting",
    articles: [
      {
        title: "Bubble Sort Algorithm",
        source: "GeeksforGeeks",
        type: "Article",
        description:
          "Adjacent element comparison, pass-by-pass bubbling, and the early termination swapped optimization.",
        url: "https://www.geeksforgeeks.org/bubble-sort/",
      },
      {
        title: "Bubble Sort",
        source: "Wikipedia",
        type: "Reference",
        description:
          "Asymptotic analysis, stability properties, and comparison with other quadratic sorts.",
        url: "https://en.wikipedia.org/wiki/Bubble_sort",
      },
      {
        title: "Bubble Sort Algorithm Tutorial",
        source: "Programiz",
        type: "Tutorial",
        description:
          "Step-by-step visual trace showing largest elements settling to the end.",
        url: "https://www.programiz.com/dsa/bubble-sort",
      },
    ],
    videos: [
      {
        title: "Bubble Sort in 2 Minutes",
        channel: "Michael Sambol",
        type: "Video",
        description:
          "Rapid, intuitive visual animation of the pairwise swap process.",
        url: "https://www.youtube.com/watch?v=xli_FI7CuzA",
      },
      {
        title: "Bubble Sort Algorithm — Abdul Bari",
        channel: "Abdul Bari",
        type: "Video",
        description:
          "Comprehensive lecture on pass mechanics, intermediate states, and early break optimization.",
        url: "https://www.youtube.com/watch?v=Jdtq5uKz-w4",
      },
    ],
    sourceCode: [
      {
        title: "The Algorithms / C++ — Bubble Sort",
        source: "GitHub",
        type: "Source Code",
        description:
          "Production-clean C++ implementation with early termination flag.",
        url: "https://github.com/TheAlgorithms/C-Plus-Plus/blob/master/sorting/bubble_sort.cpp",
      },
    ],
    practice: [
      {
        title: "Sort Colors (Dutch National Flag)",
        platform: "LeetCode 75",
        difficulty: "Medium",
        description: "Sort an array of 0s, 1s, and 2s in-place.",
        url: "https://leetcode.com/problems/sort-colors/",
      },
      {
        title: "Height Checker",
        platform: "LeetCode 1051",
        difficulty: "Easy",
        description: "Compare unsorted array against sorted target heights.",
        url: "https://leetcode.com/problems/height-checker/",
      },
    ],
    exploreMore: [
      {
        title: "Explore Cocktail Shaker Sort",
        query: "cocktail shaker sort bidirectional bubble sort",
        url: "https://www.google.com/search?q=cocktail+shaker+sort+bidirectional+bubble+sort",
      },
      {
        title: "Explore Adaptive Sorting Algorithms",
        query: "adaptive sorting algorithms comparison",
        url: "https://www.google.com/search?q=adaptive+sorting+algorithms+comparison",
      },
    ],
  },

  STK: {
    id: "STK",
    name: "Stack",
    category: "data-structures",
    articles: [
      {
        title: "Stack Data Structure — Complete Guide",
        source: "GeeksforGeeks",
        type: "Article",
        description:
          "LIFO principle, push/pop/peek operations, array vs linked-list implementations, and overflow/underflow handling.",
        url: "https://www.geeksforgeeks.org/stack-data-structure/",
      },
      {
        title: "Stack (Abstract Data Type)",
        source: "Wikipedia",
        type: "Reference",
        description:
          "Theoretical formalization, call stack hardware models, and parenthesis parsing.",
        url: "https://en.wikipedia.org/wiki/Stack_(abstract_data_type)",
      },
    ],
    videos: [
      {
        title: "Stack Data Structure in 3 Minutes",
        channel: "Michael Sambol",
        type: "Video",
        description:
          "Animated demonstration of top-of-stack additions and removals.",
        url: "https://www.youtube.com/watch?v=FNZ5o9bEBHU",
      },
      {
        title: "Introduction to Stacks — mycodeschool",
        channel: "mycodeschool",
        type: "Video",
        description:
          "Acclaimed tutorial on stack memory architecture and operation bounds.",
        url: "https://www.youtube.com/watch?v=F1F2imiOJfk",
      },
    ],
    sourceCode: [
      {
        title: "std::stack Container Adaptor",
        source: "cppreference.com",
        type: "Documentation",
        description:
          "Official C++ reference for std::stack, top(), push(), pop(), and underlying containers.",
        url: "https://en.cppreference.com/w/cpp/container/stack",
      },
    ],
    practice: [
      {
        title: "Valid Parentheses",
        platform: "LeetCode 20",
        difficulty: "Easy",
        description: "Validate bracket matching using a stack in O(n) time.",
        url: "https://leetcode.com/problems/valid-parentheses/",
      },
      {
        title: "Min Stack",
        platform: "LeetCode 155",
        difficulty: "Medium",
        description: "Design a stack that supports getMin() in O(1) time.",
        url: "https://leetcode.com/problems/min-stack/",
      },
    ],
    exploreMore: [
      {
        title: "Explore Monotonic Stack Technique",
        query: "monotonic stack technique leetcode tutorial",
        url: "https://www.google.com/search?q=monotonic+stack+technique+leetcode+tutorial",
      },
      {
        title: "Explore Infix to Postfix Conversion",
        query: "infix to postfix conversion using stack shunting yard",
        url: "https://www.google.com/search?q=infix+to+postfix+conversion+using+stack+shunting+yard",
      },
    ],
  },

  QUE: {
    id: "QUE",
    name: "Queue",
    category: "data-structures",
    articles: [
      {
        title: "Queue Data Structure Overview",
        source: "GeeksforGeeks",
        type: "Article",
        description:
          "FIFO principle, front/rear indices, circular queue optimization, and queue implementations.",
        url: "https://www.geeksforgeeks.org/queue-data-structure/",
      },
      {
        title: "Queue (Abstract Data Type)",
        source: "Wikipedia",
        type: "Reference",
        description:
          "Buffer architectures, waiting lines, and scheduling applications.",
        url: "https://en.wikipedia.org/wiki/Queue_(abstract_data_type)",
      },
    ],
    videos: [
      {
        title: "Queue Data Structure in 3 Minutes",
        channel: "Michael Sambol",
        type: "Video",
        description:
          "Fast-paced visual breakdown of enqueue and dequeue operations.",
        url: "https://www.youtube.com/watch?v=D6gu-_tm9g8",
      },
      {
        title: "Introduction to Queues — mycodeschool",
        channel: "mycodeschool",
        type: "Video",
        description:
          "Clear explanation of FIFO mechanics, array representations, and circular buffer wrap-around.",
        url: "https://www.youtube.com/watch?v=XuCbpw6Bj1U",
      },
    ],
    sourceCode: [
      {
        title: "std::queue Container Adaptor",
        source: "cppreference.com",
        type: "Documentation",
        description:
          "Official reference for std::queue member functions and standard deque backing.",
        url: "https://en.cppreference.com/w/cpp/container/queue",
      },
    ],
    practice: [
      {
        title: "Implement Queue using Stacks",
        platform: "LeetCode 232",
        difficulty: "Easy",
        description: "Implement FIFO queue operations using two LIFO stacks.",
        url: "https://leetcode.com/problems/implement-queue-using-stacks/",
      },
      {
        title: "Design Circular Queue",
        platform: "LeetCode 622",
        difficulty: "Medium",
        description: "Implement circular queue with fixed buffer array without memory waste.",
        url: "https://leetcode.com/problems/design-circular-queue/",
      },
    ],
    exploreMore: [
      {
        title: "Explore Priority Queues and Binary Heaps",
        query: "priority queue binary heap explanation",
        url: "https://www.google.com/search?q=priority+queue+binary+heap+explanation",
      },
      {
        title: "Explore Double-Ended Queue (Deque)",
        query: "double ended queue deque applications in algorithms",
        url: "https://www.google.com/search?q=double+ended+queue+deque+applications+in+algorithms",
      },
    ],
  },

  LL: {
    id: "LL",
    name: "Linked List",
    category: "data-structures",
    articles: [
      {
        title: "Singly Linked List Implementation & Analysis",
        source: "GeeksforGeeks",
        type: "Article",
        description:
          "Pointer manipulation, head/tail insertion, index deletion, and memory differences from arrays.",
        url: "https://www.geeksforgeeks.org/singly-linked-list-tutorial/",
      },
      {
        title: "Linked List Data Structure",
        source: "Programiz",
        type: "Tutorial",
        description:
          "Visual guides for node allocation, linking next pointers, and traversal.",
        url: "https://www.programiz.com/dsa/linked-list",
      },
      {
        title: "Linked List",
        source: "Wikipedia",
        type: "Reference",
        description:
          "Non-contiguous dynamic allocation, cache locality trade-offs, and sentinel nodes.",
        url: "https://en.wikipedia.org/wiki/Linked_list",
      },
    ],
    videos: [
      {
        title: "Linked Lists in 4 Minutes",
        channel: "Michael Sambol",
        type: "Video",
        description:
          "Visual explanation of head pointers, node contents, and pointer rewiring.",
        url: "https://www.youtube.com/watch?v=F8AbOfQwl1c",
      },
      {
        title: "Introduction to Linked List — mycodeschool",
        channel: "mycodeschool",
        type: "Video",
        description:
          "Mastery lesson on dynamic memory allocation in heap, pointer safety, and traversal.",
        url: "https://www.youtube.com/watch?v=NobHlGujV3g",
      },
    ],
    sourceCode: [
      {
        title: "std::forward_list (Singly Linked List)",
        source: "cppreference.com",
        type: "Documentation",
        description:
          "Official C++ documentation for std::forward_list zero-overhead singly linked list.",
        url: "https://en.cppreference.com/w/cpp/container/forward_list",
      },
    ],
    practice: [
      {
        title: "Reverse Linked List",
        platform: "LeetCode 206",
        difficulty: "Easy",
        description: "Reverse a singly linked list iteratively and recursively.",
        url: "https://leetcode.com/problems/reverse-linked-list/",
      },
      {
        title: "Merge Two Sorted Lists",
        platform: "LeetCode 21",
        difficulty: "Easy",
        description: "Splice nodes of two sorted lists together without extra storage.",
        url: "https://leetcode.com/problems/merge-two-sorted-lists/",
      },
      {
        title: "Linked List Cycle",
        platform: "LeetCode 141",
        difficulty: "Easy",
        description: "Floyd's Tortoise and Hare cycle detection algorithm.",
        url: "https://leetcode.com/problems/linked-list-cycle/",
      },
    ],
    exploreMore: [
      {
        title: "Explore Doubly Linked Lists & Sentinel Nodes",
        query: "doubly linked list sentinel node benefits",
        url: "https://www.google.com/search?q=doubly+linked+list+sentinel+node+benefits",
      },
      {
        title: "Explore Skip Lists",
        query: "skip list probabilistic data structure tutorial",
        url: "https://www.google.com/search?q=skip+list+probabilistic+data+structure+tutorial",
      },
    ],
  },

  BST: {
    id: "BST",
    name: "Binary Search Tree",
    category: "data-structures",
    articles: [
      {
        title: "Binary Search Tree (BST) Tutorial",
        source: "GeeksforGeeks",
        type: "Article",
        description:
          "BST invariant, recursive insertion, in-order predecessor/successor, and deletion across all 3 cases.",
        url: "https://www.geeksforgeeks.org/binary-search-tree-data-structure/",
      },
      {
        title: "Binary Search Tree",
        source: "Wikipedia",
        type: "Reference",
        description:
          "Mathematical properties, height bounds, balanced vs skewed complexity, and tree traversals.",
        url: "https://en.wikipedia.org/wiki/Binary_search_tree",
      },
    ],
    videos: [
      {
        title: "Binary Search Tree in 4 Minutes",
        channel: "Michael Sambol",
        type: "Video",
        description:
          "Animated explanation of BST branching, in-order traversal, and deletion.",
        url: "https://www.youtube.com/watch?v=i_Q0v_Ct5lY",
      },
      {
        title: "Binary Search Tree Insertion and Deletion — mycodeschool",
        channel: "mycodeschool",
        type: "Video",
        description:
          "Definitive guide on pointer updates, finding minimum in right subtree, and recursive deletion.",
        url: "https://www.youtube.com/watch?v=gcULXE7ViZw",
      },
    ],
    sourceCode: [
      {
        title: "std::map (Red-Black BST Implementation)",
        source: "cppreference.com",
        type: "Documentation",
        description:
          "Official reference for C++ std::map, guaranteed to run in O(log n) via balanced BST.",
        url: "https://en.cppreference.com/w/cpp/container/map",
      },
    ],
    practice: [
      {
        title: "Search in a Binary Search Tree",
        platform: "LeetCode 700",
        difficulty: "Easy",
        description: "Locate node equal to target value in a BST.",
        url: "https://leetcode.com/problems/search-in-a-binary-search-tree/",
      },
      {
        title: "Insert into a Binary Search Tree",
        platform: "LeetCode 701",
        difficulty: "Medium",
        description: "Insert new value while preserving valid BST property.",
        url: "https://leetcode.com/problems/insert-into-a-binary-search-tree/",
      },
      {
        title: "Delete Node in a BST",
        platform: "LeetCode 450",
        difficulty: "Medium",
        description: "Handle leaf, single child, and 2-child in-order successor deletion.",
        url: "https://leetcode.com/problems/delete-node-in-a-bst/",
      },
    ],
    exploreMore: [
      {
        title: "Explore AVL Tree Self-Balancing Rotations",
        query: "AVL tree rotations step by step visualizer",
        url: "https://www.google.com/search?q=AVL+tree+rotations+step+by+step+visualizer",
      },
      {
        title: "Explore Red-Black Tree Invariants",
        query: "red black tree rules and balancing explained",
        url: "https://www.google.com/search?q=red+black+tree+rules+and+balancing+explained",
      },
    ],
  },

  GRAPH: {
    id: "GRAPH",
    name: "Graph",
    category: "data-structures",
    articles: [
      {
        title: "Graph Data Structure and Algorithms",
        source: "GeeksforGeeks",
        type: "Article",
        description:
          "Adjacency list vs adjacency matrix representations, BFS level-order queue, DFS recursion stack, and cycle handling.",
        url: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/",
      },
      {
        title: "Breadth-First Search",
        source: "Wikipedia",
        type: "Reference",
        description:
          "Queue-based layer traversal, completeness, and O(V + E) time derivation.",
        url: "https://en.wikipedia.org/wiki/Breadth-first_search",
      },
      {
        title: "Depth-First Search",
        source: "Wikipedia",
        type: "Reference",
        description:
          "Depth exploration, tree edges, back edges, and topological sorting.",
        url: "https://en.wikipedia.org/wiki/Depth-first_search",
      },
    ],
    videos: [
      {
        title: "Graph Data Structure in 4 Minutes",
        channel: "Michael Sambol",
        type: "Video",
        description:
          "Visual overview of vertices, edges, directed vs undirected graphs, and representations.",
        url: "https://www.youtube.com/watch?v=TIbUeeksXcI",
      },
      {
        title: "Breadth First Search (BFS) Algorithm",
        channel: "Abdul Bari",
        type: "Video",
        description:
          "Classic in-depth lecture on BFS queuing, spanning trees, and disconnected components.",
        url: "https://www.youtube.com/watch?v=pcKY4hjDrxk",
      },
      {
        title: "Depth First Search (DFS) Algorithm",
        channel: "Abdul Bari",
        type: "Video",
        description:
          "Comprehensive lecture on DFS backtracking, call stack activation, and cycle detection.",
        url: "https://www.youtube.com/watch?v=vf-cxgUXcMk",
      },
    ],
    sourceCode: [
      {
        title: "The Algorithms / C++ — Breadth First Search",
        source: "GitHub",
        type: "Source Code",
        description:
          "Open-source modern C++ BFS implementation using std::vector adjacency lists.",
        url: "https://github.com/TheAlgorithms/C-Plus-Plus/blob/master/graph/breadth_first_search.cpp",
      },
      {
        title: "The Algorithms / C++ — Depth First Search",
        source: "GitHub",
        type: "Source Code",
        description:
          "Open-source C++ DFS implementation showing recursive traversal.",
        url: "https://github.com/TheAlgorithms/C-Plus-Plus/blob/master/graph/depth_first_search.cpp",
      },
    ],
    practice: [
      {
        title: "Number of Islands",
        platform: "LeetCode 200",
        difficulty: "Medium",
        description: "Count disconnected components using BFS or DFS traversal on a 2D grid.",
        url: "https://leetcode.com/problems/number-of-islands/",
      },
      {
        title: "Clone Graph",
        platform: "LeetCode 133",
        difficulty: "Medium",
        description: "Perform deep copy of an undirected graph using visited hash map.",
        url: "https://leetcode.com/problems/clone-graph/",
      },
      {
        title: "Course Schedule (Cycle Detection)",
        platform: "LeetCode 207",
        difficulty: "Medium",
        description: "Determine if prerequisites contain directed cycles using DFS or Kahn's algorithm.",
        url: "https://leetcode.com/problems/course-schedule/",
      },
    ],
    exploreMore: [
      {
        title: "Explore Dijkstra's Shortest Path Algorithm",
        query: "dijkstras algorithm priority queue tutorial",
        url: "https://www.google.com/search?q=dijkstras+algorithm+priority+queue+tutorial",
      },
      {
        title: "Explore Topological Sort on DAGs",
        query: "topological sort kahns algorithm vs dfs",
        url: "https://www.google.com/search?q=topological+sort+kahns+algorithm+vs+dfs",
      },
    ],
  },
};

export function getTopicResources(id) {
  return TOPIC_RESOURCES[id] ?? null;
}
