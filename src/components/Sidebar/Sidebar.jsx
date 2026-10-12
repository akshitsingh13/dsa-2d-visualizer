import "./Sidebar.css";
import algorithmRegistry from "../../algorithms/algorithmRegistry";

// Display labels for registry categories. Sections are built from the
// categories actually present in the registry — a heading is never rendered
// for a category that has no items.
const CATEGORY_TITLES = {
  searching: "Searching",
  sorting: "Sorting",
  "data-structures": "Data Structures",
};

const CATEGORY_ORDER = ["searching", "sorting", "data-structures"];

function Sidebar({ dsaConcept, setDsaConcept }) {
  const groups = {};

  for (const [id, config] of Object.entries(algorithmRegistry)) {
    const category = config.category || "other";

    if (!groups[category]) {
      groups[category] = [];
    }

    groups[category].push([id, config]);
  }

  const categories = [
    ...CATEGORY_ORDER.filter((category) => groups[category]),
    ...Object.keys(groups).filter((category) => !CATEGORY_ORDER.includes(category)),
  ];

  return (
    <aside className="sidebar">
      {categories.map((category) => (
        <div className="sidebar-section" key={category}>
          <h3>{CATEGORY_TITLES[category] || category}</h3>

          {groups[category].map(([id, config]) => (
            <button
              key={id}
              className={dsaConcept === id ? "active" : ""}
              onClick={() => setDsaConcept(id)}
            >
              {config.name}
            </button>
          ))}
        </div>
      ))}
    </aside>
  );
}

export default Sidebar;
