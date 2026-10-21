import "./TheoryContent.css";
import BlockRenderer from "./blocks/BlockRenderer";
import TheoryTable from "./blocks/TheoryTable";
import TheoryList from "./blocks/TheoryList";
import Resources from "./Resources";
import { categoryTitle } from "../../theory/index";

function AboutCategory({ categoryTheory }) {
  return (
    <section
      id="theory-section-about"
      className="theory-section"
      aria-labelledby="theory-heading-about"
    >
      <h2 id="theory-heading-about">
        About {categoryTitle(categoryTheory.id)}
      </h2>

      <details className="theory-details" open>
        <summary className="theory-details-summary">
          What is {categoryTheory.title.toLowerCase()}?
        </summary>

        <div className="theory-details-body">
          <p>{categoryTheory.summary}</p>

          {(categoryTheory.body || []).map((block, index) => (
            <BlockRenderer key={index} block={block} />
          ))}

          {categoryTheory.comparison ? (
            <TheoryTable block={categoryTheory.comparison} />
          ) : null}

          <h3>Learning path</h3>
          <TheoryList
            block={{ type: "list", ordered: true, items: categoryTheory.learningPath }}
          />
        </div>
      </details>
    </section>
  );
}

function TheoryContent({ theory, categoryTheory }) {
  return (
    <div className="theory-content">
      <p className="theory-summary">{theory.summary}</p>

      {categoryTheory ? <AboutCategory categoryTheory={categoryTheory} /> : null}

      {theory.sections.map((section) => (
        <section
          key={section.id}
          id={`theory-section-${section.id}`}
          className="theory-section"
          aria-labelledby={`theory-heading-${section.id}`}
        >
          <h2 id={`theory-heading-${section.id}`}>{section.title}</h2>

          {section.id === "resources" ? (
            <Resources videos={theory.videos} practice={theory.practice} />
          ) : (
            section.blocks.map((block, index) => (
              <BlockRenderer key={index} block={block} theoryId={theory.id} />
            ))
          )}
        </section>
      ))}
    </div>
  );
}

export default TheoryContent;
