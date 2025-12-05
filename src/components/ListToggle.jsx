import React, { useState } from "react";

const ListToggle = () => {
  const [toggled, setToggled] = useState(false);

  return (
    <div
      className={`ListToggle ${toggled ? "active" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        setToggled(!toggled);
      }}
      role="button"
      aria-pressed={toggled}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setToggled(!toggled);
        }
      }}
      data-toggled={toggled}
    >
      <div>
        <i aria-hidden="true">+</i>
        <i aria-hidden="true">✔</i>
      </div>
    </div>
  );
};

export default ListToggle;
