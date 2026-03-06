import React from "react";
import ListToggle from "./ListToggle";

const PLACEHOLDER = "https://via.placeholder.com/400x225?text=No+Image";

export default function Item({ title = "Untitled", score, overview = "", backdrop = "", onOpen }) {
  const bg = backdrop && backdrop.trim() ? backdrop : PLACEHOLDER;
  const matchPct = score ? Math.round(score * 10) : null;

  return (
    <div
      className="Item"
      role="article"
      aria-label={title}
      onClick={() => onOpen && onOpen()}
    >
      {/* Thumbnail */}
      <img
        className="thumb"
        src={bg}
        alt={title}
        loading="lazy"
        onError={(e) => { e.target.src = PLACEHOLDER; }}
      />

      {/* Hover overlay — appears below the card */}
      <div className="overlay">
        {/* Action buttons */}
        <div className="actions">
          <button className="card-btn play" title="Play" onClick={(e) => e.stopPropagation()}>
            ▶
          </button>
          <ListToggle />
          <button className="card-btn" title="Thumbs up" onClick={(e) => e.stopPropagation()}>
            👍
          </button>
          <button
            className="card-btn more"
            title="More info"
            onClick={(e) => { e.stopPropagation(); onOpen && onOpen(); }}
          >
            ⌄
          </button>
        </div>

        {/* Title */}
        <div className="title">{title}</div>

        {/* Rating row */}
        <div className="rating">
          {matchPct && <span className="match">{matchPct}% Match</span>}
          <span className="hd-badge">HD</span>
        </div>

        {/* Plot */}
        {overview && <div className="plot">{overview}</div>}
      </div>
    </div>
  );
}