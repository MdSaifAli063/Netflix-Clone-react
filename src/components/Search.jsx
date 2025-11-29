import React from "react";

export default function Search({ onSubmit }) {
  return (
    <form onSubmit={onSubmit} id="search" className="Search">
      <input type="search" placeholder="Search for a title..." />
    </form>
  );
}
