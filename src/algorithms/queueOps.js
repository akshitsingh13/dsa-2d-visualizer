// Array-based queue. State is a plain array with FRONT at index 0 and REAR
// at the last index. Like the stack, the queue persists between runs and
// every step carries an immutable `data` snapshot.

export const QUEUE_CAPACITY = 8;

export const QUEUE_CODE = {
  enqueue: `void enqueue(int x) {
    if (rear == MAX - 1) {
        // overflow
    }
    rear = rear + 1;
    arr[rear] = x;
}`,
  dequeue: `int dequeue() {
    if (front > rear) {
        // underflow
    }
    int x = arr[front];
    front = front + 1;
    return x;
}`,
  peek: `int peek() {
    if (front > rear) {
        // underflow
    }
    return arr[front];
}`,
  clear: `void clear() {
    front = 0;
    rear = -1;
}`,
};

export const LINES = {
  enqueue: { FUNC: 1, CHECK: 2, OVERFLOW: 3, REAR: 5, STORE: 6 },
  dequeue: { FUNC: 1, CHECK: 2, UNDERFLOW: 3, READ: 5, FRONT: 6, RETURN: 7 },
  peek: { FUNC: 1, CHECK: 2, UNDERFLOW: 3, RETURN: 5 },
  clear: { FUNC: 1, RESET_FRONT: 2, RESET_REAR: 3 },
};

/**
 * Pure step generator for Array-backed Queue operations.
 * State persists between runs: every generator call starts from current state
 * and returns immutable snapshot steps.
 *
 * Supported operations:
 *   - enqueue: appends value to rear (checks capacity limit) -> O(1) time, O(1) aux space
 *   - dequeue: removes and returns front value -> O(1) time, O(1) aux space
 *   - peek: reads front value without removal -> O(1) time, O(1) aux space
 *   - clear: resets front/rear indices -> O(1) time, O(1) aux space
 *
 * @param {number[]} data - Current queue items (FRONT at index 0, REAR at last).
 * @param {{ operation: 'enqueue'|'dequeue'|'peek'|'clear', value?: number }} params - Operation details.
 * @param {number} prevCount - Cumulative successful operations counter.
 * @returns {Array<object>} Sequence of immutable step snapshots for animation.
 */
function queueOperation(data, params, prevCount = 0) {
  const { operation, value } = params;
  const steps = [];
  const queue = [...data];

  const snapshot = (fields) => ({
    data: [...queue],
    highlightIndex: null,
    highlight: null,
    operations: prevCount + 1,
    error: false,
    ...fields,
  });

  if (operation === "enqueue") {
    if (queue.length >= QUEUE_CAPACITY) {
      steps.push(
        snapshot({
          operations: prevCount,
          error: true,
          codeLine: LINES.enqueue.OVERFLOW,
          message: `Queue overflow! Cannot enqueue ${value} — the queue is full (${queue.length}/${QUEUE_CAPACITY}).`,
        }),
      );

      return steps;
    }

    const index = queue.length;

    steps.push(
      snapshot({
        codeLine: LINES.enqueue.REAR,
        message: `Enqueueing ${value}: REAR moves to index ${index}.`,
      }),
    );

    queue.push(value);

    steps.push(
      snapshot({
        highlightIndex: index,
        highlight: "current",
        codeLine: LINES.enqueue.STORE,
        message: `Stored ${value} at index ${index}. ${value} is now at the rear of the queue.`,
      }),
    );

    return steps;
  }

  if (operation === "dequeue") {
    if (queue.length === 0) {
      steps.push(
        snapshot({
          operations: prevCount,
          error: true,
          codeLine: LINES.dequeue.UNDERFLOW,
          message: "Queue underflow! Cannot dequeue — the queue is empty.",
        }),
      );

      return steps;
    }

    const front = queue[0];

    steps.push(
      snapshot({
        highlightIndex: 0,
        highlight: "current",
        codeLine: LINES.dequeue.READ,
        message: `Dequeuing: reading front value ${front} at index 0.`,
      }),
    );

    queue.shift();

    steps.push(
      snapshot({
        codeLine: LINES.dequeue.FRONT,
        message:
          queue.length === 0
            ? `Dequeued ${front}. The queue is now empty.`
            : `Dequeued ${front}. Remaining elements shift left — new FRONT = ${queue[0]}.`,
      }),
    );

    return steps;
  }

  if (operation === "peek") {
    if (queue.length === 0) {
      steps.push(
        snapshot({
          operations: prevCount,
          error: true,
          codeLine: LINES.peek.UNDERFLOW,
          message: "Queue underflow! Cannot peek — the queue is empty.",
        }),
      );

      return steps;
    }

    steps.push(
      snapshot({
        highlightIndex: 0,
        highlight: "found",
        codeLine: LINES.peek.RETURN,
        message: `Peek: the front of the queue is ${queue[0]}. The queue is unchanged.`,
      }),
    );

    return steps;
  }

  if (operation === "clear") {
    if (queue.length === 0) {
      steps.push(
        snapshot({
          codeLine: LINES.clear.FUNC,
          message: "The queue is already empty.",
        }),
      );

      return steps;
    }

    const count = queue.length;
    queue.length = 0;

    steps.push(
      snapshot({
        codeLine: LINES.clear.RESET_REAR,
        message: `Cleared ${count} element${count === 1 ? "" : "s"}. The queue is now empty.`,
      }),
    );

    return steps;
  }

  steps.push(
    snapshot({
      operations: prevCount,
      error: true,
      codeLine: 1,
      message: `Unknown operation "${operation}".`,
    }),
  );

  return steps;
}

export default queueOperation;
