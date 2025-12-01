import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TitleList from "./components/TitleList";
import ListToggle from "./components/ListToggle";
import Item from "./components/Item";


export default function App() {
  const apiKey = "87dfa1c669eea853da609d4968d294be";
  const [data, setData] = useState([]);

  const performSearch = async (e) => {
    e.preventDefault();

    // Get input value directly
    const val = e.target.querySelector("input").value;
    if (!val.trim()) return;

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
      <ListToggle />
      <Item/>

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
        url="genre/27/movies?sort_by=popularity.desc&page=1"
      />
      <TitleList
        title="Sci-Fi greats"
        url="genre/878/movies?sort_by=popularity.desc&page=1"
      />
      <TitleList
        title="Comedy magic"
        url="genre/35/movies?sort_by=popularity.desc&page=1"
      />
    </div>
  );
}
