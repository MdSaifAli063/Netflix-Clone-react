import React, { useEffect } from "react";
import HeroButton from "./HeroButton";
import ListToggle from "./ListToggle";

const IMG_ORIGINAL = "https://image.tmdb.org/t/p/original";

export default function Modal({ item, onClose }) {
  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!item) return null;

  const title = item.name || item.title || "Untitled";
  const backdrop = item.backdrop_path
    ? `${IMG_ORIGINAL}${item.backdrop_path}`
    : null;
  const year = (item.release_date || item.first_air_date || "").slice(0, 4);
  const score = item.vote_average
    ? Math.round(item.vote_average * 10)
    : null;

  return (
    <div
      className="Modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="Modal" onClick={(e) => e.stopPropagation()}>

        {/* Close button */}
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Hero section */}
        <div className="modal-hero">
          {backdrop ? (
            <img src={backdrop} alt={title} />
          ) : (
            <div style={{ width: "100%", height: "100%", background: "#222" }} />
          )}
          <div className="modal-hero-overlay" />
          <div className="modal-hero-content">
            <h2 className="modal-title">{title}</h2>
            <div className="modal-btns">
              <HeroButton primary={true} text="Play" icon="▶" />
              <HeroButton primary={false} text="My List" icon="+" />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Left: details */}
          <div className="modal-left">
            <div className="modal-meta-row">
              {score && (
                <span className="modal-match">{score}% Match</span>
              )}
              {year && <span className="modal-year">{year}</span>}
              <span className="modal-hd">HD</span>
            </div>
            <p className="modal-overview">
              {item.overview || "No description available."}
            </p>
          </div>

          {/* Right: meta */}
          <div className="modal-right">
            {item.vote_average && (
              <div>
                <strong style={{ color: "#fff" }}>Rating: </strong>
                {item.vote_average.toFixed(1)} / 10
              </div>
            )}
            {item.original_language && (
              <div>
                <strong style={{ color: "#fff" }}>Language: </strong>
                {item.original_language.toUpperCase()}
              </div>
            )}
            {item.popularity && (
              <div>
                <strong style={{ color: "#fff" }}>Popularity: </strong>
                {Math.round(item.popularity)}
              </div>
            )}
            {item.media_type && (
              <div>
                <strong style={{ color: "#fff" }}>Type: </strong>
                {item.media_type === "tv" ? "TV Show" : "Movie"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}