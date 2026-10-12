// Singly linked list. State is a plain array of values (head = index 0).
// The list persists between runs and every step carries an immutable `data`
// snapshot plus `currIndex` / `prevIndex` pointer positions.

export const LL_OPERATIONS = [
  "insert-head",
  "insert-tail",
  "insert-index",
  "delete-value",
  "delete-head",
  "search",
  "traverse",
];

const STRUCT = `struct Node {
    int data;
    Node* next;
};`;

export const LL_CODE = {
  "insert-head": `${STRUCT}

void insertHead(Node*& head, int x) {
    Node* node = new Node(x);
    node->next = head;
    head = node;
}`,
  "insert-tail": `${STRUCT}

void insertTail(Node*& head, int x) {
    Node* node = new Node(x);
    if (head == nullptr) {
        head = node;
        return;
    }
    Node* curr = head;
    while (curr->next != nullptr) {
        curr = curr->next;
    }
    curr->next = node;
}`,
  "insert-index": `${STRUCT}

void insertAt(Node*& head, int i, int x) {
    if (i < 0) {
        return;
    }
    Node* node = new Node(x);
    if (i == 0) {
        node->next = head;
        head = node;
        return;
    }
    Node* curr = head;
    for (int k = 0; k < i - 1; k++) {
        if (curr == nullptr) {
            return;
        }
        curr = curr->next;
    }
    node->next = curr->next;
    curr->next = node;
}`,
  "delete-value": `${STRUCT}

void deleteValue(Node*& head, int x) {
    if (head == nullptr) {
        return;
    }
    if (head->data == x) {
        Node* temp = head;
        head = head->next;
        delete temp;
        return;
    }
    Node* prev = head;
    Node* curr = head->next;
    while (curr != nullptr) {
        if (curr->data == x) {
            prev->next = curr->next;
            delete curr;
            return;
        }
        prev = curr;
        curr = curr->next;
    }
}`,
  "delete-head": `${STRUCT}

void deleteHead(Node*& head) {
    if (head == nullptr) {
        return;
    }
    Node* temp = head;
    head = head->next;
    delete temp;
}`,
  search: `${STRUCT}

Node* search(Node* head, int x) {
    Node* curr = head;
    while (curr != nullptr) {
        if (curr->data == x) {
            return curr;
        }
        curr = curr->next;
    }
    return nullptr;
}`,
  traverse: `${STRUCT}

void traverse(Node* head) {
    Node* curr = head;
    while (curr != nullptr) {
        visit(curr->data);
        curr = curr->next;
    }
}`,
};

// Line numbers are 1-based within each snippet above (struct = lines 1-4).
export const LINES = {
  "insert-head": { FUNC: 6, NEW_NODE: 7, WIRE_NEXT: 8, UPDATE_HEAD: 9 },
  "insert-tail": {
    FUNC: 6,
    NEW_NODE: 7,
    CHECK_EMPTY: 8,
    UPDATE_HEAD: 9,
    LOOP: 13,
    ADVANCE: 14,
    WIRE_NEXT: 16,
  },
  "insert-index": {
    FUNC: 6,
    CHECK_BOUNDS: 7,
    NEW_NODE: 10,
    CHECK_HEAD: 11,
    WIRE_NEXT: 12,
    UPDATE_HEAD: 13,
    LOOP: 17,
    CHECK_NULL: 18,
    ADVANCE: 21,
    WIRE_NEW: 23,
    WIRE_PREV: 24,
  },
  "delete-value": {
    FUNC: 6,
    CHECK_EMPTY: 7,
    CHECK_HEAD: 10,
    HEAD_NEXT: 12,
    PREV_INIT: 16,
    CURR_INIT: 17,
    LOOP: 18,
    COMPARE: 19,
    BYPASS: 20,
  },
  "delete-head": { FUNC: 6, CHECK_EMPTY: 7, READ: 10, UPDATE_HEAD: 11, FREE: 12 },
  search: {
    FUNC: 6,
    INIT: 7,
    LOOP: 8,
    COMPARE: 9,
    RETURN_FOUND: 10,
    ADVANCE: 12,
    RETURN_NULL: 14,
  },
  traverse: { FUNC: 6, INIT: 7, LOOP: 8, VISIT: 9, ADVANCE: 10 },
};

