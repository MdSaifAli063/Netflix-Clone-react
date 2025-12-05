import React, { useState } from "react";

export default function Navigation() {
  const items = ["Browse", "My list", "Top picks", "Recent"];
  const [active, setActive] = useState(0);

  return (
    <div id="navigation" className="Navigation">
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
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActive(i);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-pressed={active === i}
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
