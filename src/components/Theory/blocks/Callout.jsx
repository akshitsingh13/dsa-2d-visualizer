import { renderRichText } from "./RichText";
import "./Callout.css";

const TONE_LABELS = {
  tip: "Tip",
  warning: "Warning",
  note: "Note",
};

function Callout({ block }) {
  const label = TONE_LABELS[block.tone] || TONE_LABELS.note;

  return (
    <aside className={`theory-callout tone-${block.tone || "note"}`}>
      <p className="theory-callout-title">
        {block.title ? `${label}: ${block.title}` : label}
      </p>

      <p className="theory-callout-text">{renderRichText(block.text)}</p>
    </aside>
  );
}

export default Callout;
