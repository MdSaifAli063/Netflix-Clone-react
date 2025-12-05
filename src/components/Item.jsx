import React from "react";
import ListToggle from "./ListToggle";

const Item = ({ title = "Untitled", score = "N/A", overview = "", backdrop = "" }) => {
  // fallback placeholder when no backdrop provided
  const placeholder = "https://via.placeholder.com/600x340?text=No+Image";
  const bg = backdrop && backdrop.trim() ? backdrop : placeholder;

  return (
    <div
      className="Item"
      role="article"
      aria-label={title}
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="overlay">
        <div className="title">{title}</div>
        <div className="rating">{score} / 10</div>
        <div className="plot">{overview || "No description available."}</div>
        <ListToggle />
      </div>
    </div>
  );
};

export default Item;
