// Binary Search Tree (BST) operations.
//
// A BST node is represented as an object:
//   { id: number, value: number, left: Node|null, right: Node|null }
//
// Pure helper functions clone the tree immutably for each snapshot step.

export const BST_OPERATIONS = [
  "insert",
  "search",
  "delete",
  "inorder",
  "preorder",
  "postorder",
  "clear",
];

const STRUCT = `struct Node {
    int data;
    Node* left;
    Node* right;
    Node(int val) : data(val), left(nullptr), right(nullptr) {}
};`;

export const BST_CODE = {
  insert: `${STRUCT}

Node* insert(Node* root, int val) {
    if (root == nullptr) {
        return new Node(val);
    }
    if (val < root->data) {
        root->left = insert(root->left, val);
    } else if (val > root->data) {
        root->right = insert(root->right, val);
    }
    return root; // duplicate values ignored
}`,

  search: `${STRUCT}

Node* search(Node* root, int val) {
    if (root == nullptr || root->data == val) {
        return root;
    }
    if (val < root->data) {
        return search(root->left, val);
    }
    return search(root->right, val);
}`,

  delete: `${STRUCT}

Node* findMin(Node* node) {
    while (node && node->left != nullptr)
        node = node->left;
    return node;
}

Node* deleteNode(Node* root, int val) {
    if (root == nullptr) return nullptr;
    if (val < root->data) {
        root->left = deleteNode(root->left, val);
    } else if (val > root->data) {
        root->right = deleteNode(root->right, val);
    } else {
        if (root->left == nullptr) {
            Node* temp = root->right;
            delete root;
            return temp;
        } else if (root->right == nullptr) {
            Node* temp = root->left;
            delete root;
            return temp;
        }
        Node* temp = findMin(root->right);
        root->data = temp->data;
        root->right = deleteNode(root->right, temp->data);
    }
    return root;
}`,

  inorder: `void inorder(Node* root) {
    if (root == nullptr) return;
    inorder(root->left);
    visit(root->data);
    inorder(root->right);
}`,

  preorder: `void preorder(Node* root) {
    if (root == nullptr) return;
    visit(root->data);
    preorder(root->left);
    preorder(root->right);
}`,

  postorder: `void postorder(Node* root) {
    if (root == nullptr) return;
    postorder(root->left);
    postorder(root->right);
    visit(root->data);
}`,

  clear: `void clear(Node*& root) {
    root = nullptr;
}`,
};

export const LINES = {
  insert: {
    FUNC: 3,
    CHECK_NULL: 4,
    CREATE: 5,
    CHECK_LEFT: 7,
    GO_LEFT: 8,
    CHECK_RIGHT: 9,
    GO_RIGHT: 10,
    RETURN: 12,
  },
  search: {
    FUNC: 3,
    CHECK_FOUND: 4,
    RETURN_FOUND: 5,
    CHECK_LEFT: 7,
    GO_LEFT: 8,
    GO_RIGHT: 10,
  },
  delete: {
    FIND_MIN: 3,
    FUNC: 10,
    CHECK_NULL: 11,
    CHECK_LEFT: 12,
    GO_LEFT: 13,
    CHECK_RIGHT: 14,
    GO_RIGHT: 15,
    LEAF_OR_RIGHT: 17,
    LEAF_OR_LEFT: 21,
    FIND_SUCCESSOR: 26,
    COPY_DATA: 27,
    DELETE_SUCCESSOR: 28,
    RETURN: 30,
  },
  inorder: {
    FUNC: 1,
    CHECK_NULL: 2,
    RECURSE_LEFT: 3,
    VISIT: 4,
    RECURSE_RIGHT: 5,
  },
  preorder: {
    FUNC: 1,
    CHECK_NULL: 2,
    VISIT: 3,
    RECURSE_LEFT: 4,
    RECURSE_RIGHT: 5,
  },
  postorder: {
    FUNC: 1,
    CHECK_NULL: 2,
    RECURSE_LEFT: 3,
    RECURSE_RIGHT: 4,
    VISIT: 5,
  },
  clear: {
    FUNC: 1,
    RESET: 2,
  },
};

// Deep clone a BST node tree
export function cloneTree(node) {
  if (!node) return null;
  return {
    id: node.id,
    value: node.value,
    left: cloneTree(node.left),
    right: cloneTree(node.right),
  };
}

