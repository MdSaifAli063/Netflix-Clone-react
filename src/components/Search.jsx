import React, { useState, useRef } from "react";

export default function Search({ onSearch }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const handleIconClick = () => {
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    if (e.target.value.length > 2) {
      onSearch(e.target.value);
    }
    if (!e.target.value) {
      onSearch("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) onSearch(value);
  };

  const handleBlur = () => {
    if (!value) setOpen(false);
  };

  return (
    <form
      className={`Search ${open ? "open" : ""}`}
      onSubmit={handleSubmit}
    >
      <button
        type="button"
        className="search-icon"
        onClick={handleIconClick}
        aria-label="Open search"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="18" height="18">
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      </button>
      <input
        ref={inputRef}
        type="search"
        placeholder="Titles, people, genres"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-label="Search"
      />
    </form>
  );
}