// Pure step generator: linkedListOperation(data, { operation, value, index })
// -> steps[]. Error paths (empty list, bad index, value not found) produce a
// clear error-styled message and leave the list unchanged.
function linkedListOperation(data, params) {
  const { operation, value, index } = params;
  const steps = [];
  const list = [...data];
  let nodesVisited = 0;

  const snapshot = (fields) => ({
    data: [...list],
    currIndex: null,
    prevIndex: null,
    foundIndex: null,
    activeIndex: null,
    nodesVisited,
    error: false,
    ...fields,
  });

  const fail = (codeLine, message) => {
    steps.push(snapshot({ codeLine, error: true, message }));
    return steps;
  };

  // ---- visit helper: one step per node, curr moves along the list ----
  const visit = (k, codeLine, note) => {
    nodesVisited++;
    steps.push(
      snapshot({
        currIndex: k,
        prevIndex: k > 0 ? k - 1 : null,
        codeLine,
        message: `Visiting node ${k} (value ${list[k]})${note ? ` — ${note}` : "."}`,
      }),
    );
  };

  // ============================ INSERT AT HEAD ============================
  if (operation === "insert-head") {
    const L = LINES["insert-head"];

    steps.push(
      snapshot({
        codeLine: L.NEW_NODE,
        message: `Creating a new node with value ${value}.`,
      }),
    );

    const oldHead = list.length === 0 ? "null" : `node 0 (${list[0]})`;
    list.unshift(value);

    steps.push(
      snapshot({
        activeIndex: 0,
        codeLine: L.WIRE_NEXT,
        message: `Pointing the new node's next to ${oldHead}.`,
      }),
    );

    steps.push(
      snapshot({
        activeIndex: 0,
        codeLine: L.UPDATE_HEAD,
        message: `HEAD now points to the new node (index 0, value ${value}).`,
      }),
    );

    return steps;
  }

  // ============================ INSERT AT TAIL ============================
  if (operation === "insert-tail") {
    const L = LINES["insert-tail"];

    if (list.length === 0) {
      steps.push(
        snapshot({
          codeLine: L.NEW_NODE,
          message: `The list is empty — creating a new node with value ${value}.`,
        }),
      );

      list.push(value);

      steps.push(
        snapshot({
          activeIndex: 0,
          codeLine: L.UPDATE_HEAD,
          message: `Pointing the new node's next to null. HEAD now points to the new node.`,
        }),
      );

      return steps;
    }

    for (let k = 0; k < list.length; k++) {
      visit(k, k === 0 ? L.LOOP : L.ADVANCE, "moving curr forward");
    }

    steps.push(
      snapshot({
        currIndex: list.length - 1,
        prevIndex: list.length > 1 ? list.length - 2 : null,
        codeLine: L.NEW_NODE,
        message: `Reached the tail at node ${list.length - 1}. Creating a new node with value ${value}.`,
      }),
    );

    list.push(value);

    steps.push(
      snapshot({
        currIndex: list.length - 2,
        prevIndex: list.length > 2 ? list.length - 3 : null,
        activeIndex: list.length - 1,
        codeLine: L.WIRE_NEXT,
        message: `Pointing node ${list.length - 2}'s next to the new node (index ${list.length - 1}).`,
      }),
    );

    steps.push(
      snapshot({
        activeIndex: list.length - 1,
        codeLine: L.WIRE_NEXT,
        message: `The new node (value ${value}) is now the tail at index ${list.length - 1}.`,
      }),
    );

    return steps;
  }

  // ============================ INSERT AT INDEX ============================
  if (operation === "insert-index") {
    const L = LINES["insert-index"];

    if (index == null || index < 0 || index > list.length) {
      return fail(
        L.CHECK_BOUNDS,
        `Index ${index} is out of range for a list of length ${list.length}. No changes made.`,
      );
    }

    steps.push(
      snapshot({
        codeLine: L.NEW_NODE,
        message: `Creating a new node with value ${value} for index ${index}.`,
      }),
    );

    if (index === 0) {
      const oldHead = list.length === 0 ? "null" : `node 0 (${list[0]})`;
      list.unshift(value);

      steps.push(
        snapshot({
          activeIndex: 0,
          codeLine: L.WIRE_NEXT,
          message: `Pointing the new node's next to ${oldHead}.`,
        }),
      );

      steps.push(
        snapshot({
          activeIndex: 0,
          codeLine: L.UPDATE_HEAD,
          message: `HEAD now points to the new node (index 0, value ${value}).`,
        }),
      );

      return steps;
    }

    for (let k = 0; k < index - 1; k++) {
      visit(k, k === 0 ? L.LOOP : L.ADVANCE, "moving curr forward");
    }

    nodesVisited++;
    const prev = index - 1;
    const nextDesc =
      index === list.length ? "null" : `node ${index} (${list[index]})`;

    steps.push(
      snapshot({
        currIndex: prev,
        prevIndex: prev > 0 ? prev - 1 : null,
        activeIndex: null,
        codeLine: L.WIRE_NEW,
        message: `curr is at node ${prev}. Pointing the new node's next to ${nextDesc}.`,
      }),
    );

    list.splice(index, 0, value);

    steps.push(
      snapshot({
        currIndex: prev,
        activeIndex: index,
        codeLine: L.WIRE_PREV,
        message: `Updating node ${prev}'s next: the new node (value ${value}) is now at index ${index}.`,
      }),
    );

    return steps;
  }

  // ============================ DELETE BY VALUE ============================
  if (operation === "delete-value") {
    const L = LINES["delete-value"];

    if (list.length === 0) {
      return fail(L.CHECK_EMPTY, "The list is empty. Nothing to delete.");
    }

    for (let k = 0; k < list.length; k++) {
      nodesVisited++;
      steps.push(
        snapshot({
          currIndex: k,
          prevIndex: k > 0 ? k - 1 : null,
          codeLine: k === 0 ? L.CHECK_HEAD : L.COMPARE,
          message:
            k === 0
              ? `Checking the head node (value ${list[k]}) against ${value}.`
              : `Comparing node ${k} (value ${list[k]}) with ${value}.`,
        }),
      );

      if (list[k] === value) {
        steps.push(
          snapshot({
            currIndex: k,
            prevIndex: k > 0 ? k - 1 : null,
            foundIndex: k,
            codeLine: k === 0 ? L.CHECK_HEAD : L.COMPARE,
            message: `Found ${value} at index ${k}.`,
          }),
        );

        list.splice(k, 1);

        steps.push(
          snapshot({
            codeLine: k === 0 ? L.HEAD_NEXT : L.BYPASS,
            message:
              k === 0
                ? list.length === 0
                  ? `Deleting the head. The list is now empty.`
                  : `Deleting the head. HEAD now points to node 0 (${list[0]}).`
                : k === list.length
                  ? `Deleting the last node. Node ${k - 1} (${list[k - 1]}) is now the tail.`
                  : `Bypassing node ${k}: node ${k - 1} now points to node ${k} (${list[k]}).`,
          }),
        );

        return steps;
      }
    }

    return fail(
      L.LOOP,
      `Value ${value} not found in the list. No changes made.`,
    );
  }

  // ============================ DELETE AT HEAD ============================
  if (operation === "delete-head") {
    const L = LINES["delete-head"];

    if (list.length === 0) {
      return fail(L.CHECK_EMPTY, "The list is empty. Nothing to delete.");
    }

    nodesVisited++;
    const head = list[0];

    steps.push(
      snapshot({
        currIndex: 0,
        codeLine: L.READ,
        message: `Removing the head node (value ${head})...`,
      }),
    );

    list.shift();

    steps.push(
      snapshot({
        codeLine: L.UPDATE_HEAD,
        message:
          list.length === 0
            ? `Deleted ${head}. The list is now empty.`
            : `Deleted ${head}. HEAD now points to node 0 (${list[0]}).`,
      }),
    );

    return steps;
  }

  // ============================ SEARCH ============================
  if (operation === "search") {
    const L = LINES.search;

    if (list.length === 0) {
      return fail(L.LOOP, "The list is empty. Nothing to search.");
    }

    for (let k = 0; k < list.length; k++) {
      nodesVisited++;
      steps.push(
        snapshot({
          currIndex: k,
          prevIndex: k > 0 ? k - 1 : null,
          codeLine: L.COMPARE,
          message: `Comparing node ${k} (value ${list[k]}) with ${value}.`,
        }),
      );

      if (list[k] === value) {
        steps.push(
          snapshot({
            currIndex: k,
            prevIndex: k > 0 ? k - 1 : null,
            foundIndex: k,
            codeLine: L.RETURN_FOUND,
            message: `Found ${value} at index ${k}.`,
          }),
        );

        return steps;
      }
    }

    return fail(L.RETURN_NULL, `Value ${value} not found in the list.`);
  }

  // ============================ TRAVERSE ============================
  if (operation === "traverse") {
    const L = LINES.traverse;

    if (list.length === 0) {
      return fail(L.LOOP, "The list is empty. Nothing to traverse.");
    }

    for (let k = 0; k < list.length; k++) {
      nodesVisited++;
      steps.push(
        snapshot({
          currIndex: k,
          prevIndex: k > 0 ? k - 1 : null,
          codeLine: L.VISIT,
          message: `Visiting node ${k} (value ${list[k]}).`,
        }),
      );
    }

    steps.push(
      snapshot({
        codeLine: L.LOOP,
        message: `Traversed ${list.length} node${list.length === 1 ? "" : "s"}: ${list.join(" -> ")} -> null.`,
      }),
    );

    return steps;
  }

  steps.push(
    snapshot({ codeLine: 1, error: true, message: `Unknown operation "${operation}".` }),
  );

  return steps;
}

export default linkedListOperation;
