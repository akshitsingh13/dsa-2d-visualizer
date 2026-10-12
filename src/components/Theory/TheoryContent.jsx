import "./TheoryContent.css";

// Renders the theory body: summary plus one <section> per entry.
// Full block rendering (paragraphs, lists, code, tables, callouts, traces)
// lands in Phase 2; section scaffolding and ids are fixed here so the TOC
// and scroll-spy already work end to end.
function TheoryContent({ theory }) {
  return (
    <div className="theory-content">
      <p className="theory-summary">{theory.summary}</p>

      {theory.sections.map((section) => (
        <section
          key={section.id}
          id={`theory-section-${section.id}`}
          className="theory-section"
          aria-labelledby={`theory-heading-${section.id}`}
        >
          <h2 id={`theory-heading-${section.id}`}>{section.title}</h2>
        </section>
      ))}
    </div>
  );
}

export default TheoryContent;
