import React from "react";
import "./Sidebar.css";

const Sidebar = ({ dsaConcept, setDsaConcept }) => {
  return (
    <div className="sideBarMenu">
      <div className="searchingMenu">
        <span>Searching</span>
        <button
          onClick={() => {
            setDsaConcept("LS");
            console.log(dsaConcept);
          }}
        >
          Linear Search
        </button>
        <button
          onClick={() => {
            setDsaConcept("BS");
            console.log(dsaConcept);
          }}
        >
          Binary Search
        </button>
      </div>
      <div className="sortingMenu">
        <span>Sorting</span>
        <button>Bubble Sort</button>
        <button>Selection Sort</button>
        <button>Insertion Sort</button>
        <button>Merge Sort</button>
        <button>Quick Sort</button>
      </div>
    </div>
  );
};

export default Sidebar;
