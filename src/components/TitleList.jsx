import React, { useEffect, useState } from "react";
import Item from "./Item";

export default function TitleList({ url, title }) {
  const apiKey = "87dfa1c669eea853da609d4968d294be";
  const [data, setData] = useState([]);
  const [mounted, setMounted] = useState(false);

  const loadContent = async () => {
    const requestUrl =
      "https://api.themoviedb.org/3/" + url + "&api_key=" + apiKey;

    try {
      const res = await fetch(requestUrl);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Failed to load list:", err);
    }
  };

  useEffect(() => {
    loadContent();
    setMounted(true);
    return () => setMounted(false);
  }, [url]);

  const titles = data.results
    ? data.results.slice(0, 5).map((title) => {
        const backDrop =
          "http://image.tmdb.org/t/p/original" + title.backdrop_path;

        const name = title.name || title.original_title;

        return (
          <Item
            key={title.id}
            title={name}
            score={title.vote_average}
            overview={title.overview}
            backdrop={backDrop}
          />
        );
      })
    : "";

  return (
    <div className="TitleList" data-loaded={mounted}>
      <div className="Title">
        <h1>{title}</h1>
        <div className="titles-wrapper">{titles}</div>
      </div>
    </div>
  );
}
