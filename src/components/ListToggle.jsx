import React, { useState } from "react";

const ListToggle = () => {
  const [toggled, setToggled] = useState(false);

  return (
    <div
      className={`ListToggle ${toggled ? "active" : ""}`}
      onClick={() => setToggled(!toggled)}
      data-toggled={toggled}
    >
      <div>
        {toggled ? "✔" : "+"}
      </div>
    </div>
  );
};

export default ListToggle;
