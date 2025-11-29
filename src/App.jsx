import React, { useState } from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import Logo from "./components/Logo";
import Search from "./components/Search";


export default function App() {
  return (
    <>
      <Navigation />
      <Logo />
      <Search onSubmit={(e) => {
        e.preventDefault();
        const query = e.target.querySelector('input[type="search"]').value;
        console.log("Search query:", query);
      }} />
    </>
  );
}