// Convert a tree to an in-order array of values
export function treeToInorder(root) {
  const result = [];
  function traverse(n) {
    if (!n) return;
    traverse(n.left);
    result.push(n.value);
    traverse(n.right);
  }
  traverse(root);
  return result;
}

// Count total nodes in tree
export function countNodes(root) {
  if (!root) return 0;
  return 1 + countNodes(root.left) + countNodes(root.right);
}

// Helper to generate next unique node id
let nextNodeId = 1;
export function createNode(value) {
  return {
    id: nextNodeId++,
    value,
    left: null,
    right: null,
  };
}

// Pure step generator for BST operations.
// Parameters:
//   data: root node of tree (or null)
//   params: { operation, value }
//   prevCount: cumulative operations counter
export default function bstOperation(data, params, prevCount = 0) {
  void prevCount;
  const { operation, value } = params;
  const steps = [];
  let root = cloneTree(data);
  let comparisons = 0;
  let nodesVisited = 0;

  const snapshot = (fields) => ({
    data: cloneTree(root),
    activeNodeId: null,
    comparingNodeId: null,
    foundNodeId: null,
    traversalOrder: [],
    comparisons,
    nodesVisited,
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
    root = null;
    steps.push(
      snapshot({
        codeLine: L.RESET,
        message: "Cleared all nodes from the Binary Search Tree.",
      }),
    );
    return steps;
  }

  // ============================ INSERT ============================
  if (operation === "insert") {
    const L = LINES.insert;

    if (root === null) {
      const newNode = createNode(value);
      root = newNode;
      steps.push(
        snapshot({
          activeNodeId: newNode.id,
          codeLine: L.CREATE,
          message: `Tree is empty. Created root node with value ${value}.`,
        }),
      );
      return steps;
    }

    let curr = root;
    let parent = null;
    let direction = null;

    while (curr !== null) {
      nodesVisited++;
      comparisons++;

      steps.push(
        snapshot({
          activeNodeId: curr.id,
          comparingNodeId: curr.id,
          codeLine: L.CHECK_LEFT,
          message: `Comparing insert value ${value} with current node ${curr.value}.`,
        }),
      );

      if (value === curr.value) {
        return fail(
          L.RETURN,
          `Duplicate value: ${value} already exists in the BST. BSTs do not allow duplicates.`,
        );
      }

      if (value < curr.value) {
        steps.push(
          snapshot({
            activeNodeId: curr.id,
            codeLine: L.GO_LEFT,
            message: `${value} < ${curr.value}, branching to the left subtree.`,
          }),
        );
        parent = curr;
        direction = "left";
        curr = curr.left;
      } else {
        comparisons++;
        steps.push(
          snapshot({
            activeNodeId: curr.id,
            codeLine: L.GO_RIGHT,
            message: `${value} > ${curr.value}, branching to the right subtree.`,
          }),
        );
        parent = curr;
        direction = "right";
        curr = curr.right;
      }
    }

    // Insert new node under parent
    const newNode = createNode(value);
    if (direction === "left") {
      parent.left = newNode;
    } else {
      parent.right = newNode;
    }

    steps.push(
      snapshot({
        activeNodeId: newNode.id,
        codeLine: L.CREATE,
        message: `Inserted new node ${value} as the ${direction} child of ${parent.value}.`,
      }),
    );

    return steps;
  }

  // ============================ SEARCH ============================
  if (operation === "search") {
    const L = LINES.search;

    if (root === null) {
      return fail(L.CHECK_FOUND, `Tree is empty. Cannot search for ${value}.`);
    }

    let curr = root;
    while (curr !== null) {
      nodesVisited++;
      comparisons++;

      steps.push(
        snapshot({
          activeNodeId: curr.id,
          comparingNodeId: curr.id,
          codeLine: L.CHECK_FOUND,
          message: `Comparing target ${value} with node ${curr.value}.`,
        }),
      );

      if (curr.value === value) {
        steps.push(
          snapshot({
            activeNodeId: curr.id,
            foundNodeId: curr.id,
            codeLine: L.RETURN_FOUND,
            message: `Found target ${value} in the BST!`,
          }),
        );
        return steps;
      }

      if (value < curr.value) {
        steps.push(
          snapshot({
            activeNodeId: curr.id,
            codeLine: L.GO_LEFT,
            message: `${value} < ${curr.value}, moving left.`,
          }),
        );
        curr = curr.left;
      } else {
        steps.push(
          snapshot({
            activeNodeId: curr.id,
            codeLine: L.GO_RIGHT,
            message: `${value} > ${curr.value}, moving right.`,
          }),
        );
        curr = curr.right;
      }
    }

    return fail(
      L.CHECK_FOUND,
      `Value ${value} was not found in the Binary Search Tree.`,
    );
  }

  // ============================ DELETION ============================
  if (operation === "delete") {
    const L = LINES.delete;

    if (root === null) {
      return fail(L.CHECK_NULL, `Tree is empty. Cannot delete ${value}.`);
    }

    // First search for the node and keep track of parent
    let curr = root;
    let parent = null;
    let direction = null;

    while (curr !== null && curr.value !== value) {
      nodesVisited++;
      comparisons++;

      steps.push(
        snapshot({
          activeNodeId: curr.id,
          comparingNodeId: curr.id,
          codeLine: L.CHECK_LEFT,
          message: `Searching for ${value} to delete. Currently at node ${curr.value}.`,
        }),
      );

      parent = curr;
      if (value < curr.value) {
        direction = "left";
        curr = curr.left;
      } else {
        direction = "right";
        curr = curr.right;
      }
    }

    if (curr === null) {
      return fail(
        L.CHECK_NULL,
        `Node with value ${value} not found in the BST. Nothing deleted.`,
      );
    }

    // Found node to delete
    nodesVisited++;
    steps.push(
      snapshot({
        activeNodeId: curr.id,
        foundNodeId: curr.id,
        codeLine: L.CHECK_LEFT,
        message: `Located node ${value} for deletion.`,
      }),
    );

    // Case 1: Leaf node (no children)
    if (curr.left === null && curr.right === null) {
      steps.push(
        snapshot({
          activeNodeId: curr.id,
          codeLine: L.LEAF_OR_RIGHT,
          message: `Node ${value} is a leaf node (0 children). Removing reference.`,
        }),
      );

      if (parent === null) {
        root = null;
      } else if (direction === "left") {
        parent.left = null;
      } else {
        parent.right = null;
      }

      steps.push(
        snapshot({
          codeLine: L.RETURN,
          message: `Successfully deleted leaf node ${value}.`,
        }),
      );
      return steps;
    }

    // Case 2: One child (only right child)
    if (curr.left === null) {
      steps.push(
        snapshot({
          activeNodeId: curr.id,
          codeLine: L.LEAF_OR_RIGHT,
          message: `Node ${value} has only a right child (${curr.right.value}). Replacing with right child.`,
        }),
      );

      if (parent === null) {
        root = curr.right;
      } else if (direction === "left") {
        parent.left = curr.right;
      } else {
        parent.right = curr.right;
      }

      steps.push(
        snapshot({
          codeLine: L.RETURN,
          message: `Successfully deleted node ${value}.`,
        }),
      );
      return steps;
    }

    // Case 2b: One child (only left child)
    if (curr.right === null) {
      steps.push(
        snapshot({
          activeNodeId: curr.id,
          codeLine: L.LEAF_OR_LEFT,
          message: `Node ${value} has only a left child (${curr.left.value}). Replacing with left child.`,
        }),
      );

      if (parent === null) {
        root = curr.left;
      } else if (direction === "left") {
        parent.left = curr.left;
      } else {
        parent.right = curr.left;
      }

      steps.push(
        snapshot({
          codeLine: L.RETURN,
          message: `Successfully deleted node ${value}.`,
        }),
      );
      return steps;
    }

    // Case 3: Two children
    // Find in-order successor (minimum in right subtree)
    steps.push(
      snapshot({
        activeNodeId: curr.id,
        codeLine: L.FIND_SUCCESSOR,
        message: `Node ${value} has two children. Finding in-order successor (minimum value in right subtree).`,
      }),
    );

    let succParent = curr;
    let succ = curr.right;
    while (succ.left !== null) {
      nodesVisited++;
      steps.push(
        snapshot({
          activeNodeId: succ.id,
          codeLine: L.FIND_MIN,
          message: `Moving left to find minimum in right subtree (currently at ${succ.value}).`,
        }),
      );
      succParent = succ;
      succ = succ.left;
    }

    steps.push(
      snapshot({
        activeNodeId: succ.id,
        foundNodeId: succ.id,
        codeLine: L.COPY_DATA,
        message: `In-order successor found: ${succ.value}. Replacing value of ${value} with ${succ.value}.`,
      }),
    );

    // Replace curr's value with successor's value
    curr.value = succ.value;

    steps.push(
      snapshot({
        activeNodeId: curr.id,
        codeLine: L.DELETE_SUCCESSOR,
        message: `Value updated to ${succ.value}. Now removing the duplicate successor node from right subtree.`,
      }),
    );

    // Remove the successor node (successor cannot have a left child)
    if (succParent === curr) {
      succParent.right = succ.right;
    } else {
      succParent.left = succ.right;
    }

    steps.push(
      snapshot({
        activeNodeId: curr.id,
        codeLine: L.RETURN,
        message: `Successfully deleted node and preserved BST properties.`,
      }),
    );

    return steps;
  }

  // ============================ TRAVERSALS ============================
  if (
    operation === "inorder" ||
    operation === "preorder" ||
    operation === "postorder"
  ) {
    const L = LINES[operation];
    const traversalOrder = [];

    if (root === null) {
      return fail(L.CHECK_NULL, "Tree is empty. Nothing to traverse.");
    }

    function traverseInorder(node) {
      if (!node) return;
      nodesVisited++;
      steps.push(
        snapshot({
          activeNodeId: node.id,
          traversalOrder: [...traversalOrder],
          codeLine: L.RECURSE_LEFT,
          message: `Recursing left subtree of node ${node.value}.`,
        }),
      );
      traverseInorder(node.left);

      traversalOrder.push(node.value);
      steps.push(
        snapshot({
          activeNodeId: node.id,
          traversalOrder: [...traversalOrder],
          codeLine: L.VISIT,
          message: `Visited node ${node.value}. Current traversal: [${traversalOrder.join(", ")}].`,
        }),
      );

      steps.push(
        snapshot({
          activeNodeId: node.id,
          traversalOrder: [...traversalOrder],
          codeLine: L.RECURSE_RIGHT,
          message: `Recursing right subtree of node ${node.value}.`,
        }),
      );
      traverseInorder(node.right);
    }

    function traversePreorder(node) {
      if (!node) return;
      nodesVisited++;
      traversalOrder.push(node.value);
      steps.push(
        snapshot({
          activeNodeId: node.id,
          traversalOrder: [...traversalOrder],
          codeLine: L.VISIT,
          message: `Visited node ${node.value}. Current traversal: [${traversalOrder.join(", ")}].`,
        }),
      );

      steps.push(
        snapshot({
          activeNodeId: node.id,
          traversalOrder: [...traversalOrder],
          codeLine: L.RECURSE_LEFT,
          message: `Recursing left subtree of node ${node.value}.`,
        }),
      );
      traversePreorder(node.left);

      steps.push(
        snapshot({
          activeNodeId: node.id,
          traversalOrder: [...traversalOrder],
          codeLine: L.RECURSE_RIGHT,
          message: `Recursing right subtree of node ${node.value}.`,
        }),
      );
      traversePreorder(node.right);
    }

    function traversePostorder(node) {
      if (!node) return;
      nodesVisited++;
      steps.push(
        snapshot({
          activeNodeId: node.id,
          traversalOrder: [...traversalOrder],
          codeLine: L.RECURSE_LEFT,
          message: `Recursing left subtree of node ${node.value}.`,
        }),
      );
      traversePostorder(node.left);

      steps.push(
        snapshot({
          activeNodeId: node.id,
          traversalOrder: [...traversalOrder],
          codeLine: L.RECURSE_RIGHT,
          message: `Recursing right subtree of node ${node.value}.`,
        }),
      );
      traversePostorder(node.right);

      traversalOrder.push(node.value);
      steps.push(
        snapshot({
          activeNodeId: node.id,
          traversalOrder: [...traversalOrder],
          codeLine: L.VISIT,
          message: `Visited node ${node.value}. Current traversal: [${traversalOrder.join(", ")}].`,
        }),
      );
    }

    if (operation === "inorder") {
      traverseInorder(root);
    } else if (operation === "preorder") {
      traversePreorder(root);
    } else {
      traversePostorder(root);
    }

    steps.push(
      snapshot({
        traversalOrder: [...traversalOrder],
        codeLine: L.FUNC,
        message: `${operation.toUpperCase()} traversal complete: [${traversalOrder.join(", ")}].`,
      }),
    );

    return steps;
  }

  return steps;
}
