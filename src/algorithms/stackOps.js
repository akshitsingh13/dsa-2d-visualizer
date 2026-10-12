// Array-based stack. State is a plain array (bottom -> top, top = last).
// The stack persists between runs: every generator call starts from the
// current state and each step carries an immutable `data` snapshot.

export const STACK_CAPACITY = 8;

export const STACK_CODE = {
  push: `void push(int x) {
    if (top == MAX - 1) {
        // overflow
    }
    top = top + 1;
    arr[top] = x;
}`,
  pop: `int pop() {
    if (top == -1) {
        // underflow
    }
    int x = arr[top];
    top = top - 1;
    return x;
}`,
  peek: `int peek() {
    if (top == -1) {
        // underflow
    }
    return arr[top];
}`,
  clear: `void clear() {
    top = -1;
}`,
};

export const LINES = {
  push: { FUNC: 1, CHECK: 2, OVERFLOW: 3, TOP: 5, STORE: 6 },
  pop: { FUNC: 1, CHECK: 2, UNDERFLOW: 3, READ: 5, TOP: 6, RETURN: 7 },
  peek: { FUNC: 1, CHECK: 2, UNDERFLOW: 3, RETURN: 5 },
  clear: { FUNC: 1, RESET: 2 },
};

// Pure step generator: stackOperation(data, { operation, value }, prevCount)
// -> steps[]. `prevCount` is the number of successful operations so far; the
// run counts as one more operation unless it fails (overflow / underflow),
// in which case the state is left unchanged.
function stackOperation(data, params, prevCount = 0) {
  const { operation, value } = params;
  const steps = [];
  const stack = [...data];

  const snapshot = (fields) => ({
    data: [...stack],
    highlightIndex: null,
    highlight: null,
    operations: prevCount + 1,
    error: false,
    ...fields,
  });

  if (operation === "push") {
    if (stack.length >= STACK_CAPACITY) {
      steps.push(
        snapshot({
          operations: prevCount,
          error: true,
          codeLine: LINES.push.OVERFLOW,
          message: `Stack overflow! Cannot push ${value} — the stack is full (${stack.length}/${STACK_CAPACITY}).`,
        }),
      );

      return steps;
    }

    const index = stack.length;

    steps.push(
      snapshot({
        codeLine: LINES.push.TOP,
        message: `Pushing ${value}: TOP moves to index ${index}.`,
      }),
    );

    stack.push(value);

    steps.push(
      snapshot({
        highlightIndex: index,
        highlight: "current",
        codeLine: LINES.push.STORE,
        message: `Stored ${value} at index ${index}. ${value} is now on top of the stack.`,
      }),
    );

    return steps;
  }

  if (operation === "pop") {
    if (stack.length === 0) {
      steps.push(
        snapshot({
          operations: prevCount,
          error: true,
          codeLine: LINES.pop.UNDERFLOW,
          message: "Stack underflow! Cannot pop — the stack is empty.",
        }),
      );

      return steps;
    }

    const index = stack.length - 1;
    const top = stack[index];

    steps.push(
      snapshot({
        highlightIndex: index,
        highlight: "current",
        codeLine: LINES.pop.READ,
        message: `Popping: reading top value ${top} at index ${index}.`,
      }),
    );

    stack.pop();

    steps.push(
      snapshot({
        codeLine: LINES.pop.TOP,
        message:
          stack.length === 0
            ? `Popped ${top}. The stack is now empty.`
            : `Popped ${top}. New TOP = ${stack.length - 1} (${stack[stack.length - 1]}).`,
      }),
    );

    return steps;
  }

  if (operation === "peek") {
    if (stack.length === 0) {
      steps.push(
        snapshot({
          operations: prevCount,
          error: true,
          codeLine: LINES.peek.UNDERFLOW,
          message: "Stack underflow! Cannot peek — the stack is empty.",
        }),
      );

      return steps;
    }

    const index = stack.length - 1;

    steps.push(
      snapshot({
        highlightIndex: index,
        highlight: "found",
        codeLine: LINES.peek.RETURN,
        message: `Peek: the top of the stack is ${stack[index]}. The stack is unchanged.`,
      }),
    );

    return steps;
  }

  if (operation === "clear") {
    if (stack.length === 0) {
      steps.push(
        snapshot({
          codeLine: LINES.clear.FUNC,
          message: "The stack is already empty.",
        }),
      );

      return steps;
    }

    const count = stack.length;
    stack.length = 0;

    steps.push(
      snapshot({
        codeLine: LINES.clear.RESET,
        message: `Cleared ${count} element${count === 1 ? "" : "s"}. The stack is now empty.`,
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

export default stackOperation;
