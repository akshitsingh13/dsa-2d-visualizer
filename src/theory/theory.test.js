import { createElement as h } from "react";
import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import algorithmRegistry from "../algorithms/algorithmRegistry";
import { BINARY_SEARCH_CODE } from "../algorithms/binarySearch";
import { BUBBLE_SORT_CODE } from "../algorithms/bubbleSort";
import { STACK_CODE } from "../algorithms/stackOps";
import { QUEUE_CODE } from "../algorithms/queueOps";
import { LL_CODE } from "../algorithms/linkedList";
import {
  BLOCK_TYPES,
  REQUIRED_SECTION_IDS,
  getCategoryTheory,
  getTheory,
} from "./index";
import categories from "./categories";
import { resolveComplexity } from "../components/Visualizer/complexityHelpers";
import { renderRichText } from "../components/Theory/blocks/RichText";
import ComplexityTable from "../components/Theory/blocks/ComplexityTable";
import TheoryButton from "../components/Theory/TheoryButton";
import TheoryModal from "../components/Theory/TheoryModal";

const THEORY_IDS = ["LS", "BS", "BUB", "STK", "QUE", "LL"];
const CATEGORIES = ["searching", "sorting", "data-structures"];

function collectBlocks(theory, type) {
  const found = [];
  const walk = (blocks) => {
    for (const block of blocks || []) {
      if (block.type === type) found.push(block);
    }
  };
  for (const section of theory.sections) walk(section.blocks);
  return found;
}

function blockText(block) {
  switch (block.type) {
    case "paragraph":
      return [block.text];
    case "list":
      return block.items;
    case "code":
      return [block.code, block.caption || ""];
    case "table":
      return [...block.headers, ...block.rows.flat()];
    case "callout":
      return [block.title || "", block.text];
    case "trace":
      return [
        block.title || "",
        ...block.steps.flatMap((step) => [
          step.explanation,
          ...step.cells.map((cell) => String(cell.value)),
        ]),
      ];
    default:
      return [];
  }
}

describe("theory registry parity", () => {
  it("covers every registry id and vice versa", () => {
    expect(Object.keys(algorithmRegistry).sort()).toEqual([...THEORY_IDS].sort());

    for (const id of THEORY_IDS) {
      const theory = getTheory(id);
      expect(theory, id).not.toBe(null);
      expect(theory.id).toBe(id);
      expect(theory.title).toBe(algorithmRegistry[id].name);
      expect(theory.category).toBe(algorithmRegistry[id].category);
    }

    expect(getTheory("NOPE")).toBe(null);
  });

  it("has an intro for every category", () => {
    for (const category of CATEGORIES) {
      const intro = getCategoryTheory(category);
      expect(intro, category).not.toBe(null);
      expect(intro.summary.length).toBeGreaterThan(20);
      expect(intro.body.length).toBeGreaterThan(0);
      expect(intro.comparison.rows.length).toBeGreaterThan(0);
      expect(intro.learningPath.length).toBeGreaterThan(0);
    }

    expect(Object.keys(categories).sort()).toEqual([...CATEGORIES].sort());
    expect(getCategoryTheory("nope")).toBe(null);
  });
});

describe("theory content shape", () => {
  it("has all required sections with non-empty text", () => {
    for (const id of THEORY_IDS) {
      const theory = getTheory(id);

      expect(theory.summary.length, `${id} summary`).toBeGreaterThan(20);
      expect(
        theory.sections.map((section) => section.id),
        `${id} sections`,
      ).toEqual(REQUIRED_SECTION_IDS);

      for (const section of theory.sections) {
        expect(section.title.length, `${id}/${section.id}`).toBeGreaterThan(0);
      }

      // Every text-bearing block must be non-empty.
      for (const section of theory.sections) {
        for (const block of section.blocks) {
          expect(BLOCK_TYPES, `${id}/${section.id}`).toContain(block.type);

          for (const text of blockText(block)) {
            expect(String(text).trim().length, `${id}/${section.id}/${block.type}`).toBeGreaterThan(0);
          }
        }
      }

      // Exactly one registry-driven complexity table per concept.
      expect(collectBlocks(theory, "complexityTable").length, id).toBe(1);
    }
  });

  it("uses valid tones and complete trace steps", () => {
    for (const id of THEORY_IDS) {
      const theory = getTheory(id);

      for (const block of collectBlocks(theory, "callout")) {
        expect(["tip", "warning", "note"], id).toContain(block.tone);
      }

      for (const block of collectBlocks(theory, "trace")) {
        expect(block.steps.length, `${id} trace`).toBeGreaterThan(1);

        for (const step of block.steps) {
          expect(step.explanation.trim().length, `${id} trace`).toBeGreaterThan(0);

          for (const cell of step.cells) {
            expect(["default", "current", "found", "eliminated", "sorted"], id).toContain(cell.tone || "default");
          }

          for (const pointer of step.pointers || []) {
            expect(typeof pointer.label, id).toBe("string");
          }
        }
      }
    }
  });

  it("has non-empty videos and URL-free practice entries", () => {
    for (const id of THEORY_IDS) {
      const theory = getTheory(id);

      expect(theory.videos.length, `${id} videos`).toBeGreaterThanOrEqual(3);
      expect(theory.practice.length, `${id} practice`).toBeGreaterThanOrEqual(2);

      for (const video of theory.videos) {
        expect(video.url.startsWith("https://www.youtube.com/"), `${id} ${video.url}`).toBe(true);

        if (video.isSearchLink) {
          expect(video.url.includes("/results?search_query="), id).toBe(true);
          expect(video.query.length, id).toBeGreaterThan(0);
        } else {
          expect(video.url.includes("/watch?v="), id).toBe(true);
          expect(video.channel.length, id).toBeGreaterThan(0);
        }
      }

      for (const problem of theory.practice) {
        expect(problem.title.length, id).toBeGreaterThan(0);
        expect(problem.platform.length, id).toBeGreaterThan(0);
        expect(
          `${problem.title} ${problem.platform} ${problem.note || ""}`.includes("http"),
          `${id} practice must be plain text`,
        ).toBe(false);
      }
    }
  });
});

