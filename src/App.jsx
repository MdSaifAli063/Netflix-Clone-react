import React, { useState, useCallback } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TitleList from "./components/TitleList";
import SearchResults from "./components/SearchResults";
import Modal from "./components/Modal";
import "./App.css";

const API_KEY = "87dfa1c669eea853da609d4968d294be";

// All content rows shown on the homepage
const ROWS = [
  { title: "Top Picks for You",        url: "trending/all/week" },
  { title: "Trending Now",             url: "trending/movie/day" },
  { title: "Netflix Originals",        url: "discover/tv?with_networks=213&sort_by=popularity.desc" },
  { title: "Popular on Netflix",       url: "discover/movie?sort_by=popularity.desc&page=1" },
  { title: "Most Watched in Horror",   url: "discover/movie?with_genres=27&sort_by=popularity.desc&page=1" },
  { title: "Sci-Fi Greats",            url: "discover/movie?with_genres=878&sort_by=popularity.desc&page=1" },
  { title: "Comedy Magic",             url: "discover/movie?with_genres=35&sort_by=popularity.desc&page=1" },
  { title: "Action & Adventure",       url: "discover/movie?with_genres=28&sort_by=popularity.desc&page=1" },
  { title: "Top Rated",                url: "movie/top_rated" },
];

export default function App() {
  const [searchResults, setSearchResults] = useState(null); // null = not searching
  const [modalItem, setModalItem]         = useState(null);

  // Called by Search component whenever query changes
  const handleSearch = useCallback(async (query) => {
    if (!query || !query.trim()) {
      setSearchResults(null);
      return;
    }

    const url = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
      query
    )}&api_key=${API_KEY}`;

    try {
      const res  = await fetch(url);
      const json = await res.json();
      // Only show results that have an image
      const filtered = (json.results || []).filter(
        (x) => x.backdrop_path || x.poster_path
      );
      setSearchResults(filtered);
    } catch (err) {
      console.error("Search error:", err);
    }
  }, []);

  return (
    <div>
      {/* Fixed top navigation */}
      <Header onSearch={handleSearch} />

      {searchResults ? (
        /* ── Search results view ── */
        <SearchResults results={searchResults} onOpen={setModalItem} />
      ) : (
        /* ── Normal home view ── */
        <>
          <Hero onMoreInfo={setModalItem} />

          {ROWS.map((row) => (
            <TitleList
              key={row.url}
              title={row.title}
              url={row.url}
              onOpen={setModalItem}
            />
          ))}
        </>
      )}

      {/* ── Footer ── */}
      <footer className="Footer">
        <div className="footer-logo">
          {/* Inline Netflix wordmark */}
          <svg viewBox="0 0 111 30" width="80" height="22" fill="none">
            <path d="M105.06 13.1059L111 30C109.06 29.72 107.13 29.39 105.2 29.01L101.4 18.69L97.59 28.38C95.74 28.01 93.88 27.69 92.03 27.41L97.96 13.01L92.38 0H97.73L101.25 9.67L104.87 0H110.22L105.06 13.1059Z" fill="#E50914"/>
            <path d="M85.82 0V26.56C87.68 26.74 89.53 26.94 91.39 27.16V0H85.82Z" fill="#E50914"/>
            <path d="M75.89 0V25.56C77.81 25.47 79.73 25.41 81.66 25.39V0H75.89Z" fill="#E50914"/>
            <path d="M62.5 0V5.5H70.27V11.08H62.5V25.37C64.43 25.34 66.35 25.32 68.28 25.32V30H56.93V0H62.5Z" fill="#E50914"/>
            <path d="M50.07 0V5.5H42.15V11.08H49.89V16.5H42.15V24.43H50.07V30H36.58V0H50.07Z" fill="#E50914"/>
            <path d="M30.42 0L24.76 20.3L19.06 0H13.51L13.56.05V30H19.13V9.66L24.77 29.97H30.37L36.02 9.63V30H41.59L41.54 0H30.42Z" fill="#E50914"/>
            <path d="M5.47 0H0V30C1.85 30 3.71 30.01 5.56 30.04V12.37L11.22 30.14C13.08 30.19 14.94 30.26 16.79 30.33V0H11.22V17.59L5.47 0Z" fill="#E50914"/>
          </svg>
        </div>

        <p className="footer-callout">Questions? Call 000-800-919-1694</p>

        <div className="Footer-links">
          <div className="col">
            <ul>
              <li>FAQ</li>
              <li>Investor Relations</li>
              <li>Privacy</li>
              <li>Speed Test</li>
            </ul>
          </div>
          <div className="col">
            <ul>
              <li>Help Center</li>
              <li>Jobs</li>
              <li>Cookie Preferences</li>
              <li>Legal Notices</li>
            </ul>
          </div>
          <div className="col">
            <ul>
              <li>Account</li>
              <li>Ways to Watch</li>
              <li>Corporate Information</li>
              <li>Only on Netflix</li>
            </ul>
          </div>
          <div className="col">
            <ul>
              <li>Media Center</li>
              <li>Terms of Use</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>

        <div className="Footer-bottom">
          <div className="language">
            <select defaultValue="en" aria-label="Language">
              <option value="en">🌐 English</option>
              <option value="hi">हिन्दी</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
          <div className="copyright">
            © {new Date().getFullYear()} Netflix Clone, Inc.
          </div>
        </div>
      </footer>

      {/* ── Detail Modal ── */}
      {modalItem && (
        <Modal item={modalItem} onClose={() => setModalItem(null)} />
      )}
    </div>
  );
}