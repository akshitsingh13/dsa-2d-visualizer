import "./PointerLabels.css";

// A single pointer tag (e.g. "L" / "M" / "H" for binary search,
// "curr" / "prev" for the linked list). Shared by every visualizer that
// shows pointers under its elements.
export function PointerLabel({ label, tone = "muted" }) {
  return <span className={`pointer-label tone-${tone}`}>{label}</span>;
}

// Row of pointer cells aligned with the element boxes above them.
// `pointers` is [{ index, label, tone }]; labels sharing an index are
// stacked vertically instead of overlapping. `cellWidth` must match the
// rendered element width (including borders) so columns stay aligned.
function PointerLabels({ pointers = [], length = 0, cellWidth }) {
  const byIndex = {};

  for (const pointer of pointers) {
    if (pointer == null || pointer.index == null) continue;

    if (!byIndex[pointer.index]) {
      byIndex[pointer.index] = [];
    }

    byIndex[pointer.index].push(pointer);
  }

  return (
    <div className="pointer-row" aria-hidden="true">
      {Array.from({ length }, (_, index) => (
        <div
          key={index}
          className="pointer-cell"
          style={cellWidth ? { width: cellWidth } : undefined}
        >
          {(byIndex[index] || []).map((pointer, position) => (
            <PointerLabel
              key={position}
              label={pointer.label}
              tone={pointer.tone || "muted"}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default PointerLabels;
