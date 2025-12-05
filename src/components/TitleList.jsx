import React, { useEffect, useState } from "react";
import Item from "./Item";

export default function TitleList({ url, title }) {
  const apiKey = "87dfa1c669eea853da609d4968d294be";
  const [data, setData] = useState({}); // changed from []
  const [mounted, setMounted] = useState(false);

  const loadContent = async () => {
    // Ensure api_key is appended safely whether url already has query params or not
    const separator = url.includes("?") ? "&" : "?";
    const requestUrl = `https://api.themoviedb.org/3/${url}${separator}api_key=${apiKey}`;

    try {
      const res = await fetch(requestUrl);
      const json = await res.json();
      setData(json || {});
    } catch (err) {
      console.error("Failed to load list:", err);
      setData({});
    }
  };

  useEffect(() => {
    loadContent();
    setMounted(true);
    return () => setMounted(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const titles = data.results
    ? data.results.slice(0, 5).map((t) => {
        const backDrop = t.backdrop_path
          ? "https://image.tmdb.org/t/p/original" + t.backdrop_path
          : "";

        const name = t.name || t.title || t.original_title || "Untitled";

        return (
          <Item
            key={t.id}
            title={name}
            score={t.vote_average}
            overview={t.overview}
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
