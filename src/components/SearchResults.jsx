import React from "react";

const IMG_W500 = "https://image.tmdb.org/t/p/w500";

export default function SearchResults({ results, onOpen }) {
  if (!results || results.length === 0) {
    return (
      <div className="SearchResults">
        <h2>No results found</h2>
      </div>
    );
  }

  return (
    <div className="SearchResults">
      <h2>Search Results</h2>
      <div className="grid">
        {results.map((item) => {
          const title = item.name || item.title || "Untitled";
          const backdrop = item.backdrop_path
            ? `${IMG_W500}${item.backdrop_path}`
            : item.poster_path
            ? `${IMG_W500}${item.poster_path}`
            : null;

          return (
            <div
              key={item.id}
              className="search-card"
              onClick={() => onOpen && onOpen(item)}
              role="button"
              tabIndex={0}
              aria-label={title}
              onKeyDown={(e) => {
                if (e.key === "Enter") onOpen && onOpen(item);
              }}
            >
              {backdrop ? (
                <img src={backdrop} alt={title} loading="lazy" />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "#2a2a2a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    color: "#666",
                    padding: 8,
                    textAlign: "center",
                  }}
                >
                  {title}
                </div>
              )}
              <span className="label">{title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}