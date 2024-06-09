import React from "react";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div>
        <ul className="sidebar-links">
          <li>
            <a href="/" className="sidebar-link">
              Home
            </a>
          </li>
          <li>
            <a href="/" className="sidebar-link">
              About
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
