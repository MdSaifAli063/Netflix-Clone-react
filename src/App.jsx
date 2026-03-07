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
          <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-3.1 0 298.2 79.8"
        width="80"
        height="22"
        style={{ display: "block" }}
        aria-label="Netflix"
        role="img"
      >
        <g transform="translate(-384.28572,-428.81172)">
          <g transform="matrix(2.5445375,0,0,2.5445375,1157.1714,-1457.8678)">
            <path
              fill="#E50914"
              d="m -203.09972,771.41415 c 1.6425,0.15875 3.2825,0.33 4.92,0.5075 l 3.615,-8.92625 3.43625,9.74875 c 1.76375,0.22125 3.525,0.4525 5.2825,0.695 l -6.02375,-17.09625 6.02625,-14.88 -5.10375,0 -0.0525,0.0725 -3.255,8.03875 -2.8575,-8.11125 -5.03875,0 5.2025,14.7625 -6.15125,15.18875 z"
            />
            <path
              fill="#E50914"
              d="m -206.91147,771.06478 0,-29.60125 -5.0375,0 0,29.18625 c 1.68125,0.12875 3.36125,0.26875 5.0375,0.415"
            />
            <path
              fill="#E50914"
              d="m -244.7486,769.4089 c 1.36,0 2.7175,0.01 4.07375,0.0213 l 0,-10.875 6.05125,0 0,-4.63125 -6.05125,0 0,-7.825 6.96875,0 0,-4.63625 -12.02625,0 0,27.95 c 0.3275,0 0.655,-0.004 0.98375,-0.004"
            />
            <path
              fill="#E50914"
              d="m -260.3881,769.69191 c 1.6775,-0.06 3.3575,-0.11 5.04,-0.15125 l 0,-23.44125 4.7075,0 0,-4.63625 -14.45625,0 0,4.63625 4.70875,0 0,23.5925 z"
            />
            <path
              fill="#E50914"
              d="m -298.91059,772.81378 0,-17.63625 5.96375,16.92375 c 1.83375,-0.20625 3.67125,-0.4 5.5125,-0.5825 l 0,-30.055 -4.8325,0 0,18.2675 -6.43625,-18.2675 -0.2075,0 -4.8325,0 0,31.98375 0.03,0 c 1.5975,-0.22125 3.19875,-0.43125 4.8025,-0.63375"
            />
            <path
              fill="#E50914"
              d="m -269.95297,746.09903 0,-4.63625 -12.0275,0 0,24.9125 0,4.6375 0,0.004 c 3.99125,-0.345 7.99625,-0.63375 12.0175,-0.86875 l 0,-0.004 0,-1.33625 0,-3.3 c -2.325,0.135 -4.645,0.29125 -6.96,0.46375 l 0,-7.415 6.05125,0 0,-4.63375 -6.05125,0 0,-7.82375 6.97,0 z"
            />
            <path
              fill="#E50914"
              d="m -223.72272,765.2864 0,-23.82375 -5.05875,0 0,23.605 0,4.63625 0,0.005 c 4.02375,0.1475 8.0325,0.35375 12.0275,0.6125 l 0,-0.006 0,-1.4975 0,-3.13875 c -2.31875,-0.15 -4.64125,-0.28 -6.96875,-0.3925"
            />
          </g>
        </g>
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