import React, { useState, useEffect } from "react";
import Item from "./Item";

const API_KEY = "87dfa1c669eea853da609d4968d294be";
const IMG_W500 = "https://image.tmdb.org/t/p/w500";

const VISIBLE = 5; // cards visible at once

export default function TitleList({ title, url, onOpen }) {
  const [items, setItems] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const sep = url.includes("?") ? "&" : "?";
    const requestUrl = `https://api.themoviedb.org/3/${url}${sep}api_key=${API_KEY}`;

    fetch(requestUrl)
      .then((res) => res.json())
      .then((json) => {
        setItems(json.results || []);
        setLoaded(true);
      })
      .catch((err) => {
        console.error("TitleList fetch error:", err);
        setLoaded(true);
      });
  }, [url]);

  const canPrev = offset > 0;
  const canNext = offset + VISIBLE < items.length;

  const visible = items.slice(offset, offset + VISIBLE);

  // Show skeletons while loading
  if (!loaded) {
    return (
      <div className="TitleList" data-loaded="false">
        <div className="Title">
          <div className="row-header">
            <span className="row-title">{title}</span>
          </div>
          <div className="slider-wrap">
            <div className="titles-wrapper">
              {[...Array(VISIBLE)].map((_, i) => (
                <div
                  key={i}
                  className="Item skeleton"
                  style={{ aspectRatio: "16/9" }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="TitleList" data-loaded="true">
      <div className="Title">
        <div className="row-header">
          <span className="row-title">{title}</span>
          <span className="row-explore">Explore All ›</span>
        </div>

        <div className="slider-wrap">
          {/* Prev button */}
          <button
            className={`slider-btn prev ${!canPrev ? "hidden" : ""}`}
            onClick={() => setOffset((o) => Math.max(0, o - VISIBLE))}
            aria-label="Previous"
          >
            ‹
          </button>

          {/* Cards */}
          <div className="titles-wrapper">
            {visible.map((t) => {
              const backdrop = t.backdrop_path
                ? `${IMG_W500}${t.backdrop_path}`
                : "";
              const name =
                t.name || t.title || t.original_title || "Untitled";

              return (
                <Item
                  key={t.id}
                  title={name}
                  score={t.vote_average}
                  overview={t.overview}
                  backdrop={backdrop}
                  onOpen={() => onOpen && onOpen(t)}
                />
              );
            })}
          </div>

          {/* Next button */}
          <button
            className={`slider-btn next ${!canNext ? "hidden" : ""}`}
            onClick={() =>
              setOffset((o) =>
                Math.min(items.length - VISIBLE, o + VISIBLE)
              )
            }
            aria-label="Next"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}