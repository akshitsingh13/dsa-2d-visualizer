import { useEffect, useRef, useState } from "react";
import "./TheoryModal.css";
import TheoryContent from "./TheoryContent";
import { categoryTitle } from "../../theory/index";

function focusableIn(container) {
  return [...container.querySelectorAll(
    'a[href], button:not([disabled]), select, input, [tabindex]:not([tabindex="-1"])',
  )].filter(
    (element) => element.offsetParent !== null || element === document.activeElement,
  );
}

function TheoryModal({ theory, categoryTheory, onClose }) {
  const dialogRef = useRef(null);
  const scrollerRef = useRef(null);
  const tocEntries = [
    ...(categoryTheory
      ? [
          {
            id: "about",
            title: `About ${categoryTitle(theory.category)}`,
          },
        ]
      : []),
    ...theory.sections,
  ];
  const [activeSection, setActiveSection] = useState(
    tocEntries[0]?.id ?? null,
  );

  // Move focus into the dialog on open and lock body scroll. Steps and the
  // current index are untouched — closing returns the user to the same run.
  useEffect(() => {
    dialogRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Scroll-spy: highlight the TOC entry for the section being read.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || typeof IntersectionObserver === "undefined") return;

    const sections = [...scroller.querySelectorAll(".theory-section")];
    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace("theory-section-", "");
            setActiveSection(id);
          }
        }
      },
      { root: scroller, rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleBackdropMouseDown = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleDialogKeyDown = (event) => {
    if (event.key === "Escape") {
      onClose();
      return;
    }

    // Trap Tab inside the dialog.
    if (event.key !== "Tab" || !dialogRef.current) return;

    const focusable = focusableIn(dialogRef.current);
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const scrollToSection = (sectionId) => (event) => {
    event.preventDefault();

    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document
      .getElementById(`theory-section-${sectionId}`)
      ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });

    setActiveSection(sectionId);
  };

  return (
    <div className="theory-backdrop" onMouseDown={handleBackdropMouseDown}>
      <div
        ref={dialogRef}
        className="theory-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="theory-title"
        tabIndex={-1}
        onKeyDown={handleDialogKeyDown}
      >
        <header className="theory-header">
          <div className="theory-heading">
            <p className="theory-chip">{categoryTitle(theory.category)}</p>
            <h1 id="theory-title">{theory.title}</h1>
          </div>

          <div className="theory-header-actions">
            <button
              type="button"
              className="theory-back-button"
              onClick={onClose}
            >
              Back to visualizer
            </button>

            <button
              type="button"
              className="theory-close-button"
              onClick={onClose}
              aria-label="Close theory and return to visualizer"
            >
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M3 3L13 13M13 3L3 13"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </header>

        <nav className="theory-toc" aria-label="Theory contents">
          <ul>
            {tocEntries.map((entry) => (
              <li key={entry.id}>
                <a
                  href={`#theory-section-${entry.id}`}
                  onClick={scrollToSection(entry.id)}
                  className={activeSection === entry.id ? "active" : ""}
                  aria-current={activeSection === entry.id ? "true" : undefined}
                >
                  {entry.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div ref={scrollerRef} className="theory-body">
          <TheoryContent theory={theory} categoryTheory={categoryTheory} />
        </div>
      </div>
    </div>
  );
}

export default TheoryModal;