describe("theory matches the visualizer", () => {
  it("renders the registry complexity numbers", () => {
    for (const id of THEORY_IDS) {
      const html = renderToString(h(ComplexityTable, { theoryId: id }));
      const complexity = algorithmRegistry[id].complexity;
      const operations = Array.isArray(algorithmRegistry[id].inputs?.operation)
        ? algorithmRegistry[id].inputs.operation
        : null;
      const isKeyed =
        complexity && typeof complexity === "object" && !complexity.best;

      const expected =
        isKeyed || (operations && complexity.best)
          ? (isKeyed ? Object.keys(complexity) : operations).flatMap((operation) => {
              const resolved = resolveComplexity(complexity, operation);
              return [resolved.best, resolved.average, resolved.worst, resolved.space];
            })
          : (() => {
              const resolved = resolveComplexity(complexity);
              return [resolved.best, resolved.average, resolved.worst, resolved.space];
            })();

      for (const value of new Set(expected)) {
        expect(html.includes(value), `${id} shows ${value}`).toBe(true);
      }
    }
  });

  it("shows the exact CodePanel code for every concept and operation", () => {
    const variants = {
      LS: [algorithmRegistry.LS.code],
      BS: [BINARY_SEARCH_CODE],
      BUB: [BUBBLE_SORT_CODE],
      STK: Object.values(STACK_CODE),
      QUE: Object.values(QUEUE_CODE),
      LL: Object.values(LL_CODE),
    };

    for (const id of THEORY_IDS) {
      const theory = getTheory(id);
      const shown = collectBlocks(theory, "code").map((block) => block.code);

      expect(shown.length, `${id} code blocks`).toBeGreaterThan(0);

      for (const code of shown) {
        expect(variants[id].includes(code), `${id} code matches CodePanel`).toBe(true);
      }

      for (const code of variants[id]) {
        expect(shown.includes(code), `${id} covers every snippet`).toBe(true);
      }
    }
  });
});

describe("inline text parser", () => {
  const render = (text) => renderToString(h("p", null, ...renderRichText(text)));

  it("handles **bold** and `code`", () => {
    expect(render("a **b** c")).toMatch(/a <strong>b<\/strong> c/);
    expect(render("a `b` c")).toMatch(/a <code>b<\/code> c/);
    expect(render("**a** and `b`")).toMatch(/<strong>a<\/strong> and <code>b<\/code>/);
  });

  it("leaves angle brackets and broken markers as plain text", () => {
    expect(render("a <div> b")).toMatch(/a &lt;div&gt; b/);
    expect(render("a ** b")).toMatch(/a \*\* b/);
    expect(render("a `b c")).toMatch(/a `b c/);
    expect(render("**")).toBe("<p>**</p>");
  });
});

describe("theory shell structure", () => {
  it("renders the modal with dialog semantics and full TOC", () => {
    const html = renderToString(
      h(TheoryModal, {
        theory: getTheory("LS"),
        categoryTheory: getCategoryTheory("searching"),
        onClose: () => {},
      }),
    );

    expect(html).toMatch(/role="dialog"/);
    expect(html).toMatch(/aria-modal="true"/);
    expect(html).toMatch(/aria-labelledby="theory-title"/);
    expect(html).toMatch(/Linear Search/);
    expect(html).toMatch(/About Searching/);
    expect(html).toMatch(/Back to visualizer/);

    const tocLinks = html.match(/theory-section-/g) || [];
    // 12 TOC anchors + 12 section ids.
    expect(tocLinks.length).toBe(24);
  });

  it("renders the button with label and concept name", () => {
    const html = renderToString(
      h(TheoryButton, { conceptName: "Stack", onClick: () => {} }),
    );

    expect(html).toMatch(/Read &amp; Learn More/);
    expect(html).toMatch(/aria-label="Read and learn more about Stack"/);
    expect(html).toMatch(/<svg/);
  });
});
