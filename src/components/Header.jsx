import React from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";
import Search from "./Search";
import UserProfile from "./UserProfile";

export default function Header({ onSubmit }) {
  return (
    <header className="Header">
      <Logo />
      <Navigation />
      <Search onSubmit={onSubmit} />
      <UserProfile />
    </header>
  );
}
