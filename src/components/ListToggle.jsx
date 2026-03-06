import React, { useState } from "react";

export default function ListToggle() {
  const [toggled, setToggled] = useState(false);

  return (
    <button
      className="ListToggle"
      onClick={(e) => {
        e.stopPropagation();
        setToggled((v) => !v);
      }}
      data-toggled={toggled}
      aria-pressed={toggled}
      title={toggled ? "Remove from My List" : "Add to My List"}
    >
      {toggled ? "✔" : "+"}
    </button>
  );
}