import React, { useState } from "react";

export default function Navigation() {
  const items = ["Home", "TV Shows", "Movies", "New & Popular", "My List", "Browse by Languages"];
  const [active, setActive] = useState(0);

  return (
    <div className="Navigation">
      <nav aria-label="Main navigation">
        <ul>
          {items.map((label, i) => (
            <li key={label}>
              <a
                href="#"
                className={`nav-link ${active === i ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActive(i);
                }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}