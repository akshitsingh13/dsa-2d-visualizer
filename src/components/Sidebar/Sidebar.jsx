import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sideBarMenu">
      <div className="searchingMenu">
        Searching
        <button>Linear Search</button>
        <button>Binary Search</button>
      </div>
      <div className="sortingMenu">
        Sorting
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
