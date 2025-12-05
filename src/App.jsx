import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TitleList from "./components/TitleList";
import "./App.css"; // added to load styles

export default function App() {
  const apiKey = "87dfa1c669eea853da609d4968d294be";
  const [data, setData] = useState({}); // changed from [] to {}

  const performSearch = async (e) => {
    e.preventDefault();

    // Get input value directly
    const val = e.target.querySelector("input").value;
    if (!val || !val.trim()) return;

    const requestUrl =
      "https://api.themoviedb.org/3/search/multi?query=" +
      encodeURIComponent(val) +
      "&api_key=" +
      apiKey;

    try {
      const response = await fetch(requestUrl);
      const json = await response.json();
      setData(json);
      console.log("Search Results:", json);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  return (
    <div>
      <Header onSubmit={performSearch} />
      <Hero />

      {/* Render search results if available */}
      {data && data.results && data.results.length > 0 && (
        <div className="TitleList" data-loaded={true}>
          <div className="Title">
            <h1>Search results</h1>
            <div className="titles-wrapper">
              {data.results.slice(0, 5).map((t) => {
                const backDrop = t.backdrop_path
                  ? "https://image.tmdb.org/t/p/original" + t.backdrop_path
                  : "";
                const name = t.name || t.title || t.original_title || "Untitled";
                return (
                  <div key={t.id} style={{ width: "calc(20% - 10px)" }}>
                    <img
                      src={
                        backDrop ||
                        "https://via.placeholder.com/300x170?text=No+Image"
                      }
                      alt={name}
                      style={{ width: "100%", display: "block" }}
                    />
                    <div style={{ color: "#fff" }}>{name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <TitleList
        title="Top TV picks for Jack"
        url="discover/tv?sort_by=popularity.desc&page=1"
      />
      <TitleList
        title="Trending now"
        url="discover/movie?sort_by=popularity.desc&page=1"
      />
      <TitleList
        title="Most watched in Horror"
        url="discover/movie?with_genres=27&sort_by=popularity.desc&page=1"
      />
      <TitleList
        title="Sci-Fi greats"
        url="discover/movie?with_genres=878&sort_by=popularity.desc&page=1"
      />
      <TitleList
        title="Comedy magic"
        url="discover/movie?with_genres=35&sort_by=popularity.desc&page=1"
      />
    </div>
  );
}
