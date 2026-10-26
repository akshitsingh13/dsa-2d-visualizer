// Shared constants for step snapshots.
//
// Every algorithm is a PURE function that returns an array of immutable step
// snapshots. The UI only replays those steps. Each step must have:
//   - a snapshot of the data structure state (copied, never mutated later)
//   - highlighted element(s) / per-element state
//   - `codeLine`: the 1-based line highlighted in the CodePanel
//   - `message`: a human-readable description shown under the visualizer
//   - live counters (e.g. `comparisons`, `swaps`, `operations`, `nodesVisited`)

// Per-element visual states. Every visualizer maps these to CSS classes.
export const ELEMENT_STATE = {
  DEFAULT: "default",
  CURRENT: "current",
  FOUND: "found",
  ELIMINATED: "eliminated",
  SWAPPING: "swapping",
  SORTED: "sorted",
};

// Counter keys used in step objects -> human-readable labels shown in the
// ComplexityCounter panel. The set of counters shown per algorithm comes
// from the registry entry (`counters: [...]`).
export const COUNTER_LABELS = {
  comparisons: "Comparisons",
  swaps: "Swaps",
  operations: "Operations",
  nodesVisited: "Nodes visited",
  edgesExplored: "Edges explored",
};

export function counterLabel(key) {
  return COUNTER_LABELS[key] || key;
}
