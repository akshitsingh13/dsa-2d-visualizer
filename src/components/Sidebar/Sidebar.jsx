import "./Sidebar.css";
import algorithmRegistry from "../../algorithms/algorithmRegistry";

function Sidebar({ dsaConcept, setDsaConcept }) {
  const algorithms = Object.entries(algorithmRegistry);

  const searchingAlgorithms = algorithms.filter(
    ([, config]) => config.category === "searching",
  );

  const sortingAlgorithms = algorithms.filter(
    ([, config]) => config.category === "sorting",
  );

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h3>Searching</h3>

        {searchingAlgorithms.map(([id, config]) => (
          <button
            key={id}
            className={dsaConcept === id ? "active" : ""}
            onClick={() => setDsaConcept(id)}
          >
            {config.name}
          </button>
        ))}
      </div>

      <div className="sidebar-section">
        <h3>Sorting</h3>

        {sortingAlgorithms.map(([id, config]) => (
          <button
            key={id}
            className={dsaConcept === id ? "active" : ""}
            onClick={() => setDsaConcept(id)}
          >
            {config.name}
          </button>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
