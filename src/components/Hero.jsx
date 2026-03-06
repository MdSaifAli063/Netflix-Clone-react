import React, { useState, useEffect, useRef } from "react";
import HeroButton from "./HeroButton";

const API_KEY = "87dfa1c669eea853da609d4968d294be";
const IMG_ORIGINAL = "https://image.tmdb.org/t/p/original";

export default function Hero({ onMoreInfo }) {
  const [featured, setFeatured] = useState([]);
  const [idx, setIdx] = useState(0);
  const timerRef = useRef(null);

  // Fetch trending items for hero carousel
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        const items = (data.results || [])
          .filter((x) => x.backdrop_path)
          .slice(0, 6);
        setFeatured(items);
      })
      .catch(console.error);
  }, []);

  // Auto-cycle hero every 8 seconds
  useEffect(() => {
    if (!featured.length) return;
    timerRef.current = setInterval(() => {
      setIdx((i) => (i + 1) % featured.length);
    }, 8000);
    return () => clearInterval(timerRef.current);
  }, [featured.length]);

  function goTo(i) {
    setIdx(i);
    clearInterval(timerRef.current);
  }

  const item = featured[idx];

  if (!item) {
    return <div className="Hero" style={{ background: "#000" }} />;
  }

  const title = item.name || item.title || "Untitled";
  const backdrop = `${IMG_ORIGINAL}${item.backdrop_path}`;
  const year = (item.release_date || item.first_air_date || "").slice(0, 4);
  const score = item.vote_average
    ? Math.round(item.vote_average * 10)
    : null;

  return (
    <div className="Hero">
      {/* Background image */}
      <div
        className="bg"
        style={{ backgroundImage: `url(${backdrop})` }}
      />

      {/* Gradient overlays */}
      <div className="vignette" />

      {/* Main content */}
      <div className="content">
        <div className="badge">Series • Trending</div>

        <h1>{title}</h1>

        <div className="meta">
          {score && <span className="match">{score}% Match</span>}
          {year && <span>{year}</span>}
          <span className="rating-badge">TV-MA</span>
        </div>

        <p>{item.overview}</p>

        <div className="button-wrapper">
          <HeroButton primary={true} text="Play" icon="▶" />
          <HeroButton
            primary={false}
            text="More Info"
            icon="ⓘ"
            onClick={() => onMoreInfo && onMoreInfo(item)}
          />
        </div>
      </div>

      {/* Maturity rating */}
      <div className="maturity">
        <span className="maturity-rating">TV-MA</span>
      </div>

      {/* Dot navigation */}
      {featured.length > 1 && (
        <div className="dots">
          {featured.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === idx ? "active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}