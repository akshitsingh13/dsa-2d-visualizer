// Binary Search Tree theory.
//
// Explains BST properties, insertion, searching, deletion (0, 1, 2 children),
// traversals, and critical complexity distinctions (balanced O(log n) vs skewed O(n)).

import { BST_CODE } from "../algorithms/bstOps";

const theory = {
  id: "BST",
  title: "Binary Search Tree",
  category: "data-structures",
  summary:
    "A Binary Search Tree (BST) is a hierarchical node-based data structure where each node has at most two children, and all keys in the left subtree are smaller while all keys in the right subtree are greater than the node's key.",

  sections: [
    {
      id: "intuition",
      title: "The big idea",
      blocks: [
        {
          type: "paragraph",
          text: "Think of a guessing game where after every guess, someone tells you either 'higher' or 'lower'. In a sorted array, binary search cuts the remaining options in half with each comparison. A **Binary Search Tree (BST)** organizes data into a linked branching hierarchy that provides the same decision-tree branching behavior dynamically.",
        },
        {
          type: "paragraph",
          text: "Every node in a BST acts as a divider: all values strictly smaller go into its **left subtree**, and all values strictly greater go into its **right subtree**. Because of this invariant, searching, inserting, and deleting do not require scanning all elements — you simply follow left or right branches down the tree.",
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
            "**Search(x):** Start at the root. If `x == curr->data`, target found. If `x < curr->data`, branch left; if `x > curr->data`, branch right. If reaching a null pointer, target does not exist.",
            "**Insert(x):** Follow the search path until encountering null, then attach a new node. Duplicates are rejected or ignored to maintain strict ordering.",
            "**Delete(x):** Locate the node. If it is a **leaf node** (no children), remove it directly. If it has **one child**, bypass it by linking its parent directly to its child. If it has **two children**, replace its value with its **in-order successor** (the minimum value in its right subtree) and recursively delete that successor.",
            "**In-order Traversal:** Visit Left, Root, Right. For a BST, in-order traversal always produces elements in ascending sorted order.",
            "**Pre-order Traversal:** Visit Root, Left, Right. Useful for serializing or cloning tree structure.",
            "**Post-order Traversal:** Visit Left, Right, Root. Useful for deleting or freeing nodes bottom-up.",
          ],
        },
        {
          type: "callout",
          tone: "note",
          title: "The In-Order Successor Trick",
          text: "When deleting a node with two children, why use the minimum in the right subtree? Because that node is guaranteed to be greater than all left descendants and smaller than all remaining right descendants. Furthermore, the minimum node in a subtree never has a left child, making its removal straightforward!",
        },
      ],
    },
    {
      id: "worked-example",
      title: "Worked example",
      blocks: [
        {
          type: "paragraph",
          text: "Consider inserting the values [50, 30, 70, 20, 40] into an initially empty BST:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "**Insert 50:** Tree is empty; 50 becomes the root.",
            "**Insert 30:** 30 < 50, so 30 becomes the left child of 50.",
            "**Insert 70:** 70 > 50, so 70 becomes the right child of 50.",
            "**Insert 20:** 20 < 50 (go left to 30), 20 < 30 (go left to null); 20 becomes left child of 30.",
            "**Insert 40:** 40 < 50 (go left to 30), 40 > 30 (go right to null); 40 becomes right child of 30.",
          ],
        },
        {
          type: "paragraph",
          text: "Now, an in-order traversal visits [20, 30, 40, 50, 70], which is perfectly sorted.",
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
          code: BST_CODE.insert,
          caption: "Insert — recursive insertion maintaining the BST ordering invariant.",
        },
        {
          type: "code",
          language: "cpp",
          code: BST_CODE.search,
          caption: "Search — binary pruning down to target or null.",
        },
        {
          type: "code",
          language: "cpp",
          code: BST_CODE.delete,
          caption: "Delete — handling leaf, 1 child, and 2 children with in-order successor.",
        },
        {
          type: "code",
          language: "cpp",
          code: BST_CODE.inorder,
          caption: "In-order traversal — left, root, right.",
        },
        {
          type: "code",
          language: "cpp",
          code: BST_CODE.preorder,
          caption: "Pre-order traversal — root, left, right.",
        },
        {
          type: "code",
          language: "cpp",
          code: BST_CODE.postorder,
          caption: "Post-order traversal — left, right, root.",
        },
        {
          type: "code",
          language: "cpp",
          code: BST_CODE.clear,
          caption: "Clear — release root pointer to empty the tree.",
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
          title: "Height Matters: Balanced vs Skewed Trees",
          text: "It is a common misconception that BST operations are always O(log n). The run time of search, insert, and delete is proportional to tree height h. In a balanced tree, h = O(log n). However, inserting sorted elements (e.g. 10, 20, 30, 40) degrades the tree into a linear chain (skewed tree) where h = O(n), giving O(n) search time.",
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
              "Dynamic size: can grow and shrink with individual allocations.",
              "No balance guarantee: un-rebalanced BST can degrade into a linked list of height O(n).",
            ],
            [
              "In-order traversal yields items in sorted order in O(n) time.",
              "Pointers require extra memory overhead (two pointers per node).",
            ],
            [
              "Efficient O(log n) average-case search, insertion, and deletion.",
              "Lack of cache locality compared to contiguous arrays or vectors.",
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
          text: "Use a BST when you need dynamic sets with frequent insertions, deletions, and searches, especially when sorted order or range queries are required.",
        },
        {
          type: "paragraph",
          text: "Avoid a basic BST when data is inserted in pre-sorted order without self-balancing (prefer AVL or Red-Black trees like `std::set`), or when exact fast lookups are needed without ordering (prefer hash tables like `std::unordered_map`).",
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
            "Forgetting to update the parent pointer or return the modified root after deletion or insertion.",
            "Assuming every BST operation is O(log n) regardless of insertion order.",
            "Incorrect deletion when a node has two children: forgetting to remove the successor from its original position.",
            "Allowing duplicate keys without defining consistent handling (e.g., placing duplicates strictly on one side or rejecting them).",
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
            "**AVL Tree:** A self-balancing BST where heights of sibling subtrees differ by at most 1.",
            "**Red-Black Tree:** A self-balancing BST using color bits to guarantee O(log n) worst-case height (used in C++ `std::map`).",
            "**B-Tree / B+ Tree:** Multi-way balanced trees optimized for disk systems and relational databases.",
            "**Trie:** Prefix tree designed specifically for string search and autocomplete.",
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
            "The BST invariant (left < node < right) enables efficient binary-search-style pruning on dynamic trees.",
            "Tree height h determines runtime: O(log n) when balanced, O(n) when skewed.",
            "In-order traversal of any valid BST visits values in strictly increasing order.",
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
      title: "Binary Search Tree Data Structure",
      channel: "YouTube search results",
      url: "https://www.youtube.com/results?search_query=binary+search+tree+data+structure+mycodeschool",
      query: "binary search tree data structure mycodeschool",
      isSearchLink: true,
    },
    {
      title: "BST insertion and deletion in C++",
      channel: "YouTube search results",
      url: "https://www.youtube.com/results?search_query=binary+search+tree+insertion+deletion+c%2B%2B",
      query: "binary search tree insertion deletion c++",
      isSearchLink: true,
    },
    {
      title: "Binary Tree Traversals (Inorder, Preorder, Postorder)",
      channel: "YouTube search results",
      url: "https://www.youtube.com/results?search_query=binary+tree+traversals+inorder+preorder+postorder",
      query: "binary tree traversals inorder preorder postorder",
      isSearchLink: true,
    },
  ],

  practice: [
    {
      title: "Search in a Binary Search Tree",
      platform: "LeetCode",
      note: "Standard BST search: compare and branch down left or right.",
    },
    {
      title: "Insert into a Binary Search Tree",
      platform: "LeetCode",
      note: "Locate the insertion spot and attach the new leaf node.",
    },
    {
      title: "Delete Node in a BST",
      platform: "LeetCode",
      note: "Implement leaf deletion, single-child bypass, and 2-child successor replacement.",
    },
  ],
};

export default theory;
